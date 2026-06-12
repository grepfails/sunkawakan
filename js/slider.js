'use strict';

/* ============================================================
   TESTIMONIOS SLIDER
   ============================================================ */
const cards = document.querySelectorAll('.testimonio-card:not(.testimonio-controls)');
const dots  = document.querySelectorAll('.dot-indicator');
const prev  = document.getElementById('prevTestimonio');
const next  = document.getElementById('nextTestimonio');

if (cards.length && prev && next) {
    let current = 0;

    function goTo(n) {
        cards[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (n + cards.length) % cards.length;
        cards[current].classList.add('active');
        dots[current].classList.add('active');
    }

    prev.addEventListener('click', () => goTo(current - 1));
    next.addEventListener('click', () => goTo(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    // Auto-advance every 6 seconds
    let autoplay = setInterval(() => goTo(current + 1), 6000);

    // Pause on interaction
    [prev, next, ...dots].forEach(el => {
        el.addEventListener('click', () => {
            clearInterval(autoplay);
            autoplay = setInterval(() => goTo(current + 1), 6000);
        });
    });

    // Touch / swipe support
    const slider = document.getElementById('testimoniosSlider');
    if (slider) {
        let startX = 0;
        slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
        slider.addEventListener('touchend', e => {
            const dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
        });
    }
}
