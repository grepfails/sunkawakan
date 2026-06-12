'use strict';

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-right');

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

/* ============================================================
   HERO: immediate reveal on load
   ============================================================ */
window.addEventListener('load', () => {
    const heroReveals = document.querySelectorAll('.hero .reveal-up, .hero .reveal-right');
    heroReveals.forEach((el, i) => {
        setTimeout(() => el.classList.add('is-visible'), i * 150 + 100);
    });
});

/* ============================================================
   PARALLAX – subtle hero stroke movement on scroll
   ============================================================ */
const strokes = document.querySelectorAll('.stroke');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    strokes.forEach((s, i) => {
        const speed = 0.08 + i * 0.04;
        s.style.transform = `rotate(${-8 + i * 3}deg) translateY(${scrollY * speed}px)`;
    });
}, { passive: true });

/* ============================================================
   CLASE CARDS – tilt on hover
   ============================================================ */
document.querySelectorAll('.clase-card:not(.clase-card--cta)').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - .5;
        const y = (e.clientY - rect.top)  / rect.height - .5;
        card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* ============================================================
   TICKER – pause on hover
   ============================================================ */
const ticker = document.querySelector('.ticker');
if (ticker) {
    ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
    ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
}
