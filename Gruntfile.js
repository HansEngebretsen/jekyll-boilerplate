module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            // 2. Configuration for concatinating files goes here.
            dist: {
                   src: [
                       'src/js/libs/*.js', // All JS in the libs folder
                       'src/js/*.js',
                       'src/js/modules/*.js'

                   ],
                   dest: 'htdocs/js/build/production.js',
            }
          },

         uglify: {
            build: {
                src: 'htdocs/js/build/production.js',
                dest: 'htdocs/js/build/production.min.js'
            }
          },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'htdocs/img/'
                }],
                files: [{
                  expand: true,
                    cwd: 'src/img/',
                    src: ['*.{svg}'],
                    dest: 'htdocs/_includes/'
                }]
            }
        },

        sass: {
             dev: {
                 options: {
                     outputStyle: 'expanded',
                     sourceComments: 'true',
                     sourcemap: 'file'
                 },
                 files: {
                     'htdocs/css/styles.css': 'src/sass/styles.scss'
                 }
             },
             prod: {
               options: {
                   outputStyle: 'compressed'
               },
               files: {
                   'htdocs/css/styles.min.css': 'src/sass/styles.scss'
               }
             }
         },
         autoprefixer: {
            options: {
              browsers: ['last 13 versions', '> 5%','ie 8', 'ie 7','ie 9']
            },
            dist: {
                files: {
                    'style.css': 'style.css'
                }
            }

        },

        browserSync: {
            bsFiles: {
                src : [
                  'htdocs/css/*.css',
                  'htdocs/js/*.js'
                  ]
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "_site"
                }
            }
        },



       watch: {

            options: { livereload: true },

            scripts: {
              files: ['src/js/**/*.js'],
              tasks: ['concat', 'uglify'],
              options: {
                spawn: false,
              }
            },
            css: {
              files: ['src/sass/**/*.scss'],
              // tasks: ['sass', 'autoprefixer', 'browserSync'],
              tasks: ['sass', 'autoprefixer'],
              options: {
                spawn: false,
              }
            },
            images: {
              files: ['src/img/**/*.{png,jpg,gif}', 'src/img/*.{png,jpg,gif}'],
              tasks: ['imagemin'],
              options: {
                spawn: false,
              }
            }


        }



    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');


    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.

    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'autoprefixer']);
};