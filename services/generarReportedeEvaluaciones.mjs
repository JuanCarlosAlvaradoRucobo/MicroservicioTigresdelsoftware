//const openai = require('../config/openaiConfig');
//import { Curso } from '../services/generarCurso.mjs';
//import {openai} from '../config/openaiConfig.mjs';


export async function generarReportedeEvaluaciones(curso) {
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
}



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