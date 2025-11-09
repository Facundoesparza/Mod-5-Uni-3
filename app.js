// Importacion de modulos base
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
require('dotenv').config(); // para leer variables de entorno

// Conexion a la base de datos
var pool = require('./models/bd');

// Importación de rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var panelRouter = require('./routes/admin/panel');
var logoutRouter = require('./routes/admin/logout');


// Configuracion inicial de la app
var app = express();

// Motor de plantillas (Handlebars)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middlewares base
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuracion de sesion

app.use(session({
  secret: '1234',          // clave para la sesion
  resave: false,           // no guardar si no hubo cambios
  saveUninitialized: true  // guardar aunque este vacia
}));


// Uso de rutas

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/panel', panelRouter);
app.use('/admin/logout', logoutRouter);

// Manejo de errores

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

// renderiza la página de error
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
