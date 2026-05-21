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

### 2026-05-17

Deployment scope for this push:

- Add Hermes Agent tutorial data in `src/lib/api-config.ts`.
- Add required Hermes Agent tutorial images: `public/images/tutorial/hermes-agent-*.png`.
- Improve homepage search suggestion dismissal, mobile menu dismissal, and theme toggle tap target size.
- Update search aliases and tutorial updated-at metadata in `src/lib/fuzzy-search.ts` and `src/lib/content-updates.ts`.
- Update `.gitignore` to ignore local `.coze`.

Explicitly excluded from this commit:

- `.claude/`
- `docs/seo-longtail-pages.md`
- `scripts/test-fuzzy-search.mjs`
- `src/app/local-deploy/page.tsx`: local working copy has encoding damage, so it is excluded to avoid shipping corrupted content.

Verification completed:

```bash
pnpm exec tsc -p tsconfig.json --noEmit  # passed
pnpm exec eslint  # passed
pnpm exec next build  # passed
pnpm exec tsup src/server.ts --format cjs --platform node --target node20 --outDir dist --no-splitting --no-minify  # passed
```

### 2026-05-17 Container deployment command cleanup

Deployment scope:

- Add `scripts/deploy-container.sh` so the production container startup command can delegate deploy/build/start logic to a versioned repository script.
- Keep `/app/node_modules`, pnpm store, env files, and logs while replacing source files from GitHub.
- Preserve the existing production behavior: pull `main`, build with pnpm, then start `node dist/server.js` with `COZE_PROJECT_ENV=PROD`.

Recommended container command after this script is deployed:

```bash
bash -lc 'if [ -f /app/scripts/deploy-container.sh ]; then bash /app/scripts/deploy-container.sh; else rm -rf /tmp/apiuspro-bootstrap && git clone --depth 1 --branch main https://github.com/hhkb-ai/apiuspro.git /tmp/apiuspro-bootstrap && SOURCE_DIR=/tmp/apiuspro-bootstrap bash /tmp/apiuspro-bootstrap/scripts/deploy-container.sh; fi'
```

Explicitly excluded from this commit:

- `.claude/`
- `docs/seo-longtail-pages.md`
- `scripts/test-fuzzy-search.mjs`
- `src/app/local-deploy/page.tsx`

Verification to complete before push:

```bash
pnpm exec tsc -p tsconfig.json --noEmit
pnpm exec eslint
pnpm exec next build
```

### 2026-05-19 Tutorial article layout trials and preview helper

Deployment scope for this push:

- Add reusable long-form tutorial article components under `src/components/content/`.
- Apply the article-style layout to `/app/ccswitch` and `/app/openclaw-feishu` through targeted route branches in `src/app/app/[id]/page.tsx`.
- Rewrite the OpenAI tutorial data in `src/lib/api-config.ts` from ChatGPT subscription-oriented copy to API purchase, Billing, API Key, first-call, and troubleshooting flow.
- Keep `/tutorial/openai` on the same standard tutorial layout used by `/tutorial/deepseek`.
- Preserve OpenClaw Feishu source screenshots and existing tutorial data while rendering the page with a centered narrow reading column, BLUF summary, overview card, collapsible contents, step cards, responsive images, and scrollable code blocks.
- Include previously requested homepage search/layout updates, API review conclusion updates, and model scoring data updates in `src/app/home-client.tsx`, `src/app/api-review/page.tsx`, `src/app/tutorial/page.tsx`, and `src/lib/review-config.ts`.
- Add `scripts/quick-preview.mjs` and package scripts for faster local preview on port 5000.
- Ignore `.codex-preview/` local preview runtime artifacts.

Explicitly excluded from this commit:

- `.claude/`
- `.codex-video-analysis/`
- `CLAUDE.md`
- `docs/seo-longtail-pages.md`
- `scripts/test-fuzzy-search.mjs`
- `src/app/local-deploy/page.tsx`: local working copy is still excluded because it has known encoding damage and is unrelated to this deployment.

Validation notes:

- User requested deployment after previewing local pages.
- Spot checks already completed during editing: `/app/openclaw-feishu`, `/app/ccswitch`, `/tutorial/openai`, and `/tutorial/deepseek` returned HTTP 200 from the local preview server.
- Full local checks were intentionally not rerun in this deployment step to follow the user's low-token deployment preference.

### 2026-05-20 Homepage purchase tutorial recommendations

Deployment scope for this push:

- Replace the homepage recommendation panel in `src/app/home-client.tsx` with direct links to popular API purchase tutorials.
- Keep homepage category entry card layout and alignment changes already present in the working copy.
- Leave the ignored local preview page outside the commit.

Explicitly excluded from this commit:

- `.claude/`
- `.codex-video-analysis/`
- `CLAUDE.md`
- `docs/seo-longtail-pages.md`
- `index.html`
- `rollback-backups/`
- `scripts/test-fuzzy-search.mjs`
- `skills/`
- `src/components/content/ClaudianObsidianContentPage.tsx`

Verification completed:

```bash
.\node_modules\.bin\tsc.CMD -p tsconfig.json --noEmit  # passed
.\node_modules\.bin\eslint.CMD src/app/home-client.tsx src/app/preview-home/page.tsx  # passed
.\node_modules\.bin\next.CMD build  # passed
.\node_modules\.bin\tsup.CMD src/server.ts --format cjs --platform node --target node20 --outDir dist --no-splitting --no-minify  # passed
```

