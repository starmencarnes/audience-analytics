(function () {
  const host = document.querySelector('.sixam-embed');

  if (!host) return;

  // Create shadow root
  const shadow = host.attachShadow({ mode: 'open' });

  // Add your style sheet
  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.href = 'https://starmencarnes.github.io/audience-analytics/style.css';
  shadow.appendChild(styleLink);

  // Add Google Fonts (optional)
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
  shadow.appendChild(fontLink);

  // Add your embed container (will be populated later)
  const container = document.createElement('div');
  container.className = 'sixam-embed-inner';
  shadow.appendChild(container);

  // Inject the script
  const script = document.createElement('script');
  script.src = 'https://starmencarnes.github.io/audience-analytics/embed.js';
  script.defer = true;
  script.onload = () => {
    // Make the embed.js use the shadow DOM container
    window.__sixamEmbedTarget = container;
  };
  shadow.appendChild(script);
})();
