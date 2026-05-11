# API知识站 SEO 与体验优化方案

> 适用项目：`D:\projects`
> 站点域名：`https://apiuspro.cn`
> 技术栈：Next.js 16 App Router、React 19、TypeScript 5、Tailwind CSS 4、shadcn/ui
> 约束：不新增用户系统、不新增登录/评论/收藏等用户功能；优化通过现有页面、内容配置、SEO 元信息、结构化数据、脚本与部署流程完成。

## 1. 项目定位

### 1.1 当前主题

API知识站是面向中文用户的 AI API 学习、选型、购买和接入指南站。核心不是泛泛介绍 AI，而是解决用户在真实接入前后的具体问题：

- 去哪里打开官方入口；
- 哪些 API 国内可直连，哪些需要代理或国际支付；
- 怎么注册、认证、充值、创建 API Key；
- 不同模型/API 适合写代码、知识库、内容创作、客服、翻译、教育等哪些任务；
- 怎么把 API 接入 Claude Code、Codex、CC Switch、OpenClaw、Obsidian 等工具；
- 本地部署与云端 API 如何取舍。

### 1.2 目标用户

优先服务以下用户群体：

- **零基础个人用户**：搜索“DeepSeek API 怎么买”“通义千问 API Key 怎么拿”等问题，需要一步步教程。
- **开发者与独立站长**：需要快速比较 API 能力、价格、Base URL、SDK 接入方式。
- **国内 AI 工具用户**：关心国内直连、支付方式、免费额度、账号限制、可用性。
- **内容与知识工作者**：想知道不同 AI API 在文档分析、写作、翻译、知识库场景下怎么选。
- **小团队/企业试用者**：需要低成本试错、稳定性、调用限制、合规与数据安全提示。

### 1.3 站点亮点

- **路径明确**：从官网入口、购买教程、应用教程到场景推荐，路径完整。
- **可执行内容多**：当前已有 10 个 API、10 篇购买教程、9 篇测评、6 篇应用教程、6 个场景页。
- **SEO 基础完整**：已有 `sitemap.ts`、`robots.ts`、canonical、Open Graph、Twitter 卡片、JSON-LD 组件。
- **AI 爬虫友好**：教程和测评页已加入 BLUF 摘要，便于搜索引擎与 AI 摘要抽取。
- **可运营脚本**：已有 IndexNow 提交、爬虫日志分析、SEO pipeline dry-run 能力。

## 2. 当前 SEO 基础盘点

### 2.1 已覆盖的可索引页面

当前 sitemap 预期覆盖 49 个 URL：

| 页面类型 | 数量 | 路由 |
| --- | ---: | --- |
| 静态核心页 | 7 | `/`、`/cloud-api`、`/tutorial`、`/api-review`、`/app`、`/local-deploy`、`/faq` |
| API 详情页 | 10 | `/api/[id]` |
| API 购买教程 | 10 | `/tutorial/[id]` |
| API 测评页 | 9 | `/api-review/[slug]` |
| 应用教程页 | 6 | `/app/[id]` |
| 场景列表页 | 1 | `/use-case` |
| 场景详情页 | 6 | `/use-case/[id]` |

### 2.2 已有 SEO 机制

- `src/app/sitemap.ts`：动态生成 sitemap，包含 `lastModified`、`changeFrequency`、`priority`。
- `src/app/robots.ts`：允许全站抓取，并指向 `https://apiuspro.cn/sitemap.xml`。
- `src/app/layout.tsx`：设置全站 `metadataBase`、默认 metadata、全站结构化数据、站点验证标签、统计脚本。
- `src/components/seo/structured-data.tsx`：已有 `WebSiteSchema`、`OrganizationSchema`、`BreadcrumbSchema`、`ArticleSchema`、`TechArticleSchema`、`FAQSchema`、`ItemListSchema`、`HowToSchema`。
- 关键详情页已使用 canonical、Open Graph、Twitter、Breadcrumb、Article/TechArticle/HowTo 等结构化数据。
- `scripts/submit-indexnow.mjs`：可从 sitemap 读取 URL 并提交 IndexNow。
- `scripts/analyze-crawler-logs.mjs`：可分析 Googlebot、Bingbot、GPTBot、ClaudeBot 等爬虫访问与错误。
- `scripts/seo-full-pipeline.mjs`：可 dry-run 生成 SEO 元信息优化文件；当前项目没有真实 CMS 接口时，应作为“报表生成与人工复核工具”，不要执行自动部署。

