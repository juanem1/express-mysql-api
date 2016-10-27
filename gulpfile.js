var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', () => {
  nodemon({
    script: './src/server/app.js',
    ext: 'js',
    env: {
      PORT: 8080
    },
    ignore: ['./node_modules/**']
  })
  .on('restart', () => console.log('Restarting Server.'))
});
