'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { apiList, appTutorials } from '@/lib/api-config';

const pages = [
  { id: 'cloud-api', name: 'API 列表', desc: '先看官网入口、代理要求和免费额度', url: '/cloud-api', tag: '优先查看' },
  { id: 'tutorial', name: '购买教程', desc: '按步骤完成注册、支付与 API Key 创建', url: '/tutorial', tag: '新手推荐' },
  { id: 'local-deploy', name: '本地部署', desc: '笔记本也能跑！Ollama 一键部署 Gemma 4、Qwen3.6 最新模型', url: '/local-deploy', tag: '进阶路线' },
];

const navLinks = [
  { name: 'API官网', href: '/cloud-api' },
  { name: 'API测评', href: '/api-review' },
  { name: '购买教程', href: '/tutorial' },
  { name: 'API应用', href: '/app' },
  { name: '本地部署', href: '/local-deploy' },
];

const quickLinks = [
  { name: 'DeepSeek', id: 'deepseek' },
  { name: 'OpenAI', id: 'openai' },
  { name: '通义千问', id: 'aliyun' },
  { name: 'Claude', id: 'claude' },
  { name: 'Gemini', id: 'gemini' },
  { name: '智谱 GLM', id: 'zhipu' },
  { name: 'Kimi', id: 'kimi' },
];

const featuredAPIs = [
  apiList.find(a => a.id === 'deepseek')!,
  apiList.find(a => a.id === 'aliyun')!,
  apiList.find(a => a.id === 'zhipu')!,
  apiList.find(a => a.id === 'openai')!,
  apiList.find(a => a.id === 'claude')!,
  apiList.find(a => a.id === 'gemini')!,
];

const stats = [
  { value: `${apiList.length}+`, label: 'API 官网入口' },
  { value: `${apiList.filter(api => api.tutorial).length}`, label: '购买教程' },
  { value: `${appTutorials.length}`, label: '应用教程' },
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

function accessText(proxy?: boolean) {
  return proxy ? '需要代理' : '无需代理';
}

// 自定义防抖 Hook
function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// 键盘导航 Hook
interface FlatItem {
  id: string;
  name: string;
  href: string;
}

function useSearchKeyboard({
  items,
  isOpen,
  onClose,
  inputRef,
}: {
  items: FlatItem[];
  isOpen: boolean;
  onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const activeIndexRef = useRef(-1);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    activeIndexRef.current = -1;
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.min(activeIndexRef.current + 1, items.length - 1);
        activeIndexRef.current = next;
        itemRefs.current[next]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = activeIndexRef.current - 1;
        if (prev < 0) {
          activeIndexRef.current = -1;
          inputRef.current?.focus();
        } else {
          activeIndexRef.current = prev;
          itemRefs.current[prev]?.focus();
        }
      } else if (e.key === 'Escape') {
        onClose();
        inputRef.current?.focus();
      }
    },
    [isOpen, items.length, onClose, inputRef],
  );

  const handleItemKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.min(index + 1, items.length - 1);
        activeIndexRef.current = next;
        itemRefs.current[next]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (index === 0) {
          activeIndexRef.current = -1;
          inputRef.current?.focus();
        } else {
          activeIndexRef.current = index - 1;
          itemRefs.current[index - 1]?.focus();
        }
      } else if (e.key === 'Escape') {
        onClose();
        inputRef.current?.focus();
      }
    },
    [items.length, onClose, inputRef],
  );

  const setItemRef = useCallback(
    (el: HTMLAnchorElement | null, index: number) => {
      itemRefs.current[index] = el;
    },
    [],
  );

  return { handleKeyDown, handleItemKeyDown, setItemRef };
}

