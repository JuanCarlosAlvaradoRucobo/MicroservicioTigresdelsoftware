const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  idioma: { type: String, default: 'es' },
  roles: [{ type: String, enum: ['alumno', 'maestro', 'admin'] }],
  password: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
