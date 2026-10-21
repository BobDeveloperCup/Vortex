document.addEventListener('DOMContentLoaded', async () => {
    const navButtons = document.querySelectorAll('.nav-btn');

    // Navegação por rolagem suave (Smooth Scroll)
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            if (!targetId) return;

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Destaque da navegação de acordo com a seção visível
    const sections = document.querySelectorAll('section.page-content');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-target') === current) {
                btn.classList.add('active');
            }
        });
    });

    // Atualização do link de download via Version.json
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        try {
            const response = await fetch('Version.json');
            const data = await response.json();
            if (data && data.downloadUrl) {
                downloadBtn.href = data.downloadUrl;
            }
        } catch (error) {
            console.error('Erro ao carregar Version.json:', error);
        }
    }
});
