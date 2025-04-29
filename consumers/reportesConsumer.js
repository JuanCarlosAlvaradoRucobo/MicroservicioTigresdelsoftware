const amqp = require('amqplib');
const { decodificarDesdeToken } = require('../utils/decodificador');

async function consumirMensajes() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'cola-reportes';

    await channel.assertQueue(queue, { durable: true });
    console.log(`📥 Esperando mensajes en la cola: ${queue}`);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        try {
          const contenido = JSON.parse(msg.content.toString());
          const token = contenido.token;

          const usuario = decodificarDesdeToken(token);
          if (!usuario) {
            console.warn('❌ Usuario inválido o inactivo. Mensaje ignorado.');
            return channel.ack(msg);
          }

          if (usuario.tipo !== 'administrador') {
            console.warn(`⚠️ Usuario tipo "${usuario.tipo}" no tiene permisos para generar reportes.`);
            return channel.ack(msg);
          }

          // 📌 Aquí colocas tu lógica de generación de reporte
          const cursoId = contenido.cursoId;
          console.log(`📝 Generando reporte para el curso: ${cursoId} solicitado por ${usuario.nombre}`);

          // Lógica real de generar reporte aquí...

        } catch (err) {
          console.error('🚫 Error procesando el mensaje:', err.message);
        }

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('🔥 Error al conectar con RabbitMQ:', error.message);
  }
}

module.exports = {
  consumirMensajes
};
