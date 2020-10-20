/*global module,require,__dirname,console*/
module.exports = function (grunt) {
    /*jshint smarttabs:true */
    "use strict";

    var _require = require('a.require'),
        path = require('path');

    _require.init({ root: __dirname });

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        projectFolder: 'BRVisu',
        wdkFolder: 'WDK',
        dokuFolder: 'breaseDoku',
        basePath: __dirname,

        wwwRoot: (function (dirName) {
            var dir;
            if (grunt.option('buildPath')) {
                dir = path.resolve(grunt.option('buildPath'));
            }
            else {
                dir = path.resolve(dirName, '../data/wwwRoot');
            }
            dir = dir.replace(/\\/g, '/');
            console.log('grunt init - wwwRoot=' + dir);
            return dir;
        }(__dirname)),

        projectPath: '<%= wwwRoot %>/<%= projectFolder %>/',

        modules: {
            brease: {
                abspath: '<%= projectPath %>brease/brease.js',
                root: '<%= projectPath %>',
                replace: '',
                filename: 'brease.js'
            },
            config: {
                path: '<%= projectPath %>brease/config',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test']
            },
            controller: {
                path: '<%= projectPath %>brease/controller',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test']
            },
            core: {
                path: '<%= projectPath %>brease/core',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test'],
                excludeFile: ['BaseWidget.html']
            },
            datatype: {
                path: '<%= projectPath %>brease/datatype',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test']
            },
            decorators: {
                path: '<%= projectPath %>brease/decorators',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test']
            },
            enumFiles: {
                path: '<%= projectPath %>brease/enum',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test']
            },
            events: {
                path: '<%= projectPath %>brease/events',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test']
            },
            helper: {
                path: '<%= projectPath %>brease/helper',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test']
            },
            services: {
                path: '<%= projectPath %>brease/services',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test']
            },
            systemWidgets: {
                path: '<%= projectPath %>system/widgets',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test', 'designer', 'meta', 'css', 'assets'],
                excludeFile: []
            },
            widgets: {
                path: '<%= projectPath %>widgets/brease',
                root: '<%= projectPath %>',
                replace: '',
                excludeFolder: ['Test', 'css', 'assets', '_libs', 'meta'],
                excludeFile: ['WidgetLibrary_gen']
            }
        },

        requirejs: {
            release: {
                options: {
                    name: "brease/application",
                    mainConfigFile: "<%= projectPath %>require_config.js",
                    out: "<%= projectPath %>release/brease.js",
                    include: '<%= requirejs.modules %>',
                    onBuildWrite: function (moduleName, path, contents) {
                        if (path.indexOf('_libs') !== -1 || path.indexOf('meta/') !== -1 || path.indexOf('external/') !== -1 || path.indexOf('WidgetLibrary') !== -1 || path.indexOf('ASHelp') !== -1) {
                            return;
                        }
                        return contents;
                    },
                    preserveLicenseComments: false,
                    generateSourceMaps: false,
                    optimize: 'uglify2',
                    uglify2: {
                        beautify: {
                            semicolons: true
                        },
                        compress: {
                            side_effects: false,
                            sequences: true,
                            dead_code: false,
                            unused: false,
                            drop_debugger: true,
                            unsafe: false,
                            hoist_funs: false,
                            hoist_vars: false
                        },
                        warnings: true,
                        mangle: {
                            except: '<%= requirejs.modulesShort %>'
                        },
                        lint: false,
                        logLevel: 4
                    }
                }
            }
        },

        sass: {

            options: {
                includePaths: ["<%= projectPath %>css/libs"]
            },

            brease: {
                expand: true,
                cwd: '<%= projectPath %>css',
                src: '*.scss',
                dest: '<%= projectPath %>css',
                ext: '.scss.css'
            },

            styleableProperties: {
                expand: true,
                cwd: '<%= projectPath %>css/pages',
                src: '**/*.scss',
                dest: '<%= projectPath %>css/pages',
                ext: '.scss.css'
            },

            styles: {
                expand: true,
                cwd: '<%= projectPath %>widgets/',
                src: '**/**/meta/*.scss',
                dest: '<%= projectPath %>widgets/',
                ext: '.scss.css'
            },
            systemWidgets: {
                expand: true,
                cwd: '<%= projectPath %>system/widgets/',
                src: ['**/css/*.scss'],
                dest: '<%= projectPath %>system/widgets/',
                ext: '.scss.css'
            },

            widgets: {
                expand: true,
                cwd: '<%= projectPath %>widgets/',
                src: ['**/**/css/*.scss'],
                dest: '<%= projectPath %>widgets/',
                ext: '.scss.css'
            },
            breaseSystem: {
                expand: true,
                cwd: '<%= wwwRoot %>/types/',
                src: ['*.scss'],
                dest: '<%= projectPath %>css/types/',
                ext: '.scss.css'
            },
            themes: {
                expand: true,
                cwd: '<%= projectPath %>css/Themes',
                src: '**/*.scss',
                dest: '<%= projectPath %>css/Themes',
                ext: '.scss.css'
            }
        },

        concat: {
            breasescss: {
                src: ['<%= projectPath %>css/brease_main.scss.css', '<%= projectPath %>system/widgets/**/css/*.scss.css', '<%= projectPath %>widgets/**/css/*.scss.css', '<%= projectPath %>widgets/**/meta/*scss.css', '<%= projectPath %>css/pages/**/*.scss.css', '<%= projectPath %>css/brease_suffix.scss.css', '<%= projectPath %>css/types/**/*.scss.css'],
                dest: '<%= projectPath %>css/brease_core.css'
            }
        },

        csso: {
            breasecss: {
                options: {
                    restructure: true,
                    report: 'gzip'
                },
                expand: true,
                cwd: '<%= projectPath %>css/',
                src: ['brease_core.css'],
                dest: '<%= projectPath %>release',
                ext: '.min.css'
            }
        }

    });


    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-csso');

    grunt.loadTasks('tasks');

    grunt.registerTask('build', ['breaseCSS', 'breaseRelease']);
    grunt.registerTask('default', ['build']);

};