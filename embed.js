(async function () {
  console.log("📦 embed.js is running...");

  const markets = document.querySelectorAll('.sixam-embed');
  console.log("Attempting to load meta.csv and data.csv...");

  const [metaText, dataText] = await Promise.all([
    fetch('https://starmencarnes.github.io/audience-analytics/meta.csv').then(r => r.text()),
    fetch('https://starmencarnes.github.io/audience-analytics/data.csv').then(r => r.text())
  ]);

  console.log("Loaded meta.csv:", metaText.slice(0, 100));
  console.log("Loaded data.csv:", dataText.slice(0, 100));

  const parseCSV = text =>
    text.split('\n').map(r => r.split(',')).filter(r => r.length > 1);

  const [metaHeaders, ...metaRows] = parseCSV(metaText);
  const [dataHeaders, ...dataRows] = parseCSV(dataText);

  const metaMap = Object.fromEntries(
    metaRows.map(row => {
      const entry = {};
      metaHeaders.forEach((key, i) => (entry[key.trim()] = row[i]?.trim()));
      return [entry['MKT'], entry];
    })
  );

  markets.forEach(container => {
    const mkt = container.dataset.market;
    const dataRow = dataRows.find(r => r[0].trim() === mkt);
    const meta = metaMap[mkt];

    console.log("👉 Rendering for market:", mkt);
    if (!dataRow || !meta) {
      console.warn(`⚠️ Missing data for market: ${mkt}`);
      return;
    }

    const get = (headers, row, label) =>
      row[headers.indexOf(label)]?.trim() || '';

    const subs = get(dataHeaders, dataRow, 'Subscribers');
    const openRate = get(dataHeaders, dataRow, 'Open Rate');
    const impressions = get(dataHeaders, dataRow, 'Avg NL Impressions');
    const social = get(dataHeaders, dataRow, 'Social Followers');
    const ig = get(dataHeaders, dataRow, 'IG Followers');
    const fb = get(dataHeaders, dataRow, 'FB Followers');

    const totalAudience = (
      parseInt(subs.replace(/,/g, '') || '0', 10) +
      parseInt(social.replace(/,/g, '') || '0', 10)
    ).toLocaleString();


    const colorClass = `theme-${meta['Brand Color']?.toLowerCase() || 'default'}`;

    const card = document.createElement('div');
    card.className = `sixam-card ${colorClass}`;
    card.id = `${mkt}today`;
    card.innerHTML = `
      <img class="logo" src="logos/${mkt}_PrimaryColor-Transparent-1000x1000.png" alt="${mkt} logo" />
      <h2>${mkt}today</h2>
      <div class="city-name">${meta['City Name']}</div>
      <div class="launch-date">Launched ${meta['Launch Date']}</div>
      <a href="${meta['Audience Profile URL']}" target="_blank" class="cta-button">Audience Profile</a>

      <div class="audience-box">
        <div class="audience-title">Total Audience: ${totalAudience}</div>
        <div class="audience-columns">
          <div class="audience-section">
            <h4>Newsletter 📬</h4>
            <p><span class="label">Subscribers</span><br><span class="value">${subs}</span></p>
            <p><span class="label">Avg Open Rate</span><br><span class="value">${openRate}</span></p>
            <p><span class="label">Avg Daily Impressions</span><br><span class="value">${impressions}</span></p>
          </div>
          <div class="audience-section">
            <h4>Social Media 📱</h4>
            <p><span class="label">Total Social Following</span><br><span class="value">${social}</span></p>
            <p><span class="label">Instagram Following</span><br><span class="value">${ig}</span></p>
            <p><span class="label">Facebook Following</span><br><span class="value">${fb}</span></p>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
})();
