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