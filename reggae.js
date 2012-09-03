/**
 * Reggae JavaScript RegExp builder
 * Version 0.1
 * Created by Igor Zalutsky
 * Released under MIT license
 */

(function () {

"use strict";

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
/**
 * Shortcut for new ObjectWrapper(obj)
 * @param object {Object}
 * @return {ObjectWrapper}
 */
function obj(object){
    return new ObjectWrapper(object);
}

/**
 * Contains useful methods for handling objects
 * @param obj {Object}
 * @constructor
 */
function ObjectWrapper(obj){
    if (typeof obj !== "object") {
        throw new TypeError("first argument should be object");
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
var charShortcuts = {
    bound: "b",
    nobound: "B",
    digit: "d",
    nodigit: "D",
    space: "s",
    nospace: "S",
    word: "w",
    noword: "W",
    formfeed: "f",
    newline: "n",
    ret: "r",
    anything: ".",
    tab: "t",
    vtab: "v",
    nul: "0"
};
/**
 * Base class for all Reg types
 * @constructor
 */
function RegExpression(){
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
    var str = "";
    arr(this.parts).forEach(function(i, part){
        str += part.pattern();
    });
    //TODO refactor flags usage. Maybe separate RegFlags class with pattern() method?
    str += this.flags.global ? "g" : "";
    str += this.flags.ignoreCase ? "i" : "";
    str += this.flags.multiline ? "m" : "";
    return str;
};

RegExpression.prototype.make = function(){
    return new RegExp(this.pattern());
};

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


/**
 * Character subexpression
 * @param str {String} Character or escape sequence
 * @constructor
 */
function RegChar(str){
    RegExpression.call(this);

    var character = "";

    var specialChar = /^[\\{}*+?()|\[\]\^$.]$/;
    // class shortcut, or control character, or hex character, or unicode
    var escapedChar = /^\\(?:[bBdDfnrsStvwW0]|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})$/;
    var backspace = /^\[\\b\]$/;
    if (specialChar.test(str)){
        character = "\\" + str;
    } else if (str.length === 1 || escapedChar.test(str) || backspace.test(str)){
        character = str;
    } else {
        throw new SyntaxError(str + " is not a single character or valid escape sequence");
    }

    /**
     * Gets character value
     * @return {String}
     */
    this.pattern = function(){
        return character;
    };
}

func(RegChar).extend(RegExpression);

/**
 * Shorcut for escaped characters
 * @param chr {String} Single character
 * @return {RegChar}
 */
RegChar.escape = function(chr) {
    //TODO check for special chars in RegChar.escape()
    if (typeof(chr) !== "string" || chr.length !== 1) {
        throw new Error(chr + "is not a single character");
    }
    return new RegChar("\\" + chr);
};

/**
 * Shortcut for control characters (\cX)
 * @param letter {String} Any uppercase letter
 * @return {RegChar}
 */
RegChar.control = function(letter){
    var upperLetter = /^[A-Z]$/;
    if (!upperLetter.test(letter)) {
        throw new SyntaxError(letter + " is not an uppercase letter");
    }
    return new RegChar("\\c" + letter);
};

/**
 * Shortcut for hex-encoded characters (\xHH)
 * @param hexStr {String} 2 hexadecimal digits
 * @return {RegChar}
 */
RegChar.hex = function(hexStr) {
    var twoHexDigits = /^[0-9a-fA-F]{2}$/;
    if (!twoHexDigits.test(hexStr)) {
        throw new SyntaxError(hexStr + " is not a pair of hex digits");
    }
    return new RegChar("\\x" + hexStr);
};

/**
 * Shortcut for unicode character escape sequence
 * @param hexStr {String} 4 hexadecimal digits
 * @return {RegChar}
 */
RegChar.unicode = function(hexStr){
    var fourHexDigits = /^[0-9a-fA-F]{4}$/;
    if (!fourHexDigits.test(hexStr)) {
        throw new SyntaxError(hexStr + " is not four hex digits");
    }
    return new RegChar("\\u" + hexStr);
};

/**
 * Backspace shorctcut ([\b])
 * @return {RegChar}
 */
RegChar.backspace = function(){
    return new RegChar("[\\b]");
};

// Adding shorcut methods to RegChar and RegExpression's prototype
obj(charShortcuts).forEach(function(name, value){
    RegChar[name] = function(){
        return RegChar.escape(value);
    };
    RegExpression.prototype[name] = function(){
        return this.target().append(RegChar[name]());
    };
});


// getting root object (window in browser, global in node, this anywhere else)
var root = window || global || this;
//publishing global reg object
if (!root.reg) {
    root.reg = new RegExpression();
}

/**
 * Overriding target() to make global reg object immutable
 * @return {RegExpression}
 */
root.reg.target = function() {
    return new RegExpression();
};

}());