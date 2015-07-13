'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var rename = require('gulp-rename');

var browserify = require('browserify');
// var vinylTransform = require('vinyl-transform');
// var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var through2 = require('through2');

var packageJson = require('./package.json');

var banner = function() {
  var fs = require('fs');
  var d3Copyright = fs.readFileSync('node_modules/d3/LICENSE');
  var d3CloudCopyright = fs.readFileSync('node_modules/d3.layout.cloud/LICENSE');
  var banner = '/* ' + packageJson.name + '.js - v' + packageJson.version + ' - ' +
    new Date().toString() + '\n' +
    packageJson.homepage +
    '\nCopyright (c) 2012 - ' + new Date().getFullYear() +
    ' ' + packageJson.author.name + '.\n' +
    'Licensed:  ' + packageJson.license.type + ' \n*/\n \n' +
    '/* d3.layout.cloud.js \n' + d3CloudCopyright + ' */\n\n' +
    '/* d3.js \n' + d3Copyright + '*/\n';
  return banner;
};

var paths = {
  jshint: ['./gulpfile.js', './src/*.js'],
  watch: ['./gulpfile.js', './src/**/*.js', './test/**/*.js', '!test/{temp,temp/**}'],
  tests: ['./test/**/*-spec.js', '!test/{temp,temp/**}'],
  source: ['./src/*.js']
};

var plumberConf = {};

if (process.env.CI) {
  plumberConf.errorHandler = function(err) {
    throw err;
  };
}

gulp.task('clean', function () {
  del('dist');
});

gulp.task('jshint', function() {
  return gulp.src(paths.jshint)
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.plumber(plumberConf))
    .pipe(plugins.jscs())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('istanbul', function(cb) {
  gulp.src(paths.source)
    .pipe(plugins.istanbul()) // Covering files
    .pipe(plugins.istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function() {
      gulp.src(paths.tests)
        .pipe(plugins.plumber(plumberConf))
        .pipe(plugins.jasmine())
        .pipe(plugins.istanbul.writeReports()) // Creating the reports after tests runned
        .on('finish', function() {
          process.chdir(__dirname);
          cb();
        });
    });
});

gulp.task('bump', ['test'], function() {
  var bumpType = plugins.util.env.type || 'patch'; // major.minor.patch

  return gulp.src(['./package.json'])
    .pipe(plugins.bump({
      type: bumpType
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', ['test'], function() {
  gulp.watch(paths.watch, ['test']);
});

/**
https://medium.com/@sogko/gulp-browserify-the-gulp-y-way-bb359b3f9623
https://github.com/substack/node-browserify/issues/1044
*/

gulp.task('browserify', ['clean'], function() {
  var browserified = through2.obj(function(file, enc, next) {
    var options = {
      shim: {
        d3: {
          path: './node_modules/d3/d3.js',
          exports: 'd3'
        }
      }
    };
    if (false) {
      console.log("Old options", options);
    }
    browserify({
        // outfile: 'ilanguage-cloud.js',
        extension: '.min.js',
        entries: [file.path],
        // standalone: "iLanguageCloud",
        derequire: true
      })
      // .transform('stripify')  /* TODO export iLanguage */
      // .bundle(function(err, res) {
      //   // assumes file.contents is a Buffer
      //   file.contents = res;
      //   if (false) {
      //     file.contents.prepend(banner());
      //   }
      //   next(null, file);
      // });
  });
  // vinylTransform(function(filename) {
  //   var b = browserify(filename);
  //   return b.bundle();
  // });

  return gulp.src(['./src/app.js'])
    .pipe(browserified)
    .pipe(rename("ilanguage-cloud.js"))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename("ilanguage-cloud.min.js"))
    .pipe(gulp.dest('./dist/'));
});

/**
https://medium.com/@sogko/gulp-browserify-the-gulp-y-way-bb359b3f9623
*/
// gulp.task('naivebrowserify', function() {
//   return browserify('./src/ilanguage-cloud.js')
//     .bundle()
//     .pipe(source('ilanguage-cloud.min.js'))
//     .pipe(gulp.dest('./'));
// });

gulp.task('test', ['jshint', 'istanbul']);

gulp.task('release', ['bump']);

gulp.task('default', ['test', 'browserify']);
