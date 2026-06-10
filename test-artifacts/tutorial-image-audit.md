# 教程图片审计报告

**审计日期**: 2026-06-03
**审计范围**: `src/lib/api-config.ts` 中所有教程的图片覆盖情况

---

## 一、总览

| 状态 | 数量 | 教程 |
|------|------|------|
| ✅ 图片完整 | 8 | mimo, minimax, deepseek, zhipu, kimi, tencent, openclaw-feishu, claude-code |
| ⚠️ 图片复用 | 2 | aliyun（2 张复用 6 次）, claude-code（4 张各复用 2 次） |
| ⚠️ 图片不充分 | 2 | openai（6 步仅 1 张通用图）, hermes-agent（引用 9 张缺 5 张） |
| ❌ 纯文字 | 7 | doubao, claude, gemini, ccswitch, openclaw, claudian-obsidian, llm-wiki |

---

## 二、纯文字教程（无任何图片）

### 1. 字节豆包（doubao）— 6 步

| 步骤 | 标题 | 需要图片 |
|------|------|----------|
| 1 | 注册火山引擎账号 | 火山引擎官网注册/登录页面 |
| 2 | 进入火山方舟并开通服务 | 火山方舟控制台，模型服务页面 |
| 3 | 创建并保存 API Key | API Key 管理页面，创建密钥弹窗 |
| 4 | 配置环境变量并测试调用 | 终端运行 Python 脚本成功输出 |
| 5 | 选择模型与购买方式 | 模型列表和价格页面 |
| 6 | 查看用量并控制成本 | 费用中心/调用量统计页面 |

**提示词：**

```
// 步骤 1: 注册火山引擎账号
Prompt: "A clean screenshot mockup of a Chinese cloud platform registration page (火山引擎 Volcengine), showing a login form with phone number input, email option, and WeChat QR code scan option. Modern minimalist UI design, blue-white color scheme, Chinese interface text. The page title shows '火山引擎' logo. 1200x800px, clean UI screenshot style, no real user data."

// 步骤 2: 进入火山方舟并开通服务
Prompt: "A clean screenshot mockup of a Chinese cloud console dashboard (火山方舟/Ark), showing a left sidebar with navigation items like '模型服务', '推理接入点', 'API Key 管理', and a main content area with model cards including Doubao-Seed-1.6 and Seed-Code models. Modern dark-blue sidebar with white content area. 1200x800px, dashboard UI screenshot style."

// 步骤 3: 创建并保存 API Key
Prompt: "A clean screenshot mockup of an API Key management page, showing a modal dialog with '创建 API Key' title, a text input for naming the key, and a generated key string starting with 'ark-' partially masked. A copy button and warning text about saving the key. 1200x800px, clean UI screenshot style, blue accent color."

// 步骤 4: 配置环境变量并测试调用
Prompt: "A clean screenshot of a terminal window showing Python code execution. The terminal has a dark background with green/white text, showing 'pip install openai' completion, then 'python test_doubao.py' command, and output text '豆包大模型：你好！我是豆包...'. macOS-style terminal window with rounded corners. 1200x800px."

// 步骤 5: 选择模型与购买方式
Prompt: "A clean screenshot mockup of a cloud platform model selection page showing a table of AI models with columns for model name (Doubao-Seed-1.6, Seed-Code, etc.), capabilities (文本, 视觉, 语音), pricing per million tokens, and status badges. Clean table UI with alternating row colors. 1200x800px, dashboard style."

// 步骤 6: 查看用量并控制成本
Prompt: "A clean screenshot mockup of a cloud platform billing/usage dashboard showing token consumption charts, API call statistics with line graphs, budget alerts settings, and current balance display. Clean data visualization with blue and green accent colors. 1200x800px, analytics dashboard style."
```

---

### 2. Anthropic Claude（claude）— 10 步

