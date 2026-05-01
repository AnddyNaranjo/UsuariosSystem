const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Validación de tipo de archivo
const fileFilter = (req, file, cb) => {
  const tiposPermitidos = /jpeg|jpg|png/;
  const mimeType = tiposPermitidos.test(file.mimetype);

  if (mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes JPG y PNG'));
  }
};

// Configuración final
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter
});

module.exports = upload;
