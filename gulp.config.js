var configLocal = require('./gulp.local')();
module.exports = function() {
  var client = './WORDPRESS/wp-content/themes/konnect/';
  var url = configLocal.url;
  var jsVendorFile = 'vendor.js';
  var jsAppFile = 'app.js';

  var config = {
    client: client,
    clientJs: client + 'js/',

    allSass: client + 'scss/**/*.scss',
    sass: client + 'scss/style.scss',
    sassDir: client + 'scss',

    css: client + 'style.css',

    allJs: client + 'js/**/*.js',

    jsApp: client + 'js/' + jsAppFile,
    jsAppFile: jsAppFile,
    jsAppAll: client + 'js/app/**/*.js',
    jsAppOrder: [
      'header.js',
      '**/!(footer)*.js',
      'footer.js'
    ],

    jsVendor: client + 'js/' + jsVendorFile,
    jsVendorFile: jsVendorFile,
    jsVendorAll: client + 'js/vendor/**/*.js',
    jsVendorOrder: [
      'modernizr-custom.js',
      'jquery-1.12.0.min.js',
      'velocity.min.js',
      'masonry.pkgd.min.js',
      'imagesloaded.pkgd.min.js',
      '**/*.js'
    ],

    html: client + '**/*.html',

    url: url
  };

  return config;
};