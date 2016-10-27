const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const path = require('path');

const SRC_DIR = 'src';
const DEST_DIR = 'lib';

const JS_SRC = path.join(SRC_DIR, '/**/*.js');


gulp.task('default', ['build']);

gulp.task('build', () => {
    return gulp.src(JS_SRC)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DEST_DIR))
});

gulp.task('watch', ['default'], () => {
    return gulp.watch(JS_SRC, ['build']);
});
