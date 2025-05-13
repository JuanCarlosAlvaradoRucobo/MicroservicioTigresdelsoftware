//const openai = require('../config/openaiConfig');
//import { Curso } from '../services/generarCurso.mjs';
//import {openai} from '../config/openaiConfig.mjs';
/*
import axios from 'axios';

const HUGGINGFACE_TOKEN = process.env.HF_TOKEN;

export async function generarReportedeEvaluaciones(curso) {
    const datos = JSON.stringify(curso);  // Convierte los datos recibidos a un string JSON

    try {
        // Llamada a la API de DeepSeek en HuggingFace
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/deepseek-ai/deepseek-llm-7b-chat',
            {
                inputs: `Genera un reporte basado en estos datos: ${datos}` // Instrucción al modelo
            },
            {
                headers: {
                    Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,         // Autenticación con HuggingFace
                    'Content-Type': 'application/json'
                }
            }
        );

        // Intenta obtener el texto generado desde la respuesta
        const texto = response.data.generated_text || response.data[0]?.generated_text || 'Respuesta no encontrada';

        // Devuelve el texto como respuesta JSON
        res.json({ exito: true, reporte: texto });

    } catch (error) {
        // Captura errores y devuelve mensaje de error al cliente
        console.error('Error en HuggingFace:', error.response?.data || error.message);
        res.status(500).json({ exito: false, mensaje: 'Error generando el reporte' });
    }
 
// Devuelve el reporte generado como una cadena de texto
return reporte;
}
*/


/*
se debe de installar a lo que dice chatgpt:
npm install axios
*/
/* conexion con HuggingFace  /DeepSeek 
const express = require('express');          // Framework web para manejar rutas HTTP
const axios = require('axios');              // Cliente HTTP para hacer peticiones a la API de HuggingFace
require('dotenv').config();                  // Carga variables de entorno desde el archivo .env

const app = express();                       // Crea una aplicación de Express
app.use(express.json());                     // Permite recibir datos en formato JSON

// Carga el token de HuggingFace desde el archivo .env
const HUGGINGFACE_TOKEN = process.env.HF_TOKEN;

// Ruta POST donde recibes los datos y generas el reporte
app.post('/api/reporte', async (req, res) => {
    const datos = JSON.stringify(req.body);  // Convierte los datos recibidos a un string JSON

    try {
        // Llamada a la API de DeepSeek en HuggingFace
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/deepseek-ai/deepseek-llm-7b-chat',
            {
                inputs: `Genera un reporte basado en estos datos: ${datos}` // Instrucción al modelo
            },
            {
                headers: {
                    Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,         // Autenticación con HuggingFace
                    'Content-Type': 'application/json'
                }
            }
        );

        // Intenta obtener el texto generado desde la respuesta
        const texto = response.data.generated_text || response.data[0]?.generated_text || 'Respuesta no encontrada';

        // Devuelve el texto como respuesta JSON
        res.json({ exito: true, reporte: texto });

    } catch (error) {
        // Captura errores y devuelve mensaje de error al cliente
        console.error('Error en HuggingFace:', error.response?.data || error.message);
        res.status(500).json({ exito: false, mensaje: 'Error generando el reporte' });
    }
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor listo en http://localhost:3000');
});

*/


export async function generarReportedeEvaluaciones(curso) {
    const datos = JSON.stringify(curso);  // Convierte los datos recibidos a un string JSON
//version anterior de la version de arriba
app.post('/api/reporte', async (req, res) => {
    const datos = JSON.stringify(req.body);  // Convierte los datos recibidos a un string JSON
try{
// Título del reporte
let reporte = `📘 Reporte de desempeño del curso: *${curso.nombre}*\n\n`;

// Información general
reporte += `🆔 ID del curso: ${curso.id}\n`;
reporte += `🔢 Total de reactivos: ${curso.reactivos}\n`;

// Cantidad de respuestas correctas e incorrectas globales
const correctas = curso.respuestasCorrectas.length;
const incorrectas = curso.respuestasIncorrectas.length;
const total = curso.reactivos;

// Cálculo de porcentaje de aciertos
const porcentaje = total > 0 ? (correctas / total) * 100 : 0;

// Comentario general según desempeño
let comentario = '';
if (porcentaje >= 90) comentario = '🟢 Excelente desempeño general.';
else if (porcentaje >= 75) comentario = '🟡 Buen desempeño global.';
else if (porcentaje >= 60) comentario = '🟠 Desempeño aceptable.';
else comentario = '🔴 El curso requiere refuerzo académico.';

// Agregamos los resultados al reporte
reporte += `✅ Respuestas correctas: ${correctas}\n`;
reporte += `❌ Respuestas incorrectas: ${incorrectas}\n`;
reporte += `📊 Porcentaje de aciertos: ${porcentaje.toFixed(1)}%\n`;
reporte += `📈 Promedio general del curso: ${curso.promedio.toFixed(2)}\n\n`;
reporte += `💬 Evaluación: ${comentario}`;
 
// Devuelve el reporte generado como una cadena de texto
return reporte;
}catch(error){
    // Captura errores y devuelve mensaje de error al cliente
    console.error('Error en HuggingFace:', error.response?.data || error.message);
    res.status(500).json({ exito: false, mensaje: 'Error generando el reporte' });
}
})};
//Chat api 
/*
// Lógica para generar el reporte de evaluaciones 
    const prompt = `Genera un reporte de desempeño para el curso. curso: ${JSON.stringify(curso)}. Sé detallado y claro.`;
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }]
      });
    
      return completion.choices[0].message.content;
*/

