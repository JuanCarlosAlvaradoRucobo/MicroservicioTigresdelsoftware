const amqp = require('amqplib');

async function conectarRabbitMQ() {
  try {
    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();
    console.log('[✔] Conectado a RabbitMQ');
    return channel;
  } catch (err) {
    console.error('[✘] Error conectando a RabbitMQ', err);
    process.exit(1);
  }
}

module.exports = conectarRabbitMQ;
