# API知识站 (apiuspro.cn)

## 项目概述
中文 AI API 资料站，帮助用户选购、接入和使用主流 AI API。内容覆盖 API 官网入口、购买教程、应用教程、场景推荐、测评对比和本地部署。

## 技术栈
- **框架**: Next.js (App Router) + React
- **语言**: TypeScript (strict mode, `@/*` → `./src/*`)
- **样式**: Tailwind CSS + shadcn/ui
- **包管理**: pnpm（必须用 pnpm，脚本里有 `only-allow pnpm` 检查）
- **服务端**: 自定义 `src/server.ts`，tsup 构建 CJS 产物到 `dist/`

## 开发命令
```
pnpm dev          # 开发（tsx watch src/server.ts）
pnpm build        # 构建
pnpm ts-check     # 类型检查（tsc --noEmit）
pnpm lint         # ESLint
```

## 项目结构
```
src/
├── app/                    # Next.js App Router 页面
│   ├── home-client.tsx     # 首页客户端组件（含桌面/移动双布局）
│   ├── tutorial/page.tsx   # 购买教程列表页
│   ├── api/[id]/           # API 详情页
│   ├── app/[id]/           # 应用教程详情页
│   ├── cloud-api/          # API 官网入口列表
│   ├── api-review/         # API 测评对比
│   ├── use-case/           # 场景推荐（coding, translation, ...）
│   ├── local-deploy/       # 本地部署教程
│   └── faq/                # 常见问题
├── lib/
│   ├── api-config.ts       # 核心数据：apiList, appTutorials, 类型定义
│   └── fuzzy-search.ts     # 模糊搜索：fuzzyScore, sortByFuzzyScore, 别名系统
└── components/             # 共享组件（shadcn/ui, 布局, SEO）
```

## 搜索系统架构

### 核心文件
- `src/lib/fuzzy-search.ts` — 搜索引擎
- `src/lib/api-config.ts` — 数据源（apiList, appTutorials）
- `src/app/home-client.tsx` — 首页搜索（useSearch hook）
- `src/app/tutorial/page.tsx` — 教程页搜索

### 数据源
| 数据源 | 类型 | 搜索字段 | 结果链接 |
|--------|------|----------|----------|
| `apiList` | API | id, name, desc, free, features | `/api/[id]` |
| `apiList.filter(tutorial)` | 购买教程 | id, name, tutorial.title, tutorial.subtitle, features | `/tutorial/[id]` |
| `appTutorials` | 应用教程 | id, name, desc, badge.text | `/app/[id]` |
| `pages`（硬编码） | 页面导航 | id, name, desc, tag | 各页面 URL |

### 搜索逻辑
1. **别名展开** (`expandQueryTerms`): 查询词通过 `aliasEntries` 展开为多个同义词。例如 `cc switch` → 匹配 `ccswitch`。
2. **模糊评分** (`fuzzyScore`): 精确匹配=100, 前缀=85, 包含=70, 子序列=45。
3. **结果排序** (`sortByFuzzyScore`): 按分数降序排列，0 分过滤。
4. **精确跳转**: 首页提交（Enter）时，优先检查 `appExactMatch`（appTutorials），再检查 `exactMatch`（apiList），阈值 >=85。

### 别名注册规则
在 `fuzzy-search.ts` 的 `aliasEntries` 数组中添加条目：
```ts
['canonical-id', ['alias1', 'alias2', '别名3']],
```
canonical-id 必须与 `apiList.id` 或 `appTutorials.id` 一致。

### 首页搜索 useSearch hook
- 桌面: `maxResults=8`，API 最多 4 个，教程最多 3 个，应用最多 3 个，页面最多 3 个
- 移动: `maxResults=6`，API 最多 3 个，教程最多 2 个，应用最多 2 个，页面最多 2 个
- 所有结果合并后统一截断到 maxResults

### 已知未覆盖的内容族
以下内容不在首页搜索索引中，可通过扩展 `pages` 数组补齐：
- `/use-case` 场景推荐（编程、翻译、客服、教育...）
- `/api-review` 测评对比
- `/faq` 常见问题

## 内容约定
- 页面分桌面 (`DesktopHome`) 和移动 (`MobileHome`) 两套布局，用 `md:` 断点切换
- 教程页 `/tutorial` 按"无需代理"/"需代理"分两栏，应用教程作为独立分组展示
- 所有卡片用 shadcn/ui 的 `Badge`, `Button`, `Input` 组件，保持现有 Tailwind 类名风格
- SEO 结构化数据用 `BreadcrumbSchema` 组件

## 注意事项
- 只用 pnpm，不要引入新依赖
- 修改搜索时优先在现有 `fuzzyScore` / `sortByFuzzyScore` 逻辑上补齐数据源
- `api-config.ts` 很大（3700+ 行），读取时用 offset/limit 分段
- 首页搜索的 `appMatches` 在桌面和移动端都会生效，不要加 `maxResults` 门控
- 提交跳转优先级: appExactMatch > exactMatch > suggestions[0]
