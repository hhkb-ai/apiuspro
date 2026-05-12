import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TutorialCard } from '@/components/tutorial/TutorialCard';
import { APIConfig, visibleAPIList, visibleProxyServices } from '@/lib/api-config';
import { getReviewSlugByAPIId } from '@/lib/review-config';
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from '@/components/seo/structured-data';
import { DetailBackNav } from '@/components/navigation/ReturnNavigation';
import { SITE_PUBLISHED_AT, getApiUpdatedAt } from '@/lib/content-updates';
import { generateMetadata as generateTdkMetadata } from '@/lib/tdk';

function getVisibleAPIs() {
  return [...visibleAPIList, ...visibleProxyServices];
}

function getVisibleAPIById(id: string) {
  return getVisibleAPIs().find(api => api.id === id);
}

export function generateStaticParams() {
  return getVisibleAPIs().map((api) => ({ id: api.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const api = getVisibleAPIById(id);
  if (!api) return { title: 'API未找到' };

  return generateTdkMetadata('/api/:id', {
    id,
    name: api.name,
    desc: api.desc,
    free: api.free ? `免费额度：${api.free}` : '',
    proxy: api.proxy ? '需要代理访问' : '国内直连，无需代理',
  });
}

function getAPIType(api: APIConfig): 'no-proxy' | 'need-proxy' | 'proxy' {
  if (visibleProxyServices.find(a => a.id === api.id)) return 'proxy';
  if (api.proxy) return 'need-proxy';
  return 'no-proxy';
}

function getRelatedAPIs(currentId: string, type: string): APIConfig[] {
  if (type === 'no-proxy') return visibleAPIList.filter(a => !a.proxy && a.id !== currentId).slice(0, 3);
  if (type === 'need-proxy') return visibleAPIList.filter(a => a.proxy && a.id !== currentId).slice(0, 3);
  return visibleProxyServices.filter(a => a.id !== currentId).slice(0, 3);
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

function getAudienceText(api: APIConfig) {
  if (!api.proxy) {
    return '适合初学者、个人开发者、国内项目快速接入和低门槛试用。';
  }

  return '适合对模型能力、长上下文或多模态能力要求较高，并且能处理网络和支付条件的团队。';
}

function getQuickConclusion(api: APIConfig) {
  const accessText = api.proxy
    ? '需要准备稳定网络环境，正式购买前先确认账号地区、支付方式和控制台是否可访问。'
    : '国内用户可以优先评估，通常不需要额外代理环境，适合先用免费额度或小额充值跑通测试。';
  const tutorialText = api.tutorial
    ? `本站已整理 ${api.name} 的购买教程，建议按教程完成注册、额度确认、API Key 创建和首次调用。`
    : `建议先进入 ${api.name} 官网确认注册、额度、模型名和 API Key 创建入口，再进行小规模测试。`;

  return `${api.name} API 的关键判断是：${accessText}${tutorialText}`;
}

function getApiFaqItems(api: APIConfig) {
  return [
    {
      question: `${api.name} API 国内可以访问吗？`,
      answer: api.proxy
        ? `${api.name} API 通常需要合适的网络环境或账号条件。购买前应先确认官网、控制台、支付方式和调用接口是否能稳定访问。`
        : `${api.name} API 更适合国内用户优先尝试，通常可以直接访问。正式接入前仍建议用免费额度或小额充值跑通真实任务。`,
    },
    {
      question: `${api.name} API Key 在哪里创建？`,
      answer: api.tutorial
        ? `进入 ${api.name} 控制台后，在 API Key、密钥管理或开发者设置页面创建密钥。可以继续查看本站的 ${api.name} 购买教程，按步骤完成创建与保存。`
        : `进入 ${api.name} 官网或开发者控制台后，查找 API Key、密钥管理或开发者设置页面。创建后应立即保存到环境变量或密钥管理工具。`,
    },
    {
      question: `${api.name} API 适合什么场景？`,
      answer: `${api.name} 适合的方向包括：${api.features.join('、')}。如果你还不确定具体选择，可以先查看场景推荐页，再回到该 API 详情页确认接入条件。`,
    },
    {
      question: `接入 ${api.name} API 前要确认什么？`,
      answer: `至少确认官网入口、免费额度或计费规则、Base URL、模型名、API Key 保存方式和限速规则。不要把 API Key 写入前端代码、公开仓库或截图。`,
    },
  ];
}

export default async function APIDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const api = getVisibleAPIById(id);
  if (!api) notFound();

  const apiType = getAPIType(api);
  const relatedAPIs = getRelatedAPIs(id, apiType);
  const reviewSlug = getReviewSlugByAPIId(api.id);
  const faqItems = getApiFaqItems(api);
  const quickConclusion = getQuickConclusion(api);

  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://apiuspro.cn' },
          { name: 'API官网', url: 'https://apiuspro.cn/cloud-api' },
          { name: api.name, url: `https://apiuspro.cn/api/${api.id}` },
        ]}
      />
      <ArticleSchema
        title={`${api.name} API 官网入口、购买教程与接入指南`}
        description={api.desc}
        url={`https://apiuspro.cn/api/${api.id}`}
        datePublished={SITE_PUBLISHED_AT}
        dateModified={getApiUpdatedAt(api.id)}
      />
      <FAQSchema items={faqItems} />
      <div className="mx-auto max-w-6xl p-6 lg:p-8">
        <DetailBackNav listHref="/cloud-api" listLabel="API 列表" />

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

        <Card className="mb-8 border-sky-200 bg-sky-50/70">
          <CardHeader>
            <CardTitle>快速结论</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-sky-950">
            <p>{quickConclusion}</p>
            <p>
              接入前优先确认官网入口、API Key、Base URL、模型名、额度/计费和限速规则；密钥只保存到环境变量或密钥管理工具，不要写进前端代码或公开仓库。
            </p>
          </CardContent>
        </Card>

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

        <section className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>是否适合你使用</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>{getAudienceText(api)}</p>
              <p>
                如果你正在比较 {api.name} API 怎么买、价格是否合适、能不能国内访问，建议先查看购买教程，再用免费额度或小额充值跑通一个真实任务。
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>接入前确认</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                <li>官网入口和控制台地址</li>
                <li>API Key 创建与保存方式</li>
                <li>Base URL、模型名和 SDK 兼容性</li>
                <li>免费额度、限速和计费单位</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {api.tutorial && (
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold tracking-tight">购买教程</h2>
            <TutorialCard id={api.id} tutorial={api.tutorial} />
          </div>
        )}

        {relatedAPIs.length > 0 && (
          <section className="mb-8">
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

        <section>
          <h2 className="mb-4 text-xl font-semibold tracking-tight">适用场景</h2>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-4">
              想知道 {api.name} 适合什么场景？查看按用途分类的推荐：
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href="/use-case/coding">
                <Button variant="outline" size="sm">编程开发</Button>
              </Link>
              <Link href="/use-case/knowledge">
                <Button variant="outline" size="sm">知识库</Button>
              </Link>
              <Link href="/use-case/content-creation">
                <Button variant="outline" size="sm">内容创作</Button>
              </Link>
              <Link href="/use-case/chatbot">
                <Button variant="outline" size="sm">智能客服</Button>
              </Link>
              <Link href="/use-case/translation">
                <Button variant="outline" size="sm">翻译</Button>
              </Link>
              <Link href="/use-case/education">
                <Button variant="outline" size="sm">教育辅导</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">常见问题</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <Card key={item.question}>
                <CardHeader>
                  <CardTitle className="text-base">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </SidebarLayout>
  );
}
