const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const nodemon = require('nodemon');
const graphql = require('graphql');
const fetchSchema = require('fetch-graphql-schema');
const webpackCompiler = require('./webpack');
const config = require('./config');
function onBuild(done) {
  return function(err, stats) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }
    if (done) {
      done();
    }
  };
}

gulp.task('build', function(done) {
  webpackCompiler.run(onBuild(done));
});

gulp.task('build-schema', ['dev'], function getSchema() {
  fetchSchema(config.APP_URL + ':' + config.APP_PORT + '/' + config.GQL_URL_DIR, { readable: true })
    .then(function(schema) {
      fs.writeFile(path.join(__dirname, 'src/graphql/schema.graphql'), schema, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log('Schema saved to: src/graphql/schema.graphql');
        console.log('Closing server');
        process.exit();
      });
    })
    .catch(err => {
      if (err.code === 'ECONNREFUSED') {
        console.log('Server not loaded, retrying in one second....');
        setTimeout(getSchema, 1000);
      }
    });
});

gulp.task('dev', function(done) {
  var firedDone = false;
  webpackCompiler.watch({ ignored: /node_modules/ }, function(err, stats) {
    // if it's first time compiling
    if (!firedDone) {
      firedDone = true;
      nodemon({
        execMap: { js: 'node' },
        script: path.join(__dirname, 'dist/server'),
        ignore: ['*', 'src/client'],
        watch: ['foo/'],
        ext: 'noop'
      })
        .on('restart', function() {
          console.log('Patched!');
        })
        .on('quit', () => {
          process.exit();
        });
      done();
    }
    nodemon.restart();
  });
});
gulp.task('run', function() {
  require(path.join(__dirname, 'dist/server.js'));
});
