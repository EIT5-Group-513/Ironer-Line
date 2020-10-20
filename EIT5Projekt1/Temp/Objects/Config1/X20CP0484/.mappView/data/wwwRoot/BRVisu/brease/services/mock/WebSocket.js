/*global define,console*/
define(['brease/services/mock/Server'], function (Server) {

    'use strict';

    var _timeoutForSessionActivated = 0;

    return {
        send: function (data) {
            var dataObj;
            try {
                dataObj = JSON.parse(data);
            } catch (e) {
                console.log('PARSE ERROR:' + e.message);
            }

            if (dataObj && dataObj.Command === "update") {
                Server.setData(dataObj.Data);
            }
        },

        getModelData: function (widgetId, attribute) {
            return Server.getModelData(widgetId, attribute);
        },

        start: function (callback) {
            callback(true);
            window.setTimeout(function () {
                var type = "SessionActivated";
                Server.dispatchEvent({ event: type }, type);
            }, _timeoutForSessionActivated);

        },
        startHeartbeat: function () {

        },
        addEventListener: function (eventType, fn) {
            Server.addEventListener(eventType, fn);
        },
        removeEventListener: function (eventType, fn) {
            Server.removeEventListener(eventType, fn);
        },
        triggerServerAction: function (action, target, aId, args) {
            var type = "action";
            Server.dispatchEvent({
                "event": type,
                "detail": {
                    "action": action,
                    "target": target,
                    "actionArgs": args || {},
                    "actionId": aId
                }
            }, type);
        },

        triggerServerChange: function (widgetId, attribute, value) {
            var type = "PropertyValueChanged";
            Server.dispatchEvent({
                "event": type,
                "detail": [
                    {
                        "data": [
                            {
                                "attribute": attribute,
                                "value": value
                            }
                        ],
                        "refId": widgetId
                    }
                ]
            }, type);
        },

        triggerConnectionStateChange: function (state) {
            var type = "ConnectionStateChanged";
            Server.dispatchEvent({
                event: type,
                detail: { state: state }
            }, type);
        },

        triggerContentActivated: function (contentId) {
            var type = "ContentActivated";
            Server.dispatchEvent({
                event: type,
                detail: { contentId: contentId }
            }, type);
        }
    };
});