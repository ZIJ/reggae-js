/**
 * Adds method with given name to all instances
 * @param name {string}
 * @param func {function}
 * @return {*}
 */
Function.prototype.addMethod = function(name, func){
    this[name] = func;
    return this;
};

/**
 * Calls func for all object's own properties
 * @param func {function} Called with 2 arguments: propertyName and propertyValue
 */
Object.prototype.forEach = function(func){
    for (var name in this){
        if (this.hasOwnProperty(name)){
            func(name, this[name]);
        }
    }
    return this;
};