| 步骤 | 标题 | 需要图片 |
|------|------|----------|
| 1 | 先读风险提示 | 封号风险警示页面 |
| 2 | 了解 Claude 三档订阅套餐 | Claude 定价页面 |
| 3 | 准备一：注册 Google 账号 | Google 注册页面 |
| 4 | 准备二：合适的网络环境 | 网络环境验证 |
| 5 | 准备三：选择支付方式 | 支付方式对比 |
| 6 | 路线一：官网直充 | Claude Plans 订阅页面 |
| 7 | 路线二：苹果手机内购 | App Store Claude 页面 |
| 8 | 路线三：API 按量购买 | Anthropic Console API Keys |
| 9 | 路线四：替代方案与总结 | 对比总结表 |
| 10 | (子步骤) | — |

**提示词（精选关键步骤）：**

```
// 步骤 1: 风险提示
Prompt: "A clean illustration showing a warning sign with a lock icon, representing account risk and ban prevention. Minimalist flat design, red and yellow warning colors on white background, with subtle shield and exclamation mark icons. No text, icon-only style. 800x450px."

// 步骤 2: 订阅套餐
Prompt: "A clean screenshot mockup of a SaaS pricing page showing three subscription tiers side by side: 'Pro $20/月', 'Max 5x $100/月', 'Max 20x $200/月'. Each tier card shows features, model access (Opus 4.8), and usage limits. Clean modern pricing page with a 'recommended' badge on the middle tier. Light purple accent color matching Claude brand. 1200x800px."

// 步骤 6: 官网直充 Claude Plans
Prompt: "A clean screenshot mockup of the Claude.ai interface showing the subscription upgrade page. Left sidebar with conversation list, main area showing 'Upgrade to Claude Pro' card with pricing ($20/月) and a Subscribe button. Claude's signature brown/tan color scheme. 1200x800px, clean UI screenshot style."

// 步骤 7: 苹果内购
Prompt: "A clean screenshot mockup of an iPhone screen showing the App Store page for 'Claude - AI Assistant' by Anthropic. The screen shows the app icon (orange circle), 'Get' button, rating stars, and a subscription option showing Claude Pro pricing. iPhone mockup with rounded corners. 400x800px, mobile screenshot style."

// 步骤 8: API Console
Prompt: "A clean screenshot mockup of the Anthropic Console (console.anthropic.com) showing the API Keys page. A 'Create Key' button, a list of existing keys with masked values (sk-ant-xxx...), and usage/billing sidebar. Dark-themed developer console UI. 1200x800px."
```

---

### 3. Google Gemini（gemini）— 9 步

| 步骤 | 标题 | 需要图片 |
|------|------|----------|
| 1 | 先看清订阅、API 和额度规则 | Gemini 定价概览 |
| 2 | 准备一：使用本人 Google 账号 | Google 账号页面 |
| 3 | 准备二：确认合规访问环境 | Gemini 网页端 |
| 4 | 准备三：选择支付方式 | 支付方式 |
| 5 | 路线一：网页端订阅 Gemini Advanced | Gemini Advanced 订阅页 |
| 6 | 路线二：App 内订阅 | Gemini App 界面 |
| 7 | 路线三：创建 API Key | Google AI Studio |
| 8 | 路线四：替代方案 | 替代方案列表 |
| 9 | 最后提醒 | 提示信息 |

**提示词（精选关键步骤）：**

```
// 步骤 1: 订阅与 API 概览
Prompt: "A clean illustration showing two parallel paths: '网页订阅' (web subscription with a browser icon) and '开发者 API' (developer API with a code bracket icon). Minimalist flat design, Google brand colors (blue, red, yellow, green), connected by a dotted line. 800x450px, infographic style."

// 步骤 5: Gemini Advanced 订阅
Prompt: "A clean screenshot mockup of the Gemini web interface (gemini.google.com) showing the upgrade to Gemini Advanced page. The page shows 'Gemini Advanced' branding, pricing at $19.99/month, Google One AI Premium benefits, and an upgrade button. Google's clean white-blue design language. 1200x800px."

// 步骤 7: Google AI Studio API Key
Prompt: "A clean screenshot mockup of Google AI Studio (aistudio.google.com) showing the API Key creation page. A 'Create API Key' button, a dropdown for selecting Google Cloud project, and a list of existing API keys. Clean Material Design interface with Google blue accent. 1200x800px."
```

---

### 4. CC Switch（ccswitch）— 5 节

