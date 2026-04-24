'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { apiList, appTutorials } from '@/lib/api-config';

// 页面数据
const pages = [
  { id: 'tutorial', name: '购买教程', desc: '各大API购买流程指南', url: '/tutorial' },
  { id: 'cloud-api', name: 'API列表', desc: '国内外API官网链接', url: '/cloud-api' },
  { id: 'local-deploy', name: '本地部署', desc: 'Ollama/LM Studio部署', url: '/local-deploy' },
];

// 快捷标签数据
const quickLinks = [
  { name: 'OpenAI', id: 'openai' },
  { name: '通义千问', id: 'aliyun' },
  { name: 'Claude', id: 'claude' },
  { name: 'Gemini', id: 'gemini' },
  { name: 'DeepSeek', id: 'deepseek' },
  { name: '智谱GLM', id: 'zhipu' },
  { name: 'Kimi', id: 'kimi' },
];

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState<'cloud' | 'app'>('cloud');

  // 合并API数据
  const allAPIs = apiList;
  const featuredAPIs = [
    apiList.find(a => a.id === 'aliyun')!,
    apiList.find(a => a.id === 'zhipu')!,
    apiList.find(a => a.id === 'deepseek')!,
    apiList.find(a => a.id === 'openai')!,
    apiList.find(a => a.id === 'claude')!,
    apiList.find(a => a.id === 'gemini')!,
  ];

  // 搜索结果
  const getSearchResults = () => {
    if (!searchQuery.trim()) return { apis: [], tutorials: [], pages: [], apps: [] };
    const q = searchQuery.toLowerCase().trim();
    return {
      apis: allAPIs.filter(api => api.name.toLowerCase().includes(q) || api.desc.toLowerCase().includes(q)).slice(0, 3),
      tutorials: allAPIs.filter(api => api.tutorial && api.name.toLowerCase().includes(q)).slice(0, 3),
      pages: pages.filter(page => page.name.toLowerCase().includes(q) || page.desc.toLowerCase().includes(q)),
      apps: appTutorials.filter(app => app.name.toLowerCase().includes(q) || app.desc.toLowerCase().includes(q)).slice(0, 3),
    };
  };

  const searchResults = getSearchResults();

  // 精确匹配
  const exactMatch = searchQuery.trim() ? allAPIs.find(api => api.name.toLowerCase() === searchQuery.toLowerCase().trim() || api.id.toLowerCase() === searchQuery.toLowerCase().trim()) : null;

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航栏 */}
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                  <span className="text-background font-bold text-sm">API</span>
                </div>
                <span className="font-bold text-lg hidden sm:block">API知识站</span>
              </Link>
              <span className="text-muted-foreground text-sm hidden md:block">适合初学者的API学习平台</span>
            </div>
            <nav className="flex items-center gap-3 sm:gap-5">
              <Link href="/cloud-api" className="font-bold text-foreground hover:text-foreground/80 text-sm sm:text-base">API官网</Link>
              <Link href="/api-review" className="font-bold text-foreground hover:text-foreground/80 text-sm sm:text-base">API测评</Link>
              <Link href="/tutorial" className="font-bold text-foreground hover:text-foreground/80 text-sm sm:text-base">购买教程</Link>
              <Link href="#app-section" className="font-bold text-foreground hover:text-foreground/80 text-sm sm:text-base">API应用</Link>
              <Link href="/local-deploy" className="font-bold text-foreground hover:text-foreground/80 text-sm sm:text-base">本地部署</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero区域 + 核心搜索区 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">API知识站</h1>
          <p className="text-lg text-muted-foreground mb-8">一站式API学习平台，从入门到精通</p>

          {/* 搜索框 */}
          <div className="relative max-w-2xl mx-auto mb-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="搜索API名称，如 OpenAI、通义千问..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onKeyDown={(e) => e.key === 'Enter' && exactMatch && router.push(`/api/${exactMatch.id}`)}
                className="flex-1 h-12 text-base px-4"
              />
              <Button className="h-12 px-6 bg-foreground text-background hover:bg-foreground/90" onClick={() => exactMatch && router.push(`/api/${exactMatch.id}`)}>搜索</Button>
            </div>

            {/* 搜索建议下拉 */}
            {showSuggestions && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-xl shadow-lg z-10 overflow-hidden">
                {searchResults.apis.length > 0 && (
                  <>
                    <div className="px-4 py-2 bg-muted text-xs font-medium text-muted-foreground">API</div>
                    {searchResults.apis.map((api) => (
                      <Link key={api.id} href={`/api/${api.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-muted">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{api.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{api.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </>
                )}
                {searchResults.tutorials.length > 0 && (
                  <>
                    <div className="px-4 py-2 bg-muted text-xs font-medium text-muted-foreground">购买教程</div>
                    {searchResults.tutorials.map((api) => (
                      <Link key={api.id} href={`/tutorial/${api.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-muted">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{api.tutorial?.title || `${api.name}教程`}</p>
                          <p className="text-sm text-muted-foreground truncate">{api.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </>
                )}
                {searchResults.apps.length > 0 && (
                  <>
                    <div className="px-4 py-2 bg-muted text-xs font-medium text-muted-foreground">API应用</div>
                    {searchResults.apps.map((app) => (
                      <Link key={app.id} href={`#app-section`} className="flex items-center gap-3 px-4 py-3 hover:bg-muted">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{app.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{app.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </>
                )}
                {searchResults.pages.length > 0 && (
                  <>
                    <div className="px-4 py-2 bg-muted text-xs font-medium text-muted-foreground">页面</div>
                    {searchResults.pages.map((page) => (
                      <Link key={page.id} href={page.url} className="flex items-center gap-3 px-4 py-3 hover:bg-muted">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{page.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{page.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </>
                )}
                {searchResults.apis.length === 0 && searchResults.tutorials.length === 0 && searchResults.pages.length === 0 && searchResults.apps.length === 0 && (
                  <div className="px-4 py-6 text-center text-muted-foreground">
                    <p>未找到相关内容</p>
                    <p className="text-sm mt-1">试试搜索 OpenAI、通义千问、Claude...</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 精确匹配提示 */}
          {exactMatch && searchQuery.trim() && (
            <div className="flex items-center justify-center gap-2 text-sm mb-4">
              <span className="text-muted-foreground">找到「{exactMatch.name}」</span>
              <Button size="sm" onClick={() => router.push(`/api/${exactMatch.id}`)}>直接跳转</Button>
              {exactMatch.tutorial && <Button size="sm" variant="outline" onClick={() => router.push(`/tutorial/${exactMatch.id}`)}>购买教程</Button>}
            </div>
          )}

          {/* 搜索提示 */}
          {!searchQuery.trim() && <p className="text-sm text-muted-foreground mb-6">直接输入API名称，精确匹配后可直达详情页</p>}

          {/* 快捷标签 */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {quickLinks.map((link) => (
              <Link key={link.id} href={`/api/${link.id}`} className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium hover:bg-muted/80">
                {link.name}
              </Link>
            ))}
          </div>

          {/* 快捷入口卡片 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link href="/tutorial" className="bg-muted rounded-xl p-4 hover:shadow-md">
              <p className="font-bold text-sm">购买教程</p>
              <p className="text-xs text-muted-foreground mt-1">API购买流程指南</p>
            </Link>
            <Link href="/cloud-api" className="bg-muted rounded-xl p-4 hover:shadow-md">
              <p className="font-bold text-sm">API列表</p>
              <p className="text-xs text-muted-foreground mt-1">国内外API汇总</p>
            </Link>
            <Link href="/local-deploy" className="bg-muted rounded-xl p-4 hover:shadow-md">
              <p className="font-bold text-sm">本地部署</p>
              <p className="text-xs text-muted-foreground mt-1">Ollama等部署指南</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 内容分类区 */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          {/* 标签切换 */}
          <div className="flex gap-2 mb-8 border-b border-border pb-4">
            <button onClick={() => setActiveTab('cloud')} className={`px-6 py-3 font-bold ${activeTab === 'cloud' ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground hover:text-foreground'}`}>云端API</button>
            <button onClick={() => setActiveTab('app')} className={`px-6 py-3 font-bold ${activeTab === 'app' ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground hover:text-foreground'}`}>API应用</button>
          </div>

          {/* 云端API内容 */}
          {activeTab === 'cloud' && (
            <div className="space-y-6">
              {/* 分类入口卡片 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <Link href="/cloud-api" className="bg-muted rounded-xl p-6 hover:shadow-md">
                  <h3 className="font-bold">无需代理</h3>
                  <p className="text-sm text-muted-foreground">国内直连，开箱即用</p>
                </Link>
                <Link href="/cloud-api" className="bg-muted rounded-xl p-6 hover:shadow-md">
                  <h3 className="font-bold">需要代理</h3>
                  <p className="text-sm text-muted-foreground">OpenAI、Claude、Gemini等</p>
                </Link>
              </div>

              {/* API卡片列表 */}
              <h3 className="text-lg font-bold mb-4">精选API</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredAPIs.map((api) => (
                  <div key={api.id} className="bg-muted rounded-xl p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-base">{api.name}</h4>
                      <Badge className={`text-xs ${api.badge.type === 'success' ? 'bg-green-500 text-white' : api.badge.type === 'warning' ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white'}`}>{api.badge.text}</Badge>
                    </div>
                    <p className="text-sm text-foreground mb-4 flex-1">{api.desc}</p>
                    <div className="flex gap-2">
                      <a href={api.url} target="_blank" rel="noopener noreferrer" className="flex-1"><Button className="w-full bg-foreground text-background hover:bg-foreground/90">官网入口</Button></a>
                      <Link href={`/api/${api.id}`} className="flex-1"><Button variant="outline" className="w-full">详细说明</Button></Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <Link href="/cloud-api"><Button variant="outline">查看更多API</Button></Link>
              </div>
            </div>
          )}

          {/* API应用内容 - 教程卡片列表 */}
          {activeTab === 'app' && (
            <div id="app-section" className="space-y-6">
              <p className="text-muted-foreground">精选AI工具与应用教程，持续更新中</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {appTutorials.map((tutorial) => (
                  <div key={tutorial.id} className="bg-muted rounded-xl p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-base">{tutorial.name}</h4>
                      <Badge className={`text-xs ${tutorial.badge.type === 'warning' ? 'bg-yellow-500 text-white' : tutorial.badge.type === 'success' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>{tutorial.badge.text}</Badge>
                    </div>
                    <p className="text-sm text-foreground mb-1">{tutorial.desc}</p>
                    <p className="text-xs text-muted-foreground mb-4">{tutorial.sections.length} 个章节</p>
                    <div className="mt-auto">
                      <Link href={`/app/${tutorial.id}`}><Button className="w-full bg-foreground text-background hover:bg-foreground/90">详细教程</Button></Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>API知识站 - 适合初学者的API学习平台</p>
        </div>
      </footer>
    </div>
  );
}
