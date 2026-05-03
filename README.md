# Sistema de Gestión de Usuarios y Productos

## 📌 Datos del Estudiante

- **Nombre del estudiante:** Anddy Jhon Naranjo Valencia  
- **Carrera:** Ingeniería en Sistemas / Software  
- **Asignatura:** Aplicaciones Web  
- **Institución:** Universidad Politécnica Salesiana  


## 📋 Descripción del Proyecto

Este proyecto consiste en una aplicación web desarrollada con **Node.js, Express y MongoDB**, que implementa un **sistema de autenticación de usuarios**, control de roles (admin / usuario), gestión de productos y un **chat en tiempo real** utilizando **Socket.IO**.

El sistema incluye seguridad básica mediante **bcrypt para el cifrado de contraseñas** y **sesiones con express-session**.

---

## ✅ Funcionalidades Implementadas

### 🔐 Autenticación y Seguridad
- Login de usuarios
- Logout de usuarios
- Manejo de sesiones con `express-session`
- Cifrado de contraseñas con `bcrypt`
- Creación automática del primer usuario como **administrador** al iniciar el servidor
- Control de acceso por roles (admin / usuario)

### 👤 Gestión de Usuarios
- Creación de usuarios (solo administrador)
- Asignación automática de roles

### 📦 Gestión de Productos
- Listado de productos
- Creación de productos
- Edición de productos
- Eliminación de productos
- Validaciones de datos en frontend y backend

### 💬 Chat en Tiempo Real
- Chat en tiempo real con Socket.IO
- Envío y recepción de mensajes
- Notificaciones de mensajes nuevos
- Contador de mensajes no leídos
- Chat integrado en el menú (Offcanvas)

### 🌐 Otros
- Interfaz con Bootstrap
- Soporte para conexión desde dispositivos móviles en red local
- Manejo de errores y validaciones

---

## ⚙️ Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- bcrypt
- express-session
- Bootstrap
- JavaScript (Frontend y Backend)
- HTML5 y CSS3

---

## URL
https://github.com/AnddyNaranjo/UsuariosSystem.git

---

## ▶️ Instrucciones Básicas de Uso

### 1️⃣ Clonar el repositorio
```bash
git clone <https://github.com/AnddyNaranjo/UsuariosSystem.git>

### 2️⃣ Instalar dependencias
npm install
```
### 3️⃣ Configurar la base de datos

Tener MongoDB en ejecución
Configurar la conexión en el archivo db.js

### Estructura de mi base de datos

Servidor MongoDB: admin
│
└── Base de Datos: inventario
    │
    └── Colecciones: productos
        │            usuarios
        │
        └── Documentos (JSON)

### 5️⃣ Acceder al sistema

Abrir el navegador en:

* http://localhost:3000

Se crea un Usuario administrador automático (primera vez):

* Usuario: admin
* Contraseña: admin123

📝 Observaciones

- El administrador se crea automáticamente solo si la base de datos está vacía.
- Después de crear el primer admin, el registro queda limitado solo a usuarios con rol administrador.
- Las contraseñas nunca se almacenan en texto plano.

