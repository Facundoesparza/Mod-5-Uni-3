var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
  if (!req.session.id_usuario) {
    res.redirect('/admin/login');
  } else {
    res.render('admin/panel', {
      layout: 'admin/layout',
      nombre: req.session.nombre
    });
  }
});

module.exports = router;