// 建议分组组件
function SuggestionGroup({
  label,
  items,
  startIndex,
  onSelect,
  setItemRef,
  handleItemKeyDown,
}: {
  label: string;
  items: { id: string; name: string; desc: string; href: string }[];
  startIndex: number;
  onSelect: () => void;
  setItemRef: (el: HTMLAnchorElement | null, index: number) => void;
  handleItemKeyDown: (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => void;
}) {
  if (items.length === 0) return null;

  return (
    <div role="group" aria-label={label}>
      <div className="border-b bg-muted/60 px-4 py-2 text-xs font-medium text-muted-foreground">
        {label}
      </div>
      {items.map((item, i) => {
        const flatIndex = startIndex + i;
        return (
          <Link
            key={item.id}
            href={item.href}
            ref={(el) => setItemRef(el, flatIndex)}
            role="option"
            aria-selected={false}
            onClick={onSelect}
            onKeyDown={(e) => handleItemKeyDown(e, flatIndex)}
            className="flex flex-col gap-0.5 px-3 py-2.5 transition-colors hover:bg-muted/70 focus:bg-muted/70 focus:outline-none active:bg-muted/90 sm:px-4 sm:py-3"
          >
            <p className="truncate text-sm font-medium sm:text-base">{item.name}</p>
            <p className="truncate text-xs text-muted-foreground sm:text-sm">{item.desc}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default function HomeClient() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 防抖处理，避免每次按键都触发搜索计算
  const debouncedQuery = useDebounce(searchQuery, 200);

  // 统一规范化，避免重复调用 toLowerCase/trim
  const normalizedQuery = useMemo(
    () => debouncedQuery.toLowerCase().trim(),
    [debouncedQuery]
  );

  // 搜索结果和精确匹配合并到一个 useMemo，共用同一个 normalizedQuery
  const { searchResults, exactMatch, hasResults, flatItems } = useMemo(() => {
    if (!normalizedQuery) {
      return {
        searchResults: { apis: [], tutorials: [], pages: [], apps: [] },
        exactMatch: null,
        hasResults: false,
        flatItems: [],
      };
    }

    const matchesQuery = (text: string) => text.toLowerCase().includes(normalizedQuery);

    const apis = apiList
      .filter(api => matchesQuery(api.name) || matchesQuery(api.desc))
      .slice(0, 4)
      .map(a => ({ ...a, href: `/api/${a.id}` }));
    const tutorials = apiList
      .filter(api => api.tutorial && (matchesQuery(api.name) || matchesQuery(api.desc)))
      .slice(0, 3)
      .map(a => ({ ...a, name: a.tutorial?.title || `${a.name}教程`, href: `/tutorial/${a.id}` }));
    const apps = appTutorials
      .filter(app => matchesQuery(app.name) || matchesQuery(app.desc))
      .slice(0, 3)
      .map(a => ({ ...a, href: `/app/${a.id}` }));
    const pageItems = pages
      .filter(page => matchesQuery(page.name) || matchesQuery(page.desc))
      .map(p => ({ ...p, href: p.url }));

    const flat = [...apis, ...tutorials, ...apps, ...pageItems];

    return {
      searchResults: { apis, tutorials, apps, pages: pageItems },
      exactMatch: apiList.find(
        api =>
          api.name.toLowerCase() === normalizedQuery ||
          api.id.toLowerCase() === normalizedQuery
      ) ?? null,
      hasResults: flat.length > 0,
      flatItems: flat,
    };
  }, [normalizedQuery]);

  const closeSuggestions = useCallback(() => setShowSuggestions(false), []);

  const { handleKeyDown, handleItemKeyDown, setItemRef } = useSearchKeyboard({
    items: flatItems,
    isOpen: showSuggestions,
    onClose: closeSuggestions,
    inputRef,
  });

  // 点击建议框外部时关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeSuggestions();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeSuggestions]);

  const handleSearch = useCallback(() => {
    if (!normalizedQuery || !exactMatch) return;
    router.push(`/api/${exactMatch.id}`);
    closeSuggestions();
  }, [exactMatch, normalizedQuery, router, closeSuggestions]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0">
            <span className="block text-base font-semibold">API知识站</span>
            <span className="hidden text-xs text-muted-foreground sm:block">API 学习与选型指南</span>
          </Link>
          <nav className="flex min-w-0 items-center gap-1 overflow-x-auto text-sm">
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className="shrink-0 rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:px-3 sm:py-2"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="px-4 py-8 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="inline-flex rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground">
                  AI API 选型、购买、接入一站整理
                </span>
                <ThemeToggle />
              </div>
              <h1 className="mx-auto max-w-4xl text-3xl font-semibold leading-[1.18] sm:text-4xl lg:text-5xl">
                <span className="block">更快找到可用的 AI API</span>
                <span className="mt-1 block">少走接入弯路</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                从官网入口、代理要求、免费额度到购买教程和本地部署，按真实使用路径整理。
              </p>
            </div>

            <div ref={containerRef} className="relative mx-auto mt-6 px-1 sm:mt-9 sm:max-w-4xl sm:px-0">
              <p className="mb-3 text-center text-sm font-medium text-foreground">搜索 API 或工具名称</p>
              <div className="flex gap-2 rounded-lg border bg-card p-1.5 shadow-sm sm:gap-3 sm:p-2">
                <input
                  ref={inputRef}
                  type="search"
                  placeholder="搜索 API，如 OpenAI、通义千问..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(e) => {
                    handleKeyDown(e);
                    if (e.key === 'Enter') handleSearch();
                  }}
                  aria-label="搜索 API 或工具"
                  aria-autocomplete="list"
                  aria-expanded={showSuggestions && hasResults}
                  aria-controls="search-suggestions"
                  className="h-10 flex-1 border-0 bg-transparent px-3 text-base shadow-none focus-visible:ring-0 sm:h-12 sm:px-4"
                />
                <Button
                  className="h-10 px-4 text-sm sm:h-12 sm:px-7 sm:text-base"
                  onClick={handleSearch}
                  disabled={!normalizedQuery}
                  aria-label="执行搜索"
                >
                  搜索
                </Button>
              </div>

              {/* 计算各分组在 flatItems 中的起始索引 */}
              {(() => {
                const tutorialsStart = searchResults.apis.length;
                const appsStart = tutorialsStart + searchResults.tutorials.length;
                const pagesStart = appsStart + searchResults.apps.length;

                return showSuggestions && normalizedQuery && (
                  <div
                    id="search-suggestions"
                    role="listbox"
                    aria-label="搜索建议"
                    onMouseDown={(e) => e.preventDefault()}
                    className="absolute left-0 right-0 top-full z-10 mt-2 max-h-[50vh] overflow-y-auto overscroll-contain rounded-lg border bg-card shadow-lg sm:max-h-[480px]"
                  >
                    {hasResults ? (
                      <>
                        <SuggestionGroup label="API" items={searchResults.apis} startIndex={0}
                          onSelect={closeSuggestions} setItemRef={setItemRef} handleItemKeyDown={handleItemKeyDown} />
                        <SuggestionGroup label="购买教程" items={searchResults.tutorials} startIndex={tutorialsStart}
                          onSelect={closeSuggestions} setItemRef={setItemRef} handleItemKeyDown={handleItemKeyDown} />
                        <SuggestionGroup label="API 应用" items={searchResults.apps} startIndex={appsStart}
                          onSelect={closeSuggestions} setItemRef={setItemRef} handleItemKeyDown={handleItemKeyDown} />
                        <SuggestionGroup label="页面" items={searchResults.pages} startIndex={pagesStart}
                          onSelect={closeSuggestions} setItemRef={setItemRef} handleItemKeyDown={handleItemKeyDown} />

                        {exactMatch && (
                          <div className="flex flex-wrap items-center gap-2 border-t bg-muted/40 px-4 py-3 text-sm">
                            <span className="text-muted-foreground">找到「{exactMatch.name}」</span>
                            <Button size="sm" onClick={() => { router.push(`/api/${exactMatch.id}`); closeSuggestions(); }}>
                              直接跳转
                            </Button>
                            {exactMatch.tutorial && (
                              <Button size="sm" variant="outline"
                                onClick={() => { router.push(`/tutorial/${exactMatch.id}`); closeSuggestions(); }}>
                                购买教程
                              </Button>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                        未找到相关内容，试试 OpenAI、通义千问、Claude。
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            <div className="mx-auto mt-4 grid max-w-md grid-cols-3 gap-3 rounded-lg border bg-card p-4">
              {stats.map(item => (
                <div key={item.label} className="min-w-0 text-center">
                  <p className="text-xl font-semibold">{item.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3">
              {pages.map(page => (
                <Link
                  key={page.id}
                  href={page.url}
                  className="group rounded-lg border bg-card p-5 transition-colors hover:border-foreground/30"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="font-semibold">{page.name}</p>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground group-hover:text-foreground">
                      {page.tag}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{page.desc}</p>
                </Link>
              ))}
            </div>

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

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="mr-1 text-sm text-muted-foreground">常用：</span>
              {quickLinks.map((link) => (
                <Link
                  key={link.id}
                  href={`/api/${link.id}`}
                  className="rounded-full border bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 快速入门 */}
        <section className="border-t border-border px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <p className="text-sm font-medium text-muted-foreground">新手必看</p>
              <h2 className="mt-2 text-2xl font-semibold">3 分钟快速入门</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                不知道从哪里开始？按照以下步骤，快速上手 AI API
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">1</span>
                  <h3 className="font-semibold">选择 API</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  根据需求选择合适的 API 服务。国内用户推荐 DeepSeek、通义千问，无需代理即可访问。
                </p>
                <Link href="/cloud-api">
                  <span className="text-sm font-medium text-foreground hover:underline">查看 API 列表 →</span>
                </Link>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">2</span>
                  <h3 className="font-semibold">注册购买</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  按照教程完成注册、认证和充值。大部分国产 API 支持支付宝/微信支付。
                </p>
                <Link href="/tutorial">
                  <span className="text-sm font-medium text-foreground hover:underline">查看购买教程 →</span>
                </Link>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">3</span>
                  <h3 className="font-semibold">接入使用</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  获取 API Key 后，即可在代码或工具中使用。国产 API 兼容 OpenAI 接口格式。
                </p>
                <Link href="/faq">
                  <span className="text-sm font-medium text-foreground hover:underline">查看常见问题 →</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-card/40 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-medium text-muted-foreground">先从这里选</p>
                <h2 className="mt-1 text-2xl font-semibold">精选 API</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  优先展示常用服务，卡片里直接标出访问条件和核心能力，方便快速比较。
                </p>
              </div>
              <Link href="/cloud-api">
                <Button variant="outline">查看全部</Button>
              </Link>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link href="/cloud-api" className="rounded-lg border bg-card p-5 transition-colors hover:border-foreground/30">
                <p className="font-semibold">无需代理</p>
                <p className="mt-1 text-sm text-muted-foreground">国内直连，适合快速开箱和学习接入。</p>
              </Link>
              <Link href="/cloud-api" className="rounded-lg border bg-card p-5 transition-colors hover:border-foreground/30">
                <p className="font-semibold">需要代理</p>
                <p className="mt-1 text-sm text-muted-foreground">OpenAI、Claude、Gemini 等国际服务。</p>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredAPIs.map((api) => (
                <article key={api.id} className="flex min-h-56 flex-col rounded-lg border bg-card p-5 transition-colors hover:border-foreground/30">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{api.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{accessText(api.proxy)}</p>
                    </div>
                    <Badge variant="outline" className={badgeClass(api.badge.type)}>{api.badge.text}</Badge>
                  </div>
                  <p className="flex-1 text-sm leading-6 text-muted-foreground">{api.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {api.features.slice(0, 3).map(feature => (
                      <span key={feature} className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-2">
                    <a href={api.url} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button className="w-full" size="sm">官网入口</Button>
                    </a>
                    <Link href={`/api/${api.id}`} className="flex-1">
                      <Button variant="outline" className="w-full" size="sm">详细说明</Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="app-section" className="border-t border-border px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-medium text-muted-foreground">接入之后做什么</p>
                <h2 className="mt-1 text-2xl font-semibold">API 应用教程</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  围绕常见工具和工作流整理教程，从安装到使用路径更清晰。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {appTutorials.map((tutorial) => (
                <article key={tutorial.id} className="flex min-h-48 flex-col rounded-lg border bg-card p-5 transition-colors hover:border-foreground/30">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="font-semibold">{tutorial.name}</h3>
                    <Badge variant="outline" className={badgeClass(tutorial.badge.type)}>{tutorial.badge.text}</Badge>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{tutorial.desc}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{tutorial.sections.length} 个章节</p>
                  <div className="mt-auto pt-5">
                    <Link href={`/app/${tutorial.id}`}>
                      <Button variant="outline" className="w-full" size="sm">详细教程</Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 更新日志 */}
        <section className="border-t border-border px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-4">更新日志</h3>
              <div className="space-y-4 text-sm">
                {/* 2026-05-07 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">2026-05-07</span>
                  </div>
                  <ul className="ml-2 space-y-1 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">★</span>
                      <span>新增小米 MiMo API 购买教程</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">★</span>
                      <span>更新 Claude 支持 1M 上下文</span>
                    </li>
                    <li>优化本地部署教程结构</li>
                  </ul>
                </div>

                {/* 2026-05-06 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">2026-05-06</span>
                  </div>
                  <ul className="ml-2 space-y-1 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">★</span>
                      <span>新增 Gemma 4、Qwen3.6 本地部署教程</span>
                    </li>
                    <li>SEO 优化：补充页面 metadata、修复 Bing 收录问题</li>
                  </ul>
                </div>

                {/* 2026-04-28 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">2026-04-28</span>
                    <span className="text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">重要更新</span>
                  </div>
                  <ul className="ml-2 space-y-1 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">★</span>
                      <span>上线 FAQ 常见问题页面</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">★</span>
                      <span>新增首页搜索功能、应用教程路由</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">★</span>
                      <span>DeepSeek V4 系列对比测评上线</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">★</span>
                      <span>恢复 GPT-5.5 / Claude Opus 4.7 / Gemini 3 购买教程</span>
                    </li>
                    <li>SEO 结构化数据、站点地图、OpenGraph 图片</li>
                    <li>合规审查与敏感词中性化处理</li>
                  </ul>
                </div>

                {/* 2026-04-24 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">2026-04-24</span>
                  </div>
                  <ul className="ml-2 space-y-1 text-muted-foreground">
                    <li>网站初始上线</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground">
        <p>API知识站 - 适合初学者的 API 学习平台</p>
        <div className="mt-3 flex flex-col items-center justify-center gap-2">
          <a
            href="https://beian.miit.gov.cn/"
            rel="noreferrer"
            target="_blank"
            className="transition-colors hover:text-foreground"
          >
            粤ICP备2026048178号
          </a>
          <a
            href="https://beian.mps.gov.cn/#/query/webSearch?code=44162102000181"
            rel="noreferrer"
            target="_blank"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <img
              src="/images/beian.png"
              alt="公安备案图标"
              className="h-4 w-4"
            />
            粤公网安备44162102000181号
          </a>
        </div>
      </footer>
    </div>
  );
}
