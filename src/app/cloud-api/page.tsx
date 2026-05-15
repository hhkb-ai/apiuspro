'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiList, APIConfig } from '@/lib/api-config';
import { BreadcrumbSchema } from '@/components/seo/structured-data';
import { RememberListLink } from '@/components/navigation/ReturnNavigation';
import { fuzzyScore, sortByFuzzyScore } from '@/lib/fuzzy-search';

const decisionGuides = [
  {
    title: '第一次接 API',
    desc: '优先选择国内直连、有免费额度、兼容 OpenAI 格式的服务，注册和调试成本最低。',
    href: '/tutorial',
    action: '看购买教程',
  },
  {
    title: '写代码和调试项目',
    desc: '重点看代码生成、长上下文、工具调用和价格，先用小任务测试稳定性。',
    href: '/use-case/coding',
    action: '看编程推荐',
  },
  {
    title: '做知识库或文档处理',
    desc: '优先选择长文本、多模态和文件解析能力强的 API，注意上下文长度和限速。',
    href: '/use-case/knowledge',
    action: '看知识库推荐',
  },
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

function APICard({ api }: { api: APIConfig }) {
  // 速览信息
  const scenario = api.features.slice(0, 2).join('、');
  const proxyInfo = api.proxy ? '需要代理' : '无需代理';
  const targetUsers = api.proxy ? '企业/研究' : '初学者/开发者';

  return (
    <article className="flex min-h-52 flex-col rounded-lg border bg-card p-5 transition-colors hover:border-foreground/30">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-semibold">{api.name}</h3>
        <Badge variant="outline" className={badgeClass(api.badge.type)}>{api.badge.text}</Badge>
      </div>

      {/* 速览信息 */}
      <div className="mb-3 space-y-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">适用：</span>
          <span>{scenario}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">网络：</span>
          <span>{proxyInfo}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">推荐：</span>
          <span>{targetUsers}</span>
        </div>
      </div>

      <p className="flex-1 text-sm leading-6 text-muted-foreground">{api.desc}</p>
      <div className="mt-5 flex gap-2">
        <a href={api.url} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button className="w-full" size="sm">官网入口</Button>
        </a>
        <RememberListLink href={`/api/${api.id}`} listLabel="API 列表" className="flex-1">
          <Button variant="outline" className="w-full" size="sm">详细说明</Button>
        </RememberListLink>
      </div>
    </article>
  );
}

function APISection({ title, desc, items }: { title: string; desc: string; items: APIConfig[] }) {
  if (items.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
        </div>
        <Badge variant="outline" className="border-border bg-card text-muted-foreground">{items.length} 个</Badge>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((api) => <APICard key={api.id} api={api} />)}
      </div>
    </section>
  );
}

