/*global define,brease,console,CustomEvent*/
define(function (require) {

    'use strict';

    var SuperClass = require('brease/core/BaseWidget'),
		BreaseEvent = require('brease/events/BreaseEvent'),
		Renderer = require('widgets/brease/BasicSlider/libs/Renderer'),
        Enum = require('brease/enum/Enum'),
		Types = require('brease/core/Types'),
        Utils = require('brease/core/Utils'),
        measurementSystemDependency = require('brease/decorators/MeasurementSystemDependency'),
        Node = require('brease/datatype/Node'),
        NumberFormat = require('brease/config/NumberFormat'),
        languageDependency = require('brease/decorators/LanguageDependency'),
        Config = require('widgets/brease/BasicSlider/libs/Config'),

	/**
	* @class widgets.brease.BasicSlider
	* BasicSlider widget. Input value via slider
	* @extends brease.core.BaseWidget
	
	* @iatMeta category:Category
    * Numeric
    * @iatMeta category:IO
    * Input,Output,Analog
    * @iatMeta category:Operation
    * Touch,Mouse
    * @iatMeta category:Performance
    * Low,Medium,High
    * @iatMeta description:short
    * Schieberegler horizontal/vertical
    * @iatMeta description:de
    * Ermöglicht dem Benutzer einen numerischen Wert mit einem Schiebeschalter zu verändern
    * @iatMeta description:en
    * Enables the user to change a numeric value by a slider
    */

    defaultSettings = Config,

    WidgetClass = SuperClass.extend(function BasicSlider() {
        SuperClass.apply(this, arguments);
    }, defaultSettings),

    p = WidgetClass.prototype;

    p.init = function () {

        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseBasicSlider');
        }

        this.data = {
            node: new Node(this.settings.value, null, this.settings.minValue, this.settings.maxValue)
        };

        _initSettings(this);

        this.onMove = false;
        this.renderer = new Renderer(this);
        this.sliderThumb = this.el.find('.sliderThumb');
        this.sliderThumb.on(BreaseEvent.MOUSE_DOWN, this._bind('_mouseDownHandler'));

        if (this.settings.minValue > 0) {
            this.settings.value = this.settings.minValue;
            this.submitChange();
        }

        this.writeUnit(this.settings.unitSymbol);
        this.writeValue();

        SuperClass.prototype.init.call(this);

        if (brease.config.editMode === true) {

            var EditorHandles = require('widgets/brease/BasicSlider/libs/EditorHandles');
            var editorHandles = new EditorHandles(this);

            this.getHandles = function () {
                return editorHandles.getHandles();
            };

            //workaround
            this.designer.getSelectionDecoratables = function () {
                return editorHandles.getSelectionDecoratables();
            };
        }
    };

    p.enable = function () {
        SuperClass.prototype.enable.call(this);
        this.renderer.rectangleBackground.removeClass('disabled');
        this.renderer.thumbBackground.removeClass('disabled');
    };

    p.disable = function () {
        SuperClass.prototype.disable.call(this);
        this.renderer.rectangleBackground.addClass('disabled');
        this.renderer.thumbBackground.addClass('disabled');
    };

    /**
	* @method setFormat
	* Sets format
	* @param {brease.config.MeasurementSystemFormat} format
	*/
    p.setFormat = function (format) {
        this.settings.format = format;
        _updateFormat(this.settings.format, this);
        this.renderer.updateAxis();
        this.writeValue();
    };

    /**
	* @method getFormat 
	* Returns format.
	* @return {brease.config.MeasurementSystemFormat}
	*/
    p.getFormat = function () {
        return this.settings.format;
    };

    /**
	* @method setLargeChange
	* Sets largeChange
	* @param {UNumber} largeChange
	*/
    p.setLargeChange = function (largeChange) {
        this.settings.largeChange = largeChange;
    };

    /**
	* @method getLargeChange 
	* Returns largeChange.
	* @return {UNumber}
	*/
    p.getLargeChange = function () {
        return this.settings.largeChange;
    };

    /**
	* @method setMajorTicks
	* Sets majorTicks
	* @param {UInteger} majorTicks
	*/
    p.setMajorTicks = function (majorTicks) {
        this.settings.majorTicks = majorTicks;
        this.renderer.updateAxis();
    };

    /**
	* @method getMajorTicks 
	* Returns majorTicks.
	* @return {UInteger}
	*/
    p.getMajorTicks = function () {
        return this.settings.majorTicks;
    };

    /**
    * @method setMaxValue
    * Sets maxValue
    * @param {Number} maxValue
    */
    p.setMaxValue = function (maxValue) {

        if (Utils.isNumeric(maxValue)) {
            this.data.node.setMaxValue(maxValue);
            this.renderer.settings.maxValue = maxValue;
            this.renderer.scaleDomain(this.data.node);
            this.renderer.scaleMinMax(this.data.node);
            this.renderer.updateAxis();
            this.setValue(this.data.node.value);
        }
    };

    /**
    * @method getMaxValue 
    * Returns maxValue.
    * @return {Number} maxValue
    */
    p.getMaxValue = function () {
        return this.data.node.maxValue;
    };

    /**
    * @method setMinValue
    * Sets minValue
    * @param {Number} minValue
    */
    p.setMinValue = function (minValue) {

        if (Utils.isNumeric(minValue)) {
            this.data.node.setMinValue(minValue);
            this.renderer.settings.minValue = minValue;
			this.renderer.scaleDomain(this.data.node);
            this.renderer.scaleMinMax(this.data.node);
            this.renderer.updateAxis();
            this.setValue(this.data.node.value);
        }
    };

    /**
	* @method getMinValue 
	* Returns minValue.
	* @return {Number} minValue
	*/
    p.getMinValue = function () {
        return this.data.node.minValue;
    };

    /**
	* @method setNode
	* Sets node
	* @param {brease.datatype.Node} node
	*/
    p.setNode = function (node) {
        if (node.minValue !== undefined) {
            if (this.data.node.minValue !== node.minValue) {
                this.data.node.setMinValue(node.minValue);
                this.renderer.scaleDomain(node);
                this.renderer.scaleMinMax(node);
                this.renderer.updateAxis();
            }
        }
        if (node.maxValue !== undefined) {
            if (this.data.node.maxValue !== node.maxValue) {
                this.data.node.setMaxValue(node.maxValue);
                this.renderer.scaleDomain(node);
                this.renderer.scaleMinMax(node);
                this.renderer.updateAxis();
            }
        }

        if (this.valueChange !== undefined && this.valueChange.state() !== "resolved") {
            this.valueChange.resolve();
        }
        else {
            this.setValue(node.value);
        }

    };

    /**
	* @method getNode 
	* Returns node.
	* @return {brease.datatype.Node}
	*/
    p.getNode = function () {
        return this.data.node;
    };

    /**
	* @method setOrientation
	* Sets orientation
	* @param {brease.enum.Orientation} orientation
	*/
	p.setOrientation = function (orientation) {
        this.settings.orientation = orientation;
        this.el.children().remove();
        this.renderer.reinitialize();
    };

    /**
	* @method getOrientation 
	* Returns orientation.
	* @return {brease.enum.Orientation}
	*/
    p.getOrientation = function () {
        return this.settings.orientation;
    };

    /**
	* @method setShowTickNumbers
	* Sets showTickNumbers
	* @param {Boolean} showTickNumbers
	*/
    p.setShowTickNumbers = function (showTickNumbers) {
        this.settings.showTickNumbers = showTickNumbers;
        this.renderer.tickNumbersHandling();
    };

    /**
	* @method getShowTickNumbers 
	* Returns showTickNumbers.
	* @return {Boolean}
	*/
    p.getShowTickNumbers = function () {
        return this.settings.showTickNumbers;
    };

    /**
    * @method setShowValueDisplay
    * Sets showValueDisplay
    * @param {Boolean} showValueDisplay
    */
    p.setShowValueDisplay = function (showValueDisplay) {
        this.settings.showValueDisplay = showValueDisplay;
		this.renderer.valueDisplayHandling();
    };

    /**
	* @method getShowValueDisplay 
	* Returns showValueDisplay.
	* @return {Boolean}
	*/
    p.getShowValueDisplay = function () {
        return this.settings.showValueDisplay;
    };

    /**
	* @method setSmallChange
	* Sets smallChange
	* @param {UNumber} smallChange
	*/
    p.setSmallChange = function (smallChange) {
        this.settings.smallChange = smallChange;
    };

    /**
	* @method getSmallChange 
	* Returns smallChange.
	* @return {UNumber}
	*/
    p.getSmallChange = function () {
        return this.settings.smallChange;
    };

    /**
	* @method setTickPosition
	* Sets tickPosition
	* @param {brease.enum.TickStyle} tickPosition
	*/
    p.setTickPosition = function (tickPosition) {
        this.settings.tickPosition = tickPosition;
		this.renderer.tickPositionHandling();
    };

    /**
	* @method getTickPosition 
	* Returns tickPosition.
	* @return {brease.enum.TickStyle}
	*/
    p.getTickPosition = function () {
        return this.settings.tickPosition;
    };

    /**
    * @method setShowUnit
    * Sets showUnit
    * @param {Boolean} showUnit
    */
    p.setShowUnit = function (showUnit) {
        this.settings.showUnit = showUnit;
        this.showUnit();
    };

    /**
	* @method getShowUnit 
	* Returns showUnit.
	* @return {Boolean}
	*/
    p.getShowUnit = function () {
        return this.settings.showUnit;
    };

    /**
	* @method setUnit
	* Sets unit
	* @param {brease.config.MeasurementSystemUnit} unit
	*/
    p.setUnit = function (unit) {
        if (Utils.isObject(unit)) {
            this.settings.unitTextKey = undefined;
            this.settings.unit = unit;
        } else {
            if (brease.language.isKey(unit)) {
                try {
                    this.setLangDependency(true);
                    this.settings.unitTextKey = brease.language.parseKey(unit);
                    this.settings.unit = JSON.parse(brease.language.getTextByKey(this.settings.unitTextKey).replace(/\'/g, '"'));
                } catch (error) {
                    console.iatWarn(this.elem.id + ':Unit String "' + unit + '" is invalid!');
                }
            } else {
                this.settings.unitTextKey = undefined;
                try {
                    this.settings.unit = JSON.parse(unit.replace(/\'/g, '"'));
                } catch (error) {
                    console.iatWarn(this.elem.id + ':Unit String "' + unit + '" is invalid!');
                }
            }
        }
        if (unit === undefined) {
            this.settings.unit = undefined;
        }

        this.processMeasurementSystemUpdate();

    };

    /**
	* @method getUnit 
	* Returns unit.
	* @return {brease.config.MeasurementSystemUnit}
	*/
    p.getUnit = function () {
        return this.settings.unit;
    };

    /**
    * @method setValue
    * sets the value
    * @iatStudioExposed
    * @param {Number} value
    */
    p.setValue = function (value) {

        if (this.onMove === false) {
            if (value !== undefined) {
                this.data.node.setValue(Types.parseValue(value, 'Number', { min: this.data.node.minValue, max: this.data.node.maxValue }));
            }

            if (this.valueChange !== undefined && this.valueChange.state() !== "resolved") {
                this.valueChange.resolve();
            } else {
                this.renderer.updateThumbPositionByValue(this.data.node.value);
                this.writeValue();
            }
        }
    };

    /**
    * @method getValue
    * get the value
    * @return {Number} value
    */
    p.getValue = function () {
        return this.data.node.value;
    };

    /**
	* @method setScaleOffset
	* Sets scaleOffset
	* @param {PixelVal} scaleOffset
	*/
    p.setScaleOffset = function (scaleOffset) {
        this.settings.scaleOffset = parseInt(scaleOffset, 10);
        this.el.children().remove();
        this.renderer.reinitialize();
    };

    /**
	* @method getScaleOffset 
	* Returns scaleOffset.
	* @return {PixelVal}
	*/
    p.getScaleOffset = function () {
        return this.settings.scaleOffset + 'px';
    };

    /**
	* @method setThumbSize
	* Sets thumbSize
	* @param {PixelVal} thumbSize
	*/
    p.setThumbSize = function (thumbSize) {
        this.settings.thumbSize = parseInt(thumbSize, 10);
        this.el.children().remove();
        this.renderer.reinitialize();
    };

    /**
	* @method getThumbSize 
	* Returns thumbSize.
	* @return {PixelVal}
	*/
    p.getThumbSize = function () {
        return this.settings.thumbSize + 'px';
    };

    /**
	* @method setValueDisplaySize
	* Sets valueDisplaySize
	* @param {PixelVal} valueDisplaySize
	*/
    p.setValueDisplaySize = function (valueDisplaySize) {
        this.settings.valueDisplaySize = parseInt(valueDisplaySize,10);
        this.el.children().remove();
        this.renderer.reinitialize();
    };

    /**
	* @method getValueDisplaySize 
	* Returns valueDisplaySize.
	* @return {PixelVal}
	*/
    p.getValueDisplaySize = function () {
        return this.settings.valueDisplaySize + 'px';
    };

    /**
	* @method setTrackSize
	* Sets trackSize
	* @param {PixelVal} trackSize
	*/
    p.setTrackSize = function (trackSize) {
        this.settings.trackSize = parseInt(trackSize, 10);
        this.el.children().remove();
        this.renderer.reinitialize();
    };

    /**
	* @method getTrackSize 
	* Returns trackSize.
	* @return {PixelVal}
	*/
    p.getTrackSize = function () {
        return this.settings.trackSize + 'px';
    };

    /**
	* @method setImage
    * @iatStudioExposed
	* Sets image
	* @param {ImagePath} image
	*/
    p.setImage = function (image) {
        this.settings.image = image;
        var imgEl = this.el.find('img');

        if (image !== undefined && image !== '') {
            
            if (imgEl.length > 0) {
                this.renderer.updateImg(image, false);
            }
            else {
                this.renderer.updateImg(image, true);
            }
        }
        else {
            imgEl.remove();
            this.renderer.thumbCornerHandling(false);
        }
    };

    /**
	* @method getImage 
	* Returns image.
	* @return {ImagePath}
	*/
    p.getImage = function () {
        return this.settings.image;
    };

    p._setHeight = function (h) {
        SuperClass.prototype._setHeight.call(this, h);
        this.el.children().remove();
        this.renderer.reinitialize();        
    };

    p._setWidth = function (h) {
        SuperClass.prototype._setWidth.call(this, h);
        this.el.children().remove();
        this.renderer.reinitialize();
    };

    p.langChangeHandler = function (e) {
        if (this.data.node.unit !== null && this.settings.showUnit === true) {
            this.showUnit();
        }
    };

    p.showUnit = function () {
        brease.language.pipeAsyncUnitSymbol(this.data.node.unit, this._bind('writeUnit'));
    };

    p.writeUnit = function (symbol) {
        this.settings.unitSymbol = symbol;
        if (this.settings.showUnit === true || this.settings.showUnit === 'true') {
            if (this.renderer) {
                this.renderer.outputUnit.text(symbol);
                if (brease.config.editMode === true) {
                    this.renderer.outputUnit.text('unit');
                }
            }            
        }
        else {
            if (this.renderer) {
                this.renderer.outputUnit.text('');
            }
        }
    };

    p.processMeasurementSystemUpdate = function () {

        var widget = this;

        this.settings.mms = brease.measurementSystem.getCurrentMeasurementSystem();
        _updateFormat(this.settings.format, this);

        this.valueChange = $.Deferred();
        this.unitChange = $.Deferred();

        $.when(
            this.valueChange.promise(),
            this.unitChange.promise()
            ).then(function successHandler() {
                _updateNodeDisplay(widget);
            });

        var previousUnitCode = this.data.node.unit;
        if (this.settings.unit !== undefined) {
            this.data.node.setUnit(this.settings.unit[this.settings.mms]);
        }
        if (this.data.node.unit !== previousUnitCode) {
            brease.language.pipeAsyncUnitSymbol(this.data.node.unit, this._bind(_setUnitSymbol));
        } else {
            this.unitChange.resolve();
        }

        var subscriptions = brease.uiController.getSubscriptionsForElement(this.elem.id);
        if (subscriptions !== undefined && subscriptions.node !== undefined) {
            if (this.data.node.unit !== previousUnitCode) {
                this.sendNodeChange({ attribute: "node", nodeAttribute: "unit", value: this.data.node.unit });
            } else {
                this.valueChange.resolve();
            }
        } else {
            this.valueChange.resolve();
        }
    };

    p.measurementSystemChangeHandler = function () {
        this.processMeasurementSystemUpdate();
    };

    p.writeValue = function () {
        this.settings.displayedValue = brease.formatter.formatNumber(this.data.node.value, this.settings.numberFormat, this.settings.useDigitGrouping, this.settings.separators);
        this.renderer.outputVal.text(this.settings.displayedValue);
    };

    p._mouseDownHandler = function (e) {
        this.onMove = true;
        this._handleEvent(e);
        $(document).on(BreaseEvent.MOUSE_MOVE, this._bind('_mouseMoveHandler'));
        $(document).on(BreaseEvent.MOUSE_UP, this._bind('_mouseUpHandler'));

        /**
        * @event MouseDown
        * @iatStudioExposed
        * Fired when widget enters mouseDown state
        */
        var clickEv = this.createEvent("MouseDown");
        clickEv.dispatch();
    };

    p._mouseMoveHandler = function (e) {

        this._handleEvent(e);
        this.renderer.getCurrentValue();
        this.writeValue();

        if (this.settings.changeOnMove === true) {
            this.submitChange();
        }
    };

    p._mouseUpHandler = function (e) {
        this._handleEvent(e);
        $(document).off(BreaseEvent.MOUSE_MOVE, this._bind('_mouseMoveHandler'));
        $(document).off(BreaseEvent.MOUSE_UP, this._bind('_mouseUpHandler'));
        this.submitChange();
        this.onMove = false;

        /**
        * @event MouseUp
        * @iatStudioExposed
        * Fired when widget enters mouseUp state
        */
        var clickEv = this.createEvent("MouseUp");
        clickEv.dispatch();
    };

    p.submitChange = function () {
        this.sendValueChange({ value: this.getValue(), node: this.getNode() });

        /**
        * @event ValueChanged
        * @param {Number} value
        * @iatStudioExposed
        * Fired when index changes.
        */
        var clickEv = this.createEvent('ValueChanged', { value: this.getValue() });
        clickEv.dispatch();
    };

    p.dispose = function () {
        this.sliderThumb.off();
		this.renderer.dispose();
        $(document).off(BreaseEvent.MOUSE_UP, this._bind('_mouseUpHandler'));
        $(document).off(BreaseEvent.MOUSE_MOVE, this._bind('_mouseMoveHandler'));
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    //PRIVAT FUNCTIONS

    function _updateFormat(format, widget) {
        if (widget.settings.format !== undefined) {
            var formatObject;
            if (Utils.isObject(format)) {
                widget.settings.numberFormat = NumberFormat.getFormat(widget.settings.format, widget.settings.mms);
            }
            else if (typeof (format) === 'string') {
                if (brease.language.isKey(format)) {
                    try {
                        widget.setLangDependency(true);
                        var textKey = brease.language.parseKey(format);
                        formatObject = JSON.parse(brease.language.getTextByKey(textKey).replace(/\'/g, '"'));
                        widget.settings.numberFormat = NumberFormat.getFormat(formatObject, widget.settings.mms);
                    } catch (error) {
                        console.iatWarn(widget.elem.id + ': Format String "' + format + '" is invalid!');
                        widget.settings.numberFormat = NumberFormat.getFormat({}, widget.settings.mms);
                    }
                } else {
                    try {
                        formatObject = JSON.parse(format.replace(/\'/g, '"'));
                        widget.settings.numberFormat = NumberFormat.getFormat(formatObject, widget.settings.mms);
                    } catch (error) {
                        console.iatWarn(widget.elem.id + ': Format String "' + format + '" is invalid!');
                        widget.settings.numberFormat = NumberFormat.getFormat({}, widget.settings.mms);
                    }
                }
            }
        } else {
            widget.settings.numberFormat = NumberFormat.getFormat({}, widget.settings.mms);
        }
        widget.settings.separators = brease.user.getSeparators();
    }

    function _setUnitSymbol(symbol) {
        this.settings.unitSymbol = symbol;
        this.unitChange.resolve();
    }

    function _updateNodeDisplay(widget) {
        widget.writeUnit(widget.settings.unitSymbol);
        widget.renderer.updateAxis();
        widget.renderer.getCurrentValue();
        widget.writeValue();
    }

    function _unitSettings(widget) {

        widget.settings.mms = brease.measurementSystem.getCurrentMeasurementSystem();
        if (Utils.isObject(widget.settings.unit)) {
            widget.data.node.unit = widget.settings.unit[brease.measurementSystem.getCurrentMeasurementSystem()];
            widget.showUnit();
            widget.setLangDependency(true);
        }
    }

    function _initSettings(widget) {
        _initParse(widget);
        widget.settings.separators = brease.user.getSeparators();
        widget.settings.mms = brease.measurementSystem.getCurrentMeasurementSystem();

        _updateFormat(widget.settings.format, widget);
        _unitSettings(widget);
    }

    function _tickNumbersHandling(widget) {
        if (widget.settings.showTickNumbers === true) {
            widget.el.find('text').css('display', 'block');
        }
        else {
            widget.el.find('text').css('display', 'none');
        }
    }

    function _initParse(widget) {
        widget.settings.thumbSize = parseInt(widget.settings.thumbSize, 10);
        widget.settings.valueDisplaySize = parseInt(widget.settings.valueDisplaySize, 10);
        widget.settings.scaleOffset = parseInt(widget.settings.scaleOffset, 10);
        widget.settings.trackSize = parseInt(widget.settings.trackSize, 10);
    }

    return measurementSystemDependency.decorate(languageDependency.decorate(WidgetClass, false), true);

});