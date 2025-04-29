const amqp = require('amqplib');
const { verificarToken } = require('../Auth'); // o usar decodificador si lo separaste

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

async function consumirMensajes() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'cola-reportes';
    await channel.assertQueue(queue, { durable: true });

    console.log(`✅ Esperando mensajes en ${queue}...`);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const contenido = JSON.parse(msg.content.toString());
        const token = contenido.token;

        const usuario = decodificarDesdeToken(token);
        if (!usuario) {
          console.log('❌ Usuario inválido o inactivo. Ignorando mensaje.');
          return channel.ack(msg);
        }

        if (usuario.tipo === 'administrador') {
          console.log(`✅ Usuario administrador autorizado. Generando reporte del curso: ${contenido.cursoId}`);
          // Aquí va tu lógica de generar reporte...
        } else {
          console.log(`⚠️ Usuario tipo ${usuario.tipo} no tiene permisos para generar reportes.`);
        }

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error al consumir mensajes:', error);
  }
}

module.exports = {
  consumirMensajes
};
