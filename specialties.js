
protegerPagina();

document.addEventListener('DOMContentLoaded', () => {
  const cuerpo = document.getElementById('specialties-table-body'); 

  /* Estado de la pantalla. */
  let resultados = [];          // todas o las filtradas

  function fila(especialidad) {
    const estado = especialidad.active
      ? '<span class="pill pill--activa">Activa</span>'
      : '<span class="pill pill--inactiva">Inactiva</span>';

    // Todo lo que viene de localStorage pasa por escaparHTML():
    // lo escribió un usuario y podría traer HTML o <script>.
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
   
    function pintar() {
        let visibles = resultados; 

        cuerpo.innerHTML = visibles.map(fila).join('');
        pintarIconos(cuerpo);
    }


    /** Cambia la lista que se muestra. */
    function mostrar(lista) {
        // Orden alfabético; localeCompare con 'es' ordena bien las tildes.
        resultados = lista.slice().sort((a, b) => a.name.localeCompare(b.name, 'es'));
        pintar();
    }

    /* ---------- 4. Primer pintado: todo lo que hay guardado ------ */
    mostrar(obtenerEspecialidades());
});


























  /* Estado de la pantalla. */
  let resultados = [];          // todas o las filtradas



/* ---------- 1. Una fila ------------------------------------- */
  function fila(especialidad) {
    const estado = especialidad.active
      ? '<span class="pill pill--activa">Activa</span>'
      : '<span class="pill pill--inactiva">Inactiva</span>';

    // Todo lo que viene de localStorage pasa por escaparHTML():
    // lo escribió un usuario y podría traer HTML o <script>.
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


