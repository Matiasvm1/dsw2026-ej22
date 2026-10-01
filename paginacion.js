/* ============================================================
   paginacion.js · PLUS del ejercicio #25: paginación de la tabla
   DUEÑO: Nicolás · rama feature/paginacion
   ------------------------------------------------------------
   Funciones que usa specialties.js (Valentín). Van en un archivo
   aparte para que Nicolás y Valentín no toquen el mismo archivo al
   mismo tiempo.

   Contrato (NO cambiar nombres ni parámetros sin avisar):

     paginar([a,b,c,d,e], 2, 2)  -> [c, d]
     totalDePaginas(5, 2)        -> 3

     pintarPaginacion(contenedor, paginaActual, totalPaginas, alCambiar)
       dibuja  ‹ 1 2 3 ›  dentro de `contenedor` y, al hacer clic en un
       botón, llama alCambiar(numeroDePagina)
   ============================================================ */

const ESPECIALIDADES_POR_PAGINA = 5;

/** Devuelve sólo los elementos de la página pedida (la primera es la 1). */
function paginar(lista, pagina, porPagina = ESPECIALIDADES_POR_PAGINA) {
  const desde = (pagina - 1) * porPagina;
  return lista.slice(desde, desde + porPagina);   // slice no modifica la lista
}

/** Cuántas páginas hacen falta. Nunca menos de 1. */
function totalDePaginas(cantidad, porPagina = ESPECIALIDADES_POR_PAGINA) {
  return Math.max(1, Math.ceil(cantidad / porPagina));
}

/** Dibuja los botones de la paginación. */
function pintarPaginacion(contenedor, paginaActual, totalPaginas, alCambiar) {
  contenedor.innerHTML = '';
  if (totalPaginas <= 1) return;         // una sola página: no hace falta paginar

  function agregarBoton(texto, pagina, opciones = {}) {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.textContent = texto;
    boton.disabled = Boolean(opciones.deshabilitado);
    if (opciones.etiqueta) boton.setAttribute('aria-label', opciones.etiqueta);
    if (opciones.activo) {
      boton.classList.add('esta-activo');
      boton.setAttribute('aria-current', 'page');
    }
    boton.addEventListener('click', () => alCambiar(pagina));
    contenedor.appendChild(boton);
  }

  agregarBoton('‹', paginaActual - 1, {
    deshabilitado: paginaActual === 1,
    etiqueta: 'Página anterior'
  });

  for (let numero = 1; numero <= totalPaginas; numero++) {
    agregarBoton(String(numero), numero, {
      activo: numero === paginaActual,
      etiqueta: 'Página ' + numero
    });
  }

  agregarBoton('›', paginaActual + 1, {
    deshabilitado: paginaActual === totalPaginas,
    etiqueta: 'Página siguiente'
  });
}
