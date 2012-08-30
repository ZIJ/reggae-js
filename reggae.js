/**
 * Reggae JavaScript RegExp constructor
 * Version 0.1
 * Created by Igor Zalutsky
 * Released under MIT license
 */

(function () {

"use strict";

var globalObject = window || global || this;

if (!globalObject.reg) {
    globalObject.reg = {};
}

var reg = globalObject.reg;

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
var characters = {
    bound: "\\b",
    nobound: "\\B",
    digit: "\\d",
    nodigit: "\\D",
    space: "\\s",
    nospace: "\\S",
    word: "\\w",
    noword: "\\W",
    formfeed: "\\f",
    newline: "\\n",
    carriage: "\\r",
    anything: ".",
    tab: "\\t",
    vtab: "\\v",
    nul: "\\0"
};

/**
 * Contains functionality common for all expression constructions
 * @constructor
 */
function RegPart(pattern){
    this.pattern = pattern || "";
}

/**
 * Match preceding item 0 or 1 times
 * @return {*}
 */
RegPart.prototype.optional = function(){
    return this.append("?");
};

/**
 * Match preceding item min "from" and max "to" times
 * @param from {number}
 * @param to {number}
 */
RegPart.prototype.times = function(from, to){
    return this.append("{" + from + "," + to + "}");
};

/**
 * Match preceding item zero or more times
 * @return {*}
 */
RegPart.prototype.zeroOrMore = function(){
    return this.append("*");
};

/**
 * Match preceding item one or more times
 * @return {*}
 */
RegPart.prototype.oneOrMore = function(){
    return this.append("+");
};

RegPart.prototype.group = function(content){

};

RegPart.prototype.set = function(content){

};

/**
 * Extracts pattern from contend and adds it to the end of part's pattern
 * @param content RegPart, RegClass, RegGroup, RegExp or string
 */
RegPart.prototype.append = function(content){
    var pattern = "";
    if (content instanceof RegPart || content instanceof RegExp){
        pattern = content.pattern;
    } else if (typeof content === "string") {
        pattern = content;
    } else {
        throw new TypeError("Wrong content type: " + typeof content);
    }
    return new RegPart(this.pattern + pattern);
};

/**
 * Creating character methods
 */
characters.forEach(function(name, value){
    RegPart.prototype[name] = function(){
        return this.append(characters[name]);
    };
});

globalObject.reg = new RegPart();

}());
