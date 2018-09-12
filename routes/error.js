var express = require('express');
var router = express.Router();
var constants = require('../configs/constants');
var helpers = require('../configs/helpers');
var errorHelper = require('../helpers/error_helper');
var errorContent = require('../contents/error_content');
var middlewares = require('../configs/middlewares');

router.get('/access/8080', function(req, res, next) {
  var locals = {
    constants: constants.data,
    title: 'Error',
    helpers: helpers,
    csss: errorHelper.accessCss(),
    jss: errorHelper.accessJs(),
    numero: 8080,
    contents: errorContent.content,
    lang: middlewares.lang(req),
  };
  res.status(500).render('error/access', locals);
  res.end('Cannot ' + req.method + ' ' + req.url);
});

router.get('/access/:numero_error', function(req, res, next) {
  var locals = {
    constants: constants.data,
    title: 'Error',
    helpers: helpers,
    csss: errorHelper.accessCss(),
    jss: errorHelper.accessJs(),
    numero: 404,
    contents: errorContent.content,
    lang: middlewares.lang(req),
  };
  res.status(404).render('error/access', locals);
});

module.exports = router;
