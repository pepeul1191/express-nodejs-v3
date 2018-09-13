var express = require('express');
var router = express.Router();
var constants = require('../configs/constants');
var helpers = require('../configs/helpers');
var indexHelper = require('../helpers/index_helper');
//var indexContent = require('../contents/index_content');
var middlewares = require('../configs/middlewares');

/* GET home page. */
router.get('/', function(req, res, next) {
  var locals = {
    title: 'Express',
    constants: constants.data,
    title: 'Bienvenido',
    helpers: helpers,
    csss: indexHelper.indexCss(),
    jss: indexHelper.indexJs(),
    message: '',
    //contents: loginContent.content,
    lang: middlewares.lang(req),
  };
  res.render('index/index', locals);
});

module.exports = router;
