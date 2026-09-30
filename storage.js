const CLAVE_ESPECIALIDADES = 'specialties';
const CLAVE_SESION = 'session';

/* ---------- Especialidades ---------------------------------- */

function inicializarEspecialidades() {
  if (localStorage.getItem(CLAVE_ESPECIALIDADES) === null) {
    localStorage.setItem(CLAVE_ESPECIALIDADES, JSON.stringify([]));
  }
}

/** Devuelve el array completo. Nunca devuelve null. */
function obtenerEspecialidades() {
  inicializarEspecialidades();
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_ESPECIALIDADES));
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    // Pasa si alguien editó el valor a mano desde DevTools y rompió el JSON.
    console.error('[storage] "specialties" no es un JSON válido:', error);
    return [];
  }
}

/** Reemplaza el array completo. */
function guardarEspecialidades(especialidades) {
  localStorage.setItem(CLAVE_ESPECIALIDADES, JSON.stringify(especialidades));
}

/**
 * Agrega una especialidad al array y la guarda.
*
 * @param {{name: string, description: string, active?: boolean}} datos
 * @returns {Object} la especialidad guardada, ya con su id
 */
function agregarEspecialidad(datos) {
  const especialidades = obtenerEspecialidades();   // 1. leo
  const nueva = {
    id: crypto.randomUUID(),                         // GUID, pedido del #25
    name: datos.name.trim(),
    description: datos.description.trim(),
    active: datos.active !== false,                  // por defecto, activa
    createdAt: new Date().toISOString()
  };
  especialidades.push(nueva);                        // 2. agrego al array
  guardarEspecialidades(especialidades);             // 3. guardo
  return nueva;
}


function buscarEspecialidadesPorNombre(texto) {
  const buscado = normalizarTexto(texto);
  return obtenerEspecialidades().filter((e) => normalizarTexto(e.name).includes(buscado));
}

/** ¿Ya existe una especialidad con ese nombre? (sin acentos ni mayúsculas) */
function existeEspecialidad(nombre) {
  const buscado = normalizarTexto(nombre);
  return obtenerEspecialidades().some((e) => normalizarTexto(e.name) === buscado);
}

/**
 * Carga tres especialidades de ejemplo.
 desde la consola -> cargarEspecialidadesDeEjemplo()
 */
function cargarEspecialidadesDeEjemplo() {
  [
    { name: 'Cardiología',  description: 'Rama de la medicina que trata los trastornos del corazón.' },
    { name: 'Dermatología', description: 'Diagnóstico y tratamiento de las enfermedades de la piel.' },
    { name: 'Neurología',   description: 'Trastornos del sistema nervioso central y periférico.' }
  ].forEach((e) => { if (!existeEspecialidad(e.name)) agregarEspecialidad(e); });
  return obtenerEspecialidades();
}

/** Vuelve a dejar el array vacío */
function vaciarEspecialidades() {
  guardarEspecialidades([]);
}

/* ---------- Sesión ------------------------------------------ */
/* También es localStorage, así que también vive acá. */

function guardarSesion(usuario) {
  localStorage.setItem(CLAVE_SESION, JSON.stringify({ usuario, desde: new Date().toISOString() }));
}

function leerSesion() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_SESION));
  } catch {
    return null;
  }
}

function borrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}

/* ---------- Ayuda interna ----------------------------------- */

function normalizarTexto(texto) {
  return String(texto ?? '')
    .toLowerCase()
    .normalize('NFD')                   // separa la letra de la tilde
    .replace(/[̀-ͯ]/g, '')   // borra las tildes
    .trim();
}


inicializarEspecialidades();
