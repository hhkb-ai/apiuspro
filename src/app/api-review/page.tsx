import Link from 'next/link';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { reviewDetails } from '@/lib/review-config';
import type { ReviewDetail } from '@/lib/review-config';

const reviews = Object.values(reviewDetails);

function badgeClass(variant?: 'destructive' | 'success') {
  if (variant === 'success') {
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  }
  return '';
}

function averageScore(review: ReviewDetail) {
  if (review.ratings.length === 0) return 0;
  const total = review.ratings.reduce((sum, item) => sum + item.score, 0);
  return total / review.ratings.length;
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
  const score = averageScore(review);

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
          <div className="rounded-md border border-amber-200 bg-amber-50/55 p-4 dark:border-amber-900 dark:bg-amber-950/10">
            <p className="mb-2 font-medium text-foreground">需要注意</p>
            <ul className="space-y-2">
              {review.cons.slice(0, 3).map((item) => (
                <li key={item} className="flex gap-2 leading-6">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-5">
          <Link href={`/api-review/${review.slug}`}>
            <Button variant="outline">查看完整测评</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function APIReviewPage() {
  const useCaseCount = reviews.reduce((sum, review) => sum + review.useCases.length, 0);

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-5xl p-6 lg:p-8">
        <div className="mb-10 border-b pb-8">
          <p className="text-sm font-medium text-muted-foreground">Reviews</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">API测评</h1>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-muted-foreground">
            详细的 API 性能评测与使用体验分享，帮助你选择最适合的 AI 服务。
          </p>
        </div>

        <section className="mb-8">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Card className="border-border/80 shadow-sm">
              <CardContent className="p-5 text-center">
                <p className="text-3xl font-bold">{reviews.length}</p>
                <p className="text-sm text-muted-foreground">已测评 API</p>
              </CardContent>
            </Card>
            <Card className="border-border/80 shadow-sm">
              <CardContent className="p-5 text-center">
                <p className="text-3xl font-bold">{useCaseCount}+</p>
                <p className="text-sm text-muted-foreground">适用场景</p>
              </CardContent>
            </Card>
            <Card className="border-border/80 shadow-sm">
              <CardContent className="p-5 text-center">
                <p className="text-3xl font-bold">4项</p>
                <p className="text-sm text-muted-foreground">评分维度</p>
              </CardContent>
            </Card>
            <Card className="border-border/80 shadow-sm">
              <CardContent className="p-5 text-center">
                <p className="text-3xl font-bold">持续</p>
                <p className="text-sm text-muted-foreground">内容更新</p>
              </CardContent>
            </Card>
          </div>
        </section>

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
              <Button>查看所有 API</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}
