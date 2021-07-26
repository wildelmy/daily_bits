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
        texto: "¿Cuál es el valor predeterminado de la propiedad de posición",
        respuestas: ["static", "fixed", "absolute", "relative"],
    },
    {
        tipo: tipos_preguntas.seleccion,
        texto: "¿Cómo selecciona todos los elementos p dentro de un elemento div?",
        respuestas: ["div p", "div.p", "div+p"]
    },
    {
        tipo: tipos_preguntas.seleccion,
        texto: "¿Qué significa DRY?",
        respuestas: ["Don’t repeat yourself", "Don’t repeat yellow", "Don’t recicle year"]
    },
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

    preguntas.splice(indice_aleatorio, 1);
}

function preguntaSeleccion() {
    respuesta_correcta = pregunta_aleatoria.respuestas[0];
    pregunta_aleatoria.respuestas.sort(() => Math.random() - 0.5);

    $('#pregunta').text(pregunta_aleatoria.texto)
    let txt_respuestas = '';
    for (let i in pregunta_aleatoria.respuestas) {
        let valor = pregunta_aleatoria.respuestas[i];
        txt_respuestas += `
            <span>
                <input type="radio" id="${valor}" name="option" class="radio" value="${valor}" />
                <label for="${valor}" class="option">${valor}</label>
            </span>
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


function comprobar() {
    if (pregunta_aleatoria.tipo === tipos_preguntas.seleccion) {
        comprobarPreguntaSeleccion()
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
