/*global define*/
define(['brease/core/Utils'], function (Utils) {

    'use strict';

    function WidgetModel(initialState) {
        this.initialState = initialState;
        this.items = {};
        this.contents = {};
    }

    WidgetModel.prototype.add = function (id) {
        if (!id || Utils.isString(id) === false) {
            return undefined;
        }
        return this.items[id] = {
            state: this.initialState
        };
    };

    WidgetModel.prototype.get = function (id) {
        if (!id || Utils.isString(id) === false) {
            return undefined;
        } else {
            return this.items[id];
        }
    };

    WidgetModel.prototype.getOrCreate = function (id) {
        if (!id || Utils.isString(id) === false) {
            return {};
        } else {
            if (this.items[id] === undefined) {
                this.add(id);
            }
            return this.items[id];
        }
    };

    WidgetModel.prototype.delete = function (id) {
        var item = this.items[id];
        if (item) {
            //console.warn('delete:', id);
            if (this.contents[item.contentId]) {
                delete this.contents[item.contentId];
            }
            delete this.items[id]; // use of delete, as =undefined is not memory clean!
            //this.items[id] = undefined; // delete is very slow and prevents browser optimization
        }
    };

    WidgetModel.prototype.addToContent = function (widgetId, contentId) {
        var widget = this.items[widgetId];
        if (widget) {
            widget.contentId = contentId;
            if (this.contents[contentId] === undefined) {
                this.contents[contentId] = {};
            }
            //console.log('addToContent:', widgetId, contentId);
            this.contents[contentId][widgetId] = widget;
        }
    };

    return WidgetModel;
});