### 2.3 已发现的风险点

- `sitemap.ts` 使用运行时 `new Date()` 作为所有页面的 `lastModified`，会导致每次构建所有 URL 都像“刚更新”，长期可能降低搜索引擎对更新时间的信任。建议改为内容级 `updatedAt`。
- 部分动态内容集中在配置文件，页面可 SSR/静态预渲染，但需要定期验证无 JavaScript 环境下主要正文是否存在。
- 当前没有 `/blog` 路由，后续提到“博客文章”时应映射到 `/tutorial/[id]`、`/api-review/[slug]`、`/app/[id]`、`/local-deploy`、`/use-case/[id]` 这些文章型页面。
- 搜索与推荐主要集中在首页，内容页之间的上下文链接还可以更系统化，提升抓取深度与用户继续浏览率。
- SEO pipeline 中的 CMS 部署步骤不适用于当前纯代码内容项目；如果没有 CMS API，应转成“生成 CSV → 人工/脚本映射到源码配置 → PR 审核 → 构建部署”的流程。

## 3. 页面级优化策略

### 3.1 首页 `/`

**目标关键词方向**

- AI API 选型
- AI API 购买教程
- 国内 AI API 推荐
- API 官网入口
- API Key 怎么申请
- API 接入指南

**优化动作**

- 保留首页作为全站入口，首屏继续强调“选型、购买、接入、本地部署”四件事。
- 在首屏下方增加更明确的“我应该点哪里”路径，不新增功能，只优化文案与链接：
  - 第一次接 API → `/cloud-api`
  - 已确定 API → `/tutorial`
  - 想比较模型 → `/api-review`
  - 想接入工具 → `/app`
  - 想本地部署 → `/local-deploy`
- 首页搜索建议里优先展示“API 详情 / 购买教程 / 应用教程 / 场景页”，并继续保持模糊搜索。
- 首页 ItemList 结构化数据应覆盖热门 API、购买教程、应用教程三类，而不是只覆盖部分列表。

**验收标准**

- 无 JavaScript 抓取时仍能看到主标题、核心介绍、主要入口链接。
- 搜索“deepsek”“通义key”“claude code”“本地部署”能返回合理结果。
- 首页核心 CTA 不依赖 JS 才可点击。

### 3.2 API 官网大全 `/cloud-api`

**目标关键词方向**

- AI API 官网大全
- 国内 AI API 官网入口
- OpenAI API 官网
- DeepSeek API 官网
- Claude API 官网
- 通义千问 API 官网
- 免费额度 AI API

**优化动作**

- 按“无需代理 / 需要代理 / 适合新手 / 适合开发者 / 免费额度”增加文字说明区块，帮助用户快速判断。
- 每张 API 卡片应明确显示：
  - 是否国内直连；
  - 是否有免费额度；
  - 适合场景；
  - “官网入口”“购买教程”“详细说明”三个路径。
- 给列表页增加 `ItemListSchema`，每个 item 指向 `/api/[id]`，官网外链只作为次级动作。

**验收标准**

- Google/Bing 抓取 HTML 中能看到所有 API 名称、描述、内链。
- 每个 API 至少有一个内链指向详情页或教程页。

### 3.3 API 详情页 `/api/[id]`

**目标关键词方向**

- `{API名称} API`
- `{API名称} API 官网入口`
- `{API名称} API 怎么买`
- `{API名称} API 免费额度`
- `{API名称} API Key`
- `{API名称} 国内能用吗`

**优化动作**

