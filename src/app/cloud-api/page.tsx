'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiList, proxyServices, APIConfig } from '@/lib/api-config';
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

function APICard({ api }: { api: APIConfig }) {
  return (
    <article className="flex min-h-52 flex-col rounded-lg border bg-card p-5 transition-colors hover:border-foreground/30">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-semibold">{api.name}</h3>
        <Badge variant="outline" className={badgeClass(api.badge.type)}>{api.badge.text}</Badge>
      </div>
      <p className="flex-1 text-sm leading-6 text-muted-foreground">{api.desc}</p>
      <div className="mt-5 flex gap-2">
        <a href={api.url} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button className="w-full" size="sm">官网入口</Button>
        </a>
        <Link href={`/api/${api.id}`} className="flex-1">
          <Button variant="outline" className="w-full" size="sm">详细说明</Button>
        </Link>
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
  const [activeFilter, setActiveFilter] = useState<'all' | 'no-proxy' | 'need-proxy' | 'proxy'>('all');

  const allAPIs = useMemo(() => [...apiList, ...proxyServices], []);

  const matchedAPI = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase().trim();
    return allAPIs.find(api => api.name.toLowerCase() === query || api.id.toLowerCase() === query);
  }, [searchQuery, allAPIs]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim() || matchedAPI) return [];
    const query = searchQuery.toLowerCase().trim();
    return allAPIs
      .filter(api => api.name.toLowerCase().includes(query) || api.desc.toLowerCase().includes(query))
      .slice(0, 5);
  }, [searchQuery, matchedAPI, allAPIs]);

  const noProxyAPIs = apiList.filter(a => !a.proxy);
  const needProxyAPIs = apiList.filter(a => a.proxy);

  const getFilteredAPIs = () => {
    const query = searchQuery.toLowerCase();
    if (activeFilter === 'no-proxy') {
      return {
        noProxy: noProxyAPIs.filter(api => api.name.toLowerCase().includes(query) || api.desc.toLowerCase().includes(query)),
        needProxy: [],
        proxy: [],
      };
    }
    if (activeFilter === 'need-proxy') {
      return {
        noProxy: [],
        needProxy: needProxyAPIs.filter(api => api.name.toLowerCase().includes(query) || api.desc.toLowerCase().includes(query)),
        proxy: [],
      };
    }
    if (activeFilter === 'proxy') {
      return {
        noProxy: [],
        needProxy: [],
        proxy: proxyServices.filter(api => api.name.toLowerCase().includes(query) || api.desc.toLowerCase().includes(query)),
      };
    }
    return {
      noProxy: noProxyAPIs.filter(api => api.name.toLowerCase().includes(query) || api.desc.toLowerCase().includes(query)),
      needProxy: needProxyAPIs.filter(api => api.name.toLowerCase().includes(query) || api.desc.toLowerCase().includes(query)),
      proxy: proxyServices.filter(api => api.name.toLowerCase().includes(query) || api.desc.toLowerCase().includes(query)),
    };
  };

  const { noProxy, needProxy, proxy } = getFilteredAPIs();
  const filters = [
    { id: 'all', label: '全部' },
    { id: 'no-proxy', label: '无需代理' },
    { id: 'need-proxy', label: '需要代理' },
    { id: 'proxy', label: '代理/中转' },
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
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">API 官网链接</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            快速访问各大 AI API 官网，按访问条件和服务类型筛选。
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-xl">
            <Input
              type="text"
              placeholder="搜索 API 名称，如 OpenAI、通义千问..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 px-4"
            />
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
          </div>

          {matchedAPI && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">找到「{matchedAPI.name}」</span>
              <Button size="sm" onClick={() => router.push(`/api/${matchedAPI.id}`)}>直接跳转</Button>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <Button
                key={filter.id}
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

          {(activeFilter === 'all' || activeFilter === 'proxy') && (
            <APISection title="代理/中转服务" desc="用于降低接入门槛或改善国内访问体验。" items={proxy} />
          )}
        </div>

        {noProxy.length === 0 && needProxy.length === 0 && proxy.length === 0 && (
          <div className="rounded-lg border bg-card py-12 text-center text-muted-foreground">
            没有找到匹配的 API
          </div>
        )}

        <div className="mt-10 rounded-lg border bg-card p-6">
          <h3 className="font-semibold">使用提示</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
            <li>点击官网入口可直接访问服务商控制台或官网。</li>
            <li>无需代理类 API 更适合初学者快速试用，部分服务提供免费额度。</li>
            <li>需要代理类 API 功能强，但通常需要稳定网络和国际支付方式。</li>
          </ul>
        </div>
      </div>
    </SidebarLayout>
  );
}
