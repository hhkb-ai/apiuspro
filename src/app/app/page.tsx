import type { Metadata } from 'next';
import Link from 'next/link';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { appTutorials } from '@/lib/api-config';
import { BreadcrumbSchema } from '@/components/seo/structured-data';
import { RememberListLink } from '@/components/navigation/ReturnNavigation';
import { generateMetadata as generateTdkMetadata } from '@/lib/tdk';

const workflowNotes = [
  {
    title: '只想少改配置',
    desc: '优先统一管理 API Key、Base URL 和模型名，避免在多个工具里反复改配置文件。',
  },
  {
    title: '主要用 AI 写代码',
    desc: '先确认 Claude Code、Codex、OpenCode 的接入方式，再根据预算选择 DeepSeek、Claude 或 OpenAI。',
  },
  {
    title: '要做知识库工作流',
    desc: '关注 Obsidian、LLM Wiki、MCP 和长文档模型，先跑通资料整理、查询和沉淀流程。',
  },
];

const configExamples = [
  {
    language: 'ENV',
    title: '环境变量写法',
    code: `AI_API_KEY="sk-your-api-key"
AI_BASE_URL="https://api.example.com/v1"
AI_MODEL="model-name"`,
  },
  {
    language: 'JSON',
    title: '工具配置写法',
    code: `{
  "provider": "DeepSeek",
  "apiKey": "sk-your-api-key",
  "baseURL": "https://api.deepseek.com",
  "model": "deepseek-v4-flash"
}`,
  },
];

const pageAnchors = [
  { href: '#app-tutorials', label: '应用教程' },
  { href: '#config-example', label: '配置示例' },
  { href: '#workflow', label: '选择思路' },
  { href: '#faq-section', label: '常见问题' },
  { href: '#next-step', label: '下一步推荐' },
  { href: '#fit-section', label: '适合人群' },
];

export const metadata: Metadata = generateTdkMetadata('/app');

function badgeClass(type: string) {
  if (type === 'success') return 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700';
  if (type === 'warning') return 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300';
  return 'border-sky-200 bg-sky-50 dark:bg-sky-950/30 text-sky-700';
}