export default function CloudAPIPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'no-proxy' | 'need-proxy'>('all');

  const allAPIs = useMemo(() => [...apiList], []);

  const matchedAPI = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return allAPIs.find(api => fuzzyScore(searchQuery, [api.id, api.name]) >= 85) ?? null;
  }, [searchQuery, allAPIs]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim() || matchedAPI) return [];
    return sortByFuzzyScore(
      allAPIs,
      searchQuery,
      api => [api.id, api.name, api.desc, api.free, ...api.features],
    )
      .slice(0, 5);
  }, [searchQuery, matchedAPI, allAPIs]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (matchedAPI) {
      router.push(`/api/${matchedAPI.id}`);
      return;
    }

    const firstSuggestion = searchSuggestions[0];
    if (firstSuggestion) {
      router.push(`/api/${firstSuggestion.id}`);
    }
  };

  const handleSearchShortcut = (query: string) => {
    setSearchQuery(query);
    setActiveFilter('all');
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const noProxyAPIs = apiList.filter(a => !a.proxy);
  const needProxyAPIs = apiList.filter(a => a.proxy);

  const getFilteredAPIs = () => {
    const filterAPIs = (items: APIConfig[]) => {
      if (!searchQuery.trim()) return items;
      return sortByFuzzyScore(
        items,
        searchQuery,
        api => [api.id, api.name, api.desc, api.free, ...api.features],
      );
    };

    if (activeFilter === 'no-proxy') {
      return {
        noProxy: filterAPIs(noProxyAPIs),
        needProxy: [],
      };
    }
    if (activeFilter === 'need-proxy') {
      return {
        noProxy: [],
        needProxy: filterAPIs(needProxyAPIs),
      };
    }
    return {
      noProxy: filterAPIs(noProxyAPIs),
      needProxy: filterAPIs(needProxyAPIs),
    };
  };

  const { noProxy, needProxy } = getFilteredAPIs();
  const filters = [
    { id: 'all', label: '全部' },
    { id: 'no-proxy', label: '无需代理' },
    { id: 'need-proxy', label: '需要代理' },
  ] as const;

  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://apiuspro.cn' },
          { name: 'API官网', url: 'https://apiuspro.cn/cloud-api' },
        ]}
      />
      <div className="mx-auto max-w-6xl p-6 lg:p-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">Cloud API</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">AI API 官网入口与对比</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            快速访问各大 AI API 官网，按访问条件和服务类型筛选。
          </p>
        </div>

        {/* BLUF 摘要 */}
        <section className="mb-8 rounded-lg border border-sky-200 bg-sky-50 px-5 py-4">
          <p className="text-sm font-semibold text-sky-800">结论先行</p>
          <p className="mt-1 text-sm leading-6 text-sky-700">
            国内用户首选无需代理的 API（DeepSeek、通义千问、智谱），注册即用、有免费额度。
            需要最强模型能力选 Claude 或 OpenAI，但要准备代理和国际信用卡。
            不确定选哪个？先看 <Link href="/use-case" className="text-foreground hover:underline">按场景推荐</Link>。
          </p>
        </section>

        {/* 适合谁 / 不适合谁 */}
        <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-sm font-semibold text-emerald-800">适合谁</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-emerald-700">
              <li>• 已经确定要用哪个 API，需要快速找到官网和控制台</li>
              <li>• 想按「无需代理 / 需要代理」分类浏览所有可用 API</li>
              <li>• 需要对比不同 API 的功能特性和免费额度</li>
            </ul>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-800">不适合谁</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-amber-700">
              <li>• 不确定该用哪个 API（请看 <Link href="/use-case" className="text-foreground hover:underline">场景推荐</Link>）</li>
              <li>• 第一次买 API，需要注册指导（请看 <Link href="/tutorial" className="text-foreground hover:underline">购买教程</Link>）</li>
              <li>• 想看详细测评和基准数据（请看 <Link href="/api-review" className="text-foreground hover:underline">API 测评</Link>）</li>
            </ul>
          </div>
        </section>

        <div className="mb-8 space-y-4">
          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {decisionGuides.map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="rounded-lg border bg-card p-5 transition-colors hover:border-foreground/30"
              >
                <h2 className="text-base font-semibold">{guide.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{guide.desc}</p>
                <p className="mt-4 text-sm font-medium text-foreground">{guide.action} →</p>
              </Link>
            ))}
          </section>

          {/* 快速决策条 */}
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm font-medium mb-3">我想做：</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '代码生成', query: '代码' },
                { label: '多模态检索', query: '多模态' },
                { label: '长文本处理', query: '长文本' },
                { label: '数学推理', query: '推理' },
                { label: '免费试用', query: '免费' },
              ].map((item) => (
                <Button
                  key={item.label}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleSearchShortcut(item.query)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <form className="relative max-w-xl" onSubmit={handleSubmit} role="search">
            <Input
              type="search"
              placeholder="搜索 API 名称，如 OpenAI、通义千问..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 pr-24"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                清除
              </button>
            )}
            {searchSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-lg border bg-card shadow-sm">
                {searchSuggestions.map((api) => (
                  <Link
                    key={api.id}
                    href={`/api/${api.id}`}
                    className="block px-4 py-3 transition-colors hover:bg-muted/70"
                    onClick={() => setSearchQuery('')}
                  >
                    <p className="font-medium">{api.name}</p>
                    <p className="truncate text-sm text-muted-foreground">{api.desc}</p>
                  </Link>
                ))}
              </div>
            )}
          </form>

          {matchedAPI && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">找到「{matchedAPI.name}」</span>
              <Button type="button" size="sm" onClick={() => router.push(`/api/${matchedAPI.id}`)}>直接跳转</Button>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <Button
                key={filter.id}
                type="button"
                variant={activeFilter === filter.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          {(activeFilter === 'all' || activeFilter === 'no-proxy') && (
            <APISection title="无需代理" desc="国内直连，适合入门、测试和快速集成。" items={noProxy} />
          )}

          {(activeFilter === 'all' || activeFilter === 'need-proxy') && (
            <APISection title="需要代理" desc="国际主流 API，通常需要稳定网络和国际支付方式。" items={needProxy} />
          )}
        </div>

        {noProxy.length === 0 && needProxy.length === 0 && (
          <div className="rounded-lg border bg-card py-12 text-center text-muted-foreground">
            没有找到匹配的 API
          </div>
        )}

        <div className="mt-10 rounded-lg border bg-card p-6">
          <h2 className="font-semibold">AI API 选择检查清单</h2>
          <div className="mt-3 grid gap-4 text-sm leading-6 text-muted-foreground md:grid-cols-2">
            <ul className="space-y-2">
              <li>先确认是否能国内直连，避免注册后无法稳定调用。</li>
              <li>查看免费额度和最低充值门槛，先小额验证真实任务。</li>
              <li>确认是否兼容 OpenAI SDK、Base URL 和常见工具配置。</li>
            </ul>
            <ul className="space-y-2">
              <li>做编程任务看代码能力和长上下文，做文档任务看文件处理能力。</li>
              <li>正式接入前记录 API Key、限速、计费单位和账单提醒。</li>
              <li>不知道选哪个？查看 <Link href="/use-case" className="text-foreground hover:underline">按场景推荐</Link>。</li>
            </ul>
          </div>
        </div>

        {/* 常见问题 */}
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">常见问题</h2>
          <div className="space-y-3">
            {[
              {
                q: '无需代理和需要代理的 API 有什么区别？',
                a: '无需代理的 API（如 DeepSeek、通义千问）国内直接访问，注册和调用门槛低。需要代理的 API（如 Claude、OpenAI）模型能力通常更强，但需要稳定的网络环境和国际支付方式。',
              },
              {
                q: '我可以同时使用多个 API 吗？',
                a: '可以。很多开发者会根据任务类型切换 API：日常用 DeepSeek 省钱，复杂任务用 Claude 或 OpenAI。用 CC Switch 可以方便地在多个 API 之间切换。',
              },
              {
                q: '怎么判断一个 API 是否适合我？',
                a: '先明确你的任务类型（编程、写作、客服等），然后看场景推荐页面。最靠谱的方法是用真实样本测试——大多数 API 都有免费额度，先试再买。',
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-lg border bg-card p-5">
                <h3 className="text-sm font-semibold">{faq.q}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SidebarLayout>
  );
}
