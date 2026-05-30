'use client';

import { useDeferredValue, useMemo, useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { BeianLinks } from '@/components/layout/BeianLinks';
import { BrandIcon } from '@/components/api/BrandIcon';
import { apiList, appTutorials } from '@/lib/api-config';
import { fuzzyScore, sortByFuzzyScore } from '@/lib/fuzzy-search';
import { ChevronRight, Search } from 'lucide-react';

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

function useSearch(rawQuery: string, maxResults: number) {
  const normalizedQuery = useDeferredValue(rawQuery.toLowerCase().trim());

  const result = useMemo(() => {
    if (!normalizedQuery) return { suggestions: [] as Suggestion[], exactMatch: null, appExactMatch: null };

    const apiMatches = sortByFuzzyScore(apiList, normalizedQuery, api => [api.id, api.name, api.desc, api.free, ...api.features])
      .slice(0, maxResults > 6 ? 4 : 3)
      .map(api => ({ id: `api-${api.id}`, name: api.name, desc: `${accessText(api.proxy)} · ${api.features.slice(0, 2).join('、')}`, href: `/api/${api.id}`, type: 'API' }));

    const tutorialMatches = sortByFuzzyScore(tutorialsList, normalizedQuery, api => [api.id, api.name, api.tutorial?.title, api.tutorial?.subtitle, ...api.features])
      .slice(0, maxResults > 6 ? 3 : 2)
      .map(api => ({ id: `tut-${api.id}`, name: api.tutorial?.title || `${api.name} 购买教程`, desc: '注册、支付、API Key 创建', href: `/tutorial/${api.id}`, type: '教程' }));

    const appMatches = sortByFuzzyScore(appTutorials, normalizedQuery, app => [app.id, app.name, app.desc, app.badge.text])
      .slice(0, maxResults > 6 ? 3 : 2)
      .map(app => ({ id: `app-${app.id}`, name: app.name, desc: app.desc, href: `/app/${app.id}`, type: '应用' }));

    const pageMatches = sortByFuzzyScore(pages, normalizedQuery, page => [page.id, page.name, page.desc, page.tag])
      .slice(0, maxResults > 6 ? 3 : 2)
      .map(page => ({ id: `pg-${page.id}`, name: page.name, desc: page.desc, href: page.url, type: '页面' }));

    return {
      suggestions: [...apiMatches, ...tutorialMatches, ...appMatches, ...pageMatches].slice(0, maxResults),
      exactMatch: apiList.find(api => fuzzyScore(normalizedQuery, [api.id, api.name]) >= 85) ?? null,
      appExactMatch: appTutorials.find(app => fuzzyScore(normalizedQuery, [app.id, app.name]) >= 85) ?? null,
    };
  }, [normalizedQuery, maxResults]);

  return result;
}

function SearchBar({ query, setQuery, onSubmit, suggestions, showSuggestions, setShowSuggestions, variant, searchId }: {
  query: string;
  setQuery: (q: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  suggestions: Suggestion[];
  showSuggestions: boolean;
  setShowSuggestions: (s: boolean) => void;
  variant: 'mobile' | 'desktop';
  searchId: string;
}) {
  const isMobile = variant === 'mobile';
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
        className={isMobile ? 'flex items-center gap-2 rounded-xl border border-border bg-card shadow-sm px-3' : 'flex items-center gap-2 rounded-[14px] border border-border bg-card shadow-sm px-4 h-14'}
        onSubmit={onSubmit}
        role="search"
      >
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground" style={{ width: isMobile ? 14 : 16, height: isMobile ? 14 : 16 }} />
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            placeholder={isMobile ? '搜索 DeepSeek、Claude...' : '搜索 DeepSeek、Claude、API Key、提示词、429 报错...'}
            aria-label="搜索 API、教程或工具"
            className={isMobile ? 'h-12 w-full border-0 bg-transparent pl-5 pr-3 text-[13px] outline-none placeholder:text-gray-400' : 'h-full w-full border-0 bg-transparent pl-5 pr-4 text-sm outline-none placeholder:text-gray-400'}
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

function Header({ variant }: { variant: 'desktop' | 'mobile' }) {
  const searchId = `home-search-${variant}`;

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
          <Link href="/learn" className="inline-flex h-9 items-center justify-center rounded-xl border border-border bg-card px-3 text-sm font-medium transition-colors hover:bg-muted md:hidden">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

function BeginnerRoutePanel({ compact = false, sectionId }: { compact?: boolean; sectionId: string }) {
  return (
    <section id={sectionId} className={compact ? 'mt-6 rounded-2xl border border-border bg-card p-4' : 'flex h-full flex-col rounded-[20px] border border-border bg-card p-6'}>
      <div className="mb-5">
        <h2 className={compact ? 'text-[17px] font-semibold' : 'text-xl font-semibold'}>4 步开始</h2>
      </div>
      <div className={compact ? 'relative flex-1 pl-11' : 'relative flex-1 pl-[52px]'}>
        <div className={compact ? 'absolute left-4 top-4 bottom-4 w-[1.5px] bg-border' : 'absolute left-[19px] top-5 bottom-5 w-0.5 bg-border'} />
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
      <Link href="/learn" className={compact ? 'mt-4 flex h-10 w-full items-center justify-center rounded-[10px] border border-border text-[13px] font-medium text-foreground transition-colors hover:bg-muted' : 'mt-5 flex h-12 w-full items-center justify-center rounded-xl border border-border text-sm font-medium text-foreground transition-colors hover:bg-muted'}>
        进入学习路线
      </Link>
    </section>
  );
}

function Hero({
  query,
  setQuery,
  onSubmit,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  variant,
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
  variant: 'desktop' | 'mobile';
  searchId: string;
  beginnerId: string;
  purchaseId: string;
}) {
  const isMobile = variant === 'mobile';

  return (
    <section className={isMobile ? 'px-4 py-8' : 'py-16'}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={isMobile ? 'space-y-6' : 'grid items-start gap-8 lg:grid-cols-[7fr_5fr]'}>
          <div className="flex min-w-0 flex-col">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">AI 与 API 学习导航</p>
            <div className="w-12 h-0.5 bg-primary mb-6" />
            {isMobile ? (
              <p className="text-[28px] font-bold leading-tight tracking-tight mb-3">
                先看懂 AI，<br />再把 API 用起来
              </p>
            ) : (
              <h1 className="text-4xl font-bold leading-tight tracking-tight mb-4">
                先看懂 AI，<br />再把 API 用起来
              </h1>
            )}
            <p className={isMobile ? 'text-[13px] text-muted-foreground leading-relaxed mb-5' : 'text-sm text-muted-foreground leading-relaxed max-w-xl mb-6'}>
              从基础词汇、提示词、API Key 到模型购买与首次调用，把新手真正需要的路径整理成一条清晰路线。
            </p>
            <div className={isMobile ? 'mb-4' : 'mb-5 max-w-2xl'}>
              <SearchBar
                query={query}
                setQuery={setQuery}
                onSubmit={onSubmit}
                suggestions={suggestions}
                showSuggestions={showSuggestions}
                setShowSuggestions={setShowSuggestions}
                variant={variant}
                searchId={searchId}
              />
            </div>
            <div className={isMobile ? 'flex gap-2 mb-3' : 'flex gap-3 mb-4'}>
              <Link href={`#${beginnerId}`} className={isMobile ? 'flex flex-1 h-[44px] items-center justify-center rounded-[10px] bg-primary text-primary-foreground text-[13px] font-medium' : 'inline-flex h-12 px-6 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-medium'}>
                从新手路线开始
              </Link>
              <Link href={`#${purchaseId}`} className={isMobile ? 'flex flex-1 h-[44px] items-center justify-center rounded-[10px] border border-border text-foreground text-[13px] font-medium' : 'inline-flex h-12 px-6 items-center justify-center rounded-xl border border-border text-foreground text-sm font-medium'}>
                查看购买教程
              </Link>
            </div>
            <p className={isMobile ? 'text-[11px] text-muted-foreground flex items-center gap-1' : 'text-xs text-muted-foreground flex items-center gap-1.5'}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              适合零基础用户、AI 使用者和开发者
            </p>
          </div>
          <BeginnerRoutePanel compact={isMobile} sectionId={beginnerId} />
        </div>
      </div>
    </section>
  );
}

function PurchaseTutorials({ sectionId }: { sectionId: string }) {
  return (
    <section id={sectionId} className="border-t border-border py-12">
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

function UserEntrySection() {
  const icons = [
    <svg key="book" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    <svg key="cart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
    <svg key="code" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  ];

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-6">你现在要解决什么？</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {userEntryCards.map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              className="flex min-h-[220px] flex-col rounded-2xl border border-border bg-muted/30 p-6 transition-colors hover:bg-muted/40 duration-150"
            >
              <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center mb-4 text-muted-foreground">
                {icons[index]}
              </div>
              <h3 className="text-base font-semibold mb-2">{card.title}</h3>
              <p className="flex-1 text-sm text-muted-foreground leading-relaxed mb-4">{card.desc}</p>
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

function HomeShell({ variant }: { variant: 'desktop' | 'mobile' }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { suggestions, exactMatch, appExactMatch } = useSearch(query, variant === 'mobile' ? 6 : 8);
  const searchId = `home-search-${variant}`;
  const beginnerId = `beginner-route-${variant}`;
  const purchaseId = `purchase-tutorials-${variant}`;

  const submitSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const href = appExactMatch ? `/app/${appExactMatch.id}` : exactMatch ? `/api/${exactMatch.id}` : suggestions[0]?.href;
    if (!href) return;
    router.push(href);
    setShowSuggestions(false);
  }, [appExactMatch, exactMatch, suggestions, router]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header variant={variant} />
      <main>
        <Hero
          query={query}
          setQuery={setQuery}
          onSubmit={submitSearch}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          variant={variant}
          searchId={searchId}
          beginnerId={beginnerId}
          purchaseId={purchaseId}
        />
        <PurchaseTutorials sectionId={purchaseId} />
        <UserEntrySection />
      </main>
      <Footer />
    </div>
  );
}

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-background">
      <div className="md:hidden"><HomeShell variant="mobile" /></div>
      <div className="hidden md:block"><HomeShell variant="desktop" /></div>
    </div>
  );
}
