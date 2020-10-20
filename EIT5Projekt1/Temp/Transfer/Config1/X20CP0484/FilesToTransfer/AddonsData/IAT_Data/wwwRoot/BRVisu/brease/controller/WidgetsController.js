/*global define*/
define(['brease/core/Utils', 'brease/enum/Enum', 'brease/events/BreaseEvent', 'brease/model/WidgetModel'], function (Utils, Enum, BreaseEvent, WidgetModel) {
    'use strict';

    var widgets = new WidgetModel(Enum.WidgetState.IN_QUEUE),
        controller = {

            init: function () {

                document.body.addEventListener(BreaseEvent.WIDGET_READY, _widgetReadyHandler);
                document.body.addEventListener(BreaseEvent.WIDGET_DISPOSE, _widgetDisposeHandler);
            },

            getOptions: function (id, deleteFlag) {

                var widget = widgets.get(id);

                if (widget === undefined) {
                    return undefined;
                } else {
                    var value = widget.options;
                    if (deleteFlag) {
                        widget.options = undefined;
                    }
                    return value;
                }
            },

            setOptions: function (id, value, overwrite, copy) {
                var widget = widgets.getOrCreate(id);
                if (widget.options) {
                    if (overwrite === true) {
                        if (copy === true) {
                            widget.options = Utils.deepCopy(value);
                        } else {
                            widget.options = value;
                        }
                    } else {
                        widget.options = Utils.extendDeepToNew(widget.options, value);
                    }
                } else {
                    if (copy === true) {
                        widget.options = Utils.deepCopy(value);
                    } else {
                        widget.options = value;
                    }
                }
                if (value && value.parentContentId !== undefined) {
                    widgets.addToContent(id, value.parentContentId);
                }
            },

            optionsExist: function (id) {
                var widget = widgets.get(id);
                return (widget !== undefined && widget.options !== undefined);
            },

            addOption: function (id, key, value) {

                var widget = widgets.getOrCreate(id);
                if (widget.options === undefined) {
                    widget.options = {};
                }
                widget.options[key] = value;
            },

            setState: function (id, state) {
                var widget = widgets.getOrCreate(id);
                widget.state = state;
            },

            getState: function (id) {
                var widget = widgets.get(id);
                return (widget !== undefined) ? widget.state : Enum.WidgetState.NON_EXISTENT;
            },

            setSuspendedState: function (id, state) {
                var widget = widgets.getOrCreate(id);
                widget.suspendedState = state;
            },

            getSuspendedState: function (id) {
                var widget = widgets.get(id);
                return (widget !== undefined) ? widget.suspendedState : Enum.WidgetState.NON_EXISTENT;
            },

            allPreviouslyReady: function (contentId) {
                var success = true,
                    suspendedState,
                    widgetIds = _getWidgetsOfContent(contentId);

                //console.log('allPreviouslyReady:', widgetIds);

                if (widgetIds.length === 0) {
                    return false;
                } else {
                    for (var i = 0; i < widgetIds.length; i += 1) {
                        suspendedState = controller.getSuspendedState(widgetIds[i]);
                        if (suspendedState !== Enum.WidgetState.READY) {
                            //console.log('%c' + widgetIds[i] + '.suspendedState=' + suspendedState, 'color:red');
                            success = false;
                            break;
                        }
                    }
                    return success;
                }
            },

            addWidget: function (widget) {
                controller.setState(widget.elem.id, Enum.WidgetState.INITIALIZED);
                var widgetObj = widgets.get(widget.elem.id);
                widgetObj.widget = widget;
                if (widget.settings && widget.settings.parentContentId) {
                    //widgetObj.contentId = widget.settings.parentContentId;
                    widgets.addToContent(widget.elem.id, widget.settings.parentContentId);
                }
            },

            getWidget: function (id) {
                return widgets.get(id);
            },

            deleteWidget: function (id) {
                widgets.delete(id);
            },

            getWidgetsOfContent: function (contentId, minimalState) {
                return _getWidgetsOfContent(contentId, minimalState);
            }
        };
    //window.widgets = widgets;
    function _getWidgetsOfContent(contentId, minimalState) {
        var ids = [],
            widget;

        minimalState = (minimalState !== undefined) ? minimalState : Enum.WidgetState.INITIALIZED;

        if (widgets.contents[contentId] !== undefined) {
            for (var key in widgets.contents[contentId]) {
                widget = widgets.get(key);
                if (widget !== undefined && widget.contentId === contentId && widget.state >= minimalState) {
                    ids.push(key);
                }
            }
        }
        return ids;
    }

    // PRIVATE

    function _widgetReadyHandler(e) {
        controller.setState(e.target.id, Enum.WidgetState.READY);
    }

    function _widgetDisposeHandler(e) {
        controller.deleteWidget(e.detail.id);
    }

    return controller;
});