/*
prueba 2 manual ejemplo
     // Encabezado del reporte con el nombre del curso
     let reporte = `📘 Reporte de desempeño del curso: *${nameCurso}*\n\n`;

     // Si no hay datos, devuelve mensaje indicando que no se recibieron datos
     if (!Array.isArray(datos) || datos.length === 0) {
         return reporte + "No se recibieron datos de evaluación.";
     }
 
     // Calcula la suma total de todas las calificaciones
     const total = datos.reduce((acc, alumno) => acc + alumno.calificacion, 0);
     // Calcula el promedio general de las calificaciones
     const promedio = total / datos.length;
     // Ordena a los estudiantes de mayor a menor calificación
     const ordenados = [...datos].sort((a, b) => b.calificacion - a.calificacion);
 
     // Agrega al reporte la cantidad de estudiantes y el promedio general
     reporte += ` Cantidad de estudiantes evaluados: ${datos.length}\n`;
     reporte += ` Promedio general: ${promedio.toFixed(2)}\n\n`;
 
     // Sección con los detalles individuales de cada estudiante
     reporte += `Detalles por estudiante:\n`;
 
     // Itera sobre los estudiantes ordenados y les asigna un comentario personalizado
     ordenados.forEach((alumno, index) => {
         let comentario = '';
 
         // Asigna comentarios según el valor de la calificación
         if (alumno.calificacion >= 9) {
             comentario = 'Excelente desempeño.';
         } else if (alumno.calificacion >= 7) {
             comentario = 'Buen rendimiento.';
         } else if (alumno.calificacion >= 6) {
             comentario = 'Rendimiento aceptable.';
         } else {
             comentario = 'Debe mejorar.';
         }
 
         // Agrega la información del alumno al reporte
         reporte += `${index + 1}. ${alumno.nombre}: ${alumno.calificacion} → ${comentario}\n`;
     });
 
     // Devuelve el reporte generado como una cadena de texto
     return reporte;
     */


/*
// Título del reporte
let reporte = `📘 Reporte de desempeño del curso: *${curso.nombre}*\n\n`;

// Información general
reporte += `🆔 ID del curso: ${curso.id}\n`;
reporte += `🔢 Total de reactivos: ${curso.reactivos}\n`;

// Cantidad de respuestas correctas e incorrectas globales
const correctas = curso.respuestasCorrectas.length;
const incorrectas = curso.respuestasIncorrectas.length;
const total = curso.reactivos;

// Cálculo de porcentaje de aciertos
const porcentaje = total > 0 ? (correctas / total) * 100 : 0;

// Comentario general según desempeño
let comentario = '';
if (porcentaje >= 90) comentario = '🟢 Excelente desempeño general.';
else if (porcentaje >= 75) comentario = '🟡 Buen desempeño global.';
else if (porcentaje >= 60) comentario = '🟠 Desempeño aceptable.';
else comentario = '🔴 El curso requiere refuerzo académico.';

// Agregamos los resultados al reporte
reporte += `✅ Respuestas correctas: ${correctas}\n`;
reporte += `❌ Respuestas incorrectas: ${incorrectas}\n`;
reporte += `📊 Porcentaje de aciertos: ${porcentaje.toFixed(1)}%\n`;
reporte += `📈 Promedio general del curso: ${curso.promedio.toFixed(2)}\n\n`;
reporte += `💬 Evaluación: ${comentario}`;
 
// Devuelve el reporte generado como una cadena de texto
return reporte;

*/