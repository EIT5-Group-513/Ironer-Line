define([], function () {
    'use strict';
    function Draggable() {
        this.id = "";
        this.elem = {};
        this.clone = false;
        this.cloneClassList = [];
        this.data = null;
    }

    return Draggable;
});