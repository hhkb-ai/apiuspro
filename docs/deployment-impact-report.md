# SEO/部署影响检查

生成时间：2026-05-15
范围：构建、路由、sitemap、robots、验证文件、metadata/TDK、canonical、重定向配置、旁路产物影响。

## 本次变更性质

本次新增或更新的旁路产物只位于：

- `outputs/design-tokens.json`
- `outputs/tokens.html`
- `docs/design-system-report.md`
- `docs/api-route-inventory.md`
- `docs/deployment-impact-report.md`

这些文件不在 `src/app`、`public`、`next.config.ts`、`package.json`、部署脚本或主站组件中，因此不会被 Next.js App Router 作为线上页面或静态资源发布。

## 构建链路检查

`package.json` 主构建命令为：

```json
"build": "corepack pnpm install --prefer-frozen-lockfile --prod=false && next build && tsup src/server.ts --format cjs --platform node --target node20 --outDir dist --no-splitting --no-minify"
```

本次没有修改 `package.json`，也没有修改主构建命令。新增的 `docs/*.md`、`outputs/*.json`、`outputs/*.html` 不会被 `next build` 作为路由入口处理。

## 路由影响检查

当前 App Router 页面来自 `src/app`。本次没有新增、移动、删除任何 `src/app` 文件，也没有新增 `route.ts`。

结果：

- 不新增线上路由
- 不修改已有页面渲染逻辑
- 不修改 `/api/[id]` 内容页行为
- 不影响 `/sitemap.xml`、`/robots.txt`、`/opengraph-image`
- 不影响 `preview-home` 的 noindex 设置

## Sitemap 检查

`src/app/sitemap.ts` 通过 `MetadataRoute.Sitemap` 生成 sitemap，内容来自：

- 静态业务页面
- `visibleAPIList + visibleProxyServices`
- `visibleAPIList.filter(api => api.tutorial)`
- `reviewDetails`
- `appTutorials`
- `getAllUseCaseIds()`

本次没有修改 `sitemap.ts`，也没有修改上述数据源。因此 sitemap 输出不受本次文档生成影响。

## Robots 检查

`src/app/robots.ts` 当前配置：

- `userAgent: "*"`
- `allow: "/"`
- `sitemap: "https://apiuspro.cn/sitemap.xml"`

本次没有修改 robots。`outputs/tokens.html` 不在 `public/`，也不在 `src/app`，因此 robots 是否 allow 不会导致它被线上访问或索引。

## 百度验证和搜索验证文件

当前公开验证文件位于 `public/`：

- `baidu_verify_codeva-ZFumuoTQFv.html`
- `BingSiteAuth.xml`
- `E429676F3C684A5DB6F899F2bb920ab7.txt`
- `7e0fb047ba114379b2991b59347c3b61.txt`

`src/app/layout.tsx` metadata 中也存在：

- `baidu-site-verification: codeva-ZFumuoTQFv`
- `msvalidate.01: BF3E423F579BD5F854833A4A587DFF93`

本次没有修改 `public/`，也没有修改 `src/app/layout.tsx`，因此百度和 Bing 验证不受影响。

## Metadata / TDK / Canonical 检查

根布局 `src/app/layout.tsx` 定义站点级 metadata，包括：

- `metadataBase: https://apiuspro.cn`
- 默认 title 和 title template
- description、keywords
- Open Graph
- Twitter card
- robots index/follow
- 根 canonical `https://apiuspro.cn`
- 百度自动推送脚本和 51.la 统计脚本

页面级 TDK 来自 `src/lib/tdk.ts` 和 `src/lib/tdk.json`，覆盖 `/`、`/cloud-api`、`/api/:id`、`/tutorial`、`/tutorial/:id`、`/api-review`、`/api-review/:slug`、`/app`、`/app/:id`、`/use-case`、`/use-case/:id`、`/local-deploy`、`/faq`。

本次没有修改 `layout.tsx`、`tdk.ts` 或 `tdk.json`，因此 title、description、keywords、canonical、Open Graph、Twitter metadata 均不受影响。

## 重定向和 Rewrite 检查

当前 `next.config.ts` 包含：

- `/story` -> `/use-case` 301
- `/story/:path*` -> `/use-case` 301
- `www.apiuspro.cn` host rewrite 到 `https://apiuspro.cn/:path*`
- `8.147.64.143` host rewrite 到 `https://apiuspro.cn/:path*`
- `images.remotePatterns` 允许 https 任意 hostname

本次没有修改 `next.config.ts`。因此重定向、rewrite、图片远程域名规则不受影响。

## 为什么 outputs/ 和 docs/ 不影响线上主站

Next.js App Router 只会把 `src/app` 中的页面或 route handler，以及 `public` 中的静态文件暴露到线上。

本次文件位于仓库根目录的 `outputs/` 和 `docs/`：

- `outputs/` 在 `.gitignore` 中，适合作为本地生成报告目录。
- `docs/` 是仓库文档目录，不会被 App Router 自动映射成 URL。
- 没有任何主站代码 import 这些文件。
- 没有把 `tokens.html` 放入 `public/`。
- 没有修改构建脚本把这些文件复制到部署产物。

因此这些产物不会改变线上主站路由、页面内容、SEO 索引或运行时行为。

## 如果未来公开 tokens.html 的 SEO 风险

如果未来要把 `tokens.html` 移到 `public/` 或接入 `src/app`，需要额外检查：

1. 是否真的需要公开访问。如果只是内部设计规范，优先保持在 `docs/`、`outputs/` 或受保护的内部文档系统。
2. 如放入 `public/`，它会成为可访问静态文件，例如 `/tokens.html`，搜索引擎可能抓取。
3. 页面必须保留 `<meta name="robots" content="noindex,nofollow">`。
4. 不要把 `/tokens.html` 加入 `sitemap.ts`。
5. 不要在公开导航、页脚、结构化数据或 sitemap 中链接到它。
6. 如接入 App Router，应在页面 metadata 中设置 `robots: { index: false, follow: false }`。
7. 检查 canonical：内部文档页不应 canonical 到首页或业务页，避免主题混淆。
8. 检查 title/description：避免和主站业务关键词竞争。
9. 注意 robots 与 noindex 的关系：用 robots 阻止抓取不能保证已索引页面移除，noindex 需要页面可被抓取到。
10. 发布前运行链接检查，确认 tokens 页面没有指向内部文件路径或敏感源码路径。

## 部署结论

本次生成的是旁路设计、路由和部署分析文档，不接入线上主站运行链路。只要保持在 `outputs/` 和 `docs/`，不会影响现有 Next.js 页面、SEO、sitemap、robots、百度验证、统计脚本、重定向配置或部署脚本。
