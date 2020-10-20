/*global brease, CustomEvent,define,console*/
define(['brease/config', 'brease/events/BreaseEvent', 'brease/enum/Enum', 'brease/core/Utils', 'brease/datatype/Notification', 'brease/controller/ContentManager', 'brease/core/Types'], function (config, BreaseEvent, Enum, Utils, NotificationType, contentManager, Types) {

    'use strict';

    var _elementIndex = {},
        _contentIndex = {},
        _eventIndex = {},
        _sessionEventIndex = {},
        _cachedSessionEventIndex = {},
        _runtimeService,

    bindingController = {
        init: function (runtimeService, settings) {
            this.settings = settings;
            _runtimeService = runtimeService;
            runtimeService.addEventListener('PropertyValueChanged', _serverChangeHandler);
            document.body.addEventListener(BreaseEvent.ATTRIBUTE_CHANGE, _attributeChangeListener);
            document.body.addEventListener(BreaseEvent.NODE_ATTRIBUTE_CHANGE, _nodeAttributeChangeListener);
            contentManager.init(runtimeService);
        },

        startListen: function () {
            document.body.addEventListener(BreaseEvent.VISU_ACTIVATED, _visuActivatedListener);
            document.body.addEventListener(BreaseEvent.VISU_DEACTIVATED, _visuActivatedListener);
        },

        /**
        * @method activateVirtualContent
        * activate virtual content with given contentId
        * @param {String} contentId
        * @param {String} visuId
        */
        activateVirtualContent: function (contentId, visuId) {
            contentManager.addVirtualContent(contentId, visuId);
            return bindingController.activateContent(contentId);
        },

        /**
        * @method activateContent
        * activate content with given contentId
        * @param {String} contentId
        */
        activateContent: function (contentId) {

            var deferred = $.Deferred(),
                content = contentManager.setLatestRequest(contentId, 'activate');

            if (content) {
                contentManager.setActiveState(contentId, contentManager.STATE.activatePending);
                window.performanceMonitor.profile('activateContent - ' + contentId + '', 0);
                _runtimeService.activateContent(contentId, content.visuId, _activateContent_responseHandler, { requestId: content.latestRequest, contentId: contentId, deferred: deferred });
            } else {
                deferred.resolve(contentId);
            }
            return deferred.promise();
        },

        loadSubscriptions: function (contentId, deferred) {
            var content = contentManager.setLatestRequest(contentId, 'loadSubscriptions');
            if (content) {
                if (contentManager.isBindingLoaded(contentId) !== true) {
                    $.when(
                        bindingController.loadBindingSubscriptions(contentId, content.latestRequest),
                        bindingController.loadEventBindingSubscriptions(contentId, content.latestRequest))
                    .then(function () {
                        if (contentManager.getActiveState(contentId) > contentManager.STATE.initialized) {
                            contentManager.setBindingLoadState(contentId, true);
                            window.performanceMonitor.profile('activateContent - ' + contentId + '', 1);
                            deferred.resolve(contentId);
                        }
                    });

                } else {
                    if (_cachedSessionEventIndex[contentId] !== undefined) {
                        _sessionEventIndex[contentId] = _cachedSessionEventIndex[contentId];
                        delete _cachedSessionEventIndex[contentId];
                    }
                    window.performanceMonitor.profile('activateContent - ' + contentId + '', 1);
                    deferred.resolve(contentId);
                }
            } else {
                deferred.resolve(contentId);
            }
            return deferred.promise();
        },

        isBindingLoaded: function (contentId) {
            return contentManager.isBindingLoaded(contentId);
        },

        isContentActive: function (contentId) {
            return contentManager.isContentActive(contentId);
        },

        loadBindingSubscriptions: function (contentId, requestId) {
            var deferred = $.Deferred(),
                content = contentManager.getContent(contentId);
            if (content) {
                window.performanceMonitor.profile('loadBindingSubscriptions - ' + contentId + '', 0);
                _runtimeService.getSubscription(contentId, content.visuId, _loadBindingSubscriptions_responseHandler, { requestId: requestId, contentId: contentId, deferred: deferred });
            } else {
                deferred.resolve(contentId);
            }
            return deferred.promise();
        },

        loadEventBindingSubscriptions: function (contentId, requestId) {
            var deferred = $.Deferred(),
                content = contentManager.getContent(contentId);
            if (content) {
                window.performanceMonitor.profile('loadEventBindingSubscriptions - ' + contentId + '', 0);
                _runtimeService.getEventSubscription(contentId, content.visuId, _loadEventBindingSubscriptions_responseHandler, { requestId: requestId, contentId: contentId, deferred: deferred });
            } else {
                deferred.resolve(contentId);
            }
            return deferred.promise();

        },

        sendInitialValues: function (contentId, callback) {
            var widgetIDs,
                subscriptions, subscription,
                arChanges = [], values, widgetId, widget,
                readyDef = $.Deferred(),
                content = contentManager.setLatestRequest(contentId, 'attach');

            if (content) {
                if (contentManager.hasSubscriptions(contentId)) {
                    widgetIDs = contentManager.getSubscriptions(contentId);
                    for (var i = 0, wL = widgetIDs.length; i < wL; i += 1) {
                        widgetId = widgetIDs[i];
                        widget = brease.uiController.callWidget(widgetId, 'widget');
                        subscriptions = bindingController.getSubscriptionsForElement(widgetId);
                        if (widget !== null) {
                            for (var attr in subscriptions) {
                                subscription = subscriptions[attr];
                                if (subscription !== undefined) {
                                    values = _valuesForSubscription(widget, subscription, widgetId, attr);
                                    if (values) {
                                        arChanges.push(values);
                                    }
                                }
                            }
                        }
                    }
                    contentManager.setActivateDeferred(contentId, readyDef);
                    _processAttributeChanges(arChanges);
                }

                else {
                    readyDef.resolve(contentId);
                }


                readyDef.done(function (contentId) {
                    //console.log('readyDef.done:', contentId);
                    if (typeof callback === 'function') {
                        callback(contentId);
                    }
                });
            } else {
                if (typeof callback === 'function') {
                    callback(contentId);
                }
            }
        },

        deactivateContent: function (contentId, callback) {
            var readyDef = $.Deferred(),
                content = contentManager.setLatestRequest(contentId, 'detach');

            if (content) {
                contentManager.setActiveState(contentId, contentManager.STATE.deactivated);
                window.performanceMonitor.profile('deactivateContent - ' + contentId + '', 0);
                contentManager.setDeactivateDeferred(contentId, readyDef);
                _runtimeService.deactivateContent(contentId, content.visuId, _deactivateContentResponseHandler, { requestId: content.latestRequest, contentId: contentId });
                _deactivateSubscriptions(contentId);
                readyDef.done(function (contentId) {
                    if (typeof callback === 'function') {
                        callback(contentId);
                    }
                });

                if (_sessionEventIndex[contentId] !== undefined) {
                    _cachedSessionEventIndex[contentId] = _sessionEventIndex[contentId];
                    delete _sessionEventIndex[contentId];
                }
            } else {
                if (typeof callback === 'function') {
                    callback(contentId);
                }
            }
        },

        getSubscriptionsForElement: function (elemId, attribute) {

            if (_elementIndex[elemId] !== undefined) {
                if (attribute !== undefined) {
                    return _elementIndex[elemId][attribute];
                } else {
                    return _elementIndex[elemId];
                }
            }
            return undefined;
        },

        contentHasSubscriptions: function (contentId) {
            return contentManager.hasSubscriptions(contentId);
        },

        getEventsForElement: function (elemId, event) {

            if (_eventIndex[elemId] !== undefined) {
                if (event !== undefined) {
                    return _eventIndex[elemId][event];
                } else {
                    return _eventIndex[elemId];
                }
            }
            return undefined;
        },

        getEventsForSession: function (event) {
            var keys = Object.keys(_sessionEventIndex),
                index;

            for (var scope in keys) {
                var scopeId = keys[scope];
                index = _sessionEventIndex[scopeId].indexOf(event);

                if (index !== -1) {
                    return _sessionEventIndex[scopeId][index];
                }
            }


            return undefined;
        },

        // deprecated
        pageHasEvents: function (contentId) {
            return contentManager.hasEvents(contentId);
        },

        contentHasEvents: function (contentId) {
            return contentManager.hasEvents(contentId);
        },

        allActive: function (contents) {
            return contentManager.allActive(contents);
        }
    };

    function _deactivateSubscriptions(contentId) {
        var content = _contentIndex[contentId];
        for (var elemId in content) {
            for (var attr in content[elemId]) {
                content[elemId][attr].active = false;
            }
        }
    }

    function _activateContent_responseHandler(responseData, callbackInfo) {

        if (callbackInfo.requestId === contentManager.getLatestRequest(callbackInfo.contentId) && contentManager.getActiveState(callbackInfo.contentId) > contentManager.STATE.initialized) {

            if (responseData.success === true) {
                bindingController.loadSubscriptions(callbackInfo.contentId, callbackInfo.deferred);
                brease.loggerService.log(Enum.EventLoggerId.CLIENT_BINDING_ATTACH_OK, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.LOW, Enum.EventLoggerSeverity.SUCCESS, [callbackInfo.contentId]);
            } else {
                console.iatWarn('activateContent for content "' + callbackInfo.contentId + '" failed, possibly no binding defined!');
                callbackInfo.deferred.resolve(callbackInfo.contentId);
                brease.loggerService.log(Enum.EventLoggerId.CLIENT_BINDING_ATTACH_FAIL, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.LOW, Enum.EventLoggerSeverity.ERROR, [callbackInfo.contentId]);
            }
        } else {
            console.iatWarn('activateContent for content "' + callbackInfo.contentId + '" aborted!');
        }
    }

    function _loadBindingSubscriptions_responseHandler(responseData, callbackInfo) {

        //console.log('getSubscription,response:', responseData, callbackInfo);
        if (callbackInfo.requestId === contentManager.getLatestRequest(callbackInfo.contentId)) {
            if (responseData.subscriptions !== undefined) {
                _addSubscriptions(callbackInfo.contentId, responseData.subscriptions);
            } else {
                console.iatInfo('no subscription for content "' + callbackInfo.contentId + '" available!');
                brease.loggerService.log(Enum.EventLoggerId.CLIENT_BINDING_ID_NOTFOUND, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.LOW, Enum.EventLoggerSeverity.WARNING, [callbackInfo.contentId]);
            }
            document.body.dispatchEvent(new CustomEvent(BreaseEvent.BINDING_LOADED, { detail: { contentId: callbackInfo.contentId } }));
            window.performanceMonitor.profile('loadSubscriptions - ' + callbackInfo.contentId + '', 1);
            callbackInfo.deferred.resolve();
        } else {
            console.iatWarn('loadSubscriptions for content "' + callbackInfo.contentId + '" aborted!');
        }
    }

    function _loadEventBindingSubscriptions_responseHandler(responseData, callbackInfo) {
        //console.log('getEventSubscription,response:', responseData, callbackInfo);

        if (callbackInfo.requestId === contentManager.getLatestRequest(callbackInfo.contentId)) {
            if (responseData !== undefined && responseData.success === true) {
                _addEventSubscriptions(callbackInfo.contentId, responseData.eventSubscriptions);

            } else {
                console.iatInfo('no event subscription for content "' + callbackInfo.contentId + '" available!');
            }
            document.body.dispatchEvent(new CustomEvent(BreaseEvent.EVENTBINDING_LOADED, { detail: { contentId: callbackInfo.contentId } }));
            window.performanceMonitor.profile('loadEventBindingSubscriptions - ' + callbackInfo.contentId, 1);
            callbackInfo.deferred.resolve();

        } else {
            console.iatWarn('loadEventSubscription for content "' + callbackInfo.contentId + '" aborted!');
        }
    }

    function _loadSessionEventSubscriptions_responseHandler(responseData) {
        _sessionEventIndex['_session'] = [];

        if (responseData !== undefined && responseData.success === true) {
            for (var i = 0; i < responseData.eventSubscriptions.length; i += 1) {
                _sessionEventIndex['_session'].push(responseData.eventSubscriptions[i].event);
            }

        } else {
            console.iatInfo('no event subscription for session available!');
        }
    }

    function _deactivateContentResponseHandler(responseData, callbackInfo) {

        window.performanceMonitor.profile('deactivateContent - ' + callbackInfo.contentId + '', 1);
        if (responseData.success) {
            brease.loggerService.log(Enum.EventLoggerId.CLIENT_BINDING_DETACH_OK, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.LOW, Enum.EventLoggerSeverity.SUCCESS, [callbackInfo.contentId]);
        } else {
            brease.loggerService.log(Enum.EventLoggerId.CLIENT_BINDING_DETACH_FAIL, Enum.EventLoggerCustomer.BUR, Enum.EventLoggerVerboseLevel.LOW, Enum.EventLoggerSeverity.ERROR, [callbackInfo.contentId]);
        }
    }

    function _valuesForSubscription(widget, subscription, widgetId, attr) {

        var retVal, data;

        if (attr.indexOf(':') === -1) {
            data = brease.uiController.callWidget(widgetId, Utils.getter(attr), attr);

            if (data !== null && data !== undefined) {
                if (NotificationType.prototype.isPrototypeOf(data)) {
                    retVal = { subscription: subscription, data: [], type: "notification" };
                }

                else {
                    retVal = { subscription: subscription, data: data };
                }
            }
            else if (data === undefined) {
                retVal = { subscription: subscription, data: null };
                console.iatWarn('undefined value {widgetId:"' + widgetId + '", attribute:"' + attr + '"}');
            }
            else {
                retVal = { subscription: subscription, data: null };
                console.iatWarn('getter null {widgetId:"' + widgetId + '", attribute:"' + attr + '"}');
            }
        }
        return retVal;
    }

    function _serverChangeHandler(e) {

        var arItems = e.detail,
            itemLength = arItems.length;

        if (itemLength > 0) {

            for (var i = 0; i < itemLength; i += 1) {

                var widgetId = arItems[i].refId,
                    arData = arItems[i].data;

                for (var j = 0, l = arData.length; j < l; j += 1) {
                    try {
                        var subscription = bindingController.getSubscriptionsForElement(widgetId, arData[j].attribute);
                        if (subscription) {
                            _setWidgetProperty(widgetId, arData[j].attribute, arData[j].value, subscription);
                        } else {
                            console.iatWarn('no subscription for attribute "' + arData[j].attribute + ', widgetId=' + widgetId);
                        }
                    } catch (er) {
                        console.warn("error processing property", er);
                    }

                }
            }
        }
    }

    function _setWidgetProperty(widgetId, attribute, value, subscription) {
        if (attribute === undefined) {
            console.iatWarn('binding for widget[' + widgetId + ']: no binding attribute given');
        } else {
            var widget = brease.callWidget(widgetId, 'widget');

            if (widget !== null) {
                var metaData = {
                    origin: 'server'
                };
                if (attribute.indexOf('::') !== -1) {
                    var attr = attribute.split('::');
                    metaData.attribute = attr[0];
                    metaData.refAttribute = attr[1];
                } else {
                    metaData.attribute = attribute;
                }
                var methodName = Utils.setter(metaData.attribute);
                if (widget[methodName] !== undefined) {

                    metaData.value = _parseValue(value, widget.constructor, methodName, metaData.attribute, widgetId);

                    subscription.active = true;
                    widget[methodName].call(widget, metaData.value, metaData);
                    widget.dispatchEvent(new CustomEvent(BreaseEvent.PROPERTY_CHANGED, { detail: { attribute: metaData.attribute, value: metaData.value } }));

                } else {
                    console.iatWarn('binding for widget[' + widgetId + ']: unknown binding method "' + methodName + '"');
                }
            }
        }
    }

    function _parseValue(value, WidgetClass, methodName, attrName, widgetId) {

        if (!Utils.isString(value)) {
            return value;
        }

        var actionName = methodName.substring(0, 1).toUpperCase() + methodName.substring(1);

        if (WidgetClass.meta === undefined || WidgetClass.meta.actions === undefined || (WidgetClass.meta.actions[actionName] === undefined && WidgetClass.meta.actions[methodName] === undefined)) {
            return value;
        }
        var action = (WidgetClass.meta.actions[actionName]) ? WidgetClass.meta.actions[actionName] : WidgetClass.meta.actions[methodName];
        if (!action) {
            return value;
        }
        var parameter = action.parameter,
            param = parameter[Object.keys(parameter)[0]];

        if (!param || Types.objectTypes.indexOf(param.type) === -1) {
            return value;
        }

        try {
            value = JSON.parse(value.replace(/\'/g, '"'));
        } catch (e) {
            console.iatWarn('illegal data in binding: attribute: ' + attrName + ', widgetId:' + widgetId);
        }

        return value;
    }

    function _attributeChangeListener(e) {
        var widgetId = e.target.id,
            widgetSubscriptions = bindingController.getSubscriptionsForElement(widgetId);

        if (widgetSubscriptions !== undefined) {
            for (var attribute in widgetSubscriptions) {

                if (e.detail.hasOwnProperty(attribute)) {
                    var subscription = widgetSubscriptions[attribute];

                    // A&P 509115: widgets duerfen erst ein ValueChange schicken, wenn der content aktiv ist (ContentActivated)
                    if (subscription !== undefined && (contentManager.isContentActive(subscription.contentId) || subscription.active)) {
                        _processAttributeChange(subscription, e.detail[attribute]);
                    }
                }
            }
        }
    }

    function _nodeAttributeChangeListener(e) {
        //console.debug('_nodeAttributeChangeListener:', e.target.id, e.detail);
        var widgetId = e.target.id,
            widgetSubscriptions = bindingController.getSubscriptionsForElement(widgetId);

        if (widgetSubscriptions !== undefined) {
            for (var attribute in widgetSubscriptions) {

                if (e.detail.attribute === attribute) {
                    var subscription = widgetSubscriptions[attribute];

                    // A&P 509115: widgets duerfen erst ein ValueChange schicken, wenn der content aktiv ist (ContentActivated)
                    if (subscription !== undefined && (contentManager.isContentActive(subscription.contentId) || subscription.active)) {
                        _processNodeChange(subscription, e.detail.nodeAttribute, e.detail.value);
                    }
                }
            }
        }
    }

    function _processAttributeChanges(arChanges) {
        //console.log('_processAttributeChanges:', arChanges);
        var update = {
            "event": "PropertyValueChanged",
            "eventArgs": []
        },
            data;

        for (var i = 0; i < arChanges.length; i += 1) {


            if (arChanges[i].type !== undefined) {
                data = [{
                    attribute: arChanges[i].subscription.attribute,
                    value: arChanges[i].data,
                    type: arChanges[i].type
                }];
            }
            else {
                data = [{
                    attribute: arChanges[i].subscription.attribute,
                    value: arChanges[i].data
                }];
            }

            update.eventArgs.push({
                refId: arChanges[i].subscription.bindingId,
                data: data
            });
        }
        _runtimeService.sendUpdate([update]);
    }

    function _processAttributeChange(subscription, value) {

        _runtimeService.sendUpdate([{
            "event": "PropertyValueChanged",
            "eventArgs": [{
                refId: subscription.bindingId,
                data: [{
                    attribute: subscription.attribute,
                    value: value
                }]
            }]
        }]);

    }

    function _processNodeChange(subscription, nodeAttribute, value) {

        var singleUpdate = {
            refId: subscription.bindingId,
            data: [{
                "attribute": subscription.attribute
            }]
        },
        update = {
            "eventArgs": [singleUpdate]
        };
        if (nodeAttribute === 'unit') {
            update.event = "PropertyUnitChanged";
            singleUpdate.data[0][nodeAttribute] = value;
            _runtimeService.sendUpdate([update]);
        }

    }

    function _addSubscriptions(contentId, subscriptions) {
        var sl = subscriptions.length,
            subscription;

        if (sl > 0) {

            for (var i = 0; i < sl; i += 1) {
                subscription = subscriptions[i];
                _addSubscription({
                    contentId: contentId,
                    elemId: subscription.refId,
                    bindingId: subscription.refId,
                    attribute: subscription.attribute
                });
            }
        }
    }

    function _addSubscription(subscription) {

        var elemId = subscription.elemId;

        if (_elementIndex[elemId] === undefined) {
            _elementIndex[elemId] = {};
        }
        _elementIndex[subscription.elemId][subscription.attribute] = subscription;

        if (_contentIndex[subscription.contentId] === undefined) {
            _contentIndex[subscription.contentId] = {};
        }
        _contentIndex[subscription.contentId][subscription.elemId] = _elementIndex[subscription.elemId];

        contentManager.addSubscription(subscription.contentId, subscription.elemId);
    }

    function _addEventSubscriptions(scopeId, subscriptions) {
        var sl = subscriptions.length,
            subscription, subscrData;

        if (sl > 0) {

            for (var i = 0; i < sl; i += 1) {
                subscription = subscriptions[i];
                if (subscription.refId !== undefined) {
                    subscrData = {
                        scopeId: scopeId,
                        elemId: subscription.refId,
                        eventId: subscription.refId,
                        event: subscription.event
                    };

                    _addEventSubscription(subscrData);
                } else {
                    subscrData = {
                        scopeId: scopeId,
                        event: subscription.event
                    };
                    _addClientSystemEventSubscription(subscrData);
                }

            }
        }
    }

    function _addEventSubscription(subscription) {
        //console.debug('_addSubscription:', subscription);

        if (_eventIndex[subscription.elemId] === undefined) {
            _eventIndex[subscription.elemId] = {};
        }
        if (_eventIndex[subscription.elemId][subscription.event] === undefined) {
            _eventIndex[subscription.elemId][subscription.event] = {};
        }

        _eventIndex[subscription.elemId][subscription.event] = subscription;

        contentManager.addEventSubscription(subscription.scopeId, subscription.elemId);
    }

    function _addClientSystemEventSubscription(subscription) {
        //console.debug('_addSubscription:', subscription);

        if (_sessionEventIndex[subscription.scopeId] === undefined) {
            _sessionEventIndex[subscription.scopeId] = [];
        }
        if (_sessionEventIndex[subscription.scopeId].indexOf(subscription.event) === -1) {
            _sessionEventIndex[subscription.scopeId].push(subscription.event);
        }
    }

    function _visuActivatedListener() {
        _runtimeService.getSessionEventSubscription(_loadSessionEventSubscriptions_responseHandler);
    }

    return bindingController;

});