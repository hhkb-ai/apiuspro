'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiList, appTutorials } from '@/lib/api-config';

const pages = [
  { id: 'cloud-api', name: 'API 列表', desc: '先看官网入口、代理要求和免费额度', url: '/cloud-api' },
  { id: 'tutorial', name: '购买教程', desc: '按步骤完成注册、支付与 API Key 创建', url: '/tutorial' },
  { id: 'local-deploy', name: '本地部署', desc: 'Ollama / LM Studio 等本地模型方案', url: '/local-deploy' },
];

export default function SearchSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isComposingRef = useRef(false);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { apis: [], tutorials: [], pages: [], apps: [] };
    const q = searchQuery.toLowerCase().trim();
    return {
      apis: apiList
        .filter(api => api.name.toLowerCase().includes(q) || api.desc.toLowerCase().includes(q))
        .slice(0, 4),
      tutorials: apiList
        .filter(api => api.tutorial && api.name.toLowerCase().includes(q))
        .slice(0, 3),
      pages: pages.filter(page => page.name.toLowerCase().includes(q) || page.desc.toLowerCase().includes(q)),
      apps: appTutorials
        .filter(app => app.name.toLowerCase().includes(q) || app.desc.toLowerCase().includes(q))
        .slice(0, 3),
    };
  }, [searchQuery]);

  const exactMatch = searchQuery.trim()
    ? apiList.find(api =>
        api.name.toLowerCase() === searchQuery.toLowerCase().trim() ||
        api.id.toLowerCase() === searchQuery.toLowerCase().trim(),
      )
    : null;

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !isComposingRef.current && exactMatch) {
      router.push(`/api/${exactMatch.id}`);
    }
  }

  function handleBlur() {
    // 用 ref 存储 timeout，避免竞态；保留 200ms 让链接点击能生效
    blurTimeoutRef.current = setTimeout(() => setShowSuggestions(false), 200);
  }

  function handleFocus() {
    // 清除待执行的 blur timeout，防止快速切换焦点导致下拉菜单消失
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    setShowSuggestions(true);
  }

  return (
    <div className="relative mx-auto mt-9 max-w-4xl">
      <p className="mb-3 text-center text-sm font-medium text-foreground">搜索 API 或工具名称</p>
      <div className="flex gap-3 rounded-lg border bg-card p-2 shadow-sm">
        <Input
          type="text"
          placeholder="搜索 API 名称，如 OpenAI、通义千问..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => { isComposingRef.current = true; }}
          onCompositionEnd={() => { isComposingRef.current = false; }}
          className="h-12 flex-1 border-0 bg-transparent px-4 text-base shadow-none focus-visible:ring-0"
        />
        <Button
          className="h-12 px-7"
          onClick={() => exactMatch && router.push(`/api/${exactMatch.id}`)}
        >
          搜索
        </Button>
      </div>

      {showSuggestions && searchQuery.trim() && (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-lg border bg-card shadow-sm">
          {searchResults.apis.length > 0 && (
            <>
              <div className="border-b bg-muted/60 px-4 py-2 text-xs font-medium text-muted-foreground">API</div>
              {searchResults.apis.map((api) => (
                <Link
                  key={api.id}
                  href={`/api/${api.id}`}
                  className="block px-4 py-3 transition-colors hover:bg-muted/70"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <p className="truncate font-medium">{api.name}</p>
                  <p className="truncate text-sm text-muted-foreground">{api.desc}</p>
                </Link>
              ))}
            </>
          )}
          {searchResults.tutorials.length > 0 && (
            <>
              <div className="border-y bg-muted/60 px-4 py-2 text-xs font-medium text-muted-foreground">购买教程</div>
              {searchResults.tutorials.map((api) => (
                <Link
                  key={api.id}
                  href={`/tutorial/${api.id}`}
                  className="block px-4 py-3 transition-colors hover:bg-muted/70"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <p className="truncate font-medium">{api.tutorial?.title || `${api.name}教程`}</p>
                  <p className="truncate text-sm text-muted-foreground">{api.desc}</p>
                </Link>
              ))}
            </>
          )}
          {searchResults.apps.length > 0 && (
            <>
              <div className="border-y bg-muted/60 px-4 py-2 text-xs font-medium text-muted-foreground">API应用</div>
              {searchResults.apps.map((app) => (
                <Link
                  key={app.id}
                  href={`/app/${app.id}`}
                  className="block px-4 py-3 transition-colors hover:bg-muted/70"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <p className="truncate font-medium">{app.name}</p>
                  <p className="truncate text-sm text-muted-foreground">{app.desc}</p>
                </Link>
              ))}
            </>
          )}
          {searchResults.pages.length > 0 && (
            <>
              <div className="border-y bg-muted/60 px-4 py-2 text-xs font-medium text-muted-foreground">页面</div>
              {searchResults.pages.map((page) => (
                <Link
                  key={page.id}
                  href={page.url}
                  className="block px-4 py-3 transition-colors hover:bg-muted/70"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <p className="truncate font-medium">{page.name}</p>
                  <p className="truncate text-sm text-muted-foreground">{page.desc}</p>
                </Link>
              ))}
            </>
          )}
          {searchResults.apis.length === 0 &&
            searchResults.tutorials.length === 0 &&
            searchResults.pages.length === 0 &&
            searchResults.apps.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                未找到相关内容，试试 OpenAI、通义千问、Claude。
              </div>
            )}
        </div>
      )}

      {exactMatch && searchQuery.trim() && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">找到「{exactMatch.name}」</span>
          <Button size="sm" onClick={() => router.push(`/api/${exactMatch.id}`)}>直接跳转</Button>
          {exactMatch.tutorial && (
            <Button size="sm" variant="outline" onClick={() => router.push(`/tutorial/${exactMatch.id}`)}>
              购买教程
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
