var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var browserSync = require('browser-sync'); 
var rigger = require('gulp-rigger');
//var autoprefixer = require('gulp-autoprefixer');

var config = {
    src: {main:"app/", js:"assets/js/", css:"assets/css/", pages:"assets/pages/"},
    dest: {main:"dist/", js:"assets/js/", css:"assets/css/", pages:"assets/pages/"}
    
}

gulp.task('mainfiles', function() {
    return gulp.src(mainBowerFiles())
    .pipe(gulp.dest(config.dest.main+config.dest.js))
});

gulp.task('copy', function () {
  return gulp.src("bower_components/bootstrap/dist/**/*.*") // Выборка исходных файлов для обработки плагином
    //.pipe(plugin()) // Вызов Gulp плагина для обработки файла
    .pipe(gulp.dest('dist/assets/')) // Вывод результирующего файла в папку назначения (dest - пункт назначения)
})

/*
gulp.task('autoprefixer', function () {
    return gulp.src(config.src.css + 'app.css')
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'));
});*/


// дефолтная задача, если в консоли набрать gulp и нажать [enter] - запустится именно она. Можно переопределить.
gulp.task('default', ['watch'], function() {
    console.log('По дефолту просто запускаем нашу watch');
});

gulp.task('js', function() {
    console.log('Файлы js поменялись!');
});

gulp.task('css', function() {
    console.log('Файлы css поменялись!');
});

gulp.task('html', function() {
    console.log('Файлы html поменялись!');
});


gulp.task('rigger', function(){
    gulp.src(config.src.main+config.src.js+'**/*.js')
        .pipe(rigger())
        .pipe(gulp.dest(config.dest.main+config.dest.js));
        
    gulp.src(config.src.main+config.src.css+'/**/*.css')
        .pipe(rigger())
        .pipe(gulp.dest(config.dest.main+config.dest.css));
        
    gulp.src(config.src.main+'*.html')
        .pipe(rigger())
        .pipe(gulp.dest(config.dest.main));
        
    gulp.src(config.src.main+config.src.pages+'/**/*.html')
        .pipe(rigger())
        .pipe(gulp.dest(config.dest.main+config.dest.pages));
});

// задача browser-sync - запуск сервера для отображения изменений в файлах в режиме онлайн (не надо рефрешить)
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: config.dest.main // это каталог, из которого будут выбираться файлы для отдачи в браузер
        },
        port: 8082, // для c9.io открыты порты 8081, 8082
    });
});

// задача reload - перезапускает browser-sync для корректного отображения изменений
gulp.task('reload',['rigger','mainfiles'],function(){
    browserSync.reload();
})


// в случае изменения сущестующих или появления новых файлов - выполняем задачи js(вывод в консоль сообщения) и reload - перезапуск browser-sync 
// аналогично по css и html
gulp.task('watch', ['browser-sync', 'js', 'css', 'html', 'rigger','mainfiles', 'copy'], function() {
    gulp.watch(config.src.main+config.src.js+'**/*.js', ['js', 'reload']);
    gulp.watch(config.src.main+config.src.css+'**/*.css', ['css', 'reload']);
    gulp.watch(config.src.main+'**/*.html', ['html', 'reload']);

});