- 在 H1 下方增加固定格式“快速结论”区块：
  - 是否国内直连；
  - 是否适合新手；
  - 购买/接入前必须确认什么；
  - 推荐下一步链接。
- 补充 `ArticleSchema` 或 `WebPage` 类型结构化数据；当前详情页有 Breadcrumb，但可进一步表达正文页属性。
- 增加“常见问题”小节，并复用 `FAQSchema`：
  - `{API名称} API 国内可以访问吗？`
  - `{API名称} API Key 在哪里创建？`
  - `{API名称} API 适合什么场景？`
- 增强内链：
  - API 详情 → 对应购买教程；
  - API 详情 → 对应测评；
  - API 详情 → 相关场景页；
  - API 详情 → 同类型 API。

**验收标准**

- 每个 `/api/[id]` 都能在首屏回答“能不能用、怎么开始、下一步点哪里”。
- 结构化数据校验无 JSON-LD 语法错误。

### 3.4 购买教程 `/tutorial` 与 `/tutorial/[id]`

**目标关键词方向**

- AI API 购买教程
- `{API名称} 购买教程`
- `{API名称} 怎么充值`
- `{API名称} API Key 获取`
- `{API名称} 免费额度申请`
- `{API名称} OpenAI 兼容接口`

**优化动作**

- 列表页 `/tutorial` 按“无需代理 / 需要代理 / 支持国内支付 / 免费额度”组织内容。
- 详情页保留 BLUF 摘要，并把摘要固定在 H1 后 200 字以内。
- 每篇教程补齐统一模块：
  - 准备条件；
  - 注册/登录；
  - 实名/支付/免费额度；
  - 创建 API Key；
  - Base URL 与模型名；
  - 最小可运行调用示例；
  - 常见错误：401、403、404、429、余额不足、模型名错误；
  - 安全提醒：不要把 API Key 写进前端或公开仓库。
- 当前 `ARTICLE_DATE_PUBLISHED` 与 `ARTICLE_DATE_MODIFIED` 是统一常量，建议迁移到每个教程配置项，避免所有文章日期一致。
- 每篇教程增加面向 AI 摘要的“适合谁 / 不适合谁 / 下一步”三段短文本。

**验收标准**

- 每篇教程不依赖 JS 即可看到完整步骤文本。
- `HowToSchema` 中的步骤数量与页面实际步骤一致。
- 每个教程都至少有 3 个内部推荐链接。

### 3.5 API 测评 `/api-review` 与 `/api-review/[slug]`

**目标关键词方向**

- AI API 测评
- AI 模型性能对比
- `{模型名称} 测评`
- `{模型名称} 价格`
- `{模型名称} 适合写代码吗`
- `{模型A} 和 {模型B} 对比`

**优化动作**

- 列表页按用户意图分组：
  - 编程开发；
  - 知识库/长文档；
  - 内容创作；
  - 企业客服；
  - 教育学习。
- 详情页保留 BLUF 摘要，继续将 `tlDr` 放在页面靠前位置。
- 给测评页补充“结论先行”的对比表：
  - 最适合人群；
  - 不适合场景；
  - 成本等级；
  - 国内访问门槛；
  - 推荐替代方案。
- 测评内容涉及模型版本、价格和基准时，必须有明确“最后核对日期”，避免过时信息误导。
- 对价格和模型能力这类高变动内容，建议配置 `updatedAt` 和“需复核”标记。

**验收标准**

- 用户 30 秒内能判断该 API/模型是否适合自己。
- 搜索引擎摘要能抽到明确结论，而不是只抽到泛泛介绍。

### 3.6 应用教程 `/app` 与 `/app/[id]`

**目标关键词方向**

- API 应用教程
- Claude Code API 配置
- Codex API 配置
- CC Switch 教程
- OpenClaw 安装教程
- Obsidian AI 插件教程

**优化动作**

- 应用教程应突出“工具 + API 接入”的组合关键词，例如“Claude Code 接入 DeepSeek API”“CC Switch 配置 OpenAI 兼容 API”。
- 每篇应用教程补齐：
  - 准备项；
  - 配置路径；
  - API Key 安全保存方式；
  - Base URL 示例；
  - 验证命令；
  - 常见错误排查；
  - 推荐 API 组合。
