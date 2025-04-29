const { verificarToken } = require('../Auth');

function decodificarDesdeToken(token) {
  try {
    const usuario = verificarToken(token);
    if (!usuario.activo) throw new Error('Usuario no está activo');
    return usuario;
  } catch (error) {
    console.error('Token inválido:', error.message);
    return null;
  }
}

module.exports = {
  decodificarDesdeToken
};
