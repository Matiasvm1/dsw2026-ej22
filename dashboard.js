document.addEventListener('DOMContentLoaded', () => {
    const especialidades = obtenerEspecialidades();

    const activas = especialidades.filter(e => e.active).length;
    const inactivas = especialidades.length - activas;

    document.getElementById('total-especialidades').textContent = especialidades.length;
    document.getElementById('activas-especialidades').textContent = activas;
    document.getElementById('inactivas-especialidades').textContent = inactivas;

    const tbody = document.getElementById('tabla-ultimas');
    const pie = document.getElementById('tabla-pie');

    if (especialidades.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="padding: 12px; text-align: center;">No hay especialidades cargadas</td></tr>';
        pie.textContent = 'Mostrando 0 de 0 especialidades';
        return;
    }

    const ultimas = especialidades.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    tbody.innerHTML = '';

    ultimas.forEach(esp => {
        const estadoClaseBg = esp.active ? 'var(--color-ok-bg)' : '#e5e7eb';
        const estadoClaseColor = esp.active ? 'var(--color-ok)' : '#374151';
        const estadoTexto = esp.active ? 'Activa' : 'Inactiva';

        tbody.innerHTML += `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid var(--color-border); font-weight: bold;">
                    ${escaparHTML(esp.name)}
                </td>
                <td style="padding: 12px; border-bottom: 1px solid var(--color-border);">
                    ${escaparHTML(esp.description)}
                </td>
                <td style="padding: 12px; border-bottom: 1px solid var(--color-border);">
                    <span style="background-color: ${estadoClaseBg}; color: ${estadoClaseColor}; padding: 4px 12px; border-radius: 999px; font-size: 14px;">
                        ${estadoTexto}
                    </span>
                </td>
            </tr>
        `;
    });

    pie.textContent = `Mostrando ${ultimas.length} de ${especialidades.length} especialidades`;
});