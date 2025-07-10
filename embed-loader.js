(function () {
  // Select all embed containers
  const hosts = document.querySelectorAll('.sixam-embed');

  hosts.forEach(host => {
    const shadow = host.attachShadow({ mode: 'open' });

    // Inject styles
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = 'https://starmencarnes.github.io/audience-analytics/style.css';
    shadow.appendChild(styleLink);

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
    shadow.appendChild(fontLink);

    // Inner container to target per card
    const container = document.createElement('div');
    container.className = 'sixam-embed';
    container.dataset.market = host.dataset.market;
    shadow.appendChild(container);

    // Track all targets
    window.__sixamEmbedTargets = window.__sixamEmbedTargets || [];
    window.__sixamEmbedTargets.push(container);
  });

  // Load the main embed script once
  const script = document.createElement('script');
  script.src = 'https://starmencarnes.github.io/audience-analytics/embed.js';
  script.defer = true;
  document.head.appendChild(script);
})();
