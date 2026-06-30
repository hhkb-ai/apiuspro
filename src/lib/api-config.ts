import type { APIConfig } from './api-types';

export type { APIConfig, Tutorial, TutorialStep } from './api-types';
export { faqCategories } from './faq-categories';
export type { AppTutorial } from './app-tutorials';
export { appTutorials, getAppTutorialById } from './app-tutorials';

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
    id: 'minimax',
    name: 'MiniMax M3',
    desc: 'MiniMax M3 API 与 Token Plan 怎么买？2026 最新订阅、Credits、API Key 和 1M 上下文接入教程',
    url: 'https://platform.minimax.io/',
    free: 'Token Plan / Credits / Pay-as-you-go 以官方控制台为准',
    proxy: false,
    features: ['MiniMax-M3', '1M 上下文', 'Agent 编程', '原生多模态'],
    icon: '⚡',
    badge: { text: 'M3最新', type: 'warning' },
    tutorial: {
      title: 'MiniMax M3 订阅购买与 API Key 接入教程（2026最新）',
      subtitle: '从 Token Plan 订阅、Credits 充值、API Key 区分到 MiniMax-M3 首次调用的完整流程',
      steps: [
        {
          title: '确认 MiniMax M3 的购买方式',
          description: 'MiniMax 现在同时提供 Token Plan 订阅、Credits 预付余额和 Pay-as-you-go 按量计费。购买前先决定你要用哪一种 Key，避免把不同计费体系混在一起。',
          image: '/images/tutorial/minimax-m3-overview.png',
          items: [
            'Token Plan：适合个人开发者、小团队和 AI Coding 工具，按月获得共享额度',
            'Credits：预付余额，和 Token Plan 使用同一类 Subscription Key，可覆盖额度溢出',
            'Pay-as-you-go：标准 Open Platform API Key，按实际 token 或调用扣账户余额',
            'Token Plan Key 和 Pay-as-you-go API Key 不是同一个体系，不能混用'
          ],
          whereToClick: '先阅读官方 Pricing / Token Plan 页面，再决定订阅还是按量计费',
          expectedResult: '能分清 Subscription Key 与 Pay-as-you-go API Key 的用途',
          failureChecklist: ['如果工具提示鉴权失败，先检查当前填的是 Token Plan Key 还是 Pay-as-you-go API Key', '如果没有可用额度，确认 Token Plan 是否已购买或 Credits 是否已到账'],
          warning: 'MiniMax 的订阅、Credits 和 Pay-as-you-go 会随账号地区、活动和控制台展示变化，正式购买前以官方控制台为准。'
        },
        {
          title: '注册并登录 MiniMax 开放平台',
          description: '进入 MiniMax 开放平台后完成登录。中国大陆用户通常可使用手机号或微信登录，国际用户可使用邮箱登录。',
          image: '/images/tutorial/minimax-m3-login.png',
          items: [
            '访问 MiniMax 开放平台：https://platform.minimax.io/',
            '点击登录入口，选择手机号、邮箱或微信扫码登录',
            '登录后进入控制台，确认账号状态正常',
            '如页面语言或价格口径与你预期不同，先检查账号地区和控制台页面'
          ],
          whereToClick: '浏览器访问 platform.minimax.io → 登录',
          expectedResult: '进入 MiniMax 控制台，能看到 API、Billing 或 Token Plan 相关入口',
          failureChecklist: ['验证码是否能正常接收', '微信扫码是否完成确认', '登录后看不到控制台时尝试刷新或更换 Chrome/Edge']
        },
        {
          title: '订阅 Token Plan 或充值 Credits',
          description: '如果你主要用 M3 做编程 Agent、长上下文或多模态任务，优先看 Token Plan；如果只是临时补额度，可以看 Credits。',
          important: true,
          image: '/images/tutorial/minimax-m3-token-plan.png',
          items: [
            'Token Plan 入口：https://platform.minimax.io/subscribe/token-plan',
            '官方 M3 发布页给出的 2026-06-01 口径：Plus $20/月约 1.7B M3 tokens，Max $50/月约 5.1B，Ultra $120/月约 9.8B',
            '你提供的订阅教程里还记录了人民币区域口径：Plus 约 49 元/月、Max 约 119 元/月、Ultra 约 469 元/月',
            '订阅或充值后在 Billing / Token Plan 页面查看额度条、到期时间和可用资源',
            'MiniMax 官方文档说明，Token Plan 的文本、图像、语音、音乐等资源共享同一额度池'
          ],
          whereToClick: '控制台 → Billing / Token Plan → 选择 Plus、Max 或 Ultra → Subscribe / Purchase',
          expectedResult: '订阅状态显示为 active，控制台能看到可用额度或 Credits 余额',
          failureChecklist: ['支付失败时更换支付方式或检查网络', '支付后未生效可刷新页面或重新登录', '如 5-10 分钟仍未到账，保留支付凭证联系官方客服'],
          warning: '美元价格、人民币价格、token 额度和活动折扣可能因地区和时间不同而变化，页面写作时必须保留“以官方控制台为准”。'
        },
        {
          title: '获取正确的 Key',
          description: 'MiniMax 官方文档把 Pay-as-you-go API Key 和 Token Plan Subscription Key 分开。接入前先确认你的工具要用哪一种。',
          important: true,
          image: '/images/tutorial/minimax-m3-api-key.png',
          items: [
            'Pay-as-you-go：进入 API Keys 页面，点击 Create new secret key',
            'Token Plan：进入 Billing / Token Plan 页面，查看或复制 Subscription Key',
            'Token Plan Key 通常用于 OpenClaw、Claude Code、Cline、Codex 等 AI Coding 工具',
            'Pay-as-you-go API Key 用于标准 Open Platform API，按实际用量扣账户余额',
            '复制后立即保存到密码管理器或 .env 文件，不要发到聊天窗口或提交到 GitHub'
          ],
          whereToClick: 'Pay-as-you-go：API Keys → Create new secret key；Token Plan：Billing → Token Plan → Get API Key',
          expectedResult: '得到一串可复制的 Key，并明确它属于 Token Plan 还是 Pay-as-you-go',
          failureChecklist: ['Key 复制后是否保存', '工具里的 Base URL 是否和 Key 类型匹配', '如果调用 401/403，先换正确的 Key 类型再排查余额']
        },
        {
          title: '配置 MiniMax-M3 并首次调用',
          description: 'MiniMax 官方推荐 Anthropic SDK，同时也支持 OpenAI 兼容接入。M3 的官方模型名为 MiniMax-M3。',
          image: '/images/tutorial/minimax-m3-model-select.png',
          items: [
            'Anthropic 兼容 Base URL：https://api.minimax.io/anthropic',
            'OpenAI / Responses 兼容 Base URL：https://api.minimax.io/v1',
            '模型名填写 MiniMax-M3',
            'M3 支持最高 1,000,000 token 上下文，官方建议把 512K 以内作为常规长上下文区间',
            'M3 支持 thinking、工具调用、图像和视频输入；M2.7/M2.5/M2.1 主要支持文本和工具调用'
          ],
          whereToClick: '终端安装 anthropic，设置 ANTHROPIC_BASE_URL 和 ANTHROPIC_API_KEY 后运行测试脚本',
          expectedResult: '终端成功打印 MiniMax-M3 的文本回复，无鉴权或模型名错误',
          failureChecklist: ['确认模型名是 MiniMax-M3', '确认 ANTHROPIC_BASE_URL 为 https://api.minimax.io/anthropic', '确认 Key 仍有效且有额度', '如超过上下文或请求体限制，先缩短输入再试'],
          codeLanguage: 'python',
          code: `# pip install anthropic
# macOS/Linux:
# export ANTHROPIC_BASE_URL=https://api.minimax.io/anthropic
# export ANTHROPIC_API_KEY=你的_MINIMAX_KEY

import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="MiniMax-M3",
    max_tokens=1000,
    system="You are a helpful assistant.",
    messages=[
        {
            "role": "user",
            "content": [{"type": "text", "text": "你好，请用一句话介绍 MiniMax M3。"}],
        }
    ],
)

for block in message.content:
    if block.type == "text":
        print(block.text)`,
          codeExplanation: '使用 MiniMax 官方 Anthropic 兼容接口调用 MiniMax-M3。成功输出文本说明 Base URL、Key 和模型名配置正确。'
        },
        {
          title: '按 M3 价格和上下文长度控制成本',
          description: 'M3 的 API 价格会根据输入长度和服务等级变化。普通对话和大部分编程任务优先控制在 512K 输入以内。',
          image: '/images/tutorial/minimax-m3-pricing.png',
          imageFit: 'contain',
          items: [
            'MiniMax-M3 标准通道：上下文 ≤512K 时，输入 ¥2.1/百万 tokens、输出 ¥8.4/百万 tokens、缓存读取 ¥0.42/百万 tokens',
            'MiniMax-M3 标准通道：上下文 512K~1M 时，输入 ¥4.2/百万 tokens、输出 ¥16.8/百万 tokens、缓存读取 ¥0.84/百万 tokens；超过 512K tokens 的能力限时限量供应，如需使用请联系销售',
            'MiniMax-M2.7：输入 ¥2.1/百万 tokens、输出 ¥8.4/百万 tokens、缓存读取 ¥0.42/百万 tokens、缓存写入 ¥2.625/百万 tokens；MiniMax-M2.7-highspeed 输入 ¥4.2/百万 tokens、输出 ¥16.8/百万 tokens、缓存读取 ¥0.42/百万 tokens、缓存写入 ¥2.625/百万 tokens',
            'M3 可切换 thinking 开关；复杂 Agent/推理任务开启 thinking，低延迟对话和补全可关闭 thinking',
            '用量统计页面定期查看 token 消耗、额度条和 Credits 余额'
          ],
          whereToClick: '控制台 → Usage / Billing / Token Plan',
          expectedResult: '能看到本月用量、剩余额度和是否触发 Credits 或 Pay-as-you-go 扣费',
          failureChecklist: ['大仓库/长视频/超长文档是否触发 >512K 长上下文价格', '是否误用 Priority 通道', '是否把 Token Plan 额度用完后开始扣 Credits 或 PAYG 余额'],
          warning: 'M3 价格、折扣、长上下文开放状态和额度可能变化，请以 MiniMax 官方 Pricing 页面和控制台为准。'
        }
      ],
      tips: [
        '购买前先决定：Token Plan 用于个人/小团队固定额度，Pay-as-you-go 用于企业或按量接入',
        'MiniMax-M3 适合代码、Agent、长上下文、多模态输入和 AI Coding 工具',
        'Token Plan Key 和 Pay-as-you-go API Key 不要混用，出错时先检查 Key 类型',
        'M3 的 1M 上下文很适合仓库级分析，但超过 512K 输入可能触发更高价格',
        '如果你要接入 Codex、Claude Code、Cline、OpenClaw 等工具，优先看 MiniMax 官方的 AI Coding Tools 文档'
      ],
      warnings: [
        '不要在前端、公开仓库、截图或聊天记录中暴露 MiniMax Key',
        'MiniMax M3 发布初期价格、折扣、Key 类型和工具适配变化很快，正式采购前必须复查官方控制台'
      ],
      advantages: ['1M 上下文', 'Agent 编程能力强', '原生多模态', 'Token Plan 额度高'],
      estimatedTime: '约 10-15 分钟',
      prerequisites: ['MiniMax 账号', '邮箱/手机号/微信登录方式', '可用支付方式或企业账单方式'],
      successSign: '控制台显示 Token Plan / Credits / Pay-as-you-go 可用额度，MiniMax-M3 测试脚本成功输出回复',
      commonPitfall: '把 Token Plan Subscription Key 当作 Pay-as-you-go API Key，或把 PAYG Key 填进只支持 Token Plan 的 AI Coding 工具；另一个常见问题是超长输入超过 512K 后成本明显上升',
      securityReminder: 'Key 复制后只保存到密码管理器、环境变量或 .env 文件，不要写进前端代码、公开仓库或截图'
    }
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    desc: 'DeepSeek API 怎么买？2026 国内支付/充值教程，覆盖 deepseek-v4-flash、deepseek-v4-pro、1M 上下文与旧别名退役',
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
          image: '/images/tutorial/deepseek-docx-billing.png',
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
          image: '/images/tutorial/deepseek-docx-models-pricing.png',
          items: [
            'deepseek-v4-flash：官方 V4 Flash 模型，支持 1M 上下文、最高 384K 输出、思考/非思考双模式，适合实时对话、客服和高频调用',
            'deepseek-v4-pro：官方 V4 Pro 模型，支持 1M 上下文、最高 384K 输出、思考/非思考双模式，适合复杂代码、长文档、Agent 和技术问答',
            'deepseek-chat / deepseek-reasoner：旧兼容别名，当前分别路由到 deepseek-v4-flash 的非思考/思考模式，将在 2026-07-24 15:59 UTC 后完全退役',
            '官方人民币价格：deepseek-v4-flash 为缓存命中 0.02 元/百万输入、缓存未命中 1 元/百万输入、2 元/百万输出；deepseek-v4-pro 为缓存命中 0.025 元/百万输入、缓存未命中 3 元/百万输入、6 元/百万输出',
            '官方并发限制：deepseek-v4-flash 为 2500，deepseek-v4-pro 为 500；更高并发或限速细节以官方文档和控制台为准',
            '在控制台查看用量、余额和预算告警'
          ],
          whereToClick: '控制台 → 模型列表或文档页面',
          expectedResult: '页面显示 deepseek-v4-flash、deepseek-v4-pro，以及 deepseek-chat / deepseek-reasoner 兼容别名和退役时间说明',
          failureChecklist: ['确认当前使用的模型名称拼写正确', '在控制台查看用量是否正常累计'],
          warning: '模型名称、免费试用、价格和限流策略会随平台调整，正式使用前请以控制台和官方文档为准。'
        }
      ],
      tips: [
        '推荐用 .env 或环境变量保存 DEEPSEEK_API_KEY',
        'OpenAI SDK 兼容模式最适合迁移已有代码',
        '新项目优先使用 deepseek-v4-flash 或 deepseek-v4-pro，不要继续把 deepseek-chat / deepseek-reasoner 当作长期模型名',
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
      commonPitfall: '未完成实名认证导致无法创建密钥或充值；API Key 只显示一次忘记复制；新项目仍使用 deepseek-chat / deepseek-reasoner 旧别名导致后续迁移风险',
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
    desc: 'Claude 国内怎么订阅？覆盖 Opus 4.8、Sonnet 4.6、Haiku 4.5 与 1M 上下文',
    url: 'https://www.anthropic.com/',
    proxy: true,
    features: ['Opus 4.8', 'Sonnet 4.6', '1M上下文', '安全可靠'],
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
            'Claude Pro · $20/月（约¥145） — 可用 Opus 4.8，有月度用量上限，适合轻度使用',
            'Claude Max 5x · $100/月（约¥725） — 可用 Opus 4.8，使用额度约为 Pro 的 5 倍，适合重度依赖 AI 的专业人士',
            'Claude Max 20x · $200/月（约¥1,450） — 可用 Opus 4.8，使用额度约为 Pro 的 20 倍，适合团队或核心生产力'
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
            '验证通过后账号立即升级，在对话界面即可选择 Opus 4.8 模型'
          ],
          whereToClick: 'claude.ai → Log in → Continue with Google → 左下角头像 → Plans → Subscribe',
          expectedResult: '验证通过后账号立即升级，对话界面可选 Opus 4.8 模型',
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
          expectedResult: 'App 内显示已升级为 Pro，可选择 Opus 4.8 模型',
          failureChecklist: ['确认 Apple ID 为美区且有足够余额', 'App Store 订阅价格通常比官网贵约 30%']
        },
        {
          title: '路线三：API 按量购买（仅限开发者）',
          description: '不是程序员或没打算把 AI 嵌入到自己做的软件里，可以跳过本节。普通用户用订阅套餐就全包含了。',
          items: [
            'API = 程序向 Claude Opus 4.8 提问的"后门"，适合把 AI 嵌入自己的软件中',
            '按 Token 计费：Opus 4.8 常规调用输入 $5/百万 Token、输出 $25/百万 Token（约 ¥36/¥181）',
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
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "请为我创作一个科幻小说的开头。"}
    ]
)
print(message.content)`,
          codeExplanation: '使用 Anthropic 官方 Python SDK 调用 Claude Opus 4.8 模型，让它创作一个科幻小说开头并打印结果。替换 YOUR_API_KEY 为真实密钥后即可运行。',
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
          expectedResult: '支付完成，Claude 账号已升级，可使用 Opus 4.8',
          failureChecklist: ['代充平台是否承诺封号退款', '下单前是否搜索了平台评价', 'Pro($20/月，约¥145) 适合大多数人，先买一个月试试'],
          warning: 'Claude 封号是全球性问题，没有任何渠道能 100% 避免。保护资金的最佳方式是选择承诺封号退款的代充平台。'
        }
      ],
      tips: [
        'Claude Opus 4.8 常规调用输入 $5/百万 token、输出 $25/百万 token；fast mode 另按 $10/$50 计费',
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
      successSign: 'Claude 对话界面可选择 Opus 4.8 模型，或 API Key 创建成功并能完成代码调用',
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
