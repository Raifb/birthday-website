document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initializeAnimations();
    setupScrollAnimations();
});

/* Particles */
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleEmojis = ['🩷', '💕', '💖', '💗', '🌸', '🌺', '✨', '💫', '🦋'];

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];

        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random animation duration and delay
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';

        // Append to container (fixed from previous error)
        particlesContainer.appendChild(particle);
    }
}


/* Fade animations */
function initializeAnimations() {
    document.querySelectorAll('.fade-in').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.2}s`;
    });
}

/* Scroll animations */
function setupScrollAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                if (entry.target.classList.contains('message-card')) {
                    animateMessageText();
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-aos], .section-title, .message-card')
        .forEach(el => observer.observe(el));
}

function animateMessageText() {
    document.querySelectorAll('.message-text').forEach((text, i) => {
        setTimeout(() => text.classList.add('fade-in-animate'), i * 500);
    });
}

/* Scroll */
function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* Likes */
function toggleLike(button) {
    const heart = button.querySelector('.heart-icon');
    button.classList.toggle('liked');

    heart.textContent = button.classList.contains('liked') ? '🩷' : '🤍';
}

/* Parallax */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const y = window.pageYOffset;

    if (hero) hero.style.transform = `translateY(${y * 0.3}px)`;

    document.querySelectorAll('.particle').forEach((p, i) => {
        p.style.transform = `translateY(${y * (0.1 + i * 0.02)}px)`;
    });
});