import type { Metadata } from 'next';
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
      </div>
    </SidebarLayout>
  );
}
