var constants = require('../configs/constants');

var indexCss = function() {
  var rpta = [];
  if(constants.data.ambiente_static == 'desarrollo'){
    rpta = [
      'bower_components/material-design-lite/material.min',
      'bower_components/font-awesome/web-fonts-with-css/css/fontawesome-all.min',
      'assets/css/constants',
      'assets/css/styles',
    ];
  }
  if(constants.data.ambiente_static == 'produccion'){
    rpta = [
      'dist/index.min'
    ];
  }
  return rpta;
}

var indexJs = function() {
  if(constants.data.ambiente_static == 'desarrollo'){
    rpta = [
      'bower_components/material-design-lite/material.min',
    ];
  }
  if(constants.data.ambiente_static == 'produccion'){
    rpta = [
    ];
  }
  return rpta;
}

exports.indexCss = indexCss;
exports.indexJs = indexJs;
