'use strict';
require('dotenv').load();

var gulp = require('gulp'),
    fs = require('fs'),
    del = require('del'),
    merge = require('merge'),
    semver = require('semver'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence').use(gulp),
    $ = require('gulp-load-plugins')({
      rename: {
        'gulp-minify-css': 'minifyCSS',
        'gulp-tag-version': 'tagVersion',
        'gulp-gh-pages': 'deploy'
      }
    }),
    argv = require('yargs').argv;

var DIST = './dist/public/assets/',
    TMP = './.tmp/public/assets/';

var config = {
  autoprefixer: {
    browsers: [
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 31',
      'safari >= 6.1',
      'opera >= 23',
      'ios >= 6.1',
      'android >= 2.3',
      'bb >= 10'
    ]
  },
  assetsFolder: ifTaskName(['default', 'serve']) ? TMP : DIST,
  debug: ifTaskName(['default', 'serve']),
  serve: ifTaskName(['default', 'serve']),
  env: argv.env || (ifTaskName(['push-dist', 'release']) ? 'prod' : 'stage'),
  increment: argv.inc || 'patch',
  dryRun: argv.dryrun || false
};

function ifTaskName(tasks) {
  return tasks.indexOf(argv._[0]) !== -1 || (tasks.indexOf('default') !== -1 && argv._.length === 0);
}

gulp.task('default', function (done) {
  runSequence(['sass', 'browserify'], 'serve', function () {
    gulp.watch('./app/**/*.scss', ['sass']);
    gulp.watch(['./**/*.+(js|jsx)', '!./node_modules/**', '!./.tmp/**'], ['lint']);
    done();
  });
});

gulp.task('build', function (done) {
  var appConfig = require('./env.json');
  merge(process.env, appConfig[config.env]);

  runSequence('clean:dist', ['lint', 'sass', 'browserify', 'copy'], done);
});

gulp.task('serve', function () {
  $.nodemon({
    script: 'server.js',
    ext: 'ejs js jsx',
    ignore: ['.tmp/**', 'dist/**', 'node_modules/**'],
    nodeArgs: ['--debug'],
    env: {
      PORT: '8000'
    },
    stdout: false
  })
  .on('stdout', function (data) {
    logNodemon(data);
    if(data.toString().indexOf('Listening on port 8000') !== -1 && !browserSync.active){
      browserSync({
        proxy: 'localhost:8000',
        open: false,
        logFileChanges: true,
        logConnections: true
      });
    }
  })
  .on('stderr', logNodemon);
});

gulp.task('serve:dist', ['build'], function () {
  $.nodemon({
    script: 'server.js',
    ext: 'ejs js jsx',
    cwd: 'dist',
    nodeArgs: ['--debug'],
    env: {
      PORT: '3000'
    },
    stdout: false
  })
  .on('stdout', logNodemon)
  .on('stderr', logNodemon);
});

gulp.task('lint', function () {
  return gulp.src(['./**/*.+(js|jsx)', '!./node_modules/**', '!./dist/**'])
    .pipe($.react({errLogToConsole: true}))
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!config.serve, $.jshint.reporter('fail')));
});

gulp.task('sass', function () {
  return gulp.src('./app/scss/main.scss')
    .pipe($.if(config.debug, $.sourcemaps.init()))
    .pipe($.sass({errLogToConsole: true, imagePath: process.env.BASE_URL}))
    .pipe($.autoprefixer({browsers: config.autoprefixer.browsers}))
    .pipe($.if(!config.debug, $.minifyCSS()))
    .pipe($.ver({suffix: ['min']}))
    .pipe($.if(config.debug, $.sourcemaps.write()))
    .pipe(gulp.dest(config.assetsFolder))
    .pipe($.if(browserSync.active, browserSync.reload({stream: true})));
});

gulp.task('browserify', function() {
  var bundler = browserify('./app/client.jsx', {debug: config.debug})
    .transform(require('reactify'))
    .transform(require('envify'))
    .on('log', function (msg) {
      gutil.log(gutil.colors.yellow('[Browserify]'), msg);
    });

  if(config.serve){
    bundler = watchify(bundler, watchify.args);
    bundler.on('update', rebundle);
  }

  function rebundle() {
    return bundler.bundle()
      .on('error', function (err) {
        gutil.log(gutil.colors.red('[Browserify Error]'), err.message);
      })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe($.if(!config.debug, $.uglify()))
      .pipe($.ver({suffix: ['min']}))
      .pipe(gulp.dest(config.assetsFolder))
      .pipe($.if(browserSync.active, browserSync.reload({stream: true})));
  }

  return rebundle();
});

gulp.task('clean', ['clean:dist'], function (done) {
  del(['.tmp/**'], {force: true}, done);
});

gulp.task('clean:dist', function (done) {
  del(['dist/**'], {force: true}, done);
});

gulp.task('copy', function(){
  var files = ['*.+(js|jsx|json)', '!Gulpfile.js', 'middleware/**/*', 'app/**/*.*', 'public/**/*.*', 'views/**/*.*'];

  return gulp.src(files, {base: './'})
    .pipe(gulp.dest('dist'));
});

gulp.task('bump', function () {
  var pkg = getPackageJson(),
      newVer = semver.inc(pkg.version, config.increment);

  return gulp.src('./package.json')
    .pipe($.bump({version: newVer}))
    .pipe(gulp.dest('./'))
    .pipe($.if(!config.dryRun, $.git.commit('Bumped version to v' + newVer + (config.increment === 'major' ? '. Hooray!' : ''))))
    .pipe($.if(!config.dryRun, $.tagVersion()));
});

gulp.task('push-dist', function () {
  return gulp.src('./dist/**/*.*')
    .pipe($.deploy({
      branch: config.env,
      push: !config.dryRun,
      cacheDir: './.deploy-cache',
      message: 'Release v' + getPackageJson().version + ' to ' + config.env
    }));
});

gulp.task('release', false, function (done) {
  runSequence('bump', 'build', 'push-dist', done);
});

function logNodemon(data) {
  gutil.log(gutil.colors.yellow('[nodemon]'), data.toString().replace(/^\s+|\s+$/g, ''));
}

function getPackageJson() {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
}
