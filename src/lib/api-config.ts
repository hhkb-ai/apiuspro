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
  code?: string;
  codeLanguage?: string;
  codeExplanation?: string;
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
    id: 'deepseek',
    name: 'DeepSeek',
    desc: '高性价比AI模型，代码与推理能力突出',
    url: 'https://platform.deepseek.com/',
    free: '赠送500万Tokens',
    proxy: false,
    features: ['高性价比', '代码能力强', '推理模型', '开源'],
    icon: '🔵',
    badge: { text: '热门', type: 'warning' },
    tutorial: {
      title: 'DeepSeek API 购买与首次调用教程',
      subtitle: '从注册认证、创建 API Key、充值到账户调用的精简流程',
      steps: [
        {
          title: '注册 DeepSeek 账号',
          description: '先进入 DeepSeek 开放平台，用手机号或邮箱完成账号注册和登录。',
          image: '/images/tutorial/deepseek-docx-1.png',
          items: [
            '访问 platform.deepseek.com',
            '点击 Sign Up 或登录入口创建账号',
            '按页面提示完成手机号、邮箱或扫码登录'
          ]
        },
        {
          title: '完成实名认证',
          description: '认证会影响 API 配额和后续付费调用权限，个人和企业按身份选择即可。',
          image: '/images/tutorial/deepseek-docx-2.png',
          items: [
            '在账号设置或个人中心进入实名认证',
            '个人开发者按要求提交身份证与人脸识别',
            '企业用户提交营业执照及相关证明材料'
          ],
          warning: '认证通过后再创建密钥和充值，流程会更顺。'
        },
        {
          title: '创建并保存 API Key',
          description: '在 API Keys 管理页生成 Bearer Token，生成后立刻复制保存。',
          image: '/images/tutorial/deepseek-docx-3.png',
          items: [
            '进入 API Keys 管理页面',
            '点击 Create API Key 或 Generate New Token',
            '为密钥命名，避免空格和特殊字符',
            '复制完整密钥并保存到安全位置'
          ],
          warning: 'DeepSeek API Key 通常只完整显示一次，不要提交到 GitHub 或写进客户端代码。'
        },
        {
          title: '充值并确认余额',
          description: '正式持续调用通常需要账户余额，测试前先确认充值和账单状态。',
          image: '/images/tutorial/deepseek-docx-2.png',
          items: [
            '进入账单、余额或 Usage 页面',
            '选择合适充值档位，例如 10、20、50 或 100 元',
            '可使用支付宝、微信等本地支付方式',
            '支付成功后检查账户余额是否更新'
          ]
        },
        {
          title: '配置环境变量并首次调用',
          description: 'DeepSeek 兼容 OpenAI SDK，配置 base_url 后即可用熟悉的方式调用。',
          image: '/images/tutorial/deepseek-docx-4.png',
          items: [
            '安装 openai 和 python-dotenv',
            '将 DEEPSEEK_API_KEY 写入环境变量或 .env',
            'base_url 指向 https://api.deepseek.com'
          ],
          codeLanguage: 'python',
          code: `import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[{"role": "user", "content": "你好，请用一句话介绍你自己。"}],
)

print(response.choices[0].message.content)`,
          codeExplanation: '使用 OpenAI SDK 调用 DeepSeek API，让模型自我介绍并打印回复。成功执行即代表 API Key 和 base_url 配置正确。'
        },
        {
          title: '选择模型并控制成本',
          description: '首次跑通后，再根据速度、推理能力和成本切换模型。',
          image: '/images/tutorial/deepseek-docx-4.png',
          items: [
            'deepseek-chat：通用对话和基础问答，适合入门测试',
            'deepseek-v4-flash：响应快、性价比高，适合实时对话和客服',
            'deepseek-v4-pro：推理能力更强，适合复杂代码、长文档和技术问答',
            '在控制台查看用量、余额和预算告警'
          ],
          warning: '模型名称、免费试用和价格会随平台调整，正式使用前请以控制台和官方文档为准。'
        }
      ],
      tips: [
        '推荐用 .env 或环境变量保存 DEEPSEEK_API_KEY',
        'OpenAI SDK 兼容模式最适合迁移已有代码',
        '个人开发者可先从 deepseek-chat 或 flash 类模型开始控制成本'
      ],
      warnings: [
        '不要在前端、公开仓库或截图中暴露 API Key',
        '所有调用都会按模型计价扣除余额，建议定期查看用量'
      ],
      advantages: ['性价比高', '国内直连', 'OpenAI 兼容接口', '代码与推理能力强']
    }
  },
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
      title: '通义千问 API 购买与接入教程',
      subtitle: '通过阿里云百炼或 DashScope 开通服务、获取密钥并完成首次调用',
      steps: [
        {
          title: '准备阿里云账号',
          description: '使用通义千问 API 前，需要先完成阿里云账号注册与实名认证。',
          image: '/images/tutorial/qwen-docx-1.png',
          items: [
            '访问 aliyun.com，使用手机号或邮箱注册账号',
            '进入「账号管理」中的「账号认证」',
            '按个人或企业身份完成实名认证'
          ]
        },
        {
          title: '开通百炼或 DashScope 服务',
          description: '推荐从阿里云百炼平台进入，也可以使用 DashScope 灵积平台。',
          image: '/images/tutorial/qwen-docx-1.png',
          items: [
            '进入 bailian.console.aliyun.com 或 dashscope.console.aliyun.com',
            '搜索或找到「通义千问」服务并点击开通',
            '新用户免费额度以控制台当前展示为准'
          ]
        },
        {
          title: '创建并保存 API Key',
          description: '在 API-KEY 管理页面创建调用凭证，生成后立即保存。',
          image: '/images/tutorial/qwen-docx-2.png',
          items: [
            '进入「API-KEY 管理」页面',
            '点击「创建 API-KEY」',
            '复制以 sk- 开头的密钥，并保存到安全位置'
          ],
          warning: 'API Key 通常只完整显示一次，不要写入前端代码或公开仓库。'
        },
        {
          title: '配置环境变量并首次调用',
          description: '通义千问支持 OpenAI 兼容接口，可用 OpenAI SDK 快速调用。',
          image: '/images/tutorial/qwen-docx-2.png',
          items: [
            '安装 openai 与 python-dotenv',
            '设置 DASHSCOPE_API_KEY 环境变量',
            'base_url 使用 DashScope 兼容模式地址'
          ],
          codeLanguage: 'python',
          code: `import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
)

response = client.chat.completions.create(
    model="qwen-plus",
    messages=[{"role": "user", "content": "请用一句话介绍通义千问"}],
)

print(response.choices[0].message.content)`,
          codeExplanation: '调用 qwen-plus 模型，让它用一句话介绍通义千问并打印回复。成功执行即代表 API Key 和 base_url 配置正确。'
        },
        {
          title: '按场景选择模型',
          description: '通义千问覆盖轻量、通用、旗舰和长文本等场景，按任务选择即可。',
          image: '/images/tutorial/qwen-docx-2.png',
          items: [
            'Qwen-Turbo：适合简单对话、实时翻译和低成本高频调用',
            'Qwen-Plus：适合多数通用对话、摘要、问答和中等复杂代码任务',
            'Qwen-Max：适合复杂推理、深度创作和企业级高质量任务',
            'Qwen-Long：适合长文档总结、论文分析、合同解析和代码仓库理解'
          ],
          warning: '模型价格、免费额度和上下文长度会随平台更新，正式购买前以控制台为准。'
        },
        {
          title: '查看用量与控制成本',
          description: '开通后在控制台查看免费额度、到期时间和后付费账单。',
          image: '/images/tutorial/qwen-docx-1.png',
          items: [
            '在「模型用量」页面查看剩余额度',
            '免费额度用尽后按输入和输出 Token 计费',
            '批量推理或缓存能力可进一步降低成本'
          ]
        }
      ],
      tips: [
        '优先通过环境变量管理 DASHSCOPE_API_KEY',
        '日常开发建议从 qwen-plus 或 qwen-turbo 开始测试',
        '长文档任务优先评估 Qwen-Long'
      ],
      warnings: [
        '实名认证完成前，部分服务可能无法开通',
        '不要把 API Key 写入公开代码、截图或客户端页面'
      ],
      advantages: ['免费额度大', '国内直连', 'OpenAI 兼容接口', '模型选择丰富']
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
      title: '智谱 AI API 购买与接入教程',
      subtitle: '从注册登录、实名认证、创建密钥到购买资源包和接入指南',
      steps: [
        {
          title: '访问官网并进入登录注册',
          description: '先打开智谱 AI 开放平台，从右上角进入登录或注册流程。',
          image: '/images/tutorial/zhipu-pdf-home.png',
          items: [
            '访问 open.bigmodel.cn',
            '点击右上角「登录 / 注册」',
            '确认进入 BigModel 控制台入口'
          ]
        },
        {
          title: '完成账号注册与登录',
          description: '选择手机号或邮箱注册，完成验证码校验后登录平台。',
          image: '/images/tutorial/zhipu-pdf-register.png',
          items: [
            '选择「手机号注册」或「邮箱注册」',
            '填写验证码并完成注册',
            '使用注册手机号、邮箱和密码登录'
          ]
        },
        {
          title: '完成实名认证',
          description: '智谱 AI 要求完成实名认证后，才能开通 API 额度或购买资源包。',
          image: '/images/tutorial/zhipu-pdf-verify.png',
          items: [
            '登录后进入控制台或账号设置',
            '打开「个人中心」并进入实名认证页面',
            '个人上传身份证信息，企业上传营业执照信息',
            '等待审核通过，通常几分钟内完成'
          ],
          warning: '实名认证未完成时，API 额度开通、资源包购买等功能可能受限。'
        },
        {
          title: '创建并保存 API Key',
          description: '在控制台左侧找到 API 密钥管理或 Access Key，创建调用密钥。',
          image: '/images/tutorial/zhipu-pdf-api-key.png',
          items: [
            '进入「API 密钥管理」或「Access Key」',
            '点击「创建 API Key」并填写名称',
            '复制生成的 API Key / Secret Key',
            '立即保存到本地安全位置'
          ],
          warning: '关闭页面后密钥通常不会再完整显示，不要写入公开仓库或前端代码。'
        },
        {
          title: '购买资源包或充值账户',
          description: '免费额度可先用于开发测试，正式使用前可在财务页面购买或充值。',
          image: '/images/tutorial/zhipu-pdf-billing.png',
          items: [
            '进入控制台，点击「财务」',
            '在账户页面选择资源包或充值',
            '可使用微信或支付宝完成支付',
            '支付后回到控制台确认额度或余额'
          ]
        },
        {
          title: '查看 Coding Plan 接入指南',
          description: '需要进行 API 部署时，可以在 Coding Plan 的接入指南中按官方步骤接入。',
          image: '/images/tutorial/zhipu-pdf-coding-plan.png',
          items: [
            '进入 Coding Plan 页面',
            '打开「接入指南」查看官方 API 接入步骤',
            '按所选模型复制调用参数和密钥配置',
            '先小规模测试，再扩大并发或正式接入业务'
          ]
        }
      ],
      tips: [
        '新用户通常可领取一定免费 Tokens 额度，适合先做开发测试',
        'API Key 建议只保存在服务端环境变量或安全配置中',
        'Coding Plan 适合按官方指南快速完成模型接入'
      ],
      warnings: [
        '实名认证完成前，额度开通和资源包购买可能不可用',
        '密钥关闭页面后可能无法再次完整查看，请生成后立即保存'
      ],
      advantages: ['国内直连', '免费体验额度', 'GLM 系列模型', 'Coding Plan 接入指南']
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
      title: 'Kimi API 购买与接入教程',
      subtitle: '从平台注册、创建密钥到完成首次调用的精简流程',
      steps: [
        {
          title: '准备账号与环境',
          description: '先准备好开放平台账号和本地调用环境，云端 API 不需要额外硬件。',
          image: '/images/tutorial/kimi-pdf-platform.png',
          items: [
            '进入 platform.moonshot.cn 或 platform.kimi.ai',
            '使用手机号或企业邮箱注册并登录',
            '本地调试建议准备 Python 3.10+ 或 Node.js 环境'
          ]
        },
        {
          title: '创建并保存 API Key',
          description: '在用户中心进入 API Keys 页面，新建密钥后立即保存。',
          image: '/images/tutorial/kimi-pdf-api-key.png',
          items: [
            '点击「创建新密钥」或「Create New Key」',
            '填写应用名称，例如 my-first-api',
            '复制生成的 sk-xxx 密钥，并配置到环境变量'
          ],
          codeLanguage: 'bash',
          code: `export MOONSHOT_API_KEY="sk-your-api-key-here"

# Windows PowerShell
$env:MOONSHOT_API_KEY="sk-your-api-key-here"`,
          codeExplanation: '将 Moonshot API Key 设置为环境变量，后续 curl 命令和 Python SDK 都会自动读取，避免在代码中硬编码密钥。',
          warning: 'API Key 通常只显示一次，不要写进前端代码、公开仓库或截图里。'
        },
        {
          title: '快速测试接口',
          description: '先用最小请求确认密钥、网络和接口地址都可用。',
          image: '/images/tutorial/kimi-pdf-test-call.png',
          items: [
            '接口地址为 https://api.moonshot.cn/v1/chat/completions',
            'Authorization 使用 Bearer $MOONSHOT_API_KEY',
            '返回 JSON 回复即代表基础调用成功'
          ],
          codeLanguage: 'bash',
          code: `curl -X POST https://api.moonshot.cn/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $MOONSHOT_API_KEY" \\
  -d '{
    "model": "moonshot-v1-8k",
    "messages": [
      { "role": "user", "content": "你好，请介绍一下自己" }
    ],
    "temperature": 0.7
  }'`,
          codeExplanation: '使用 curl 快速测试 Kimi API 是否可用。返回 JSON 格式的 AI 回复即表示 API Key 和网络配置正确。'
        },
        {
          title: '选择合适模型',
          description: '按任务长度和推理需求选择模型，正式使用前先做小额测试。',
          image: '/images/tutorial/kimi-pdf-models.png',
          items: [
            'moonshot-v1-8k：适合基础对话和功能验证',
            'moonshot-v1-32k：适合较长文本生成与摘要',
            'moonshot-v1-128k：适合长文档处理和资料问答',
            'kimi-k2.5 / kimi-k2.6：适合深度推理、Agent 和多模态任务'
          ],
          warning: '模型列表、免费额度和价格可能变化，购买前以开放平台控制台为准。'
        },
        {
          title: '接入项目或客户端',
          description: 'Kimi 兼容 OpenAI 接口，可直接接入代码项目、Agent 框架或第三方客户端。',
          image: '/images/tutorial/kimi-pdf-integration.png',
          items: [
            'OpenAI SDK：设置 api_key 与 base_url 后即可调用',
            'LobeChat 等客户端：填写 API Key、API 地址和模型名称',
            'OpenClaw 等 Agent 工具：按 OpenAI Provider 方式配置'
          ],
          codeLanguage: 'python',
          code: `import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("MOONSHOT_API_KEY"),
    base_url="https://api.moonshot.cn/v1",
)

completion = client.chat.completions.create(
    model="moonshot-v1-8k",
    messages=[{"role": "user", "content": "请介绍一下 Kimi 的核心能力"}],
    temperature=0.7,
)

print(completion.choices[0].message.content)`,
          codeExplanation: '使用 OpenAI SDK 兼容模式调用 Kimi API，获取 AI 对 Kimi 核心能力的介绍并打印回复。Kimi 兼容 OpenAI 接口格式，只需修改 base_url。'
        },
        {
          title: '排查常见问题',
          description: '调用失败时，优先检查密钥、请求头、网络和频率限制。',
          image: '/images/tutorial/kimi-pdf-troubleshooting.png',
          items: [
            'API Key 无效：检查格式是否为 sk-xxx，并确认 Authorization 请求头为 Bearer sk-xxx',
            '请求超时：把超时时间设置到 60 秒以上，并检查网络连通性',
            'HTTP 429：降低并发，加入延迟重试',
            '响应异常：检查模型名称、messages 结构和 Content-Type'
          ]
        }
      ],
      tips: [
        '优先使用环境变量管理 MOONSHOT_API_KEY，避免密钥泄露',
        '长文本任务优先评估 moonshot-v1-128k，实时聊天可开启流式输出',
        '第三方客户端只要支持 OpenAI 兼容接口，通常都能接入 Kimi'
      ],
      warnings: [
        '不要把 API Key 写入前端代码或公开仓库',
        '免费额度通常有速率限制，批量任务建议做并发控制和失败重试'
      ],
      advantages: ['国内直连', 'OpenAI 兼容接口', '超长上下文', '客户端集成方便']
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
    badge: { text: '免费', type: 'success' },
    tutorial: {
      title: '腾讯混元 API 购买与接入教程',
      subtitle: '从腾讯云开通、创建密钥到完成首次调用的精简流程',
      steps: [
        {
          title: '注册账号并开通混元',
          description: '先注册腾讯云账号并完成认证，然后在混元大模型控制台开通服务。',
          image: '/images/tutorial/tencent-pdf-setup.png',
          items: [
            '访问腾讯云官网注册账号，国内用户按提示完成实名认证',
            '登录后进入「混元大模型控制台」',
            '阅读并同意服务条款，点击「立即开通」'
          ]
        },
        {
          title: '创建并保存密钥',
          description: '在 API 密钥页面创建访问凭证，保存 SecretId 和 SecretKey。',
          image: '/images/tutorial/tencent-pdf-api-key.png',
          items: [
            '进入 API 密钥页面，点击创建密钥',
            '填写参数和昵称后生成 SecretId / SecretKey',
            '立即复制保存，后续代码调用需要用到'
          ],
          warning: 'SecretKey 只应保存在本地环境变量或服务端配置中，不要提交到公开仓库。'
        },
        {
          title: '配置环境变量并首次调用',
          description: '混元 API 兼容 OpenAI 接口，可用标准 OpenAI SDK 快速完成调用。',
          image: '/images/tutorial/tencent-pdf-python.png',
          items: [
            '将 SecretId / SecretKey 写入运行环境',
            'base_url 设置为 https://api.hunyuan.cloud.tencent.com/v1',
            '先用 hunyuan-turbos-latest 做基础对话测试'
          ],
          codeLanguage: 'python',
          code: `import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("TENCENT_SECRET_KEY"),
    base_url="https://api.hunyuan.cloud.tencent.com/v1",
)

completion = client.chat.completions.create(
    model="hunyuan-turbos-latest",
    messages=[{"role": "user", "content": "你好，请介绍一下腾讯混元"}],
)

print(completion.choices[0].message.content)`,
          codeExplanation: '使用 OpenAI SDK 调用腾讯混元 API，让模型自我介绍并打印回复。成功执行即代表 SecretKey 和 base_url 配置正确。'
        },
        {
          title: '按场景选择模型',
          description: '混元提供轻量、通用、推理、多模态和翻译模型，按任务成本和能力选择即可。',
          image: '/images/tutorial/tencent-pdf-models.png',
          items: [
            'hunyuan-lite：轻量快速，适合基础对话和低成本场景',
            'hunyuan-turbos-latest：主力通用模型，适合内容创作和代码生成',
            'hunyuan-t1-latest：适合复杂推理、逻辑分析和代码调试',
            'hunyuan-vision / Hunyuan-MT-7B：分别面向多模态和翻译任务'
          ],
          warning: '免费额度、后付费规则和模型价格可能调整，正式使用前以腾讯云控制台为准。'
        },
        {
          title: '开启流式输出与进阶调用',
          description: '需要实时回复或复杂项目时，可开启 stream，并按需接入 LangChain。',
          image: '/images/tutorial/tencent-pdf-advanced.png',
          items: [
            '聊天类应用建议开启 stream，提升实时交互体验',
            '复杂项目可使用 LangChain 的 ChatHunyuan',
            'PHP、Java 等语言也可通过腾讯云官方 SDK 调用'
          ]
        },
        {
          title: '集成到应用框架',
          description: '除了直接写代码，也可以把混元接入 Dify、LobeChat、HAI 等应用框架。',
          image: '/images/tutorial/tencent-pdf-integration.png',
          items: [
            'LobeChat：选择模型提供商为腾讯混元，填写 API Key 后检查连接',
            'Dify / HAI：在模型供应商中选择 Tencent Hunyuan 并配置密钥',
            'LangChain Embedding：设置密钥后使用社区集成生成向量'
          ]
        }
      ],
      tips: [
        '优先把密钥放到环境变量或 .env 文件中，避免硬编码泄露',
        '内容生成可适当提高 temperature，代码生成建议使用较低 temperature',
        '模型默认不启用联网搜索，如需搜索能力需按接口文档开启对应参数'
      ],
      warnings: [
        '混元 API 通常为后付费模式，建议在费用中心开启预算或费用预警',
        '批量调用前先小规模测试模型效果、延迟和成本'
      ],
      advantages: ['国内直连', '腾讯云生态', 'OpenAI 兼容接口', '多模型选择', '适合企业集成']
    }
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
    badge: { text: '免费', type: 'success' },
    tutorial: {
      title: '豆包 API 购买与接入教程',
      subtitle: '通过火山引擎方舟开通豆包模型服务、创建 API Key 并完成首次调用',
      steps: [
        {
          title: '注册火山引擎账号',
          description: '先准备火山引擎账号，后续开通模型、创建密钥和查看账单都会在控制台完成。',
          items: [
            '访问 volcengine.com 或豆包大模型官网入口',
            '使用手机号、邮箱或企业账号注册并登录',
            '按页面提示完成实名认证，企业使用建议走企业认证'
          ]
        },
        {
          title: '进入火山方舟并开通服务',
          description: '豆包 API 通常在火山方舟控制台中管理，开通后可选择具体模型或创建推理接入点。',
          items: [
            '在控制台搜索「火山方舟」或「豆包大模型」',
            '进入模型服务页面，阅读并确认服务协议',
            '按业务场景选择文本、视觉、语音、Embedding 或代码模型',
            '如控制台要求创建推理接入点，先创建一个测试用 Endpoint'
          ],
          warning: '模型名称、区域和接入点 ID 可能会随控制台更新，请以当前控制台展示为准。'
        },
        {
          title: '创建并保存 API Key',
          description: '在 API Key 管理页面创建调用密钥，生成后立即复制保存到安全位置。',
          items: [
            '进入「API Key 管理」或「密钥管理」页面',
            '点击创建密钥，为密钥添加便于识别的名称',
            '复制生成的 API Key，并保存到密码管理器或服务器环境变量',
            '为正式业务单独创建密钥，方便后续轮换和权限隔离'
          ],
          warning: 'API Key 不要写进前端代码、公开仓库、截图或客户端安装包。'
        },
        {
          title: '配置环境变量并测试调用',
          description: '火山方舟可使用官方 SDK 或 OpenAI 兼容方式接入。首次测试建议用最小请求确认密钥、地址和模型都可用。',
          items: [
            '本地安装 openai SDK',
            '将 ARK_API_KEY 写入环境变量',
            'base_url 可参考控制台接入说明，常见地址为 https://ark.cn-beijing.volces.com/api/v3',
            'model 填写控制台提供的模型名或推理接入点 ID'
          ],
          codeLanguage: 'python',
          code: `import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("ARK_API_KEY"),
    base_url="https://ark.cn-beijing.volces.com/api/v3",
)

response = client.chat.completions.create(
    model="你的模型名或推理接入点 ID",
    messages=[{"role": "user", "content": "请用一句话介绍豆包大模型。"}],
)

print(response.choices[0].message.content)`,
          codeExplanation: '使用 OpenAI SDK 调用豆包大模型 API，让模型自我介绍并打印回复。将 model 替换为控制台里的实际模型名称或推理接入点 ID 后即可运行。',
          warning: '不同区域、套餐和模型的接入地址可能不同，复制控制台里的官方接入参数最稳。'
        },
        {
          title: '选择模型与购买方式',
          description: '测试跑通后，再按质量、速度和成本选择正式模型，并确认免费额度、资源包或后付费规则。',
          items: [
            '轻量对话：优先选择速度快、成本低的模型',
            '复杂推理或代码任务：选择更高能力的旗舰或代码模型',
            '图像、语音、Embedding 等任务：选择对应专项模型',
            '购买前查看计费项、免费额度、资源包有效期和后付费开关'
          ]
        },
        {
          title: '查看用量并控制成本',
          description: '正式接入前建议设置预算、告警和密钥管理流程，避免测试阶段意外产生高额调用。',
          items: [
            '在费用中心或方舟控制台查看调用量、Token 消耗和余额',
            '为测试环境和生产环境使用不同 API Key',
            '开启余额提醒或预算告警',
            '批量任务先小规模压测，再放大并发和上下文长度'
          ]
        }
      ],
      tips: [
        '个人开发者建议先用免费额度或小额充值完成端到端测试',
        '已有 OpenAI SDK 项目可优先用兼容模式迁移，改动最少',
        '模型名、Endpoint ID、地域和接入地址尽量从控制台复制，避免手填出错'
      ],
      warnings: [
        '价格、免费额度和模型列表会随平台更新，购买前以火山引擎控制台为准',
        'API Key 泄露后应立即禁用旧密钥并重新创建'
      ],
      advantages: ['国内直连', '字节生态', '模型选择丰富', '性价比高', 'OpenAI 兼容接入']
    }
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
      title: 'GPT-5.5 订阅与购买完全指南（零基础版）',
      subtitle: '专为新手编写，含四种套餐对比、三条支付路线和国内替代方案，零基础也能完成订阅',
      steps: [
        {
          title: '了解 GPT-5.5 订阅套餐',
          description: '在购买前，先看清每种套餐的价格和区别，避免买错。目前 ChatGPT 提供四档订阅。',
          items: [
            'Go · $8/月 — 仅可用 GPT-5.3，不能使用最新 GPT-5.5，适合尝鲜',
            'Plus · $20/月 — 可用 GPT-5.5 Standard 和 Thinking 模型，99% 个人用户最佳选择',
            'Pro · $100/月 — 全部模型可用，编程次数是 Plus 的 5 倍，适合重度开发者',
            'Pro · $200/月 — 全部模型可用，编程次数是 Plus 的 20 倍，适合顶尖科研'
          ]
        },
        {
          title: '准备一：注册 OpenAI 账号',
          description: '没有账号就什么都买不了。先搞定这第一步。',
          items: [
            '浏览器打开 chat.openai.com，点击 Sign up 用邮箱注册，按提示验证邮箱',
            '国内手机号可能收不到验证短信。两个解决办法：',
            '使用海外手机号验证服务（有新号被封风险，自行承担，请选择合规平台）',
            '买成品号（最省事）：在可靠代充平台购买已注册好的现成账号，请选择合规平台'
          ],
          warning: '购买现成账号时一定要选可靠的代充平台，避免买到被盗或被封的账号。'
        },
        {
          title: '准备二：合适的网络环境',
          description: 'ChatGPT 的网站和订阅页面在国内无法直接访问，需要合适的网络。',
          items: [
            '确保可以顺畅访问 chat.openai.com 和 platform.openai.com',
            '建议使用稳定节点，避免频繁切换 IP',
            '不稳定的网络可能导致支付中途断开、账号被风控'
          ],
          warning: '确保网络环境稳定，避免频繁切换 IP，否则账号可能被风控封禁。'
        },
        {
          title: '准备三：选择适合你的支付方式',
          description: 'OpenAI 官网只支持 Visa、Mastercard、American Express 国际信用卡。没有境外卡？三种替代方案供你选择。',
          items: [
            '代充平台（推荐）：支持支付宝/微信支付，无需境外卡，无需提供密码和信用卡信息',
            '美区 Apple ID（iPhone 用户）：注册美区 Apple ID，通过正规渠道购礼品卡充值，通过 ChatGPT App 内购订阅（价格比官网贵，含苹果抽成）',
            '虚拟信用卡（不推荐新手）：风控极严、失败率高，需交开卡费，平台有跑路风险'
          ],
          warning: '选择代充平台时请仔细甄别，优先选择有口碑、有售后的大平台。'
        },
        {
          title: '路线一：官网直充（有境外信用卡）',
          description: '如果你有 Visa/Mastercard 国际卡，且网络能稳定访问 OpenAI 官网，这是最直接的购买方式。',
          items: [
            '打开 chat.openai.com → 登录 → 左下角头像 → My Plan 或 Upgrade to Plus',
            '在套餐页面对比 Go / Plus / Pro / Pro 200，选好后点击 Upgrade',
            '输入卡号、有效期、CVV（卡片背面三位安全码）和账单地址',
            '确认金额无误后提交，几秒钟验证通过，账号即刻升级',
            '注册邮箱会收到 OpenAI 确认邮件，在 ChatGPT 对话界面即可选择 GPT-5.5 模型'
          ]
        },
        {
          title: '路线二：App 内购（iPhone / 安卓）',
          description: '有美区 Apple ID 或海外 Google Play 账号的用户，可直接在手机 App 内完成订阅。',
          items: [
            'iPhone：App Store 搜索 ChatGPT → 下载 → 登录 → 右上角设置 → Upgrade to ChatGPT Plus',
            '选择套餐后通过 Apple Pay 或美区 Apple ID 余额支付（比官网贵，含苹果抽成）',
            '安卓：Google Play 下载 ChatGPT → 登录 → Settings → 升级入口 → Google Pay 支付',
            'App 内购的好处：支付在苹果/谷歌生态内完成，无需直接向 OpenAI 填信用卡'
          ]
        },
        {
          title: '路线三：API 按量购买（仅限开发者）',
          description: '不是程序员、不打算把 AI 嵌入到自己开发的软件里，可以跳过本节。普通用户用订阅套餐就全包含了。',
          items: [
            'API = 程序向 GPT-5.5 提问的"后门"，适合把 AI 嵌入自己的软件中',
            '按 Token 计费：GPT-5.5 输入 $5/百万、输出 $30/百万，一次简单任务成本 < 1 分钱',
            'platform.openai.com → 登录 → Billing → 绑卡（与 ChatGPT 订阅是独立计费）',
            'API Keys → Create new secret key → 命名 → 创建 → 立刻复制保存'
          ],
          codeLanguage: 'python',
          code: `# 先安装 openai 库：pip install openai
import openai

client = openai.OpenAI(api_key="YOUR_API_KEY")

response = client.chat.completions.create(
    model="gpt-5.5",
    messages=[
        {"role": "user", "content": "请用一句话解释什么是量子力学。"}
    ]
)

print(response.choices[0].message.content)`,
          codeExplanation: '使用 OpenAI Python SDK 调用 GPT-5.5 模型，让它用一句话解释量子力学并打印结果。替换 YOUR_API_KEY 为真实密钥后即可运行。',
          warning: 'API Key 创建后仅显示一次，必须立刻复制保存。不要写入前端代码或公开仓库。API 与 ChatGPT 订阅是两套独立的计费系统，互不影响。'
        },
        {
          title: '国内用户替代方案与总结',
          description: '如果你在国内、没有境外卡，通过第三方代充平台是目前最省心的 GPT-5.5 订阅方式。',
          items: [
            '代充平台：用支付宝/微信支付，平台替你完成 OpenAI 订阅。只需提供账号，不用密码和卡信息。请选择合规平台',
            '苹果内购路线：美区 Apple ID + 礼品卡充值 → ChatGPT App 内订阅。适合 iPhone/iPad 用户',
            '不建议国内用户尝试虚拟信用卡（VCC）方案，当前风控极严、成功率很低',
            '如果你需要把 GPT-5.5 接入自己的软件（API），也可以在代充平台购买 API 额度或代充值 OpenAI 账户余额'
          ],
          warning: '代充平台良莠不齐，下单前建议先搜索评价。优先选择有客服、支持退款的平台。'
        }
      ],
      tips: [
        'Plus（$20/月）最适合 99% 个人用户，能用最新 GPT-5.5 模型，性价比最高',
        '代充平台是目前国内用户较省心的订阅方式，用支付宝/微信就能完成，务必选择合规平台',
        'API 用户切记：Key 只显示一次，且 API 计费与 ChatGPT 订阅是完全独立的',
        '如果不确定选哪个方案，先买一个月 Plus 试试，随时可以取消续费'
      ],
      warnings: [
        '账号可能因 IP 频繁变动、支付异常等原因被风控，建议保持网络环境稳定',
        'API Key 绝对不要提交到公开仓库或前端代码',
        '海外手机号验证注册的账号存在被封风险，建议选择合规代充平台的成品账号'
      ],
      advantages: ['零基础友好', '三条购买路线全覆盖', '四种套餐详细对比', '国内支付替代方案', '含 API 开发者教程']
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
      title: 'Claude Opus 4.7 订阅与购买完全指南（零基础版）',
      subtitle: '专为新手编写，含封号风险预警与避坑指南，四条路线覆盖所有支付场景，附 API 开发者接入教程',
      steps: [
        {
          title: '先读风险提示：Claude 风控极严，封号率极高',
          description: 'Claude 的审核与风控极度严格。在开始购买前，务必了解以下事实。',
          items: [
            '145 万个账号被封（仅 2025 年 7–12 月），风控审查 IP 和支付信息一致性',
            '新用户操作稍有不慎，刚付完款账号就可能被立刻封禁',
            '不存在"完全稳定、绝对不封号"的个人订阅渠道',
            '最稳妥方式：找靠谱第三方中转平台，选提供长周期售后与封号质保的商家'
          ],
          warning: 'Anthropic 风控全球最严，请务必认真对待以上风险提示。不要心存侥幸。'
        },
        {
          title: '了解 Claude 三档订阅套餐',
          description: 'Claude 提供三档个人订阅，先了解区别再决定。',
          items: [
            'Claude Pro · $20/月 — 可用 Opus 4.7，有月度用量上限，适合轻度使用',
            'Claude Max 5x · $100/月 — 可用 Opus 4.7，使用额度约为 Pro 的 5 倍，适合重度依赖 AI 的专业人士',
            'Claude Max 20x · $200/月 — 可用 Opus 4.7，使用额度约为 Pro 的 20 倍，适合团队或核心生产力'
          ]
        },
        {
          title: '准备一：注册 Google 账号',
          description: 'Claude 使用 Google 账号一键登录，所以需要一个谷歌账号。',
          items: [
            '浏览器打开 accounts.google.com/signup，按提示填写信息完成注册',
            '国内手机号可能收不到验证短信，可在可靠平台购买已注册好的 Google 账号'
          ]
        },
        {
          title: '准备二：合适的网络环境',
          description: 'Claude 官网需要通过合适的网络才能稳定访问。',
          items: [
            '确保可以顺畅访问 claude.ai',
            '建议使用稳定节点，避免频繁切换 IP',
            '账单地址、登录 IP、支付 IP 必须来自同一个国家，否则大概率触发风控被封'
          ],
          warning: 'IP 地址与账单地址不一致是封号的最常见原因，务必保持一致。'
        },
        {
          title: '准备三：选择适合你的支付方式',
          description: '官方推荐且最稳定的支付方式是 Visa、Mastercard、American Express 等外币信用卡。没有境外卡？三种替代方案供你选择。',
          items: [
            '代充平台（推荐）：支付宝/微信支付，确认平台有"封号包退款"承诺后再下单',
            '美区 Apple ID（iPhone 用户）：通过正规渠道购礼品卡充值，通过 Claude App 内 Apple ID 内购订阅',
            '虚拟信用卡（高风险）：Anthropic 对 VCC 拒付率极高、极易封号，新手请完全避开'
          ],
          warning: '选择代充平台时务必确认该平台是否承诺"封号包退款"条款，这是保护资金安全的关键。'
        },
        {
          title: '路线一：官网直充（有境外信用卡）',
          description: '如果你有国际信用卡，且网络能稳定访问 Claude 官网，这是最直接的购买方式。',
          items: [
            'claude.ai → Log in → Continue with Google → 用谷歌账号登录',
            '左下角头像 → Upgrade to Pro 或 Plans → 对比三档套餐 → Subscribe',
            '输入卡号、有效期、CVV 和账单地址',
            '关键：账单地址必须与 IP 所在国家一致，否则大概率被封',
            '验证通过后账号立即升级，在对话界面即可选择 Opus 4.7 模型'
          ]
        },
        {
          title: '路线二：苹果手机内购（iOS App）',
          description: '拥有美区 Apple ID 并有余额可用，且不介意支付少量溢价的 iPhone/iPad 用户。',
          items: [
            'App Store 搜索 Claude（开发者 Anthropic）→ 下载 → 谷歌账号登录',
            '左上角菜单 → Upgrade to Claude Pro → Apple ID 支付确认',
            '注意：App Store 订阅价格通常比官网贵约 30%（苹果渠道费）'
          ]
        },
        {
          title: '路线三：API 按量购买（仅限开发者）',
          description: '不是程序员或没打算把 AI 嵌入到自己做的软件里，可以跳过本节。普通用户用订阅套餐就全包含了。',
          items: [
            'API = 程序向 Claude Opus 4.7 提问的"后门"，适合把 AI 嵌入自己的软件中',
            '按 Token 计费：Opus 4.7 输入 $5/百万 Token、输出 $25/百万 Token',
            'console.anthropic.com → 登录 → API Keys → 创建新密钥 → 立刻复制保存'
          ],
          codeLanguage: 'python',
          code: `# 先安装 anthropic 库：pip install anthropic
import anthropic

client = anthropic.Anthropic(api_key="YOUR_API_KEY")

message = client.messages.create(
    model="claude-opus-4-7-20250416",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "请为我创作一个科幻小说的开头。"}
    ]
)
print(message.content)`,
          codeExplanation: '使用 Anthropic 官方 Python SDK 调用 Claude Opus 4.7 模型，让它创作一个科幻小说开头并打印结果。替换 YOUR_API_KEY 为真实密钥后即可运行。',
          warning: 'API Key 创建后仅显示一次，必须立刻复制保存。API 计费与 Claude 订阅是两套独立的计费系统。'
        },
        {
          title: '路线四：国内用户替代方案与总结',
          description: '没有境外卡或极度担心封号的国内用户，建议走第三方代充或中转平台。',
          items: [
            '最推荐方案：选择合规的第三方代充平台，支持支付宝/微信支付，确认有"封号包退款"承诺后再下单',
            '苹果内购路线：美区 Apple ID + 正规渠道礼品卡充值 → Claude App 内订阅（比官网贵约 30%）',
            '中转平台方案：寻找提供长周期售后与封号质保的 API 中转服务，按量付费，无需自己承担封号风险',
            '不推荐新手尝试虚拟信用卡方案，Anthropic 风控对 VCC 拒付率极高',
            'Pro（$20/月）适合大多数人，先买一个月试试，随时可取消续费'
          ],
          warning: 'Claude 封号是全球性问题，没有任何渠道能 100% 避免。保护资金的最佳方式是选择承诺封号退款的代充平台。'
        }
      ],
      tips: [
        'Claude Opus 4.7 输入 $5/百万 token、输出 $25/百万 token，成本可控',
        '官网直充用户务必确保 IP、账单地址所属国家一致，这是避免封号的关键',
        '第三方代充平台是当前国内用户风险最低的方式，前提是选择有"封号包退款"承诺的正规商家',
        '先买一个月 Pro（$20）试试，合适再升级 Max，切莫一上来就买年付'
      ],
      warnings: [
        'Claude 风控全球最严，2025年下半年即封禁 145 万个账号',
        '不要使用虚拟信用卡（VCC），被拒付率极高且极易导致封号',
        'API Key 绝对不要提交到公开仓库或前端代码',
        '账单地址与 IP 所在国不一致 = 极高概率被封'
      ],
      advantages: ['200K 超长上下文', '代码能力业界领先', '安全可靠', 'iOS App 体验优秀']
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
      title: 'Gemini 3 订阅与购买完全指南（零基础版）',
      subtitle: '专为无 AI 知识的新手编写，四条路线覆盖所有支付场景，含套餐对比与最终购买建议',
      steps: [
        {
          title: '了解 Gemini 订阅套餐',
          description: '在购买前，先看清每种套餐的价格和区别，避免买错。目前个人用户主要通过 Google One 订阅 AI 服务。',
          items: [
            'Free · 免费 — 能用 Gemini 3 Pro 但每日配额极低，基本是体验级',
            'AI Plus · $8/月 — 可用 Gemini 3 Pro，含 200GB 存储，可共享 5 位家庭成员，前 2 月半价',
            'AI Pro · $20/月 — 可用 Pro + Thinking，2TB 存储，每日 Deep Research 20 份，99% 用户最佳选择',
            'AI Ultra · $250/月 — 独家 Deep Think 模式，每日 1500 次 Thinking，30TB 存储，适合顶尖科研',
            '年付优惠：AI Pro 首年仅 $99.99（原价 $199.99，相当于每月 $8.33）'
          ]
        },
        {
          title: '准备一：注册 Google 账号',
          description: '没有 Google 账号就什么都买不了。先搞定这第一步。',
          items: [
            '浏览器打开 accounts.google.com/signup，按提示填写信息完成注册',
            '国内手机号可能收不到验证短信。两个解决办法：',
            '换网络节点：更换不同国家的网络环境后重试验证',
            '买成品号：在可靠平台购买已注册好的 Google 账号，注意甄别信誉'
          ]
        },
        {
          title: '准备二：合适的网络环境',
          description: 'Gemini 的网页端和应用端都需要通过合适的网络才能稳定访问。',
          items: [
            '确保可以顺畅访问 gemini.google.com',
            '建议使用稳定节点，避免频繁切换 IP',
            '不稳定的网络可能导致支付中途断开、账号被风控'
          ],
          warning: '确保网络环境稳定，避免频繁切换 IP。'
        },
        {
          title: '准备三：选择适合你的支付方式',
          description: 'Google 官方支持国际信用卡（Visa、Mastercard）和 PayPal。没有境外卡？三种替代方案供你选择。',
          items: [
            '代充平台（推荐）：支付宝/微信支付，无需海外信用卡，适合快速体验和轻度使用',
            'Google Play 内购（安卓）：将国内卡绑为美区 Google Play 付款方式，在 Gemini App 内购，部分用户可使用此方式完成支付',
            '虚拟信用卡（不推荐新手）：风控严格、失败率高，需开卡费和充值手续费'
          ],
          warning: '选择代充平台时请仔细甄别，优先选择有口碑、有售后的大平台。国内发行的双币卡也可能因账单地址问题被拒。'
        },
        {
          title: '路线一：Google One 官方直充（有境外卡/PayPal）',
          description: '如果你有国际信用卡或 PayPal，且网络能稳定访问 Google 服务，这是最直接的购买方式。',
          items: [
            'gemini.google.com → 登录 → 左下角或设置菜单 → 升级到 Gemini Advanced',
            '对比套餐后点击"订阅"，填写信用卡信息或登录 PayPal',
            '注意：账单地址需与网络 IP 所在国家一致，否则容易被拒',
            '确认总额无误后提交，验证通过后账号立即升级，邮箱收到确认邮件'
          ]
        },
        {
          title: '路线二：App 内购（安卓手机 / 网页端）',
          description: '拥有海外 Google Play 账号或支付方式的用户，可直接在手机 App 内完成订阅。',
          items: [
            'Google Play 下载 Gemini App → 登录 → 设置或侧边栏 → 找到升级入口',
            '选择套餐，通过 Google Play 余额或绑定支付方式完成付款',
            '技巧：将国内卡绑为美区 Google Play 付款方式，部分用户可成功订阅',
            '也可在 gemini.google.com 网页端通过弹窗提示直接升级，流程同路线一'
          ]
        },
        {
          title: '路线三：API 按量购买（仅限开发者）',
          description: '不是程序员或没打算把 AI 嵌入到自己做的软件里，可以跳过本节。',
          items: [
            'API = 程序向 Gemini 提问的"后门"，适合把 AI 嵌入自己的软件中',
            '按 Token 计费（1 Token ≈ 一个英文单词或一个汉字）：',
            'Gemini 3 Pro（短文本）：输入 $2/百万、输出 $12/百万',
            'Gemini 3 Pro（长文本 >200K）：输入 $4/百万、输出 $18/百万',
            'Gemini 3.1 Flash-Lite：输入 $0.25/百万、输出 $1.50/百万（性价比最高）',
            'Gemini 3 Deep Think：按次计费，需查看官方文档'
          ],
          codeLanguage: 'bash',
          code: `# 获取 API Key：访问 aistudio.google.com，创建密钥（格式：AIza...）
# 免费额度：每分钟 15 次，每天 1500 次，轻度开发和个人项目完全够用

# 省钱技巧：
# 1. 先用 Google AI Studio 免费额度开发和测试
# 2. 注册 Google Cloud 开通 Vertex AI，新用户可获 $300 体验金
# 3. 使用 Batch API 模式，成本可降低 50%`,
          codeExplanation: '获取 Gemini API Key 并利用免费额度开发的简要步骤。Google AI Studio 提供的免费额度和 Vertex AI 新用户 $300 赠金可大幅降低前期成本。',
          warning: 'API Key 创建后仅显示一次，必须立刻复制保存。API 计费与 Google One 订阅是两套独立的计费系统。'
        },
        {
          title: '路线四：国内用户替代方案与最终购买建议',
          description: '没有境外卡的国内用户首选第三方代充/聚合平台，支持微信和支付宝支付。最后附上各套餐决策指南。',
          items: [
            '国内用户首选：正规 AI 聚合平台，支持微信/支付宝，无需海外信用卡',
            '安卓备用方案：美区 Google Play + 国内卡（账单地址填美国），在 App 内尝试内购',
            '选 AI Plus（$8/月）：轻度至中度使用，性价比入门之选',
            '选 AI Pro（$20/月）：学生、上班族、研究者的最佳方案，全面体验 Gemini 3',
            '选 AI Ultra（$250/月）：尖端科研、关键决策，需要 Deep Think 超级推理',
            '家人共用：AI Plus 可共享给最多 5 位家庭成员，人均成本极低',
            'Google 允许随时降级或取消，下个账单周期生效，不会多扣钱',
            '支付遇风控：尝试换账单地址，或确保 IP、支付地址来自同一国家'
          ],
          warning: '代充平台良莠不齐，下单前建议先搜索评价。优先选择有客服、支持退款的平台。'
        }
      ],
      tips: [
        'AI Pro（$20/月）是 99% 用户的最佳选择，包含 Gemini 3 核心能力 + 2TB 存储',
        '新用户年付 AI Pro 首年低至 $99.99（原价 $199.99），相当于每月仅 $8.33',
        'API 开发者优先利用免费额度开发测试，再用 Batch API 模式降低成本',
        '家庭成员一起用买 AI Plus 最划算，人均成本极低'
      ],
      warnings: [
        '账号可能因 IP 频繁变动、支付异常等原因被风控，建议保持网络环境稳定',
        'API Key 绝对不要提交到公开仓库或前端代码',
        '代充平台需仔细甄别，优先选择有口碑的大平台'
      ],
      advantages: ['多模态能力最强', 'Deep Think 超级推理', '2TB 云存储', '5 人家庭共享', '新用户首年半价', 'API 免费额度充裕']
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

