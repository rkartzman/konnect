var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});

var port = process.env.PORT || config.defaultPort;
console.log('HEY venderor');
console.log(config.jsVendorAll);
console.log(config.jsVendorFile);
/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/**
 * serve the dev environment
 * --debug-brk or --debug
 * --nosync
 */
gulp.task('serve-dev', ['js-app', 'js-vendor', 'styles'], function() {
  startBrowserSync(true);
});

/**
 * serve the build environment
 * --debug-brk or --debug
 * --nosync
 */
gulp.task('serve-build', ['build'], function() {
  startBrowserSync(false);
});

/**
 * build the environment
 */
gulp.task('build', ['optimize-js', 'js-vendor', 'optimize-css']);

gulp.task('optimize-js', ['js-app'], function() {
  log('Optimizing JS');

  return gulp
      .src(config.jsApp)
      .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.uglify())
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(config.clientJs));
});

/**
 * Compress app JS to one file.
 * @return {Stream}
 */
gulp.task('js-app', ['clean-app-js'], function() {
  log('Compressing App JS');
  console.log("APPPPPPP");

  return gulp
      .src(config.jsAppAll)
      .pipe($.order(config.jsAppOrder)) // can be used, currently not
      .pipe($.concat(config.jsAppFile))
      .pipe(gulp.dest(config.clientJs));
      // console.log(gulp.pipe($.concat(config.jsAppFile)));
});

/**
 * Removes the compressed app js file
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-app-js', function() {
  clean(config.jsApp);
});

/**
 * Compress vendor JS to one file.
 * @return {Stream}
 */
gulp.task('js-vendor', ['clean-vendor-js'], function() {
  log('Compressing Vendor JS');

  return gulp
      .src(config.jsVendorAll)
      // .pipe($.order(config.jsVendorOrder)) // can be used, currently not
      .pipe($.concat(config.jsVendorFile))
      .pipe(gulp.dest(config.clientJs));
      // console.log(gulp.pipe($.concat(config.jsVendorFile)));
});

/**
 * Removes the compressed vendor js file
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-vendor-js', function() {
  clean(config.jsVendor);
});

gulp.task('optimize-css', ['styles'], function(){
  log('Optimizing CSS');

  return gulp
    .src(config.css)
    .pipe($.cleanCss())
    .pipe(gulp.dest(config.client));
});

/**
 * Compile less to css
 * @return {Stream}
 */
gulp.task('styles', ['clean-styles'], function() {
  log('Compiling Sass --> CSS');

  return gulp
    .src(config.sass)
    .pipe($.plumber()) // exit gracefully if something fails after this
    .pipe($.sass()) // .on('error', $.sass.logError)
    .on('error', errorLogger) // more verbose and dupe output. requires emit.
    .pipe($.autoprefixer({browsers: ['last 3 version', '> 5%']}))
    .pipe(gulp.dest(config.client));
});


/**
 * Remove all styles from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-styles', function() {
  clean(config.css);
});


/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path) {
  log('Cleaning: ' + $.util.colors.blue(path));
  return del(path);
}

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}

/**
 * Log an error message and emit the end of a task
 */
function errorLogger(error) {
  log('*** Start of Error ***');
  log(error);
  log('*** End of Error ***');
  this.emit('end');
}

/**
 * Start BrowserSync
 * --nosync will avoid browserSync
 */
function startBrowserSync(dev) {
  if (browserSync.active) {
    return;
  }

  log('Starting BrowserSync on port ' + port);

  if(dev){
    gulp.watch([config.allSass], ['styles'])
        .on('change', changeEvent);

    gulp.watch([config.jsAppAll], ['js-app'])
        .on('change', changeEvent);

    gulp.watch([config.html])
        .on('change', changeEvent);
  } else {

    gulp.watch([config.allSass], ['optimize-css'])
        .on('change', changeEvent);

    gulp.watch([config.jsAppAll], ['optimize-js'])
        .on('change', changeEvent);

    gulp.watch([config.html])
        .on('change', changeEvent);
  }


  gulp.watch([config.jsVendorAll], ['js-vendor'])
      .on('change', changeEvent);


  var options = {
    open: 'external',
    host: config.url,
    proxy: config.url,//'localhost:' + port,
    //port: 8080,
    files: config.client + '**/*.*',/*isDev ? [
      //config.temp + '**!/!*.*',
      config.client + '**!/!*.*'
      //'!' + config.less,
      //config.temp + '**!/!*.css'
    ] : [],*/
    ghostMode: { // these are the defaults t,f,t,t
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'gulp-patterns',
    notify: true,
    reloadDelay: 1000 //1000
  } ;

  browserSync(options);
}

/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */
function changeEvent(event) {
  var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
  log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}