import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BreadcrumbSchema } from '@/components/seo/structured-data';
import { LearnMarkdown, getMarkdownHeadings } from '@/components/learn/LearnMarkdown';
import { getAllLearnArticles, getLearnArticleBySlug, getPreviousAndNextArticle } from '@/lib/learn-config';

const relatedLinks = [
  { title: 'API 教程列表', href: '/tutorial' },
  { title: 'DeepSeek 教程', href: '/tutorial/deepseek' },
  { title: 'MiMo 教程', href: '/tutorial/mimo' },
  { title: 'Codex 教程', href: '/app/codex' },
  { title: 'CC Switch 教程', href: '/app/ccswitch' },
  { title: 'Claude Code 教程', href: '/app/claude-code' },
];

export function generateStaticParams() {
  return getAllLearnArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getLearnArticleBySlug(slug);

  if (!article) {
    return { title: '文章未找到 - API知识站' };
  }

  return {
    title: `${article.title} - API知识站`,
    description: article.description,
  };
}

export default async function LearnArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getLearnArticleBySlug(slug);

  if (!article) notFound();

  const headings = getMarkdownHeadings(article.content);
  const { previous, next } = getPreviousAndNextArticle(slug);

  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://www.apiuspro.cn' },
          { name: 'AI 新手学习中心', url: 'https://www.apiuspro.cn/learn' },
          { name: article.title, url: `https://www.apiuspro.cn/learn/${article.slug}` },
        ]}
      />
      <div className="mx-auto max-w-6xl p-6 lg:p-8">
        <div className="mb-6">
          <Button asChild variant="outline" size="sm">
            <Link href="/learn">返回学习中心</Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <main className="min-w-0">
            <article className="rounded-lg border bg-card p-5 sm:p-7">
              <div className="mb-5 flex flex-wrap gap-2">
                <Badge variant="outline" className="border-border bg-muted text-muted-foreground">{article.readingTime}</Badge>
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-border bg-card text-muted-foreground">{tag}</Badge>
                ))}
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">{article.title}</h1>
              <p className="mt-3 text-base leading-7 text-muted-foreground">{article.description}</p>

              {article.cover?.src && (
                <figure className="my-7 overflow-hidden rounded-lg border border-border bg-background">
                  <Image
                    src={article.cover.src}
                    alt={article.cover.alt}
                    width={960}
                    height={540}
                    className="h-auto w-full"
                    priority
                  />
                  <figcaption className="border-t border-border px-4 py-3 text-xs leading-5 text-muted-foreground">{article.cover.caption}</figcaption>
                </figure>
              )}

              <LearnMarkdown content={article.content} />
            </article>

            <nav className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {previous ? (
                <Link href={`/learn/${previous.slug}`} className="rounded-lg border bg-card p-4 transition-colors hover:border-foreground/30">
                  <p className="text-xs text-muted-foreground">上一篇</p>
                  <p className="mt-1 text-sm font-semibold">{previous.title}</p>
                </Link>
              ) : (
                <div className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">已经是第一篇</div>
              )}
              {next ? (
                <Link href={`/learn/${next.slug}`} className="rounded-lg border bg-card p-4 transition-colors hover:border-foreground/30">
                  <p className="text-xs text-muted-foreground">下一篇</p>
                  <p className="mt-1 text-sm font-semibold">{next.title}</p>
                </Link>
              ) : (
                <div className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">已经是最后一篇</div>
              )}
            </nav>

            <section className="mt-6 rounded-lg border bg-card p-5">
              <h2 className="text-xl font-semibold tracking-tight">相关入口</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {relatedLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-lg border border-border p-4 text-sm font-semibold transition-colors hover:border-foreground/30">
                    {item.title}
                  </Link>
                ))}
              </div>
            </section>
          </main>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm font-semibold">文章目录</p>
              {headings.length > 0 ? (
                <nav className="mt-3 space-y-1">
                  {headings.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={heading.level === 3 ? 'block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground ml-3' : 'block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground'}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">暂无目录</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </SidebarLayout>
  );
}
