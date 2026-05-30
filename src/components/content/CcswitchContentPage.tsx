'use client';

import { useCallback, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BeianLinks } from '@/components/layout/BeianLinks';
import { DetailBackNav } from '@/components/navigation/ReturnNavigation';
import { ArticleSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/structured-data';
import { appTutorials } from '@/lib/api-config';

const tutorial = appTutorials.find((item) => item.id === 'ccswitch');
const flatSteps = tutorial?.sections.flatMap((section) => section.steps || []) ?? [];
const ARTICLE_DATE_PUBLISHED = '2026-05-11';
const ARTICLE_DATE_MODIFIED = '2026-05-19';

function badgeClass(type: string) {
  if (type === 'warning') return 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300';
  if (type === 'success') return 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300';
  return 'border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300';
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1800);
    });
  }, [code]);

  return (
    <div className="my-3 overflow-hidden rounded-lg border border-border bg-muted/40">
      <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
        <span className="font-mono text-[11px] uppercase text-muted-foreground">code</span>
        <button
          type="button"
          onClick={copyCode}
          className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
        >
          {copied ? '已复制' : '复制'}
        </button>
      </div>
      <pre className="overflow-x-auto whitespace-pre px-4 py-3 font-mono text-[13px] leading-6 text-foreground">
        {code}
      </pre>
    </div>
  );
}

