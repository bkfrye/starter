var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    nano = require('gulp-cssnano'),
    browserSync = require('browser-sync'),
    cache = require('gulp-cache'),
    del = require('del'),
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
  return gulp.src('dev/scss/*.scss')
    .pipe(sass({
      'sourcemap=none': true
    }))
    .pipe(autoprefixer('last 10 versions', 'ie 9'))
    .pipe(concat('stylesheet.css'))
    .pipe(nano())
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


//Run js tasks
gulp.task('js', function() {
    return gulp.src('dev/js/*.js')
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.reload({
        stream:true
    }));
});


// Run image files
gulp.task('images', function(){
    return gulp.src('dev/img/*.+(png|jpg|gif|svg)')
    .pipe(gulp.dest('dist/img/'))
});



//Watch files in /dev
gulp.task('watch', ['browserSync'], function() {
    gulp.watch('dev/scss/*.scss', ['styles']);
    gulp.watch('dev/*.html', ['html']);
    gulp.watch('dev/js/*.js', ['js']);
    gulp.watch('dev/img/*.+(png|jpg|gif|svg)', ['images']);
});


//Cleans /dist folder 
gulp.task('clean', function (callback){
  runSequence('clean:dist', ['styles', 'images'], callback)
});



gulp.task('default', function (callback) {
    runSequence(['styles', 'html', 'js', 'images', 'browserSync', 'watch'], callback)
});




