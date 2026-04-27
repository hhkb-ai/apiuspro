import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TutorialCard } from '@/components/tutorial/TutorialCard';
import { apiList, proxyServices, getAPIById, APIConfig } from '@/lib/api-config';
import { getReviewSlugByAPIId } from '@/lib/review-config';
import { BreadcrumbSchema } from '@/components/seo/structured-data';

export function generateStaticParams() {
  const allAPIs = [...apiList, ...proxyServices];
  return allAPIs.map((api) => ({ id: api.id }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  return params.then(({ id }) => {
    const api = getAPIById(id);
    if (!api) return { title: 'API未找到' };
    return { title: `${api.name} - API详情`, description: api.desc };
  });
}

function getAPIType(api: APIConfig): 'no-proxy' | 'need-proxy' | 'proxy' {
  if (proxyServices.find(a => a.id === api.id)) return 'proxy';
  if (api.proxy) return 'need-proxy';
  return 'no-proxy';
}

function getRelatedAPIs(currentId: string, type: string): APIConfig[] {
  if (type === 'no-proxy') return apiList.filter(a => !a.proxy && a.id !== currentId).slice(0, 3);
  if (type === 'need-proxy') return apiList.filter(a => a.proxy && a.id !== currentId).slice(0, 3);
  return proxyServices.filter(a => a.id !== currentId).slice(0, 3);
}

function badgeClass(type: string) {
  if (type === 'success') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  }
  if (type === 'warning') {
    return 'border-amber-200 bg-amber-50 text-amber-700';
  }
  return 'border-sky-200 bg-sky-50 text-sky-700';
}

function apiTypeText(apiType: 'no-proxy' | 'need-proxy' | 'proxy') {
  if (apiType === 'no-proxy') return '无需代理 - 国内直连';
  if (apiType === 'need-proxy') return '需要代理 - 合适的网络环境';
  return '代理服务 - 中转访问';
}

export default async function APIDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const api = getAPIById(id);
  if (!api) notFound();

  const apiType = getAPIType(api);
  const relatedAPIs = getRelatedAPIs(id, apiType);
  const reviewSlug = getReviewSlugByAPIId(api.id);

  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://apiuspro.cn' },
          { name: 'API官网', url: 'https://apiuspro.cn/cloud-api' },
          { name: api.name, url: `https://apiuspro.cn/api/${api.id}` },
        ]}
      />
      <div className="mx-auto max-w-6xl p-6 lg:p-8">
        <Link
          href="/cloud-api"
          className="mb-6 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          &#8592; 返回 API 列表
        </Link>

        <div className="mb-8 flex flex-col justify-between gap-5 border-b border-border pb-8 lg:flex-row lg:items-start">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight">{api.name}</h1>
              <Badge variant="outline" className={badgeClass(api.badge.type)}>{api.badge.text}</Badge>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{api.desc}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {api.tutorial && (
              <Link href={`/tutorial/${api.id}`}>
                <Button variant="outline">查看教程</Button>
              </Link>
            )}
            {reviewSlug && (
              <Link href={`/api-review/${reviewSlug}`}>
                <Button variant="outline">查看测评</Button>
              </Link>
            )}
            <a href={api.url} target="_blank" rel="noopener noreferrer">
              <Button>访问官网</Button>
            </a>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <a href={api.url} target="_blank" rel="noopener noreferrer" className="block lg:col-span-2">
            <Card className="h-full transition-colors hover:border-foreground/30">
              <CardContent className="p-5">
                <p className="font-semibold">官网直达</p>
                <p className="mt-2 truncate text-sm text-muted-foreground">
                  {api.url.replace('https://', '').replace('http://', '').split('/')[0]}
                </p>
              </CardContent>
            </Card>
          </a>

          {api.free && (
            <Card>
              <CardContent className="p-5">
                <p className="font-semibold">免费额度</p>
                <p className="mt-2 text-sm text-muted-foreground">{api.free}</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-5">
              <p className="font-semibold">API 类型</p>
              <p className="mt-2 text-sm text-muted-foreground">{apiTypeText(apiType)}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>功能特性</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {api.features.map((feature) => (
                <Badge key={feature} variant="outline" className="border-border bg-card text-muted-foreground">
                  {feature}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {api.tutorial && (
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold tracking-tight">购买教程</h2>
            <TutorialCard id={api.id} tutorial={api.tutorial} />
          </div>
        )}

        {relatedAPIs.length > 0 && (
          <section>
            <h2 className="mb-4 text-xl font-semibold tracking-tight">相关 API 推荐</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {relatedAPIs.map((related) => (
                <Link key={related.id} href={`/api/${related.id}`} className="block">
                  <Card className="h-full transition-colors hover:border-foreground/30">
                    <CardContent className="p-5">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <h3 className="font-semibold">{related.name}</h3>
                        <Badge variant="outline" className={badgeClass(related.badge.type)}>{related.badge.text}</Badge>
                      </div>
                      <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{related.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </SidebarLayout>
  );
}
