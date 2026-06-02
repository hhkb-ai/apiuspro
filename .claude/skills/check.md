---
name: check
description: 测试 API 知识站首页的搜索、导航、布局和构建
---

# 首页功能测试

测试 API 知识站首页的搜索、导航、布局和构建。

## 执行步骤

按顺序执行以下测试：

### 1. 构建验证

```bash
cd D:/projects && pnpm ts-check && pnpm lint
```

### 2. 模糊搜索测试

```bash
cd D:/projects && node scripts/test-fuzzy-search.mjs
```

### 3. 链接验证

```bash
cd D:/projects && pnpm build 2>&1 | tail -50
```

检查输出中 API、教程、场景页面数量是否正确。

### 4. 移动端布局验证

```bash
cd D:/projects && grep -c "md:hidden" .next/server/app/index.html && grep -c "hidden md:block" .next/server/app/index.html && grep -c "snap-x" .next/server/app/index.html
```

### 5. QuickConclusionCard 验证

```bash
cd D:/projects && grep -c "快速结论" .next/server/app/api/deepseek.html && grep -c "推荐指数" .next/server/app/api/deepseek.html && grep -c "适合谁" .next/server/app/api/deepseek.html
```

### 6. 返回导航验证

```bash
cd D:/projects && grep -c "返回上一页" .next/server/app/api/deepseek.html && grep -c "回到首页顶部" .next/server/app/api/deepseek.html
```

## 预期结果

| 测试项 | 预期 |
|--------|------|
| ts-check | 通过 |
| lint | 0 errors, 0 warnings |
| 模糊搜索 | 16/16 测试通过 |
| 移动端布局 | md:hidden + snap-x 存在 |
| QuickConclusionCard | 所有元素存在 |
| 返回导航 | 按钮存在 |
