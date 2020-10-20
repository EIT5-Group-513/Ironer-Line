/*global define*/
define(function () {

    'use strict';

    var DummyEvent = function (type, target) {
        this.type = type;
        this.target = target;
    };
    DummyEvent.prototype.preventDefault = function () { };
    DummyEvent.prototype.stopPropagation = function () { };
    DummyEvent.prototype.stopImmediatePropagation = function () { };
    DummyEvent.prototype.isDefaultPrevented = function () { return false; };
    DummyEvent.prototype.isImmediatePropagationStopped = function () { return false; };
    DummyEvent.prototype.isPropagationStopped = function () { return false; };

    return DummyEvent;
});