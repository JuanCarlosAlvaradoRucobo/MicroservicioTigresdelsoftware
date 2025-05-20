const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alumnoEnCursoSchema = new Schema({
  alumnoId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  calificacion: { type: Number, default: 0 }
});

const cursoSchema = new Schema({
  nombre: { type: String, required: true },
  alumnos: [alumnoEnCursoSchema],
  calificacionGeneral: { type: Number, default: 0 },
  actividadesRealizadas: { type: Number, default: 0 },
  statusGeneral: { type: String, enum: ['excelente', 'bueno', 'regular', 'malo'], default: 'regular' }
});

module.exports = mongoose.model('Curso', cursoSchema);
