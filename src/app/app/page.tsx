import type { Metadata } from 'next';
import Link from 'next/link';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { appTutorials } from '@/lib/api-config';
import { BreadcrumbSchema } from '@/components/seo/structured-data';

export const metadata: Metadata = {
  title: 'API 应用教程',
  description:
    '围绕 Claude Code、OpenClaw、Obsidian 插件等常见 AI 工具和工作流整理的安装与使用教程。',
  alternates: { canonical: 'https://apiuspro.cn/app' },
  openGraph: {
    title: 'API 应用教程 | API知识站',
    description: '围绕常见 AI 工具和工作流整理的教程，从安装到使用路径更清晰。',
    url: 'https://apiuspro.cn/app',
    type: 'website',
  },
};

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
            围绕常见工具和工作流整理教程，从安装到使用路径更清晰。
          </p>
        </div>

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
                <Link href={`/app/${tutorial.id}`}>
                  <Button variant="outline" className="w-full" size="sm">详细教程</Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
}
