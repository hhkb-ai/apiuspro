import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getUseCaseById, getAllUseCaseIds } from '@/lib/use-case-config';
import { apiList } from '@/lib/api-config';
import { reviewSlugByApiId } from '@/lib/review-config';
import { BreadcrumbSchema } from '@/components/seo/structured-data';
import { generateMetadata as generateTdkMetadata } from '@/lib/tdk';

const BASE_URL = 'https://www.apiuspro.cn';

export function generateStaticParams() {
  return getAllUseCaseIds().map((id) => ({ id }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  return params.then(({ id }) => {
    const uc = getUseCaseById(id);
    if (!uc) return {};
    const apiNames = uc.recommendations.map((r) => {
      const api = apiList.find((a) => a.id === r.apiId);
      return api?.name;
    }).filter(Boolean);

    return generateTdkMetadata('/use-case/:id', {
      id,
      name: uc.name,
      description: uc.description,
      apiNames: apiNames.join('、'),
      count: apiNames.length,
      keywords: uc.keywords.join(','),
    });
  });
}

function StarRating({ score }: { score: number }) {
  return (
    <span className="text-amber-500" aria-label={`推荐指数 ${score} 星`}>
      {'★'.repeat(score)}
      {'☆'.repeat(5 - score)}
    </span>
  );
}

const validationChecklist = [
  '准备 3-5 个真实样本，不要只用一句测试 prompt 判断模型好坏',
  '记录每次调用的输入输出 Token、响应时间、失败率和人工修改成本',
  '同一任务至少对比一个国内直连模型和一个能力更强的旗舰模型',
  '上线前配置预算告警、限流、重试、日志脱敏和 API Key 轮换策略',
];

export default async function UseCaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const uc = getUseCaseById(id);
  if (!uc) notFound();

  const recommendations = uc.recommendations
    .map((rec) => {
      const api = apiList.find((a) => a.id === rec.apiId);
      const reviewSlug = reviewSlugByApiId[rec.apiId];
      return { ...rec, api, reviewSlug };
    })
    .filter((r): r is typeof r & { api: NonNullable<typeof r.api> } => Boolean(r.api))
    .sort((a, b) => b.score - a.score);

  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: BASE_URL },
          { name: '场景推荐', url: `${BASE_URL}/use-case` },
          { name: uc.name, url: `${BASE_URL}/use-case/${id}` },
        ]}
      />
      <div className="mx-auto max-w-4xl p-6 lg:p-8">
        {/* Hero */}
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">Use Case</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{uc.name}</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            {uc.heroDescription}
          </p>
        </div>

        {/* 选型结论 */}
        <section className="mb-8 hidden space-y-3 sm:block">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">首选 API</p>
              <p className="mt-1 text-lg font-bold text-emerald-900 dark:text-emerald-200">{uc.primaryPick}</p>
            </div>
            <div className="rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">备选 API</p>
              <p className="mt-1 text-lg font-bold text-sky-900 dark:text-sky-200">{uc.altPick}</p>
            </div>
            <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">不建议选择</p>
              <p className="mt-1 text-sm leading-5 text-amber-800 dark:text-amber-200">{uc.notRecommended}</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-xs font-semibold text-muted-foreground">新手快速选择</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{uc.quickPick}</p>
          </div>
        </section>
        <details className="mb-8 rounded-lg border border-border bg-card text-foreground sm:hidden">
          <summary className="cursor-pointer select-none px-4 py-3 text-sm font-bold">选型结论（点开查看）</summary>
          <div className="border-t border-border px-4 py-3 space-y-3 text-sm">
            <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">首选 API</p>
              <p className="mt-1 font-bold text-emerald-900 dark:text-emerald-200">{uc.primaryPick}</p>
            </div>
            <div className="rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">备选 API</p>
              <p className="mt-1 font-bold text-sky-900 dark:text-sky-200">{uc.altPick}</p>
            </div>
            <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">不建议选择</p>
              <p className="mt-1 text-amber-800 dark:text-amber-200">{uc.notRecommended}</p>
            </div>
            <p className="text-muted-foreground"><span className="font-semibold">新手快速选择：</span>{uc.quickPick}</p>
          </div>
        </details>

        {/* 选型要点 */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">选型要点</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {uc.selectionCriteria.map((c) => (
              <div key={c.title} className="rounded-lg border bg-card p-5">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-lg border bg-card p-5">
          <h2 className="text-xl font-semibold tracking-tight">落地验证清单</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            选型不要只看榜单或参数。把模型放进真实业务流程里测试，才能判断它是否真正适合 {uc.name}。
          </p>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
            {validationChecklist.map((item) => (
              <div key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 推荐 API 列表 */}
        <section>
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-xl font-semibold tracking-tight">推荐 API</h2>
            <Badge variant="outline" className="border-border bg-card text-muted-foreground">
              {recommendations.length} 个
            </Badge>
          </div>
          <div className="space-y-4">
            {recommendations.map((rec, idx) => (
              <article
                key={rec.apiId}
                className="rounded-lg border bg-card p-5 transition-colors hover:border-foreground/30"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold">{rec.api!.name}</h3>
                      <div className="mt-0.5 flex items-center gap-2">
                        <StarRating score={rec.score} />
                        <span className="text-xs text-muted-foreground">
                          {rec.score}/5
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {rec.api!.proxy === true && (
                      <Badge variant="outline" className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-700">
                        需代理
                      </Badge>
                    )}
                    {rec.api!.free && (
                      <Badge variant="outline" className="border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700">
                        {rec.api!.free}
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {rec.reason}
                </p>

                <ul className="mt-3 space-y-1">
                  {rec.strengths.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-0.5 text-emerald-500">+</span>
                      {s}
                    </li>
                  ))}
                </ul>
                {rec.risks.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {rec.risks.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-amber-600">
                        <span className="mt-0.5">!</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href={`/api/${rec.apiId}`}>
                    <Button variant="outline" size="sm">{rec.api!.name} 官网与教程</Button>
                  </Link>
                  {rec.reviewSlug && (
                    <Link href={`/api-review/${rec.reviewSlug}`}>
                      <Button variant="outline" size="sm">{rec.api!.name} 完整测评</Button>
                    </Link>
                  )}
                  {rec.api!.tutorial && (
                    <Link href={`/tutorial/${rec.apiId}`}>
                      <Button variant="outline" size="sm">{rec.api!.name} 购买教程</Button>
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 底部 CTA */}
        <div className="mt-8 rounded-lg border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            想了解更多 API？查看完整的 API 列表和对比测评。
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Link href="/cloud-api">
              <Button variant="outline" size="sm">全部 API 官网入口</Button>
            </Link>
            <Link href="/api-review">
              <Button variant="outline" size="sm">API 测评对比</Button>
            </Link>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
