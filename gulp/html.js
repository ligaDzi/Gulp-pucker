var gulp              = require('gulp');
var cnf               = require('../package.json').config;
var plumber           = require('gulp-plumber');            
var notify            = require("gulp-notify"); 
var fileinclude       = require('gulp-file-include');              
 
gulp.task('html', function () {
  return gulp.src(cnf.src.html)                 // откуда взять файл 

    // вывод ошибок
    // нужен для того чтобы после возникновения ошибки сборка не останавливалась, чтобы после ошибки заново не запускать сборку
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))

    //  с помощью этого "пайпа" можно в файле index.html подключать шаблоны: @@include('template/header.html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      
    .pipe(gulp.dest(cnf.dist.html));             // куда файл выгрузить после изменения
    
});
 
// Это слежение
// оно нужно чтобы при изменении sass файла и сохранении его автоматически запускался "task"  
gulp.task('html:watch', function () {
  gulp.watch('./src/**/*.html*', ['html']);
});