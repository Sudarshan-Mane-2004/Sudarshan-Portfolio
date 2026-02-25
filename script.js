// Simple theme toggle and smooth scroll handling

const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

// Initialize theme
(function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    root.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.textContent = '🌙';
  } else {
    root.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.textContent = '☀️';
  }
})();

// Toggle theme
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
  });
}

// Smooth scroll for in-page nav links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.offsetTop - 70,
      behavior: 'smooth',
    });
  });
});

// Set current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
