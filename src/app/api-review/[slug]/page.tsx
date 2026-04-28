import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getReviewDetail, getAllReviewSlugs } from '@/lib/review-config';
import { BreadcrumbSchema, ArticleSchema } from '@/components/seo/structured-data';

export function generateStaticParams() {
  return getAllReviewSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const review = getReviewDetail(slug);
  if (!review) return { title: '测评未找到' };

  const title = `${review.name} 完整测评 | 性能对比、价格与购买建议`;
  const desc = `${review.name} 深度测评：${review.tlDr}。含基准测试、定价对比和选购建议。`;

  return {
    title,
    description: desc,
    alternates: {
      canonical: `https://apiuspro.cn/api-review/${slug}`,
    },
    openGraph: {
      title,
      description: desc,
      url: `https://apiuspro.cn/api-review/${slug}`,
      siteName: 'API知识站',
      locale: 'zh_CN',
      type: 'article',
      images: [{ url: 'https://apiuspro.cn/opengraph-image', width: 1200, height: 630, alt: review.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: ['https://apiuspro.cn/opengraph-image'],
    },
  };
}

function StarRating({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.min(Math.max(score - i, 0), 1);
        return (
          <span key={i} className="relative text-lg">
            <span className="text-muted-foreground/30">★</span>
            <span
              className="absolute inset-0 overflow-hidden text-foreground"
              style={{ width: `${fill * 100}%` }}
            >
              ★
            </span>
          </span>
        );
      })}
      <span className="ml-2 text-sm font-bold">{score.toFixed(1)}</span>
    </div>
  );
}

export default async function ReviewDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const review = getReviewDetail(slug);
  if (!review) notFound();

  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://apiuspro.cn' },
          { name: 'API测评', url: 'https://apiuspro.cn/api-review' },
          { name: review.name, url: `https://apiuspro.cn/api-review/${review.slug}` },
        ]}
      />
      <ArticleSchema
        title={`${review.name} 完整测评`}
        description={review.tlDr}
        url={`https://apiuspro.cn/api-review/${review.slug}`}
      />
      <div className="mx-auto max-w-5xl p-6 lg:p-8">
        {/* 返回链接 */}
        <Link
          href="/api-review"
          className="mb-6 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          &#8592; 返回API测评列表
        </Link>

        {/* 标题 */}
        <div className="mb-8 border-b pb-8">
          <div className="mb-4 flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border bg-card text-3xl shadow-sm">
              {review.icon}
            </span>
            <div className="min-w-0">
              <h1 className="text-3xl font-semibold tracking-tight">{review.name}</h1>
              <div className="mt-3 flex flex-wrap gap-2">
                {review.badges.map((b) => (
                  <Badge
                    key={b.label}
                    variant={b.variant === 'destructive' ? 'destructive' : 'default'}
                    className={
                      b.variant === 'success'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : ''
                    }
                  >
                    {b.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 省流版 */}
        <Card className="mb-10 overflow-hidden border-border/80 shadow-sm">
          <CardContent className="border-l-4 border-foreground/70 bg-muted/25 p-5">
            <p className="mb-2 text-lg font-semibold">省流版总结</p>
            <p className="max-w-3xl text-[15px] leading-7 text-muted-foreground">{review.tlDr}</p>
          </CardContent>
        </Card>

        {/* 评分维度详解 */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">评分维度详解</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {review.ratings.map((r) => (
              <Card key={r.label} className="border-border/80 shadow-sm">
                <CardContent className="p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">{r.label}</span>
                    <span className="text-sm text-muted-foreground">{r.score.toFixed(1)}/5</span>
                  </div>
                  <StarRating score={r.score} />
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{r.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 优缺点 */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">优缺点分析</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="border-green-200 bg-green-50/35 shadow-sm dark:border-green-900 dark:bg-green-950/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-700 dark:text-green-400 text-base">优点</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                  {review.pros.map((p, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-600 text-[10px] text-white">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50/35 shadow-sm dark:border-red-900 dark:bg-red-950/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-red-700 dark:text-red-400 text-base">缺点</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                  {review.cons.map((c, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">!</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 基准测试 */}
        {review.benchmarks && review.benchmarks.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold tracking-tight">基准测试 vs 竞品</h2>
            <Card className="border-border/80 shadow-sm">
              <CardContent className="overflow-x-auto p-0">
                <table className="min-w-[720px] w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="px-4 py-3 text-left font-medium">基准测试</th>
                      {Object.keys(review.benchmarks[0].values).map((k) => (
                        <th key={k} className="px-4 py-3 text-center font-medium">
                          {k}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {review.benchmarks.map((b) => {
                      const values = Object.values(b.values);
                      const maxVal = Math.max(
                        ...values.map((v) => (v === '—' ? -1 : parseFloat(v)))
                      );
                      return (
                        <tr key={b.name} className="border-b last:border-0">
                          <td className="px-4 py-3 font-medium">{b.name}</td>
                          {Object.entries(b.values).map(([model, val]) => {
                            const isWinner =
                              val !== '—' && Math.abs(parseFloat(val) - maxVal) < 0.01;
                            return (
                              <td
                                key={model}
                                className={`px-4 py-3 text-center ${
                                  isWinner ? 'font-bold text-foreground' : 'text-muted-foreground'
                                }`}
                              >
                                {val}
                                {isWinner && val !== '—' && ' 最佳'}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </section>
        )}

        {/* 价格 */}
        {review.pricing && review.pricing.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold tracking-tight">定价方案</h2>
            <Card className="border-border/80 shadow-sm">
              <CardContent className="overflow-x-auto p-0">
                <table className="min-w-[520px] w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="px-4 py-3 text-left font-medium">型号</th>
                      <th className="px-4 py-3 text-center font-medium">输入价格</th>
                      <th className="px-4 py-3 text-center font-medium">输出价格</th>
                    </tr>
                  </thead>
                  <tbody>
                    {review.pricing.map((p) => (
                      <tr key={p.model} className="border-b last:border-0">
                        <td className="px-4 py-3 font-medium">{p.model}</td>
                        <td className="px-4 py-3 text-center">{p.input}</td>
                        <td className="px-4 py-3 text-center">{p.output}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </section>
        )}

        {/* 适用场景 */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">适用场景与建议</h2>
          <Card className="border-border/80 shadow-sm">
            <CardContent className="p-5">
              <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                {review.useCases.map((uc, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/45" />
                    {uc}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* 总结 */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">总结</h2>
          <Card className="border-border/80 shadow-sm">
            <CardContent className="p-5">
              <p className="max-w-3xl text-[15px] leading-7 text-muted-foreground">{review.conclusion}</p>
            </CardContent>
          </Card>
        </section>

        {/* 底部导航 */}
        <div className="mt-8 flex flex-col justify-between gap-3 border-t pt-6 sm:flex-row sm:items-center">
          <Link href="/api-review">
            <Button variant="outline" className="w-full sm:w-auto">&#8592; 返回测评列表</Button>
          </Link>
          <Link href="/cloud-api">
            <Button variant="outline" className="w-full sm:w-auto">查看所有API &#8594;</Button>
          </Link>
        </div>
      </div>
    </SidebarLayout>
  );
}
