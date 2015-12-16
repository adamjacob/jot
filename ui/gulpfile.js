// gulpfile.js
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var jshint = require('gulp-jshint');    

var uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    gutil = require( 'gulp-util' );

gulp.task('build', function () {

  browserify({
    entries: './js/app.jsx',
    extensions: ['.jsx'],
    debug: false
  }).transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(gulp.dest('build'));
});

// Serve (http://localhost:8000)
gulp.task('webserver', function() {
  gulp.src('../jot')
    .pipe(webserver({
      open: true
    }));
});

// Compile SCSS
gulp.task('sass', function () {
  gulp.src('scss/*.scss')
      .pipe(sass())
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  gulp.watch(['js/*.js','js/*.jsx','js/components/*.jsx'], ['build']);
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('scss/partials/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'build', 'webserver', 'watch']);