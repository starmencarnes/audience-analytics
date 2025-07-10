(async function () {
  const markets = document.querySelectorAll('.sixam-embed');

  // Fetch your CSV file (hosted via GitHub Pages)
  const res = await fetch('https://starmencarnes.github.io/audience-analytics/data.csv');
  const csvText = await res.text();

  // Basic CSV parsing — split into rows, then columns
  const rows = csvText.split('\n').map(r => r.split(',')).filter(r => r.length > 1);
  const headers = rows[0];
  const data = rows.slice(1);

  markets.forEach(container => {
    const marketCode = container.dataset.market;
    const match = data.find(row => row[0].trim() === marketCode); // assuming first column = market

    if (!match) return;

    // Extract values by header index
    const get = label => match[headers.indexOf(label)]?.trim() || '';

    const marketName = get('Market');
    const launchDate = get('Launch Date');
    const subscribers = get('Subscribers');
    const openRate = get('Open Rate');
    const impressions = get('Avg NL Impressions');
    const social = get('Social Followers');
    const ctaUrl = get('Audience Profile URL');

    // Build dynamic logo path
    const logoPath = `logos/${marketCode}_PrimaryColor-Transparent-1000x1000.png`;

    // Create the card
    const card = document.createElement('div');
    card.className = 'sixam-card';
    card.id = marketCode;
    card.innerHTML = `
      <img class="logo" src="${logoPath}" alt="${marketName} logo" />
      <h2>${marketName}</h2>
      <div class="launch-date">Launched ${launchDate}</div>
      <a href="${ctaUrl}" target="_blank" class="cta-button">Audience Profile</a>

      <div class="audience-box">
        <div class="audience-title">Total Audience:</div>
        <div class="audience-grid">
          <div class="label">📬 Subscribers</div>      <div class="value">${subscribers}</div>
          <div class="label">📈 Open Rate</div>         <div class="value">${openRate}</div>
          <div class="label">👀 Impressions</div>       <div class="value">${impressions}</div>
          <div class="label">📱 Social Followers</div>  <div class="value">${social}</div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
})();
