/**
 * Character subexpression
 * @param str {String} Character or escape sequence
 * @constructor
 */
function RegChar(str){
    RegExpression.call(this);

    var specialChar = /^[\\{}*+?()|\[\]^$.]$/;
    // class shortcut, or control character, or hex character, or unicode
    var escapedChar = /^\\(?:[bBdDfnrsStvwW0]|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})$/;
    if (specialChar.test(str)){
        this.pattern = "\\" + str;
    } else if (str.length === 1 || escapedChar.test(str)){
        this.pattern = str;
    } else {
        throw new SyntaxError(str + " is not a single character or valid escape sequence");
    }
}

//TODO refactor inheritance

RegChar.prototype = new RegExpression();
RegChar.prototype.constructor = RegChar;

/**
 * Shorcut for escaped characters
 * @param chr {String} Single character
 * @return {RegChar}
 */
RegChar.escape = function(chr) {
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

