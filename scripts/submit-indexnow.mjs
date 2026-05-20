const host = 'apiuspro.cn';
const key = '7e0fb047ba114379b2991b59347c3b61';
const keyLocation = `https://${host}/${key}.txt`;
const sitemapUrl = `https://${host}/sitemap.xml`;
const endpoint = 'https://api.indexnow.org/indexnow';
const priorityUrls = [
  `https://${host}`,
  `https://${host}/cloud-api`,
  `https://${host}/tutorial`,
  `https://${host}/api-review`,
  `https://${host}/app`,
  `https://${host}/app/ccswitch`,
  `https://${host}/api/deepseek`,
  `https://${host}/tutorial/deepseek`,
  `https://${host}/error`,
];
const args = process.argv.slice(2).filter(arg => arg !== '--');
const dryRun = args.includes('--dry-run');
const explicitUrls = args.filter(arg => arg !== '--dry-run');

let urls = explicitUrls;

if (urls.length === 0) {
  console.log(`Fetching sitemap: ${sitemapUrl}`);
  const sitemapResponse = await fetch(sitemapUrl);

  if (!sitemapResponse.ok) {
    throw new Error(`Failed to fetch sitemap: ${sitemapResponse.status} ${sitemapResponse.statusText}`);
  }

  const sitemapXml = await sitemapResponse.text();
  const sitemapUrls = Array.from(sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g), match => match[1]);
  urls = [sitemapUrl, ...priorityUrls, ...sitemapUrls];
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
  console.log(`Endpoint: ${endpoint}`);
  console.log(`Key location: ${keyLocation}`);
  console.log(urls.join('\n'));
} else {
  console.log(`Submitting ${urls.length} URLs to IndexNow.`);
  console.log(`Endpoint: ${endpoint}`);
  console.log(`Key location: ${keyLocation}`);

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

  console.log(`IndexNow submission accepted: ${response.status} ${response.statusText}`);
  console.log(`Submitted ${urls.length} URLs to IndexNow.`);
}
