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

export const apiTroubleshootingKeywords = [
  'API Key 泄露怎么办',
  'API 429 错误解决',
  'API 调用超时怎么办',
  'API 余额扣费异常',
  'API 返回格式错误',
  'API Token 超限解决',
  'API Key 环境变量配置',
  'OpenAI 兼容接口报错',
  'AI API 成本控制',
  'AI API 上线前检查',
];

export const toolWorkflowKeywords = [
  'Claude Code 接入 DeepSeek',
  'Claude Code 接入通义千问',
  'Codex 配置 API',
  'Gemini CLI 配置 API',
  'OpenCode 配置 API',
  'OpenClaw 使用教程',
  'CC Switch 切换模型',
  'AI 编程工具 API 配置',
  'MCP 配置教程',
  'AI 工具工作流搭建',
];

export const localDeployKeywords = [
  'Ollama 本地 API',
  'Ollama OpenAI 兼容接口',
  '本地大模型接入 Claude Code',
  '本地大模型接入 Codex',
  '笔记本本地部署 AI',
  '低配置电脑跑大模型',
  '本地模型和云端 API 对比',
  '离线 AI 助手搭建',
  '私有化 AI 部署教程',
  '本地模型硬件配置推荐',
];

export const scenarioDecisionKeywords = [
  'AI API 选型清单',
  'AI API 生产环境选择',
  'AI API 真实项目接入',
  'AI API 新手避坑',
  'AI API 价格和效果对比',
  '国内 AI API 选型',
  '企业 AI API 接入方案',
  '个人开发者 AI API 推荐',
  'AI API 免费额度怎么用',
  'AI API 从测试到上线',
];

export function uniqueKeywords(...groups: string[][]) {
  return Array.from(new Set(groups.flat()));
}
