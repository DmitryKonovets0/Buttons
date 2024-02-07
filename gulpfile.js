const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass')(require('sass'));

function browserSyncFunction (done) {
    browserSync.init({
        server: {
            baseDir: "src"
        },
        port: 3001
    });
    done();
}

function serv(done) {
    gulp.watch("./src/scss/*.scss", buildStyles);
    gulp.watch("./src/*.html").on('change', browserSync.reload);
    done();
}

function buildStyles() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream());
}

gulp.task('default', gulp.series(browserSyncFunction, gulp.parallel(serv, buildStyles)));
