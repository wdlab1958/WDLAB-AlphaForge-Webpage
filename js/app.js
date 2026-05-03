/* WDLAB-AlphaForge page interactions */
(function () {
  'use strict';

  // ---------- Smooth scroll + active sidebar item ----------
  const navItems = document.querySelectorAll('.nav-item');
  const sections = Array.from(document.querySelectorAll('main .section'));
  const sidebar = document.getElementById('sidebar');

  navItems.forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navItems.forEach((n) => n.classList.remove('active'));
      a.classList.add('active');
      if (window.innerWidth <= 720 && sidebar) sidebar.classList.remove('open');
    });
  });

  // ---------- Mobile menu toggle ----------
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (window.innerWidth > 720) return;
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }

  // ---------- Scroll spy ----------
  const setActiveByScroll = () => {
    const offset = 140;
    const y = window.scrollY + offset;
    let currentId = sections[0]?.id;
    for (const s of sections) {
      if (s.offsetTop <= y) currentId = s.id;
    }
    if (!currentId) return;
    let matched = false;
    navItems.forEach((n) => {
      const t = n.getAttribute('data-target') || (n.getAttribute('href') || '').replace('#', '');
      if (t === currentId && !matched) { n.classList.add('active'); matched = true; }
      else { n.classList.remove('active'); }
    });
  };

  // ---------- To-top button ----------
  const toTop = document.getElementById('toTop');
  const updateToTop = () => {
    if (!toTop) return;
    if (window.scrollY > 600) toTop.classList.add('show');
    else toTop.classList.remove('show');
  };
  if (toTop) {
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---------- Reveal-on-scroll (subtle) ----------
  const revealEls = document.querySelectorAll(
    '.card, .pillar, .principle, .agent, .stage-step, .gate, .strategy, .stat-card, .tl-item, .arch-cell, .arch-layer, .rule, .status-pill, .gap-list, .quote-banner, .token-card, .token-json'
  );
  revealEls.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));

  // ---------- Animated counters ----------
  const counters = document.querySelectorAll('.stat-number, .status-pill .num');
  const animate = (el) => {
    const raw = el.textContent.trim();
    // Skip non-numeric labels like "Stage 4" or "11/11"
    const target = parseInt(raw, 10);
    if (isNaN(target) || /[^0-9]/.test(raw.replace(/[+,]/g, ''))) {
      // For things like "11/11" or "Stage 4", leave as-is
      return;
    }
    const duration = 1100;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased);
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  };
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        cio.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((el) => cio.observe(el));

  // ---------- Single scroll handler ----------
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      setActiveByScroll();
      updateToTop();
      ticking = false;
    });
    ticking = true;
  }, { passive: true });

  setActiveByScroll();
  updateToTop();
})();
