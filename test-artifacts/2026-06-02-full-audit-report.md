# API知识站 全面功能与响应式测试报告

> 测试日期：2026-06-02  
> 测试方式：源码静态分析（VM 环境 pnpm 符号链接指向 Windows 路径，无法启动 dev server / 运行 lint / build；Chrome 扩展未连接，无法做浏览器视觉测试）

## 一、测试环境

- Node.js: 22.22.0 (VM 内)
- 项目框架: Next.js 16.1.1 + React 19.2.3 + Tailwind CSS 4
- 包管理: pnpm 9（仅在 Windows 宿主机可用）
- 端口: 5000（server.ts 自定义服务器）

## 二、实际运行状态

- **dev server**: 未能启动（VM 内 pnpm/node_modules 符号链接不可用）
- **lint / build**: 未能执行（同上原因）
- **浏览器测试**: Chrome 扩展未连接

## 三、源码级分析覆盖的路由

| 路由 | 布局组件 | 状态 |
|------|----------|------|
| `/` | HomeClient (桌面/移动双版本) | 已分析 |
| `/tutorial` | SidebarLayout + TutorialListContent | 已分析 |
| `/tutorial/[id]` | SidebarLayout + 详细教程页 | 已分析 |
| `/api/[id]` | SidebarLayout + API 详情 | 已分析 |
| `/app/[id]` | AppTutorialContent | 已分析 |
| `/cloud-api` | SidebarLayout + CloudApiContent | 已分析 |
| `/api-review` | SidebarLayout | 已分析 |
| `/use-case` | SidebarLayout | 已分析 |
| `/error` | SidebarLayout | 已分析 |
| `/learn` | SidebarLayout | 已分析 |
| `/faq` | SidebarLayout | 已分析 |
| `/local-deploy` | SidebarLayout | 已分析 |

## 四、PC 端响应式分析

### 断点策略
- **md (768px)**: 首页桌面/移动端切换
- **lg (1024px)**: SidebarLayout 侧边栏显示
- **xl**: TutorialListContent 双列卡片

### 1440x900（预期正常）
- 首页: Hero 区域 `lg:grid-cols-[7fr_5fr]` 两栏布局，max-w-7xl 居中
- 教程卡片: `md:grid-cols-4` 四列网格
- 用户入口: `md:grid-cols-3` 三列网格
- SidebarLayout: 左侧固定 256px 侧边栏，右侧内容区

### 1024x768（需关注）
- 首页: lg 断点触发，桌面版 Hero 两列显示
- SidebarLayout: 侧边栏刚好显示（lg: 1024px），内容区 `lg:ml-64`
- TutorialListContent: 教程卡片仍为 4 列（md 断点），可能偏紧

### 已确认的安全措施
- 全局 `overflow-x: hidden` + `max-width: 100vw`（globals.css 第 8-10 行）
- 所有元素 `min-width: 0`（globals.css 第 13 行）
- `.overflow-safe` 类防止图片/代码块溢出

## 五、移动端响应式分析

### 测试视口
390x844（iPhone 15）、375x667（iPhone SE）、430x932（iPhone 15 Pro Max）

### 首页移动端（预期正常）
- 顶部导航: 固定 h-16，logo + 菜单按钮 + 搜索图标 + 主题切换
- Hero: 单列，标题 `text-[26px]`，搜索栏全宽
- 教程水平滚动: `overflow-x-auto` 横向滑动卡片
- 底部导航: `fixed inset-x-0 bottom-0`，4 个图标（首页/教程/API/菜单）
- 安全区适配: `env(safe-area-inset-bottom)` 处理 iPhone 底部安全区
- 主内容底部留白: `pb-[calc(86px+env(safe-area-inset-bottom))]` 避免被底部导航遮挡
- 移动菜单: 底部弹出 sheet（z-50），带半透明遮罩

### SidebarLayout 移动端（预期正常）
- 无侧边栏，顶部固定 h-16 工具栏
- 内容区 `pt-16` 避开固定头部
- 菜单按钮打开全屏覆盖导航

### 已确认的安全措施
- 底部导航 `pb-[calc(0.5rem+env(safe-area-inset-bottom))]` 防遮挡
- 移动端搜索下拉 `max-h-[50vh] overflow-y-auto` 不会撑爆屏幕
- 移动端搜索有清除按钮（X 图标）

## 六、搜索栏分析

### 搜索入口
| 位置 | maxResults | 类型限制 |
|------|-----------|----------|
| 首页桌面搜索 | 8 | API:2, 教程:2, 应用:2, 学习:2, 测评:1, 错误:1, 场景:1, FAQ:1, 工具:1, 页面:1 |
| 首页移动搜索 | 6 | 同上（但更早截断） |
| 教程页搜索 | 无上限 | 仅搜索 apiList（独立于统一搜索） |