- 当前 `/app/[id]/page.tsx` 是 client component，正文数据来自本地配置，页面仍可由 Next 预渲染，但应重点验证构建产物中正文是否在初始 HTML 内。
- 复制按钮、目录高亮等交互不能阻塞正文渲染。

**验收标准**

- 禁用 JS 后，教程主体仍可阅读。
- 每个应用教程都能从 `/app`、首页、相关购买教程进入。

### 3.7 场景页 `/use-case` 与 `/use-case/[id]`

**目标关键词方向**

- 写代码用哪个 AI API
- 个人知识库用什么 AI
- AI 内容创作用哪个 API
- AI 客服 API 推荐
- AI 翻译 API 推荐
- AI 教育辅导工具

**优化动作**

- 场景页是长尾关键词核心，应继续扩展“问题型标题”：
  - “写代码用哪个 AI API 更稳？”
  - “做知识库应该选 Claude、Kimi 还是 Gemini？”
  - “客服机器人优先看成本还是延迟？”
- 每个场景页增加“选择逻辑”而不是只给推荐列表：
  - 任务特征；
  - 模型能力指标；
  - 成本/速度/上下文权衡；
  - 推荐 API 排序；
  - 不推荐情况。
- 给场景页加 `FAQSchema` 或 `ItemListSchema`，突出推荐排序。

**验收标准**

- 每个场景页至少覆盖 8-10 个自然长尾词。
- 每个推荐 API 都链接到详情页和教程页。

### 3.8 本地部署 `/local-deploy`

**目标关键词方向**

- AI 大模型本地部署教程
- Ollama 部署教程
- Gemma 本地部署
- Qwen 本地部署
- 本地模型 API 服务
- 本地部署和云端 API 对比

**优化动作**

- 保留 HowTo 结构，增强“云端 API vs 本地部署”的决策表。
- 增加低配置电脑、普通笔记本、开发者工作站三类推荐路径。
- 明确本地部署后如何被 Claude Code、Codex、OpenCode 等工具调用。
- 为命令区保留复制与解释，但正文必须可静态抓取。

**验收标准**

- 用户能判断自己的电脑是否适合本地部署。
- 页面能自然引导到 `/app` 与相关工具教程。

### 3.9 FAQ `/faq`

**目标关键词方向**

- AI API 常见问题
- API Key 安全
- API 免费额度
- API 调用失败
- API 余额不足
- API 429 怎么办

**优化动作**

- 把 FAQ 分成“购买前 / 创建 Key / 调用错误 / 成本控制 / 安全合规 / 国内访问”。
- FAQ 的回答要短、明确、可直接被 AI 摘要引用。
- 把详情页常见问题沉淀到全站 FAQ，并从教程/详情页双向链接。

**验收标准**

- FAQ JSON-LD 校验通过。
- FAQ 页面能承接教程页未解决的问题，减少用户跳出。

## 4. 长尾关键词策略

### 4.1 关键词分层

| 层级 | 关键词类型 | 示例 | 落地页 |
| --- | --- | --- | --- |
| 核心词 | AI API、API 购买教程、API 测评 | AI API 选型、AI API 官网 | 首页、`/cloud-api` |
| 品牌词 | API 名称 + API/教程/价格 | DeepSeek API 怎么买 | `/api/[id]`、`/tutorial/[id]` |
| 问题词 | 怎么买、怎么申请、国内能用吗 | Claude API 国内怎么用 | 教程页、FAQ |
| 场景词 | 写代码、知识库、翻译、客服 | 写代码用哪个 AI API | `/use-case/[id]` |
| 工具词 | 工具名 + API 配置 | Claude Code 配置 DeepSeek API | `/app/[id]` |
| 对比词 | A vs B、哪个更好 | Claude 和 GPT 哪个适合写代码 | 测评页、场景页 |

