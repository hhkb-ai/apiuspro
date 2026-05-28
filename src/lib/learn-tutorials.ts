export type LearnTable = {
  headers: string[];
  rows: string[][];
};

export type LearnCode = {
  title: string;
  language: string;
  content: string;
};

export type LearnSection = {
  title: string;
  intro?: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: LearnTable;
  code?: LearnCode;
  flow?: string[];
  warning?: string;
  tips?: string[];
};

export type LearnArticle = {
  slug: string;
  path: string;
  order: number;
  title: string;
  description: string;
  readingTime: string;
  tags: string[];
  learnings: string[];
  sections: LearnSection[];
  summary: string[];
  next?: {
    title: string;
    href: string;
  };
};

export const learnTutorials: LearnArticle[] = [
  {
    slug: 'ai-basics',
    path: '/learn/ai-basics',
    order: 1,
    title: 'AI 新手入门 01：AI、模型和使用方式',
    description: '用最简单的语言理解 AI、模型、网页聊天、API 接入和 AI 工具之间的区别。',
    readingTime: '约 8 分钟',
    tags: ['AI 基础', '模型', '学习路线'],
    learnings: ['AI 是什么', '模型是什么', '网页聊天、API 和 AI 工具有什么区别', '新手应该按什么顺序学习'],
    sections: [
      {
        title: '一、AI 是什么？',
        paragraphs: [
          'AI 可以先理解成一个【会阅读、会总结、会写作、会分析、会写代码】的智能助手。你给它资料和任务，它根据已有能力生成回答。',
          '生活化理解：AI 像一个学习能力很强的助理，但它不是亲眼看过世界的真人。它能帮你整理信息、生成方案，但重要信息仍然需要你自己验证。',
          '记住一句话：【AI 不是万能的，重要信息必须验证】。涉及账号、支付、法律、医疗、财务、生产环境代码时，不要直接照抄。'
        ],
        table: {
          headers: ['AI 能力', '能帮你做什么', '新手例子'],
          rows: [
            ['问答', '解释概念、回答问题', '问“什么是 API Key？”'],
            ['写作', '写文章、标题、短视频脚本', '生成网站教程初稿'],
            ['总结', '把长文整理成重点', '总结一份 PDF 学习资料'],
            ['翻译', '中英互译、润色表达', '翻译英文文档说明'],
            ['编程', '写代码、查 bug、解释报错', '让 AI 修改首页组件'],
            ['学习辅导', '拆解知识点、安排学习路线', '制定 AI API 入门计划']
          ]
        }
      },
      {
        title: '二、模型是什么？',
        paragraphs: [
          '模型可以理解成 AI 的“大脑”。不同模型的能力侧重点不同，有的更适合写作，有的更适合写代码，有的更擅长推理或处理长文档。',
          '新手不需要一开始研究所有模型。更重要的是先学会：如何描述问题、如何检查回答、如何把 AI 用到真实任务里。'
        ],
        table: {
          headers: ['模型类型', '适合场景', '生活化解释'],
          rows: [
            ['写作模型', '文章、文案、总结', '像文字编辑'],
            ['编程模型', '代码生成、修 bug', '像开发助手'],
            ['推理模型', '复杂分析、步骤推导', '像会拆题的老师'],
            ['长上下文模型', '长文档、长代码库', '像能读厚书的助理'],
            ['多模态模型', '图片、截图、文档理解', '像能看图说话的助手']
          ]
        },
        warning: '模型名称、可用能力和平台政策可能变化，实际使用时以官方控制台或文档显示为准。'
      },
      {
        title: '三、网页聊天、API、AI 工具有何区别？',
        table: {
          headers: ['使用方式', '适合谁', '典型用途', '新手注意'],
          rows: [
            ['网页聊天', '刚入门用户', '直接打开 AI 网站提问', '先练清楚表达需求'],
            ['API 接入', '想把 AI 接入程序的人', '网站、机器人、自动化流程', '要保护 API Key'],
            ['AI 工具', '写代码或做项目的人', 'Codex、Claude Code、Cursor、CC Switch', '要限制修改范围']
          ]
        },
        paragraphs: [
          '网页聊天就像你直接和 AI 对话；API 接入是让你的网站或程序替你和 AI 对话；AI 工具则是在写代码、改项目、整理资料时，把 AI 放进真实工作流。'
        ]
      },
      {
        title: '四、新手学习顺序',
        flow: ['先学会网页聊天', '理解模型和 Token', '学习提示词', '理解 API Key / Base URL / 模型名称', '完成第一次 API 调用', '使用 Codex / Claude Code / CC Switch', '做一个完整的小项目'],
        paragraphs: [
          '这个顺序的核心是先低成本理解概念，再进入 API 和项目实战。不要一开始就追求复杂工具，否则很容易卡在配置和报错里。'
        ],
        code: {
          title: '推荐学习路线',
          language: 'text',
          content: '先学会网页聊天\n  ↓\n理解模型和 Token\n  ↓\n学习提示词\n  ↓\n理解 API Key / Base URL / 模型名称\n  ↓\n完成第一次 API 调用\n  ↓\n使用 Codex / Claude Code / CC Switch\n  ↓\n做一个完整的小项目'
        }
      },
      {
        title: '五、常见误区',
        bullets: ['以为模型越新就一定越适合自己', '以为 AI 输出一定正确', '直接复制别人提示词但不理解', '把 API Key 发给别人或提交到公开仓库', '不知道 Base URL 和模型名称要对应'],
        tips: ['先从一个真实小任务开始，例如写一篇教程、整理一段代码、做一个页面。', '每次让 AI 输出前，先说明目标读者、输出格式和限制条件。']
      }
    ],
    summary: ['AI 可以理解成智能助手，但不是万能真理来源。', '模型是 AI 的“大脑”，不同模型适合不同任务。', '网页聊天、API 接入、AI 工具是三种不同使用方式。', '新手先练提示词，再学 API，最后进入项目实战。'],
    next: { title: 'AI 新手入门 02：提示词基础，怎么把问题问清楚', href: '/learn/prompt-basics' }
  },
  {
    slug: 'prompt-basics',
    path: '/learn/prompt-basics',
    order: 2,
    title: 'AI 新手入门 02：提示词基础，怎么把问题问清楚',
    description: '学习提示词的 6 个核心要素，解决 AI 回答空泛、不准确、不符合需求的问题。',
    readingTime: '约 10 分钟',
    tags: ['提示词', '提问方法', '输出格式'],
    learnings: ['提示词是什么', '为什么问法会影响结果', '好提示词包含哪些要素', '如何让 AI 输出更稳定'],
    sections: [
      {
        title: '一、提示词是什么？',
        paragraphs: [
          '提示词就是你对 AI 下达的任务说明。它不只是一个问题，而是包含任务、背景、目标读者、输出格式和限制条件的一段说明。',
          '生活化理解：你请别人帮你做事，如果只说“帮我弄好一点”，对方很难知道你要什么；如果你说清楚目标、风格、格式和禁忌，对方就更容易交付正确结果。',
          '提示词不是越长越好，而是【信息越清楚越好】。'
        ]
      },
      {
        title: '二、为什么问得模糊，AI 就答得模糊？',
        table: {
          headers: ['模糊提问', '可能问题', '更好的提问'],
          rows: [
            ['帮我写文章', '不知道主题、读者、长度', '帮我写一篇给 AI 新手看的教程文章'],
            ['做个网站', '不知道类型、功能、风格', '做一个 AI API 教程网站首页'],
            ['优化一下', '不知道优化目标', '从 SEO、阅读体验、移动端适配三个方面优化'],
            ['帮我修 bug', '不知道报错和复现步骤', '根据以下报错和操作步骤定位原因并给出最小修改']
          ]
        }
      },
      {
        title: '三、好提示词的 6 个要素',
        table: {
          headers: ['要素', '作用', '示例'],
          rows: [
            ['角色', '让 AI 知道用什么身份回答', '你是一名前端工程师'],
            ['任务', '说明要完成什么', '帮我优化首页排版'],
            ['背景', '提供项目或内容上下文', '这是一个 AI API 教程网站'],
            ['目标读者', '控制语言难度', '面向完全新手'],
            ['输出格式', '减少返工', '使用 Markdown，必须有表格'],
            ['限制条件', '避免乱做', '不要修改现有路由，不写价格']
          ]
        }
      },
      {
        title: '四、错误提示词 vs 优化提示词',
        code: {
          title: '提示词对比',
          language: 'text',
          content: '错误：\n帮我写一篇 AI 教程。\n\n优化：\n请为 apiuspro.cn 写一篇 AI 新手教程文章。\n目标读者是完全不了解 AI 的新手。\n文章主题是“什么是 API Key”。\n要求使用 Markdown，语言简单，必须有表格和示例。\n最后要有总结和下一步学习建议。'
        },
        paragraphs: ['优化后的提示词并不是更复杂，而是把任务边界说清楚了。AI 知道给谁写、写什么、怎么写、不能写什么。']
      },
      {
        title: '五、新手万能提示词模板',
        code: {
          title: '可复制模板',
          language: 'text',
          content: '请你扮演【角色】。\n\n我要完成的任务是：\n【具体任务】\n\n背景信息：\n【项目/文章/代码/网站背景】\n\n目标读者或使用者：\n【新手/开发者/学生/用户】\n\n输出要求：\n1. 【格式要求】\n2. 【语言风格】\n3. 【必须包含的内容】\n4. 【不要出现的内容】\n\n请先给出结构，再生成完整内容。'
        },
        tips: ['提示词可以迭代。先让 AI 给结构，再让它生成正文，最后让它检查问题。', '修改内容时不要只说“改好一点”，要告诉它从哪些方面改。']
      },
      {
        title: '六、提示词迭代流程',
        flow: ['先说清楚大方向', '让 AI 给出初稿', '指出哪里不满意', '要求按指定方向修改', '检查结果是否符合需求'],
        warning: '不要一次让 AI 同时完成文章、代码、SEO、设计、部署所有任务。新手更适合小步修改。'
      }
    ],
    summary: ['提示词是任务说明，不是魔法咒语。', '好提示词要包含角色、任务、背景、读者、格式和限制。', 'AI 输出不满意时，优先补充信息，而不是直接换模型。', '先结构、再正文、再检查，是更稳定的工作流。'],
    next: { title: 'AI 新手入门 03：Token、上下文和为什么 AI 会忘记', href: '/learn/token-context' }
  },
  {
    slug: 'token-context',
    path: '/learn/token-context',
    order: 3,
    title: 'AI 新手入门 03：Token、上下文和为什么 AI 会忘记',
    description: '理解 Token、上下文、长文本限制，并学会减少 Token 浪费。',
    readingTime: '约 9 分钟',
    tags: ['Token', '上下文', '长文本'],
    learnings: ['Token 是什么', '上下文是什么', '为什么 AI 会忘记', '如何处理长文章、长代码和长 PDF'],
    sections: [
      {
        title: '一、Token 是什么？',
        paragraphs: [
          'Token 可以简单理解成 AI 阅读和输出内容时使用的“文字单位”。中文、英文、符号、代码都会被拆成一定数量的 Token。',
          '生活化理解：就像打车按里程计费，AI API 通常会根据输入和输出内容量计算消耗。内容越长，消耗越多。',
          '新手不需要精确计算每个 Token，先理解【内容越长，消耗越多】即可。'
        ]
      },
      {
        title: '二、上下文是什么？',
        paragraphs: [
          '上下文就是 AI 当前能看到的聊天记录、文件内容、代码内容和你提供的背景信息。',
          '你可以把上下文理解成 AI 的“当前桌面”。桌面上放了哪些资料，AI 就基于哪些资料回答；资料太多太乱，它就可能抓不住重点。'
        ]
      },
      {
        title: '三、为什么 AI 会忘记？',
        table: {
          headers: ['情况', '可能原因', '解决方法'],
          rows: [
            ['AI 忘记项目要求', '上下文太长', '重新贴项目规则或写成项目说明'],
            ['AI 改错文件', '文件范围不清楚', '指定文件名和修改范围'],
            ['AI 回答跑题', '任务目标不明确', '重新说明目标和输出格式'],
            ['总结不完整', '原文太长', '分段处理并要求等待指令'],
            ['代码越改越乱', '一次任务太大', '只让它修一个 bug 或一个组件']
          ]
        }
      },
      {
        title: '四、哪些行为最消耗 Token？',
        table: {
          headers: ['行为', '为什么消耗大', '优化方法'],
          rows: [
            ['一次粘贴大量代码', '输入内容很长', '只贴相关文件和报错'],
            ['让 AI 输出超长文章', '输出内容很长', '先列提纲，再分章节生成'],
            ['重复发送相同背景', '重复输入', '整理成固定项目说明'],
            ['上传大文件不说明重点', 'AI 需要自己判断重点', '先告诉它要看什么'],
            ['反复让 AI 全量重写', '每次都重新生成', '要求只修改指定段落']
          ]
        }
      },
      {
        title: '五、长内容应该怎么问？',
        code: {
          title: '长内容处理模板',
          language: 'text',
          content: '我会分段发送一篇长文章。\n请你先不要总结，等我发送“开始分析”后再处理。\n\n你的任务是：\n1. 提取核心观点\n2. 找出适合新手阅读的部分\n3. 改写成网站教程风格\n4. 不要逐字翻译，请整理成清晰结构'
        },
        tips: ['长代码也一样，先说明目标，再贴相关文件，不要一次把整个项目全部丢给 AI。', '长 PDF 建议先让 AI 输出目录和重点，再选择章节深入分析。']
      },
      {
        title: '六、推荐的新手工作流',
        flow: ['先整理需求', '只提供相关资料', '让 AI 先总结结构', '确认结构没问题', '分段生成正文或代码', '最后让 AI 检查错误'],
        code: {
          title: '长代码修改模板',
          language: 'text',
          content: '我会发送项目中的相关代码。\n请你只分析我发送的代码，不要假设其他文件。\n\n我的目标是：\n【说明要修复的问题】\n\n请输出：\n1. 问题原因\n2. 需要修改的文件\n3. 最小修改方案\n4. 修改后的完整代码\n5. 为什么这样修改'
        }
      }
    ],
    summary: ['Token 可以理解成 AI 处理内容的文字单位。', '上下文是 AI 当前能看到的资料范围。', 'AI 忘记通常不是故障，而是上下文太长或信息不清。', '长内容要分段处理，代码修改要控制范围。'],
    next: { title: 'AI 新手入门 04：API Key、Base URL 和模型名称', href: '/learn/api-key-base-url-model' }
  },
  {
    slug: 'api-key-base-url-model',
    path: '/learn/api-key-base-url-model',
    order: 4,
    title: 'AI 新手入门 04：API Key、Base URL 和模型名称',
    description: '解释 API Key、Base URL、模型名称和请求配置之间的关系。',
    readingTime: '约 9 分钟',
    tags: ['API Key', 'Base URL', '模型名称'],
    learnings: ['API Key 是什么', 'Base URL 是什么', '模型名称是什么', '为什么三者必须对应', '如何保护密钥安全'],
    sections: [
      {
        title: '一、API 是什么？',
        paragraphs: [
          'API 可以理解成软件之间沟通的接口。网页聊天是你直接和 AI 聊天，API 则是你的网站、程序或工具替你和 AI 沟通。',
          '生活化理解：你在外卖 App 下单，App 会把订单发给商家系统。这里的“下单接口”就像 API。AI API 也是类似逻辑：程序发送请求，AI 返回结果。'
        ]
      },
      {
        title: '二、API Key 是什么？',
        paragraphs: ['API Key 可以理解成访问 AI 服务的“钥匙”或“身份凭证”。平台通过它判断是谁在调用、是否有权限、消耗算到哪个账户。'],
        table: {
          headers: ['项目', '说明'],
          rows: [
            ['API Key', '证明你有权限调用服务'],
            ['作用', '认证身份、统计调用、关联账户'],
            ['风险', '泄露后可能被别人使用'],
            ['正确做法', '放在环境变量或本地安全配置中']
          ]
        },
        warning: 'API Key 不能公开、不能发给陌生人、不能上传到公开代码仓库。泄露后应立即删除或重置。'
      },
      {
        title: '三、Base URL 是什么？',
        paragraphs: [
          'Base URL 是 API 请求发送到哪里。API Key 是钥匙，Base URL 是地址。钥匙和地址都要对，才能打开正确的门。',
          '不同服务商的 Base URL 可能不同，不要把 A 平台的 Key 和 B 平台的 Base URL 混用。'
        ],
        code: {
          title: 'Base URL 示例',
          language: 'text',
          content: 'https://api.example.com/v1'
        }
      },
      {
        title: '四、模型名称是什么？',
        paragraphs: ['模型名称就是告诉 API：这次请求要使用哪个 AI 模型。模型名必须以服务商文档或平台后台显示为准。'],
        code: {
          title: '模型名称示意',
          language: 'json',
          content: '{\n  "model": "your-model-name"\n}'
        }
      },
      {
        title: '五、三者之间的关系',
        table: {
          headers: ['配置项', '可以理解成', '常见错误'],
          rows: [
            ['API Key', '钥匙', '填错、泄露、过期'],
            ['Base URL', '地址', '服务商地址填错'],
            ['Model', '要使用的大脑', '模型名不存在或无权限'],
            ['Headers', '请求身份信息', 'Authorization 格式错误']
          ]
        },
        code: {
          title: '环境变量配置示意',
          language: 'env',
          content: 'AI_API_KEY=你的_API_Key\nAI_BASE_URL=https://api.example.com/v1\nAI_MODEL=your-model-name'
        }
      },
      {
        title: '六、新手最常见报错',
        table: {
          headers: ['报错现象', '可能原因', '解决方向'],
          rows: [
            ['Unauthorized / 401', 'API Key 错误', '检查 Key 是否复制完整'],
            ['Model not found', '模型名称错误', '检查模型名和权限'],
            ['Invalid URL', 'Base URL 错误', '检查地址格式'],
            ['Rate limit / 429', '调用过快或额度限制', '降低频率或查看后台'],
            ['Network error', '网络或代理问题', '检查网络环境']
          ]
        },
        tips: ['排查顺序：API Key → Base URL → 模型名称 → JSON 格式 → 网络环境。', '不要直接复制陌生教程里的旧配置，最终以当前服务商官方文档为准。']
      }
    ],
    summary: ['API Key 是钥匙，Base URL 是地址，模型名称是要调用的大脑。', '三者必须对应同一个服务商和接口格式。', 'API Key 属于敏感信息，不要出现在前端代码、截图和公开仓库中。', '遇到报错先按 Key、URL、模型名、格式、网络的顺序排查。'],
    next: { title: 'AI 新手入门 05：完成第一次 API 调用', href: '/learn/first-api-call' }
  },
  {
    slug: 'first-api-call',
    path: '/learn/first-api-call',
    order: 5,
    title: 'AI 新手入门 05：完成第一次 API 调用',
    description: '用 curl 跑通第一次 AI API 调用，理解请求、响应和常见报错排查。',
    readingTime: '约 10 分钟',
    tags: ['API 调用', 'curl', '调试'],
    learnings: ['一次 API 调用包含哪些部分', '请求和响应分别是什么', '如何用 curl 测试', '如何看懂返回结果', '如何排查常见错误'],
    sections: [
      {
        title: '一、什么是一次 API 调用？',
        paragraphs: [
          '一次 API 调用就是你的程序向 AI 服务发送一段请求，然后 AI 返回结果。',
          '生活化理解：你在外卖软件提交订单，这是请求；商家处理订单，这是服务端处理；商家给你结果，这是响应。AI API 也是类似流程。'
        ]
      },
      {
        title: '二、一次请求通常包含什么？',
        table: {
          headers: ['部分', '作用'],
          rows: [
            ['URL', '请求发送到哪里'],
            ['Method', '请求方法，常见是 POST'],
            ['Headers', '身份认证和内容类型'],
            ['Body', '发送给 AI 的具体内容'],
            ['Model', '选择使用哪个模型'],
            ['Messages/Input', '你想让 AI 处理的问题']
          ]
        }
      },
      {
        title: '三、curl 是什么？',
        paragraphs: [
          'curl 是一个命令行工具，可以用来测试 API。新手第一次调用 API，建议先用 curl 测试，成功后再写进代码里。',
          '这样做的好处是：如果 curl 都不通，说明问题大概率在 Key、Base URL、模型名或网络，而不是你的项目代码。'
        ]
      },
      {
        title: '四、第一次调用示例',
        code: {
          title: 'curl 请求示例',
          language: 'bash',
          content: 'curl https://api.example.com/v1/chat/completions \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -d \'{\n    "model": "your-model-name",\n    "messages": [\n      {\n        "role": "user",\n        "content": "请用一句话解释什么是 API。"\n      }\n    ]\n  }\''
        },
        bullets: ['URL 是请求地址。', 'Authorization 是身份认证。', 'model 是模型名称。', 'messages 是发送给 AI 的内容。']
      },
      {
        title: '五、如何看懂返回结果？',
        code: {
          title: '简化响应示例',
          language: 'json',
          content: '{\n  "choices": [\n    {\n      "message": {\n        "role": "assistant",\n        "content": "API 是软件之间互相沟通的接口。"\n      }\n    }\n  ]\n}'
        },
        paragraphs: ['通常你需要重点关注 AI 返回的正文内容，而不是所有字段。不同平台响应字段可能略有差异，实际以对应接口文档为准。']
      },
      {
        title: '六、常见错误排查',
        table: {
          headers: ['问题', '可能原因', '检查方法'],
          rows: [
            ['401 Unauthorized', 'API Key 错误', '检查 Key 是否完整'],
            ['404 Not Found', 'URL 错误', '检查 Base URL'],
            ['Model not found', '模型名错误', '检查模型名称'],
            ['No response', '网络问题', '检查网络和代理'],
            ['JSON error', '请求格式错误', '检查逗号和引号']
          ]
        },
        flow: ['先检查 API Key', '再检查 Base URL', '再检查模型名称', '再检查 JSON 格式', '最后检查网络环境'],
        warning: '代码中不要使用真实 API Key 示例。真实项目应使用环境变量或服务端安全配置。'
      }
    ],
    summary: ['一次 API 调用包含 URL、Headers、Body、模型名和输入内容。', 'curl 适合先排除基础配置问题。', '返回结果里重点看 assistant 的正文内容。', '报错排查按 API Key、Base URL、模型名称、JSON、网络的顺序进行。'],
    next: { title: 'AI 新手入门 06：用 Codex、Claude Code 和 CC Switch 做项目', href: '/learn/ai-coding-workflow' }
  },
  {
    slug: 'ai-coding-workflow',
    path: '/learn/ai-coding-workflow',
    order: 6,
    title: 'AI 新手入门 06：用 Codex、Claude Code 和 CC Switch 做项目',
    description: '把 AI 编程工具接入真实项目：让 AI 读项目、改代码、修 bug、做页面并验证结果。',
    readingTime: '约 13 分钟',
    tags: ['Codex', 'Claude Code', 'CC Switch', 'AI 编程'],
    learnings: ['AI 编程工具能做什么', '如何让 AI 理解项目', '如何限制 AI 修改范围', '如何描述 bug 和功能需求', '如何完成一个小项目'],
    sections: [
      {
        title: '一、AI 编程工具是什么？',
        paragraphs: ['AI 编程工具可以帮助你阅读代码、写代码、改 bug、生成页面、补充文档。它们不是魔法，真正有效的用法是：你给清楚任务边界，AI 负责执行和解释。'],
        table: {
          headers: ['工具类型', '适合做什么', '新手注意'],
          rows: [
            ['Codex 类工具', '写代码、修 bug、审查代码', '要给清楚任务和验证命令'],
            ['Claude Code 类工具', '理解代码库、跨文件修改', '修改前要备份或新建分支'],
            ['Cursor 类编辑器', '边写代码边让 AI 辅助', '不要盲目接受所有修改'],
            ['CC Switch 类配置工具', '管理多个 AI 工具配置', '先理解 API Key、Base URL 和模型名再切换']
          ]
        }
      },
      {
        title: '二、AI 编程工具不是魔法',
        paragraphs: ['AI 可以提高效率，但你仍然要检查代码、测试功能、确认安全性。尤其是涉及 API Key、数据库、支付、部署脚本时，不要让 AI 直接大范围执行。'],
        bullets: ['可能改错文件', '可能删除原有功能', '可能引入新的 bug', '可能使用不存在的依赖', '可能忘记移动端适配和深色模式'],
        warning: '每次修改前先备份代码或创建新分支，修改后必须看 git diff 和运行测试。'
      },
      {
        title: '三、新手开始项目前要准备什么？',
        bullets: ['项目目标', '当前技术栈', '页面或功能清单', '已存在的问题', '不允许修改的内容', '期望输出格式', '验证命令和验收标准'],
        code: {
          title: '让 AI 先理解项目',
          language: 'text',
          content: '请先阅读这个项目结构和我提供的代码。\n\n你的任务不是马上修改代码，而是先告诉我：\n1. 这个项目大概是做什么的\n2. 使用了哪些技术\n3. 主要页面和功能在哪里\n4. 如果我要修改首页，可能涉及哪些文件\n5. 你建议我先从哪里开始\n\n在我确认之前，不要直接改代码。'
        }
      },
      {
        title: '四、完整项目流程',
        flow: ['明确项目目标', '整理项目结构', '让 AI 先阅读并总结', '提出一个小功能需求', '让 AI 给出修改计划', '确认修改范围', '生成或修改代码', '运行项目测试', '反馈报错给 AI', '反复修正直到可用'],
        code: {
          title: '项目流程图',
          language: 'text',
          content: '明确项目目标\n  ↓\n整理项目结构\n  ↓\n让 AI 先阅读并总结\n  ↓\n提出一个小功能需求\n  ↓\n让 AI 给出修改计划\n  ↓\n确认修改范围\n  ↓\n生成或修改代码\n  ↓\n运行项目测试\n  ↓\n反馈报错给 AI\n  ↓\n反复修正直到可用'
        }
      },
      {
        title: '五、如何让 AI 添加新功能？',
        code: {
          title: '功能需求模板',
          language: 'text',
          content: '我想给项目添加一个新功能：\n\n功能名称：\n【例如：新手教程导航页面】\n\n功能目标：\n【让用户可以按学习顺序阅读 AI 入门文章】\n\n具体要求：\n1. 页面要适配电脑和手机\n2. 支持深色模式\n3. 使用项目现有设计风格\n4. 不影响已有页面\n5. 修改前先告诉我涉及哪些文件\n\n请先输出修改方案，不要直接写代码。'
        },
        tips: ['先让 AI 讲方案，再让它改代码。', '需求越像验收清单，AI 越不容易乱改。']
      },
      {
        title: '六、如何让 AI 修 bug？',
        code: {
          title: 'bug 描述模板',
          language: 'text',
          content: '项目出现了一个 bug：\n\n问题表现：\n【描述你看到的问题】\n\n复现步骤：\n1. 打开【页面】\n2. 点击【按钮】\n3. 出现【错误现象】\n\n报错信息：\n【粘贴终端或浏览器报错】\n\n我希望你：\n1. 判断可能原因\n2. 指出需要查看哪些文件\n3. 给出最小修改方案\n4. 不要重构无关代码'
        },
        warning: '不要只发一句“报错了”。AI 需要看到复现步骤、报错信息、期望结果和当前代码。'
      },
      {
        title: '七、做一个完整小项目示例',
        paragraphs: ['示例项目：为 apiuspro.cn 做一个“AI 新手学习路线页面”。这个任务很适合新手，因为它包含页面结构、内容卡片、流程图、FAQ、移动端适配和深色模式。'],
        code: {
          title: '完整项目需求提示词',
          language: 'text',
          content: '请帮我设计一个 AI 新手学习路线页面。\n\n网站名称：ApiUsPro\n页面目标：\n让完全不了解 AI 的用户知道应该按什么顺序学习。\n\n页面内容必须包含：\n1. 顶部说明区\n2. 6 篇新手教程卡片\n3. 学习路径流程图\n4. 常见问题\n5. API Key 安全提醒\n6. 下一步行动按钮\n\n设计要求：\n1. 参考现代 AI 工具官网的简洁风格\n2. 阅读体验优先\n3. 支持深色模式\n4. 适配手机端\n5. 不要使用过多动画\n6. 文案要适合新手\n\n请先输出页面设计方案，不要直接修改代码。'
        }
      }
    ],
    summary: ['AI 编程工具适合读项目、写代码、修 bug、做 review。', '新手必须先让 AI 理解项目，再让它给修改计划。', '每次修改都要限制范围、备份代码、查看 diff、运行测试。', '描述 bug 要包含问题表现、复现步骤、报错信息和期望结果。'],
    next: { title: '返回 AI 新手教程列表', href: '/learn' }
  }
];

export function getLearnArticle(slug: string) {
  return learnTutorials.find((article) => article.slug === slug);
}
