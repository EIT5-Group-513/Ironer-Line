/*global module*/
module.exports = function (grunt) {
    "use strict";

    grunt.registerTask("breaseCSS", "for compiling less files and concatenate resulting css files", function (config) {

        grunt.file.setBase('.');
        grunt.task.run('sass', 'concat:breasescss', 'csso:breasecss');
    });

};