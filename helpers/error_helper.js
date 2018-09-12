var constants = require('../configs/constants');

var accessCss = function() {
  var rpta = [];
  if(constants.data.ambiente_static == 'desarrollo'){
    rpta = [
      'bower_components/material-design-lite/material.min',
      'bower_components/font-awesome/web-fonts-with-css/css/fontawesome-all.min',
      'assets/css/constants',
      'assets/css/error',
    ];
  }
  if(constants.data.ambiente_static == 'produccion'){
    rpta = [
      'dist/test.min'
    ];
  }
  return rpta;
}

var accessJs = function() {
  if(constants.data.ambiente_static == 'desarrollo'){
    rpta = [
    ];
  }
  if(constants.data.ambiente_static == 'produccion'){
    rpta = [
    ];
  }
  return rpta;
}

exports.accessCss = accessCss;
exports.accessJs = accessJs;
