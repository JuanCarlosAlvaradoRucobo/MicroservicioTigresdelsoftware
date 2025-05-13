import { Router } from 'express';

import reporteRouter from './reporte.mjs';
import cursoRouter from './curso.mjs'; // <-- Aquí se agrega

const router = Router();

router.use('/reporte', reporteRouter);
router.use('/cursos', cursoRouter); // <-- Aquí se monta
router.use('/reporte/:id', reporteRouter)
/*router.get('/reporte', async (req, res) => {
    try {
      const curso = generarCurso("7777"); // Puedes cambiar el ID si gustas
      const reporte = await generarReportedeEvaluaciones(curso);
      res.status(200).json({ reporte });  // <-- Envía el reporte en formato JSON
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al generar el reporte' });
    }
  });*/

export default router;

