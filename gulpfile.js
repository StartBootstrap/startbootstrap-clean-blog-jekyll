// var gulp = require('gulp');

// gulp.task('copy', function() {

//   // Start Bootstrap Clean Blog SCSS
//   gulp.src(['node_modules/startbootstrap-clean-blog/scss/**/*'])
//     .pipe(gulp.dest('assets/vendor/startbootstrap-clean-blog/scss'))

//   // Start Bootstrap Clean Blog JS
//   gulp.src([
//       'node_modules/startbootstrap-clean-blog/js/clean-blog.min.js',
//       'node_modules/startbootstrap-clean-blog/js/jqBootstrapValidation.js'
//     ])
//     .pipe(gulp.dest('assets/vendor/startbootstrap-clean-blog/js'))

//   // Bootstrap
//   gulp.src([
//       'node_modules/bootstrap/dist/**/*',
//       '!**/npm.js',
//       '!**/bootstrap-theme.*',
//       '!**/*.map'
//     ])
//     .pipe(gulp.dest('assets/vendor/bootstrap'))

//   // jQuery
//   gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
//     .pipe(gulp.dest('assets/vendor/jquery'))

//   // Font Awesome
//   gulp.src([
//       'node_modules/font-awesome/**',
//       '!node_modules/font-awesome/**/*.map',
//       '!node_modules/font-awesome/.npmignore',
//       '!node_modules/font-awesome/*.txt',
//       '!node_modules/font-awesome/*.md',
//       '!node_modules/font-awesome/*.json'
//     ])
//     .pipe(gulp.dest('assets/vendor/font-awesome'))

// })

// // Default task
// gulp.task('default', ['copy']);


//if you use gulp v4.0, need to migration this code v3.0 -> v4.0
//https://github.com/gulpjs/gulp/blob/master/docs/recipes/using-multiple-sources-in-one-task.md


//⭐️ 
//npm install --save-dev gulp@next merge-stream
var gulp = require('gulp');

//⭐️
var merge = require('merge-stream');

gulp.task('copy', function() {

  // Start Bootstrap Clean Blog SCSS
  var bootstrapSCSS = gulp.src(['node_modules/startbootstrap-clean-blog/scss/**/*'])
    .pipe(gulp.dest('assets/vendor/startbootstrap-clean-blog/scss'))

  // Start Bootstrap Clean Blog JS
  var bootstrapJS = gulp.src([
      'node_modules/startbootstrap-clean-blog/js/clean-blog.min.js',
      'node_modules/startbootstrap-clean-blog/js/jqBootstrapValidation.js'
    ])
    .pipe(gulp.dest('assets/vendor/startbootstrap-clean-blog/js'))

  // Bootstrap
  var bootstrap = gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/npm.js',
      '!**/bootstrap-theme.*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('assets/vendor/bootstrap'))

  // jQuery
  var jQuery = gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('assets/vendor/jquery'))

  // Font Awesome
  var fontAwesome = gulp.src([
      'node_modules/font-awesome/**',
      '!node_modules/font-awesome/**/*.map',
      '!node_modules/font-awesome/.npmignore',
      '!node_modules/font-awesome/*.txt',
      '!node_modules/font-awesome/*.md',
      '!node_modules/font-awesome/*.json'
    ])
    .pipe(gulp.dest('assets/vendor/font-awesome'))

  return merge(bootstrapSCSS, bootstrapJS, bootstrap, jQuery, fontAwesome);
});

// Default task
gulp.task('default', gulp.series(['copy']));