import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { APIConfig } from '@/lib/api-config';

function getSuitableFor(api: APIConfig): string {
  if (!api.proxy) {
    return '国内开发者、初学者、需要快速接入和低门槛试用的项目';
  }
  return '对模型能力、长上下文或多模态要求较高，且能处理网络和支付条件的团队';
}

function getNotSuitableFor(api: APIConfig): string {
  if (!api.proxy) {
    return '需要顶级旗舰模型或特定高级能力的用户';
  }
  return '没有稳定代理环境、不熟悉海外支付或希望零门槛快速接入的开发者';
}

function getAccessInfo(api: APIConfig): { label: string; desc: string; color: string } {
  if (!api.proxy && api.tutorial) return { label: '简单', desc: '国内直连，有教程指引', color: 'text-emerald-600' };
  if (!api.proxy) return { label: '中等', desc: '国内直连，需自行探索', color: 'text-amber-600' };
  if (api.tutorial) return { label: '中等', desc: '需代理，有教程指引', color: 'text-amber-600' };
  return { label: '较高', desc: '需代理，需自行探索', color: 'text-red-600' };
}

function getRating(api: APIConfig): number {
  if (!api.proxy && api.free && api.tutorial) return 9.0;
  if (!api.proxy && api.free) return 8.0;
  if (!api.proxy && api.tutorial) return 7.5;
  if (!api.proxy) return 6.5;
  if (api.tutorial) return 6.0;
  return 5.0;
}

function getConclusion(api: APIConfig): string {
  const parts: string[] = [];
  if (!api.proxy) parts.push('国内直连');
  if (api.free) parts.push('有免费额度');
  if (api.tutorial) parts.push('有购买教程');
  if (api.proxy) parts.push('需代理访问');
  const suffix = !api.proxy ? '，推荐优先尝试' : '，适合有代理条件的团队';
  return `${parts.join(' + ')}${suffix}`;
}

interface QuickConclusionCardProps {
  api: APIConfig;
  reviewSlug?: string | null;
}

export function QuickConclusionCard({ api, reviewSlug }: QuickConclusionCardProps) {
  const rating = getRating(api);
  const access = getAccessInfo(api);

  return (
    <Card className="mb-8 border-sky-200 bg-sky-50/70">
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-3">
          快速结论
          <span className="rounded-md bg-amber-100 px-2 py-0.5 text-sm font-semibold text-amber-700">推荐指数 {rating}/10</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <p className="rounded-md bg-sky-100/80 px-3 py-2 text-sky-800">{getConclusion(api)}</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-xs font-medium text-muted-foreground">适合谁</p>
            <p className="leading-5">{getSuitableFor(api)}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-muted-foreground">不适合谁</p>
            <p className="leading-5">{getNotSuitableFor(api)}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-muted-foreground">国内访问</p>
            <p className="leading-5">{api.proxy ? '需要代理，合适的网络环境' : '无需代理，国内直连'}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-muted-foreground">免费额度 / 计费</p>
            <p className="leading-5">
              {api.free || '暂无免费额度，按量计费'}
              <span className="ml-1 text-xs text-muted-foreground">（以官网为准）</span>
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-muted-foreground">接入难度</p>
            <p>
              <span className={`font-medium ${access.color}`}>{access.label}</span>
              <span className="text-muted-foreground"> — {access.desc}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-sky-200 pt-4">
          <a href={api.url} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">官网入口</Button>
          </a>
          {api.tutorial && (
            <Link href={`/tutorial/${api.id}`}>
              <Button variant="outline" size="sm">购买教程</Button>
            </Link>
          )}
          {reviewSlug && (
            <Link href={`/api-review/${reviewSlug}`}>
              <Button variant="outline" size="sm">完整测评</Button>
            </Link>
          )}
          <Link href="/use-case/coding">
            <Button variant="outline" size="sm">场景推荐</Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">* 价格、额度、模型名等信息以官网为准</p>
      </CardContent>
    </Card>
  );
}
