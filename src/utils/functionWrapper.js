/**
 * Shortcut for new FunctionWrapper(func)
 * @param func {Function}
 * @return {FunctionWrapper}
 */
function func(func){
    return new FunctionWrapper(func);
}

/**
 * Contains useful methods for handling functions
 * @param func {Function}
 * @constructor
 */
function FunctionWrapper(func){
    if (typeof(func !== "function")) {
        throw new TypeError(func + " is not a function");
    }
    this.func = func;
}

/**
 * Minimal inheritance function
 * @param baseConstructor
 * @return {FunctionWrapper}
 */
FunctionWrapper.prototype.extend = function(baseConstructor){
    if (typeof baseConstructor !== "function"){
        throw new TypeError(baseConstructor + " is not a function");
    }
    var F = function() { };
    F.prototype = baseConstructor.prototype;
    this.func.prototype = new F();
    this.func.prototype.constructor = this.func;
    this.func.super = baseConstructor.prototype;
    return this;
};