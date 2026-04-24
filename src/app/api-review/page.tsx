import Link from 'next/link';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// 评分组件
function Rating({ score }: { score: number }) {
  const fullStars = Math.floor(score);
  const hasHalf = score % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className="text-foreground">★</span>
      ))}
      {hasHalf && <span className="text-foreground">☆</span>}
      {[...Array(5 - fullStars - (hasHalf ? 1 : 0))].map((_, i) => (
        <span key={i + fullStars} className="text-muted-foreground/30">★</span>
      ))}
      <span className="ml-2 text-sm font-medium">{score.toFixed(1)}</span>
    </div>
  );
}

export default function APIReviewPage() {
  return (
    <SidebarLayout>
      <div className="p-6 lg:p-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">API测评</h1>
          <p className="text-muted-foreground">
            详细的API性能评测与使用体验分享，帮助你选择最适合的AI服务
          </p>
        </div>

        {/* 测评概览 */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-muted/50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold">12+</p>
                <p className="text-sm text-muted-foreground">已测评API</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold">50+</p>
                <p className="text-sm text-muted-foreground">测试用例</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold">实时</p>
                <p className="text-sm text-muted-foreground">性能监控</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold">客观</p>
                <p className="text-sm text-muted-foreground">评测标准</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 测评列表 */}
        <section className="space-y-6">
          {/* OpenAI GPT-4 测评 */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <span className="text-2xl">🌍</span>
                    OpenAI GPT-4
                  </CardTitle>
                  <CardDescription className="mt-1">
                    最强大的语言模型，行业标准
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="destructive">需代理</Badge>
                  <Badge>付费</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* 省流版 */}
              <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                <p className="font-medium mb-2">⚡ 省流版</p>
                <p className="text-sm text-muted-foreground">
                  <strong>推荐指数：⭐⭐⭐⭐⭐</strong> | 功能最全面，质量最高，但价格较贵，需要代理访问。适合对质量要求高的专业用户。
                </p>
              </div>

              {/* 评分详情 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="p-3 border rounded-lg">
                  <span className="text-sm font-medium">质量</span>
                  <Rating score={4.9} />
                </div>
                <div className="p-3 border rounded-lg">
                  <span className="text-sm font-medium">速度</span>
                  <Rating score={4.5} />
                </div>
                <div className="p-3 border rounded-lg">
                  <span className="text-sm font-medium">性价比</span>
                  <Rating score={3.5} />
                </div>
                <div className="p-3 border rounded-lg">
                  <span className="text-sm font-medium">稳定性</span>
                  <Rating score={4.8} />
                </div>
              </div>

              {/* 详细评测 */}
              <div className="space-y-3 text-sm text-muted-foreground mb-4">
                <p><strong>优点：</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>模型质量业界领先，理解能力强</li>
                  <li>支持多模态（GPT-4V）</li>
                  <li>生态完善，文档详尽</li>
                  <li>API稳定，响应速度快</li>
                </ul>
                <p className="mt-3"><strong>缺点：</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>价格较高，GPT-4约$0.03/1K tokens</li>
                  <li>国内访问需要代理</li>
                  <li>需要国际信用卡支付</li>
                </ul>
              </div>

              <Button variant="outline">查看完整评测</Button>
            </CardContent>
          </Card>

          {/* 阿里云通义千问测评 */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <span className="text-2xl">🇨🇳</span>
                    阿里云通义千问
                  </CardTitle>
                  <CardDescription className="mt-1">
                    国内领先的大模型服务，免费额度充足
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">无需代理</Badge>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">免费额度</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* 省流版 */}
              <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                <p className="font-medium mb-2">⚡ 省流版</p>
                <p className="text-sm text-muted-foreground">
                  <strong>推荐指数：⭐⭐⭐⭐⭐</strong> | 国内用户首选，免费额度大，模型质量不错，访问速度快。适合国内初学者和个人开发者。
                </p>
              </div>

              {/* 评分详情 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="p-3 border rounded-lg">
                  <span className="text-sm font-medium">质量</span>
                  <Rating score={4.5} />
                </div>
                <div className="p-3 border rounded-lg">
                  <span className="text-sm font-medium">速度</span>
                  <Rating score={4.8} />
                </div>
                <div className="p-3 border rounded-lg">
                  <span className="text-sm font-medium">性价比</span>
                  <Rating score={5.0} />
                </div>
                <div className="p-3 border rounded-lg">
                  <span className="text-sm font-medium">稳定性</span>
                  <Rating score={4.7} />
                </div>
              </div>

              {/* 详细评测 */}
              <div className="space-y-3 text-sm text-muted-foreground mb-4">
                <p><strong>优点：</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>每月100万tokens免费额度</li>
                  <li>国内直接访问，速度快</li>
                  <li>支持中文场景优化</li>
                  <li>文档完善，易于上手</li>
                </ul>
                <p className="mt-3"><strong>缺点：</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>复杂推理能力略逊于GPT-4</li>
                  <li>部分高级功能需要付费</li>
                </ul>
              </div>

              <Button variant="outline">查看完整评测</Button>
            </CardContent>
          </Card>

          {/* Claude 测评 */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <span className="text-2xl">🌍</span>
                    Anthropic Claude
                  </CardTitle>
                  <CardDescription className="mt-1">
                    安全可靠的长文本模型，200K上下文
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="destructive">需代理</Badge>
                  <Badge>付费</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* 省流版 */}
              <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                <p className="font-medium mb-2">⚡ 省流版</p>
                <p className="text-sm text-muted-foreground">
                  <strong>推荐指数：⭐⭐⭐⭐☆</strong> | 长文本处理能力最强，安全性高，代码能力强。适合需要处理大量文本的场景。
                </p>
              </div>

              {/* 评分详情 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="p-3 border rounded-lg">
                  <span className="text-sm font-medium">质量</span>
                  <Rating score={4.8} />
                </div>
                <div className="p-3 border rounded-lg">
                  <span className="text-sm font-medium">速度</span>
                  <Rating score={4.0} />
                </div>
                <div className="p-3 border rounded-lg">
                  <span className="text-sm font-medium">性价比</span>
                  <Rating score={3.8} />
                </div>
                <div className="p-3 border rounded-lg">
                  <span className="text-sm font-medium">稳定性</span>
                  <Rating score={4.9} />
                </div>
              </div>

              <Button variant="outline">查看完整评测</Button>
            </CardContent>
          </Card>

          {/* 智谱AI 测评 */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <span className="text-2xl">🇨🇳</span>
                    智谱AI GLM
                  </CardTitle>
                  <CardDescription className="mt-1">
                    开源模型领先者，支持本地部署
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">无需代理</Badge>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">免费试用</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* 省流版 */}
              <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                <p className="font-medium mb-2">⚡ 省流版</p>
                <p className="text-sm text-muted-foreground">
                  <strong>推荐指数：⭐⭐⭐⭐☆</strong> | 开源生态友好，可以本地部署，性价比高。适合有部署能力的开发者和研究者。
                </p>
              </div>

              <Button variant="outline">查看完整评测</Button>
            </CardContent>
          </Card>
        </section>

        {/* 更多测评提示 */}
        <Card className="bg-muted/50 mt-8">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">
              更多API测评持续更新中...
            </p>
            <Link href="/cloud-api">
              <Button>查看所有API</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}
