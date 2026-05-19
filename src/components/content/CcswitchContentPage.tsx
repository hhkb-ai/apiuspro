'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BeianLinks } from '@/components/layout/BeianLinks';
import { Badge } from '@/components/ui/badge';
import { appTutorials } from '@/lib/api-config';
import { ArticleSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/structured-data';
import { DetailBackNav } from '@/components/navigation/ReturnNavigation';

const tutorial = appTutorials.find(t => t.id === 'ccswitch')!;
const ARTICLE_DATE_PUBLISHED = '2026-05-11';
const ARTICLE_DATE_MODIFIED = '2026-05-11';
const URL_PATTERN = /(`[^`]+`|【[^】]+】|https?:\/\/[^\s<>"'，。；、？！）)】]+)/g;
const advantages = ['多工具统一配置', '多供应商一键切换', '系统托盘热切换', 'MCP 与 Skills 管理', '本地存储密钥安全'];

function isApiEndpointUrl(value: string) {
  try {
    const url = new URL(value);
    return url.hostname !== 'apiuspro.cn' && (url.hostname.startsWith('api.') || url.pathname.startsWith('/v1') || url.pathname.includes('/api/') || url.pathname.includes('/compatible-mode/'));
  } catch { return false; }
}

function RichText({ text }: { text: string }) {
  if (!text) return null;
  return <>{text.split(URL_PATTERN).filter(Boolean).map((part, i) => {
    if (!part) return null;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={i} className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">{part.slice(1, -1)}</code>;
    if (part.startsWith('【') && part.endsWith('】')) return <strong key={i} className="rounded bg-muted px-1 font-semibold text-foreground">{part}</strong>;
    if (part.startsWith('http://') || part.startsWith('https://')) {
      if (isApiEndpointUrl(part)) return <code key={i} className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">{part}</code>;
      return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-foreground/10 px-2.5 py-1 text-sm font-medium text-foreground transition-colors hover:bg-foreground/20"><svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>{part.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a>;
    }
    return <span key={i}>{part}</span>;
  })}</>;
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => { navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }, [code]);
  return (
    <div className="group relative my-3 overflow-hidden rounded-lg border border-border bg-muted/40">
      <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-1.5">
        <span className="font-mono text-[11px] uppercase text-muted-foreground">bash</span>
        <button onClick={handleCopy} className="flex h-8 items-center gap-1 px-2 text-xs text-muted-foreground transition-colors hover:text-foreground">{copied ? '已复制' : '复制'}</button>
      </div>
      <pre className="overflow-x-auto whitespace-pre px-4 py-3 font-mono text-[13px] leading-6 text-foreground">{code.split('\n').map((l, i) => <div key={i}>{l || ' '}</div>)}</pre>
    </div>
  );
}

function StepItem({ item }: { item: string }) {
  const colonIndexes = [item.indexOf('：'), item.indexOf(':')].filter(index => index > 0);
  const colonIdx = colonIndexes.length > 0 ? Math.min(...colonIndexes) : -1;
  const hasColon = colonIdx > 0 && colonIdx < 20;
  return (
    <li className="flex items-start gap-2 text-sm text-muted-foreground">
      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
      <span className="leading-6">
        {hasColon ? <><strong className="font-semibold text-foreground">{item.substring(0, colonIdx + 1)}</strong><RichText text={item.substring(colonIdx + 1)} /></> : <RichText text={item} />}
      </span>
    </li>
  );
}

function GuideNav() {
  return (
    <aside className="hidden lg:block w-52 shrink-0">
      <div className="sticky top-20">
        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">指南</p>
        <nav className="space-y-0.5">
          {appTutorials.map((t) => (
            <Link key={t.id} href={'/app/' + t.id}
              className={'block text-[13px] px-3 py-2 rounded-md transition-colors truncate ' + (t.id === 'ccswitch' ? 'border-l-2 border-foreground bg-muted text-foreground font-semibold' : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground')}>
              {t.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function OnThisPageNav({ sections, activeIdx }: { sections: { title: string }[]; activeIdx: number }) {
  return (
    <aside className="hidden xl:block w-48 shrink-0">
      <div className="sticky top-20">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">On this page</p>
        <nav className="space-y-0.5 border-l border-border">
          <a href="#tutorial-overview" className="block truncate py-1.5 pl-3 text-[12px] text-muted-foreground transition-colors hover:text-foreground">教程概览</a>
          {sections.map((s, i) => (
            <a key={i} href={'#section-' + i}
              className={'block text-[12px] py-1.5 pl-3 transition-colors truncate ' + (i === activeIdx ? 'text-foreground font-semibold border-l-2 border-foreground -ml-px' : 'text-muted-foreground hover:text-foreground')}>
              {s.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export function CcswitchContentPage() {
  const [activeSection, setActiveSection] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) { const idx = Number(entry.target.getAttribute('data-section-idx')); if (!isNaN(idx)) setActiveSection(idx); }
      }
    }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });
    tutorial.sections.forEach((_, i) => { const el = document.getElementById('section-' + i); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const totalSteps = tutorial.sections.reduce((n, s) => n + (s.steps?.length || 0), 0);
  const overviewItems: Array<{ icon: string; label: string; value: string; cls: string }> = [
    { icon: '⏱', label: '预计耗时', value: '10-15 分钟', cls: 'text-sky-900' },
    { icon: '📦', label: '准备材料', value: '至少一个 API 平台账号（DeepSeek、OpenAI、Kimi 等）、已获取 API Key 和 Base URL、已安装 Claude Code 或其他 AI 工具', cls: 'text-sky-900' },
    { icon: '✅', label: '成功标志', value: '在 Claude Code 里发起一次对话，能正常收到模型回复', cls: 'text-emerald-800' },
    { icon: '⚠', label: '最容易卡住', value: '把供应商配置写进了错误的工具标签，导致实际工具读不到配置', cls: 'text-amber-800' },
    { icon: '🔒', label: '安全提醒', value: 'API Key 是敏感信息，不要截图或上传到公开仓库', cls: 'text-red-800' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={[{ name: 'API知识站', url: 'https://apiuspro.cn' }, { name: 'API应用', url: 'https://apiuspro.cn/app' }, { name: 'CC Switch', url: 'https://apiuspro.cn/app/ccswitch' }]} />
      <ArticleSchema title="CC Switch 安装与多模型切换教程" description={tutorial.desc} url="https://apiuspro.cn/app/ccswitch" datePublished={ARTICLE_DATE_PUBLISHED} dateModified={ARTICLE_DATE_MODIFIED} />
      <HowToSchema name="CC Switch 安装与多模型切换教程" description={tutorial.desc} steps={tutorial.sections.flatMap((s, si) => (s.steps || []).map((st, sti) => ({ name: st.title, text: st.description || st.items?.join('；') || s.content, url: 'https://apiuspro.cn/app/ccswitch#section-' + si + '-' + sti })))} totalTime="PT15M" tool={['浏览器', '终端', 'CC Switch']} />

      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex flex-wrap items-center gap-y-2">
          <DetailBackNav listHref="/app" listLabel="应用教程列表" className="mb-0" />
          <span className="mx-3 text-border">|</span>
          <span className="truncate text-sm font-semibold text-foreground">CC Switch</span>
          <span className="ml-2 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">推荐</span>
          <div className="ml-auto"><a href={tutorial.url} target="_blank" rel="noopener noreferrer" className="rounded-md bg-foreground px-4 py-1.5 text-[12px] font-semibold text-background transition-colors hover:bg-foreground/90">访问官网</a></div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 py-8 flex gap-8">
        <GuideNav />
        <main className="flex-1 min-w-0 rounded-lg border border-border bg-card">
          <div className="border-b border-border px-8 pb-6 pt-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">CC Switch 安装与多模型切换教程</h1>
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 text-[11px] font-semibold">推荐</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{tutorial.desc}</p>
            <section className="mt-5 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-900">
              <p className="font-semibold">BLUF 摘要</p>
              <p className="mt-1">这篇教程用 {tutorial.sections.length} 个章节、{totalSteps} 个操作步骤，说明如何安装 CC Switch 并统一管理多个 AI 工具的 API 供应商配置；最终目标是在 Claude Code 或其他工具里完成一次真实模型调用，确认配置生效。</p>
            </section>
            <div className="flex flex-wrap gap-2 mt-4">
              {advantages.map((tag) => <span key={tag} className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[12px] text-emerald-700">{'✓ '}{tag}</span>)}
            </div>
          </div>

          <section id="tutorial-overview" className="scroll-mt-[68px] mx-8 mt-6 rounded-lg border border-sky-200 bg-sky-50 px-5 py-4">
            <p className="mb-3 text-[13px] font-semibold text-sky-800">教程概览</p>
            <div className="space-y-2.5 text-sm">
              {overviewItems.map((item) => (
                <div key={item.label} className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0">{item.icon}</span>
                  <span className={item.cls}><strong className="font-semibold">{item.label}：</strong>{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="mx-8 mt-6 overflow-hidden rounded-lg border border-border xl:hidden">
            <details>
              <summary className="cursor-pointer select-none bg-muted/60 px-4 py-2.5 text-sm font-semibold text-foreground">{'目录（' + tutorial.sections.length + ' 章 · ' + totalSteps + ' 个操作点）'}</summary>
              <div className="space-y-0.5 border-t border-border px-4 py-2">
                {tutorial.sections.map((s, i) => <a key={i} href={'#section-' + i} className="block py-1.5 text-[13px] text-muted-foreground hover:text-foreground">{i + 1}. {s.title}</a>)}
              </div>
            </details>
          </div>

          <div className="space-y-10 px-5 py-6 sm:px-8">
            {tutorial.sections.map((section, si) => (
              <section key={si} id={'section-' + si} data-section-idx={si} className={si < tutorial.sections.length - 1 ? 'border-b border-border pb-10' : ''}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">{si + 1}</span>
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">{section.title}</h2>
                </div>
                <div className="mb-5 text-[15px] leading-7 text-muted-foreground"><RichText text={section.content} /></div>
                <div className="space-y-6">
                  {section.steps?.map((step, sti) => (
                    <div key={sti} id={'section-' + si + '-' + sti} className="scroll-mt-[68px]">
                      <h3 className="mb-2 flex items-center gap-2 text-[15px] font-semibold text-foreground"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />{step.title}</h3>
                      {step.description && <p className="mb-3 pl-4 text-sm leading-6 text-muted-foreground"><RichText text={step.description} /></p>}
                      {step.code && <div className="pl-4"><CodeBlock code={step.code} /></div>}
                      {step.image && <div className="pl-4 my-3"><div className="overflow-hidden rounded-lg border border-border bg-muted/40"><Image src={step.image} alt={step.title} width={1200} height={1553} className="h-auto max-h-[760px] w-full object-contain" loading="lazy" sizes="(min-width: 1280px) 760px, (min-width: 768px) calc(100vw - 18rem), calc(100vw - 2rem)" /></div></div>}
                      {step.items && step.items.length > 0 && <ul className="space-y-2 mb-2 pl-4">{step.items.map((item, ii) => <StepItem key={ii} item={item} />)}</ul>}
                      {step.warning && <div className="pl-4 my-3"><div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">{'⚠ '}{step.warning}</div></div>}
                    </div>
                  ))}
                </div>
                {section.tips && section.tips.length > 0 && <div className="mt-6 space-y-2 rounded-lg border border-sky-200 bg-sky-50 px-5 py-4"><p className="mb-1 text-[13px] font-semibold text-sky-800">核心要点</p>{section.tips.map((tip, ti) => <p key={ti} className="pl-5 text-sm leading-6 text-sky-700"><RichText text={tip} /></p>)}</div>}
                {section.warnings && section.warnings.length > 0 && <div className="mt-6 space-y-2 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4"><p className="mb-1 text-[13px] font-semibold text-amber-800">注意事项</p>{section.warnings.map((w, wi) => <p key={wi} className="text-sm text-amber-700 leading-6 pl-5"><RichText text={w} /></p>)}</div>}
              </section>
            ))}
          </div>

          <div className="mx-8 mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4">
              <p className="mb-2 text-[13px] font-semibold text-emerald-800">适合谁</p>
              <ul className="space-y-1.5 text-sm leading-6 text-emerald-700">
                <li>{'• '}经常在多个 AI 工具和 API 供应商之间切换的开发者</li>
                <li>{'• '}使用 Claude Code、Codex、Gemini CLI、OpenCode 或 OpenClaw</li>
                <li>{'• '}不想手动编辑 JSON、TOML 或环境变量文件</li>
              </ul>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4">
              <p className="mb-2 text-[13px] font-semibold text-amber-800">不适合谁</p>
              <ul className="space-y-1.5 text-sm leading-6 text-amber-700">
                <li>{'• '}只使用一个 API、一个工具且配置很少变化的用户</li>
                <li>{'• '}已有成熟的 dotfiles 管理方案，不需要额外工具</li>
                <li>{'• '}不确定该用哪个 API（请看 <Link href="/use-case" className="text-foreground hover:underline">场景推荐</Link>）</li>
              </ul>
            </div>
          </div>

          <div className="mx-8 mb-8 border-t border-border pt-6">
            <h3 className="mb-4 text-base font-semibold text-foreground">相关教程</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: 'Claude Code 安装教程', desc: '安装 Claude Code 并通过 CC Switch 接入 DeepSeek 等模型', href: '/app/claude-code' },
                { title: 'DeepSeek API 教程', desc: '获取 DeepSeek API Key、选择模型并完成基础调用', href: '/tutorial/deepseek' },
                { title: 'Base URL 配置错误', desc: '排查 OpenAI 兼容接口路径、代理和模型名不匹配问题', href: '/error/base-url-error' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="group rounded-lg border border-border bg-muted/40 p-4 transition-colors hover:border-foreground/30 hover:bg-card">
                  <h4 className="text-sm font-semibold text-foreground">{link.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{link.desc}</p>
                  <div className="mt-2 text-xs font-medium text-foreground">{'查看教程 →'}</div>
                </Link>
              ))}
            </div>
          </div>
        </main>
        <OnThisPageNav sections={tutorial.sections} activeIdx={activeSection} />
      </div>

      <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground">
        <p>API知识站 - 适合初学者的 AI API 学习平台</p>
        <div className="mt-3"><BeianLinks /></div>
      </footer>
    </div>
  );
}
