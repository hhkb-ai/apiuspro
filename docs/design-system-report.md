# API知识站设计系统说明

生成时间：2026-05-15
范围：只分析当前 Next.js 主站的视觉与组件规范，不修改现有 UI。

## 视觉风格

当前站点采用暖色、低饱和、文档型产品界面风格。基础背景是 `#faf8f4`，主文字是 `#24211d`，卡片背景是 `#fffdf8`，整体接近“知识库 + 工具导航”的安静界面，而不是营销落地页风格。

首页承担入口和快速决策任务。桌面端使用更宽的信息密度，重点是搜索、推荐路径和 API 决策表；移动端使用独立信息架构，优先呈现搜索、快捷入口、横向 API 卡片和场景推荐。详情页使用文档型布局，大屏有侧栏和目录，移动端退化为折叠目录。

## 主题变量

主题变量集中在 `src/app/globals.css`。

- Tailwind CSS 4 使用 `@theme inline` 将 shadcn CSS 变量映射为 Tailwind token，例如 `--color-background: var(--background)`。
- `:root` 定义 light theme，包括 background、foreground、card、popover、primary、secondary、muted、accent、destructive、border、input、ring、chart 和 sidebar。
- `.dark` 定义 dark theme 对应变量，配合 `@custom-variant dark (&:is(.dark *))`。
- 字体 token 明确中文优先的 sans 字体栈、monospace 字体栈和 serif 字体栈。
- `--radius: 0.5rem` 是圆角基准，派生 sm、md、lg、xl、2xl、3xl、4xl。

## 颜色系统

核心颜色是暖米白背景和暖灰黑文字。

| 用途 | Token | 值 |
| --- | --- | --- |
| 页面背景 | `--background` | `#faf8f4` |
| 主文字 | `--foreground` | `#24211d` |
| 卡片/弹层 | `--card`, `--popover` | `#fffdf8` |
| 主操作 | `--primary` | `#2b2621` |
| 主操作文字 | `--primary-foreground` | `#fffdf8` |
| 弱背景 | `--muted` | `#f5efe6` |
| 次级背景 | `--secondary` | `#f0ebe3` |
| 辅助文字 | `--muted-foreground` | `#625b52` |
| 边框 | `--border` | `#ded4c6` |
| 焦点环 | `--ring` | `#9a5a35` |

页面中额外使用 Tailwind 色族承载业务语义。

| 色族 | 语义 |
| --- | --- |
| emerald | 国内直连、成功、无需代理 |
| amber | 需要代理、关键步骤、注意事项 |
| sky | 教程完整、提示、信息块 |
| rose/violet/orange | 场景推荐分类辅助色 |

## 排版系统

全站默认使用 `font-sans`，中文优先级为 `PingFang SC`、`Hiragino Sans GB`、`Microsoft YaHei`。字号以 Tailwind 默认尺度为主，并混用少量精确值。

| 字号 | 用途 |
| --- | --- |
| `text-xs` / 12px | 标签、表头、小元信息 |
| `text-sm` / 14px | 正文、导航、按钮 |
| `text-base` / 16px | 输入框、移动端主正文 |
| `text-[13px]` | 侧栏、代码内联文本 |
| `text-[15px]` | 教程段落、详情说明 |
| `text-2xl` / `text-3xl` | 详情页和列表页标题 |
| `text-5xl` | 桌面首页主标题 |

正文行高整体偏舒适，常见 `leading-6`、`leading-7`、`leading-8`。标题权重以 `font-semibold` 为主，按钮和标签多为 `font-medium` 或 `font-semibold`。

## 间距和布局

站点遵循 Tailwind 4px 基准间距。

- 移动端页面横向内边距多为 `px-4`。
- 桌面端页面横向内边距多为 `px-6` 或 `px-8`。
- 卡片内边距常见 `p-4`、`p-5`、`p-6`。
- 重复列表间距多为 `gap-3` 或 `gap-4`。
- 大布局使用 `gap-8`。
- 主要容器宽度包括 `max-w-5xl`、`max-w-6xl`、`max-w-7xl`、`max-w-[1200px]`。

信息架构符合三层展开：

1. 首页作为入口，提供搜索、推荐路径和核心导航。
2. 分类页作为内容导航层，例如 `/cloud-api`、`/tutorial`、`/api-review`、`/app`、`/use-case`。
3. 详情页作为具体内容展示层，例如 `/api/[id]`、`/tutorial/[id]`、`/app/[id]`。

## 圆角、边框、阴影

圆角基准是 `0.5rem / 8px`。

| 圆角 | 用途 |
| --- | --- |
| `rounded-md` | 按钮、输入框、导航项 |
| `rounded-lg` | 卡片、提示块、搜索框 |
| `rounded-full` | 徽标、状态标签、编号点 |

边框是主要结构语言。默认边框来自 `--border #ded4c6`，页面大量通过 `border`、`border-b`、`divide-y` 构建清晰层级。阴影使用克制，卡片默认 `shadow-none`，搜索框和粘性区域使用 `shadow-sm`，菜单与建议层使用 `shadow-lg`。

## 组件规范

项目默认使用 shadcn/ui，组件样式集中在 `src/components/ui/`。

- Button：`rounded-md text-sm font-medium`，主按钮使用 `bg-primary text-primary-foreground`，outline 按钮使用 `border bg-background shadow-xs`。
- Card：`bg-card text-card-foreground rounded-lg border py-6 shadow-none`，强调扁平文档感。
- Badge：`rounded-full border px-2 py-0.5 text-xs font-medium`，承载访问状态和内容状态。
- Input：`h-9 rounded-md border bg-card px-3 py-1`，焦点统一使用 `ring-ring/50 ring-[3px]`。
- Table：表头使用 muted 背景，行 hover 使用 `hover:bg-muted/40`，适合 API 决策和对比场景。
- Navigation：顶部导航 sticky，详情页侧栏和右侧目录 sticky，当前项使用 `border-l-2 border-foreground bg-muted`。

## 移动端适配观察

移动端首页是独立的 `MobileHome`，不是简单缩放桌面布局。它把搜索、快捷入口、推荐路径、横向 API 卡片放在首屏附近，适合手机快速决策。

详情页在大屏使用三栏，移动端隐藏侧栏并使用 `<details>` 折叠目录。图片使用 Next Image 并设置响应式 `sizes`。较宽表格和内容通过 `overflow-x-auto` 处理。

## 潜在设计债务

- 自动链接渲染逻辑在 FAQ、本地部署、教程详情、应用详情中存在重复实现，长期可以抽成共享组件，但本次不修改 UI。
- 状态色使用 Tailwind 色族散落在页面中，尚未统一抽成业务语义 token，例如 `access.direct`、`access.proxy`、`tutorial.complete`。
- `preview-home` 仍作为本地预览路由存在，已有 noindex/nofollow，未来发布前应继续确认不进入 sitemap。
- 详情页布局宽度使用 `max-w-[1000px]`、`max-w-[1200px]`、`max-w-5xl` 混合，整体可接受，但后续可以整理为文档布局 token。
- 部分信息块直接使用 `sky/amber/emerald` 类名，若品牌色继续收敛，可以进一步替换为 CSS 变量。

## 旁路产物

- `outputs/design-tokens.json`：结构化设计令牌。
- `outputs/tokens.html`：本地设计令牌可视化页面，包含 `noindex` meta，但不放入 `public/`，不进入线上路由。
