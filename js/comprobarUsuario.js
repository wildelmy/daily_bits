function comprobarUsuario() {
  const usuario = window.localStorage.getItem('usuario')
  if (!usuario) {
    window.location.href = '/login.html'
  }
}
comprobarUsuario()