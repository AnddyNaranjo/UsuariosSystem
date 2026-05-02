const express = require('express');
const router = express.Router();
const controller = require('../controllers/productosController');
const upload = require('../config/upload');

const { validarProducto, validarId } = require('../validations/productoValidator');
const validarErrores = require('../validations/validarErrores');

// CREATE con imagen
router.post(
  '/',
  upload.single('imagen'),
  validarProducto,
  validarErrores,
  controller.createProducto
);

// READ
router.get('/', controller.getProductos);

// UPDATE 
router.put(
  '/:id',
  validarId,
  validarProducto,
  validarErrores,
  controller.updateProducto
);

// DELETE 
router.delete(
  '/:id',
  validarId,
  validarErrores,
  controller.deleteProducto
);

module.exports = router;