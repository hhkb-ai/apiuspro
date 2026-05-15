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

export const metadata: Metadata = generateTdkMetadata('/app');

function badgeClass(type: string) {
  if (type === 'success') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  if (type === 'warning') return 'border-amber-200 bg-amber-50 text-amber-700';
  return 'border-sky-200 bg-sky-50 text-sky-700';
}

export default function AppListPage() {
  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://apiuspro.cn' },
          { name: 'API应用', url: 'https://apiuspro.cn/app' },
        ]}
      />
      <div className="mx-auto max-w-6xl p-6 lg:p-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">API Apps</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">API 应用教程</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            围绕 Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw、Obsidian 和 LLM Wiki 整理教程，覆盖安装、API Key 配置、模型切换和实际工作流落地。
          </p>
        </div>

        {/* BLUF 摘要 */}
        <section className="mb-8 rounded-lg border border-sky-200 bg-sky-50 px-5 py-4">
          <p className="text-sm font-semibold text-sky-800">结论先行</p>
          <p className="mt-1 text-sm leading-6 text-sky-700">
            想用 AI 写代码？先装 Claude Code 或 Codex，再用 CC Switch 配好 API Key 和模型名，5 分钟跑通。
            想做知识库？从 Obsidian + LLM Wiki 入手，搭配长上下文模型效果最好。
            不想折腾配置？CC Switch 统一管理所有 API Key、Base URL 和模型切换。
          </p>
        </section>

        {/* 适合谁 / 不适合谁 */}
        <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-sm font-semibold text-emerald-800">适合谁</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-emerald-700">
              <li>• 想用 AI 工具提升开发效率的程序员</li>
              <li>• 需要管理多个 API Key 和模型配置的用户</li>
              <li>• 想搭建个人知识库或文档工作流的人</li>
              <li>• 需要把 AI 接入现有工具链（编辑器、终端、笔记软件）的用户</li>
            </ul>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-800">不适合谁</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-amber-700">
              <li>• 还没买过 API，需要先看注册和购买流程（请看 <Link href="/tutorial" className="text-foreground hover:underline">购买教程</Link>）</li>
              <li>• 不确定该用哪个 API（请看 <Link href="/use-case" className="text-foreground hover:underline">场景推荐</Link>）</li>
              <li>• 想看模型测评和基准数据（请看 <Link href="/api-review" className="text-foreground hover:underline">API 测评</Link>）</li>
            </ul>
          </div>
        </section>

        <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {workflowNotes.map((note) => (
            <div key={note.title} className="rounded-lg border bg-card p-5">
              <h2 className="text-base font-semibold">{note.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{note.desc}</p>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        </div>

        {/* 常见问题 */}
        <section className="mt-10">
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
        <section className="mt-10 rounded-lg border bg-card p-6">
          <h2 className="font-semibold">下一步推荐</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
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
              <p className="mt-1 text-xs text-muted-foreground">不想花钱？试试本地免费模型</p>
            </Link>
          </div>
        </section>
      </div>
    </SidebarLayout>
  );
}
