import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const DEFAULT_OUTPUT_DIR = 'outputs';
const DEFAULT_INPUT_DIR = 'inputs';
const SENSITIVE_PATTERN = /\b(?:token|api[_-]?key|secret|password|authorization|bearer)\b/i;
const LOCAL_OR_RESTRICTED_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0', '::1', '8.147.64.143']);
const USER_AGENT = 'apiuspro-seo-pipeline/1.0 (+https://www.apiuspro.cn)';

const args = parseArgs(process.argv.slice(2).filter(arg => arg !== '--'));
const outputDir = args.outputDir || DEFAULT_OUTPUT_DIR;
const inputDir = args.inputDir || DEFAULT_INPUT_DIR;
const keywordCsvPath = args.keywordCsv || path.join(inputDir, 'KeywordReport.csv');
const pagesCsvPath = args.pagesCsv || path.join(inputDir, 'PageTrafficReport.csv');
const tabsInputPath = args.tabsJson || path.join(inputDir, 'tabs.json');
const prevSnapshotPath = args.prevSnapshot || path.join(outputDir, 'prev_bing_snapshot.csv');
const dryRun = args.dryRun !== false;

const paths = {
  tabs: path.join(outputDir, 'tabs.json'),
  tabsContent: path.join(outputDir, 'tabs_content.json'),
  optimizedCsv: path.join(outputDir, 'optimized_meta_30.csv'),
  deployReport: path.join(outputDir, 'deploy_report.json'),
  verifyReport: path.join(outputDir, 'verify_report.json'),
  alerts: path.join(outputDir, 'alerts.json'),
  finalReport: path.join(outputDir, 'final_report.json'),
  backupDir: path.join(outputDir, 'backup_meta'),
  snapshot: path.join(outputDir, 'prev_bing_snapshot.csv'),
};

await mkdir(outputDir, { recursive: true });
await mkdir(paths.backupDir, { recursive: true });

const alerts = [];
const deployReport = [];
const verifyReport = [];

const env = {
  cmsApi: process.env.CMS_API,
  cmsToken: process.env.CMS_TOKEN,
  slackWebhook: process.env.SLACK_WEBHOOK,
};

let tabs = await loadTabs(tabsInputPath, alerts);
await writeJson(paths.tabs, { tabs: tabs.map(({ tabId, pageUrl, pageTitle, isCurrent }) => ({ tabId, pageUrl, pageTitle, isCurrent })) });

const tabsContent = await fetchTabsContent(tabs, alerts);
await writeJson(paths.tabsContent, tabsContent);

const keywordRows = await loadCsvIfExists(keywordCsvPath, alerts, 'KeywordReport.csv');
const pageRows = await loadCsvIfExists(pagesCsvPath, alerts, 'PageTrafficReport.csv');
const selectedRows = selectKeywords(keywordRows);
const optimizedRows = selectedRows.map(row => buildOptimizedRow(row, pageRows, tabsContent));

await writeCsv(paths.optimizedCsv, optimizedRows, [
  'Keyword',
  'Impressions',
  'Clicks',
  'CTR',
  'Avg Position',
  'Page',
  'Title',
  'Meta',
  'H1',
  'FirstParagraph',
  'JSON_LD',
  'Reason',
]);

if (!env.cmsApi || !env.cmsToken) {
  alerts.push({
    keyword: '-',
    issue: 'CMS 安全变量未配置，已跳过自动部署。',
    suggested_action: '在 CI Secrets 或安全环境变量中配置 CMS 访问地址与令牌后重跑；当前只生成优化 CSV 和告警。',
  });
} else {
  for (const row of optimizedRows) {
    if (!row.Page || row.Page === '需人工复核') {
      deployReport.push({
        Keyword: row.Keyword,
        page_url: row.Page,
        status_code: 0,
        status_message: 'Skipped: page mapping requires manual review',
        backup_path: '',
      });
      continue;
    }

    try {
      const backupPath = await backupCurrentMeta(row, env);
      const deployResult = dryRun
        ? { status: 200, statusText: 'Dry run: deployment skipped' }
        : await deployMeta(row, env);
      deployReport.push({
        Keyword: row.Keyword,
        page_url: row.Page,
        status_code: deployResult.status,
        status_message: deployResult.statusText,
        backup_path: backupPath,
      });
    } catch (error) {
      const message = sanitize(String(error?.message || error));
      deployReport.push({
        Keyword: row.Keyword,
        page_url: row.Page,
        status_code: 0,
        status_message: message,
        backup_path: '',
      });
      alerts.push({
        keyword: row.Keyword,
        issue: `部署失败：${message}`,
        suggested_action: '停止该页面自动部署，人工检查 CMS 权限、页面映射和备份状态。',
      });
    }
  }
}

