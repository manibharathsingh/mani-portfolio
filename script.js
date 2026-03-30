/* ============================================================
   MANI BHARATH SINGH — PORTFOLIO
   script.js | Vanilla JS · No libraries
   ============================================================ */

'use strict';

/* ── 1. DOM REFERENCES ──────────────────────────────────────── */
const navbar      = document.getElementById('navbar');
const themeToggle = document.getElementById('themeToggle');
const hamburger   = document.getElementById('hamburger');
const navLinks    = document.getElementById('navLinks');
const htmlEl      = document.documentElement;

/* ── 2. THEME (DARK / LIGHT) ────────────────────────────────── */
(function initTheme () {
  const saved = localStorage.getItem('mbTheme') || 'dark';
  htmlEl.setAttribute('data-theme', saved);
})();

themeToggle.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('mbTheme', next);
});

/* ── 3. STICKY NAVBAR ───────────────────────────────────────── */
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── 4. MOBILE MENU ─────────────────────────────────────────── */
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu on nav link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  }
});

/* ── 5. SCROLL-REVEAL ───────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children inside same parent
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
        const delay    = siblings.indexOf(entry.target) * 80;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── 6. SKILL BAR ANIMATION ─────────────────────────────────── */
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          const target = bar.getAttribute('data-width') + '%';
          setTimeout(() => {
            bar.style.width = target;
          }, 300);
        });
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.skill-group').forEach(el => barObserver.observe(el));

/* ── 7. ACTIVE NAV LINK HIGHLIGHT ───────────────────────────── */
const sections    = document.querySelectorAll('section[id]');
const navAnchors  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.removeAttribute('style'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) {
          active.style.color    = 'var(--clr-text)';
          active.style.fontWeight = '700';
        }
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

/* ── 8. SMOOTH SCROLL POLYFILL (for older iOS) ──────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── 9. HERO TEXT TYPE EFFECT (subtle) ──────────────────────── */
(function heroTypeEffect () {
  const tagline = document.querySelector('.hero-tagline');
  if (!tagline) return;
  const text    = tagline.textContent;
  tagline.textContent = '';
  tagline.style.opacity = '1';
  tagline.style.transform = 'none';

  let i = 0;
  function type () {
    if (i < text.length) {
      tagline.textContent += text.charAt(i++);
      setTimeout(type, 30);
    }
  }

  // Start after a short delay so the name appears first
  setTimeout(type, 900);
})();

/* ── 10. CONSOLE EASTER EGG ─────────────────────────────────── */
console.log(
  '%c Mani Bharath Singh — Portfolio ',
  'background:#e8a045;color:#0d0f14;font-family:monospace;font-size:14px;padding:8px 16px;border-radius:4px;font-weight:bold;'
);
console.log('%c Built with pure HTML · CSS · JS', 'color:#7a808f;font-size:12px;');
