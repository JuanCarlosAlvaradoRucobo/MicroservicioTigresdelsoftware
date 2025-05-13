import  { Router } from 'express';

const router = Router();
import {generarReportedeEvaluaciones} from '../services/generarReportedeEvaluaciones.mjs';
import {generarTexto} from '../services/modeloGenerador.mjs';



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

router.post('/generar', async (req, res) => {
    const { prompt } = req.body;
  
    if (!prompt) return res.status(400).json({ error: "Falta el prompt" });
  
    try {
      const texto = await generarTexto(prompt);
      res.json({ resultado: texto });
    } catch (err) {
      console.error("Error al generar texto:", err);
      res.status(500).json({ error: "Error al generar texto" });
    }
  });
  

export default router;


 /* async function test() {
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


test();*/
