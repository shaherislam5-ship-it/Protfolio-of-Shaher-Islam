/* Shaher portfolio — small, dependency-free interactions */
(function () {
  'use strict';

  var WA_NUMBER = '8801871768318';           // +880 1871-768318
  var EMAIL = 'shaherislam5@gmail.com';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Footer year */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Mobile menu */
  var menuBtn = document.querySelector('.menu-btn');
  var links = document.getElementById('nav-links');
  function setMenu(open) {
    if (!menuBtn || !links) return;
    links.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (menuBtn && links) {
    menuBtn.addEventListener('click', function () { setMenu(!links.classList.contains('open')); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.site-header')) setMenu(false);
    });
  }

  /* Header state, scroll progress, floating WhatsApp button */
  var header = document.querySelector('.site-header');
  var bar = document.querySelector('.progress');
  var fab = document.querySelector('.fab');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle('scrolled', y > 8);
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    if (fab) fab.classList.toggle('show', y > 640);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* Highlight current section in nav (homepage only) */
  var navAnchors = links ? links.querySelectorAll('a[href^="#"]') : [];
  if (navAnchors.length && 'IntersectionObserver' in window) {
    var map = {};
    navAnchors.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          navAnchors.forEach(function (a) { a.classList.remove('active'); });
          map[en.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* Pointer tilt on the hero portrait (desktop, fine pointer only) */
  var visual = document.querySelector('.hero-visual');
  var tilt = document.querySelector('.tilt');
  if (visual && tilt && !reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    visual.addEventListener('pointermove', function (e) {
      var r = visual.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = 'rotateY(' + (x * 8).toFixed(2) + 'deg) rotateX(' + (-y * 8).toFixed(2) + 'deg)';
    });
    visual.addEventListener('pointerleave', function () { tilt.style.transform = ''; });
  }

  /* Lightbox */
  var lb = document.getElementById('lightbox');
  if (lb && typeof lb.showModal === 'function') {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('p');
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        lbImg.src = btn.getAttribute('data-full');
        lbImg.alt = btn.getAttribute('data-alt') || '';
        lbCap.textContent = btn.getAttribute('data-caption') || '';
        lb.showModal();
      });
    });
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.closest('.lb-close')) lb.close();
    });
  }

  /* Contact form → WhatsApp or email (static site, no backend needed) */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');
    function val(name) { return (form.elements[name].value || '').trim(); }
    function validate() {
      var ok = true;
      ['name', 'message'].forEach(function (n) {
        var el = form.elements[n];
        var err = document.getElementById('err-' + n);
        var bad = !el.value.trim();
        el.setAttribute('aria-invalid', String(bad));
        if (err) err.classList.toggle('show', bad);
        if (bad && ok) { el.focus(); }
        if (bad) ok = false;
      });
      return ok;
    }
    function compose() {
      var lines = ['Hi Shaher, I\u2019m ' + val('name') + '.'];
      if (val('business')) lines.push('Business / website: ' + val('business'));
      if (val('service')) lines.push('I\u2019m interested in: ' + val('service'));
      if (val('budget')) lines.push('Monthly ad budget: ' + val('budget'));
      lines.push('', val('message'));
      return lines.join('\n');
    }
    function send(channel) {
      if (!validate()) { status.textContent = ''; return; }
      var text = compose();
      if (channel === 'wa') {
        window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
        status.textContent = 'Opening WhatsApp with your message ready to send.';
      } else {
        var subject = 'Project enquiry from ' + val('name');
        window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
        status.textContent = 'Opening your email app with the message filled in.';
      }
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); send('wa'); });
    var mailBtn = document.getElementById('send-mail');
    if (mailBtn) mailBtn.addEventListener('click', function () { send('mail'); });
    form.addEventListener('input', function (e) {
      if (e.target.getAttribute('aria-invalid') === 'true' && e.target.value.trim()) {
        e.target.setAttribute('aria-invalid', 'false');
        var err = document.getElementById('err-' + e.target.name);
        if (err) err.classList.remove('show');
      }
    });
  }
})();
