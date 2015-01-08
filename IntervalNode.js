/**
 * Represents one single node in the interval tree and its information
 */
var IntervalNode = (function() {
    'use strict';

    /**
     * Constructs an interval node
     *
     * @param {Array} intervals An optional array of intervals
     * @return {IntervalNode}
     */
    var IntervalNode = function(intervals) {
        this.intervals = new OrderedDictionary();
        this.rightNode = null;
        this.center = null;
        this.leftNode = null;
        if (intervals !== undefined) {
            this._init(intervals);
        }
    };

    /**
     * Builds the interval tree
     *
     * @param {Array} intervals An optional array of intervals
     */
    IntervalNode.prototype._init = function(intervals) {
        var right = [],
            left = [];
        this.center = this._getMedian(intervals);
        intervals.forEach(function(interval) {
            if (interval.start > this.center) {
                right.push(interval);
            } else if (interval.end < this.center) {
                left.push(interval);
            } else {
                var subs = this.intervals.get(interval) || [];
                if (!subs.length) {
                    subs.push(interval);
                    this.intervals.add(interval, subs);
                }
            }
        }, this); //passing a value to use as "this" when executing the callback fn.
        if (right.length) {
            this.rightNode = new IntervalNode(right);
        }
        if (left.length) {
            this.leftNode = new IntervalNode(left);
        }
    };

    /**
     * Finds the median integer of the Array, not interpolated.
     *
     * @param {Array} intervals The Array of intervals
     * @return {Number} The median of the intervals Array
     */
    IntervalNode.prototype._getMedian = function(intervals) {
        var edges = {},
            keys = [],
            middleIndex;
        intervals.forEach(function(interval) {
            edges[interval.start] = null;
            edges[interval.end] = null;
        });
        keys = Object.keys(edges); // returns a sorted list of all the object's keys
        middleIndex = Math.floor(keys.length / 2);
        return keys[middleIndex];
    };

    /**
     * Performs a stabbing query on the node
     *
     * @param {Number} time The time to query at
     * @return {Array} All intervals containing time
     */
    IntervalNode.prototype.stabbingQuery = function(time) {
        var result = [];
        this.intervals.forEach(function(k, v) {
            if (v[0].contains(time)) {
                result = result.concat(v);
            } else if (k.start > time) {
                return false;
            }
        });
        if (time < this.center && this.leftNode !== null) {
            result = result.concat(this.leftNode.stabbingQuery(time));
        } else if (time > this.center && this.rightNode !== null) {
            result = result.concat(this.rightNode.stabbingQuery(time));
        }
        return result;
    };
    return IntervalNode;
}());
