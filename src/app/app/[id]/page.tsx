'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { appTutorials } from '@/lib/api-config';
import { BreadcrumbSchema, ArticleSchema } from '@/components/seo/structured-data';

/* ─── RichText: 解析 `code` 【重点】 标记 ─── */
function RichText({ text, className = '' }: { text: string; className?: string }) {
  const parts = text.split(/(`[^`]+`|【[^】]+】)/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith('【') && part.endsWith('】')) {
          return (
            <strong key={i} className="rounded bg-muted px-1 font-semibold text-foreground">
              {part}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

/* ─── 代码块：浅蓝灰底 + 语法高亮 ─── */
function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  // 简易语法高亮：注释 → 灰色，命令词 → 紫色，路径/URL → 蓝色
  const highlight = (line: string) => {
    const parts: React.ReactNode[] = [];
    let remaining = line;

    // 注释行
    if (remaining.trimStart().startsWith('#')) {
      return <span className="text-muted-foreground italic">{remaining}</span>;
    }

    // 简单模式匹配
    const patterns = [
      { regex: /(https?:\/\/[^\s]+)/g, className: 'text-blue-600 underline' },
      { regex: /(~?\/[^\s]*)/g, className: 'text-teal-700' },
      { regex: /\b(sudo|npm|npx|pip|git|curl|chmod|mkdir|cd|export|source|echo|cat|brew|node|python|claude|llm-wiki)\b/g, className: 'text-purple-700 font-semibold' },
      { regex: /(--[\w-]+)/g, className: 'text-cyan-700' },
    ];

    let key = 0;
    while (remaining.length > 0) {
      let earliestMatch: { idx: number; len: number; className: string; text: string } | null = null;

      for (const { regex, className } of patterns) {
        regex.lastIndex = 0;
        const m = regex.exec(remaining);
        if (m && m.index >= 0 && (!earliestMatch || m.index < earliestMatch.idx)) {
          earliestMatch = { idx: m.index, len: m[0].length, className, text: m[0] };
        }
      }

      if (!earliestMatch) {
        parts.push(<span key={key++}>{remaining}</span>);
        break;
      }

      if (earliestMatch.idx > 0) {
        parts.push(<span key={key++}>{remaining.substring(0, earliestMatch.idx)}</span>);
      }
      parts.push(<span key={key++} className={earliestMatch.className}>{earliestMatch.text}</span>);
      remaining = remaining.substring(earliestMatch.idx + earliestMatch.len);
    }

    return <>{parts}</>;
  };

  return (
    <div className="group relative my-3 overflow-hidden rounded-lg border border-border bg-muted/40">
      {/* 顶部标签栏 */}
      <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-1.5">
        <span className="font-mono text-[11px] uppercase text-muted-foreground">{lang}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
        >
          {copied ? '✓ 已复制' : '复制'}
        </button>
      </div>
      {/* 代码内容 */}
      <pre className="overflow-x-auto whitespace-pre px-4 py-3 font-mono text-[13px] leading-6 text-foreground">
        {code.split('\n').map((line, i) => (
          <div key={i}>{line ? highlight(line) : '\u00A0'}</div>
        ))}
      </pre>
    </div>
  );
}

/* ─── 左侧指南导航 ─── */
function GuideNav({ tutorialId }: { tutorialId: string }) {
  return (
    <aside className="hidden lg:block w-52 shrink-0">
      <div className="sticky top-20">
        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">指南</p>
        <nav className="space-y-0.5">
          {appTutorials.map((t) => (
            <Link
              key={t.id}
              href={`/app/${t.id}`}
            className={`block text-[13px] px-3 py-2 rounded-md transition-colors truncate ${
                t.id === tutorialId
                  ? 'border-l-2 border-foreground bg-muted text-foreground font-semibold'
                  : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
              }`}
            >
              {t.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

/* ─── 右侧 On this page 目录 ─── */
function OnThisPage({ sections, activeIdx }: { sections: { title: string }[]; activeIdx: number }) {
  return (
    <aside className="hidden xl:block w-48 shrink-0">
      <div className="sticky top-20">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">On this page</p>
        <nav className="space-y-0.5 border-l border-border">
          {sections.map((s, i) => (
            <a
              key={i}
              href={`#section-${i}`}
              className={`block text-[12px] py-1.5 pl-3 transition-colors truncate ${
                i === activeIdx
                  ? 'text-foreground font-semibold border-l-2 border-foreground -ml-px'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {s.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

/* ─── 主页面 ─── */
export default function AppTutorialPage({ params }: { params: Promise<{ id: string }> }) {
  const [resolvedId, setResolvedId] = useState<string>('');
  const [activeSection, setActiveSection] = useState(0);

  // Resolve params via useEffect to avoid state update during render
  useEffect(() => {
    params.then(p => setResolvedId(p.id));
  }, [params]);

  // Scroll spy
  useEffect(() => {
    if (!resolvedId) return;
    const tutorial = appTutorials.find(t => t.id === resolvedId);
    if (!tutorial) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-section-idx'));
            if (!isNaN(idx)) setActiveSection(idx);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    tutorial.sections.forEach((_, i) => {
      const el = document.getElementById(`section-${i}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [resolvedId]);

  if (!resolvedId) return null;

  const tutorial = appTutorials.find(t => t.id === resolvedId);
  if (!tutorial) notFound();

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://apiuspro.cn' },
          { name: 'API应用', url: 'https://apiuspro.cn/app' },
          { name: tutorial.name, url: `https://apiuspro.cn/app/${tutorial.id}` },
        ]}
      />
      <ArticleSchema
        title={`${tutorial.name} 使用教程`}
        description={tutorial.desc}
        url={`https://apiuspro.cn/app/${tutorial.id}`}
      />
      {/* ── 顶部导航栏 ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            &#8592; 返回首页
          </Link>
          <span className="mx-3 text-border">|</span>
          <span className="truncate text-sm font-semibold text-foreground">{tutorial.name}</span>
          <div className="ml-auto">
            <a
              href={tutorial.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-foreground px-4 py-1.5 text-[12px] font-semibold text-background transition-colors hover:bg-foreground/90"
            >
              访问官网
            </a>
          </div>
        </div>
      </header>

      {/* ── 三栏布局 ── */}
      <div className="max-w-[1200px] mx-auto px-6 py-8 flex gap-8">
        {/* 左侧指南导航 */}
        <GuideNav tutorialId={tutorial.id} />

        {/* 中间主内容区 */}
        <main className="flex-1 min-w-0 rounded-lg border border-border bg-card">
          {/* 文档头部 */}
          <div className="border-b border-border px-8 pb-6 pt-8">
            <div className="flex items-center gap-3 mb-2">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">{tutorial.name}</h1>
              </div>
              <span className={`ml-2 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                tutorial.badge.type === 'warning' ? 'border border-amber-200 bg-amber-50 text-amber-700' :
                tutorial.badge.type === 'success' ? 'border border-emerald-200 bg-emerald-50 text-emerald-700' :
                'border border-sky-200 bg-sky-50 text-sky-700'
              }`}>
                {tutorial.badge.text}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{tutorial.desc}</p>
          </div>

          {/* 移动端目录 - 折叠式 */}
          <div className="mx-8 mt-6 overflow-hidden rounded-lg border border-border xl:hidden">
            <details>
              <summary className="cursor-pointer select-none bg-muted/60 px-4 py-2.5 text-sm font-semibold text-foreground">
                目录（{tutorial.sections.length} 章）
              </summary>
              <div className="space-y-0.5 border-t border-border px-4 py-2">
                {tutorial.sections.map((s, i) => (
                  <a key={i} href={`#section-${i}`} className="block py-1.5 text-[13px] text-muted-foreground hover:text-foreground">
                    {i + 1}. {s.title}
                  </a>
                ))}
              </div>
            </details>
          </div>

          {/* 教程章节 */}
          <div className="px-8 py-6 space-y-10">
            {tutorial.sections.map((section, sectionIdx) => (
              <section
                key={sectionIdx}
                id={`section-${sectionIdx}`}
                data-section-idx={sectionIdx}
                className={sectionIdx < tutorial.sections.length - 1 ? 'border-b border-border pb-10' : ''}
              >
                {/* 章节标题：编号 + 文字 */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                    {sectionIdx + 1}
                  </span>
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">{section.title}</h2>
                </div>

                {/* 章节概述 */}
                <div className="mb-5 text-[15px] leading-7 text-muted-foreground">
                  <RichText text={section.content} />
                </div>

                {/* 步骤列表 */}
                <div className="space-y-6">
                  {section.steps?.map((step, stepIdx) => (
                    <div key={stepIdx}>
                      {/* 步骤标题 */}
                      <h3 className="mb-2 flex items-center gap-2 text-[15px] font-semibold text-foreground">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                        {step.title}
                      </h3>

                      {/* 步骤描述 */}
                      {step.description && (
                        <p className="mb-3 pl-4 text-sm leading-6 text-muted-foreground">
                          <RichText text={step.description} />
                        </p>
                      )}

                      {/* 代码块 */}
                      {step.code && (
                        <div className="pl-4">
                          <CodeBlock code={step.code} />
                        </div>
                      )}

                      {/* 图片展示 */}
                      {step.image && (
                        <div className="pl-4 my-3">
                          <div className="overflow-hidden rounded-lg border border-border bg-muted/40">
                            <Image
                              src={step.image}
                              alt={step.title}
                              width={1200}
                              height={675}
                              className="h-auto w-full"
                              loading="lazy"
                              unoptimized
                            />
                          </div>
                        </div>
                      )}

                      {/* 要点列表 */}
                      {step.items && step.items.length > 0 && (
                        <ul className="space-y-2 mb-2 pl-4">
                          {step.items.map((item, itemIdx) => {
                            const colonIdx = Math.max(item.indexOf('：'), item.indexOf(':'));
                            const hasColon = colonIdx > 0 && colonIdx < 20;

                            return (
                              <li key={itemIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                                <span className="leading-6">
                                  {hasColon ? (
                                    <>
                                      <strong className="font-semibold text-foreground">{item.substring(0, colonIdx + 1)}</strong>
                                      <RichText text={item.substring(colonIdx + 1)} />
                                    </>
                                  ) : (
                                    <RichText text={item} />
                                  )}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {/* 警告 */}
                      {step.warning && (
                        <div className="pl-4 my-3">
                          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
                            &#9888; {step.warning}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* 核心要点卡片 */}
                {section.tips && section.tips.length > 0 && (
                  <div className="mt-6 space-y-2 rounded-lg border border-sky-200 bg-sky-50 px-5 py-4">
                    <p className="mb-1 text-[13px] font-semibold text-sky-800">核心要点</p>
                    {section.tips.map((tip, tipIdx) => (
                      <p key={tipIdx} className="pl-5 text-sm leading-6 text-sky-700">
                        <RichText text={tip} />
                      </p>
                    ))}
                  </div>
                )}

                {/* 注意事项卡片 */}
                {section.warnings && section.warnings.length > 0 && (
                  <div className="mt-6 space-y-2 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4">
                    <p className="mb-1 text-[13px] font-semibold text-amber-800">注意事项</p>
                    {section.warnings.map((warning, warningIdx) => (
                      <p key={warningIdx} className="text-sm text-amber-700 leading-6 pl-5">
                        <RichText text={warning} />
                      </p>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Claude Code 关联教程 */}
          {tutorial.id === 'claude-code' && (
            <div className="mx-8 mb-8 rounded-lg border border-border bg-muted/40 p-5">
              <h3 className="mb-2 text-sm font-semibold text-foreground">相关插件教程</h3>
              <p className="mb-3 text-sm text-muted-foreground">安装完 Claude Code 后，推荐安装 Obsidian 插件，在笔记中直接使用 AI：</p>
              <Link
                href="/app/claudian-obsidian"
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Claudian Obsidian 插件安装指南 &#8594;
              </Link>
            </div>
          )}

          {/* 相关教程推荐 */}
          {appTutorials.filter(t => t.id !== tutorial.id).length > 0 && (
            <div className="mx-8 mb-8 border-t border-border pt-6">
              <h3 className="mb-4 text-base font-semibold text-foreground">其他应用教程</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {appTutorials.filter(t => t.id !== tutorial.id).map((t) => (
                  <Link
                    key={t.id}
                    href={`/app/${t.id}`}
                    className="group rounded-lg border border-border bg-muted/40 p-4 transition-colors hover:border-foreground/30 hover:bg-card"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-foreground">{t.name}</h4>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        t.badge.type === 'warning' ? 'border border-amber-200 bg-amber-50 text-amber-700' :
                        t.badge.type === 'success' ? 'border border-emerald-200 bg-emerald-50 text-emerald-700' :
                        'border border-sky-200 bg-sky-50 text-sky-700'
                      }`}>
                        {t.badge.text}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{t.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* 右侧 On this page */}
        <OnThisPage sections={tutorial.sections} activeIdx={activeSection} />
      </div>

      <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground">
        <p>API知识站 - 适合初学者的 AI API 学习平台</p>
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
