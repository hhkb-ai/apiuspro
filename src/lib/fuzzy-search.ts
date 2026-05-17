const aliasEntries: Array<[string, string[]]> = [
  ['openai', ['open ai', 'gpt', 'chatgpt', 'gtp', 'oai']],
  ['claude', ['克劳德', 'anthropic', 'claud', 'cloude']],
  ['deepseek', ['deep seek', '深度求索', 'ds', 'deepsek']],
  ['aliyun', ['阿里', '阿里云', '通义', '通义千问', 'qwen', 'dashscope', '百炼']],
  ['zhipu', ['智谱', 'glm', 'bigmodel']],
  ['kimi', ['月之暗面', 'moonshot']],
  ['tencent', ['腾讯', '混元', 'hunyuan']],
  ['doubao', ['豆包', '字节', '火山', '火山方舟']],
  ['gemini', ['google', '谷歌', 'gemni', 'gemeini']],
  ['mimo', ['小米', 'mi mo']],
  ['ccswitch', ['cc switch', 'cc-switch', '模型切换', '配置切换']],
  ['claude-code', ['claude code', 'claudecode', '克劳德代码']],
  ['openclaw', ['open claw', 'openc law']],
  ['hermes-agent', ['hermes', 'hermes agent', 'nous', 'nousresearch', 'mcp client', 'agent']],
  ['llm-wiki', ['llm wiki', 'wiki', '知识库']],
  ['local-deploy', ['本地部署', 'ollama', '离线', '私有化']],
];

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[·・\-_—–/\\|,，.。:：;；()[\]{}'"“”‘’`~!！?？\s]+/g, '');
}

function expandQueryTerms(query: string) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return [];

  const terms = new Set([normalizedQuery]);
  for (const [canonical, aliases] of aliasEntries) {
    const normalizedCanonical = normalizeSearchText(canonical);
    const normalizedAliases = aliases.map(normalizeSearchText);
    if ([normalizedCanonical, ...normalizedAliases].some(alias => alias.includes(normalizedQuery) || normalizedQuery.includes(alias))) {
      terms.add(normalizedCanonical);
      normalizedAliases.forEach(alias => terms.add(alias));
    }
  }

  return Array.from(terms);
}

function isSubsequence(needle: string, haystack: string) {
  if (!needle) return false;
  let needleIndex = 0;
  for (const char of haystack) {
    if (char === needle[needleIndex]) {
      needleIndex += 1;
      if (needleIndex === needle.length) return true;
    }
  }
  return false;
}

export function fuzzyScore(query: string, fields: Array<string | undefined | null>) {
  const terms = expandQueryTerms(query);
  if (terms.length === 0) return 0;

  const normalizedFields = fields
    .filter((field): field is string => Boolean(field))
    .map(normalizeSearchText)
    .filter(Boolean);

  if (normalizedFields.length === 0) return 0;

  let bestScore = 0;
  for (const term of terms) {
    for (const field of normalizedFields) {
      if (field === term) bestScore = Math.max(bestScore, 100);
      else if (field.startsWith(term)) bestScore = Math.max(bestScore, 85);
      else if (field.includes(term)) bestScore = Math.max(bestScore, 70);
      else if (term.length >= 2 && isSubsequence(term, field)) bestScore = Math.max(bestScore, 45);
    }
  }

  return bestScore;
}

export function fuzzyMatches(query: string, fields: Array<string | undefined | null>) {
  return fuzzyScore(query, fields) > 0;
}

export function sortByFuzzyScore<T>(
  items: T[],
  query: string,
  getFields: (item: T) => Array<string | undefined | null>,
) {
  return items
    .map(item => ({ item, score: fuzzyScore(query, getFields(item)) }))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(result => result.item);
}
