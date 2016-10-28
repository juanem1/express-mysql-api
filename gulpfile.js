'use strict';

const Elixir = require('laravel-elixir');
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const inject = require('gulp-inject');
const clean = require('gulp-clean');

// Extend laravel elixir
const Task = Elixir.Task;
Elixir.extend('nodemon', () => {
  new Task('nodemon', () => {
    nodemon({
      script: './src/server/app.js',
      ext: 'js',
      env: {
      PORT: 8080
      },
        ignore: ['./node_modules/**']
    })
    .on('restart', () => console.log('Restarting Server.'));
  });
});

Elixir.extend('inject', () => {
  new Task('inject', () => {
    let target = gulp.src('./src/client/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    let sources = gulp.src([
      './dist/css/**/*.css', 
      './dist/js/**/*.js'
    ], {read: false});
 
    return target
      .pipe(inject(sources))
      .pipe(gulp.dest('./dist'));
  });
});

Elixir.extend('clean', (dir) => {
  new Task('clean', () => {
    return gulp
      .src(dir, {read: false})
      .pipe(clean());
  });
});

// Run all tasks 
Elixir((mix) => {

  // Mix Vendor styles
  mix.styles([
    './node_modules/bulma/css/bulma.css'
  ], 'dist/css/vendor.css');

  // Mix App styles
  mix.sass([
    './src/client/assets/sass/main.scss'
  ], 'dist/css/app.css');

  // Mix app scripts
  mix.scripts([
    './src/client/assets/js/app.js'
  ], 'dist/js/app.js');

  // Before inject files clean index.html
  //mix.clean('dist/index.html');

  // Inject css and js files into HTML
  mix.inject();

  // Run nodemon
  mix.nodemon();

});
