/*global define*/
define(function (require) {

    'use strict';

    var Queue = function Queue(target, task) {
        if (target.id === undefined || target.id === '') {
            target.setAttribute('id', _getUniqueName(task + '_queue'));
        }
        this.id = target.id;
        this.queue = [];
        this.idQueue = [];
        this.runningQueue = [];
        this.processLength = 0;
        this.task = task;
        this.isRunning = false;
        this.elem = target;

        if (_tasks[this.task] === undefined) {
            _tasks[this.task] = {};
        }
        _tasks[this.task][this.id] = this;
    },

    p = Queue.prototype;

    p.enqueue = function (item) {
        if (Array.isArray(item)) {
            for (var i = 0; i < item.length; i += 1) {
                if (item[i].id && this.idQueue.indexOf(item[i].id) === -1) {
                    this.queue.push(item[i]);
                    this.idQueue.push(item[i].id)
                    this.processLength += 1;
                }
            }
        } else if (item.id && this.idQueue.indexOf(item.id) === -1) {
            this.queue.unshift(item);
            this.idQueue.push(item.id)
            this.processLength += 1;
        }
    };

    p.start = function (startMethod, args) {
        if (this.isRunning !== true) {
            this.deferred = $.Deferred();
            this.isRunning = true;
            if (this.queue.length === 0) {
                this.stop();
                this.finish();
            }
            if (Array.isArray(args)) {
                startMethod.apply(null, [this].concat(args));
            } else {
                startMethod(this);
            }
        }
    };

    p.run = function (runMethod) {
        this.runMethod = runMethod;
        if (this.queue.length > 0) {
            while (this.queue.length > 0) {
                //var item = this.queue.shift();
                var item = this.queue.pop();
                this.runningQueue.push(item);
                runMethod(item, this);
            }
        } else {
            this.stop();
            this.finish();
        }
    };

    p.isFinished = function () {
        return this.deferred.promise();
    };

    p.finish = function () {
        this.queue = [];
        this.idQueue = [];
        this.runningQueue = [];
        this.processLength = 0;
        this.runMethod = null;
        if (this.deferred) {
            this.deferred.resolve(this.elem);
        }
        this.elem = null;
        _tasks[this.task][this.id] = undefined;
    };

    p.finishItem = function (itemId) {
        if (this.isRunning === true) {
            this.processLength -= 1;

            if (this.processLength === 0) {
                this.isRunning = false;
                this.finish();
            }
            if (this.queue.length > 0) {
                this.run(this.runMethod);
            }
        }
    };

    p.stop = function () {
        this.processLength = 0;
        this.isRunning = false;
        this.pending = false;
    };

    var _index = 0,
        _tasks = {};

    function _getUniqueName(prefix) {
        _index += 1;
        return prefix + _index;
    }

    Queue.getQueue = function (elem, task, create) {
        var queue;
        if (elem.id !== undefined && _tasks[task] !== undefined) {
            queue = _tasks[task][elem.id];
            if (queue !== undefined) {
                queue.elem = elem;
            }
        }
        if (create === true && queue === undefined) {
            queue = new Queue(elem, task);
        }
        return queue;
    };

    return Queue;

});