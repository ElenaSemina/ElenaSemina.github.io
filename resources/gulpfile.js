var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename');

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var concat = require('gulp-concat'), //обьединение скриптов
    rename = require('gulp-rename'), //переименнование 
    uglify = require('gulp-uglify'); //наведение красоты





// JS
gulp.task('scripts', function() {
    gulp.src([
        "./node_modules/waypoints/lib/jquery.waypoints.js",
        "./node_modules/waypoints/lib/shortcuts/inview.js"

            , 'js/**/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('../js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../js'));
});


// CSS
//  run:         gulp scss
gulp.task('scss', function() {
    gulp.src('scss/global.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(rename('global.min.css'))
        .pipe(gulp.dest('../css'));
});


//  run:         gulp scss:watch
gulp.task('scss:watch', function () {
  gulp.watch('./scss/**/*.scss', ['scss']);
});
