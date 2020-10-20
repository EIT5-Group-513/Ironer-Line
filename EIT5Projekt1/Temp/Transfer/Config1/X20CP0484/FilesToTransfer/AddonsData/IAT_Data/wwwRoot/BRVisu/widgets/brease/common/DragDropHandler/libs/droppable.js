define([], function () {
    'use strict';
    function Droppable() {
        this.id = "";
        this.elem = {};
        this.dragEnter = function(){};
        this.dragLeave = function(){};
        this.dragMove = function(){};
        this.drop = function(){};
    }

    return Droppable;
});