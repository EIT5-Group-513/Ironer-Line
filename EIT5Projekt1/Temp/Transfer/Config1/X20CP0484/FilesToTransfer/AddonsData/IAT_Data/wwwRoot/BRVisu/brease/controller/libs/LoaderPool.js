/*global define,brease*/
define(['brease/events/BreaseEvent', 'brease/enum/Enum', 'brease/core/libs/Deferred', 'brease/core/Utils'], function (BreaseEvent, Enum, Deferred, Utils) {
    /*jshint white:false*/
    'use strict';

    var LoaderPool = function (maxSlots) {
        this.id = Utils.uniqueID('LoaderPool');
        //console.log('LoaderPool.constructor(id=' + this.id + ',maxSlots=' + maxSlots + ')');
        this.count = 0;
        this.maxSlots = (maxSlots !== undefined) ? Math.max(0, parseInt(maxSlots, 10)) : _slotsDefault;
        this.maxSlots = Math.min(this.maxSlots, _slotsMax);
        //this.maxSlots = 0;
        console.iatInfo('LoaderPool.maxSlots=' + this.maxSlots);

        _private[this.id] = {
            locker: document.createDocumentFragment(),
            pool: {},
            containers: {},
            contentCount: {}
        };
    },
    _private = {},
    _counter = 0,
    _slotsMax = 200,
    _slotsDefault = 25;

    LoaderPool.prototype.loadContent = function (content, $target, deferred) {

        var loaderElemsInArea = $target.find('.systemContentLoader');

        if (content && content.path !== undefined) {
            //console.log('loadContent ' + content.id + ' in ' + $target[0].id);
            _countContent.call(this, content);
            if (loaderElemsInArea.length > 0) {
                //console.log('there are loaders in area');

                var foundWithUrl = false;
                for (var i = 0; i < loaderElemsInArea.length; i += 1) {
                    var loaderId = loaderElemsInArea[i].id;
                    if (brease.callWidget(loaderId, 'getUrl') === content.path) {
                        //console.log('loader in ' + $target[0].id + ' has already content ' + content.id);
                        deferred.resolve(loaderId, false);
                        window.performanceMonitor.profile('loadContent - ' + content.id + '', 1);
                        foundWithUrl = true;

                    } else {
                        //console.log('loader ' + loaderElemsInArea[i].id + ' in ' + $target[0].id + ' has other content -> suspend');
                        this.suspendLoader(loaderElemsInArea[i]);
                    }
                }

                if (!foundWithUrl) {
                    //console.log('no loader with url found!');
                    _addLoaderToArea.call(this, content, $target[0], deferred);
                }
            } else {
                //console.log('there are NO loaders in area ' + $target[0].id);
                _addLoaderToArea.call(this, content, $target[0], deferred);
            }

        } else {

            if (loaderElemsInArea.length > 0) {
                //console.log('suspend ContentLoader (' + loaderElemsInArea[0].id + ') in ' + $target[0].id);
                this.suspendLoader(loaderElemsInArea[0]);
            }
            deferred.reject('CONTENT_NOT_FOUND', $target[0]);
        }
    };

    LoaderPool.prototype.isContentActive = function (contentId) {
        var success = false,
            pool = _private[this.id].pool;

        for (var id in pool) {
            if (pool[id].active === true) {
                if (contentId === brease.callWidget(id, 'getContentId')) {
                    success = true;
                    break;
                }
            }
        }
        return success;
    };

    LoaderPool.prototype.suspendLoader = function (loaderElem) {
        if (this.tagMode === true) {
            var contentId = brease.callWidget(loaderElem.id, 'getContentId'),
                isContentToLoad = _isContentToLoad.call(this, contentId);
            //console.log('%c mark for suspension:' + loaderElem.id + ' (' + brease.callWidget(loaderElem.id, 'getContentId') + ')', 'color:#cccc00');
            if (isContentToLoad) {
                _private[this.id].pool[loaderElem.id].tag = 'parked';
                //console.log('mark as parked');
            } else {
                _private[this.id].pool[loaderElem.id].tag = 'suspend';
                //console.log('mark as suspend');
                brease.callWidget(loaderElem.id, 'deactivateContent');
            }
            _private[this.id].locker.appendChild(loaderElem);
        } else {
            _suspend.call(this, loaderElem);
        }
    };

    LoaderPool.prototype.flushLoader = function (loaderElem) {
        if (this.tagMode === true) {
            var contentId = brease.callWidget(loaderElem.id, 'getContentId'),
                isContentToLoad = _isContentToLoad.call(this, contentId);
            //console.log('%c mark for flushing:' + loaderElem.id + ' (' + contentId + ')', 'color:#cccc00');
            if (isContentToLoad) {
                _private[this.id].pool[loaderElem.id].tag = 'parked';
                //console.log('mark as parked');
            } else {
                _private[this.id].pool[loaderElem.id].tag = 'flush';
                //console.log('mark as flush');
                brease.callWidget(loaderElem.id, 'deactivateContent');
            }
            _private[this.id].locker.appendChild(loaderElem);
        } else {
            _flush.call(this, loaderElem);
        }
    };

    function _isContentToLoad(contentId) {
        return this.contentsToLoad.indexOf(contentId) !== -1;
    }

    LoaderPool.prototype.startTagMode = function (contentsToLoad) {
        if (this.tagMode !== true) {
            for (var loaderId in _private[this.id].pool) {
                _private[this.id].pool[loaderId].tag = '';
            }
            this.tagMode = true;
            this.contentsToLoad = contentsToLoad;
        }
    };

    LoaderPool.prototype.endTagMode = function () {
        this.tagMode = false;
        for (var loaderId in _private[this.id].pool) {
            if (_private[this.id].pool[loaderId].tag === 'suspend') {
                if (this.maxSlots === 0) {
                    this.flushLoader(_private[this.id].locker.querySelector('#' + loaderId));
                } else {
                    this.suspendLoader(_private[this.id].locker.querySelector('#' + loaderId));
                }
            }
            if (_private[this.id].pool[loaderId].tag === 'flush') {
                this.flushLoader(_private[this.id].locker.querySelector('#' + loaderId));
            }
        }
    };


    /*
    /* PRIVATE
    */

    function _suspend(loaderElem) {
        //console.log('%c LoaderPool.suspend ' + loaderElem.id, 'color:#cccc00');
        if (_private[this.id].pool[loaderElem.id] !== undefined) {
            try {
                brease.callWidget(loaderElem.id, 'suspend');
            } catch (e) {
                Utils.logError(e);
            } finally {
                _private[this.id].pool[loaderElem.id].tag = '';
                _private[this.id].pool[loaderElem.id].active = false;
                _private[this.id].locker.appendChild(loaderElem);
            }

        } else {
            console.iatWarn('no loader with id=' + loaderElem.id + ' found!');
        }
    }

    function _flush(loaderElem) {
        //console.log('%c LoaderPool.flush ' + loaderElem.id, 'color:#cccc00');
        if (_private[this.id].pool[loaderElem.id] !== undefined) {
            try {
                brease.callWidget(loaderElem.id, 'flush');
            } catch (e) {
                Utils.logError(e);
            } finally {
                _private[this.id].pool[loaderElem.id].tag = '';
                _private[this.id].pool[loaderElem.id].active = false;
                _private[this.id].pool[loaderElem.id].contentId = '';
                _private[this.id].locker.appendChild(loaderElem);
            }
        } else {
            console.iatWarn('no loader with id=' + loaderElem.id + ' found!');
        }
    }

    function _countContent(content) {
        if (_private[this.id].contentCount[content.id] === undefined) {
            _private[this.id].contentCount[content.id] = 0;
        }
        _private[this.id].contentCount[content.id] += 1;
    }

    function _addLoaderToArea(content, areaDiv, deferred) {
        var loaderObj = _findContentLoaderWithContent.call(this, content.path);
        if (loaderObj) {
            Utils.prependChild(areaDiv, _private[this.id].locker.querySelector('#' + loaderObj.id));
            try {
                if (_private[this.id].pool[loaderObj.id].tag !== 'parked') {
                    //console.log('%c there is a loader (=' + loaderObj.id + ') with content "' + content.id + '" -> try wake', 'color:green;');


                    if (brease.uiController.widgetsController.allPreviouslyReady(content.id)) {
                        //console.log('%cwake ' + loaderObj.id + ' (' + content.id + '' + content.path + ')', 'color:#00cc00;');
                        brease.callWidget(loaderObj.id, 'wake');
                    } else {
                        //console.log('%c' + 'content not completely ready -> load(' + content.id + '' + content.path + ')', 'color:#00cccc');
                        //widgetFactory.disposeInContent(document.getElementById(loaderObj.id), content.id);
                        brease.callWidget(loaderObj.id, 'load', content.path, content.id, true);
                    }
                }

            } catch (e) {
                Utils.logError(e);
            } finally {
                _private[this.id].pool[loaderObj.id].tag = '';
                _private[this.id].pool[loaderObj.id].active = true;
                _private[this.id].pool[loaderObj.id].contentId = content.id;
                deferred.resolve(loaderObj.id, true);
            }
        } else {
            //console.log('there are NO ContentLoaders with ' + content.id);
            //console.log('load content in ContentLoader from Pool!');
            _loadFromPool.call(this, areaDiv, content, deferred);
        }
    }

    function _loadFromPool(container, content, deferred) {

        //console.log('count=' + this.count + ', maxSlots=' + this.maxSlots);
        if (this.count < this.maxSlots) {
            //console.log('maximum noch nicht erreicht -> neuer Loader fuer content ' + content.id);
            _createNew.call(this, container, content, deferred);
        } else {

            //console.log('maximum erreicht -> Loader wiederverwenden!');

            var loaderObj = _getAvailable.call(this, content.id);

            if (loaderObj !== undefined) {

                //console.log(loaderObj.id + ' wird recycelt');
                _loadAvailable.call(this, loaderObj, container, content, deferred);
            } else {
                //console.log('kein verfuegbarer ContentLoader -> neuer Loader fuer content ' + content.id);
                _createNew.call(this, container, content, deferred);
            }
        }
    }

    function _getAvailable(contentId) {
        var loader,
                loaderId,
                contentCount,
                minContentCount = Number.POSITIVE_INFINITY,
                pool = _private[this.id].pool;

        for (var id in pool) {

            if (pool[id].active !== true || pool[id].tag === 'suspend' || pool[id].tag === 'flush') {
                contentCount = _private[this.id].contentCount[pool[id].contentId];
                if (contentId === brease.callWidget(id, 'getContentId')) {
                    loaderId = id;
                    break;
                }
                if (contentCount < minContentCount) {
                    minContentCount = contentCount;
                    loaderId = id;
                }
            }
        }
        if (loaderId) {
            loader = pool[loaderId];
        }
        return loader;
    }

    function _findContentLoaderWithContent(contentPath) {

        var loader,
            pool = _private[this.id].pool;

        for (var id in pool) {
            if (brease.callWidget(id, 'getUrl') === contentPath && (pool[id].active !== true || pool[id].tag === 'suspend' || pool[id].tag === 'flush' || pool[id].tag === 'parked')) {
                loader = pool[id];
                break;
            }
        }
        //console.log('try to find a loader with ' + contentPath + ':' + ((loader) ? loader.id : 'undefined'));
        return loader;
    }

    function _loadAvailable(loaderObj, container, content, deferred) {
        //console.log('%c_loadAvailable:' + content.id + ' in ' + loaderObj.id + ' in ' + container.id, 'color:#00cccc');
        //console.log('content in loader:' + loaderObj.contentId);
        loaderObj.tag = '';
        loaderObj.active = true;

        brease.pageController.emptyContainer(container);
        Utils.prependChild(container, _private[this.id].locker.querySelector('#' + loaderObj.id));

        if (loaderObj.contentId !== content.id) {
            loaderObj.contentId = content.id;
            brease.callWidget(loaderObj.id, 'load', content.path, content.id);
        }
        deferred.resolve(loaderObj.id, true);
    }

    function _createNew(container, content, deferred) {

        var loaderId = 'SystemLoader' + (_counter += 1),
            poolInstance = this;
        //console.log('%c createNew: ' + loaderId, 'color:#9999ff');
        this.count += 1;
        _private[this.id].containers[container.id] = {
            contentReadyHandler: _contentReadyHandler.bind(poolInstance, container.id, loaderId),
            initializedHandler: _initializedHandler.bind(poolInstance, container.id, loaderId, content.id),
            deferred: deferred
        };

        container.addEventListener(BreaseEvent.CONTENT_READY, _private[poolInstance.id].containers[container.id].contentReadyHandler);

        brease.uiController.createWidgets(container, [{
            className: 'system.widgets.ContentLoader',
            id: loaderId,
            options: {
                url: content.path,
                contentId: content.id
            },
            HTMLAttributes: {
                style: 'box-sizing: border-box; position:relative; overflow:hidden;visibility:hidden;',
                class: 'systemContentLoader'
            }
        }], true, brease.settings.globalContent, '#' + container.id + ' > :first-child');

    }

    function _contentReadyHandler(containerId, instanceId, e) {
        //console.log('%c _contentReadyHandler: ' + containerId + ',' + e.target.id + ',' + instanceId, 'color:#9999ff');
        if (e.target.id === containerId) {
            e.target.removeEventListener(BreaseEvent.CONTENT_READY, _private[this.id].containers[containerId].contentReadyHandler);
            var instance = document.getElementById(instanceId);
            if (instance) {
                //console.log(instanceId + '.addEventListener.' + BreaseEvent.WIDGET_INITIALIZED);
                instance.addEventListener(BreaseEvent.WIDGET_INITIALIZED, _private[this.id].containers[containerId].initializedHandler);
            } else {
                _private[this.id].containers[containerId] = null;
            }
        }
    }

    function _initializedHandler(containerId, instanceId, contentId, e) {

        //console.log('%c _initializedHandler: ' + containerId + ',' + instanceId + ',' + e.target.id, 'color:#9999ff');
        if (e.target.id === instanceId) {
            e.target.removeEventListener(BreaseEvent.WIDGET_INITIALIZED, _private[this.id].containers[containerId].initializedHandler);

            _private[this.id].pool[instanceId] = {
                id: instanceId,
                active: true,
                contentId: contentId
            };

            _private[this.id].containers[containerId].deferred.resolve(instanceId, true);
            _private[this.id].containers[containerId] = null;
        }
    }

    return LoaderPool;

});