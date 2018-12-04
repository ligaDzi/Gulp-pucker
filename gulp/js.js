var gulp              = require('gulp');
var cnf               = require('../package.json').config;
var plumber           = require('gulp-plumber');            // нужен для того чтобы после возникновения ошибки сборка не останавливалась, чтобы после ошибки заново не запускать сборку
var notify            = require("gulp-notify");
var sourcemaps        = require('gulp-sourcemaps');
var babel             = require('gulp-babel');    
var include           = require("gulp-include"); 
var uglify            = require('gulp-uglify');            
 
gulp.task('js', function () {
  return gulp.src(cnf.src.js)                 // откуда взять файл 

    // вывод ошибок
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))

    // показывает в какой строке правки в минифицированном файле 
    // {loadMaps: true} - чтобы карта записывалась в отдельный файл, от javaScript                            
    .pipe(sourcemaps.init({loadMaps: true})) 

    .pipe(babel())

    //  с помощью этого "пайпа" можно в файле main.js подключать другие .js файлы:   //=require components/1.js
    .pipe(include({
        extensions: "js",
        hardFail: true
      }))

    // минимизация javaScript файла
    .pipe(uglify())

    .pipe(sourcemaps.write('.'))

    .pipe(gulp.dest(cnf.dist.js));             // куда файл выгрузить после изменения
    
});
 
// Это слежение
// оно нужно чтобы при изменении sass файла и сохранении его автоматически запускался "task"  
gulp.task('js:watch', function () {
  gulp.watch([cnf.src.js, `src/js/components/**/*.*`], ['js']);
});