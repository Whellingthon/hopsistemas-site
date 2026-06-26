// ===== Mobile Menu =====
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function openMenu() {
    mobileMenu.classList.add('open');
    menuOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
function closeMenu() {
    mobileMenu.classList.remove('open');
    menuOverlay.classList.add('hidden');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);
mobileNavLinks.forEach(link => link.addEventListener('click', closeMenu));

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
        navbar.classList.add('shadow-lg', 'shadow-black/20');
        navbar.style.borderBottomColor = 'rgba(255,255,255,0.05)';
    } else {
        navbar.classList.remove('shadow-lg', 'shadow-black/20');
    }
    lastScroll = currentScroll;
});

// ===== Intersection Observer for fade-up =====
const fadeElements = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== Stat bars animation =====
const statBars = document.querySelectorAll('.stat-bar-fill');
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.dataset.width;
            entry.target.style.width = width + '%';
            barObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statBars.forEach(bar => barObserver.observe(bar));

// ===== Counter animation =====
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count);
            const suffix = el.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = Math.max(1, Math.floor(target / 40));
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = current + suffix;
            }, 30);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ===== Particles =====
const particlesContainer = document.getElementById('particles');
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.bottom = '-10px';
    particle.style.animationDuration = (5 + Math.random() * 10) + 's';
    particle.style.width = (2 + Math.random() * 3) + 'px';
    particle.style.height = particle.style.width;
    particle.style.opacity = 0.2 + Math.random() * 0.4;
    particlesContainer.appendChild(particle);
    setTimeout(() => particle.remove(), 15000);
}
// Create particles periodically
setInterval(createParticle, 400);
// Initial batch
for (let i = 0; i < 8; i++) setTimeout(createParticle, i * 200);
// ===== Video Background Carousel Restored =====
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.bg-video');
    let currentIndex = 0;
    const intervalTime = 6000; // 6 segundos por vídeo

    if (videos.length > 0) {
        console.log(`Carrossel iniciado com ${videos.length} vídeos.`);
        videos[0].play();

        setInterval(() => {
            videos[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % videos.length;
            const nextVideo = videos[currentIndex];

            nextVideo.currentTime = 0;
            nextVideo.play().then(() => {
                nextVideo.classList.add('active');
            }).catch(error => {
                console.error("Erro ao reproduzir vídeo:", error);
            });
        }, intervalTime);
    }
});