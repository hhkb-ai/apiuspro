'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BeianLinks } from '@/components/layout/BeianLinks';
import { DetailBackNav } from '@/components/navigation/ReturnNavigation';
import { appTutorials, type AppTutorial } from '@/lib/api-config';

const tutorial = appTutorials.find((item) => item.id === 'openclaw-feishu') as AppTutorial;
const flatSteps = tutorial.sections.flatMap((section) => section.steps || []);

function badgeClass(type: string) {
  if (type === 'warning') return 'border-amber-200 bg-amber-50 text-amber-700';
  if (type === 'success') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  return 'border-sky-200 bg-sky-50 text-sky-700';
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
    sky: 'text-sky-200',
    emerald: 'text-emerald-200',
    amber: 'text-amber-200',
    rose: 'text-rose-200',
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
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-y-2 px-6 py-3">
          <DetailBackNav listHref="/app" listLabel="应用教程列表" className="mb-0" />
          <span className="mx-3 text-border">|</span>
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
        <section className="border-b border-border px-6 py-10 sm:px-10 lg:px-12">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                OpenClaw 接入飞书机器人教程
              </h1>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                从创建飞书自建应用、开通机器人权限、安装 Feishu 插件到启动 Gateway 测试消息的完整流程。
              </p>
            </div>
            <span className={`shrink-0 rounded-full border px-4 py-3 text-center text-sm font-bold ${badgeClass(tutorial.badge.type)}`}>
              {tutorial.badge.text}
            </span>
          </div>

          <div className="mt-8 rounded-xl border border-sky-200 bg-sky-50 px-5 py-5 text-sky-900">
            <p className="text-lg font-bold">BLUF 摘要</p>
            <p className="mt-3 text-lg leading-9">
              这篇教程用 {flatSteps.length} 个操作点说明 OpenClaw 如何接入飞书：先在飞书开放平台完成应用、机器人、权限和事件配置，再安装 Feishu 插件、写入 App ID / App Secret，最后启动 gateway 并完成配对授权。
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {['飞书机器人', 'App ID / Secret', 'OpenClaw Gateway', '配对授权'].map((tag) => (
              <span key={tag} className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                ✓ {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="border-b border-border px-6 py-8 sm:px-10 lg:px-12">
          <div className="rounded-xl border border-sky-700/70 bg-slate-950/60 px-5 py-5">
            <p className="mb-4 text-base font-semibold text-sky-300">教程概览</p>
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

        <section className="border-b border-border px-6 py-5 sm:px-10 lg:px-12">
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

        <div className="space-y-10 px-6 py-8 sm:px-10 lg:px-12">
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
                <h2 className="text-2xl font-bold tracking-tight text-foreground">{section.title}</h2>
              </div>
              <p className="mb-6 text-[15px] leading-8 text-muted-foreground">{section.content}</p>

              <div className="space-y-7">
                {section.steps?.map((step, stepIndex) => (
                  <article key={step.title} className="rounded-xl border border-border bg-background/35 p-4 sm:p-5">
                    <h3 className="text-lg font-semibold text-foreground">
                      {sectionIndex + 1}.{stepIndex + 1} {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p>

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
                          <li key={item} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
                            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {step.warning && (
                      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
                        ⚠️ {step.warning}
                      </div>
                    )}
                  </article>
                ))}
              </div>

              {section.tips && section.tips.length > 0 && (
                <div className="mt-6 rounded-lg border border-sky-200 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-sm font-semibold text-sky-800">核心要点</p>
                  <ul className="space-y-2">
                    {section.tips.map((tip) => (
                      <li key={tip} className="text-sm leading-6 text-sky-700">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>
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
