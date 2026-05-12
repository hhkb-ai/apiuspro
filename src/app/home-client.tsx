'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
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
  ExternalLink,
  GraduationCap,
  KeyRound,
  Languages,
  MessageCircle,
  PenLine,
  Search,
  Server,
  Sparkles,
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

const mobileTaskShortcuts = [
  {
    title: '选 API',
    desc: '先看国内直连和免费额度',
    href: '/cloud-api',
    icon: Compass,
    className: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  },
  {
    title: '拿 Key',
    desc: '注册、充值、创建密钥',
    href: '/tutorial',
    icon: KeyRound,
    className: 'border-sky-200 bg-sky-50 text-sky-900',
  },
  {
    title: '接工具',
    desc: 'Claude Code、CC Switch',
    href: '/app',
    icon: Wrench,
    className: 'border-violet-200 bg-violet-50 text-violet-900',
  },
  {
    title: '本地跑',
    desc: 'Ollama 和开源模型',
    href: '/local-deploy',
    icon: Server,
    className: 'border-amber-200 bg-amber-50 text-amber-900',
  },
];

const mobileFeaturedAPIs = apiList.filter(api =>
  ['deepseek', 'aliyun', 'zhipu', 'kimi'].includes(api.id)
);

const desktopDecisionRows = [
  {
    name: 'DeepSeek',
    href: '/api/deepseek',
    access: '国内直连',
    accessClass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    free: '有免费额度',
    scene: '代码、通用问答',
    tutorial: '教程完整',
    tutorialHref: '/tutorial/deepseek',
  },
  {
    name: '通义千问',
    href: '/api/aliyun',
    access: '国内直连',
    accessClass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    free: '新用户额度',
    scene: '企业、知识库',
    tutorial: '教程完整',
    tutorialHref: '/tutorial/aliyun',
  },
  {
    name: 'Kimi',
    href: '/api/kimi',
    access: '国内直连',
    accessClass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    free: '按平台规则',
    scene: '长文本、文档',
    tutorial: '教程完整',
    tutorialHref: '/tutorial/kimi',
  },
  {
    name: 'OpenAI',
    href: '/api/openai',
    access: '需要代理',
    accessClass: 'border-amber-200 bg-amber-50 text-amber-700',
    free: '需确认账户',
    scene: '旗舰模型、Agent',
    tutorial: '测评优先',
    tutorialHref: '/api-review/gpt-5.5',
  },
  {
    name: 'Claude',
    href: '/api/claude',
    access: '需要代理',
    accessClass: 'border-amber-200 bg-amber-50 text-amber-700',
    free: '需确认账户',
    scene: '长文档、编程',
    tutorial: '测评优先',
    tutorialHref: '/api-review/claude',
  },
];

const desktopScenarioCards = [
  {
    title: '编程开发',
    desc: '代码生成、调试、仓库理解和自动化脚本。',
    href: '/use-case/coding',
    icon: Code2,
    className: 'border-rose-200 bg-rose-50 text-rose-950',
    iconClassName: 'bg-rose-100 text-rose-700',
  },
  {
    title: '知识库',
    desc: '长文档解析、资料检索和个人知识沉淀。',
    href: '/use-case/knowledge',
    icon: Database,
    className: 'border-emerald-200 bg-emerald-50 text-emerald-950',
    iconClassName: 'bg-emerald-100 text-emerald-700',
  },
  {
    title: '内容创作',
    desc: '选题、改写、脚本、营销文案和图文草稿。',
    href: '/use-case/content-creation',
    icon: PenLine,
    className: 'border-violet-200 bg-violet-50 text-violet-950',
    iconClassName: 'bg-violet-100 text-violet-700',
  },
  {
    title: '翻译',
    desc: '多语种翻译、术语一致性和风格改写。',
    href: '/use-case/translation',
    icon: Languages,
    className: 'border-sky-200 bg-sky-50 text-sky-950',
    iconClassName: 'bg-sky-100 text-sky-700',
  },
  {
    title: '智能客服',
    desc: '问答机器人、意图识别和工单摘要。',
    href: '/use-case/chatbot',
    icon: MessageCircle,
    className: 'border-amber-200 bg-amber-50 text-amber-950',
    iconClassName: 'bg-amber-100 text-amber-700',
  },
  {
    title: '教育辅导',
    desc: '分步讲解、练习反馈和学习路径规划。',
    href: '/use-case/education',
    icon: GraduationCap,
    className: 'border-orange-200 bg-orange-50 text-orange-950',
    iconClassName: 'bg-orange-100 text-orange-700',
  },
];

