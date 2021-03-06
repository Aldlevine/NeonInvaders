'use strict';

let gulp = require('gulp');

let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');

let browserify = require('browserify');
let babelify = require('babelify');
let sourcemaps = require('gulp-sourcemaps');

//let jade = require('gulp-jade');
let pug = require('gulp-pug');

let sass = require('gulp-sass');
let bourbon = require('node-bourbon');

gulp.task('default', ['es6', 'pug', 'sass']);

gulp.task('watch', function(){
  gulp.start('default');
  gulp.watch('src/js/**/*.js', ['es6']);
  gulp.watch('src/html/**/*.pug', ['pug']);
  gulp.watch('src/css/**/*.scss', ['sass']);
});

gulp.task('es6', ['es6-browser']);
gulp.task('es6-browser', function() {
  browserify('src/js/index.js', {debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMap: true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("www"))
  ;
});

gulp.task('pug', function() {
  gulp.src('src/html/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('www'))
  ;
});

gulp.task('sass', function() {
  gulp.src('src/css/**/*.scss')
    .pipe(sass({
      includePaths: bourbon.includePaths
    }))
    .pipe(gulp.dest('www'))
  ;
});
