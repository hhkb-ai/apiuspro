/**
 * ============================================================
 * API数据配置文件 - 购买教程模板
 * ============================================================
 * 
 * 【添加新API教程步骤】
 * 1. 确定API类型：国内API → domesticAPIs，国外API → foreignAPIs
 * 2. 复制下方模板，粘贴到对应数组的末尾（注意逗号分隔）
 * 3. 修改各项配置内容
 * 4. 图片放置在 public/images/tutorial/ 目录下
 * 
 * 【教程模板 - 直接复制使用】
 * ============================================================
{
  id: 'api-id',                    // 唯一标识，用于URL路径 /tutorial/api-id
  name: 'API名称',                  // 显示名称
  desc: 'API简短描述',              // 在卡片上显示的描述
  url: 'https://官网链接.com/',     // 官网地址
  free: '免费额度描述',             // 国内API填写，如 "100万tokens/月免费"
  // note: '需要代理访问',          // 国外API填写，注意事项
  features: ['特性1', '特性2'],    // 功能特性标签
  icon: '🇨🇳',                     // emoji图标：国内🇨🇳，国外🌍，代理🌐
  badge: { 
    text: '免费',                  // 徽章文字：免费/需代理/推荐等
    type: 'success'                // 徽章颜色：success(绿)/warning(黄)/info(蓝)
  },
  tutorial: {
    title: 'XXX购买教程',
    subtitle: '一句话副标题',
    steps: [
      {
        title: '第一步：准备工作',
        description: '准备必要的内容',
        image: '/images/tutorial/xxx-step1.png',  // 图片路径
        items: [
          '操作说明1',
          '操作说明2',
          '操作说明3'
        ],
        warning: '警告信息（可选）'  // 有则显示黄色警告框
      },
      {
        title: '第二步：注册账号',
        description: '完成注册流程',
        image: '/images/tutorial/xxx-step2.png',
        items: [
          '访问官网',
          '填写信息',
          '完成验证'
        ]
      }
      // ... 添加更多步骤
    ],
    tips: [
      '使用提示1',
      '使用提示2'
    ],
    warnings: [
      '注意事项1',
      '注意事项2'
    ],
    advantages: [
      '优势1',
      '优势2',
      '优势3'
    ]
  }
}
 * ============================================================
 * 
 * 【图片配置说明】
 * - 图片存放位置：public/images/tutorial/
 * - 推荐格式：PNG 或 WebP
 * - 推荐尺寸：宽 800-1200px，等比例缩放
 * - 引用方式：'/images/tutorial/文件名.png'
 * 
 * 【字段说明】
 * - id: 必填，唯一标识，用于URL和跳转
 * - name: 必填，显示名称
 * - desc: 必填，描述信息
 * - url: 必填，官网链接
 * - features: 必填，功能特性标签数组
 * - icon: 必填，emoji图标
 * - badge: 必填，徽章配置
 * - tutorial: 可选，不填写则不显示教程入口
 * - free: 国内API必填，免费额度描述
 * - note: 国外API必填，注意事项（如"需要代理访问"）
 */

// ==================== 类型定义 ====================
export interface TutorialStep {
  title: string;
  description: string;
  image?: string;
  items?: string[];
  warning?: string;
}

export interface Tutorial {
  title: string;
  subtitle?: string;
  steps: TutorialStep[];
  tips?: string[];
  warnings?: string[];
  advantages?: string[];
}

export interface APIConfig {
  id: string;
  name: string;
  desc: string;
  url: string;
  features: string[];
  icon: string;
  badge: { text: string; type: string };
  tutorial?: Tutorial;
  free?: string;       // 免费额度描述
  proxy?: boolean;     // 是否需要代理访问，true=需代理，false/不填=无需代理
}

