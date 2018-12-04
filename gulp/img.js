var gulp              = require('gulp');
var cnf               = require('../package.json').config;
var plumber           = require('gulp-plumber');            // нужен для того чтобы после возникновения ошибки сборка не останавливалась, чтобы после ошибки заново не запускать сборку
var notify            = require("gulp-notify");
var imagemin          = require('gulp-imagemin');

gulp.task('img', function () {
    gulp.src(cnf.src.img.nocompress)                 // откуда взять файл   
  
      .pipe(gulp.dest(cnf.dist.img));             // куда файл выгрузить после изменения

    gulp.src(cnf.src.img.compress)                 // откуда взять файл   

      .pipe(imagemin([
          imagemin.gifsicle({interlaced: true}),
          imagemin.jpegtran({progressive: true}),
          imagemin.optipng({optimizationLevel: 5}),
          imagemin.svgo({
              plugins: [
                  {removeViewBox: false},
                  {cleanupIDs: false}
              ]
          })
      ]))
      .pipe(gulp.dest(cnf.dist.img));             // куда файл выгрузить после изменения
      
  });
   
  // Это слежение
  // оно нужно чтобы при изменении sass файла и сохранении его автоматически запускался "task"  
  gulp.task('img:watch', function () {
    gulp.watch(`src/img/**/*.*`, ['img']);
  });