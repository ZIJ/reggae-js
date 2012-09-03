// registering Grunt globals for JSHint
/*global module:false */

module.exports = function(grunt) {
    "use strict";
    // Project configuration.
    grunt.initConfig({
        lint: {
            all: ['grunt.js', 'reggae.js']
        },
        jshint: {
            options: {
                strict: true,           // strict mode
                browser: true,          // browser environment
                node: true,             // node.js environment
                bitwise: true,          // no bitwise operators
                camelcase: true,        // only camelCase and UNDER_SCORE
                curly: true,            // no "braceless" loops
                eqeqeq: true,           // no casting comparisons
                forin: true,            // for..in loops with hasOwnProperty() check
                immed: true,            // no immediate function invokation
                indent: 4,              // tab width
                latedef: true,          // no variable usage before definition
                newcap: true,           // capitalized constructors
                noarg: true,            // no arguments.caller and arguments.callee
                noempty: true,          // no empty blocks
                nonew: true,            // no constructor invokation without assigning
                plusplus: true,         // no ++ and --
                quotmark: true,         // consistency of quote style
                regexp: true,           // no unsafe . in regexps
                undef: true,            // no explicitly undefined variables
                unused: true,           // no unused variables
                trailing: true          // no spaces after / in multiline strings
            }
        },
        concat: {
            all: {
                src: ['src/partial/header.js.part',
                      'src/utils/*.js',
                      'src/commonData.js', 'src/regExpression.js', 'src/regChar.js',
                      'src/reg.js',
                      'src/partial/footer.js.part'],
                dest: 'reggae.js'
            }
        },
        min: {
            all: {
                src: ['reggae.js'],
                dest: 'reggae.min.js'
            }
        }
    });

    // Default task.
    grunt.registerTask('default', 'concat lint min');

};