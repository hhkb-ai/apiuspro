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

### 2026-05-24 AI model content source refresh

Commit scope:

- Refresh Qwen/Tongyi purchase tutorial and review copy for Qwen3.7 / Qwen3.6 era model naming, pricing notes, and selection guidance.
- Refresh OpenAI GPT-5.5 review and tutorial copy around the official `gpt-5.5` / `gpt-5.5-pro` model IDs, while removing unsupported benchmark-style claims.
- Refresh DeepSeek tutorial, review, app example, FAQ, error guidance, and use-case copy for DeepSeek V4 model names, pricing, old alias retirement, and free-quota wording.
- Update content freshness dates for affected tutorial, review, API overview, app, and error pages.

Explicitly excluded from this commit:

- `next-env.d.ts` local Next generated reference change.
- `src/app/app/[id]/page.tsx` existing app tutorial/layout edits.
- `src/lib/fuzzy-search.ts` existing search tweak.
- `.claude/`
- `.codex-video-analysis/`
- `.tmp-playwright/`
- `CLAUDE.md`
- `docs/seo-longtail-pages.md`
- `index.html`
- `public/images/tutorial/codex-site-*.png`
- `rollback-backups/`
- `scripts/test-fuzzy-search.mjs`
- `scripts/test-responsive.mjs`
- `skills/`
- `src/components/content/ClaudianObsidianContentPage.tsx`

Verification completed:

```bash
pnpm exec tsc -p tsconfig.json --noEmit  # passed
pnpm exec eslint  # passed
pnpm exec next build  # passed
pnpm exec tsup src/server.ts --format cjs --platform node --target node20 --outDir dist --no-splitting --no-minify  # passed
```

Content smoke checks:

- Local HTTP checks returned 200 for `/api/deepseek`, `/tutorial/deepseek`, `/api-review/deepseek`, `/api-review`, and `/app`.
- Checked that current DeepSeek pages include `deepseek-v4-flash`, `deepseek-v4-pro`, the old alias retirement note, and updated RMB pricing.
- Checked that outdated DeepSeek `500 万 Token` and old USD V4 pricing claims no longer appear in the current rendered routes.

SEO/deployment impact:

- Existing route structure, sitemap, robots, and structured data behavior were not changed.
- This update changes page copy and freshness dates only, focused on model names, pricing caveats, and unsupported-claim cleanup.

### 2026-05-26 www domain and verification deployment

Commit scope:

- Add Google site verification metadata to the global layout.
- Finish replacing active internal SEO URLs from `https://apiuspro.cn` to `https://www.apiuspro.cn`.
- Update canonical, OpenGraph, Twitter image, breadcrumb, article, how-to, API tutorial, app tutorial, error, FAQ, use-case, and TDK URL references that still used the non-www domain.
- Treat both `apiuspro.cn` and `www.apiuspro.cn` as internal domains in URL rendering helpers, so www links are not marked as external API endpoint links.

Explicitly excluded from this commit:

- Stashed DeepSeek/API content edits: `stash@{0}` / `pre-deploy-keep-uncommitted-deepseek`.
- Untracked preview, backup, test, Claude/Codex, and local helper files.
- New untracked components not part of the domain or verification deployment.

Verification completed:

```bash
pnpm ts-check  # passed
pnpm lint  # passed
pnpm build  # passed
```

SEO/deployment impact:

- Main site domain remains `https://www.apiuspro.cn`.
- Non-www URLs are intended to redirect to www through `next.config.ts`.
- Sitemap, robots, JSON-LD, canonical, OpenGraph, Twitter image, and internal absolute links now target the www domain in active tracked files.

### 2026-05-29 Google verification token refresh

Commit scope:

- Add the new Google Search Console verification token to the global Next.js metadata in `src/app/layout.tsx`.
- Preserve the existing Google verification token by rendering both values through `metadata.verification.google`.

Explicitly excluded from this commit:

- Existing generated `next-env.d.ts` local reference change.
- Existing homepage and tutorial learning-center edits in `src/app/home-client.tsx`, `src/app/tutorial/page.tsx`, `src/app/learn/`, `src/components/learn/`, `src/lib/learn-config.ts`, and `public/images/learn/`.
- Existing untracked local preview, backup, test, Claude/Codex, helper, and unrelated component files.

Verification completed:

```bash
corepack pnpm ts-check
corepack pnpm lint
corepack pnpm build
```

SEO/deployment impact:

- Adds a new `google-site-verification` meta tag for Search Console ownership verification.
- No route, sitemap, robots, canonical, or structured-data behavior is changed.

### 2026-05-29 Baidu crawl SSR and navigation deployment

Commit scope:

- Convert `/tutorial`, `/cloud-api`, and `/app/[id]` route entries from client-rendered pages to server-rendered route wrappers with client content components.
- Add cross-page navigation links to `/app`, `/learn`, and `/local-deploy` to improve internal discovery.
- Keep existing API tutorial data and route structure unchanged.

