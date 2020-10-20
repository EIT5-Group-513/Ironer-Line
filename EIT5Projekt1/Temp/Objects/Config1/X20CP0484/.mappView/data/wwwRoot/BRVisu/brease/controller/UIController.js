/*global define,brease*/
define(['brease/config', 'brease/core/WidgetFactory', 'brease/events/BreaseEvent', 'brease/core/Utils'], function (config, factory, BreaseEvent, Utils) {
    'use strict';

    /**
    * @class brease.controller.UIController
    * @extends core.javascript.Object
    * Main ui controller; instance is available via brease.uiController
    * It provides methods to manipulate parts of the DOM, e.g. adding and removing widgets.
    * Example of usage:
    *
    *     <script>
    *         brease.uiController.dispose(document.getElementById('container'));
    *     </script>
    *
    * @singleton
    */
    var UIController = function UIController() {
    },
    p = UIController.prototype;

    p.init = function init(settings, bindingController, widgetsController) {
        widgetsController.init();
        this.bindingController = bindingController;
        this.widgetsController = widgetsController;
        factory.init(widgetsController);
    };

    Utils.defineProperty(p, 'setOptions', function setOptions(id, value) {
        this.widgetsController.setOptions(id, value);
    });

    /**
    * @method loadValuesForContent
    * Method to cause server to send bound values for content with given contentId
    * @param {String} contentId
    */
    Utils.defineProperty(p, 'loadValuesForContent', function loadValuesForContent(contentId, callback) {
        var instance = this;
        $.when(
            this.bindingController.activateContent(contentId)
        ).then(function successHandler() {
            if (typeof callback === 'function') {
                callback();
            }
            instance.bindingController.sendInitialValues(contentId);
        });
    });

    /**
    * @method loadValuesForVirtualContent
    * Method to cause server to send bound values for virtual content with given contentId
    * @param {String} contentId
    * @param {String} visuId
    */
    Utils.defineProperty(p, 'loadValuesForVirtualContent', function loadValuesForVirtualContent(contentId, callback, visuId) {
        var instance = this;
        $.when(
            this.bindingController.activateVirtualContent(contentId, visuId)
        ).then(function successHandler() {
            if (typeof callback === 'function') {
                callback();
            }
            instance.bindingController.sendInitialValues(contentId);
        });
    });

    /**
    * @method getSubscriptionsForElement
    * Method to get subscriptions for widget
    * @param {String} widgetId
    * @return {Object}
    */
    Utils.defineProperty(p, 'getSubscriptionsForElement', function getSubscriptionsForElement(widgetId) {
        return this.bindingController.getSubscriptionsForElement(widgetId);
    });

    /**
    * @method parse
    * Parse an HTML element (elem) and/or its innerHTML
    * That means: every HTML element within elem, which has a valid 'data-brease-widget' attribute, is converted to a widget
    * @param {HTMLElement} elem HTML element which has to be parsed
    * @param {Boolean} andSelf if true: include HTML element itself in parsing; if false, only innerHTML is parsed
    */
    Utils.defineProperty(p, 'parse', function parse() {
        factory.parse.apply(factory, arguments);
    });

    /**
    * @method dispose
    * dispose a HTML element (elem) and/or its innerHTML
    * That means: every HTML element within elem, which has a valid 'data-brease-widget' attribute, is disposed
    * @param {HTMLElement} elem HTML element which has to be disposed
    * @param {Boolean} andSelf if true: include HTML element itself in disposing; if false, only innerHTML is disposed
    * @param {Function} callback
    */
    Utils.defineProperty(p, 'dispose', function dispose() {
        factory.dispose.apply(factory, arguments);
    });
    Utils.defineProperty(p, 'wake', function wake() {
        factory.wake.apply(factory, arguments);
    });
    Utils.defineProperty(p, 'suspend', function suspend() {
        factory.suspend.apply(factory, arguments);
    });

    /**
    * @method callWidget
    * invoke methods of widgets
    * @param {String} id id of widget
    * @param {String} method name of method
    * @paramComment First two parameters are required, more are optional, dependent on the method invoked.
    * @return {ANY} returnValue return value of method. Data type depends on the method invoked.
    */
    Utils.defineProperty(p, 'callWidget', function callWidget() {
        return factory.callWidget.apply(factory, arguments);
    });

    /**
    * @method createWidgets
    * method for dynamic widget creation
    * @param {HTMLElement} target HTML element where created widget elements are appended
    * @param {WidgetConfig[]} arWidgets Array of config objects
    * @param {Boolean} [autoParse=true] If set to false, only HTML-tags are added to target, if set to true target will be parsed after HTML insertion.
    * @param {String} [contentId] Optional contentId where 'target' belongs to. Use null, if you want to use more arguments and don't want to determine a contentId.  
    * @param {String} [addBeforeSelector] If specified, widgets are inserted before the node document.querySelector(addBeforeSelector). This node has to be a child of 'target'.  
    */
    Utils.defineProperty(p, 'createWidgets', function createWidgets() {
        factory.createWidgets.apply(factory, arguments);
    });


    /**
    * @method findWidgets
    * method to find widget elements in a container
    * @param {HTMLElement} container HTML element where to search
    * @param {Boolean} [andSelf=false] include container in result list
    * @param {brease.enum.WidgetState} [minimalState=Enum.WidgetState.INITIALIZED] minimal state of included widgets (>=) 
    */
    Utils.defineProperty(p, 'findWidgets', function findWidgets() {
        return factory.findWidgets.apply(factory, arguments);
    });

    Utils.defineProperty(p, 'addWidget', function addWidget(widget) {

        if (widget.elem && widget.elem.id) {
            this.widgetsController.addWidget(widget);
        } else {
            throw new SyntaxError("widget needs property 'elem' with id");
        }
    });

    /**
    * @method getWidgetState
    * method to get widget state
    * @param {String} id id of widget
    * @return {brease.enum.WidgetState}
    */
    Utils.defineProperty(p, 'getWidgetState', function getWidgetState(id) {
        return this.widgetsController.getState(id);
    });

    Utils.defineProperty(p, 'addWidgetOption', function addWidgetOption(id, key, value) {
        this.widgetsController.addOption(id, key, value);
    });

    /**
    * @method parentWidgetId
    * Returns id of parent widget.
    * @param {HTMLElement} elem
    * @return {String} Id of parent widget. If there exists no parent widget, method returns id of application container ("appContainer"). If elem is a widget itself, method returns id of elem.
    */
    Utils.defineProperty(p, 'parentWidgetId', function parentWidgetId(elem) {

        if (Utils.hasClass(elem, 'breaseWidget')) {
            return elem.id;
        } else {
            var parentWidgets = $(elem).parents('.breaseWidget');
            if (parentWidgets.length > 0) {

                return parentWidgets[0].id;
            } else {
                return brease.appElem.id;
            }
        }
    });

    return new UIController();
});