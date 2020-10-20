/*global _, createjs,brease*/
define(function (require) {
    /*jshint validthis:true,white:false */
    'use strict';

    var SuperClass = require('brease/core/Class'),
		BreaseEvent = require('brease/events/BreaseEvent'),
        d3 = require('libs/d3/d3'),
        Types = require('brease/core/Types'),
        Enum = require('brease/enum/Enum'),
        Utils = require('brease/core/Utils'),

	Renderer = SuperClass.extend(function Renderer(widget) {
	    SuperClass.call(this);
	    this.widget = widget;
	    this.settings = widget.settings;
	    this.initialize();
	}, null),

	p = Renderer.prototype;

    p.initialize = function () {
        this.reinitialize();
    };

    p.reinitialize = function () {
        //The following factor is used to give the axis a certain height depending on the widget height
        this.settings.axisSizeFactor = 10;
        this.settings.thumbRadius = this.settings.thumbSize / 2;
        
        this.scaleMinMax(this.widget.data.node);
        this.scaleDomain(this.widget.data.node);
        _calcTickNumbers(this);

        this.initDraw();

        _valueDisplayDraw(this);
        this.valueDisplayHandling();
        this.updateThumbPositionByValue(this.widget.data.node.value);
        this.tickNumbersHandling();
        _imgHandling(this);

        if (this.widget.isDisabled) {
            this.widget.disable();
        }
    };

    p.initDraw = function () {

        this.containerId = Utils.uniqueID(this.widget.elem.id + '_container');
        this.axisId = Utils.uniqueID(this.widget.elem.id + '_axis');
        this.containerElement = $("<div class='borderElement' id=" + this.containerId + ">");
        this.widget.el.append(this.containerElement);
        this.containerElement.height(this.settings.height)
                        .width(this.settings.width);

        this.axisElement = d3.select('#' + this.containerId)
            .append('svg')
            .attr('id', this.axisId)
            .attr('class', 'axisElement');

        this.backgroundId = Utils.uniqueID(this.widget.elem.id + '_container');
        this.backgroundElement = $("<div class='backgroundElement' id=" + this.backgroundId + ">");
        this.containerElement.append(this.backgroundElement);

        this.sliderElement = d3.select('#' + this.containerId)
            .append('svg')
            .attr('class', 'sliderElement')
            .attr('width', this.settings.width)
            .attr('height', this.settings.height);

        if (this.settings.orientation === Enum.Orientation.LTR || this.settings.orientation === Enum.Orientation.RTL) {
            this.drawHorizontal();
        }
        else if (this.settings.orientation === Enum.Orientation.TTB || this.settings.orientation === Enum.Orientation.BTT) {
            this.drawVertical();
        }

    };

    p.drawHorizontal = function () {

        this.sliderRectangle = this.sliderElement.append('rect')
            .attr('x', 0)
            .attr('y', parseFloat(this.settings.height, 10) / 2 - this.settings.trackSize / 2)
            .attr('height', this.settings.trackSize)
            .attr('width', parseFloat(this.settings.width, 10))
            .attr('rx', this.settings.trackSize / 2)
            .attr('class', 'sliderRectangle')
            .attr('ry', 0);

        this.dragBehavior = d3.behavior.drag();

        this.sliderThumb = this.sliderElement.append('rect')
            .attr('y', parseFloat(this.settings.height, 10) / 2 - this.settings.thumbRadius)
            .attr('height', this.settings.thumbSize)
            .attr('width', this.settings.thumbSize)
            .attr('class', 'sliderThumb')
            .call(this.dragBehavior);

        this.thumbBackground = $('<div>')
            .css('height', this.settings.thumbRadius * 2)
            .css('width', this.settings.thumbRadius * 2)
            .css('top', parseFloat(this.settings.height, 10) / 2 - this.settings.thumbRadius)
            .css('left', this.settings.thumbPosition - this.settings.thumbRadius)
            .attr('class', 'thumbBackground');

        this.rectangleBackground = $('<div>')
            .css('height', this.settings.trackSize)
            .css('width', parseFloat(this.settings.width, 10))
            .css('top', parseFloat(this.settings.height, 10) / 2 - this.settings.trackSize / 2)
            .css('left', 0)
            .attr('class', 'rectangleBackground');

        this.backgroundElement.append(this.rectangleBackground).append(this.thumbBackground);
        this.widget.el.addClass('horizontal').removeClass('vertical');

        if (!brease.config.editMode) {
            this.widget.el.find('.sliderRectangle').on(BreaseEvent.CLICK, this._bind('_rectangleTrackHandler'));
            this.dragBehavior.on('dragstart', this._bind(this.updateThumbPositionByEvent));
            this.dragBehavior.on('drag', this._bind(this.updateThumbPositionByEvent));
            this.dragBehavior.on('dragend', this._bind(this.updateThumbPositionByEvent));
        }
        this.drawHorizontalAxis();
    };

    p.drawVertical = function () {

        this.sliderRectangle = this.sliderElement.append('rect')
            .attr('x', parseFloat(this.settings.width, 10) / 2 - this.settings.trackSize / 2)
            .attr('y', 0)
            .attr('height', parseFloat(this.settings.height, 10))
            .attr('width', this.settings.trackSize)
            .attr('rx', 0)
            .attr('ry', this.settings.trackSize / 2)
            .attr('class', 'sliderRectangle');

        this.dragBehavior = d3.behavior.drag();

        this.sliderThumb = this.sliderElement.append('rect')
            .attr('x', parseFloat(this.settings.width, 10) / 2 - this.settings.thumbRadius)
            .attr('height', this.settings.thumbSize)
            .attr('width', this.settings.thumbSize)
            .attr('class', 'sliderThumb')
            .call(this.dragBehavior);

        this.thumbBackground = $('<div>')
            .css('height', this.settings.thumbRadius * 2)
            .css('width', this.settings.thumbRadius * 2)
            .css('top', this.settings.thumbPosition - this.settings.thumbRadius)
            .css('left', parseFloat(this.settings.width, 10) / 2 - this.settings.thumbRadius)
            .attr('class', 'thumbBackground');

        this.rectangleBackground = $('<div>')
            .css('height', parseFloat(this.settings.height, 10))
            .css('width', this.settings.trackSize)
            .css('top', 0)
            .css('left', parseFloat(this.settings.width, 10) / 2 - this.settings.trackSize / 2)
            .attr('class', 'rectangleBackground');

        this.backgroundElement.append(this.rectangleBackground).append(this.thumbBackground);
        this.widget.el.addClass('vertical').removeClass('horizontal');

        if (brease.config.editMode === false) {
            this.widget.el.find('.sliderRectangle').on(BreaseEvent.CLICK, this._bind('_rectangleTrackHandler'));
            this.dragBehavior.on('dragstart', this._bind(this.updateThumbPositionByEvent));
            this.dragBehavior.on('drag', this._bind(this.updateThumbPositionByEvent));
            this.dragBehavior.on('dragend', this._bind(this.updateThumbPositionByEvent));
        }
        this.drawVerticalAxis();
    };

    p.updateThumbPositionByEvent = function () {
        d3.event.sourceEvent.stopPropagation();
        _smallChangeOffset(this, d3.event);
    };

    p.updateThumbPositionByValue = function (value) {
        this.settings.thumbPosition = this.thumbScale(value);
        _updateThumb(this);
    };

    p.getCurrentValue = function () {
        this.widget.data.node.value = this.thumbScale.invert(this.settings.thumbPosition);

    };

    p.scaleDomain = function (node) {

        if (node !== undefined) {
            this.settings.value = node.value;
            this.settings.minValue = node.minValue;
            this.settings.maxValue = node.maxValue;
        }

        switch (this.settings.orientation) {

            case Enum.Orientation.TTB:
                this.thumbScale = d3.scale.linear()
                    .domain([this.settings.minValue, this.settings.maxValue])
                    .range([this.settings.thumbRadius, parseFloat(this.settings.height, 10) - this.settings.thumbRadius]);
                break;

            case Enum.Orientation.BTT:
                this.thumbScale = d3.scale.linear()
                    .domain([this.settings.minValue, this.settings.maxValue])
                    .range([parseFloat(this.settings.height, 10) - this.settings.thumbRadius, this.settings.thumbRadius]);
                break;

            case Enum.Orientation.RTL:
                this.thumbScale = d3.scale.linear()
                    .domain([this.settings.minValue, this.settings.maxValue])
                    .range([parseFloat(this.settings.width, 10) - this.settings.thumbRadius, this.settings.thumbRadius]);
                break;

            case Enum.Orientation.LTR:
                this.thumbScale = d3.scale.linear()
                    .domain([this.settings.minValue, this.settings.maxValue])
                    .range([this.settings.thumbRadius, parseFloat(this.settings.width, 10) - this.settings.thumbRadius]);
                break;
        }

    };

    p.scaleMinMax = function (node) {

        if (node !== undefined) {
            this.settings.value = node.value;
            this.settings.minValue = node.minValue;
            this.settings.maxValue = node.maxValue;
        }

        if (this.settings.orientation === Enum.Orientation.LTR || this.settings.orientation === Enum.Orientation.RTL) {
            this.minMaxScale = d3.scale.linear()
                .domain([this.settings.minValue, this.settings.maxValue])
                .range([this.settings.thumbRadius, parseFloat(this.settings.width, 10) - this.settings.thumbRadius]);
        }
        else if (this.settings.orientation === Enum.Orientation.TTB || this.settings.orientation === Enum.Orientation.BTT) {
            this.minMaxScale = d3.scale.linear()
                .domain([this.settings.minValue, this.settings.maxValue])
                .range([this.settings.thumbRadius, parseFloat(this.settings.height, 10) - this.settings.thumbRadius]);
        }
    };

    p.drawHorizontalAxis = function () {

        var tickSize = this.settings.height / this.settings.axisSizeFactor;

        if (this.settings.tickPosition === 'top') {
            _appendHorizontalAxisTop(this, tickSize);
        }

        if (this.settings.tickPosition === 'bottom') {
            _appendHorizontalAxisBottom(this, tickSize);
        }

        if (this.settings.tickPosition === 'topbottom') {
            _appendHorizontalAxisTop(this, tickSize);
            _appendHorizontalAxisBottom(this, tickSize);
        }

    };

    p.drawVerticalAxis = function () {

        var tickSize = this.settings.width / this.settings.axisSizeFactor;

        if (this.settings.tickPosition === 'top') {
            _appendVerticalAxisTop(this, tickSize);
        }

        if (this.settings.tickPosition === 'bottom') {
            _appendVerticalAxisBottom(this, tickSize);
        }

        if (this.settings.tickPosition === 'topbottom') {
            _appendVerticalAxisTop(this, tickSize);
            _appendVerticalAxisBottom(this, tickSize);
        }

    };

    p._rectangleTrackHandler = function (e) {

        if (this.widget.isDisabled) {
            return;
        }
        
        var largeChange = Types.parseValue(this.settings.largeChange, 'Number', { min: 0, max: 100 }) / 100,
            actValue = this.widget.data.node.value,
            valueRange = this.settings.maxValue - this.settings.minValue,
            newValue;

        //Offset in case of touch
        if (e.offsetX === undefined || e.offsetY === undefined) {
            e.offsetX = e.pageX - this.widget.elem.getBoundingClientRect().left;
            e.offsetY = e.pageY - this.widget.elem.getBoundingClientRect().top;
        }

        switch (this.settings.orientation) {

            case Enum.Orientation.TTB:
                if (e.offsetY < this.settings.thumbPosition) {
                    newValue = Types.parseValue(actValue - valueRange * largeChange, 'Number', { min: this.settings.minValue, max: this.settings.maxValue });
                }
                else if (e.offsetY > this.settings.thumbPosition) {
                    newValue = Types.parseValue(actValue + valueRange * largeChange, 'Number', { min: this.settings.minValue, max: this.settings.maxValue });
                }
                break;

            case Enum.Orientation.BTT:
                if (e.offsetY < this.settings.thumbPosition) {
                    newValue = Types.parseValue(actValue + valueRange * largeChange, 'Number', { min: this.settings.minValue, max: this.settings.maxValue });
                }
                else if (e.offsetY > this.settings.thumbPosition) {
                    newValue = Types.parseValue(actValue - valueRange * largeChange, 'Number', { min: this.settings.minValue, max: this.settings.maxValue });
                }
                break;

            case Enum.Orientation.RTL:
                if (e.offsetX < this.settings.thumbPosition) {
                    newValue = Types.parseValue(actValue + valueRange * largeChange, 'Number', { min: this.settings.minValue, max: this.settings.maxValue });
                }
                else if (e.offsetX > this.settings.thumbPosition) {
                    newValue = Types.parseValue(actValue - valueRange * largeChange, 'Number', { min: this.settings.minValue, max: this.settings.maxValue });
                }
                break;

            case Enum.Orientation.LTR:
                if (e.offsetX < this.settings.thumbPosition) {
                    newValue = Types.parseValue(actValue - valueRange * largeChange, 'Number', { min: this.settings.minValue, max: this.settings.maxValue });
                }
                else if (e.offsetX > this.settings.thumbPosition) {
                    newValue = Types.parseValue(actValue + valueRange * largeChange, 'Number', { min: this.settings.minValue, max: this.settings.maxValue });
                }
                break;
        }

        this.widget.data.node.value = newValue;
        this.updateThumbPositionByValue(newValue);
        this.widget.submitChange();
        this.widget.writeValue();
    };

    p.updateAxis = function () {

        this.settings = this.widget.settings;
        _calcTickNumbers(this);

        var tickSize;

        if (this.settings.orientation === Enum.Orientation.LTR || this.settings.orientation === Enum.Orientation.RTL) {
            tickSize = this.settings.height / this.settings.axisSizeFactor;
        }
        else if (this.settings.orientation === Enum.Orientation.TTB || this.settings.orientation === Enum.Orientation.BTT) {
            tickSize = this.settings.width / this.settings.axisSizeFactor;
        }
        if (this.axisAfter !== undefined || this.axisBefore !== undefined) {
            if (this.settings.tickPosition === 'top') {
                this.axisBefore.scale(this.minMaxScale)
                    .tickValues(this.tickValues)
                    .tickFormat(d3.format('.' + this.settings.numberFormat.decimalPlaces + 'f'))
                    .innerTickSize(tickSize);

                d3.select('#' + this.axisId).select('.axis-before').call(this.axisBefore);
            }

            if (this.settings.tickPosition === 'bottom') {
                this.axisAfter.scale(this.minMaxScale)
                    .tickValues(this.tickValues)
                    .tickFormat(d3.format('.' + this.settings.numberFormat.decimalPlaces + 'f'))
                    .innerTickSize(tickSize);

                d3.select('#' + this.axisId).select('.axis-after').call(this.axisAfter);
            }

            if (this.settings.tickPosition === 'topbottom') {
                this.axisBefore.scale(this.minMaxScale)
                    .tickValues(this.tickValues)
                    .tickFormat(d3.format('.' + this.settings.numberFormat.decimalPlaces + 'f'))
                    .innerTickSize(tickSize);

                d3.select('#' + this.axisId).select('.axis-before').call(this.axisBefore);

                this.axisAfter.scale(this.minMaxScale)
                    .tickValues(this.tickValues)
                    .tickFormat(d3.format('.' + this.settings.numberFormat.decimalPlaces + 'f'))
                    .innerTickSize(tickSize);

                d3.select('#' + this.axisId).select('.axis-after').call(this.axisAfter);
            }
            this.tickNumbersHandling();
        }

    };

    p.valueDisplayHandling = function () {
        if (this.settings.showValueDisplay) {
            this.output.css('display', '');
        }
        else {
            this.output.css('display', 'none');
        }
        if (brease.config.editMode === true) {
            this.outputVal.text(this.settings.displayedValue);
            if (this.settings.showUnit) {
                this.outputUnit.text('unit');
            }
        }
    };

    p.tickNumbersHandling = function () {
        if (this.settings.showTickNumbers === true) {
            this.widget.el.find('text').css('display', 'block');
        }
        else {
            this.widget.el.find('text').css('display', 'none');
        }
    };

    p.tickPositionHandling = function () {
        if (this.axisAfter !== undefined) {
            d3.select('#' + this.axisId).selectAll('.axis-after').remove();
        }
        if (this.axisBefore !== undefined) {
            d3.select('#' + this.axisId).selectAll('.axis-before').remove();
        }

        if (this.settings.orientation === Enum.Orientation.LTR || this.settings.orientation === Enum.Orientation.RTL) {
            this.drawHorizontalAxis();
        }
        else if (this.settings.orientation === Enum.Orientation.TTB || this.settings.orientation === Enum.Orientation.BTT) {
            this.drawVerticalAxis();
        }
        this.tickNumbersHandling();
    };

    p.updateImg = function (image, appendImgEl) {
        if (appendImgEl) {
            _imgHandling(this);
        }
        else {
            this.widget.el.find('img').attr('src', image);
        }
    };

    p.thumbCornerHandling = function (knobImage) {
        if (knobImage) {
            this.sliderThumb.attr('rx', 0);
        }
        else {
            this.sliderThumb.attr('rx', this.settings.thumbRadius);
        }
    };

    p.dispose = function () {
        this.dragBehavior.on('drag', null);
        this.widget.el.find('.sliderRectangle').off(BreaseEvent.CLICK, this._bind('_rectangleTrackHandler'));
        SuperClass.prototype.dispose.call(this);
    };

    //PRIVATE FUNCTIONS
    function _updateThumb(renderer) {
        if (renderer.settings.orientation === Enum.Orientation.LTR || renderer.settings.orientation === Enum.Orientation.RTL) {
            renderer.sliderThumb.attr('x', renderer.settings.thumbPosition - renderer.settings.thumbRadius);
            renderer.thumbBackground.css('left', renderer.settings.thumbPosition - renderer.settings.thumbRadius);
            renderer.output.css('left', renderer.settings.thumbPosition - renderer.settings.valueDisplaySize / 2);
        } else if (renderer.settings.orientation === Enum.Orientation.TTB || renderer.settings.orientation === Enum.Orientation.BTT) {
            renderer.sliderThumb.attr('y', renderer.settings.thumbPosition - renderer.settings.thumbRadius);
            renderer.thumbBackground.css('top', renderer.settings.thumbPosition - renderer.settings.thumbRadius);
            renderer.output.css('top', renderer.settings.thumbPosition - renderer.settings.valueDisplaySize / 2);
        }
    }

    function _appendVerticalAxisTop(renderer, tickSize) {
        renderer.axisBefore = d3.svg.axis()
            .scale(renderer.thumbScale)
            .tickValues(renderer.tickValues)
            .innerTickSize(tickSize)
            .tickFormat(d3.format('.' + renderer.settings.numberFormat.decimalPlaces + 'f'))
            .orient('left');

        renderer.axisElement.append('g')
            .call(renderer.axisBefore)
            .attr('class', 'axis-before')
            .attr('transform', 'translate(' + (renderer.settings.width / 2 - renderer.settings.scaleOffset) + ',0)');
    }

    function _appendVerticalAxisBottom(renderer, tickSize) {
        renderer.axisAfter = d3.svg.axis()
            .scale(renderer.thumbScale)
            .tickValues(renderer.tickValues)
            .innerTickSize(tickSize)
            .tickFormat(d3.format('.' + renderer.settings.numberFormat.decimalPlaces + 'f'))
            .orient('right');

        renderer.axisElement.append('g')
            .call(renderer.axisAfter)
            .attr('class', 'axis-after')
            .attr('transform', 'translate(' + (renderer.settings.width / 2 + renderer.settings.scaleOffset) + ',0)');
    }

    function _appendHorizontalAxisTop(renderer, tickSize) {
        renderer.axisBefore = d3.svg.axis()
            .scale(renderer.thumbScale)
            .tickValues(renderer.tickValues)
            .innerTickSize(tickSize)
            .tickFormat(d3.format('.' + renderer.settings.numberFormat.decimalPlaces + 'f'))
            .orient('top');

        renderer.axisElement.append('g')
            .call(renderer.axisBefore)
            .attr('class', 'axis-before')
            .attr('transform', 'translate(0,' + (renderer.settings.height / 2 - renderer.settings.scaleOffset) + ')');
    }

    function _appendHorizontalAxisBottom(renderer, tickSize) {
        renderer.axisAfter = d3.svg.axis()
            .scale(renderer.thumbScale)
            .tickValues(renderer.tickValues)
            .innerTickSize(tickSize)
            .tickFormat(d3.format('.' + renderer.settings.numberFormat.decimalPlaces + 'f'))
            .orient('bottom');

        renderer.axisElement.append('g')
            .call(renderer.axisAfter)
            .attr('class', 'axis-after')
            .attr('transform', 'translate(0,' + (renderer.settings.height / 2 + renderer.settings.scaleOffset) + ')');
    }

    function _smallChangeOffset(renderer, position) {

        if (renderer.widget.isDisabled) {
            return;
        }

        var smallChange = Types.parseValue(renderer.settings.smallChange, 'Number', { min: 0, max: 100 }) / 100;
        var offset = (renderer.minMaxScale(renderer.settings.maxValue) - renderer.minMaxScale(renderer.settings.minValue)) * smallChange,
            valueChange;

        if (!renderer.scaleFactor) {
            renderer.scaleFactor = _getScaleFactor(renderer);
        }

        switch (renderer.settings.orientation) {
            case Enum.Orientation.LTR:
                if (position.x / renderer.scaleFactor >= renderer.settings.thumbPosition + offset) {
                    valueChange = renderer.widget.data.node.value + (renderer.settings.maxValue - renderer.settings.minValue) * smallChange * _numberOfSmallChanges(renderer, position, offset);
                    renderer.settings.thumbPosition = Types.parseValue(renderer.thumbScale(valueChange), 'Number', { min: renderer.minMaxScale(renderer.settings.minValue), max: renderer.minMaxScale(renderer.settings.maxValue) });
                    _updateThumb(renderer);
                }

                if (position.x / renderer.scaleFactor <= renderer.settings.thumbPosition - offset) {
                    valueChange = renderer.widget.data.node.value - (renderer.settings.maxValue - renderer.settings.minValue) * smallChange * _numberOfSmallChanges(renderer, position, offset);
                    renderer.settings.thumbPosition = Types.parseValue(renderer.thumbScale(valueChange), 'Number', { min: renderer.minMaxScale(renderer.settings.minValue), max: renderer.minMaxScale(renderer.settings.maxValue) });
                    _updateThumb(renderer);
                }
                break;

            case Enum.Orientation.RTL:
                if (position.x / renderer.scaleFactor >= renderer.settings.thumbPosition + offset) {
                    valueChange = renderer.widget.data.node.value - (renderer.settings.maxValue - renderer.settings.minValue) * smallChange * _numberOfSmallChanges(renderer, position, offset);
                    renderer.settings.thumbPosition = Types.parseValue(renderer.thumbScale(valueChange), 'Number', { min: renderer.minMaxScale(renderer.settings.minValue), max: renderer.minMaxScale(renderer.settings.maxValue) });
                    _updateThumb(renderer);
                }

                if (position.x / renderer.scaleFactor <= renderer.settings.thumbPosition - offset) {
                    valueChange = renderer.widget.data.node.value + (renderer.settings.maxValue - renderer.settings.minValue) * smallChange * _numberOfSmallChanges(renderer, position, offset);
                    renderer.settings.thumbPosition = Types.parseValue(renderer.thumbScale(valueChange), 'Number', { min: renderer.minMaxScale(renderer.settings.minValue), max: renderer.minMaxScale(renderer.settings.maxValue) });
                    _updateThumb(renderer);
                }
                break;

            case Enum.Orientation.TTB:
                if (position.y / renderer.scaleFactor >= renderer.settings.thumbPosition + offset) {
                    valueChange = renderer.widget.data.node.value + (renderer.settings.maxValue - renderer.settings.minValue) * smallChange * _numberOfSmallChanges(renderer, position, offset);
                    renderer.settings.thumbPosition = Types.parseValue(renderer.thumbScale(valueChange), 'Number', { min: renderer.minMaxScale(renderer.settings.minValue), max: renderer.minMaxScale(renderer.settings.maxValue) });
                    _updateThumb(renderer);
                }

                if (position.y / renderer.scaleFactor <= renderer.settings.thumbPosition - offset) {
                    valueChange = renderer.widget.data.node.value - (renderer.settings.maxValue - renderer.settings.minValue) * smallChange * _numberOfSmallChanges(renderer, position, offset);
                    renderer.settings.thumbPosition = Types.parseValue(renderer.thumbScale(valueChange), 'Number', { min: renderer.minMaxScale(renderer.settings.minValue), max: renderer.minMaxScale(renderer.settings.maxValue) });
                    _updateThumb(renderer);
                }
                break;

            case Enum.Orientation.BTT:
                if (position.y / renderer.scaleFactor >= renderer.settings.thumbPosition + offset) {
                    valueChange = renderer.widget.data.node.value - (renderer.settings.maxValue - renderer.settings.minValue) * smallChange * _numberOfSmallChanges(renderer, position, offset);
                    renderer.settings.thumbPosition = Types.parseValue(renderer.thumbScale(valueChange), 'Number', { min: renderer.minMaxScale(renderer.settings.minValue), max: renderer.minMaxScale(renderer.settings.maxValue) });
                    _updateThumb(renderer);
                }

                if (position.y / renderer.scaleFactor <= renderer.settings.thumbPosition - offset) {
                    valueChange = renderer.widget.data.node.value + (renderer.settings.maxValue - renderer.settings.minValue) * smallChange * _numberOfSmallChanges(renderer, position, offset);
                    renderer.settings.thumbPosition = Types.parseValue(renderer.thumbScale(valueChange), 'Number', { min: renderer.minMaxScale(renderer.settings.minValue), max: renderer.minMaxScale(renderer.settings.maxValue) });
                    _updateThumb(renderer);
                }
                break;
        }
    }

    function _numberOfSmallChanges(renderer, position, offset) {
        var steps;

        if (renderer.settings.orientation === Enum.Orientation.LTR || renderer.settings.orientation === Enum.Orientation.RTL) {
            steps = Math.floor(Math.abs(renderer.settings.thumbPosition - position.x / renderer.scaleFactor) / offset);
        }
        else if (renderer.settings.orientation === Enum.Orientation.TTB || renderer.settings.orientation === Enum.Orientation.BTT) {
            steps = Math.floor(Math.abs(renderer.settings.thumbPosition - position.y / renderer.scaleFactor) / offset);
        }
        return steps;
    }

    function _calcTickNumbers(renderer) {

        var steps = (renderer.settings.maxValue - renderer.settings.minValue) / (renderer.settings.majorTicks + 1);
        renderer.tickValues = [];

        for (var i = 0; i < renderer.settings.majorTicks + 2; i += 1) {
            renderer.tickValues[i] = parseFloat(brease.formatter.formatNumber((renderer.settings.minValue + i * steps), renderer.settings.numberFormat, renderer.settings.useDigitGrouping, renderer.settings.separators));
        }
    }

    function _valueDisplayDraw(renderer) {

        var outputPadding = 8;

        renderer.output = $('<output/>')
            .attr('class', 'valueDisplay');

        renderer.outputVal = $('<span/>')
            .attr('class', 'valueOutput');

        renderer.outputUnit = $('<span/>')
            .attr('class', 'unitOutput');

        renderer.output.append([renderer.outputVal, renderer.outputUnit]);
        renderer.containerElement.append(renderer.output);

        if (renderer.settings.orientation === Enum.Orientation.LTR || renderer.settings.orientation === Enum.Orientation.RTL) {
            renderer.output.css('height', renderer.settings.valueDisplaySize)
                .css('top', renderer.settings.height / 2 - renderer.settings.valueDisplaySize - renderer.settings.thumbRadius - outputPadding)
                .css('width', renderer.settings.valueDisplaySize);
        }
        else if (renderer.settings.orientation === Enum.Orientation.TTB || renderer.settings.orientation === Enum.Orientation.BTT) {
            renderer.output.css('width', renderer.settings.valueDisplaySize)
                .css('left', renderer.settings.width / 2 - renderer.settings.valueDisplaySize - renderer.settings.thumbRadius - outputPadding)
                .css('height', renderer.settings.valueDisplaySize);
        }
    }

    function _imgHandling(renderer) {
        if (renderer.settings.image !== undefined && renderer.settings.image !== '') {
            var imgElement = '<img src=' + renderer.settings.image + '></img>';
            renderer.thumbBackground.append(imgElement);
            renderer.thumbCornerHandling(true);
        } 
        else {
            renderer.thumbCornerHandling(false);
        }
    }

    function _getScaleFactor(renderer) {

        var nVer = navigator.appVersion,
            nAgt = navigator.userAgent,
            browserName,
            fullVersion = '' + parseFloat(navigator.appVersion),
            majorVersion = parseInt(navigator.appVersion, 10),
            verOffset, ix;

        if ((verOffset = nAgt.indexOf("Chrome")) !== -1) {
            browserName = "Chrome";
            fullVersion = nAgt.substring(verOffset + 7);
        }

        if ((ix = fullVersion.indexOf(" ")) !== -1) {
            fullVersion = fullVersion.substring(0, ix);
        }

        majorVersion = parseInt('' + fullVersion, 10);

        if (majorVersion <= 57) {
            return Utils.getScaleFactor(renderer.widget.elem);
        }
        else if (majorVersion > 58) {
            return 1;
        }
    }

    return Renderer;

});