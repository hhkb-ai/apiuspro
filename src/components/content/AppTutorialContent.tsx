'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { appTutorials } from '@/lib/api-config';
import { DetailBackNav } from '@/components/navigation/ReturnNavigation';
import { CcswitchContentPage } from '@/components/content/CcswitchContentPage';
import { OpenclawFeishuContentPage } from '@/components/content/OpenclawFeishuContentPage';

const URL_PATTERN = /(`[^`]+`|【[^】]+】|https?:\/\/[^\s<>"'，。；、？！）)】]+)/g;
const HIGHLIGHT_TERMS = [
  { text: 'Base URL 不匹配', className: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200' },
  { text: 'invalid_api_key', className: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200' },
  { text: 'Base URL', className: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200' },
  { text: 'API Key', className: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200' },
  { text: 'Key 写错', className: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200' },
  { text: '模型名称', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200' },
  { text: '计费方式', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200' },
  { text: '余额', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200' },
  { text: '额度', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200' },
  { text: '429', className: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200' },
  { text: '401', className: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200' },
];
const HIGHLIGHT_PATTERN = new RegExp(`(${HIGHLIGHT_TERMS.map(({ text }) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
const HIGHLIGHT_CLASS_BY_TERM = new Map(HIGHLIGHT_TERMS.map(({ text, className }) => [text.toLowerCase(), className]));

function isApiEndpointUrl(value: string) {
  try {
    const url = new URL(value);
    return !['apiuspro.cn', 'www.apiuspro.cn'].includes(url.hostname) && (
      url.hostname.startsWith('api.') ||
      url.pathname.startsWith('/v1') ||
      url.pathname.includes('/api/') ||
      url.pathname.includes('/compatible-mode/')
    );
  } catch {
    return false;
  }
}

function renderHighlightedText(text: string, keyPrefix: string) {
  return text.split(HIGHLIGHT_PATTERN).filter(Boolean).map((part, index) => {
    const className = HIGHLIGHT_CLASS_BY_TERM.get(part.toLowerCase());
    if (!className) return <span key={`${keyPrefix}-${index}`}>{part}</span>;

    return (
      <mark
        key={`${keyPrefix}-${index}`}
        className={`rounded-md border px-1.5 py-0.5 font-semibold box-decoration-clone break-words ${className}`}
      >
        {part}
      </mark>
    );
  });
}

/* ─── RichText: 解析 `code` 【重点】 标记 ─── */
function RichText({ text, className = '', highlightKeywords = false }: { text: string; className?: string; highlightKeywords?: boolean }) {
  if (!text) return null;
  const parts = text.split(URL_PATTERN).filter(Boolean);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (!part) return null;
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground break-all">
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
        if (part.startsWith('http://') || part.startsWith('https://')) {
          if (isApiEndpointUrl(part)) {
            return (
              <code key={i} className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground break-all">
                {part}
              </code>
            );
          }

          return (
            <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-full flex-wrap items-center gap-1.5 break-all rounded-md bg-foreground/10 px-2.5 py-1 text-sm font-medium text-foreground transition-colors hover:bg-foreground/20">
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {part.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </a>
          );
        }
        return <span key={i}>{highlightKeywords ? renderHighlightedText(part, `highlight-${i}`) : part}</span>;
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
      return <span className="text-muted-foreground">{remaining}</span>;
    }

    // 简单模式匹配
    const patterns = [
      { regex: /(https?:\/\/[^\s]+)/g, className: 'text-blue-600 dark:text-blue-400 underline' },
      { regex: /(~?\/[^\s]*)/g, className: 'text-teal-700 dark:text-teal-400' },
      { regex: /\b(sudo|npm|npx|pip|git|curl|chmod|mkdir|cd|export|source|echo|cat|brew|node|python|claude|llm-wiki)\b/g, className: 'text-purple-700 dark:text-purple-400 font-semibold' },
      { regex: /(--[\w-]+)/g, className: 'text-cyan-700 dark:text-cyan-400' },
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
    <div className="group relative my-3 max-w-full overflow-hidden rounded-lg border border-border bg-muted/40">
      {/* 顶部标签栏 */}
      <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-1.5">
        <span className="font-mono text-[11px] uppercase text-muted-foreground">{lang}</span>
        <button
          onClick={handleCopy}
          className="flex h-8 items-center gap-1 px-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {copied ? '✓ 已复制' : '复制'}
        </button>
      </div>
      {/* 代码内容 */}
      <pre className="max-w-full overflow-x-auto whitespace-pre px-4 py-3 font-mono text-[13px] leading-6 text-foreground">
        {code.split('\n').map((line, i) => (
          <div key={i}>{line ? highlight(line) : ' '}</div>
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

const setupChecklist = [
  '确认工具读取的是哪个配置文件，避免改错项目目录或用户目录',
  '准备 API Key、Base URL、模型名称和计费平台登录方式',
  '先用测试模型跑通一次简单对话，再切换到更贵或更强的模型',
  '把 API Key 放在环境变量或工具密钥管理里，不要写进公开仓库',
];

const troubleshootingTips = [
  '401/403：优先检查 API Key 是否复制完整、是否过期、是否有调用权限',
  '404/模型不存在：检查模型名、Base URL、供应商兼容接口路径是否匹配',
  '429：降低并发，开启重试退避，或升级额度与限速套餐',
  '超时：先切换更快模型或国内直连 API，再缩短输入上下文测试',
];

const codexSetupChecklist = [
  '确认 Node.js、npm、Git 和终端 PATH 都能正常输出版本号',
  '准备可登录的 OpenAI / ChatGPT 账号，或确认 API Key 项目和额度可用',
  '先在测试目录或新分支启动 Codex，不要直接让它改生产项目',
  '把 AGENTS.md、禁止事项和验证命令写清楚，再交给 Codex 执行任务',
];

const codexTroubleshootingTips = [
  '安装失败：先查 npm 网络、权限和 Node.js LTS 版本，不要换来源不明脚本',
  '命令不存在：检查 npm 全局 bin 是否加入 PATH，修改后重新打开终端',
  '登录失败：确认账号、项目权限、额度和网络，不要把 API Key 写进项目文件',
  '改错范围：回到正确目录，先看 git diff，再要求 Codex 只按计划修改',
];

interface AppTutorialContentProps {
  id: string;
}

/* ─── 主页面 ─── */
export function AppTutorialContent({ id }: AppTutorialContentProps) {
  const tutorial = appTutorials.find((t) => t.id === id);
  const [activeSection, setActiveSection] = useState(0);

  // Scroll spy
  useEffect(() => {
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
  }, [tutorial]);

  // 特殊路由：使用独立的 client 组件
  if (id === 'ccswitch') return <CcswitchContentPage />;
  if (id === 'openclaw-feishu') return <OpenclawFeishuContentPage />;
  if (!tutorial) return null;

  const isCodexTutorial = tutorial.id === 'codex';
  const blufSummary = isCodexTutorial
    ? '这篇教程解决 Codex 从安装到真实项目使用的问题，包含 CLI、IDE、云端任务、AGENTS.md、安全权限和排错流程；最终成功标准是能在正确项目目录启动 Codex，并让它按边界完成可验证的小任务。'
    : `这篇教程说明如何配置 ${tutorial.name}，重点是先准备 API Key、Base URL 和模型名称，再按章节完成安装、配置、验证与排错。`;
  const currentSetupChecklist = isCodexTutorial ? codexSetupChecklist : setupChecklist;
  const currentTroubleshootingTips = isCodexTutorial ? codexTroubleshootingTips : troubleshootingTips;

  return (
    <>
      {/* ── 顶部导航栏 ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex flex-wrap items-center gap-y-2">
          <DetailBackNav listHref="/app" listLabel="应用教程列表" className="mb-0" />
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
                tutorial.badge.type === 'warning' ? 'border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300' :
                tutorial.badge.type === 'success' ? 'border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300' :
                'border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300'
              }`}>
                {tutorial.badge.text}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{tutorial.desc}</p>
            <section className="mt-5 hidden rounded-lg border border-sky-200 bg-sky-50 dark:border-sky-800 dark:bg-sky-950/30 px-4 py-3 text-sm leading-6 text-sky-900 dark:text-sky-200 sm:block">
              <p className="font-semibold">BLUF 摘要</p>
              <p className="mt-1">
                <RichText text={blufSummary} highlightKeywords={isCodexTutorial} />
              </p>
            </section>
            <details className="mt-5 rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-900 dark:text-sky-200 sm:hidden">
              <summary className="cursor-pointer select-none px-4 py-3 text-sm font-bold">BLUF 摘要（点开查看）</summary>
              <p className="border-t border-sky-200 dark:border-sky-800 px-4 py-3 text-sm leading-7">
                <RichText text={blufSummary} highlightKeywords={isCodexTutorial} />
              </p>
            </details>
          </div>

          <section className="mx-5 mt-6 grid gap-4 sm:mx-8 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-muted/40 p-5">
              <h2 className="text-sm font-semibold text-foreground">配置前检查</h2>
              <ul className="mt-3 space-y-2">
                {currentSetupChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                    <span className="min-w-0 break-words">
                      <RichText text={item} highlightKeywords={isCodexTutorial} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-5">
              <h2 className="text-sm font-semibold text-foreground">常见排错</h2>
              <ul className="mt-3 space-y-2">
                {currentTroubleshootingTips.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                    <span className="min-w-0 break-words">
                      <RichText text={item} highlightKeywords={isCodexTutorial} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

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
          <div className="space-y-10 px-5 py-6 sm:px-8">
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
                  <RichText text={section.content} highlightKeywords={isCodexTutorial} />
                </div>

                {/* 步骤列表 */}
                <div className="space-y-6">
                  {section.steps?.map((step, stepIdx) => (
                    <div key={stepIdx} id={`section-${sectionIdx}-${stepIdx}`} className="scroll-mt-[68px]">
                      {/* 步骤标题 */}
                      <h3 className="mb-2 flex items-center gap-2 text-[15px] font-semibold text-foreground">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                        {step.title}
                      </h3>

                      {/* 步骤描述 */}
                      {step.description && (
                        <p className="mb-3 pl-4 text-sm leading-6 text-muted-foreground max-sm:pl-0">
                          <RichText text={step.description} highlightKeywords={isCodexTutorial} />
                        </p>
                      )}

                      {/* 代码块 */}
                      {step.code && (
                        <div className="min-w-0 pl-4 max-sm:pl-0">
                          <CodeBlock code={step.code} />
                        </div>
                      )}

                      {/* 图片展示 */}
                      {step.image && (
                        <div className="my-3 min-w-0 pl-4 max-sm:pl-0">
                          <div className="overflow-hidden rounded-lg border border-border bg-muted/40">
                            <Image
                              src={step.image}
                              alt={step.title}
                              width={1200}
                              height={1553}
                              className="h-auto max-h-[760px] w-full object-contain"
                              loading="lazy"
                              sizes="(min-width: 1280px) 760px, (min-width: 768px) calc(100vw - 18rem), calc(100vw - 2rem)"
                            />
                          </div>
                        </div>
                      )}

                      {/* 要点列表 */}
                      {step.items && step.items.length > 0 && (
                        <ul className="space-y-2 mb-2 pl-4 max-sm:pl-0">
                          {step.items.map((item, itemIdx) => {
                            const colonIndexes = [item.indexOf('：'), item.indexOf(':')].filter(index => index > 0);
                            const colonIdx = colonIndexes.length > 0 ? Math.min(...colonIndexes) : -1;
                            const hasColon = colonIdx > 0 && colonIdx < 20;

                            return (
                              <li key={itemIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                                <span className="min-w-0 break-words leading-6">
                                  {hasColon ? (
                                    <>
                                      <strong className="font-semibold text-foreground">{item.substring(0, colonIdx + 1)}</strong>
                                      <RichText text={item.substring(colonIdx + 1)} highlightKeywords={isCodexTutorial} />
                                    </>
                                  ) : (
                                    <RichText text={item} highlightKeywords={isCodexTutorial} />
                                  )}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {/* 警告 */}
                      {step.warning && (
                        <div className="my-3 pl-4 max-sm:pl-0">
                          <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-sm leading-6 text-amber-800 dark:text-amber-200">
                            &#9888; <RichText text={step.warning} highlightKeywords={isCodexTutorial} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* 核心要点卡片 */}
                {section.tips && section.tips.length > 0 && (
                  <div className="mt-6 space-y-2 rounded-lg border border-sky-200 bg-sky-50 dark:bg-sky-950/30 px-5 py-4">
                    <p className="mb-1 text-[13px] font-semibold text-sky-800 dark:text-sky-200">核心要点</p>
                    {section.tips.map((tip, tipIdx) => (
                    <p key={tipIdx} className="pl-5 text-sm leading-6 text-sky-700 dark:text-sky-300">
                        <RichText text={tip} highlightKeywords={isCodexTutorial} />
                      </p>
                    ))}
                  </div>
                )}

                {/* 注意事项卡片 */}
                {section.warnings && section.warnings.length > 0 && (
                  <div className="mt-6 space-y-2 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-5 py-4">
                    <p className="mb-1 text-[13px] font-semibold text-amber-800 dark:text-amber-200">注意事项</p>
                    {section.warnings.map((warning, warningIdx) => (
                      <p key={warningIdx} className="text-sm text-amber-700 dark:text-amber-300 leading-6 pl-5">
                        <RichText text={warning} highlightKeywords={isCodexTutorial} />
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
                        t.badge.type === 'warning' ? 'border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300' :
                        t.badge.type === 'success' ? 'border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300' :
                        'border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300'
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
    </>
  );
}
