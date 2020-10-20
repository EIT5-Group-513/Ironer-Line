/*global define*/
define(function (require) {

    'use strict';

    var Deferred = function (type, loopParams) {
        this.type = type;
        this.loopParams = loopParams;
        this._done = [];
        this._fail = [];
    };

    Deferred.prototype = {
        execute: function (list, data) {
            var i = list.length - 1;
            while (i >= 0) {
                list[i].apply(null, data);
                i = i - 1;
            }
            if (this.type === 'singleShot' && list.length > 0) {
                this.terminate();
            }
            this._done = null;
            this._fail = null;
        },
        resolve: function () {
            if (this.state === undefined) {
                this.state = 1;
                _extend(this, 'doneData', 'loopParams', arguments);
                this.execute(this._done, this.doneData);
            }
        },
        reject: function () {
            if (this.state === undefined) {
                this.state = -1;
                _extend(this, 'failData', 'loopParams', arguments);
                this.execute(this._fail, this.failData);
            }
        },
        done: function (callback) {
            if (typeof callback === 'function') {
                if (this.doneData) {
                    callback.apply(null, this.doneData);
                    if (this.type === 'singleShot') {
                        this.terminate();
                    }
                } else if (this._done) {
                    this._done.push(callback);
                }
            }
            return this;
        },
        fail: function (callback) {
            if (typeof callback === 'function') {
                if (this.failData) {
                    callback.apply(null, this.failData);
                    if (this.type === 'singleShot') {
                        this.terminate();
                    }
                } else if (this._fail) {
                    this._fail.push(callback);
                }
            }
            return this;
        },
        terminate: function () {
            this.doneData = null;
            this.failData = null;
            this.loopParams = null;
        }
    };

    function _extend(instance, targetId, arId, args) {
        if (Array.isArray(instance[arId])) {
            for (var i = args.length - 1; i >= 0; i -= 1) {
                instance[arId].unshift(args[i]);
            }
            instance[targetId] = instance[arId];
        } else {
            instance[targetId] = args;
        }
        instance[arId] = null;
    }

    return Deferred;

});