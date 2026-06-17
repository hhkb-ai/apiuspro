import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrandIcon } from '@/components/api/BrandIcon';
import { BreadcrumbSchema, TechArticleSchema } from '@/components/seo/structured-data';
import { DetailBackNav, RememberListLink } from '@/components/navigation/ReturnNavigation';
import { BreadcrumbNav } from '@/components/navigation/BreadcrumbNav';
import { CodeBlock } from '@/components/tutorial/CodeBlock';
import { apiList, type APIConfig } from '@/lib/api-config';
import {
  errorSolutions,
  getAllErrorSolutionIds,
  getErrorSolutionById,
  type ErrorSolution,
} from '@/lib/error-solution-config';

const ARTICLE_DATE_PUBLISHED = '2026-05-15';
const ARTICLE_DATE_MODIFIED = '2026-05-15';

export function generateStaticParams() {
  return getAllErrorSolutionIds().map(id => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const solution = getErrorSolutionById(id);
  if (!solution) return { title: '错误解决方案未找到' };

  return {
    title: `${solution.shortTitle} 怎么解决`,
    description: solution.summary,
    alternates: {
      canonical: `https://www.apiuspro.cn/error/${solution.id}`,
    },
    openGraph: {
      title: solution.title,
      description: solution.summary,
      url: `https://www.apiuspro.cn/error/${solution.id}`,
      siteName: 'API知识站',
      locale: 'zh_CN',
      type: 'article',
    },
  };
}

function statusClass(statusLabel: string) {
  if (statusLabel.includes('认证') || statusLabel.includes('Key')) {
    return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-200';
  }
  if (statusLabel.includes('限流') || statusLabel.includes('额度')) {
    return 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300';
  }
  return 'border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300';
}

function getRelatedTutorials(solution: ErrorSolution): APIConfig[] {
  return solution.relatedTutorialIds
    .map(id => apiList.find(api => api.id === id && api.tutorial))
    .filter((api): api is APIConfig => Boolean(api));
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
      {items.map(item => (
        <li key={item} className="flex gap-3">
          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/45" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionShell({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="mb-4 text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export default async function ErrorSolutionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const solution = getErrorSolutionById(id);
  if (!solution) notFound();

  const relatedTutorials = getRelatedTutorials(solution);

  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://www.apiuspro.cn' },
          { name: '错误解决', url: 'https://www.apiuspro.cn/error' },
          { name: solution.shortTitle, url: `https://www.apiuspro.cn/error/${solution.id}` },
        ]}
      />
      <TechArticleSchema
        title={solution.title}
        description={solution.summary}
        url={`https://www.apiuspro.cn/error/${solution.id}`}
        datePublished={ARTICLE_DATE_PUBLISHED}
        dateModified={ARTICLE_DATE_MODIFIED}
        proficiencyLevel="Beginner"
      />

      <div className="mx-auto max-w-6xl p-6 lg:p-8">
        <DetailBackNav listHref="/error" listLabel="错误解决列表" />
        <BreadcrumbNav items={[
          { label: '首页', href: '/' },
          { label: '错误解决', href: '/error' },
          { label: solution.shortTitle },
        ]} />


        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_240px]">
          <div className="min-w-0">
            <div className="mb-8 border-b pb-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge variant="outline" className={statusClass(solution.statusLabel)}>
                  {solution.statusLabel}
                </Badge>
                <span className="text-sm text-muted-foreground">{solution.affectedArea}</span>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">{solution.title}</h1>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-muted-foreground">
                {solution.summary}
              </p>
            </div>

            <Card className="mb-8 hidden border-sky-200 bg-sky-50 dark:border-sky-800 dark:bg-sky-950/30 shadow-sm sm:block">
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-sky-900 dark:text-sky-200">排查结论</p>
                <p className="mt-2 text-sm leading-6 text-sky-800 dark:text-sky-300">
                  先用最小请求隔离问题：只保留 API Key、Base URL、模型名和一条 ping 消息。最小请求失败，先修配置；最小请求成功，再回到业务代码排查并发、上下文和部署环境。
                </p>
              </CardContent>
            </Card>
            <details className="mb-8 rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-900 dark:text-sky-100 sm:hidden">
              <summary className="cursor-pointer select-none px-4 py-3 text-sm font-bold">排查结论（点开查看）</summary>
              <p className="border-t border-sky-200 dark:border-sky-800 px-4 py-3 text-sm leading-7 text-sky-800 dark:text-sky-300">
                先用最小请求隔离问题：只保留 API Key、Base URL、模型名和一条 ping 消息。最小请求失败，先修配置；最小请求成功，再回到业务代码排查并发、上下文和部署环境。
              </p>
            </details>

            <div className="space-y-10">
              <SectionShell id="symptoms" title="1. 问题现象">
                <Card className="border-border/80 shadow-sm">
                  <CardContent className="p-5">
                    <BulletList items={solution.symptoms} />
                  </CardContent>
                </Card>
              </SectionShell>

              <SectionShell id="causes" title="2. 最可能原因">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {solution.causes.map(cause => (
                    <div key={cause} className="rounded-lg border bg-card p-4 text-sm leading-6 text-muted-foreground">
                      {cause}
                    </div>
                  ))}
                </div>
              </SectionShell>

              <SectionShell id="checklist" title="3. 快速排查清单">
                <div className="space-y-3">
                  {solution.checklist.map((item, index) => (
                    <Card key={item.label} className="border-border/80 shadow-sm">
                      <CardContent className="flex gap-4 p-5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold">{item.label}</h3>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </SectionShell>

              <SectionShell id="api-special-cases" title="4. 对应 API 的特殊情况">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {solution.apiSpecialCases.map(item => (
                    <Card key={item.api} className="border-border/80 shadow-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">{item.api}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm leading-6 text-muted-foreground">{item.note}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </SectionShell>

              <SectionShell id="fix-examples" title="5. 可复制的修复示例">
                <div className="space-y-5">
                  {solution.fixExamples.map(example => (
                    <Card key={example.title} className="border-border/80 shadow-sm">
                      <CardHeader className="pb-0">
                        <CardTitle className="text-base">{example.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-5">
                        <CodeBlock
                          code={example.code}
                          language={example.language}
                          explanation={example.explanation}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </SectionShell>

              <SectionShell id="related-tutorials" title="6. 相关教程内链">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {relatedTutorials.map(api => (
                    <Card key={api.id} className="border-border/80 shadow-sm transition-colors hover:border-foreground/30">
                      <CardContent className="p-5">
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <BrandIcon id={api.id} alt={api.name} size="sm" />
                            <h3 className="truncate font-semibold">{api.name} 购买教程</h3>
                          </div>
                          <Badge variant="outline" className={api.proxy ? 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300' : 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'}>
                            {api.proxy ? '需代理' : '国内直连'}
                          </Badge>
                        </div>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {api.tutorial?.subtitle || api.desc}
                        </p>
                        <RememberListLink href={`/tutorial/${api.id}`} listLabel="错误解决方案">
                          <Button variant="outline" size="sm" className="mt-4">查看教程</Button>
                        </RememberListLink>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </SectionShell>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-6">
              <div>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">On this page</p>
                <nav className="space-y-1 border-l border-border">
                  {[
                    ['symptoms', '问题现象'],
                    ['causes', '最可能原因'],
                    ['checklist', '快速排查清单'],
                    ['api-special-cases', 'API 特殊情况'],
                    ['fix-examples', '修复示例'],
                    ['related-tutorials', '相关教程'],
                  ].map(([href, label]) => (
                    <a
                      key={href}
                      href={`#${href}`}
                      className="block py-1.5 pl-3 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {label}
                    </a>
                  ))}
                </nav>
              </div>

              <div>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">错误类型</p>
                <nav className="space-y-1">
                  {errorSolutions.map(item => (
                    <Link
                      key={item.id}
                      href={`/error/${item.id}`}
                      className={`block rounded-md px-3 py-2 text-[13px] transition-colors ${
                        item.id === solution.id
                          ? 'bg-muted font-semibold text-foreground'
                          : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                      }`}
                    >
                      {item.shortTitle}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SidebarLayout>
  );
}
