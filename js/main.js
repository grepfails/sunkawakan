'use strict';

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

if (cursor && cursorFollower) {
    let mx = 0, my = 0, fx = 0, fy = 0;
    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top  = my + 'px';
    });
    function followCursor() {
        fx += (mx - fx) * 0.1;
        fy += (my - fy) * 0.1;
        cursorFollower.style.left = fx + 'px';
        cursorFollower.style.top  = fy + 'px';
        requestAnimationFrame(followCursor);
    }
    followCursor();

    document.querySelectorAll('a, button, .clase-card, .coach-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.style.width  = '60px';
            cursorFollower.style.height = '60px';
            cursorFollower.style.borderColor = 'var(--lime)';
            cursor.style.background = 'var(--lime)';
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.style.width  = '36px';
            cursorFollower.style.height = '36px';
            cursorFollower.style.borderColor = 'var(--cyan)';
            cursor.style.background = 'var(--cyan)';
        });
    });
}

/* ============================================================
   NAV SCROLL STATE
   ============================================================ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

function toggleMenu(force) {
    const isOpen = force !== undefined ? force : !navLinks.classList.contains('open');
    hamburger.classList.toggle('open', isOpen);
    navLinks.classList.toggle('open', isOpen);
    nav.classList.toggle('menu-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

hamburger?.addEventListener('click', () => toggleMenu());

navLinks?.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
});

/* ============================================================
   COUNTING ANIMATION
   ============================================================ */
function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();
    function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
    }
    requestAnimationFrame(step);
}

const statEls = document.querySelectorAll('.stat__num');
let statsDone = false;
const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !statsDone) {
        statsDone = true;
        statEls.forEach(el => animateCount(el));
    }
}, { threshold: .5 });
if (statEls.length) statsObserver.observe(statEls[0].closest('.hero__stats'));

/* ============================================================
   CONTACT FORM
   ============================================================ */
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando…';
    btn.disabled = true;
    setTimeout(() => {
        form.style.display = 'none';
        formSuccess.style.display = 'flex';
    }, 1200);
});

/* ============================================================
   ACTIVE NAV LINK on scroll
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav__link:not(.nav__link--cta)');

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinksAll.forEach(l => {
                l.classList.toggle('active', l.getAttribute('href') === '#' + id);
            });
        }
    });
}, { threshold: .35 });
sections.forEach(s => sectionObserver.observe(s));
