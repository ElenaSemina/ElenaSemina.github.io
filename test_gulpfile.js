var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    spritesmith  = require('gulp.spritesmith');

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var vendor = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/lightgallery/dist/js/lightgallery.js',
    'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
    'node_modules/slick-carousel/slick/slick.js',
    'libs/**/*.js'


    //'node_modules/tether/dist/js/tether.min.js',
    //'node_modules/bootstrap/dist/js/bootstrap.min.js',
    //'node_modules/bootstrap/js/src/util.js',
    //'node_modules/bootstrap/js/src/collapse.js',
    //'node_modules/bootstrap/js/src/modal.js',
    //'node_modules/jquery-countdown/dist/jquery.countdown.min.js',
    // 'node_modules/scrollreveal/dist/scrollreveal.min.js',
];

gulp.task('libs-scripts', function() {
    gulp.src(vendor)
        .pipe(concat('libs-scripts.js'))
        .pipe(gulp.dest('../assets/js'))
        .pipe(rename('libs-scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../assets/js'));
});

// CSS
gulp.task('scss', function() {
    gulp.src('sass/global.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(rename('global.min.css'))
        .pipe(gulp.dest('../assets/css'));
});

// JS
gulp.task('scripts', function() {
    gulp.src('js/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('../assets/js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../assets/js'));
});

// Sprite images

// gulp.task('sprite', function() {
//     var spriteData =
//         gulp.src('images/*.*')
//             .pipe(spritesmith({
//                 imgName: 'sprite.png',
//                 imgPath: '../images/sprite.png',
//                 cssName: '_sprite.scss',
//                 cssFormat: 'scss',
//                 algorithm: 'binary-tree',
//                 cssTemplate: 'scss.template.mustache',
//                 cssVarMap: function(sprite) {
//                     sprite.name = 'st-' + sprite.name
//                 }
//             }));
//
//     spriteData.img.pipe(gulp.dest('../assets/images/'));
//     spriteData.css.pipe(gulp.dest('sass/utils/'));
// });


gulp.task('default', function() {
    // gulp.run("sprite");
    gulp.run("scss");
    gulp.run("scripts");
    gulp.run("libs-scripts");

    // gulp.watch('images/sprite/*.*', function(event) {
    //     gulp.run('sprite');
    // });

    gulp.watch('./sass/**/*.scss', function(event) {
        gulp.run('scss');
    });

    gulp.watch('js/**/*.js', function(event) {
        gulp.run('scripts');
    });

});

/**
 * Created by Elena on 18.04.2018.
 */
