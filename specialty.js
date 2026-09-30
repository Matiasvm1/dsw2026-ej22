
protegerPagina();

const MAX_NOMBRE = 15;
const MAX_DESCRIPCION = 100;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-especialidad');
  const inputNombre = document.getElementById('name');
  const inputDescripcion = document.getElementById('description');
  const selectEstado = document.getElementById('active');

  /**
   * @returns {Object} 
   */
  function validar(datos) {
    const errores = {};

    if (!datos.name) {
      errores.name = 'El nombre es obligatorio.';
    } else if (datos.name.length > MAX_NOMBRE) {
      errores.name = `El nombre no puede superar los ${MAX_NOMBRE} caracteres (tiene ${datos.name.length}).`;
    } else if (existeEspecialidad(datos.name)) {
      errores.name = 'Ya existe una especialidad con ese nombre.';
    }

    if (!datos.description) {
      errores.description = 'La descripción es obligatoria.';
    } else if (datos.description.length > MAX_DESCRIPCION) {
      errores.description = `La descripción no puede superar los ${MAX_DESCRIPCION} caracteres (tiene ${datos.description.length}).`;
    }

    return errores;
  }

  /* ---------- 2. Guardar -------------------------------------- */
  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const especialidad = {
      name: inputNombre.value.trim(),
      description: inputDescripcion.value.trim(),
      active: selectEstado.value === 'true'
    };
    console.log('Especialidad del formulario:', especialidad);

    const errores = validar(especialidad);
    marcarError('name', errores.name || '');
    marcarError('description', errores.description || '');

    if (errores.name) { inputNombre.focus(); return; }
    if (errores.description) { inputDescripcion.focus(); return; }
    });
});