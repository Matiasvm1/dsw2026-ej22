# dsw2026-ej22

Este proyecto requiere que implementes la funcionalidad para abrir el menú de navegación (`nav`) desde el botón correspondiente cuando la página está en modo móvil.

**Instrucciones:**
- Utiliza JavaScript para detectar el clic en el botón de menú.
- Al hacer clic, muestra u oculta el menú de navegación.
- Asegúrate de que la funcionalidad solo se active en resoluciones móviles.

Puedes usar `classList.toggle` para mostrar/ocultar el menú.

Ejemplo básico:

```js
const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});
```

No olvides agregar los estilos CSS necesarios para que el menú se oculte y se muestre correctamente en modo móvil.

 Avance Unidad IV · MedPortal

Portal de administración del TPI hecho **sólo con HTML, CSS y JavaScript**, sin
backend. Las especialidades viven en un array guardado en `localStorage` bajo la
clave `specialties`.

## Integrantes

| Legajo | Apellido y nombre |
| --- | --- |
| 56552 | Villafañe, Matías |
| 53291 | Khouri, José Nicolás |
| 58150 | Ortiz Cancino, Valentín |
