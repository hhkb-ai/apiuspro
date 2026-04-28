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

export const reviewDetails: Record<string, ReviewDetail> = {
  'gpt-5.5': {
    slug: 'gpt-5.5',
    name: 'OpenAI GPT-5.5',
    icon: '🚀',
    badges: [
      { label: '需代理', variant: 'destructive' },
      { label: '付费' },
      { label: 'Batch半价' },
    ],
    tlDr:
      'OpenAI 2026年4月最新旗舰模型，Agent 能力断档领先（Terminal-Bench 2.0 达 82.7%），1M 上下文窗口，编码/科研/金融全面屠榜。定价 $5/$30 每百万 token，Batch 处理半价。',
    ratings: [
      { label: '质量', score: 5.0, detail: '全场景标杆，基准测试全面领先竞品，Agent 智能体方向尤其突出。' },
      { label: '速度', score: 4.7, detail: '与 GPT-5.4 相同延迟，但 token 消耗显著降低，推理效率大幅提升。' },
      { label: '性价比', score: 3.0, detail: '$5/$30 每百万 token，Pro 版更贵。Batch 半价可降低成本，但日常使用仍偏贵。' },
      { label: '稳定性', score: 4.5, detail: 'OpenAI 基础设施成熟，但与 NVIDIA 协同设计仍在早期，偶有波动。' },
    ],
    pros: [
      '编码能力断层第一：Terminal-Bench 2.0 82.7%、SWE-Bench Pro 58.6%、Expert-SWE (内部) 73.1%',
      '100万 token 上下文窗口，Graphwalks BFS 1M f1 达 45.4%（GPT-5.4 仅 9.4%）',
      'Agent 方向全面领先：OSWorld-Verified 78.7%、FinanceAgent 60%、OfficeQA Pro 54.1%',
      '知识工作与科研顶级：GDPval 84.9%、FrontierMath Tier 1-3 51.7%、辅助发现 Ramsey 数新证明',
      '网络安全能力突出：CyberGym 81.8%、CTF 挑战 88.1%',
      '与 NVIDIA GB200/GB300 NVL72 联合设计，推理栈含 Codex 优化负载均衡',
      'Batch/Flex 处理半价，批量任务成本友好',
    ],
    cons: [
      '价格昂贵：GPT-5.5 $5/$30 每百万 token，GPT-5.5 Pro $30/$180 每百万 token',
      '国内访问需要代理',
      '需要国际信用卡支付',
      'OfficeQA Pro 54.1% 在办公场景仍有提升空间',
      'GeneBench 25% 在生物遗传学领域准确率偏低',
      'BrowseComp 84.4% 略低于 Gemini 3.1 Pro 的 85.9%',
    ],
    benchmarks: [
      { name: 'Terminal-Bench 2.0', values: { 'GPT-5.5': '82.7%', 'Claude Opus 4.7': '69.4%', 'Gemini 3.1 Pro': '68.5%' } },
      { name: 'SWE-Bench Pro', values: { 'GPT-5.5': '58.6%', 'Claude Opus 4.7': '—', 'Gemini 3.1 Pro': '—' } },
      { name: 'GDPval', values: { 'GPT-5.5': '84.9%', 'Claude Opus 4.7': '80.3%', 'Gemini 3.1 Pro': '67.3%' } },
      { name: 'OSWorld-Verified', values: { 'GPT-5.5': '78.7%', 'Claude Opus 4.7': '78.0%', 'Gemini 3.1 Pro': '—' } },
      { name: 'FrontierMath T1-3', values: { 'GPT-5.5': '51.7%', 'Claude Opus 4.7': '43.8%', 'Gemini 3.1 Pro': '36.9%' } },
      { name: 'BrowseComp', values: { 'GPT-5.5': '84.4%', 'Claude Opus 4.7': '79.3%', 'Gemini 3.1 Pro': '85.9%' } },
      { name: 'BixBench', values: { 'GPT-5.5': '80.5%', 'Claude Opus 4.7': '—', 'Gemini 3.1 Pro': '—' } },
    ],
    pricing: [
      { model: 'GPT-5.5', input: '$5/百万', output: '$30/百万' },
      { model: 'GPT-5.5 Pro', input: '$30/百万', output: '$180/百万' },
      { model: 'Batch/Flex', input: '半价', output: '半价' },
    ],
    useCases: [
      '专业开发者：编码和调试能力业界最佳，适合复杂软件工程任务',
      '科研人员：数学、生物学、遗传学等多个领域的基准领先',
      '企业自动化：FinanceAgent、OfficeQA 等场景直接替代重复性头脑劳动',
      '安全团队：CTF 挑战 88.1% 的成绩证明安全领域能力出众',
      '注意：个人用户和小预算团队成本压力较大，建议使用 Batch API 降低成本',
    ],
    conclusion:
      'GPT-5.5 是目前综合能力最强的模型，尤其在 Agent 编码和知识工作方向建立了明确护城河。如果你追求最高质量且预算充裕，GPT-5.5 是不二之选。对于成本敏感的场景，建议搭配 Batch 处理或选择其他性价比更高的模型。',
  },

  tongyi: {
    slug: 'tongyi',
    name: '阿里云通义千问',
    icon: '🇨🇳',
    badges: [
      { label: '无需代理', variant: 'success' },
      { label: '免费额度', variant: 'success' },
    ],
    tlDr:
      '国内用户首选，每月100万 tokens 免费额度，中文场景优化良好，访问速度快。适合国内初学者和个人开发者。',
    ratings: [
      { label: '质量', score: 4.5, detail: '中文理解和生成质量优秀，日常任务表现出色，复杂推理有差距。' },
      { label: '速度', score: 4.8, detail: '国内部署，响应延迟低，高并发场景下也保持稳定速度。' },
      { label: '性价比', score: 5.0, detail: '每月100万 tokens 免费额度对个人开发者几乎零成本起步，付费价格也远低于国外竞品。' },
      { label: '稳定性', score: 4.7, detail: '阿里云基础设施保障，SLA 99.9%，企业级可用性。' },
    ],
    pros: [
      '每月100万 tokens 免费额度，适合学习和原型开发',
      '国内直接访问，无需代理，响应速度快',
      '中文场景深度优化，理解和生成质量优秀',
      '阿里云生态完善，文档详尽，易于上手',
      'API 兼容 OpenAI 格式，迁移成本低',
      '支持多轮对话、函数调用、JSON 模式等高级功能',
    ],
    cons: [
      '复杂推理和多步逻辑能力略逊于国外旗舰模型',
      '部分高级功能（如超长上下文）需要付费升级',
      '英文和跨语言场景表现不如原生英文模型',
      '开源版本与商业版本有一定差距',
    ],
    useCases: [
      '个人开发者：免费额度足够日常学习和原型开发',
      '中文内容创作：文章、翻译、摘要等中文任务表现优秀',
      '初创企业：低成本起步，按需扩展',
      '教育场景：中文教学辅助、代码辅导等场景非常适合',
      '不适合：对复杂推理和多语言要求极高的企业级应用',
    ],
    conclusion:
      '通义千问是国内用户性价比最高的选择。免费额度、中文优化、低延迟三大优势使其成为个人开发者和中小企业的首选入门模型。',
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
      '长文本处理能力最强，安全性最高，代码能力优秀。200K 上下文窗口，适合需要处理大量文本和注重安全的场景。',
    ratings: [
      { label: '质量', score: 4.8, detail: '文本理解和生成长文本方向顶尖，安全对齐做得最好的模型。' },
      { label: '速度', score: 4.0, detail: '推理速度中规中矩，长文本处理时延迟有所增加。' },
      { label: '性价比', score: 3.8, detail: '定价与 GPT-5.5 接近，但综合能力略逊一筹。' },
      { label: '稳定性', score: 4.9, detail: 'Anthropic 服务成熟，API 可用性极高，企业级可靠。' },
    ],
    pros: [
      '200K 上下文窗口，适合长文档分析、合同审查等场景',
      '安全对齐做得最好，Constitutional AI 确保输出安全可靠',
      '代码能力强劲，Claude Code 是顶级 AI 编程助手',
      '对复杂指令遵循度高，思维严谨细致',
      'API 文档清晰，开发者体验优秀',
    ],
    cons: [
      '国内访问需要代理',
      '推理速度相对较慢',
      '价格较高，与 GPT-5.5 相当但综合能力略逊',
      '多模态能力不及 GPT-5.5',
      '中文能力不如国内模型自然流畅',
    ],
    useCases: [
      '长文档处理：200K 上下文窗口特别适合合同审查、法律文件、学术论文',
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
      { label: '免费试用', variant: 'success' },
    ],
    tlDr:
      '开源生态友好，支持本地部署，性价比高。适合有部署能力的开发者和研究者，数据安全自主可控。',
    ratings: [
      { label: '质量', score: 4.2, detail: '中文场景表现出色，开源模型中的佼佼者，但与闭源旗舰有差距。' },
      { label: '速度', score: 4.5, detail: '国内部署延迟低，本地部署速度取决于硬件配置。' },
      { label: '性价比', score: 4.8, detail: '免费试用 + 开源可自部署，长期成本极低。' },
      { label: '稳定性', score: 4.0, detail: '云端版本稳定，本地部署稳定性取决于运维能力。' },
    ],
    pros: [
      '开源模型可本地部署，数据安全自主可控',
      '国内直接访问，无需代理',
      '免费试用额度充足，降低入门门槛',
      '中文理解和生成能力优秀',
      '支持模型微调，可定制化能力强',
      '开发者生态活跃，社区支持良好',
    ],
    cons: [
      '综合能力与 GPT-5.5、Claude 等国际旗舰有差距',
      '代码和复杂推理能力偏弱',
      '本地部署需要较强硬件和运维能力',
      '英文和跨语言场景表现一般',
      '模型迭代速度慢于国际头部厂商',
    ],
    useCases: [
      '数据安全敏感场景：金融、政务等需要本地部署保证数据不外传',
      '学术研究：开源模型便于研究和实验',
      '中小企业：预算有限但需要可控的 AI 能力',
      '中文定制场景：可通过微调适应特定领域需求',
      '不适合：需要全球最前沿 AI 能力的场景',
    ],
    conclusion:
      '智谱AI GLM 是开源路线的标杆，数据安全+低成本是其核心优势。如果你对数据主权有要求，或希望通过本地部署降低长期成本，GLM 是最合适的选择。',
  },

  kimi: {
    slug: 'kimi',
    name: '月之暗面 Kimi',
    icon: '🌙',
    badges: [
      { label: '无需代理', variant: 'success' },
      { label: '长上下文' },
      { label: '免费额度', variant: 'success' },
    ],
    tlDr:
      'Kimi 适合长文档、资料问答和中文知识工作流。它的优势不是单点跑分，而是把长上下文、文件理解和 OpenAI 兼容接入做得比较顺手，适合国内开发者快速落地。',
    ratings: [
      { label: '质量', score: 4.5, detail: '中文理解、总结和长资料问答表现稳定，适合知识密集型任务。' },
      { label: '速度', score: 4.4, detail: '国内访问延迟友好，长上下文任务会随输入长度增加耗时。' },
      { label: '性价比', score: 4.6, detail: '有免费额度，日常文档处理和中等规模应用成本较好控制。' },
      { label: '稳定性', score: 4.5, detail: '开放平台接入体验成熟，仍需关注模型列表和额度调整。' },
    ],
    pros: [
      '长上下文和文档理解能力突出，适合合同、论文、资料库和报告分析',
      '中文表达自然，摘要、改写、问答等常见任务完成度高',
      'OpenAI 兼容接口迁移成本低，现有 SDK 项目容易接入',
      '国内直连，不需要额外代理环境',
      '适合把 PDF、知识库和客服问答做成轻量应用',
    ],
    cons: [
      '工具调用、复杂 Agent 和极高难度推理场景不一定是首选',
      '多模态和企业生态覆盖不如部分云厂商完整',
      '免费额度、模型名和价格会调整，正式购买前需要核对控制台',
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
      'Kimi 是国内长文本场景里很稳的选择。如果你的核心需求是“读得多、总结准、中文顺”，它比追求极限推理跑分更实用；正式上线前重点确认额度、模型名和长上下文成本。',
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
      '腾讯混元更适合已经在腾讯云、微信生态或企业服务体系里的团队。它的优势是云产品集成、企业稳定性和国内访问体验，适合客服、内容审核、办公自动化和业务系统接入。',
    ratings: [
      { label: '质量', score: 4.4, detail: '通用中文任务表现可靠，多模型覆盖能满足大多数业务接入。' },
      { label: '速度', score: 4.6, detail: '国内云服务延迟低，适合面向国内用户的在线应用。' },
      { label: '性价比', score: 4.4, detail: '轻量模型和资源包适合规模化调用，具体成本取决于模型选择。' },
      { label: '稳定性', score: 4.7, detail: '腾讯云基础设施成熟，企业级运维和权限体系较完整。' },
    ],
    pros: [
      '腾讯云账号体系、费用中心、权限管理和企业运维流程完整',
      '国内访问稳定，适合在线客服、办公系统和内部业务工具',
      '多模型路线覆盖文本、视觉、轻量和推理场景',
      '与微信、小程序、腾讯云函数、COS 等生态协同方便',
      'OpenAI 兼容接入降低迁移成本',
    ],
    cons: [
      '控制台概念较多，新手需要理解地域、密钥、Endpoint 和模型名',
      '如果没有腾讯云使用基础，开通链路会比独立开放平台稍重',
      '最前沿推理和代码场景不一定优于国际旗舰或专项模型',
      '价格、免费额度和资源包策略需要以腾讯云控制台为准',
    ],
    useCases: [
      '企业业务系统：CRM、知识库、工单、客服和办公自动化',
      '微信生态应用：公众号、小程序和企微机器人',
      '腾讯云用户：已有云资源和权限体系时接入成本低',
      '内容生产与审核：中文内容生成、摘要、分类和审核辅助',
      '不适合：只想用最简独立 API、完全不想碰云控制台的新手',
    ],
    conclusion:
      '腾讯混元的价值在“模型 + 云生态”。如果你的业务已经在腾讯云或微信体系里，它会比单独接一个模型更顺；个人开发者也能用，但要留意控制台配置和成本告警。',
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
      '豆包 API 适合高频中文对话、内容生成和对成本敏感的应用。它的亮点是响应速度、价格友好和字节生态能力，适合作为国内项目的默认候选之一。',
    ratings: [
      { label: '质量', score: 4.3, detail: '中文日常问答、内容生成和轻量推理表现均衡，复杂任务需按模型测试。' },
      { label: '速度', score: 4.7, detail: '轻量模型响应快，适合聊天、客服和内容生产类高频调用。' },
      { label: '性价比', score: 4.8, detail: '成本控制友好，适合从免费额度、小额测试逐步放量。' },
      { label: '稳定性', score: 4.5, detail: '火山引擎云服务成熟，正式接入建议配置预算和告警。' },
    ],
    pros: [
      '高性价比，适合高频调用和成本敏感型产品',
      '国内直连，面向国内用户的延迟体验较好',
      '模型类型覆盖文本、视觉、语音、Embedding 等常见方向',
      'OpenAI 兼容接入方便迁移已有项目',
      '字节内容生态经验强，适合内容生成和互动场景',
    ],
    cons: [
      '火山方舟里的模型、Endpoint、地域概念对新手有一定学习成本',
      '复杂推理、严肃代码修复需要与 DeepSeek、Claude、OpenAI 等交叉测试',
      '模型名、免费额度和价格变化较快，正式购买前必须核对控制台',
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
      '豆包的核心吸引力是快、便宜、国内体验顺。它很适合作为中文应用的起步模型；上线前建议用真实业务样本压测质量、延迟和 Token 成本，再决定模型档位。',
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
      'DeepSeek V4 同时发布 Pro 和 Flash 两个版本。Pro 旗舰大模型擅长数学、编程、长文本处理，能力追平世界顶尖闭源模型；Flash 是性价比黑马，推理接近 Pro、速度快、价格极低，日常写代码和问答绰绰有余。',
    ratings: [
      { label: '质量', score: 4.8, detail: 'Pro 在数学（HMMT 95.2）、编程（LiveCodeBench 93.5）等基准追平甚至超越 GPT-5.4；Flash 推理接近 Pro，日常任务差距不大。' },
      { label: '速度', score: 4.6, detail: 'Flash 延迟仅 10 毫秒级，响应极快；Pro 参数大略慢，高峰期可能排队。' },
      { label: '性价比', score: 5.0, detail: 'Pro 输出 6 元/百万 token，Flash 仅 2 元/百万 token，缓存命中时更低。远低于同级别闭源模型。' },
      { label: '稳定性', score: 4.2, detail: '高峰期算力紧张，Pro 可能变慢或排队。建议做好重试和备用方案。' },
    ],
    pros: [
      '数学推理顶级：HMMT 数学竞赛 95.2，超过 GPT-5.4（94.8）和 Gemini 3.1 Pro（92.7）',
      '编程能力突出：LiveCodeBench 93.5，Codeforces 积分 3206，均超 GPT-5.4',
      'Flash 性价比极高：输出 2 元/百万 token，速度 10ms 级别，日常任务无性能断崖',
      '100 万 token 上下文：Pro 和 Flash 均支持，能一次读完两三本《三体》并回答细节',
      'OpenAI 兼容接口：迁移成本低，可接入 Claude Code、Agent 等开发工具和主流客户端',
      '国内直连：无需代理，支持支付宝/微信充值',
      '开源可商用：模型权重开放，适合本地部署和二次开发',
    ],
    cons: [
      '幻觉率偏高：Pro 约 94%、Flash 约 96%，不确定时会编造而非承认不知道，重要信息务必核实',
      '高峰期算力紧张：热门时段 Pro 响应可能变慢或需排队',
      '审美与前端偏弱：能写好逻辑代码，但生成的网页界面不美观，需人工润色',
      '暂无原生多模态：纯文本模型，不能直接识别图片和视频（可配合外部工具）',
      '中文写作美感：在极难的文学性创作上，Claude Opus 4.7 仍稍强',
    ],
    benchmarks: [
      { name: 'GPQA Diamond', values: { 'V4 Pro': '90.1', 'GPT-5.4': '90.5' } },
      { name: 'MMLU-Pro', values: { 'V4 Pro': '87.5', 'GPT-5.4': '87.1' } },
      { name: 'HMMT 数学竞赛', values: { 'V4 Pro': '95.2', 'GPT-5.4': '94.8', 'Gemini 3.1 Pro': '92.7' } },
      { name: 'LiveCodeBench', values: { 'V4 Pro': '93.5', 'GPT-5.4': '91.6' } },
      { name: 'Codeforces', values: { 'V4 Pro': '3206', 'GPT-5.4': '3052' } },
    ],
    pricing: [
      { model: 'V4 Pro', input: '—', output: '6 元/百万 token（~0.85 美元）' },
      { model: 'V4 Flash', input: '—', output: '2 元/百万 token（~0.28 美元）' },
      { model: '缓存命中', input: '—', output: 'Pro 可低至 0.1 元/百万 token' },
    ],
    useCases: [
      '选 Pro：复杂数学/科研推理、大型工程代码、分析整本书或全量代码仓库等深度任务',
      '选 Flash：学生和上班族的写作辅助、查资料、简单代码帮助、实时对话和自动回复',
      '开发者工具链：作为 Claude Code、Agent 框架和自动化脚本的高性价比后端模型',
      '预算敏感生产：在成本约束下追求接近世界顶级的模型能力',
      '不适合：需原生多模态识别、极致文学创作美感、或极高 SLA 的企业关键链路',
    ],
    conclusion:
      'DeepSeek V4 打破了”高端模型=天价”的定式。Pro 让你用合理价格换世界顶级推理能力，Flash 则把高性能 AI 普及到近乎零成本。日常办公选 Flash 足够且便宜得多，追求极致效果选 Pro。两者均为国内直连，是 2026 年性价比最高的模型系列之一。',
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
      'Gemini 的优势是多模态、长上下文和 Google 生态。它适合图像、视频、文档理解和海外产品，但国内访问、账号、支付和区域限制会增加接入成本。',
    ratings: [
      { label: '质量', score: 4.7, detail: '多模态理解和长上下文能力强，通用任务表现位于第一梯队。' },
      { label: '速度', score: 4.6, detail: '海外网络环境下响应快，国内体验取决于代理质量和区域配置。' },
      { label: '性价比', score: 4.4, detail: 'AI Studio 免费额度适合试用，正式生产成本需按 Google Cloud 账单核算。' },
      { label: '稳定性', score: 4.3, detail: '平台能力成熟，但国内网络和账号区域会影响稳定性。' },
    ],
    pros: [
      '多模态能力强，适合图片、音视频、PDF 和网页内容理解',
      '长上下文适合大文档、代码库和资料批量分析',
      'AI Studio 上手快，适合快速创建测试 Key',
      'Google 生态完整，可与 Cloud、Workspace、搜索和数据服务协同',
      '部分模型免费额度友好，适合原型验证',
    ],
    cons: [
      '国内访问通常需要稳定代理，网络质量会直接影响调用体验',
      '付费生产一般涉及 Google Cloud 账号、账单和国际支付',
      '配额、区域、模型命名和 API 版本变化需要持续关注',
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
      'Gemini 很适合多模态和长上下文场景，尤其是海外产品或 Google Cloud 用户。国内项目要先解决网络、账号和支付问题，再评估是否值得作为主模型。',
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