const desktopWorkflowCards = [
  { title: '先选 API', desc: '按国内直连、免费额度、模型能力筛掉不合适的选项。', href: '/cloud-api' },
  { title: '拿到 API Key', desc: '跟着教程完成注册、支付、额度确认和密钥创建。', href: '/tutorial' },
  { title: '接入工具', desc: '把 Key、Base URL 和模型名配置进常用 AI 工具。', href: '/app' },
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

function MobileHome() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const normalizedQuery = useMemo(() => query.toLowerCase().trim(), [query]);

  const { suggestions, exactMatch } = useMemo(() => {
    if (!normalizedQuery) {
      return { suggestions: [], exactMatch: null };
    }

    const apiMatches = sortByFuzzyScore(
      apiList,
      normalizedQuery,
      api => [api.id, api.name, api.desc, api.free, ...api.features],
    )
      .slice(0, 3)
      .map(api => ({
        id: `api-${api.id}`,
        name: api.name,
        desc: `${accessText(api.proxy)} · ${api.features.slice(0, 2).join('、')}`,
        href: `/api/${api.id}`,
        type: 'API',
      }));

    const tutorialMatches = sortByFuzzyScore(
      apiList.filter(api => api.tutorial),
      normalizedQuery,
      api => [api.id, api.name, api.tutorial?.title, api.tutorial?.subtitle, ...api.features],
    )
      .slice(0, 2)
      .map(api => ({
        id: `tutorial-${api.id}`,
        name: api.tutorial?.title || `${api.name} 购买教程`,
        desc: '注册、支付、API Key 创建',
        href: `/tutorial/${api.id}`,
        type: '教程',
      }));

    const appMatches = sortByFuzzyScore(
      appTutorials,
      normalizedQuery,
      app => [app.id, app.name, app.desc, app.badge.text],
    )
      .slice(0, 2)
      .map(app => ({
        id: `app-${app.id}`,
        name: app.name,
        desc: app.desc,
        href: `/app/${app.id}`,
        type: '应用',
      }));

    const pageMatches = sortByFuzzyScore(
      pages,
      normalizedQuery,
      page => [page.id, page.name, page.desc, page.tag],
    )
      .slice(0, 2)
      .map(page => ({
        id: `page-${page.id}`,
        name: page.name,
        desc: page.desc,
        href: page.url,
        type: '页面',
      }));

    return {
      suggestions: [...apiMatches, ...tutorialMatches, ...appMatches, ...pageMatches].slice(0, 6),
      exactMatch: apiList.find(api => fuzzyScore(normalizedQuery, [api.id, api.name]) >= 85) ?? null,
    };
  }, [normalizedQuery]);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const targetHref = exactMatch ? `/api/${exactMatch.id}` : suggestions[0]?.href;
    if (!targetHref) return;
    router.push(targetHref);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="min-w-0">
            <span className="block truncate text-base font-semibold">API知识站</span>
            <span className="block truncate text-[11px] text-muted-foreground">手机快速选型</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="pb-10">
        <section className="px-4 pb-5 pt-4">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Sparkles className="size-4 text-emerald-600" />
              <span>先找能用的 API，再看接入步骤</span>
            </div>
            <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight">
              手机上快速完成 AI API 选型
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              搜索模型、供应商或工具名，直接进入官网入口、购买教程和接入指南。
            </p>

            <div className="relative mt-4">
              <form className="grid gap-2 rounded-lg border bg-background p-1.5" onSubmit={submitSearch}>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="搜 DeepSeek、OpenAI、Claude..."
                    aria-label="搜索 API、教程或工具"
                    className="h-11 w-full rounded-md border-0 bg-transparent pl-9 pr-3 text-base outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90 disabled:bg-muted disabled:text-muted-foreground"
                  disabled={!normalizedQuery || (!exactMatch && suggestions.length === 0)}
                >
                  <Search className="size-4" />
                  搜索
                </button>
              </form>

              {showSuggestions && normalizedQuery && (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-[58vh] overflow-y-auto overscroll-contain rounded-lg border bg-card shadow-lg">
                  {suggestions.length > 0 ? (
                    suggestions.map(item => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setShowSuggestions(false)}
                        className="flex items-center gap-3 border-b px-3 py-3 last:border-b-0 active:bg-muted"
                      >
                        <span className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">
                          {item.type}
                        </span>
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

            <div className="mt-4 grid grid-cols-2 gap-2">
              {mobileTaskShortcuts.map(item => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg border p-3 transition-colors active:scale-[0.99] ${item.className}`}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className="size-4" />
                      <span className="text-sm font-semibold">{item.title}</span>
                    </div>
                    <p className="text-xs leading-5 opacity-80">{item.desc}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground">推荐路径</p>
              <h2 className="mt-1 text-lg font-semibold">新手先走这 3 步</h2>
            </div>
            <Link href="/tutorial" className="text-sm font-medium text-foreground">
              教程
            </Link>
          </div>
          <div className="mt-3 space-y-2">
            {[
              { title: '先选国内直连 API', desc: '降低注册、网络和支付门槛', href: '/cloud-api' },
              { title: '按教程创建 API Key', desc: '确认额度、限速和 Base URL', href: '/tutorial' },
              { title: '接入常用 AI 工具', desc: '统一配置 Key、模型名和端点', href: '/app' },
            ].map((step, index) => (
              <Link key={step.href} href={step.href} className="flex items-center gap-3 rounded-lg border bg-card p-3 active:bg-muted">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{step.title}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{step.desc}</span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>

        <section className="px-4 py-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground">优先尝试</p>
              <h2 className="mt-1 text-lg font-semibold">国内直连 API</h2>
            </div>
            <Link href="/cloud-api" className="text-sm font-medium text-foreground">
              全部
            </Link>
          </div>
          <div className="-mx-4 mt-3 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
            {mobileFeaturedAPIs.map(api => (
              <article key={api.id} className="min-w-[78%] snap-start rounded-lg border bg-card p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">{api.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{accessText(api.proxy)}</p>
                  </div>
                  <Badge variant="outline" className={badgeClass(api.badge.type)}>{api.badge.text}</Badge>
                </div>
                <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{api.desc}</p>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/api/${api.id}`}
                    className="flex flex-1 items-center justify-center rounded-md border px-3 py-2 text-sm font-medium active:bg-muted"
                  >
                    详情
                  </Link>
                  <a
                    href={api.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1 rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background"
                  >
                    官网
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 py-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground">工具接入</p>
              <h2 className="mt-1 text-lg font-semibold">常用应用教程</h2>
            </div>
            <Link href="/app" className="text-sm font-medium text-foreground">
              更多
            </Link>
          </div>
          <div className="mt-3 space-y-2">
            {appTutorials.slice(0, 4).map(tutorial => (
              <Link key={tutorial.id} href={`/app/${tutorial.id}`} className="flex items-center gap-3 rounded-lg border bg-card p-3 active:bg-muted">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <BookOpen className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{tutorial.name}</span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">{tutorial.sections.length} 个章节 · {tutorial.badge.text}</span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>

        <section className="px-4 py-4">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm font-semibold">常用 API</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {quickLinks.map(link => (
                <Link
                  key={link.id}
                  href={`/api/${link.id}`}
                  className="rounded-full border bg-background px-3 py-1.5 text-sm text-muted-foreground active:bg-muted"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground">
        <p>API知识站 - 移动端快速选型入口</p>
        <div className="mt-3">
          <BeianLinks />
        </div>
      </footer>
    </div>
  );
}

function DesktopHome() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const normalizedQuery = useMemo(() => query.toLowerCase().trim(), [query]);

  const { suggestions, exactMatch } = useMemo(() => {
    if (!normalizedQuery) {
      return { suggestions: [], exactMatch: null };
    }

    const apiMatches = sortByFuzzyScore(
      apiList,
      normalizedQuery,
      api => [api.id, api.name, api.desc, api.free, ...api.features],
    )
      .slice(0, 4)
      .map(api => ({
        id: `desktop-api-${api.id}`,
        name: api.name,
        desc: `${accessText(api.proxy)} · ${api.features.slice(0, 2).join('、')}`,
        href: `/api/${api.id}`,
        type: 'API',
      }));

    const tutorialMatches = sortByFuzzyScore(
      apiList.filter(api => api.tutorial),
      normalizedQuery,
      api => [api.id, api.name, api.tutorial?.title, api.tutorial?.subtitle, ...api.features],
    )
      .slice(0, 3)
      .map(api => ({
        id: `desktop-tutorial-${api.id}`,
        name: api.tutorial?.title || `${api.name} 购买教程`,
        desc: '注册、支付、API Key 创建',
        href: `/tutorial/${api.id}`,
        type: '教程',
      }));

    const pageMatches = sortByFuzzyScore(
      pages,
      normalizedQuery,
      page => [page.id, page.name, page.desc, page.tag],
    )
      .slice(0, 3)
      .map(page => ({
        id: `desktop-page-${page.id}`,
        name: page.name,
        desc: page.desc,
        href: page.url,
        type: '页面',
      }));

    return {
      suggestions: [...apiMatches, ...tutorialMatches, ...pageMatches].slice(0, 8),
      exactMatch: apiList.find(api => fuzzyScore(normalizedQuery, [api.id, api.name]) >= 85) ?? null,
    };
  }, [normalizedQuery]);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const targetHref = exactMatch ? `/api/${exactMatch.id}` : suggestions[0]?.href;
    if (targetHref) {
      router.push(targetHref);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#24211d]">
      <header className="sticky top-0 z-50 border-b border-[#e8dfd2] bg-[#faf8f4]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-8">
          <Link href="/" className="shrink-0">
            <span className="block text-base font-semibold tracking-tight">API知识站</span>
            <span className="block text-xs text-[#776f65]">AI API 决策工具</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            {[
              { name: 'API官网', href: '/cloud-api' },
              { name: 'API测评', href: '/api-review' },
              { name: '购买教程', href: '/tutorial' },
              { name: 'API应用', href: '/app' },
              { name: '本地部署', href: '/local-deploy' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-[#625b52] transition-colors hover:bg-[#f0ebe3] hover:text-[#24211d]"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main>
        <section className="px-8 pb-10 pt-12">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="pt-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e3d8c9] bg-[#fffdf8] px-3 py-1 text-sm text-[#776f65]">
                <Sparkles className="size-4 text-[#9a5a35]" />
                AI API 决策工具
              </div>
              <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-tight tracking-tight text-[#201d19]">
                按访问条件和接入难度选择 AI API
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#625b52]">
                对比国内直连、免费额度、购买教程、Base URL 和适用场景，把搜索结果变成可执行的下一步。
              </p>

              <div className="relative mt-8 max-w-2xl">
                <form
                  className="flex items-center gap-3 rounded-lg border border-[#ded4c6] bg-[#fffdf8] p-2 shadow-sm"
                  onSubmit={submitSearch}
                  role="search"
                >
                  <div className="relative min-w-0 flex-1">
                    <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#8a8177]" />
                    <input
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="搜索 DeepSeek、OpenAI、Claude..."
                      aria-label="搜索 API、教程或工具"
                      className="h-12 w-full bg-transparent pl-11 pr-4 text-base outline-none placeholder:text-[#9b9286]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-[#2b2621] px-6 text-sm font-medium text-white transition-colors hover:bg-[#3a332c] disabled:bg-[#ded4c6] disabled:text-[#746b60]"
                    disabled={!normalizedQuery || (!exactMatch && suggestions.length === 0)}
                  >
                    搜索
                  </button>
                </form>

                {normalizedQuery && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-lg border border-[#ded4c6] bg-[#fffdf8] shadow-lg">
                    {suggestions.map(item => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="flex items-center gap-3 border-b border-[#eee6da] px-4 py-3 last:border-b-0 hover:bg-[#f7f1e8]"
                      >
                        <span className="rounded-md bg-[#f0ebe3] px-2 py-1 text-xs font-medium text-[#776f65]">
                          {item.type}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-[#24211d]">{item.name}</span>
                          <span className="mt-0.5 block truncate text-xs text-[#776f65]">{item.desc}</span>
                        </span>
                        <ChevronRight className="size-4 text-[#8a8177]" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { label: '国内直连', href: '/cloud-api' },
                  { label: '免费额度', href: '/tutorial' },
                  { label: '写代码', href: '/use-case/coding' },
                  { label: '知识库', href: '/use-case/knowledge' },
                ].map(chip => (
                  <Link
                    key={chip.label}
                    href={chip.href}
                    className="rounded-full border border-[#ded4c6] bg-[#fffdf8] px-3 py-1.5 text-sm text-[#625b52] transition-colors hover:border-[#b8aa98] hover:text-[#24211d]"
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            </div>

            <section className="rounded-lg border border-[#ded4c6] bg-[#fffdf8] p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#776f65]">今日推荐</p>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight">先从这几类 API 判断</h2>
                </div>
                <Link href="/cloud-api" className="text-sm font-medium text-[#2b2621] hover:underline">
                  查看全部
                </Link>
              </div>
              <div className="overflow-hidden rounded-md border border-[#e8dfd2]">
                <table className="w-full text-sm">
                  <thead className="bg-[#f5efe6] text-left text-xs font-medium text-[#776f65]">
                    <tr>
                      <th className="px-4 py-3">API</th>
                      <th className="px-4 py-3">访问</th>
                      <th className="px-4 py-3">免费额度</th>
                      <th className="px-4 py-3">适合场景</th>
                      <th className="px-4 py-3">教程</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eee6da]">
                    {desktopDecisionRows.map(row => (
                      <tr key={row.name} className="transition-colors hover:bg-[#faf6ef]">
                        <td className="px-4 py-4">
                          <Link href={row.href} className="font-semibold text-[#24211d] hover:underline">
                            {row.name}
                          </Link>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`rounded-full border px-2 py-1 text-xs font-medium ${row.accessClass}`}>
                            {row.access}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-[#625b52]">{row.free}</td>
                        <td className="px-4 py-4 text-[#625b52]">{row.scene}</td>
                        <td className="px-4 py-4">
                          <Link href={row.tutorialHref} className="rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700 hover:border-sky-300">
                            {row.tutorial}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </section>

        <section className="border-y border-[#e8dfd2] bg-[#fffaf2] px-8 py-8">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {desktopWorkflowCards.map((card, index) => (
              <Link
                key={card.href}
                href={card.href}
                className="rounded-lg border border-[#ded4c6] bg-[#fffdf8] p-5 transition-colors hover:border-[#b8aa98]"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-[#2b2621] text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <h3 className="font-semibold">{card.title}</h3>
                </div>
                <p className="text-sm leading-6 text-[#625b52]">{card.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#776f65]">按场景推荐</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">用更具体的任务来选模型</h2>
              </div>
              <Link href="/use-case" className="text-sm font-medium text-[#2b2621] hover:underline">
                查看全部场景
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {desktopScenarioCards.map(card => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.href}
                    href={card.href}
                    className={`rounded-lg border p-5 transition-transform hover:-translate-y-0.5 ${card.className}`}
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className={`flex size-10 items-center justify-center rounded-md ${card.iconClassName}`}>
                        <Icon className="size-5" />
                      </span>
                      <ChevronRight className="size-4 opacity-60" />
                    </div>
                    <h3 className="font-semibold">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 opacity-80">{card.desc}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e8dfd2] px-8 py-8 text-center text-sm text-[#776f65]">
        <p>API知识站 - 按访问条件、购买难度和使用场景选择 AI API</p>
        <div className="mt-3">
          <BeianLinks />
        </div>
      </footer>
    </div>
  );
}

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-background">
      <div className="md:hidden">
        <MobileHome />
      </div>
      <div className="hidden md:block">
        <DesktopHome />
      </div>
    </div>
  );
}
