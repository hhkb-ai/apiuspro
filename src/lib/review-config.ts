export interface ReviewDetail {
  slug: string;
  name: string;
  icon: string;
  badges: { label: string; variant?: 'destructive' | 'success' }[];
  tlDr: string;
  ratings: { label: string; score: number; detail: string }[];
  pros: string[];
  cons: string[];
  benchmarks?: { name: string; values: Record<string, string> }[];
  pricing?: { model: string; input: string; output: string }[];
  useCases: string[];
  conclusion: string;
}

const reviewRatingWeights: Record<string, number> = {
  '质量': 0.45,
  '稳定性': 0.25,
  '速度': 0.2,
  '性价比': 0.1,
};

export const reviewRatingWeightDescription = '质量 45%、稳定性 25%、速度 20%、性价比 10%';

export function getReviewScore(review: ReviewDetail) {
  if (review.ratings.length === 0) return 0;

  const weightedRatings = review.ratings
    .map(rating => ({
      score: rating.score,
      weight: reviewRatingWeights[rating.label] ?? 0,
    }))
    .filter(rating => rating.weight > 0);

  if (weightedRatings.length === 0) {
    const total = review.ratings.reduce((sum, item) => sum + item.score, 0);
    return total / review.ratings.length;
  }

  const weightTotal = weightedRatings.reduce((sum, rating) => sum + rating.weight, 0);
  const scoreTotal = weightedRatings.reduce(
    (sum, rating) => sum + rating.score * rating.weight,
    0,
  );

  return scoreTotal / weightTotal;
}

