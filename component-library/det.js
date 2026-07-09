/* ══════════════════════════════════════════════════════════════
   DEIN ERSTER TAG – Komponenten-JavaScript
   Optional. Nur nötig für interaktive Komponenten (FAQ, Mobile-Nav,
   Scroll-Reveal). Defensiv: läuft nur, wenn die Hooks im DOM sind.
   Einbinden mit <script src="det.js" defer></script>.
   ══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  /* ── FAQ-Akkordeon ── */
  document.querySelectorAll('.det-faq').forEach((faq) => {
    faq.querySelectorAll('.det-faq__trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.det-faq__item');
        const wasOpen = item.classList.contains('is-open');
        // Nur ein Item gleichzeitig offen
        faq.querySelectorAll('.det-faq__item.is-open').forEach((el) => {
          el.classList.remove('is-open');
          const t = el.querySelector('.det-faq__trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  /* ── Mobile-Navigation ── */
  const navToggle = document.querySelector('[data-det-nav-toggle]');
  const mobileMenu = document.querySelector('[data-det-mobile-menu]');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Content-Formats-Carousel ── */
  document.querySelectorAll('[data-det-carousel]').forEach((root) => {
    const items = root.querySelectorAll('.det-carousel__item');
    const imgs = root.querySelectorAll('.det-carousel__img');
    if (!items.length) return;
    const AUTO_DELAY = 4000;
    let index = 0;
    let token = 0;
    let timerId = null;

    function activate(i, autoAdvance = true) {
      index = i;
      token++;
      clearTimeout(timerId);

      imgs.forEach((img) => {
        img.classList.toggle('is-active', +img.dataset.carouselImg === i);
      });
      items.forEach((item, idx) => {
        item.classList.toggle('is-active', idx === i);
        item.setAttribute('aria-pressed', idx === i ? 'true' : 'false');
        const bar = item.querySelector('.det-carousel__bar-fill');
        if (bar) { bar.style.transition = 'none'; bar.style.width = '0%'; }
      });

      if (autoAdvance) runProgress();
    }

    function runProgress() {
      const t = token;
      const bar = items[index].querySelector('.det-carousel__bar-fill');
      if (!bar) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (t !== token) return;
          bar.style.transition = `width ${AUTO_DELAY}ms linear`;
          bar.style.width = '100%';
        });
      });
      timerId = setTimeout(() => {
        if (t !== token) return;
        activate((index + 1) % items.length);
      }, AUTO_DELAY);
    }

    items.forEach((item, idx) => {
      item.addEventListener('click', () => activate(idx, true));
      item.addEventListener('mouseenter', () => activate(idx, false));
    });
    root.addEventListener('mouseleave', () => activate(index, true));

    activate(0);
  });

  /* ── Video-Embed (Blue-Section, Thumbnail → Iframe) ──
     Die Embed-URL steht in data-embed-src auf dem Play-Button, damit sie
     ohne JS-Änderung im Page-Builder konfiguriert werden kann.
     WICHTIG: Das <iframe> im Markup darf KEIN src (auch kein src="")
     haben, bevor geklickt wurde. src="" lässt Chrome die aktuelle Seite
     rekursiv in sich selbst nachladen (Endlos-Reload, Seite wird blank/
     hängt). src erst hier per JS setzen. */
  document.querySelectorAll('.det-video-embed__stage').forEach((stage) => {
    const trigger = stage.querySelector('[data-det-video-trigger]');
    const thumb = stage.querySelector('.det-video-embed__thumb');
    const iframe = stage.querySelector('.det-video-embed__iframe');
    if (!trigger || !iframe) return;
    trigger.addEventListener('click', () => {
      const src = trigger.getAttribute('data-embed-src');
      if (src) iframe.src = src;
      iframe.hidden = false;
      if (thumb) thumb.hidden = true;
    });
  });

  /* ── Tab-Bar ──
     Schaltet nur den aktiven Zustand der Tabs um. Optional: trägt jeder
     Tab ein data-tab-target, das zu einem data-tab-panel im selben
     [data-det-tabs-scope] passt, werden die Panels automatisch ein-/
     ausgeblendet (sonst kümmert sich der Page-Builder selbst darum). */
  document.querySelectorAll('.det-tabs').forEach((tabs) => {
    const items = tabs.querySelectorAll('.det-tabs__item');
    const scope = tabs.closest('[data-det-tabs-scope]');
    items.forEach((item) => {
      item.addEventListener('click', () => {
        items.forEach((i) => i.classList.remove('is-active'));
        item.classList.add('is-active');
        const target = item.getAttribute('data-tab-target');
        if (target && scope) {
          scope.querySelectorAll('[data-tab-panel]').forEach((panel) => {
            panel.hidden = panel.getAttribute('data-tab-panel') !== target;
          });
        }
      });
    });
  });

  /* ── Scroll-Reveal ── */
  const revealEls = document.querySelectorAll('.det-reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    // Kein IO verfügbar → Inhalte sofort sichtbar
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
})();
