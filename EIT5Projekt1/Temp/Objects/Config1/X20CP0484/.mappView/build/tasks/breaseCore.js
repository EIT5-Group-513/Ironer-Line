/*global module*/
module.exports = function (grunt) {
    "use strict";

    grunt.registerTask("breaseCore", "for generating release version of brease", function (config) {

        grunt.file.setBase('.');
		grunt.task.run('sass:brease', 'sass:styles', 'sass:widgets', 'sass:breaseSystem', 'sass:systemWidgets', 'concat:breasescss', 'csso:breasecss', 'breaseRelease');
    });

    grunt.registerTask("breaseBuildAs", "necessary build step for Automation Studio", function (config) {

        grunt.file.setBase('.');
		grunt.task.run('csso:breasecss', 'breaseRelease');
    });

};