| 节 | 标题 | 需要图片 |
|----|------|----------|
| 1 | CC Switch 是什么 | 工具概览界面 |
| 2 | 下载与安装 | GitHub Releases 页面 |
| 3 | 添加 API 供应商 | CC Switch 供应商配置界面 |
| 4 | 在 AI 工具里验证 | Claude Code + CC Switch 联动 |
| 5 | 常见问题 | 错误提示截图 |

**提示词：**

```
// 节 1: CC Switch 概览
Prompt: "A clean screenshot mockup of a cross-platform desktop application showing a modern settings panel for managing AI coding tool configurations. The UI has a left sidebar with tool tabs (Claude Code, Codex, Gemini CLI, OpenCode), a main area showing provider cards (DeepSeek, OpenAI, Kimi) with API key fields and model selectors, and a system tray icon indicator. Dark theme with purple accent colors. 1200x800px, desktop app UI screenshot style."

// 节 2: GitHub Releases 下载
Prompt: "A clean screenshot mockup of a GitHub Releases page showing version 1.2.0 with release notes, and an Assets section with download links: CC-Switch-1.2.0-Windows.msi, CC-Switch-1.2.0-macOS.dmg, CC-Switch-1.2.0-Linux.deb. Clean GitHub dark theme UI. 1200x800px."

// 节 3: 添加供应商
Prompt: "A clean screenshot mockup of a desktop application dialog showing 'Add Provider' form with fields for Provider Name (DeepSeek), API Endpoint (https://api.deepseek.com), API Key (masked), Model Name (deepseek-v4-flash), and Save/Cancel buttons. Clean modal dialog with blue accent. 800x600px, desktop app modal style."
```

---

### 5. OpenClaw 基础教程（openclaw）— 5 节

| 节 | 标题 | 需要图片 |
|----|------|----------|
| 1 | OpenClaw 简介 | 工具架构图 |
| 2 | 前置准备 | Node.js + Git 安装 |
| 3 | 配置环境变量 | 环境变量设置界面 |
| 4 | 安装 OpenClaw | 终端安装过程 |
| 5 | 验证与连接 | Gateway 仪表盘 |

**提示词：**

```
// 节 1: OpenClaw 架构
Prompt: "A clean architecture diagram showing OpenClaw platform components: a local Gateway service in the center, connected to AI models (Claude, GPT, GLM) on the left, Feishu/Lark messaging on the right, and a web dashboard at the bottom. Minimalist line-art style with lobster emoji icon, blue and orange accent colors. 800x450px, tech diagram style."

// 节 4: 安装 OpenClaw
Prompt: "A clean screenshot of a Git Bash terminal window (Windows) showing OpenClaw installation commands. Dark terminal background with green/white text, showing 'npm install -g openclaw', progress bar, and '✓ OpenClaw installed successfully' success message. Windows-style terminal with title bar. 1200x800px."

// 节 5: Gateway 仪表盘
Prompt: "A clean screenshot mockup of a web-based gateway dashboard showing service status (Running), connected AI model provider, active Feishu bot status, recent message logs, and system metrics. Clean dashboard UI with green status indicators and dark sidebar. 1200x800px."
```

---

### 6. Claudian Obsidian 插件（claudian-obsidian）— 7 节

| 节 | 标题 | 需要图片 |
|----|------|----------|
| 1 | 前提条件 | Claude Code 已安装 |
| 2 | 下载 Claudian 插件 | Obsidian 插件市场 |
| 3 | 放置插件文件 | 插件目录结构 |
| 4 | 配置 Claudian | 连接设置 |
| 5 | 配置 DeepSeek API | 环境变量设置 |
| 6 | 测试插件 | Obsidian 对话界面 |
| 7 | 常见问题 | 错误排查 |

**提示词：**

```
// 节 2: Obsidian 插件市场
Prompt: "A clean screenshot mockup of the Obsidian app showing the Community Plugins browser. The search bar contains 'Claudian', and a plugin card shows 'Claudian - Claude Code Bridge' with Install button, author info, and description. Obsidian's dark purple-gray theme. 1200x800px."

// 节 6: Obsidian 对话界面
Prompt: "A clean screenshot mockup of the Obsidian app with a sidebar panel showing a chat interface (Claudian plugin). The main area shows a markdown note, and the right sidebar shows a conversation thread with Claude Code responses, code blocks, and a text input at the bottom. Obsidian's dark theme with purple accents. 1200x800px."
```

