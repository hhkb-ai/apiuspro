'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { appTutorials } from '@/lib/api-config';

/* ─── RichText: 解析 `code` 【重点】 标记 ─── */
function RichText({ text, className = '' }: { text: string; className?: string }) {
  const parts = text.split(/(`[^`]+`|【[^】]+】)/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-[13px] font-mono border border-slate-200">
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith('【') && part.endsWith('】')) {
          return (
            <strong key={i} className="font-bold text-orange-700 bg-orange-50 px-1 rounded">
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
      return <span className="text-slate-400 italic">{remaining}</span>;
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
    <div className="relative group my-3 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
      {/* 顶部标签栏 */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-100 border-b border-slate-200">
        <span className="text-[11px] font-mono text-slate-500 uppercase">{lang}</span>
        <button
          onClick={handleCopy}
          className="text-[11px] text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1"
        >
          {copied ? '✓ 已复制' : '复制'}
        </button>
      </div>
      {/* 代码内容 */}
      <pre className="px-4 py-3 text-[13px] leading-6 overflow-x-auto whitespace-pre font-mono text-slate-800">
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
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">指南</p>
        <nav className="space-y-0.5">
          {appTutorials.map((t) => (
            <Link
              key={t.id}
              href={`/app/${t.id}`}
              className={`block text-[13px] px-3 py-2 rounded-md transition-colors truncate ${
                t.id === tutorialId
                  ? 'bg-orange-50 text-orange-700 font-semibold border-l-2 border-orange-500'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t.icon} {t.name}
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
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">On this page</p>
        <nav className="space-y-0.5 border-l border-slate-200">
          {sections.map((s, i) => (
            <a
              key={i}
              href={`#section-${i}`}
              className={`block text-[12px] py-1.5 pl-3 transition-colors truncate ${
                i === activeIdx
                  ? 'text-orange-600 font-semibold border-l-2 border-orange-500 -ml-px'
                  : 'text-slate-500 hover:text-slate-800'
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
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* ── 顶部导航栏 ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center">
          <Link href="/#app-section" className="text-sm text-slate-500 hover:text-slate-800 transition-colors">
            &#8592; 返回首页
          </Link>
          <span className="mx-3 text-slate-300">|</span>
          <span className="text-sm font-semibold text-slate-800 truncate">{tutorial.icon} {tutorial.name}</span>
          <div className="ml-auto">
            <a
              href={tutorial.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-semibold text-white bg-orange-500 hover:bg-orange-600 px-4 py-1.5 rounded-md transition-colors"
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
        <main className="flex-1 min-w-0 bg-white rounded-xl border border-slate-200 shadow-sm">
          {/* 文档头部 */}
          <div className="px-8 pt-8 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{tutorial.icon}</span>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{tutorial.name}</h1>
              </div>
              <span className={`ml-2 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                tutorial.badge.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                tutorial.badge.type === 'success' ? 'bg-green-100 text-green-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {tutorial.badge.text}
              </span>
            </div>
            <p className="text-slate-500 text-sm">{tutorial.desc}</p>
          </div>

          {/* 移动端目录 - 折叠式 */}
          <div className="xl:hidden mx-8 mt-6 border border-slate-200 rounded-lg overflow-hidden">
            <details>
              <summary className="px-4 py-2.5 bg-slate-50 cursor-pointer text-sm font-semibold text-slate-700 select-none">
                目录（{tutorial.sections.length} 章）
              </summary>
              <div className="px-4 py-2 space-y-0.5 border-t border-slate-100">
                {tutorial.sections.map((s, i) => (
                  <a key={i} href={`#section-${i}`} className="block text-[13px] py-1.5 text-slate-500 hover:text-orange-600">
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
                className={sectionIdx < tutorial.sections.length - 1 ? 'pb-10 border-b border-slate-100' : ''}
              >
                {/* 章节标题：编号 + 文字 */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex items-center justify-center w-7 h-7 bg-orange-500 text-white rounded-full text-sm font-bold shrink-0">
                    {sectionIdx + 1}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                </div>

                {/* 章节概述 */}
                <div className="mb-5 text-[15px] text-slate-600 leading-7">
                  <RichText text={section.content} />
                </div>

                {/* 步骤列表 */}
                <div className="space-y-6">
                  {section.steps?.map((step, stepIdx) => (
                    <div key={stepIdx}>
                      {/* 步骤标题 */}
                      <h3 className="font-bold text-[15px] text-slate-800 mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full shrink-0" />
                        {step.title}
                      </h3>

                      {/* 步骤描述 */}
                      {step.description && (
                        <p className="text-sm text-slate-600 leading-6 mb-3 pl-4">
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
                          <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                            <img
                              src={step.image}
                              alt={step.title}
                              className="w-full h-auto"
                              loading="lazy"
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
                              <li key={itemIdx} className="text-sm flex items-start gap-2 text-slate-600">
                                <span className="mt-2 shrink-0 w-1 h-1 bg-slate-300 rounded-full" />
                                <span className="leading-6">
                                  {hasColon ? (
                                    <>
                                      <strong className="font-semibold text-slate-800">{item.substring(0, colonIdx + 1)}</strong>
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
                          <div className="bg-amber-50 border-l-3 border-amber-400 rounded-r-lg px-4 py-3 text-sm text-amber-800 leading-6">
                            &#9888; {step.warning}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* 核心要点卡片 */}
                {section.tips && section.tips.length > 0 && (
                  <div className="mt-6 bg-blue-50 border-l-3 border-blue-400 rounded-r-lg px-5 py-4 space-y-2">
                    <p className="font-semibold text-[13px] text-blue-800 flex items-center gap-1.5 mb-1">
                      <span>&#128161;</span> 核心要点
                    </p>
                    {section.tips.map((tip, tipIdx) => (
                      <p key={tipIdx} className="text-sm text-blue-700 leading-6 pl-5">
                        <RichText text={tip} />
                      </p>
                    ))}
                  </div>
                )}

                {/* 注意事项卡片 */}
                {section.warnings && section.warnings.length > 0 && (
                  <div className="mt-6 bg-amber-50 border-l-3 border-amber-400 rounded-r-lg px-5 py-4 space-y-2">
                    <p className="font-semibold text-[13px] text-amber-800 flex items-center gap-1.5 mb-1">
                      <span>&#9888;</span> 注意事项
                    </p>
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
            <div className="mx-8 mb-8 p-5 bg-orange-50 rounded-xl border border-orange-200">
              <h3 className="font-bold text-sm text-orange-900 mb-2">相关插件教程</h3>
              <p className="text-sm text-orange-700 mb-3">安装完 Claude Code 后，推荐安装 Obsidian 插件，在笔记中直接使用 AI：</p>
              <Link
                href="/app/claudian-obsidian"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
              >
                Claudian Obsidian 插件安装指南 &#8594;
              </Link>
            </div>
          )}

          {/* 相关教程推荐 */}
          {appTutorials.filter(t => t.id !== tutorial.id).length > 0 && (
            <div className="mx-8 mb-8 pt-6 border-t border-slate-100">
              <h3 className="font-bold text-base text-slate-800 mb-4">其他应用教程</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {appTutorials.filter(t => t.id !== tutorial.id).map((t) => (
                  <Link
                    key={t.id}
                    href={`/app/${t.id}`}
                    className="bg-slate-50 rounded-lg p-4 hover:bg-orange-50 hover:border-orange-200 border border-slate-200 transition-colors group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{t.icon}</span>
                      <h4 className="font-bold text-sm text-slate-800 group-hover:text-orange-700">{t.name}</h4>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        t.badge.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                        t.badge.type === 'success' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {t.badge.text}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{t.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* 右侧 On this page */}
        <OnThisPage sections={tutorial.sections} activeIdx={activeSection} />
      </div>
    </div>
  );
}