### 搜索行为
- 空关键词 → 不显示结果
- useDeferredValue 延迟计算，减少输入卡顿
- 点击建议 → 跳转到对应 href
- Enter 提交 → 优先精确匹配（阈值 >= 85），否则跳转第一条建议
- 精确匹配优先级: appTutorials > apiList > learnArticles > reviewDetails > errorSolutions > useCases

## 七、模糊搜索分析

### 评分规则（fuzzy-score.ts）
| 匹配类型 | 分数 | 条件 |
|----------|------|------|
| 精确匹配 | 100 | field === term |
| 前缀匹配 | 85 | field.startsWith(term) |
| 包含匹配 | 70 | field.includes(term) |
| 子序列匹配 | 45 | term.length >= 2 且是 field 的子序列 |

### 别名系统（17 组）
覆盖: openai/gpt/chatgpt, claude/anthropic/克劳德, deepseek/深度求索/ds, aliyun/通义千问/qwen/百炼, kimi/月之暗面, doubao/豆包/火山, gemini/google/谷歌, mimo/小米, ccswitch, claude-code, openclaw, hermes-agent, llm-wiki, local-deploy/ollama 等

### 搜索内容源（8 类 + 工具）
1. **API 列表** (apiSearchItems) — id, name, desc, free, features
2. **购买教程** (tutorialSearchItems) — id, name, title, subtitle, features
3. **应用教程** (appSearchItems) — id, name, desc, badge.text
4. **学习文章** (learnSearchItems) — slug, title, description, tags
5. **API 测评** (reviewSearchItems) — slug, name, tlDr, useCases
6. **错误解决方案** (errorSearchItems) — id, title, shortTitle, summary, affectedArea
7. **使用场景** (useCaseSearchItems) — id, name, description, keywords
8. **FAQ** (faqSearchItems) — q, a, category.title
9. **DeepSeek 费用计算器** (calculatorSearchItem) — 固定条目

## 八、发现的问题（按严重程度排序）

### 非阻断（代码级观察）

**P2 — 桌面搜索栏缺少清除按钮**
- 源码: `home-client.tsx` 第 187 行，清除按钮仅在 `isMobile` 时显示
- 影响: 桌面用户无法一键清空搜索，需手动全选删除
- 建议: 为桌面搜索也添加清除按钮

**P2 — 教程页搜索与首页搜索数据源不一致**
- TutorialListContent 使用 `sortByFuzzyScore` 仅搜索 apiList
- 首页 useSearch 使用 `searchAll` 搜索全部 8 类内容
- 影响: 同一关键词在教程页和首页得到不同结果

**P3 — SidebarLayout 在 1024px (lg 断点) 侧边栏与内容区可能偏紧**
- 侧边栏固定 w-64 (256px)，剩余宽度约 768px
- 教程列表网格在 xl 以下为单列，影响不大
- 详情页内容在 768px 宽度下可能需要横向滚动长表格/代码块

**P3 — 搜索建议下拉桌面端无类型分组标题**
- 移动端有 "搜索建议" 标题（第 209-212 行）
- 桌面端直接展示结果列表，无标题

### 信息级

**P4 — 深色模式已完整实现**
- globals.css 定义了完整的 `.dark` 变量
- ThemeToggle 组件已集成
- 教程页 badgeClass 已处理 dark: 前缀

**P4 — 未覆盖的搜索内容**
- CLAUDE.md 中提到 `/use-case`、`/api-review`、`/faq` 之前不在首页 pages 数组
- 当前 search-index.ts 已通过 useCaseSearchItems、reviewSearchItems、faqSearchItems 补齐

## 九、未覆盖风险

1. **未运行 lint/build**: 无法确认 TypeScript 类型错误、ESLint 警告、构建失败
2. **未运行浏览器视觉测试**: 无法确认实际渲染效果、主题切换、交互行为
3. **未验证深色模式实际渲染**: 仅确认 CSS 变量定义，未实际查看
4. **未验证图片加载**: public/ 目录下图片是否正确加载
5. **未验证 SEO**: sitemap.xml、robots.txt、结构化数据是否正确

## 十、建议优先修复项

1. 桌面搜索栏添加清除按钮（提升体验，改动小）
2. 统一搜索入口的数据源（教程页也用 searchAll）
3. 在 Windows 宿主机执行一次完整的 `pnpm ts-check && pnpm lint && pnpm build` 确认无构建问题
4. 连接 Chrome 扩展后做一次视觉回归测试
