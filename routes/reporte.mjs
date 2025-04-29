import  { Router } from 'express';

const router = Router();
import {generarReportedeEvaluaciones} from '../services/generarReportedeEvaluaciones.mjs';
import { generarCurso } from '../services/generarCurso.mjs';
router.post('/', async (req, res) => {
    try {
        const { curso } = req.body;

        if (!curso) {
            return res.status(400).json({ error: 'Faltan datos o el nombre del curso' });
        }

        const reporte = await generarReportedeEvaluaciones(curso);
        console.log("No ha habido error")
        res.json({ reporte });

    } catch (error) {
        console.error('Error generando reporte:', error);
        res.status(500).json({ error: 'Error al generar el reporte' });
    }
});

export default router;


 async function test() {
  const datos = [
    { nombre: 'Elena', calificacion: 9.5 },
    { nombre: 'Marco', calificacion: 6.8 },
    { nombre: 'Sara', calificacion: 7.9 }
  ];
  let curso = generarCurso("123");
  const reporte = await generarReportedeEvaluaciones(curso);
  console.log('📋 Reporte generado:\n');
  console.log(reporte); // <-- Aquí se muestra en la consola
}


test();
