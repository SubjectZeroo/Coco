const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const pug         = require('gulp-pug');
const reload      = browserSync.reload;


/**
 * Compile pug files into HTML
 */
gulp.task('templates', function() {
     gulp.src('./dev/views/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./dist/'));
});

/**
 * Important!!
 * Separate task for the reaction to `.pug` files
 */
gulp.task('pug-watch', ['templates'], reload);

/**
 * Sass task for live injecting into all browsers
 */
gulp.task('sass', function () {
     gulp.src('./dev/scss/**/*.scss')
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest('./dist/css'))
        .pipe(reload({stream: true}));
});

/**
 * Serve and watch the scss/pug files for changes
 */
gulp.task('server', ['sass', 'templates'], function () {

    browserSync({server: './dist'});


    gulp.watch('./dev/scss/**/*.scss',       ['sass']);
    gulp.watch('./dev/views/**/*.pug',       ['pug-watch']);
});



