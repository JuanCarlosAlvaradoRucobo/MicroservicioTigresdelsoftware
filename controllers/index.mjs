import { cursos } from '../models/cursosDB.mjs';
import { generarReportedeEvaluaciones } from '../services/generarReportedeEvaluaciones.mjs';

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
