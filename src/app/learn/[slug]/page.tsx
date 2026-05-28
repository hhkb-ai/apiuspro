import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Button } from '@/components/ui/button';
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo/structured-data';
import { getLearnArticle, learnTutorials, LearnArticle, LearnSection } from '@/lib/learn-tutorials';

const ARTICLE_DATE = '2026-05-29';

const highlightTerms = [
  { text: 'AI 编程工具', className: 'border-slate-200 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100' },
  { text: 'Claude Code', className: 'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/40 dark:text-orange-200' },
  { text: 'CC Switch', className: 'border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-200' },
  { text: 'API Key', className: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200' },
  { text: 'Base URL', className: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200' },
  { text: '模型名称', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200' },
  { text: '网页聊天', className: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200' },
  { text: 'API 接入', className: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200' },
  { text: 'AI 工具', className: 'border-slate-200 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100' },
  { text: '学习辅导', className: 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-800 dark:bg-fuchsia-950/40 dark:text-fuchsia-200' },
  { text: '长上下文', className: 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-200' },
  { text: '多模态', className: 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-200' },
  { text: 'Token', className: 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-200' },
  { text: '上下文', className: 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-200' },
  { text: '提示词', className: 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-800 dark:bg-fuchsia-950/40 dark:text-fuchsia-200' },
  { text: 'Codex', className: 'border-slate-200 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100' },
  { text: 'curl', className: 'border-slate-200 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100' },
  { text: '请求', className: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200' },
  { text: '响应', className: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200' },
  { text: '问答', className: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200' },
  { text: '写作', className: 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-800 dark:bg-fuchsia-950/40 dark:text-fuchsia-200' },
  { text: '总结', className: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200' },
  { text: '翻译', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200' },
  { text: '编程', className: 'border-slate-200 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100' },
  { text: '模型', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200' },
  { text: 'AI', className: 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-200' },
  { text: '401', className: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200' },
  { text: '429', className: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200' },
];

const sortedHighlightTerms = [...highlightTerms].sort((a, b) => b.text.length - a.text.length);
const highlightPattern = new RegExp(`(${sortedHighlightTerms.map(({ text }) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
const highlightClassByTerm = new Map(highlightTerms.map(({ text, className }) => [text.toLowerCase(), className]));
const richTextPattern = /(`[^`]+`|【[^】]+】)/g;

export function generateStaticParams() {
  return learnTutorials.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getLearnArticle(slug);

  if (!article) {
    return { title: 'AI 新手教程 | API知识站' };
  }

  return {
    title: `${article.title} | API知识站`,
    description: article.description,
    keywords: article.tags,
    alternates: { canonical: `https://www.apiuspro.cn${article.path}` },
  };
}

function renderPlainTextWithHighlights(text: string, keyPrefix: string) {
  return text.split(highlightPattern).filter(Boolean).map((part, index) => {
    const className = highlightClassByTerm.get(part.toLowerCase());
    if (!className) return <span key={`${keyPrefix}-${index}`}>{part}</span>;

    return (
      <mark key={`${keyPrefix}-${index}`} className={`rounded-md border px-1.5 py-0.5 font-semibold box-decoration-clone ${className}`}>
        {part}
      </mark>
    );
  });
}

function RichText({ text, className = '' }: { text: string; className?: string }) {
  const parts = text.split(richTextPattern).filter(Boolean);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={index} className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground break-all">
              {part.slice(1, -1)}
            </code>
          );
        }

        if (part.startsWith('【') && part.endsWith('】')) {
          return (
            <strong key={index} className="rounded-md border border-rose-200 bg-rose-50 px-1.5 py-0.5 font-semibold text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200">
              {part.slice(1, -1)}
            </strong>
          );
        }

        return <span key={index}>{renderPlainTextWithHighlights(part, `rt-${index}`)}</span>;
      })}
    </span>
  );
}

function CodeBlock({ title, language, content }: { title: string; language: string; content: string }) {
  return (
    <div className="my-5 overflow-hidden rounded-xl border bg-muted/30">
      <div className="flex items-center justify-between border-b bg-muted px-4 py-2">
        <span className="text-xs font-semibold text-foreground">{title}</span>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{language}</span>
      </div>
      <pre className="max-w-full overflow-x-auto whitespace-pre p-4 font-mono text-[13px] leading-6 text-foreground">
        <code>{content}</code>
      </pre>
    </div>
  );
}

function DataTable({ section }: { section: LearnSection }) {
  if (!section.table) return null;

  return (
    <div className="my-5 overflow-x-auto rounded-xl border">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead className="bg-muted/70">
          <tr>
            {section.table.headers.map((header) => (
              <th key={header} className="border-b px-4 py-3 text-left font-semibold text-foreground">
                <RichText text={header} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.table.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b last:border-b-0">
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-3 align-top leading-6 text-muted-foreground">
                  <RichText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Flow({ items }: { items: string[] }) {
  return (
    <div className="my-5 rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-800 dark:bg-sky-950/30">
      <p className="mb-3 text-sm font-semibold text-sky-800 dark:text-sky-200">流程图</p>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <div key={item} className="rounded-lg border border-sky-200 bg-background/70 p-4 dark:border-sky-800 dark:bg-background/40">
            <p className="text-xs font-semibold text-sky-600 dark:text-sky-300">STEP {index + 1}</p>
            <p className="mt-1 text-sm font-semibold text-foreground"><RichText text={item} /></p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArticleSection({ section, index }: { section: LearnSection; index: number }) {
  return (
    <section id={`section-${index}`} className="scroll-mt-24 border-b border-border pb-10 last:border-b-0">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
          {index + 1}
        </span>
        <h2 className="text-xl font-semibold tracking-tight text-foreground"><RichText text={section.title} /></h2>
      </div>

      {section.intro && <p className="mb-4 text-[15px] leading-7 text-muted-foreground"><RichText text={section.intro} /></p>}
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mb-4 text-[15px] leading-7 text-muted-foreground">
          <RichText text={paragraph} />
        </p>
      ))}
      {section.bullets && (
        <ul className="my-5 space-y-2 rounded-xl border bg-muted/30 p-5">
          {section.bullets.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
              <span><RichText text={item} /></span>
            </li>
          ))}
        </ul>
      )}
      <DataTable section={section} />
      {section.flow && <Flow items={section.flow} />}
      {section.code && <CodeBlock title={section.code.title} language={section.code.language} content={section.code.content} />}
      {section.warning && (
        <div className="my-5 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
          <strong className="font-semibold">注意：</strong><RichText text={section.warning} />
        </div>
      )}
      {section.tips && (
        <div className="my-5 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-800 dark:bg-emerald-950/30">
          <p className="mb-2 text-sm font-semibold text-emerald-800 dark:text-emerald-200">实用建议</p>
          <ul className="space-y-2 text-sm leading-6 text-emerald-700 dark:text-emerald-200">
            {section.tips.map((tip) => <li key={tip}>• <RichText text={tip} /></li>)}
          </ul>
        </div>
      )}
    </section>
  );
}

function RelatedArticles({ current }: { current: LearnArticle }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {learnTutorials.filter((article) => article.slug !== current.slug).map((article) => (
        <Link key={article.slug} href={article.path} className="rounded-xl border bg-muted/30 p-4 transition-colors hover:border-foreground/30 hover:bg-card">
          <p className="text-xs font-semibold text-muted-foreground">第 {article.order} 篇</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-foreground">{article.title}</p>
        </Link>
      ))}
    </div>
  );
}

export default async function LearnArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getLearnArticle(slug);
  if (!article) notFound();

  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://www.apiuspro.cn' },
          { name: 'AI 新手教程', url: 'https://www.apiuspro.cn/learn' },
          { name: article.title, url: `https://www.apiuspro.cn${article.path}` },
        ]}
      />
      <ArticleSchema
        title={article.title}
        description={article.description}
        url={`https://www.apiuspro.cn${article.path}`}
        datePublished={ARTICLE_DATE}
        dateModified={ARTICLE_DATE}
      />

      <div className="mx-auto max-w-6xl p-6 lg:p-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_240px]">
          <article className="min-w-0 rounded-2xl border bg-card shadow-sm">
            <header className="border-b px-5 py-7 sm:px-8">
              <Link href="/learn" className="text-sm font-medium text-muted-foreground hover:text-foreground">← 返回 AI 新手教程</Link>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">第 {article.order} 篇</span>
                <span className="rounded-full border bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">{article.readingTime}</span>
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"><RichText text={article.title} /></h1>
              <p className="mt-4 text-base leading-7 text-muted-foreground"><RichText text={article.description} /></p>

              <section className="mt-6 rounded-xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-950/30">
                <p className="text-sm font-semibold text-sky-800 dark:text-sky-200">你会学到什么</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {article.learnings.map((item) => (
                    <div key={item} className="rounded-lg border border-sky-200 bg-background/70 px-3 py-2 text-sm font-medium text-foreground dark:border-sky-800 dark:bg-background/40">
                      <RichText text={item} />
                    </div>
                  ))}
                </div>
              </section>
            </header>

            <div className="space-y-10 px-5 py-7 sm:px-8">
              {article.sections.map((section, index) => (
                <ArticleSection key={section.title} section={section} index={index} />
              ))}

              <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-950/30">
                <h2 className="text-base font-semibold text-emerald-800 dark:text-emerald-200">本篇总结</h2>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-emerald-700 dark:text-emerald-200">
                  {article.summary.map((item) => <li key={item}>• <RichText text={item} /></li>)}
                </ul>
              </section>

              {article.next && (
                <section className="rounded-xl border bg-muted/30 p-5">
                  <h2 className="text-base font-semibold text-foreground">下一步学习建议</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    按顺序继续阅读下一篇，避免直接跳到工具配置导致概念混乱。
                  </p>
                  <Link href={article.next.href} className="mt-4 inline-flex">
                    <Button>{article.next.title}</Button>
                  </Link>
                </section>
              )}
            </div>
          </article>

          <aside className="hidden xl:block">
            <div className="sticky top-8 space-y-5">
              <div className="rounded-xl border bg-card p-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">On this page</p>
                <nav className="space-y-1 border-l border-border">
                  {article.sections.map((section, index) => (
                    <a key={section.title} href={`#section-${index}`} className="block truncate py-1.5 pl-3 text-xs text-muted-foreground hover:text-foreground">
                      {index + 1}. {section.title}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <p className="mb-3 text-sm font-semibold text-foreground">其他教程</p>
                <RelatedArticles current={article} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SidebarLayout>
  );
}