Explicitly excluded from this commit:

- Existing untracked local preview, backup, test, Claude/Codex, helper, and unrelated component files.
- `test-artifacts/` generated by local verification.
- Local scratch files such as `index.html`, preview screenshots, and SEO draft notes.

Verification completed:

```bash
corepack pnpm run ts-check  # passed
corepack pnpm run lint  # passed
corepack pnpm run build  # passed
```

SEO/deployment impact:

- BaiduSpider-style raw HTML checks confirmed `/tutorial`, `/cloud-api`, `/app`, and `/app/codex` return server HTML containing page body text, JSON-LD, and `https://www.apiuspro.cn` canonical URLs.
- This reduces reliance on browser-side JavaScript for search engine crawling on the main tutorial, API listing, and app tutorial pages.

### 2026-05-29 Homepage hero search and beginner route layout

Commit scope:

- Update the homepage hero from a single DeepSeek-focused prompt to a broader AI API selection and first-call entry.
- Add a compact hero search panel with desktop-only quick links and keep mobile focused on the search input.
- Move the beginner learning route into the hero on wide screens, enlarge the route cards, and align the search panel with the route card layout across responsive widths.

Explicitly excluded from this commit:

- Existing untracked local preview, backup, test, Claude/Codex, helper, and unrelated component files.
- Generated `test-artifacts/` screenshots and logs.
- API tutorial data, detail pages, SEO configuration, and deployment scripts.

Verification completed:

```bash
corepack pnpm run ts-check  # passed
corepack pnpm run lint  # passed
corepack pnpm run build  # passed
```

SEO/deployment impact:

- Homepage internal links now surface `/tutorial/deepseek`, `/tutorial/mimo`, `/learn/token-context-api-key`, `/learn/api-config-basics`, `/app/codex`, and `/app/ccswitch` in the hero quick links.
- No sitemap, robots, canonical, structured-data, API config, or tutorial detail content changed.

### 2026-05-29 Claude Opus 4.8 content refresh

Commit scope:

- Update Claude tutorial and API configuration copy from Claude Opus 4.7 to Claude Opus 4.8 in `src/lib/api-config.ts`.
- Update Claude review, cross-model recommendations, API review summary, and use-case picks to reference Claude Opus 4.8.
- Update content freshness dates for the Claude API page, Claude review, API review page, and affected use-case pages.

Explicitly excluded from this commit:

- Existing untracked local preview, backup, test, Claude/Codex, helper, and unrelated component files.
- Existing generated screenshots, scratch HTML files, and SEO draft documents.
- Homepage layout, search logic, deployment scripts, route structure, and non-Claude model data not directly referencing Claude Opus 4.7.

Verification planned:

```bash
corepack pnpm exec tsc -p tsconfig.json --noEmit
corepack pnpm exec eslint
corepack pnpm exec next build
corepack pnpm exec tsup src/server.ts --format cjs --platform node --target node20 --outDir dist --no-splitting --no-minify
```

SEO/deployment impact:

- Updates visible Claude content and API review copy to the latest Anthropic Claude Opus 4.8 announcement.
- Keeps existing route URLs, sitemap generation, canonical configuration, robots behavior, and structured-data components unchanged.

### 2026-05-31 Homepage redesign, BrandIcon, dark mode, and SEO fixes

Commit `1c50a18` — 22 files, +486/-656.

Commit scope:

- Redesign homepage: replace old hero/sidebar/table layout with simplified Hero + UserEntrySection + PurchaseTutorials in `src/app/home-client.tsx`. Merge MobileHome and DesktopHome into single `HomeShell` component.
- Integrate `BrandIcon` component into API detail, tutorial, error, cloud-api, use-case, app, and content pages.
- Fix dark mode contrast for badges, links, and text across `globals.css` and 10+ page/component files.
- Fix SEO: eliminate duplicate H1 on homepage (mobile `<h1>` changed to `<p>`), add `<h1 class="sr-only">` to `/tutorial` and `/cloud-api` pages.
- Shorten `/api-review/:slug` description template in `tdk.json` to stay within 160 char limit.
- Simplify GPT-5.5 `tlDr` in `review-config.ts` from 136 to 91 chars for SEO compliance.

Explicitly excluded from this commit:

- Untracked files: `.claude/`, `.codex-video-analysis/`, `.tmp-playwright/`, `CLAUDE.md`, `docs/`, `index.html`, preview files, `rollback-backups/`, `scripts/test-*.mjs`, `skills/`, `src/components/api/APIInfoTable.tsx`, `src/components/api/BrandIcon.tsx`, `src/components/api/CollapsibleSection.tsx`, `test-artifacts/`, 百度索引修复方案.md

Verification completed:

