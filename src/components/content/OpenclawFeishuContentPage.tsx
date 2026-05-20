'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BeianLinks } from '@/components/layout/BeianLinks';
import { DetailBackNav } from '@/components/navigation/ReturnNavigation';
import { appTutorials, type AppTutorial } from '@/lib/api-config';

const tutorial = appTutorials.find((item) => item.id === 'openclaw-feishu') as AppTutorial;
const flatSteps = tutorial.sections.flatMap((section) => section.steps || []);

function badgeClass(type: string) {
  if (type === 'warning') return 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300';
  if (type === 'success') return 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300';
  return 'border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300';
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="my-3 overflow-x-auto rounded-lg border border-border bg-muted/50 px-4 py-3 font-mono text-[13px] leading-6 text-foreground">
      {code}
    </pre>
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
    sky: 'text-sky-900 dark:text-sky-200',
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

export function OpenclawFeishuContentPage() {
  return (
    <div className="min-h-screen bg-background content-article">
      <header className="border-b border-border bg-card sm:sticky sm:top-0 sm:z-50">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-y-2 px-4 py-3 sm:px-6">
          <DetailBackNav listHref="/app" listLabel="应用教程列表" className="mb-0" />
          <span className="mx-3 hidden text-border sm:inline">|</span>
          <span className="truncate text-sm font-semibold text-foreground">{tutorial.name}</span>
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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="min-w-0">
              <h1 className="max-w-3xl text-[1.55rem] font-bold leading-[1.18] tracking-tight text-foreground sm:text-4xl sm:leading-tight">
                OpenClaw 接入飞书机器人教程
              </h1>
              <p className="mt-4 text-base leading-8 text-foreground/85 sm:mt-5 sm:text-lg">
                从创建飞书自建应用、开通机器人权限、安装 Feishu 插件到启动 Gateway 测试消息的完整流程。
              </p>
            </div>
            <span className={`w-fit shrink-0 rounded-full border px-4 py-2 text-center text-sm font-bold ${badgeClass(tutorial.badge.type)}`}>
              {tutorial.badge.text}
            </span>
          </div>

          <div className="mt-8 hidden rounded-xl border border-sky-200 bg-sky-50 dark:bg-sky-950/30 px-5 py-5 text-sky-900 dark:text-sky-200 sm:block">
            <p className="text-lg font-bold">BLUF 摘要</p>
            <p className="mt-3 text-lg leading-9">
              这篇教程用 {flatSteps.length} 个操作点说明 OpenClaw 如何接入飞书：先在飞书开放平台完成应用、机器人、权限和事件配置，再安装 Feishu 插件、写入 App ID / App Secret，最后启动 gateway 并完成配对授权。
            </p>
          </div>

          <details className="mt-6 rounded-xl border border-sky-200 bg-sky-50 dark:bg-sky-950/30 text-sky-900 dark:text-sky-200 sm:hidden">
            <summary className="cursor-pointer select-none px-4 py-3 text-sm font-bold">
              BLUF 摘要（点开查看）
            </summary>
            <p className="border-t border-sky-200 px-4 py-4 text-sm leading-7">
              这篇教程用 {flatSteps.length} 个操作点说明 OpenClaw 如何接入飞书机器人：先完成飞书应用、机器人、权限和事件配置，再安装插件、写入 App ID / App Secret，最后启动 gateway 并完成配对授权。
            </p>
          </details>
        </section>

        <section className="hidden border-b border-border px-5 py-8 sm:block sm:px-10 lg:px-12">
          <div className="rounded-xl border border-sky-200 bg-sky-50 px-5 py-5 dark:bg-slate-950/60 dark:border-sky-700/70">
            <p className="mb-4 text-base font-semibold text-sky-800 dark:text-sky-300">教程概览</p>
            <div className="space-y-4">
              <OverviewItem icon="⏱" label="预计耗时">约 30-45 分钟</OverviewItem>
              <OverviewItem icon="📦" label="准备材料">
                飞书企业或开发者账号、OpenClaw 已安装环境、可保存的 App ID 和 App Secret、可持续运行的终端或 WSL。
              </OverviewItem>
              <OverviewItem icon="✅" label="成功标志" tone="emerald">
                飞书机器人返回配对码，终端执行 approve 后机器人能正常回复消息。
              </OverviewItem>
              <OverviewItem icon="⚠️" label="最容易卡住" tone="amber">
                机器人保存前没有先运行长连接；应用身份权限、用户权限或接收消息事件漏开；App Secret 复制错误。
              </OverviewItem>
              <OverviewItem icon="🔒" label="安全提醒" tone="rose">
                App Secret 和 OpenClaw 配置都属于敏感信息，不要发到公开文档、截图、聊天记录或代码仓库。
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
              <p className="text-sky-900 dark:text-sky-200"><strong>预计耗时：</strong>约 30-45 分钟</p>
              <p className="text-sky-900 dark:text-sky-200"><strong>准备材料：</strong>飞书账号、OpenClaw 环境、App ID 和 App Secret、可持续运行的终端或 WSL。</p>
              <p className="text-emerald-800 dark:text-emerald-200"><strong>成功标志：</strong>机器人返回配对码，执行 approve 后能正常回复消息。</p>
              <p className="text-amber-800 dark:text-amber-200"><strong>最容易卡住：</strong>权限、事件订阅或 App Secret 填错。</p>
              <p className="text-rose-800 dark:text-rose-200"><strong>安全提醒：</strong>App Secret 和配置不要发到公开文档、截图或仓库。</p>
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
              <p className="mb-6 text-[15px] leading-8 text-foreground/85">{section.content}</p>

              <div className="space-y-7">
                {section.steps?.map((step, stepIndex) => (
                  <article key={step.title} className="rounded-xl border border-border bg-background/35 p-4 sm:p-5">
                    <h3 className="text-lg font-semibold text-foreground">
                      {sectionIndex + 1}.{stepIndex + 1} {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-foreground/85">{step.description}</p>

                    {step.code && <CodeBlock code={step.code} />}

                    {step.image && (
                      <div className="mt-4 overflow-hidden rounded-lg border border-border bg-muted/30">
                        <Image
                          src={step.image}
                          alt={step.title}
                          width={1200}
                          height={1553}
                          className="h-auto max-h-[760px] w-full object-contain"
                          loading="lazy"
                          sizes="(min-width: 1024px) 760px, calc(100vw - 3rem)"
                        />
                      </div>
                    )}

                    {step.items && step.items.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {step.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm leading-7 text-foreground/85">
                            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/50" />
                            <span>{item}</span>
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
                <div className="mt-6 rounded-lg border border-sky-200 bg-sky-50 dark:border-sky-800 dark:bg-sky-950/30 px-5 py-4">
                  <p className="mb-2 text-sm font-semibold text-sky-800 dark:text-sky-300">核心要点</p>
                  <ul className="space-y-2">
                    {section.tips.map((tip) => (
                      <li key={tip} className="text-sm leading-6 text-sky-700 dark:text-sky-200">
                        {tip}
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
            {['飞书机器人', 'App Secret', 'OpenClaw Gateway', '配对授权'].map((tag) => (
              <span key={tag} className="rounded-full border border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
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
