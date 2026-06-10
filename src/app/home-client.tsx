'use client';

import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { BrandIcon } from '@/components/api/BrandIcon';
import { apiList } from '@/lib/api-config';
import { useDismissibleSuggestions } from '@/hooks/use-dismissible-suggestions';
import { type HomeSearchSuggestion, useHomeSearch } from '@/hooks/use-home-search';
import { BeianLinks } from '@/components/layout/BeianLinks';
import { BookOpen, ChevronRight, Cloud, Home, Menu, Search, X } from 'lucide-react';

const beginnerLearningSteps = [
  { step: '01', title: 'AI 常识', desc: '看懂模型、Token、上下文', href: '/learn/ai-basics' },
  { step: '02', title: '提示词', desc: '把需求说清楚', href: '/learn/prompting' },
  { step: '03', title: 'API 基础', desc: '理解 Key、Base URL、JSON', href: '/learn/api-config-basics' },
  { step: '04', title: '第一次调用', desc: '选平台并跑通示例', href: '/learn/first-api-call' },
];

const userEntryCards = [
  { title: '完全不懂 AI', desc: '先看懂 AI、模型、Token、上下文和提示词。', href: '/learn', action: 'AI 入门' },
  { title: '准备购买 API', desc: '对比平台、价格、代理要求和支付方式。', href: '/tutorial', action: '购买教程' },
  { title: '已经开始接入', desc: '排查 API Key、Base URL、模型名和常见报错。', href: '/error', action: '接入与报错' },
];

const tutorialsList = apiList.filter(api => api.tutorial);
const tutorialPriority = ['deepseek', 'openai', 'claude', 'gemini', 'aliyun', 'kimi', 'doubao', 'zhipu', 'tencent', 'mimo'];
const featuredHotTutorials = [...tutorialsList]
  .sort((a, b) => {
    const aPriority = tutorialPriority.indexOf(a.id);
    const bPriority = tutorialPriority.indexOf(b.id);
    return (aPriority === -1 ? 999 : aPriority) - (bPriority === -1 ? 999 : bPriority);
  })
  .slice(0, 4);

const navLinks = [
  { name: 'AI 入门', href: '/learn' },
  { name: '购买教程', href: '/tutorial' },
  { name: '模型测评', href: '/api-review' },
  { name: 'API 应用', href: '/app' },
  { name: 'API 列表', href: '/cloud-api' },
  { name: '错误解决', href: '/error' },
];

