var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var pool = require('./models/bd');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// SELECT

// pool.query('select nombre, edad from empleados').then(function(resultados){
//   console.log(resultados)
// })
// insert
// var obj = {
//    nombre: 'lautaro',
//    apellido: 'lopez',
//    trabajo: 'docente',
//    edad: 20,
//    salario: 3000,
//    mail: 'lllll@gmail.com'
// }

// pool.query('insert into empleados set ?', [obj]).then(function(resultados){
//  console.log(resultados) })

//  var obj2 = {
//    id: 22,
//    nombre: 'lautasassasaro',
//    apellido: 'lopsaez',
//    trabajo: 'docenhte',
//    edad: 21,
//    salario: 30000,
//    mail: 'llllll@gmail.com'
// }
// pool.query('insert into empleados set ?', [obj2]).then(function(resultadoss){
//  console.log(resultadoss) })
// modificar
  // var id = 22
  // var obj = {
  //   nombre: 'Benjamin',
  //   apellido: 'Alvarez',
  // }
  // pool.query('update empleados set ? where id=?', [obj, id]).then(function(resultado){
  //   console.log(resultado)
  // })
var id = 22;
pool.query('delete from empleados where id=?', [id]).then(function(resultado){
  console.log(resultado);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
