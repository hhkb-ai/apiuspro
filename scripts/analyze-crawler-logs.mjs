import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createInterface } from 'node:readline';

const files = process.argv.slice(2).filter(arg => arg !== '--');

if (files.length === 0) {
  console.error('Usage: pnpm analyze:crawlers -- <access.log> [more.log]');
  process.exit(1);
}

const crawlerPatterns = [
  ['Googlebot Smartphone', /Googlebot\/2\.1.*Mobile|Mobile.*Googlebot\/2\.1/i],
  ['Googlebot', /Googlebot/i],
  ['Bingbot', /bingbot/i],
  ['GPTBot', /GPTBot/i],
  ['ClaudeBot', /ClaudeBot/i],
  ['Applebot', /Applebot/i],
  ['PerplexityBot', /PerplexityBot/i],
  ['Bytespider', /Bytespider/i],
  ['CCBot', /CCBot/i],
];

const crawlerStats = new Map();
const statusStats = new Map();
const crawlerPathStats = new Map();
const errorRows = [];
const articleDirectoryHits = {
  tutorial: 0,
  app: 0,
  apiReview: 0,
  useCase: 0,
  blog: 0,
};

function increment(map, key, amount = 1) {
  map.set(key, (map.get(key) || 0) + amount);
}

function parseLine(line) {
  const match = line.match(/"([A-Z]+)\s+([^"\s]+)[^"]*"\s+(\d{3})\s+\S+.*"([^"]*)"$/);
  if (!match) return null;
  return {
    method: match[1],
    path: match[2],
    status: Number(match[3]),
    userAgent: match[4],
  };
}

function detectCrawler(userAgent) {
  return crawlerPatterns.find(([, pattern]) => pattern.test(userAgent))?.[0];
}

for (const file of files) {
  await stat(file);
  const lines = createInterface({
    input: createReadStream(file, { encoding: 'utf8' }),
    crlfDelay: Infinity,
  });

  for await (const line of lines) {
    const entry = parseLine(line);
    if (!entry) continue;

    const statusGroup = `${Math.floor(entry.status / 100)}xx`;
    increment(statusStats, statusGroup);

    const crawler = detectCrawler(entry.userAgent);
    if (crawler) {
      increment(crawlerStats, `${crawler}\t${entry.status}`);
      increment(crawlerPathStats, `${crawler}\t${entry.path}`);

      if (entry.path.startsWith('/tutorial')) articleDirectoryHits.tutorial += 1;
      if (entry.path.startsWith('/app')) articleDirectoryHits.app += 1;
      if (entry.path.startsWith('/api-review')) articleDirectoryHits.apiReview += 1;
      if (entry.path.startsWith('/use-case')) articleDirectoryHits.useCase += 1;
      if (entry.path.startsWith('/blog')) articleDirectoryHits.blog += 1;
    }

    if ([403, 404, 500].includes(entry.status)) {
      errorRows.push({
        status: entry.status,
        path: entry.path,
        crawler: crawler || '-',
      });
    }
  }
}

console.log('\nCrawler status frequency');
console.table(Array.from(crawlerStats.entries()).map(([key, count]) => {
  const [crawler, status] = key.split('\t');
  return { crawler, status, count };
}));

console.log('\nHTTP status groups');
console.table(Array.from(statusStats.entries()).map(([statusGroup, count]) => ({ statusGroup, count })));

console.log('\nArticle directory crawl depth');
console.table([articleDirectoryHits]);

console.log('\nCrawler path frequency top 50');
console.table(
  Array.from(crawlerPathStats.entries())
    .map(([key, count]) => {
      const [crawler, path] = key.split('\t');
      return { crawler, path, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 50),
);

console.log('\n403/404/500 errors top 100');
console.table(errorRows.slice(0, 100));
