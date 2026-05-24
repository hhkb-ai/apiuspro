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
  important?: boolean;
  whereToClick?: string;
  expectedResult?: string;
  failureChecklist?: string[];
}

export interface Tutorial {
  title: string;
  subtitle?: string;
  steps: TutorialStep[];
  tips?: string[];
  warnings?: string[];
  advantages?: string[];
  estimatedTime?: string;
  prerequisites?: string[];
  successSign?: string;
  commonPitfall?: string;
  securityReminder?: string;
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
    id: 'mimo',
    name: '小米MiMo',
    desc: '小米 MiMo API 怎么买？2026 推理模型接入教程，含 mimo-v2.5-pro 等新模型信息',
    url: 'https://platform.xiaomimimo.com/',
    free: 'Orbit 计划与免费 Token 以官方控制台为准',
    proxy: false,
    features: ['推理能力强', 'mimo-v2.5-pro', '数学能力突出', '小米出品'],
    icon: '🟠',
    badge: { text: '新上线', type: 'warning' },
    tutorial: {
      title: '小米 MiMo API 购买与接入教程（2026最新）',
      subtitle: '从小米账号准备、领取免费额度、购买套餐到创建 API Key 的完整流程',
      steps: [
        {
          title: '准备小米账号和付款方式',
          description: '使用 MiMo 之前先确认小米账号、邮箱绑定和付款方式，避免后续领取额度或购买套餐时被卡住。',
          image: '/images/tutorial/mimo-docx-login.png',
          items: [
            '访问小米账号页面：https://id.mi.com/',
            '确认账号已经绑定邮箱，只用手机号注册的账号建议先补绑邮箱',
            '国内用户准备支付宝或微信支付，海外用户可准备 Apple Pay 或信用卡',
            '国内用户充值或购买前通常需要完成实名认证'
          ],
          whereToClick: '浏览器访问 id.mi.com → 登录或注册',
          expectedResult: '小米账号页面显示已绑定邮箱，账号状态正常',
          failureChecklist: ['手机号注册的账号是否已补绑邮箱', '国内用户是否已完成实名认证']
        },
        {
          title: '登录 MiMo 开放平台',
          description: '进入 MiMo 开放平台，用小米账号登录后即可激活开发者账号。',
          image: '/images/tutorial/mimo-docx-platform.png',
          items: [
            '访问 MiMo 开放平台：https://platform.xiaomimimo.com/',
            '使用小米账号完成登录',
            '登录后可查看文档、代币计划和控制台入口'
          ],
          whereToClick: '浏览器访问 platform.xiaomimimo.com → 使用小米账号登录',
          expectedResult: '登录后进入 MiMo 开放平台首页，可看到文档、代币计划和控制台入口',
          failureChecklist: ['确认小米账号密码正确', '如提示账号异常，先到 id.mi.com 检查账号状态']
        },
        {
          title: '先领取免费额度',
          description: '购买套餐前建议先申请 Orbit 计划免费 Token，通过后可在订阅计划页面看到赠送额度。',
          image: '/images/tutorial/mimo-docx-orbit.png',
          items: [
            '访问 Orbit 计划页面：https://100t.xiaomimimo.com',
            '按页面要求填写申请信息并提交',
            '等待审核，通过后回到平台的「订阅计划」页面查看 Token 额度',
            '免费 Token 有有效期，领取后建议尽快测试使用'
          ],
          whereToClick: '访问 100t.xiaomimimo.com → 填写申请信息 → 提交',
          expectedResult: '审核通过后，平台「订阅计划」页面出现赠送的 Token 额度',
          failureChecklist: ['审核可能需要时间，耐心等待', '免费 Token 有有效期，领取后尽快测试使用'],
          warning: '免费额度规则、审核时间和有效期可能变化，请以 MiMo 官方页面为准。'
        },
        {
          title: '购买或管理套餐',
          description: '免费额度用完后，可在「代币计划」或控制台里查看订阅计划、账单和充值入口。',
          image: '/images/tutorial/mimo-docx-console.png',
          items: [
            '在顶部导航进入「代币计划」或「控制台」',
            '查看 Lite、Standard、Pro、Max 等套餐的月费、Credit 和适用场景',
            '购买前确认 Credit 与 Token 的换算规则',
            '首次购买、夜间调用或连续包月优惠以官方页面展示为准'
          ],
          whereToClick: '顶部导航 → 「代币计划」或「控制台」',
          expectedResult: '页面显示 Lite、Standard、Pro、Max 等套餐的月费和 Credit 信息',
          failureChecklist: ['确认已登录正确的 MiMo 账号', '如看不到套餐信息，尝试刷新页面或更换浏览器']
        },
        {
          title: '创建并保存 API Key',
          description: '进入控制台的 API 密钥页面，创建用于工具接入和代码调用的密钥。',
          important: true,
          image: '/images/tutorial/mimo-docx-api-key.png',
          items: [
            '进入控制台左侧的「API 密钥」页面',
            '点击「新建 API Key」',
            '复制生成的 Key，并保存到密码管理器或本地安全位置',
            '忘记密钥内容时只能删除后重新创建'
          ],
          whereToClick: '控制台左侧 → 「API 密钥」→ 「新建 API Key」',
          expectedResult: '页面弹出一串以 sk- 开头的密钥字符串，可复制',
          failureChecklist: ['确认已完成实名认证', '检查浏览器是否拦截了弹窗', '密钥只显示一次，复制后立即保存'],
          warning: 'API Key 只会完整显示一次，务必立即保存。'
        },
        {
          title: '配置环境变量并首次调用',
          description: '使用 OpenAI 兼容接口调用 MiMo API，也可以在支持自定义 API 的 AI 工具中填入相同配置。',
          items: [
            '安装 openai 和 python-dotenv',
            '设置 MIMO_API_KEY 环境变量',
            '配置 Base URL：https://api.xiaomimimo.com/v1',
            '模型可先选择 mimo-v2-flash（更快），如控制台已开放再测试 mimo-v2.5-pro'
          ],
          whereToClick: '终端运行 pip install openai python-dotenv，创建 .env 文件写入 MIMO_API_KEY',
          expectedResult: 'Python 脚本成功打印模型的自我介绍回复，无报错',
          failureChecklist: ['确认 MIMO_API_KEY 环境变量已正确设置', '检查 base_url 是否为 https://api.xiaomimimo.com/v1', '确认网络可访问 MiMo API 地址', '如报错 401，说明 API Key 无效或已过期'],
          codeLanguage: 'python',
          code: `import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("MIMO_API_KEY"),
    base_url="https://api.xiaomimimo.com/v1",
)

response = client.chat.completions.create(
    model="mimo-v2-flash",
    messages=[{"role": "user", "content": "你好，请用一句话介绍你自己。"}],
)

print(response.choices[0].message.content)`,
          codeExplanation: '使用 OpenAI SDK 调用 MiMo API。成功执行即代表配置正确。'
        }
      ],
      tips: [
        '推荐用 .env 或环境变量保存 API Key',
        'MiMo 擅长推理和数学任务，适合相关场景使用',
        '如果要接入 Claude Code、Codex、Gemini CLI、OpenCode 等 AI 工具，建议使用 CC Switch 统一管理 API Key、Base URL 和模型切换',
        '具体模型名称、套餐价格和优惠活动请以官方文档为准'
      ],
      warnings: [
        '不要在前端、公开仓库或截图中暴露 API Key',
        '首次使用建议先了解免费额度和计费规则'
      ],
      advantages: ['推理能力强', '数学能力突出', '小米出品', '国内直连'],
      estimatedTime: '约 10 分钟',
      prerequisites: ['小米账号（建议绑定邮箱）', '支付宝或微信支付（海外可用 Apple Pay 或信用卡）'],
      successSign: '控制台「API 密钥」页面出现以 sk- 开头的密钥，Python 脚本成功打印模型回复',
      commonPitfall: '只用手机号注册的小米账号没有绑邮箱，导致登录或找回密码受限；国内用户未完成实名认证导致无法购买',
      securityReminder: 'API Key 只会完整显示一次，复制后立即保存到密码管理器或 .env 文件，不要提交到公开仓库或前端代码'
    }
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    desc: 'DeepSeek API 怎么买？2026 国内支付/充值教程，覆盖 V4 Flash、V4 Pro 与 1M 上下文',
    url: 'https://platform.deepseek.com/',
    free: '新用户/活动额度以控制台为准',
    proxy: false,
    features: ['高性价比', '代码能力强', '推理模型', '开源'],
    icon: '🔵',
    badge: { text: '热门', type: 'warning' },
    tutorial: {
      title: 'DeepSeek API 购买与首次调用教程（2026最新，支持国内支付）',
      subtitle: '从注册认证、创建 API Key、充值到账户调用的精简流程',
      steps: [
        {
          title: '注册 DeepSeek 账号',
          description: '先进入 DeepSeek 开放平台，用手机号或邮箱完成账号注册和登录。',
          image: '/images/tutorial/deepseek-docx-1.png',
          items: [
            '访问 DeepSeek 开放平台：https://platform.deepseek.com',
            '点击 Sign Up 或登录入口创建账号',
            '按页面提示完成手机号、邮箱或扫码登录'
          ],
          whereToClick: '浏览器访问 platform.deepseek.com → 点击 Sign Up 或登录入口',
          expectedResult: '成功登录 DeepSeek 开放平台，能看到控制台首页',
          failureChecklist: ['确认手机号或邮箱能正常接收验证码', '如扫码登录失败，尝试手机号方式']
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
          whereToClick: '账号设置或个人中心 → 实名认证',
          expectedResult: '认证状态显示为「已通过」',
          failureChecklist: ['身份证照片是否清晰、未过期', '人脸识别时光线是否充足', '企业认证是否上传了有效营业执照'],
          warning: '认证通过后再创建密钥和充值，流程会更顺。'
        },
        {
          title: '创建并保存 API Key',
          description: '在 API Keys 管理页生成 Bearer Token，生成后立刻复制保存。',
          important: true,
          image: '/images/tutorial/deepseek-docx-3.png',
          items: [
            '进入 API Keys 管理页面',
            '点击 Create API Key 或 Generate New Token',
            '为密钥命名，避免空格和特殊字符',
            '复制完整密钥并保存到安全位置'
          ],
          whereToClick: '控制台 → API Keys 管理页面 → Create API Key / Generate New Token',
          expectedResult: '页面显示一串密钥字符串，可复制',
          failureChecklist: ['确认实名认证已通过', '密钥命名避免空格和特殊字符', '复制后立即保存，关闭页面后无法再次查看'],
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
          ],
          whereToClick: '控制台 → 账单/余额/Usage 页面 → 选择充值档位 → 支付',
          expectedResult: '账户余额显示充值金额，可用额度大于 0',
          failureChecklist: ['确认支付宝/微信支付是否成功扣款', '余额未更新时等待几分钟后刷新', '确认充值到了正确的 DeepSeek 账号']
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
          whereToClick: '终端运行 pip install openai python-dotenv，创建 .env 写入 DEEPSEEK_API_KEY',
          expectedResult: 'Python 脚本成功打印模型的自我介绍回复，无报错',
          failureChecklist: ['确认 DEEPSEEK_API_KEY 环境变量已正确设置', '检查 base_url 是否为 https://api.deepseek.com', '如报错 401，说明 API Key 无效或已过期'],
          codeLanguage: 'python',
          code: `import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-v4-flash",
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
            'deepseek-chat：旧版兼容别名，后续可能逐步废弃，不建议新项目作为长期模型名',
            'deepseek-v4-flash：响应快、性价比高，适合实时对话和客服',
            'deepseek-v4-pro：推理能力更强，适合复杂代码、1M 长上下文、长文档和技术问答',
            '在控制台查看用量、余额和预算告警'
          ],
          whereToClick: '控制台 → 模型列表或文档页面',
          expectedResult: '页面显示 deepseek-v4-flash、deepseek-v4-pro，以及 deepseek-chat / deepseek-reasoner 兼容别名说明',
          failureChecklist: ['确认当前使用的模型名称拼写正确', '在控制台查看用量是否正常累计'],
          warning: '模型名称、免费试用和价格会随平台调整，正式使用前请以控制台和官方文档为准。'
        }
      ],
      tips: [
        '推荐用 .env 或环境变量保存 DEEPSEEK_API_KEY',
        'OpenAI SDK 兼容模式最适合迁移已有代码',
        '个人开发者可先从 deepseek-v4-flash 开始控制成本'
      ],
      warnings: [
        '不要在前端、公开仓库或截图中暴露 API Key',
        '所有调用都会按模型计价扣除余额，建议定期查看用量'
      ],
      advantages: ['性价比高', '国内直连', 'OpenAI 兼容接口', '代码与推理能力强'],
      estimatedTime: '约 10 分钟',
      prerequisites: ['手机号或邮箱（用于注册 DeepSeek 账号）', '支付宝或微信支付（用于充值）'],
      successSign: 'API Keys 页面显示有效密钥，Python 脚本成功打印模型回复，控制台余额已更新',
      commonPitfall: '未完成实名认证导致无法创建密钥或充值；API Key 只显示一次忘记复制',
      securityReminder: 'API Key 不要提交到 GitHub、前端代码或截图中，建议保存在 .env 或环境变量里'
    }
  },
  {
    id: 'aliyun',
    name: '阿里云通义千问',
    desc: '通义千问 API 怎么申请？覆盖 Qwen3.7-Max、Qwen3.6-Plus / Qwen3.6-Flash 与百炼模型广场',
    url: 'https://dashscope.aliyun.com/',
    free: '免费额度与试用模型以百炼控制台为准',
    proxy: false,
    features: ['Qwen3.7-Max', 'Qwen3.6', '多模型支持', '百炼生态'],
    icon: '🟢',
    badge: { text: '免费', type: 'success' },
    tutorial: {
      title: '通义千问 API 购买与接入教程（免费额度申请）',
    subtitle: '通过阿里云百炼或 DashScope 开通服务、获取密钥并调用最新 Qwen3.7-Max',
      steps: [
        {
          title: '准备阿里云账号',
          description: '使用通义千问 API 前，需要先完成阿里云账号注册与实名认证。',
          image: '/images/tutorial/qwen-docx-1.png',
          items: [
            '访问阿里云官网：https://aliyun.com，使用手机号或邮箱注册账号',
            '进入「账号管理」中的「账号认证」',
            '按个人或企业身份完成实名认证'
          ],
          whereToClick: '浏览器访问 aliyun.com → 注册或登录 → 账号管理 → 账号认证',
          expectedResult: '阿里云账号状态显示「已实名认证」',
          failureChecklist: ['手机号是否能正常接收验证码', '实名认证信息是否与身份证一致']
        },
        {
          title: '开通百炼或 DashScope 服务',
          description: '推荐从阿里云百炼平台进入，也可以使用 DashScope 灵积平台。',
          image: '/images/tutorial/qwen-docx-1.png',
          items: [
            '进入 https://bailian.console.aliyun.com 或 https://dashscope.console.aliyun.com',
            '搜索或找到「通义千问」服务并点击开通',
            '新用户免费额度、Token Plan 与可用模型以控制台当前展示为准'
          ],
          whereToClick: '访问 bailian.console.aliyun.com 或 dashscope.console.aliyun.com → 搜索「通义千问」→ 开通',
          expectedResult: '控制台显示已开通服务，可看到免费额度信息',
          failureChecklist: ['确认实名认证已完成', '如提示权限不足，检查账号类型是否支持开通']
        },
        {
          title: '创建并保存 API Key',
          description: '在 API-KEY 管理页面创建调用凭证，生成后立即保存。',
          important: true,
          image: '/images/tutorial/qwen-docx-2.png',
          items: [
            '进入「API-KEY 管理」页面',
            '点击「创建 API-KEY」',
            '复制以 sk- 开头的密钥，并保存到安全位置'
          ],
          whereToClick: '控制台 → 「API-KEY 管理」→ 「创建 API-KEY」',
          expectedResult: '页面显示以 sk- 开头的密钥字符串，可复制',
          failureChecklist: ['确认服务已开通', '复制后立即保存到安全位置', '关闭页面后通常无法再次查看完整密钥'],
          warning: 'API Key 通常只完整显示一次，不要写入前端代码或公开仓库。'
        },
        {
          title: '配置环境变量并首次调用 Qwen3.7-Max',
          description: '通义千问支持 OpenAI 兼容接口。2026 年 5 月百炼已列出 qwen3.7-max，适合先用真实任务验证最新旗舰模型。',
          image: '/images/tutorial/qwen-docx-2.png',
          items: [
            '安装 openai 与 python-dotenv',
            '设置 DASHSCOPE_API_KEY 环境变量',
            'base_url 使用 DashScope 兼容模式地址'
          ],
          whereToClick: '终端运行 pip install openai python-dotenv，创建 .env 写入 DASHSCOPE_API_KEY',
          expectedResult: 'Python 脚本成功打印模型回复，无报错',
          failureChecklist: ['确认 DASHSCOPE_API_KEY 环境变量已设置', '检查 base_url 是否为 DashScope 兼容模式地址', '如报错 401，检查 API Key 是否正确'],
          codeLanguage: 'python',
          code: `import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
)

response = client.chat.completions.create(
    model="qwen3.7-max",
    messages=[{"role": "user", "content": "请用一句话介绍通义千问"}],
)

print(response.choices[0].message.content)`,
          codeExplanation: '调用 qwen3.7-max 模型，让它用一句话介绍通义千问并打印回复。成功执行即代表 API Key、base_url 和模型权限配置正确。'
        },
        {
          title: '按场景选择模型',
          description: '通义千问覆盖 Agent 旗舰、通用、低成本和长上下文场景，按任务和预算选择即可。',
          image: '/images/tutorial/qwen-docx-2.png',
          items: [
            'Qwen3.7-Max：最新旗舰 Agent 模型，1M 上下文、64k 最大输出，适合复杂推理、代码工程、办公自动化和长周期工具调用',
            'Qwen3.6-Plus：能力与成本均衡，1M 上下文，适合多数生产对话、知识库、摘要和代码任务',
            'Qwen3.6-Flash：低成本高频调用，适合简单对话、翻译、分类和批量处理',
            'qwen-plus / qwen-plus-latest：适合新手先跑通兼容接口，再按效果切换到 Qwen3.7-Max 或 Qwen3.6 系列'
          ],
          whereToClick: '控制台 → 模型列表或文档页面',
          expectedResult: '页面显示 qwen3.7-max、qwen3.6-plus、qwen3.6-flash 等模型名称、上下文和价格',
          failureChecklist: ['确认模型名称拼写正确，例如 qwen3.7-max', '如果账号暂未开放旗舰模型，先用 qwen3.6-plus 或 qwen-plus 跑通接口'],
          warning: 'qwen3.7-max 国内百炼价格当前为 12 元/百万输入 Token、36 元/百万输出 Token；价格、免费额度和上下文长度会随平台更新，正式购买前以控制台为准。'
        },
        {
          title: '查看用量与控制成本',
          description: '开通后在控制台查看免费额度、到期时间和后付费账单。',
          image: '/images/tutorial/qwen-docx-1.png',
          items: [
            '在「模型用量」页面查看剩余额度',
            '免费额度用尽后按输入和输出 Token 计费',
            'qwen3.7-max 支持上下文缓存折扣，支持 Batch 时可按平台规则降低成本'
          ],
          whereToClick: '控制台 → 「模型用量」页面',
          expectedResult: '页面显示已使用的 Token 数量和剩余额度',
          failureChecklist: ['确认查看的是正确的账号和区域', '免费额度用尽后会按量计费']
        }
      ],
      tips: [
        '优先通过环境变量管理 DASHSCOPE_API_KEY',
        '新手可先用 qwen3.6-plus 或 qwen-plus 跑通接口，再切换 qwen3.7-max 验证复杂任务',
        'Agent、代码工程和办公自动化优先评估 qwen3.7-max；普通内容任务优先评估 qwen3.6-plus / qwen3.6-flash'
      ],
      warnings: [
        '实名认证完成前，部分服务可能无法开通',
        '不要把 API Key 写入公开代码、截图或客户端页面'
      ],
      advantages: ['免费额度大', '国内直连', 'OpenAI 兼容接口', 'Qwen3.7-Max'],
      estimatedTime: '约 10 分钟',
      prerequisites: ['阿里云账号（手机号或邮箱注册）', '支付宝或微信支付（用于购买资源包）'],
      successSign: 'API-KEY 管理页面出现以 sk- 开头的密钥，Python 脚本成功打印模型回复',
      commonPitfall: '未完成阿里云实名认证导致无法开通百炼/DashScope 服务；API Key 只显示一次忘记复制',
      securityReminder: 'API Key 通常只完整显示一次，不要写入前端代码或公开仓库，建议保存在环境变量中'
    }
  },
  {
    id: 'zhipu',
    name: '智谱AI',
    desc: '智谱 AI 注册与免费试用教程，覆盖 GLM-5、GLM-5.1 与 Agentic Coding 场景',
    url: 'https://open.bigmodel.cn/',
    free: '免费试用',
    proxy: false,
    features: ['GLM-5/5.1', '200K上下文', 'Agentic Coding', '开源生态'],
    icon: '🟢',
    badge: { text: '免费', type: 'success' },
    tutorial: {
      title: '智谱 AI API 注册与购买教程（含免费试用额度）',
      subtitle: '从注册登录、实名认证、创建密钥到购买资源包和接入指南',
      steps: [
        {
          title: '访问官网并进入登录注册',
          description: '先打开智谱 AI 开放平台，从右上角进入登录或注册流程。',
          image: '/images/tutorial/zhipu-pdf-home.png',
          items: [
            '访问智谱AI开放平台：https://open.bigmodel.cn',
            '点击右上角「登录 / 注册」',
            '确认进入 BigModel 控制台入口'
          ],
          whereToClick: '浏览器访问 open.bigmodel.cn → 右上角「登录/注册」',
          expectedResult: '进入 BigModel 控制台登录页面',
          failureChecklist: ['确认浏览器可正常访问 open.bigmodel.cn', '如页面加载异常，尝试清除缓存或更换浏览器']
        },
        {
          title: '完成账号注册与登录',
          description: '选择手机号或邮箱注册，完成验证码校验后登录平台。',
          image: '/images/tutorial/zhipu-pdf-register.png',
          items: [
            '选择「手机号注册」或「邮箱注册」',
            '填写验证码并完成注册',
            '使用注册手机号、邮箱和密码登录'
          ],
          whereToClick: '选择手机号或邮箱注册 → 填写验证码 → 完成注册',
          expectedResult: '成功登录平台，可看到控制台首页',
          failureChecklist: ['确认手机号或邮箱能接收验证码', '如验证码未收到，检查垃圾邮件或稍后重试']
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
          whereToClick: '控制台或账号设置 → 个人中心 → 实名认证',
          expectedResult: '认证状态显示「已通过」，通常几分钟内完成',
          failureChecklist: ['身份证照片是否清晰且未过期', '企业认证是否上传了有效营业执照', '如审核时间过长，联系智谱客服'],
          warning: '实名认证未完成时，API 额度开通、资源包购买等功能可能受限。'
        },
        {
          title: '创建并保存 API Key',
          description: '在控制台左侧找到 API 密钥管理或 Access Key，创建调用密钥。',
          important: true,
          image: '/images/tutorial/zhipu-pdf-api-key.png',
          items: [
            '进入「API 密钥管理」或「Access Key」',
            '点击「创建 API Key」并填写名称',
            '复制生成的 API Key / Secret Key',
            '立即保存到本地安全位置'
          ],
          whereToClick: '控制台 → 「API 密钥管理」或「Access Key」→ 「创建 API Key」',
          expectedResult: '页面显示生成的 API Key / Secret Key，可复制',
          failureChecklist: ['确认实名认证已通过', '复制后立即保存，关闭页面后可能无法再次查看'],
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
          ],
          whereToClick: '控制台 → 「财务」→ 选择资源包或充值',
          expectedResult: '账户余额或资源包额度已更新',
          failureChecklist: ['确认支付是否成功扣款', '如余额未更新，等待几分钟后刷新页面']
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
          ],
          whereToClick: '进入 Coding Plan 页面 → 打开「接入指南」',
          expectedResult: '页面显示官方 API 接入步骤、调用参数和密钥配置说明',
          failureChecklist: ['确认所选模型与购买的资源包匹配', '先小规模测试再正式接入']
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
      advantages: ['国内直连', '免费体验额度', 'GLM 系列模型', 'Coding Plan 接入指南'],
      estimatedTime: '约 10 分钟',
      prerequisites: ['手机号或邮箱（注册智谱AI账号）', '身份证信息（用于实名认证）', '支付宝或微信（购买资源包）'],
      successSign: 'API 密钥管理页面出现有效的 API Key，控制台显示可用额度',
      commonPitfall: '未完成实名认证导致无法开通额度或购买资源包；关闭密钥页面后无法再次查看完整密钥',
      securityReminder: 'API Key 关闭页面后通常无法再次完整查看，生成后立即保存到安全位置，不要写入公开仓库或前端代码'
    }
  },
  {
    id: 'kimi',
    name: '月之暗面 Kimi',
    desc: 'Kimi API 怎么用？长文本处理教程，覆盖 Kimi K2.5/K2.6 与 256K 上下文（K2.5/K2.6 模型名称和 256K 上下文信息待官方确认）',
    url: 'https://platform.moonshot.cn/',
    free: '免费额度与模型价格以控制台为准',
    proxy: false,
    features: ['256K上下文（待确认）', 'Kimi K2.6（待确认）', '文件解析', '联网搜索'],
    icon: '🟢',
    badge: { text: '免费', type: 'success' },
    tutorial: {
      title: 'Kimi API 购买与接入教程（长文本处理，怎么用详解）',
      subtitle: '从平台注册、创建密钥到完成首次调用的精简流程',
      steps: [
        {
          title: '准备账号与环境',
          description: '先准备好开放平台账号和本地调用环境，云端 API 不需要额外硬件。',
          image: '/images/tutorial/kimi-pdf-platform.png',
          items: [
            '进入 https://platform.moonshot.cn 或 https://platform.kimi.ai',
            '使用手机号或企业邮箱注册并登录',
            '本地调试建议准备 Python 3.10+ 或 Node.js 环境'
          ],
          whereToClick: '浏览器访问 platform.moonshot.cn 或 platform.kimi.ai → 注册或登录',
          expectedResult: '成功登录 Kimi 开放平台，可看到控制台和 API Keys 入口',
          failureChecklist: ['手机号是否能接收验证码', '如企业邮箱注册失败，尝试手机号方式']
        },
        {
          title: '创建并保存 API Key',
          description: '在用户中心进入 API Keys 页面，新建密钥后立即保存。',
          important: true,
          image: '/images/tutorial/kimi-pdf-api-key.png',
          items: [
            '点击「创建新密钥」或「Create New Key」',
            '填写应用名称，例如 my-first-api',
            '复制生成的 sk-xxx 密钥，并配置到环境变量'
          ],
          whereToClick: '用户中心 → API Keys 页面 → 「创建新密钥」',
          expectedResult: '页面显示 sk-xxx 格式的密钥，可复制',
          failureChecklist: ['密钥命名避免空格和特殊字符', '复制后立即配置到环境变量', '关闭页面后无法再次查看完整密钥'],
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
          whereToClick: '终端运行 curl 命令（见下方代码块）',
          expectedResult: '返回 JSON 格式的 AI 回复，HTTP 状态码 200',
          failureChecklist: ['确认 MOONSHOT_API_KEY 环境变量已设置', '检查 Authorization 请求头格式为 Bearer sk-xxx', '如超时，将超时时间设为 60 秒以上'],
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
            'kimi-k2.5 / kimi-k2.6：适合深度推理、Agent 和多模态任务（模型名称待官方确认）'
          ],
          whereToClick: '开放平台文档或控制台 → 模型列表',
          expectedResult: '页面显示 moonshot-v1-8k/32k/128k、kimi-k2.5/k2.6 等模型信息（K2.5/K2.6 模型名称待官方确认）',
          failureChecklist: ['确认模型名称拼写正确', '首次使用建议从 moonshot-v1-8k 开始测试'],
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
          whereToClick: '项目代码中设置 api_key 和 base_url，或在客户端填写 API Key 和 API 地址',
          expectedResult: '代码调用成功返回 AI 回复，或客户端显示连接成功',
          failureChecklist: ['base_url 是否为 https://api.moonshot.cn/v1', '客户端是否选择了正确的 OpenAI 兼容接口模式'],
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
          ],
          whereToClick: '检查终端报错信息或控制台返回的 HTTP 状态码',
          expectedResult: '定位到具体错误原因并修复',
          failureChecklist: ['401/403：API Key 无效或过期', '429：触发速率限制，降低并发并加入重试', '超时：检查网络连通性并增加超时时间', '响应异常：检查 model、messages 结构和 Content-Type']
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
      advantages: ['国内直连', 'OpenAI 兼容接口', '超长上下文', '客户端集成方便'],
      estimatedTime: '约 10 分钟',
      prerequisites: ['手机号或企业邮箱（注册 Kimi 开放平台账号）', 'Python 3.10+ 或 Node.js 环境（本地调试用）'],
      successSign: 'API Keys 页面显示有效密钥，curl 测试命令返回 JSON 格式的 AI 回复',
      commonPitfall: 'API Key 只显示一次忘记复制；请求超时未设置足够长的超时时间；HTTP 429 速率限制未做重试',
      securityReminder: 'API Key 通常只显示一次，不要写进前端代码、公开仓库或截图里，建议用环境变量管理'
    }
  },
  {
    id: 'tencent',
    name: '腾讯混元',
    desc: '腾讯混元 API 怎么开通？覆盖 TokenHub 迁移提示、Hunyuan TurboS/T1 与企业接入',
    url: 'https://cloud.tencent.com/product/hunyuan',
    free: '新用户优惠',
    proxy: false,
    features: ['TokenHub迁移', '多模态', '企业集成', '微信生态'],
    icon: '🟢',
    badge: { text: '免费', type: 'success' },
    tutorial: {
      title: '腾讯混元 API 购买与接入教程（企业级开通指南）',
      subtitle: '从腾讯云开通、创建密钥到完成首次调用的精简流程',
      steps: [
        {
          title: '注册账号并开通混元',
          description: '先注册腾讯云账号并完成认证，然后在混元大模型控制台开通服务。',
          image: '/images/tutorial/tencent-pdf-setup.png',
          items: [
            '访问腾讯云官网注册账号：https://cloud.tencent.com，国内用户按提示完成实名认证',
            '登录后进入「混元大模型控制台」',
            '阅读并同意服务条款，点击「立即开通」'
          ],
          whereToClick: '浏览器访问 cloud.tencent.com → 注册/登录 → 混元大模型控制台 → 立即开通',
          expectedResult: '控制台显示混元服务已开通，可看到模型列表和 API 入口',
          failureChecklist: ['确认已完成腾讯云实名认证', '如提示权限不足，检查账号是否为企业认证']
        },
        {
          title: '创建并保存密钥',
          description: '在 API 密钥页面创建访问凭证，保存 SecretId 和 SecretKey。',
          important: true,
          image: '/images/tutorial/tencent-pdf-api-key.png',
          items: [
            '进入 API 密钥页面，点击创建密钥',
            '填写参数和昵称后生成 SecretId / SecretKey',
            '立即复制保存，后续代码调用需要用到'
          ],
          whereToClick: '控制台 → API 密钥页面 → 创建密钥',
          expectedResult: '页面显示 SecretId 和 SecretKey，可复制',
          failureChecklist: ['填写参数和昵称后才能生成密钥', 'SecretKey 只显示一次，复制后立即保存'],
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
          whereToClick: '终端运行 pip install openai，创建 .env 写入 TENCENT_SECRET_KEY',
          expectedResult: 'Python 脚本成功打印腾讯混元的自我介绍回复，无报错',
          failureChecklist: ['确认 TENCENT_SECRET_KEY 环境变量已设置', '检查 base_url 是否为 https://api.hunyuan.cloud.tencent.com/v1', '如报错 401，检查密钥是否正确'],
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
          description: '混元提供轻量、通用、推理、多模态和翻译模型，按任务成本和能力选择即可。腾讯云已提示新能力会逐步迁移到 TokenHub，新项目要先确认入口。',
          image: '/images/tutorial/tencent-pdf-models.png',
          items: [
            'hunyuan-lite：轻量快速，适合基础对话和低成本场景',
            'hunyuan-turbos-latest：主力通用模型，适合内容创作和代码生成；新模型请同步查看 TokenHub',
            'hunyuan-t1-latest：适合复杂推理、逻辑分析和代码调试',
            'hunyuan-vision / Hunyuan-MT-7B：分别面向多模态和翻译任务'
          ],
          whereToClick: '控制台 → 模型列表或文档页面',
          expectedResult: '页面显示 hunyuan-lite、hunyuan-turbos-latest、hunyuan-t1-latest，或 TokenHub 推荐的新模型入口',
          failureChecklist: ['确认模型名称拼写正确', '首次测试建议用 hunyuan-turbos-latest'],
          warning: '免费额度、后付费规则、模型价格和 TokenHub 迁移策略可能调整，正式使用前以腾讯云控制台为准。'
        },
        {
          title: '开启流式输出与进阶调用',
          description: '需要实时回复或复杂项目时，可开启 stream，并按需接入 LangChain。',
          image: '/images/tutorial/tencent-pdf-advanced.png',
          items: [
            '聊天类应用建议开启 stream，提升实时交互体验',
            '复杂项目可使用 LangChain 的 ChatHunyuan',
            'PHP、Java 等语言也可通过腾讯云官方 SDK 调用'
          ],
          whereToClick: '代码中设置 stream=True，或引入 LangChain 的 ChatHunyuan',
          expectedResult: '实时逐字输出 AI 回复，或 LangChain 集成调用成功',
          failureChecklist: ['确认 SDK 版本支持流式输出', 'LangChain 集成需额外安装依赖']
        },
        {
          title: '集成到应用框架',
          description: '除了直接写代码，也可以把混元接入 Dify、LobeChat、HAI 等应用框架。',
          image: '/images/tutorial/tencent-pdf-integration.png',
          items: [
            'LobeChat：选择模型提供商为腾讯混元，填写 API Key 后检查连接',
            'Dify / HAI：在模型供应商中选择 Tencent Hunyuan 并配置密钥',
            'LangChain Embedding：设置密钥后使用社区集成生成向量'
          ],
          whereToClick: 'LobeChat/Dify/HAI 的模型供应商设置中选择腾讯混元并填写 API Key',
          expectedResult: '应用框架显示连接成功，可正常调用混元模型',
          failureChecklist: ['确认 API Key 格式正确', '检查网络是否可访问腾讯云 API 地址']
        }
      ],
      tips: [
        '优先把密钥放到环境变量或 .env 文件中，避免硬编码泄露',
        '内容生成可适当提高 temperature，代码生成建议使用较低 temperature',
        '模型默认不启用联网搜索，如需搜索能力需按接口文档开启对应参数',
        '新项目优先确认 TokenHub 是否已经成为推荐入口，避免接入即将停止新增能力的旧入口'
      ],
      warnings: [
        '混元 API 通常为后付费模式，建议在费用中心开启预算或费用预警',
        '批量调用前先小规模测试模型效果、延迟和成本'
      ],
      advantages: ['国内直连', '腾讯云生态', 'OpenAI 兼容接口', '多模型选择', '适合企业集成'],
      estimatedTime: '约 10 分钟',
      prerequisites: ['腾讯云账号（手机号注册，需实名认证）', '支付宝或微信支付（用于后付费或购买资源包）'],
      successSign: 'API 密钥页面显示有效的 SecretId/SecretKey，Python 脚本成功打印模型回复',
      commonPitfall: '未完成实名认证导致无法开通混元服务；SecretKey 只显示一次忘记复制保存',
      securityReminder: 'SecretKey 只应保存在本地环境变量或服务端配置中，不要提交到公开仓库或前端代码'
    }
  },
  {
    id: 'doubao',
    name: '字节豆包',
    desc: '火山方舟豆包 API 注册与接入教程，覆盖 Doubao-Seed-1.6、Seed-Code 与 Responses API',
    url: 'https://www.volcengine.com/product/doubao',
    free: '免费额度',
    proxy: false,
    features: ['Doubao-Seed-1.6', 'Seed-Code', 'Responses API', '高性价比'],
    icon: '🟢',
    badge: { text: '免费', type: 'success' },
    tutorial: {
      title: '火山引擎豆包 API 注册与购买教程（字节跳动大模型）',
      subtitle: '通过火山引擎方舟开通豆包模型服务、创建 API Key 并完成首次调用',
      steps: [
        {
          title: '注册火山引擎账号',
          description: '先准备火山引擎账号，后续开通模型、创建密钥和查看账单都会在控制台完成。',
          items: [
            '访问火山引擎官网：https://volcengine.com 或豆包大模型官网入口',
            '使用手机号、邮箱或企业账号注册并登录',
            '按页面提示完成实名认证，企业使用建议走企业认证'
          ],
          whereToClick: '浏览器访问 volcengine.com → 注册或登录 → 按提示完成实名认证',
          expectedResult: '成功登录火山引擎控制台，账号状态正常',
          failureChecklist: ['手机号是否能接收验证码', '企业使用建议走企业认证流程']
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
          whereToClick: '控制台搜索「火山方舟」或「豆包大模型」→ 进入模型服务页面 → 阅读并同意协议',
          expectedResult: '模型服务页面显示已开通，可看到可用模型列表',
          failureChecklist: ['确认已完成实名认证', '如要求创建推理接入点，先创建一个测试用 Endpoint'],
          warning: '模型名称、区域和接入点 ID 可能会随控制台更新，请以当前控制台展示为准。'
        },
        {
          title: '创建并保存 API Key',
          description: '在 API Key 管理页面创建调用密钥，生成后立即复制保存到安全位置。',
          important: true,
          items: [
            '进入「API Key 管理」或「密钥管理」页面',
            '点击创建密钥，为密钥添加便于识别的名称',
            '复制生成的 API Key，并保存到密码管理器或服务器环境变量',
            '为正式业务单独创建密钥，方便后续轮换和权限隔离'
          ],
          whereToClick: '控制台 → 「API Key 管理」或「密钥管理」→ 创建密钥',
          expectedResult: '页面显示生成的 API Key，可复制',
          failureChecklist: ['为密钥添加便于识别的名称', '复制后立即保存到密码管理器或环境变量', '为正式业务单独创建密钥'],
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
          whereToClick: '终端运行 pip install openai，创建 .env 写入 ARK_API_KEY',
          expectedResult: 'Python 脚本成功打印模型回复，无报错',
          failureChecklist: ['确认 ARK_API_KEY 环境变量已设置', 'base_url 参考控制台接入说明', 'model 填写控制台里的实际模型名或推理接入点 ID', '不同区域接入地址可能不同'],
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
            '轻量对话：优先选择 Doubao-Seed-1.6 系列中速度快、成本低的模型',
            '复杂推理或代码任务：优先测试 Doubao-Seed-Code 或更高能力的旗舰模型',
            'Agent 工作流：优先查看 Responses API、Agent Plan 和工具调用能力',
            '图像、语音、Embedding 等任务：选择对应专项模型',
            '购买前查看计费项、免费额度、资源包有效期和后付费开关'
          ],
          whereToClick: '控制台 → 模型列表或计费页面',
          expectedResult: '页面显示文本、视觉、语音、Embedding、代码等模型及价格信息',
          failureChecklist: ['确认所选模型支持当前任务类型', '购买前查看免费额度和资源包有效期']
        },
        {
          title: '查看用量并控制成本',
          description: '正式接入前建议设置预算、告警和密钥管理流程，避免测试阶段意外产生高额调用。',
          items: [
            '在费用中心或方舟控制台查看调用量、Token 消耗和余额',
            '为测试环境和生产环境使用不同 API Key',
            '开启余额提醒或预算告警',
            '批量任务先小规模压测，再放大并发和上下文长度'
          ],
          whereToClick: '费用中心或方舟控制台 → 调用量/Token 消耗/余额',
          expectedResult: '页面显示调用量统计、Token 消耗和账户余额',
          failureChecklist: ['测试环境和生产环境使用不同 API Key', '开启余额提醒或预算告警']
        }
      ],
      tips: [
        '个人开发者建议先用免费额度或小额充值完成端到端测试',
        '已有 OpenAI SDK 项目可优先用兼容模式迁移，改动最少',
        '模型名、Endpoint ID、地域和接入地址尽量从控制台复制，避免手填出错',
        '代码任务优先单独测试 Seed-Code，普通聊天和内容任务优先测试 Doubao-Seed-1.6'
      ],
      warnings: [
        '价格、免费额度和模型列表会随平台更新，购买前以火山引擎控制台为准',
        'API Key 泄露后应立即禁用旧密钥并重新创建'
      ],
      advantages: ['国内直连', '字节生态', '模型选择丰富', '性价比高', 'OpenAI 兼容接入'],
      estimatedTime: '约 10 分钟',
      prerequisites: ['火山引擎账号（手机号或邮箱注册，需实名认证）', '支付宝或微信支付（用于购买资源包或充值）'],
      successSign: 'API Key 管理页面显示有效密钥，Python 脚本成功打印模型回复',
      commonPitfall: '模型名称或推理接入点 ID 填写错误导致调用失败；不同区域的接入地址不同，复制控制台参数最稳',
      securityReminder: 'API Key 不要写进前端代码、公开仓库、截图或客户端安装包，泄露后应立即禁用并重新创建'
    }
  },
  // ---------- 需要代理 ----------
  {
    id: 'openai',
    name: 'OpenAI GPT',
    desc: 'OpenAI API 怎么购买和首次调用？覆盖 Billing、API Key、官方 GPT-5.5 / GPT-5.5 pro 与常见报错排查',
    url: 'https://platform.openai.com/',
    proxy: true,
    features: ['GPT-5.5', 'GPT-5.5 pro', '1M上下文', '工具调用强'],
    icon: '🟠',
    badge: { text: '需代理', type: 'warning' },
    tutorial: {
      title: 'OpenAI API 购买与首次调用教程（2026最新，适合开发者）',
      subtitle: '从 OpenAI Platform 账号、Billing 付款、API Key 创建到使用官方模型 ID gpt-5.5 完成首次调用',
      steps: [
        {
          title: '准备 OpenAI Platform 账号',
          description: 'OpenAI API 和 ChatGPT 订阅是两套计费体系。先确认你能登录 Platform，而不是只登录 ChatGPT 网页。',
          items: [
            '访问 OpenAI Platform：https://platform.openai.com',
            '使用邮箱、Google 或 Microsoft 账号登录',
            '确认当前 Project 正确，团队账号要确认自己有创建 API Key 和查看 Billing 的权限',
            '国内网络环境通常需要稳定代理，避免注册、支付或请求中途超时'
          ],
          whereToClick: '浏览器访问 platform.openai.com → 登录 → 进入 Dashboard 或 Project 页面',
          expectedResult: '能正常进入 OpenAI Platform 控制台，并看到当前 Project',
          failureChecklist: ['如果页面打不开，先检查代理和 DNS', '如果登录反复验证，保持同一网络节点，不要频繁切换 IP', '如果看不到 Project，确认账号是否加入了正确组织'],
          warning: 'ChatGPT Plus/Pro 订阅额度不能直接抵扣 API 费用，API 需要单独开通 Billing。'
        },
        {
          title: '开通 Billing 并确认 API 额度',
          description: '没有 Billing 或余额不足时，即使 API Key 正确，也会出现 insufficient quota。先把计费状态确认清楚。',
          important: true,
          items: [
            '进入 Billing 或 Usage 页面查看当前计费状态',
            '添加可用的付款方式，通常需要支持国际支付的银行卡',
            '团队或企业账号要确认当前 Project 可以使用该付款方式',
            '正式接入前先设置用量上限或预算提醒，避免测试脚本误跑高成本任务'
          ],
          whereToClick: 'Platform → Billing / Usage → Add payment method 或设置预算提醒',
          expectedResult: 'Billing 状态正常，Usage 页面能显示可用额度或付款方式',
          failureChecklist: ['支付失败时检查卡片是否支持国际支付', '账单地址和支付信息要保持一致', '如果提示额度不足，先处理 Billing 再排查代码'],
          warning: '不要把 ChatGPT 订阅成功误认为 API 已有额度，两者独立计费。'
        },
        {
          title: '创建并安全保存 API Key',
          description: 'API Key 只会完整显示一次，创建后立刻复制到安全位置。',
          important: true,
          items: [
            '进入 API Keys 页面',
            '点击 Create new secret key，为密钥按项目或用途命名',
            '复制完整 Key，保存到密码管理器、.env 或系统环境变量',
            '为不同项目创建不同 Key，方便后续单独撤销和追踪用量'
          ],
          whereToClick: 'Platform → API Keys → Create new secret key → 命名 → Create',
          expectedResult: '页面显示一串以 sk- 开头的密钥，并且你已安全保存',
          failureChecklist: ['如果按钮不可用，检查当前 Project 权限', '如果 Key 忘记复制，删除后重新创建', '如果 Key 泄露，立即撤销并重新生成'],
          warning: '不要把 API Key 写进前端代码、截图、公开仓库或聊天记录。'
        },
        {
          title: '写入环境变量并安装 SDK',
          description: '本地开发建议用 .env 或系统环境变量保存 Key，代码只读取变量，不硬编码密钥。',
          items: [
            '安装 openai 和 python-dotenv',
            '创建 .env 文件并写入 OPENAI_API_KEY',
            '确认 .env 已加入 .gitignore',
            '不要在浏览器前端直接调用 OpenAI API，避免 Key 暴露'
          ],
          whereToClick: '终端运行 pip install openai python-dotenv，项目根目录创建 .env 文件',
          expectedResult: '本地程序能读取 OPENAI_API_KEY 环境变量',
          failureChecklist: ['变量名必须是 OPENAI_API_KEY', '修改 .env 后重启终端或开发服务', '确认 .env 没有被提交到 Git'],
          codeLanguage: 'env',
          code: `OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx`,
          codeExplanation: '把真实 Key 写入 .env，代码中通过环境变量读取，不要直接写在源码里。'
        },
        {
          title: '用 Python 调用官方 GPT-5.5',
          description: '第一次测试只做最小请求，使用官方模型 ID gpt-5.5；如果你看到 GPT-5.5D / gpt-5.5d，应先要求来源，因为 OpenAI 官方文档当前未列出这个模型 ID。',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
          items: [
            '从 .env 读取 OPENAI_API_KEY',
            '使用 OpenAI 官方 SDK 创建 client',
            '先用短 prompt 测试，不要一开始上传大文件或跑高并发',
            '能打印模型回复就说明基础接入成功'
          ],
          whereToClick: '终端运行 python test_openai.py',
          expectedResult: 'Python 脚本成功打印模型回复，无 401、403、404、429 或 quota 报错',
          failureChecklist: ['401 多数是 Key 无效或环境变量没生效', '403 检查 Project、组织和模型权限', '404 检查模型名称是否正确', '429 降低并发或等待限流恢复', 'insufficient quota 回到 Billing 检查额度'],
          codeLanguage: 'python',
          code: `from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI()

response = client.responses.create(
    model="gpt-5.5",
    input="请用一句话说明 OpenAI API 已经接入成功。"
)

print(response.output_text)`,
          codeExplanation: '使用 OpenAI SDK 的 Responses API 发起一次最小调用。OpenAI 官方文档确认的模型 ID 是 gpt-5.5，当前快照为 gpt-5.5-2026-04-23。能打印 output_text 即代表 API Key、Billing、网络和模型权限基本正常。'
        },
        {
          title: '按任务选择模型并控制成本',
          description: '跑通后再根据任务切换模型，不要所有任务都默认使用最贵模型。',
          items: [
            'GPT-5.5：官方最新旗舰模型，适合复杂专业工作、编码、长上下文检索、工具型 Agent 和生产级助手',
            'GPT-5.5 pro：更高计算量版本，适合更难的 Responses API 异步任务；请求可能需要数分钟，建议配合 background mode',
            '标准价格：gpt-5.5 在 <272K 上下文下为 $5 输入 / $30 输出每百万 token（约 ¥36/¥218）；gpt-5.5-pro 为 $30 / $180 每百万 token（约 ¥218/¥1,305）',
            'Batch/Flex：gpt-5.5 在 <272K 上下文下为 $2.5 输入 / $15 输出每百万 token（约 ¥18/¥109），适合离线批量任务',
            '长上下文成本：GPT-5.5 超过 272K 输入 token 的请求会按官方规则加价，正式上线前必须重新核对 Pricing 页面',
            '较轻量模型：适合摘要、分类、客服、批量结构化等成本敏感任务',
            '长上下文任务先压缩材料，再提交必要内容，避免无效 token 成本',
            '高并发任务使用 Batch 或队列，避免触发 429'
          ],
          whereToClick: 'Platform → Docs / Models / Usage 页面查看模型、价格和用量',
          expectedResult: '根据任务选择了模型，并能在 Usage 中看到调用记录',
          failureChecklist: ['模型名要以官方文档和控制台为准', '如果模型不可用，检查 Project 权限', '如果成本异常，先降低上下文长度和输出长度'],
          warning: '模型价格、上下文和权限会随平台变化，正式上线前以控制台和官方文档为准；当前官方文档未确认 GPT-5.5D / gpt-5.5d。'
        }
      ],
      tips: [
        '先用免费或小额度真实任务测试，再决定是否长期使用 OpenAI API',
        'ChatGPT 订阅和 API Billing 独立计费，排查 quota 时优先看 Platform Billing',
        'GPT-5.5 官方模型 ID 是 gpt-5.5，Pro 版本是 gpt-5.5-pro；不要把未证实的 GPT-5.5D 写入生产文案',
        '参考 OpenAI 官方 Latest model、Models 和 Pricing 页面核对模型快照、工具支持、上下文和价格',
        '把 API Key 放在 .env、环境变量或密钥管理器里，不要硬编码',
        '如果要接入 Claude Code、Codex、Gemini CLI、OpenCode 等工具，建议用 CC Switch 统一管理 Key、Base URL 和模型名'
      ],
      warnings: [
        '国内访问通常需要稳定代理，网络不稳定会导致 timeout、支付失败或账号风控',
        'API Key 泄露后要立即撤销并重新生成',
        '不要把 ChatGPT Plus/Pro 订阅当成 API 额度使用'
      ],
      advantages: ['顶级模型能力', 'Agent 与工具调用强', '长上下文', '生态成熟'],
      estimatedTime: '约 15 分钟',
      prerequisites: ['可登录的 OpenAI 账号或邮箱', '稳定网络环境（通常需要代理）', '可用于 Billing 的国际支付方式', 'Python 3.10+ 或其他本地开发环境'],
      successSign: 'API Keys 页面显示有效密钥，Billing 状态正常，Python 脚本成功打印模型回复',
      commonPitfall: '把 ChatGPT 订阅误认为 API 额度；Key 创建后忘记复制；环境变量未生效导致 401；模型名写错导致 404',
      securityReminder: 'API Key 不要提交到 GitHub、前端代码或截图中，建议保存在 .env、系统环境变量或密钥管理器里'
    }
  },
  {
    id: 'claude',
    name: 'Anthropic Claude',
    desc: 'Claude 国内怎么订阅？覆盖 Opus 4.7、Sonnet 4.6、Haiku 4.5 与 1M 上下文',
    url: 'https://www.anthropic.com/',
    proxy: true,
    features: ['Opus 4.7', 'Sonnet 4.6', '1M上下文', '安全可靠'],
    icon: '🟠',
    badge: { text: '需代理', type: 'warning' },
    tutorial: {
      title: 'Claude 国内怎么订阅？封号避坑与购买完全指南（零基础版）',
      subtitle: '专为新手编写，含封号风险预警与避坑指南，四条路线覆盖所有支付场景，附 API 开发者接入教程',
      steps: [
        {
          title: '先读风险提示：Claude 风控极严，封号率极高',
          description: 'Claude 的审核与风控极度严格。在开始购买前，务必了解以下事实。',
          important: true,
          items: [
            '145 万个账号被封（仅 2025 年 7–12 月），风控审查 IP 和支付信息一致性',
            '新用户操作稍有不慎，刚付完款账号就可能被立刻封禁',
            '不存在"完全稳定、绝对不封号"的个人订阅渠道',
            '最稳妥方式：找靠谱第三方中转平台，选提供长周期售后与封号质保的商家'
          ],
          whereToClick: '仔细阅读本步骤的所有风险提示，不要跳过',
          expectedResult: '充分了解 Claude 的封号风险，做好心理准备后再继续',
          failureChecklist: ['是否理解不存在"绝对不封号"的个人订阅渠道', '是否准备好选择承诺封号退款的代充平台'],
          warning: 'Anthropic 风控全球最严，请务必认真对待以上风险提示。不要心存侥幸。'
        },
        {
          title: '了解 Claude 三档订阅套餐',
          description: 'Claude 提供三档个人订阅，先了解区别再决定。',
          items: [
            'Claude Pro · $20/月（约¥145） — 可用 Opus 4.7，有月度用量上限，适合轻度使用',
            'Claude Max 5x · $100/月（约¥725） — 可用 Opus 4.7，使用额度约为 Pro 的 5 倍，适合重度依赖 AI 的专业人士',
            'Claude Max 20x · $200/月（约¥1,450） — 可用 Opus 4.7，使用额度约为 Pro 的 20 倍，适合团队或核心生产力'
          ],
          whereToClick: '浏览器访问 claude.ai → 登录 → 左下角头像 → Plans',
          expectedResult: '页面显示 Pro($20/¥145)、Max 5x($100/¥725)、Max 20x($200/¥1,450) 三档套餐',
          failureChecklist: ['确认已登录 Claude 账号', '如看不到套餐页面，检查网络环境']
        },
        {
          title: '准备一：注册 Google 账号',
          description: 'Claude 使用 Google 账号一键登录，所以需要一个谷歌账号。',
          items: [
            '浏览器打开 https://accounts.google.com/signup，按提示填写信息完成注册',
            '国内手机号可能收不到验证短信，可在可靠平台购买已注册好的 Google 账号'
          ],
          whereToClick: '浏览器访问 accounts.google.com/signup → 按提示填写信息注册',
          expectedResult: 'Google 账号注册成功，可正常登录',
          failureChecklist: ['国内手机号可能收不到验证码', '可在可靠平台购买已注册好的 Google 账号']
        },
        {
          title: '准备二：合适的网络环境',
          description: 'Claude 官网需要通过合适的网络才能稳定访问。',
          items: [
            '确保可以顺畅访问 Claude 官网：https://claude.ai',
            '建议使用稳定节点，避免频繁切换 IP',
            '账单地址、登录 IP、支付 IP 必须来自同一个国家，否则大概率触发风控被封'
          ],
          whereToClick: '确保网络可顺畅访问 claude.ai',
          expectedResult: 'claude.ai 可正常打开，无连接超时',
          failureChecklist: ['账单地址、登录 IP、支付 IP 必须来自同一个国家', '频繁切换 IP 会触发风控被封'],
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
          whereToClick: '根据自身情况选择：代充平台（推荐）、美区 Apple ID 或国际信用卡',
          expectedResult: '确认选定的支付方式可用，支付渠道已准备就绪',
          failureChecklist: ['代充平台是否承诺"封号包退款"', '不推荐新手使用虚拟信用卡，Anthropic 对 VCC 拒付率极高'],
          warning: '选择代充平台时务必确认该平台是否承诺"封号包退款"条款，这是保护资金安全的关键。'
        },
        {
          title: '路线一：官网直充（有境外信用卡）',
          description: '如果你有国际信用卡，且网络能稳定访问 Claude 官网，这是最直接的购买方式。',
          important: true,
          items: [
            'https://claude.ai → Log in → Continue with Google → 用谷歌账号登录',
            '左下角头像 → Upgrade to Pro 或 Plans → 对比三档套餐 → Subscribe',
            '输入卡号、有效期、CVV 和账单地址',
            '关键：账单地址必须与 IP 所在国家一致，否则大概率被封',
            '验证通过后账号立即升级，在对话界面即可选择 Opus 4.7 模型'
          ],
          whereToClick: 'claude.ai → Log in → Continue with Google → 左下角头像 → Plans → Subscribe',
          expectedResult: '验证通过后账号立即升级，对话界面可选 Opus 4.7 模型',
          failureChecklist: ['账单地址必须与 IP 所在国家一致（最关键）', '确认卡号、有效期和 CVV 填写正确', '如支付被拒，不要重试，换方案']
        },
        {
          title: '路线二：苹果手机内购（iOS App）',
          description: '拥有美区 Apple ID 并有余额可用，且不介意支付少量溢价的 iPhone/iPad 用户。',
          items: [
            'App Store 搜索 Claude（开发者 Anthropic）→ 下载 → 谷歌账号登录',
            '左上角菜单 → Upgrade to Claude Pro → Apple ID 支付确认',
            '注意：App Store 订阅价格通常比官网贵约 30%（苹果渠道费）'
          ],
          whereToClick: 'App Store 搜索 Claude → 下载 → 谷歌账号登录 → 左上角菜单 → Upgrade to Claude Pro',
          expectedResult: 'App 内显示已升级为 Pro，可选择 Opus 4.7 模型',
          failureChecklist: ['确认 Apple ID 为美区且有足够余额', 'App Store 订阅价格通常比官网贵约 30%']
        },
        {
          title: '路线三：API 按量购买（仅限开发者）',
          description: '不是程序员或没打算把 AI 嵌入到自己做的软件里，可以跳过本节。普通用户用订阅套餐就全包含了。',
          items: [
            'API = 程序向 Claude Opus 4.7 提问的"后门"，适合把 AI 嵌入自己的软件中',
            '按 Token 计费：Opus 4.7 输入 $5/百万 Token、输出 $25/百万 Token（约 ¥36/¥181）',
            'https://console.anthropic.com → 登录 → API Keys → 创建新密钥 → 立刻复制保存'
          ],
          whereToClick: 'console.anthropic.com → 登录 → API Keys → 创建新密钥',
          expectedResult: 'API Key 创建成功（格式 sk-ant-xxx），可复制用于代码调用',
          failureChecklist: ['API Key 只显示一次，创建后立即复制保存', 'API 计费与 Claude 订阅是独立的两套系统'],
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
            'Pro（$20/月，约¥145）适合大多数人，先买一个月试试，随时可取消续费'
          ],
          whereToClick: '选择合规的第三方代充平台或中转平台，确认有"封号包退款"承诺',
          expectedResult: '支付完成，Claude 账号已升级，可使用 Opus 4.7',
          failureChecklist: ['代充平台是否承诺封号退款', '下单前是否搜索了平台评价', 'Pro($20/月，约¥145) 适合大多数人，先买一个月试试'],
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
      advantages: ['200K 超长上下文', '代码能力业界领先', '安全可靠', 'iOS App 体验优秀'],
      estimatedTime: '约 15 分钟',
      prerequisites: ['Google 账号（Claude 使用 Google 一键登录）', '合适的网络环境（需能访问 claude.ai）', 'Visa/Mastercard 国际信用卡或代充平台'],
      successSign: 'Claude 对话界面可选择 Opus 4.7 模型，或 API Key 创建成功并能完成代码调用',
      commonPitfall: 'IP 地址与账单地址国家不一致导致封号（最常见原因）；使用虚拟信用卡被拒付率极高；新用户操作稍有不慎刚付款就被封',
      securityReminder: 'API Key 创建后仅显示一次，必须立刻复制保存。不要提交到公开仓库或前端代码。Claude 风控全球最严，2025 下半年封禁 145 万账号'
    }
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    desc: 'Gemini API 国内使用、免费额度与订阅购买教程，覆盖 Gemini 3.5 Flash 与 3.1 Pro Preview',
    url: 'https://ai.google.dev/',
    proxy: true,
    features: ['Gemini 3.5 Flash', 'Gemini 3.1 Pro Preview', '多模态', '免费 API'],
    icon: '🟠',
    badge: { text: '需代理', type: 'warning' },
    tutorial: {
      title: 'Gemini 国内怎么用？免费 API 与订阅购买指南',
      subtitle: '面向国内开发者和 AI 用户，说明官方订阅、API Key 创建、支付失败排查与安全配置。价格、配额和可用地区会变动，最终以 Google 官方页面为准。',
      steps: [
        {
          title: '先看清订阅、API 和额度规则',
          description: 'Gemini 分为网页 / App 订阅和开发者 API 两条线。订阅适合对话、文档、图片和日常办公；API 适合把模型接入程序、脚本或开发工具。',
          important: true,
          items: [
            '网页订阅：面向个人使用，重点是 Gemini App、Gemini 网页端、部分 Google One 权益和高级模型入口',
            'API Key：面向开发调用，重点是 Google AI Studio、Google Cloud Billing、模型调用、配额和项目权限',
            '订阅降价不等于实际可用额度一定增加。高级模型、Deep Think、长上下文、图片/视频和代码库分析通常会更快消耗额度',
            '价格、模型名称、免费额度、速率限制和地区支持经常变化，购买前必须以当前官方页面和结算页为准',
            '重度开发、科研或长文档用户不要只看宣传页，先用自己的真实任务测试 1-2 天，再决定是否长期订阅'
          ],
          whereToClick: '浏览器访问 gemini.google.com → 登录 → 查看升级选项',
          expectedResult: '能看到当前账号可用的免费版、付费订阅或升级入口',
          failureChecklist: ['确认已登录本人 Google 账号', '如看不到套餐页面，检查当前地区、账号状态和网络是否支持 Google 服务', '不要根据旧教程里的价格或配额直接下单，以官方结算页为准']
        },
        {
          title: '准备一：使用本人 Google 账号',
          description: 'Gemini 订阅、Google AI Studio 和 Google Cloud 都依赖 Google 账号。建议使用本人长期账号，避免使用来路不明的账号。',
          items: [
            '浏览器打开 https://accounts.google.com/signup，按提示填写信息完成注册',
            '账号注册后先完善辅助邮箱、手机号和两步验证，提高账号安全性',
            '尽量保持登录设备和地区稳定，避免短时间内频繁切换环境触发安全验证',
            '不建议购买或共用来路不明的 Google 账号，后续可能出现找回失败、付款争议或封禁风险'
          ],
          whereToClick: '浏览器访问 accounts.google.com/signup → 按提示填写信息注册',
          expectedResult: 'Google 账号注册成功，可正常登录',
          failureChecklist: ['手机号验证失败时，优先检查号码、地区和账号安全提示', '不要反复高频注册或切换设备重试', '如果账号被要求安全验证，按 Google 页面提示完成验证']
        },
        {
          title: '准备二：确认合规且稳定的访问环境',
          description: 'Gemini、Google AI Studio 和 Google Cloud 在不同地区的可用性不同。请遵守所在地法律法规和 Google 服务条款，使用合规网络环境访问。',
          items: [
            '确保可以顺畅访问 Gemini 官网：https://gemini.google.com',
            '确保可以打开开发者入口：https://aistudio.google.com 和 https://cloud.google.com',
            '订阅或付款过程中保持网络稳定，避免中途断开导致订单状态异常',
            '如果页面提示地区不可用，说明当前账号或地区暂不支持，应改用官方支持地区或选择其他模型/API'
          ],
          whereToClick: '确保网络可顺畅访问 gemini.google.com',
          expectedResult: 'Gemini 官网可正常打开，无连接超时',
          failureChecklist: ['页面提示地区不可用时，不要反复提交付款', '访问经常超时会影响订阅和 API 调试', '账号频繁触发安全验证时，先处理账号安全问题再继续购买'],
          warning: '本教程只说明官方入口和合规使用路径，不提供绕过地区限制、规避风控或违反服务条款的操作。'
        },
        {
          title: '准备三：选择适合你的支付方式',
          description: 'Google 的可用支付方式会按国家、账号、设备和订阅渠道变化。优先使用 Google 页面明确支持的本人支付方式。',
          items: [
            '网页端：按 Google 结算页提示使用支持的信用卡、借记卡或 PayPal',
            'App 端：按 App Store 或 Google Play 当前账号地区支持的方式订阅',
            '企业或团队：优先走 Google Cloud / Workspace / Vertex AI 等官方企业账单路径',
            '不建议使用来源不明的虚拟卡、共享账号或非官方代付服务，可能带来拒付、争议、找回和账号安全风险'
          ],
          whereToClick: '根据自身情况选择：Google 结算页、App Store、Google Play 或 Google Cloud Billing',
          expectedResult: '确认选定的支付方式可用，支付渠道已准备就绪',
          failureChecklist: ['支付被拒时先核对卡片状态、账单地址、币种和 3D 验证', '不要短时间内反复换卡重试，可能触发风控', '订阅前确认自动续费、税费、退款和取消规则'],
          warning: '涉及账号、支付和订阅的操作都应使用本人账号和官方支持渠道，避免后续产生无法申诉的账户或资金风险。'
        },
        {
          title: '路线一：网页端订阅 Gemini Advanced',
          description: '如果你的账号地区和支付方式被 Google 支持，网页端订阅是最直接的方式。',
          important: true,
          items: [
            'https://gemini.google.com → 登录 → 左下角或设置菜单 → 升级到 Gemini Advanced',
            'Gemini Advanced 订阅价格约 $19.99/月（约¥145），含 Google One AI Premium 权益',
            '对比页面展示的套餐、模型权益、存储权益、试用期和续费价格',
            '确认自动续费、税费、退款条款后，再填写 Google 支持的付款方式',
            '确认总额无误后提交，验证通过后账号立即升级，邮箱收到确认邮件'
          ],
          whereToClick: 'gemini.google.com → 登录 → 设置菜单 → 升级到 Gemini Advanced → 选套餐 → 订阅',
          expectedResult: '验证通过后账号立即升级，邮箱收到确认邮件，Gemini Advanced 功能可用（订阅约 $19.99/月，约¥145）',
          failureChecklist: ['页面提示地区不可用时，说明当前账号暂不支持该订阅', '支付失败时先核对卡片是否支持海外/线上订阅扣款', '连续失败不要反复提交，先等待或更换官方支持的支付方式']
        },
        {
          title: '路线二：App 内订阅（iOS / Android）',
          description: '如果网页端支付失败，可以检查 Gemini App 或 Google App 内是否显示官方订阅入口。App 内购由对应应用商店处理账单。',
          items: [
            'iOS：使用本人 Apple ID 下载 Gemini 或 Google App，按 App 内升级入口订阅',
            'Android：使用本人 Google Play 账号下载 Gemini App，按 App 内升级入口订阅',
            '支付前确认应用商店账号地区、余额、礼品卡来源和自动续费规则符合平台条款',
            '订阅成功后，通常可在网页端和 App 端同步看到 Advanced 权益'
          ],
          whereToClick: 'Gemini App 或 Google App → 登录 → 头像/设置 → 升级 Gemini Advanced → 选择套餐',
          expectedResult: 'App 内显示已订阅或可管理订阅，网页端同步显示 Advanced 权益',
          failureChecklist: ['下载应用和付款建议使用同一个本人账号', '支付失败时检查应用商店账单设置和余额', '订阅后未同步时，退出重登并等待账单状态刷新']
        },
        {
          title: '路线三：创建 Gemini API Key（开发者）',
          description: '如果你要把 Gemini 接入网站、脚本、Claude Code、Codex、Gemini CLI、OpenCode 或 OpenClaw，需要的是 API Key，而不是网页会员。',
          items: [
            '访问 Google AI Studio 创建 API Key，适合个人测试、小脚本和快速原型',
            '生产环境建议使用 Google Cloud 项目、Billing、配额管理和密钥权限控制',
            'API 计费、免费额度、速率限制和网页订阅是独立体系，买了 Advanced 不等于 API 免费',
            '模型价格、上下文长度、批处理折扣和区域可用性变化较快，调用前查看 Google AI / Vertex AI 官方定价页'
          ],
          whereToClick: '访问 aistudio.google.com → 创建 API Key',
          expectedResult: 'API Key 创建成功，并能在本地脚本或工具配置中完成一次测试调用',
          failureChecklist: ['API Key 只显示一次或需要自行重新生成，创建后立即安全保存', '确认当前项目已启用对应 API 和 Billing', '遇到 quota / rate limit 时，在 Google Cloud 控制台查看配额而不是重复重试'],
          codeLanguage: 'bash',
          code: `# 1. 在 Google AI Studio 创建 API Key
# https://aistudio.google.com/app/apikey

# 2. 本地环境变量保存，不要写进前端代码或提交到 GitHub
export GEMINI_API_KEY="你的 API Key"

# 3. 在 CC Switch 或工具配置里填写：
# Provider: Google Gemini
# API Key: 使用环境变量或本地安全配置
# Base URL / Model: 以工具和 Google 官方文档要求为准`,
          codeExplanation: '最小安全配置流程：先创建 Key，再放进环境变量或工具的本地安全配置，最后用一次真实请求确认模型、Base URL 和权限可用。',
          warning: 'API Key 等同于调用权限。不要硬编码到前端、截图、公开仓库、教程示例或共享文档里。生产环境建议限制 Key 权限并定期轮换。'
        },
        {
          title: '路线四：无法直接使用时的替代方案',
          description: '如果当前账号、地区或支付方式不支持 Gemini，建议优先选择合规替代方案，而不是强行绕过限制。',
          items: [
            '只需要聊天和写作：可以改用当前地区可稳定访问的合规 AI 服务',
            '需要 API 接入：先比较 DeepSeek、通义千问、Kimi、Claude、OpenAI、Gemini 的能力、成本和可用性',
            '需要多模态或长文档：Gemini 值得测试，但要先确认访问、账单、配额和延迟是否满足生产需求',
            '预算敏感：先用免费额度跑真实任务，再决定是否长期付费',
            '团队或商业项目：优先选择有合同、发票、权限管理和 SLA 的企业级通道'
          ],
          whereToClick: '根据任务选择：继续官方 Gemini、改用其他 API，或采用企业级云服务',
          expectedResult: '选定一种稳定、可付款、可持续维护的接入方式',
          failureChecklist: ['不要相信永久无限量、低价共享账号或绕风控承诺', '确认服务条款、退款规则、数据隐私和 API 稳定性', '上线前用自己的真实任务测试延迟、成功率和成本'],
          warning: '第三方聚合服务要重点核对资质、隐私政策、是否允许商业使用、是否能开票和是否提供稳定售后。不要把敏感数据直接发给不可信平台。'
        },
        {
          title: '最后：Gemini 自己的提醒',
          description: '下面这段保留原文想表达的“别被营销话术带着走”，但改成更适合公开教程的表达。它不是 Google 官方声明，而是站内用 Gemini 口吻写给用户的购买提醒。',
          items: [
            '如果我是 Gemini，我会建议你先确认自己的真实任务：日常聊天、内容创作、长文档、多模态、代码分析，消耗额度完全不是一回事',
            '不要只因为“高级”“降价”“Deep Think”这些词就直接付费。先看结算页、额度说明和取消规则，再用真实任务测试',
            '订阅 Gemini Advanced 不等于 API 调用免费。网页端会员、Google One 权益和开发者 API 计费是不同体系',
            '如果只是轻度使用，免费版或低成本 API 测试可能已经够用；如果是重度长文档和多模态任务，就要把额度、延迟和账单都算进去',
            '最稳妥的策略：先用免费额度或短周期订阅跑真实任务，确认效果、稳定性和成本后，再决定是否长期使用'
          ],
          whereToClick: '购买前回到套餐页、API 定价页和账单页逐项确认',
          expectedResult: '明确自己买的是网页订阅还是 API 调用，并知道取消、续费和额度限制在哪里查看',
          failureChecklist: ['仍然分不清订阅和 API 的区别时，先不要付款', '看不到官方额度说明时，不要相信二手截图或过期教程', '需要生产环境接入时，先做小流量压测和成本估算'],
          warning: '这段是站内购买建议，不代表 Google 官方承诺。实际权益、模型和额度以产品内展示与官方文档为准。'
        }
      ],
      tips: [
        '网页订阅适合个人使用，API Key 适合程序接入，两者账单和额度通常独立',
        '订阅价格变低不一定代表重度任务更划算，高级模型、长上下文和多模态任务要重点看额度消耗',
        '价格、模型名称、免费额度、速率限制和地区支持会变化，购买前以官方结算页和文档为准',
        '开发测试先用免费额度或低成本模型跑真实任务，再决定是否升级付费',
        '如果要接入多个 AI 工具，建议用 CC Switch 统一管理 API Key、Base URL 和模型名'
      ],
      warnings: [
        '不要购买、共用或出租来路不明的 Google 账号',
        '不要使用非本人或来源不明的支付方式，避免拒付、争议和账号安全风险',
        'API Key 绝对不要提交到公开仓库、前端代码、截图或公开文档',
        '不要把旧教程里的价格、配额和模型名称当作长期有效信息'
      ],
      advantages: ['多模态能力强', '长上下文', 'Google 生态', 'AI Studio 快速创建 Key', '适合文档与图像理解', '可接入开发工具'],
      estimatedTime: '约 15 分钟',
      prerequisites: ['本人 Google 账号', '可合规访问 Google 服务的稳定网络环境', 'Google 官方支持的付款方式（如适用）', '开发者需要准备 Google AI Studio 或 Google Cloud 项目'],
      successSign: 'Gemini Advanced 权益在网页或 App 中显示可用，或 API Key 能在本地完成一次测试调用',
      commonPitfall: '把网页订阅和 API 额度混为一谈；使用旧价格/旧配额下单；把 API Key 写进前端或公开仓库',
      securityReminder: 'API Key 创建后要安全保存。不要提交到公开仓库或前端代码。网页订阅、Google One 和 API 计费通常是独立体系，扣费前要分别确认。'
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
        question: 'OpenAI 不支持国内手机号注册怎么办？',
        answer: 'OpenAI 目前不支持中国大陆手机号注册。解决方案：①使用 Gmail 或 Outlook 等海外邮箱注册（QQ/163 邮箱可能被拒）；②注册时选择支持的国家/地区；③如果需要手机验证，可使用 Google Voice 等虚拟号码服务（存在一定风险）。建议国内用户优先考虑 DeepSeek、通义千问等无需代理的国产 API，注册流程更简单。'
      },
      {
        question: '注册时邮箱被限制或收不到验证邮件？',
        answer: '常见原因和解决方案：①QQ/163 等国内邮箱可能被海外平台拦截，建议换用 Gmail 或 Outlook 注册；②检查垃圾邮件文件夹，验证邮件可能被误分类；③Gmail 注册时确保已开启"允许不够安全的应用访问"（部分平台需要）；④如果使用 Outlook，确认没有开启安全验证中的"安全附件"拦截。如果多次尝试仍失败，可能是 IP 被风控，建议更换网络环境或直接使用国产 API（DeepSeek、智谱等）绕过此问题。'
      },
      {
        question: '注册成功但账号被风控封禁了怎么办？',
        answer: '账号被风控通常是因为网络环境异常（IP 频繁切换、使用数据中心 IP 等）。预防措施：①注册和使用时保持同一 IP 环境，避免频繁切换；②使用稳定的网络环境，不要使用公共 VPN 节点；③注册后先正常使用一段时间再进行高频调用。如果已被封禁：①尝试联系平台客服申诉，说明使用场景；②准备好注册时使用的邮箱和身份信息；③如果申诉失败，建议转向国产 API（DeepSeek、通义千问等），不存在风控问题。'
      },
      {
        question: '国内注册 Claude（Anthropic）有什么注意事项？',
        answer: 'Claude 目前对中国大陆地区有限制。注意事项：①注册时需要海外手机号验证，可使用 Google Voice 等服务；②使用 Gmail 邮箱注册成功率更高；③注册后保持稳定的网络环境，避免 IP 频繁变动；④Claude Pro 订阅需要海外支付方式。如果只是体验 Claude 模型能力，建议通过国产代理服务（如 API2D）接入，注册流程更简单且支持国内支付。详见本站 Claude 购买教程。'
      }
    ]
  },
  {
    title: '支付相关问题',
    items: [
      {
        question: '国内银行卡无法绑定到海外 API 平台怎么办？',
        answer: '海外 API 平台（OpenAI、Claude 等）通常不支持国内银联卡。解决方案：①使用支持外币支付的 Visa/Mastercard 信用卡（部分银行支持在线申请虚拟卡）；②通过正规第三方支付平台完成充值（注意甄别平台资质）；③最简单的方案：使用国产 API（DeepSeek、通义千问、智谱等），直接支持支付宝/微信支付，无需海外支付工具。'
      },
      {
        question: 'API 调用扣费异常或超出预期怎么办？',
        answer: 'API 按 Token 计费，如果不注意控制容易产生意外费用。预防和解决：①在 API 平台设置月度/日度使用限额（OpenAI、DeepSeek 等都支持）；②开发时先用小模型测试，确认逻辑正确后再切换到大模型；③使用流式响应时注意提前终止，避免生成过多无用内容；④定期查看 API 平台的用量统计页面，监控消费趋势；⑤代码中添加 Token 计数逻辑，输入超长时自动截断。'
      },
      {
        question: '充值后想退款但不知道怎么操作？',
        answer: '各平台退款政策不同：①OpenAI：余额一般不支持退款，建议小额充值、按需使用；②DeepSeek：未使用的充值可联系客服申请退款；③国产平台通常支持退款，但可能需要扣除一定手续费。建议：①新平台先用免费额度测试，确认满足需求后再充值；②采用"小额多次"充值策略，避免大额充值后发现不合适；③部分平台支持设置自动充值阈值，低于某金额自动小额充值。'
      },
      {
        question: '有没有免费的 AI API 可以用？',
        answer: '有多家平台提供免费额度：①DeepSeek：注册即送 500 万 Token，足够日常开发测试；②通义千问（阿里云）：有免费额度，国内直连；③智谱 GLM：注册送 Token，有 Coding Plan 免费方案；④Google Gemini：免费版有调用限制但可体验；⑤OpenAI：新用户有 $5 免费额度。建议先用免费额度充分测试，确认模型能力和稳定性后再决定是否付费升级。详见本站各 API 详情页的"免费额度"信息。'
      }
    ]
  },
  {
    title: '使用相关问题',
    items: [
      {
        question: 'API Key 泄露了怎么办？',
        answer: 'API Key 泄露可能导致他人盗用你的额度。发现泄露后立即：①登录 API 平台，删除（Revoke）泄露的 Key；②生成新的 API Key 替换；③检查用量统计，确认是否有异常调用；④如果产生异常费用，联系平台客服说明情况。预防措施：①永远不要将 API Key 硬编码到前端代码或公开仓库中；②使用环境变量或密钥管理服务存储 Key；③代码提交前检查是否包含敏感信息；④为不同环境（开发/测试/生产）使用不同的 Key；⑤设置 Key 的权限范围和使用限额。'
      },
      {
        question: '遇到 429 Too Many Requests 错误怎么处理？',
        answer: '429 错误表示调用频率超过了平台限制。解决方案：①检查你的 API 套餐的速率限制（RPM/TPM），在平台控制台可查看；②在代码中实现指数退避重试：首次等待 1 秒，第二次 2 秒，第三次 4 秒，逐步增加；③使用队列机制控制并发请求数，避免同时发送大量请求；④如果业务确实需要更高频率，升级到更高级别的套餐；⑤考虑使用多 Key 轮换策略分散请求压力。代码示例：使用 axios-retry 或自定义重试中间件自动处理 429 错误。'
      },
      {
        question: 'API 响应超时或返回很慢怎么办？',
        answer: '响应慢的常见原因和优化方案：①输入 Token 过多：精简 prompt，减少不必要的上下文，控制输入长度；②模型选择：大模型（如 GPT-4o、Claude Opus）比小模型慢，非复杂任务可用更快的模型；③使用流式响应（Streaming）：设置 stream=true，用户可立即看到逐字输出，体感更快；④设置合理的超时时间：一般建议 30-60 秒，长文档处理可适当延长；⑤网络问题：国内调用海外 API 可能因网络延迟导致超时，考虑使用国产 API 或代理服务。'
      },
      {
        question: '如何安全地在项目中存储和使用 API Key？',
        answer: '推荐的安全实践：①使用环境变量存储 Key（.env 文件 + dotenv 库），不要硬编码；②将 .env 文件加入 .gitignore，防止误提交到代码仓库；③生产环境使用密钥管理服务（如阿里云 KMS、AWS Secrets Manager）；④为不同环境创建不同的 Key，便于隔离和轮换；⑤设置 Key 的最小权限和使用限额；⑥定期轮换 Key（建议每 3-6 个月更换一次）；⑦前端项目绝对不要暴露 API Key，应通过后端代理转发请求。'
      }
    ]
  },
  {
    title: '模型选择与对比',
    items: [
      {
        question: '这么多 AI 模型，到底该选哪个？',
        answer: '根据使用场景选择：①编程开发和 Agent 任务优先测试通义千问 Qwen3.7-Max、Claude、DeepSeek V4 Pro/Flash 或 OpenAI；②内容创作和中文场景优先看通义千问 Qwen3.6-Plus / Flash、Kimi K2.6 和豆包；③长文档/多模态看 Gemini 3.5 Flash、Gemini 3.1 Pro Preview、Claude Opus 4.7；④预算有限先测 DeepSeek V4 Flash、Qwen3.6-Flash、豆包和国产免费额度；⑤企业级应用按云生态选阿里云百炼、火山方舟、腾讯云/TokenHub。建议先用各平台免费额度跑真实任务，再做最终决定。详见本站 API 测评页面。'
      },
      {
        question: 'GPT-5.5、Claude Opus、DeepSeek V4 之间怎么选？',
        answer: '三个模型各有优势：①GPT-5.5：OpenAI 官方确认的最新旗舰模型，模型 ID 为 gpt-5.5，适合复杂专业工作、编码、工具型 Agent 和长上下文检索，但价格高且国内通常需要代理；②Claude Opus / Sonnet：长文档、代码理解和安全输出强，但国内使用成本和账号风险更高；③DeepSeek V4：Flash 便宜快速，Pro 更适合复杂推理和长上下文，国内直连且兼容 OpenAI/Anthropic 接口。简单总结：极致能力先看官方 GPT-5.5 / Claude，性价比和国内直连看 DeepSeek。当前 OpenAI 官方文档未确认 GPT-5.5D / gpt-5.5d。'
      },
      {
        question: '免费模型和付费模型差距大吗？',
        answer: '差距在缩小但仍明显：①免费版通常有调用频率限制和上下文长度限制，付费版无此限制；②付费版模型能力更强，特别是在复杂推理、代码生成和长文档处理方面；③免费版可能使用较旧的模型版本，付费版可使用最新模型。建议策略：①轻度使用和学习阶段用免费额度完全够用；②开发测试阶段用小模型（便宜/免费），上线时切换到大模型；③高频调用场景建议付费，体验和效率差距明显。'
      },
      {
        question: '需要代理的 API 和不需要代理的有什么区别？',
        answer: '核心区别在于访问方式和稳定性：①需要代理（OpenAI、Claude、Gemini）：服务器在海外，国内直连可能不稳定或无法访问，需要通过代理服务中转；模型能力通常更强，但接入成本和复杂度更高。②不需要代理（DeepSeek、通义千问、智谱、Kimi、混元、豆包）：服务器在国内，直连稳定，注册和支付流程简单，适合国内用户快速上手。建议：如果是初次接触 AI API，优先选择无需代理的国产 API，等熟悉后再根据需求考虑海外模型。'
      }
    ]
  },
  {
    title: '开发接入问题',
    items: [
      {
        question: '第一次调用 API 应该从哪里开始？',
        answer: '新手入门建议：①选择一个国产 API（推荐 DeepSeek）注册账号，获取免费额度；②在控制台找到 API Key，复制保存；③使用 curl 或 Postman 先测试一个简单的请求，确认 Key 能正常工作；④然后在代码中使用官方 SDK（Python: pip install openai，Node.js: npm install openai）；⑤国产 API 通常兼容 OpenAI 接口格式，学会一个其他的都差不多。详见本站各 API 的购买教程，每个教程都包含从注册到首次调用的完整步骤。'
      },
      {
        question: 'API Key 是什么？在哪里获取？',
        answer: 'API Key 是调用 API 的身份凭证，类似于密码。获取方式：①登录 API 平台控制台（如 DeepSeek 平台、阿里云百炼）；②找到「API Key 管理」或「密钥管理」页面；③点击「创建 API Key」，复制保存。注意事项：API Key 只会完整显示一次，务必立即保存；不要泄露到公开场所（如 GitHub）；建议使用环境变量存储，不要硬编码在代码中。'
      },
      {
        question: 'API 返回格式错误或解析失败怎么办？',
        answer: '常见原因和排查：①检查请求参数格式是否正确（model、messages 等字段是否完整）；②确认 API Key 是否正确且未过期；③检查网络连接是否正常（海外 API 可能需要代理）；④查看返回的错误码和错误信息，平台文档中通常有详细的错误码说明；⑤如果是 JSON 解析失败，可能是返回了 HTML 错误页面（通常是认证失败或 IP 被封）。调试建议：先用 Postman 等工具手动测试，确认请求格式正确后再写入代码。'
      },
      {
        question: '如何处理长文本输入超过 Token 限制的问题？',
        answer: '各模型的 Token 限制不同，超限后会报错。解决方案：①使用 tiktoken 等库预先计算 Token 数，超过限制时自动截断或分段；②使用摘要模型先压缩长文本，再输入主模型处理；③选择上下文窗口更大的模型（如 OpenAI 官方 GPT-5.5 1M、DeepSeek V4 1M、Claude 长上下文模型等，具体以上线时官方文档为准）；④超长文档采用“分段处理 + 合并结果”；⑤在 prompt 中明确只关注关键部分，减少无用上下文。注意：GPT-5.5 超过 272K 输入 token 的请求会触发更高计费，上下文越长成本越高且响应越慢。'
      },
      {
        question: '什么是 Token？怎么计算？',
        answer: 'Token 是 AI 模型处理文本的基本单位，类似于「字」或「词」。计算方式：①英文：1个单词约1-2个 Token，空格和标点也算；②中文：1个汉字约1.5-2个 Token；③代码：变量名、符号等都单独计算。粗略估算：1000个 Token 约等于 750个英文单词或 500个汉字。各平台的计费单位就是 Token 数，输入和输出都会计费。可以在平台控制台查看实际消耗。'
      },
      {
        question: 'API 调用有免费额度吗？',
        answer: '大部分国产 API 都有免费额度：①DeepSeek：新用户赠送 500 万 Tokens；②通义千问：每月 100 万 Tokens 免费；③智谱 GLM：新用户赠送一定额度；④Kimi：有免费试用额度。免费额度通常有调用频率限制（如每分钟 60 次），但足够学习和测试使用。建议：先用免费额度学习和测试，确认需求后再付费升级。详见各 API 的购买教程。'
      }
    ]
  },
  {
    title: '本地部署相关问题',
    items: [
      {
        question: '笔记本电脑能跑大模型吗？需要什么配置？',
        answer: '可以！现在有很多轻量级模型专门针对笔记本优化。推荐配置：①最低配置：2GB RAM + CPU推理，可运行 Qwen3-0.6B 等超轻量模型；②推荐配置：4GB RAM，可运行 Qwen3-1.7B、Gemma4-1B；③标准配置：8GB RAM + 4GB 显存，可运行 Qwen3-8B、Gemma4-4B；④高性能配置：16GB RAM + 8GB 显存，可运行 Gemma4-12B、Qwen3-14B。没有独立显卡也可以用 CPU 推理，只是速度会慢一些。'
      },
      {
        question: 'Gemma 4、Qwen3 和 Qwen3.6 有什么区别？',
        answer: '三个都是2026年最新的开源模型：①Gemma 4：Google发布，采用Sparse MoE架构，原生支持多模态（文本+视觉），有1B/4B/12B三种尺寸；②Qwen3：阿里云发布，中文能力最强，有0.6B/1.7B/4B/8B/14B等多种尺寸；③Qwen3.6：阿里云最新发布，MoE架构（35B总参/3B激活），编程能力突出。选择建议：入门选Qwen3-0.6B，中文场景选Qwen3，编程场景选Qwen3.6，需要图片理解选Gemma4。'
      },
      {
        question: 'Ollama 是什么？怎么安装？',
        answer: 'Ollama 是最简单的本地大模型部署工具，支持一键安装和运行。安装步骤：①访问 https://ollama.ai 下载对应系统的安装包（Windows/macOS/Linux 都支持）；②双击安装，全程默认即可；③安装完成后打开终端，输入 ollama run qwen3:0.6b 即可下载并运行模型。Ollama 会自动管理模型下载、版本更新和 API 服务，非常适合新手。'
      },
      {
        question: '本地部署用哪个模型比较好？',
        answer: '根据需求和配置选择：①入门首选 Qwen3-0.6B，仅需2GB内存，速度最快；②中文场景推荐 Qwen3-1.7B 或 Qwen3-8B，中文理解能力最强；③多模态场景推荐 Gemma4-4B，支持文本+视觉；④高性能需求推荐 Gemma4-12B 或 Qwen3-14B，需要16GB内存。所有模型都可以用 ollama pull 命令一键下载。详见本站本地部署页面的完整指南。'
      },
      {
        question: '本地模型和云端 API 哪个更好？',
        answer: '各有优劣，按需选择：①本地部署优势：完全免费、数据隐私有保障、无需网络、可离线使用；劣势：模型能力通常弱于云端大模型、需要硬件资源。②云端 API 优势：模型能力更强、无需本地硬件、支持最新模型；劣势：按量付费、需要网络、数据经过云端。建议：轻度使用和隐私敏感场景用本地模型，重度使用和需要最强能力用云端 API。'
      },
      {
        question: '本地模型运行速度很慢怎么办？',
        answer: '优化方法：①使用更小的模型，如 Qwen3-0.6B 速度最快；②减少上下文长度，设置为 2048-4096 即可满足大部分对话需求；③如果有 NVIDIA 显卡，确保 Ollama 使用 GPU 推理（运行 nvidia-smi 检查）；④关闭其他大型应用释放内存；⑤笔记本用户保持电源连接并启用高性能模式；⑥Qwen3 和 Gemma4 都采用 MoE 架构，激活参数少，推理速度比传统 Dense 模型更快。'
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
    id: 'ccswitch',
    name: 'CC Switch',
    desc: '跨平台 AI 终端配置管理工具，统一管理 Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw 的 API 供应商、模型、MCP 和 Skills。',
    url: 'https://github.com/farion1231/cc-switch',
    icon: '🔀',
    badge: { text: '推荐', type: 'success' },
    sections: [
      {
        title: 'CC Switch 是什么',
        content: 'CC Switch 是一个开源的跨平台桌面端 AI 编程工具配置中心。它可以接管 Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw 等工具的本地配置文件，用图形界面统一管理 API Key、Base URL、模型名称、代理、MCP 和 Skills，减少手动改 JSON、TOML、env 文件导致的配置错误。',
        steps: [
          {
            title: '适合谁使用',
            description: '如果你经常在多个 API 供应商或多个 AI 编程工具之间切换，CC Switch 能明显减少重复配置成本。',
            items: [
              '经常使用 Claude Code、Codex、Gemini CLI、OpenCode 或 OpenClaw',
              '同时购买了 DeepSeek、Kimi、智谱、通义千问、MiMo、OpenAI 等多个 API',
              '需要在便宜模型、强模型和备用节点之间快速切换',
              '不想手动编辑 settings.json、AGENTS.md、CLAUDE.md 或环境变量文件'
            ]
          },
          {
            title: '核心能力',
            description: '它不是单纯改 API 地址的小工具，而是把供应商配置、模型切换、MCP、Prompt 和 Skills 集中到一个面板里。',
            items: [
              '多供应商一键切换：内置常见模型厂商和中转服务商预设',
              '配置可视化：在界面里填写 API Key、Endpoint、Model Name，降低格式错误概率',
              '系统托盘热切换：运行任务时可快速切换下一个模型或供应商',
              'MCP 与 Skills 管理：把多个 AI 终端工具的扩展能力集中维护',
              '本地存储：配置数据保存在本机，适合重视密钥安全的用户'
            ]
          }
        ],
        tips: [
          '项目地址：https://github.com/farion1231/cc-switch',
          '配置前先准备好对应平台的 API Key、Base URL 和模型名称',
          '密钥仍然属于敏感信息，不要把截图或配置文件公开发布'
        ]
      },
      {
        title: '下载与安装',
        content: 'CC Switch 通过 GitHub Releases 发布安装包。Windows 用户优先下载 MSI，macOS 用户下载 DMG，Linux 用户按发行版选择 deb、rpm 或 AppImage。',
        steps: [
          {
            title: '打开发布页面',
            description: '进入 GitHub Releases 页面，展开最新版本的 Assets 区域。',
            items: [
              '访问：https://github.com/farion1231/cc-switch/releases',
              '确认下载的是最新稳定版本',
              '根据自己的系统选择安装包，不要下载源码压缩包当作软件安装包'
            ]
          },
          {
            title: 'Windows 安装',
            description: 'Windows 用户推荐下载 `.msi` 安装包，双击后按向导安装。',
            items: [
              '优先选择 `CC-Switch-版本号-Windows.msi`',
              '如果电脑没有管理员权限，可选择 Portable zip 便携版',
              '便携版建议解压到不含中文和特殊字符的目录，例如 `D:\\Tools\\CC-Switch`'
            ]
          },
          {
            title: 'macOS 安装',
            description: 'macOS 用户下载 `.dmg` 文件，打开后把 CC Switch 拖入 Applications。',
            code: 'brew tap farion1231/ccswitch\nbrew install --cask cc-switch',
            items: [
              '普通用户推荐使用 DMG 图形安装',
              '习惯 Homebrew 的用户可使用命令行安装',
              '安装后从启动台或应用程序目录打开 CC Switch'
            ]
          },
          {
            title: 'Linux 安装',
            description: 'Linux 用户按发行版选择对应包格式。AppImage 需要先赋予执行权限。',
            code: '# Debian / Ubuntu\nsudo apt install ./CC-Switch-*.deb\n\n# Fedora / RHEL\nsudo dnf install ./CC-Switch-*.rpm\n\n# AppImage\nchmod +x CC-Switch-*.AppImage\n./CC-Switch-*.AppImage',
            items: [
              'Ubuntu、Debian、Linux Mint 优先使用 deb',
              'Fedora、RHEL、CentOS、Rocky Linux 优先使用 rpm',
              '不确定发行版时可使用 AppImage'
            ]
          }
        ],
        warnings: [
          '只从官方 GitHub 项目或可信发布页下载安装包',
          '安装前关闭来源不明的同名工具，避免混淆配置文件'
        ]
      },
      {
        title: '添加 API 供应商',
        content: '安装完成后，第一步是为你正在使用的 AI 工具添加供应商。以 Claude Code 为例，选择对应工具标签后添加 DeepSeek、Kimi、智谱、通义、MiMo 或 OpenAI 等供应商。',
        steps: [
          {
            title: '选择要配置的工具',
            description: '打开 CC Switch 后，先选择 Claude Code、Codex、Gemini CLI、OpenCode 或 OpenClaw 对应标签，确保配置写入正确位置。',
            items: [
              '使用 Claude Code 就选择 Claude Code 标签',
              '使用 Codex 就选择 Codex 标签',
              '多个工具都用时，建议逐个工具分别配置和测试'
            ],
            warning: '不要在错误的工具标签下添加供应商，否则实际使用的 AI 工具可能读不到配置。'
          },
          {
            title: '添加供应商预设',
            description: '点击 Add Provider 或右上角加号，从内置预设中选择你购买的 API 平台。',
            items: [
              '优先使用内置预设，它会自动填好协议类型和常见 Endpoint',
              '如果平台不在预设列表里，选择自定义供应商',
              '填写 Provider Name、API Endpoint、API Key、Model Name',
              '保存前检查 Base URL 末尾路径是否和平台文档一致'
            ]
          },
          {
            title: '示例：接入 OpenAI 兼容 API',
            description: '多数国产和中转平台都提供 OpenAI 兼容格式，通常只需要填 API Key、Base URL 和模型名。',
            code: 'Provider Name: DeepSeek\nAPI Endpoint: https://api.deepseek.com\nAPI Key: sk-xxxxxxxxxxxxxxxx\nModel Name: deepseek-v4-flash',
            items: [
              'DeepSeek 可使用 `https://api.deepseek.com`',
              'MiMo 可使用 `https://api.xiaomimimo.com/v1`',
              '通义、Kimi、智谱等平台按各自官方文档填写',
              '保存后用对应 AI 工具发起一次简单对话测试'
            ]
          }
        ],
        tips: [
          '每个平台的 Base URL 和模型名可能会更新，最终以官方控制台或文档为准',
          '建议先配置一个低成本模型用于日常任务，再配置一个强模型用于复杂任务',
          '新增或切换供应商后，必要时重启对应 AI 终端工具以确保配置生效'
        ]
      },
      {
        title: '在 AI 工具里验证',
        content: '供应商保存后，需要在实际工具中验证。验证目标不是只看 CC Switch 里是否保存成功，而是确认 Claude Code、Codex 或其他工具能读取新配置并正常调用模型。',
        steps: [
          {
            title: '验证 Claude Code',
            description: '打开一个新的终端窗口，进入项目目录后启动 Claude Code，发送一个简单问题。',
            code: 'claude',
            items: [
              '建议重新打开终端，避免旧进程缓存旧配置',
              '询问简单问题，例如「请用一句话介绍当前模型」',
              '如果能正常回答，说明供应商配置已经生效',
              '如果报 401、403 或余额不足，优先检查 API Key 和账户状态'
            ]
          },
          {
            title: '验证 Codex 或其他 CLI',
            description: '选择对应工具标签配置后，用该工具自己的启动命令测试。',
            items: [
              'Codex、Gemini CLI、OpenCode、OpenClaw 都需要在各自标签下配置',
              '确认工具读取的是 CC Switch 写入的配置路径',
              '同一平台在不同工具下可能需要不同协议格式，保存前查看预设说明'
            ]
          },
          {
            title: '使用托盘热切换',
            description: '配置多个供应商后，可以通过系统托盘快速切换当前模型。',
            items: [
              '日常轻量任务使用低成本模型',
              '复杂重构、长上下文分析时切换到强模型',
              '备用节点可作为 API 限流或故障时的替代方案',
              '切换后如未立即生效，重启对应 AI 工具或新开会话再试'
            ]
          }
        ],
        warnings: [
          '不同 AI 工具对热切换的响应方式不同，遇到不生效时先新开会话验证',
          '不要把包含 API Key 的 CC Switch 配置库直接上传到公开仓库'
        ]
      },
      {
        title: '常见问题',
        content: '大多数问题集中在 API Key、Base URL、模型名、工具标签选错和旧进程缓存配置这几类。',
        steps: [
          {
            title: '保存后工具仍然没有响应',
            description: '先确认配置写入的是你正在使用的工具标签，再重启终端和 AI 工具。',
            items: [
              '检查是否选错 Claude Code、Codex 或 OpenCode 标签',
              '重新打开终端窗口',
              '确认对应 AI 工具本身已经安装并能启动',
              '查看 CC Switch 是否有配置保存失败或权限提示'
            ]
          },
          {
            title: '提示认证失败',
            description: '认证失败通常来自 API Key 错误、复制了多余空格、账户未充值或平台权限未开通。',
            items: [
              '重新复制 API Key，避免前后空格',
              '确认账号已完成实名、充值或套餐开通',
              '检查 Key 是否被删除、禁用或过期',
              '不要把 OpenAI 平台的 Key 填到其他供应商预设里'
            ]
          },
          {
            title: '提示模型不存在',
            description: '模型名必须和供应商文档完全一致，大小写、连字符和版本号都可能影响调用。',
            items: [
              '在平台模型列表里复制模型 ID',
              '使用 Fetch Models 或类似按钮拉取可用模型',
              '确认当前 API Key 有权限访问该模型',
              '不确定时先换成平台推荐的默认聊天模型测试'
            ]
          }
        ],
        tips: [
          '排查顺序：工具标签 → API Key → Base URL → 模型名 → 账户余额 → 网络代理',
          '配置成功后建议记录一组稳定可用的低成本模型，作为日常默认方案'
        ]
      }
    ]
  },
  {
    "id": "codex",
    "name": "OpenAI Codex",
    "desc": "OpenAI 官方 AI 编程助手安装与使用教程，覆盖 CLI、IDE 扩展、云端任务、AGENTS.md、权限审批、安全规范和真实项目工作流。",
    "url": "https://chatgpt.com/codex",
    "icon": "🤖",
    "badge": {
      "text": "官方",
      "type": "success"
    },
    "sections": [
      {
        "title": "Codex 是什么，适合谁",
        "content": "Codex 是 OpenAI 面向软件开发的 AI 编程助手。它不是单纯聊天工具，而是可以读取项目、解释代码、修改文件、运行命令、做 code review，并把失败日志继续交给模型修复的开发代理。新手最容易混淆的是：Codex 有 CLI、IDE 扩展和云端任务三种入口，适合的场景并不完全一样。",
        "steps": [
          {
            "title": "先分清三种入口",
            "description": "如果你只记一件事：本地 CLI 适合直接在项目目录里干活，IDE 扩展适合边看代码边改，云端 Codex 适合把明确任务委托出去后台跑。",
            "image": "/images/tutorial/codex-site-overview.png",
            "items": [
              "Codex CLI：在终端中启动，适合修 bug、跑测试、生成脚本、批量读写项目文件。",
              "Codex IDE：在 VS Code、Cursor、Windsurf、JetBrains 等编辑器内使用，适合结合当前文件和选区做修改。",
              "Codex Cloud：从 chatgpt.com/codex 进入，适合把任务交给云端环境处理，例如修复 issue、分析仓库、准备 PR 草稿。",
              "三者不是替代关系：日常本地开发优先 CLI/IDE，明确的大任务再交给云端。"
            ]
          },
          {
            "title": "Codex 最适合的任务",
            "description": "Codex 的优势在于“理解项目上下文 + 修改代码 + 自己验证”。不要把它只当成问答模型，用任务目标和验收标准驱动它。",
            "items": [
              "读项目：让它先总结目录结构、技术栈、关键路由和数据来源。",
              "修 bug：给出复现路径、报错日志、期望行为，让它定位并改最小范围。",
              "写功能：明确页面路径、组件范围、数据结构、移动端要求和验证命令。",
              "做 review：让它检查当前 diff 的 bug、回归风险、遗漏测试和安全问题。",
              "写维护材料：让它生成 AGENTS.md、README、部署日志、排错清单。"
            ]
          },
          {
            "title": "哪些任务不建议直接交给它",
            "description": "Codex 很强，但不代表所有任务都应该一次性交给它自动完成。权限、安全、支付、生产数据库相关任务要拆小并人工确认。",
            "items": [
              "不要直接让它执行生产删除、批量覆盖、数据库迁移、密钥轮换这类高风险动作。",
              "不要把需求写成“优化一下全站”，应改成“只改这个页面，验证 360px 移动端不横向溢出”。",
              "不要把 API Key、服务器密码、Cookie 直接写进聊天记录或提交到仓库。",
              "不要让它在脏工作区里随便 commit，先要求列出会包含和会排除的文件。"
            ]
          }
        ],
        "tips": [
          "官方 CLI 文档：https://developers.openai.com/codex/cli",
          "官方 IDE 文档：https://developers.openai.com/codex/ide",
          "官方 AGENTS.md 文档：https://developers.openai.com/codex/guides/agents-md"
        ]
      },
      {
        "title": "安装前准备",
        "content": "安装 Codex 前先把基础环境准备好，可以避免一半以上的新手报错。Windows 用户尤其要确认 Node.js、npm、Git、终端路径和项目目录都可用。",
        "steps": [
          {
            "title": "准备账号与网络",
            "description": "Codex 首次启动需要登录 OpenAI / ChatGPT 账号，或按提示使用 API Key。账号、套餐、组织和项目权限会影响可用模型与额度。",
            "image": "/images/tutorial/codex-site-auth.png",
            "items": [
              "准备一个可正常登录的 ChatGPT / OpenAI 账号。",
              "如果使用 API Key，确认 key 属于正确的 OpenAI Project，并且账号有可用额度。",
              "网络需要能正常访问 OpenAI 相关服务，否则登录、模型调用和云端任务都会失败。",
              "不要把 API Key 写进前端代码、公开仓库、截图或教程评论区。"
            ]
          },
          {
            "title": "检查本机基础命令",
            "description": "打开终端，先确认 Node.js、npm 和 Git 都能输出版本号。没有版本号就先安装对应工具。",
            "code": "node -v\nnpm -v\ngit --version",
            "items": [
              "Node.js：建议安装 LTS 版本，安装后重新打开终端。",
              "npm：随 Node.js 一起安装，用来安装 Codex CLI。",
              "Git：建议安装 Git for Windows，便于 Codex 查看 diff、分支和提交历史。",
              "终端：Windows 可用 PowerShell、Windows Terminal 或 Git Bash。"
            ]
          },
          {
            "title": "准备一个干净项目目录",
            "description": "第一次不要直接拿生产项目练手，建议新建一个测试目录，或在真实项目里先让 Codex 只读分析。",
            "code": "mkdir codex-demo\ncd codex-demo\ngit init",
            "items": [
              "真实项目使用前先执行 `git status --short`，确认有哪些未提交改动。",
              "让 Codex 修改前先要求它列出计划修改的文件。",
              "重要项目先新建分支，避免把实验改动混进主分支。",
              "不要在没有版本控制的目录里让 Codex 大范围改文件。"
            ]
          }
        ],
        "warnings": [
          "如果你的项目里已经有未提交改动，先保存或提交自己的工作，再让 Codex 动手。否则很难区分哪些是你改的，哪些是 AI 改的。"
        ]
      },
      {
        "title": "安装 Codex CLI",
        "content": "Codex CLI 是最直接的本地入口。官方推荐通过 npm 全局安装 `@openai/codex`，安装完成后用 `codex --version` 验证。",
        "steps": [
          {
            "title": "执行官方安装命令",
            "description": "在终端执行 npm 全局安装命令。安装过程需要联网下载依赖，第一次可能需要几十秒到几分钟。",
            "image": "/images/tutorial/codex-site-install-cli.png",
            "code": "npm install -g @openai/codex",
            "items": [
              "只从 npm 官方包名安装，不要安装来源不明的同名包。",
              "Windows 如果提示权限不足，尝试以管理员身份打开终端后重试。",
              "macOS / Linux 如果全局安装权限失败，优先修复 npm 全局目录权限，不要随便使用来路不明的一键脚本。"
            ]
          },
          {
            "title": "验证安装结果",
            "description": "安装完成后检查 Codex 命令是否可用。能输出版本号，说明 CLI 已经进入 PATH。",
            "code": "codex --version",
            "items": [
              "能看到类似 `codex-cli 0.x.x` 的版本号：安装成功。",
              "提示 command not found：终端没有读取到 npm 全局 bin 路径。",
              "提示权限或执行策略错误：检查 Windows PowerShell 执行策略或 npm 全局目录权限。"
            ]
          },
          {
            "title": "command not found 的快速修复",
            "description": "先查 npm 全局安装目录，再确认对应 bin 目录已经加入 PATH。Windows 用户安装后一定要重新打开终端。",
            "code": "npm config get prefix\nnpm bin -g",
            "items": [
              "Windows 常见路径：`C:\\Users\\你的用户名\\AppData\\Roaming\\npm`。",
              "macOS / Linux 常见路径：`/usr/local/bin`、`~/.npm-global/bin` 或 Node 版本管理器目录。",
              "修改 PATH 后重新打开终端，再执行 `codex --version`。",
              "如果公司电脑限制全局安装，先咨询管理员或使用受控开发环境。"
            ]
          }
        ],
        "tips": [
          "官方安装命令以 OpenAI 文档为准：https://developers.openai.com/codex/cli",
          "如果只是临时试用，可以先在测试目录里启动，确认体验后再进入真实项目。"
        ]
      },
      {
        "title": "登录与首次启动",
        "content": "安装完成后不要急着让 Codex 改项目。第一次启动的目标是完成登录、确认当前目录、让它只读分析项目，并验证你能控制权限。",
        "steps": [
          {
            "title": "启动 Codex",
            "description": "进入一个测试目录或项目根目录，执行 `codex`。首次启动会进入登录或授权流程。",
            "image": "/images/tutorial/codex-site-auth.png",
            "code": "cd your-project\ncodex",
            "items": [
              "如果弹出浏览器登录，按页面提示完成 OpenAI / ChatGPT 授权。",
              "如果选择 API Key，确认 key 不会被写进项目文件。",
              "登录成功后，Codex 会以当前目录作为主要工作区。",
              "不要在桌面、下载目录或整个磁盘根目录直接启动 Codex。"
            ]
          },
          {
            "title": "第一条指令只做只读分析",
            "description": "首次使用建议先让 Codex 读项目，不要修改文件。这样可以确认它理解的是正确目录和技术栈。",
            "image": "/images/tutorial/codex-site-first-task.png",
            "code": "请阅读当前项目，先总结目录结构、技术栈、主要页面入口和数据来源。\n不要修改任何文件，也不要运行会改变文件的命令。",
            "items": [
              "回答里应该能看到框架、路由目录、主要配置文件和启动脚本。",
              "如果它识别错项目，先退出，进入正确目录再启动。",
              "如果它准备修改文件，立刻打断并要求先给计划。"
            ]
          },
          {
            "title": "确认权限审批逻辑",
            "description": "Codex 在执行命令、写文件、联网或高风险操作时通常会按当前模式请求确认。新手建议保留审批，不要一开始就全自动。",
            "items": [
              "允许：读文件、搜索代码、运行无副作用的检查命令。",
              "谨慎允许：安装依赖、写文件、启动服务、联网下载。",
              "拒绝或拆小：删除目录、覆盖大量文件、重置 Git、修改生产配置。",
              "每次同意前看清命令和工作目录，尤其是 `rm`、`del`、`git reset`、`git checkout`。"
            ],
            "warning": "如果你看不懂某条命令，不要直接同意。让 Codex 先解释命令目的、影响范围和回退方式。"
          }
        ],
        "tips": [
          "安全的第一条提示词：先读项目，只总结，不修改。",
          "Codex 能力越强，越要把任务边界、验收方式和禁止事项写清楚。"
        ]
      },
      {
        "title": "在真实项目里使用 Codex",
        "content": "真实项目里最稳的做法是：先让 Codex 只读定位，再确认计划，然后小范围修改，最后运行验证命令并查看 diff。不要一次性把“设计、重构、测试、部署”全部塞进一个模糊请求。",
        "steps": [
          {
            "title": "让它先定位问题，不要立刻改",
            "description": "当页面错位、接口报错或构建失败时，先让 Codex 收集上下文和复现原因。",
            "code": "请只读排查这个问题：移动端 390px 下搜索框和推荐栏没有对齐。\n先指出可能相关的文件、CSS 规则和复现路径，不要修改文件。",
            "items": [
              "适合 UI bug、构建失败、路由 404、搜索结果缺失等问题。",
              "让它先列文件和原因，可以避免误改无关页面。",
              "如果它的判断不准确，再补充截图、URL、报错日志。"
            ]
          },
          {
            "title": "确认计划后再让它修改",
            "description": "计划合理后，把任务改成可验收的修改请求。范围越明确，结果越稳定。",
            "code": "按刚才定位结果修复，但只允许修改首页相关组件和样式。\n要求：桌面端不变，移动端 360px 不横向溢出，修完后运行相关检查并给出截图。",
            "items": [
              "写清楚允许修改的目录或文件。",
              "写清楚不能影响的页面或端。",
              "写清楚验证方式，例如截图、lint、ts-check、单测、构建。"
            ]
          },
          {
            "title": "让它验证并解释 diff",
            "description": "修改完成后，要求 Codex 用命令和浏览器验证，并说明每个文件为什么被改。",
            "code": "请运行必要检查，然后总结：\n1. 修改了哪些文件\n2. 每个文件为什么改\n3. 如何验证\n4. 是否有未处理风险",
            "items": [
              "前端页面：至少看桌面端和移动端首屏。",
              "后端或脚本：至少跑最接近的测试或类型检查。",
              "上线前：要求列出会提交的文件和排除的脏文件。"
            ]
          }
        ],
        "tips": [
          "推荐工作流：只读分析 → 修改计划 → 小范围改动 → 运行验证 → 查看 diff → 再决定提交。",
          "如果项目有 AGENTS.md，Codex 会更稳定地遵守包管理器、测试命令、代码风格和安全边界。"
        ]
      },
      {
        "title": "写好 AGENTS.md",
        "content": "AGENTS.md 是给 Codex 看的项目说明文件，适合写包管理器、构建命令、目录约定、禁止事项、测试流程和提交规范。它相当于把你经常重复告诉 AI 的规则固化到仓库里。",
        "steps": [
          {
            "title": "在项目根目录创建 AGENTS.md",
            "description": "把项目级规则写在仓库根目录。以后 Codex 进入这个项目时，会优先读取这些说明。",
            "image": "/images/tutorial/codex-site-agents-md.png",
            "code": "# AGENTS.md\n\n## Project Rules\n\n- Use pnpm only. Do not use npm or yarn.\n- Make surgical changes. Do not refactor unrelated files.\n- Before editing, state which files you plan to change.\n- Never run destructive git commands unless explicitly requested.\n- After code changes, run pnpm exec tsc -p tsconfig.json --noEmit.\n- For frontend changes, verify desktop and 390px mobile layout.",
            "items": [
              "规则要短、具体、可验证，不要写空泛价值观。",
              "把最容易出错的地方写进去，例如包管理器、启动命令、部署方式。",
              "如果项目有多套应用，可以在子目录再放一个 AGENTS.md 覆盖局部规则。"
            ]
          },
          {
            "title": "把常用验证命令写进去",
            "description": "不要只告诉 Codex “测试一下”，要把项目真实命令写清楚。",
            "code": "## Verification\n\n- Type check: pnpm exec tsc -p tsconfig.json --noEmit\n- Lint changed files: pnpm exec eslint <changed-files>\n- Local preview: pnpm run preview:local\n- Production build: pnpm exec next build",
            "items": [
              "命令越准确，Codex 越不容易乱猜。",
              "如果某些命令很慢，写明什么时候才需要跑。",
              "如果部署由人工处理，写明 Codex 不要自动部署。"
            ]
          },
          {
            "title": "写清楚提交和部署边界",
            "description": "很多事故不是代码不会写，而是 AI 把无关文件一起提交或提前部署。把边界写进 AGENTS.md。",
            "code": "## Git and Deployment\n\n- Do not commit or push unless the user explicitly asks.\n- Do not include unrelated dirty files in a commit.\n- Before any commit, show git diff --stat and git status --short.\n- Deployment requires a separate explicit instruction.",
            "items": [
              "适合多人协作仓库、线上网站、带密钥或部署脚本的项目。",
              "Codex 可以帮你写日志，但不应该在你没确认时推送。",
              "如果有服务器部署流程，把入口和等待时间写清楚。"
            ]
          }
        ],
        "tips": [
          "官方 AGENTS.md 指南：https://developers.openai.com/codex/guides/agents-md",
          "AGENTS.md 不是给用户看的文章，而是给 Codex 看的操作手册。"
        ]
      },
      {
        "title": "IDE 扩展怎么用",
        "content": "如果你主要在编辑器里写代码，Codex IDE 扩展比纯 CLI 更顺手。它能结合当前文件、选区、打开的上下文和编辑器状态，让你少复制路径和代码片段。",
        "steps": [
          {
            "title": "选择你的编辑器",
            "description": "OpenAI 官方 Codex IDE 扩展覆盖常见开发编辑器。安装前确认自己使用的是 VS Code、Cursor、Windsurf 或 JetBrains 系列。",
            "image": "/images/tutorial/codex-site-ide.png",
            "items": [
              "VS Code / Cursor / Windsurf：通常从扩展市场搜索 Codex 或 OpenAI Codex。",
              "JetBrains：从插件市场安装对应插件。",
              "安装后按提示登录同一个 OpenAI / ChatGPT 账号。",
              "如果扩展无法连接，先确认本机网络和账号权限，再检查编辑器代理设置。"
            ]
          },
          {
            "title": "用选区驱动修改",
            "description": "IDE 场景下不要只说“优化这个文件”，更好的做法是选中一段代码，再要求它做具体修改。",
            "code": "请只修改我选中的组件：\n- 保持桌面端不变\n- 移动端按钮换行\n- 不改数据结构\n- 修改后解释 CSS 变化",
            "items": [
              "适合局部 CSS、组件拆分、类型修复、函数重写。",
              "如果涉及多个文件，要求它先列出依赖关系。",
              "修改后在编辑器里逐个查看 diff，不要盲目全部接受。"
            ]
          },
          {
            "title": "CLI 和 IDE 怎么搭配",
            "description": "IDE 适合局部编辑，CLI 适合项目级搜索、批量修改和跑命令。两者搭配比只用一种入口更稳定。",
            "items": [
              "先用 CLI 让 Codex 读项目、找文件、跑测试。",
              "再用 IDE 扩展针对关键组件做精修。",
              "最后回到 CLI 跑检查、看 git diff、生成变更总结。"
            ]
          }
        ],
        "tips": [
          "官方 IDE 文档：https://developers.openai.com/codex/ide",
          "编辑器扩展适合“看着代码改”，CLI 适合“围绕项目完成任务”。"
        ]
      },
      {
        "title": "云端 Codex 怎么用",
        "content": "云端 Codex 适合把边界清楚的任务交给后台处理。它不适合你一边改一边实时观察的小修小补，更适合“分析这个仓库并准备一个修复方案”这类明确任务。",
        "steps": [
          {
            "title": "进入云端入口",
            "description": "打开 chatgpt.com/codex，按页面提示选择仓库或任务入口。具体可用能力取决于你的账号、组织和产品开通状态。",
            "image": "/images/tutorial/codex-site-cloud.png",
            "items": [
              "入口地址：https://chatgpt.com/codex",
              "适合处理 issue、代码审查、修复明确 bug、准备 PR 草稿。",
              "第一次使用时通常需要授权代码仓库或选择可访问的项目。",
              "不要给云端任务粘贴生产密钥、服务器密码或私有客户数据。"
            ]
          },
          {
            "title": "给云端任务写清楚验收标准",
            "description": "云端任务比本地 CLI 更需要边界，因为你不会一直盯着它每一步。任务描述必须包含目标、范围、禁止事项和验证方式。",
            "code": "目标：修复 /app/codex 移动端图片溢出。\n范围：只允许修改 app 教程详情页样式。\n禁止：不要重构路由，不要改其他内容数据。\n验证：390px 宽度无横向滚动，桌面端布局不变。",
            "items": [
              "任务越像 issue，云端 Codex 越容易交付可 review 的结果。",
              "不要只写“优化一下”，要写页面、文件范围和成功标准。",
              "完成后先 review diff，再决定是否合并。"
            ]
          },
          {
            "title": "什么时候不用云端",
            "description": "如果你需要频繁查看本地浏览器、处理本机文件、使用本地登录态，优先用本地 CLI 或 IDE。",
            "items": [
              "需要本机浏览器截图：优先本地 Codex。",
              "需要访问本机服务 localhost：优先本地 Codex。",
              "需要非常快地来回调整 UI：优先 IDE 扩展。",
              "需要长时间后台分析仓库或准备 PR：适合云端 Codex。"
            ]
          }
        ],
        "tips": [
          "云端任务要写成“可验收的工单”，不要写成随口聊天。",
          "本地 CLI、IDE 扩展和云端 Codex 可以按任务阶段组合使用。"
        ]
      },
      {
        "title": "权限、安全和密钥管理",
        "content": "Codex 可以读取和修改本地文件，也可能运行命令。安全使用的关键不是完全不用它，而是把权限边界、密钥处理和 Git 回退路径设置好。",
        "steps": [
          {
            "title": "先保护密钥文件",
            "description": "任何包含 API Key、数据库密码、Cookie、Token 的文件，都应该被 `.gitignore` 排除，并避免让 Codex 在回答中原样输出。",
            "code": "# .gitignore\n.env\n.env.local\n.env.*.local\n*.key\n*.pem\nsecrets.json\ncredentials.json",
            "items": [
              "让 Codex 检查配置时，可以要求它只说明变量名，不展示变量值。",
              "如果发现密钥已经提交到仓库，先轮换密钥，再清理 Git 历史。",
              "截图前检查页面上是否显示 API Key、Token 或服务器地址。"
            ]
          },
          {
            "title": "高风险命令必须人工确认",
            "description": "删除、覆盖、迁移、重置、推送、部署都属于高风险操作。让 Codex 先解释，再决定是否执行。",
            "items": [
              "谨慎命令：`rm -rf`、`Remove-Item -Recurse`、`git reset --hard`、`git clean -fd`。",
              "谨慎操作：数据库迁移、生产部署、批量替换、依赖大版本升级。",
              "执行前要求它说明：影响目录、是否可回退、验证方式。",
              "如果只是改文章或页面，不应该出现删除整个目录的命令。"
            ],
            "warning": "不要让 Codex 在你没确认的情况下执行 `git reset --hard` 或清理未跟踪文件。"
          },
          {
            "title": "用 Git 做回退保险",
            "description": "Codex 修改前后都看一眼 Git 状态。小步提交可以把风险控制在可回退范围内。",
            "code": "git status --short\ngit diff --stat\ngit diff",
            "items": [
              "修改前：确认当前有哪些你自己的未提交改动。",
              "修改后：看 diff 是否只包含本次任务范围。",
              "提交前：排除无关文件、日志、临时截图、密钥和构建产物。",
              "不确定时：先让 Codex 列出“本次会提交”和“不会提交”的文件。"
            ]
          }
        ],
        "tips": [
          "Codex 能帮你提高速度，但最终合并、推送、部署仍然应由你确认。",
          "安全边界写进 AGENTS.md，比每次口头提醒更稳定。"
        ]
      },
      {
        "title": "常见问题排查",
        "content": "Codex 的常见问题大多集中在 npm 安装、PATH、登录、网络、额度、权限和当前目录。按下面顺序排查，通常能快速定位。",
        "steps": [
          {
            "title": "npm 安装失败",
            "description": "先判断是网络问题、权限问题还是 npm 缓存问题。不要反复换来源不明的安装脚本。",
            "code": "npm cache verify\nnpm install -g @openai/codex",
            "items": [
              "网络超时：换稳定网络后重试。",
              "权限不足：Windows 用管理员终端，macOS/Linux 修复 npm 全局目录权限。",
              "依赖解析失败：升级 Node.js LTS 后重新安装。",
              "公司网络限制：使用公司允许的代理或内部 npm 源。"
            ]
          },
          {
            "title": "codex 命令不存在",
            "description": "这通常不是 Codex 没装好，而是 npm 全局 bin 没进 PATH，或安装后没有重新打开终端。",
            "code": "npm config get prefix\nnpm bin -g\nwhere codex",
            "items": [
              "Windows 用 `where codex` 查看命令是否能被找到。",
              "macOS/Linux 用 `which codex` 查看命令路径。",
              "修改环境变量后关闭所有终端窗口，再重新打开。",
              "如果仍失败，重新安装 Node.js LTS 并勾选加入 PATH。"
            ]
          },
          {
            "title": "登录失败或无可用模型",
            "description": "先确认账号能正常登录 OpenAI / ChatGPT，再确认 API Key、项目权限、组织权限和额度。",
            "items": [
              "浏览器能登录，不代表 CLI 一定已授权；按 CLI 提示重新登录。",
              "API Key 要属于正确项目，不要复制错组织或旧 key。",
              "额度不足、项目没开通、组织权限不足都会导致模型不可用。",
              "网络不稳定时，登录回调和模型请求都可能超时。"
            ]
          },
          {
            "title": "Codex 改错目录或改太多文件",
            "description": "这通常是启动目录不对，或任务边界写得太宽。先停止，再回到正确项目根目录重新启动。",
            "code": "pwd\ngit status --short",
            "items": [
              "确认当前目录就是目标项目根目录。",
              "要求 Codex 先列修改计划，不要直接改。",
              "修改后如果范围不对，不要继续叠加修复，先查看 diff 再决定回退。",
              "把“只允许修改哪些文件”写进任务描述。"
            ]
          },
          {
            "title": "接口报 401、429、timeout",
            "description": "这些属于 API 调用问题，先按错误类型排查，不要盲目重装 Codex。",
            "items": [
              "401 / invalid API key：重新复制 API Key，确认没有空格、没有用错项目。",
              "429 / rate limit：降低并发，稍后重试，或检查套餐和限速。",
              "insufficient quota：检查账单、余额、项目额度和组织限制。",
              "timeout：先排查网络，再缩短上下文或换更快模型。"
            ]
          }
        ],
        "tips": [
          "本站相关排错：/error/invalid-api-key、/error/429-too-many-requests、/error/timeout、/error/insufficient-quota",
          "如果只是 API Key 或额度问题，重装 Codex 通常没有用。"
        ]
      },
      {
        "title": "推荐工作流和内链",
        "content": "把 Codex 用好，不靠一次性长提示词，而靠稳定流程。下面这套流程适合大多数网站、脚本、后端和工具项目。",
        "steps": [
          {
            "title": "日常开发推荐流程",
            "description": "每次任务都按“读、计划、改、验、总结”推进，速度会比直接让它乱改更快。",
            "code": "1. 只读分析：找相关文件和原因\n2. 修改计划：列出要改的文件和验证方式\n3. 小范围实现：只改本次任务需要的代码\n4. 本地验证：运行测试、类型检查或页面截图\n5. 查看 diff：确认没有混入无关文件\n6. 人工决定：是否 commit、push、deploy",
            "items": [
              "复杂任务拆成多次小任务，比一次性全自动更可靠。",
              "UI 任务必须给桌面端和移动端验收标准。",
              "内容任务必须给结构、语气、不可删除项和内链要求。",
              "部署任务必须明确是否只部署、是否需要检查、是否需要推送。"
            ]
          },
          {
            "title": "本站相关教程",
            "description": "如果你要把 Codex 和其他 AI API、模型切换工具一起用，可以继续看这些页面。",
            "items": [
              "OpenAI API 接入：/api/openai",
              "CC Switch 统一管理 Codex、Claude Code、Gemini CLI 配置：/app/ccswitch",
              "Claude Code 安装与模型接入：/app/claude-code",
              "API Key 错误排查：/error/invalid-api-key",
              "请求超时排查：/error/timeout"
            ]
          },
          {
            "title": "一个可以直接复制的高质量任务模板",
            "description": "以后给 Codex 派任务，可以从这个模板开始改。",
            "code": "目标：修复/新增 [具体页面或功能]\n范围：只允许修改 [文件或目录]\n禁止：不要修改 [无关页面、数据源、部署脚本]\n要求：保留现有风格，移动端 360px 不横向溢出\n验证：运行 [具体命令]，并截图检查 [具体 URL]\n交付：列出修改文件、验证结果、未处理风险",
            "items": [
              "把“你要什么”和“不要什么”都写进去。",
              "把验收标准写成可检查的事实。",
              "把提交、推送、部署作为单独指令，不要默认授权。"
            ]
          }
        ],
        "tips": [
          "Codex 最适合处理边界清楚、可验证、有版本控制保护的开发任务。",
          "写给 Codex 的提示词越像工程任务单，交付质量越稳定。"
        ]
      }
    ]
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    desc: 'Claude Code 安装、区域限制处理、CC Switch 配置与 DeepSeek 模型接入完整教程',
    url: 'https://claude.com/product/claude-code',
    icon: '💻',
    badge: { text: '热门', type: 'warning' },
    sections: [
      {
        title: '安装 Node.js',
        content: 'Claude Code 是由 JavaScript 编写的命令行工具，Windows 电脑需要先安装 Node.js 运行环境。Node.js 会同时提供 npm 包管理器，后续安装 Claude Code 和相关工具都依赖它。',
        steps: [
          {
            title: '下载 Node.js 安装包',
            description: '访问 Node.js 中文下载页面，下载 Windows Installer (.msi)。新手建议选择 LTS 版本，稳定性更好。',
            image: '/images/tutorial/claude-code-deepseek-p01-01.png',
            items: [
              '打开官网：https://nodejs.org/zh-cn/download',
              '选择 Windows Installer (.msi)',
              '普通 Windows 电脑选择 x64 版本即可',
              '下载完成后双击安装包启动安装向导'
            ]
          },
          {
            title: '运行 Node.js 安装程序',
            description: '安装过程保持默认即可，一路点击 Next，最后点击 Finish 完成安装。',
            image: '/images/tutorial/claude-code-deepseek-p01-01.png',
            items: [
              '安装路径保持默认',
              '组件选项保持默认',
              '一定要勾选 Automatically install the necessary tools',
              '等待安装完成后关闭安装向导'
            ]
          },
          {
            title: '验证 Node.js 是否成功',
            description: '安装完成后重新打开终端，检查 Node.js 和 npm 是否可用。',
            code: 'node -v\nnpm -v',
            items: [
              '能显示 node 版本号，说明 Node.js 安装成功',
              '能显示 npm 版本号，说明包管理器可用',
              '如果命令不存在，关闭终端后重新打开再试'
            ]
          }
        ],
        tips: [
          'Node.js 是 Claude Code 在 Windows 上运行的前置环境',
          'npm 后续会用于执行 `npm install -g @anthropic-ai/claude-code`',
          '安装完成后必须新开终端，旧终端可能读取不到新环境变量'
        ],
        warnings: [
          '如果之前装过旧版 Node.js，建议先卸载旧版本再安装新版',
          '不要把 Node.js 安装到包含中文或特殊字符的路径'
        ]
      },
      {
        title: '安装 Git / Git Bash',
        content: 'Claude Code 底层依赖 Bash 环境。Windows 默认的 CMD 和 PowerShell 对部分命令行行为支持不完整，因此建议安装 Git for Windows，并使用它自带的 Git Bash。',
        steps: [
          {
            title: '下载 Git for Windows',
            description: '访问 Git for Windows 下载页面，下载 Windows/x64 Setup 安装包。',
            image: '/images/tutorial/claude-code-deepseek-p02-01.png',
            items: [
              '打开官网：https://git-scm.com/install/windows',
              '页面通常会自动下载 Git for Windows/x64 Setup',
              '如果没有自动下载，点击页面上的下载链接手动触发',
              '下载完成后双击安装包'
            ]
          },
          {
            title: '运行 Git 安装向导',
            description: 'Git 安装步骤较多，新手保持默认选项一路 Next 即可。',
            image: '/images/tutorial/claude-code-deepseek-p03-01.png',
            items: [
              '安装位置保持默认',
              '组件选择保持默认',
              '终端模拟器建议使用默认的 MinTTY',
              '等待安装完成后点击 Finish'
            ]
          },
          {
            title: '验证 Git Bash 可用',
            description: '安装完成后重新打开终端，确认 git 命令可以正常输出版本号。',
            image: '/images/tutorial/claude-code-deepseek-p04-01.png',
            code: 'git -v',
            items: [
              '按 Win 键搜索 Git Bash 并打开',
              '也可以在任意文件夹右键选择 Git Bash Here',
              '执行 `git -v` 后能显示版本号即可'
            ]
          }
        ],
        tips: [
          '后续 Claude Code 相关命令优先在 Git Bash 中执行',
          'Git Bash 能提供更接近 Linux 的命令行环境，兼容性更好'
        ],
        warnings: [
          '只用 CMD 或 PowerShell 运行 Claude Code 可能遇到路径、权限或 Bash 兼容问题',
          '如果之前安装过旧版 Git，建议先卸载后再安装新版'
        ]
      },
      {
        title: '安装 Claude Code',
        content: 'Node.js 和 Git Bash 准备好后，就可以通过 npm 安装 Claude Code。Claude Code 是新一代实干型 AI 编程智能体，可以根据指令修改代码、运行命令并继续修复报错。',
        steps: [
          {
            title: '执行安装命令',
            description: '打开 Git Bash，运行以下命令安装 Claude Code 最新版本。',
            image: '/images/tutorial/claude-code-deepseek-p05-01.png',
            code: 'npm install -g @anthropic-ai/claude-code',
            items: [
              '安装过程需要联网下载依赖',
              '如果出现权限问题，以管理员身份打开终端后重试',
              '安装完成后不要关闭页面，继续执行版本检查'
            ]
          },
          {
            title: '验证安装结果',
            description: '安装完成后，在终端中依次检查 Git、Node.js 和 Claude Code 是否安装成功。',
            code: 'git -v\nnode -v\nclaude --version',
            items: [
              '如果三个命令都显示版本号，说明基础环境安装成功',
              '如果某个命令不存在，先关闭终端重新打开',
              '仍然失败时，回到对应安装步骤重新安装'
            ]
          }
        ],
        tips: [
          'Claude Code 可以直接修改代码文件、运行测试命令并根据报错继续修复',
          '国内用户后续建议通过 CC Switch 接入 DeepSeek，网络更稳、成本更低'
        ],
        warnings: [
          '安装期间如果网络不稳定，npm 下载可能失败，重新执行安装命令即可',
          '不要使用来源不明的第三方包，使用官方 npm 包名 `@anthropic-ai/claude-code`'
        ]
      },
      {
        title: '解决 onboarding / 区域限制',
        content: '首次执行 `claude` 可能会触发 onboarding 引导。如果国内环境遇到区域限制或无法继续，可以通过修改 Claude Code 配置文件跳过 onboarding。',
        steps: [
          {
            title: '先启动一次 Claude Code',
            description: '在终端执行 `claude`，让程序生成默认配置文件。如果出现区域限制报错，继续按下面步骤处理。',
            image: '/images/tutorial/claude-code-deepseek-p05-01.png',
            code: 'claude',
            items: [
              '第一次执行可能会进入引导流程',
              '如果提示无法继续或区域限制，不代表安装失败',
              '继续找到配置文件并修改 onboarding 状态'
            ]
          },
          {
            title: '找到并编辑 Claude 配置文件',
            description: '打开用户目录下的 `.claude.json`，加入已完成 onboarding 的配置项。',
            image: '/images/tutorial/claude-code-deepseek-p06-01.png',
            code: '# Windows 路径\nC:\\Users\\你的用户名\\.claude.json\n\n# 在 JSON 对象中加入：\n"hasCompletedOnboarding": true',
            items: [
              '路径中的“你的用户名”替换为当前 Windows 用户名',
              '可以用记事本、VS Code 或其他编辑器打开',
              '字段名必须是 `hasCompletedOnboarding`',
              '值必须是 `true`，不要拼错'
            ],
            warning: '修改 JSON 前建议备份原文件。字段之间要用逗号分隔，不能多逗号或漏括号。'
          },
          {
            title: '保存配置并重新启动',
            description: '保存 `.claude.json` 后关闭编辑器，重新打开终端再执行 Claude Code。',
            image: '/images/tutorial/claude-code-deepseek-p07-01.png',
            items: [
              '保存配置文件',
              '关闭当前终端',
              '重新打开 Git Bash 或终端',
              '后续通过 CC Switch 接入 DeepSeek 模型'
            ]
          }
        ],
        tips: [
          '这个步骤只处理 onboarding 状态，不负责配置模型供应商',
          '模型供应商推荐交给 CC Switch 管理，避免手写配置出错'
        ]
      },
      {
        title: '安装 CC Switch',
        content: 'CC Switch 是跨平台桌面端 AI 终端配置管理工具，可以统一管理 Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw 的供应商、模型、MCP 和 Skills。这里用于把 Claude Code 接入 DeepSeek 模型。',
        steps: [
          {
            title: '打开 CC Switch 项目页面',
            description: '访问 CC Switch 的 GitHub 项目页面，进入 Releases 下载 Windows 安装包。',
            image: '/images/tutorial/claude-code-deepseek-p08-01.png',
            items: [
              '访问项目地址：https://github.com/farion1231/cc-switch',
              '进入 Releases 页面',
              '找到最新版本的 Assets 下载区'
            ]
          },
          {
            title: '下载 Windows MSI 安装包',
            description: 'Windows 用户优先下载 `CC-Switch-v版本号-Windows.msi`，不要下载源码压缩包。',
            items: [
              '文件名通常类似 `CC-Switch-v3.14.1-Windows.msi`',
              '下载成功后双击运行安装程序',
              '安装向导保持默认，一路下一步即可',
              '安装完成后打开 CC Switch'
            ]
          }
        ],
        tips: [
          'CC Switch GitHub 地址：https://github.com/farion1231/cc-switch',
          '如果需要更完整的图文说明，可查看本站 CC Switch 详细教程：https://apiuspro.cn/app/ccswitch'
        ],
        warnings: [
          '只从官方 GitHub 项目或可信发布页下载安装包',
          'Portable 便携版可以用，但新手优先选 MSI 安装包'
        ]
      },
      {
        title: '获取 DeepSeek API Key',
        content: '接入 DeepSeek 前，需要先在 DeepSeek 开放平台创建 API Key。API Key 是调用模型的身份凭证，创建后要立即保存。',
        steps: [
          {
            title: '进入 DeepSeek 开放平台',
            description: '访问 DeepSeek 开放平台，注册或登录账号，并按页面要求完成实名认证。',
            image: '/images/tutorial/claude-code-deepseek-p09-01.png',
            items: [
              '访问 DeepSeek 开放平台：https://platform.deepseek.com',
              '注册或登录账号',
              '按提示完成实名认证',
              '进入 API Keys 页面'
            ]
          },
          {
            title: '创建并保存 API Key',
            description: '在 API Keys 页面创建新的 API Key，复制后保存到安全位置。',
            image: '/images/tutorial/claude-code-deepseek-p10-01.png',
            items: [
              '点击创建 API Key',
              '复制生成的密钥',
              '密钥通常只完整显示一次，忘记后只能重新创建',
              '确认账号有可用额度或余额'
            ],
            warning: 'API Key 不要截图公开、上传到 GitHub 或发送给他人。'
          }
        ],
        tips: [
          'DeepSeek 适合国内开发测试，网络稳定且成本较低',
          '建议先用小额额度测试，确认能正常响应后再用于真实项目'
        ]
      },
      {
        title: '使用 CC Switch 接入 DeepSeek',
        content: '拿到 DeepSeek API Key 后，在 CC Switch 中选择 Claude Code 标签，并把 DeepSeek 配置保存进去。这样 Claude Code 后续就能通过 DeepSeek 模型响应。',
        steps: [
          {
            title: '打开 Claude Code 配置页',
            description: '打开 CC Switch，进入 Claude Code 对应页面，点击右上角添加或配置供应商。',
            image: '/images/tutorial/claude-code-deepseek-p10-01.png',
            items: [
              '确认当前选中的是 Claude Code',
              '点击右上角的添加或配置按钮',
              '选择 DeepSeek 供应商预设'
            ]
          },
          {
            title: '填写 DeepSeek API Key 并保存',
            description: '选择 DeepSeek 后，将刚才复制的 API Key 粘贴进去，保存配置。',
            image: '/images/tutorial/claude-code-deepseek-p11-01.png',
            code: 'Provider Name: DeepSeek\nAPI Endpoint: https://api.deepseek.com\nAPI Key: sk-xxxxxxxxxxxxxxxx\nModel Name: deepseek-v4-flash',
            items: [
              'Provider 选择 DeepSeek',
              '粘贴 DeepSeek API Key',
              '确认模型名称和 API 地址无误',
              '点击保存配置'
            ]
          },
          {
            title: '测试 CC Switch 连接状态',
            description: '保存后点击页面中的测试或状态按钮。如果提示运行正常，说明 DeepSeek 已成功接入。',
            image: '/images/tutorial/claude-code-deepseek-p11-01.png',
            items: [
              '点击测试按钮',
              '确认状态正常',
              '如果失败，优先检查 API Key、余额和模型名称',
              '配置细节可参考：https://apiuspro.cn/app/ccswitch'
            ]
          }
        ],
        tips: [
          'CC Switch 可以同时管理多个供应商，后续可在 DeepSeek、Kimi、智谱、OpenAI 等模型间切换',
          '切换后如 Claude Code 未立即生效，重新打开终端再试'
        ],
        warnings: [
          '一定要确认当前配置写入的是 Claude Code 标签，不要误写到其他工具标签',
          '不要把包含 API Key 的配置文件上传到公开仓库'
        ]
      },
      {
        title: '启动 Claude Code 并测试模型',
        content: 'DeepSeek 配置完成后，重新打开一个新的终端，执行 `claude` 启动 Claude Code，并用简单问题验证模型是否正常响应。',
        steps: [
          {
            title: '重新打开终端启动 Claude Code',
            description: '关闭旧终端，重新打开 Git Bash 或终端，然后执行 Claude Code 启动命令。',
            image: '/images/tutorial/claude-code-deepseek-p12-01.png',
            code: 'claude',
            items: [
              '必须重新打开终端，避免旧会话缓存旧配置',
              '在终端输入 `claude`',
              '等待 Claude Code 进入交互界面'
            ]
          },
          {
            title: '提出简单问题测试响应',
            description: '在 Claude Code 中输入一个简单问题，例如“1.9 和 1.11 哪个大”。如果模型能正常回答，说明接入成功。',
            image: '/images/tutorial/claude-code-deepseek-p12-01.png',
            items: [
              '先用简单问题测试，不要一开始就跑复杂项目',
              '能正常回答说明 DeepSeek 模型接入成功',
              '如果没有响应，检查 CC Switch 配置、API Key 和账户余额'
            ]
          }
        ],
        tips: [
          '确认模型响应稳定后，再进入真实项目目录使用 Claude Code 处理代码任务',
          '日常开发建议先用低成本模型，复杂任务再切换到更强模型'
        ]
      },
      {
        title: '进阶使用与补充入口',
        content: '完成 Claude Code 与 DeepSeek 接入后，可以继续配置 VS Code 扩展、Obsidian 插件或查看 CC Switch 的完整教程，把命令行、编辑器和知识库工作流串起来。',
        steps: [
          {
            title: '查看 CC Switch 详细教程',
            description: '如果你还需要配置其他模型、MCP、Skills 或多个 AI 工具，建议继续阅读本站 CC Switch 独立教程。',
            items: [
              '详细教程入口：https://apiuspro.cn/app/ccswitch',
              '适合继续配置 Codex、Gemini CLI、OpenCode、OpenClaw',
              '适合统一管理多个 API Key 和模型供应商'
            ]
          },
          {
            title: '接入 VS Code 扩展',
            description: 'Claude Code 提供 VS Code 扩展，安装后可以直接在编辑器内使用侧边栏对话、内联编辑和代码修复。',
            items: [
              '打开 VS Code 扩展市场',
              '搜索 Claude Code',
              '安装官方扩展',
              '扩展会读取 Claude Code 的本地配置'
            ]
          },
          {
            title: '接入 Obsidian 插件',
            description: '如果你使用 Obsidian 管理笔记，可以继续安装 Claudian Obsidian 插件，在知识库中调用 AI。',
            items: [
              '插件教程入口：https://apiuspro.cn/app/claudian-obsidian',
              '适合把 Claude Code 工作流延伸到笔记和知识库场景',
              '建议在 Claude Code 基础环境稳定后再配置'
            ]
          }
        ],
        tips: [
          'VS Code 扩展和命令行 Claude Code 共享同一套本地配置',
          'Obsidian 插件是进阶工作流，不影响 Claude Code 基础使用',
          '需要更强配置管理时优先查看 `https://apiuspro.cn/app/ccswitch`'
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
              '访问 Node.js 官网下载 LTS 版本：https://nodejs.org',
              '安装完成后在命令行验证：node -v',
              '确保 NPM 也已安装：npm -v'
            ],
            warning: 'Node.js 版本必须 >= 22，旧版本无法运行 OpenClaw'
          },
          {
            title: '安装 Git Bash',
            description: 'Windows 用户需要安装 Git Bash 来运行 OpenClaw',
            items: [
              '访问 Git 官网下载 Windows 版本：https://git-scm.com/downloads/win',
              '国内用户可使用镜像：https://registry.npmmirror.com',
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
              '访问智谱AI Coding Plan 注册获取 API Key：https://bigmodel.cn/glm-coding',
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
    id: 'openclaw-feishu',
    name: 'OpenClaw 接入飞书',
    desc: '基于飞书开放平台创建机器人，并通过 OpenClaw Feishu 插件把本地 AI 助手接入飞书对话',
    url: 'https://openclaw.ai',
    icon: '💬',
    badge: { text: '飞书', type: 'info' },
    sections: [
      {
        title: '创建飞书应用',
        content: '先在飞书开放平台创建企业自建应用。后续 OpenClaw 会通过这个应用的机器人能力接收消息并回复。',
        steps: [
          {
            title: '注册飞书开放平台账号',
            description: '打开飞书开放平台，按页面提示登录或注册账号。',
            image: '/images/tutorial/openclaw-feishu-p01-01.png',
            items: [
              '访问飞书开放平台',
              '使用飞书账号登录',
              '按提示完成开发者或企业相关信息确认'
            ]
          },
          {
            title: '创建企业自建应用',
            description: '在开发者后台创建企业自建应用，作为 OpenClaw 后续接入飞书的载体。',
            image: '/images/tutorial/openclaw-feishu-p01-02.png',
            items: [
              '进入开发者后台',
              '选择创建企业自建应用',
              '填写应用名称和基础信息',
              '创建完成后进入应用管理页面'
            ]
          }
        ],
        tips: [
          '这里创建的是企业自建应用，不是应用商店应用',
          '后续所有权限、机器人和事件配置都在这个应用里完成'
        ]
      },
      {
        title: '获取应用凭证',
        content: 'OpenClaw 需要使用飞书应用的 App ID 和 App Secret 完成鉴权。创建应用后先把这两个值记录下来。',
        steps: [
          {
            title: '进入凭证与基础信息',
            description: '在飞书开放平台应用详情页中找到应用凭证区域。',
            image: '/images/tutorial/openclaw-feishu-p02-01.png',
            items: [
              '进入刚创建的应用',
              '打开凭证与基础信息页面',
              '找到 App ID 和 App Secret'
            ]
          },
          {
            title: '记录 App ID 和 App Secret',
            description: '复制并保存 App ID 和 App Secret，后续配置 OpenClaw Feishu 插件时会用到。',
            image: '/images/tutorial/openclaw-feishu-p02-02.png',
            items: [
              'App ID 用于标识当前飞书应用',
              'App Secret 用于服务端鉴权',
              '建议保存到本地安全位置，不要公开截图或上传仓库'
            ],
            warning: 'App Secret 属于敏感凭证，不要发到公开聊天、文档或代码仓库。'
          }
        ]
      },
      {
        title: '添加机器人能力',
        content: '飞书应用需要先添加机器人能力，才能在飞书会话里接收用户消息并返回 OpenClaw 的响应。',
        steps: [
          {
            title: '打开添加应用能力',
            description: '在应用能力配置区域点击添加能力。',
            image: '/images/tutorial/openclaw-feishu-p03-01.png',
            items: [
              '进入应用能力页面',
              '点击添加应用能力',
              '准备添加机器人能力'
            ]
          },
          {
            title: '选择添加机器人',
            description: '在能力列表里选择机器人，并添加到当前应用。',
            image: '/images/tutorial/openclaw-feishu-p03-02.png',
            items: [
              '选择机器人能力',
              '确认添加',
              '添加后进入机器人相关配置'
            ]
          }
        ],
        tips: [
          '机器人能力是 OpenClaw 接入飞书聊天的核心入口',
          '如果没有添加机器人，后续即使权限正确也无法正常对话'
        ]
      },
      {
        title: '配置应用权限',
        content: '接入机器人后，需要开通聊天与群组相关权限。PDF 中特别强调：应用身份权限和用户权限都要开通。',
        steps: [
          {
            title: '进入权限配置',
            description: '打开权限管理页面，准备添加聊天与群组权限。',
            image: '/images/tutorial/openclaw-feishu-p04-01.png',
            items: [
              '进入权限管理',
              '切换到应用身份权限和用户权限相关区域',
              '搜索 im: 快速定位消息权限'
            ]
          },
          {
            title: '添加聊天与群组权限',
            description: '按需选择接收消息、发送消息、群组相关权限，并确保应用身份权限和用户权限都已开通。',
            image: '/images/tutorial/openclaw-feishu-p04-02.png',
            items: [
              '搜索 im: 统一筛选消息相关权限',
              '添加聊天消息权限',
              '添加群组相关权限',
              '同时检查应用身份权限和用户权限'
            ],
            warning: '只开通其中一类权限可能导致机器人能配置成功，但收发消息异常。'
          },
          {
            title: '点击开通权限',
            description: '权限选择完成后点击开通权限，并在确认弹窗里完成授权。',
            image: '/images/tutorial/openclaw-feishu-p05-01.png',
            items: [
              '检查已选权限',
              '点击开通权限',
              '在确认弹窗里继续确认'
            ]
          }
        ]
      },
      {
        title: '启用机器人能力',
        content: '机器人保存前需要先准备长连接。PDF 中说明：直接点击保存会失败，需要先运行一个长连接，再回到页面保存。',
        steps: [
          {
            title: '进入机器人配置',
            description: '回到机器人能力配置页，页面会提示需要配置订阅方式或长连接。',
            image: '/images/tutorial/openclaw-feishu-p06-01.png',
            items: [
              '打开机器人能力配置',
              '查看页面提示',
              '点击弹出文本里的超链接'
            ]
          },
          {
            title: '按 Python 形式创建长连接',
            description: '根据页面引导，使用 Python 形式创建长连接。长连接运行后再回到飞书开放平台保存配置。',
            image: '/images/tutorial/openclaw-feishu-p06-02.png',
            items: [
              '按飞书页面提示选择 Python 形式',
              '保持长连接运行',
              '再回到机器人配置页面继续保存'
            ],
            warning: '如果没有先运行长连接，直接保存机器人配置可能会失败。'
          },
          {
            title: '选择订阅方式并保存',
            description: '点击订阅方式，完成机器人能力保存。',
            image: '/images/tutorial/openclaw-feishu-p07-01.png',
            items: [
              '点击订阅方式',
              '确认当前配置',
              '点击保存'
            ]
          },
          {
            title: '确认保存成功',
            description: '保存后确认页面没有报错，机器人能力已启用。',
            image: '/images/tutorial/openclaw-feishu-p07-02.png',
            items: [
              '查看保存结果',
              '如果失败，先确认长连接是否仍在运行',
              '确认权限是否已经开通'
            ]
          }
        ]
      },
      {
        title: '添加接收消息事件',
        content: '飞书应用部分最后需要添加接收消息事件，让机器人可以收到用户在飞书里发送的普通消息。',
        steps: [
          {
            title: '点击添加事件',
            description: '进入事件订阅配置，点击添加事件。',
            image: '/images/tutorial/openclaw-feishu-p08-01.png',
            items: [
              '进入事件订阅页面',
              '点击添加事件',
              '准备搜索消息事件'
            ]
          },
          {
            title: '搜索并添加接收消息',
            description: '搜索接收消息，选择对应事件并添加。',
            image: '/images/tutorial/openclaw-feishu-p08-02.png',
            items: [
              '搜索接收消息',
              '选择消息接收事件',
              '点击添加',
              '完成后飞书应用部分配置结束'
            ]
          }
        ],
        tips: [
          '到这一步，飞书开放平台侧的应用、机器人、权限和事件已经配置完成',
          '接下来切换到 OpenClaw 侧安装和配置 Feishu 插件'
        ]
      },
      {
        title: '安装 Feishu 插件',
        content: '飞书应用配置完成后，在 OpenClaw 所在环境安装 Feishu 插件。PDF 中使用 WSL 执行安装命令。',
        steps: [
          {
            title: '在 WSL 下安装插件',
            description: '打开 WSL 终端，执行 OpenClaw Feishu 插件安装命令。',
            image: '/images/tutorial/openclaw-feishu-p09-01.png',
            code: 'openclaw plugins install @openclaw/feishu',
            items: [
              '确保 OpenClaw 已经安装完成',
              '在 WSL 或当前 OpenClaw 运行环境执行命令',
              '等待插件安装完成'
            ]
          },
          {
            title: '确认插件安装完成',
            description: '安装完成后继续进入 OpenClaw 的插件配置向导。',
            image: '/images/tutorial/openclaw-feishu-p09-02.png',
            items: [
              '观察终端输出是否有明显报错',
              '如果下载失败，先检查网络和 npm 源',
              '安装成功后开始配置 App ID 和 App Secret'
            ]
          }
        ]
      },
      {
        title: '通过向导配置',
        content: '推荐使用 OpenClaw 的向导完成飞书插件配置，按截图依次填入前面保存的 App ID 和 App Secret。',
        steps: [
          {
            title: '启动插件配置向导',
            description: '进入 OpenClaw 插件配置流程，选择 Feishu 插件。',
            image: '/images/tutorial/openclaw-feishu-p10-01.png',
            items: [
              '选择 Feishu 插件',
              '进入交互式配置',
              '按提示继续'
            ]
          },
          {
            title: '填写飞书应用凭证',
            description: '按向导提示填入飞书开放平台里的 App ID 和 App Secret。',
            image: '/images/tutorial/openclaw-feishu-p11-01.png',
            items: [
              '填入 App ID',
              '填入 App Secret',
              '检查没有复制多余空格',
              '保存配置'
            ],
            warning: '如果 App ID 或 App Secret 填错，后续网关可以启动，但飞书消息无法正常鉴权。'
          }
        ],
        tips: [
          '新手优先使用向导配置，减少手动编辑配置文件的格式错误',
          '配置完成后再启动 gateway 做真实消息测试'
        ]
      },
      {
        title: '通过配置文件配置（可选）',
        content: '如果熟悉配置文件，也可以直接编辑 OpenClaw 配置。此方式适合已经明确配置结构的用户。',
        steps: [
          {
            title: '打开配置文件',
            description: '找到 OpenClaw 配置文件，定位 Feishu 插件相关配置。',
            image: '/images/tutorial/openclaw-feishu-p12-01.png',
            items: [
              '先备份原配置文件',
              '找到 Feishu 插件配置区域',
              '确认字段位置和 JSON 格式'
            ]
          },
          {
            title: '写入飞书应用信息',
            description: '把 App ID 和 App Secret 写入配置，并保存文件。',
            image: '/images/tutorial/openclaw-feishu-p12-02.png',
            items: [
              '填写 App ID',
              '填写 App Secret',
              '保存后检查 JSON 或配置格式是否有效',
              '不熟悉配置文件时优先回到向导方式'
            ],
            warning: '手动配置最常见的问题是逗号、引号或缩进错误。保存前建议先备份。'
          }
        ]
      },
      {
        title: '启动并测试',
        content: '配置完成后启动 OpenClaw Gateway，在飞书里找到机器人发送普通消息，并完成配对授权。',
        steps: [
          {
            title: '启动网关',
            description: '在终端启动 OpenClaw Gateway，让飞书插件开始监听和处理消息。',
            image: '/images/tutorial/openclaw-feishu-p13-01.png',
            code: 'openclaw gateway',
            items: [
              '保持 gateway 进程运行',
              '确认终端没有报错',
              '启动后再到飞书里测试机器人'
            ]
          },
          {
            title: '发送测试消息',
            description: '在飞书中找到刚创建的机器人，发送一条普通消息。',
            image: '/images/tutorial/openclaw-feishu-p13-02.png',
            items: [
              '打开飞书客户端',
              '找到创建的机器人',
              '发送一条普通消息',
              '默认情况下机器人会回复一个配对码'
            ]
          },
          {
            title: '批准配对码',
            description: '复制机器人返回的配对码，在终端执行批准命令。批准后即可正常与机器人对话。',
            code: 'openclaw pairing approve feishu <配对码>',
            items: [
              '把 <配对码> 替换成飞书机器人实际返回的代码',
              '执行批准命令',
              '回到飞书再次发送消息测试',
              '能正常回复即代表 OpenClaw 接入飞书完成'
            ]
          }
        ],
        tips: [
          '第一次对话需要配对授权，完成后即可正常使用',
          '如果飞书没有收到回复，优先检查 gateway 是否仍在运行、App ID 和 App Secret 是否正确、权限和事件是否完整'
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
            code: '# 依次创建以下三个环境变量\n# 变量名                    变量值\nANTHROPIC_BASE_URL     https://api.deepseek.com/anthropic\nANTHROPIC_AUTH_TOKEN   你的DeepSeek API Key\nANTHROPIC_MODEL        deepseek-v4-flash',
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
    id: 'hermes-agent',
    name: 'Hermes Agent',
    desc: 'Nous Research 开源 AI Agent 安装与初始化教程，覆盖一键安装、模型配置、健康检查和常见问题排查',
    url: 'https://github.com/NousResearch/hermes-agent',
    icon: '🪽',
    badge: { text: 'Agent', type: 'warning' },
    sections: [
      {
        title: '先判断 Hermes Agent 适不适合你',
        content: 'Hermes Agent 是 Nous Research 开源的终端 AI Agent。它不是单纯的聊天网页，而是可以在本机、WSL2 或服务器里运行的 Agent 工具，适合需要长期会话、工具调用、MCP、自动化任务和消息网关的用户。',
        steps: [
          {
            title: '适合的使用场景',
            description: '如果你想把 AI Agent 放进真实工作流里，Hermes Agent 会比单纯网页聊天更有价值。',
            image: '/images/tutorial/hermes-agent-overview.png',
            items: [
              '想在终端里使用可调用工具的 AI Agent',
              '需要连接 OpenAI、OpenRouter、Claude、Kimi、Qwen 或本地模型',
              '想尝试 MCP、Skills、记忆、定时任务或消息机器人',
              '愿意处理命令行、配置文件和 API Key'
            ]
          },
          {
            title: '首次安装目标',
            description: '第一次安装不要把所有功能都打开，先完成一个最小闭环。',
            items: [
              '先完成 CLI 对话，再考虑 Telegram、Discord、Slack 等网关',
              '先配置一个模型提供商，不要同时配置多个 fallback',
              '先用 hermes doctor 排查，再接入浏览器、MCP、自动化任务',
              'API Key 不要写进公开仓库或截图里'
            ],
            warning: 'Hermes Agent 有较强工具执行能力，建议先在个人目录或测试环境验证，确认权限边界后再用于重要项目。'
          }
        ],
        tips: [
          'Windows 用户更稳的路径是 WSL2；原生 Windows 支持仍属于 early beta，遇到路径、编码或子进程问题时优先切到 WSL2。',
          '如果你只是想购买和调用 API，不需要 Agent 工作流，可以先看本站的 API 购买教程和模型选择页面。'
        ]
      },
      {
        title: '准备安装环境',
        content: 'Hermes Agent 官方安装器会自动处理 uv、Python、Node.js、ripgrep、ffmpeg 等依赖。你需要先确认系统路径和网络环境正常。',
        steps: [
          {
            title: 'Linux / macOS / WSL2 前置检查',
            description: '官方推荐的一键安装路径适用于 Linux、macOS 和 Windows WSL2。',
            image: '/images/tutorial/hermes-agent-install.png',
            code: 'git --version',
            items: [
              '打开终端',
              '确认可以访问 GitHub',
              '确认 git 可用',
              '预留一点安装时间，首次安装会拉取依赖'
            ]
          },
          {
            title: 'Windows 原生安装前确认',
            description: 'Windows 10/11 可以尝试官方 PowerShell 安装器，但目前属于 early beta。',
            items: [
              '使用 PowerShell 或 Windows Terminal',
              '安装后需要重新打开一个终端窗口',
              '如果终端工具、路径或中文编码异常，改用 WSL2',
              'WSL2 和 Windows 原生安装可以并存，但配置目录不同'
            ]
          },
          {
            title: '准备一个模型提供商',
            description: '安装完成后最关键的一步是选择模型。先准备一个可用的 API Key 或本地模型端点。',
            items: [
              'OpenRouter、OpenAI、Anthropic、Kimi、Qwen、DeepSeek 等都可以作为候选',
              '本地模型需要确认端点、模型名和上下文长度',
              '官方建议使用至少 64K 上下文的模型',
              '先用便宜或稳定的模型跑通，再换更强模型'
            ]
          }
        ],
        warnings: [
          '不要把 API Key 粘贴到公开聊天记录、公开仓库或可被搜索引擎访问的页面。',
          '如果你在公司或服务器环境安装，先确认是否允许脚本安装依赖和执行命令。'
        ]
      },
      {
        title: 'Linux / macOS / WSL2 一键安装',
        content: '这是官方当前最推荐、最稳定的安装路径。安装器会克隆 Hermes Agent、创建环境、配置 hermes 命令，并进入后续设置流程。',
        steps: [
          {
            title: '运行官方安装脚本',
            description: '在 Linux、macOS 或 WSL2 终端中执行以下命令。',
            image: '/images/tutorial/hermes-agent-install.png',
            code: 'curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash',
            items: [
              '命令来自 Nous Research 官方仓库',
              '安装过程会下载依赖，网络慢时需要等待',
              '安装完成后先不要急着配置网关或 MCP',
              '只追求先跑通一次普通对话'
            ]
          },
          {
            title: '刷新终端环境',
            description: '安装完成后让当前 shell 读取新的 PATH。不同 shell 使用不同命令。',
            code: 'source ~/.bashrc\n# 或者\nsource ~/.zshrc',
            items: [
              '也可以直接关闭终端再重新打开',
              '如果提示 hermes: command not found，优先检查 PATH 是否刷新',
              'WSL2 中的配置通常在 ~/.hermes'
            ]
          },
          {
            title: '确认 hermes 命令可用',
            description: '先确认命令能被终端识别，再进入模型配置。',
            code: 'hermes --version\nhermes doctor',
            items: [
              'hermes --version 用来确认命令可执行',
              'hermes doctor 用来检查配置、依赖和环境问题',
              'doctor 报错时先按提示修复，不要继续叠加其它功能'
            ]
          }
        ],
        tips: [
          '第一次安装只追求能打开 Hermes 并跑通一次普通对话。',
          '服务器或无 sudo 环境安装时，浏览器相关系统依赖可能需要管理员单独处理。'
        ]
      },
      {
        title: 'Windows 原生安装方式',
        content: '如果你不想使用 WSL2，可以尝试官方 Windows PowerShell 安装器。官方说明里 Windows 原生仍是 early beta，因此本教程建议把它作为可选路径。',
        steps: [
          {
            title: '在 PowerShell 里运行安装器',
            description: '打开 PowerShell 或 Windows Terminal，执行官方 Windows 安装命令。',
            image: '/images/tutorial/hermes-agent-install.png',
            code: 'irm https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.ps1 | iex',
            items: [
              '默认不需要管理员权限',
              '安装目录通常在 %LOCALAPPDATA%\\hermes',
              '安装器会把 hermes 加到用户 PATH',
              '安装完成后必须重新打开终端'
            ],
            warning: 'Windows 原生路径还在 early beta。如果遇到路径、编码、子进程或 dashboard 终端面板问题，优先改用 WSL2。'
          },
          {
            title: '重新打开终端并验证',
            description: '新开 PowerShell 后运行版本和健康检查命令。',
            code: 'hermes --version\nhermes doctor',
            items: [
              '如果找不到命令，检查用户 PATH 是否生效',
              '如果 doctor 提示缺少配置，继续运行 hermes setup 或 hermes model',
              '如果中文输出或路径异常，先尝试 WSL2 版本'
            ]
          }
        ],
        tips: [
          'WSL2 与 Windows 原生安装的数据目录不同，切换路径时不要混用配置文件。',
          '需要更像 Linux 的终端行为时，WSL2 更适合长期使用。'
        ]
      },
      {
        title: '配置模型提供商',
        content: '安装成功不代表 Hermes 已经能工作。你还需要配置一个模型提供商，并确认它能完成普通对话。',
        steps: [
          {
            title: '进入模型配置向导',
            description: 'Hermes 官方建议使用 hermes model 选择 LLM provider 和模型。',
            image: '/images/tutorial/hermes-agent-model.png',
            code: 'hermes model',
            items: [
              '只先配置一个你最确定能用的 provider',
              '按向导填写 API Key、Base URL 或 OAuth 登录',
              '确认模型名称没有拼写错误',
              '本地或自托管模型要确认 OpenAI-compatible 接口是否真实可用'
            ]
          },
          {
            title: '完整向导配置',
            description: '如果你不确定该配置哪些项，可以运行完整 setup 向导。',
            code: 'hermes setup',
            items: [
              'setup 会串起模型、工具和其它基础配置',
              '首次使用建议跟着向导走',
              '已经明确 provider 时，hermes model 更直接',
              '配置失败后先回到 hermes model，不要反复手改配置文件'
            ]
          },
          {
            title: '先做一次普通对话',
            description: '模型配置完成后，先发一个最小测试请求。',
            code: 'hermes chat -q "Say hello in one sentence."',
            items: [
              '能正常回复，说明模型和认证基本可用',
              '不能回复，先检查 Key、Base URL、模型名和额度',
              '不要在基础对话失败时继续配置 gateway、cron 或 MCP'
            ]
          }
        ],
        warnings: [
          '如果使用 OpenRouter、OpenAI、Anthropic 等付费服务，先确认额度和计费方式。',
          '本地模型需要足够上下文窗口；过小的上下文会影响多步骤工具调用。'
        ]
      },
      {
        title: '用 hermes doctor 做健康检查',
        content: 'Hermes Agent 的排错顺序应该很清楚：先 doctor，再 model，再 setup。这样可以避免把配置问题误判成工具问题。',
        steps: [
          {
            title: '运行诊断命令',
            description: 'doctor 会检查缺失依赖、配置项和常见环境问题。',
            image: '/images/tutorial/hermes-agent-doctor.png',
            code: 'hermes doctor',
            items: [
              '如果提示 API key not set，回到 hermes model 配置 provider',
              '如果提示依赖缺失，按 doctor 输出修复',
              '修复后再重新运行 doctor',
              'doctor 通过后再做真实任务'
            ]
          },
          {
            title: '按顺序恢复到可用状态',
            description: '遇到问题时建议按以下顺序排查。',
            code: 'hermes doctor\nhermes model\nhermes setup\nhermes sessions list\nhermes --continue',
            items: [
              '先排配置和依赖，再排会话问题',
              '先确认普通聊天可用，再接入消息平台',
              '切换 profile 后如果找不到旧会话，检查 sessions list',
              '多 provider fallback 不稳定时，先关闭复杂路由'
            ]
          }
        ],
        tips: [
          '最小闭环是：安装成功、模型配置成功、doctor 通过、普通聊天能回复。',
          '只有完成最小闭环后，再考虑浏览器工具、MCP、消息网关、Skills 和自动化任务。'
        ]
      },
      {
        title: '常见问题排查',
        content: '下面是新手最容易遇到的问题。排查时不要同时改很多项，每次只改一个变量并重新测试。',
        steps: [
          {
            title: 'hermes: command not found',
            description: '终端找不到 hermes 命令通常是 PATH 没刷新。',
            items: [
              '关闭终端重新打开',
              'Linux / macOS / WSL2 执行 source ~/.bashrc 或 source ~/.zshrc',
              'Windows 检查用户 PATH 是否包含 Hermes 安装目录',
              '仍然失败时重新运行官方安装器并观察输出'
            ]
          },
          {
            title: 'API key not set 或 401/403',
            description: '认证失败通常来自 Key 没填、Key 过期、额度不足或 provider 选错。',
            items: [
              '重新运行 hermes model',
              '确认 API Key 没有多余空格',
              '确认当前账号有该模型调用权限',
              '确认 Base URL 和 provider 对应'
            ]
          },
          {
            title: '模型名错误或自托管端点不兼容',
            description: '如果 endpoint 能访问但回复异常，通常是模型名、接口路径或上下文长度不匹配。',
            items: [
              '先用 provider 官方控制台或 curl 单独测试端点',
              '确认接口是 OpenAI-compatible 还是专有格式',
              '确认模型上下文长度足够',
              '关闭复杂 fallback，先跑通单模型'
            ]
          },
          {
            title: 'Windows 原生路径异常',
            description: 'Windows early beta 路径可能遇到编码、子进程或终端能力差异。',
            items: [
              '先重新打开 PowerShell',
              '确认安装目录在 %LOCALAPPDATA%\\hermes',
              '检查是否被安全软件拦截',
              '问题持续时改用 WSL2 安装路径'
            ]
          }
        ],
        tips: [
          '排错时先保留最简单的配置：一个 provider、一个模型、一个普通聊天请求。',
          '不要把 token、Key 或完整配置文件发到公开页面；需要求助时先脱敏。'
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