export default function AppListPage() {
  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://www.apiuspro.cn' },
          { name: 'API应用', url: 'https://www.apiuspro.cn/app' },
        ]}
      />
      <div className="mx-auto max-w-6xl p-6 lg:p-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">API Apps</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">API 应用教程</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            围绕 Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw、Obsidian 和 LLM Wiki 整理教程，覆盖安装、API Key 配置、模型切换和实际工作流落地。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
              {appTutorials.length} 个应用教程
            </span>
            <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs text-sky-700 dark:border-sky-800 dark:bg-sky-950/30 dark:text-sky-300">
              API Key 配置
            </span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
              工具接入
            </span>
          </div>
        </div>

        {/* BLUF 摘要 */}
        <section className="mb-8 hidden rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 px-5 py-4 sm:block">
          <p className="text-sm font-semibold text-sky-800 dark:text-sky-200">结论先行</p>
          <p className="mt-1 text-sm leading-6 text-sky-700 dark:text-sky-300">
            想用 AI 写代码？先装 Claude Code 或 Codex，再用 CC Switch 配好 API Key 和模型名，5 分钟跑通。
            想做知识库？从 Obsidian + LLM Wiki 入手，搭配长上下文模型效果最好。
            不想折腾配置？CC Switch 统一管理所有 API Key、Base URL 和模型切换。
          </p>
        </section>
        <details className="mb-8 rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-900 dark:text-sky-100 sm:hidden">
          <summary className="cursor-pointer select-none px-4 py-3 text-sm font-bold">结论先行（点开查看）</summary>
          <p className="border-t border-sky-200 dark:border-sky-800 px-4 py-3 text-sm leading-7 text-sky-700 dark:text-sky-300">
            想用 AI 写代码？先装 Claude Code 或 Codex，再用 CC Switch 配好 API Key 和模型名，5 分钟跑通。
            想做知识库？从 Obsidian + LLM Wiki 入手，搭配长上下文模型效果最好。
            不想折腾配置？CC Switch 统一管理所有 API Key、Base URL 和模型切换。
          </p>
        </details>

        <section id="app-overview" className="scroll-mt-24 mb-8 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 sm:px-5 sm:py-4 dark:border-sky-800 dark:bg-sky-950/30">
          <p className="mb-3 text-sm font-semibold text-sky-800 dark:text-sky-200">页面概览</p>
          <div className="grid gap-3 text-sm leading-6 sm:grid-cols-2">
            <p className="text-sky-900 dark:text-sky-200"><strong className="font-semibold">预计耗时：</strong>按单个教程操作，通常 5-20 分钟完成基础配置。</p>
            <p className="text-sky-900 dark:text-sky-200"><strong className="font-semibold">准备材料：</strong><span className="rounded bg-sky-100 px-1 font-semibold text-sky-900 dark:bg-sky-900/60 dark:text-sky-100">API Key</span>、<span className="rounded bg-sky-100 px-1 font-semibold text-sky-900 dark:bg-sky-900/60 dark:text-sky-100">Base URL</span>、<span className="rounded bg-sky-100 px-1 font-semibold text-sky-900 dark:bg-sky-900/60 dark:text-sky-100">模型名称</span>和目标工具安装包。</p>
            <p className="text-emerald-800 dark:text-emerald-200"><strong className="font-semibold">成功标志：</strong>工具内可以选择模型并完成一次真实请求。</p>
            <p className="text-amber-800 dark:text-amber-200"><strong className="font-semibold">最容易卡住：</strong><span className="rounded bg-amber-100 px-1 font-semibold text-amber-900 dark:bg-amber-900/50 dark:text-amber-100">Key 写错</span>、<span className="rounded bg-amber-100 px-1 font-semibold text-amber-900 dark:bg-amber-900/50 dark:text-amber-100">Base URL 不匹配</span>、模型名和工具配置不一致。</p>
          </div>
        </section>

        <section id="config-example" className="mb-8 scroll-mt-24 rounded-lg border bg-card p-4 sm:p-5">
          <div className="mb-4">
            <p className="text-sm font-semibold text-foreground">快速配置示例</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              大多数 AI 工具最终都要填这三项：
              <span className="mx-1 rounded bg-emerald-100 px-1.5 py-0.5 font-semibold text-emerald-800 dark:bg-emerald-900/45 dark:text-emerald-100">API Key</span>
              <span className="mx-1 rounded bg-sky-100 px-1.5 py-0.5 font-semibold text-sky-800 dark:bg-sky-900/50 dark:text-sky-100">Base URL</span>
              <span className="mx-1 rounded bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-800 dark:bg-amber-900/45 dark:text-amber-100">模型名</span>
              。具体字段名以对应工具教程为准。
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {configExamples.map((example) => (
              <div key={example.title} className="min-w-0 overflow-hidden rounded-lg border border-border bg-background/45 dark:bg-background/50">
                <div className="flex items-center justify-between border-b border-border px-4 py-2">
                  <span className="text-xs font-semibold text-foreground">{example.title}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{example.language}</span>
                </div>
                <pre className="max-w-full overflow-x-auto whitespace-pre p-3 font-mono text-[13px] leading-6 text-foreground sm:p-4 sm:text-sm">
                  <code className="block min-w-max">{example.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        <div className="mb-8 overflow-hidden rounded-lg border border-border sm:hidden">
          <details>
            <summary className="cursor-pointer select-none bg-muted/60 px-4 py-2.5 text-sm font-semibold text-foreground">
              页面目录（点开查看）
            </summary>
            <nav className="space-y-0.5 border-t border-border px-4 py-2">
              <a href="#app-overview" className="block py-1.5 text-sm text-muted-foreground hover:text-foreground">页面概览</a>
              {pageAnchors.map((item) => (
                <a key={item.href} href={item.href} className="block py-1.5 text-sm text-muted-foreground hover:text-foreground">
                  {item.label}
                </a>
              ))}
            </nav>
          </details>
        </div>

        <div className="flex flex-col">
        <section id="workflow" className="order-2 mb-8 grid scroll-mt-24 grid-cols-1 gap-4 md:order-1 md:grid-cols-3">
          {workflowNotes.map((note) => (
            <div key={note.title} className="rounded-lg border bg-card p-5">
              <h2 className="text-base font-semibold">{note.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{note.desc}</p>
            </div>
          ))}
        </section>

        <section id="app-tutorials" className="order-1 grid scroll-mt-24 grid-cols-1 gap-4 md:order-2 md:grid-cols-2 lg:grid-cols-3">
          {appTutorials.map((tutorial) => (
            <article key={tutorial.id} className="flex min-h-48 flex-col rounded-lg border bg-card p-5 transition-colors hover:border-foreground/30">
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="font-semibold">{tutorial.name}</h3>
                <Badge variant="outline" className={badgeClass(tutorial.badge.type)}>{tutorial.badge.text}</Badge>
              </div>
              <p className="flex-1 text-sm leading-6 text-muted-foreground">{tutorial.desc}</p>
              <p className="mt-2 text-xs text-muted-foreground">{tutorial.sections.length} 个章节</p>
              <div className="mt-auto pt-5">
                <RememberListLink href={`/app/${tutorial.id}`} listLabel="应用教程列表">
                  <Button variant="outline" className="w-full" size="sm">详细教程</Button>
                </RememberListLink>
              </div>
            </article>
          ))}
        </section>

        {/* 常见问题 */}
        <section id="faq-section" className="order-3 mt-10 scroll-mt-24">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">常见问题</h2>
          <div className="space-y-3">
            {[
              {
                q: 'CC Switch 是什么？一定要用吗？',
                a: 'CC Switch 是一个统一管理 API Key、Base URL 和模型名的工具，避免在多个 AI 工具里反复改配置文件。不是必须的，但能省很多配置时间。',
              },
              {
                q: 'Claude Code 和 Codex 有什么区别？',
                a: '两者都是 AI 编程助手。Claude Code 是 Anthropic 官方的 CLI 工具，擅长长上下文和代码理解；Codex 是 OpenAI 的终端编程工具，Agent 能力更强。选哪个取决于你用哪个 API。',
              },
              {
                q: '一个 API Key 能同时用在多个工具里吗？',
                a: '可以，但要注意并发限制。如果多个工具同时调用，可能触发限流。建议每个工具配独立的 Key，或者用 CC Switch 统一管理。',
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-lg border bg-card p-5">
                <h3 className="text-sm font-semibold">{faq.q}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 下一步推荐 */}
        <section id="next-step" className="order-4 mt-10 scroll-mt-24 rounded-lg border bg-card p-6">
          <h2 className="font-semibold">下一步推荐</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/learn" className="rounded-lg border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">AI 新手学习</p>
              <p className="mt-1 text-xs text-muted-foreground">还不懂 AI、Token、API Key？先从基础学起</p>
            </Link>
            <Link href="/cloud-api" className="rounded-lg border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">API 官网入口</p>
              <p className="mt-1 text-xs text-muted-foreground">查找各平台官网、Base URL 和模型名称</p>
            </Link>
            <Link href="/tutorial" className="rounded-lg border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">购买教程</p>
              <p className="mt-1 text-xs text-muted-foreground">还没买 API？从注册和获取 Key 开始</p>
            </Link>
            <Link href="/use-case" className="rounded-lg border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">场景推荐</p>
              <p className="mt-1 text-xs text-muted-foreground">不确定用哪个 API？按场景选择</p>
            </Link>
            <Link href="/local-deploy" className="rounded-lg border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">本地部署</p>
              <p className="mt-1 text-xs text-muted-foreground">想在本地部署模型或工具</p>
            </Link>
            <Link href="/api-review" className="rounded-lg border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">API 测评</p>
              <p className="mt-1 text-xs text-muted-foreground">查看模型能力和价格对比</p>
            </Link>
          </div>
        </section>

        {/* 适合谁 / 不适合谁 */}
        <section id="fit-section" className="order-5 mt-10 grid scroll-mt-24 grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-5">
            <p className="text-sm font-semibold text-emerald-800">适合谁</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-emerald-700">
              <li>• 想用 AI 工具提升开发效率的程序员</li>
              <li>• 需要管理多个 API Key 和模型配置的用户</li>
              <li>• 想搭建个人知识库或文档工作流的人</li>
              <li>• 需要把 AI 接入现有工具链（编辑器、终端、笔记软件）的用户</li>
            </ul>
          </div>
          <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-5">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">不适合谁</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-amber-700 dark:text-amber-300">
              <li>• 还没买过 API，需要先看注册和购买流程（请看 <Link href="/tutorial" className="text-foreground hover:underline">购买教程</Link>）</li>
              <li>• 不确定该用哪个 API（请看 <Link href="/use-case" className="text-foreground hover:underline">场景推荐</Link>）</li>
              <li>• 想看模型测评和基准数据（请看 <Link href="/api-review" className="text-foreground hover:underline">API 测评</Link>）</li>
            </ul>
          </div>
        </section>
        </div>
      </div>
    </SidebarLayout>
  );
}