function OverviewItem({
  icon,
  label,
  children,
  tone = 'sky',
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
  tone?: 'sky' | 'emerald' | 'amber' | 'rose';
}) {
  const toneClass = {
    sky: 'text-sky-900 dark:text-sky-200 dark:text-sky-200',
    emerald: 'text-emerald-800 dark:text-emerald-200',
    amber: 'text-amber-800 dark:text-amber-200',
    rose: 'text-rose-800 dark:text-rose-200',
  }[tone];

  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-base">{icon}</span>
      <p className={`text-[15px] leading-7 ${toneClass}`}>
        <strong className="font-semibold text-current">{label}：</strong>
        {children}
      </p>
    </div>
  );
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|https?:\/\/[^\s，。；、？！）)]+)/g).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={index} className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">
              {part.slice(1, -1)}
            </code>
          );
        }

        if (part.startsWith('http://') || part.startsWith('https://')) {
          return (
            <Link key={index} href={part} target="_blank" rel="noopener noreferrer" className="font-medium text-sky-600 hover:underline dark:text-sky-300">
              {part.replace(/^https?:\/\//, '')}
            </Link>
          );
        }

        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

export function CcswitchContentPage() {
  if (!tutorial) return null;

  return (
    <div className="min-h-screen bg-background content-article">
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://www.apiuspro.cn' },
          { name: 'API应用', url: 'https://www.apiuspro.cn/app' },
          { name: tutorial.name, url: 'https://www.apiuspro.cn/app/ccswitch' },
        ]}
      />
      <ArticleSchema
        title="CC Switch 安装与多模型切换教程"
        description={tutorial.desc}
        url="https://www.apiuspro.cn/app/ccswitch"
        datePublished={ARTICLE_DATE_PUBLISHED}
        dateModified={ARTICLE_DATE_MODIFIED}
      />
      <HowToSchema
        name="CC Switch 安装与多模型切换教程"
        description={tutorial.desc}
        steps={tutorial.sections.flatMap((section, sectionIndex) =>
          (section.steps || []).map((step, stepIndex) => ({
            name: step.title,
            text: step.description || step.items?.join('；') || section.content,
            url: `https://www.apiuspro.cn/app/ccswitch#section-${sectionIndex}-${stepIndex}`,
          })),
        )}
        totalTime="PT15M"
        tool={['浏览器', '终端', 'CC Switch']}
      />

      <header className="border-b border-border bg-card sm:sticky sm:top-0 sm:z-50">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-y-2 px-4 py-3 sm:px-6">
          <DetailBackNav listHref="/app" listLabel="应用教程列表" className="mb-0" />
          <span className="mx-3 hidden text-border sm:inline">|</span>
          <span className="truncate text-sm font-semibold text-foreground">CC Switch</span>
          <div className="ml-auto">
            <Link
              href={tutorial.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-foreground px-4 py-1.5 text-[12px] font-semibold text-background transition-colors hover:bg-foreground/90"
            >
              访问官网
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[920px] border-x border-border bg-card">
        <section className="border-b border-border px-5 py-8 sm:px-10 sm:py-10 lg:px-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1 className="max-w-3xl text-[1.55rem] font-bold leading-[1.18] tracking-tight text-foreground sm:text-4xl sm:leading-tight">
                CC Switch 安装与多模型切换教程
              </h1>
              <p className="mt-4 text-base leading-8 text-muted-foreground sm:mt-5 sm:text-lg">
                用一个桌面工具统一管理 Claude Code、Codex、Gemini CLI、OpenCode 和 OpenClaw 的 API Key、Base URL 与模型配置。
              </p>
            </div>
            <span className={`w-fit shrink-0 rounded-full border px-4 py-2 text-center text-sm font-bold ${badgeClass(tutorial.badge.type)}`}>
              {tutorial.badge.text}
            </span>
          </div>

          <div className="mt-8 hidden rounded-xl border border-sky-200 bg-sky-50 dark:bg-sky-950/30 px-5 py-5 text-sky-900 dark:text-sky-200 sm:block">
            <p className="text-lg font-bold">BLUF 摘要</p>
            <p className="mt-3 text-lg leading-9">
              这篇教程用 {tutorial.sections.length} 个章节、{flatSteps.length} 个操作点说明如何安装 CC Switch，并把多个 AI 工具的供应商配置集中管理；最终成功标准是在真实 CLI 里发起一次模型调用并正常收到回复。
            </p>
          </div>

          <details className="mt-6 rounded-xl border border-sky-200 bg-sky-50 dark:bg-sky-950/30 text-sky-900 dark:text-sky-200 sm:hidden">
            <summary className="cursor-pointer select-none px-4 py-3 text-sm font-bold">
              BLUF 摘要（点开查看）
            </summary>
            <p className="border-t border-sky-200 px-4 py-4 text-sm leading-7">
              这篇教程用 {tutorial.sections.length} 个章节、{flatSteps.length} 个操作点说明如何安装 CC Switch，并把多个 AI 工具的供应商配置集中管理；最终成功标准是在真实 CLI 里发起一次模型调用并正常收到回复。
            </p>
          </details>

        </section>

        <section className="hidden border-b border-border px-5 py-8 sm:block sm:px-10 lg:px-12">
          <div className="rounded-xl border border-sky-200 bg-sky-50 px-5 py-5 dark:bg-slate-950/60 dark:border-sky-700/70">
            <p className="mb-4 text-base font-semibold text-sky-800 dark:text-sky-300">教程概览</p>
            <div className="space-y-4">
              <OverviewItem icon="⏱" label="预计耗时">约 10-15 分钟</OverviewItem>
              <OverviewItem icon="📦" label="准备材料">
                至少一个 API 平台账号、对应 API Key、Base URL、模型名称，以及已经安装或准备使用的 Claude Code / Codex / Gemini CLI 等工具。
              </OverviewItem>
              <OverviewItem icon="✅" label="成功标志" tone="emerald">
                保存供应商配置后，在真实 AI 工具里发起简单对话，模型能正常返回结果。
              </OverviewItem>
              <OverviewItem icon="⚠️" label="最容易卡住" tone="amber">
                选错工具标签、Base URL 路径写错、模型名和供应商文档不一致，或者旧终端进程仍读取旧配置。
              </OverviewItem>
              <OverviewItem icon="🔒" label="安全提醒" tone="rose">
                API Key 不要截图、不要写进公开仓库，也不要把包含密钥的配置文件同步到公开位置。
              </OverviewItem>
            </div>
          </div>
        </section>

        <section className="border-b border-border px-5 py-4 sm:hidden">
          <details className="rounded-xl border border-sky-200 bg-sky-50 dark:bg-slate-950/60 dark:border-sky-700/70">
            <summary className="cursor-pointer select-none px-4 py-3 text-sm font-bold text-sky-800 dark:text-sky-300">
              教程概览（点开查看）
            </summary>
            <div className="space-y-3 border-t border-sky-200 px-4 py-4 text-sm leading-7 dark:border-sky-800">
              <p className="text-sky-900 dark:text-sky-200"><strong>预计耗时：</strong>约 10-15 分钟</p>
              <p className="text-sky-900 dark:text-sky-200"><strong>准备材料：</strong>API 平台账号、API Key、Base URL、模型名称，以及要配置的 Claude Code / Codex / Gemini CLI 等工具。</p>
              <p className="text-emerald-800 dark:text-emerald-200"><strong>成功标志：</strong>真实 AI 工具里发起简单对话，模型能正常返回结果。</p>
              <p className="text-amber-800 dark:text-amber-200"><strong>最容易卡住：</strong>工具标签选错、Base URL 路径写错、模型名和供应商文档不一致。</p>
              <p className="text-rose-800 dark:text-rose-200"><strong>安全提醒：</strong>API Key 不要截图、不要写进公开仓库。</p>
            </div>
          </details>
        </section>

        <section className="border-b border-border px-5 py-5 sm:px-10 lg:px-12">
          <details>
            <summary className="cursor-pointer select-none rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm font-semibold text-foreground">
              教程步骤（{tutorial.sections.length} 章 / {flatSteps.length} 个操作点）
            </summary>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {tutorial.sections.map((section, index) => (
                <a
                  key={section.title}
                  href={`#section-${index}`}
                  className="rounded-lg border border-border bg-background/40 px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                  {index + 1}. {section.title}
                </a>
              ))}
            </div>
          </details>
        </section>

        <div className="space-y-10 px-5 py-8 sm:px-10 lg:px-12">
          {tutorial.sections.map((section, sectionIndex) => (
            <section
              key={section.title}
              id={`section-${sectionIndex}`}
              className={sectionIndex < tutorial.sections.length - 1 ? 'border-b border-border pb-10' : ''}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-base font-bold text-background">
                  {sectionIndex + 1}
                </span>
                <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">{section.title}</h2>
              </div>
              <p className="mb-6 text-[15px] leading-8 text-muted-foreground">
                <RichText text={section.content} />
              </p>

              <div className="space-y-7">
                {section.steps?.map((step, stepIndex) => (
                  <article key={step.title} id={`section-${sectionIndex}-${stepIndex}`} className="rounded-xl border border-border bg-background/35 p-4 sm:p-5">
                    <h3 className="text-lg font-semibold text-foreground">
                      {sectionIndex + 1}.{stepIndex + 1} {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      <RichText text={step.description} />
                    </p>

                    {step.code && <CodeBlock code={step.code} />}

                    {step.image && (
                      <div className="mt-4 overflow-hidden rounded-lg border border-border bg-muted/40">
                        <Image
                          src={step.image}
                          alt={step.title}
                          width={1200}
                          height={800}
                          className="h-auto w-full object-contain"
                          loading="lazy"
                          sizes="(min-width: 920px) 820px, calc(100vw - 2rem)"
                        />
                      </div>
                    )}

                    {step.items && step.items.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {step.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
                            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                            <span><RichText text={item} /></span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {step.warning && (
                      <div className="mt-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-sm leading-6 text-amber-800 dark:text-amber-200">
                        ⚠️ {step.warning}
                      </div>
                    )}
                  </article>
                ))}
              </div>

              {section.tips && section.tips.length > 0 && (
                <div className="mt-6 rounded-lg border border-sky-200 bg-sky-50 dark:bg-sky-950/30 px-5 py-4">
                  <p className="mb-2 text-sm font-semibold text-sky-800 dark:text-sky-200">核心要点</p>
                  <ul className="space-y-2">
                    {section.tips.map((tip) => (
                      <li key={tip} className="text-sm leading-6 text-sky-700 dark:text-sky-300">
                        <RichText text={tip} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {section.warnings && section.warnings.length > 0 && (
                <div className="mt-6 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-5 py-4">
                  <p className="mb-2 text-sm font-semibold text-amber-800 dark:text-amber-200">注意事项</p>
                  <ul className="space-y-2">
                    {section.warnings.map((warning) => (
                      <li key={warning} className="text-sm leading-6 text-amber-700 dark:text-amber-300">
                        <RichText text={warning} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>

        <section className="border-t border-border px-5 py-6 sm:px-10 lg:px-12">
          <p className="mb-3 text-sm font-semibold text-muted-foreground">关键词</p>
          <div className="flex flex-wrap gap-2">
            {['多工具配置', 'API Key', 'Base URL', '模型切换'].map((tag) => (
              <span key={tag} className="rounded-full border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                {tag}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground">
        <p>API知识站 - 适合初学者的 AI API 学习平台</p>
        <div className="mt-3">
          <BeianLinks />
        </div>
      </footer>
    </div>
  );
}
