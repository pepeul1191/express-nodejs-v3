var express = require('express');
var router = express.Router();
var constants = require('../configs/constants');
var helpers = require('../configs/helpers');
var loginHelper = require('../helpers/login_helper');
var loginContent = require('../contents/login_content');
var middlewares = require('../configs/middlewares');
var request = require('sync-request');

router.get('/', middlewares.sessionFalse(), function(req, res, next) {
  var locals = {
    constants: constants.data,
    title: 'Bienvenido',
    helpers: helpers,
    csss: loginHelper.indexCss(),
    jss: loginHelper.indexJs(),
    mensaje: '',
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
  if(req_csrf_val != constants.data.csrf.secret){
    console.log("**** INICIO - ERROR EN LOGIN (CSRF token)***");
    console.log('Error en Token CSRF POST request');
    console.log(body);
    console.log("**** FIN ***");
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
      mensaje: loginContent.content.index.message_csrf[lang],
      contents: loginContent.content,
      lang: lang,
    };
    res.render('login/index', locals);
  }else{

  }
});

module.exports = router;
