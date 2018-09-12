var express = require('express');
var request = require('sync-request');
var router = express.Router();
var constants = require('../configs/constants');
var helpers = require('../configs/helpers');
var loginHelper = require('../helpers/login_helper');
var loginContent = require('../contents/login_content');
var middlewares = require('../configs/middlewares');

router.get('/', middlewares.sessionFalse(), function(req, res, next) {
  var locals = {
    constants: constants.data,
    title: 'Bienvenido',
    helpers: helpers,
    csss: loginHelper.indexCss(),
    jss: loginHelper.indexJs(),
    message: '',
    contents: loginContent.content,
    lang: middlewares.lang(req),
  };
  res.render('login/index', locals);
});

router.post('/access', function(req, res, next) {
  var req_csrf_val = req.body[constants.data.csrf.key];
  var user = req.body.user;
  var password = req.body.password;
  var body = '';
  var lang = middlewares.lang(req);
  var message = '';
  //validation CSRF
  if(req_csrf_val == constants.data.csrf.secret){
    //validation user/system
    var _continue = true;
    try{
      var r1 = request('POST', constants.data.accesos.url + 'sistema/usuario/validar', {
        headers: {
          [constants.data.accesos.csrf_key]: constants.data.accesos.csrf_value,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'usuario=' + user + '&sistema_id=' + constants.data.sistema_id,
      });
      if (r1.statusCode == 200){
        if(r1.body.toString('utf8') != '1'){
          _continue = false;
          message = loginContent.content.index.message_user_system[lang];
        }
      }else{
        _continue = false;
        message = loginContent.content.index.message_user_system_error[lang];
      }
    }catch(err){
      console.log("**** INICIO - ERROR EN LOGIN (Validación usuario/sistema)***");
      console.log(err.toString('utf-8'));
      console.log("**** FIN ***");
      status = 500;
      _continue = false;
      message = loginContent.content.index.message_user_system_catch_error[lang];
    }
    //validation user/password
    if(_continue == true){
      try{
        var r1 = request('POST', constants.data.accesos.url + 'usuario/externo/validar', {
          headers: {
            [constants.data.accesos.csrf_key]: constants.data.accesos.csrf_value,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'usuario=' + user + '&contrasenia=' + password,
        });
        if (r1.statusCode == 200){
          if(r1.body.toString('utf8') != '1'){
            _continue = false;
            message = loginContent.content.index.message_user_password[lang];
          }else{
            req.session.time = new Date().toLocaleTimeString();
            req.session.user = user;
            req.session.state = 'activate';
            res.redirect('/accesos/');
          }
        }else{
          _continue = false;
          message = loginContent.content.index.message_user_password_error[lang];
        }
      }catch(err){
        console.log("**** INICIO - ERROR EN LOGIN (Validación usuario/contrasenia)***");
        console.log(err.toString('utf-8'));
        console.log("**** FIN ***");
        status = 500;
        _continue = false;
        message = loginContent.content.index.message_user_password_catch_error[lang];
      }
    }
  }else{
    console.log("**** INICIO - ERROR EN LOGIN (CSRF token)***");
    console.log('Error en Token CSRF POST request');
    console.log(body);
    console.log("**** FIN ***");
    message = loginContent.content.index.message_csrf[lang];
  }
  var locals = {
    constants: constants.data,
    title: 'Bienvenido',
    helpers: helpers,
    csss: loginHelper.indexCss(),
    jss: loginHelper.indexJs(),
    constants: constants.data,
    title: 'Bienvenido',
    helpers: helpers,
    csss: loginHelper.indexCss(),
    jss: loginHelper.indexJs(),
    message: message,
    contents: loginContent.content,
    lang: lang,
  };
  res.render('login/index', locals);
});

router.get('/view', middlewares.sessionTrue(), function(req, res, next) {
  body = 'Usuario: ' + req.session.user + '<br>' +
    'Estado: ' + req.session.state + '<br>' +
    'Momento: ' + req.session.time;
  res.status(200).send(body);
});

router.get('/close', middlewares.sessionTrue(), function(req, res, next) {
  req.session = null;
  res.redirect('/login');
});

module.exports = router;
