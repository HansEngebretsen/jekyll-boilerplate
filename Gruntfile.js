  /*
  ==========
  Main Grunt Build Configuration file

  This file is the main configuration object for the Grunt
  task runner.  All plugins should be documented either in Confluence
  (https://confluence.consumer.garmin.com/display/UX/Grunt+Snippets)
  or on the respective URL documented next to the configuration.

  GruntJS: http://gruntjs.com/
  ==========
*/

  module.exports = function(grunt) {
  /* ====================
     Load the NPM tasks from the package.json automatically.
     ==================== */

    require('load-grunt-tasks')(grunt);

    /*
      Babel doesn't know how to find the presets and plugins
      once the process cwd has changed outside of the config folder.
      To get around this limitation, we can require the modules here
      and use this variable in the task later.
    */
    var babelify = require('babelify');
    var babelPresets = [
      require('babel-preset-es2015'),
      require('babel-preset-stage-0')
    ]

    grunt.initConfig({ // start the party
      pkg: grunt.file.readJSON('package.json'), // where the package.json be


      /*
      Set options for various tasks within the config file.
      These options can be overriden at the task level, but
      are listed here to provide a DRY interface for common
      file paths, etc.  Feel free to add commonly used options.
      */

      options: {
        src: {
          dirname: 'src',
          images: 'src/img',
          sass: 'src/sass',
          js: 'src/js'
        },
        output: {
          dirname: 'htdocs',
          images: 'htdocs/img',
          css: 'htdocs/css',
          js: 'htdocs/js'
        }
      },

      /* --------------------
          browserfiy task
         --------------------  */

       browserify: {
         all: {
           options: {
             debug: true,
             alias: {
               "babel-polyfill": './node_modules/babel-polyfill/dist/polyfill.js'
             },
             transform: [
              [babelify, {
                sourceMaps: true,
                presets: babelPresets
              }]
            ]
           },
           expand: true,
           cwd:  "<%= options.src.js %>/",
           src:  ["*.js", "!libs/*"],
           dest: "<%= options.output.js %>/build",
           nonull: true
         }
       },

      /* --------------------
          concat task (just for libs)
         --------------------  */
      concat: {
        // 2. Configuration for concatinating files goes here.
        dist: {
          src: ['<%= options.src.js %>/libs/*.js','<%= options.output.js %>/build/main.js'], // everything in libs, with our babelified js
          dest: '<%= options.output.js %>/build/production.js',
        }
      },

      /* --------------------
          Uglify task
         --------------------  */
      uglify: {
        options: {
          preserveComments: false
        },
        build: {
          src: '<%= options.output.js %>/build/production.js',
          dest: '<%= options.output.js %>/build/production.min.js'
        }
      },

      /* --------------------
          imagemin task
         --------------------  */

      imagemin: {
        dynamic: {
          files: [{
            expand: true,
            cwd: '<%= options.src.images %>/',
            src: ['*.{png,jpg,gif}'],
            dest: '<%= options.output.images %>/'
          }],
          files: [{
            expand: true,
            cwd: '<%= options.src.images %>/',
            src: ['*.{svg}'],
            dest: '<%= options.output.dirname %>/_includes/'
          }]
        }
      },

       /* --------------------
          http task (get gcapi analytics info)
         --------------------  */
      http: {
        GCAPI_call: {
          options: {
            url: 'http://services.garmin.com/global-content-api?c=com.garminturningpoints-v1.8.0&e=head&l=en-US',
            callback: function(err, response, body) {
              if (err) {
                grunt.file.write('<%= options.src.dirname %>/_includes/responses/gcapi.html', '<script type="text/javascript" src="//tags.tiqcdn.com/utag/garmin/main/prod/utag.js"></script>')
              }
            }
          },
          dest: '<%= options.src.dirname %>/_includes/responses/gcapi.html'
        }
      },

       /* --------------------
          sass task
         --------------------  */
      sass: {
        dev: {
          options: {
            outputStyle: 'expanded',
            sourceComments: 'true',
            sourcemap: 'file'
          },
          files: {
            '<%= options.output.css %>/styles.css': '<%= options.src.sass %>/styles.scss'
          }
        },
        prod: {
          options: {
            outputStyle: 'compressed'
          },
          files: {
            '<%= options.output.css %>/styles.min.css': '<%= options.src.sass %>/styles.scss'
          }
        }
      },

      /* --------------------
          Autoprefix things for meh
         --------------------  */
      autoprefixer: {
        options: {
          browsers: ['last 13 versions', '> 5%', 'ie 8', 'ie 7', 'ie 9']
        },
        dist: {
          files: {
            '<%= options.output.css %>/styles.css': '<%= options.output.css %>/styles.css'
          }
        }

      },

      /* --------------------
          Browsersync task
         --------------------  */
      browserSync: {
        bsFiles: {
          src: [
            '<%= options.output.css %>/*.css',
            '<%= options.src.js %>/*.js'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "<%= options.output.dirname %>"
          }
        }
      },


      /* --------------------
          watch settigns
         --------------------  */
      watch: {
        options: {
          livereload: true
        },
        scripts: {
          files: ['<%= options.src.js %>/**/**/*.js'],
          tasks: ['browserify', 'concat'],
          options: {
            spawn: false,
          }
        },
        css: {
          files: ['<%= options.src.sass %>/**/*.scss'],
          // tasks: ['sass', 'autoprefixer', 'browserSync'],
          tasks: ['sass', 'autoprefixer', 'browserSync'],
          options: {
            spawn: false,
          }
        },
        images: {
          files: ['<%= options.src.images %>/**/*.{png,jpg,gif}', '<%= options.src.images %>/*.{png,jpg,gif}'],
          tasks: ['imagemin'],
          options: {
            spawn: false,
          }
        }
      }
    });


    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['browserify', 'concat', 'uglify', 'sass', 'autoprefixer']);
    grunt.registerTask('watchs', ['browserSync', 'watch']);

    grunt.registerTask('prod', [
      'http',
      'default'
    ]);
  };