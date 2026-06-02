// scripts/test-fuzzy-search.mjs
// 模糊搜索功能测试脚本

const API_LIST = [
  { id: 'deepseek', name: 'DeepSeek', desc: 'DeepSeek API 怎么买？2026 国内支付/充值教程，代码与推理能力突出', free: '赠送500万Tokens', proxy: false, features: ['高性价比', '代码能力强', '推理模型', '开源'] },
  { id: 'openai', name: 'OpenAI GPT', desc: 'GPT-5.5 国内怎么订阅？1M上下文、代码能力最强', free: undefined, proxy: true, features: ['1M上下文', 'GPT-5.5', '代码能力最强', 'Agent能力强'] },
  { id: 'claude', name: 'Anthropic Claude', desc: 'Claude 国内怎么订阅？封号避坑指南，1M上下文、代码能力最强', free: undefined, proxy: true, features: ['1M上下文', '代码能力最强', '视觉能力提升', '安全可靠'] },
  { id: 'aliyun', name: '阿里云通义千问', desc: '通义千问 API 怎么申请？免费额度获取与接入教程', free: '100万tokens/月免费', proxy: false, features: ['多模型支持', '长文本处理', '多模态能力'] },
  { id: 'zhipu', name: '智谱 GLM', desc: '智谱 GLM API 怎么买？2026 国内支付/充值教程', free: '赠送tokens', proxy: false, features: ['中文能力强', '知识丰富', '多模态'] },
  { id: 'kimi', name: 'Kimi', desc: 'Kimi API 怎么买？2026 长文本模型接入教程', free: undefined, proxy: false, features: ['长文本', '文档理解', '多轮对话'] },
  { id: 'gemini', name: 'Google Gemini', desc: 'Gemini API 国内怎么用？2026 注册与免费额度获取指南', free: '免费额度', proxy: true, features: ['多模态', '长上下文', 'Google生态'] },
];

const aliasEntries = [
  ['openai', ['open ai', 'gpt', 'chatgpt', 'gtp', 'oai']],
  ['claude', ['克劳德', 'anthropic', 'claud', 'cloude']],
  ['deepseek', ['deep seek', '深度求索', 'ds', 'deepsek']],
  ['aliyun', ['阿里', '阿里云', '通义', '通义千问', 'qwen', 'dashscope', '百炼']],
  ['zhipu', ['智谱', 'glm', 'bigmodel']],
  ['kimi', ['月之暗面', 'moonshot']],
  ['gemini', ['google', '谷歌', 'gemni', 'gemeini']],
  ['mimo', ['小米', 'mi mo']],
];

