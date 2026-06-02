---
name: test
description: 测试项目功能、响应式布局、移动端适配和内容排版。自动运行构建检查、路由验证、深色模式检查和移动端布局测试。
---

# 项目测试 Skill

自动化测试项目功能、响应式布局、移动端适配和内容排版。

## 使用方式

```
/test              # 运行完整测试套件
/test build        # 仅构建检查
/test routes       # 仅路由验证
/test responsive   # 仅响应式布局测试
/test dark-mode    # 仅深色模式检查
```

## 测试套件

### 1. 构建检查

```bash
cd D:/projects && pnpm ts-check 2>&1 | tail -20
```

验证 TypeScript 编译无错误。

### 2. 路由验证

启动开发服务器，验证关键路由返回 200：

- `/` — 首页
- `/tutorial` — 购买教程列表
- `/tutorial/claude` — 教程详情页
- `/api/deepseek` — API 详情页
- `/app` — 应用教程列表
- `/app/ccswitch` — CC Switch 教程
- `/cloud-api` — API 官网入口
- `/api-review` — API 测评
- `/use-case` — 场景推荐
- `/faq` — 常见问题
- `/local-deploy` — 本地部署
- `/error` — 错误排查

### 3. 响应式布局检查

检查所有页面在 360px 宽度下：

- 无 `mx-8` 未加 `sm:` 前缀的情况
- 无 `min-w-[720px]` 等固定宽度导致溢出
- 表格和代码块有 `overflow-x-auto`
- 图片有 `w-full h-auto` 或 `object-contain`
- 步骤卡片使用 `flex-col sm:flex-row` 布局

```bash
cd D:/projects && grep -rn "mx-8" src/app/ --include="*.tsx" | grep -v "sm:mx-8" | grep -v "dark:" | head -20
```

### 4. 深色模式检查

检查所有页面的颜色类是否有 `dark:` 变体：

```bash
cd D:/projects && grep -rn "bg-sky-50\|bg-emerald-50\|bg-amber-50" src/app/ --include="*.tsx" | grep -v "dark:" | head -20
```

检查代码高亮颜色：

```bash
cd D:/projects && grep -rn "text-purple-700\|text-blue-600\|text-teal-700\|text-cyan-700" src/app/ --include="*.tsx" | grep -v "dark:" | head -10
```

### 5. 内容排版检查

检查正文可读性：

- 正文使用 `text-[15px]` 或 `text-base`
- 行高使用 `leading-7` 或 `leading-8`
- 深色模式正文使用 `text-foreground/85` 而非 `text-muted-foreground`

```bash
cd D:/projects && grep -rn "text-muted-foreground" src/app/ --include="*.tsx" | grep -v "dark:" | wc -l
```

### 6. 编码检查

检查文件编码是否正常（无乱码）：

```bash
cd D:/projects && python3 -c "
import glob
for f in glob.glob('src/app/**/*.tsx', recursive=True):
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
        if '浜' in content or '閿' in content or '鎼' in content:
            print('ENCODING ERROR: ' + f)
"
```

### 7. 交互功能检查

检查关键交互元素：

- 搜索按钮 disabled 条件是否正确
- 下拉框有点击外部关闭逻辑
- 移动端菜单有焦点陷阱

```bash
cd D:/projects && grep -n "disabled.*suggestions.length" src/app/home-client.tsx
```

## 预期结果

| 测试项 | 预期 |
|--------|------|
| ts-check | 0 errors |
| 路由验证 | 所有路由返回 200 |
| 响应式布局 | 无未适配的 mx-8、min-w- 溢出 |
| 深色模式 | 所有颜色类有 dark: 变体 |
| 内容排版 | 正文 15px+、行高 7+ |
| 编码检查 | 无乱码文件 |
| 交互功能 | 按钮/下拉框逻辑正确 |

## 输出格式

```
## 测试报告

**测试时间**: YYYY-MM-DD HH:MM
**测试范围**: [完整/指定项]

### 测试结果
- [x] 构建检查: 通过
- [x] 路由验证: 12/12 通过
- [ ] 响应式布局: 2 个问题
- [x] 深色模式: 通过
- ...

### 问题清单
1. [问题描述] — [文件:行号]
2. ...
```

## 注意事项

- 测试前确保开发服务器未运行（避免端口冲突）
- 路由验证需要等待服务器启动（约 10-15 秒）
- 深色模式检查只验证类名，不验证视觉效果
- 响应式布局检查基于代码分析，不基于实际渲染
