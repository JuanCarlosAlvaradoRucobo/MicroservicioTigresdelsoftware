import express from 'express';
import { generarCurso } from '../services/generarCurso.mjs';
import { generarReportedeEvaluaciones } from '../services/generarReportedeEvaluaciones.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const curso = generarCurso('id-prueba');
    const reporte = await generarReportedeEvaluaciones(curso);
    res.json({ reporte });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error generando el reporte' });
  }
});

export default router;
