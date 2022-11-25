const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

gulp.task('server', function () { // запускает сервер
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
});

gulp.task('styles', function () { // создаем задачу которая компилирует sass в css
    return gulp.src("src/scss/**/*.+(scss|sass)")
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename({ //
            prefix: "", // компилирует sass файл в css
            suffix: ".min", //
        })) //
        // добавляет авто префиксы для браузеров
        .pipe(autoprefixer({
            cascade: false
        }))
        // очищает этот файл
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest("src/css")) // куда сохраняются файлы
        .pipe(browserSync.stream()); // отслеживает изменения
});

gulp.task('watch', function () { // отслеживает изменения в проекте
    gulp.watch('src/scss/**/*.+(scss|sass)', gulp.parallel('styles'));
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles')); // запускаем все задачи