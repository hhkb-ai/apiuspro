# 维护日志

更新时间：2026-05-16

## 仓库信息

- GitHub 仓库：`https://github.com/hhkb-ai/apiuspro`
- 本地路径：`D:\projects`
- 当前远程：`origin -> git@github.com:hhkb-ai/apiuspro.git`
- 默认分支：`main`
- 包管理器：仅使用 `pnpm`

## 项目概览

这是 `apiuspro.cn` 的 Next.js 内容站，定位为 AI API 资料、选型、购买教程、测评、应用接入和本地部署指南。

核心技术栈：

- Next.js 16 App Router
- React 19
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui
- 自定义服务入口：`src/server.ts`

核心内容入口：

- 首页：`src/app/page.tsx`、`src/app/home-client.tsx`
- API 列表：`src/app/cloud-api/page.tsx`
- API 详情：`src/app/api/[id]/page.tsx`
- 购买教程：`src/app/tutorial/page.tsx`、`src/app/tutorial/[id]/page.tsx`
- API 测评：`src/app/api-review/page.tsx`、`src/app/api-review/[slug]/page.tsx`
- API 应用：`src/app/app/page.tsx`、`src/app/app/[id]/page.tsx`
- 场景推荐：`src/app/use-case/page.tsx`、`src/app/use-case/[id]/page.tsx`
- 错误解决：`src/app/error/page.tsx`、`src/app/error/[id]/page.tsx`

核心数据文件：

- API 与教程数据：`src/lib/api-config.ts`
- 测评数据与评分权重：`src/lib/review-config.ts`
- 场景数据：`src/lib/use-case-config.ts`
- 错误解决页数据：`src/lib/error-config.ts`
- TDK：`src/lib/tdk.ts`、`src/lib/tdk.json`
- Sitemap：`src/app/sitemap.ts`

## 推送前维护规则

每次准备推送前先更新本文件，记录：

- 本次改动目标
- 涉及页面或数据源
- 是否影响 sitemap、TDK、robots、公开静态资源
- 已执行的验证命令和结果
- 未纳入本次提交的本地脏文件

推荐验证顺序：

```bash
pnpm exec tsc -p tsconfig.json --noEmit
pnpm exec eslint <changed-files>
pnpm exec next build
git diff --stat
git status --short
```

推送约束：

- 不要在未确认 diff 范围前推送。
- 不要把无关脏文件混入提交。
- 不要使用 `npm` 或 `yarn`。
- 如果改动涉及前端布局，先提供桌面和移动端截图给用户确认。

## 变更记录

### 2026-05-16

本地已关联 GitHub 仓库 `hhkb-ai/apiuspro`，远程 `origin/main` 可访问。

本轮本地已有未推送页面改动：

- `src/app/home-client.tsx`：首页推荐排序、桌面搜索区与推荐栏对齐、移动端首页响应式优化。
- `src/app/api-review/page.tsx`：删除 API 测评页首屏重复统计卡片和“怎么选”入口，压缩结论区，让用户更快看到测评卡片主体。
- `src/app/api-review/page.tsx`：继续优化顶部结论，把“模型榜单式结论”改成“AI API 适合做什么 + 不同任务怎么选”的任务导向说明。
- `src/app/api-review/page.tsx`：按用户给定方案替换顶部结论，分为代码/推理、通用对话/内容创作、长文档/多模态、综合最强和使用策略。
- `src/app/cloud-api/page.tsx`、`src/app/tutorial/page.tsx`、`src/app/app/page.tsx`、`src/app/use-case/page.tsx`、`src/app/faq/page.tsx`：将首屏大块“适合谁 / 不适合谁”移动到页面末尾，顶部保留短结论，让列表、搜索、教程卡片更早出现。
- `src/app/cloud-api/page.tsx`、`src/app/tutorial/page.tsx`、`src/app/app/page.tsx`、`src/app/use-case/page.tsx`、`src/app/faq/page.tsx`：针对移动端重新排序，将导读卡片、检查清单、使用前准备等解释型板块下调，优先展示搜索、筛选、教程卡片、场景卡片或 FAQ 主体。

已执行验证：

```bash
pnpm exec tsc -p tsconfig.json --noEmit
pnpm exec eslint
pnpm exec next build
```

注意：

- 当前工作区还存在未跟踪文件：`.claude/`、`docs/seo-longtail-pages.md`、`scripts/test-fuzzy-search.mjs`。推送前需要确认是否属于本次提交范围。
- 本日志文件本身用于维护记录，推送前也应纳入 diff 审核。
