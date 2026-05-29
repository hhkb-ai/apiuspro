export interface UseCaseRecommendation {
  apiId: string;
  score: number;
  reason: string;
  strengths: string[];
  risks: string[];
}

export interface UseCase {
  id: string;
  name: string;
  description: string;
  heroDescription: string;
  keywords: string[];
  selectionCriteria: { title: string; desc: string }[];
  recommendations: UseCaseRecommendation[];
  primaryPick: string;
  altPick: string;
  notRecommended: string;
  quickPick: string;
}

export const useCases: UseCase[] = [
  {
    id: 'coding',
    name: 'AI 编程助手',
    description: '代码生成、调试、重构、Code Review，让 AI 成为你的结对编程搭档。',
    heroDescription:
      '无论是写新代码、排查 Bug、重构旧项目还是做 Code Review，选对 API 能让开发效率翻倍。编程场景对模型的代码理解力、上下文长度和多语言支持要求最高。',
    keywords: [
      'AI编程助手推荐',
      '写代码用哪个AI API',
      'AI代码生成工具',
      'Claude和GPT哪个适合写代码',
      'Python调用AI API编程',
      '免费AI编程API',
      '国内能用的AI编程API',
      'DeepSeek编程能力怎么样',
      'AI Code Review工具',
      '编程AI模型对比',
    ],
    selectionCriteria: [
      { title: '代码理解力', desc: '准确理解需求意图，生成可运行的代码，而非看似正确但有隐含 Bug 的代码' },
      { title: '上下文窗口', desc: '项目级代码量大，上下文越长越能理解完整代码库，减少来回沟通' },
      { title: '多语言支持', desc: 'Python / TypeScript / Go / Rust 等主流语言都要靠谱，不能只会 Python' },
      { title: '响应速度', desc: '编程时频繁调用，延迟直接影响心流体验，首 token 延迟要低' },
    ],
    primaryPick: 'Claude Opus 4.8',
    altPick: 'DeepSeek V4 Pro',
    notRecommended: '轻量 CRUD 或只写 Python 脚本的场景不需要旗舰模型，用 DeepSeek Flash 或通义千问免费额度即可。',
    quickPick: '国内开发者先用 DeepSeek Flash（免费额度 + 国内直连），复杂项目再切 Claude。海外预算充裕直接选 Claude。',
    recommendations: [
      {
        apiId: 'claude',
        score: 5,
        reason: '代码理解与生成质量最高的模型，长上下文处理能力突出，适合复杂项目。',
        strengths: [
          '200K 上下文窗口，能一次性理解整个项目',
          '代码生成质量高，生成的代码结构清晰、命名规范',
          '擅长 Code Review，能给出有深度的改进建议',
          '对 TypeScript / Python / Go 等语言支持均衡',
        ],
        risks: [
          '需要代理访问，国内直连不稳定',
          '价格较高，高频调用成本需提前预估',
          '中文代码注释质量略逊于英文',
        ],
      },
      {
        apiId: 'openai',
        score: 5,
        reason: 'Agent 能力断档领先，生态最成熟，工具链集成最丰富。',
        strengths: [
          'Agent 智能体能力业界顶尖（Terminal-Bench 82.7%）',
          '1M 上下文窗口，超大项目也能处理',
          'Codex / GitHub Copilot 等工具链生态最完善',
          '函数调用（Function Calling）支持最成熟',
        ],
        risks: [
          '需要代理访问',
          '价格高于多数国内直连模型，需按官方 Pricing 和实际 token 用量核算',
          '需国际信用卡支付',
        ],
      },
      {
        apiId: 'deepseek',
        score: 4,
        reason: '代码能力突出且价格极低，性价比之王，适合日常开发高频调用。',
        strengths: [
          '相比 OpenAI 高端模型通常更便宜，日常开发更容易控本',
          '代码生成能力在开源模型中顶尖',
          '国内直连，无需代理，延迟低',
          '免费额度、赠送余额和活动以 DeepSeek 控制台当前展示为准',
        ],
        risks: [
          '高峰期响应可能变慢或排队',
          '复杂架构设计能力略逊于 Claude / OpenAI',
          '模型仍可能产生幻觉，生成代码需仔细验证',
        ],
      },
      {
        apiId: 'aliyun',
        score: 4,
        reason: '无需代理、免费额度充足，适合国内开发者快速上手。',
        strengths: [
          '国内直连，注册即可用',
          '通义千问代码能力持续提升',
          '阿里云生态集成方便',
          '有免费额度，试错成本低',
        ],
        risks: [
          '复杂代码生成质量与旗舰模型有差距',
          '超长上下文需付费升级',
          '英文代码注释质量一般',
        ],
      },
    ],
  },
  {
    id: 'knowledge',
    name: '个人知识库与数据分析',
    description: '文档理解、知识管理、数据清洗、分析可视化，让 AI 帮你处理信息过载。',
    heroDescription:
      '从海量文档中提取关键信息、构建个人知识库、清洗和分析数据——这些场景需要模型具备强大的文档理解力、长上下文处理能力和结构化输出能力。',
    keywords: [
      'AI数据分析工具推荐',
      '个人知识库用什么AI',
      'AI文档理解API',
      '长文档处理用哪个AI',
      'Obsidian集成AI推荐',
      'AI做数据清洗用什么',
      '多模态AI API推荐',
      'AI知识管理工具',
      '文档摘要AI API',
      'AI结构化数据提取',
    ],
    selectionCriteria: [
      { title: '文档理解力', desc: '能准确理解长文档、PDF、表格等非纯代码内容，提取关键信息' },
      { title: '上下文窗口', desc: '知识库场景文档量大，需要一次性输入大量文本进行分析' },
      { title: '多模态支持', desc: '能处理图片、图表、截图等非文本内容，数据分析场景常涉及图表' },
      { title: '结构化输出', desc: '能稳定输出 JSON / Markdown 表格等结构化格式，方便后续处理' },
    ],
    primaryPick: 'Claude Opus 4.8',
    altPick: 'DeepSeek V4 Pro',
    notRecommended: '只做简单文档摘要的轻量场景，用 DeepSeek Flash 或通义千问免费额度即可，不必上旗舰模型。',
    quickPick: '个人知识库用 Claude（长上下文 + 结构化输出），预算敏感选 DeepSeek Pro。需要图片/图表理解选 Gemini。',
    recommendations: [
      {
        apiId: 'claude',
        score: 5,
        reason: '长上下文 + 文档理解能力最强，适合构建个人知识库和深度文档分析。',
        strengths: [
          '200K 上下文，能一次性处理整本书或大量文档',
          '文档理解准确度高，摘要和提取质量好',
          '输出格式规范，Markdown / JSON 结构化能力强',
          '配合 Obsidian 等工具可构建完整的知识管理工作流',
        ],
        risks: [
          '需要代理访问',
          '价格较高，批量文档处理成本需预估',
          '纯文本模型，图片需额外处理',
        ],
      },
      {
        apiId: 'openai',
        score: 5,
        reason: '多模态能力强，插件生态丰富，数据分析工具链最完善。',
        strengths: [
          '原生支持图片/图表理解，数据分析场景优势明显',
          'Code Interpreter 可直接运行 Python 做数据可视化',
          'Assistants API 支持文件上传和检索',
          '函数调用成熟，适合构建自动化数据处理流水线',
        ],
        risks: [
          '需要代理访问，需国际信用卡',
          '价格高于多数国内直连模型，需按官方 Pricing 和实际 token 用量核算',
          'API 结构相对复杂，学习成本较高',
        ],
      },
      {
        apiId: 'gemini',
        score: 4,
        reason: '原生多模态 + 超长上下文，适合处理混合类型的大量数据。',
        strengths: [
          '原生多模态，文本/图片/视频/音频统一处理',
          '超长上下文窗口，适合大批量文档分析',
          'Google 生态集成，与 Google Drive / Sheets 联动方便',
          '数据理解和图表分析能力突出',
        ],
        risks: [
          '需要代理访问，国内稳定性差',
          '需 Google Cloud 账号和国际支付',
          '配额和区域限制较多',
        ],
      },
      {
        apiId: 'deepseek',
        score: 4,
        reason: '性价比极高，适合高频调用的数据清洗和知识整理任务。',
        strengths: [
          '价格低，数据清洗等高频场景无成本压力',
          '推理能力强，复杂数据分析任务表现好',
          '国内直连，处理国内数据无网络障碍',
          '开源可私有部署，数据安全性高',
        ],
        risks: [
          '高峰期响应可能变慢',
          '模型仍可能产生幻觉，关键数据务必核实',
          '无原生多模态，不能直接处理图片',
        ],
      },
      {
        apiId: 'aliyun',
        score: 3,
        reason: '无需代理、文档处理能力稳定，适合国内用户的轻量知识管理需求。',
        strengths: [
          '国内直连，注册简单',
          '与阿里云 OSS 等存储服务集成方便',
          '有免费额度，适合轻量级文档处理',
          '中文文档理解能力好',
        ],
        risks: [
          '复杂推理能力与旗舰模型有差距',
          '长文档处理需付费升级',
          '多模态支持有限',
        ],
      },
    ],
  },
  {
    id: 'content-creation',
    name: '内容创作与营销文案',
    description: '文章撰写、营销文案、社交媒体内容、短视频脚本，让 AI 成为你的创意搭档。',
    heroDescription:
      '从公众号长文到电商详情页，从短视频脚本到社交媒体文案——内容创作场景需要模型具备出色的语言表达力、创意发散能力和对中文语境的深度理解。选对 API 能让内容产出效率提升数倍。',
    keywords: [
      'AI写作工具推荐',
      'AI营销文案生成',
      'AI写公众号文章',
      'AI短视频脚本工具',
      '中文AI写作API',
      'AI内容创作工具',
      'AI写广告文案',
      'AI生成社交媒体内容',
      'AI写作哪个好',
      '免费AI写作API',
    ],
    selectionCriteria: [
      { title: '中文表达力', desc: '生成的中文内容流畅自然，避免翻译腔和生硬表达，符合国内读者阅读习惯' },
      { title: '创意多样性', desc: '能根据不同风格需求（严肃/幽默/煽情）生成多样化内容，而非千篇一律的模板化输出' },
      { title: '长文生成能力', desc: '能一次性生成结构完整的长文章，保持逻辑连贯性和主题一致性' },
      { title: '成本可控', desc: '内容创作是高频场景，单次调用成本需要足够低才能支撑日常使用' },
    ],
    primaryPick: 'DeepSeek V4 Pro',
    altPick: 'Claude Opus 4.8',
    notRecommended: '需要极致文学美感或品牌调性极严的场景，Claude 更合适。纯批量标题/摘要用 DeepSeek Flash 即可。',
    quickPick: '日常内容创作直接选 DeepSeek（便宜 + 中文好），高质量长文或品牌文案选 Claude。',
    recommendations: [
      {
        apiId: 'deepseek',
        score: 5,
        reason: '中文表达能力出色且价格极低，是内容创作场景的性价比之王。',
        strengths: [
          '中文语感自然，生成内容几乎无翻译腔',
          '相比海外高端模型通常更容易控本，高频创作成本压力较小',
          '国内直连，响应速度快，适合批量内容生产',
          '推理能力强，能理解复杂的创作需求和风格要求',
        ],
        risks: [
          '文学性创作美感略逊于 Claude',
          '模型仍可能产生幻觉，事实性内容需核实',
          '高峰期响应可能变慢',
        ],
      },
      {
        apiId: 'claude',
        score: 5,
        reason: '语言表达细腻、创意能力强，适合高质量深度内容创作。',
        strengths: [
          '语言组织能力顶尖，长文逻辑连贯、结构清晰',
          '创意发散能力强，能产出有新意的文案和观点',
          '对语气和风格的把控精准，可适配不同品牌调性',
          '200K 上下文，适合基于大量参考资料的深度创作',
        ],
        risks: [
          '需要代理访问',
          '价格较高，批量创作成本需预估',
          '中文语感不如国产模型自然',
        ],
      },
      {
        apiId: 'aliyun',
        score: 4,
        reason: '无需代理、中文优化好，适合国内用户的日常内容创作需求。',
        strengths: [
          '国内直连，注册即可用，无网络障碍',
          '通义千问中文理解能力强，文案质量稳定',
          '有免费额度，适合个人创作者试用',
          '与阿里云生态集成，可配合其他工具使用',
        ],
        risks: [
          '创意多样性不如 DeepSeek 和 Claude',
          '长文生成能力有限',
          '风格切换灵活度一般',
        ],
      },
      {
        apiId: 'zhipu',
        score: 4,
        reason: '国产模型中中文创作能力突出，性价比高。',
        strengths: [
          '中文语境理解深入，生成内容贴合国内用户习惯',
          '支持多种内容风格切换',
          '国内直连，无需代理',
          '有免费额度，上手门槛低',
        ],
        risks: [
          '综合创作能力与 DeepSeek / Claude 有差距',
          '长文逻辑连贯性一般',
          '英文创作能力偏弱',
        ],
      },
    ],
  },
  {
    id: 'chatbot',
    name: '智能客服与聊天机器人',
    description: '在线客服、FAQ 自动回复、多轮对话、工单处理，用 AI 打造 7×24 小时智能服务。',
    heroDescription:
      '搭建智能客服或聊天机器人，需要模型具备稳定的多轮对话能力、准确的知识库检索和对业务场景的深度理解。选对 API 能大幅降低人工客服成本，同时提升用户满意度。',
    keywords: [
      'AI客服机器人搭建',
      '智能客服API推荐',
      'AI聊天机器人开发',
      '多轮对话AI API',
      'AI客服系统方案',
      '在线客服AI接入',
      '企业AI客服解决方案',
      'AI工单自动处理',
      '客服机器人用什么模型',
      '低延迟AI对话API',
    ],
    selectionCriteria: [
      { title: '多轮对话稳定性', desc: '能在长对话中保持上下文连贯，不会"失忆"或前后矛盾' },
      { title: '响应延迟', desc: '客服场景对实时性要求高，首 token 延迟需要尽可能低' },
      { title: '知识库集成', desc: '支持 RAG 或函数调用，能对接企业内部知识库和工单系统' },
      { title: '并发与限流', desc: '企业级客服场景需要高并发支持，API 的 QPS 限制和扩容能力很关键' },
    ],
    primaryPick: 'DeepSeek V4 Pro',
    altPick: '阿里云通义千问',
    notRecommended: '需要极致 Agent 编排能力的复杂客服流程，OpenAI Function Calling 更成熟。纯简单 FAQ 回复用轻量模型即可。',
    quickPick: '国内客服系统首选 DeepSeek（便宜 + 快 + 函数调用好），需要企业合规选阿里云。海外项目选 OpenAI。',
    recommendations: [
      {
        apiId: 'deepseek',
        score: 5,
        reason: '价格极低、响应快，是搭建高并发客服系统的首选。',
        strengths: [
          '价格极低，大规模并发场景成本可控',
          '国内直连，延迟低，用户体验好',
          '函数调用支持好，可对接工单和知识库系统',
          '开源可私有部署，数据安全有保障',
        ],
        risks: [
          '高峰期响应可能变慢或排队',
          '模型仍可能产生幻觉，客服回复需设审核机制',
          '复杂多步工具调用不如 OpenAI 稳定',
        ],
      },
      {
        apiId: 'openai',
        score: 5,
        reason: 'Function Calling 生态最成熟，适合构建复杂的客服 Agent。',
        strengths: [
          'Function Calling 支持最成熟，对接外部系统能力强',
          'Assistants API 支持文件检索，可直接对接知识库',
          '多轮对话稳定性好，上下文保持能力强',
          '生态完善，有大量客服场景的最佳实践',
        ],
        risks: [
          '需要代理访问，国内延迟高',
          '价格高于多数国内直连模型，需按官方 Pricing 和实际 token 用量核算',
          '需国际信用卡支付',
        ],
      },
      {
        apiId: 'aliyun',
        score: 4,
        reason: '国内直连、企业级稳定性好，适合对合规性要求高的企业。',
        strengths: [
          '阿里云企业级基础设施，稳定性有保障',
          '国内合规，适合金融、医疗等敏感行业',
          '与钉钉、阿里云客服系统深度集成',
          '有专属企业版方案，支持定制化需求',
        ],
        risks: [
          '复杂对话编排能力不如 DeepSeek / OpenAI',
          '高级功能需付费升级',
          '与非阿里云生态集成需额外开发',
        ],
      },
      {
        apiId: 'zhipu',
        score: 4,
        reason: '国产模型中对话能力突出，企业级支持好。',
        strengths: [
          '中文对话自然流畅，客服场景体验好',
          '有企业级 API 方案，支持高并发',
          '国内直连，数据合规',
          '支持知识库对接和函数调用',
        ],
        risks: [
          '综合能力与 DeepSeek / OpenAI 有差距',
          '开源版本与商业版有差距',
          '生态和文档不如头部厂商完善',
        ],
      },
    ],
  },
  {
    id: 'translation',
    name: '翻译与多语言处理',
    description: '文档翻译、本地化、多语言内容生成、跨语言沟通，让 AI 打破语言壁垒。',
    heroDescription:
      '无论是技术文档翻译、产品本地化还是跨语言商务沟通，AI 翻译已远超传统机翻的水平。选对 API 能获得接近人工翻译的质量，同时处理速度提升百倍。',
    keywords: [
      'AI翻译API推荐',
      'AI文档翻译工具',
      'AI翻译质量对比',
      '多语言AI API',
      '技术文档AI翻译',
      'AI本地化工具',
      'AI翻译哪个好',
      '中英翻译AI API',
      'AI批量翻译方案',
      '免费AI翻译API',
    ],
    selectionCriteria: [
      { title: '翻译质量', desc: '译文准确、地道，能处理专业术语和复杂句式，而非逐字硬译' },
      { title: '多语言覆盖', desc: '支持的语言种类要广，尤其是小语种支持能力' },
      { title: '上下文理解', desc: '能理解整篇文档的语境，保持术语一致性，而非逐句独立翻译' },
      { title: '批量处理能力', desc: '支持长文档和批量翻译，上下文窗口要足够大' },
    ],
    primaryPick: 'Claude Opus 4.8',
    altPick: 'DeepSeek V4 Pro',
    notRecommended: '小语种翻译或图片文字翻译，Gemini 更合适。简单短文翻译用 DeepSeek Flash 即可。',
    quickPick: '高质量文档翻译选 Claude（术语一致 + 长文好），日常翻译选 DeepSeek（便宜）。小语种选 Gemini。',
    recommendations: [
      {
        apiId: 'claude',
        score: 5,
        reason: '长上下文 + 语言理解能力最强，适合高质量文档翻译和本地化。',
        strengths: [
          '200K 上下文，能一次性翻译整本书或长文档',
          '翻译质量高，译文地道自然，术语准确',
          '能保持长文档的术语一致性和风格统一',
          '支持多种语言，小语种翻译质量也很好',
        ],
        risks: [
          '需要代理访问',
          '价格较高，大批量翻译成本需预估',
          '翻译速度受上下文长度影响',
        ],
      },
      {
        apiId: 'deepseek',
        score: 4,
        reason: '中文翻译质量好且价格极低，适合大批量翻译任务。',
        strengths: [
          '中英互译质量出色，性价比极高',
          '价格低，大批量翻译场景成本可控',
          '国内直连，翻译国内文档无网络障碍',
          '推理能力强，能理解专业术语和上下文',
        ],
        risks: [
          '小语种翻译质量不如 Claude / Gemini',
          '超长文档需分段处理',
          '模型仍可能产生幻觉，专业术语翻译需人工校验',
        ],
      },
      {
        apiId: 'gemini',
        score: 4,
        reason: 'Google 翻译技术积累深厚，多语言覆盖最广。',
        strengths: [
          '支持 100+ 语言，小语种覆盖最广',
          '原生多模态，可翻译图片中的文字',
          '超长上下文，适合长文档翻译',
          'Google 翻译技术积累，基础翻译质量有保障',
        ],
        risks: [
          '需要代理访问，国内稳定性差',
          '需 Google Cloud 账号和国际支付',
          '中文翻译质量不如国产模型自然',
        ],
      },
      {
        apiId: 'openai',
        score: 4,
        reason: '通用翻译能力强，生态工具丰富。',
        strengths: [
          '翻译质量稳定，各语种表现均衡',
          'API 生态成熟，有大量翻译工具集成',
          '支持函数调用，可构建自动化翻译流水线',
          '多模态支持，可处理图片和文档翻译',
        ],
        risks: [
          '需要代理访问',
          '价格高于多数国内直连模型，需按官方 Pricing 和实际 token 用量核算',
          '中文翻译语感不如国产模型',
        ],
      },
    ],
  },
  {
    id: 'education',
    name: '教育辅导与学习助手',
    description: '知识问答、题目解析、学习计划、论文辅助，让 AI 成为你的私人教师。',
    heroDescription:
      '从 K12 答疑到考研备考，从论文写作到技能学习——教育辅导场景需要模型具备准确的知识储备、清晰的讲解能力和耐心的引导方式。选对 API 能让学习效率大幅提升。',
    keywords: [
      'AI教育辅导工具',
      'AI学习助手推荐',
      'AI题目解析API',
      'AI写论文辅助',
      'AI答疑工具',
      'AI学习计划生成',
      '学生用AI API',
      'AI教学助手方案',
      'AI知识问答API',
      '免费AI学习工具',
    ],
    selectionCriteria: [
      { title: '知识准确性', desc: '回答必须准确可靠，教育场景容错率低，错误信息会误导学习者' },
      { title: '讲解清晰度', desc: '能用简单易懂的语言解释复杂概念，循序渐进地引导理解' },
      { title: '多学科覆盖', desc: '需要覆盖文理多个学科，不能只擅长某一领域' },
      { title: '互动引导能力', desc: '不是直接给答案，而是通过提问和引导帮助学习者自己思考' },
    ],
    primaryPick: 'DeepSeek V4 Pro',
    altPick: 'Claude Opus 4.8',
    notRecommended: '需要极致论文润色或长文献综述，Claude 更合适。简单题目答疑用 DeepSeek Flash 免费额度即可。',
    quickPick: '学生党首选 DeepSeek（免费 + 数学推理强 + 国内直连），论文写作选 Claude（长文逻辑好）。',
    recommendations: [
      {
        apiId: 'claude',
        score: 5,
        reason: '讲解最有耐心、逻辑最清晰，适合深度学习和论文辅助。',
        strengths: [
          '讲解风格耐心细致，善于循序渐进引导',
          '逻辑推理能力强，题目解析步骤清晰',
          '长上下文适合论文写作和文献综述',
          '安全性好，不会生成有害或误导性内容',
        ],
        risks: [
          '需要代理访问',
          '价格较高，学生群体成本压力大',
          '中文讲解语感不如国产模型自然',
        ],
      },
      {
        apiId: 'deepseek',
        score: 5,
        reason: '推理能力强且价格极低，是学生群体的最佳选择。',
        strengths: [
          '数学和逻辑推理能力突出，理科答疑准确',
          '价格极低，学生党也能高频使用',
          '国内直连，无需代理，随时随地可用',
          '免费额度、赠送余额和活动以 DeepSeek 控制台当前展示为准',
        ],
        risks: [
          '模型仍可能产生幻觉，答案需交叉验证',
          '高峰期响应可能变慢',
          '文科类讲解深度不如 Claude',
        ],
      },
      {
        apiId: 'openai',
        score: 4,
        reason: '知识储备最全面，多学科覆盖能力强。',
        strengths: [
          '训练数据覆盖广泛，多学科知识储备丰富',
          'Code Interpreter 可辅助数学计算和数据可视化',
          '多模态支持，可解析题目图片',
          '生态丰富，有大量教育类应用案例',
        ],
        risks: [
          '需要代理访问',
          '价格高于多数国内直连模型，需按官方 Pricing 和实际 token 用量核算',
          '需国际信用卡支付',
        ],
      },
      {
        apiId: 'aliyun',
        score: 3,
        reason: '无需代理、免费额度充足，适合国内学生的轻量学习需求。',
        strengths: [
          '国内直连，注册简单，学生也能轻松使用',
          '有免费额度，学习使用零成本',
          '中文理解好，适合中文学习场景',
          '与阿里云教育生态有集成潜力',
        ],
        risks: [
          '复杂推理能力与旗舰模型有差距',
          '深度讲解能力有限',
          '高级功能需付费升级',
        ],
      },
    ],
  },
];

export function getUseCaseById(id: string): UseCase | undefined {
  return useCases.find((uc) => uc.id === id);
}

export function getAllUseCaseIds(): string[] {
  return useCases.map((uc) => uc.id);
}
