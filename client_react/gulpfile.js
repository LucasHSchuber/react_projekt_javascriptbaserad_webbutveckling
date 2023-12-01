'use strict';

const { src, dest, parallel, series, watch } = require('gulp');

const concat = require('gulp-concat');
const terser = require('gulp-terser');
// const cssnano = require('gulp-cssnano');
// const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
// const babel = require("gulp-babel"); //ADDED
const ts = require('gulp-typescript');


//sÃ¶kvÃ¤gare
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/css/*.css",
    sassPath: "src/assets/scss/*.scss",
    jsPath: "src/js/*.js",
    imagePath: "'src/images/*', '!src/images/*.PNG'",
    pngPath: "src/images/*.png",
    tsPath: "src/ts/*.ts",
}

//html-task, kopiera html
// function copyHTML() {
//     return src(files.htmlPath)
//         .pipe(dest('pub'));
// }

// //css-task, kopiera css
// function CSStask() {
//     return src(files.cssPath)
//     .pipe(concat('main.css'))
//     .pipe(cssnano())
//     .pipe(dest('pub/css'))  
//     .pipe(browserSync.stream());
// }

//scss-task, kopiera scss
function SASStask() {
    return src(files.sassPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(dest("src/assets/css"))
        .pipe(browserSync.stream());
}

//js-task, kopiera js
// function JStask() {
//     return src(files.jsPath)
//         .pipe(concat('main.js'))
//         // .pipe(babel({//ADDED
//         //     presets: ["@babel/preset-env"]//ADDED
//         // }))//ADDED
//         .pipe(terser())
//         .pipe(dest('pub/js'));
// }

//TStask, transpilerar typescript 
// function TStask() {
//     return src(files.tsPath) 
//         .pipe(sourcemaps.init())
//         .pipe(ts({
//             noImplicitAny: true,
//             outFile: 'output.js'
//         }))
//         .pipe(dest('pub/js'));
// }

//img-task, kopiera img
function IMGtask() {
    return src(files.imagePath)
        .pipe(imagemin())
        .pipe(dest('pub/images'));
}

//png-task som kopierar png-filer till pub
function PNGtask() {
    return src(files.pngPath)
        .pipe(dest('pub/images'));
}



//watch task, live update from src to pub
function watchTask() {
    // browserSync.init({
    //     server: "./pub"
    // });
    
    watch(files.sassPath, SASStask);  // Watch Sass files specifically
    // watch([ files.jsPath, files.imagePath, files.pngPath, files.sassPath], parallel(IMGtask, PNGtask, SASStask)).on('change', browserSync.reload);
}


exports.watch = watchTask;
exports.SASStask = SASStask;

exports.default = series(
    parallel( PNGtask, SASStask),
    watchTask
);