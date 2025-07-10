(function () {
  const head = document.head;

  // Load font
  const font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
  head.appendChild(font);

  // Load CSS
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = 'https://starmencarnes.github.io/audience-analytics/style.css';
  head.appendChild(style);

  // Load JS
  const script = document.createElement('script');
  script.src = 'https://starmencarnes.github.io/audience-analytics/embed.js';
  script.defer = true;
  head.appendChild(script);
})();
