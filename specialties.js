
protegerPagina();

document.addEventListener('DOMContentLoaded', () => {
  const cuerpo = document.getElementById('specialties-table-body'); 
  
  const vacio = document.getElementById('estado-vacio');
  const tituloVacio = document.getElementById('vacio-titulo');
  const textoVacio = document.getElementById('vacio-texto');
  const contador = document.getElementById('contador');
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
        const totalGuardadas = obtenerEspecialidades().length;
        let visibles = resultados; 
        let desde = 1;

        cuerpo.innerHTML = visibles.map(fila).join('');
        pintarIconos(cuerpo);

        vacio.hidden = resultados.length > 0;
        if (totalGuardadas === 0) {
            tituloVacio.textContent = 'Todavía no hay especialidades cargadas';
            textoVacio.textContent = 'Cargá la primera con el botón «Nueva Especialidad».';

        }

    // Contador: "Mostrando 6–10 de 12 especialidades"
        const hasta = desde + visibles.length - 1;
        contador.textContent = resultados.length === 0
            ? `Mostrando 0 de ${totalGuardadas} especialidades`
            : `Mostrando ${desde}–${hasta} de ${resultados.length} especialidades`;
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


