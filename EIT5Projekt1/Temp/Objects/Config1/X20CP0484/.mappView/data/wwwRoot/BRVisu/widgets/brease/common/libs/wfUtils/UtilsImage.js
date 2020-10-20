define(function (require) {

    'use strict';

    var d3 = require('libs/d3/d3'),

    UtilsImage = {};

    UtilsImage.getInlineSvg = function (sourceImage) {
        var deferedElement = $.Deferred();
        d3.xml(sourceImage).mimeType("image/svg+xml").get(function (error, xml) {
            deferedElement.resolve($(xml.documentElement));
        });
        return deferedElement.promise();
    };

    UtilsImage.isStylable = function (sourceImage) {
        var isStylable;
        if (sourceImage !== '' && sourceImage !== undefined) {
            isStylable = sourceImage.split('.').pop() === 'svg' ? true : false;
        } else {
            isStylable = false;
        }
        return isStylable;
    };

    return UtilsImage;

});