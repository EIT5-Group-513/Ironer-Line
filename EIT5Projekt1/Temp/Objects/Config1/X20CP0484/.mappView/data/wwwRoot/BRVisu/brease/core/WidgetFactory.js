/*global define,console,CustomEvent,brease*/
define(['brease/events/BreaseEvent', 'brease/core/Utils', 'brease/core/libs/Queue', 'brease/enum/Enum', 'brease/core/libs/Deferred', 'brease/core/libs/FactoryUtils', 'brease/controller/FileManager'], function (BreaseEvent, Utils, Queue, Enum, Deferred, factoryUtils, fileManager) {

    /*jshint white:false*/
    'use strict';

    var factory = {

        init: function (widgetsController) {
            if (widgetsController !== undefined) {
                _widgetsController = widgetsController;
            }
        },

        parse: function (target, andSelf, contentId) {
            target = factoryUtils.getElem(target);
            if (contentId === undefined) {
                contentId = _getContentId(target);
            }
            if (target !== null) {
                var queue = Queue.getQueue(target, 'parse', true),
				    nodeList = target.querySelectorAll('[data-brease-widget]'),
				    node, i, l = nodeList.length,
                    widgetList = [], idList = [];

                for (i = l - 1; i >= 0; i -= 1) {
                    node = nodeList[i];
                    if (node.id === undefined || node.id === '') {
                        node.id = Utils.uniqueID('generatedWidgetId');
                        console.iatInfo('[parse] HTMLElement has no id, setting id to \u00BB' + node.id + '\u00AB');
                    }
                    if (idList.indexOf(node.id) === -1) {
                        widgetList.push(node);
                        idList.push(node.id);
                    } else {
                        console.iatWarn('[parse] HTML element has duplicate id (' + node.id + ') and will be removed');
                        $(node).remove();
                    }
                }

                l = widgetList.length;
                for (i = 0; i < l; i += 1) {
                    _enqueue(widgetList[i], queue, contentId);
                }
                if (andSelf === true && target.getAttribute('data-brease-widget') !== null) {
                    _enqueue(target, queue, contentId);
                }

                queue.elem = target;
                queue.start(_widgetParser);
            } else {
                _warn('parse');
            }
        },

        dispose: function (target, andSelf, callback, keepBindingInfo) {
            target = factoryUtils.getElem(target);
            if (target !== null) {
                _stopActQueues(target);
                factory.walkWidgets(target, andSelf, 'dispose', [keepBindingInfo]);
                if (typeof callback === 'function') {
                    callback();
                }
            } else {
                _warn('dispose');
            }
        },

        disposeInContent: function (target, contentId, callback) {
            //console.warn("disposeInContent:", target.id, contentId);
            target = factoryUtils.getElem(target);
            if (target !== null) {
                _stopActQueues(target);

                var widgetIds = _widgetsController.getWidgetsOfContent(contentId, Enum.WidgetState.ABORTED),
                    state, suspendedState;

                for (var i = 0, l = widgetIds.length; i < l; i += 1) {
                    state = _widgetsController.getState(widgetIds[i]);
                    suspendedState = _widgetsController.getSuspendedState(widgetIds[i]);
                    if (state > Enum.WidgetState.IN_QUEUE && (state < Enum.WidgetState.SUSPENDED || suspendedState > Enum.WidgetState.IN_QUEUE)) {
                        factory.callWidget(widgetIds[i], 'dispose');
                    }
                    _widgetsController.deleteWidget(widgetIds[i]);

                }
                if (typeof callback === 'function') {
                    callback();
                }

            } else {
                _warn('dispose');
            }
        },

        suspend: function (target, andSelf, callback, args) {
            //console.log("suspend:", target.id, andSelf, callback, args);
            target = factoryUtils.getElem(target);
            if (target !== null) {
                _stopActQueues(target);
                factory.walkWidgets(target, andSelf, 'suspend', args);
                if (typeof callback === 'function') {
                    callback();
                }

            } else {
                _warn('suspend');
            }
        },

        suspendInContent: function (target, contentId, callback) {
            //console.log("suspendInContent:", target.id, contentId, callback);
            target = factoryUtils.getElem(target);
            if (target !== null) {
                _stopActQueues(target);

                var widgetIds = _widgetsController.getWidgetsOfContent(contentId, Enum.WidgetState.IN_QUEUE);
                for (var i = 0, l = widgetIds.length; i < l; i += 1) {

                    _widgetsController.setSuspendedState(widgetIds[i], _widgetsController.getState(widgetIds[i]));
                    _widgetsController.setState(widgetIds[i], Enum.WidgetState.SUSPENDED);
                    factory.callWidget(widgetIds[i], 'suspend');

                }
                if (typeof callback === 'function') {
                    callback();
                }

            } else {
                _warn('suspend');
            }
        },

        wake: function (target, andSelf, callback) {
            target = factoryUtils.getElem(target);
            if (target !== null) {

                var e1 = new CustomEvent(BreaseEvent.LANGUAGE_CHANGED, { detail: { currentLanguage: brease.language.getCurrentLanguage() } });
                var e2 = new CustomEvent(BreaseEvent.MEASUREMENT_SYSTEM_CHANGED, { detail: { currentMeasurementSystem: brease.measurementSystem.getCurrentMeasurementSystem() } });
                var e3 = new CustomEvent(BreaseEvent.USER_CHANGED, { detail: brease.user.getCurrentUser() });
                var e4 = new CustomEvent(BreaseEvent.CULTURE_CHANGED, { detail: brease.culture.getCurrentCulture().key });

                factory.walkWidgets(target, andSelf, 'wake', [{ "language": e1, "mms": e2, "user": e3, "culture": e4 }]);
                if (typeof callback === 'function') {
                    callback();
                }

            } else {
                _warn('wake');
            }
        },

        wakeInContent: function (contentId, callback) {
            //console.log("wakeInContent:", contentId, callback);



            var e1 = new CustomEvent(BreaseEvent.LANGUAGE_CHANGED, { detail: { currentLanguage: brease.language.getCurrentLanguage() } });
            var e2 = new CustomEvent(BreaseEvent.MEASUREMENT_SYSTEM_CHANGED, { detail: { currentMeasurementSystem: brease.measurementSystem.getCurrentMeasurementSystem() } });
            var e3 = new CustomEvent(BreaseEvent.USER_CHANGED, { detail: brease.user.getCurrentUser() });
            var e4 = new CustomEvent(BreaseEvent.CULTURE_CHANGED, { detail: brease.culture.getCurrentCulture().key });

            var widgetIds = _widgetsController.getWidgetsOfContent(contentId, Enum.WidgetState.IN_QUEUE);
            for (var i = 0, l = widgetIds.length; i < l; i += 1) {

                _widgetsController.setState(widgetIds[i], Enum.WidgetState.READY);
                factory.callWidget.apply(null, [widgetIds[i], 'wake', { "language": e1, "mms": e2, "user": e3, "culture": e4 }]);

            }
            if (typeof callback === 'function') {
                callback();
            }

        },

        createWidgets: function (target, arWidgets, autoParse, contentId, addBeforeSelector) {
            target = factoryUtils.getElem(target);
            if (contentId === undefined) {
                contentId = _getContentId(target);
                //console.log('%c found contentId:' + contentId, 'color:#00cccc');
            }
            if (target !== null) {
                var queue = Queue.getQueue(target, 'create', true);
                queue.pending = true;
                queue.enqueue(arWidgets.map(function (item) {
                    if (contentId) {
                        if (item.options) {
                            item.options.parentContentId = contentId;
                        } else {
                            item.options = { parentContentId: contentId };
                        }
                    }
                    if (addBeforeSelector) {
                        item.addBeforeSelector = addBeforeSelector;
                    }
                    if (item.id === undefined || item.id === '') {
                        item.id = Utils.uniqueID('generatedWidgetId');
                    }
                    return {
                        state: Enum.WidgetState.IN_QUEUE,
                        widgetInfo: item,
                        id: item.id
                    };
                }));
                queue.autoParse = (autoParse === false) ? false : true;

                fileManager.loadHTMLFiles(arWidgets, queue.id, [queue, contentId]).done(startLoadQueue).fail(startLoadQueue);

            } else {
                _warn('createWidgets');
            }
        },

        findWidgets: function (container, andSelf, minimalState) {
            var arIds = [],
                nodeList,
                node;
            minimalState = (minimalState !== undefined) ? minimalState : Enum.WidgetState.INITIALIZED;

            container = factoryUtils.getElem(container);
            if (container !== null) {
                nodeList = container.querySelectorAll('[data-brease-widget]');
                if (andSelf === true && container.getAttribute('data-brease-widget') !== null && _widgetsController.getState(container.id) >= minimalState) {
                    arIds.push(container.id);
                }

                if (nodeList.length > 0) {
                    for (var i = nodeList.length - 1; i >= 0; i -= 1) {
                        node = nodeList[i];
                        if (_widgetsController.getState(node.id) >= minimalState) {
                            arIds.push(nodeList[i].id);
                        }
                    }
                }
            } else {
                _warn('findWidgets');
            }
            return arIds;
        },

        walkWidgets: function (target, andSelf, method, args) {
            var widgetIds = factory.findWidgets(target, andSelf);
            if (widgetIds.length > 0) {
                for (var i = 0, l = widgetIds.length; i < l; i += 1) {
                    if (method === 'suspend') {
                        _widgetsController.setSuspendedState(widgetIds[i], _widgetsController.getState(widgetIds[i]));
                        _widgetsController.setState(widgetIds[i], Enum.WidgetState.SUSPENDED);
                    }
                    if (method === 'wake') {
                        _widgetsController.setState(widgetIds[i], Enum.WidgetState.READY);
                        var bindings = brease.uiController.bindingController.getSubscriptionsForElement(widgetIds[i]);
                        factory.callWidget.apply(null, (args) ? [widgetIds[i], method].concat(args, (bindings) ? [brease.config.ContentCaching.preserveOldValues, bindings] : [brease.config.ContentCaching.preserveOldValues]) : [widgetIds[i], method]);
                    } else {
                        factory.callWidget.apply(null, (args) ? [widgetIds[i], method].concat(args) : [widgetIds[i], method]);
                    }
                }
            }
        },

        callWidget: function (id, method) {
            var compInfo = _widgetsController.getWidget(id);
            if (compInfo !== undefined && compInfo.widget !== undefined) {
                if (compInfo.widget[method] !== undefined) {
                    if (compInfo.widget.state === Enum.WidgetState.READY || compInfo.widget.state === Enum.WidgetState.INITIALIZED || (compInfo.widget.state === Enum.WidgetState.SUSPENDED && (method === "wake" || method === "dispose"))) {
                        return compInfo.widget[method].apply(compInfo.widget, Utils.toArray(arguments, 2));
                    } else {
                        console.iatInfo('[callWidget:' + method + '] widget ' + compInfo.widget.el.attr('data-brease-widget') + ' with id \'' + id + '\' in unavailable state');
                        return null;
                    }
                } else if (method === 'widget') {
                    return compInfo.widget;
                } else {
                    console.iatWarn('[callWidget] no method \'' + method + '\' for widget ' + compInfo.widget.el.attr('data-brease-widget') + ' with id \'' + id + '\'');
                    return null;
                }
            } else {
                console.iatWarn('[callWidget] no widget with id "' + id + '" (method call "' + method + '")');
                return null;
            }
        }

    },
    _private = {
    }, _widgetsController;

    function startLoadQueue(queue, contentId) {
        if (queue.pending === true) {
            queue.pending = false;
            queue.start(_widgetLoader, [contentId]);
        }
    }

    //***************//
    //*** PRIVATE ***//
    //***************//

    function _widgetParser(queue) {
        $.when(
            queue.isFinished()
        ).then(function successHandler(elem) {
            elem.dispatchEvent(new CustomEvent(BreaseEvent.CONTENT_PARSED));
        }, function errorHandler() {
            console.log('errorHandler:', arguments);
        });

        queue.run(_createWidget);
    }

    _private.loadWidgetFileSuccess = function (WidgetClass, widgetPath, item, queue) {

        if (item.state === Enum.WidgetState.IN_PARSE_QUEUE && queue.elem !== null) {
            try {

                var widget = new WidgetClass(item.elem, _widgetsController.getOptions(item.elem.id, true));
                widget.state = item.state = Enum.WidgetState.INITIALIZED;
                _widgetsController.addWidget(widget);

                widget.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_INITIALIZED));
                if (widget.omitReadyEvent !== true) {
                    widget._defer('_dispatchReady');
                    //widget._dispatchReady();
                }
                queue.finishItem(item.elem.id);
            } catch (e) {
                var m = 'script error for module ' + widgetPath.path;
                item.state = Enum.WidgetState.FAILED;
                console.log(m + ' (' + e.message + ')');
                if (console.error) {
                    console.error(e.stack);
                }
                brease.loggerService.log(Enum.EventLoggerId.CLIENT_SCRIPT_FAIL, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.LOW, Enum.EventLoggerSeverity.ERROR, [], m);
                queue.finishItem(item.elem.id);
            }
        }
    };

    function _loadWidgetFileFail(message, widgetPath, item, queue) {
        var m = 'load error for module ' + ((widgetPath && widgetPath.path) ? widgetPath.path : 'undefined') + '(' + message + ')';
        item.state = Enum.WidgetState.FAILED;
        console.log(m);
        brease.loggerService.log(Enum.EventLoggerId.CLIENT_MODULELOADER_FAIL, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.LOW, Enum.EventLoggerSeverity.ERROR, [], m);
        queue.finishItem(item.elem.id);
    }

    function _createWidget(item, queue) {
        var options,
            widgetPath,
            state = _widgetsController.getState(item.elem.id);

        if (state < Enum.WidgetState.INITIALIZED) {
            if (_widgetsController.optionsExist(item.elem.id)) {
                //console.log('[' + item.elem.id + ']options from brease.options');
                options = _widgetsController.getOptions(item.elem.id);
                widgetPath = fileManager.getPathByClass(options.className);
            }
            else {
                //console.log('%c[' + item.elem.id + ']options from data-brease-options', 'color:red;');
                options = Utils.parseElementData(item.elem, 'brease-options');
                widgetPath = fileManager.getPathByClass(item.elem.getAttribute('data-brease-widget'));
            }
            if (item.options) {
                for (var key in item.options) {
                    if (options[key] === undefined) {
                        options[key] = item.options[key];
                    }
                }
            }
            _widgetsController.setOptions(item.elem.id, options, true);

            fileManager.loadJSFiles(widgetPath, brease.config.editMode === true || brease.config.mocked !== true).done(function (WidgetClass) {
                //_private.loadWidgetFileSuccess(WidgetClass, widgetPath, item, queue);
                _defer({
                    method: 'loadWidgetFileSuccess', WidgetClass: WidgetClass, widgetPath: widgetPath, item: item, queue: queue
                });
            }).fail(function (message) {
                _loadWidgetFileFail(message, widgetPath, item, queue);
            });
        } else {
            console.log('%c_createWidget:' + item.elem.id + ',state:' + Enum.WidgetState.getKeyForValue(state), 'color:red');
        }
    }

    var _updatePending = false;
    var _queue = [];

    function _defer(item) {
        _queue.push(item);

        if (_updatePending !== true) {
            _updatePending = true;
            if (typeof window.requestAnimationFrame === 'function') {
                window.requestAnimationFrame(_processDefered);
            } else {
                window.setTimeout(_processDefered, 0);
            }
        }
    }

    function _processDefered() {
        for (var i = 0; i < _queue.length; i += 1) {
            var item = _queue[i];
            _private[item['method']].call(null, item['WidgetClass'], item['widgetPath'], item['item'], item['queue']);
        }
        _queue = [];
        _updatePending = false;
    }

    function _widgetLoader(queue, contentId) {

        $.when(
            queue.isFinished()
        ).then(function successHandler(elem) {
            elem.dispatchEvent(new CustomEvent(BreaseEvent.CONTENT_READY));
            if (queue.autoParse === true) {
                factory.parse(elem, false, contentId);
            }
        }, function errorHandler() {
            console.log('errorHandler:', arguments);
        });

        queue.run(_loadHTML);
    }

    function _loadHTML(item, queue) {
        var widgetInfo = item.widgetInfo,
            widgetType = widgetInfo.className;

        if (widgetType) {
            var id = widgetInfo.id,
                content = widgetInfo.content,
                options = widgetInfo.options;

            if (!options) {
                options = {};
            }
            var className = fileManager.getPathByType(widgetType, 'class');

            _widgetsController.setOptions(id, options, false, true);
            _widgetsController.addOption(id, 'className', className);

            var html = fileManager.getHTMLByType(widgetType);
            if (html) {

                if (item.state === Enum.WidgetState.IN_QUEUE && queue.elem !== null) {
                    var newNode = factoryUtils.createNode(html, id, options, className, widgetInfo.HTMLAttributes, content);
                    if (options.styleClassAdded) {
                        _widgetsController.addOption(id, 'styleClassAdded', true);
                    }
                    if (widgetInfo.addBeforeSelector) {
                        queue.elem.insertBefore(newNode, document.querySelector(widgetInfo.addBeforeSelector));
                    } else {
                        queue.elem.appendChild(newNode);
                    }
                    item.state = Enum.WidgetState.INITIALIZED;
                    queue.finishItem(widgetInfo.id);
                }
            } else {
                _warn('_loadHTML', '[loadHTML] unknown class (' + widgetType + ') name given for widget creation; element[id=' + ((widgetInfo.id) ? widgetInfo.id : 'undefined') + '] not parsed!');
                item.state = Enum.WidgetState.FAILED;
                queue.finishItem(widgetInfo.id);
            }
        } else {
            _warn('_loadHTML', '[loadHTML] no class name given for widget creation; element[id=' + ((widgetInfo.id) ? widgetInfo.id : 'undefined') + '] not parsed!');
            item.state = Enum.WidgetState.FAILED;
            queue.finishItem(widgetInfo.id);
        }
    }

    function _enqueue(node, queue, contentId) {

        var item = {
            state: Enum.WidgetState.IN_PARSE_QUEUE,
            id: node.id,
            elem: node
        };
        if (contentId) {
            item.options = {
                parentContentId: contentId
            };
        }

        if (_widgetsController.getWidget(node.id) === undefined) {
            _widgetsController.setState(node.id, Enum.WidgetState.IN_PARSE_QUEUE);
            queue.enqueue(item);
        } else if (_widgetsController.getState(node.id) === undefined) {
            _widgetsController.setState(node.id, Enum.WidgetState.IN_PARSE_QUEUE);
            queue.enqueue(item);
        } else if (document.querySelectorAll('#' + node.id).length > 1) {
            console.iatWarn('[parse] HTML element has duplicate id (' + node.id + ') and will be removed');
            $(node).remove();
        } else {
            var state = _widgetsController.getState(node.id);
            if (state < Enum.WidgetState.IN_PARSE_QUEUE) {
                _widgetsController.setState(node.id, Enum.WidgetState.IN_PARSE_QUEUE);
                queue.enqueue(item);
            } else {
                console.iatInfo('[parse] HTML element already parsed (id=' + node.id + '),state=' + state);
            }
        }
    }

    function _getContentId(target) {
        var contentId;
        if (!target) {
            return contentId;
        }
        if (Utils.hasClass(target, 'breaseWidget')) {
            var settings = brease.callWidget(target.id, 'getSettings');

            if (settings && settings.parentContentId !== undefined) {
                return settings.parentContentId;
            }
        }
        contentId = target.attributes['data-brease-contentid'];
        if (contentId !== undefined) {
            return contentId.value;
        }

        var parentContent = $(target).closest('[data-brease-contentid]');
        if (parentContent.length > 0) {
            contentId = parentContent.attr('data-brease-contentid');
        } else {
            contentId = brease.settings.globalContent;
        }
        return contentId;
    }

    function _stopActQueues(target) {
        var actParseQueue = Queue.getQueue(target, 'parse'),
            actCreateQueue = Queue.getQueue(target, 'create'),
            i = 0;

        if (actCreateQueue !== undefined && (actCreateQueue.isRunning === true || actCreateQueue.pending === true)) {
            actCreateQueue.stop();
            for (i = 0; i < actCreateQueue.runningQueue.length; i += 1) {
                _abortItem(actCreateQueue.runningQueue[i]);
            }
            actCreateQueue.finish();
        }
        if (actParseQueue !== undefined && actParseQueue.isRunning === true) {
            actParseQueue.stop();
            for (i = 0; i < actParseQueue.runningQueue.length; i += 1) {
                _abortItem(actParseQueue.runningQueue[i]);
            }
            for (i = 0; i < actParseQueue.runningQueue.length; i += 1) {
                _removeItem(target, actParseQueue.runningQueue[i]);
            }
            actParseQueue.finish();
        }
    }

    function _abortItem(item) {
        if (item.state < Enum.WidgetState.INITIALIZED) {
            item.state = Enum.WidgetState.ABORTED;
        }
    }

    function _removeItem(target, item) {
        try {
            if (item.state === Enum.WidgetState.ABORTED || item.state === Enum.WidgetState.FAILED) {
                if (target.children[item.elem.id] !== undefined) {
                    target.removeChild(item.elem);
                }
                //_widgetsController.deleteWidget(item.elem.id);
            }
        } catch (e) {
            console.log('%c' + e.message, 'color:red;');
        }
    }

    function _warn(fn, message) {
        var m = message || '[' + fn + '] target of wrong type';
        console.iatWarn(m);
        brease.loggerService.log(Enum.EventLoggerId.CLIENT_PARSE_ERROR, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.LOW, Enum.EventLoggerSeverity.WARNING, [], m);
    }

    return factory;
});