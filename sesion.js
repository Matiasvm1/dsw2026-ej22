
const USUARIO_ADMIN = 'admin';
const CLAVE_ADMIN = 'password';


function credencialesValidas(usuario, clave) {
  return usuario.trim().toLowerCase() === USUARIO_ADMIN && clave === CLAVE_ADMIN;
}

function haySesion() {
  return leerSesion() !== null;         // leerSesion() está en storage.js
}


function protegerPagina() {
  if (!haySesion()) window.location.replace('login.html');
}

document.addEventListener('DOMContentLoaded', () => {
  const botonSalir = document.getElementById('logout');
  if (!botonSalir) return;
  botonSalir.addEventListener('click', () => {
    borrarSesion();                      // storage.js
    window.location.href = 'login.html';
  });
});
