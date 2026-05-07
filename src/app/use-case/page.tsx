import Link from 'next/link';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCases } from '@/lib/use-case-config';
import { BreadcrumbSchema } from '@/components/seo/structured-data';

export default function UseCaseListPage() {
  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://apiuspro.cn' },
          { name: '场景推荐', url: 'https://apiuspro.cn/use-case' },
        ]}
      />
      <div className="mx-auto max-w-6xl p-6 lg:p-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">Use Cases</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">场景推荐</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            不知道该用哪个 AI API？按实际场景选择，找到最适合你的模型。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {useCases.map((uc) => (
            <article
              key={uc.id}
              className="flex min-h-52 flex-col rounded-lg border bg-card p-5 transition-colors hover:border-foreground/30"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="font-semibold">{uc.name}</h3>
                <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                  {uc.recommendations.length} 个推荐
                </Badge>
              </div>
              <p className="flex-1 text-sm leading-6 text-muted-foreground">
                {uc.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {uc.selectionCriteria.map((c) => (
                  <span
                    key={c.title}
                    className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {c.title}
                  </span>
                ))}
              </div>
              <div className="mt-5">
                <Link href={`/use-case/${uc.id}`}>
                  <Button variant="outline" className="w-full" size="sm">
                    查看推荐
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
}
