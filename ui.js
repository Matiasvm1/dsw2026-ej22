function escaparHTML(texto) {
  return String(texto ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * @param {string} nombre   sufijo del id: 'name', 'username', ...
 * @param {string} mensaje  '' para limpiar
 */

function marcarError(nombre, mensaje) {
  const campo = document.getElementById('campo-' + nombre);
  const texto = document.getElementById('error-' + nombre);
  if (campo) campo.classList.toggle('tiene-error', Boolean(mensaje));
  if (texto) texto.textContent = mensaje;
}

/**
 * Aviso flotante abajo a la derecha. 
 * @param {string} mensaje
 * @param {'exito'|'error'|'info'} tipo
 */
function mostrarToast(mensaje, tipo = 'info') {
  let contenedor = document.querySelector('.toasts');
  if (!contenedor) {
    contenedor = document.createElement('div');
    contenedor.className = 'toasts';
    contenedor.setAttribute('role', 'status');
    contenedor.setAttribute('aria-live', 'polite');
    document.body.appendChild(contenedor);
  }
  const aviso = document.createElement('div');
  aviso.className = 'toast toast--' + tipo;
  aviso.textContent = mensaje;
  contenedor.appendChild(aviso);
  setTimeout(() => aviso.remove(), 2800);
}


function avisarEnLaSiguientePagina(mensaje, tipo = 'exito') {
  sessionStorage.setItem('aviso', JSON.stringify({ mensaje, tipo }));
}

document.addEventListener('DOMContentLoaded', () => {
  const pendiente = sessionStorage.getItem('aviso');
  if (!pendiente) return;
  sessionStorage.removeItem('aviso');
  const { mensaje, tipo } = JSON.parse(pendiente);
  mostrarToast(mensaje, tipo);
});