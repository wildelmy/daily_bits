'use strict'

$(document).ready(function () {
    jugar();
})

const tipos_preguntas = {
    seleccion: "seleccion_multiple",
    ordenar: "ordenar"
}

const preguntas = [
    {
        tipo: tipos_preguntas.seleccion,
        texto: "¿Qué etiqueta es semánticamente correcta para el contenido principal?",
        respuestas: ["main", "section", "header"],
    },
    {
        tipo: tipos_preguntas.seleccion,
        texto: "¿Qué etiqueta HTML nos sirve para incluir archivos de JavaScript?",
        respuestas: ["&ltscript&gt", "&ltbr&gt", "&ltstyles&gt"]
    },
    {
        tipo: tipos_preguntas.seleccion,
        texto: "¿Qué significa DRY?",
        respuestas: ["Don’t repeat yourself", "Don’t repeat yellow", "Don’t recicle year"]
    },
    // {
    //     tipo: tipos_preguntas.ordenar,
    //     texto: "Organiza la estructura de un documento HTML5",
    //     opciones: ["&lt!DOCTYPE html&gt", "&lthtml&gt", "&lthead&gt &lthead&gt", "&ltbody&gt &lt/body&gt", "&lt/html&gt"]
    // }
];

const juego = {
    progreso: 0,
    vida: 4
}


const vida_contenedor = $('#life')

const porcentage_avance = 100 / preguntas.length
let respuesta_correcta;
let indice_aleatorio;
let pregunta_aleatoria = {}


function jugar() {
    vida_contenedor.text(juego.vida)
    actualizarProgeso()

    indice_aleatorio = Math.floor(Math.random() * preguntas.length);
    pregunta_aleatoria = preguntas[indice_aleatorio];

    if (pregunta_aleatoria.tipo === tipos_preguntas.seleccion) {
        preguntaSeleccion()
    }

    if (pregunta_aleatoria.tipo === tipos_preguntas.ordenar) {
        preguntaOrdenar()
    }

    preguntas.splice(indice_aleatorio, 1);
}

function preguntaSeleccion() {
    console.log(pregunta_aleatoria)
    respuesta_correcta = pregunta_aleatoria.respuestas[0];
    pregunta_aleatoria.respuestas.sort(() => Math.random() - 0.5);

    $('#pregunta').text(pregunta_aleatoria.texto)
    let txt_respuestas = '';
    for (let i in pregunta_aleatoria.respuestas) {
        let valor = pregunta_aleatoria.respuestas[i];
        txt_respuestas += `
            <input type="radio" name="pp" value="${valor}">
            <label>${valor}</label>
            <br>
        `;
    }
    $('#respuestas').html(txt_respuestas);
}

function comprobarPreguntaSeleccion() {
    let respuesta_seleccionada = $("input[type=radio]:checked").val();
    if (respuesta_seleccionada == respuesta_correcta) {
        alert("correcto");
    } else {
        juego.vida--;
        alert("Incorrecto");
    }
    if (juego.progreso === 100 || !juego.vida) {
        alert('Juego terminado')
        window.location.href = '/'
        return
    }
}

function preguntaOrdenar() {
    let html_opciones = "";
    const orden_seleccionado = []
    $('#pregunta').text(pregunta_aleatoria.texto)
    let opciones = pregunta_aleatoria.opciones
    for (let i in opciones) {
        html_opciones += `
            <button class="opcion-ordear mx-1 my-1" data-index="${i}">${opciones[i]}</button>
        `
    }
    $('#seccion-ordenar').html(html_opciones)
    $('.opcion-ordear').click(function(ev) {
        let indice_opcion = Number(ev.target.dataset.index);
        $('#seccion-ordenada').append(`
        <button class="opcion-ordear mx-1 my-1" data-index="${indice_opcion}">${opciones[indice_opcion]}</button>
        `)
        orden_seleccionado.push(opciones.splice(opciones[indice_opcion], 1));
        let html_opciones = "";
        for (let i in opciones) {
            html_opciones += `
                <button class="opcion-ordear mx-1 my-1" data-index="${i}">${opciones[i]}</button>
            `
        }
        $('#seccion-ordenar').html(html_opciones)
        console.log(orden_seleccionado);
    });
}

function comprobar() {
    if (pregunta_aleatoria.tipo === tipos_preguntas.seleccion) {
        comprobarPreguntaSeleccion()
    }
    if (pregunta_aleatoria.tipo === tipos_preguntas.ordenar) {
        preguntaSeleccion()
    }
    setTimeout(jugar, 1000)
}


function actualizarProgeso() {
    juego.progreso += porcentage_avance
    $('#progreso').html(`
        <div
            class="progress-bar"
            role="progress"
            style="width: ${juego.progreso}%"
            aria-valuenow="${juego.progreso}"
            aria-valuemin="0"
            aria-valuemax="100">
        </div>`
    )
}
