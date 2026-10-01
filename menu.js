/* ============================================================
   menu.js · Botón de menú en celular (EJERCICIO #22)
   DUEÑO: Nicolás · rama feature/panel-y-menu
   ------------------------------------------------------------
   Consigna del ej. #22:
     - Utiliza JavaScript para detectar el clic en el botón de menú.
     - Al hacer clic, muestra u oculta el menú de navegación.
     - Asegúrate de que la funcionalidad solo se active en
       resoluciones móviles.

   Lo cargan las tres páginas privadas. El CSS del estado abierto
   (nav.open) está en dashboard_style.css.

   Además de lo que pide la consigna, el menú se cierra:
     - con la tecla Escape
     - tocando fuera del menú
     - tocando un link del menú
     - si la ventana pasa a tamaño escritorio
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const botonMenu = document.querySelector('.menu');
  const nav = document.getElementById('sidebar');
  if (!botonMenu || !nav) return;

  // "Sólo en resoluciones móviles": el mismo corte de 600px que usa el
  // CSS (mobile first: escritorio es min-width 600px, el resto es celular).
  // matchMedia evalúa una media query desde JS.
  const consultaEscritorio = window.matchMedia('(min-width: 600px)');
  const esMovil = () => !consultaEscritorio.matches;
  const estaAbierto = () => nav.classList.contains('open');

  function cerrar() {
    nav.classList.remove('open');
    botonMenu.setAttribute('aria-expanded', 'false');
    botonMenu.setAttribute('aria-label', 'Abrir menú');
  }

  /* ---------- El pedido del #22 ------------------------------- */
  botonMenu.addEventListener('click', (evento) => {
    if (!esMovil()) return;              // en escritorio el menú siempre se ve

    // Si no cortamos la propagación, este mismo clic llega al listener
    // de "clic afuera" (más abajo) y cierra el menú apenas se abre.
    evento.stopPropagation();

    // toggle devuelve true si la clase quedó puesta.
    const abierto = nav.classList.toggle('open');
    botonMenu.setAttribute('aria-expanded', String(abierto));
    botonMenu.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });

  /* ---------- Formas de cerrarlo ------------------------------ */
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && estaAbierto()) {
      cerrar();
      botonMenu.focus();                 // el foco vuelve al botón que lo abrió
    }
  });

  document.addEventListener('click', (evento) => {
    if (estaAbierto() && !nav.contains(evento.target)) cerrar();
  });

  nav.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) cerrar();
  });

  // Si se agranda la ventana con el menú abierto, se saca la clase.
  consultaEscritorio.addEventListener('change', () => {
    if (!esMovil()) cerrar();
  });
});
