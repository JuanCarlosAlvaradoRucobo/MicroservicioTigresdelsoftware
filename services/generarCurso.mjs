import {Curso} from '../models/Curso.mjs';

function Char_random() {

    // Generate between 97 and 122 (ASCII for lowercase letters)
    const Numtostr = Math.floor(Math.random() * 26) + 97;
    return String.fromCharCode(Numtostr);
}
export function generarCurso (id)
{
    let reactivos = Math.random()*10;
    reactivos = Math.floor(reactivos);
    let correctos = [];
    let incorrectos = [];
    let aux;
    let promedio = 0;
    for (let i=0; i < reactivos; i++)
    {
        aux = Math.random();
        promedio = promedio + aux;
        correctos.push(aux);
        incorrectos.push(Math.abs(aux-1));
    }
    let numEstu = Math.floor(Math.random()*10);
    let estudiantes = [];
    for (let i = 0; i < numEstu; i++)
    {
        estudiantes.push(Char_random());
    }
    promedio = promedio/reactivos;
    const nuevoCurso = new Curso("CursoPrueba", reactivos, estudiantes,
        correctos, incorrectos, promedio, id
    );
    console.log(nuevoCurso);
    return nuevoCurso;
}
//generarCurso("7777");