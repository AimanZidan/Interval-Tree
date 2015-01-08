/**
 * Represents a collection of key/value pairs that are accessible by the key or index.
 * The items of an OrderedDictionary are not sorted by the key, unlike the items of a SortedDictionary;
 */
var OrderedDictionary = (function() {
    'use strict';

    /**
     * Constructs a new OrderedDictionary collection
     *
     * @return {OrderedDictionary}
     */
    var OrderedDictionary = function() {
        this._items = []; //An Array to hold the order of the Dictionary by storing the keys 
        this._map = {}; //An object that maps keys to values.
    };

    /**
     * Adds an item to the OrderedDictionary collection
     *
     * @param {String} key The key of the item to add
     * @param {Object} val The value of the item to add
     */
    OrderedDictionary.prototype.add = function(key, val) {
        if (!this._map.hasOwnProperty(key)) {
            this._items.push(key);
        }
        this._map[key] = val;
        return this; // allow method chaining
    };
    /**
     * Gets the value associated with the key
     *
     * @param {String} key The key of the item to get
     * @return {Object} The value associated with the key
     */
    OrderedDictionary.prototype.get = function(key) {
        return this._map[key];
    };

    /**
     * Gets the value at the specified index
     *
     * @param {Number} index The index to get the value at
     * @return {Object} The value at the specified index
     */
    OrderedDictionary.prototype.at = function(index) {
        return this._map[this._items[index]];
    };

    /**
     * Iterates over the OrderedDictionary collection, executing a function for each item.
     *
     * @param {Function(element, index)} fn A function to execute for each item.
     */
    OrderedDictionary.prototype.forEach = function(fn) {
        this._items.forEach(function(element, index) {
            fn(element, this.at(index), index);
        }, this);
        return this; // allow method chaining
    };
    return OrderedDictionary;
}());