### 4.2 每类页面的关键词写法

- **Title**：品牌词/问题词 + 明确收益，例如“DeepSeek API 购买教程：注册、充值、API Key 与首次调用”。
- **Description**：用 1 句话覆盖入口、步骤、费用/额度、适合人群。
- **H1**：只放主意图，不堆砌关键词。
- **首段**：前 150-200 字回答搜索意图，避免铺垫。
- **小标题**：使用用户会搜索的问题句，例如“DeepSeek API Key 在哪里创建？”。
- **FAQ**：每个答案 2-4 句话，避免营销口吻。

### 4.3 推荐优先补充的长尾词

- DeepSeek API 怎么买
- DeepSeek API Key 获取
- DeepSeek API 国内支付
- 通义千问 API 免费额度
- 通义千问 API Key 创建
- Claude API 国内怎么用
- Claude Code 配置 API
- Codex 配置 DeepSeek API
- CC Switch 配置教程
- OpenAI 兼容 API Base URL
- 写代码用哪个 AI API
- 做个人知识库用哪个 AI
- AI 客服 API 推荐
- AI 翻译 API 推荐
- Ollama 本地部署 API
- 本地大模型接入 Claude Code

## 5. AI 爬虫与搜索引擎抓取优化

### 5.1 无 JavaScript 可读性

必须定期验证以下页面在无 JS 或只看初始 HTML 时仍有主体内容：

- `/`
- `/cloud-api`
- `/tutorial`
- `/tutorial/deepseek`
- `/api-review/deepseek`
- `/app/ccswitch`
- `/local-deploy`
- `/use-case/coding`

建议命令：

```bash
corepack pnpm build
```

构建后使用抓取脚本或 `curl` 检查关键文本是否存在。重点不是页面能打开，而是 HTML 里是否能看到 H1、首段、步骤文本和内链。

### 5.2 结构化数据策略

- 全站：`WebSiteSchema`、`OrganizationSchema`。
- 列表页：`ItemListSchema`。
- 教程页：`TechArticleSchema` + `HowToSchema` + `BreadcrumbSchema`。
- 测评页：`ArticleSchema` + `BreadcrumbSchema`。
- FAQ 页：`FAQSchema` + `BreadcrumbSchema`。
- 场景页：建议补 `FAQSchema` 或 `ItemListSchema`。
- API 详情页：建议补 `ArticleSchema` 或 `WebPage` JSON-LD。

### 5.3 canonical/noindex 策略

- 当前正式页面都应自引用 canonical。
- `/preview-home` 这类预览页必须保留 `noindex`，且不进入 sitemap。
- 搜索结果页、带参数页、临时预览页不应被 sitemap 收录。
- 如果未来出现分页、标签页、搜索页，应默认 `noindex, follow`，除非有明确 SEO 价值。

### 5.4 robots 与 sitemap

当前 `robots.ts` 允许全站抓取并指向 sitemap，这是正确方向。后续重点不是放宽 robots，而是保证：

- sitemap 中只包含可公开访问的正式 URL；
- 每个 URL 都返回 200；
- canonical 与 sitemap URL 一致；
- `lastmod` 反映真实内容更新时间；
- 新增页面后自动进入 sitemap。

## 6. Core Web Vitals 与性能优化

### 6.1 LCP

重点页面：教程详情页、应用教程页、首页。

优化建议：

- 首屏尽量避免大图阻塞；教程截图使用懒加载，首图如非关键不设 priority。
- `/opengraph-image` 使用 Edge runtime 的构建警告目前不阻塞站点，但不要把它误认为页面构建失败。
- 首页首屏文案与 CTA 保持文本优先，避免依赖复杂客户端渲染。

### 6.2 INP

重点交互：搜索框、按钮、目录点击、复制代码。

优化建议：

- 搜索数据量当前较小，可继续客户端模糊搜索；后续 API/教程数量超过 200 时再考虑预构建索引。
- 搜索输入使用 `useMemo` 已合理；避免每次输入触发不必要的大组件渲染。
- 复制按钮失败时应有轻量 fallback，但不要引入重型依赖。

