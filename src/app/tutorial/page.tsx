'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiList, appTutorials, APIConfig, AppTutorial } from '@/lib/api-config';
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
    return 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700';
  }
  if (type === 'warning') {
    return 'border-amber-200 bg-amber-50 dark:bg-amber-950/30 text-amber-700';
  }
  return 'border-sky-200 bg-sky-50 dark:bg-sky-950/30 text-sky-700';
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
        <Button variant="outline" className="w-full min-h-[44px]" size="sm">查看教程</Button>
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

function AppTutorialCard({ app }: { app: AppTutorial }) {
  return (
    <article className="flex min-h-44 flex-col rounded-lg border bg-card p-5 transition-colors hover:border-foreground/30">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-semibold">{app.name}</h3>
        <Badge variant="outline" className={badgeClass(app.badge.type)}>{app.badge.text}</Badge>
      </div>
      <p className="flex-1 text-sm leading-6 text-muted-foreground">{app.desc}</p>
      <Link href={`/app/${app.id}`} className="mt-5">
        <Button variant="outline" className="w-full min-h-[44px]" size="sm">查看教程</Button>
      </Link>
    </article>
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

  const filteredAppTutorials = hasSearch
    ? sortByFuzzyScore(appTutorials, searchQuery, app => [app.id, app.name, app.desc, app.badge.text])
    : [];

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
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">AI API 购买教程</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            按访问条件整理 API 购买流程，快速了解账号、支付、密钥和注意事项。
          </p>
        </div>

        {/* BLUF 摘要 */}
        <section className="mb-8 hidden rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 px-5 py-4 sm:block">
          <p className="text-sm font-semibold text-sky-800 dark:text-sky-200">结论先行</p>
          <p className="mt-1 text-sm leading-6 text-sky-700 dark:text-sky-300">
            第一次买 API？选国内直连的（DeepSeek、通义千问），注册即用、有免费额度、支持支付宝。
            需要最强模型能力？选 Claude 或 OpenAI，但要准备代理和国际信用卡。先看下面的教程，按步骤操作不会出错。
          </p>
        </section>
        <details className="mb-8 rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-900 dark:text-sky-100 sm:hidden">
          <summary className="cursor-pointer select-none px-4 py-3 text-sm font-bold">结论先行（点开查看）</summary>
          <p className="border-t border-sky-200 dark:border-sky-800 px-4 py-3 text-sm leading-7 text-sky-700 dark:text-sky-300">
            第一次买 API？选国内直连的（DeepSeek、通义千问），注册即用、有免费额度、支持支付宝。
            需要最强模型能力？选 Claude 或 OpenAI，但要准备代理和国际信用卡。先看下面的教程，按步骤操作不会出错。
          </p>
        </details>

        <div className="flex flex-col">
        <form className="order-1 mb-8 max-w-xl" role="search" onSubmit={(event) => event.preventDefault()}>
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
              搜索结果：{filteredNoProxy.length + filteredNeedProxy.length + filteredAppTutorials.length} 个教程
            </p>
          )}
        </form>

        <div className="order-3 mb-8 rounded-lg border bg-card p-5 md:order-2">
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

        <div className="order-2 grid grid-cols-1 gap-10 md:order-3 lg:grid-cols-2">
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

        {hasSearch && (
          <section className="order-4 space-y-4 md:order-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">API 应用教程</h2>
                <p className="mt-1 text-sm text-muted-foreground">Claude Code、CC Switch、OpenClaw 等工具的使用教程。</p>
              </div>
              <Badge variant="outline" className="border-border bg-card text-muted-foreground">{filteredAppTutorials.length} 个</Badge>
            </div>
            {filteredAppTutorials.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {filteredAppTutorials.map((app) => <AppTutorialCard key={app.id} app={app} />)}
              </div>
            ) : (
              <div className="rounded-lg border bg-card py-10 text-center text-sm text-muted-foreground">
                没有找到匹配的应用教程
              </div>
            )}
          </section>
        )}

        {/* 常见问题 */}
        <section className="order-4 mt-10">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">常见问题</h2>
          <div className="space-y-3">
            {[
              {
                q: '我是新手，应该先看哪个教程？',
                a: '如果你在国内，优先看 DeepSeek 或通义千问的教程——注册简单、有免费额度、支持支付宝。先跑通一次调用，再考虑其他 API。',
              },
              {
                q: '买 API 需要准备什么？',
                a: '国内 API：手机号 + 支付宝/微信即可。国际 API（Claude、OpenAI）：需要能接收验证码的邮箱 + 国际信用卡 + 稳定的代理网络。',
              },
              {
                q: '免费额度用完了怎么办？',
                a: '先小额充值测试，确认满足需求后再加大投入。也可以同时注册多个 API，用免费额度组合使用。查看场景推荐找到性价比最高的方案。',
              },
              {
                q: 'API Key 泄露了怎么办？',
                a: '立即到控制台删除泄露的 Key 并重新生成。建议把 Key 存在环境变量或 .env 文件中，不要提交到 Git 仓库。',
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
        <section className="order-5 mt-10 rounded-lg border bg-card p-6">
          <h2 className="font-semibold">下一步推荐</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Link href="/use-case" className="rounded-lg border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">按场景选 API</p>
              <p className="mt-1 text-xs text-muted-foreground">编程、知识库、客服……按需求找到最合适的模型</p>
            </Link>
            <Link href="/cloud-api" className="rounded-lg border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">API 官网入口</p>
              <p className="mt-1 text-xs text-muted-foreground">快速访问各 API 官网和控制台</p>
            </Link>
            <Link href="/api-review" className="rounded-lg border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">API 测评对比</p>
              <p className="mt-1 text-xs text-muted-foreground">看基准测试、优缺点和定价方案</p>
            </Link>
          </div>
        </section>

        {/* 适合谁 / 不适合谁 */}
        <section className="order-6 mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-5">
            <p className="text-sm font-semibold text-emerald-800">适合谁</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-emerald-700">
              <li>• 第一次接触 AI API，需要手把手指导注册和配置</li>
              <li>• 想快速接入 Claude Code、Codex、OpenCode 等 AI 工具</li>
              <li>• 需要对比不同 API 的注册门槛、支付方式和免费额度</li>
              <li>• 想了解如何安全保存 API Key 和配置限流告警</li>
            </ul>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/30 p-5">
            <p className="text-sm font-semibold text-amber-800">不适合谁</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-amber-700">
              <li>• 已经熟悉 API 接入流程，只需要查 Base URL 或模型名</li>
              <li>• 想了解模型能力对比和场景推荐（请看 <Link href="/use-case" className="text-foreground hover:underline">按使用场景选 API</Link>）</li>
              <li>• 想看详细测评数据和基准测试（请看 <Link href="/api-review" className="text-foreground hover:underline">API 测评对比</Link>）</li>
            </ul>
          </div>
        </section>
        </div>
      </div>
    </SidebarLayout>
  );
}
