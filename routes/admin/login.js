var express = require('express');
var router = express.Router();
var usuariosModel = require('../../models/usuariosModel');

router.get('/', function (req, res) {
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

router.post('/', async function (req, res, next) {
  try {
    var usuario = req.body.usuario;
    var password = req.body.password;

    var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);

    if (data != undefined) {
      req.session.id_usuario = data.id;
      req.session.nombre = data.usuario;

      res.redirect('/admin/panel'); 
    } else {
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      });
    }
  } catch (error) {
    console.log(error);
    res.render('admin/login', {
      layout: 'admin/layout',
      error: true
    });
  }
});

module.exports = router;
