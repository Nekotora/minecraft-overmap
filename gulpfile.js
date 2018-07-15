var gulp = require('gulp');
var watch = require('gulp-watch');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var pump = require('pump');
var del = require('del');
let chalk = require('chalk');
var vueify = require('gulp-vueify');

gulp.task('watch', function () {
  watch([
    'views/**/*.*'
  ], function () {
    gulp.start('default');
  });
});


gulp.task('vueify', function () {
  return gulp.src('views/**/*.vue')
    .pipe(vueify())
    .pipe(gulp.dest('public'));
});

gulp.task('dev', ['default', 'watch']);