import type { Metadata } from 'next';
import Link from 'next/link';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BreadcrumbSchema, ItemListSchema } from '@/components/seo/structured-data';
import { learnTutorials } from '@/lib/learn-tutorials';

export const metadata: Metadata = {
  title: 'AI 新手入门教程 - 从提示词到 API 调用与 AI 编程工具 | API知识站',
  description: '面向 AI 新手的系统教程，覆盖 AI 基础、提示词、Token、API Key、Base URL、第一次 API 调用、Codex、Claude Code 和 CC Switch 项目工作流。',
  keywords: ['AI 新手教程', '提示词教程', 'API Key 教程', 'Base URL', 'Codex 教程', 'Claude Code 教程', 'CC Switch'],
  alternates: { canonical: 'https://www.apiuspro.cn/learn' },
};

const learningFlow = [
  '理解 AI 和模型',
  '学会提示词',
  '理解 Token 和上下文',
  '配置 API Key / Base URL / 模型名称',
  '完成第一次 API 调用',
  '使用 AI 编程工具做项目',
];

export default function LearnIndexPage() {
  const sortedArticles = [...learnTutorials].sort((a, b) => a.order - b.order);

  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://www.apiuspro.cn' },
          { name: 'AI 新手教程', url: 'https://www.apiuspro.cn/learn' },
        ]}
      />
      <ItemListSchema
        name="AI 新手入门教程"
        items={sortedArticles.map((article) => ({
          name: article.title,
          url: `https://www.apiuspro.cn${article.path}`,
          description: article.description,
        }))}
      />

      <div className="mx-auto max-w-6xl p-6 lg:p-8">
        <section className="mb-8 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold text-muted-foreground">AI Beginner Guide</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            AI 新手入门教程
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            这组教程按学习顺序整理：先理解 <strong className="font-semibold text-foreground">AI、模型、提示词和 Token</strong>，再学习
            <mark className="mx-1 rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">API Key</mark>
            <mark className="mx-1 rounded-md border border-sky-200 bg-sky-50 px-1.5 py-0.5 font-semibold text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200">Base URL</mark>
            和 <mark className="mx-1 rounded-md border border-amber-200 bg-amber-50 px-1.5 py-0.5 font-semibold text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">模型名称</mark>，最后用 Codex、Claude Code、CC Switch 做真实项目。
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
              6 篇教程
            </Badge>
            <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/30 dark:text-sky-300">
              适合零基础
            </Badge>
            <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
              含代码块和模板
            </Badge>
          </div>
        </section>

        <section className="mb-8 rounded-xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-950/30">
          <p className="text-sm font-semibold text-sky-800 dark:text-sky-200">建议学习顺序</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {learningFlow.map((item, index) => (
              <div key={item} className="rounded-lg border border-sky-200 bg-background/70 p-4 dark:border-sky-800 dark:bg-background/40">
                <p className="text-xs font-semibold text-sky-600 dark:text-sky-300">STEP {index + 1}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sortedArticles.map((article) => (
            <article key={article.slug} className="flex min-h-64 flex-col rounded-xl border bg-card p-5 transition-colors hover:border-foreground/30">
              <div className="mb-3 flex items-start justify-between gap-3">
                <p className="rounded-full border bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">第 {article.order} 篇</p>
                <p className="text-xs text-muted-foreground">{article.readingTime}</p>
              </div>
              <h2 className="text-lg font-semibold leading-7 text-foreground">{article.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{article.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={article.path} className="mt-5">
                <Button variant="outline" className="w-full min-h-[44px]" size="sm">
                  阅读教程
                </Button>
              </Link>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-950/30">
            <h2 className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">适合谁</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-emerald-700 dark:text-emerald-200">
              <li>• 完全不了解 AI、模型和 API 的新手</li>
              <li>• 想用 AI 写文章、学编程、做网站的人</li>
              <li>• 想搞懂 API Key、Base URL 和模型名称的人</li>
              <li>• 准备用 Codex、Claude Code 或 CC Switch 做项目的人</li>
            </ul>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/30">
            <h2 className="text-sm font-semibold text-amber-800 dark:text-amber-200">阅读建议</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-700 dark:text-amber-200">
              <li>• 不要跳过前 3 篇，否则后面 API 内容会比较难理解</li>
              <li>• 看到代码块时先理解结构，不要直接填真实 Key</li>
              <li>• 做项目时先备份代码，再让 AI 修改</li>
              <li>• 重要配置以官方文档和控制台显示为准</li>
            </ul>
          </div>
        </section>
      </div>
    </SidebarLayout>
  );
}
