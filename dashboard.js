/* ============================================================
   dashboard.js · Panel de administración
   DUEÑO: Nicolás · rama feature/panel-y-menu
   ------------------------------------------------------------
   El "Cerrar Sesión" que tenía este archivo en la cátedra ahora lo
   engancha sesion.js para todas las páginas privadas.

   Este archivo:
     1. Protege la página (sin sesión, vuelve al login).
     2. Cuenta total, activas e inactivas desde localStorage.
     3. Muestra las últimas 5 especialidades cargadas.

   Usa funciones de la base:
     protegerPagina()          sesion.js
     obtenerEspecialidades()   storage.js
     escaparHTML()             ui.js
     pintarIconos()            iconos.js
   ============================================================ */

protegerPagina();

document.addEventListener('DOMContentLoaded', () => {
  const especialidades = obtenerEspecialidades();

  /* ---------- 1. Métricas ------------------------------------- */
  const activas = especialidades.filter((e) => e.active).length;
  const inactivas = especialidades.length - activas;

  document.getElementById('metrica-total').textContent = especialidades.length;
  document.getElementById('metrica-activas').textContent = activas;
  document.getElementById('metrica-inactivas').textContent = inactivas;

  /* ---------- 2. Últimas 5 ------------------------------------ */
  // Las más nuevas primero. slice() hace una copia: sort() modifica el
  // array sobre el que se llama y no queremos tocar el original.
  const ultimas = especialidades
    .slice()
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    .slice(0, 5);

  document.getElementById('metrica-ultima').textContent = ultimas.length
    ? 'Última alta: ' + ultimas[0].name
    : 'Todavía no hay altas';

  /** Una fila de la tabla resumen. */
  function fila(especialidad) {
    const estado = especialidad.active
      ? '<span class="pill pill--activa">Activa</span>'
      : '<span class="pill pill--inactiva">Inactiva</span>';

    return `
      <tr>
        <td>
          <div class="tabla__nombre">
            <span class="icono-caja" data-icono="shapes"></span>
            ${escaparHTML(especialidad.name)}
          </div>
        </td>
        <td>${escaparHTML(especialidad.description)}</td>
        <td>${estado}</td>
      </tr>`;
  }

  const cuerpo = document.getElementById('ultimas-table-body');

  if (ultimas.length === 0) {
    cuerpo.innerHTML = `
      <tr>
        <td colspan="3" class="tabla__sin-datos">
          Todavía no hay especialidades cargadas.
          <a href="specialty.html">Cargar la primera</a>
        </td>
      </tr>`;
  } else {
    cuerpo.innerHTML = ultimas.map(fila).join('');
    pintarIconos(cuerpo);          // las filas nuevas traen data-icono
  }

  document.getElementById('pie-panel').textContent =
    `Mostrando ${ultimas.length} de ${especialidades.length} especialidades`;
});
