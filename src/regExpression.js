/**
 * Base class for all Reg types
 * @constructor
 */
function RegExpression(){
    this.pattern = "";
    this.parts = [];
    this.flags = {
        global: false,
        ignoreCase: false,
        multiline: false
    };

}

/**
 * Object which all methods alter
 * @return {RegExpression}
 */
RegExpression.prototype.target = function(){
    return this;
};

RegExpression.prototype.pattern = function(){

}

/**
 * Sets given flag to true
 * @param flagName {String} Name of flag
 * @return {RegExpression}
 */
RegExpression.prototype.flag = function(flagName){
    if(typeof flagName !== "string") {
        throw new TypeError("flagName should be string");
    }
    var target = this.target();
    target.flags[flagName] = true;
    return target;
};

//TODO maybe refactor flag shortcuts using a loop over flags object?

/**
 * Sets global flag (g)
 * @return {RegExpression}
 */
RegExpression.prototype.global = function(){
    return this.flag("global");
};

/**
 * Sets ignoreCase flag (i)
 * @return {RegExpression}
 */
RegExpression.prototype.ignoreCase = function(){
    return this.flag("ignoreCase");
};

/**
 * Sets multiline flag (m)
 * @return {RegExpression}
 */
RegExpression.prototype.multiline = function(){
    return this.flag("multiline");
};

/**
 * Adds subexpression to target's end
 * @param expression {RegExpression} Subexpression
 * @return {RegExpression}
 */
RegExpression.prototype.append = function(expression){
    if (!(expression instanceof RegExpression)) {
        throw new TypeError("expression should be instance of RegExpression");
    }
    var target = this.target();
    target.parts.push(expression);
    return target;
};

