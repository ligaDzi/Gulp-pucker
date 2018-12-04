var gulp              = require('gulp');
var runSequence       = require('run-sequence');

// здесь определяется очередность запуска "тасков"
gulp.task('build', function() {
    runSequence(
        'sass',
        'html',
        'js',
        'fonts',
        'img',
        'libs'
    );
  });