```bash
pnpm run ts-check  # passed
pnpm run lint  # passed (2 warnings, 0 errors)
pnpm run build  # passed (73 pages)
```

Page regression: 18 pages returned HTTP 200.
SEO scan: 23 pages checked — all have exactly 1 H1, description ≤ 160 chars, and canonical URL.
Mobile: iPhone SE (375px), iPhone 14 (390px), iPad (768px) — no horizontal overflow on any page.

### 2026-05-31 Mobile overflow hardening for code blocks and text containers

Commit `c14a3d3` — 2 files, +5/-5.

Commit scope:

- Add `max-w-full` to `<pre>` code block container in `src/app/local-deploy/page.tsx`.
- Add `overflow-hidden break-words` to RichText containers in `src/components/content/AppTutorialContent.tsx` (section overview and step description paragraphs).

Explicitly excluded from this commit:

- Same untracked files as previous commit.

Verification completed:

```bash
pnpm run ts-check  # passed
pnpm run lint  # passed
pnpm run build  # passed (73 pages)
```

Mobile: iPhone SE (375px), iPhone 14 (390px), iPad (768px) — no page-level horizontal overflow. Code blocks and tables correctly use internal `overflow-x-auto` scrollbars.

SEO/deployment impact:

- No route, metadata, sitemap, robots, or structured-data changes in either commit.

### 2026-06-01 Baidu analytics script for traffic verification

Commit scope:

- Add the Baidu analytics script `hm.js?6f89f211fef6ae8ad990792cb14c63a1` to the global app layout in `src/app/layout.tsx`.
- Keep the existing Baidu auto-push script, 51.la script, metadata verification tags, sitemap, robots, and route structure unchanged.

Explicitly excluded from this commit:

- Existing untracked local preview, backup, test, Claude/Codex, helper, and unrelated component files.
- Existing uncommitted maintenance-log entries that predate this Baidu analytics change.

Verification completed:

```bash
corepack pnpm run ts-check  # passed
corepack pnpm run lint  # passed (2 warnings, 0 errors; existing home-client unused vars)
node_modules\.bin\next.CMD build  # passed (73 pages)
node_modules\.bin\tsup.CMD src/server.ts --format cjs --platform node --target node20 --outDir dist --no-splitting --no-minify  # passed
```

SEO/deployment impact:

- Enables Baidu traffic verification and analytics collection across all pages after client hydration.
- Does not change canonical URLs, Open Graph/Twitter metadata, JSON-LD, sitemap, robots, or page content.

### 2026-06-02 Homepage mobile/desktop isolation and search-index build fix

Commit scope:

- Split the homepage client UI in `src/app/home-client.tsx` into separate desktop and mobile component entry points while keeping shared homepage data and `useSearch` in one place.
- Keep desktop header, hero, search bar, purchase tutorial grid, and user-entry card behavior isolated in desktop components.
- Keep mobile header, hero, search bar, beginner route, horizontal purchase tutorial cards, bottom navigation, and menu sheet isolated in mobile components.
- Fix the existing `src/lib/search-index.ts` TypeScript blockers by filtering optional search fields and using the current FAQ `question` / `answer` fields.

Explicitly excluded from this commit:

- Existing unrelated dirty files: `src/app/api-review/page.tsx`, `src/app/tutorial/page.tsx`, `src/lib/review-config.ts`.
- Existing untracked local test artifacts: `test-artifacts/mobile-home-test/`.
- No changes to base UI components, route structure, sitemap, robots, metadata, API data, tutorial data, or review content.

Verification completed:

```bash
corepack pnpm ts-check  # passed
corepack pnpm exec eslint src/app/home-client.tsx src/lib/search-index.ts  # passed, 7 existing home-client warnings
corepack pnpm exec eslint  # passed, 10 warnings in existing files/scripts
corepack pnpm exec next build  # passed (76 static pages)
corepack pnpm exec tsup src/server.ts --format cjs --platform node --target node20 --outDir dist --no-splitting --no-minify  # passed
```

Browser verification completed on local preview `http://127.0.0.1:5000/`:

- 375px, 390px, 430px, 760px: no horizontal page overflow, mobile bottom navigation works, menu opens/closes, search clear button works, and footer content is not hidden behind the bottom nav.
- 390px and 430px: first DeepSeek mobile tutorial card is centered.
- 760px: first DeepSeek mobile tutorial card is left aligned.
- 1440px: desktop navigation, hero layout, 4-column purchase tutorial grid, hover behavior, and user-entry cards remain desktop-only; mobile bottom nav, mobile menu, and mobile horizontal tutorial cards are not rendered.

SEO/deployment impact:

- Homepage component organization changed, but URLs, canonical behavior, structured data, sitemap, robots, and page content data remain unchanged.
- `src/lib/search-index.ts` now builds successfully without changing the search ranking algorithm or route targets.
