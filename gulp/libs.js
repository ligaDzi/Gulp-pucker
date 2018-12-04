// здесь импортируются все библиотеки (css и js), сжимаються и переименовываеться в "libs.min.css" и "libs.min.js"

var gulp              = require('gulp');
var cnf               = require('../package.json').config;
var plumber           = require('gulp-plumber');            // нужен для того чтобы после возникновения ошибки сборка не останавливалась, чтобы после ошибки заново не запускать сборку
var notify            = require("gulp-notify");
var cssnano           = require('gulp-cssnano'); 
var rename            = require("gulp-rename");  
var importCss         = require('gulp-import-css');
var babel             = require('gulp-babel');    
var include           = require("gulp-include"); 
var uglify            = require('gulp-uglify'); 

gulp.task('libs', function () {
    // CSS
    gulp.src(cnf.libs.css)                 // откуда взять файл 
  
      // вывод ошибок
      .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  
      //                             
      .pipe(importCss())        
  
      // Для минимизации css файла
      .pipe(cssnano()) 
      
      // здесь просто меняется имя минифицированного файла
      .pipe(rename({                              
        dirname: "",
        basename: "libs",
        prefix: "",
        suffix: ".min",
        extname: ".css"
      }))           
      .pipe(gulp.dest(cnf.dist.css));             // куда файл выгрузить после изменения

    // JS
    gulp.src(cnf.libs.js)                 // откуда взять файл 

      // вывод ошибок
      .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  
      .pipe(babel())
  
      //  с помощью этого "пайпа" можно в файле main.js подключать другие .js файлы:   //=require components/1.js
      .pipe(include({
          extensions: "js",
          hardFail: true
        }))
  
      // минимизация javaScript файла
      .pipe(uglify())  
      .pipe(gulp.dest(cnf.dist.js));             // куда файл выгрузить после изменения
      
  });
   
  // Это слежение
  // оно нужно чтобы при изменении sass файла и сохранении его автоматически запускался "task"  
  gulp.task('libs:watch', function () {
    gulp.watch(cnf.libs.css, ['libs']);
    gulp.watch(cnf.libs.js, ['libs']);
  });