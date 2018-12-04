var gulp              = require('gulp');
var runSequence       = require('run-sequence');

// здесь определяется очередность запуска "тасков"
gulp.task('default', function() {
    runSequence(
        'build',                // собрать сборку
        [                       
            'sass:watch',       // параллельно запустить эти "таски"
            'js:watch',
            'html:watch',
            'fonts:watch',
            'img:watch',
            'libs:watch'
        ],
        'server'                // запустить сервер
    );
  });