// ==================== API配置（按是否需要代理分类）============================
// proxy: true = 需要代理访问，false/不填 = 无需代理，国内直连
export const apiList: APIConfig[] = [
  // ---------- 无需代理 ----------
  {
    id: 'aliyun',
    name: '阿里云通义千问',
    desc: '国内领先的大模型服务，提供丰富的免费额度',
    url: 'https://dashscope.aliyun.com/',
    free: '100万tokens/月免费',
    proxy: false,
    features: ['多模型支持', '长文本处理', '多模态能力'],
    icon: '🟢',
    badge: { text: '免费', type: 'success' },
    tutorial: {
      title: '阿里云通义千问购买教程',
      subtitle: '国内用户首选，简单易用',
      steps: [
        {
          title: '注册阿里云账号',
          description: '访问阿里云灵积模型服务平台，使用手机号快速注册',
          image: '/images/tutorial/aliyun-step1.png',
          items: [
            '访问 dashscope.aliyun.com',
            '使用手机号注册',
            '完成实名认证（可选）'
          ]
        },
        {
          title: '开通服务',
          description: '开通灵积模型服务，自动获得免费额度',
          image: '/images/tutorial/aliyun-step2.png',
          items: [
            '开通灵积模型服务',
            '自动获得免费额度',
            '无需绑定支付方式'
          ]
        },
        {
          title: '创建API Key',
          description: '在控制台创建API密钥',
          image: '/images/tutorial/aliyun-step3.png',
          items: [
            '进入控制台',
            '创建新的 API Key',
            '复制保存'
          ]
        },
        {
          title: '开始使用',
          description: '查看API文档，开始调用',
          image: '/images/tutorial/aliyun-step4.png',
          items: [
            '查看API文档',
            '在线调试或本地调用',
            '监控使用量'
          ]
        }
      ],
      tips: [
        '国内直接访问，无需代理',
        '每月100万tokens免费额度',
        '支持支付宝充值'
      ],
      advantages: ['免费额度大', '国内直连', '文档完善']
    }
  },
  {
    id: 'zhipu',
    name: '智谱AI',
    desc: 'GLM系列开源模型，支持本地部署',
    url: 'https://open.bigmodel.cn/',
    free: '免费试用',
    proxy: false,
    features: ['开源生态', '本地部署', '多种尺寸'],
    icon: '🟢',
    badge: { text: '免费', type: 'success' },
    tutorial: {
      title: '智谱AI购买教程',
      subtitle: '开源模型领先者',
      steps: [
        {
          title: '注册账号',
          description: '访问智谱开放平台注册',
          image: '/images/tutorial/zhipu-step1.png',
          items: [
            '访问 open.bigmodel.cn',
            '使用手机号注册',
            '完成验证'
          ]
        },
        {
          title: '获取API Key',
          description: '在控制台创建API密钥',
          image: '/images/tutorial/zhipu-step2.png',
          items: [
            '进入控制台',
            '创建API Key',
            '新用户有免费额度'
          ]
        }
      ],
      tips: ['支持本地部署', '开源生态友好'],
      advantages: ['开源可部署', '性价比高']
    }
  },
  {
    id: 'kimi',
    name: '月之暗面 Kimi',
    desc: '长文本处理优秀，支持20万字上下文',
    url: 'https://platform.moonshot.cn/',
    free: '免费额度',
    proxy: false,
    features: ['超长上下文', '文件解析', '联网搜索'],
    icon: '🟢',
    badge: { text: '免费', type: 'success' },
    tutorial: {
      title: 'Kimi购买教程',
      subtitle: '长文本处理专家',
      steps: [
        {
          title: '注册账号',
          description: '访问月之暗面开放平台',
          image: '/images/tutorial/kimi-step1.png',
          items: [
            '访问 platform.moonshot.cn',
            '使用手机号注册',
            '完成验证'
          ]
        },
        {
          title: '获取API Key',
          description: '创建API密钥开始使用',
          image: '/images/tutorial/kimi-step2.png',
          items: [
            '进入控制台',
            '创建API Key',
            '查看使用文档'
          ]
        }
      ],
      tips: ['支持20万字长文本', '文件解析能力强'],
      advantages: ['超长上下文', '文件解析']
    }
  },
  {
    id: 'tencent',
    name: '腾讯混元',
    desc: '多模态能力强，企业级服务',
    url: 'https://cloud.tencent.com/product/hunyuan',
    free: '新用户优惠',
    proxy: false,
    features: ['多模态', '企业集成', '微信生态'],
    icon: '🟢',
    badge: { text: '免费', type: 'success' }
  },
  {
    id: 'doubao',
    name: '字节豆包',
    desc: '抖音生态，模型能力强',
    url: 'https://www.volcengine.com/product/doubao',
    free: '免费额度',
    proxy: false,
    features: ['抖音生态', '多模型', '高性价比'],
    icon: '🟢',
    badge: { text: '免费', type: 'success' }
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    desc: '高性价比AI模型，代码与推理能力突出',
    url: 'https://platform.deepseek.com/',
    free: '赠送500万Tokens',
    proxy: false,
    features: ['高性价比', '代码能力强', '推理模型', '开源'],
    icon: '🔵',
    badge: { text: '热门', type: 'warning' }
  },
  // ---------- 需要代理 ----------
  {
    id: 'openai',
    name: 'OpenAI GPT',
    desc: '最强大的语言模型，行业标准',
    url: 'https://platform.openai.com/',
    proxy: true,
    features: ['GPT-4', 'GPT-4o', 'DALL-E', 'Whisper'],
    icon: '🟠',
    badge: { text: '需代理', type: 'warning' },
    tutorial: {
      title: 'OpenAI GPT购买教程',
      subtitle: '世界上最强大的AI模型',
      steps: [
        {
          title: '准备工作',
          description: '准备必要的工具和账号',
          image: '/images/tutorial/openai-step1.png',
          items: [
            '准备科学上网工具',
            '准备国际信用卡或虚拟卡',
            '准备国外手机号（可选）'
          ],
          warning: '确保网络环境稳定，避免频繁切换IP'
        },
        {
          title: '注册账号',
          description: '访问OpenAI官网注册账号',
          image: '/images/tutorial/openai-step2.png',
          items: [
            '访问 platform.openai.com',
            '使用邮箱注册账号',
            '完成邮箱验证'
          ]
        },
        {
          title: '绑定支付方式',
          description: '添加付款方式以便充值使用',
          image: '/images/tutorial/openai-step3.png',
          items: [
            '进入 Billing 设置',
            '添加付款方式',
            '完成卡片验证'
          ],
          warning: '国内银行卡可能无法绑定，建议使用虚拟信用卡'
        },
        {
          title: '获取API Key',
          description: '创建API密钥开始使用',
          image: '/images/tutorial/openai-step4.png',
          items: [
            '进入 API Keys 页面',
            '创建新的 Secret Key',
            '妥善保存（只显示一次）'
          ]
        }
      ],
      tips: [
        '新注册账号可能有免费额度',
        '需要验证手机号才能使用免费额度',
        '建议使用接码平台获取国外手机号'
      ],
      warnings: [
        '账号可能被封禁，建议稳定使用同一IP',
        '虚拟卡充值后及时使用，避免余额浪费'
      ],
      advantages: ['功能最强大', '生态完善', '文档详尽']
    }
  },
  {
    id: 'claude',
    name: 'Anthropic Claude',
    desc: '安全可靠的长文本模型，200K上下文',
    url: 'https://www.anthropic.com/',
    proxy: true,
    features: ['200K上下文', '安全可靠', '代码能力强'],
    icon: '🟠',
    badge: { text: '需代理', type: 'warning' },
    tutorial: {
      title: 'Anthropic Claude购买教程',
      subtitle: '安全可靠的长文本模型',
      steps: [
        {
          title: '准备工作',
          description: '准备必要的工具',
          image: '/images/tutorial/claude-step1.png',
          items: [
            '准备科学上网工具',
            '准备国际信用卡'
          ]
        },
        {
          title: '注册并获取API',
          description: '完成注册并创建API Key',
          image: '/images/tutorial/claude-step2.png',
          items: [
            '访问 console.anthropic.com',
            '完成注册',
            '创建API Key'
          ]
        }
      ],
      tips: ['支持200K上下文', '适合长文本处理场景'],
      advantages: ['超长上下文', '安全性高', '代码能力强']
    }
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    desc: '多模态能力强大，部分功能免费',
    url: 'https://ai.google.dev/',
    proxy: true,
    features: ['多模态', '长上下文', '免费API'],
    icon: '🟠',
    badge: { text: '需代理', type: 'warning' },
    tutorial: {
      title: 'Google Gemini API 购买与使用指南',
      subtitle: 'Google官方多模态AI模型',
      steps: [
        {
          title: '第一步：购买前准备（三件套）',
          description: '在开始购买 Gemini API 之前，请确保准备好以下三样东西',
          image: '/images/tutorial/gemini-step1.png',
          items: [
            '科学上网工具/VPN：确保能稳定访问Google服务，建议使用稳定的美国/日本/新加坡IP',
            'Visa 或 MasterCard 国际信用卡：Google Cloud 需要绑定国际卡才能使用 Gemini API',
            'Google 账号：需要一个 Gmail 邮箱账号，+86 国内手机号可注册 Google'
          ]
        },
        {
          title: '第二步：创建 Google AI Studio API Key',
          description: '通过 Google AI Studio 快速获取免费 API Key',
          image: '/images/tutorial/gemini-step2.png',
          items: [
            '确保已开启科学上网，访问 aistudio.google.com',
            '使用 Gmail 账号登录 Google AI Studio',
            '点击 "Get API key" 按钮',
            '选择 "Create API key in new project" 或使用已有项目',
            '命名 API Key（如 MyFirstGeminiKey）',
            '点击 "Create API key" 生成密钥（格式：AIza...）',
            '保存好 API Key，这是调用 API 的凭证'
          ]
        },
        {
          title: '第三步：Google Cloud 绑定支付方式',
          description: '如需使用付费功能，需要在 Google Cloud Console 绑定支付方式',
          image: '/images/tutorial/gemini-step3.png',
          items: [
            '访问 Google Cloud Console（console.cloud.google.com）',
            '进入 "结算" → "支付方式"',
            '点击 "添加支付方式"',
            '填写 Visa/MasterCard 信用卡信息',
            '完成支付方式绑定'
          ],
          warning: 'Google 可能会扣款 $1 进行验证，验证后会自动退还'
        },
        {
          title: '第四步：启用 Gemini API',
          description: '在 Google Cloud Console 中启用 Gemini API 服务',
          image: '/images/tutorial/gemini-step4.png',
          items: [
            '在 Google Cloud Console 中，进入 "API 和服务" → "库"',
            '搜索 "Gemini" 找到相关 API',
            '点击 "Gemini API" 进入详情页',
            '点击 "启用" 按钮',
            '等待 API 启用完成（可能需要几分钟）'
          ]
        },
        {
          title: '第五步：开始使用 Gemini API',
          description: 'API Key 获取后即可开始调用 Gemini API',
          image: '/images/tutorial/gemini-step5.png',
          items: [
            '常用模型：gemini-1.5-pro、gemini-1.5-flash',
            '推荐使用 flash 版本，速度快且便宜',
            'API 端点：https://generativelanguage.googleapis.com/v1beta/models/',
            '保存 API Key 到安全的地方，不要泄露给他人'
          ]
        }
      ],
      tips: [
        'Google AI Studio 提供免费额度，可直接创建 API Key 使用',
        'Gemini API 支持多模态（文本、图片、视频）输入',
        '建议使用 gemini-1.5-flash 模型，性价比更高'
      ],
      warnings: [
        '确保使用稳定的科学上网工具，避免频繁切换 IP',
        'API Key 一旦创建只显示一次，请妥善保存',
        '如果账号被风控，可能需要更换 IP 或邮箱重新注册'
      ],
      advantages: ['部分功能免费', '多模态能力强', '超长上下文（1M tokens）', 'Google官方支持']
    }
  }
];

// 兼容旧引用的别名（已废弃，后续统一用 apiList）
export const domesticAPIs = apiList.filter(a => !a.proxy);
export const foreignAPIs = apiList.filter(a => a.proxy);

// ==================== 代理服务配置 ====================
export const proxyServices: APIConfig[] = [
  {
    id: 'api2d',
    name: 'API2D',
    desc: '国内访问OpenAI等API的中转服务',
    url: 'https://api2d.com/',
    features: ['支持OpenAI', '支持Claude', '国内直连'],
    icon: '🌐',
    badge: { text: '推荐', type: 'info' }
  },
  {
    id: 'closeai',
    name: 'CloseAI',
    desc: 'OpenAI API代理服务',
    url: 'https://console.closeai-asia.com/',
    features: ['OpenAI代理', '稳定可靠', '按量付费'],
    icon: '🌐',
    badge: { text: '稳定', type: 'info' }
  },
  {
    id: 'openai-proxy',
    name: 'OpenAI中转',
    desc: '多种国外API代理服务',
    url: 'https://api2gpt.com/',
    features: ['多API支持', '价格优惠', '快速响应'],
    icon: '🌐',
    badge: { text: '优惠', type: 'info' }
  }
];

// ==================== 常见问题配置 ====================
export const faqCategories = [
  {
    title: '注册相关问题',
    items: [
      {
        question: 'OpenAI不支持国内手机号',
        answer: '解决方案：使用接码平台或跳过验证'
      },
      {
        question: '邮箱被限制注册',
        answer: '解决方案：尝试Gmail或Outlook邮箱'
      },
      {
        question: '账号被风控封禁',
        answer: '解决方案：使用稳定的科学上网工具'
      }
    ]
  },
  {
    title: '支付相关问题',
    items: [
      {
        question: '国内银行卡无法绑定',
        answer: '解决方案：使用虚拟信用卡（如Depay）'
      },
      {
        question: '扣费异常',
        answer: '解决方案：设置使用限额，监控消费'
      },
      {
        question: '退款困难',
        answer: '解决方案：小额充值，按需付费'
      }
    ]
  },
  {
    title: '使用相关问题',
    items: [
      {
        question: 'API Key泄露',
        answer: '解决方案：立即删除旧Key，重新生成'
      },
      {
        question: '调用频率限制',
        answer: '解决方案：升级套餐或优化请求频率'
      },
      {
        question: '响应超时',
        answer: '解决方案：增加超时时间，使用流式响应'
      }
    ]
  },
  {
    title: '其他常见问题',
    items: [
      {
        question: '模型版本选择困难',
        answer: '建议：GPT-4质量高，GPT-3.5性价比高'
      },
      {
        question: '不知道选择哪个API',
        answer: '建议：查看API测评页面对比'
      },
      {
        question: '需要更多帮助',
        answer: '建议：查看官方文档或社区讨论'
      }
    ]
  }
];

