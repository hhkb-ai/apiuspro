const host = 'apiuspro.cn';
const key = '7e0fb047ba114379b2991b59347c3b61';
const keyLocation = `https://${host}/${key}.txt`;
const sitemapUrl = `https://${host}/sitemap.xml`;
const endpoint = 'https://api.indexnow.org/indexnow';
const args = process.argv.slice(2).filter(arg => arg !== '--');
const dryRun = args.includes('--dry-run');
const explicitUrls = args.filter(arg => arg !== '--dry-run');

let urls = explicitUrls;

if (urls.length === 0) {
  const sitemapResponse = await fetch(sitemapUrl);

  if (!sitemapResponse.ok) {
    throw new Error(`Failed to fetch sitemap: ${sitemapResponse.status} ${sitemapResponse.statusText}`);
  }

  const sitemapXml = await sitemapResponse.text();
  urls = Array.from(sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g), match => match[1]);
}

if (urls.length === 0) {
  throw new Error('No URLs provided and no URLs found in sitemap.xml');
}

urls = Array.from(new Set(urls));

if (urls.some(url => !url.startsWith(`https://${host}/`) && url !== `https://${host}`)) {
  throw new Error(`All URLs must belong to https://${host}`);
}

if (dryRun) {
  console.log(`Dry run: ${urls.length} URLs ready for IndexNow.`);
  console.log(urls.join('\n'));
} else {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      host,
      key,
      keyLocation,
      urlList: urls,
    }),
  });

  const body = await response.text();

  if (!response.ok) {
    throw new Error(`IndexNow submission failed: ${response.status} ${response.statusText}${body ? ` - ${body}` : ''}`);
  }

  console.log(`Submitted ${urls.length} URLs to IndexNow.`);
}
