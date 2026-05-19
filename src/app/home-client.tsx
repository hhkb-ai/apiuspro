'use client';

import { useDeferredValue, useMemo, useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { BeianLinks } from '@/components/layout/BeianLinks';
import { apiList, appTutorials, type APIConfig } from '@/lib/api-config';
import { fuzzyScore, sortByFuzzyScore } from '@/lib/fuzzy-search';
import {
  BookOpen,
  ChevronRight,
  Compass,
  Code2,
  Database,
  ExternalLink,
  GraduationCap,
  Languages,
  MessageCircle,
  PenLine,
  Search,
  Server,
  Star,
  Target,
  Wrench,
} from 'lucide-react';

const pages = [
  { id: 'cloud-api', name: 'API 列表', desc: '先看官网入口、代理要求和免费额度', url: '/cloud-api', tag: '优先查看' },
  { id: 'tutorial', name: '购买教程', desc: '按步骤完成注册、支付与 API Key 创建', url: '/tutorial', tag: '新手推荐' },
  { id: 'local-deploy', name: '本地部署', desc: '笔记本也能跑！Ollama 一键部署 Gemma 4、Qwen3.6 最新模型', url: '/local-deploy', tag: '进阶路线' },
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

const sectionEntries = [
  { title: 'API 列表', desc: '对比官网入口、代理要求和免费额度', href: '/cloud-api', icon: Compass, className: 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900' },
  { title: '购买教程', desc: '按步骤完成注册、支付与 API Key 创建', href: '/tutorial', icon: BookOpen, className: 'border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-900' },
  { title: 'API 测评', desc: '查看模型能力、价格和使用体验对比', href: '/api-review', icon: Star, className: 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-900' },
  { title: '场景推荐', desc: '按编程、知识库、翻译等场景选择', href: '/use-case', icon: Target, className: 'border-violet-200 bg-violet-50 text-violet-900' },
  { title: 'API 应用', desc: 'Claude Code、CC Switch 等工具接入', href: '/app', icon: Wrench, className: 'border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 text-rose-900' },
  { title: '本地部署', desc: 'Ollama 一键部署开源模型', href: '/local-deploy', icon: Server, className: 'border-orange-200 bg-orange-50 text-orange-900' },
];

const quickViewApiIds = ['deepseek', 'openai', 'claude', 'gemini', 'zhipu', 'kimi'];
const quickViewAPIs = quickViewApiIds
  .map(id => apiList.find(api => api.id === id))
  .filter((api): api is APIConfig => Boolean(api));

const scenarioCards = [
  { title: '编程开发', desc: '代码生成、调试、仓库理解和自动化脚本。', href: '/use-case/coding', icon: Code2, className: 'border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 text-rose-950', iconClassName: 'bg-rose-100 text-rose-700' },
  { title: '知识库', desc: '长文档解析、资料检索和个人知识沉淀。', href: '/use-case/knowledge', icon: Database, className: 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-950', iconClassName: 'bg-emerald-100 text-emerald-700' },
  { title: '内容创作', desc: '选题、改写、脚本、营销文案和图文草稿。', href: '/use-case/content-creation', icon: PenLine, className: 'border-violet-200 bg-violet-50 text-violet-950', iconClassName: 'bg-violet-100 text-violet-700' },
  { title: '翻译', desc: '多语种翻译、术语一致性和风格改写。', href: '/use-case/translation', icon: Languages, className: 'border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-950', iconClassName: 'bg-sky-100 text-sky-700' },
  { title: '智能客服', desc: '问答机器人、意图识别和工单摘要。', href: '/use-case/chatbot', icon: MessageCircle, className: 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-950', iconClassName: 'bg-amber-100 text-amber-700' },
  { title: '教育辅导', desc: '分步讲解、练习反馈和学习路径规划。', href: '/use-case/education', icon: GraduationCap, className: 'border-orange-200 bg-orange-50 text-orange-950', iconClassName: 'bg-orange-100 text-orange-700' },
];

const integrationSteps = [
  { step: 1, title: '浏览 API', desc: '比较访问方式、免费额度和适用场景', links: [{ name: 'API 列表', href: '/cloud-api' }, { name: 'API 测评', href: '/api-review' }, { name: '场景推荐', href: '/use-case' }] },
  { step: 2, title: '查看教程', desc: '完成注册、充值、API Key 创建', links: [{ name: '购买教程', href: '/tutorial' }, { name: '常见问题', href: '/faq' }] },
  { step: 3, title: '接入工具', desc: '填写 Base URL、模型名和 API Key', links: [{ name: 'API 应用', href: '/app' }, { name: '本地部署', href: '/local-deploy' }] },
];

const tutorialsList = apiList.filter(api => api.tutorial);
const hotTutorials = [...tutorialsList].sort((a, b) => {
  if (a.id === 'deepseek') return -1;
  if (b.id === 'deepseek') return 1;
  return 0;
}).slice(0, 5);

const faqItems = [
  { q: '国内可以访问哪些 API？', a: 'DeepSeek、通义千问、智谱 GLM、Kimi 等支持国内直连，无需代理。', href: '/faq' },
  { q: 'API Key 在哪里创建？', a: '进入各平台控制台的 API Key 管理页面创建，详见购买教程。', href: '/faq' },
  { q: '免费额度用完了怎么办？', a: '可以充值继续使用，或切换到其他有免费额度的 API。', href: '/faq' },
];

const desktopNavLinks = [
  { name: 'API官网', href: '/cloud-api' },
  { name: 'API测评', href: '/api-review' },
  { name: '购买教程', href: '/tutorial' },
  { name: 'API应用', href: '/app' },
  { name: '本地部署', href: '/local-deploy' },
];

function badgeClass(type: string) {
  if (type === 'success') return 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700';
  if (type === 'warning') return 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-700';
  return 'border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-700';
}

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

function SearchBar({ query, setQuery, onSubmit, suggestions, showSuggestions, setShowSuggestions, variant }: {
  query: string;
  setQuery: (q: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  suggestions: Suggestion[];
  showSuggestions: boolean;
  setShowSuggestions: (s: boolean) => void;
  variant: 'mobile' | 'desktop';
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
        className={isMobile ? 'grid gap-2 rounded-lg border bg-background p-1.5' : 'flex items-center gap-3 rounded-lg border border-border bg-card p-2 shadow-sm'}
        onSubmit={onSubmit}
        role="search"
      >
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="搜索 DeepSeek、OpenAI、Claude..."
            aria-label="搜索 API、教程或工具"
            className={isMobile ? 'h-11 w-full rounded-md border-0 bg-transparent pl-9 pr-3 text-base outline-none placeholder:text-muted-foreground' : 'h-12 w-full bg-transparent pl-11 pr-4 text-base outline-none placeholder:text-muted-foreground'}
          />
        </div>
        <button
          type="submit"
          className={isMobile
            ? 'inline-flex h-10 items-center justify-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90 disabled:bg-muted disabled:text-muted-foreground'
            : 'inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground'}
          disabled={!query.trim() || suggestions.length === 0}
        >
          <Search className="size-4" />
          搜索
        </button>
      </form>

      {showSuggestions && query.trim() && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-[58vh] overflow-y-auto overscroll-contain rounded-lg border bg-card shadow-lg">
          {suggestions.length > 0 ? (
            suggestions.map(item => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setShowSuggestions(false)}
                className="flex items-center gap-3 border-b px-3 py-3 last:border-b-0 active:bg-muted"
              >
                <span className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">{item.type}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{item.name}</span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">{item.desc}</span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            ))
          ) : (
            <div className="px-4 py-5 text-center text-sm text-muted-foreground">
              没找到结果，试试通义千问、Kimi、Gemini。
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SectionEntries() {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
      {sectionEntries.map(item => {
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href} className={`min-w-0 rounded-lg border p-3 transition-colors active:scale-[0.99] ${item.className}`}>
            <Icon className="mb-1.5 size-4" />
            <span className="block whitespace-nowrap text-xs font-semibold">{item.title}</span>
            <span className="mt-0.5 block text-[10px] leading-4 opacity-70 line-clamp-2">{item.desc}</span>
          </Link>
        );
      })}
    </div>
  );
}

function MobileHome() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { suggestions, exactMatch, appExactMatch } = useSearch(query, 6);

  const submitSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const href = appExactMatch ? `/app/${appExactMatch.id}` : exactMatch ? `/api/${exactMatch.id}` : suggestions[0]?.href;
    if (!href) return;
    router.push(href);
    setShowSuggestions(false);
  }, [appExactMatch, exactMatch, suggestions, router]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="min-w-0">
            <span className="block truncate text-base font-semibold">API知识站</span>
            <span className="block truncate text-[11px] text-muted-foreground">AI API 资料站</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="pb-10">
        <section className="px-4 pb-5 pt-4">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <p className="text-xl font-semibold leading-tight tracking-tight">DeepSeek API 怎么购买和首次调用？</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">国内直连、支持支付宝/微信、代码与推理能力突出。</p>
            <div className="mt-4">
              <SearchBar query={query} setQuery={setQuery} onSubmit={submitSearch} suggestions={suggestions} showSuggestions={showSuggestions} setShowSuggestions={setShowSuggestions} variant="mobile" />
            </div>
            <SectionEntries />
          </div>
        </section>

        <section className="px-4 py-4">
          <div className="flex items-end justify-between gap-3">
            <div><p className="text-xs font-medium text-muted-foreground">快速了解</p><h2 className="mt-1 text-lg font-semibold">常见 API 速览</h2></div>
            <Link href="/cloud-api" className="shrink-0 text-sm font-medium text-foreground">全部 API</Link>
          </div>
          <div className="mt-3 grid gap-3">
            {quickViewAPIs.map(api => (
              <article key={api.id} className="rounded-lg border bg-card p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">{api.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{accessText(api.proxy)}{api.free ? ` · ${api.free}` : ''}</p>
                  </div>
                  <Badge variant="outline" className={badgeClass(api.badge.type)}>{api.badge.text}</Badge>
                </div>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {api.features.slice(0, 3).map(f => <span key={f} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{f}</span>)}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link href={api.id === 'openai' ? `/tutorial/${api.id}` : `/api/${api.id}`} className="flex min-w-0 items-center justify-center rounded-md border px-3 py-2 text-sm font-medium active:bg-muted">{api.id === 'openai' ? '购买教程' : '查看详情'}</Link>
                  <a href={api.url} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center justify-center gap-1 rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background">官网 <ExternalLink className="size-3.5" /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 py-4">
          <div className="flex items-end justify-between gap-3">
            <div><p className="text-xs font-medium text-muted-foreground">按场景选择</p><h2 className="mt-1 text-lg font-semibold">按使用场景浏览</h2></div>
            <Link href="/use-case" className="text-sm font-medium text-foreground">全部使用场景推荐</Link>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {scenarioCards.map(card => {
              const Icon = card.icon;
              return (
                <Link key={card.href} href={card.href} className={`rounded-lg border p-3 transition-colors active:bg-muted ${card.className}`}>
                  <Icon className="mb-2 size-5 opacity-70" />
                  <h3 className="text-sm font-semibold">{card.title}</h3>
                  <p className="mt-1 text-xs leading-4 opacity-70 line-clamp-2">{card.desc}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="px-4 py-4">
          <div><p className="text-xs font-medium text-muted-foreground">参考路径</p><h2 className="mt-1 text-lg font-semibold">常见接入路径</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">第一次使用 AI API 时，通常会先了解可用平台，再创建 API Key，最后接入到代码或工具里。</p></div>
          <div className="mt-3 space-y-2">
            {integrationSteps.map(step => (
              <div key={step.step} className="rounded-lg border bg-card p-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">{step.step}</span>
                  <div><p className="text-sm font-semibold">{step.title}</p><p className="text-xs text-muted-foreground">{step.desc}</p></div>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5" style={{ paddingLeft: '2.375rem' }}>
                  {step.links.map(link => <Link key={link.href} href={link.href} className="rounded-full border bg-background px-3 py-1.5 text-xs text-muted-foreground active:bg-muted">{link.name}</Link>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-4">
          <div className="flex items-end justify-between gap-3">
            <div><p className="text-xs font-medium text-muted-foreground">学习资源</p><h2 className="mt-1 text-lg font-semibold">热门教程</h2></div>
            <Link href="/tutorial" className="text-sm font-medium text-foreground">全部 API 购买教程</Link>
          </div>
          <div className="mt-3 space-y-2">
            {hotTutorials.map(api => (
              <Link key={api.id} href={`/tutorial/${api.id}`} className="flex items-center gap-3 rounded-lg border bg-card p-3 active:bg-muted">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"><BookOpen className="size-4" /></span>
                <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{api.name} 购买教程</span><span className="mt-0.5 block truncate text-xs text-muted-foreground">{api.tutorial?.steps.length} 个步骤 · {api.badge.text}</span></span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>

        <section className="px-4 py-4">
          <div className="flex items-end justify-between gap-3">
            <div><p className="text-xs font-medium text-muted-foreground">帮助中心</p><h2 className="mt-1 text-lg font-semibold">常见问题</h2></div>
            <Link href="/faq" className="text-sm font-medium text-foreground">全部常见问题</Link>
          </div>
          <div className="mt-3 space-y-2">
            {faqItems.map(item => (
              <Link key={item.q} href={item.href} className="block rounded-lg border bg-card p-3 active:bg-muted">
                <p className="text-sm font-semibold">{item.q}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.a}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-4 py-4">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm font-semibold">常用 API</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {quickLinks.map(link => <Link key={link.id} href={link.id === 'openai' ? `/tutorial/${link.id}` : `/api/${link.id}`} className="rounded-full border bg-background px-3 py-1.5 text-sm text-muted-foreground active:bg-muted">{link.name}</Link>)}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground">
        <p>API知识站 - AI API 资料站</p>
        <div className="mt-3"><BeianLinks /></div>
      </footer>
    </div>
  );
}

function DesktopHome() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { suggestions, exactMatch, appExactMatch } = useSearch(query, 8);

  const submitSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const href = appExactMatch ? `/app/${appExactMatch.id}` : exactMatch ? `/api/${exactMatch.id}` : suggestions[0]?.href;
    if (href) router.push(href);
  }, [appExactMatch, exactMatch, suggestions, router]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0">
            <span className="block text-base font-semibold tracking-tight">API知识站</span>
            <span className="block text-xs text-muted-foreground">AI API 资料站</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {desktopNavLinks.map(link => <Link key={link.href} href={link.href} className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">{link.name}</Link>)}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main>
        {/* Hero + Search Section */}
        <section className="border-b border-border px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-foreground">DeepSeek API 怎么购买和首次调用？</h1>
              <p className="mt-4 text-base leading-8 text-muted-foreground">国内直连、支持支付宝/微信支付、代码与推理能力突出，按步骤完成首次调用。</p>
            </div>
            <div className="mt-6 lg:mt-8 max-w-3xl">
              <SearchBar query={query} setQuery={setQuery} onSubmit={submitSearch} suggestions={suggestions} showSuggestions={showSuggestions} setShowSuggestions={setShowSuggestions} variant="desktop" />
            </div>
          </div>
        </section>

        {/* Main Content: Sidebar + Table */}
        <section className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Left Sidebar: Section Entries */}
              <aside className="w-full shrink-0 lg:w-64 lg:self-stretch">
                <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:h-full lg:grid-cols-1 lg:grid-rows-6 lg:gap-3" aria-label="首页栏目入口">
                  {sectionEntries.map(item => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href} className={`flex min-h-12 min-w-0 items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-colors hover:-translate-y-px lg:min-h-0 lg:gap-3 lg:px-4 lg:py-3.5 ${item.className}`}>
                        <Icon className="size-4 shrink-0 lg:size-5" />
                        <div className="min-w-0">
                          <span className="block truncate text-sm font-semibold lg:text-base">{item.title}</span>
                          <span className="block truncate text-[11px] leading-tight opacity-70 lg:mt-1 lg:text-xs">{item.desc}</span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </aside>

              {/* Right Main: API Table */}
              <div className="flex-1 min-w-0">
                <section className="rounded-lg border border-border bg-card shadow-sm">
                  <div className="p-4 sm:p-5 border-b border-border">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">快速了解</p>
                        <h2 className="mt-1 text-xl font-semibold tracking-tight">常见 API 速览</h2>
                      </div>
                      <Link href="/cloud-api" className="text-sm font-medium text-foreground hover:underline whitespace-nowrap">全部 API 官网入口</Link>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted text-left text-xs font-medium text-muted-foreground">
                        <tr>
                          <th className="w-36 sm:w-40 px-4 py-3">API</th>
                          <th className="w-24 sm:w-28 px-4 py-3">访问</th>
                          <th className="w-32 sm:w-40 px-4 py-3">免费额度</th>
                          <th className="px-4 py-3 hidden sm:table-cell">主要特点</th>
                          <th className="w-20 sm:w-24 px-4 py-3">教程</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {quickViewAPIs.map(api => (
                          <tr key={api.id} role="link" tabIndex={0} aria-label={`查看 ${api.name} API 详情`} onClick={() => router.push(api.id === 'openai' ? `/tutorial/${api.id}` : `/api/${api.id}`)} onKeyDown={(e) => { if (e.currentTarget !== e.target || (e.key !== 'Enter' && e.key !== ' ')) return; e.preventDefault(); router.push(api.id === 'openai' ? `/tutorial/${api.id}` : `/api/${api.id}`); }} className="cursor-pointer transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
                            <td className="px-4 py-3">
                              <Link href={api.id === 'openai' ? `/tutorial/${api.id}` : `/api/${api.id}`} onClick={(e) => e.stopPropagation()} className="font-semibold text-foreground hover:underline">{api.name}</Link>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`whitespace-nowrap rounded-full border px-2 py-1 text-xs font-medium ${api.proxy ? 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-700' : 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700'}`}>
                                {accessText(api.proxy)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">{api.free || '—'}</td>
                            <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{api.features.slice(0, 2).join('、')}</td>
                            <td className="px-4 py-3">
                              {api.tutorial ? (
                                <Link href={`/tutorial/${api.id}`} onClick={(e) => e.stopPropagation()} className="whitespace-nowrap rounded-full border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 px-2 py-1 text-xs font-medium text-sky-700 hover:border-sky-300">有教程</Link>
                              ) : (
                                <span className="text-xs text-muted-foreground">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div><p className="text-sm font-medium text-muted-foreground">按场景选择</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">按使用场景浏览</h2><p className="mt-2 text-sm text-muted-foreground">根据具体任务找到合适的 API</p></div>
              <Link href="/use-case" className="text-sm font-medium text-foreground hover:underline">全部使用场景推荐</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {scenarioCards.map(card => {
                const Icon = card.icon;
                return (
                  <Link key={card.href} href={card.href} className={`rounded-lg border p-5 transition-transform hover:-translate-y-0.5 ${card.className}`}>
                    <div className="mb-4 flex items-center justify-between gap-3"><span className={`flex size-10 items-center justify-center rounded-md ${card.iconClassName}`}><Icon className="size-5" /></span><ChevronRight className="size-4 opacity-60" /></div>
                    <h3 className="font-semibold">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 opacity-80">{card.desc}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/35 px-4 sm:px-6 lg:px-8 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6"><p className="text-sm font-medium text-muted-foreground">参考路径</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">常见接入路径</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">第一次使用 AI API 时，通常会先了解可用平台，再创建 API Key，最后接入到代码或工具里。</p></div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {integrationSteps.map(step => (
                <div key={step.step} className="rounded-lg border border-border bg-card p-5">
                  <div className="mb-3 flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{step.step}</span><h3 className="font-semibold">{step.title}</h3></div>
                  <p className="mb-3 text-sm leading-6 text-muted-foreground">{step.desc}</p>
                  <div className="flex flex-wrap gap-2">{step.links.map(link => <Link key={link.href} href={link.href} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground">{link.name}</Link>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div><p className="text-sm font-medium text-muted-foreground">学习资源</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">热门教程</h2></div>
              <Link href="/tutorial" className="text-sm font-medium text-foreground hover:underline">全部 API 购买教程</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hotTutorials.slice(0, 3).map(api => (
                <Link key={api.id} href={`/tutorial/${api.id}`} className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/30">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"><BookOpen className="size-5" /></span>
                    <div className="min-w-0 flex-1"><h3 className="truncate font-semibold">{api.name}</h3><p className="text-xs text-muted-foreground">{api.tutorial?.steps.length} 个步骤</p></div>
                    <Badge variant="outline" className={badgeClass(api.badge.type)}>{api.badge.text}</Badge>
                  </div>
                  <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{api.tutorial?.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div><p className="text-sm font-medium text-muted-foreground">帮助中心</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">常见问题</h2></div>
              <Link href="/faq" className="text-sm font-medium text-foreground hover:underline">全部常见问题</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {faqItems.map(item => (
                <Link key={item.q} href={item.href} className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/30">
                  <h3 className="font-semibold">{item.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.a}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
        <p>API知识站 - AI API 资料站</p>
        <div className="mt-3"><BeianLinks /></div>
      </footer>
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
