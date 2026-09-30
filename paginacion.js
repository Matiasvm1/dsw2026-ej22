function paginar(lista, pagina) {
    const tamaño = 5;
    const inicio = (pagina - 1) * tamaño;
    const fin = inicio + tamaño;
    return lista.slice(inicio, fin);
}

function totalDePaginas(cantidad) {
    const tamaño = 5;
    return Math.ceil(cantidad / tamaño);
}

function pintarPaginacion(contenedor, actual, total, alCambiar) {
    contenedor.innerHTML = '';

    if (total <= 1) return;

    for (let i = 1; i <= total; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;

        btn.style.padding = '4px 12px';
        btn.style.margin = '0 2px';
        btn.style.border = '1px solid var(--color-border)';
        btn.style.borderRadius = '6px';
        btn.style.cursor = 'pointer';

        if (i === actual) {
            btn.style.backgroundColor = 'var(--color-brand)';
            btn.style.color = 'white';
            btn.style.fontWeight = 'bold';
        } else {
            btn.style.backgroundColor = 'white';
            btn.style.color = 'var(--color-brand-dark)';
        }

        btn.addEventListener('click', () => {
            if (i !== actual) alCambiar(i);
        });

        contenedor.appendChild(btn);
    }
}