import type { Metadata } from 'next';
import Link from 'next/link';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getReviewScore, reviewDetails, reviewRatingWeightDescription } from '@/lib/review-config';
import type { ReviewDetail } from '@/lib/review-config';
import { BreadcrumbSchema } from '@/components/seo/structured-data';
import { RememberListLink } from '@/components/navigation/ReturnNavigation';
import { generateMetadata as generateTdkMetadata } from '@/lib/tdk';

export const metadata: Metadata = generateTdkMetadata('/api-review');

const reviews = Object.values(reviewDetails);

function badgeClass(variant?: 'destructive' | 'success') {
  if (variant === 'success') {
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  }
  return '';
}

function Rating({ score }: { score: number }) {
  const fullStars = Math.floor(score);
  const hasHalf = score % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: fullStars }, (_, i) => (
        <span key={i} className="text-foreground">★</span>
      ))}
      {hasHalf && <span className="text-foreground">☆</span>}
      {Array.from({ length: 5 - fullStars - (hasHalf ? 1 : 0) }, (_, i) => (
        <span key={i + fullStars} className="text-muted-foreground/30">★</span>
      ))}
      <span className="ml-2 text-sm font-medium">{score.toFixed(1)}</span>
    </div>
  );
}

function ReviewCard({ review }: { review: ReviewDetail }) {
  const score = getReviewScore(review);

  return (
    <Card className="overflow-hidden border-border/80 shadow-sm">
      <CardHeader className="border-b bg-muted/25 px-5 py-5 sm:px-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-3 text-xl leading-tight">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-card text-2xl">
                {review.icon}
              </span>
              <span className="min-w-0">{review.name}</span>
            </CardTitle>
            <CardDescription className="mt-3 max-w-3xl text-[15px] leading-7">
              {review.tlDr}
            </CardDescription>
          </div>
          <div className="flex shrink-0 flex-col gap-3 lg:items-end">
            <div className="rounded-md border bg-card px-3 py-2 text-sm">
              <span className="text-muted-foreground">综合评分</span>
              <span className="ml-2 font-semibold text-foreground">{score.toFixed(1)}</span>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {review.badges.map((badge) => (
                <Badge
                  key={badge.label}
                  variant={badge.variant === 'destructive' ? 'destructive' : 'default'}
                  className={badgeClass(badge.variant)}
                >
                  {badge.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-5 py-5 sm:px-6">
        <div className="mb-5 border-l-4 border-foreground/70 bg-muted/35 px-4 py-3">
          <p className="mb-1 text-sm font-semibold text-foreground">省流版</p>
          <p className="text-sm leading-6 text-muted-foreground">
            <strong>推荐指数：{score.toFixed(1)}/5</strong> | {review.tlDr}
          </p>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {review.ratings.slice(0, 4).map((rating) => (
            <div key={rating.label} className="min-h-24 rounded-md border bg-card p-3">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="text-sm font-medium">{rating.label}</span>
                <span className="text-xs text-muted-foreground">{rating.score.toFixed(1)}</span>
              </div>
              <Rating score={rating.score} />
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
                {rating.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-5 grid grid-cols-1 gap-4 text-sm text-muted-foreground md:grid-cols-2">
          <div className="rounded-md border border-green-200 bg-green-50/45 p-4 dark:border-green-900 dark:bg-green-950/10">
            <p className="mb-2 font-medium text-foreground">主要优点</p>
            <ul className="space-y-2">
              {review.pros.slice(0, 3).map((item) => (
                <li key={item} className="flex gap-2 leading-6">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/10">
            <p className="mb-2 font-medium text-foreground">需要注意</p>
            <ul className="space-y-2">
              {review.cons.slice(0, 3).map((item) => (
                <li key={item} className="flex gap-2 leading-6">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-50 dark:bg-amber-950/30" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-5">
          <RememberListLink href={`/api-review/${review.slug}`} listLabel="测评列表">
            <Button variant="outline">{review.name} 完整测评</Button>
          </RememberListLink>
        </div>
      </CardContent>
    </Card>
  );
}

export default function APIReviewPage() {
  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://www.apiuspro.cn' },
          { name: 'API测评', url: 'https://www.apiuspro.cn/api-review' },
        ]}
      />
      <div className="mx-auto max-w-5xl p-6 lg:p-8">
        <div className="mb-6 border-b pb-6">
          <p className="text-sm font-medium text-muted-foreground">Reviews</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">AI API 测评对比</h1>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-muted-foreground">
            详细的 API 性能评测与使用体验分享，帮助你选择最适合的 AI 服务。
          </p>
        </div>

        <section className="mb-6 rounded-lg border bg-card px-4 py-3 text-sm leading-6 text-muted-foreground">
          <p className="font-semibold text-foreground">2026-05-24 信息更新</p>
          <p className="mt-1">
            本页已补充 Qwen3.7-Max、Gemini 3.5 Flash、Kimi K2.6、GLM-5 / 5.1、Doubao-Seed-1.6、腾讯 TokenHub 迁移和 DeepSeek V4 价格/别名变化。模型名、免费额度和价格变动很快，正式购买前仍以各家官方控制台为准。
          </p>
        </section>

        <section className="mb-6 hidden rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 px-4 py-3 sm:block">
          <p className="text-sm font-semibold text-sky-800 dark:text-sky-200">结论先行</p>
          <div className="mt-2 grid gap-1.5 text-sm leading-6 text-sky-700 dark:text-sky-300">
            <p><span className="font-semibold">代码 / 推理：</span>性价比看 DeepSeek V4 Flash；顶级能力看 DeepSeek V4 Pro、Claude Opus。</p>
            <p><span className="font-semibold">通用对话 / 内容创作：</span>中文场景看通义千问（Qwen）、Kimi；高难度 Agent / 代码任务看 Qwen3.7-Max。</p>
            <p><span className="font-semibold">长文档 / 多模态：</span>海外先测 Gemini 3.5 Flash，再用 Gemini 3.1 Pro Preview 验证复杂任务；安全长文本看 Claude Opus 4.7。</p>
            <p><span className="font-semibold">国内生态：</span>阿里云项目看 Qwen3.7-Max / Qwen3.6；火山方舟看 Doubao-Seed-1.6 / Seed-Code；腾讯云项目先确认 TokenHub 迁移。</p>
            <p><span className="font-semibold">海外旗舰：</span>OpenAI GPT-5.5（官方模型 ID：gpt-5.5，快照：2026-04-23），适合复杂专业工作、编码和工具型 Agent，但价格高。</p>
            <p><span className="font-semibold">策略：</span>所有价格、额度和模型名先看官方控制台，再用免费额度跑真实任务。</p>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs leading-5 text-sky-700 dark:text-sky-300/80">
            <Link href="/tutorial" className="font-medium text-foreground hover:underline">购买教程</Link>
            <Link href="/cloud-api" className="font-medium text-foreground hover:underline">API 列表</Link>
            <Link href="/use-case" className="font-medium text-foreground hover:underline">场景推荐</Link>
          </div>
        </section>
        <details className="mb-6 rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-900 dark:text-sky-100 sm:hidden">
          <summary className="cursor-pointer select-none px-4 py-3 text-sm font-bold">结论先行（点开查看）</summary>
          <div className="border-t border-sky-200 dark:border-sky-800 px-4 py-3 space-y-1.5 text-sm leading-6 text-sky-700 dark:text-sky-300">
            <p><span className="font-semibold">代码 / 推理：</span>性价比看 DeepSeek V4 Flash；顶级能力看 DeepSeek V4 Pro、Claude Opus。</p>
            <p><span className="font-semibold">通用对话 / 内容创作：</span>中文场景看通义千问（Qwen）、Kimi；高难度 Agent / 代码任务看 Qwen3.7-Max。</p>
            <p><span className="font-semibold">长文档 / 多模态：</span>先测 Gemini 3.5 Flash，再用 Gemini 3.1 Pro Preview 验证复杂任务；安全长文本看 Claude Opus 4.7。</p>
            <p><span className="font-semibold">国内生态：</span>阿里云看 Qwen3.7-Max / Qwen3.6；火山看 Doubao-Seed-1.6 / Seed-Code；腾讯云先确认 TokenHub 迁移。</p>
            <p><span className="font-semibold">海外旗舰：</span>OpenAI GPT-5.5（官方模型 ID：gpt-5.5，快照：2026-04-23），适合复杂专业工作、编码和工具型 Agent，但价格高。</p>
            <p><span className="font-semibold">策略：</span>所有价格、额度和模型名先看官方控制台，再用免费额度跑真实任务。</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs leading-5 text-sky-700 dark:text-sky-300/80 pt-1">
              <Link href="/tutorial" className="font-medium text-foreground hover:underline">购买教程</Link>
              <Link href="/cloud-api" className="font-medium text-foreground hover:underline">API 列表</Link>
              <Link href="/use-case" className="font-medium text-foreground hover:underline">场景推荐</Link>
            </div>
          </div>
        </details>

        <section className="space-y-7">
          {reviews.map((review) => (
            <ReviewCard key={review.slug} review={review} />
          ))}
        </section>

        <Card className="mt-8 border-border/80 shadow-sm">
          <CardContent className="p-6 text-center">
            <p className="mx-auto mb-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              购买前建议同时查看官网、购买教程和测评结论，再用自己的真实任务小规模测试。
            </p>
            <Link href="/cloud-api">
              <Button>全部 API 官网入口</Button>
            </Link>
          </CardContent>
        </Card>

        {/* 常见问题 */}
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">常见问题</h2>
          <div className="space-y-3">
            {[
              {
                q: '测评分数怎么用？',
                a: `综合评分按 ${reviewRatingWeightDescription} 计算，适合快速横向对比。但选 API 时建议重点看你最在意的单维度分数，比如编程场景重点看质量和稳定性。`,
              },
              {
                q: '测评数据多久更新一次？',
                a: '模型更新或价格调整时会同步更新测评。建议购买前到官网确认最新的模型名称和定价。',
              },
              {
                q: '测评结果和我自己测试不一样怎么办？',
                a: '基准测试是通用场景，你的业务场景可能有差异。建议用自己的真实任务跑 3-5 个样本对比，记录响应质量、速度和成本。',
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-lg border bg-card p-5">
                <h3 className="text-sm font-semibold">{faq.q}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 下一步推荐 */}
        <section className="mt-10 rounded-lg border bg-card p-6">
          <h2 className="font-semibold">下一步推荐</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Link href="/tutorial" className="rounded-lg border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">购买教程</p>
              <p className="mt-1 text-xs text-muted-foreground">按步骤完成注册、支付与 API Key 创建</p>
            </Link>
            <Link href="/use-case" className="rounded-lg border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">场景推荐</p>
              <p className="mt-1 text-xs text-muted-foreground">按编程、翻译、创作等场景选 API</p>
            </Link>
            <Link href="/faq" className="rounded-lg border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">常见问题</p>
              <p className="mt-1 text-xs text-muted-foreground">注册、支付、Key 配置问题速查</p>
            </Link>
          </div>
        </section>

        {/* 适合谁 / 不适合谁 */}
        <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-5">
            <p className="text-sm font-semibold text-emerald-800">适合谁</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-emerald-700 dark:text-emerald-300">
              <li>• 想对比不同 API 的性能、价格和使用体验</li>
              <li>• 需要根据具体场景（编程、翻译、创作）选 API</li>
              <li>• 想了解各 API 的优缺点再做决定</li>
            </ul>
          </div>
          <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-5">
            <p className="text-sm font-semibold text-amber-800">不适合谁</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-amber-700 dark:text-amber-300">
              <li>• 已经确定 API，需要注册和购买指导（请看 <Link href="/tutorial" className="text-foreground hover:underline">购买教程</Link>）</li>
              <li>• 只想查官网入口和免费额度（请看 <Link href="/cloud-api" className="text-foreground hover:underline">API 列表</Link>）</li>
              <li>• 想按编程、翻译等场景直接选 API（请看 <Link href="/use-case" className="text-foreground hover:underline">场景推荐</Link>）</li>
            </ul>
          </div>
        </section>

        {/* 权威基准引用 */}
        <Card className="mt-8 border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle>权威基准与数据来源</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>本站测评数据参考以下权威基准和官方来源：</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-card">
                  <p className="font-medium text-foreground mb-2">代码能力基准</p>
                  <ul className="space-y-1">
                    <li>• SWE-bench Verified：代码修复能力评测</li>
                    <li>• SWE-bench Pro：真实工程任务评测</li>
                    <li>• CursorBench：IDE 编码能力评测</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                  <p className="font-medium text-foreground mb-2">综合能力基准</p>
                  <ul className="space-y-1">
                    <li>• GPQA Diamond：科学推理能力评测</li>
                    <li>• HLE：综合知识考试评测</li>
                    <li>• OSWorld：桌面自动化能力评测</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="font-medium text-foreground mb-2">数据来源说明</p>
                <ul className="space-y-1">
                  <li>• 官方参数：来自各厂商官方文档（Anthropic、OpenAI、Google 等）</li>
                  <li>• 第三方基准：来自 DataLearnerAI、知乎、火山引擎等权威评测机构</li>
                  <li>• 更新时间：最后更新 2026-05-07</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}
