'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      styles: {
        files: 'app/**/*.scss',
        tasks: ['sass:dev', 'autoprefixer:dev']
      },
      scripts: {
        files: 'app/**/*.js',
        tasks: ['jshint', 'react:dev', 'browserify:dev']
      }
    },
    react: {
      dev: {
        files: [{
          expand: true,
          cwd: 'app',
          src: ['**/*.js'],
          dest: '.tmp/app',
          ext: '.js'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'app',
          src: ['**/*.js'],
          dest: 'dist/app',
          ext: '.js'
        }]
      }
    },
    browserify: {
      dev: {
        src: 'app/client.js',
        dest: '.tmp/assets/bundle.min.js',
        options: {
          transform: [require('grunt-react').browserify, require('envify')],
          watch: true,
          browserifyOptions: {
            debug: true
          }
        }
      },
      dist: {
        src: 'app/client.js',
        dest: 'dist/assets/bundle.js',
        options: {
          transform: [require('grunt-react').browserify, require('envify')]
        }
      }
    },
    sass: {
      dev: {
        files: {
          '.tmp/assets/main-unprefixed.css': 'app/scss/main.scss'
        }
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'dist/assets/main-unprefixed.css': 'app/scss/main.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: [
          'ie >= 10',
          'ie_mob >= 10',
          'ff >= 30',
          'chrome >= 31',
          'safari >= 6.1',
          'opera >= 23',
          'ios >= 6.1',
          'android >= 2.3',
          'bb >= 10'
        ]
      },
      dev: {
        src: '.tmp/assets/main-unprefixed.css',
        dest: '.tmp/assets/main.css'
      },
      dist: {
        src: 'dist/assets/main-unprefixed.css',
        dest: 'dist/assets/main.css'
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'server.js', 'app/**/*.js'],
      options: {
        jshintrc: true
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/assets/bundle.min.js': ['dist/assets/bundle.js']
        }
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: ['.tmp/assets/main.css', '.tmp/assets/bundle.min.js']
        },
        options: {
          watchTask: true,
          proxy: 'localhost:8000',
          open: false
        }
      }
    },
    copy: {
      dist: {
        src: ['*.js', '!Gruntfile.js', 'package.json', 'views/**/*'],
        dest: 'dist/'
      }
    },
    clean: {
      dev: ['.tmp'],
      dist: ['dist']
    }
  });

  grunt.registerTask('build', ['jshint', 'react:dev', 'browserify:dev', 'sass:dev', 'autoprefixer:dev']);
  grunt.registerTask('build:dist', ['env:production', 'clean:dist', 'jshint', 'react:dist', 'browserify:dist', 'uglify:dist', 'sass:dist', 'autoprefixer:dist', 'copy:dist']);

  grunt.registerTask('server', 'Start express server', function() {
    require('./server.js');
  });

  grunt.registerTask('env:production', function () {
    process.env.NODE_ENV = 'production';
  });

  grunt.registerTask('serve', ['build', 'server', 'browserSync', 'watch']);
  grunt.registerTask('default', ['serve']);

  //Load all grunt-* tasks
  require('load-grunt-tasks')(grunt);

};
