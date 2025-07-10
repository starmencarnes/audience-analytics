(async function () {
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

  // Wait until DOM is ready
  if (document.readyState === 'loading') {
    await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
  }

  // Fetch data.csv to get market list
  const response = await fetch('https://starmencarnes.github.io/audience-analytics/data.csv');
  const text = await response.text();
  const rows = text.trim().split('\n').slice(1); // Skip header

  rows.forEach(row => {
    const market = row.split(',')[0]?.trim();
    if (!market) return;

    const container = document.createElement('div');
    container.className = 'sixam-embed';
    container.dataset.market = market;
    document.body.appendChild(container);
  });

  // Load embed.js last
  const script = document.createElement('script');
  script.src = 'https://starmencarnes.github.io/audience-analytics/embed.js';
  script.defer = true;
  head.appendChild(script);
})();
