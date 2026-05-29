'use client';

import { useDeferredValue, useMemo, useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { BeianLinks } from '@/components/layout/BeianLinks';
import { apiList, appTutorials } from '@/lib/api-config';
import { fuzzyScore, sortByFuzzyScore } from '@/lib/fuzzy-search';
import {
  BookOpen,
  ChevronRight,
  Compass,
  Code2,
  Database,
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
  { title: 'API 列表', desc: '对比官网入口、代理要求和免费额度', href: '/cloud-api', icon: Compass, className: 'border-emerald-200 dark:border-emerald-700/80 bg-emerald-50 dark:bg-emerald-950/45 text-emerald-900 dark:text-emerald-100' },
  { title: '购买教程', desc: '按步骤完成注册、支付与 API Key 创建', href: '/tutorial', icon: BookOpen, className: 'border-sky-200 dark:border-sky-700/80 bg-sky-50 dark:bg-sky-950/45 text-sky-900 dark:text-sky-100' },
  { title: 'API 测评', desc: '查看模型能力、价格和使用体验对比', href: '/api-review', icon: Star, className: 'border-amber-200 dark:border-amber-700/80 bg-amber-50 dark:bg-amber-950/45 text-amber-900 dark:text-amber-100' },
  { title: '场景推荐', desc: '按编程、知识库、翻译等场景选择', href: '/use-case', icon: Target, className: 'border-violet-200 dark:border-violet-700/80 bg-violet-50 dark:bg-violet-950/45 text-violet-900 dark:text-violet-100' },
  { title: 'API 应用', desc: 'Claude Code、CC Switch 等工具接入', href: '/app', icon: Wrench, className: 'border-rose-200 dark:border-rose-700/80 bg-rose-50 dark:bg-rose-950/45 text-rose-900 dark:text-rose-100' },
  { title: '本地部署', desc: 'Ollama 一键部署开源模型', href: '/local-deploy', icon: Server, className: 'border-orange-200 dark:border-orange-700/80 bg-orange-50 dark:bg-orange-950/45 text-orange-900 dark:text-orange-100' },
];

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

const beginnerLearningSteps = [
  { step: '01', title: 'AI、模型和使用方式', desc: '先搞懂 AI 是什么、模型是什么，以及网页聊天和 API 的区别。', href: '/learn/ai-basics' },
  { step: '02', title: 'Token 和上下文', desc: '理解 Token、上下文，以及为什么 AI 会忘记。', href: '/learn/token-context-api-key' },
  { step: '03', title: '提示词基础', desc: '学会把问题问清楚，让 AI 输出更稳定。', href: '/learn/prompting' },
  { step: '04', title: 'API 三件套', desc: '搞懂 API Key、Base URL、模型名称。', href: '/learn/api-config-basics' },
];

const beginnerFlow = ['AI 基础', 'Token 上下文', '提示词', 'API 配置'];

const heroQuickLinks = [
  { label: 'DeepSeek 购买教程', href: '/tutorial/deepseek' },
  { label: 'MiMo API 教程', href: '/tutorial/mimo' },
  { label: 'API Key 入门', href: '/learn/token-context-api-key' },
  { label: 'Base URL 配置', href: '/learn/api-config-basics' },
  { label: 'Codex 工具', href: '/app/codex' },
  { label: 'CC Switch', href: '/app/ccswitch' },
];

const tutorialsList = apiList.filter(api => api.tutorial);
const tutorialPriority = ['deepseek', 'openai', 'claude', 'gemini', 'aliyun', 'kimi', 'doubao', 'zhipu', 'tencent', 'mimo'];
const hotTutorials = [...tutorialsList].sort((a, b) => {
  const aPriority = tutorialPriority.indexOf(a.id);
  const bPriority = tutorialPriority.indexOf(b.id);
  return (aPriority === -1 ? 999 : aPriority) - (bPriority === -1 ? 999 : bPriority);
});
const featuredHotTutorials = hotTutorials.slice(0, 8);

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
  { name: 'AI学习', href: '/learn' },
  { name: '本地部署', href: '/local-deploy' },
];

const brandIconById: Record<string, { src: string; alt: string; fallback: string }> = {
  deepseek: { src: '/images/brands/deepseek.ico', alt: 'DeepSeek', fallback: 'DS' },
  openai: { src: '/images/brands/openai.svg', alt: 'OpenAI', fallback: 'OAI' },
  claude: { src: '/images/brands/claude.png', alt: 'Claude', fallback: 'C' },
  gemini: { src: '/images/brands/gemini.svg', alt: 'Gemini', fallback: 'G' },
  aliyun: { src: '/images/brands/aliyun.svg', alt: '阿里云通义千问', fallback: '通' },
  kimi: { src: '/images/brands/kimi.ico', alt: 'Kimi', fallback: 'K' },
  doubao: { src: '/images/brands/doubao.png', alt: '豆包', fallback: '豆' },
  zhipu: { src: '/images/brands/zhipu.png', alt: '智谱 GLM', fallback: 'GLM' },
};

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
        className={isMobile ? 'grid gap-2 rounded-lg border bg-background p-1.5' : 'flex items-center gap-3 rounded-lg border border-border bg-background p-2.5'}
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
            className={isMobile ? 'h-11 w-full rounded-md border-0 bg-transparent pl-9 pr-3 text-base outline-none placeholder:text-muted-foreground' : 'h-14 w-full bg-transparent pl-11 pr-4 text-base outline-none placeholder:text-muted-foreground'}
          />
        </div>
        <button
          type="submit"
          className={isMobile
            ? 'inline-flex h-10 items-center justify-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90 disabled:bg-muted disabled:text-muted-foreground'
            : 'inline-flex h-14 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground'}
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

