'use client';

import { useDeferredValue, useMemo, useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { BeianLinks } from '@/components/layout/BeianLinks';
import { BrandIcon } from '@/components/api/BrandIcon';
import { apiList, appTutorials } from '@/lib/api-config';
import { fuzzyScore, sortByFuzzyScore } from '@/lib/fuzzy-search';
import { searchAll, findExactMatch } from '@/lib/search-index';
import { BookOpen, ChevronRight, Cloud, Home, Menu, Search, X } from 'lucide-react';

const pages = [
  { id: 'cloud-api', name: 'API 列表', desc: '先看官网入口、代理要求和免费额度', url: '/cloud-api', tag: '优先查看' },
  { id: 'tutorial', name: '购买教程', desc: '按步骤完成注册、支付与 API Key 创建', url: '/tutorial', tag: '新手推荐' },
  { id: 'local-deploy', name: '本地部署', desc: '笔记本也能跑！Ollama 一键部署开源模型', url: '/local-deploy', tag: '进阶路线' },
];

const beginnerLearningSteps = [
  { step: '01', title: 'AI 常识', desc: '看懂模型、Token、上下文', href: '/learn/ai-basics' },
  { step: '02', title: '提示词', desc: '把需求说清楚', href: '/learn/prompting' },
  { step: '03', title: 'API 基础', desc: '理解 Key、Base URL、JSON', href: '/learn/api-config-basics' },
  { step: '04', title: '第一次调用', desc: '选平台并跑通示例', href: '/learn/first-api-call' },
];

const userEntryCards = [
  {
    title: '完全不懂 AI',
    desc: '先看懂 AI、模型、Token、上下文和提示词。',
    href: '/learn',
    action: 'AI 入门',
  },
  {
    title: '准备购买 API',
    desc: '对比平台、价格、代理要求和支付方式。',
    href: '/tutorial',
    action: '购买教程',
  },
  {
    title: '已经开始接入',
    desc: '排查 API Key、Base URL、模型名和常见报错。',
    href: '/error',
    action: '接入与报错',
  },
];

const tutorialsList = apiList.filter(api => api.tutorial);
const tutorialPriority = ['deepseek', 'openai', 'claude', 'gemini', 'aliyun', 'kimi', 'doubao', 'zhipu', 'tencent', 'mimo'];
const hotTutorials = [...tutorialsList].sort((a, b) => {
  const aPriority = tutorialPriority.indexOf(a.id);
  const bPriority = tutorialPriority.indexOf(b.id);
  return (aPriority === -1 ? 999 : aPriority) - (bPriority === -1 ? 999 : bPriority);
});
const featuredHotTutorials = hotTutorials.slice(0, 4);

const desktopNavLinks = [
  { name: 'AI 入门', href: '/learn' },
  { name: '购买教程', href: '/tutorial' },
  { name: '模型测评', href: '/api-review' },
  { name: 'API 应用', href: '/app' },
];

const mobileMenuLinks = [
  { name: 'AI 入门', href: '/learn', desc: '从基础概念开始' },
  { name: '购买教程', href: '/tutorial', desc: '注册、支付和 API Key' },
  { name: 'API 列表', href: '/cloud-api', desc: '官网入口和接入要求' },
  { name: '应用教程', href: '/app', desc: '把 API 接入常用工具' },
  { name: '错误解决', href: '/error', desc: '排查 Key、模型和额度问题' },
  { name: 'API 测评', href: '/api-review', desc: '看模型和平台对比' },
];

function accessText(proxy?: boolean) {
  return proxy ? '需要代理' : '无需代理';
}

interface Suggestion {
  id: string;
  name: string;
  desc: string;
  href: string;
  type: string;
}

type SearchBarProps = {
  query: string;
  setQuery: (q: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  suggestions: Suggestion[];
  showSuggestions: boolean;
  setShowSuggestions: (s: boolean) => void;
  searchId: string;
};

function useSearch(rawQuery: string, maxResults: number) {
  const normalizedQuery = useDeferredValue(rawQuery.toLowerCase().trim());

  const result = useMemo(() => {
    if (!normalizedQuery) return { suggestions: [] as Suggestion[], exactMatch: null as { href: string } | null, appExactMatch: null };

    // 使用统一搜索索引
    const allResults = searchAll(normalizedQuery, maxResults);

    // 转换为 Suggestion 格式
    const suggestions: Suggestion[] = allResults.map(item => ({
      id: item.id,
      name: item.name,
      desc: item.desc,
      href: item.href,
      type: item.type,
    }));

    // 精确匹配
    const exactHref = findExactMatch(normalizedQuery);

    return {
      suggestions,
      exactMatch: exactHref ? { href: exactHref } : null,
      appExactMatch: null, // 已在 findExactMatch 中处理
    };
  }, [normalizedQuery, maxResults]);

  return result;
}

function DesktopSearchBar({ query, setQuery, onSubmit, suggestions, showSuggestions, setShowSuggestions, searchId }: SearchBarProps) {
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showSuggestions) return;

    function handlePointerDown(event: PointerEvent) {
      if (!searchRef.current?.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowSuggestions, showSuggestions]);

  return (
    <div
      ref={searchRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setShowSuggestions(false);
        }
      }}
    >
      <form
        id={searchId}
        className="flex h-14 items-center gap-2 rounded-[14px] border border-border bg-card px-4 shadow-sm"
        onSubmit={onSubmit}
        role="search"
      >
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground" style={{ width: 16, height: 16 }} />
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="搜索 DeepSeek、Claude、API Key、提示词、429 报错..."
            aria-label="搜索 API、教程或工具"
            className="h-full w-full border-0 bg-transparent pl-5 pr-4 text-sm outline-none placeholder:text-gray-400"
          />
        </div>
        <button
          type="submit"
          className="hidden"
          disabled={!query.trim() || suggestions.length === 0}
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {showSuggestions && query.trim() && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-[58vh] overflow-y-auto overscroll-contain rounded-lg border border-border bg-card shadow-sm">
          {suggestions.length > 0 ? (
            suggestions.map(item => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setShowSuggestions(false)}
                className="flex items-center gap-3 border-b border-border px-3 py-3 last:border-b-0 hover:bg-muted/50 active:bg-muted"
              >
                <span className="rounded-md border border-border bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">{item.type}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{item.name}</span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">{item.desc}</span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            ))
          ) : (
            <div className="px-4 py-5 text-center text-sm text-muted-foreground">
              没找到结果，试试 DeepSeek、Claude、API Key。
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MobileSearchBar({ query, setQuery, onSubmit, suggestions, showSuggestions, setShowSuggestions, searchId }: SearchBarProps) {
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!showSuggestions) return;

    function handlePointerDown(event: PointerEvent) {
      if (!searchRef.current?.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowSuggestions, showSuggestions]);

  return (
    <div
      ref={searchRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setShowSuggestions(false);
        }
      }}
    >
      <form
        id={searchId}
        className="flex items-center gap-2 rounded-xl border border-border bg-card shadow-sm px-3"
        onSubmit={onSubmit}
        role="search"
      >
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground" style={{ width: 14, height: 14 }} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="搜索 DeepSeek、Claude..."
            aria-label="搜索 API、教程或工具"
            className="h-12 w-full border-0 bg-transparent pl-5 pr-11 text-[13px] outline-none placeholder:text-gray-400"
          />
          {query.trim() && (
            <button
              type="button"
              aria-label="清除搜索内容"
              onClick={clearSearch}
              className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors duration-100 active:bg-muted"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="hidden"
          disabled={!query.trim() || suggestions.length === 0}
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {showSuggestions && query.trim() && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-[50vh] overflow-y-auto overscroll-contain rounded-lg border border-border bg-card shadow-sm">
          {suggestions.length > 0 && (
            <div className="border-b border-border px-3 py-2 text-[11px] font-medium text-muted-foreground">
              搜索建议
            </div>
          )}
          {suggestions.length > 0 ? (
            suggestions.map(item => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setShowSuggestions(false)}
                className="flex min-h-[56px] items-center gap-3 border-b border-border px-3 py-3 last:border-b-0 active:bg-muted"
              >
                <span className="rounded-md border border-border bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">{item.type}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{item.name}</span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">{item.desc}</span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            ))
          ) : (
            <div className="px-4 py-5 text-center text-sm text-muted-foreground">
              没找到结果，试试 DeepSeek、Claude、API Key。
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DesktopHeader({ searchId }: { searchId: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 md:h-16 lg:px-8">
        <Link href="/" className="shrink-0">
          <span className="block text-lg font-bold tracking-tight">ApiUsPro</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {desktopNavLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <a href={`#${searchId}`} aria-label="跳转到搜索" className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:h-10 md:w-10">
            <Search className="w-5 h-5" />
          </a>
          <ThemeToggle />
          <Link href="/learn" className="hidden h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 md:inline-flex">
            开始学习
          </Link>
        </div>
      </div>
    </header>
  );
}

function MobileHeader({ searchId, onMenuOpen }: { searchId: string; onMenuOpen: () => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 md:h-16 lg:px-8">
        <Link href="/" className="shrink-0">
          <span className="block text-lg font-bold tracking-tight">ApiUsPro</span>
        </Link>
        <div className="flex shrink-0 items-center gap-3">
          <a href={`#${searchId}`} aria-label="跳转到搜索" className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:h-10 md:w-10">
            <Search className="w-5 h-5" />
          </a>
          <ThemeToggle />
          <button type="button" aria-label="打开栏目菜单" onClick={onMenuOpen} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors duration-100 active:bg-muted md:hidden">
            <Menu className="size-[18px]" />
          </button>
        </div>
      </div>
    </header>
  );
}

function BeginnerRoutePanel({ compact = false, sectionId }: { compact?: boolean; sectionId: string }) {
  return (
    <section id={sectionId} className={compact ? 'mt-4 rounded-2xl border border-border bg-card p-4' : 'flex h-full flex-col rounded-[20px] border border-border bg-card p-6'}>
      <div className="mb-5">
        <h2 className={compact ? 'text-[17px] font-semibold' : 'text-xl font-semibold'}>4 步开始</h2>
      </div>
      <div className={compact ? 'relative flex-1 pl-11' : 'relative flex-1 pl-[52px]'}>
        <div className={compact ? 'absolute left-4 top-4 bottom-9 w-[1.5px] bg-border/55' : 'absolute left-[19px] top-5 bottom-5 w-[1.5px] bg-border/50'} />
        {beginnerLearningSteps.map((item, index) => (
          <Link
            key={item.step}
            href={item.href}
            className={compact ? 'relative mb-2.5 flex items-center gap-3 last:mb-0' : 'relative mb-3 flex items-center gap-3 last:mb-0'}
          >
            <span className={compact ? 'absolute -left-11 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-background bg-muted text-[12px] font-medium text-muted-foreground z-10' : 'absolute -left-[52px] top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-background bg-muted text-[13px] font-medium text-muted-foreground z-10'}>
              {item.step}
            </span>
            <div>
              <h3 className={compact ? 'text-[13px] font-semibold' : 'text-sm font-semibold'}>{item.title}</h3>
              <p className={compact ? 'mt-0.5 text-[11px] text-muted-foreground' : 'mt-0.5 text-xs text-muted-foreground'}>{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/learn" className={compact ? 'mt-4 flex h-11 w-full items-center justify-center rounded-[10px] border border-border text-[13px] font-medium text-foreground transition-colors active:bg-muted' : 'mt-5 flex h-12 w-full items-center justify-center rounded-xl border border-border text-sm font-medium text-foreground transition-colors hover:bg-muted'}>
        进入学习路线
      </Link>
    </section>
  );
}

function DesktopHero({
  query,
  setQuery,
  onSubmit,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  searchId,
  beginnerId,
  purchaseId,
}: {
  query: string;
  setQuery: (q: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  suggestions: Suggestion[];
  showSuggestions: boolean;
  setShowSuggestions: (s: boolean) => void;
  searchId: string;
  beginnerId: string;
  purchaseId: string;
}) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[7fr_5fr]">
          <div className="flex min-w-0 flex-col">
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">AI 与 API 学习导航</p>
            <div className="mb-6 h-0.5 w-12 bg-primary" />
            <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight">
              先看懂 AI，<br />再把 API 用起来
            </h1>
            <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              从基础词汇、提示词、API Key 到模型购买与首次调用，把新手真正需要的路径整理成一条清晰路线。
            </p>
            <div className="mb-5 max-w-2xl">
              <DesktopSearchBar
                query={query}
                setQuery={setQuery}
                onSubmit={onSubmit}
                suggestions={suggestions}
                showSuggestions={showSuggestions}
                setShowSuggestions={setShowSuggestions}
                searchId={searchId}
              />
            </div>
            <div className="mb-4 flex gap-3">
              <Link href={`#${beginnerId}`} className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground">
                从新手路线开始
              </Link>
              <Link href={`#${purchaseId}`} className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-6 text-sm font-medium text-foreground">
                查看购买教程
              </Link>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              适合零基础用户、AI 使用者和开发者
            </p>
          </div>
          <BeginnerRoutePanel sectionId={beginnerId} />
        </div>
      </div>
    </section>
  );
}

function MobileHero({
  query,
  setQuery,
  onSubmit,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  searchId,
  beginnerId,
  purchaseId,
}: {
  query: string;
  setQuery: (q: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  suggestions: Suggestion[];
  showSuggestions: boolean;
  setShowSuggestions: (s: boolean) => void;
  searchId: string;
  beginnerId: string;
  purchaseId: string;
}) {
  return (
    <section className="px-0 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="flex min-w-0 flex-col">
            <p className="mb-2 text-[26px] font-bold leading-tight tracking-tight">
              先看懂 AI，<br />再把 API 用起来
            </p>
            <p className="mb-5 text-[13px] leading-relaxed text-muted-foreground">
              从 AI 入门到 API 调用，先找到你现在该看的内容。
            </p>
            <div className="mb-3">
              <MobileSearchBar
                query={query}
                setQuery={setQuery}
                onSubmit={onSubmit}
                suggestions={suggestions}
                showSuggestions={showSuggestions}
                setShowSuggestions={setShowSuggestions}
                searchId={searchId}
              />
            </div>
            <div className="mb-2 flex gap-2">
              <Link href={`#${beginnerId}`} className="flex h-[44px] flex-1 items-center justify-center rounded-[10px] bg-primary text-[13px] font-medium text-primary-foreground">
                从新手路线开始
              </Link>
              <Link href={`#${purchaseId}`} className="flex h-[44px] flex-1 items-center justify-center rounded-[10px] border border-border text-[13px] font-medium text-foreground">
                查看购买教程
              </Link>
            </div>
            <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              适合零基础用户、AI 使用者和开发者
            </p>
          </div>
          <MobileBeginnerRoute sectionId={beginnerId} />
        </div>
      </div>
    </section>
  );
}

function MobileBeginnerRoute({ sectionId }: { sectionId: string }) {
  return <BeginnerRoutePanel compact sectionId={sectionId} />;
}

function MobilePurchaseTutorials({ sectionId }: { sectionId: string }) {
  return (
    <section id={sectionId} className="border-t border-border py-8 md:hidden">
      <div className="px-4">
        <div className="mb-4">
          <p className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">购买前先看</p>
          <h2 className="mb-2 text-xl font-semibold">热门 AI 购买教程</h2>
          <p className="text-sm leading-6 text-muted-foreground">先选平台，再看注册、支付、API Key 和额度说明。</p>
        </div>
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-3 max-[639px]:[padding-left:max(1rem,calc((100vw-min(calc(100vw-48px),328px))/2))] max-[639px]:[padding-right:max(1rem,calc((100vw-min(calc(100vw-48px),328px))/2))]">
          {featuredHotTutorials.map(api => (
            <Link
              key={api.id}
              href={`/tutorial/${api.id}`}
              className="grid h-[112px] w-[calc(100vw-48px)] max-w-[328px] shrink-0 grid-cols-[56px_minmax(0,1fr)_18px] items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors duration-100 active:bg-muted"
            >
              <BrandIcon id={api.id} alt={api.name} size="lg" className="justify-self-center" />
              <span className="flex min-h-16 min-w-0 flex-col justify-center">
                <span className="block truncate text-[15px] font-semibold leading-5">{api.name} 购买教程</span>
                <span className="mt-1 block truncate text-xs leading-4 text-muted-foreground">{api.tutorial?.steps.length || 0} 个步骤 · {api.badge.text}</span>
                <span className="mt-1.5 inline-flex h-7 w-fit items-center rounded-lg border border-border px-3 text-xs font-medium text-foreground">查看教程</span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
        <Link href="/tutorial" className="inline-flex min-h-11 items-center rounded-lg text-sm font-medium text-foreground active:text-muted-foreground">
          全部购买教程 →
        </Link>
      </div>
    </section>
  );
}

function DesktopPurchaseTutorials({ sectionId }: { sectionId: string }) {
  return (
    <section id={sectionId} className="hidden border-t border-border py-12 md:block">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">购买前先看</p>
          <h2 className="text-2xl font-semibold mb-2">热门 AI 购买教程</h2>
          <p className="text-sm text-muted-foreground">先选平台，再看注册、支付、API Key 和额度说明。</p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {featuredHotTutorials.map(api => (
            <Link
              key={api.id}
              href={`/tutorial/${api.id}`}
              className="flex h-[120px] items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted duration-150"
            >
              <BrandIcon id={api.id} alt={api.name} size="lg" className="rounded-xl" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{api.name} 购买教程</span>
                <span className="mt-1 block truncate text-xs text-muted-foreground">{api.tutorial?.steps.length || 0} 个步骤 · {api.badge.text}</span>
              </span>
              <ChevronRight className="w-4 h-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
        <div className="text-right mt-4">
          <Link href="/tutorial" className="text-sm text-muted-foreground hover:text-foreground transition-colors">全部购买教程 →</Link>
        </div>
      </div>
    </section>
  );
}

function DesktopUserEntrySection() {
  const icons = [
    <svg key="book" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    <svg key="cart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
    <svg key="code" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  ];

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-semibold">你现在要解决什么？</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {userEntryCards.map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              className="flex min-h-[220px] flex-col rounded-2xl border border-border bg-muted/30 p-6 transition-colors duration-150 hover:bg-muted/40"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
                {icons[index]}
              </div>
              <h3 className="mb-2 text-base font-semibold">{card.title}</h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
              <span className="mt-auto inline-flex h-12 w-fit items-center justify-center rounded-xl border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                {card.action}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileUserEntrySection() {
  const icons = [
    <svg key="book" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    <svg key="cart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
    <svg key="code" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  ];

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-xl font-semibold">你现在要解决什么？</h2>
        <div className="grid gap-3">
          {userEntryCards.map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              className="flex min-h-[156px] flex-col rounded-2xl border border-border bg-muted/30 p-4 transition-colors duration-100 active:bg-muted/60"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
                {icons[index]}
              </div>
              <h3 className="mb-2 text-base font-semibold">{card.title}</h3>
              <p className="mb-3 line-clamp-2 flex-1 text-sm leading-6 text-muted-foreground">{card.desc}</p>
              <span className="mt-auto inline-flex h-11 w-fit items-center justify-center rounded-xl border border-border px-4 text-sm font-medium text-foreground">
                {card.action}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start mb-8">
          <div className="max-w-xs">
            <p className="text-lg font-bold mb-2">ApiUsPro</p>
            <p className="text-sm text-muted-foreground">专注于 AI 与 API 学习的技术教程平台。</p>
          </div>
          <div className="flex gap-3">
            {[
              { label: 'AI 入门', href: '/learn' },
              { label: '购买教程', href: '/tutorial' },
              { label: '模型测评', href: '/api-review' },
              { label: 'API 应用', href: '/app' },
              { label: '报错解决', href: '/error' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            hello@apiuspro.com
          </div>
          <p className="text-xs text-muted-foreground">&copy; 2026 ApiUsPro. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  );
}

function MobileMenuSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        aria-label="关闭栏目菜单"
        onClick={onClose}
        className="mobile-sheet-fade absolute inset-0 bg-background/70"
      />
      <div className="mobile-sheet-panel absolute inset-x-0 bottom-0 rounded-t-3xl border border-border bg-card px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold">栏目入口</p>
          <button
            type="button"
            aria-label="关闭栏目菜单"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-muted-foreground active:bg-muted"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="grid gap-2">
          {mobileMenuLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex min-h-12 items-center justify-between rounded-xl border border-border bg-background px-4 py-3 active:bg-muted"
            >
              <span>
                <span className="block text-sm font-medium">{link.name}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{link.desc}</span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileBottomNav({ onMenuOpen }: { onMenuOpen: () => void }) {
  const itemClass = 'flex min-h-12 flex-1 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-medium text-muted-foreground active:bg-muted active:text-foreground';

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden" aria-label="移动端底部导航">
      <div className="mx-auto flex max-w-md gap-1">
        <Link href="/" className={itemClass}>
          <Home className="size-5" />
          <span>首页</span>
        </Link>
        <Link href="/tutorial" className={itemClass}>
          <BookOpen className="size-5" />
          <span>教程</span>
        </Link>
        <Link href="/cloud-api" className={itemClass}>
          <Cloud className="size-5" />
          <span>API</span>
        </Link>
        <button type="button" onClick={onMenuOpen} className={itemClass} aria-label="打开栏目菜单">
          <Menu className="size-5" />
          <span>菜单</span>
        </button>
      </div>
    </nav>
  );
}

function DesktopHome() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { suggestions, exactMatch } = useSearch(query, 8);
  const searchId = 'home-search-desktop';
  const beginnerId = 'beginner-route-desktop';
  const purchaseId = 'purchase-tutorials-desktop';

  const submitSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const href = exactMatch?.href || suggestions[0]?.href;
    if (!href) return;
    router.push(href);
    setShowSuggestions(false);
  }, [exactMatch, suggestions, router]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DesktopHeader searchId={searchId} />
      <main>
        <DesktopHero
          query={query}
          setQuery={setQuery}
          onSubmit={submitSearch}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          searchId={searchId}
          beginnerId={beginnerId}
          purchaseId={purchaseId}
        />
        <DesktopPurchaseTutorials sectionId={purchaseId} />
        <DesktopUserEntrySection />
      </main>
      <Footer />
    </div>
  );
}

function MobileHome() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { suggestions, exactMatch } = useSearch(query, 6);
  const searchId = 'home-search-mobile';
  const beginnerId = 'beginner-route-mobile';
  const purchaseId = 'purchase-tutorials-mobile';

  const submitSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const href = exactMatch?.href || suggestions[0]?.href;
    if (!href) return;
    router.push(href);
    setShowSuggestions(false);
  }, [exactMatch, suggestions, router]);

  return (
    <div className="min-h-screen bg-background pb-[calc(86px+env(safe-area-inset-bottom))] text-foreground">
      <MobileHeader searchId={searchId} onMenuOpen={() => setMobileMenuOpen(true)} />
      <main>
        <MobileHero
          query={query}
          setQuery={setQuery}
          onSubmit={submitSearch}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          searchId={searchId}
          beginnerId={beginnerId}
          purchaseId={purchaseId}
        />
        <MobilePurchaseTutorials sectionId={purchaseId} />
        <MobileUserEntrySection />
      </main>
      <Footer />
      <MobileBottomNav onMenuOpen={() => setMobileMenuOpen(true)} />
      <MobileMenuSheet open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </div>
  );
}

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-background">
      <div className="md:hidden"><MobileHome /></div>
      <div className="hidden md:block"><DesktopHome /></div>
    </div>
  );
}
