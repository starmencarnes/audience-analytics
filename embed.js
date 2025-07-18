(async function () {
  console.log("📦 embed.js is running...");

  const markets = document.querySelectorAll('.sixam-embed');
  console.log("Attempting to load meta.json and data.csv...");

  const [metaJson, dataText] = await Promise.all([
    fetch('https://starmencarnes.github.io/audience-analytics/meta.json').then(r => r.json()),
    fetch('https://starmencarnes.github.io/audience-analytics/data.csv').then(r => r.text())
  ]);

  console.log("Loaded meta.json:", metaJson.slice(0, 1));
  console.log("Loaded data.csv:", dataText.slice(0, 100));

  const parseCSV = text =>
    text
      .trim()
      .split('\n')
      .map(line => line.trim().split(','))
      .filter(row => row.length > 1 && row.some(cell => cell.trim() !== ''));

  const [dataHeaders, ...dataRows] = parseCSV(dataText);

  const metaMap = Object.fromEntries(
    metaJson.map(entry => [entry['Market'], entry])
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

    const subs = Number(get(dataHeaders, dataRow, 'Subscribers')).toLocaleString();
    const rawOpenRate = get(dataHeaders, dataRow, 'Open Rate');
    const openRate = rawOpenRate ? `${Math.round(parseFloat(rawOpenRate))}%` : '';
    const impressions = Number(get(dataHeaders, dataRow, 'Avg NL Impressions')).toLocaleString();
    const social = Number(get(dataHeaders, dataRow, 'Social Followers')).toLocaleString();
    const ig = Number(get(dataHeaders, dataRow, 'IG Followers')).toLocaleString();
    const fb = Number(get(dataHeaders, dataRow, 'FB Followers')).toLocaleString();


    const totalAudience = (
      parseInt(subs.replace(/,/g, '') || '0', 10) +
      parseInt(social.replace(/,/g, '') || '0', 10)
    ).toLocaleString();

    const colorClass = `theme-${meta['Brand Color']?.toLowerCase() || 'default'}`;

    const card = document.createElement('div');
    card.className = `analytics-sixam-card ${colorClass}`;
    card.id = mkt;
    card.innerHTML = `
      <img class="analyticslogo" src="https://starmencarnes.github.io/audience-analytics/logos/${mkt}_PrimaryColor-Transparent-1000x1000.png" alt="${mkt} logo" />
      <div class="analytics-city-name">${meta['City Name']}</div>
      <div class="analytics-launch-date">Launched ${meta['Launch Date']}</div>
      <a href="${meta['Audience Profile URL']}" target="_blank" class="analytics-cta-button">Audience Profile</a>
    
      <div class="audience-box">
        <div class="audience-title">Total Audience: ${totalAudience}</div>
        <div class="audience-columns">
          <div class="audience-section">
            <h4>Newsletter 📬</h4>
            <p><span class="analytics-label">Subscribers</span><br><span class="analytics-value">${subs}</span></p>
            <p><span class="analytics-label">Avg Open Rate</span><br><span class="analytics-value">${openRate}</span></p>
            <p><span class="analytics-label">Avg Daily Impressions</span><br><span class="analytics-value">${impressions}</span></p>
          </div>
          <div class="audience-section">
            <h4>Social Media 📱</h4>
            <p><span class="analytics-label">Total Social Following</span><br><span class="analytics-value">${social}</span></p>
            <p><span class="analytics-label">Instagram Following</span><br><span class="analytics-value">${ig}</span></p>
            <p><span class="analytics-label">Facebook Following</span><br><span class="analytics-value">${fb}</span></p>
          </div>
        </div>
      </div>
    `;

    // Create and insert anchor tag
    const anchor = document.createElement('a');
    anchor.className = 'AnchorLink';
    const anchorId = mkt === "6AM City" ? mkt : `${mkt}today`;
    anchor.id = anchorId;
    anchor.name = anchorId;
    anchor.setAttribute('data-cms-ai', '0');
    anchor.setAttribute('aria-label', 'Open this option');
    anchor.setAttribute('data-uw-rm-empty-ctrl', '');
    
    container.appendChild(anchor);
    container.appendChild(card);
  });

  // Move all embeds above the footer, if one exists
  const footer = document.querySelector('footer');
  const embeds = document.querySelectorAll('.sixam-embed');
  
  if (footer) {
    embeds.forEach(embed => {
      if (footer.parentNode.contains(embed)) {
        footer.parentNode.insertBefore(embed, footer);
      }
    });
  }

  window.requestAnimationFrame(() => {
  const anchor = window.location.hash?.substring(1);
  if (anchor) {
    const target = document.getElementById(anchor);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});
  
})();
