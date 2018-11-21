const path = require('path');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const nodemon = require('nodemon');
const chokidar = require('chokidar');

const serverPort = 4000;
const proxyPort = 3000;
const publicDir = './public';
const appDir = './src';

gulp.task('nodemon', done => {
    nodemon('--inspect --ignore public/ --ignore node_modules/ --ignore gulpfile.js server.js --port ' + serverPort);    
    nodemon.once('start', done)
    nodemon.on('restart', (files) => {
        setTimeout(() => {
            browserSync.reload();
        }, 1000)
    })
})

// копировать все html файлы из src/ в public/
gulp.task('build-html', () => {
    return gulp.src(`${appDir}/**/*.html`)
		.pipe(gulp.dest(publicDir));
})

gulp.task('browser-sync-init', done => {
    browserSync.init({
        proxy: `http://localhost:${serverPort}`,
        port: proxyPort
    });
    done();
})

gulp.task('default', gulp.series('nodemon', 'browser-sync-init', () => {
    gulp.watch(`${publicDir}/**/*.*`)
        .on('change', (path) => browserSync.reload(path))
        .on('add', browserSync.reload)
}))