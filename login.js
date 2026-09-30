if (haySesion()) window.location.replace('dashboard.html');

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const inputUsuario = document.getElementById('username');
  const inputClave = document.getElementById('password');
  const aviso = document.getElementById('aviso-login');
  const botonVer = document.getElementById('ver-password');

  function mostrarAviso(mensaje) {
    aviso.textContent = mensaje;
    aviso.hidden = false;
  }

  function ocultarAviso() {
    aviso.hidden = true;
    aviso.textContent = '';
  }

  /* ---------- 1. Mostrar / ocultar contraseña ------------------- */
  botonVer.addEventListener('click', function () {
    const estabaOculta = inputClave.type === 'password';

    inputClave.type = estabaOculta ? 'text' : 'password';
    botonVer.innerHTML = icono(estabaOculta ? 'eye-off' : 'eye', 20);

    // Para lectores de pantalla: el botón dice en qué estado está.
    botonVer.setAttribute('aria-pressed', String(estabaOculta));
    botonVer.setAttribute('aria-label', estabaOculta ? 'Ocultar contraseña' : 'Mostrar contraseña');

    inputClave.focus();
  });

  /* ---------- 2. Envío ----------------------------------------- */
  form.addEventListener('submit', function (event) {
    event.preventDefault();          // sin esto el form recarga la página
    ocultarAviso();

    const username = inputUsuario.value.trim();
    const password = inputClave.value;

    // a) Campos vacíos: un error por campo.
    marcarError('username', username ? '' : 'Ingresá tu usuario.');
    marcarError('password', password ? '' : 'Ingresá tu contraseña.');

    if (!username) { inputUsuario.focus(); return; }
    if (!password) { inputClave.focus(); return; }

    // b) Credenciales incorrectas: aviso en la página (nada de alert()).
    if (!credencialesValidas(username, password)) {
      mostrarAviso('Usuario o contraseña incorrectos.');
      inputClave.value = '';
      inputClave.focus();
      return;
    }

    // c) Todo bien: al panel.
    guardarSesion(username);                                // la sesión queda en localStorage
    avisarEnLaSiguientePagina('Bienvenido, ' + username);   // el aviso se ve en el panel
    window.location.href = 'dashboard.html';
  });

  /* ---------- 3. Al volver a escribir, se limpia el error -------- */
  inputUsuario.addEventListener('input', function () {
    marcarError('username', '');
    ocultarAviso();
  });

  inputClave.addEventListener('input', function () {
    marcarError('password', '');
    ocultarAviso();
  });
});
