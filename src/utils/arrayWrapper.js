/**
 * Shortcut for new ArrayWrapper(arr)
 * @param array {Array}
 * @return {ArrayWrapper}
 */
function arr(array){
    return new ArrayWrapper(array);
}

/**
 * Contains useful methods for handling arrays
 * @param arr {Array}
 * @constructor
 */
function ArrayWrapper(arr){
    if (!(arr instanceof Array)) {
        throw new TypeError("first argument should be array");
    }
    this.arr = arr;
}

/**
 *
 * @param func {Function} Iterator. Invoked with this set to wrapped array, index and value as params
 * @return {ArrayWrapper}
 */
ArrayWrapper.prototype.forEach = function(func){
    for (var i = 0; i < this.arr.length; i+=1){
        func.call(this.arr, i, this.arr[i]);
    }
    return this;
};