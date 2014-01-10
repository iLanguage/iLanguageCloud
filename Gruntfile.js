'use strict';

module.exports = function(grunt) {
  // Show elapsed time at the end.
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    d3Copyright: grunt.file.read('node_modules/d3/LICENSE'),
    d3CloudCopyright: grunt.file.read('node_modules/d3.layout.cloud/LICENSE'),
    banner: '/* <%= pkg.name %>.js - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "" + pkg.homepage + "\\n" : "" %>' +
      '\nCopyright (c) 2012 - <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>.\n' +
      'Licensed:  <%= pkg.licenses[0].type %> \n*/\n \n'+
      '/* d3.layout.cloud.js \n<%= d3CloudCopyright %> */\n\n'+
      '/* d3.js \n<%= d3Copyright %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['dist/vendor.js', 'dist/main_bundle.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jasmine: {
      src: 'dist/main_bundle.js',
      options: {
        specs: 'dist/test_bundle.js',
        vendor: 'dist/vendor.js'
      }
    },
    jasmine_node: {
      specNameMatcher: 'spec',
      projectRoot: './',
      requirejs: false,
      forceExit: false,
      isVerbose: true,
      showColors: true,
      jUnit: {
        report: true,
        savePath: './build/reports/jasmine/',
        consolidate: true,
        useDotNotation: false
      }
    },
    browserify: {
      vendor: {
        src: ['./node_modules/d3/d3.min.js'],
        dest: 'dist/vendor.js',
        options: {
          shim: {
            d3: {
              path: './node_modules/d3/d3.min.js',
              exports: 'd3'
            }
          }
        }
      },
      src: {
        src: ['src/common/app.js'],
        dest: 'dist/main_bundle.js',
        options: {
          ignore: ['src/node/**/*.js'],
          shim: {
            layoutCloud: {
              path: 'node_modules/d3.layout.cloud/d3.layout.cloud.js',
              exports: 'layoutCloud'
            }
          }
        }
      },
      test: {
          src: ['test/spec/common/**/*.js', 'test/spec/browser/**/*.js'],
          dest: 'dist/test_bundle.js'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    watch: {
      all: {
        files: ['src/**/*.js', 'test/spec/**/*.js', 'Gruntfile.js'],
        tasks: ['debug']
      },
      web: {
        files: ['src/**/*.js', 'test/spec/**/*.js', 'Gruntfile.js'],
        tasks: ['debugweb']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-browserify');

  // Default task.
  grunt.registerTask('default', ['jshint', 'jasmine_node', 'browserify', 'jasmine', 'concat', 'uglify']);
  grunt.registerTask('debug', ['jshint', 'jasmine_node', 'browserify', 'jasmine', 'concat']);
  grunt.registerTask('debugweb', ['jshint', 'browserify', 'jasmine', 'concat']);
};