type SearchBarProps = {
  query: string;
  setQuery: (q: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  suggestions: HomeSearchSuggestion[];
  showSuggestions: boolean;
  setShowSuggestions: (s: boolean) => void;
  primeSearch: () => void;
};

function SearchBar({ query, setQuery, onSubmit, suggestions, showSuggestions, setShowSuggestions, primeSearch }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dismissSuggestions = useCallback(() => setShowSuggestions(false), [setShowSuggestions]);
  const { containerRef, handleBlur } = useDismissibleSuggestions<HTMLDivElement>(showSuggestions, dismissSuggestions);

  const clearSearch = () => {
    setQuery('');
    dismissSuggestions();
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative" onBlur={handleBlur}>
      <form
        id="home-search"
        className="flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-3 shadow-sm md:h-14 md:rounded-[14px] md:px-4"
        onSubmit={onSubmit}
        role="search"
      >
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              primeSearch();
              setShowSuggestions(true);
            }}
            placeholder="搜索 DeepSeek、Claude、API Key、提示词、429 报错..."
            aria-label="搜索 API、教程或工具"
            className="h-full w-full border-0 bg-transparent pl-5 pr-10 text-[13px] outline-none placeholder:text-gray-400 md:text-sm"
          />
          {query.trim() && (
            <button
              type="button"
              aria-label="清除搜索内容"
              onClick={clearSearch}
              className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground active:bg-muted"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <button type="submit" className="hidden">搜索</button>
      </form>

      {showSuggestions && query.trim() && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-[58vh] overflow-y-auto overscroll-contain rounded-lg border border-border bg-card shadow-sm">
          {suggestions.length > 0 ? (
            suggestions.map(item => (
              <Link
                key={item.id}
                href={item.href}
                onClick={dismissSuggestions}
                className="flex min-h-[56px] items-center gap-3 border-b border-border px-3 py-3 last:border-b-0 hover:bg-muted/50 active:bg-muted"
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

function Header({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 md:h-16 lg:px-8">
        <Link href="/" className="shrink-0">
          <span className="block text-lg font-bold tracking-tight">ApiUsPro</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="主导航">
          {navLinks.slice(0, 4).map(link => (
            <Link key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <a href="#home-search" aria-label="跳转到搜索" className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground">
            <Search className="size-5" />
          </a>
          <ThemeToggle />
          <Link href="/learn" className="hidden h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 md:inline-flex">
            开始学习
          </Link>
          <button type="button" aria-label="打开栏目菜单" onClick={onMenuOpen} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground active:bg-muted md:hidden">
            <Menu className="size-[18px]" />
          </button>
        </div>
      </div>
    </header>
  );
}

function BeginnerRoutePanel() {
  return (
    <section id="beginner-route" className="flex h-full flex-col rounded-2xl border border-border bg-card p-4 md:rounded-[20px] md:p-6">
      <div className="mb-5">
        <h2 className="text-[17px] font-semibold md:text-xl">4 步开始</h2>
      </div>
      <div className="relative flex-1 pl-11 md:pl-[52px]">
        <div className="absolute bottom-9 left-4 top-4 w-[1.5px] bg-border/55 md:bottom-5 md:left-[19px] md:top-5" />
        {beginnerLearningSteps.map((item) => (
          <Link key={item.step} href={item.href} className="relative mb-2.5 flex items-center gap-3 last:mb-0 md:mb-3">
            <span className="absolute -left-11 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-background bg-muted text-[12px] font-medium text-muted-foreground md:-left-[52px] md:h-10 md:w-10 md:text-[13px]">
              {item.step}
            </span>
            <span>
              <h3 className="text-[13px] font-semibold md:text-sm">{item.title}</h3>
              <p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs">{item.desc}</p>
            </span>
          </Link>
        ))}
      </div>
      <Link href="/learn" className="mt-4 flex h-11 w-full items-center justify-center rounded-[10px] border border-border text-[13px] font-medium text-foreground transition-colors hover:bg-muted md:mt-5 md:h-12 md:rounded-xl md:text-sm">
        进入学习路线
      </Link>
    </section>
  );
}

function PurchaseTutorials() {
  return (
    <section id="purchase-tutorials" className="border-t border-border py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 md:mb-6">
          <p className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">购买前先看</p>
          <h2 className="mb-2 text-xl font-semibold md:text-2xl">热门 AI 购买教程</h2>
          <p className="text-sm leading-6 text-muted-foreground">先选平台，再看注册、支付、API Key 和额度说明。</p>
        </div>
        <div className="grid gap-3 md:grid-cols-4 md:gap-4">
          {featuredHotTutorials.map(api => (
            <Link
              key={api.id}
              href={`/tutorial/${api.id}`}
              className="grid min-h-[112px] grid-cols-[56px_minmax(0,1fr)_18px] items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-muted md:flex md:h-[120px] md:p-5"
            >
              <BrandIcon id={api.id} alt={api.name} size="lg" className="justify-self-center md:rounded-xl" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-semibold leading-5 md:text-sm">{api.name} 购买教程</span>
                <span className="mt-1 block truncate text-xs text-muted-foreground">{api.tutorial?.steps.length || 0} 个步骤 · {api.badge.text}</span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
        <div className="mt-4 text-right">
          <Link href="/tutorial" className="text-sm text-muted-foreground transition-colors hover:text-foreground">全部购买教程 →</Link>
        </div>
      </div>
    </section>
  );
}

function UserEntrySection() {
  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-xl font-semibold md:mb-6 md:text-2xl">你现在要解决什么？</h2>
        <div className="grid gap-3 md:grid-cols-3 md:gap-5">
          {userEntryCards.map((card) => (
            <Link key={card.href} href={card.href} className="flex min-h-[156px] flex-col rounded-2xl border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/40 md:min-h-[220px] md:p-6">
              <h3 className="mb-2 text-base font-semibold">{card.title}</h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
              <span className="mt-auto inline-flex h-11 w-fit items-center justify-center rounded-xl border border-border px-4 text-sm font-medium text-foreground md:h-12 md:px-5">
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
    <footer className="border-t border-border bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-xs">
            <p className="mb-2 text-lg font-bold">ApiUsPro</p>
            <p className="text-sm text-muted-foreground">专注于 AI 与 API 学习的技术教程平台。</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">hello@apiuspro.com</p>
          <div className="text-center text-xs text-muted-foreground sm:text-right">
            <p className="mb-2">&copy; 2026 ApiUsPro. 保留所有权利。</p>
            <BeianLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileMenuSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button type="button" aria-label="关闭栏目菜单" onClick={onClose} className="mobile-sheet-fade absolute inset-0 bg-background/70" />
      <div className="mobile-sheet-panel absolute inset-x-0 bottom-0 rounded-t-3xl border border-border bg-card px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold">栏目入口</p>
          <button type="button" aria-label="关闭栏目菜单" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-xl text-muted-foreground active:bg-muted">
            <X className="size-4" />
          </button>
        </div>
        <div className="grid gap-2">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={onClose} className="flex min-h-12 items-center justify-between rounded-xl border border-border bg-background px-4 py-3 active:bg-muted">
              <span className="text-sm font-medium">{link.name}</span>
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
        <Link href="/" className={itemClass}><Home className="size-5" /><span>首页</span></Link>
        <Link href="/tutorial" className={itemClass}><BookOpen className="size-5" /><span>教程</span></Link>
        <Link href="/cloud-api" className={itemClass}><Cloud className="size-5" /><span>API</span></Link>
        <button type="button" onClick={onMenuOpen} className={itemClass} aria-label="打开栏目菜单"><Menu className="size-5" /><span>菜单</span></button>
      </div>
    </nav>
  );
}

export default function HomeClient() {
  const {
    query,
    setQuery,
    showSuggestions,
    setShowSuggestions,
    suggestions,
    submitSearch,
    primeSearch,
  } = useHomeSearch(8);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-[calc(86px+env(safe-area-inset-bottom))] text-foreground md:pb-0">
      <Header onMenuOpen={() => setMobileMenuOpen(true)} />
      <main>
        <section className="px-0 py-6 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-start gap-6 md:gap-8 lg:grid-cols-[7fr_5fr]">
              <div className="flex min-w-0 flex-col">
                <p className="mb-2 hidden text-xs uppercase tracking-widest text-muted-foreground md:block">AI 与 API 学习导航</p>
                <div className="mb-6 hidden h-0.5 w-12 bg-primary md:block" />
                <h1 className="mb-4 text-[26px] font-bold leading-tight tracking-tight md:text-4xl">
                  先看懂 AI，<br />再把 API 用起来
                </h1>
                <p className="mb-5 max-w-xl text-[13px] leading-relaxed text-muted-foreground md:mb-6 md:text-sm">
                  从基础词汇、提示词、API Key 到模型购买与首次调用，把新手真正需要的路径整理成一条清晰路线。
                </p>
                <div className="mb-4 max-w-2xl md:mb-5">
                  <SearchBar
                    query={query}
                    setQuery={setQuery}
                    onSubmit={submitSearch}
                    suggestions={suggestions}
                    showSuggestions={showSuggestions}
                    setShowSuggestions={setShowSuggestions}
                    primeSearch={primeSearch}
                  />
                </div>
                <div className="mb-3 flex gap-2 md:mb-4 md:gap-3">
                  <Link href="/learn" className="flex h-[44px] flex-1 items-center justify-center rounded-[10px] bg-primary text-[13px] font-medium text-primary-foreground md:h-12 md:flex-none md:rounded-xl md:px-6 md:text-sm">
                    从新手路线开始
                  </Link>
                  <Link href="/tutorial" className="flex h-[44px] flex-1 items-center justify-center rounded-[10px] border border-border text-[13px] font-medium text-foreground md:h-12 md:flex-none md:rounded-xl md:px-6 md:text-sm">
                    查看购买教程
                  </Link>
                </div>
                <p className="text-[11px] text-muted-foreground md:text-xs">适合零基础用户、AI 使用者和开发者</p>
              </div>
              <BeginnerRoutePanel />
            </div>
          </div>
        </section>
        <PurchaseTutorials />
        <UserEntrySection />
      </main>
      <Footer />
      <MobileBottomNav onMenuOpen={() => setMobileMenuOpen(true)} />
      <MobileMenuSheet open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </div>
  );
}
