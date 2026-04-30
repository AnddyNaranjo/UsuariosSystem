const express = require('express');
const router = express.Router();

const Usuario = require('../models/Usuario');

const usuariosController = require('../controllers/usuariosController');


// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
        console.log(usuarios);
    res.json(usuarios);
  } catch (error) {
    res.status(500).send('Error al obtener usuarios');
  }
});

//Crear nuevo usuario
router.post('/', usuariosController.createUsuario);


module.exports = router;