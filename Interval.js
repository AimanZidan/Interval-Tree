/**
 * Represents a time interval which is a period of time, between two points of time
 */
var Interval = (function() {
    'use strict';

    /**
     * Constructs a new time interval
     *
     * @param {Number} start The interval start point
     * @param {Number} end The interval end point. It is always greater than or equal to the start point
     * @param {Object} data The data associated with this interval
     * @return {Interval}
     */
    var Interval = function(start, end, data) {
        this.start = start;
        this.end = end;
        this.data = data;
    };

    /**
     * Does this time interval contains the current point of time
     *
     * @param {Number} time The time in seconds to compare to
     * @return {Boolean} True if this time interval contains the current point of time
     */
    Interval.prototype.contains = function(time) {
        return time > this.start && time < this.end;
    };

    /**
     * Get the value as a String
     *
     * @return {String} The value of the interval
     */
    Interval.prototype.toString = function() {
        return this.data.id + ': ' + this.start + '-' + this.end;
    };
    return Interval;
}());
