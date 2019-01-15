const path = require('path');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const nodemon = require('nodemon');
// const chokidar = require('chokidar');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');

const mongodb = require('mongodb').MongoClient;
const config = require('./config/config');

const serverPort = 4000;
const proxyPort = 3000;
const publicDir = './public';
const appDir = './src';

gulp.task('build-js', function () {
    return gulp.src(`${appDir}/index.js`)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(publicDir));
});

gulp.task('nodemon', done => {
    nodemon('--inspect --ignore public/ --ignore node_modules/ --ignore gulpfile.js server.js --port ' + serverPort);    
    nodemon.once('start', done)
    nodemon.on('restart', (files) => {
        setTimeout(() => {
            browserSync.reload();
        }, 1000)
    })
})

gulp.task("build-html", () => {
  return gulp.src(`${appDir}/**/*.html`)
    .pipe(gulp.dest(publicDir));
});

gulp.task('browser-sync-init', done => {
    browserSync.init({
        proxy: `http://localhost:${serverPort}`,
        port: proxyPort
    });
    done();
})

gulp.task('default', gulp.series('nodemon', 'browser-sync-init', 'build-html', 'build-js', () => {
    gulp.watch(`${publicDir}/**/*.*`)
        .on('change', (path) => browserSync.reload(path))
        .on('add', browserSync.reload)
        
    gulp.watch(`${appDir}/**/*.html`, gulp.series("build-html"));
}))

gulp.task('schemamon', done => {
    nodemon('--inspect --ignore public/ --ignore client/ --ignore node_modules/ --ignore gulpfile.js server.js');    
    nodemon.once('start', done)
})

gulp.task('dev', gulp.series('schemamon', async () => {
    const mongoClient = await mongodb.connect(config.mongoURL);
    console.log('SCHEMAMON: Successful connection to Mongo');
    const db = mongoClient.db(config.mongodbName);

    gulp.watch('./models/schemas/*.js').on('change', async (pathname) => {
        const collectionName = pathname.match(/(\w+)\-schema\.js$/)[1];
        console.log(`SCHEMAMON: Removing the ${collectionName} collection ...`);
        const result = await db.dropCollection(collectionName);

        if (result) {
            console.log(`SCHEMAMON: Successfull removing of the ${collectionName} collection`);
            nodemon.emit('restart');
        } else {
          console.log(`SCHEMAMON: Error removing of the ${collectionName} collection!`);
        }
    })
}));
