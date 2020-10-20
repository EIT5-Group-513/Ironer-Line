/*global define*/
define(function () {

    "use strict";
    
    /**
    * @class brease.objects.ProgressBarRange
    * @extends Object
    * @embeddedClass
	* @virtualNote 
    */
    /**
    * @property {Boolean} show
    */
    /**
    * @property {Color} color
    */
    /**
    * @property {Integer} height
    */
    /**
    * @property {Integer} offset
    * For horizontal oriented bars (LTR,RTL), this is the vertical offset of the range (counted from bottom).
    * For vertical oriented bars (TTB, BTT), this is the horizontal offset of the range (counted from left).
    */
    /**
    * @property {Number} minValue
    */
    /**
    * @property {Number} maxValue
    */

    /**
    * @class brease.objects.GaugeRange
    * @extends Object
    * @embeddedClass
	* @virtualNote 
    */
    /**
    * @property {Number} startValue
    */
    /**
    * @property {Number} endValue
    */
    /**
    * @property {Color} color
    */

    /**
    * @class brease.objects.ListEntry
    * @extends Object
    * @embeddedClass
	* @virtualNote 
    */
    /**
    * @property {String/Number} value
    */
    /**
    * @property {String} text
    */
    /**
    * @property {String} image
    */

    /**
    * @class brease.objects.NodeData
    * @extends Object
    * @alternateClassName NodeData
    * @embeddedClass
	* @virtualNote 
    * Info object for node changes
    */
    /**
    * @property {String} attribute (required)
    * name of the widget attribute of type Node (e.g. 'node' in NumericInput)
    */
    /**
    * @property {String} nodeAttribute (required)
    * name of the node attribute (e.g. 'unit')
    */
    /**
    * @property {ANY} value (required)
    * value of the changed node attribute (e.g. 'FAH')
    */



    /**
    * @class brease.objects.WidgetConfig
    * @alternateClassName WidgetConfig
    * @extends Object
    * @embeddedClass
    * @virtualNote
    * Config object for dynamic instantiation of widgets with brease.uiController.  
    * Example:
    *
    *       brease.uiController.createWidgets(widget.elem, [{
    *                className: 'widgets.brease.ToggleButton',
    *                id: 'ToggleButton_d01',
    *                options: {
    *                    imageAlign: 'right'
    *                },
    *                HTMLAttributes: {
    *                   style:'display:block;'
    *                }
    *            }]);
    */
    /**
    * @property {WidgetType} className (required)
    */
    /**
    * @property {String} id (required)
    * Id of newly created widget
    */
    /**
    * @property {Object} content
    * Content of created HTML element, either text or html
    * @property {String} [content.text]
    * @property {String} [content.html]
    */
    /**
    * @property {Object} HTMLAttributes
    * Optional HTML attributes for HTML-tag
    */
    /**
    * @property {Object} options
    * Optional config options for widget
    */

    /**
    * @class brease.objects.WidgetInstance
    * @alternateClassName WidgetInstance
    * @extends Object
    * @embeddedClass
    * @virtualNote
    */

    /**
    * @class brease.objects.WidgetType
    * @alternateClassName WidgetType
    * @extends String
    * @embeddedClass
    * @virtualNote
    * Type of a widget class (fully qualified name in dot-notation, e.g. widgets.brease.Button)
    */

    /**
    * @class brease.objects.ClassName
    * @alternateClassName ClassName
    * @extends String
    * @embeddedClass
    * @virtualNote
    * Name of a widget class (fully qualified name in class-notation, e.g. widgets/brease/Button)
    */

    /**
    * @class brease.objects.TimeSpan
    * @alternateClassName TimeSpan
    * @extends Object
    * @embeddedClass
    * @virtualNote
    */
    /**
    * @property {core.datatype.DateTime} [startTime]
    */
    /**
    * @property {core.datatype.DateTime} [endTime]
    */

    /**
    * @class brease.objects.NodeInfo
    * @alternateClassName NodeInfo
    * @extends Array
    * @embeddedClass
    * @virtualNote
    */
    /**
    * @property {String} nodeId (required)
    */
    /**
    * @property {brease.config.UnitCode} [unit]
    */

    return null;
});