// ==================== 辅助函数 ====================
export function getAPIById(id: string) {
  return [...apiList, ...proxyServices].find(api => api.id === id);
}

export function getTutorialById(id: string) {
  const api = getAPIById(id);
  return api?.tutorial;
}

export function getAllAPIsWithTutorial() {
  return [...domesticAPIs, ...foreignAPIs].filter(api => api.tutorial);
}

// ==================== API应用教程配置 ====================
export interface AppTutorial {
  id: string;
  name: string;
  desc: string;
  url: string;
  icon: string;
  badge: { text: string; type: string };
  sections: {
    title: string;
    content: string;
    steps?: {
      title: string;
      description: string;
      code?: string;
      image?: string;
      items?: string[];
      warning?: string;
    }[];
    tips?: string[];
    warnings?: string[];
  }[];
}

export const appTutorials: AppTutorial[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    desc: 'Anthropic官方命令行AI编程工具，支持终端内编码、文件编辑、Git操作',
    url: 'https://claude.com/product/claude-code',
    icon: '💻',
    badge: { text: '热门', type: 'warning' },
    sections: [
      {
        title: '什么是 Claude Code',
        content: 'Claude Code 是 Anthropic 推出的命令行 AI 编程工具。与 Cursor 等 IDE 插件不同，Claude Code 直接在终端中运行，通过自然语言指令完成代码编写、文件编辑、Git 操作等任务，是 Vibe Coding 的核心工具。',
        steps: [
          {
            title: '核心优势',
            description: '理解项目结构、自动编辑文件、执行命令、Git 操作一体化',
            items: [
              '终端内直接运行，无需额外 IDE',
              '理解项目上下文，智能代码生成',
              '支持 Git 操作：提交、分支、合并',
              '可配置使用不同 AI 模型和 API',
              '支持 OpenAI、DeepSeek、Gemini 等第三方 API'
            ]
          }
        ],
        tips: [
          'Claude Code 按用量计费，1次对话约 6.88 元人民币',
          '20次对话约 140 元，100次约 700 元',
          '可通过配置第三方 API（如 DeepSeek）大幅降低成本'
        ]
      },
      {
        title: '前置准备：安装 Git',
        content: 'Claude Code 依赖 Git 进行版本控制操作，需要先安装 Git。',
        steps: [
          {
            title: '下载 Git',
            description: '访问 Git 官网下载对应系统的安装包',
            items: [
              '官网地址：https://git-scm.com/install/windows',
              '国内镜像：https://registry.npmmirror.com/binary.html?path=git-for-windows/',
              '下载 64-bit 安装包（如 Git-2.53.0.2-64-bit.exe）'
            ],
            image: '/images/tutorial/claude-code-git-download.png'
          },
          {
            title: '安装 Git',
            description: '运行安装程序，保持默认选项即可',
            items: [
              '双击安装包运行',
              '安装路径建议保持默认',
              '在 Environment Variables 中确认 Git 已添加到 PATH'
            ]
          },
          {
            title: '验证安装',
            description: '打开命令行，检查 Git 版本',
            code: 'git -v',
            items: [
              '如果显示 git version 2.53.0.windows.2 说明安装成功',
              '如提示命令不存在，需检查 PATH 环境变量'
            ]
          }
        ],
        tips: [
          'Windows 用户推荐使用 Git Bash 终端',
          '安装完成后重启命令行窗口'
        ],
        warnings: [
          '必须安装 Git，否则 Claude Code 无法正常运行',
          '不要使用过旧版本的 Git，建议 2.40+'
        ]
      },
      {
        title: '前置准备：安装 Node.js',
        content: 'Claude Code 基于 Node.js 运行，需要安装 Node.js 20+ LTS 版本。',
        steps: [
          {
            title: '下载 Node.js',
            description: '访问 Node.js 官网下载 LTS 版本',
            items: [
              '官网地址：https://nodejs.org/zh-cn/download',
              '选择 Windows Installer (.msi) 64-bit',
              '当前 LTS 版本：v24.14.0'
            ]
          },
          {
            title: '安装并验证',
            description: '运行安装程序后，验证 Node.js 和 NPM',
            code: '# 查看 Node 版本\nnode -v\n# 查看 NPM 版本\nnpm -v',
            items: [
              'Node.js 版本需 20+ 以上',
              'NPM 会随 Node.js 一起安装',
              'NPM 用于后续安装 Claude Code'
            ]
          }
        ],
        tips: [
          '推荐安装 LTS 版本，更加稳定',
          'NPM 是 Node.js 的包管理器，Claude Code 通过 NPM 安装'
        ]
      },
      {
        title: '安装 Claude Code',
        content: '使用 NPM 全局安装 Claude Code，只需一条命令。',
        steps: [
          {
            title: '设置国内镜像（推荐）',
            description: '国内用户建议先设置阿里云镜像加速下载',
            code: 'npm config set registry https://registry.npmmirror.com'
          },
          {
            title: '安装 Claude Code',
            description: '使用 NPM 全局安装',
            code: 'npm install -g @anthropic-ai/claude-code'
          },
          {
            title: '验证安装',
            description: '检查 Claude Code 是否安装成功',
            code: 'claude --version'
          },
          {
            title: '启动 Claude Code',
            description: '在项目目录下启动 Claude Code',
            code: '# 进入项目目录\ncd 你的项目路径\n# 启动 Claude Code\nclaude',
            items: [
              '首次启动会显示欢迎界面和入门提示',
              '配置文件保存在 C:\\Users\\你的用户名\\.claude.json',
              '模型可以在设置中切换（如 Sonnet 4.6 等）'
            ]
          }
        ],
        tips: [
          '安装失败时，尝试以管理员身份运行命令行',
          '如果下载缓慢，确保已设置国内镜像'
        ],
        warnings: [
          '必须在项目目录下启动 claude 命令',
          '首次使用需登录 Anthropic 账号或配置 API Key'
        ]
      },
      {
        title: '配置第三方 API（降低成本）',
        content: 'Claude Code 默认使用 Anthropic 官方 API，按量计费较贵。可通过配置第三方 API 大幅降低成本。',
        steps: [
          {
            title: '配置 DeepSeek API',
            description: '使用 DeepSeek API 替代，成本极低',
            code: '# 设置 DeepSeek API Key（替换为你的实际 Key）\nsetx ANTHROPIC_API_KEY "YOUR_DEEPSEEK_API_KEY"\n\n# 设置 DeepSeek API 端点\nsetx ANTHROPIC_BASE_URL "https://api.deepseek.com/v1"\n\n# 设置 DeepSeek 模型\nsetx ANTHROPIC_MODEL "deepseek-chat"',
            items: [
              '访问 DeepSeek 官网注册并获取 API Key',
              '可选模型：deepseek-chat、deepseek-coder、deepseek-reasoner',
              '设置完成后重启命令行窗口'
            ]
          },
          {
            title: '配置 OpenAI API',
            description: '使用 OpenAI API 替代',
            code: 'setx ANTHROPIC_API_KEY "your-openai-api-key"\nsetx ANTHROPIC_BASE_URL "https://api.openai.com/v1"\nsetx ANTHROPIC_MODEL "gpt-4o"'
          },
          {
            title: '配置 Google Gemini API',
            description: '使用 Gemini API 替代',
            code: 'setx ANTHROPIC_API_KEY "your-gemini-api-key"\nsetx ANTHROPIC_BASE_URL "https://generativelanguage.googleapis.com/v1beta"\nsetx ANTHROPIC_MODEL "gemini-pro"'
          },
          {
            title: '验证配置',
            description: '查看当前环境变量是否配置正确',
            code: 'echo %ANTHROPIC_API_KEY%\necho %ANTHROPIC_BASE_URL%\necho %ANTHROPIC_MODEL%',
            items: [
              '设置完成后重启命令行使环境变量生效',
              '启动 claude 后检查是否正常工作'
            ]
          }
        ],
        tips: [
          'DeepSeek API 成本最低，适合日常使用',
          'API Key 务必保密，不要泄露给他人',
          '可随时切换不同 API 提供商'
        ],
        warnings: [
          'setx 设置的环境变量需要重启命令行才能生效',
          'API Key 丢失后需重新生成，无法找回',
          '使用第三方 API 可能存在兼容性差异'
        ]
      }
    ]
  },
  {
    id: 'openclaw',
    name: 'OpenClaw',
    desc: '开源AI助手平台，支持飞书集成，一键部署私人AI助理',
    url: 'https://openclaw.ai',
    icon: '🦞',
    badge: { text: '开源', type: 'success' },
    sections: [
      {
        title: 'OpenClaw 简介',
        content: 'OpenClaw 是一个开源的 AI 助手平台，支持多种 AI 模型，可集成飞书等通讯工具，打造私人 AI 助理。',
        steps: [
          {
            title: '什么是 OpenClaw',
            description: 'OpenClaw 让你在本地部署 AI 助手，通过飞书等平台与 AI 对话，数据安全可控。',
            items: [
              '支持 Anthropic Claude、OpenAI GPT、GLM 等多种模型',
              '支持飞书集成，随时随地与 AI 对话',
              '开源免费，数据完全本地化',
              '支持技能插件扩展功能'
            ]
          }
        ],
        tips: [
          'OpenClaw 需要本地运行 Gateway 服务',
          '默认监听地址：127.0.0.1:18789',
          '支持多种 AI 模型切换，按需选择'
        ]
      },
      {
        title: '前置准备',
        content: '安装 OpenClaw 前，需要确保系统已安装必要的环境。',
        steps: [
          {
            title: '安装 Node.js（>=22）',
            description: 'OpenClaw 需要 Node.js 22 或更高版本',
            items: [
              '访问 nodejs.org 下载 LTS 版本',
              '安装完成后在命令行验证：node -v',
              '确保 NPM 也已安装：npm -v'
            ],
            warning: 'Node.js 版本必须 >= 22，旧版本无法运行 OpenClaw'
          },
          {
            title: '安装 Git Bash',
            description: 'Windows 用户需要安装 Git Bash 来运行 OpenClaw',
            items: [
              '访问 git-scm.com/download/windows 下载 Git',
              '国内用户可使用镜像：registry.npmmirror.com',
              '安装完成后验证：git -v'
            ]
          }
        ],
        tips: [
          '推荐使用 Git Bash 而非 CMD 运行 OpenClaw',
          '国内用户建议先设置 NPM 镜像加速下载'
        ],
        warnings: [
          '确保 Node.js 版本 >= 22，否则安装后无法正常运行'
        ]
      },
      {
        title: '配置环境变量',
        content: '在安装 OpenClaw 前，先配置环境变量，指定工作目录，避免占用 C 盘空间。',
        steps: [
          {
            title: '创建工作区目录',
            description: '在 D 盘创建 OpenClaw 工作区',
            code: 'mkdir D:\\software\\openclaw\\workspace'
          },
          {
            title: '设置系统环境变量',
            description: '通过 Win+R 输入 sysdm.cpl 打开系统属性，添加以下环境变量',
            items: [
              'OPENCLAW_HOME = D:\\software\\openclaw',
              'OPENCLAW_WORKSPACE = D:\\software\\openclaw\\workspace',
              'OPENCLAW_CONFIG_PATH = D:\\software\\openclaw\\openclaw.json',
              'OPENCLAW_STATE_DIR = D:\\software\\openclaw'
            ]
          },
          {
            title: '验证环境变量',
            description: '在 Git Bash 中验证环境变量是否生效',
            code: 'echo $OPENCLAW_HOME\necho $OPENCLAW_WORKSPACE\necho $OPENCLAW_CONFIG_PATH\necho $OPENCLAW_STATE_DIR',
            items: [
              '如果输出为空，说明环境变量未生效，需重启终端',
              'Windows CMD 中使用 echo %OPENCLAW_HOME% 验证'
            ]
          }
        ],
        tips: [
          '建议将工作区放在 D 盘，避免占用 C 盘空间',
          '环境变量设置后需要重启终端才能生效'
        ],
        warnings: [
          '环境变量必须配置正确，否则 OpenClaw 无法找到工作区'
        ]
      },
      {
        title: '安装 OpenClaw',
        content: '使用 NPM 全局安装 OpenClaw，并运行配置向导。',
        steps: [
          {
            title: '安装 OpenClaw',
            description: '在 Git Bash 或 PowerShell 中执行安装命令',
            code: 'npm install -g openclaw\n\n# 或使用最新版\nnpm install -g openclaw@latest\n\n# 或使用 pnpm\npnpm add -g openclaw@latest',
            items: [
              'npm：Node.js 默认包管理器',
              '-g：全局安装，安装后可在命令行直接使用',
              '安装过程可能需要 30 秒左右'
            ]
          },
          {
            title: '运行配置向导',
            description: '执行 onboard 命令启动配置向导',
            code: 'openclaw onboard --workspace D:\\software\\openclaw\\workspace --install-daemon',
            items: [
              '--workspace：指定工作区路径',
              '--install-daemon：安装后台守护进程服务，开机自启',
              '不指定工作区则默认在 C 盘：~/.openclaw/workspace'
            ]
          }
        ],
        tips: [
          '建议使用 --install-daemon 参数，让服务开机自启',
          '安装失败时可尝试以管理员身份运行终端'
        ]
      },
      {
        title: 'Onboard 配置步骤',
        content: '运行 onboard 命令后，需要完成以下交互式配置步骤。',
        steps: [
          {
            title: '步骤 1：确认使用协议',
            description: '选择 Yes 继续',
            items: [
              '提示 "I understand this is personal-by-default..." 选择 Yes'
            ]
          },
          {
            title: '步骤 2：选择 QuickStart',
            description: '选择 QuickStart 快速开始模式'
          },
          {
            title: '步骤 3：选择 AI 模型',
            description: '选择你要使用的 AI 模型提供商',
            items: [
              'Anthropic Claude：官方模型，效果最好但较贵',
              'OpenAI GPT：通用性强',
              'GLM（智谱）：国内首选，性价比高',
              '其他：Moonshot、MiniMax、Google、xAI 等'
            ],
            warning: '推荐国内用户选择 GLM (Z.AI)，访问稳定且性价比高'
          },
          {
            title: '步骤 4：输入 API Key',
            description: '根据选择的模型输入对应的 API Key',
            items: [
              '如果选择 GLM Coding Plan：',
              '访问 bigmodel.cn/glm-coding 注册获取 API Key',
              '选择 Coding-Plan-CN（国内）或 Coding-Plan-Global（国际）',
              '粘贴 API Key 完成认证'
            ]
          },
          {
            title: '步骤 5：配置飞书集成',
            description: '输入飞书 App ID 和 App Secret',
            items: [
              '在飞书开放平台创建应用获取 App ID 和 Secret',
              '输入后完成飞书集成'
            ]
          },
          {
            title: '步骤 6-8：可选配置（可跳过）',
            description: 'Web 搜索、技能安装、API 配置均可跳过',
            items: [
              'Web 搜索：选择 Skip for now 跳过',
              '技能安装：选择 Skip for now 跳过（后续可单独安装）',
              'API 配置：全部选择 No 跳过'
            ],
            warning: '初次安装建议全部跳过，先让基础功能跑起来'
          },
          {
            title: '步骤 9：Hooks 配置',
            description: '选择 Skip for now 跳过钩子配置'
          },
          {
            title: '步骤 10：重启 Gateway 服务',
            description: '选择 Restart 重启服务让配置生效',
            items: [
              '选择 Restart（默认选项）',
              '按 Enter 确认重启'
            ]
          }
        ],
        tips: [
          '所有可选配置均可后续通过 openclaw configure 重新设置',
          '技能插件可通过 openclaw skills install <名称> 单独安装'
        ]
      },
      {
        title: '验证与连接',
        content: '安装配置完成后，验证服务是否正常运行。',
        steps: [
          {
            title: '验证安装版本',
            description: '检查 OpenClaw 是否安装成功',
            code: 'openclaw --version'
          },
          {
            title: '访问 Gateway 仪表盘',
            description: '打开浏览器访问本地 Gateway 服务',
            items: [
              '默认地址：127.0.0.1:18789',
              '需要在 openclaw.json 中查看 Gateway token',
              '输入 token 完成认证后即可使用'
            ]
          },
          {
            title: '飞书配对',
            description: '将飞书机器人与 OpenClaw 配对连接',
            code: '# 在飞书中与机器人对话获取配对码\n# 然后在命令行中批准配对\nopenclaw pairing approve feishu <配对码>',
            items: [
              '在飞书中找到你的 OpenClaw 机器人',
              '发送任意消息获取配对码',
              '在命令行执行配对批准命令',
              '配对成功后即可在飞书中与 AI 对话'
            ]
          }
        ],
        tips: [
          'Gateway 服务开机自启，无需手动启动',
          '飞书配对只需一次，后续直接对话即可'
        ],
        warnings: [
          '如果无法访问仪表盘，检查 18789 端口是否被占用',
          'Token 在 openclaw.json 中，务必妥善保管'
        ]
      },
      {
        title: '完整安装命令速查',
        content: '以下是从零开始的完整安装步骤命令汇总。',
        steps: [
          {
            title: '一键安装命令',
            description: '按顺序执行以下命令完成安装',
            code: '# 1. 创建工作区\nmkdir D:\\software\\openclaw\\workspace\n\n# 2. 配置环境变量（在系统属性中设置）\n# OPENCLAW_HOME = D:\\software\\openclaw\n# OPENCLAW_WORKSPACE = D:\\software\\openclaw\\workspace\n# OPENCLAW_CONFIG_PATH = D:\\software\\openclaw\\openclaw.json\n# OPENCLAW_STATE_DIR = D:\\software\\openclaw\n\n# 3. 安装 OpenClaw\nnpm install -g openclaw\n\n# 4. 运行配置向导\nopenclaw onboard --workspace D:\\software\\openclaw\\workspace --install-daemon\n\n# 5. 验证安装\nopenclaw --version\n\n# 6. 飞书配对\nopenclaw pairing approve feishu <配对码>'
          }
        ],
        tips: [
          '安装前确保 Node.js >= 22 且 Git Bash 已安装',
          '环境变量设置后需重启终端',
          '国内用户建议先设置 NPM 镜像'
        ]
      }
    ]
  },
  {
    id: 'claudian-obsidian',
    name: 'Claudian Obsidian 插件',
    desc: '在Obsidian中直接使用Claude AI助手，结合笔记与AI提升效率',
    url: 'https://github.com/YishenTu/claudian',
    icon: '📝',
    badge: { text: '插件', type: 'info' },
    sections: [
      {
        title: '前提条件',
        content: '在开始安装 Claudian 插件之前，请确保已完成以下准备工作。',
        steps: [
          {
            title: '确认已完成前置准备',
            description: '以下三项必须提前完成',
            items: [
              '已安装 Claude Code 命令行工具',
              '已配置 DeepSeek API',
              'Obsidian 已安装并运行正常'
            ],
            warning: '如果未完成 Claude Code 安装，请先参考 Claude Code 安装教程'
          }
        ]
      },
      {
        title: '下载 Claudian 插件文件',
        content: '从 GitHub 发布页面下载插件的三个必需文件。',
        steps: [
          {
            title: '下载插件文件',
            description: '访问 Claudian 插件 GitHub 发布页面下载所需文件',
            items: [
              '打开浏览器，访问 Claudian 插件的 GitHub 发布页面',
              '地址：https://github.com/YishenTu/claudian/releases/latest',
              '下载以下三个必需文件：'
            ],
            code: '# 需要下载的三个文件\nmain.js          # 插件主程序\nmanifest.json    # 插件配置文件\nstyles.css       # 插件样式文件'
          }
        ]
      },
      {
        title: '放置插件文件',
        content: '将下载的插件文件放到 Obsidian 的插件目录中。',
        steps: [
          {
            title: '找到插件目录',
            description: '通过 Obsidian 设置打开插件文件夹',
            items: [
              '打开 Obsidian，进入任意笔记仓库',
              '点击左下角的设置图标（齿轮形状）',
              '在左侧菜单中，选择「第三方插件」',
              '点击「打开插件文件夹」图标'
            ]
          },
          {
            title: '放置插件文件',
            description: '在 plugins 文件夹内创建 claudian 目录并放入文件',
            items: [
              '在打开的 plugins 文件夹内，新建文件夹命名为 claudian',
              '将下载的 main.js、manifest.json、styles.css 复制到 claudian 文件夹内',
              '回到 Obsidian，在设置 → 第三方插件页面中点击「重新加载插件」',
              '在插件列表中找到 Claudian，启用插件（切换开关）'
            ]
          }
        ],
        tips: [
          '文件结构参考：.obsidian/plugins/claudian/ 下应有 main.js、manifest.json、styles.css 三个文件'
        ]
      },
      {
        title: '配置 Claudian 连接 Claude Code',
        content: '设置 Claudian 插件连接到本地安装的 Claude Code。',
        steps: [
          {
            title: '设置 Client Path',
            description: '将 Claude Code 的安装路径填入 Claudian 设置',
            items: [
              '在 Obsidian 中，进入 Claudian 插件的设置页面（设置 → Claudian）',
              '找到「Client Path」或「Claude CLI Path」输入框',
              '打开 Git Bash，输入命令获取 Claude Code 路径',
            ],
            code: '# 获取 Claude Code 安装路径\nwhich claude\n# 返回示例：/c/Users/你的用户名/AppData/Roaming/npm/claude',
          },
          {
            title: '完成路径配置',
            description: '将路径粘贴到 Claudian 设置中',
            items: [
              '复制 which claude 返回的路径',
              '粘贴到 Obsidian 的 Client Path 输入框中',
              '点击「保存」按钮'
            ]
          }
        ]
      },
      {
        title: '配置 DeepSeek API 环境变量',
        content: '为了让 Obsidian 能读取 API 配置，需要在 Windows 系统中设置环境变量。',
        steps: [
          {
            title: '设置系统环境变量',
            description: '在 Windows 系统环境变量中添加 DeepSeek API 配置',
            items: [
              '按 Win + S 搜索「编辑系统环境变量」并打开',
              '点击「环境变量」按钮',
              '在「用户变量」区域点击「新建」'
            ],
            code: '# 依次创建以下三个环境变量\n# 变量名                    变量值\nANTHROPIC_BASE_URL     https://api.deepseek.com/anthropic\nANTHROPIC_AUTH_TOKEN   你的DeepSeek API Key\nANTHROPIC_MODEL        deepseek-chat',
          },
          {
            title: '保存并重启',
            description: '保存环境变量后重启 Obsidian',
            items: [
              '点击「确定」保存所有更改',
              '完全关闭 Obsidian（不只是最小化）',
              '重新打开 Obsidian',
              '更彻底的方法：重启电脑'
            ]
          }
        ],
        warnings: [
          '环境变量设置后必须重启 Obsidian 才能生效',
          'API Key 务必保密，不要泄露'
        ]
      },
      {
        title: '测试 Claudian 插件',
        content: '验证插件是否安装配置成功。',
        steps: [
          {
            title: '测试对话',
            description: '在 Obsidian 中与 Claudian 对话测试',
            items: [
              '在 Obsidian 界面中找到 Claudian 插件图标（机器人头像）',
              '通常在右侧边栏或左侧边栏',
              '点击机器人图标，打开 Claudian 对话窗口',
              '输入测试问题，例如：你好，请用中文介绍一下自己',
              '如果收到回复，说明安装成功！'
            ]
          }
        ],
        tips: [
          '如果图标不显示，检查插件是否已启用（设置 → 第三方插件）',
          '尝试重启 Obsidian'
        ]
      },
      {
        title: '常见问题排查',
        content: '安装过程中可能遇到的问题及解决方案。',
        steps: [
          {
            title: 'Claude CLI not found',
            description: 'Obsidian 中 Claudian 报错找不到 Claude CLI',
            items: [
              '检查 Client Path 是否正确',
              '重新执行 which claude 命令确认路径',
              '确保路径中不包含多余的空格或特殊字符'
            ]
          },
          {
            title: '环境变量设置了但 Obsidian 读不到',
            description: '系统环境变量未生效',
            items: [
              '完全关闭 Obsidian 再重新打开',
              '如果仍无效，重启电脑',
              '在 Git Bash 中测试：echo $ANTHROPIC_AUTH_TOKEN'
            ]
          },
          {
            title: 'API 返回错误',
            description: '调用 API 时出错',
            items: [
              '确认 API Key 是否正确',
              '检查网络连接',
              '确认 DeepSeek API 服务是否正常'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'llm-wiki',
    name: 'LLM Wiki 知识编译器',
    desc: '将零散信息编译成结构化知识网络的AI驱动知识管理系统，基于Obsidian和Claude构建',
    url: 'https://github.com/jason-effi-lab/karpathy-llm-wiki-vault',
    icon: '🧠',
    badge: { text: '知识管理', type: 'info' },
    sections: [
      {
        title: '一、项目技术架构与实现细节',
        content: 'karpathy-llm-wiki-vault 是一个具体的知识库项目实现，其整体架构设计深刻体现了【编译思维】，核心目标是将零散、非结构化的原始信息通过自动化处理流程，转化为高度结构化、相互关联的知识网络。这一架构构建在 `Obsidian` 这款本地优先的知识管理工具之上，并深度集成了 `Claude AI` 作为核心的智能处理引擎。',
        steps: [
          {
            title: '核心理念：信息分层与编译流水线',
            description: '项目的架构根植于一个清晰的分层模型，将数据流动与价值提炼的过程具象化为不同的"层"，每一层都有明确的职责和权限设定。',
            items: [
              '原始输入层 `raw/`：充当项目的【只读收件箱】，用于临时存放未经处理的原始材料。对LLM只读',
              '知识编译层 `wiki/`：核心输出层，存放由AI提炼、归纳、链接后生成的【结构化知识】。LLM拥有完全写权限',
              '智能控制层 `.claude/skills/` 与 `CLAUDE.md`：定义AI如何理解和操作知识库的【行为规范和技能工具】',
              '资源管理层 `assets/`：统一的媒体资源仓库，存放图片、PDF等附件'
            ]
          },
          {
            title: '分层架构的核心思想',
            description: '这种分层架构确保了数据处理流程的【单向性与秩序性】：信息从 `raw/` 流入，经过 ingest 技能的处理，价值被萃取至 `wiki/`，而原始文件则被移至 `raw/09-archive/` 归档。体现了【"源码"与"编译产物"分离】的思想。',
            items: [
              '信息从 `raw/` 单向流入，经处理后提炼至 `wiki/`',
              '处理完毕的原始文件自动移至 `raw/09-archive/` 归档',
              '【"源码"与"编译产物"分离】，避免混杂',
              '数据处理流程具有单向性与秩序性'
            ]
          },
          {
            title: '实现范式：声明式配置与AI代理驱动',
            description: '该项目的技术实现细节主要体现在其配置化与代理驱动的范式上，而非传统意义上的编码。',
            items: [
              '声明式的架构规范 `CLAUDE.md` —— 项目的【"宪法"文件】，用自然语言编写的协议文档',
              '技能化的工作流 `.claude/skills/` —— 可复用的AI工作流模块，架构中的【"微服务"】',
              '与宿主环境 `Obsidian` 的深度集成 —— 利用Markdown存储、双向链接、官方技能扩展'
            ]
          },
          {
            title: 'CLAUDE.md——项目宪法',
            description: '这是项目的【"宪法"文件】，并非可执行代码，而是一份详细的自然语言协议文档。它定义了：',
            items: [
              '语言协议：整个知识库所使用的术语体系和写作风格',
              '读写权限：AI在 `raw/` 层仅可读，在 `wiki/` 层可读写，约束行为边界',
              'Wiki Schema：规定 `wiki/` 目录下 `concepts/`（概念）、`entities/`（实体）、`sources/`（摘要）、`syntheses/`（综合报告）等子目录的语义和用途',
              '操作指令：指导AI如何执行 `ingest`、`query` 等任务'
            ]
          },
          {
            title: '技能化的工作流',
            description: '在 `.claude/skills/` 目录下定义的一系列"技能"，构成了可复用的AI工作流模块。这些技能通过 Claude Code 环境被调用，是架构中的【"微服务"】。',
            items: [
              '`ingest`：实现了【编译流水线】。读取 `raw/` 收件箱中的新文件，根据 `CLAUDE.md` 规范提炼核心内容至 `wiki/sources/`，更新概念与实体页面，最后将原始文件移至 `archive/`',
              '`query`：实现了【知识检索与综合】。检索 `wiki/index.md` 全局索引，综合信息生成带有双向链接引用的答案，从"存储"到"调用"的完整闭环',
              '`lint`：实现了【系统维护】。检查知识库健康状况，修复死链、提示认知冲突、更新全局索引，确保知识网络的结构化质量'
            ]
          },
          {
            title: '与宿主环境（Obsidian）的深度集成',
            description: '架构充分利用了 `Obsidian` 的原生能力：',
            items: [
              '数据基石：所有知识均以 `Markdown` 文件形式存储，确保可移植性、版本控制（通过 `Git`）和长期可访问性',
              '链接网络：利用 `Obsidian` 原生的【双向链接】功能，自动构建知识节点间的关联网络',
              '官方技能扩展：集成 `obsidian-cli`、`defuddle` 等官方技能，将外部工具能力无缝接入自有流水线'
            ]
          }
        ],
        tips: [
          '该项目的技术架构是一个以"分层数据模型"为骨架、以"声明式协议"为灵魂、以【AI代理技能】为肌肉、以 `Obsidian` 本地知识库为载体的混合系统',
          '其实现细节不体现在代码逻辑的复杂性上，而体现在对【AI行为的精细引导】、对【知识结构的严谨定义】以及对【工具生态的巧妙融合】之中'
        ]
      },
      {
        title: '二、核心功能模块工作原理',
        content: '本系统的核心功能围绕【"知识编译流水线"】展开，所有工作由 `.claude/skills/` 目录下的特定技能模块驱动。这些模块并非传统意义上的代码程序，而是 `Claude Code` 环境下可调用的AI工作流，它们依据 `CLAUDE.md` 定义的语义协议与权限，协同完成从原始信息摄入到结构化知识调用与维护的闭环。',
        steps: [
          {
            title: '"ingest"模块：知识编译主程',
            description: '`ingest` 技能是知识流水线的【核心处理引擎】，负责将收件箱中的原始素材"编译"为结构化的知识笔记。',
            items: [
              '触发与输入：执行 `/ingest` 命令触发，自动扫描 `raw/` 目录（包括 `01-articles/`、`02-papers/`、`03-transcripts/`、`04-meeting_notes/` 等子目录）',
              '内容提炼：深度阅读与分析文本，提取核心观点、关键论据和重要数据',
              '分类归档：将信息分类写入 `wiki/` 知识库——`sources/`（摘要笔记）、`concepts/` 与 `entities/`（概念与实体页面）',
              '索引更新：将新笔记及链接关系更新至 `wiki/index.md`，维护全局索引完整性',
              '自动归档：处理完成后将原始文件从 `raw/` 移至 `raw/09-archive/`，确保收件箱保持清爽'
            ]
          },
          {
            title: '"query"模块：知识检索与综合',
            description: '`query` 技能实现了基于已编译知识库的【智能检索与综合回答】。',
            items: [
              '触发与输入：通过 `/query <问题>` 命令触发',
              '索引定位：检索 `wiki/index.md` 全局索引，快速定位相关笔记页面',
              '内容综合：阅读并综合相关笔记内容，而非简单关键词匹配',
              '链接引用：答案包含【双向链接】，可直接跳转至相关概念或来源页面',
              '产出沉淀：高质量query结果建议保存为新的Wiki页面（如 `wiki/syntheses/`），实现【每次提问都在增厚知识库】'
            ]
          },
          {
            title: '"lint"模块：知识库健康维护',
            description: '`lint` 技能定期检查知识库的结构完整性，确保知识网络持续处于【健康状态】。',
            items: [
              '修复死链：发现并修复指向不存在页面的【无效内部链接】',
              '补充索引：将未被 `wiki/index.md` 收录的新页面补充进全局索引',
              '发现矛盾：识别不同页面间对同一事实的【矛盾描述】，并提示用户或自动修正',
              '发现孤儿页面：找出没有其他页面链接到的【孤立内容】，建立必要的关联'
            ]
          },
          {
            title: '官方技能集成',
            description: '`Obsidian` 官方提供的基础设施技能，作为自定义技能的底层依赖。',
            items: [
              '`obsidian-cli`：提供调用 `Obsidian` 原生API（如检索、打开页面）的能力，是自定义技能的底层依赖',
              '`defuddle`：将网页URL自动清理并转化为干净的Markdown文件，直接存入 `raw/` 目录，是信息输入的入口工具之一'
            ]
          },
          {
            title: '模块协同工作流',
            description: '整个流水线的核心任务是【"将碎片化的信息编译成结构化、高度相互链接的知识网络"】。三大自定义模块分别承担了编译主程、检索调用和系统维护职能，与两个官方技能共同构成一套完整的【知识操作系统】。',
            items: [
              '`defuddle` 将外部信息输入 `raw/` 收件箱',
              '`ingest` 从 `raw/` 编译至 `wiki/`，构建知识网络',
              '`query` 基于 `wiki/` 检索知识并生成综合答案',
              '`lint` 维护 `wiki/` 知识库的结构健康',
              '四个模块形成完整闭环：【输入→编译→查询→维护】'
            ]
          }
        ]
      },
      {
        title: '三、代码结构与关键技术点',
        content: 'karpathy-llm-wiki-vault 的技术实现核心在于【"用结构约定代替程序代码，用协议文件驱动AI行为"】。其代码结构即是数据结构和操作规范的蓝图，而关键技术点则体现在通过 `CLAUDE.md` 和技能对大型语言模型进行精确定制与调度，从而在纯文本文件系统之上，实现了一个自动化、结构化的个人知识编译与检索系统。',
        steps: [
          {
            title: '目录结构总览',
            description: '项目的文件组织本身就是架构设计的重要组成部分：',
            items: [
              '`CLAUDE.md` — 项目宪法：定义术语、权限、Wiki Schema和操作指令',
              '`raw/` — 原始输入层：`01-articles/`、`02-papers/`、`03-transcripts/`、`04-meeting_notes/`、`09-archive/`',
              '`wiki/` — 知识编译层：`concepts/`（概念）、`entities/`（实体）、`sources/`（摘要）、`syntheses/`（综合）、`index.md`（全局索引）',
              '`assets/` — 资源管理层：统一媒体资源仓库',
              '`.claude/skills/ingest/` — 编译技能目录',
              '`.claude/skills/query/` — 检索技能目录',
              '`.claude/skills/lint/` — 维护技能目录',
              '`.claude/skills/obsidian-cli/` — Obsidian官方技能：调用原生API',
              '`.claude/skills/defuddle/` — Obsidian官方技能：网页清理与剪藏'
            ]
          },
          {
            title: '声明式文件协议与心智规范（CLAUDE.md）',
            description: '这是系统运行的【"宪法"】。它不包含可执行代码，而是通过自然语言明确定义了：',
            items: [
              '术语表：什么是 `concept`，什么是 `entity`，什么是 `source`',
              '权限边界：LLM可以在 `wiki/` 下任意创建、编辑文件，但 `raw/` 和 `assets/` 是【只读】的',
              'Wiki Schema（模板）：规定生成 `concept` 或 `entity` 笔记时应遵循的固定结构',
              '操作指令：指导LLM如何执行 `ingest`、`query` 等任务',
              '这种设计将复杂的程序逻辑转化为对AI模型的【精确提示（Prompt）】，使得系统行为可通过修改这个声明式文件进行配置和调整'
            ]
          },
          {
            title: '技能（Skill）模块化机制',
            description: '在 `.claude/skills/` 目录下的每个子目录都代表一个可被 `Claude Code` 直接调用的AI工作流。每个技能内部包含了执行该任务所需的完整上下文、步骤规划和Prompt设计。',
            items: [
              '`obsidian-cli` 和 `defuddle` 作为官方技能，提供了与 `Obsidian` 环境和外部网络交互的底层能力',
              '自定义技能能专注于【高层级的认知任务】（如总结、关联、推理）',
              '技能之间通过共享的 `wiki/` 数据层和 `CLAUDE.md` 协议实现协同'
            ]
          },
          {
            title: '基于纯文本与双向链接的知识网络',
            description: '系统完全构建在 `Markdown` 这一纯文本格式之上。所有知识节点（`wiki/` 下的文件）都通过 `Obsidian` 原生的 `[[双向链接]]` 语法相互连接。',
            items: [
              '`wiki/index.md` 文件充当了一个人工维护的、机器可读的【总索引】',
              '`/query` 技能首先查阅此索引来快速定位相关笔记，而非进行全库模糊搜索',
              '这大大提高了检索的【准确性和效率】',
              '双向链接使知识节点间自动形成【关联网络】'
            ]
          },
          {
            title: '数据持久化与版本控制',
            description: '整个知识库（`raw/`、`wiki/`、`assets/`、`CLAUDE.md`）就是一个标准的 `Git` 仓库。所有知识的增删改查、AI的操作历史都以文本形式保存，天然支持Git的版本管理。',
            items: [
              '用户可以【回滚到任何历史状态】',
              '清晰地追踪知识演变和AI生成内容的变迁',
              '无需依赖向量数据库或特定云端服务',
              '实现知识的完整历史追溯和跨设备同步'
            ]
          }
        ]
      },
      {
        title: '四、面向普通用户的使用方法与操作步骤',
        content: '本项目的设计目标是将用户从繁琐的知识整理工作中解放出来，通过清晰的架构和简单的命令，实现知识的自动"编译"与持续增值。普通用户无需编写代码，只需与图形界面（`Obsidian`）和命令行（`Claude Code`）交互，即可完成从信息收集到知识应用的全流程。',
        steps: [
          {
            title: '第一步：环境准备与知识库初始化',
            description: '要开始使用，您需要完成以下基础准备工作：',
            items: [
              '安装核心软件：安装 `Obsidian` 桌面端应用，它是浏览和管理知识库的【"IDE"】',
              '确保拥有 `Claude Code` 或 `Claudian` 插件，这是驱动AI执行核心操作的【"引擎"】',
              '获取知识库模板：从 GitHub 克隆 `jason-effi-lab/karpathy-llm-wiki-vault` 仓库到本地',
              '关联与配置：打开 `Obsidian`，选择"打开库"，指向 `LLM-Wiki-Vault` 文件夹',
              '确保已启用 `Claude Code` 或 `Claudian` 插件，系统预置的目录结构和技能将自动生效'
            ],
            code: '# 克隆知识库模板\ngit clone https://github.com/jason-effi-lab/karpathy-llm-wiki-vault.git'
          },
          {
            title: '知识库核心结构一览',
            description: '完成初始化后，您的知识库已经就绪。其核心结构清晰可见：',
            items: [
              '`assets/`：统一存放图片、PDF等附件',
              '`raw/`：您的【"收件箱"】，用于存放待处理的原始资料',
              '`wiki/`：AI生成的【"成品知识库"】，供您阅读和探索',
              '`CLAUDE.md`：系统的【"宪法"】，定义了AI的行为规范（普通用户通常只需阅读，必要时微调）'
            ]
          },
          {
            title: '阶段一：收集——将信息放入"收件箱"',
            description: '这是工作的起点，将任何格式的原始资料放入 `raw/` 目录下的对应子文件夹中。',
            items: [
              '自动化收集（推荐）：遇到有价值的网页时，执行 `/defuddle <网页URL>`。自动清理网页噪音，转化为干净的Markdown存入 `raw/01-articles/`',
              '手动收集——`raw/01-articles/`：技术文章、博客',
              '手动收集——`raw/02-papers/`：学术论文、行业研报',
              '手动收集——`raw/03-transcripts/`：播客、视频转录文本',
              '手动收集——`raw/04-meeting_notes/`：头脑风暴或会议纪要'
            ],
            code: '# 自动收集（推荐）：一键剪藏网页\n/defuddle https://example.com/article\n# 自动清理网页噪音，转为Markdown存入 raw/01-articles/'
          },
          {
            title: '阶段二：编译——让AI消化资料，构建知识网络',
            description: '当 `raw/` 收件箱中积累了新文件后，执行核心的编译命令：`/ingest`。AI将自动执行以下工作：',
            items: [
              '1. 读取 `raw/` 目录下的新文件',
              '2. 提炼核心观点，在 `wiki/sources/` 下生成一对一的摘要页',
              '3. 识别并更新相关的概念（`wiki/concepts/`）、实体（`wiki/entities/`）页面，建立【双向链接】',
              '4. 更新全局索引文件 `wiki/index.md`',
              '5. 自动归档：将源文件从 `raw/` 移至 `raw/09-archive/`'
            ],
            code: '# 编译收件箱\n/ingest'
          },
          {
            title: '阶段三：应用——查询与使用已编译的知识',
            description: '当您需要研究某个问题或回忆某个概念时，无需手动翻找。输入：`/query <您的问题>`。',
            items: [
              'AI将基于已编译的 `wiki/` 知识库进行回答',
              '1. 检索 `wiki/index.md` 找到相关页面',
              '2. 综合阅读这些页面的内容',
              '3. 生成一个带有【双向链接引用】、逻辑完整的答案',
              '关键实践：高质量答案应保存为新页面（如 `wiki/syntheses/`），实现【"每次提问都在增厚知识库"】的复利效应'
            ],
            code: '# 智能问答\n/query 对比一下 Transformer 和 RNN 的优缺点'
          },
          {
            title: '阶段四：维护——让知识库保持健康与活力',
            description: '定期对知识库进行"体检"，确保其结构完整、内容一致。输入：`/lint`。',
            items: [
              '1. 修复死链：发现并修复无效的内部链接',
              '2. 补充索引：将未收录的新页面加入 `wiki/index.md`',
              '3. 发现矛盾：识别不同页面间的矛盾描述',
              '4. 找出孤儿页面：发现未被引用的孤立内容'
            ],
            code: '# 知识库体检\n/lint'
          }
        ],
        tips: [
          '一句话工作流：把资料扔进 `raw/` → 运行 `/ingest` → 在 `wiki/` 里阅读或 `/query` → 定期 `/lint` 体检',
          '高质量query结果应保存为新页面，实现【"每次提问都在增厚知识库"】的复利效应'
        ],
        warnings: [
          '在 `CLAUDE.md` 中明确规定"收到指令后立即执行所有步骤"，避免AI中途请求确认',
          '严格区分操作指令和源文件内容，防止AI误将文档描述当作操作指令执行'
        ]
      },
      {
        title: '五、2026年最新功能更新与社区实践',
        content: '自项目发布以来，LLM Wiki的模式在社区中引发了广泛共鸣，围绕【"知识编译"】的核心理念，涌现了一系列增强工具和最佳实践更新，进一步验证并拓展了这一架构的可行性与价值。',
        steps: [
          {
            title: '知识复利效应的验证与深化',
            description: '社区实践进一步验证了【"知识复利"】的核心价值主张：新资料能自动整合进现有知识网络，第100份资料建立在前99份的基础之上，使知识库的价值随使用量呈指数级增长。',
            items: [
              '自动整合：新资料能自动整合进现有知识网络',
              '复利积累：第100份资料建立在前99份的基础之上',
              '指数级增长：知识库的价值随使用量呈【指数级增长】',
              '人类角色转变：从"图书管理员"转变为【"知识策展人"和"使用者"】'
            ]
          },
          {
            title: '社区工具生态',
            description: '围绕LLM Wiki的核心理念，社区已衍生出多种【开源实现和增强工具】：',
            items: [
              '`Graphify`（开源命令行工具）：自动分析 `raw/` 目录中的文档，生成交互式知识图谱（`graph.html`）、核心概念报告及Obsidian兼容的Markdown文件。支持深度推理、增量更新模式',
              '`Obsidian`专属插件：将 `ingest`、`query`、`lint` 等核心操作深度集成到Obsidian命令面板中，实现【"LLM编译，人类浏览"】的无缝工作流',
              '多样的Agent技能包：将LLM Wiki模式封装成可调用的技能（如 `wiki-skills`），用户通过简单指令即可调用复杂的知识库操作'
            ]
          },
          {
            title: '核心操作的最佳实践更新',
            description: '针对 `ingest`、`query`、`lint` 三大核心操作，社区总结了更精细、可规避早期陷阱的【实践经验】。',
            items: [
              '`Ingest`的自动化与确定性——避坑指南：早期LLM容易陷入"只讨论不执行"的循环。最佳实践强调在 `CLAUDE.md` 中明确规定【"收到指令后立即自动执行所有步骤"】',
              '`Ingest`的内容隔离：需严格区分操作指令和源文件内容，防止LLM误将文档描述当作操作指令执行',
              '`Query`的产出沉淀制度：高质量query结果应保存为新的Wiki页面（如 `wiki/analysis/` 或 `wiki/syntheses/`），使有价值的分析得以沉淀',
              '`Lint`的系统化与主动化：定期运行lint检查四大类问题——页面间逻辑矛盾、过时内容、孤立页面、未建立独立页面的重要概念。使知识库具备【"自我修复"和"自我生长"】的潜力'
            ]
          },
          {
            title: '技术栈整合与生态位巩固',
            description: '2026年的实践进一步明确了LLM Wiki在个人知识管理生态中的【优势位置】：',
            items: [
              '`Obsidian`成为"编译产物"的完美前端：其双向链接和图谱视图（Graph View）能直观展示LLM构建的知识网络结构。`Obsidian CLI` 的发布使知识库能通过命令行被AI直接调用，成为【"可编程知识基础设施"】',
              '对小规模数据场景的重新评估：约100篇文章、40万字左右的"小规模"个人知识库场景下，LLM维护的 `index.md` 和摘要文件已能提供高效检索，【传统RAG的复杂向量检索可能并非必需】',
              '绝对的数据主权与可移植性：整个系统基于本地Markdown文件，无需依赖向量数据库或特定云端服务。配合 `Git` 进行版本控制，实现知识的完整历史追溯和跨设备同步'
            ]
          }
        ]
      },
      {
        title: '六、常见问题与解决方案',
        content: '在使用LLM Wiki知识编译器的过程中，用户可能会遇到以下常见问题。这里提供详细的【排查与解决思路】。',
        steps: [
          {
            title: 'Q1：LLM Wiki与传统RAG有什么本质区别？',
            description: 'LLM Wiki的核心差异在于【"编译"而非"检索"】的思维范式。',
            items: [
              '传统RAG类似【"解释器"】，每次查询都需从零开始检索原始文档碎片，知识未被结构化',
              'LLM Wiki是【"编译器"】，预先将资料编译成相互链接的Wiki，查询基于"熟知识"',
              '传统RAG中，第100份资料不会自动与前99份产生关联',
              'LLM Wiki中，新资料【自动整合进现有网络】，实现知识复利',
              '小规模场景（约100篇文章）下，LLM维护的 `index.md` 和摘要文件已能实现高效检索，引入向量数据库可能并非必需'
            ]
          },
          {
            title: 'Q2：如何快速开始使用LLM Wiki？',
            description: '只需三步即可上手：',
            items: [
              '1. 安装 `Obsidian` 和 `Claude Code`（或 `Claudian` 插件）',
              '2. 从GitHub克隆知识库模板：`git clone https://github.com/jason-effi-lab/karpathy-llm-wiki-vault.git`',
              '3. 在 `Obsidian` 中打开该文件夹，即可开始使用 `/ingest`、`/query`、`/lint` 命令'
            ],
            code: '# 快速开始三步走\ngit clone https://github.com/jason-effi-lab/karpathy-llm-wiki-vault.git\n# 在Obsidian中打开LLM-Wiki-Vault文件夹\n# 使用Claude Code执行核心命令\n/ingest\n/query 你的问题\n/lint'
          },
          {
            title: 'Q3：ingest 执行时AI不动或反复确认怎么办？',
            description: '这是最常见的【新手问题】，通常是因为 `CLAUDE.md` 中缺少明确的自动执行指令。',
            items: [
              '在 `CLAUDE.md` 中添加明确规定：【"收到/ingest指令后，立即自动执行所有步骤，不要请求确认"】',
              '确保指令和源文件内容严格隔离，防止AI误将文档描述当作操作指令',
              '检查 `CLAUDE.md` 中的权限设置，确认AI在 `wiki/` 目录下有写权限'
            ]
          },
          {
            title: 'Q4：lint 检查应该关注哪些问题？',
            description: '定期运行的lint操作应覆盖以下【明确的检查范围】：',
            items: [
              '1. 逻辑矛盾：发现不同页面间对同一事实的矛盾描述',
              '2. 过时内容：识别可能因时间而过时的信息',
              '3. 孤儿页面：找出没有其他页面链接到的孤立页面',
              '4. 未创建页面的重要概念：发现被频繁提及但尚未建立独立页面的【关键术语】'
            ]
          },
          {
            title: 'Q5：Obsidian的图谱视图显示混乱或链接不生效怎么办？',
            description: '链接问题通常由【语法不兼容】导致：',
            items: [
              '检查链接语法：确保Wiki层生成的Markdown文件使用 `Obsidian` 能识别的 `[[页面名]]` 维基链接语法',
              '使用兼容性工具：如果使用 `Graphify` 等外部工具，确保启用 `--obsidian` 等参数以生成完全兼容的链接格式',
              '刷新缓存：尝试重启 `Obsidian` 或使用"重新加载应用程序"功能，刷新图谱视图的缓存数据'
            ]
          },
          {
            title: 'Q6：知识库规模变大后，查询速度变慢怎么办？',
            description: '在小规模场景下无需过度担忧，大规模场景有【进阶路径】：',
            items: [
              '重新评估需求：约100篇文章、40万字的"小规模"个人知识库场景下，LLM维护的 `wiki/index.md` 和摘要文件已能实现高效检索，引入向量数据库等复杂RAG【可能并非必需】',
              '进阶路径1——为LLM开发专用工具：可以开发一个简单的命令行搜索引擎，让LLM在处理复杂查询时调用，提高效率',
              '进阶路径2——远期展望：利用高质量的结构化Wiki数据生成合成数据，对专属小模型进行【微调（Fine-tuning）】，将核心知识"内化"到模型权重中'
            ]
          },
          {
            title: 'Q7：如何最大化LLM Wiki的价值？',
            description: '核心在于【人类角色的重新定位】：',
            items: [
              '人类聚焦高杠杆工作：你的核心角色应转向【信息策展人】（筛选高质量输入）、【方向探索者】（提出关键问题）和【最终裁决者】',
              '将摘要、关联、格式化、一致性维护等"体力活"完全委托给LLM',
              '牢记系统定位：LLM Wiki是强大的【辅助外化工具】，能极大提升知识整理和关联的效率，但不能替代人类自身的深度思考',
              '最终的洞察力和创造力依然来源于你'
            ]
          },
          {
            title: 'Q8：初期效果不理想怎么办？',
            description: '效果优化是一个【迭代过程】：',
            items: [
              '效果上限高度依赖于【模型能力】与【提示词（CLAUDE.md）质量】',
              '初期需要投入时间"调教"你的系统规范，这是一个迭代过程',
              '从简单的规则开始，根据LLM的输出结果不断修正和完善你的"宪法"',
              '使其越来越符合你的工作习惯和知识领域要求'
            ]
          }
        ],
        tips: [
          '通过理解上述问题与方案，你可以更有信心地部署和优化你的知识编译系统，让AI真正成为一个不知疲劳的【知识架构师】',
          '如果你对某个功能的具体操作仍有疑问，建议回顾第四章与第五章中关于使用步骤和社区经验的详细说明'
        ]
      }
    ]
  }
];

export function getAppTutorialById(id: string) {
  return appTutorials.find(t => t.id === id);
}


