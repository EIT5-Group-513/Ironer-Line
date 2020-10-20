/*global brease*/
define(function (require) {

    'use strict';

    /**
    * @class widgets.brease.common.libs.Renderer
    * #Description
    * Renderer
    * @extends brease.core.Class
    *
    * @iatMeta studio:visible
    * false
    */

    var SuperClass = require('brease/core/Class'),
        d3 = require('libs/d3/d3'),
        Utils = require('brease/core/Utils'),
        globalize = require('globalize'),

    defaultSettings = {
        enableZoomingBehavior: true,
        interpolate: 'linear'
    },

    ModuleClass = SuperClass.extend(function Renderer(widget, options) {
	    SuperClass.call(this);

        if (options !== undefined) {
            this.settings = $.extend(true, {}, this.defaultSettings, options);
        } else {
            this.settings = Utils.deepCopy(this.defaultSettings);
        }
	    this.widget = widget;
	    this.dataAdapter = widget.dataAdapter;
	    this.clipPathId = Utils.uniqueID(this.widget.elem.id + '_svg_clipPath');

	    this.init();

    }, defaultSettings),

	p = ModuleClass.prototype;

    p.init = function () {

        this.svg = d3.select(this.widget.elem)
            .append('svg')
            .attr('width', this.widget.el.width())
            .attr('height', this.widget.el.height());

        this.zoomBehaviorXAxes = [];
        this.zoomBehaviorYAxes = [];
        this.mainZoomBehaviorId = '';
        _createGroups(this);
        _createAxis(this);
        if (this.settings.enableZoomingBehavior) { _createZoomBehavior(this); }
        _createGraphs(this);
        _createCursors(this);
        _applyCursorDragBehavior(this);
    };

    p.updateAxis = function () {

        _updateAxis(this);
        if (this.settings.enableZoomingBehavior) { _updateZoomBehavior(this); }
    };

    p.updateCursor = function () {

        _updateCursor(this);
    };

    p.updateGraphs = function () {

        _updateGraphs(this);
    };

    p.updateZoomLevelLimits = function () {

        _updateZoomLevelLimits(this);
    };

    p.zoomIn = function () {

            _adjustZooming(this, this.widget.settings.zoomFactor, { x: 0, y: 0 });
    };

    p.zoomOut = function () {

            _adjustZooming(this, 1 / this.widget.settings.zoomFactor, { x: 0, y: 0 });

    };

    p.scrollLeft = function () {

        _adjustZooming(this, 1, { x: this.widget.settings.scrollFactor, y: 0 });
    };

    p.scrollRight = function () {

        _adjustZooming(this, 1, { x: -this.widget.settings.scrollFactor, y: 0 });
    };

    p.scrollUp = function () {

        _adjustZooming(this, 1, { x: 0, y: this.widget.settings.scrollFactor });
    };

    p.scrollDown = function () {

        _adjustZooming(this, 1, { x: 0, y: -this.widget.settings.scrollFactor });
    };

    p.xCursorStepLeft = function (xCursorId, stepSize) {
        _xCursorStepLeft(this, xCursorId, stepSize);
    };

    p.xCursorStepRight = function (xCursorId, stepSize) {
        _xCursorStepRight(this, xCursorId, stepSize);
    };

    p.xCursorDisableDrag = function (xCursorId) {
        _xCursorDisableDrag(this, xCursorId);
    };

    p.xCursorEnableDrag = function (xCursorId) {
        _xCursorEnableDrag(this, xCursorId);
    };

    p.dispose = function () {

    };

    // Private Functions
    function _createGroups(renderer) {

        var chartArea = renderer.dataAdapter.getChartArea();

        renderer.svg.append('defs')
            .append('clipPath')
            .attr('id', renderer.clipPathId)
                .append('rect')
                    .attr('x', 0.5)
                    .attr('y', 0.5)
                    .attr('width', chartArea.width - 1)
                    .attr('height', chartArea.height - 1);

        renderer.svg.append('g')
            .attr('class', 'chart')
            .attr("transform", "translate(" + (chartArea.x + 0.5) + "," + (chartArea.y + 0.5) + ")")
            .append('rect')
                .attr('width', chartArea.width)
                .attr('height', chartArea.height);

        renderer.svg.selectAll('g.xAxis')
            .data(d3.values(renderer.dataAdapter.getXAxisAreas()))
            .enter()
            .append('g')
                .attr('class', 'axis xAxisArea')
                .attr('transform', function (d) {
                    return 'translate(' + (d.x + 0.5) + ',' + (d.y + 0.5) + ')';
                });

        renderer.svg.selectAll('g.yAxis')
            .data(d3.values(renderer.dataAdapter.getYAxisAreas()))
            .enter()
            .append('g')
                .attr('class', 'axis yAxisArea')
                .attr('transform', function(d) {
                    return 'translate(' + (d.x + 0.5) + ',' + (d.y + 0.5) + ')';
                });
    }

    function _createAxis(renderer) {

        var chartArea = renderer.dataAdapter.getChartArea();

        renderer.svg.selectAll('g.xAxisArea')
            .each(function (d) {
                var gXAxisArea = d3.select(this)
                    .append('g')
                    .attr('id', d.id + '_breaseChartXAxis')
                    .attr('class', 'xAxis')
                    .classed('disabled', !renderer.widget.chartItems.xAxis[d.id].isEnabled())
                    .classed('remove', renderer.widget.chartItems.xAxis[d.id].isHidden)
                    .attr('fill', 'none')
                    .attr('transform', function (d) {
                        return 'translate(0, ' + ((d.info.position === 'top') ? d.height : 0) + ')';
                    });

                gXAxisArea.append('g')
                    .attr('transform', 'translate(' + (chartArea.width / 2) + ', ' + ((d.info.position === "top") ? -d.info.axisLabelDistance : d.info.axisLabelDistance) +')')
                        .append('text')
                        .attr('class', 'xAxisDescription')
                        .attr('dy', ((d.info.position === "top") ? '-0.03em' : '0.75em'))
                        .style('text-anchor', 'middle');
            });

        renderer.svg.selectAll('g.chart')
            .append('g')
            .attr('class', 'xGrid gridLines')
            .attr('clip-path', 'url(' + document.location.pathname + document.location.search + '#' + renderer.clipPathId + ')');

        renderer.svg.selectAll('g.chart')
            .append('g')
            .attr('class', 'yGrid gridLines')
            .attr('clip-path', 'url(' + document.location.pathname + document.location.search + '#' + renderer.clipPathId + ')');

        renderer.svg.selectAll('g.yAxisArea')
            .each(function (d) {

                var gYAxisArea = d3.select(this)
                    .append('g')
                    .attr('id', d.id + '_breaseChartYAxis')
                    .attr('class', 'yAxis')
                    .classed('disabled', !renderer.widget.chartItems.yAxis[d.id].isEnabled())
                    .classed('remove', renderer.widget.chartItems.yAxis[d.id].isHidden)
                    .attr('fill', 'none')
                    .attr('transform', function (d) {
                        return 'translate(' + ((d.info.position === 'left') ? d.width : 0) + ', 0)';
                    });

                gYAxisArea.append('g')
                    .attr('transform', 'rotate(-90) translate(-' + (d.height / 2) + ', ' + ((d.info.position === "left") ? -d.info.axisLabelDistance : d.info.axisLabelDistance) + ')')
                        .append('text')
                        .attr('class', 'yAxisDescription')
                        .attr('dy', ((d.info.position === "left") ? '-0.03em' : '0.75em'))
                        .style('text-anchor', 'middle');
            });
    }

    function _createCursors(renderer) {

        var chartArea = renderer.dataAdapter.getChartArea();

        // cursor area
        renderer.svg.select('g.chart').selectAll('g.xCursorAreas')
            .data(d3.values(renderer.dataAdapter.getXAxisCursorAreas()))
            .enter()
            .append('g')
            .attr('class', 'xCursorArea')
            .classed('disabled', function (d) {
                return !renderer.widget.chartItems.xCursors[d.id].isEnabled();
            })
            .classed('remove', function (d) {
                return renderer.widget.chartItems.xCursors[d.id].isHidden;
            })
            .attr('clip-path', 'url(' + document.location.pathname + document.location.search + '#' + renderer.clipPathId + ')')
                .append('rect')
                .attr('class', function(d) {
                    return 'cursor ' + d.id;
                })
                .classed('remove', function (d) {
                    return renderer.widget.chartItems.xCursors[d.id].isHidden;
                })
                .attr('transform', function (d) {
                    return 'translate(' + (d.x + 0.5) + ',' + (d.y + 0.5) + ')';
                })
                .attr('height', function (d) {
                    return d.height;
                })
                .attr('width', function (d) {
                    return d.width;
                })
                .style('fill', 'transparent')
                .style('stroke', 'transparent');

        // cursor line
        renderer.svg.selectAll('g.xCursorArea')
            .each(function (d) {
                var self = this,
                    cursorWidget = renderer.widget.chartItems.xCursors[d.id],
                    xScale = renderer.dataAdapter.xAxisAreas[cursorWidget.axisWidget.elem.id].scale,
                    gXCursorArea = d3.select(this)
                    .attr('id', d.id + '_breaseChartXAxisCursor')
                    .append('line')
                    .attr('class', 'cursor ' + d.id)
                    .classed('remove', renderer.widget.chartItems.xCursors[d.id].isHidden)
                    .attr('x1', 0)
                    .attr('x2', 0)
                    .attr('y1', 0)
                    .attr('y2', chartArea.height);

            });
            
        // cursor markers
        renderer.svg.selectAll('g.xCursorArea')
            .each(function (d) {
                var gXCursorArea = d3.select(this),
                    graphWidgets = renderer.dataAdapter.widget.chartItems.xCursors[d.id].graphWidgets,
					xCursorWidget = renderer.widget.chartItems.xCursors [d.id];

                for (var graph in graphWidgets) {
                    gXCursorArea.append('circle')
                        .attr('class', 'marker ' + graph + ' breaseChartXAxisCursor ' + d.id)
                        .classed('remove', renderer.widget.chartItems.xCursors[d.id].isHidden)
                        .attr('r', 5)
                        .attr('cx', renderer.dataAdapter.xAxisAreas[xCursorWidget.axisWidget.elem.id].scale(xCursorWidget._getValue()))
                        .attr('cy', (d.yValues[graph]) ? d.yValues[graph] : chartArea.height);
                }
            });
    }

    function _updateAxis(renderer) {

        var xAxisAreas = renderer.dataAdapter.getXAxisAreas(),
            yAxisAreas = renderer.dataAdapter.getYAxisAreas();


        renderer.svg.selectAll('g.xAxisArea')
            .each(function (d) {
                var xAxisWidget = renderer.widget.chartItems.xAxis[d.id];

                var xAxis = d3.svg.axis()
                        .scale(d.scale)
                        .orient(d.info.position)
                        .tickFormat(function (d) {
                            return _tickFormat(renderer.dataAdapter.xAxisAreas[xAxisWidget.elem.id].info.format, d, renderer.dataAdapter.xAxisAreas[xAxisWidget.elem.id].info.type);
                        });

                d3.select(this).selectAll('g.xAxis')
                    .call(xAxis);

                d3.select(this).selectAll('text.xAxisDescription')
                    .text(xAxisWidget.getAxisLabel());
            });

        renderer.svg.selectAll('g.yAxisArea')
            .each(function (d) {

                var yAxisWidget = renderer.widget.chartItems.yAxis[d.id];

                var yAxis = d3.svg.axis()
                    .scale(d.scale)
                    .orient(d.info.position)
                    .tickFormat(function (d) {
                        return _tickFormat(renderer.dataAdapter.yAxisAreas[yAxisWidget.elem.id].info.format, d, renderer.dataAdapter.yAxisAreas[yAxisWidget.elem.id].info.type);
                    });

                d3.select(this).selectAll('g.yAxis')
                    .call(yAxis);

                d3.select(this).selectAll('text.yAxisDescription')
                    .text(yAxisWidget.getAxisLabel() + ' ' + yAxisWidget.currentUnitSymbol());
            });

        _updateGrid(renderer, renderer.widget.settings.showGrid);
        _updateGraphs(renderer);
    }

    function _updateGrid(renderer, visible) {

        var chartArea = renderer.dataAdapter.getChartArea(),
            yAxisAreas = renderer.dataAdapter.getYAxisAreas(),
            yAxisAreaLeft = null,
            yAxisAreaRight = null,
            yAxisAreaGrid = null,
            xAxisAreas = renderer.dataAdapter.getXAxisAreas(),
            xAxisAreaTop = null,
            xAxisAreaBottom = null,
            xAxisAreaGrid = null,
            xGrid,
            yGrid;


        for (var areaId in yAxisAreas) {
            if (yAxisAreas[areaId].info.position === 'left') {
                yAxisAreaLeft = yAxisAreas[areaId];
            }
            if (yAxisAreas[areaId].info.position === 'right') {
                yAxisAreaRight = yAxisAreas[areaId];
            }
        }
        yAxisAreaGrid = (yAxisAreaLeft) ? yAxisAreaLeft : yAxisAreaRight;

        for (areaId in xAxisAreas) {
            if (xAxisAreas[areaId].info.position === 'bottom') {
                xAxisAreaBottom = xAxisAreas[areaId];
            }
            if (xAxisAreas[areaId].info.position === 'top') {
                xAxisAreaTop = xAxisAreas[areaId];
            }
        }
        xAxisAreaGrid = (xAxisAreaBottom) ? xAxisAreaBottom : xAxisAreaTop;


        if ((visible) && (xAxisAreaGrid) && (yAxisAreaGrid)) {

            xGrid = d3.svg.axis()
                .scale(xAxisAreaGrid.scale)
                .outerTickSize(0)
                .innerTickSize(-chartArea.height)
                .orient('top');

            yGrid = d3.svg.axis()
                .scale(yAxisAreaGrid.scale)
                .outerTickSize(0)
                .innerTickSize(-chartArea.width)
                .orient('left');

            renderer.svg.selectAll('g.xGrid')
                .call(xGrid);

            renderer.svg.selectAll('g.yGrid')
                .call(yGrid);
        } else {

            renderer.svg.selectAll('g.xGrid')
                .selectAll('*')
                .remove();

            renderer.svg.selectAll('g.yGrid')
                .selectAll('*')
                .remove();
        }
    }

    function _updateCursor(renderer) {

        renderer.svg.selectAll('g.xCursorArea')
            .each(function (d) {

                var xCursorWidget = renderer.widget.chartItems.xCursors[d.id];

                var x = renderer.dataAdapter.xAxisAreas[xCursorWidget.axisWidget.elem.id].scale(xCursorWidget._getValue());

                renderer.svg.select('rect.' + d.id)
                    .attr('transform', 'translate(' + (x - renderer.dataAdapter.settings.cursorAreaWidth/2) + ', 0)');

                var lineCursor = renderer.svg.select('line.' + d.id)
                    .attr('transform', 'translate(' + x + ', 0)');

                for (var graphId in d.yValues) {
                    var markerCursor = renderer.svg.selectAll('circle.marker.' + graphId + '.' + d.id),
                        y = renderer.dataAdapter.yAxisAreas[d.yValueAxes[graphId]].scale(d.yValues[graphId]);

                    markerCursor.attr('cx', x)
                        .attr('cy', (y) ? y : renderer.dataAdapter.getChartArea().height);
                }
            });
    }

    function _createZoomBehavior(renderer) {

        var allYAxisAreas = renderer.svg.selectAll('g.yAxisArea'),
            allXAxisAreas = renderer.svg.selectAll('g.xAxisArea');

        allYAxisAreas.each(function (d) {

            renderer.zoomBehaviorYAxes[d.id] = d3.behavior.zoom()
                .scaleExtent([d.info.minZoomLevel, d.info.maxZoomLevel])
                .on("zoomstart", function (renderer) {
                    d3.event.sourceEvent.stopPropagation();
                })
                .on("zoom", function () {
                    d3.event.sourceEvent.stopPropagation();
                    _handleZooming(renderer);
                });

            renderer.mainZoomBehaviorId = d.id;
        });

        allXAxisAreas.each(function (d) {
            renderer.zoomBehaviorXAxes[d.id] = d3.behavior.zoom()
                .scaleExtent([d.info.minZoomLevel, d.info.maxZoomLevel])
                .on("zoomstart", function () {
                    d3.event.sourceEvent.stopPropagation();
                })
                .on("zoom", function () {
                    d3.event.sourceEvent.stopPropagation();
                    _handleZooming(renderer);
                })
                .on("zoomend", function () {

                });
        });

        renderer.svg.selectAll('g.chart')
            .call(renderer.zoomBehaviorYAxes[renderer.mainZoomBehaviorId]);
    }

    function _updateZoomLevelLimits(renderer) {

        var allYAxisAreas = renderer.svg.selectAll('g.yAxisArea'),
            allXAxisAreas = renderer.svg.selectAll('g.xAxisArea');

        allYAxisAreas.each(function (d) {
            renderer.zoomBehaviorYAxes[d.id].scaleExtent([d.info.minZoomLevel, d.info.maxZoomLevel]);
                });

        allXAxisAreas.each(function (d) {
            renderer.zoomBehaviorXAxes[d.id].scaleExtent([d.info.minZoomLevel, d.info.maxZoomLevel]);
        });

        renderer.svg.selectAll('g.chart')
            .call(renderer.zoomBehaviorYAxes[renderer.mainZoomBehaviorId]);
    }

    function _updateZoomBehavior(renderer) {

        var yAxisAreas = renderer.dataAdapter.getYAxisAreas(),
            xAxisAreas = renderer.dataAdapter.getXAxisAreas(),
            xAxisAreaBottom = {},
            yAxisAreaLeft = {};

        for (var areaId in yAxisAreas) {
            if (yAxisAreas[areaId].info.position === 'left') {
                yAxisAreaLeft = yAxisAreas[areaId];
            }
        }

        for (areaId in xAxisAreas) {
            if (xAxisAreas[areaId].info.position === 'bottom') {
                xAxisAreaBottom = xAxisAreas[areaId];
            }
        }

        renderer.svg.selectAll('g.yAxisArea')
            .each(function (d) {

                renderer.zoomBehaviorYAxes[d.id]
                    .y(yAxisAreas[d.id].scale);
            });

        renderer.svg.selectAll('g.xAxisArea')
            .each(function (d) {
                renderer.zoomBehaviorXAxes[d.id]
                    .x(xAxisAreas[d.id].scale);
            });
    }

    function _handleZooming(renderer) {

        var mainZoomBehavior = renderer.zoomBehaviorYAxes[renderer.mainZoomBehaviorId],
            ev = new CustomEvent('Zoomed');

        renderer.widget.dispatchEvent(ev);

        for (var zoomBehaviorId in renderer.zoomBehaviorYAxes) {

            if (zoomBehaviorId === renderer.mainZoomBehaviorId) { continue; }

            renderer.zoomBehaviorYAxes[zoomBehaviorId]
                .scale(mainZoomBehavior.scale())
                .translate(mainZoomBehavior.translate());
        }

        for (zoomBehaviorId in renderer.zoomBehaviorXAxes) {
            renderer.zoomBehaviorXAxes[zoomBehaviorId]
                .scale(mainZoomBehavior.scale())
                .translate(mainZoomBehavior.translate());
        }

        _updateAxis(renderer);
        _updateGraphs(renderer);
        _updateCursor(renderer);

    }

    function _createGraphs(renderer) {

        var graphGroups = renderer.svg.select('g.chart')
            .selectAll('g.graph')
            .data(renderer.dataAdapter.getGraphs())
            .enter()
            .append('g')
                .attr('clip-path', 'url(' + document.location.pathname + document.location.search + '#' + renderer.clipPathId + ')')
                .attr('class', 'graph');

        graphGroups.each(function (d) {

            var area = d3.svg.area();

            d3.select(this).append('path')
                .datum(d.coordinates)
                .attr('id', d.id + '_breaseChartYValueList_area')
                .attr('class', 'area')
                .style('stroke', 'none')
                .classed('disabled', !renderer.widget.chartItems.yValues[d.id].isEnabled())
                .classed('remove', renderer.widget.chartItems.yValues[d.id].isHidden)
                .attr('d', area(d.coordinates));

            var line = d3.svg.line();

            d3.select(this).append('path')
                .attr('id', d.id + '_breaseChartYValueList')
                .attr('class', 'graph')
                .style('fill', 'none')
                .classed('disabled', !renderer.widget.chartItems.yValues[d.id].isEnabled())
                .classed('remove', renderer.widget.chartItems.yValues[d.id].isHidden)
                .attr('d', line(d.coordinates));
        });
    }

    function _updateGraphs(renderer) {

        var graphGroups = renderer.svg.select('g.chart')
            .selectAll('g.graph')
            .data(renderer.dataAdapter.getGraphs());

        graphGroups.each(function (d) {

            var yScale = d.yScale,
                xScale = d.xScale;

            var area = d3.svg.area()
                .interpolate(renderer.settings.interpolate)
                .x(function (d) {
                    return xScale(d.x);
                })
                .y0(renderer.dataAdapter.chartArea.height)
                .y1(function (d) {
                    return yScale(d.y);
                });

            d3.select(this).selectAll('path.area')
                .attr('d', area(d.coordinates));


            var line = d3.svg.line()
                .interpolate(renderer.settings.interpolate)
                .x(function (d) {
                    return xScale(d.x);
                })
                .y(function (d) {
                    return yScale(d.y);
                });

            d3.select(this).selectAll('path.graph')
                .attr('d', line(d.coordinates));
        });
    }

    function _adjustZooming(renderer, zoomFactor, scrollFactor) {

        var mainZoomBehavior = renderer.zoomBehaviorYAxes[renderer.mainZoomBehaviorId],
            chartArea = renderer.dataAdapter.getChartArea(),
            center = [chartArea.width / 2, chartArea.height / 2],
            viewOld = {
                x: mainZoomBehavior.translate()[0],
                y: mainZoomBehavior.translate()[1],
                s: mainZoomBehavior.scale()
            },
            translate = [
                (center[0] - viewOld.x) / viewOld.s,
                (center[1] - viewOld.y) / viewOld.s
            ],
            viewNew = {
                x: viewOld.x + chartArea.width * scrollFactor.x,
                y: viewOld.y + chartArea.height * scrollFactor.y,
                s: mainZoomBehavior.scale() * (zoomFactor)
            },
            translateOffset;

        if (viewNew.s < mainZoomBehavior.scaleExtent()[0]) {
            viewNew.s = mainZoomBehavior.scaleExtent()[0];
        } else if (viewNew.s > mainZoomBehavior.scaleExtent()[1]) {
            viewNew.s = mainZoomBehavior.scaleExtent()[1];
        }

        translateOffset = [translate[0] * viewNew.s + viewOld.x, translate[1] * viewNew.s + viewOld.y];

        viewNew.x += (center[0] - translateOffset[0]);
        viewNew.y += (center[1] - translateOffset[1]);

        mainZoomBehavior.scale(viewNew.s);
        mainZoomBehavior.translate([viewNew.x, viewNew.y]);

        _handleZooming(renderer);
    }

    function _createCursorDragBehavior(renderer) {

        var drag = d3.behavior.drag()
                .on("dragstart", function (d) {

                    var xCursorWidget = renderer.widget.chartItems.xCursors[d.id];

                    d3.event.sourceEvent.stopPropagation();
                    
                    if (!xCursorWidget._getActive()) {
                        xCursorWidget.axisWidget._setActiveCursor(d.id);
                    }
                })
                .on("drag", function (d) {
                    var scaleFactor = Utils.getScaleFactor(renderer.widget.elem);
                    var mousePosX = (d3.event.x / scaleFactor) + (renderer.dataAdapter.getChartArea().x / scaleFactor) - renderer.dataAdapter.getChartArea().x;
                    var xCursorWidget = renderer.widget.chartItems.xCursors[d.id],
                        domain = xCursorWidget.axisWidget._xPositions(xCursorWidget.cursorType),
                        xCursorDrag = renderer.dataAdapter.xAxisAreas[xCursorWidget.axisWidget.elem.id].scale.invert(mousePosX),
                        currentXCursor = xCursorWidget._getValue(),
                        newXCursor;

                    var idx = d3.bisectLeft(domain, xCursorDrag),
                        x0 = domain[Math.max(idx - 1, 0)],
                        x1 = domain[Math.min.apply(Math,[idx, domain.length-1, renderer.dataAdapter.xAxisCursorAreas[xCursorWidget.elem.id].maxAvailableXPositionIndex])];

                    newXCursor = (((+xCursorDrag) - (((+x1) + (+x0)) / 2) < 0)) ? x0 : x1;

                    if (newXCursor !== currentXCursor) {
                        renderer.widget.chartItems.xCursors[d.id]._updateValue(newXCursor);
                        _updateCursor(renderer);
                    }

                })
                .on("dragend", function (d) {
                });

        return drag;
    }

    function _applyCursorDragBehavior(renderer) {

        var drag = _createCursorDragBehavior(renderer);

        renderer.svg.selectAll('g.xCursorArea')
            .each(function (d) {
                if (renderer.widget.chartItems.xCursors[d.id].getEnable()) {
                    d3.select(this).call(drag);
                }
            });
    }

    function _xCursorStepLeft(renderer, xCursorId, stepSize) {

        var cursorWidget = renderer.widget.chartItems.xCursors[xCursorId],
            currentIdx = cursorWidget.axisWidget._xPositions(cursorWidget.cursorType).map(function(d) {
                return +d;}).indexOf(+cursorWidget._getValue()),
            newIdx;

        newIdx = ((currentIdx - stepSize) >= 0 ) ? currentIdx - stepSize : currentIdx;

        if (newIdx !== currentIdx) {
            renderer.widget.chartItems.xCursors[xCursorId]._updateValue(cursorWidget.axisWidget._xPositions(cursorWidget.cursorType)[newIdx]);
            _updateCursor(renderer);
        }
    }

    function _xCursorStepRight(renderer, xCursorId, stepSize) {

        var cursorWidget = renderer.widget.chartItems.xCursors[xCursorId],
            currentIdx = cursorWidget.axisWidget._xPositions(cursorWidget.cursorType).map(function(d){
                return +d;}).indexOf(+cursorWidget._getValue()),
            newIdx;

        newIdx = ((currentIdx + stepSize) <= renderer.dataAdapter.xAxisCursorAreas[cursorWidget.elem.id].maxAvailableXPositionIndex) ? currentIdx + stepSize : currentIdx;

        if (newIdx !== currentIdx) {
            renderer.widget.chartItems.xCursors[xCursorId]._updateValue(cursorWidget.axisWidget._xPositions(cursorWidget.cursorType)[newIdx]);
            _updateCursor(renderer);
        }
    }

    function _xCursorDisableDrag(renderer, xCursorId) {
        var xCursorArea = renderer.svg.selectAll('g.xCursorArea').filter(function (d) { return (d.id === xCursorId) ? this : null; });

        xCursorArea.on('.drag', null);
    }

    function _xCursorEnableDrag(renderer, xCursorId) {

        var xCursorArea = renderer.svg.selectAll('g.xCursorArea').filter(function (d) { return (d.id === xCursorId) ? this : null; }),
            drag = _createCursorDragBehavior(renderer);

        xCursorArea.call(drag);
        
    }

    function _tickFormat(format, d, axisType) {

        var numFormat;

        switch (axisType) {

            case 'dateTime':
                return Globalize.format(d, format);

            case 'secondsAsNumber':
                numFormat = d3.format("0.6f");
                return numFormat(d);

            default:
                var digits = (format.decimalPlaces === 0) ? format.minimumIntegerDigits : format.minimumIntegerDigits + format.decimalPlaces + 1;

                numFormat = d3.format("0" + ((d < 0) ? digits + 1 : digits) + "." + format.decimalPlaces + "f");

                return numFormat(d);
        }
    }

    return ModuleClass;
});