---

### 7. LLM Wiki（llm-wiki）— 6 节

| 节 | 标题 | 需要图片 |
|----|------|----------|
| 1 | 技术架构 | 知识编译流水线 |
| 2 | 核心功能模块 | ingest/query/lint 流程 |
| 3 | 代码结构 | 目录结构 |
| 4 | 使用方法 | Obsidian 知识库视图 |
| 5 | 最新更新 | 功能更新 |
| 6 | 常见问题 | 排错截图 |

**提示词：**

```
// 节 1: 技术架构
Prompt: "A clean architecture diagram showing a knowledge compilation pipeline: '收件箱' (inbox) → '编译' (compile with AI) → '知识图谱' (knowledge graph with nodes and edges) → '查询' (query). Three layers shown: raw documents, compiled knowledge, and query interface. Clean line-art style, blue and green accent colors. 800x450px, tech diagram."

// 节 4: Obsidian 知识库视图
Prompt: "A clean screenshot mockup of the Obsidian app showing a knowledge base with graph view. Left sidebar shows folder structure (inbox/, compiled/, assets/), main area shows a markdown note with wiki links and embedded content, and the right panel shows the graph view with interconnected knowledge nodes. Obsidian's dark theme. 1200x800px."
```

---

## 三、图片复用教程

### 1. 通义千问（aliyun）— 2 张图复用 6 次

**现状**：
- `qwen-docx-1.png` → 步骤 1（准备阿里云账号）、步骤 2（开通百炼）、步骤 6（查看用量）
- `qwen-docx-2.png` → 步骤 3（创建 API Key）、步骤 4（配置调用）、步骤 5（选择模型）

**应补充的独立图片：**

```
// 步骤 2: 开通百炼/DashScope
Prompt: "A clean screenshot mockup of Alibaba Cloud (阿里云) console showing the 百炼 (Bailian) service activation page. A '开通服务' button, service agreement checkbox, and billing configuration panel. Alibaba Cloud's blue-white interface with Chinese text. 1200x800px."

// 步骤 4: 配置调用
Prompt: "A clean screenshot of a terminal window showing Python code execution for calling Qwen3.7-Max API. Dark terminal with output showing a successful response from the AI model. Clean monospace text with green success indicators. 1200x800px."

// 步骤 5: 选择模型
Prompt: "A clean screenshot mockup of Alibaba Cloud Bailian (百炼) model selection page showing a table of Qwen models: qwen3.7-max, qwen3.6-plus, qwen3.6-flash with pricing, capabilities, and recommended badges. Clean dashboard UI. 1200x800px."

// 步骤 6: 查看用量
Prompt: "A clean screenshot mockup of Alibaba Cloud billing dashboard showing API call statistics, token consumption chart, and cost breakdown for AI model usage. Line graphs and bar charts with blue accent colors. 1200x800px."
```

---

### 2. Claude Code + DeepSeek（claude-code）— 4 张图各复用 2 次

**复用情况**：
- `claude-code-deepseek-p05-01.png` → 步骤"执行安装命令" + 步骤"验证安装结果"
- `claude-code-deepseek-p10-01.png` → 步骤"打开 Claude Code 配置页" + 步骤"填写 DeepSeek API Key"
- `claude-code-deepseek-p11-01.png` → 步骤"测试 CC Switch 连接状态" + 步骤"重新打开终端启动 Claude Code"
- `claude-code-deepseek-p12-01.png` → 步骤"提出简单问题测试响应" + 步骤"查看 CC Switch 详细教程"

**建议**：复用程度可接受（同一操作的不同子步骤），但如果要提升视觉体验，可以为被复用步骤补充差异化截图。

---

## 四、图片不充分教程

### 1. OpenAI（openai）— 6 步仅 1 张通用 Unsplash 图

