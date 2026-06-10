import type { Metadata } from 'next';
import Link from 'next/link';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BreadcrumbSchema, ItemListSchema } from '@/components/seo/structured-data';
import { RememberListLink } from '@/components/navigation/ReturnNavigation';
import { errorSolutions } from '@/lib/error-solution-config';

export const metadata: Metadata = {
  title: 'API 错误解决指南',
  description: '覆盖 401、403、404 model not found、429、timeout、insufficient quota、invalid API key 和 Base URL 配置错误，按认证、权限、模型、限流、额度与网络链路拆解原因，并提供可复制的 curl、Python 和 SDK 修复示例。',
  alternates: {
    canonical: 'https://www.apiuspro.cn/error',
  },
  openGraph: {
    title: 'API 错误解决指南',
    description: 'AI API 常见错误排查指南，整理 401、403、404、429、timeout、额度不足、Key 无效和 Base URL 配置错误的真实症状、检查顺序、平台差异和可复制修复示例。',
    url: 'https://www.apiuspro.cn/error',
    siteName: 'API知识站',
    locale: 'zh_CN',
    type: 'website',
  },
};

function statusClass(statusLabel: string) {
  if (statusLabel.includes('认证') || statusLabel.includes('Key')) {
    return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-200';
  }
  if (statusLabel.includes('限流') || statusLabel.includes('额度')) {
    return 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300';
  }
  return 'border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300';
}

export default function ErrorSolutionPage() {
  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://www.apiuspro.cn' },
          { name: '错误解决', url: 'https://www.apiuspro.cn/error' },
        ]}
      />
      <ItemListSchema
        name="API 错误解决指南"
        items={errorSolutions.map(solution => ({
          name: solution.shortTitle,
          url: `https://www.apiuspro.cn/error/${solution.id}`,
          description: solution.summary,
        }))}
      />

      <div className="mx-auto max-w-6xl p-6 lg:p-8">
        <div className="mb-10 border-b pb-8">
          <p className="text-sm font-medium text-muted-foreground">Troubleshooting</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">API 错误解决指南</h1>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-muted-foreground">
            按真实调用链路整理认证、权限、模型名、限流、超时、额度和 Base URL 配置问题。每篇都包含快速排查清单、对应 API 特殊情况和可复制修复示例。
          </p>
        </div>

        <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="border-border/80 shadow-sm">
            <CardContent className="p-5">
              <p className="text-3xl font-bold">{errorSolutions.length}</p>
              <p className="mt-1 text-sm text-muted-foreground">错误类型</p>
            </CardContent>
          </Card>
          <Card className="border-border/80 shadow-sm">
            <CardContent className="p-5">
              <p className="text-3xl font-bold">6</p>
              <p className="mt-1 text-sm text-muted-foreground">固定排查板块</p>
            </CardContent>
          </Card>
          <Card className="border-border/80 shadow-sm">
            <CardContent className="p-5">
              <p className="text-3xl font-bold">可复制</p>
              <p className="mt-1 text-sm text-muted-foreground">curl / SDK 修复示例</p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8 rounded-2xl border border-sky-200 bg-sky-50 dark:bg-sky-950/30 px-5 py-4 text-sky-900 dark:text-sky-100">
          <p className="text-sm font-semibold">先按这个顺序排查</p>
          <div className="mt-3 grid gap-3 text-sm leading-6 md:grid-cols-4">
            {['API Key 是否有效', 'Base URL 是否匹配', '模型名是否存在', '额度与限流是否触发'].map((item, index) => (
              <div key={item} className="rounded-xl border border-sky-200 bg-white/70 p-3 text-sky-950 shadow-sm dark:border-sky-700/70 dark:bg-sky-950/60 dark:text-sky-50">
                <span className="mr-2 font-semibold text-sky-700 dark:text-sky-200">{index + 1}.</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {errorSolutions.map(solution => (
            <Card key={solution.id} className="flex flex-col border-border/80 shadow-sm transition-colors hover:border-foreground/30">
              <CardHeader className="border-b bg-muted/25">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-xl">{solution.shortTitle}</CardTitle>
                  <Badge variant="outline" className={statusClass(solution.statusLabel)}>
                    {solution.statusLabel}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{solution.affectedArea}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col p-5">
                <p className="flex-1 text-sm leading-6 text-muted-foreground">{solution.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <RememberListLink href={`/error/${solution.id}`} listLabel="错误解决列表">
                    <Button variant="outline" size="sm">查看解决方案</Button>
                  </RememberListLink>
                  <Link href={`/error/${solution.id}#fix-examples`} className="inline-flex">
                    <Button variant="ghost" size="sm">查看修复示例</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="mt-8 border-border/80 shadow-sm">
          <CardContent className="p-6 text-center">
            <p className="mx-auto mb-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              如果还没有完成 API Key 创建和首次调用，建议先看购买教程跑通最小请求，再回到这里排查具体错误码。
            </p>
            <Link href="/tutorial">
              <Button>查看 API 购买教程</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}
