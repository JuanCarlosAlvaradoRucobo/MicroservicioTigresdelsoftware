export class Curso {
    constructor(nombre, reactivos, estudiantesAsignados,
        respuestasCorrectas, respuestasIncorrectas,
        promedio, id)
        {
            this.nombre = nombre;
            this.reactivos = reactivos;
            this.estudiantesAsignados = estudiantesAsignados || [];
            this.respuestasCorrectas = respuestasCorrectas || [];
            this.respuestasIncorrectas = respuestasIncorrectas || [];
            this.promedio = promedio;
            this.id = id;
        }
}

/*const pruebaCurso = new Curso("CursoPrueba", 5, ["1", "2", "3"],
    [1, .75, .5, .25, .125], [0, .25, .5, .75, .875], 85.3, "ID1"
);

console.log(pruebaCurso);*/
//export default {Curso}