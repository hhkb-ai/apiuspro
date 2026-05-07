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

const BASE_URL = 'https://apiuspro.cn';

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
    return {
      title: `${uc.name} — AI API 场景推荐`,
      description: `${uc.description} 推荐 ${apiNames.join('、')} 等 ${apiNames.length} 个 API，含评分、优缺点对比与购买教程。`,
      keywords: uc.keywords,
      alternates: { canonical: `${BASE_URL}/use-case/${id}` },
      openGraph: {
        title: `${uc.name} | API知识站`,
        description: `${uc.description} 推荐 ${apiNames.join('、')} 等 ${apiNames.length} 个 API。`,
        url: `${BASE_URL}/use-case/${id}`,
        type: 'article',
      },
    };
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
    .filter((r) => r.api)
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
                      <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                        需代理
                      </Badge>
                    )}
                    {rec.api!.free && (
                      <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
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
                      <span className="mt-0.5 text-muted-foreground">-</span>
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href={`/api/${rec.apiId}`}>
                    <Button variant="outline" size="sm">API 详情</Button>
                  </Link>
                  {rec.reviewSlug && (
                    <Link href={`/api-review/${rec.reviewSlug}`}>
                      <Button variant="outline" size="sm">查看测评</Button>
                    </Link>
                  )}
                  {rec.api!.tutorial && (
                    <Link href={`/tutorial/${rec.apiId}`}>
                      <Button variant="outline" size="sm">购买教程</Button>
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
              <Button variant="outline" size="sm">全部 API</Button>
            </Link>
            <Link href="/api-review">
              <Button variant="outline" size="sm">API 测评</Button>
            </Link>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
