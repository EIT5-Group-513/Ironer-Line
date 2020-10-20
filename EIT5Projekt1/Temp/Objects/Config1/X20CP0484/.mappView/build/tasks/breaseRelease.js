/*global module*/
module.exports = function (grunt) {
    "use strict";

    grunt.registerTask("breaseRelease", "for generating release version of brease", function (config) {

        grunt.file.setBase('.');
        grunt.task.run('modules', 'requirejs:release');
    });

};