# SEO 索引提交清单

## 已确认

- `https://apiuspro.cn/sitemap.xml` 可访问，当前列出 49 个公开 URL。
- sitemap 中每个 URL 都包含 `lastmod`、`changefreq`、`priority`。
- `https://apiuspro.cn/robots.txt` 已包含 `Sitemap: https://apiuspro.cn/sitemap.xml`。
- 重要页面抽检 canonical 正确，且未发现 `noindex`。
- `/preview-home` 为预览页，不进入 sitemap，且设置为 `noindex, nofollow`。

## URL 即时提交

### IndexNow

已新增 IndexNow key 文件：

- `https://apiuspro.cn/7e0fb047ba114379b2991b59347c3b61.txt`

提交命令：

```bash
pnpm submit:indexnow
```

提交单页：

```bash
pnpm submit:indexnow -- https://apiuspro.cn/cloud-api
```

提交前预览：

```bash
pnpm submit:indexnow -- --dry-run https://apiuspro.cn/cloud-api
```

### Google

Google Indexing API 仅适用于 `JobPosting` 或包含 `BroadcastEvent` 的 `VideoObject` 页面；本站当前内容不属于该范围。

普通页面建议使用：

- Google Search Console 提交 sitemap。
- Google Search Console 的 URL 检查工具手动请求编入索引。

## 动态和参数页规范化策略

- 只把无参数的规范 URL 放入 sitemap。
- 搜索、筛选、排序等参数页不放入 sitemap。
- 重要页面通过 `alternates.canonical` 指向无参数规范 URL。
- 页面内容更新后，先确认线上 sitemap，再用 IndexNow 提交更新 URL。