### 6.3 CLS

重点页面：教程截图多的页面。

优化建议：

- 所有 `next/image` 保持明确尺寸或固定比例容器。
- 徽章、提示框、目录区域避免加载后插入导致布局跳动。
- 统计脚本继续使用 `next/script`，不要直接在 JSX 里插入阻塞脚本。

## 7. 站内搜索与体验优化

### 7.1 搜索目标

当前用户主要会用搜索完成三类任务：

- 找 API：如“deepsek”“通义”“claude”；
- 找教程：如“api key”“充值”“购买”“base url”；
- 找工具：如“ccswitch”“codex”“obsidian”“openclaw”。

### 7.2 搜索优化方向

- 保留模糊搜索和别名扩展，避免只支持精确匹配。
- 增加同义词与错拼词：
  - `deepsek` → DeepSeek；
  - `qwen` → 通义千问；
  - `tongyi` → 通义千问；
  - `cc switch`、`ccswitch`；
  - `api key`、`apikey`、`密钥`；
  - `baseurl`、`base url`、`接口地址`。
- 搜索结果排序应优先：
  1. API 名称/ID 精确或高分模糊匹配；
  2. 对应购买教程；
  3. 应用教程；
  4. 场景页与 FAQ。
- 搜索无结果时，不只显示“无结果”，应给出热门入口：API 官网、购买教程、常见问题、本地部署。

### 7.3 按钮与链接行为

- 外链官网按钮继续使用 `target="_blank"` 和 `rel="noopener noreferrer"`。
- 站内主路径使用 `Link`，保证爬虫可发现。
- 教程页“访问官网”不能替代“下一步教程/相关教程”内链，否则会过早流失用户。
- 对移动端目录使用 `<details>` 是合理方案，简单、可访问、无额外依赖。

## 8. 内容扩展计划

### 8.1 第一优先级：补强现有 49 页

先不急着新建大量页面，优先把现有页面做到真正可用：

- 每个 API 详情页补“快速结论 + FAQ + 适合/不适合人群”。
- 每篇购买教程补“常见错误排查 + 安全提醒 + 最小调用示例”。
- 每篇测评补“推荐/不推荐 + 替代方案 + 最后核对日期”。
- 每个场景页补“选择逻辑 + 场景关键词 + 推荐排序理由”。

### 8.2 第二优先级：扩展对比型内容

对比型内容搜索意图强，适合从已有测评与场景页扩展：

- DeepSeek vs 通义千问：国内开发者怎么选；
- Claude vs GPT：写代码和长文档怎么选；
- Kimi vs Gemini：长文档和多模态怎么选；
- 国产 AI API 对比：DeepSeek、通义、豆包、混元、智谱；
- 免费额度 API 对比：新手低成本试用路线。

可先作为 `/api-review` 下的新测评页，避免新增博客系统。

### 8.3 第三优先级：工具接入专题

围绕现有 `/app` 路线扩展：

- Claude Code 接入 DeepSeek API；
- Codex 接入 OpenAI 兼容 API；
- CC Switch 管理多 API Key；
- Obsidian + AI API 知识库工作流；
- 本地 Ollama 接入 OpenAI 兼容工具。

## 9. 运营与监控流程

### 9.1 每次发布前检查

```bash
corepack pnpm lint
corepack pnpm ts-check
corepack pnpm build
```

如果只是文档变更，可不强制 build；涉及页面、metadata、sitemap、结构化数据时必须 build。

### 9.2 sitemap 与 IndexNow

发布后执行：

```bash
corepack pnpm submit:indexnow -- --dry-run
corepack pnpm submit:indexnow
```

如只更新少量页面，优先提交具体 URL：

```bash
corepack pnpm submit:indexnow -- https://apiuspro.cn/tutorial/deepseek
```

### 9.3 爬虫日志分析

服务器 access log 导出后执行：

```bash
corepack pnpm analyze:crawlers -- access.log
```

重点看：

