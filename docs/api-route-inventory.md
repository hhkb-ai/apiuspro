# API/路由清单

生成时间：2026-05-15
扫描范围：`src/app`、`scripts`、`public`

## 结论

当前项目没有业务后端 API 端点。扫描未发现 `src/app/api/**/route.ts` 或 `src/app/**/route.ts`。

需要特别说明：`/api/[id]` 是 Next.js App Router 的内容页面路由，用于展示 API 供应商详情，不是后端接口，也不处理 JSON API 请求。

## 静态页面路由

| 路由 | 文件 | 类型 | 说明 |
| --- | --- | --- | --- |
| `/` | `src/app/page.tsx` + `src/app/home-client.tsx` | 静态页面 | 首页入口，搜索、推荐路径、API 决策表 |
| `/cloud-api` | `src/app/cloud-api/page.tsx` | 静态页面 | API 官网入口列表 |
| `/tutorial` | `src/app/tutorial/page.tsx` | 静态页面 | 购买教程列表 |
| `/api-review` | `src/app/api-review/page.tsx` | 静态页面 | API 测评列表 |
| `/app` | `src/app/app/page.tsx` | 静态页面 | API 应用教程列表 |
| `/use-case` | `src/app/use-case/page.tsx` | 静态页面 | 场景推荐列表 |
| `/local-deploy` | `src/app/local-deploy/page.tsx` | 静态页面 | 本地部署教程 |
| `/faq` | `src/app/faq/page.tsx` | 静态页面 | FAQ 页面 |
| `/preview-home` | `src/app/preview-home/page.tsx` | 静态页面 | 本地预览草稿路由，layout 设置 noindex/nofollow |

## 动态页面路由

| 路由 | 文件 | 参数来源 | 当前参数 |
| --- | --- | --- | --- |
| `/api/[id]` | `src/app/api/[id]/page.tsx` | `visibleAPIList + visibleProxyServices` | `mimo`, `deepseek`, `aliyun`, `zhipu`, `kimi`, `tencent`, `doubao`, `openai`, `claude`, `gemini` |
| `/tutorial/[id]` | `src/app/tutorial/[id]/page.tsx` | `visibleAPIList.filter(api => api.tutorial)` | `mimo`, `deepseek`, `aliyun`, `zhipu`, `kimi`, `tencent`, `doubao`, `openai`, `claude`, `gemini` |
| `/api-review/[slug]` | `src/app/api-review/[slug]/page.tsx` | `Object.keys(reviewDetails)` | `gpt-5.5`, `tongyi`, `claude`, `zhipu`, `kimi`, `tencent`, `doubao`, `deepseek`, `gemini` |
| `/app/[id]` | `src/app/app/[id]/layout.tsx` + `src/app/app/[id]/page.tsx` | `appTutorials` | `ccswitch`, `claude-code`, `openclaw`, `openclaw-feishu`, `claudian-obsidian`, `llm-wiki` |
| `/use-case/[id]` | `src/app/use-case/[id]/page.tsx` | `getAllUseCaseIds()` | `coding`, `knowledge`, `content-creation`, `chatbot`, `translation`, `education` |

## SEO 特殊路由

| 路由 | 文件 | 说明 |
| --- | --- | --- |
| `/sitemap.xml` | `src/app/sitemap.ts` | 使用 `MetadataRoute.Sitemap` 生成 sitemap，包含静态页、API 详情页、教程详情页、测评详情页、应用教程页和场景页 |
| `/robots.txt` | `src/app/robots.ts` | 允许全站抓取，并声明 `https://www.apiuspro.cn/sitemap.xml` |
| `/opengraph-image` | `src/app/opengraph-image.tsx` | Open Graph 图片生成路由 |
| `/favicon.ico` | `src/app/favicon.ico` | 站点图标 |

## 当前不存在的业务后端 API

扫描结果：

- 未发现 `src/app/api/**/route.ts`
- 未发现 `src/app/**/route.ts`
- 没有 App Router route handler 承担业务后端接口

因此当前 `/api` 路径段只用于内容页面 `/api/[id]`，不是 JSON API 或服务端接口命名空间。

## 脚本中的外部请求

| 脚本 | 外部请求 | 触发方式 | 说明 |
| --- | --- | --- | --- |
| `scripts/submit-indexnow.mjs` | `https://api.indexnow.org/indexnow` | 手动执行 `pnpm submit:indexnow` | 读取站点 sitemap 后向 IndexNow 提交 URL |
| `scripts/submit-indexnow.mjs` | `https://www.apiuspro.cn/sitemap.xml` | 手动执行 `pnpm submit:indexnow` | 获取线上 sitemap |
| `scripts/seo-full-pipeline.mjs` | `process.env.CMS_API` | 手动执行 `pnpm seo:pipeline` | 读取或写入外部 CMS meta 数据 |
| `scripts/seo-full-pipeline.mjs` | Slack webhook URL | 配置 `SLACK_WEBHOOK` 时 | 发送 SEO 告警 |
| `scripts/seo-full-pipeline.mjs` | 待检测页面 URL | 脚本内部 SEO 检查 | 使用 fetch 检查页面响应、metadata 和内容质量 |

这些脚本不在主站 Next.js 请求链路中自动运行，属于运维或 SEO 辅助任务。

## 公开静态文件和验证文件

`public/` 中存在搜索引擎验证文件和静态资源：

- `public/baidu_verify_codeva-ZFumuoTQFv.html`
- `public/BingSiteAuth.xml`
- `public/E429676F3C684A5DB6F899F2bb920ab7.txt`
- `public/7e0fb047ba114379b2991b59347c3b61.txt`
- `public/images/**`
- `public/*.svg`

本次没有移动、删除或新增 `public/` 文件。
