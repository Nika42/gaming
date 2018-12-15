const gulp = require('gulp');
const wait = require('gulp-wait');

const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify').uglify;

const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const scss = require('gulp-sass');


gulp.task('connect', function () {
    connect.server({
        root: 'public',
        livereload: true
    });
});


gulp.task('rollup', async () => {
  
    const bundle = await rollup.rollup({
        input: './src/js/main.js',
        plugins: [
            resolve(),
            commonjs(),
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/env']
            }),
            uglify({
                compress: true,
                mangle: true,
                output: {
                    beautify: true
                }
            }),
        ]
    });

    await bundle.write({
        file: './public/js/main.js',
        format: 'iife',
        name: 'library',
        sourcemap: true
    });

    return gulp.src('./public/js/main.js')
        .pipe(gulp.dest('./public/js/'))
        .pipe(connect.reload());
  
});


gulp.task('scss', () => {
    return gulp.src('./src/scss/*.scss')
        .pipe(wait(200))
        .pipe(sourcemaps.init())
        .pipe(scss({
            outputStyle: 'expanded', 
            includePaths: [ './public/components/bootstrap/scss' ] 
        }).on('error', scss.logError))
        .pipe(postcss([ autoprefixer ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css/'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./public'))
        .pipe(connect.reload());
});


gulp.task('default', ['connect', 'html', 'scss', 'rollup'], function(){
    gulp.watch(['./src/*.html'], ['html']);
    gulp.watch('./src/scss/**/**.scss', ['scss']);
    gulp.watch(['./src/js/**/**.js'], ['rollup']);
});