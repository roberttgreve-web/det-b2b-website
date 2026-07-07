/* DEIN ERSTER TAG – gemeinsames JavaScript für alle Seiten.
   Alle Blöcke sind defensiv (prüfen erst, ob die Elemente existieren),
   damit dieselbe Datei auf jeder Seite eingebunden werden kann.
   Seitenspezifisches JS (Medien-Carousel, Video-Modal) bleibt inline auf der Seite. */
(() => {

  // ─── Scroll-Reveal mit IntersectionObserver ───
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // ─── Parallax on scroll ───
  const parallaxImages = document.querySelectorAll('.parallax-img');
  if (parallaxImages.length) {
    window.addEventListener('scroll', () => {
      parallaxImages.forEach(img => {
        const rect = img.closest('div').getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.07;
        img.style.transform = `translateY(${offset}px)`;
      });
    }, { passive: true });
  }

  // ─── FAQ-Akkordeon ───
  document.querySelectorAll('.faq-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const clickedAnswer = btn.nextElementSibling;
      const clickedIcon = btn.querySelector('.faq-icon');
      const clickedLabel = btn.querySelector('span');
      const isOpen = clickedAnswer.classList.contains('open');
      document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
      document.querySelectorAll('.faq-icon').forEach(i => { i.classList.remove('open'); i.style.color = ''; });
      document.querySelectorAll('.faq-trigger span').forEach(s => s.style.color = '');
      document.querySelectorAll('.faq-trigger').forEach(b => b.setAttribute('aria-expanded', 'false'));
      if (!isOpen) {
        clickedAnswer.classList.add('open');
        clickedIcon.classList.add('open');
        clickedIcon.style.color = '#00afd6';
        clickedLabel.style.color = '#00afd6';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ─── Inline-Video (Thumbnail → Iframe in gleicher Fläche) ───
  const playBtn = document.getElementById('hero-play-btn');
  const videoThumbnail = document.getElementById('video-thumbnail');
  const videoIframe = document.getElementById('video-iframe');
  if (playBtn && videoThumbnail && videoIframe) {
    playBtn.addEventListener('click', () => {
      videoIframe.src = 'https://www.youtube.com/embed/UreWfZDc9FM?si=9Det9V0G3NUSJgjY&autoplay=1';
      videoThumbnail.classList.add('hidden');
      videoIframe.classList.remove('hidden');
    });
  }

  // ─── Swipe-Carousel-Dots synchronisieren ───
  function syncDots(trackId, dotsSelector) {
    const track = document.getElementById(trackId);
    if (!track) return;
    const dots = document.querySelectorAll(dotsSelector);
    if (!dots.length) return;
    track.addEventListener('scroll', () => {
      const idx = Math.round(track.scrollLeft / track.clientWidth);
      dots.forEach((d, i) => {
        d.classList.toggle('bg-brand', i === idx);
        d.classList.toggle('bg-gray-300', i !== idx);
        d.classList.toggle('w-4', i === idx);
        d.classList.toggle('w-2', i !== idx);
      });
    }, { passive: true });
  }
  syncDots('medien-swipe', '.medien-dot');
  syncDots('steps-swipe', '.steps-dot');

  // ─── Mobile Nav (Hamburger) ───
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => { mobileMenu.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); });
    });
  }

  // ─── Nav-Schatten beim Scrollen ───
  const nav = document.querySelector('header');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('shadow-md', window.scrollY > 10);
    }, { passive: true });
  }

})();
