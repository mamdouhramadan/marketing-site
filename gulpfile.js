// const { dest } = require('gulp');
var path = require('path'),
    gulp = require('gulp'),
    data = require('gulp-data'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    postcss = require('gulp-postcss'),
    pug = require('gulp-pug'),
    livereload = require('gulp-livereload'),
    sourcemap = require('gulp-sourcemaps'),
    minify = require('gulp-minify'),
    notify = require("gulp-notify"),
    tailwindcss = require('tailwindcss');



// ========================
// Start HTML Task
// ========================
gulp.task('html', function () {
    return gulp.src('dev/pages/*.pug')
        .pipe(data(function (file) {
            var basename = path.basename(file.relative, '.pug');
            return { isHomePage: basename === 'index' || basename === 'index-ar' };
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(notify("HTML Done!"))
        .pipe(livereload())
});

// =======================
// Start Css Task
// =======================
gulp.task('css', function () {
    return gulp.src(['dev/scss/**/*.css', 'dev/scss/*.scss'])
        .pipe(sourcemap.init())
        .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify("CSS Done!"))
        .pipe(livereload())
})

// ====================================
// Start Libraries and Framework Task
// ====================================
gulp.task('libs', function () {
    return gulp.src(['dev/libs/reset.min.css', 'dev/libs/normalize.css', 'dev/libs/font-awesome.css'])
        .pipe(sourcemap.init())
        .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('libs.css'))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify("CSS libraries Done!"))
        .pipe(livereload())
})

// ======================
// Start Js Task
// ======================
gulp.task('js', function () {
    return gulp.src(['dev/js/jquery-3.6.0.min.js' , 'dev/js/*.js'])
        .pipe(concat('main.js'))
        .pipe(minify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify("JS Done!"))
        .pipe(livereload())
})

// ======================
// Copy images to dist
// ======================
gulp.task('img', function () {
    return gulp.src('dev/images/*')
        .pipe(gulp.dest('dist/images'))
        .pipe(notify("Images Done!"));
});

// ======================
// Copy manifest to dist
// ======================
gulp.task('manifest', function () {
    return gulp.src('dev/manifest.json')
        .pipe(gulp.dest('dist'))
        .pipe(notify("Manifest Done!"));
});

// ======================
// Copy service worker to dist
// ======================
gulp.task('sw', function () {
    return gulp.src('dev/sw.js')
        .pipe(gulp.dest('dist'))
        .pipe(notify("SW Done!"));
});

// ======================
// Tailwind CSS (v3 via PostCSS)
// ======================
gulp.task('tailwind', function () {
    return gulp.src('dev/css/tailwind.css')
        .pipe(sourcemap.init())
        .pipe(postcss([tailwindcss(path.join(__dirname, 'tailwind.config.js')), require('autoprefixer')]))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify("Tailwind Done!"))
        .pipe(livereload());
});

// ======================
// Default and build tasks
// ======================
gulp.task('build', ['html', 'css', 'libs', 'tailwind', 'js', 'img', 'manifest', 'sw']);
gulp.task('default', ['build']);

//=========================
//    Start Watch Task
//=========================
gulp.task('watch', function () {
    require('./server.js');
    livereload.listen();
    gulp.watch(['dev/pages/**/*.pug', 'dev/pages/*.pug', 'dev/layouts/**/*.pug', 'dev/components/**/*.pug'], ['html']);
    gulp.watch(['dev/scss/**/*.css', 'dev/scss/**/*.scss'], ['css']);
    gulp.watch(['dev/libs/**/*.css', 'dev/libs/**/*.scss'], ['libs']);
    gulp.watch('dev/js/*.js', ['js']);
    gulp.watch(['dev/images/*'], ['img']);
    gulp.watch('dev/manifest.json', ['manifest']);
    gulp.watch('dev/sw.js', ['sw']);
    gulp.watch(['dev/css/tailwind.css', 'tailwind.config.js', 'dev/**/*.pug', 'dist/**/*.html'], ['tailwind']);
})