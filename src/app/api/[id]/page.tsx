import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TutorialCard } from '@/components/tutorial/TutorialCard';
import { apiList, proxyServices, getAPIById, APIConfig } from '@/lib/api-config';

// 生成静态路径
export function generateStaticParams() {
  const allAPIs = [...apiList, ...proxyServices];
  return allAPIs.map((api) => ({ id: api.id }));
}

// 生成元数据
export function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  return params.then(({ id }) => {
    const api = getAPIById(id);
    if (!api) return { title: 'API未找到' };
    return { title: `${api.name} - API详情`, description: api.desc };
  });
}

// 判断API类型
function getAPIType(api: APIConfig): 'no-proxy' | 'need-proxy' | 'proxy' {
  if (proxyServices.find(a => a.id === api.id)) return 'proxy';
  if (api.proxy) return 'need-proxy';
  return 'no-proxy';
}

// 获取相关API推荐
function getRelatedAPIs(currentId: string, type: string): APIConfig[] {
  if (type === 'no-proxy') return apiList.filter(a => !a.proxy && a.id !== currentId).slice(0, 3);
  if (type === 'need-proxy') return apiList.filter(a => a.proxy && a.id !== currentId).slice(0, 3);
  return proxyServices.filter(a => a.id !== currentId).slice(0, 3);
}

export default async function APIDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const api = getAPIById(id);
  if (!api) notFound();

  const apiType = getAPIType(api);
  const relatedAPIs = getRelatedAPIs(id, apiType);

  const badgeStyle = api.badge.type === 'success' ? 'bg-green-500 text-white' : api.badge.type === 'warning' ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white';

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航 */}
      <div className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/cloud-api" className="text-sm text-muted-foreground hover:text-foreground">
            ← 返回API列表
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* API头部信息 */}
        <div className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{api.name}</h1>
                  <Badge className={badgeStyle}>{api.badge.text}</Badge>
                </div>
                <p className="text-muted-foreground text-lg">{api.desc}</p>
              </div>
            </div>
            <div className="flex gap-3">
              {api.tutorial && (
                <Link href={`/tutorial#${api.id}`}>
                  <Button variant="outline">查看教程</Button>
                </Link>
              )}
              <a href={api.url} target="_blank" rel="noopener noreferrer">
                <Button>访问官网 →</Button>
              </a>
            </div>
          </div>
        </div>

        {/* 快速信息卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* 官网直达 */}
          <a href={api.url} target="_blank" rel="noopener noreferrer" className="block">
            <Card className="bg-foreground text-background hover:opacity-90 transition-opacity cursor-pointer h-full">
              <CardContent className="p-4">
                <p className="font-medium mb-1">官网直达</p>
                <p className="text-sm opacity-80 truncate">{api.url.replace('https://', '').replace('http://', '').split('/')[0]}</p>
              </CardContent>
            </Card>
          </a>
          
          {api.free && (
            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200">
              <CardContent className="p-4">
                <p className="font-medium text-green-800 dark:text-green-200 mb-1">免费额度</p>
                <p className="text-green-700 dark:text-green-300">{api.free}</p>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardContent className="p-4">
              <p className="font-medium text-muted-foreground mb-1">API类型</p>
              <p className="text-muted-foreground">
                {apiType === 'no-proxy' && '无需代理 - 国内直连'}
                {apiType === 'need-proxy' && '需要代理 - 科学上网'}
                {apiType === 'proxy' && '代理服务 - 中转访问'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 功能特性 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>功能特性</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {api.features.map((feature) => (
                <Badge key={feature} variant="outline" className="text-sm py-1 px-3">{feature}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 购买教程 */}
        {api.tutorial && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">购买教程</h2>
            <TutorialCard id={api.id} icon={api.icon} tutorial={api.tutorial} />
          </div>
        )}

        {/* 相关API推荐 */}
        {relatedAPIs.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">相关API推荐</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedAPIs.map((related) => (
                <Link key={related.id} href={`/api/${related.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{related.name}</h3>
                        <Badge className={`text-xs ${related.badge.type === 'success' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>{related.badge.text}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{related.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
