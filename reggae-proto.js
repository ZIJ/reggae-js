/**
 * Created by Igor Zalutsky on 29.08.12 at 20:26
 */

//TODO separate classes from makers

(function () {
    "use strict";
    var globalObject = window || global || this;
    if (!globalObject.reg) {
        globalObject.reg = new RegexpMaker();
    }
    var reg = globalObject.reg;

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

    var classes = {
        digits: "0-9",
        letters: "a-zA-Z",
        lowerLetters: "a-z"
    };

    function RegexpMaker(pattern){
        this.pattern = pattern || "";
    }

    RegexpMaker.prototype.start = function() {
        return new RegexpMaker("^");
    };

    RegexpMaker.prototype.end = function() {
        if (this.pattern.indexOf("$") === this.pattern.length - 1){
            return this;
        } else {
            return this.text("$");
        }
    };

    RegexpMaker.prototype.text = function(str) {
        return new RegexpMaker(this.pattern + str);
    };

    RegexpMaker.prototype.make = function(){
        //TODO add flags
        return new RegExp(this.pattern)
    };


    for (var name in characters) {
        addTrivial(name, characters[name]);
    }

    addWrapper("group", "(", ")");
    addWrapper("nogroup", "(?:", ")");
    addWrapper("class", "[", "]");
    addWrapper("noclass", "[^:", "]");


    function addTrivial(name, pattern){
        RegexpMaker.prototype[name] = function(){
            return this.text(pattern);
        };
    }

    function addWrapper(name, before, after){
        RegexpMaker.prototype[name] = function(content){
            return this.text(before + patternFrom(content) + after);
        };
    }

    function patternFrom(content){
        if (content instanceof RegexpMaker || content instanceof RegExp){
            return content.pattern;
        } else if (typeof content === "string") {
            return content;
        } else {
            throw new Error("Wrong content type: " + typeof content);
        }
    }

    //TODO add control characters, unicode, hex and octal




}());