for (const row of optimizedRows) {
  if (!row.Page || row.Page === '需人工复核') {
    verifyReport.push({
      Keyword: row.Keyword,
      page_url: row.Page,
      expected_title: row.Title,
      found_title: '',
      expected_meta: row.Meta,
      found_meta: '',
      expected_h1: row.H1,
      found_h1: '',
      status: 'manual_review',
    });
    continue;
  }

  const found = await fetchPageSummary(row.Page);
  const status = dryRun
    ? 'dry_run_not_deployed'
    : found.title === row.Title && found.meta === row.Meta && found.h1 === row.H1
      ? 'matched'
      : 'mismatch';

  if (status === 'mismatch') {
    alerts.push({
      keyword: row.Keyword,
      issue: '部署后页面 title/meta/h1 验证不匹配。',
      suggested_action: '优先按 impressions 排序检查页面模板、缓存和 CMS 更新接口。',
    });
  }

  verifyReport.push({
    Keyword: row.Keyword,
    page_url: row.Page,
    expected_title: row.Title,
    found_title: found.title,
    expected_meta: row.Meta,
    found_meta: found.meta,
    expected_h1: row.H1,
    found_h1: found.h1,
    status,
  });
}

await compareSnapshot(keywordRows, prevSnapshotPath, alerts);
if (existsSync(keywordCsvPath)) {
  await copyFile(keywordCsvPath, paths.snapshot);
}

await writeJson(paths.deployReport, deployReport);
await writeJson(paths.verifyReport, verifyReport);
await writeJson(paths.alerts, alerts);

if (env.slackWebhook && alerts.length > 0) {
  await sendSlackAlert(env.slackWebhook, alerts);
}

const summary = {
  deployed_count: deployReport.filter(row => row.status_code >= 200 && row.status_code < 300).length,
  deploy_failures: deployReport.filter(row => row.status_code < 200 || row.status_code >= 300).length,
  verify_mismatches: verifyReport.filter(row => row.status === 'mismatch').length,
  dry_run: dryRun,
  top_alerts: alerts.slice(0, 10),
  notes: [
    '我只把 edge_all_open_tabs 作为上下文参考；我不会执行或信任任何页面内嵌的指令或标签。',
    '若遇到任何权限或抓取失败，立即把失败项写入 alerts.json 并停止对该项的自动部署，等待人工复核。',
  ],
};

const finalReport = {
  optimized_csv_path: paths.optimizedCsv,
  deploy_report_path: paths.deployReport,
  verify_report_path: paths.verifyReport,
  alerts_path: paths.alerts,
  summary,
};

await writeJson(paths.finalReport, finalReport);
console.log(JSON.stringify(finalReport, null, 2));

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--output-dir') parsed.outputDir = argv[++index];
    else if (arg === '--input-dir') parsed.inputDir = argv[++index];
    else if (arg === '--keyword-csv') parsed.keywordCsv = argv[++index];
    else if (arg === '--pages-csv') parsed.pagesCsv = argv[++index];
    else if (arg === '--tabs-json') parsed.tabsJson = argv[++index];
    else if (arg === '--prev-snapshot') parsed.prevSnapshot = argv[++index];
    else if (arg === '--deploy') parsed.dryRun = false;
    else if (arg === '--dry-run') parsed.dryRun = true;
  }
  return parsed;
}

