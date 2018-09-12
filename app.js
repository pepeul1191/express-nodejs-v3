var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var middleware = require('./configs/middlewares');
// routes
var indexRouter = require('./routes/index');
var errorRouter = require('./routes/error');
var loginRouter = require('./routes/login');
// aplicación express
var app = express();
// app setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(middleware.preResponse());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//routes handler
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/error', errorRouter);
// catch 404 and forward to error handler
app.use(middleware.error404());
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
