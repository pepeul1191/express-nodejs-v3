var express = require('express');
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
    mensaje: '',
    contents: loginContent.content,
    lang: middlewares.lang(req),
  };
  res.render('login/index', locals);
});

module.exports = router;