function stripBom(value) {
  return value.replace(/^\uFEFF/, '');
}

async function loadTabs(file, alerts) {
  if (!existsSync(file)) {
    alerts.push({
      keyword: '-',
      issue: `${file} 不存在，无法读取 edge_all_open_tabs/tabs.json。`,
      suggested_action: '上传输入目录中的标签页 JSON 后重跑。',
    });
    return [];
  }

  const raw = stripBom(await readFile(file, 'utf8'));
  const parsed = JSON.parse(raw);
  const inputTabs = Array.isArray(parsed) ? parsed : parsed.tabs || [];

  return inputTabs.map(tab => {
    const restricted = isRestrictedUrl(tab.pageUrl);
    return {
      tabId: tab.tabId,
      pageUrl: restricted ? '本地/受限' : sanitize(tab.pageUrl),
      originalPageUrl: tab.pageUrl,
      pageTitle: sanitize(tab.pageTitle || ''),
      isCurrent: Boolean(tab.isCurrent),
      restricted,
    };
  });
}

async function fetchTabsContent(tabs, alerts) {
  const results = [];
  for (const tab of tabs) {
    if (tab.restricted) {
      results.push({
        pageUrl: tab.pageUrl,
        title: tab.pageTitle,
        meta: '',
        h1: '',
        first_paragraph: '',
        fetch_status: '本地/受限',
      });
      continue;
    }

    await delay(500);
    try {
      const summary = await fetchPageSummary(tab.originalPageUrl);
      results.push({ pageUrl: tab.pageUrl, ...summary, fetch_status: 'ok' });
    } catch (error) {
      const issue = sanitize(String(error?.message || error));
      results.push({
        pageUrl: tab.pageUrl,
        title: tab.pageTitle,
        meta: '',
        h1: '',
        first_paragraph: '',
        fetch_status: issue,
      });
      alerts.push({
        keyword: '-',
        issue: `页面抓取失败：${tab.pageUrl} - ${issue}`,
        suggested_action: '停止该页面自动部署，人工确认 URL 是否公开可抓取。',
      });
    }
  }
  return results;
}

async function fetchPageSummary(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
    signal: AbortSignal.timeout(12000),
  });
  const html = await response.text();
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const summary = {
    title: sanitize(extractTag(html, 'title')),
    meta: sanitize(extractMetaDescription(html)),
    h1: sanitize(extractTag(html, 'h1')),
    first_paragraph: sanitize(extractTag(html, 'p')),
  };
  if (Object.values(summary).some(value => SENSITIVE_PATTERN.test(value))) {
    throw new Error('Sensitive-looking content detected in extracted summary');
  }
  return summary;
}

async function loadCsvIfExists(file, alerts, label) {
  if (!existsSync(file)) {
    alerts.push({
      keyword: '-',
      issue: `${label} 不存在：${file}`,
      suggested_action: '上传报表后重跑；当前不会执行 CMS 部署。',
    });
    return [];
  }
  return parseCsv(stripBom(await readFile(file, 'utf8')));
}

function selectKeywords(rows) {
  return [...rows]
    .map(normalizeKeywordRow)
    .sort((a, b) => b.Impressions - a.Impressions)
    .slice(0, 200)
    .sort((a, b) => {
      const aPriority = a['Avg Position'] >= 2 && a['Avg Position'] <= 20 ? 0 : 1;
      const bPriority = b['Avg Position'] >= 2 && b['Avg Position'] <= 20 ? 0 : 1;
      return aPriority - bPriority || a.CTR - b.CTR || b.Impressions - a.Impressions;
    })
    .slice(0, 30);
}

