/**
 * Shortcut for new ObjectWrapper(obj)
 * @param obj {Object}
 * @return {ObjectWrapper}
 */
function obj(obj){
    return new ObjectWrapper(obj);
}

/**
 * Contains useful methods for handling objects
 * @param obj {Object}
 * @constructor
 */
function ObjectWrapper(obj){
    if (typeof(obj !== "object")) {
        throw new TypeError(obj + " is not an object");
    }
    this.obj = obj;
}

/**
 *
 * @param func {Function} Iterator. Invoked with this set to wrapped object, property name and value as params
 * @return {*}
 */
ObjectWrapper.prototype.forEach = function(func){
    for (var name in this.obj){
        if (this.obj.hasOwnProperty(name)){
            func.call(this.obj, name, this.obj[name]);
        }
    }
    return this;
};