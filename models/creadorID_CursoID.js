const mongoose = require('mongoose');
const schema = mongoose.Schema;
//Alumno Curso ID = ACID
//AlumnoID y CursoID son valores string de ObjectID
const ccidSchema = new schema({
    creadorId: {
        type: String,
        required: true
    },
    cursoId: {
        type: String,
        required: true
    }
});
//Modelo wrapper para mandar archivos
const Ccid = mongoose.model('CreadorID-CursoID', ccidSchema)
module.exports = Ccid;