// ==================== 代理内容开关 ====================
export const SHOW_PROXY_CONTENT = false;
export const visibleAPIList: APIConfig[] = apiList;
export const visibleProxyServices: APIConfig[] = SHOW_PROXY_CONTENT ? proxyServices : [];

// ==================== 常见问题配置 ====================
export const faqCategories = [
  {
    title: '注册相关问题',
    items: [
      {
        question: 'OpenAI不支持国内手机号',
        answer: '解决方案：尝试使用其他邮箱（Gmail/Outlook）注册，或选择正规海外验证服务'
      },
      {
        question: '邮箱被限制注册',
        answer: '解决方案：尝试Gmail或Outlook邮箱'
      },
      {
        question: '账号被风控封禁',
        answer: '解决方案：使用合适的网络环境'
      }
    ]
  },
  {
    title: '支付相关问题',
    items: [
      {
        question: '国内银行卡无法绑定',
        answer: '解决方案：优先使用官方支持的支付方式，或通过正规第三方支付服务平台完成支付'
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
    desc: '命令行 AI 编程工具，支持安装后接入 DeepSeek 等模型用于本地开发',
    url: 'https://claude.com/product/claude-code',
    icon: '💻',
    badge: { text: '热门', type: 'warning' },
    sections: [
      {
        title: '安装 Node.js',
        content: 'Claude Code 是 JavaScript 编写的命令行工具，Windows 电脑需要先安装 Node.js 运行环境。',
        steps: [
          {
            title: '下载 Node.js 安装包',
            description: '访问 Node.js 官网，下载 Windows Installer (.msi) 安装程序。',
            image: '/images/tutorial/claude-code-pdf-node.png',
            items: [
              '官网地址：https://nodejs.org/zh-cn/download',
              '双击 .msi 文件，按默认流程一路 Next 到 Finish',
              '安装时勾选 Automatically install the necessary tools'
            ]
          }
        ],
        tips: [
          'Node.js 安装完成后会自带 npm，后续安装 Claude Code 会用到 npm',
          '安装完成后重新打开终端，避免旧终端读取不到环境变量'
        ]
      },
      {
        title: '安装 Git Bash',
        content: 'Claude Code 在 Windows 上依赖 Bash 环境，建议安装 Git for Windows，并使用附带的 Git Bash。',
        steps: [
          {
            title: '下载并安装 Git',
            description: '下载 Git for Windows x64 Setup，保持默认选项安装即可。',
            image: '/images/tutorial/claude-code-pdf-git.png',
            items: [
              '官网地址：https://git-scm.com/install/windows',
              '选择 Git for Windows/x64 Setup',
              '双击安装包，按默认选项完成安装'
            ]
          }
        ],
        tips: [
          'Git Bash 会提供类 Linux 的命令行环境',
          '后续运行 Claude Code 时，优先使用 Git Bash 或新打开的终端'
        ],
        warnings: [
          '只用 Windows 默认 CMD/PowerShell 可能会遇到兼容问题'
        ]
      },
      {
        title: '安装 Claude Code',
        content: '前置环境准备好后，在 Windows 终端中使用 npm 全局安装 Claude Code，并验证版本。',
        steps: [
          {
            title: '执行安装命令',
            description: '打开 Windows 的 cmd 或 Git Bash，运行 npm 全局安装命令。',
            image: '/images/tutorial/claude-code-pdf-install.png',
            code: 'npm install -g @anthropic-ai/claude-code'
          },
          {
            title: '验证安装结果',
            description: '分别检查 Git、Node.js 和 Claude Code 是否安装成功。',
            code: 'git -v\nnode -v\nclaude --version',
            items: [
              '能显示版本号就代表对应工具已安装成功',
              '如果提示命令不存在，重新打开终端或检查 PATH'
            ]
          },
          {
            title: '启动 Claude Code',
            description: '进入项目目录后执行 claude，打开 Claude Code 交互界面。',
            code: 'claude'
          }
        ],
        tips: [
          'Claude Code 可以直接修改代码文件、运行测试命令并根据报错继续修复',
          '国内用户后续可接入 DeepSeek 等模型，降低调用成本'
        ]
      },
      {
        title: '处理区域限制提示',
        content: '直接执行 claude 时，部分国内环境可能遇到区域校验或 onboarding 报错，可按 PDF 中的方法调整本地配置。',
        steps: [
          {
            title: '找到 Claude 配置文件',
            description: '配置文件通常位于用户目录下的 `.claude.json`。',
            image: '/images/tutorial/claude-code-pdf-onboarding.png',
            items: [
              '路径示例：`C:\\Users\\你的用户名\\.claude.json`',
              '如果文件不存在，先运行一次 claude 再检查'
            ]
          },
          {
            title: '添加 onboarding 配置',
            description: '在 JSON 配置中加入 onboarding 完成标记，然后重新启动 Claude Code。',
            code: '"hasCompletedOnboarding": true',
            items: [
              '修改 JSON 时注意逗号和括号格式',
              '保存后关闭旧终端，重新打开再执行 claude'
            ]
          }
        ],
        warnings: [
          '配置项写错会导致 Claude Code 无法读取配置，修改前建议备份原文件'
        ]
      },
      {
        title: '接入 DeepSeek 模型',
        content: '为了降低使用成本，可以把 Claude Code 接入 DeepSeek API。先在 DeepSeek 开放平台创建 API Key，再写入 Claude 配置。',
        steps: [
          {
            title: '获取 DeepSeek API Key',
            description: '访问 DeepSeek 开放平台，注册/登录并完成实名认证，在 API Keys 页面创建密钥。',
            image: '/images/tutorial/claude-code-pdf-deepseek-config.png',
            items: [
              '访问 DeepSeek 开放平台',
              '完成登录、实名认证和 API Key 创建',
              '复制 API Key，后续写入 Claude 配置'
            ]
          },
          {
            title: '新建 settings.json',
            description: '在用户目录下打开 `.claude` 文件夹，新建 `settings.json`，写入 DeepSeek 配置。',
            code: `{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "YOUR_DEEPSEEK_API_KEY",
    "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
    "ANTHROPIC_MODEL": "deepseek-v4-pro"
  }
}`,
            items: [
              '路径示例：`C:\\Users\\你的用户名\\.claude\\settings.json`',
              '把 YOUR_DEEPSEEK_API_KEY 替换成真实密钥',
              '保存后重新打开终端'
            ],
            warning: '不要把真实 API Key 上传到公开仓库或截图分享。'
          }
        ],
        tips: [
          'DeepSeek 模型适合日常开发测试，成本更容易控制',
          '如果模型名后续变化，以 DeepSeek 控制台和官方文档为准'
        ]
      },
      {
        title: '启动并测试响应',
        content: '完成配置后，重新打开终端执行 claude，用简单问题测试模型是否正常响应。',
        steps: [
          {
            title: '启动 Claude Code 服务',
            description: '重新打开一个新的终端，输入 claude。',
            image: '/images/tutorial/claude-code-pdf-test.png',
            code: 'claude'
          },
          {
            title: '测试模型回复',
            description: '在 Claude Code 页面里提问一个简单问题，例如比较 1.9 和 1.11 的大小。',
            items: [
              '模型能正常回答，说明 DeepSeek 接入成功',
              '如果无响应，先检查 settings.json 路径、JSON 格式和 API Key',
              '如果仍失败，再检查 DeepSeek 账户余额和模型名'
            ]
          }
        ],
        tips: [
          '第一次测试建议问简单问题，方便排除网络、密钥和模型配置问题',
          '确认响应稳定后，再进入真实项目目录执行开发任务'
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
