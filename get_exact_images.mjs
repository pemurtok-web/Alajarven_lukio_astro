async function checkImages(url, name) {
  console.log(`\n=== FETCHING ${name} (${url}) ===`);
  const res = await fetch(url);
  const html = await res.text();
  
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  let i = 0;
  while ((match = imgRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const src = match[1];
    const altMatch = fullTag.match(/alt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1] : '';
    if (!src.includes('svg') && !src.includes('logo') && !src.includes('icon')) {
      console.log(`IMG [${i++}]: src=${src} | alt=${alt}`);
    }
  }
}

async function run() {
  await checkImages('https://lukio.edualajarvi.fi/kansainv%C3%A4lisyys/jiyu-gakuen-tokio', 'Jiyu Gakuen');
  await checkImages('https://lukio.edualajarvi.fi/kansainv%C3%A4lisyys/mukawa-yhteisty%C3%B6', 'Mukawa');
}

run();
