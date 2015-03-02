/* jshint node:true */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
  return gulp.src(['app/styles/app-rtl.scss', 'app/styles/app-ltr.scss'])
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10
    }))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('fileinclude', function () {
  return gulp.src(['!app/templates/base{,/**}', 'app/templates/*.tpl.html'])
    .pipe($.fileInclude())
    .pipe($.rename({
      extname: ''
    }))
    .pipe($.rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('app/'));
});

gulp.task('html', ['fileinclude', 'styles'], function () {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('build'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe(gulp.dest('build/images'));
});

gulp.task('fonts', function () {
  return gulp.src('app/font/**/*')
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe(gulp.dest('build/font'));
});

gulp.task('languages', function () {
  return gulp.src([
      'app/languages/**/*.*'
    ]).pipe(gulp.dest('build/languages'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'build']));

gulp.task('connect', ['styles'], function () {
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = require('connect')()
    .use(require('connect-livereload')({port: 35729}))
    .use(serveStatic('.tmp'))
    .use(serveStatic('app'))
    .use('/bower_components', serveStatic('bower_components'))
    .use(serveIndex('app'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('serve', ['connect', 'watch'], function () {
  require('opn')('http://localhost:9000');
});

gulp.task('watch', ['connect'], function () {
  $.livereload.listen();

  gulp.watch([
    'app/*.html',
    '.tmp/styles/**/*.css',
    'app/scripts/**/*.js',
    'app/images/**/*',
    'bower_components/materialize/dist/js/*.js'
  ]).on('change', $.livereload.changed);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch([
    'app/templates/**/*.tpl.html',
    'app/templates/**/*.html'], ['fileinclude']);
});

//include jshint task if strict javascript is necessary
gulp.task('build', ['fileinclude', 'html', 'images', 'fonts', 'languages'], function () {
  return gulp.src('build/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
