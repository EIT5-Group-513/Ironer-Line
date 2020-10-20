/*global define,brease,console,CustomEvent*/
define(['brease/core/BaseWidget', 'brease/enum/Enum', 'brease/events/BreaseEvent', 'brease/core/WidgetFactory', 'brease/core/Utils'], function (SuperClass, Enum, BreaseEvent, widgetFactory, Utils) {

    /*jshint white:false */
    'use strict';

    /**
    * @class system.widgets.ContentLoader  
    * @extends brease.core.BaseWidget
    * @iatMeta studio:visible
    * false
    * @finalClass
    */

    var defaultSettings = {
        loadPolicy: Enum.LoadPolicy.IMMEDIATE,
        cachePolicy: Enum.CachePolicy.CACHE,
        busyTimeout: 1000
    },

    WidgetClass = SuperClass.extend(function ContentLoader() {
        SuperClass.apply(this, arguments);
    }, defaultSettings, true),

    p = WidgetClass.prototype;

    p.init = function () {
        this.bindingController = brease.uiController.bindingController;
        this.step = 0;
        this.isLoaded = false;
        this.loadQueue = [];
        if (this.settings.url && this.settings.loadPolicy === Enum.LoadPolicy.IMMEDIATE) {
            this.load(this.settings.url, this.settings.contentId);
        }
        this._defer('_dispatchReady');
    };

    /**
    * @method load
    * Load a content by url.  
    * @param {String} url
    * @param {String} contentId
    */
    p.load = function (url, contentId, force) {
        //console.log('%c' + this.elem.id + '.load(' + url + ',' + contentId + '),loaded=' + this.isLoaded, 'color:#cc00cc');
        if ((this.loadQueue.length === 0 || url !== this.loadQueue[0]) || force === true) {
            this.contentComplete = false;
            this.loadQueue.unshift(url);
            var previousContentId = this.settings.contentId;
            var previousUrl = this.settings.url;
            this.settings.url = url;
            this.settings.contentId = contentId;
            this.loadFlag = true;
            if (this.isLoaded === true) {
                _unload.call(this, previousContentId, previousUrl).then(function (widget) {
                    _load.call(widget);
                });
            } else {
                _load.call(this);
            }
            this.el.attr("data-brease-contentid", contentId);
        }
    };

    p.suspend = function () {
        //console.log('%c                        suspend ' + this.elem.id + ' (' + this.settings.contentId + ')', 'color:#00dddd');
        _hide.call(this);

        this.loadQueue.length = 0;
        _clearTimer.call(this);
        this.suspended = true;
        widgetFactory.suspendInContent(this.elem, this.settings.contentId);
    };

    p.flush = function () {
        _hide.call(this);
        widgetFactory.disposeInContent(this.elem, this.settings.contentId);
        _reset.call(this);
    };

    p.deactivateContent = function () {
        if (this.active) {
            //console.log('%cContentLoader.deactivateContent:' + this.settings.contentId, 'color:#aaa');
            this.active = false;
            this.step = -1;
            this.bindingController.deactivateContent(this.settings.contentId);
        }
    };

    p.wake = function () {
        var widget = this;
        //console.log('%c                        wake ' + this.elem.id + ' (' + this.settings.contentId + '),complete:' + this.contentComplete, 'color:#00dddd');
        if (this.contentComplete === true) {
            widgetFactory.wakeInContent(this.settings.contentId);

            this.suspended = false;
            this.step = 0;
            $.when(
                    this.bindingController.activateContent(this.settings.contentId)
                ).then(function successHandler(contentId) {
                    if (widget.step === 0) {
                        //console.log('activateContent.successHandler:contentId=' + contentId + '/' + widget.settings.contentId);
                        widget.active = true;
                        widget.step = 1;
                        _setVisible.call(widget, true);
                        if (contentId === widget.settings.contentId) {

                            widget.bindingController.sendInitialValues(widget.settings.contentId);
                            widget.dispatchEvent(new CustomEvent(BreaseEvent.FRAGMENT_SHOW, { detail: { url: widget.settings.url, contentId: widget.settings.contentId }, bubbles: true }));
                            window.performanceMonitor.profile('loadContent - ' + widget.settings.contentId, 1);
                        }
                    }
                });
        } else {
            this.load(this.settings.url, this.settings.contentId);
        }
    };

    p.dispose = function () {
        //console.log('%c                        dispose ' + this.elem.id + ' (' + this.settings.contentId + ')', 'color:#00dddd');
        this.loadFlag = false;
        widgetFactory.disposeInContent(this.elem, this.settings.contentId);
        if (this.isLoaded === true) {
            this.deactivateContent();
        }
        this.loadQueue.length = 0;
        _clearTimer.call(this);
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    p.getContentId = function () {
        return this.settings.contentId;
    };

    p.getUrl = function () {
        return this.settings.url;
    };

    function _setVisible(flag) {
        this.el.css('visibility', (flag) ? 'visible' : 'hidden');
        this.elem.dispatchEvent(new CustomEvent(BreaseEvent.VISIBILITY_CHANGED, { bubbles: false, detail: { visible: flag } }));
    }

    function _contentReadyHandler() {
        var widget = this;
        //console.debug('content complete:' + widget.settings.contentId);
        if (this.step === 0) {
            this.step = 1;
            this.contentComplete = true;

            _setVisible.call(this, true);

            window.performanceMonitor.profile('sendInitialValues - ' + widget.settings.contentId, 0);

            this.bindingController.sendInitialValues(widget.settings.contentId, function (contentId) {
                //console.log('callback after sendInitialValues:' + contentId + ',widget.settings:' + widget.settings.contentId);
                if (widget.settings.contentId === contentId) {
                    if (widget.elem) {
                        widget.dispatchEvent(new CustomEvent(BreaseEvent.FRAGMENT_SHOW, { detail: { url: widget.settings.url, contentId: widget.settings.contentId }, bubbles: true }));
                    }
                    window.performanceMonitor.profile('sendInitialValues - ' + widget.settings.contentId, 1);
                    window.performanceMonitor.profile('loadContent - ' + widget.settings.contentId, 1);
                }
            });
        }
    }

    function _busyHandler() {
        this.el.html(brease.language.getSystemTextByKey('BR/IAT/brease.common.pageloading'));
    }

    function _clearTimer() {
        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = undefined;
        }
    }

    function _hide() {
        brease.appElem.dispatchEvent(new CustomEvent(BreaseEvent.BEFORE_HIDE, { detail: { id: this.elem.id, contentId: this.settings.contentId } }));
        this.loadFlag = false;
        _setVisible.call(this, false);
        this.deactivateContent();
        /**
        * @event fragment_hide
        * Fired after content is set to hidden  
        * @param {Object} detail
        * @param {String} detail.url URL of content
        * @param {String} detail.contentId id of content
        * @param {String} type {@link brease.events.BreaseEvent#static-property-FRAGMENT_HIDE BreaseEvent.FRAGMENT_HIDE}
        * @param {HTMLElement} target element of ContentLoader
        */
        _dispatchHide.call(this, this.settings.contentId, this.settings.url);
    }

    function _reset() {
        this.isLoaded = false;
        this.settings.url = undefined;
    }

    function _parseContent(elem) {

        var deferred = $.Deferred(),
            widget = this,
            listener = function () {
                elem.removeEventListener(BreaseEvent.CONTENT_PARSED, listener);
                window.performanceMonitor.profile('parseContent - ' + widget.settings.contentId, 1);
                deferred.resolve(null);
            };
        elem.addEventListener(BreaseEvent.CONTENT_PARSED, listener);
        window.performanceMonitor.profile('parseContent - ' + this.settings.contentId, 0);
        widgetFactory.parse(elem, false, widget.settings.contentId);

        return deferred.promise();
    }

    function _unload(contentId, url) {
        var deferred = $.Deferred();
        brease.appElem.dispatchEvent(new CustomEvent(BreaseEvent.BEFORE_UNLOAD, { detail: { id: this.elem.id, contentId: contentId } }));
        brease.appElem.dispatchEvent(new CustomEvent(BreaseEvent.BEFORE_HIDE, { detail: { id: this.elem.id, contentId: contentId } }));
        _setVisible.call(this, false);
        if (this.bindingController.isContentActive(contentId)) {
            this.bindingController.deactivateContent(contentId);
        }
        _dispatchHide.call(this, contentId, url);

        var widget = this;
        widgetFactory.disposeInContent(this.elem, contentId, function () {
            widget.isLoaded = false;
            widget.el.empty();
            deferred.resolve(widget);
        });
        return deferred.promise();
    }

    function _dispatchHide(contentId, url) {
        //console.log('dispatch ' + BreaseEvent.FRAGMENT_HIDE, { contentId: contentId, url: url });
        this.dispatchEvent(new CustomEvent(BreaseEvent.FRAGMENT_HIDE, { detail: { contentId: contentId, url: url } }));
    }

    function _load() {
        var widget = this;
        //console.log('_load(' + widget.settings.url + ',' + widget.settings.contentId + ')');

        _clearTimer.call(this);
        widget.timer = window.setTimeout(widget._bind(_busyHandler), widget.settings.busyTimeout);

        window.performanceMonitor.profile('loadContentHTML - ' + widget.settings.contentId, 0);

        brease.pageController.loadHTML(widget.settings.url, [widget.settings.url]).done(widget._bind(_loadSuccess)).fail(widget._bind(_loadFail));
    }

    function _loadSuccess(html, url) {

        var widget = this;

        if (url === widget.loadQueue[0] && this.loadFlag === true) {

            _clearTimer.call(this);
            widget.loadQueue.length = 0;

            try {
                widget.el.html(Utils.parseTemplate(html));
            } catch (e) {
                console.error(e);
                console.log('Content "' + widget.settings.contentId + '": error in widget properties (ContentLoader.js)');
            }
            widget.el.find('script').remove();

            /**
            * @event fragment_loaded
            * Fired AFTER content is loaded and BEFORE it's parsed  
            * @param {Object} detail
            * @param {String} detail.url URL of content
            * @param {String} detail.contentId id of content
            * @param {String} type {@link brease.events.BreaseEvent#static-property-FRAGMENT_LOADED BreaseEvent.FRAGMENT_LOADED}
            * @param {HTMLElement} target element of ContentLoader
            */
            widget.dispatchEvent(new CustomEvent(BreaseEvent.FRAGMENT_LOADED, { detail: { url: widget.settings.url, contentId: widget.settings.contentId }, bubbles: true }));
            window.performanceMonitor.profile('loadContentHTML - ' + widget.settings.contentId, 1);
            widget.isLoaded = true;
            widget.step = 0;
            $.when(
                this.bindingController.activateContent(widget.settings.contentId)
            ).then(widget._bind(_activateFinished));
            this.active = true;
        }
    }

    function _activateFinished() {
        var widget = this;
        $.when(
            _parseContent.call(widget, widget.elem)
        ).then(widget._bind(_contentReadyHandler));
    }

    function _loadFail(error) {
        var widget = this;
        _clearTimer.call(this);
        widget.isLoaded = false;
        /**
        * @event load_error
        * Fired if an error occurs at content loading  
        * @param {Object} detail
        * @param {String} detail.url URL of content
        * @param {String} detail.contentId id of content
        * @param {String} type {@link brease.events.BreaseEvent#static-property-LOAD_ERROR BreaseEvent.LOAD_ERROR}
        * @param {HTMLElement} target element of ContentLoader
        */
        if (widget.elem && this.loadFlag === true) {
            widget.dispatchEvent(new CustomEvent(BreaseEvent.LOAD_ERROR, { detail: { url: widget.settings.url, contentId: widget.settings.contentId } }));
            widget.el.html('ERROR: could not load fragment with url=' + widget.settings.url);
        }
        console.iatWarn('WARNING: could not load content in ContentLoader[' + ((widget.elem) ? widget.elem.id : '') + ']:' + error.message);
    }

    // override some methods of BaseWidget

    p.dispatchEvent = function (e) {
        this.elem.dispatchEvent(e);
    };

    return WidgetClass;

});