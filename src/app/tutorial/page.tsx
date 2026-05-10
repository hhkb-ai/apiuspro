'use client';

import { useState } from 'react';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiList, APIConfig } from '@/lib/api-config';
import { BreadcrumbSchema } from '@/components/seo/structured-data';
import { RememberListLink } from '@/components/navigation/ReturnNavigation';
import { sortByFuzzyScore } from '@/lib/fuzzy-search';

const purchaseChecklist = [
  '确认官网域名和控制台入口，避免进入仿冒页面',
  '先看是否支持国内手机号、邮箱和实名验证',
  '创建 API Key 后立即保存，不要提交到 Git 仓库',
  '先用小额充值或免费额度测试真实任务',
  '记录 Base URL、模型名称、限速和账单提醒',
  '接入工具前先用 curl 或 SDK 跑通一次调用',
];

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
      <RememberListLink href={`/tutorial/${api.id}`} listLabel="教程列表" className="mt-5">
        <Button variant="outline" className="w-full" size="sm">查看教程</Button>
      </RememberListLink>
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

  const hasSearch = searchQuery.trim().length > 0;
  const getSearchFields = (api: APIConfig) => [
    api.id,
    api.name,
    api.desc,
    api.free,
    api.tutorial?.title,
    api.tutorial?.subtitle,
    ...api.features,
  ];
  const filteredNoProxy = hasSearch
    ? sortByFuzzyScore(noProxyWithTutorial, searchQuery, getSearchFields)
    : noProxyWithTutorial;
  const filteredNeedProxy = hasSearch
    ? sortByFuzzyScore(needProxyWithTutorial, searchQuery, getSearchFields)
    : needProxyWithTutorial;

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

        <form className="mb-8 max-w-xl" role="search" onSubmit={(event) => event.preventDefault()}>
          <div className="relative">
          <Input
            type="text"
            placeholder="搜索 API 名称..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 pr-20"
          />
            {hasSearch && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                清除
              </button>
            )}
          </div>
          {hasSearch && (
            <p className="mt-2 text-xs text-muted-foreground">
              搜索结果：{filteredNoProxy.length + filteredNeedProxy.length} 个教程
            </p>
          )}
        </form>

        <div className="mb-8 rounded-lg border bg-card p-5">
          <h2 className="font-semibold">购买 API 前检查清单</h2>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-muted-foreground md:grid-cols-2">
            {purchaseChecklist.map((item) => (
              <div key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                <span>{item}</span>
              </div>
            ))}
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
      </div>
    </SidebarLayout>
  );
}
