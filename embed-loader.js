(function () {
  const host = document.querySelector('.sixam-embed');

  if (!host) return;

  // Create shadow root
  const shadow = host.attachShadow({ mode: 'open' });

  // Add CSS
  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.href = 'https://starmencarnes.github.io/audience-analytics/style.css';
  shadow.appendChild(styleLink);

  // Add font
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
  shadow.appendChild(fontLink);

  // Create target container
  const container = document.createElement('div');
  container.className = 'sixam-embed';
  container.dataset.market = host.dataset.market; // Carry over the market value
  shadow.appendChild(container);

  // Make this container available to embed.js
  window.__sixamEmbedTarget = container;

  // Load JS
  const script = document.createElement('script');
  script.src = 'https://starmencarnes.github.io/audience-analytics/embed.js';
  script.defer = true;
  shadow.appendChild(script);
})();
