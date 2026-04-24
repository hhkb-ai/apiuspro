'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { apiList, proxyServices, APIConfig } from '@/lib/api-config';

// API卡片组件
function APICard({ api }: { api: APIConfig }) {
  const badgeClass = api.badge.type === 'success' 
    ? 'bg-green-500 text-white' 
    : api.badge.type === 'warning' 
      ? 'bg-yellow-500 text-white'
      : 'bg-blue-500 text-white';
  
  return (
    <div className="bg-muted rounded-xl p-4 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-base">{api.name}</h3>
        <Badge className={`text-xs ${badgeClass}`}>{api.badge.text}</Badge>
      </div>
      <p className="text-sm text-foreground mb-4 flex-1">{api.desc}</p>
      <div className="flex gap-2">
        <a href={api.url} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button className="w-full bg-foreground text-background hover:bg-foreground/90">官网入口</Button>
        </a>
        <Link href={`/api/${api.id}`} className="flex-1">
          <Button variant="outline" className="w-full">详细说明</Button>
        </Link>
      </div>
    </div>
  );
}

export default function CloudAPIPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'no-proxy' | 'need-proxy' | 'proxy'>('all');

  const allAPIs = [...apiList, ...proxyServices];

  const matchedAPI = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase().trim();
    return allAPIs.find(api => api.name.toLowerCase() === query || api.id.toLowerCase() === query);
  }, [searchQuery, allAPIs]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim() || matchedAPI) return [];
    const query = searchQuery.toLowerCase().trim();
    return allAPIs.filter(api => api.name.toLowerCase().includes(query) || api.desc.toLowerCase().includes(query)).slice(0, 5);
  }, [searchQuery, matchedAPI, allAPIs]);

  const noProxyAPIs = apiList.filter(a => !a.proxy);
  const needProxyAPIs = apiList.filter(a => a.proxy);

  const getFilteredAPIs = () => {
    const query = searchQuery.toLowerCase();
    if (activeFilter === 'no-proxy') {
      return { noProxy: noProxyAPIs.filter(api => api.name.toLowerCase().includes(query) || api.desc.toLowerCase().includes(query)), needProxy: [], proxy: [] };
    }
    if (activeFilter === 'need-proxy') {
      return { noProxy: [], needProxy: needProxyAPIs.filter(api => api.name.toLowerCase().includes(query) || api.desc.toLowerCase().includes(query)), proxy: [] };
    }
    if (activeFilter === 'proxy') {
      return { noProxy: [], needProxy: [], proxy: proxyServices.filter(api => api.name.toLowerCase().includes(query) || api.desc.toLowerCase().includes(query)) };
    }
    return {
      noProxy: noProxyAPIs.filter(api => api.name.toLowerCase().includes(query) || api.desc.toLowerCase().includes(query)),
      needProxy: needProxyAPIs.filter(api => api.name.toLowerCase().includes(query) || api.desc.toLowerCase().includes(query)),
      proxy: proxyServices.filter(api => api.name.toLowerCase().includes(query) || api.desc.toLowerCase().includes(query))
    };
  };

  const { noProxy, needProxy, proxy } = getFilteredAPIs();

  return (
    <SidebarLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">API官网链接</h1>
          <p className="text-muted-foreground">快速访问各大AI API官网，按是否需要代理分类</p>
        </div>

        {/* 搜索和筛选 */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Input
              type="text"
              placeholder="搜索API名称，如 OpenAI、通义千问..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4"
            />
            {searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-10 overflow-hidden">
                {searchSuggestions.map((api) => (
                  <Link key={api.id} href={`/api/${api.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors" onClick={() => setSearchQuery('')}>
                    <span className="text-xl">{api.icon}</span>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{api.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{api.desc}</p>
                    </div>
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

          <div className="flex gap-2 flex-wrap">
            <Button variant={activeFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setActiveFilter('all')}>全部</Button>
            <Button variant={activeFilter === 'no-proxy' ? 'default' : 'outline'} size="sm" onClick={() => setActiveFilter('no-proxy')}>无需代理</Button>
            <Button variant={activeFilter === 'need-proxy' ? 'default' : 'outline'} size="sm" onClick={() => setActiveFilter('need-proxy')}>需要代理</Button>
            <Button variant={activeFilter === 'proxy' ? 'default' : 'outline'} size="sm" onClick={() => setActiveFilter('proxy')}>代理/中转</Button>
          </div>
        </div>

        {/* 无需代理API列表 */}
        {(activeFilter === 'all' || activeFilter === 'no-proxy') && noProxy.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">🟢 无需代理（国内直连）</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {noProxy.map((api) => <APICard key={api.id} api={api} />)}
            </div>
          </section>
        )}

        {/* 需要代理API列表 */}
        {(activeFilter === 'all' || activeFilter === 'need-proxy') && needProxy.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">🟠 需要代理（科学上网）</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {needProxy.map((api) => <APICard key={api.id} api={api} />)}
            </div>
          </section>
        )}

        {/* 代理服务列表 */}
        {(activeFilter === 'all' || activeFilter === 'proxy') && proxy.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">🔄 代理/中转服务</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {proxy.map((api) => <APICard key={api.id} api={api} />)}
            </div>
          </section>
        )}

        {/* 空状态 */}
        {noProxy.length === 0 && needProxy.length === 0 && proxy.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>没有找到匹配的API</p>
          </div>
        )}

        {/* 提示信息 */}
        <Card className="bg-muted/50 mt-8">
          <CardContent className="p-6">
            <h3 className="font-bold mb-2">使用提示</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• 点击API卡片可查看详细信息、教程和官网链接</li>
              <li>• 「无需代理」类API可直接访问，部分提供免费额度，适合初学者</li>
              <li>• 「需要代理」类API功能强大，但需要科学上网和国际支付方式</li>
              <li>• 修改API信息：编辑 <code className="bg-muted px-1 rounded">src/lib/api-config.ts</code></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}
