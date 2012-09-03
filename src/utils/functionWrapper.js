/**
 * Shortcut for new FunctionWrapper(func)
 * @param f {Function}
 * @return {FunctionWrapper}
 */
function func(f){
    return new FunctionWrapper(f);
}

/**
 * Contains useful methods for handling functions
 * @param func {Function}
 * @constructor
 */
function FunctionWrapper(func){
    if (typeof func !== "function") {
        throw new TypeError("first argument should be function");
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
        throw new TypeError(baseConstructor + "first argument should be function");
    }
    var F = function() { };
    F.prototype = baseConstructor.prototype;
    this.func.prototype = new F();
    this.func.prototype.constructor = this.func;
    this.func.uber = baseConstructor.prototype;
    return this;
};