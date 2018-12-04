var gulp              = require('gulp');
var cnf               = require('../package.json').config;
var plumber           = require('gulp-plumber');            // нужен для того чтобы после возникновения ошибки сборка не останавливалась, чтобы после ошибки заново не запускать сборку
var notify            = require("gulp-notify");
var sourcemaps        = require('gulp-sourcemaps');
var sass              = require('gulp-sass');
var autoprefixer      = require('gulp-autoprefixer');
var cssnano           = require('gulp-cssnano'); 
var rename            = require("gulp-rename");                  
 
gulp.task('sass', function () {
  return gulp.src(cnf.src.sass)                 // откуда взять файл 

    // вывод ошибок
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))

    // показывает в какой строке правки в минифицированном файле                             
    .pipe(sourcemaps.init())      

    .pipe(sass().on('error', sass.logError))

    // здесь добавляються автопрефиксы (display:-ms-flexbox) где это нужно
    .pipe(autoprefixer({                        
        browsers: ['last 4 versions', 'ie 10'],
        cascade: false
    })) 

    // Для минимизации css файла
    .pipe(cssnano()) 
    
    // здесь просто меняется имя минифицированного файла
    .pipe(rename({                              
      dirname: "",
      basename: "main",
      prefix: "",
      suffix: ".min",
      extname: ".css"
    }))   

    .pipe(sourcemaps.write())

    .pipe(gulp.dest(cnf.dist.css));             // куда файл выгрузить после изменения
    
});
 
// Это слежение
// оно нужно чтобы при изменении sass файла и сохранении его автоматически запускался "task"  
gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.*', ['sass']);
});