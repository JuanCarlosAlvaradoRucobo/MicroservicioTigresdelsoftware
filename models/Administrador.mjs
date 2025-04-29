// models/Administrador.mjs
import mongoose from 'mongoose';

const administradorSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String
});

const Administrador = mongoose.model('Administrador', administradorSchema);

export default Administrador;
