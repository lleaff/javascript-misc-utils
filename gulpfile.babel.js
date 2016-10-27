import gulp from 'gulp';
import babel from 'gulp-babel';
import path from 'path';

export function clean() {
    return del()
}

const paths = {
    src: 'src',
    dest: 'lib'
}
paths.scripts = {
    src: path.join(paths.src, '/**/*.js'),
    dest: paths.dest
};

export function scripts() {
    return gulp.src(paths.scripts.src, { since: gulp.lastRun(scripts),
                                         sourcemaps: true })
        .pipe(babel())
        .pipe(gulp.dest(paths.scripts.dest))
}

export function watch() {
    gulp.watch(paths.scripts.src, scripts)
        .on('error', (err) => {
            console.error(err.stack);
        });
}

export const build = scripts;

export default build;