const Producto = require('../models/Producto');

// CREATE


exports.createProducto = async (req, res) => {
  try {
    const producto = new Producto({
      nombre: req.body.nombre,
      precio: req.body.precio,
      stock: req.body.stock,
      descripcion: req.body.descripcion,
      imagen: req.file ? `/uploads/${req.file.filename}` : null
    });

    await producto.save();

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};



// READ (listar)
exports.getProductos = async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
};

// UPDATE
exports.updateProducto = async (req, res) => {

  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!productoActualizado) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado"
      });
    }

    res.json({
      success: true,
      producto: productoActualizado
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE
exports.deleteProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
};