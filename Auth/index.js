const jwt = require('jsonwebtoken');
const config = require('../config/config');

const secret = config.jwt.secret;

function asignarToken(data) {
  return jwt.sign(data, secret);
}

function verificarToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error('Token inválido o expirado');
  }
}

function obtenerToken(autorizacion) {
  if (!autorizacion) {
    throw new Error('No viene token');
  }

  if (!autorizacion.startsWith('Bearer ')) {
    throw new Error('Formato no válido');
  }

  return autorizacion.replace('Bearer ', '');
}

// 👉 Esta función es la que puedes usar para decodificar desde RabbitMQ
function decodificarTokenDesdeMensaje(autorizacion) {
  const token = obtenerToken(autorizacion);
  const usuario = verificarToken(token);

  // Aquí puedes hacer validaciones
  if (!usuario || !usuario.id || !usuario.tipo) {
    throw new Error('Token no contiene datos válidos');
  }

  if (!usuario.activo) {
    throw new Error('Usuario no está activo');
  }

  return usuario; // Devuelve el JSON del usuario
}

// 👇 Para validar si puede acceder a funcionalidades de administrador
function esAdministrador(usuario) {
  return usuario.tipo === 'administrador';
}

module.exports = {
    asignarToken,
    verificarToken,
    obtenerToken,
    decodificarTokenDesdeMensaje,
    esAdministrador
  };