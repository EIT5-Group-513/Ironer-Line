/*global define,CustomEvent*/
define(['brease/events/BreaseEvent', 'brease/core/Utils', 'brease/model/VisuModel'], function (BreaseEvent, Utils, VisuModel) {

    'use strict';

    /**
    * @class brease.controller.ContentManager
    * @extends Object
    * @singleton
    */

    var controller = {

        init: function (runtimeService) {

            runtimeService.addEventListener('ContentActivated', _contentActivatedHandler);
            runtimeService.addEventListener('ContentDeactivated', _contentDeactivatedHandler);
        },

        getContent: function (contentId) {
            return _getContent(contentId);
        },

        setBindingLoadState: function (contentId, flag) {
            _getContent(contentId).bindingsLoaded = flag;
        },

        isBindingLoaded: function (contentId) {
            var content = _getContent(contentId);
            return (content !== undefined && content.bindingsLoaded === true);
        },

        setActiveState: function (contentId, state) {
            var content = _getContent(contentId);
            if (content) {
                content.activeState = state;
            }
        },

        getActiveState: function (contentId) {
            var content = _getContent(contentId);
            if (content) {
                return _getContent(contentId).activeState;
            } else {
                return this.STATE.notExistent;
            }
        },

        isContentActive: function (contentId) {
            var content = _getContent(contentId);
            return (content !== undefined && content.activeState === this.STATE.active);
        },

        allActive: function (contents) {
            var active = true;
            for (var i = 0; i < contents.length; i += 1) {
                active = active && this.isContentActive(contents[i]);
            }
            return active;
        },

        addSubscription: function (contentId, widgetId) {
            var content = _getContent(contentId);
            if (content) {
                var bindings = _getContent(contentId).bindings;
                if (bindings.indexOf(widgetId) === -1) {
                    bindings.push(widgetId);
                }
            }
        },

        getSubscriptions: function (contentId) {
            var content = _getContent(contentId);
            return (content !== undefined) ? content.bindings : [];
        },

        hasSubscriptions: function (contentId) {
            var content = _getContent(contentId);
            return (content !== undefined && content.bindings.length > 0);
        },

        addEventSubscription: function (contentId, widgetId) {
            var content = _getContent(contentId);
            if (content) {
                var events = _getContent(contentId).events;
                if (events.indexOf(widgetId) === -1) {
                    events.push(widgetId);
                }
            }
        },

        hasEvents: function (contentId) {
            var content = _getContent(contentId);
            return (content !== undefined && content.events.length > 0);
        },

        setLatestRequest: function (contentId, request) {
            var content = _getContent(contentId);
            if (content) {

                if (request === 'activate') {
                    content.count += 1;
                }
                content.latestRequest = contentId + '[' + content.count + ']' + request;
            }
            return content;
        },

        getLatestRequest: function (contentId) {
            var content = _getContent(contentId);
            if (content) {
                return _getContent(contentId).latestRequest;
            } else {
                return undefined;
            }
        },

        setActivateDeferred: function (contentId, deferred) {
            _getContent(contentId).activateDeferred = deferred;
        },

        setDeactivateDeferred: function (contentId, deferred) {
            _getContent(contentId).deactivateDeferred = deferred;
        },

        addVirtualContent: function (contentId, visuId) {
            if (_getContent(contentId) === undefined) {
                var content = {
                    id: contentId,
                    virtual: true,
                    visuId: visuId
                };
                _initializeContent(content);
                VisuModel.addContent(contentId, content);
            }
        }
    },
    STATE = {};

    Utils.defineProperty(STATE, 'notExistent', -2);
    Utils.defineProperty(STATE, 'deactivated', -1);
    Utils.defineProperty(STATE, 'initialized', 0);
    Utils.defineProperty(STATE, 'activatePending', 1);
    Utils.defineProperty(STATE, 'active', 2);
    Utils.defineProperty(controller, 'STATE', STATE);

    function _contentActivatedHandler(e) {
        var content = _getContent(e.detail.contentId);
        if (content && content.activeState > STATE.initialized) {
            controller.setActiveState(e.detail.contentId, STATE.active);
            if (content.activateDeferred !== undefined) {
                content.activateDeferred.resolve(content.id);
                content.activateDeferred = undefined;
            }
            document.body.dispatchEvent(new CustomEvent(BreaseEvent.INITIAL_VALUE_CHANGE_FINISHED, { detail: { contentId: content.id } }));
            document.body.dispatchEvent(new CustomEvent(BreaseEvent.CONTENT_ACTIVATED, { detail: { contentId: content.id } }));
        }
    }

    function _contentDeactivatedHandler(e) {
        var content = _getContent(e.detail.contentId);
        if (content && content.activeState < STATE.initialized) {
            if (content.deactivateDeferred !== undefined) {
                content.deactivateDeferred.resolve(content.id);
                content.deactivateDeferred = undefined;
            }
        }
    }

    function _getContent(contentId) {
        var content = VisuModel.getContentById(contentId);
        if (content !== undefined && content.state === undefined) {
            _initializeContent(content);
        }
        return content;
    }

    function _initializeContent(content) {
        content.state = STATE.initialized;
        content.count = 0;
        content.bindings = [];
        content.events = [];
    }

    return controller;
});