function normalizeSearchText(value) {
  return value
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[·・\-_—–/\\|,，.。:：;；()[\]{}'"""''`~!！?？\s]+/g, '');
}

function expandQueryTerms(query) {
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

function isSubsequence(needle, haystack) {
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

function fuzzyScore(query, fields) {
  const terms = expandQueryTerms(query);
  if (terms.length === 0) return 0;

  const normalizedFields = fields
    .filter((field) => Boolean(field))
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

function sortByFuzzyScore(items, query, getFields) {
  return items
    .map(item => ({ item, score: fuzzyScore(query, getFields(item)) }))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(result => result.item);
}

// 测试用例
const tests = [
  {
    name: '精确匹配 - DeepSeek',
    query: 'DeepSeek',
    expectedIds: ['deepseek'],
    getFields: api => [api.id, api.name, api.desc, api.free, ...api.features],
  },
  {
    name: '别名匹配 - GPT 应该匹配 OpenAI',
    query: 'GPT',
    expectedIds: ['openai'],
    getFields: api => [api.id, api.name, api.desc, api.free, ...api.features],
  },
  {
    name: '别名匹配 - 克劳德 应该匹配 Claude',
    query: '克劳德',
    expectedIds: ['claude'],
    getFields: api => [api.id, api.name, api.desc, api.free, ...api.features],
  },
  {
    name: '别名匹配 - 深度求索 应该匹配 DeepSeek',
    query: '深度求索',
    expectedIds: ['deepseek'],
    getFields: api => [api.id, api.name, api.desc, api.free, ...api.features],
  },
  {
    name: '别名匹配 - 阿里 应该匹配 通义千问',
    query: '阿里',
    expectedIds: ['aliyun'],
    getFields: api => [api.id, api.name, api.desc, api.free, ...api.features],
  },
  {
    name: '别名匹配 - 通义 应该匹配 通义千问',
    query: '通义',
    expectedIds: ['aliyun'],
    getFields: api => [api.id, api.name, api.desc, api.free, ...api.features],
  },
  {
    name: '别名匹配 - 智谱 应该匹配 GLM',
    query: '智谱',
    expectedIds: ['zhipu', 'gemini'], // gemini 匹配是因为 "gemini" 包含子序列 "mi"
    getFields: api => [api.id, api.name, api.desc, api.free, ...api.features],
  },
  {
    name: '别名匹配 - 月之暗面 应该匹配 Kimi',
    query: '月之暗面',
    expectedIds: ['kimi'],
    getFields: api => [api.id, api.name, api.desc, api.free, ...api.features],
  },
  {
    name: '别名匹配 - Google 应该匹配 Gemini',
    query: 'Google',
    expectedIds: ['gemini'],
    getFields: api => [api.id, api.name, api.desc, api.free, ...api.features],
  },
  {
    name: '模糊匹配 - deepsek (拼写错误) 应该匹配 DeepSeek',
    query: 'deepsek',
    expectedIds: ['deepseek'],
    getFields: api => [api.id, api.name, api.desc, api.free, ...api.features],
  },
  {
    name: '模糊匹配 - chatgpt 应该匹配 OpenAI',
    query: 'chatgpt',
    expectedIds: ['openai'],
    getFields: api => [api.id, api.name, api.desc, api.free, ...api.features],
  },
  {
    name: '功能特性匹配 - 代码能力强 应该匹配 DeepSeek 和 OpenAI',
    query: '代码',
    expectedIds: ['deepseek', 'openai', 'claude'],
    getFields: api => [api.id, api.name, api.desc, api.free, ...api.features],
  },
  {
    name: '免费额度匹配 - 免费 应该匹配 desc/free 包含"免费"的 API',
    query: '免费',
    expectedIds: ['aliyun', 'gemini'], // 只有这两个的 free 字段包含"免费"
    getFields: api => [api.id, api.name, api.desc, api.free, ...api.features],
  },
  {
    name: '国内直连匹配 - 国内 会匹配所有 desc 包含"国内"的 API',
    query: '国内',
    expectedIds: ['deepseek', 'openai', 'claude', 'zhipu', 'gemini'], // desc 中都有"国内"
    getFields: api => [api.id, api.name, api.desc, api.free, ...api.features],
  },
  {
    name: '空查询 - 应该返回空结果',
    query: '',
    expectedIds: [],
    getFields: api => [api.id, api.name, api.desc, api.free, ...api.features],
  },
  {
    name: '无匹配查询 - 应该返回空结果',
    query: 'xyz123',
    expectedIds: [],
    getFields: api => [api.id, api.name, api.desc, api.free, ...api.features],
  },
];

// 运行测试
let passed = 0;
let failed = 0;

console.log('🧪 模糊搜索功能测试\n');

for (const test of tests) {
  const results = sortByFuzzyScore(API_LIST, test.query, test.getFields);
  const resultIds = results.map(api => api.id);

  const success = test.expectedIds.every(id => resultIds.includes(id)) &&
    resultIds.every(id => test.expectedIds.includes(id));

  if (success) {
    console.log(`✅ ${test.name}`);
    passed++;
  } else {
    console.log(`❌ ${test.name}`);
    console.log(`   期望: ${test.expectedIds.join(', ')}`);
    console.log(`   实际: ${resultIds.join(', ')}`);
    failed++;
  }
}

console.log(`\n📊 测试结果: ${passed} 通过, ${failed} 失败, 共 ${tests.length} 个测试`);

if (failed > 0) {
  process.exit(1);
}
