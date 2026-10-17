document.addEventListener('DOMContentLoaded', async () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page-content');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            if (!targetId) return;

            pages.forEach(page => {
                if (page.id === targetId) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });

            navButtons.forEach(b => {
                if (b.getAttribute('data-target') === targetId) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
        });
    });

    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        try {
            const response = await fetch('Version.json');
            const data = await response.json();
            if (data && data.downloadUrl) {
                downloadBtn.href = data.downloadUrl;
            }
        } catch (error) {
            console.error('Erro ao carregar o Version.json:', error);
        }
    }
});
