// controllers/cursoController.js
import { cursos } from '../models/cursosDB.mjs';
import { generarReportedeEvaluaciones } from '../services/generarReportedeEvaluaciones.mjs';
import { generarCurso } from '../services/generarCurso.mjs';
//import { generarTexto } from '../services/modeloGenerador.mjs';
//import { getDocumentByID } from '../services/getDocumentByID.js';
//import { getDocumentByIDAlumnoCurso } from '../services/getDocumentByIDAlumnoCurso.js';
//import { getDocumentsByAlumnoID } from '../services/getDocumentsByAlumnoID.js';
//import { getDocumentsByCreadorID } from '../services/getDocumentsByCreadorID.js';
//import { getDocumentsByCursoID } from '../services/getDocumentsByCursoID.js';
//import { getDocumentsByCursoIDAlumno } from '../services/getDocumentsByCursoIDAlumno.js';

const { ObjectId } = require('mongodb');
const Ccid = require('../models/creadorID_CursoID');
const Acid = require('../models/alumnoID_CursoID');

// Buscar por _id
const buscarRelacionPorId = async (req, res) => {
  const id = req.params.id;

  try {
    const relacion = await Acid.findOne({ _id: new ObjectId(id) });

    if (!relacion) {
      return res.status(404).json({ mensaje: 'Relación no encontrada' });
    }

    res.status(200).json(relacion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar la relación', error });
  }
};

module.exports = {
  buscarRelacionPorId
};

async function obtenerCreadorCursoPorID(req, res) {
  const id = req.params.id;

  try {
    const resultado = await Ccid.findOne({ _id: new ObjectId(id) });
    if (!resultado) {
      return res.status(404).json({ mensaje: 'No se encontró el documento' });
    }
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

module.exports = { obtenerCreadorCursoPorID };

export async function generarReporteEvaluaciones(req, res) {
  try {
    const reporte = await generarReportedeEvaluaciones();
    res.json({ reporte });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al generar el reporte' });
  }
}

export async function generarReporteEvaluacionesPorCurso(req, res) {
  const cursoId = req.params.id;
  const curso = cursos.find(c => c.id === cursoId);

  if (!curso) {
    return res.status(404).json({ mensaje: 'Curso no encontrado' });
  }

  try {
    const reporte = await generarReportedeEvaluaciones(curso);
    res.json({ reporte });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al generar el reporte' });
  }
}

export async function generarCurso(req, res) {
  const { id } = req.body;
  const curso = generarCurso(id);
  res.json({ curso });
}