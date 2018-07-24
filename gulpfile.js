var gulp = require('gulp');

gulp.task('copy', function() {

  // Start Bootstrap Clean Blog SCSS
  gulp.src(['node_modules/startbootstrap-clean-blog/scss/**/*'])
    .pipe(gulp.dest('assets/vendor/startbootstrap-clean-blog/scss'))

  // Start Bootstrap Clean Blog JS
  gulp.src([
      'node_modules/startbootstrap-clean-blog/js/clean-blog.min.js',
      'node_modules/startbootstrap-clean-blog/js/jqBootstrapValidation.js'
    ])
    .pipe(gulp.dest('assets/vendor/startbootstrap-clean-blog/js'))

  // Bootstrap
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/npm.js',
      '!**/bootstrap-theme.*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('assets/vendor/bootstrap'))

  // jQuery
  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('assets/vendor/jquery'))

  // Font Awesome
  gulp.src([
      'node_modules/font-awesome/**',
      '!node_modules/font-awesome/**/*.map',
      '!node_modules/font-awesome/.npmignore',
      '!node_modules/font-awesome/*.txt',
      '!node_modules/font-awesome/*.md',
      '!node_modules/font-awesome/*.json'
    ])
    .pipe(gulp.dest('assets/vendor/font-awesome'))

})

// Default task
gulp.task('default', ['copy']);