export const reviewDetails: Record<string, ReviewDetail> = {
  'gpt-5.5': {
    slug: 'gpt-5.5',
    name: 'OpenAI GPT-5.5',
    icon: '🚀',
    badges: [
      { label: '需代理', variant: 'destructive' },
      { label: '付费' },
      { label: '官方快照 2026-04-23' },
    ],
    tlDr:
      'OpenAI 最新旗舰模型 gpt-5.5（快照 2026-04-23），适合复杂编码、Agent、长上下文检索和生产级助手；标准价 $5 输入 / $30 输出每百万 token。',
    ratings: [
      { label: '质量', score: 4.9, detail: '官方定位为 newest frontier model，适合复杂专业工作、编码、推理和 Agent 工作流。' },
      { label: '速度', score: 4.4, detail: '默认 reasoning.effort 为 medium，可按任务调低到 low 或 none 来平衡质量、延迟和成本。' },
      { label: '性价比', score: 3.2, detail: '标准价 $5/$30 每百万 token，Batch/Flex 可降至 $2.5/$15；长上下文和 Pro 场景成本明显更高。' },
      { label: '稳定性', score: 4.6, detail: '支持 Responses API、Chat Completions、Batch、工具调用和企业级数据驻留选项。' },
    ],
    pros: [
      '官方模型 ID 为 gpt-5.5，当前快照为 gpt-5.5-2026-04-23',
      '支持 1M token 上下文窗口，适合长文档、代码库、检索增强和多轮 Agent 状态管理',
      '支持 Responses API、Chat Completions、Batch、function calling、web search、file search、tool search、code interpreter、hosted shell、computer use、MCP 和结构化输出',
      'reasoning.effort 支持 none、low、medium（默认）、high、xhigh，可按任务控制延迟与成本',
      'Batch/Flex 价格低于标准请求，适合离线批处理、内容生成、结构化抽取和批量评测',
      'GPT-5.5 pro 提供更高计算量版本，适合更难的异步推理任务和 Responses API 工作流',
    ],
    cons: [
      '价格较高：GPT-5.5 标准价 $5/$30 每百万 token，GPT-5.5 Pro 标准价 $30/$180 每百万 token',
      '国内访问需要代理',
      '需要国际信用卡支付',
      '超过 272K 输入 token 的请求会按官方规则加价：GPT-5.5 长上下文标准、Batch 和 Flex 场景均会触发更高计费',
      'GPT-5.5 pro 没有 cached input 折扣，长上下文 Pro 任务需要提前做预算',
      '官方文档未提供 GPT-5.5D / gpt-5.5d 模型 ID；页面不应写成 GPT-5.5D',
    ],
    pricing: [
      { model: 'GPT-5.5', input: '$5/百万', output: '$30/百万' },
      { model: 'GPT-5.5 Pro', input: '$30/百万', output: '$180/百万' },
      { model: 'GPT-5.5 Batch/Flex', input: '$2.5/百万', output: '$15/百万' },
      { model: 'GPT-5.5 Priority', input: '$12.5/百万', output: '$75/百万' },
    ],
    useCases: [
      '专业开发者：复杂代码生成、调试、代码库理解、工具调用和长周期软件工程任务',
      '企业 Agent：多步骤服务流程、工具选择、文件检索、网页检索、MCP 和状态管理',
      '知识工作：长文档检索、产品规格转执行计划、结构化输出、生产级助手',
      '高难异步任务：需要更强推理时可评估 GPT-5.5 pro，并配合 background mode 避免超时',
      '注意：个人用户和小预算团队成本压力较大，建议用 GPT-5.4-mini / Batch / Flex 控制成本',
    ],
    conclusion:
      'GPT-5.5 是 OpenAI 官方文档确认的最新旗舰模型，模型 ID 为 gpt-5.5，Pro 版本模型 ID 为 gpt-5.5-pro，适合复杂专业工作、编码和工具型 Agent。当前没有官方 GPT-5.5D / gpt-5.5d 模型 ID；上线内容应统一写作 GPT-5.5 / GPT-5.5 Pro，并保留官方快照与价格条件说明。价格信息以 OpenAI 官方文档为准：https://platform.openai.com/docs/pricing',
  },

  minimax: {
    slug: 'minimax',
    name: 'MiniMax M3',
    icon: '⚡',
    badges: [
      { label: 'M3最新', variant: 'success' },
      { label: 'Token Plan' },
      { label: '1M上下文' },
    ],
    tlDr:
      'MiniMax M3 是 2026-06-01 发布的最新 M 系列模型，主打代码、Agent、1M 上下文和原生多模态；适合 AI Coding 工具、长上下文仓库分析和多步骤 Agent，但购买前要分清 Token Plan、Credits 与 Pay-as-you-go 的 Key 和计费体系。',
    ratings: [
      { label: '质量', score: 4.6, detail: '官方定位为 Coding & Agentic Frontier，在 SWE-Bench Pro、Terminal-Bench、MCP Atlas 等代码和 Agent 基准上给出较强成绩。' },
      { label: '速度', score: 4.2, detail: 'M3 支持 thinking 开关；关闭 thinking 更适合低延迟对话和补全，复杂 Agent 任务开启 thinking 但延迟会更高。' },
      { label: '性价比', score: 4.4, detail: '官方 Token Plan 口径为 Plus $20/月、Max $50/月、Ultra $120/月；PAYG 标准通道当前显示 M3 ≤512K 为 ¥2.1/百万输入、¥8.4/百万输出。' },
      { label: '稳定性', score: 4.0, detail: 'M3 刚发布，API、Token Plan、Priority 通道和区域价格仍可能快速调整，生产接入前建议小流量压测。' },
    ],
    pros: [
      'MiniMax-M3 支持 1,000,000 token 上下文，官方说明 512K 以内覆盖多数对话和编程场景',
      '原生多模态，支持文本、图像、视频、工具调用和 thinking block，适合复杂 Agent 工作流',
      'Token Plan 适合个人开发者和小团队固定预算使用，文本、图像、语音、音乐资源共享额度池',
      '同时支持 Anthropic SDK 和 OpenAI / Responses 兼容接入，AI Coding 工具适配成本低',
      '官方 M3 发布页给出 SWE-Bench Pro 59.0、Terminal-Bench 2.1 66.0、MCP Atlas 74.2 等代码/Agent 基准数据',
      'MiniMax Code、Codex、Claude Code、Cline、OpenClaw 等 AI Coding 工具已有官方配置指引',
    ],
    cons: [
      'Token Plan Subscription Key、Credits 和 Pay-as-you-go API Key 是不同体系，初次接入容易填错 Key',
      'M3 刚发布，价格、额度、Priority 开放状态和区域支付口径变化较快',
      '超过 512K 输入 token 会进入更高长上下文价格，仓库级分析和长视频任务需要提前预算',
      '官方性能数据以内部评测和发布页为主，正式业务仍需要用自己的任务复测',
      '如果只做轻量中文对话或低成本高频客服，DeepSeek、Qwen、豆包等国内模型可能更简单',
    ],
    benchmarks: [
      { name: 'SWE-Bench Pro', values: { 'MiniMax M3': '59.0%' } },
      { name: 'Terminal-Bench 2.1', values: { 'MiniMax M3': '66.0%' } },
      { name: 'SWE-fficiency', values: { 'MiniMax M3': '34.8%' } },
      { name: 'KernelBench Hard', values: { 'MiniMax M3': '28.8%' } },
      { name: 'MCP Atlas', values: { 'MiniMax M3': '74.2%' } },
      { name: 'BrowseComp', values: { 'MiniMax M3': '83.5' } },
    ],
    pricing: [
      { model: 'Token Plan Plus', input: '$20/月', output: '约 1.7B M3 tokens/月' },
      { model: 'Token Plan Max', input: '$50/月', output: '约 5.1B M3 tokens/月' },
      { model: 'Token Plan Ultra', input: '$120/月', output: '约 9.8B M3 tokens/月' },
      { model: 'PAYG M3 标准 ≤512K', input: '¥2.1/百万；缓存读 ¥0.42/百万', output: '¥8.4/百万' },
      { model: 'PAYG M3 标准 512K~1M', input: '¥4.2/百万；缓存读 ¥0.84/百万', output: '¥16.8/百万' },
      { model: 'MiniMax-M2.7', input: '¥2.1/百万；缓存读 ¥0.42/百万；缓存写 ¥2.625/百万', output: '¥8.4/百万' },
      { model: 'MiniMax-M2.7-highspeed', input: '¥4.2/百万；缓存读 ¥0.42/百万；缓存写 ¥2.625/百万', output: '¥16.8/百万' },
    ],
    useCases: [
      'AI Coding 工具：Codex、Claude Code、Cline、OpenClaw、MiniMax Code 等需要长上下文和 Agent 执行的工作流',
      '仓库级代码分析：长上下文读取代码库、测试日志、设计文档，再生成修改计划',
      '多模态 Agent：需要图像、视频、工具调用和 thinking block 的自动化流程',
      '个人/小团队固定预算：使用 Token Plan 控制月度成本，再用 Credits 覆盖溢出',
      '不适合：只需要稳定低价中文聊天、客服或轻量批处理的项目，优先对比 DeepSeek V4 Flash、Qwen3.6 Flash 和豆包',
    ],
    conclusion:
      'MiniMax M3 是 2026 年 6 月值得补充到购买教程和测评列表的新模型：它的价值不在普通聊天，而在长上下文、代码工程、Agent 和多模态工具调用。采购时最重要的是先选计费路径：Token Plan 适合固定额度和 AI Coding 工具，Pay-as-you-go 适合标准 API 按量接入；同时注意 512K 输入 token 以上的长上下文价格和 Key 类型差异。价格、额度和区域支付口径以 MiniMax 官方控制台为准。',
  },

  tongyi: {
    slug: 'tongyi',
    name: '阿里云通义千问',
    icon: '🇨🇳',
    badges: [
      { label: '无需代理', variant: 'success' },
      { label: '免费额度', variant: 'success' },
      { label: 'Qwen3.7-Max' },
    ],
    tlDr:
      '国内用户和阿里云生态项目的稳妥选择。2026 年 5 月重点看 Qwen3.7-Max、Qwen3.6-Plus / Qwen3.6-Flash 以及百炼模型广场；Qwen3.7-Max 更偏 Agent、代码工程、办公自动化和长周期工具调用。',
    ratings: [
      { label: '质量', score: 4.8, detail: 'Qwen3.7-Max 在复杂推理、代码工程、工具调用和多语言任务上明显增强，普通中文内容任务仍可用 Qwen3.6 控本。' },
      { label: '速度', score: 4.8, detail: '国内部署，响应延迟低，高并发场景下也保持稳定速度。' },
      { label: '性价比', score: 4.7, detail: 'qwen3.7-max 国内百炼当前为 12 元/百万输入、36 元/百万输出；Qwen3.6-Flash / Plus 更适合日常控本。' },
      { label: '稳定性', score: 4.7, detail: '阿里云基础设施保障，SLA 99.9%，企业级可用性。' },
    ],
    pros: [
      '免费额度、试用模型和价格经常调整，购买前以百炼控制台为准',
      '国内直接访问，无需代理，响应速度快',
      '中文场景深度优化，理解和生成质量优秀',
      '阿里云生态完善，文档详尽，易于上手',
      'API 兼容 OpenAI 格式，迁移成本低',
      'qwen3.7-max 支持 1M 上下文、64k 最大输出、Function Calling、内置工具、结构化输出和批量调用',
      '支持多轮对话、函数调用、JSON 模式，并可在百炼模型广场切换 Qwen、DeepSeek、Kimi、GLM、MiMo 等模型',
    ],
    cons: [
      '复杂 Agent 任务建议优先测试 Qwen3.7-Max，同时对比 DeepSeek V4 Pro、Claude Opus 4.8 或 GPT-5.5',
      'Qwen3.7-Max 成本高于 Qwen3.6-Plus / Flash，不适合所有轻量高频任务',
      '英文和跨语言场景表现不如原生英文模型',
      '开源版本与商业版本有一定差距',
    ],
    useCases: [
      '个人开发者：免费额度足够日常学习和原型开发',
      '中文内容创作：文章、翻译、摘要等中文任务表现优秀',
      'Agent 和代码工程：qwen3.7-max 适合复杂代码修改、多文件工程、工具调用和长周期任务',
      '初创企业：Qwen3.6 系列低成本起步，复杂任务再切换 qwen3.7-max',
      '教育场景：中文教学辅助、代码辅导等场景非常适合',
      '不适合：大量轻量高频任务全部使用 qwen3.7-max，成本会偏高',
    ],
    benchmarks: [
      { name: 'Terminal-Bench 2.0-Terminus', values: { 'Qwen3.7-Max': '69.7', 'DeepSeek V4 Pro Max': '67.9' } },
      { name: 'SWE-Pro', values: { 'Qwen3.7-Max': '60.6' } },
      { name: 'SWE-Verified', values: { 'Qwen3.7-Max': '80.4', 'Claude Opus 4.6 Max': '80.8', 'DeepSeek V4 Pro Max': '80.6' } },
      { name: 'MCP-Mark', values: { 'Qwen3.7-Max': '60.8', 'GLM-5.1': '57.5' } },
      { name: 'SpreadSheetBench-v1', values: { 'Qwen3.7-Max': '87' } },
      { name: 'GPQA Diamond', values: { 'Qwen3.7-Max': '92.4', 'Claude Opus 4.6': '91.3' } },
    ],
    pricing: [
      { model: 'qwen3.7-max（国内）', input: '¥12/百万', output: '¥36/百万' },
      { model: 'qwen3.6-plus（≤256K）', input: '¥2/百万', output: '¥12/百万' },
      { model: 'qwen-plus / qwen-plus-latest（≤128K）', input: '¥0.8/百万', output: '¥2/百万；思考输出 ¥8/百万' },
    ],
    conclusion:
      '通义千问适合中文业务、企业控制台和阿里云生态。2026 年 5 月的最新主线是 qwen3.7-max：它面向 Agent 时代，强调代码工程、办公自动化、长周期执行和跨框架工具调用；日常内容、客服和知识库任务仍建议先用 Qwen3.6-Plus / Flash 控制成本。正式采购前必须以百炼控制台的模型权限、免费额度和价格为准。',
  },

  claude: {
    slug: 'claude',
    name: 'Anthropic Claude',
    icon: '🌍',
    badges: [
      { label: '需代理', variant: 'destructive' },
      { label: '付费' },
    ],
    tlDr:
      '长文本处理、安全性和代码协作能力突出。当前重点看 Claude Opus 4.8、Sonnet 4.6 和 Haiku 4.5；Opus/Sonnet 支持 1M 上下文，适合长文档和复杂代码任务。',
    ratings: [
      { label: '质量', score: 4.8, detail: '文本理解和生成长文本方向顶尖，安全对齐做得最好的模型。' },
      { label: '速度', score: 4.0, detail: '推理速度中规中矩，长文本处理时延迟有所增加。' },
      { label: '性价比', score: 3.8, detail: '价格处在海外高端模型区间，适合高价值长文档和代码协作任务。' },
      { label: '稳定性', score: 4.9, detail: 'Anthropic 服务成熟，API 可用性极高，企业级可靠。' },
    ],
    pros: [
      'Opus 4.8 / Sonnet 4.6 支持 1M 上下文，适合长文档分析、合同审查和代码仓库理解',
      '安全对齐做得最好，Constitutional AI 确保输出安全可靠',
      '代码能力强劲，Claude Code 是顶级 AI 编程助手',
      '对复杂指令遵循度高，思维严谨细致',
      'API 文档清晰，开发者体验优秀',
    ],
    cons: [
      '国内访问需要代理',
      '推理速度相对较慢',
      '价格较高，需要结合任务效果与 OpenAI GPT-5.5 分别实测',
      '多模态和速度场景要与 Gemini 3.5 Flash、OpenAI GPT-5.5 分别实测',
      '中文能力不如国内模型自然流畅',
    ],
    pricing: [
      { model: 'Claude Opus 4.8', input: '$5/百万', output: '$25/百万' },
      { model: 'Claude Sonnet 4.6', input: '$3/百万', output: '$15/百万' },
      { model: 'Claude Haiku 4.5', input: '$1/百万', output: '$5/百万' },
    ],
    useCases: [
      '长文档处理：1M 上下文适合合同审查、法律文件、学术论文和大型代码仓库',
      '安全合规场景：金融、医疗、法律等对输出安全要求极高的行业',
      '代码协作：Claude Code 是顶级的 AI 编程助手',
      '需要思维链推理：Claude 的推理过程更透明可解释',
      '不适合：需要多模态理解或极致速度的场景',
    ],
    conclusion:
      'Claude 在长文本处理和安全合规方面有不可替代的优势，是企业和专业开发者的可靠选择。如果你的任务涉及大量文本分析或对输出安全有严格要求，Claude 是最佳选择。',
  },

  zhipu: {
    slug: 'zhipu',
    name: '智谱AI GLM',
    icon: '🇨🇳',
    badges: [
      { label: '无需代理', variant: 'success' },
      { label: 'GLM-5.2' },
      { label: '1M上下文' },
      { label: 'Coding Plan' },
    ],
    tlDr:
      'GLM-5.2 主打 1M 上下文、128K 输出、长程 Coding Agent 和复杂工程任务，适合代码库分析、多文件重构、项目级开发、长文档处理和企业知识库底座。它的模型能力和性价比值得关注，但 Coding Plan 不是普通 API 套餐，购买、额度、高峰期消耗和工具支持规则都需要提前确认。',
    ratings: [
      { label: '质量', score: 4.6, detail: 'GLM-5.2 在长上下文、代码工程、工具调用和长程 Agent 任务上明显加强。官方文档显示它支持 1M 上下文和 128K 最大输出，更适合项目级工程上下文、复杂重构、代码库分析和多步骤开发任务。' },
      { label: '速度', score: 4.3, detail: '国内访问延迟相对友好，普通任务响应体验不错；但 1M 上下文、max 推理和复杂 Agent 任务会显著增加耗时。实际速度取决于上下文长度、工具调用次数、项目规模和高峰期资源情况。' },
      { label: '性价比', score: 4.5, detail: 'GLM-5.2 的 API 标准价格相对国际闭源旗舰更低，Coding Plan 对开发者有吸引力。但套餐不是无限用，存在 5 小时限额、每周限额和高峰期倍率消耗；复杂项目中一次 Prompt 可能触发多次模型调用，实际消耗可能比新手预期更快。' },
      { label: '稳定性', score: 4.1, detail: '模型能力提升明显，但产品体验仍要看具体接入方式。Coding Plan 仅适用于官方支持的编码工具，不等同于普通 API 套餐；套餐库存、额度统计、工具兼容和高峰期体验都可能影响实际使用稳定性。' },
    ],
    pros: [
      'GLM-5.2 支持 1M 上下文和 128K 最大输出，更适合大型代码库、长文档、复杂项目和长程 Agent 任务',
      'Coding Agent 能力是核心卖点，适合项目审查、多文件修改、工程重构、测试修复和前后端项目生成',
      '国内访问和中文场景更友好，对国内开发者、企业知识库和内部工具原型有较高吸引力',
      'API 价格相对国际闭源旗舰更低，Coding Plan 对个人开发者和小团队有一定性价比',
    ],
    cons: [
      'GLM-5.2 不应再简单按"GLM-5 / 5.1 的 200K 长上下文模型"理解，它的重点已经转向 1M 上下文、长程 Coding Agent 和复杂工程任务',
      'Coding Plan 不是普通 API 套餐，主要用于 Claude Code、Cline、OpenCode 等官方支持的编码工具；网站客服、企业知识库、SaaS 内置 AI 等场景仍应按标准 API 和实际调用成本评估',
      '套餐存在 5 小时限额、每周限额和高峰期倍率消耗，复杂项目中一次 Prompt 可能触发多次模型调用，不要只看表面套餐价格',
      '套餐购买和使用体验可能受库存、支付、额度刷新和高峰期资源影响，不适合写成"闭眼上车"',
      'GLM-5.2 不是财税、法律或合规专用模型。用于企业知识库、财税问答或内部工作助手时，必须配合 RAG 检索、来源引用、政策有效期过滤、风险分级和人工复核',
    ],
    useCases: [
      '大型代码库分析：理解跨文件依赖、多模块架构和复杂项目结构',
      '工程重构与代码审查：多文件修改、测试修复、项目级开发',
      '长文档处理：分析超长技术文档、合同、报告和知识库',
      '企业知识库底座：配合 RAG 构建内部知识问答和工作助手',
      '国内开发者：无需代理，中文场景友好，API 价格有竞争力',
    ],
    conclusion:
      'GLM-5.2 是国产模型中非常值得关注的长上下文 Coding Agent 模型，适合代码库分析、复杂工程任务和长文档处理；但套餐、额度、工具接入和企业落地成本需要单独评估。',
  },

  kimi: {
    slug: 'kimi',
    name: '月之暗面 Kimi',
    icon: '🌙',
    badges: [
      { label: '无需代理', variant: 'success' },
      { label: '长上下文' },
      { label: '免费额度', variant: 'success' },
      { label: 'K2.5/K2.6 待确认' },
    ],
    tlDr:
      'Kimi 适合长文档、资料问答、中文知识工作流和 Agent 原型。当前重点关注 Kimi K2.5 / K2.6、256K 上下文和 OpenAI 兼容接入。（K2.5/K2.6 模型名称和 256K 上下文信息待官方确认）',
    ratings: [
      { label: '质量', score: 4.5, detail: 'Kimi K2.5 / K2.6 适合长资料、复杂问答和中文知识工作流，需用真实文档验证成本。' },
      { label: '速度', score: 4.4, detail: '国内访问延迟友好，长上下文任务会随输入长度增加耗时。' },
      { label: '性价比', score: 4.6, detail: '有免费额度，日常文档处理和中等规模应用成本较好控制。' },
      { label: '稳定性', score: 4.5, detail: '开放平台接入体验成熟，仍需关注模型列表和额度调整。' },
    ],
    pros: [
      'Kimi K2.5 / K2.6 支持更长上下文，适合合同、论文、资料库、报告和代码资料分析',
      '中文表达自然，摘要、改写、问答等常见任务完成度高',
      'OpenAI 兼容接口迁移成本低，现有 SDK 项目容易接入',
      '国内直连，不需要额外代理环境',
      '适合把 PDF、知识库和客服问答做成轻量应用',
    ],
    cons: [
      '工具调用、复杂 Agent 和极高难度推理场景不一定是首选',
      '多模态和企业生态覆盖不如部分云厂商完整',
      'Kimi K2.6 等新模型价格、上下文和限流策略需要以 Moonshot 控制台为准',
      '超长上下文任务虽然方便，但 Token 成本需要提前估算',
    ],
    useCases: [
      '长文档问答：合同、论文、招投标资料、产品手册和会议纪要',
      '知识库助手：把企业资料整理成可问答的内部工具',
      '中文内容生产：摘要、改写、提纲、公众号和短视频脚本',
      '原型开发：已有 OpenAI SDK 的项目可快速替换 base_url 测试',
      '不适合：对顶级代码修复、复杂多步工具调用要求极高的任务',
    ],
    conclusion:
      'Kimi 仍是国内长文本和中文知识工作流的重要候选。更新后重点不再只看 128K，而是看 Kimi K2.5/K2.6、256K 上下文、Agent 能力和实际长文成本。（K2.5/K2.6 模型名称和 256K 上下文信息待官方确认，因 platform.kimi.com 返回 404 无法验证）',
  },

  tencent: {
    slug: 'tencent',
    name: '腾讯混元',
    icon: '☁️',
    badges: [
      { label: '无需代理', variant: 'success' },
      { label: '腾讯云生态' },
      { label: '企业友好' },
    ],
    tlDr:
      '腾讯混元更适合已经在腾讯云、微信生态或企业服务体系里的团队。当前要特别关注 TokenHub 迁移提示：新模型和后续能力可能逐步转向 TokenHub。',
    ratings: [
      { label: '质量', score: 4.4, detail: '通用中文任务表现可靠，多模型覆盖能满足大多数业务接入。' },
      { label: '速度', score: 4.6, detail: '国内云服务延迟低，适合面向国内用户的在线应用。' },
      { label: '性价比', score: 4.4, detail: '轻量模型和资源包适合规模化调用，具体成本取决于模型选择。' },
      { label: '稳定性', score: 4.7, detail: '腾讯云基础设施成熟，企业级运维和权限体系较完整。' },
    ],
    pros: [
      '腾讯云账号体系、费用中心、权限管理和企业运维流程完整',
      '国内访问稳定，适合在线客服、办公系统和内部业务工具',
      '多模型路线覆盖文本、视觉、轻量和推理场景，但新增能力要查看 TokenHub 与腾讯云最新公告',
      '与微信、小程序、腾讯云函数、COS 等生态协同方便',
      'OpenAI 兼容接入降低迁移成本',
    ],
    cons: [
      '控制台概念较多，新手需要理解地域、密钥、Endpoint 和模型名',
      '如果没有腾讯云使用基础，开通链路会比独立开放平台稍重',
      '最前沿推理和代码场景不一定优于国际旗舰或专项模型',
      '价格、免费额度、资源包和 TokenHub 迁移策略需要以腾讯云控制台为准',
    ],
    useCases: [
      '企业业务系统：CRM、知识库、工单、客服和办公自动化',
      '微信生态应用：公众号、小程序和企微机器人',
      '腾讯云用户：已有云资源和权限体系时接入成本低',
      '内容生产与审核：中文内容生成、摘要、分类和审核辅助',
      '不适合：只想用最简独立 API、完全不想碰云控制台的新手',
    ],
    conclusion:
      '腾讯混元的价值在“模型 + 云生态”。如果业务在腾讯云或微信体系里，它仍然顺手；但新项目需要优先确认 TokenHub 入口、可购买模型和后续支持策略。',
  },

  doubao: {
    slug: 'doubao',
    name: '字节豆包',
    icon: '🔥',
    badges: [
      { label: '无需代理', variant: 'success' },
      { label: '高性价比' },
      { label: '免费额度', variant: 'success' },
    ],
    tlDr:
      '豆包 API 适合高频中文对话、内容生成、Agent 原型和成本敏感应用。当前重点关注 Doubao-Seed-1.6、Seed-Code、Responses API 和火山方舟的模型编排能力。',
    ratings: [
      { label: '质量', score: 4.3, detail: 'Doubao-Seed-1.6 覆盖通用与多模态任务，Seed-Code 更适合代码场景，复杂任务要按模型实测。' },
      { label: '速度', score: 4.7, detail: '轻量模型响应快，适合聊天、客服和内容生产类高频调用。' },
      { label: '性价比', score: 4.8, detail: '成本控制友好，适合从免费额度、小额测试逐步放量。' },
      { label: '稳定性', score: 4.5, detail: '火山引擎云服务成熟，正式接入建议配置预算和告警。' },
    ],
    pros: [
      '高性价比，适合高频调用和成本敏感型产品',
      '国内直连，面向国内用户的延迟体验较好',
      'Doubao-Seed-1.6、Seed-Code、视觉、语音、Embedding 等方向覆盖较全，适合在火山方舟里统一调度',
      'OpenAI 兼容接入方便迁移已有项目',
      '字节内容生态经验强，适合内容生成和互动场景',
    ],
    cons: [
      '火山方舟里的模型、Endpoint、地域概念对新手有一定学习成本',
      '复杂推理、严肃代码修复需要与 DeepSeek、Claude、OpenAI 等交叉测试',
      'Doubao-Seed-1.6、Seed-Code、Responses API、免费额度和价格变化较快，正式购买前必须核对火山方舟控制台',
      '长上下文和专项能力要按具体模型确认，不宜只看品牌选择',
    ],
    useCases: [
      '高频聊天机器人：客服、陪伴、教育问答和应用内助手',
      '内容生成：短视频文案、商品描述、标题和营销素材',
      '预算敏感项目：需要低成本放量的原型或中小型产品',
      '多模态探索：语音、图像、Embedding 等字节生态场景',
      '不适合：需要绝对顶级复杂推理或跨区域海外稳定访问的项目',
    ],
    conclusion:
      '豆包的核心吸引力是快、便宜、国内体验顺。新版本更适合把对话、代码、视觉和 Agent 工作流放进火山方舟统一测试；上线前仍要用真实业务样本压测质量、延迟和 Token 成本。',
  },

  deepseek: {
    slug: 'deepseek',
    name: 'DeepSeek V4 系列',
    icon: '🧠',
    badges: [
      { label: '无需代理', variant: 'success' },
      { label: '高性价比' },
      { label: '代码/推理' },
      { label: '开源可商用' },
    ],
    tlDr:
      'DeepSeek V4 当前重点是 deepseek-v4-flash 和 deepseek-v4-pro：两者均支持 1M 上下文、最高 384K 输出、思考/非思考双模式、OpenAI/Anthropic 兼容接口。deepseek-chat 和 deepseek-reasoner 当前只是兼容别名，将在 2026-07-24 15:59 UTC 后完全退役。',
    ratings: [
      { label: '质量', score: 4.8, detail: '官方定位 V4 Pro 为面向 Agent 编码、世界知识、数学/STEM/代码推理的旗舰开源模型；Flash 更偏快速和高性价比。' },
      { label: '速度', score: 4.6, detail: 'Flash 参数规模更小，适合实时对话和高频任务；Pro 更适合高难推理和长上下文任务。' },
      { label: '性价比', score: 5.0, detail: '官方按人民币/百万 token 计费，V4 Flash 成本低；V4 Pro 当前有折扣期，正式上线前必须复核官方定价页。' },
      { label: '稳定性', score: 4.2, detail: '高峰期算力紧张，Pro 可能变慢或排队。建议做好重试和备用方案。' },
    ],
    pros: [
      '官方 V4 模型名为 deepseek-v4-flash 和 deepseek-v4-pro，新项目应优先使用这两个模型名',
      'V4 Pro：1.6T 总参数、49B 激活参数，官方定位为性能接近世界顶级闭源模型',
      'V4 Flash：284B 总参数、13B 激活参数，参数更小、响应更快、API 成本更低',
      '100 万 token 上下文：Pro 和 Flash 均支持，最大输出可到 384K，适合长文档和代码库任务',
      '两款模型均支持思考/非思考双模式，deepseek-chat / deepseek-reasoner 仅作为旧别名兼容',
      'OpenAI 兼容接口：迁移成本低，可接入 Claude Code、Agent 等开发工具和主流客户端',
      '国内直连：无需代理，支持支付宝/微信充值',
      '开源可商用：模型权重开放，适合本地部署和二次开发',
    ],
    cons: [
      'deepseek-chat / deepseek-reasoner 将在 2026-07-24 15:59 UTC 后退役，旧项目必须提前迁移',
      '高峰期算力紧张：热门时段 Pro 响应可能变慢或需排队',
      '审美与前端偏弱：能写好逻辑代码，但生成的网页界面不美观，需人工润色',
      '暂无原生多模态：纯文本模型，不能直接识别图片和视频（可配合外部工具）',
      '中文写作美感：在极难的文学性创作上，Claude Opus 4.8 仍稍强',
    ],
    pricing: [
      { model: 'deepseek-v4-flash', input: '¥1/百万；缓存命中 ¥0.02/百万', output: '¥2/百万' },
      { model: 'deepseek-v4-pro（折扣期）', input: '¥3/百万；缓存命中 ¥0.025/百万', output: '¥6/百万' },
      { model: '兼容别名', input: 'deepseek-chat / deepseek-reasoner', output: '2026-07-24 15:59 UTC 后退役' },
    ],
    useCases: [
      '选 Pro：复杂数学/科研推理、大型工程代码、分析整本书或全量代码仓库等深度任务',
      '选 Flash：学生和上班族的写作辅助、查资料、简单代码帮助、实时对话和自动回复',
      '开发者工具链：作为 Claude Code、Agent 框架和自动化脚本的高性价比后端模型',
      '预算敏感生产：在成本约束下追求接近世界顶级的模型能力',
      '不适合：需原生多模态识别、极致文学创作美感、或极高 SLA 的企业关键链路',
    ],
    conclusion:
      'DeepSeek V4 的更新重点是低价、1M 长上下文、384K 最大输出和兼容接口。日常办公和代码助手优先试 V4 Flash；复杂推理、长文档和高质量代码任务再上 V4 Pro。注意 Pro 折扣期、并发限制，以及 deepseek-chat / deepseek-reasoner 在 2026-07-24 15:59 UTC 后退役。',
  },

  gemini: {
    slug: 'gemini',
    name: 'Google Gemini',
    icon: '✨',
    badges: [
      { label: '需代理', variant: 'destructive' },
      { label: '多模态' },
      { label: '免费额度', variant: 'success' },
    ],
    tlDr:
      'Gemini 的优势是多模态、长上下文和 Google 生态。当前重点看 Gemini 3.5 Flash、Gemini 3.1 Pro Preview 和 Gemini 3 Flash Preview；国内访问、账号、支付和区域限制仍是主要成本。',
    ratings: [
      { label: '质量', score: 4.7, detail: 'Gemini 3.5 Flash 强在多模态和速度，Gemini 3.1 Pro Preview 更适合长上下文与复杂任务测试。' },
      { label: '速度', score: 4.6, detail: '海外网络环境下响应快，国内体验取决于代理质量和区域配置。' },
      { label: '性价比', score: 4.4, detail: 'AI Studio 免费额度适合试用，正式生产成本需按 Google Cloud 账单核算。' },
      { label: '稳定性', score: 4.3, detail: '平台能力成熟，但国内网络和账号区域会影响稳定性。' },
    ],
    pros: [
      'Gemini 3.5 Flash 适合多模态和低延迟场景，Gemini 3.1 Pro Preview 更适合长上下文与复杂任务测试',
      '长上下文适合大文档、代码库和资料批量分析',
      'AI Studio 上手快，适合快速创建测试 Key',
      'Google 生态完整，可与 Cloud、Workspace、搜索和数据服务协同',
      '部分模型免费额度友好，适合原型验证',
    ],
    cons: [
      '国内访问通常需要稳定代理，网络质量会直接影响调用体验',
      '付费生产一般涉及 Google Cloud 账号、账单和国际支付',
      '配额、区域、模型命名、预览模型稳定性和 API 版本变化需要持续关注',
      '面向国内用户的在线产品需要额外考虑访问稳定性和合规要求',
    ],
    useCases: [
      '多模态应用：图片理解、视频摘要、文档抽取和视觉问答',
      '长上下文分析：大文档、代码库、网页资料和研究材料',
      '海外产品：目标用户在海外、已有 Google Cloud 基础设施',
      '原型验证：通过 AI Studio 快速测试多模态和长上下文能力',
      '不适合：面向国内用户且无法配置稳定代理或国际账单的项目',
    ],
    conclusion:
      'Gemini 很适合多模态、长上下文和 Google Cloud 场景。更新后建议先测 Gemini 3.5 Flash 的速度/成本，再用 3.1 Pro Preview 验证复杂任务；国内项目必须先解决网络、账号和账单稳定性。',
  },
};

export const reviewSlugByApiId: Record<string, string> = {
  openai: 'gpt-5.5',
  aliyun: 'tongyi',
  claude: 'claude',
  zhipu: 'zhipu',
  kimi: 'kimi',
  tencent: 'tencent',
  doubao: 'doubao',
  deepseek: 'deepseek',
  gemini: 'gemini',
  minimax: 'minimax',
};

export function getReviewDetail(slug: string): ReviewDetail | undefined {
  return reviewDetails[slug];
}

export function getReviewSlugByAPIId(id: string): string | undefined {
  return reviewSlugByApiId[id];
}

export function getAllReviewSlugs(): string[] {
  return Object.keys(reviewDetails);
}