- Googlebot Smartphone 是否访问文章型页面；
- Bingbot 是否抓取 sitemap 中的新 URL；
- GPTBot、ClaudeBot 是否访问教程与测评页；
- `/tutorial`、`/app`、`/api-review`、`/use-case` 抓取深度；
- 403、404、500 是否集中在文章型 URL。

### 9.4 Bing/Google 报表流程

当前项目没有 CMS，不应执行“自动部署到 CMS”。建议采用以下流程：

1. 从 Bing/Google 导出关键词与页面报表；
2. 放入 `inputs/KeywordReport.csv` 与 `inputs/PageTrafficReport.csv`；
3. 执行 dry-run：

```bash
corepack pnpm seo:pipeline -- --dry-run
```

4. 查看 `outputs/optimized_meta_30.csv`；
5. 人工筛选高价值建议；
6. 将选中的 title、description、H1、首段优化回源码配置；
7. 执行 lint、ts-check、build；
8. 提交代码、部署、IndexNow；
9. 14 天后复查 CTR 与排名。

## 10. 执行路线图

### P0：必须先做

- 将 `sitemap.ts` 的 `lastModified` 从统一 `new Date()` 改成内容级 `updatedAt`。
- 为 API 详情页补快速结论与 FAQ 结构化数据。
- 验证 `/app/[id]` 在构建 HTML 中是否包含主体正文。
- 建立发布前固定检查：`lint`、`ts-check`、`build`。

### P1：提升流量

- 补齐每篇教程的常见错误、API Key 安全、Base URL 与最小调用示例。
- 场景页扩展为长尾关键词承接页。
- API 测评页增加“适合/不适合/替代方案”决策表。
- 首页搜索同义词与错拼词继续扩展。

### P2：提升收录和 AI 摘要

- 给 `/api/[id]`、`/use-case/[id]` 补充结构化数据。
- 每篇文章型页面固定 BLUF 摘要格式。
- 为列表页增加更完整的 `ItemListSchema`。
- 每次更新后提交 IndexNow，并在 Bing/Google 工具中提交关键 URL。

### P3：长期运营

- 每月导出 Bing/Google 报表，筛选“高曝光低 CTR”页面优化标题与摘要。
- 每月跑爬虫日志分析，关注 AI 爬虫与搜索爬虫访问趋势。
- 每季度复核价格、模型名、免费额度、访问限制等易过期内容。
- 扩展对比型专题页，但每次只新增能解决真实搜索问题的页面。

## 11. 成功指标

### 技术指标

- `corepack pnpm lint` 通过；
- `corepack pnpm ts-check` 通过；
- `corepack pnpm build` 通过；
- sitemap URL 全部返回 200；
- 关键页面 canonical 自引用；
- JSON-LD 校验无语法错误；
- 主要文章页无 JS 也能看到正文。

### SEO 指标

- 低 CTR 高曝光关键词 CTR 14 天内有改善；
- Bing/Google 收录 URL 数稳定接近 sitemap 中正式 URL 数；
- 爬虫日志中 `/tutorial`、`/api-review`、`/app`、`/use-case` 有持续抓取；
- 404/500 不集中出现在文章型页面。

### 用户体验指标

- 首页搜索能容忍错拼、拼音、英文别名和中文关键词；
- 用户从首页到目标教程不超过 2 次点击；
- 教程页 30 秒内能判断“能不能用、怎么开始、出错怎么办”；
- 每个内容页都有明确下一步，不让用户读完后断路。

## 12. 下一步建议

建议按以下顺序实施，避免一次性改动过大：

1. 先改 `sitemap.ts` 与内容配置，加入真实 `updatedAt`。
2. 补 `/api/[id]` 的快速结论、FAQ 与结构化数据。
3. 对 10 篇 `/tutorial/[id]` 补统一“错误排查 + 安全提醒 + 首次调用验证”模块。
4. 验证无 JS 抓取与构建产物。
5. 提交 IndexNow，并在 14 天后用 Bing/Google 数据复查 CTR。
