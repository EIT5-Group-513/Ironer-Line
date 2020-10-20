/*global define,brease,CustomEvent*/
define(function () {

    'use strict';

    /**
    * @class brease.controller.ConnectionController
    * @extends Object
    * controls server connections
    * @singleton
    */
    var ConnectionController = {
        init: function (runtimeService, systemMessage, reconnectHandler, transferFinishedHandler) {
            if (reconnectHandler !== undefined) {
                _reconnectHandler = reconnectHandler;
            }
            if (transferFinishedHandler !== undefined) {
                _transferFinishedHandler = transferFinishedHandler;
            }
            runtimeService.addEventListener('ConnectionStateChanged', _connectionStateChangedHandler.bind(this, systemMessage));
            runtimeService.addEventListener('TransferStart', _transferStartHandler.bind(this, systemMessage));
            runtimeService.addEventListener('TransferFinish', _transferFinishHandler.bind(this, systemMessage));
        }
    },
    _transferInProcess = false;

    function _connectionStateChangedHandler(systemMessage, e) {
        if (e.detail.state === true) {
            systemMessage.clear();
            _reconnectHandler();
        } else if (_transferInProcess !== true) {
            document.body.dispatchEvent(new CustomEvent('ConnectionStateChanged', { detail: { state: e.detail.state } }));
            systemMessage.showMessage(brease.language.getSystemTextByKey('BR/IAT/brease.common.connectionError.text'));
        }
    }

    function _transferStartHandler(systemMessage) {
        _transferInProcess = true;
        systemMessage.showMessage(brease.language.getSystemTextByKey('BR/IAT/brease.common.transferStart'));
    }

    function _transferFinishHandler(systemMessage) {
        _transferInProcess = false;
        systemMessage.clear();
        _transferFinishedHandler();
    }

    function _transferFinishedHandler() {
        window.location.reload();
    }

    function _reconnectHandler() {
        window.location.reload();
    }

    return ConnectionController;

});