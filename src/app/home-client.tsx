'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiList, appTutorials } from '@/lib/api-config';

const pages = [
  { id: 'cloud-api', name: 'API 列表', desc: '先看官网入口、代理要求和免费额度', url: '/cloud-api', tag: '优先查看' },
  { id: 'tutorial', name: '购买教程', desc: '按步骤完成注册、支付与 API Key 创建', url: '/tutorial', tag: '新手推荐' },
  { id: 'local-deploy', name: '本地部署', desc: 'Ollama / LM Studio 等本地模型方案', url: '/local-deploy', tag: '进阶路线' },
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

export default function HomeClient() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

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
                className="shrink-0 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-5 inline-flex rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground">
                AI API 选型、购买、接入一站整理
              </div>
              <h1 className="mx-auto max-w-4xl text-3xl font-semibold leading-[1.18] sm:text-4xl lg:text-5xl">
                <span className="block">更快找到可用的 AI API</span>
                <span className="mt-1 block">少走接入弯路</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                从官网入口、代理要求、免费额度到购买教程和本地部署，按真实使用路径整理。
              </p>
            </div>

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
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  onKeyDown={(e) => e.key === 'Enter' && exactMatch && router.push(`/api/${exactMatch.id}`)}
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
                        <Link key={api.id} href={`/api/${api.id}`} className="block px-4 py-3 transition-colors hover:bg-muted/70">
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
                        <Link key={api.id} href={`/tutorial/${api.id}`} className="block px-4 py-3 transition-colors hover:bg-muted/70">
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
                        <Link key={app.id} href={`/app/${app.id}`} className="block px-4 py-3 transition-colors hover:bg-muted/70">
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
                        <Link key={page.id} href={page.url} className="block px-4 py-3 transition-colors hover:bg-muted/70">
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