Note: `pnpm` was not available in PATH in this shell, so the equivalent project-local binaries were used. No `npm` or `yarn` commands were run.

### 2026-05-20 Homepage tutorial list expansion and row alignment

Deployment scope for this push:

- Expand the homepage "热门购买教程" panel in `src/app/home-client.tsx` so OpenAI GPT, Anthropic Claude, Google Gemini, and the remaining available purchase tutorials are included instead of limiting the list to five items.
- Keep DeepSeek first, then show the tutorial providers in a stable priority order.
- Make the desktop tutorial list rows flex-fill the panel body so the internal row heights align evenly inside the right content card.

Explicitly excluded from this commit:

- `.claude/`
- `.codex-video-analysis/`
- `CLAUDE.md`
- `docs/seo-longtail-pages.md`
- `index.html`
- `rollback-backups/`
- `scripts/test-fuzzy-search.mjs`
- `skills/`
- `src/components/content/ClaudianObsidianContentPage.tsx`

Verification completed:

```bash
.\node_modules\.bin\eslint.CMD src/app/home-client.tsx  # passed
.\node_modules\.bin\tsc.CMD -p tsconfig.json --noEmit  # passed
.\node_modules\.bin\next.CMD build  # passed
.\node_modules\.bin\tsup.CMD src/server.ts --format cjs --platform node --target node20 --outDir dist --no-splitting --no-minify  # passed
```

SEO/deployment impact:

- Homepage internal tutorial links changed only; no route, metadata, sitemap, or robots changes.
- `pnpm` was still unavailable in PATH in this shell, so the equivalent project-local binaries were used. No `npm` or `yarn` commands were run.

### 2026-05-21 Content summary and metadata refinement

Deployment scope for this push:

- Add mobile-collapsed summary cards and preserve desktop full summary blocks across tutorial, app, API review, cloud API, FAQ, use-case, and error detail/list pages.
- Add `/app` overview, mobile directory, and quick configuration examples while keeping existing app tutorial routes and content data.
- Improve API quick conclusion card mobile behavior and dark-mode text contrast.
- Refine selected SEO descriptions and IndexNow submission logging/priority URLs.

Explicitly excluded from this commit:

- `.claude/`
- `.codex-video-analysis/`
- `CLAUDE.md`
- `docs/seo-longtail-pages.md`
- `index.html`
- `rollback-backups/`
- `scripts/test-fuzzy-search.mjs`
- `skills/`
- `src/components/content/ClaudianObsidianContentPage.tsx`

Verification completed:

```bash
.\node_modules\.bin\eslint.CMD -- src/app/api-review/[slug]/page.tsx src/app/api-review/page.tsx src/app/app/[id]/page.tsx src/app/app/page.tsx src/app/cloud-api/page.tsx src/app/error/[id]/page.tsx src/app/faq/page.tsx src/app/tutorial/[id]/page.tsx src/app/tutorial/page.tsx src/app/use-case/[id]/page.tsx src/app/use-case/page.tsx src/components/api/QuickConclusionCard.tsx  # passed
.\node_modules\.bin\eslint.CMD -- scripts/submit-indexnow.mjs src/app/error/page.tsx  # passed
.\node_modules\.bin\tsc.CMD -p tsconfig.json --noEmit  # passed
.\node_modules\.bin\next.CMD build  # passed
```

Browser verification:

- Playwright production-mode smoke check passed at 390px mobile and 1366px desktop for `/app`, `/app/claude-code`, `/tutorial`, `/tutorial/deepseek`, `/cloud-api`, `/api-review`, `/api-review/gpt-5.5`, `/api/deepseek`, `/use-case`, `/use-case/coding`, `/error/401-unauthorized`, and `/faq`.
- Checks covered horizontal overflow, mobile collapsed summary visibility, desktop summary hiding, image overflow, and code block page overflow.

SEO/deployment impact:

- No route removals or structured data removals.
- Metadata descriptions were expanded for content clarity; sitemap and robots were not changed.
- Project-local binaries were used because `pnpm` was not available in PATH. No `npm` or `yarn` commands were run.

### 2026-05-21 Homepage tutorial recommendation refinement

Commit scope:

- Show 8 featured purchase tutorials on the homepage with DeepSeek ranked first.
- Keep the larger homepage tutorial card treatment and remove the duplicate secondary hot tutorial section.
- Refine the Gemini purchase tutorial copy for safer official-account, payment, API Key, and quota guidance.
- Improve code comment rendering by removing italic styling from app tutorial code comments and related content article styles.

Explicitly excluded from this commit:

- `next-env.d.ts` local Next generated reference change.
- `.claude/`
- `.codex-video-analysis/`
- `CLAUDE.md`
- `docs/seo-longtail-pages.md`
- `index.html`
- `rollback-backups/`
- `scripts/test-fuzzy-search.mjs`
- `skills/`
- `src/components/content/ClaudianObsidianContentPage.tsx`

Verification completed:

```bash
.\node_modules\.bin\tsc.cmd -p tsconfig.json --noEmit  # passed
.\node_modules\.bin\next.cmd build  # passed
```

SEO/deployment impact:

- Homepage internal recommendation layout changed only; no route, sitemap, robots, or structured data removal.
- Gemini tutorial copy changed within existing `/tutorial/gemini` content data.
- No deployment was performed in this step.
