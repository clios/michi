const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const rename = require('gulp-rename')

function buildStyles() {
  return src('michi.scss').pipe(sass()).pipe(dest('css'))
}

function watchTask() {
  watch(['scss/**/*.scss'], buildStyles)
}

function cssminify() {
  return src('michi.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('css'))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(
      rename({
        extname: '.min.css'
      })
    )
    .pipe(dest('css'))
}

exports.default = series(buildStyles, watchTask)

exports.cssminify = cssminify
