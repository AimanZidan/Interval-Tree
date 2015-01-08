/**
 * Represents a tree of intervals that map to objects which can be queried for all data associated with a particular point of time
 */
var IntervalTree = (function() {
    'use strict';

    /**
     * Constructs a new interval tree with no intervals
     *
     * @return {IntervalTree}
     */
    var IntervalTree = function() {
        this._head = new IntervalNode();
        this._intervals = [];
        this._isInSync = true;
        this.size = 0;
    };

    /**
     * Adds an interval to the tree
     *
     * @param {Number} start The interval start point
     * @param {Number} end The interval end point. It is always greater than or equal to the start point
     * @param {Object} data The data associated with this interval
     */
    IntervalTree.prototype.add = function(start, end, data) {
        this._intervals.push(new Interval(start, end, data));
        this._isInSync = false;
    };

    /**
     * Gets all the intervals' data at the specified time
     *
     * @param {Number} time The time to query at
     * @return {Array} All the intervals' data
     */
    IntervalTree.prototype.get = function(time) {
        this._build();
        var result = [],
            intervals = this._head.stabbingQuery(time);
        intervals.forEach(function(interval) {
            result.push(interval.data);
        });
        return result;
    };

    /**
     * Builds a new interval tree with intervals and adjusts the proper tree's properties
     */
    IntervalTree.prototype._build = function() {
        if (!this._isInSync) {
            this._head = new IntervalNode(this._intervals);
            this.size = this._intervals.length;
            this._isInSync = true;
        }
    };

    return IntervalTree;
}());
