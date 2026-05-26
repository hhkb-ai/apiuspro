import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BeianLinks } from '@/components/layout/BeianLinks';
import { apiList, getAPIById, SHOW_PROXY_CONTENT, type APIConfig } from '@/lib/api-config';
import { BreadcrumbSchema, HowToSchema, TechArticleSchema } from '@/components/seo/structured-data';
import { CodeBlock } from '@/components/tutorial/CodeBlock';
import { DetailBackNav } from '@/components/navigation/ReturnNavigation';
import { generateMetadata as generateTdkMetadata } from '@/lib/tdk';

const ARTICLE_DATE_PUBLISHED = '2026-05-11';
const ARTICLE_DATE_MODIFIED = '2026-05-11';

const URL_PATTERN = /(https?:\/\/[^\s<>"'，。；、？！）)】]+)/g;
const HIGHLIGHT_TERMS = [
  { text: 'Create API Key', className: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200' },
  { text: 'Generate New Token', className: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200' },
  { text: 'DEEPSEEK_API_KEY', className: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200' },
  { text: 'OpenAI SDK', className: 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-200' },
  { text: 'API Keys', className: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200' },
  { text: 'API Key', className: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200' },
  { text: 'Bearer Token', className: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200' },
  { text: 'Base URL', className: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200' },
  { text: 'DeepSeek', className: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-200' },
  { text: 'deepseek-v4-flash', className: 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-200' },
  { text: 'deepseek-v4-pro', className: 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-200' },
  { text: '模型名称', className: 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-200' },
  { text: '实名认证', className: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200' },
  { text: '支付宝/微信', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200' },
  { text: '支付宝', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200' },
  { text: '微信', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200' },
  { text: '充值', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200' },
  { text: '余额', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200' },
  { text: '额度', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200' },
  { text: '控制台', className: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200' },
  { text: '401', className: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200' },
  { text: '429', className: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200' },
  { text: '免费额度', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200' },
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

// 将文本中的 URL 转换为可点击链接，并对重点词做高亮
function LinkText({ text, highlightKeywords = true }: { text: string; highlightKeywords?: boolean }) {
  const parts = text.split(URL_PATTERN).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('http://') || part.startsWith('https://')) {
          if (isApiEndpointUrl(part)) {
            return (
              <code key={i} className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">
                {part}
              </code>
            );
          }

          return (
            <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-foreground/10 px-2.5 py-1 text-sm font-medium text-foreground transition-colors hover:bg-foreground/20">
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {part.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </a>
          );
        }
        return <span key={i}>{highlightKeywords ? renderHighlightedText(part, `highlight-${i}`) : part}</span>;
      })}
    </>
  );
}

// 生成静态路径
export function generateStaticParams() {
  const apisWithTutorial = apiList.filter(api => api.tutorial);
  return apisWithTutorial.map((api) => ({ id: api.id }));
}

// 生成元数据
export function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  return params.then(({ id }) => {
    const api = getAPIById(id);
    if (!api || !api.tutorial) return { title: '教程未找到' };

    return generateTdkMetadata('/tutorial/:id', {
      id,
      name: api.name,
      subtitle: api.tutorial.subtitle || api.desc,
      proxy: api.proxy ? '需代理' : '国内直连',
      stepCount: api.tutorial.steps.length,
    });
  });
}

// 获取相关API推荐（同类型优先）
function getRelatedAPIsWithTutorial(currentId: string): APIConfig[] {
  const current = getAPIById(currentId);
  if (!current) return [];
  // 优先推荐同类型（同proxy属性）的API
  const sameType = apiList.filter(a => a.id !== currentId && a.tutorial && a.proxy === current.proxy).slice(0, 2);
  const others = apiList.filter(a => a.id !== currentId && a.tutorial && a.proxy !== current.proxy).slice(0, 1);
  return [...sameType, ...others].slice(0, 3);
}

// 获取所有有教程的API（用于左侧导航）
function getAllTutorialAPIs(): APIConfig[] {
  return apiList.filter(api => api.tutorial);
}

export default async function TutorialDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const api = getAPIById(id);

  if (!api || !api.tutorial) notFound();

  const needProxy = api.proxy;
  const relatedAPIs = getRelatedAPIsWithTutorial(id);
  const tutorial = api.tutorial;
  const allTutorialAPIs = getAllTutorialAPIs();

  // 按proxy分组
  const noProxyAPIs = allTutorialAPIs.filter(a => !a.proxy);
  const needProxyAPIs = allTutorialAPIs.filter(a => a.proxy);
  const blufText = `这篇教程用 ${tutorial.steps.length} 个步骤说明 ${api.name} API 如何注册、开通、获取 API Key 并完成首次接入；先确认${needProxy ? '代理访问、支付方式、额度限制' : '国内直连、免费额度、计费单位'}，再把 Key 安全保存到环境变量或工具配置中。`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://www.apiuspro.cn' },
          { name: '购买教程', url: 'https://www.apiuspro.cn/tutorial' },
          { name: tutorial.title, url: `https://www.apiuspro.cn/tutorial/${id}` },
        ]}
      />
      <TechArticleSchema
        title={tutorial.title}
        description={tutorial.subtitle || api.desc}
        url={`https://www.apiuspro.cn/tutorial/${id}`}
        imageUrl={
          tutorial.steps[0]?.image
            ? `https://www.apiuspro.cn${tutorial.steps[0].image}`
            : undefined
        }
        datePublished={ARTICLE_DATE_PUBLISHED}
        dateModified={ARTICLE_DATE_MODIFIED}
        proficiencyLevel="Beginner"
      />
      <HowToSchema
        name={tutorial.title}
        description={tutorial.subtitle || api.desc}
        steps={tutorial.steps.map((step, index) => ({
          name: step.title,
          text: step.description || step.items?.join('；') || `${tutorial.title} 第 ${index + 1} 步`,
          image: step.image ? `https://www.apiuspro.cn${step.image}` : undefined,
          url: `https://www.apiuspro.cn/tutorial/${id}#step-${index}`,
        }))}
        totalTime="PT20M"
        tool={['浏览器', 'API 控制台', 'CC Switch']}
      />
      <div className="min-h-screen bg-background content-article overflow-safe">
      {/* ── 顶部导航栏 ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-y-2">
          <DetailBackNav listHref="/tutorial" listLabel="教程列表" className="mb-0" />
          <span className="mx-3 text-border">|</span>
          <span className="truncate text-sm font-semibold text-foreground">{api.name} 购买教程</span>
          <span className={`ml-2 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            needProxy ? 'border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-700' : 'border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700'
          }`}>
            {needProxy ? '需要代理' : '无需代理'}
          </span>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <a
              href={api.url}
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
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col lg:flex-row gap-8 w-full max-w-full min-w-0">
        {/* 左侧指南导航 */}
        <aside className="hidden lg:block w-52 shrink-0">
          <div className="sticky top-20">
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">购买教程</p>
            <nav className="space-y-0.5">
              {/* 无需代理分组 */}
              <p className="mb-1 mt-4 px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">无需代理</p>
              {noProxyAPIs.map((a) => (
                <Link
                  key={a.id}
                  href={`/tutorial/${a.id}`}
                  className={`block text-[13px] px-3 py-2 rounded-md transition-colors truncate ${
                    a.id === id
                      ? 'border-l-2 border-foreground bg-muted text-foreground font-semibold'
                      : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                  }`}
                >
                  {a.name}
                </Link>
              ))}
              {/* 需要代理分组 */}
              {SHOW_PROXY_CONTENT && (
                <p className="mb-1 mt-4 px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">需要代理</p>
              )}
              {SHOW_PROXY_CONTENT && needProxyAPIs.map((a) => (
                <Link
                  key={a.id}
                  href={`/tutorial/${a.id}`}
                  className={`block text-[13px] px-3 py-2 rounded-md transition-colors truncate ${
                    a.id === id
                      ? 'border-l-2 border-foreground bg-muted text-foreground font-semibold'
                      : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                  }`}
                >
                  {a.name}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* 中间主内容区 */}
        <main className="flex-1 w-full max-w-full min-w-0 rounded-lg border border-border bg-card">
          {/* 文档头部 */}
          <div className="border-b border-border px-4 sm:px-8 pb-5 sm:pb-6 pt-6 sm:pt-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div>
                <h1 className="text-[1.45rem] sm:text-2xl font-semibold tracking-tight leading-[1.2] text-foreground">{tutorial.title}</h1>
              </div>
              <span className={`ml-2 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                needProxy ? 'border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-700' : 'border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700'
              }`}>
                {needProxy ? '需要代理' : '无需代理'}
              </span>
            </div>
            {tutorial.subtitle && <p className="mt-1 text-[15px] sm:text-sm text-foreground/80"><LinkText text={tutorial.subtitle} /></p>}

            <section className="mt-5 hidden rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-[15px] sm:text-sm leading-7 sm:leading-6 text-sky-900 dark:border-sky-800 dark:bg-sky-950/20 dark:text-sky-200 sm:block">
              <p className="font-semibold">BLUF 摘要</p>
              <p className="mt-1"><LinkText text={blufText} /></p>
            </section>
            <details className="mt-5 rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/20 text-sky-900 dark:text-sky-200 sm:hidden">
              <summary className="cursor-pointer select-none px-4 py-3 text-sm font-bold">BLUF 摘要（点开查看）</summary>
              <p className="border-t border-sky-200 dark:border-sky-800 px-4 py-3 text-sm leading-7"><LinkText text={blufText} /></p>
            </details>

            {/* 优势标签 */}
            {tutorial.advantages && tutorial.advantages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tutorial.advantages.map((advantage, index) => (
                  <span key={index} className="rounded-full border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 text-[12px] text-emerald-700">
                    &#10003; <LinkText text={advantage} />
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 教程概览卡片 */}
          {(tutorial.estimatedTime || tutorial.prerequisites || tutorial.successSign || tutorial.commonPitfall || tutorial.securityReminder) && (
            <section id="tutorial-overview" className="scroll-mt-[68px] mx-4 sm:mx-8 mt-6 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 sm:px-5 sm:py-4 dark:border-sky-800 dark:bg-sky-950/20">
              <p className="mb-3 text-[13px] font-semibold text-sky-800 dark:text-sky-300">教程概览</p>
              <div className="space-y-2.5 text-[15px] sm:text-sm">
                {tutorial.estimatedTime && (
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-sky-600 dark:text-sky-400">&#9201;</span>
                    <span className="text-sky-900 dark:text-sky-200"><strong className="font-semibold">预计耗时：</strong><LinkText text={tutorial.estimatedTime} /></span>
                  </div>
                )}
                {tutorial.prerequisites && tutorial.prerequisites.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-sky-600 dark:text-sky-400">&#128230;</span>
                    <span className="text-sky-900 dark:text-sky-200"><strong className="font-semibold">准备材料：</strong><LinkText text={tutorial.prerequisites.join('、')} /></span>
                  </div>
                )}
                {tutorial.successSign && (
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400">&#9989;</span>
                    <span className="text-emerald-800 dark:text-emerald-200"><strong className="font-semibold">成功标志：</strong><LinkText text={tutorial.successSign} /></span>
                  </div>
                )}
                {tutorial.commonPitfall && (
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400">&#9888;</span>
                    <span className="text-amber-800 dark:text-amber-200"><strong className="font-semibold">最容易卡住：</strong><LinkText text={tutorial.commonPitfall} /></span>
                  </div>
                )}
                {tutorial.securityReminder && (
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-red-600 dark:text-red-400">&#128274;</span>
                    <span className="text-red-800 dark:text-red-200"><strong className="font-semibold">安全提醒：</strong><LinkText text={tutorial.securityReminder} /></span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* 移动端目录 - 折叠式 */}
          <div className="mx-4 sm:mx-8 mt-6 overflow-hidden rounded-lg border border-border lg:hidden">
            <details>
              <summary className="cursor-pointer select-none bg-muted/60 px-4 py-2.5 text-sm font-semibold text-foreground">
                教程步骤（{tutorial.steps.length} 步）
              </summary>
              <div className="max-h-60 overflow-y-auto space-y-0.5 border-t border-border px-4 py-2">
                {tutorial.steps.map((step, i) => (
                  <a key={i} href={`#step-${i}`} className={`block py-1.5 text-[13px] hover:text-foreground ${step.important ? 'font-semibold text-amber-600 dark:text-amber-400' : 'text-muted-foreground'}`}>
                    {i + 1}. {step.important && '★ '}{step.title}
                  </a>
                ))}
              </div>
            </details>
          </div>

          {/* 教程步骤 */}
          <div className="space-y-10 px-4 py-5 sm:px-8">
            {tutorial.steps.map((step, stepIdx) => (
              <section
                key={stepIdx}
                id={`step-${stepIdx}`}
                className={`scroll-mt-[68px] max-w-full min-w-0 overflow-hidden ${stepIdx < tutorial.steps.length - 1 ? 'border-b border-border pb-8 sm:pb-10' : ''} ${step.important ? 'rounded-lg border border-amber-500/35 bg-amber-500/[0.06] p-4 sm:p-6 dark:border-amber-500/30 dark:bg-amber-500/[0.08]' : ''}`}
              >
                {/* 关键步骤标签 */}
                {step.important && (
                  <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-500/35 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-200">
                    关键步骤
                  </div>
                )}

                {/* 步骤标题：编号 + 文字 */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${step.important ? 'bg-amber-500/20 text-amber-800 dark:text-amber-200' : 'bg-foreground text-background'}`}>
                    {stepIdx + 1}
                  </span>
                  <h2 className="text-lg sm:text-xl font-semibold tracking-tight leading-[1.2] text-foreground">{step.title}</h2>
                </div>

                {/* 步骤描述 */}
                {step.description && (
                  <p className="mb-4 text-[15px] sm:text-base leading-7 sm:leading-8 text-foreground/85 min-w-0 break-words"><LinkText text={step.description} /></p>
                )}

                {/* 步骤实操指引 */}
                {(step.whereToClick || step.expectedResult || (step.failureChecklist && step.failureChecklist.length > 0)) && (
                  <div className="mb-4 max-w-full min-w-0 rounded-md border border-border/70 bg-background/45 px-3 py-3 text-[13px] leading-6 sm:px-4 sm:text-sm dark:bg-background/35" style={{ overflowWrap: 'anywhere' }}>
                    {step.whereToClick && (
                      <p className="text-muted-foreground break-words"><strong className="font-semibold text-foreground">点击位置：</strong><LinkText text={step.whereToClick} /></p>
                    )}
                    {step.expectedResult && (
                      <p className="text-emerald-700 dark:text-emerald-400 break-words"><strong className="font-semibold">完成后看到：</strong><LinkText text={step.expectedResult} /></p>
                    )}
                    {step.failureChecklist && step.failureChecklist.length > 0 && (
                      <div className="text-amber-700 dark:text-amber-400">
                        <strong className="font-semibold">失败检查：</strong>
                        <ul className="mt-1 space-y-0.5 pl-4">
                          {step.failureChecklist.map((item, fi) => (
                            <li key={fi} className="list-disc break-words"><LinkText text={item} /></li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* 图片展示 */}
                {step.image && (
                  <div className="my-4 max-w-full min-w-0 overflow-hidden rounded-lg border border-border bg-background/40 dark:bg-background/50">
                    <div className="relative aspect-[16/9] w-full max-w-full overflow-hidden">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-contain"
                        sizes="(min-width: 1280px) 760px, (min-width: 768px) calc(100vw - 18rem), calc(100vw - 2rem)"
                        priority={stepIdx === 0}
                      />
                    </div>
                  </div>
                )}

                {/* 操作列表 */}
                {step.items && step.items.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {step.items.map((item, itemIdx) => {
                      const colonIndexes = [item.indexOf('：'), item.indexOf(':')].filter(index => index > 0);
                      const colonIdx = colonIndexes.length > 0 ? Math.min(...colonIndexes) : -1;
                      const hasColon = colonIdx > 0 && colonIdx < 20;

                      return (
                        <li key={itemIdx} className="flex items-start gap-2 text-[15px] sm:text-sm text-foreground/85 min-w-0">
                          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-foreground/50" />
                          <span className="leading-7 sm:leading-6 min-w-0 break-words">
                            {hasColon ? (
                              <>
                                <strong className="font-semibold text-foreground">{item.substring(0, colonIdx + 1)}</strong>
                                <LinkText text={item.substring(colonIdx + 1)} />
                              </>
                            ) : (
                              <LinkText text={item} />
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {/* 代码块 */}
                {step.code && (
                  <CodeBlock
                    code={step.code}
                    language={step.codeLanguage}
                    explanation={step.codeExplanation}
                  />
                )}

                {/* 警告 */}
                {step.warning && (
                  <div className="my-4 rounded-lg border border-amber-500/30 bg-amber-500/[0.06] px-4 py-3 text-sm leading-6 text-amber-800 dark:text-amber-200">
                    &#9888; <LinkText text={step.warning} />
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* CC Switch 推荐 */}
          <div id="ccswitch-section" className="mx-4 sm:mx-8 mb-8 rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-3 sm:px-5 sm:py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="mb-1 text-[13px] font-semibold text-emerald-800">配置推荐：使用 CC Switch 接入 AI 工具</p>
                <p className="text-[15px] sm:text-sm leading-7 sm:leading-6 text-emerald-700 dark:text-emerald-300">
                  <LinkText text="创建 API Key 后，建议用 CC Switch 统一填写 API Key、Base URL 和模型名称，再接入 Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw 等工具，避免手动修改配置文件出错。" />
                </p>
              </div>
              <Link
                href="/app/ccswitch"
                className="shrink-0 rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
              >
                查看 CC Switch 详细教程
              </Link>
            </div>
          </div>

          {/* 使用提示和注意事项 */}
          {(tutorial.tips && tutorial.tips.length > 0) || (tutorial.warnings && tutorial.warnings.length > 0) ? (
            <div className="mx-4 sm:mx-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {tutorial.tips && tutorial.tips.length > 0 && (
                <div id="tips-section" className="scroll-mt-[68px] space-y-2 rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 px-4 py-3 sm:px-5 sm:py-4">
                  <p className="mb-1 text-[13px] font-semibold text-sky-800">使用提示</p>
                  {tutorial.tips.map((tip, index) => (
                    <p key={index} className="pl-4 sm:pl-5 text-[15px] sm:text-sm leading-7 sm:leading-6 text-sky-700 dark:text-sky-300">
                      <LinkText text={tip} />
                    </p>
                  ))}
                </div>
              )}

              {tutorial.warnings && tutorial.warnings.length > 0 && (
                <div id="warnings-section" className="scroll-mt-[68px] space-y-2 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 sm:px-5 sm:py-4">
                  <p className="mb-1 text-[13px] font-semibold text-amber-800">注意事项</p>
                  {tutorial.warnings.map((warning, index) => (
                    <p key={index} className="text-[15px] sm:text-sm text-amber-700 dark:text-amber-300 leading-7 sm:leading-6 pl-4 sm:pl-5">
                      <LinkText text={warning} />
                    </p>
                  ))}
                </div>
              )}
            </div>
          ) : null}

          {/* 适合谁 / 不适合谁 */}
          <div className="mx-4 sm:mx-8 mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-3 sm:px-5 sm:py-4">
              <p className="mb-2 text-[13px] font-semibold text-emerald-800">适合谁</p>
              <ul className="space-y-1.5 text-[15px] sm:text-sm leading-7 sm:leading-6 text-emerald-700 dark:text-emerald-300">
                <li>• <LinkText text={needProxy ? '有稳定代理环境和国际信用卡的开发者' : '国内用户，想快速接入 AI API'} /></li>
                <li>• <LinkText text="需要手把手指导完成注册、充值和获取 Key 的新手" /></li>
                <li>• <LinkText text={`想把 ${api.name} 接入 Claude Code、Codex 等工具的用户`} /></li>
              </ul>
            </div>
            <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 sm:px-5 sm:py-4">
              <p className="mb-2 text-[13px] font-semibold text-amber-800">不适合谁</p>
              <ul className="space-y-1.5 text-[15px] sm:text-sm leading-7 sm:leading-6 text-amber-700 dark:text-amber-300">
                <li>• <LinkText text="已经熟悉接入流程，只需要查 Base URL 或模型名" /></li>
                <li>• 不确定该用哪个 API（请看 <Link href="/use-case" className="text-foreground hover:underline">场景推荐</Link>）</li>
                <li>• 想对比多个 API 的测评数据（请看 <Link href="/api-review" className="text-foreground hover:underline">API 测评</Link>）</li>
              </ul>
            </div>
          </div>

          {/* 常见问题 */}
          <div className="mx-4 sm:mx-8 mb-8">
            <h3 className="mb-4 text-base font-semibold text-foreground">常见问题</h3>
            <div className="space-y-3">
              {[
                {
                  q: `${api.name} 有免费额度吗？`,
                  a: api.free ? `有，${api.free}。建议先用免费额度测试真实任务，确认满足需求后再充值。` : '请查看上方教程中的额度和计费说明，建议先小额充值测试。',
                },
                {
                  q: `注册 ${api.name} 需要什么？`,
                  a: needProxy
                    ? '需要能接收验证码的邮箱、稳定的代理网络和国际信用卡（或虚拟信用卡）。'
                    : '手机号或邮箱即可注册，支持支付宝/微信充值。部分 API 需要实名认证。',
                },
                {
                  q: 'API Key 泄露了怎么办？',
                  a: '立即到控制台删除泄露的 Key 并重新生成。建议把 Key 存在环境变量或 .env 文件中，不要提交到 Git 仓库。',
                },
              ].map((faq) => (
                <div key={faq.q} className="rounded-lg border border-border bg-card px-4 sm:px-5 py-4">
                  <h4 className="text-[15px] sm:text-sm font-semibold text-foreground"><LinkText text={faq.q} /></h4>
                  <p className="mt-1.5 text-[15px] sm:text-sm leading-7 sm:leading-6 text-foreground/80"><LinkText text={faq.a} /></p>
                </div>
              ))}
            </div>
          </div>

          {/* 相关教程推荐 */}
          {relatedAPIs.length > 0 && (
            <div className="mx-4 sm:mx-8 mb-8 border-t border-border pt-6">
              <h3 className="mb-4 text-base font-semibold text-foreground">相关教程推荐</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedAPIs.map((related) => (
                  <Link
                    key={related.id}
                    href={`/tutorial/${related.id}`}
                    className="group rounded-lg border border-border bg-muted/40 p-4 transition-colors hover:border-foreground/30 hover:bg-card"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <h4 className="text-[15px] sm:text-sm font-semibold text-foreground">{related.name}</h4>
                    </div>
                    <p className="text-[13px] sm:text-xs text-foreground/70">{related.desc}</p>
                    <div className="mt-2 text-[13px] sm:text-xs font-medium text-foreground">查看教程 &#8594;</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 场景推荐 */}
          <div className="mx-4 sm:mx-8 mb-8 border-t border-border pt-6">
            <h3 className="mb-3 text-base font-semibold text-foreground">不知道选哪个 API？</h3>
            <p className="text-sm text-foreground/80 mb-4">
              按实际使用场景选择，找到最适合你的模型。
            </p>
            <Link href="/use-case">
              <Button variant="outline" size="sm">按使用场景选择 AI API &#8594;</Button>
            </Link>
          </div>
        </main>

        {/* 右侧 On this page 目录 */}
        <aside className="hidden xl:block w-48 shrink-0">
          <div className="sticky top-20">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">On this page</p>
            <nav className="space-y-0.5 border-l border-border">
              {/* 教程概览 */}
              {(tutorial.estimatedTime || tutorial.prerequisites || tutorial.successSign || tutorial.commonPitfall || tutorial.securityReminder) && (
                <a
                  href="#tutorial-overview"
                  className="block truncate py-1.5 pl-3 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  教程概览
                </a>
              )}
              {tutorial.steps.map((step, i) => (
                <a
                  key={i}
                  href={`#step-${i}`}
                  className={`block truncate py-1.5 pl-3 text-[12px] transition-colors hover:text-foreground ${
                    step.important
                      ? 'font-semibold text-amber-600 dark:text-amber-400'
                      : 'text-muted-foreground'
                  }`}
                >
                  {step.important && '★ '}{step.title}
                </a>
              ))}
              {/* 使用提示 */}
              {tutorial.tips && tutorial.tips.length > 0 && (
                <a
                  href="#tips-section"
                  className="block truncate py-1.5 pl-3 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  使用提示
                </a>
              )}
              <a
                href="#ccswitch-section"
                className="block truncate py-1.5 pl-3 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
              >
                CC Switch 推荐
              </a>
              {/* 注意事项 */}
              {tutorial.warnings && tutorial.warnings.length > 0 && (
                <a
                  href="#warnings-section"
                  className="block truncate py-1.5 pl-3 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  注意事项
                </a>
              )}
            </nav>
          </div>
        </aside>
      </div>

      <footer className="border-t border-border px-4 py-6 sm:py-8 text-center text-sm text-foreground/80">
        <p>API知识站 - 适合初学者的 AI API 学习平台</p>
        <div className="mt-3">
          <BeianLinks />
        </div>
      </footer>
    </div>
    </>
  );
}
