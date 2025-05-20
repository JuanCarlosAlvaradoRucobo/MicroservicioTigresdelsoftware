const mongoose = require('mongoose');
const schema = mongoose.Schema;
//Alumno Curso ID = ACID
//AlumnoID y CursoID son valores string de ObjectID
const acidSchema = new schema({
    alumnoId: {
        type: String,
        required: true
    },
    cursoId: {
        type: String,
        required: true
    }
});
//Modelo wrapper para mandar archivos
const Acid = mongoose.model('AlumnoID-CursoID', acidSchema)
module.exports = Acid;