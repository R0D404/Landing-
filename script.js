// ===== NAVBAR HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Cerrar menú al hacer click en un link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SCROLL ACTIVO EN NAV =====
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ===== ANIMACIÓN DE ENTRADA CON IntersectionObserver =====
const animTargets = document.querySelectorAll('.card, .skill-item, .hero-img, .hero-text');

animTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const appearObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 80 * i);
      appearObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animTargets.forEach(el => appearObserver.observe(el));

// ===== FOTO: fallback si no existe foto.jpg =====
const pic = document.getElementById('profilePic');
pic.addEventListener('error', () => {
  pic.style.display = 'none';
  const placeholder = document.createElement('div');
  placeholder.textContent = 'RGM';
  placeholder.style.cssText = `
    width:220px; height:220px; border-radius:50%;
    background:linear-gradient(135deg,#00c2ff,#7b2fff);
    display:flex; align-items:center; justify-content:center;
    font-size:3rem; font-weight:800; color:#fff;
    border:3px solid #00c2ff;
    box-shadow:0 0 30px rgba(0,194,255,0.25);
  `;
  pic.parentElement.appendChild(placeholder);
});
