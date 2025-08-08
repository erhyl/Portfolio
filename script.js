// Theme toggle with persistence
(function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') root.classList.add('dark');
  updateThemeIcon();
  toggle?.addEventListener('click', () => {
    root.classList.toggle('dark');
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const icon = toggle?.querySelector('i');
    if (!icon) return;
    icon.className = root.classList.contains('dark') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
})();

// Mobile menu toggle
(function initMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  toggle?.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav?.classList.toggle('open');
  });
  // Close on link click (mobile)
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    toggle?.classList.remove('active');
    nav?.classList.remove('open');
  }));
})();

// Smooth scroll and active link highlight
(function initScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (!id) return;
      const navLink = document.querySelector(`nav a[href="#${id}"]`);
      if (entry.isIntersecting) {
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        navLink?.classList.add('active');
      }
    });
  }, { threshold: 0.6 });
  sections.forEach(s => observer.observe(s));
})();

// Reveal on scroll for project cards
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  items.forEach(el => observer.observe(el));
})();

// Contact form: mailto fallback with simple validation
(function initContact() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const emailTo = 'erhyldheetoraja@gmail.com';
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !email || !message) {
      setStatus('Please fill in all fields.', true);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('Please enter a valid email address.', true);
      return;
    }
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    setStatus('Opening your email client...', false);
    form.reset();
  });

  function setStatus(msg, isError) {
    if (!status) return;
    status.textContent = msg;
    status.style.color = isError ? '#dc2626' : '#16a34a';
  }
})();

// Footer year
(function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();


