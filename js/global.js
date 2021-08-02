function comprobarUsuario() {
  const usuario = window.localStorage.getItem('usuario')
  if (!usuario) {
    window.location.href = '../login.html'
  }
}
comprobarUsuario()

function contarTiempo() {
  let usuario = window.localStorage.getItem('usuario')
  usuario = JSON.parse(usuario)
  usuario.estadisticas.tiempo++
  window.localStorage.setItem('usuario', JSON.stringify(usuario))
  setTimeout(contarTiempo, 1000)
}
contarTiempo()