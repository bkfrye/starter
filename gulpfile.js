var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache')
    del = require('del')
    runSequence = require('run-sequence');

//dev tasks

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  })
})



// Run SCSS tasks
gulp.task('styles', function() {
  return gulp.src('dev/sass/*.sass')
    .pipe(sass({
      'sourcemap=none': true
    }))
    .pipe(autoprefixer('last 10 versions', 'ie 9'))
    .pipe(concat('stylesheet.css'))
    .pipe(minifyCss({compatibility: 'ie9'}))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({
        stream: true
    }));
});



//Run HTML tasks
gulp.task('html', function() {
    return gulp.src('dev/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({
        stream:true
    }));
});



// Optimize image files
gulp.task('images', function(){
  return gulp.src('dev/images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
    interlaced: true
  })))
  .pipe(gulp.dest('dist/img'))
});



//Watch files in /dev
gulp.task('watch', ['browserSync'], function() {
    gulp.watch('dev/sass/*.sass', ['styles']);
    gulp.watch('dev/*.html', ['html']) 
});


//Cleans /dist folder but leave /img folder
gulp.task('clean', function (callback){
  runSequence('clean:dist', ['styles', 'images'], callback)
});

//Cleans everything but /img folder
gulp.task('clean:dist', function (callback) {
  del(['dist/**/*', '!dist/img', '!dist/img/**/*'], callback)
})


gulp.task('default', function (callback) {
    runSequence(['styles', 'html', 'browserSync', 'watch'], callback)
});




