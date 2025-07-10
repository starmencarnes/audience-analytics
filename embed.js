(async function () {
  const markets = document.querySelectorAll('.sixam-embed');

  const res = await fetch('https://starmencarnes.github.io/audience-analytics/data.csv');
  const csvText = await res.text();
  const rows = csvText.split('\n').slice(1).map(row => row.split(','));

  markets.forEach(container => {
    const market = container.dataset.market;
    const match = rows.find(r => r[0] === market); // assuming col[0] = Market Name
    if (!match) return;

    const [name, readers, openRate, ctaUrl, logoUrl] = match;
    const card = document.createElement('div');
    card.innerHTML = `
      <div style="border:1px solid #ccc; padding:16px; border-radius:8px; max-width:320px;">
        <img src="${logoUrl}" alt="${name}" style="width:100px; margin-bottom:8px;" />
        <h3>${name}</h3>
        <p><strong>${readers}</strong> daily readers</p>
        <p>Avg open rate: <strong>${openRate}%</strong></p>
        <a href="${ctaUrl}" target="_blank" style="color:#007AFF;">View media kit</a>
      </div>
    `;
    container.appendChild(card);
  });
})();