function BeginnerLearningRoute({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
  const isMobile = variant === 'mobile';

  return (
    <section className={isMobile ? 'mt-4 rounded-lg border border-border bg-background p-3' : 'h-full rounded-lg border border-border bg-card p-5 shadow-sm'}>
      <div className={isMobile ? 'mb-3' : 'mb-5'}>
        <p className="text-xs font-medium text-muted-foreground">新手路线</p>
        <h2 className={isMobile ? 'mt-1 text-base font-semibold' : 'mt-1 text-xl font-semibold tracking-tight'}>AI 与 API 新手学习路线</h2>
        <p className={isMobile ? 'mt-1 text-xs leading-5 text-muted-foreground' : 'mt-2 text-sm leading-6 text-muted-foreground'}>只保留最关键的步骤，让第一次学习 API 不绕路。</p>
      </div>
      <div className={isMobile ? 'grid grid-cols-2 gap-2' : 'grid grid-cols-2 gap-3'}>
        {beginnerLearningSteps.map(item => (
          <Link key={item.step} href={item.href} className={isMobile ? 'rounded-lg border border-border bg-card p-3 active:bg-muted' : 'min-h-[8.25rem] rounded-lg border border-border bg-background p-4 transition-colors hover:border-foreground/30 hover:bg-muted/30'}>
            <span className="text-[11px] font-semibold text-muted-foreground">{item.step}</span>
            <h3 className={isMobile ? 'mt-1 text-sm font-semibold text-foreground' : 'mt-2 text-base font-semibold text-foreground'}>{item.title}</h3>
            <p className={isMobile ? 'mt-1 text-xs leading-5 text-muted-foreground' : 'mt-2 text-sm leading-6 text-muted-foreground'}>{item.desc}</p>
          </Link>
        ))}
      </div>
      <div className={isMobile ? 'mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground' : 'mt-5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground'}>
        {beginnerFlow.map((item, index) => (
          <span key={item} className="inline-flex items-center gap-1.5">
            <span className="rounded-full border border-border bg-muted px-2 py-1">{item}</span>
            {index < beginnerFlow.length - 1 && <span aria-hidden="true">→</span>}
          </span>
        ))}
      </div>
    </section>
  );
}

function HeroQuickLinks({ variant = 'desktop', compact = false }: { variant?: 'desktop' | 'mobile'; compact?: boolean }) {
  const isMobile = variant === 'mobile';

  return (
    <div className={compact ? 'mt-3' : isMobile ? 'mt-4' : 'mt-5'}>
      {!compact && <p className="text-xs font-medium text-muted-foreground">热门直达</p>}
      <div className={compact ? 'flex flex-wrap gap-2' : isMobile ? 'mt-2 flex flex-wrap gap-2' : 'mt-3 flex flex-wrap gap-2'}>
        {heroQuickLinks.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-muted"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function HeroSearchPanel({
  query,
  setQuery,
  onSubmit,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  variant = 'desktop',
}: {
  query: string;
  setQuery: (q: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  suggestions: Suggestion[];
  showSuggestions: boolean;
  setShowSuggestions: (s: boolean) => void;
  variant?: 'desktop' | 'mobile';
}) {
  const isMobile = variant === 'mobile';

  return (
    <div className={isMobile ? 'mt-4 rounded-lg border border-border bg-card p-3' : 'mt-6 w-full rounded-lg border border-border bg-card p-5 shadow-sm xl:mt-auto'}>
      <div className={isMobile ? 'mb-3' : 'mb-4 flex items-end justify-between gap-4'}>
        <div>
          <p className="text-xs font-medium text-muted-foreground">快速查找</p>
          <h2 className={isMobile ? 'mt-1 text-sm font-semibold' : 'mt-1 text-base font-semibold'}>搜索平台、教程或工具</h2>
        </div>
        {!isMobile && <span className="shrink-0 rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground">6 个热门入口</span>}
      </div>
      <SearchBar
        query={query}
        setQuery={setQuery}
        onSubmit={onSubmit}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        variant={variant}
      />
      {!isMobile && <HeroQuickLinks variant={variant} compact />}
    </div>
  );
}

function TutorialBrandIcon({ apiId }: { apiId: string }) {
  const icon = brandIconById[apiId];

  return (
    <span
      aria-label={icon ? `${icon.alt} 图标` : undefined}
      className="flex size-12 shrink-0 items-center justify-center rounded-md border border-border bg-background"
      title={icon?.alt}
    >
      {icon ? (
        <>
          <Image
            src={icon.src}
            alt=""
            width={32}
            height={32}
            className="size-8 object-contain"
            loading="lazy"
            unoptimized
            onError={(event) => {
              event.currentTarget.classList.add('hidden');
              event.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <span className="hidden text-xs font-bold leading-none text-foreground">{icon.fallback}</span>
        </>
      ) : (
        <BookOpen className="size-5 text-muted-foreground" />
      )}
    </span>
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
            <p className="text-xl font-semibold leading-tight tracking-tight">AI API 怎么选、怎么买、怎么首次调用？</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">从官网入口、购买教程到 API Key，按步骤完成首次调用。</p>
            <HeroSearchPanel query={query} setQuery={setQuery} onSubmit={submitSearch} suggestions={suggestions} showSuggestions={showSuggestions} setShowSuggestions={setShowSuggestions} variant="mobile" />
            <BeginnerLearningRoute variant="mobile" />
            <SectionEntries />
          </div>
        </section>

        <section className="px-4 py-4">
          <div className="flex items-end justify-between gap-3">
            <div><p className="text-xs font-medium text-muted-foreground">学习资源</p><h2 className="mt-1 text-lg font-semibold">热门购买教程</h2></div>
            <Link href="/tutorial" className="shrink-0 text-sm font-medium text-foreground">全部购买教程</Link>
          </div>
          <div className="mt-3 grid gap-3">
            {featuredHotTutorials.map(api => (
              <Link key={api.id} href={`/tutorial/${api.id}`} className="flex min-h-24 items-center gap-3 rounded-lg border bg-card p-4 active:bg-muted">
                <TutorialBrandIcon apiId={api.id} />
                <span className="min-w-0 flex-1"><span className="block truncate text-base font-semibold">{api.name} 购买教程</span><span className="mt-1 block truncate text-sm text-muted-foreground">{api.tutorial?.steps.length} 个步骤 · {api.badge.text}</span></span>
                <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
              </Link>
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
            <div className="grid items-stretch gap-6 xl:grid-cols-[minmax(0,0.72fr)_minmax(460px,0.58fr)] xl:gap-10">
              <div className="min-w-0 xl:flex xl:h-full xl:flex-col">
                <div className="max-w-xl">
                  <h1 className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-foreground">AI API 怎么选、怎么买、怎么首次调用？</h1>
                  <p className="mt-4 text-base leading-8 text-muted-foreground">从官网入口、购买教程到 API Key，按步骤完成首次调用。</p>
                </div>
                <HeroSearchPanel query={query} setQuery={setQuery} onSubmit={submitSearch} suggestions={suggestions} showSuggestions={showSuggestions} setShowSuggestions={setShowSuggestions} />
              </div>
              <BeginnerLearningRoute />
            </div>
          </div>
        </section>

        {/* Main Content: Sidebar + Table */}
        <section className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-8 lg:items-stretch">
              {/* Left Sidebar: Section Entries */}
              <aside className="w-full h-full">
                <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:h-full lg:grid-cols-1 lg:grid-rows-6 lg:gap-3" aria-label="首页栏目入口">
                  {sectionEntries.map(item => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href} className={`flex h-full min-h-[76px] min-w-0 items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-all hover:-translate-y-px hover:shadow-md lg:min-h-0 lg:gap-3 lg:px-4 lg:py-3.5 ${item.className}`}>
                        <Icon className="size-4 shrink-0 lg:size-5" />
                        <div className="min-w-0">
                          <span className="block truncate text-sm font-semibold lg:text-base">{item.title}</span>
                          <span className="block truncate text-[11px] leading-tight opacity-70 dark:opacity-85 lg:mt-1 lg:text-xs">{item.desc}</span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </aside>

              {/* Right Main: API Table */}
              <div className="flex-1 min-w-0 h-full">
                <section className="rounded-lg border border-border bg-card shadow-sm h-full flex flex-col">
                  <div className="p-4 sm:p-5 border-b border-border">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">学习资源</p>
                        <h2 className="mt-1 text-xl font-semibold tracking-tight">热门购买教程</h2>
                      </div>
                      <Link href="/tutorial" className="text-sm font-medium text-foreground hover:underline whitespace-nowrap">全部购买教程</Link>
                    </div>
                  </div>
                  <div className="grid flex-1 gap-4 p-4 sm:grid-cols-2 sm:p-5">
                    {featuredHotTutorials.map(api => (
                      <Link key={api.id} href={`/tutorial/${api.id}`} className="flex min-h-32 items-center gap-4 rounded-lg border border-border bg-background p-5 transition-colors hover:border-foreground/30 hover:bg-muted/30">
                        <TutorialBrandIcon apiId={api.id} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-base font-semibold">{api.name} 购买教程</span>
                          <span className="mt-1 block truncate text-sm text-muted-foreground">{api.tutorial?.steps.length || 0} 个步骤 · {api.badge.text}</span>
                        </span>
                        <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
                      </Link>
                    ))}
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
