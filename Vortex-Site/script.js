const canvas = document.getElementById('ambient-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

const particles = [];
const particleCount = Math.min(Math.floor(width / 20), 50);

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 1
    });
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(animate);
}
animate();

const tabBtns = document.querySelectorAll('.tab-btn');
const viewPanes = document.querySelectorAll('.view-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        viewPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetTab = btn.getAttribute('data-tab');
        document.getElementById(targetTab).classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    const downloadBtn = document.getElementById('download-btn');
    try {
        const res = await fetch('Version.json');
        if (res.ok) {
            const data = await res.json();
            if (data && data.downloadUrl) {
                downloadBtn.href = data.downloadUrl;
            }
        }
    } catch (err) {
        console.log('Utilizando link de download padrão.');
    }
});
