// Generated on 2015-06-22 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            options: {
                // spawn: false // Important, don't remove this!
            },
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            less: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
                tasks: ['less:server', 'postcss']
            },
            config: {
                files: ['./config/environments/*.json', './config/config.js'],
                tasks: ['replace:development']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
         '<%= yeoman.app %>/{,*/}*.html',
         '.tmp/styles/{,*/}*.css',
         '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
              connect.static('.tmp'),
              connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
              ),
              connect().use(
                                '/app/styles',
                                connect.static('./app/styles')
              ),
              connect().use(
                                '/api',
                                connect.static('app/api')
              ),
              connect.static(appConfig.app)
            ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
            },
            server: '.tmp'
        },
        // Add vendor prefixed styles
        postcss: {
            options: {
                processors: [
          require('pixrem')(),
          require('autoprefixer-core')({
                        browsers: 'last 1 version'
                    })
        ]
            },
            server: {
                options: {
                    map: true
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
        }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
        }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath: /\.\.\//
            },
            test: {
                devDependencies: true,
                src: '<%= karma.unit.configFile %>',
                ignorePath: /\.\.\//,
                fileTypes: {
                    js: {
                        block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
                        detect: {
                            js: /'(.*\.js)'/gi
                        },
                        replace: {
                            js: '\'{{filePath}}\','
                        }
                    }
                }
            },
            less: {
                src: ['<%= yeoman.app %>/styles/{,*/}*.less'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            }
        },

        //Compile less to CSS and generate necessary files if required
        less: {
            options: {
                paths: ['./bower_components', '<%= yeoman.app %>/styles/']
                    //dumpLineNumbers: true
            },
            dist: {
                expand: true, // set to true to enable options following options:
                cwd: '<%= yeoman.app %>/styles/', // all sources relative to this path
                src: ['**/{bootstrap_debug,main}.less'], // source folder patterns to match, relative to cwd
                dest: '.tmp/styles/', // destination folder path prefix
                ext: '.css', // replace any existing extension with this value in dest folder
                flatten: true // flatten folder structure to single level
            },
            server: {
                expand: true, // set to true to enable options following options:
                cwd: '<%= yeoman.app %>/styles/', // all sources relative to this path
                src: ['**/{bootstrap_debug,main}.less'], // source folder patterns to match, relative to cwd
                dest: '.tmp/styles/', // destination folder path prefix
                ext: '.css', // replace any existing extension with this value in dest folder
                flatten: true // flatten folder structure to single level
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*',
          '!<%= yeoman.dist %>/images/ping.gif' //Omit ping.gif from versioning and it's used for sending tracking req.
        ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            json: ['<%= yeoman.dist %>/{,*/}*.json'],
            xml: ['<%= yeoman.dist %>/{,*/}*.xml'],
            options: {
                assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/styles'
        ]
            }
        },

        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/scripts/scripts.js': [
        //         '<%= yeoman.dist %>/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
        }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
        }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true,
                    minifyJS: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= yeoman.dist %>'
        }]
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
        }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            '*.htm',
            '*.xml',
            '*.json',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*',
                        'sql/*'
          ]
        }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
        }, {
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: 'fonts/*',
                    dest: '<%= yeoman.dist %>'
        }, {
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: 'api/**',
                    dest: '<%= yeoman.dist %>',
        }, {
                    expand: true,
                    cwd: 'bower_components/font-awesome',
                    src: 'fonts/*',
                    dest: '<%= yeoman.dist %>'
        }, {
                    expand: true,
                    cwd: 'bower_components/ngWYSIWYG/dist/',
                    src: 'images/*',
                    dest: '<%= yeoman.dist %>/styles/'
        }]

            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            fonts: {
                expand: true,
                cwd: 'bower_components/',
                flatten: true,
                src: ['bootstrap/dist/fonts/*', 'font-awesome/fonts/*'],
                dest: '.tmp/fonts/'
            },
            api: {
                expand: true,
                cwd: '<%= yeoman.app %>',
                src: 'api/{,*/}*.php',
                dest: '<%= yeoman.dist %>',
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
        'copy:fonts',
        'less:server'
      ],
            test: [
        'less'
      ],
            dist: [
        'less:dist',
        'imagemin',
        'svgmin'
      ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },

        // Add the browser_sync task options
        browserSync: {
            files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
      ],
            options: {
                watchTask: true,
                ghostMode: {
                    clicks: true,
                    scroll: true,
                    links: true,
                    forms: true,
                },
                server: {
                    baseDir: [
            '<%= yeoman.app %>',
            '.tmp'
          ],
                    routes: {
                        '/bower_components': './bower_components'
                    }
                }
            },
        },

        /*Compression task for production*/
        compress: {
            dist: {
                options: {
                    mode: 'gzip',
                    level: 9
                },
                files: [
                    {
                        expand: true,
                        extDot: 'last',
                        src: ['<%= yeoman.dist %>/**/*.{txt,html,ico,xml,svg,js,css,ttf,json,map,htm}'],
                        rename: function (dest, src) {
                            return src + '.gz';
                        }
          }
        ]
            }
        },
        pagespeed: {
            options: {
                nokey: true,
                url: 'https://test.swappableapp.com'
            },
            integrationDesktop: {
                options: {
                    url: 'https://test.swappable.com',
                    locale: 'en_US',
                    strategy: 'desktop',
                    threshold: 70
                }
            },
            integrationMobile: {
                options: {
                    url: 'https://test.swappable.com',
                    locale: 'en_US',
                    strategy: 'mobile',
                    threshold: 40
                }
            },
            stagingDesktop: {
                options: {
                    url: 'https://teststaging.swappable.com',
                    locale: 'en_US',
                    strategy: 'desktop',
                    threshold: 70
                }
            },
            stagingMobile: {
                options: {
                    url: 'https://teststaging.swappable.com',
                    locale: 'en_US',
                    strategy: 'mobile',
                    threshold: 40
                }
            },
            productionDesktop: {
                options: {
                    url: 'https://swappable.com',
                    locale: 'en_US',
                    strategy: 'desktop',
                    threshold: 70
                }
            },
            productionMobile: {
                options: {
                    url: 'https://swappable.com',
                    locale: 'en_US',
                    strategy: 'mobile',
                    threshold: 40
                }
            }
        },
        perf: {
            integration: ['pagespeed:integrationDesktop', 'pagespeed:integrationMobile'],
            staging: ['pagespeed:stagingDesktop', 'pagespeed:stagingMobile'],
            production: ['pagespeed:productionDesktop', 'pagespeed:productionMobile']
        },
        critical: {
            options: {
                inline: true,
                base: '<%= yeoman.dist %>/',
                minify: true,
                extract: false,
                dimensions: [
                    { /*desktop view*/
                        height: 900,
                        width: 1200
          },
                    { /*tablet view*/
                        height: 1024,
                        width: 768
          }
        ]
            },
            dist: {
                src: '<%= yeoman.dist %>/index.html',
                dest: '<%= yeoman.dist %>/index.html'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'postcss:server',
      'connect:livereload',
      'watch'
    ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'postcss',
    'connect:test',
    'karma'
  ]);

    grunt.registerTask('build', 'Production/staging build task', function (type) {
        type = type || '';
        if (!type.length || !(type === 'integration' || type === 'staging' || type === 'production')) {
            grunt.fail.fatal('Invoke as either "build:integration", "build:staging" or "build:production"');
            return;
        }
        var bProd = (type === 'production');

        //enable sourcemap for staging
        if (!bProd) {
            grunt.config.set('cssmin.options.sourceMap', true);
            grunt.config.set('uglify.options.sourceMap', true);
            grunt.config.set('uglify.options.sourceMapIncludeSources', true);
        }


        var replaceTask = 'replace:' + type;
        //Build task list based on staging & production target
        var tasks = [
      'clean:dist',
      //replaceTask,
      'wiredep',
      'useminPrepare',
      'concurrent:dist',
      'postcss',
      'concat',
      'ngAnnotate',
      'copy:dist',
      'cssmin',
      'uglify',
      'filerev',
      'usemin',
      'htmlmin',
      'critical:dist',
      'compress:dist'
    ];
        grunt.task.run(tasks);
    });
    grunt.registerMultiTask('perf', 'Performance Test tasks', function () {
        grunt.task.run(this.data);
    });

    grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'

  ]);
};