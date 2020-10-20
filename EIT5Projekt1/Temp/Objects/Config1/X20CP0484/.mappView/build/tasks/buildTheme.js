/*global module*/
module.exports = function (grunt) {
    "use strict";

    grunt.registerTask("buildTheme", "for compiling less files and concatenate resulting css files for a special theme", function (theme) {

        var lessObject = {
            expand: true,
            cwd: '<%= projectPath %>css/Themes/' + theme,
            src: '**/*.scss',
            dest: '<%= projectPath %>css/Themes/' + theme,
            ext: '.scss.css'
        },
        concatObject = {
            src: ['<%= projectPath %>css/Themes/' + theme + '/**/*.scss.css'],
            dest: '<%= projectPath %>css/' + theme + '.css'
        },

        cssoObject = {
            options: {
                restructure: true,
                report: 'min',

            },
            expand: true,
            cwd: '<%= projectPath %>css/',
            src: [theme + '.css'],
            dest: '<%= projectPath %>release',
            ext: '.min.css',

        };

        grunt.config.set('sass.' + theme, lessObject);
        grunt.config.set('concat.' + theme, concatObject);
        grunt.config.set('csso.' + theme, cssoObject);
        grunt.task.run('sass:' + theme, 'concat:' + theme, 'csso:' + theme);

    });
};
