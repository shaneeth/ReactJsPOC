var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');
var browserSync = require('browser-sync');
var inject = require('gulp-inject');
var less = require('gulp-less');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

var path = {
  INDEX: 'src/index.html',
  HTML: 'src/html/**/*.html',
  JSX: ['src/jsx/**/*.jsx'],
  MINIFIED_OUT: ['build.min.js'],
  DEST_SRC: 'dist/src',
  DEST_BUILD: 'dist/build',
  DEST: 'dist',
  DEST_HTML: './dist/src/index.html',
  DEST_JS: ['./src/**/*.js', '!./src/App.js']
};

gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: './dist/'
    }
  });
});

gulp.task('inject', function() {
  var target = gulp.src(path.INDEX);
  var styles = gulp.src('styles/**/*.css', {read: false, cwd: __dirname + '/dist'});
  var plugins = gulp.src('plugins/**/*.js', {read: false, cwd: __dirname + '/dist'});
  var sources = gulp.src(path.DEST_JS, {read: false, cwd: __dirname + '/dist'});
  return target.pipe(inject(styles))
               .pipe(inject(plugins, {name: 'plugins'}))
               .pipe(inject(sources))
               .pipe(gulp.dest(path.DEST));
});

gulp.task('transform', function() {
  return gulp.src(path.JSX)
             .pipe(react())
            .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('copy:html', function() {
  gulp.src(path.HTML)
      .pipe(gulp.dest('dist/html'));
});

gulp.task('copyPlugins', function() {
  return gulp.src(['src/plugins/**/*.js'])
             .pipe(gulp.dest('dist/plugins'));
});

gulp.task('less', function() {
  return gulp.src('src/less/main.less')
             .pipe(less())
             .pipe(gulp.dest('dist/styles'))
             .pipe(browserSync.reload({stream:true}));
});

gulp.task('clean', function() {
  return gulp.src(['dist/html/**/*.*', 'dist/plugins/**/*.*', 'dist/src/**/*.*', 'dist/styles/**/*.*'], {read: false})
        .pipe(clean({force: true}));
});

gulp.task('clean:js', function() {
  return gulp.src('dist/src/**/*.js', {read: false})
        .pipe(clean());
});

gulp.task('watch:js', function() {
  return gulp.watch(path.JSX, function(event) {
            if(event.type == 'changed') {
              runSequence('transform', browserSync.reload);
            } else if (event.type == 'added') {
              runSequence('transform', 'inject', browserSync.reload);
            } else if(event.type == 'deleted' || event.type == 'renamed') {
              runSequence('clean:js', 'transform', 'inject', browserSync.reload);
            }
          });
});

gulp.task('watch:html', function() {
  return gulp.watch(path.HTML, ['copy:html', browserSync.reload]);
});

gulp.task('watch:index', function() {
  return gulp.watch(path.INDEX, ['inject', browserSync.reload]);
});


gulp.task('watch:less', function() {
  return gulp.watch('src/less/**/*.less', ['less']);
});

gulp.task('default', function(cb) {
  runSequence('clean', 'copy:html', 'copyPlugins', 'transform',
              'less', 'inject', 'watch:index', 'watch:html',
              'watch:js','watch:less', 'server', cb);
});