**现状**：步骤 5 "用 Python 调用官方 GPT-5.5" 使用了一张通用的 Unsplash AI 主题图片，其余 5 步无图片。

**应补充的图片：**

```
// 步骤 1: 准备 OpenAI Platform 账号
Prompt: "A clean screenshot mockup of the OpenAI Platform (platform.openai.com) login page showing email/Google/Microsoft sign-in options, with the OpenAI logo and 'Welcome to OpenAI' heading. Clean white background with green accent. 1200x800px."

// 步骤 2: 开通 Billing
Prompt: "A clean screenshot mockup of OpenAI Platform Billing page showing payment method section, current balance, usage limit settings, and budget alert configuration. Clean dashboard with green and gray tones. 1200x800px."

// 步骤 3: 创建 API Key
Prompt: "A clean screenshot mockup of OpenAI Platform API Keys page showing 'Create new secret key' button, a list of existing keys with masked sk-xxx values, key name labels, and created dates. Clean developer console UI with green accents. 1200x800px."

// 步骤 4: 环境变量与 SDK
Prompt: "A clean screenshot of a terminal showing 'pip install openai python-dotenv' completion, followed by a .env file content showing 'OPENAI_API_KEY=sk-xxxxx'. Split view with terminal on left and code editor on right. Dark theme. 1200x800px."

// 步骤 6: 选择模型与控制成本
Prompt: "A clean screenshot mockup of OpenAI Platform Models page showing a table of available models: GPT-5.5, GPT-5.5 Pro, with pricing per million tokens, context window sizes, and capability badges. Clean table UI with green accents. 1200x800px."
```

---

### 2. Hermes Agent（hermes-agent）— 引用 9 张图，实际只有 4 张

**缺失的 5 张图片：**

| 文件名 | 对应步骤 | 提示词 |
|--------|----------|--------|
| hermes-agent-prereq.png | 前置检查 | `"A clean screenshot of a terminal window showing system prerequisite checks: node -v showing v22.x.x, git --version, python3 --version. All checks passing with green checkmarks. Dark terminal theme. 1200x800px."` |
| hermes-agent-pip.png | pip 安装 | `"A clean screenshot of a terminal window showing 'pip install hermes-agent' installation progress with download bars and 'Successfully installed hermes-agent-x.x.x' completion message. Dark terminal theme. 1200x800px."` |
| hermes-agent-install-windows.png | Windows 安装 | `"A clean screenshot of a Windows PowerShell window showing the Hermes Agent installer execution with progress bars and 'Installation complete' success message. Blue PowerShell theme. 1200x800px."` |
| hermes-agent-desktop.png | 桌面安装包 | `"A clean screenshot mockup of a desktop application showing the Hermes Agent installer wizard with welcome screen, license agreement, install location selection, and Install button. Clean Windows installer UI style. 800x600px."` |
| hermes-agent-portal.png | Nous Portal | `"A clean screenshot mockup of the Nous Portal web interface showing model provider configuration, API key input field, model selection dropdown, and a 'Test Connection' button. Clean dashboard UI with orange and dark accents. 1200x800px."` |

---

## 五、统计汇总

| 类别 | 数量 | 需要补充的图片数 |
|------|------|-----------------|
| 纯文字教程 | 7 | 约 40+ 张 |
| 图片复用 | 2 | 约 4 张 |
| 图片不充分 | 2 | 约 10 张 |
| **合计需补充** | **11** | **约 54+ 张** |

---

## 六、优先级建议

| 优先级 | 教程 | 理由 |
|--------|------|------|
| P0 | doubao, claude, gemini | 高流量 API 教程，纯文字体验差 |
| P0 | openai | 国际知名 API，6 步仅 1 张通用图 |
| P1 | hermes-agent | 5 张图缺失，页面会显示破图 |
| P1 | aliyun | 2 张图复用 6 次，视觉单调 |
| P2 | ccswitch | 推荐工具，纯文字降低说服力 |
| P2 | openclaw | 基础教程无图，飞书版有图 |
| P2 | claudian-obsidian | 插件教程需要界面截图 |
| P3 | llm-wiki | 技术深度教程，图文需求较低 |
