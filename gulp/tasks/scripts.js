const gulp = require('gulp');
const webpackStream = require("webpack-stream");
const webpack = require("webpack");

const $ = require('../plugins');
const DIR = require('../conf').DIR;
const conf = require('../conf').scripts;

const webpackError = function() {
  this.emit('end');
};

gulp.task('scripts', (done) => {
  conf.webpack.mode = process.env.NODE_ENV;
  console.log(`Starting Webpack build in ${conf.webpack.mode} mode...`);

  if (conf.webpack.mode == 'development') {
    return gulp.src(conf.src)
      .pipe(webpackStream(conf.webpack, webpack))
      .on('error', function(err) {
        console.error('Webpack Error (dev):', err.toString());
        this.emit('end');
      })
      .pipe(gulp.dest(conf.dest[conf.webpack.mode]));
  } else {
    return webpackStream(conf.webpack, webpack)
      .on('error', function(err) {
        console.error('Webpack Error (prod):', err.toString());
        done(err);
      })
      .pipe($.rename({suffix: '.min'}))
      .pipe(gulp.dest(conf.dest[conf.webpack.mode]))
      .on('end', () => {
        console.log('Webpack build completed successfully.');
      });
  }
});
