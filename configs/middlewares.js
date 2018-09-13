var constants = require('./constants');
var helpers = require('./helpers');
var errorHelper = require('../helpers/error_helper');
var errorContent = require('../contents/error_content');

function preResponse(){
  return function (req, res, next) {
    res.set('Server', 'Ubuntu');
    return next();
  }
}

function error404(){
  return function (req, res, next) {
    if ('GET' == req.method){
      var recurso = req.path.split('.');
      var extensiones = ['css', 'js', 'png', 'jpg', ];
      if(extensiones.indexOf(recurso[recurso.length - 1]) == -1){
        res.redirect('/error/access/404');
      }else {
        return next();
      }
    }else{
      var rpta = errorContent.content['access'][404]['post_error'][lang(req)];
      res.status(404).send(rpta);
    }
  }
}

function sessionTrue(){
  return function (req, res, next) {
    if (constants.data.ambiente_session == 'activo'){
      var continuar = false;
      if(req.session.estado == 'inactivo'){
        req.session.mensaje_error = 'Su tiempo de sesión ha terminado';
      }
      if(req.session.estado === undefined){
        req.session.mensaje_error = 'Nececita estar logeuado';
      }
      if(req.session.estado == 'activo'){
        continuar = true;
      }
      if (continuar == false){
        return res.redirect('/error/access/8080');
      }
    }
    return next();
  }
}

function sessionFalse(){
  return function (req, res, next) {
    if (constants.data.ambiente_session == 'activo'){
      var continuar = false;
      if(req.session.estado == 'activo'){
        continuar = true;
      }
      if (continuar == true){
        return res.redirect('/accesos/');
      }
    }
    return next();
  }
}

function checkCSRF(){
  return function (req, res, next) {
    if (constants.data.ambiente_csrf == 'activo'){
      var continuar = true;
      var mensaje = '';
      request_header = req.get(constants.data.csrf.key);
      if(request_header === undefined){
        continuar = false;
        mensaje = 'CSRF Token error';
      } else if(request_header != constants.data.csrf.secret){
        continuar = false;
        mensaje = 'CSRF Token key error';
      }
      if (continuar == false){
        var rpta = JSON.stringify({
            tipo_mensaje: 'error',
            mensaje: [
              'No se puede acceder al recurso',
              mensaje
          ]});
        return res.status(500).send(rpta);
      }
    }
    return next();
  }
}

function lang(req){
  var idioma = 'en';
  if(req.session !== undefined){
    if(req.session.idioma === undefined){
      req.session.idioma = 'en';
    }
    idioma = req.session.idioma;
  }
  return idioma;
}

function tiempo(numero){
  return function (req, res, next) {
    if (numero % 2 == 0){
      res.redirect('http://www.google.com.pe');
    }
    console.log(Date.now());
    return next();
  }
}

exports.preResponse= preResponse;
exports.error404 = error404;
exports.sessionTrue = sessionTrue;
exports.sessionFalse = sessionFalse;
exports.checkCSRF = checkCSRF;
exports.tiempo= tiempo;
exports.lang = lang;
