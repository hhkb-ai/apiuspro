export const coreLongTailKeywords = [
  'AI API 怎么选',
  'AI API 怎么买',
  'AI API 官网入口',
  'AI API 购买教程',
  'AI API Key 获取教程',
  'AI API 免费额度',
  'AI API 国内直连',
  '国内可用 AI API',
  '无需代理 AI API',
  'AI API 价格对比',
  'AI API 性能测评',
  'AI API 新手教程',
  '大模型 API 接入教程',
  'OpenAI 兼容接口教程',
];

export const userIntentKeywords = [
  '写代码用哪个 AI',
  'AI 编程助手 API 推荐',
  '个人知识库 AI API',
  'AI 文档处理 API',
  'AI 数据分析 API',
  'AI 翻译 API 推荐',
  '智能客服 API 推荐',
  '内容创作 AI API',
  '教育辅导 AI API',
  '本地部署大模型教程',
];

export const apiPurchaseKeywords = [
  'API 注册教程',
  'API 充值教程',
  'API 订阅教程',
  'API 支付方式',
  'API Key 安全保存',
  'API 调用限制',
  '429 Too Many Requests 解决',
  'API Base URL 配置',
  'CC Switch 配置 API',
  'Claude Code 配置 API',
];

export function uniqueKeywords(...groups: string[][]) {
  return Array.from(new Set(groups.flat()));
}

