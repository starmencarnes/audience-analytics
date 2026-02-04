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

  // Fetch both data.csv and meta.json to filter by brand color
  const [dataText, metaJson] = await Promise.all([
    fetch('https://starmencarnes.github.io/audience-analytics/data.csv').then(r => r.text()),
    fetch('https://starmencarnes.github.io/audience-analytics/meta.json').then(r => r.json())
  ]);

  const rows = dataText.trim().split('\n').slice(1); // Skip header

  // Create a map of markets with 6am-purple brand color
  const purpleMarkets = new Set(
    metaJson
      .filter(entry => entry['Brand Color'] === '6am-purple')
      .map(entry => entry['Market'])
  );

  // Find the insertion point - look for the 6AM City header anchor
  const insertionPoint = document.getElementById('6am-city-newsletters');

  // Find the target element
  const targetElement = insertionPoint ? (insertionPoint.closest('.LogoListB') || insertionPoint) : null;

  // Keep track of where to insert the next element
  let lastInserted = targetElement;

  // Only create containers for markets with 6am-purple brand color
  rows.forEach(row => {
    const market = row.split(',')[0]?.trim();
    if (!market || !purpleMarkets.has(market)) return;

    const container = document.createElement('div');
    container.className = 'sixam-embed';
    container.dataset.market = market;

    // Insert after the target element or the last inserted element
    if (lastInserted && lastInserted !== document.body) {
      lastInserted.insertAdjacentElement('afterend', container);
      lastInserted = container; // Update to insert next one after this
    } else {
      document.body.appendChild(container);
    }
  });

  // Note: embed.js will be loaded by embed-loader.js after all 6AM containers are created
})();
