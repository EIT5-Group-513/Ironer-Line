/*global define,console*/
define(["brease/helper/XHRPool"], function (XHRPool) {

    'use strict';

    var _baseUrl = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port,
		_path = {
		    activateVisu: _baseUrl + '/services/activateVisu',
		    deactivateVisu: _baseUrl + '/services/deactivateVisu',
		    activateContent: _baseUrl + '/services/activateContent',
		    deactivateContent: _baseUrl + '/services/deactivateContent',
		    getSubscription: _baseUrl + '/services/getSubscription',
		    getEventSubscription: _baseUrl + '/services/getEventSubscription',
		    getSessionEventSubscription: _baseUrl + '/services/getSessionEventSubscription',
		    loadLanguages: _baseUrl + '/services/getLanguages',
		    switchLanguage: _baseUrl + '/services/switchLanguage',
		    loadTexts: _baseUrl + '/services/getText',
		    loadSystemTexts: _baseUrl + '/services/getSystemTexts',
		    getAllUnitSymbols: _baseUrl + '/services/getAllUnitSymbols',
		    getUnitSymbols: _baseUrl + '/services/getUnitSymbols',
		    loadMeasurementSystemList: _baseUrl + '/services/getMeasurementSystemList',
		    switchMeasurementSystem: _baseUrl + '/services/setMeasurementSystem',
		    loadCultures: _baseUrl + '/services/loadCultures',
		    switchCulture: _baseUrl + '/services/switchCulture',
		    logEvents: _baseUrl + '/services/sendEventLog',
		    authenticate: _baseUrl + '/services/authenticate',
		    setCurrentUser: _baseUrl + '/services/setCurrentUser',
		    loadCurrentUser: _baseUrl + '/services/getCurrentUser',
		    setDefaultUser: _baseUrl + '/services/setDefaultUser',
		    userHasRoles: _baseUrl + '/services/userHasRoles',
		    loadUserRoles: _baseUrl + '/services/getUserRoles',
		    setClientInformation: _baseUrl + '/services/setClientInformation',
		    formatText: _baseUrl + '/services/format',
		    registerclient: _baseUrl + '/services/registerclient',
		    loadConfiguration: _baseUrl + '/services/getConfiguration',
		    opcuaReadNodeHistory: _baseUrl + '/services/opcua/readHistory',
		    opcuaReadHistoryCount: _baseUrl + '/services/opcua/readHistoryCount',
		    opcuaReadHistoryStart: _baseUrl + '/services/opcua/readHistoryStart',
		    opcuaReadHistoryEnd: _baseUrl + '/services/opcua/readHistoryEnd',
		    opcuaBrowse: _baseUrl + '/services/opcua/browse',
		    opcuaCallMethod: _baseUrl + '/services/opcua/callMethod',
		    opcuaRead: _baseUrl + '/services/opcua/read'
		};

    return {

        /************************
        *** BINDING related ****
        ************************/
        activateVisu: function (visuId, callback, callbackInfo) {
            if (visuId !== undefined) {
                var request = XHRPool.getXHR(callbackInfo);
                request.open("GET", _path.activateVisu + "?visuId=" + visuId);
                request.send(null, callback);
            } else {
                console.iatWarn('undefined visuId in method activateVisu');
            }
        },

        deactivateVisu: function (visuId, callback, callbackInfo) {
            if (visuId !== undefined) {
                var request = XHRPool.getXHR(callbackInfo);
                request.open("GET", _path.deactivateVisu + "?visuId=" + visuId);
                request.send(null, callback);
            } else {
                console.iatWarn('undefined visuId in method deactivateVisu');
            }
        },

        deactivateContent: function (contentId, visuId, callback, callbackInfo) {
            if (contentId !== undefined) {
                var request = XHRPool.getXHR(callbackInfo);
                request.open("GET", _path.deactivateContent + "?contentId=" + contentId + "&visuId=" + visuId);
                request.send(null, callback);
            } else {
                console.iatWarn('undefined contentId in method deactivateContent');
            }
        },

        getSubscription: function (contentId, visuId, callback, callbackInfo) {
            if (contentId !== undefined) {
                var request = XHRPool.getXHR(callbackInfo);
                request.open("GET", _path.getSubscription + "?contentId=" + contentId + "&visuId=" + visuId);
                request.send(null, callback);
            } else {
                console.iatWarn('undefined contentId in method getSubscription');
            }
        },

        activateContent: function (contentId, visuId, callback, callbackInfo) {
            if (contentId !== undefined) {
                var request = XHRPool.getXHR(callbackInfo);
                request.open("GET", _path.activateContent + "?contentId=" + contentId + "&visuId=" + visuId);
                request.send(null, callback);
            } else {
                console.iatWarn('undefined contentId in method activateContent');
            }
        },

        loadConfiguration: function (callback, callbackInfo) {
            var request = XHRPool.getXHR(callbackInfo);
            request.open("GET", _path.loadConfiguration);
            request.send(null, callback);
        },

        loadVisuData: function (visuId, callback, callbackInfo) {
            $.getJSON('/' + visuId + '.json', function (data) {
                callback({
                    success: true,
                    visuData: data
                }, callbackInfo);
            }).fail(function (jqxhr, textStatus, error) {
                console.log("error:" + JSON.stringify({ status: textStatus, errorMessage: error.toString() }));
                callback({ success: false, status: textStatus }, callbackInfo);
            });
        },

        /*#######################
        ### Action Event related ###
        #######################*/

        getEventSubscription: function (contentId, visuId, callback, callbackInfo) {
            if (contentId !== undefined) {
                var request = XHRPool.getXHR(callbackInfo);
                request.open("GET", _path.getEventSubscription + "?contentId=" + contentId + "&visuId=" + visuId);
                request.send(null, callback);
            } else {
                console.iatWarn('undefined contentId in method getEventSubscription');
            }
        },

        getSessionEventSubscription: function (callback, callbackInfo) {
            var request = XHRPool.getXHR(callbackInfo);
            request.open("GET", _path.getSessionEventSubscription);
            request.send(null, callback);

        },

        /********************
        *** TEXT related ****
        *********************/
        loadLanguages: function (callback) {
            var request = XHRPool.getXHR();
            request.open("GET", _path.loadLanguages);
            request.send(null, callback);
        },

        switchLanguage: function (langKey, callback) {
            if (langKey !== undefined) {
                var request = XHRPool.getXHR();
                request.open("GET", _path.switchLanguage + "?language=" + langKey);
                request.send(null, callback);
            }
        },

        loadTexts: function (langKey, callback, callbackInfo) {
            if (langKey !== undefined) {
                var request = XHRPool.getXHR(callbackInfo);
                request.open("GET", _path.loadTexts + "?language=" + langKey);
                request.send(null, callback);
            }
        },

        loadSystemTexts: function (langKey, callback, callbackInfo) {
            if (langKey !== undefined) {
                var request = XHRPool.getXHR(callbackInfo);
                request.open("GET", _path.loadSystemTexts + "?language=" + langKey);
                request.send(null, callback);
            }
        },

        getAllUnitSymbols: function (langKey, callback, callbackInfo) {
            if (langKey !== undefined) {
                var request = XHRPool.getXHR(callbackInfo);
                request.open("GET", _path.getAllUnitSymbols + "?language=" + langKey);
                request.send(null, callback);
            }
        },

        getUnitSymbols: function (langKey, arrCode, callback, callbackInfo) {
            if (langKey !== undefined) {

                var request = XHRPool.getXHR(callbackInfo);
                request.open("POST", _path.getUnitSymbols);
                request.send(JSON.stringify({
                    Data: {
                        "language": langKey,
                        "commonCodes": arrCode
                    }
                }), callback);
            }
        },

        /***********************
        *** CULTURE related ***
        ***********************/
        loadCultures: function (callback) {
            var request = XHRPool.getXHR();
            request.open("GET", _path.loadCultures);
            request.send(null, callback);
        },

        switchCulture: function (key, callback) {
            if (key !== undefined) {
                var request = XHRPool.getXHR();
                request.open("GET", _path.switchCulture + "?culture=" + key);
                request.send(null, callback);
            }
        },

        /***********************
        *** MeasurementSystem related ***
        ***********************/
        loadMeasurementSystemList: function (callback) {
            var request = XHRPool.getXHR();
            request.open("GET", _path.loadMeasurementSystemList);
            request.send(null, callback);
        },

        switchMeasurementSystem: function (key, callback, callbackInfo) {
            if (key !== undefined) {
                var request = XHRPool.getXHR(callbackInfo);
                request.open("GET", _path.switchMeasurementSystem + "?measurementSystem=" + key);
                request.send(null, callback);
            }
        },

        /***********************
        *** EVENTLOGGING related ***
        ***********************/
        logEvents: function (data, callback) {
            var request = XHRPool.getXHR();
            request.open("POST", _path.logEvents);
            request.send(JSON.stringify({
                Data: data
            }), callback);
        },

        /***********************
        *** USER related ***
        ***********************/
        authenticateUser: function (username, password, callback) {
            var request = XHRPool.getXHR(),
                data = {
                    userID: username,
                    password: password
                };
            request.open("POST", _path.authenticate);
            request.send(JSON.stringify({
                Data: data
            }), callback);
        },

        setCurrentUser: function (user, callback) {
            var request = XHRPool.getXHR();
            request.open("POST", _path.setCurrentUser);
            request.send(JSON.stringify({
                Data: {
                    "user": user
                }
            }), callback);
        },

        loadCurrentUser: function (callback) {
            var request = XHRPool.getXHR();
            request.open("GET", _path.loadCurrentUser);
            request.send(null, callback);
        },

        setDefaultUser: function (callback) {
            var request = XHRPool.getXHR();
            request.open("GET", _path.setDefaultUser);
            request.send(null, callback);
        },

        userHasRoles: function (roles, callback) {
            var request = XHRPool.getXHR();
            request.open("POST", _path.userHasRoles);
            request.send(JSON.stringify({
                Data: {
                    "roles": roles
                }
            }), callback);
        },

        loadUserRoles: function (callback, callbackInfo) {
            var request = XHRPool.getXHR(callbackInfo);
            request.open("GET", _path.loadUserRoles);
            request.send(null, callback);
        },

        /*####################
        ### TextFormatter ###
        #####################*/

        formatText: function (text, args, callback) {
            var request = XHRPool.getXHR(),
                data = {
                    formatstring: text,
                    args: args
                };
            request.open("POST", _path.formatText);
            request.send(JSON.stringify({
                Data: data
            }), callback);
        },


        /*#######################
        ### CLIENTINFO ###
        #######################*/
        setClientInformation: function (data) {
            var request = XHRPool.getXHR();
            request.open("POST", _path.setClientInformation);
            request.send(JSON.stringify({ Data: data }));
        },

        registerClient: function (callback, visuId) {
            var request = XHRPool.getXHR();
            request.open("GET", _path.registerclient + ((visuId !== undefined) ? "?visuId=" + visuId : ""));
            request.send(null, callback);
        },


        /*#######################
        ### OPC UA ###
        #######################*/

        opcuaReadNodeHistory: function (data, callback, callbackInfo) {
            var request = XHRPool.getXHR(callbackInfo);
            request.open("POST", _path.opcuaReadNodeHistory);
            request.send(JSON.stringify({ Data: data }), callback);
        },

        opcuaReadHistoryCount: function (data, callback, callbackInfo) {
            var request = XHRPool.getXHR(callbackInfo);
            request.open("POST", _path.opcuaReadHistoryCount);
            request.send(JSON.stringify({ Data: data }), callback);
        },

        opcuaReadHistoryStart: function (data, callback, callbackInfo) {
            var request = XHRPool.getXHR(callbackInfo);
            request.open("POST", _path.opcuaReadHistoryStart);
            request.send(JSON.stringify({ Data: data }), callback);
        },

        opcuaReadHistoryEnd: function (data, callback, callbackInfo) {
            var request = XHRPool.getXHR(callbackInfo);
            request.open("POST", _path.opcuaReadHistoryEnd);
            request.send(JSON.stringify({ Data: data }), callback);
        },

        opcuaBrowse: function (data, callback, callbackInfo) {
            var request = XHRPool.getXHR(callbackInfo);
            request.open("POST", _path.opcuaBrowse);
            request.send(JSON.stringify({ Data: data }), callback);
        },

        opcuaCallMethod: function (data, callback, callbackInfo) {
            var request = XHRPool.getXHR(callbackInfo);
            request.open("POST", _path.opcuaCallMethod);
            request.send(JSON.stringify({ Data: data }), callback);
        },

        opcuaRead: function (data, callback, callbackInfo) {
            var request = XHRPool.getXHR(callbackInfo);
            request.open("POST", _path.opcuaRead);
            request.send(JSON.stringify({ Data: data }), callback);
        }
    };
});