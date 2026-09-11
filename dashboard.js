document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('sidebar');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                nav.classList.toggle('open');
            }
        });
    }
});