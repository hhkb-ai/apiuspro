# 项目上下文

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4

## 目录结构

```
├── public/                 # 静态资源
├── scripts/                # 构建与启动脚本
│   ├── build.sh            # 构建脚本
│   ├── dev.sh              # 开发环境启动脚本
│   ├── prepare.sh          # 预处理脚本
│   └── start.sh            # 生产环境启动脚本
├── src/
│   ├── app/                # 页面路由与布局
│   ├── components/ui/      # Shadcn UI 组件库
│   ├── hooks/              # 自定义 Hooks
│   ├── lib/                # 工具库
│   │   └── utils.ts        # 通用工具函数 (cn)
│   └── server.ts           # 自定义服务端入口
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖管理
└── tsconfig.json           # TypeScript 配置
```

- 项目文件（如 app 目录、pages 目录、components 等）默认初始化到 `src/` 目录下。

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。
**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

## 开发规范

### Hydration 问题防范

1. 严禁在 JSX 渲染逻辑中直接使用 typeof window、Date.now()、Math.random() 等动态数据。**必须使用 'use client' 并配合 useEffect + useState 确保动态内容仅在客户端挂载后渲染**；同时严禁非法 HTML 嵌套（如 <p> 嵌套 <div>）。
2. **禁止使用 head 标签**，优先使用 metadata，详见文档：https://nextjs.org/docs/app/api-reference/functions/generate-metadata
   1. 三方 CSS、字体等资源可在 `globals.css` 中顶部通过 `@import` 引入或使用 next/font
   2. preload, preconnect, dns-prefetch 通过 ReactDOM 的 preload、preconnect、dns-prefetch 方法引入
   3. json-ld 可阅读 https://nextjs.org/docs/app/guides/json-ld

## UI 设计与组件规范 (UI & Styling Standards)

- 模板默认预装核心组件库 `shadcn/ui`，位于`src/components/ui/`目录下
- Next.js 项目**必须默认**采用 shadcn/ui 组件、风格和规范，**除非用户指定用其他的组件和规范。**

## 行为准则

以下准则用于减少常见 LLM 编码错误。它们偏向谨慎而不是速度；简单任务可按实际情况判断。

### 编码前先思考

- 不要假设；如果不确定，明确说出假设并询问。
- 如果存在多种解释，先呈现选项，不要默默选择。
- 如果有更简单的做法，主动说明；必要时温和提出异议。
- 如果需求或上下文不清楚，先停下并指出困惑点。

### 简单优先

- 只写能解决问题的最少代码。
- 不添加用户没有要求的功能。
- 不为一次性代码创建抽象。
- 不添加未被要求的灵活性、可配置性或 speculative 设计。
- 如果实现明显过度复杂，主动简化。

### 外科手术式修改

- 只修改完成请求所必需的内容。
- 不顺手改进相邻代码、注释或格式。
- 不重构没有坏掉的代码。
- 匹配现有代码风格，即使个人偏好不同。
- 发现无关死代码时只说明，不擅自删除。
- 只清理自己改动造成的未使用导入、变量或函数。
- 每一行变更都应该能追溯到用户请求。

### 目标驱动执行

- 将任务转成可验证目标。
- 修 bug 时优先复现问题，再修复并验证。
- 加验证逻辑时优先覆盖无效输入，再让检查通过。
- 重构时确保相关测试或检查在修改后仍通过。
- 多步骤任务要给出简短计划，并为每步注明验证方式。
