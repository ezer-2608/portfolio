const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Typing effect
const typing = document.getElementById('typing');
const words = ['Developer', 'Designer', 'Creator'];
let wordIndex = 0;
let charIndex = words[0].length;
let deleting = true;

function typeLoop() {
  const current = words[wordIndex];
  if (!deleting) {
    charIndex++;
    typing.textContent = current.slice(0, charIndex);
    if (charIndex >= current.length) {
      deleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    charIndex--;
    typing.textContent = current.slice(0, charIndex);
    if (charIndex <= 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(typeLoop, deleting ? 55 : 90);
}
setTimeout(typeLoop, 1400);

// Demo contact form: no backend, just UI feedback.
document.getElementById('contactForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = 'Đã nhận thông tin! Form hiện là bản demo giao diện.';
  event.currentTarget.reset();
});

// Active navigation link while scrolling
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.desktop-nav a')];
window.addEventListener('scroll', () => {
  const y = window.scrollY + 140;
  let current = 'home';
  sections.forEach(section => { if (y >= section.offsetTop) current = section.id; });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}, { passive: true });
