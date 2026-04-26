import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { apiList, getAPIById, APIConfig } from '@/lib/api-config';

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
    return {
      title: `${api.name} 购买教程`,
      description: api.tutorial.subtitle || api.desc,
    };
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

  return (
    <div className="min-h-screen bg-background">
      {/* ── 顶部导航栏 ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center">
          <Link href="/tutorial" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            &#8592; 返回教程列表
          </Link>
          <span className="mx-3 text-border">|</span>
          <span className="truncate text-sm font-semibold text-foreground">{api.name} 购买教程</span>
          <span className={`ml-2 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            needProxy ? 'border border-amber-200 bg-amber-50 text-amber-700' : 'border border-emerald-200 bg-emerald-50 text-emerald-700'
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
      <div className="max-w-[1200px] mx-auto px-6 py-8 flex gap-8">
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
              <p className="mb-1 mt-4 px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">需要代理</p>
              {needProxyAPIs.map((a) => (
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
        <main className="flex-1 min-w-0 rounded-lg border border-border bg-card">
          {/* 文档头部 */}
          <div className="border-b border-border px-8 pb-6 pt-8">
            <div className="flex items-center gap-3 mb-2">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">{tutorial.title}</h1>
              </div>
              <span className={`ml-2 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                needProxy ? 'border border-amber-200 bg-amber-50 text-amber-700' : 'border border-emerald-200 bg-emerald-50 text-emerald-700'
              }`}>
                {needProxy ? '需要代理' : '无需代理'}
              </span>
            </div>
            {tutorial.subtitle && <p className="mt-1 text-sm text-muted-foreground">{tutorial.subtitle}</p>}

            {/* 优势标签 */}
            {tutorial.advantages && tutorial.advantages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tutorial.advantages.map((advantage, index) => (
                  <span key={index} className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[12px] text-emerald-700">
                    &#10003; {advantage}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 移动端目录 - 折叠式 */}
          <div className="mx-8 mt-6 overflow-hidden rounded-lg border border-border lg:hidden">
            <details>
              <summary className="cursor-pointer select-none bg-muted/60 px-4 py-2.5 text-sm font-semibold text-foreground">
                教程步骤（{tutorial.steps.length} 步）
              </summary>
              <div className="space-y-0.5 border-t border-border px-4 py-2">
                {tutorial.steps.map((step, i) => (
                  <a key={i} href={`#step-${i}`} className="block py-1.5 text-[13px] text-muted-foreground hover:text-foreground">
                    {i + 1}. {step.title}
                  </a>
                ))}
              </div>
            </details>
          </div>

          {/* 教程步骤 */}
          <div className="px-8 py-6 space-y-10">
            {tutorial.steps.map((step, stepIdx) => (
              <section
                key={stepIdx}
                id={`step-${stepIdx}`}
                className={stepIdx < tutorial.steps.length - 1 ? 'border-b border-border pb-10' : ''}
              >
                {/* 步骤标题：编号 + 文字 */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                    {stepIdx + 1}
                  </span>
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">{step.title}</h2>
                </div>

                {/* 步骤描述 */}
                {step.description && (
                  <p className="mb-4 text-[15px] leading-7 text-muted-foreground">{step.description}</p>
                )}

                {/* 图片展示 */}
                {step.image && (
                  <div className="my-4">
                    <div className="overflow-hidden rounded-lg border border-border bg-muted/40">
                      <div className="aspect-video relative">
                        <Image src={step.image} alt={step.title} fill className="object-cover" unoptimized />
                      </div>
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
                        <li key={itemIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                          <span className="leading-6">
                            {hasColon ? (
                              <>
                                <strong className="font-semibold text-foreground">{item.substring(0, colonIdx + 1)}</strong>
                                {item.substring(colonIdx + 1)}
                              </>
                            ) : (
                              item
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {/* 代码块 */}
                {step.code && (
                  <div className="my-4 overflow-hidden rounded-lg border border-border bg-muted/40">
                    {step.codeLanguage && (
                      <div className="border-b border-border px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {step.codeLanguage}
                      </div>
                    )}
                    <pre className="overflow-x-auto p-4 text-xs leading-6 text-foreground">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                )}

                {/* 警告 */}
                {step.warning && (
                  <div className="my-4 rounded-lg border border-amber-200 bg-amber-50 px-5 py-3 text-sm leading-6 text-amber-800">
                    &#9888; {step.warning}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* 使用提示和注意事项 */}
          {(tutorial.tips && tutorial.tips.length > 0) || (tutorial.warnings && tutorial.warnings.length > 0) ? (
            <div className="mx-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {tutorial.tips && tutorial.tips.length > 0 && (
                <div id="tips-section" className="space-y-2 rounded-lg border border-sky-200 bg-sky-50 px-5 py-4">
                  <p className="mb-1 text-[13px] font-semibold text-sky-800">使用提示</p>
                  {tutorial.tips.map((tip, index) => (
                    <p key={index} className="pl-5 text-sm leading-6 text-sky-700">
                      {tip}
                    </p>
                  ))}
                </div>
              )}

              {tutorial.warnings && tutorial.warnings.length > 0 && (
                <div id="warnings-section" className="space-y-2 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4">
                  <p className="mb-1 text-[13px] font-semibold text-amber-800">注意事项</p>
                  {tutorial.warnings.map((warning, index) => (
                    <p key={index} className="text-sm text-amber-700 leading-6 pl-5">
                      {warning}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ) : null}

          {/* 相关教程推荐 */}
          {relatedAPIs.length > 0 && (
            <div className="mx-8 mb-8 border-t border-border pt-6">
              <h3 className="mb-4 text-base font-semibold text-foreground">相关教程推荐</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedAPIs.map((related) => (
                  <Link
                    key={related.id}
                    href={`/tutorial/${related.id}`}
                    className="group rounded-lg border border-border bg-muted/40 p-4 transition-colors hover:border-foreground/30 hover:bg-card"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-foreground">{related.name}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">{related.desc}</p>
                    <div className="mt-2 text-xs font-medium text-foreground">查看教程 &#8594;</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* 右侧 On this page 目录 */}
        <aside className="hidden xl:block w-48 shrink-0">
          <div className="sticky top-20">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">On this page</p>
            <nav className="space-y-0.5 border-l border-border">
              {tutorial.steps.map((step, i) => (
                <a
                  key={i}
                  href={`#step-${i}`}
                  className="block truncate py-1.5 pl-3 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {step.title}
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
    </div>
  );
}
