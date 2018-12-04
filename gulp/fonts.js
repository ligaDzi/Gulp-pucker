var gulp              = require('gulp'); 
var cnf               = require('../package.json').config;              
 
gulp.task('fonts', function () {
    gulp.src(cnf.src.fonts)                 // откуда взять файл 

    .pipe(gulp.dest(cnf.dist.fonts));             // куда файл выгрузить после изменения
    
});
 
// Это слежение
// оно нужно чтобы при изменении fonts файла и сохранении его автоматически запускался "task"  
gulp.task('fonts:watch', function () {
  gulp.watch(cnf.src.fonts, ['fonts']);
});