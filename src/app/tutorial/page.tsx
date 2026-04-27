'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiList, APIConfig } from '@/lib/api-config';
import { BreadcrumbSchema } from '@/components/seo/structured-data';

function badgeClass(type: string) {
  if (type === 'success') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  }
  if (type === 'warning') {
    return 'border-amber-200 bg-amber-50 text-amber-700';
  }
  return 'border-sky-200 bg-sky-50 text-sky-700';
}

function TutorialCard({ api }: { api: APIConfig }) {
  return (
    <article className="flex min-h-44 flex-col rounded-lg border bg-card p-5 transition-colors hover:border-foreground/30">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-semibold">{api.name}</h3>
        <Badge variant="outline" className={badgeClass(api.badge.type)}>{api.badge.text}</Badge>
      </div>
      <p className="flex-1 text-sm leading-6 text-muted-foreground">{api.desc}</p>
      <p className="mt-3 text-xs text-muted-foreground">{api.tutorial?.steps?.length || 0} 个步骤</p>
      <Link href={`/tutorial/${api.id}`} className="mt-5">
        <Button variant="outline" className="w-full" size="sm">查看教程</Button>
      </Link>
    </article>
  );
}

function SectionCard({ title, desc, apis, emptyText }: { title: string; desc: string; apis: APIConfig[]; emptyText: string }) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
        </div>
        <Badge variant="outline" className="border-border bg-card text-muted-foreground">{apis.length} 个</Badge>
      </div>
      {apis.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {apis.map((api) => <TutorialCard key={api.id} api={api} />)}
        </div>
      ) : (
        <div className="rounded-lg border bg-card py-10 text-center text-sm text-muted-foreground">
          {emptyText}
        </div>
      )}
    </section>
  );
}

export default function TutorialPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const noProxyWithTutorial = apiList.filter(api => !api.proxy && api.tutorial);
  const needProxyWithTutorial = apiList.filter(api => api.proxy && api.tutorial);

  const filteredNoProxy = noProxyWithTutorial.filter(api =>
    api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    api.desc.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredNeedProxy = needProxyWithTutorial.filter(api =>
    api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    api.desc.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://apiuspro.cn' },
          { name: '购买教程', url: 'https://apiuspro.cn/tutorial' },
        ]}
      />
      <div className="mx-auto max-w-6xl p-6 lg:p-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">Tutorials</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">购买教程</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            按访问条件整理 API 购买流程，快速了解账号、支付、密钥和注意事项。
          </p>
        </div>

        <div className="mb-8 max-w-xl">
          <Input
            type="text"
            placeholder="搜索 API 名称..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 px-4"
          />
        </div>

        <div className="mb-8 rounded-lg border bg-card p-5">
          <h3 className="font-semibold">需要代理的 API 购买前建议确认</h3>
          <div className="mt-3 grid gap-3 text-sm text-muted-foreground md:grid-cols-4">
            <div>稳定网络环境</div>
            <div>国际支付方式</div>
            <div>账号风控风险</div>
            <div>小额充值试用</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <SectionCard
            title="无需代理"
            desc="国内直连，注册和调用门槛更低。"
            apis={filteredNoProxy}
            emptyText="没有找到匹配的无代理 API 教程"
          />
          <SectionCard
            title="需要代理"
            desc="适合对模型能力有更高要求的场景。"
            apis={filteredNeedProxy}
            emptyText="没有找到匹配的需代理 API 教程"
          />
        </div>

        <div className="mt-10 rounded-lg border bg-card p-6">
          <h3 className="font-semibold">添加新 AI 购买教程模板</h3>
          <div className="mt-4 overflow-x-auto rounded-md border bg-muted/50 p-4 text-sm">
            <pre className="whitespace-pre-wrap text-muted-foreground">{`{
  id: 'your-api-id',
  name: 'API名称',
  desc: 'API描述信息',
  url: 'https://xxx.com/',
  proxy: false,
  badge: { text: '免费', type: 'success' },
  tutorial: {
    title: 'XXX购买教程',
    steps: [
      { title: '步骤标题', description: '步骤描述', items: ['操作1', '操作2'] }
    ],
    tips: ['提示1'],
    warnings: ['警告1'],
    advantages: ['优势1']
  }
}`}</pre>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            修改文件：<code className="rounded bg-muted px-2 py-1">src/lib/api-config.ts</code>
          </p>
        </div>
      </div>
    </SidebarLayout>
  );
}
