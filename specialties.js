
protegerPagina();

document.addEventListener('DOMContentLoaded', () => {
  const cuerpo = document.getElementById('specialties-table-body'); 
  const formBuscar = document.getElementById('form-buscar');
  const inputBuscar = document.getElementById('buscar-nombre');
  const botonLimpiar = document.getElementById('limpiar-busqueda');
  const vacio = document.getElementById('estado-vacio');
  const tituloVacio = document.getElementById('vacio-titulo');
  const textoVacio = document.getElementById('vacio-texto');
  const contador = document.getElementById('contador');
  const contenedorPaginacion = document.getElementById('paginacion');

  /* Estado de la pantalla. */
  let resultados = [];          // todas o las filtradas
  let filtroAplicado = '';
  let paginaActual = 1;

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

      const totalPaginas = totalDePaginas(resultados.length);
      if (paginaActual > totalPaginas) paginaActual = totalPaginas;
      visibles = paginar(resultados, paginaActual);
      desde = (paginaActual - 1) * ESPECIALIDADES_POR_PAGINA + 1;
      
      cuerpo.innerHTML = visibles.map(fila).join('');
      pintarIconos(cuerpo);
      
      vacio.hidden = resultados.length > 0;
      if (totalGuardadas === 0) {
          tituloVacio.textContent = 'Todavía no hay especialidades cargadas';
          textoVacio.textContent = 'Cargá la primera con el botón «Nueva Especialidad».';
      } else {
        tituloVacio.textContent = 'No encontramos especialidades con ese nombre';
        textoVacio.textContent = `Ninguna contiene «${filtroAplicado}». Probá con otra palabra.`;
      }

    // Contador: "Mostrando 6–10 de 12 especialidades"
      const hasta = desde + visibles.length - 1;
      contador.textContent = resultados.length === 0
        ? `Mostrando 0 de ${totalGuardadas} especialidades`
        : `Mostrando ${desde}–${hasta} de ${resultados.length} especialidades`;
        
      botonLimpiar.hidden = filtroAplicado === '';
      
      pintarPaginacion(contenedorPaginacion, paginaActual, totalPaginas, (numero) => {
      paginaActual = numero;
      pintar();
    });  
      
}


    /** Cambia la lista que se muestra. */
    function mostrar(lista) {
        // Orden alfabético; localeCompare con 'es' ordena bien las tildes.
        resultados = lista.slice().sort((a, b) => a.name.localeCompare(b.name, 'es'));
        paginaActual = 1; 
        pintar();
    }

    formBuscar.addEventListener('submit', (evento) => {
        evento.preventDefault();             // si no, el form recarga la página
        filtroAplicado = inputBuscar.value.trim();

        mostrar(filtroAplicado ? buscarEspecialidadesPorNombre(filtroAplicado) : obtenerEspecialidades());
    });

    botonLimpiar.addEventListener('click', () => {
        inputBuscar.value = '';
        filtroAplicado = '';
        mostrar(obtenerEspecialidades());
        inputBuscar.focus();
    });

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


