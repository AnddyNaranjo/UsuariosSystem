const express = require('express');
const router = express.Router();
const controller = require('../controllers/productosController');
const upload = require('../config/upload');

// CREATE con imagen
router.post('/', upload.single('imagen'), controller.createProducto);

// READ
router.get('/', controller.getProductos);

// UPDATE
router.put('/:id', controller.updateProducto);

// DELETE
router.delete('/:id', controller.deleteProducto);

module.exports = router;