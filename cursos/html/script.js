'use strict'

const TOTAL_PREGUNTAS = 5;
const porcentaje_avance = 100 / TOTAL_PREGUNTAS
let juego =  JSON.parse(window.localStorage.getItem('juego'))
let preguntas_recorridas = juego.progreso_preguntas.length

actualizarProgreso()
$('#vida').text(juego.vida)
function escogerPreguntaAleatoria() {
  let indice_pregunta_aleatoria = Math.floor((Math.random() * TOTAL_PREGUNTAS) + 1)
  
  if (preguntas_recorridas === 0) {
    juego.progreso_preguntas.push(indice_pregunta_aleatoria)
    window.localStorage.setItem('juego', JSON.stringify(juego))
    window.location.href = `./pregunta_${indice_pregunta_aleatoria}.html`
  } else if (preguntas_recorridas < TOTAL_PREGUNTAS) {
    let es_pregunta_sin_recorrer = !juego.progreso_preguntas.includes(indice_pregunta_aleatoria)
    if (es_pregunta_sin_recorrer) {
      juego.progreso_preguntas.push(indice_pregunta_aleatoria)
      window.localStorage.setItem('juego', JSON.stringify(juego))
      window.location.href = `./pregunta_${indice_pregunta_aleatoria}.html`
    } else {
      escogerPreguntaAleatoria()
    }
  } else {
    alert('fin preguntas')
    window.location.href = '/'
    return
  }
}


function actualizarProgreso() {
  const aumento_progreso = preguntas_recorridas * porcentaje_avance
  $('#progreso').html(`
    <div
      class="progress-bar"
      role="progress"
      style="width: ${aumento_progreso}%"
      aria-valuenow="${aumento_progreso}"
      aria-valuemin="0"
      aria-valuemax="100">
    </div>`
  )
  let usuario = JSON.parse(window.localStorage.getItem('usuario'))
  usuario.progreso.html = aumento_progreso
  window.localStorage.setItem('usuario', JSON.stringify(usuario))
}

function reducirVida() {
  juego.vida--
  $('#vida').text(juego.vida)
  window.localStorage.setItem('juego', JSON.stringify(juego))
}