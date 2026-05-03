const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const connectDB = require('./routes/db');
const { soloAdmin, autenticado } = require('./validations/authValidator');
const productosRoutes = require('./routes/productos');

const initAdmin = require('./controllers/usuarioAutomatico');


// HTTP + SOCKET.IO
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);

// =========================
// PARSERS
// =========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// SESIÓN (CLAVE)
// =========================
const sessionMiddleware = session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
});

app.use(sessionMiddleware);

// =========================
// SOCKET.IO + SESIÓN
// =========================

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, () => {

    const session = socket.request.session;

    // ✅ validación defensiva
    if (!session || !session.usuario) {
      return next(new Error('No autorizado'));
    }

    socket.usuario = session.usuario; // guardar usuario
    next();
  });
});


// =========================
// SOCKET.IO
// =========================
io.on('connection', (socket) => {
  console.log('🟢 Usuario conectado:', socket.usuario.usuario);

  socket.on('mensaje', (data) => {
    io.emit('mensaje', {
      usuario: socket.usuario.usuario,
      texto: data.texto
    });
  });

  socket.on('disconnect', () => {
    console.log('🔴 Usuario desconectado:', socket.usuario.usuario);
  });
});

// =========================
// ESTÁTICOS
// =========================
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// =========================
// RUTAS
// =========================
const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios');

app.use(authRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/productos', productosRoutes);

// =========================
// VISTAS
// =========================
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/menu', autenticado, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

app.get('/chat', autenticado, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

app.get('/registro', soloAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registrar.html'));
});

// =========================
// INICIAR SERVIDOR Y CONECTAR DB
// =========================
connectDB()
  .then(() => {
    initAdmin();
    server.listen(3000, '0.0.0.0', () => {
      console.log('Servidor corriendo');
    });
  })
  .catch(err => console.error(err));