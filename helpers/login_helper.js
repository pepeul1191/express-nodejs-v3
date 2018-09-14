var constants = require('../configs/constants');

var indexCss = function() {
  var rpta = [];
  if(constants.data.ambiente_static == 'desarrollo'){
    rpta = [
      'bower_components/material-design-lite/material.min',
      'assets/css/constants',
      'assets/css/styles',
      'assets/css/login',
    ];
  }
  if(constants.data.ambiente_static == 'produccion'){
    rpta = [
      'dist/login.min'
    ];
  }
  return rpta;
}

var indexJs = function() {
  if(constants.data.ambiente_static == 'desarrollo'){
    rpta = [
      'bower_components/jquery/dist/jquery.min',
      'bower_components/underscore/underscore-min',
      'bower_components/backbone/backbone-min',
      'bower_components/material-design-lite/material.min',
      'views/sign_in_view',
      'views/forgot_password_view',
      'routes/login_routes',
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