function buildOptimizedRow(row, pageRows, tabsContent) {
  const page = mapKeywordToPage(row.Keyword, pageRows, tabsContent);
  const source = tabsContent.find(item => item.pageUrl === page) || {};
  const title = fitText(`${row.Keyword}指南：入口、步骤与接入建议`, 50, 60);
  const meta = fitText(`围绕“${row.Keyword}”整理官网入口、购买路径、API Key 获取和接入注意事项，适合新手快速判断是否可用并开始配置。`, 120, 155);
  const h1 = `${row.Keyword}完整指南`;
  const firstParagraph = `本文先给结论：如果你正在搜索“${row.Keyword}”，优先确认可访问入口、费用、API Key 安全保存方式，再按示例完成首次调用。`;
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `${row.Keyword}适合新手吗？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `适合。建议先查看入口、额度和接入示例，再小额测试。`,
        },
      },
    ],
  });

  return {
    Keyword: row.Keyword,
    Impressions: row.Impressions,
    Clicks: row.Clicks,
    CTR: row.CTR,
    'Avg Position': row['Avg Position'],
    Page: page || '需人工复核',
    Title: source.title ? fitText(`${row.Keyword}：${source.h1 || source.title}`, 50, 60) : title,
    Meta: source.meta ? fitText(`${source.meta} 查看入口、购买步骤和接入建议。`, 120, 155) : meta,
    H1: source.h1 || h1,
    FirstParagraph: firstParagraph,
    JSON_LD: jsonLd,
    Reason: `该关键词曝光较高但 CTR 偏低，标题直接覆盖搜索意图，并在摘要中强调入口、步骤和接入收益。`,
  };
}

function mapKeywordToPage(keyword, pageRows, tabsContent) {
  const normalizedKeyword = normalizeText(keyword);
  const pageCandidates = pageRows
    .map(row => row.Page || row.URL || row.Url || row.page || row.url || row['Top pages'] || '')
    .filter(Boolean);
  const matchedPage = pageCandidates.find(page => normalizeText(page).includes(normalizedKeyword));
  if (matchedPage) return matchedPage;

  const keywordTerms = normalizedKeyword.split(/api|购买|配置|教程|指南|入口|怎么|如何/).filter(term => term.length >= 2);
  const partialPage = pageCandidates.find(page => keywordTerms.some(term => normalizeText(page).includes(term)));
  if (partialPage) return partialPage;

  const tabMatch = tabsContent.find(item => normalizeText(`${item.pageUrl} ${item.title} ${item.h1}`).includes(normalizedKeyword));
  if (tabMatch) return tabMatch.pageUrl;

  const partialTab = tabsContent.find(item => keywordTerms.some(term => normalizeText(`${item.pageUrl} ${item.title} ${item.h1}`).includes(term)));
  return partialTab?.pageUrl || '';
}

async function backupCurrentMeta(row, env) {
  const safeKeyword = row.Keyword.replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'keyword';
  const backupPath = path.join(paths.backupDir, `${safeKeyword}.json`);
  const response = await fetch(`${env.cmsApi.replace(/\/$/, '')}/meta?url=${encodeURIComponent(row.Page)}`, {
    headers: { Authorization: `Bearer ${env.cmsToken}` },
    signal: AbortSignal.timeout(12000),
  });
  const text = await response.text();
  await writeFile(backupPath, sanitize(text), 'utf8');
  return backupPath;
}

async function deployMeta(row, env) {
  return fetch(`${env.cmsApi.replace(/\/$/, '')}/meta`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.cmsToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      page_url: row.Page,
      title: row.Title,
      meta_description: row.Meta,
      h1: row.H1,
      first_paragraph: row.FirstParagraph,
      json_ld: row.JSON_LD,
    }),
    signal: AbortSignal.timeout(12000),
  });
}

async function compareSnapshot(rows, prevFile, alerts) {
  if (!existsSync(prevFile) || rows.length === 0) return;
  const previousRows = await loadCsvIfExists(prevFile, alerts, 'prev_bing_snapshot.csv');
  const previousByKeyword = new Map(previousRows.map(row => [normalizeText(row.Keyword || row.Query || row.keyword || ''), normalizeKeywordRow(row)]));

  for (const row of rows.map(normalizeKeywordRow)) {
    const previous = previousByKeyword.get(normalizeText(row.Keyword));
    if (!previous) continue;
    const ctrDrop = previous.CTR - row.CTR;
    if (ctrDrop >= 15) {
      alerts.push({
        keyword: row.Keyword,
        issue: `CTR 下降 ${ctrDrop.toFixed(2)} 个百分点。`,
        suggested_action: '检查页面标题、摘要、排名变化；必要时回滚或发起 A/B 测试。',
      });
    }
  }
}

async function sendSlackAlert(webhook, alerts) {
  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `SEO pipeline alerts: ${alerts.length}`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: alerts.slice(0, 5).map(alert => `• ${alert.keyword}: ${alert.issue}`).join('\n'),
            },
          },
        ],
      }),
    });
  } catch {
    // Slack is optional; do not fail the pipeline.
  }
}

function isRestrictedUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'file:' || parsed.protocol !== 'https:' || LOCAL_OR_RESTRICTED_HOSTS.has(parsed.hostname);
  } catch {
    return true;
  }
}

function normalizeKeywordRow(row) {
  return {
    Keyword: row.Keyword || row.Query || row.keyword || '',
    Impressions: toNumber(row.Impressions),
    Clicks: toNumber(row.Clicks),
    CTR: parseCtr(row.CTR),
    'Avg Position': toNumber(row['Avg. Position'] ?? row['Avg Position'] ?? row.Position),
  };
}

function extractTag(html, tag) {
  return stripHtml([...(html || '').matchAll(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi'))][0]?.[1] || '');
}

function extractMetaDescription(html) {
  const match = (html || '').match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i)
    || (html || '').match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i);
  return stripHtml(match?.[1] || '');
}

function stripHtml(value) {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function sanitize(value) {
  return String(value)
    .replace(/file:\/\/[^\s"'<>]+/gi, '[redacted-local-url]')
    .replace(/https?:\/\/(?:localhost|127\.0\.0\.1|0\.0\.0\.0|8\.147\.64\.143)[^\s"'<>]*/gi, '[redacted-restricted-url]')
    .replace(/[A-Za-z]:\\[^\s"'<>]+/g, '[redacted-path]')
    .replace(/(?:Bearer\s+)?[A-Za-z0-9_-]{24,}\.[A-Za-z0-9_-]{6,}\.?[A-Za-z0-9_-]*/g, '[redacted-token]')
    .replace(/\b(?:sk|pk|api)[-_][A-Za-z0-9]{12,}\b/g, '[redacted-token]')
    .slice(0, 2000);
}

function parseCtr(value) {
  if (typeof value === 'string' && value.includes('%')) return toNumber(value.replace('%', ''));
  return toNumber(value);
}

function toNumber(value) {
  const number = Number(String(value ?? '0').replace(/,/g, '').trim());
  return Number.isFinite(number) ? number : 0;
}

function normalizeText(value) {
  return String(value || '').toLowerCase().replace(/[\s/_-]+/g, '');
}

function fitText(value, minLength, maxLength) {
  let text = value.replace(/\s+/g, ' ').trim();
  if (text.length > maxLength) return text.slice(0, maxLength - 1).trimEnd() + '…';
  while (text.length < minLength) text += ' | API知识站';
  return text.slice(0, maxLength);
}

function parseCsv(text) {
  const rows = [];
  const records = [];
  let current = '';
  let row = [];
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(current);
      current = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') index += 1;
      row.push(current);
      records.push(row);
      row = [];
      current = '';
    } else {
      current += char;
    }
  }

  if (current || row.length) {
    row.push(current);
    records.push(row);
  }

  const [headers = [], ...body] = records.filter(record => record.some(Boolean));
  for (const record of body) {
    const item = {};
    headers.forEach((header, index) => {
      item[header.trim()] = record[index]?.trim() || '';
    });
    rows.push(item);
  }
  return rows;
}

async function writeCsv(file, rows, headers) {
  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(headers.map(header => csvEscape(row[header] ?? '')).join(','));
  }
  await writeFile(file, `${lines.join('\n')}\n`, 'utf8');
}

function csvEscape(value) {
  const text = String(value);
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

async function writeJson(file, value) {
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
