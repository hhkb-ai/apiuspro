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
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* ── 顶部导航栏 ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center">
          <Link href="/tutorial" className="text-sm text-slate-500 hover:text-slate-800 transition-colors">
            &#8592; 返回教程列表
          </Link>
          <span className="mx-3 text-slate-300">|</span>
          <span className="text-sm font-semibold text-slate-800 truncate">{api.icon} {api.name} 购买教程</span>
          <span className={`ml-2 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            needProxy ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
          }`}>
            {needProxy ? '需要代理' : '无需代理'}
          </span>
          <div className="ml-auto">
            <a
              href={api.url}
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
        <aside className="hidden lg:block w-52 shrink-0">
          <div className="sticky top-20">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">购买教程</p>
            <nav className="space-y-0.5">
              {/* 无需代理分组 */}
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mt-4 mb-1">🟢 无需代理</p>
              {noProxyAPIs.map((a) => (
                <Link
                  key={a.id}
                  href={`/tutorial/${a.id}`}
                  className={`block text-[13px] px-3 py-2 rounded-md transition-colors truncate ${
                    a.id === id
                      ? 'bg-orange-50 text-orange-700 font-semibold border-l-2 border-orange-500'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {a.icon} {a.name}
                </Link>
              ))}
              {/* 需要代理分组 */}
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mt-4 mb-1">🟠 需要代理</p>
              {needProxyAPIs.map((a) => (
                <Link
                  key={a.id}
                  href={`/tutorial/${a.id}`}
                  className={`block text-[13px] px-3 py-2 rounded-md transition-colors truncate ${
                    a.id === id
                      ? 'bg-orange-50 text-orange-700 font-semibold border-l-2 border-orange-500'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {a.icon} {a.name}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* 中间主内容区 */}
        <main className="flex-1 min-w-0 bg-white rounded-xl border border-slate-200 shadow-sm">
          {/* 文档头部 */}
          <div className="px-8 pt-8 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{api.icon}</span>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{tutorial.title}</h1>
              </div>
              <span className={`ml-2 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                needProxy ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
              }`}>
                {needProxy ? '需要代理' : '无需代理'}
              </span>
            </div>
            {tutorial.subtitle && <p className="text-slate-500 text-sm mt-1">{tutorial.subtitle}</p>}

            {/* 优势标签 */}
            {tutorial.advantages && tutorial.advantages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tutorial.advantages.map((advantage, index) => (
                  <span key={index} className="text-[12px] py-1 px-2.5 rounded-full border border-green-300 text-green-700 bg-green-50">
                    &#10003; {advantage}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 移动端目录 - 折叠式 */}
          <div className="lg:hidden mx-8 mt-6 border border-slate-200 rounded-lg overflow-hidden">
            <details>
              <summary className="px-4 py-2.5 bg-slate-50 cursor-pointer text-sm font-semibold text-slate-700 select-none">
                教程步骤（{tutorial.steps.length} 步）
              </summary>
              <div className="px-4 py-2 space-y-0.5 border-t border-slate-100">
                {tutorial.steps.map((step, i) => (
                  <a key={i} href={`#step-${i}`} className="block text-[13px] py-1.5 text-slate-500 hover:text-orange-600">
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
                className={stepIdx < tutorial.steps.length - 1 ? 'pb-10 border-b border-slate-100' : ''}
              >
                {/* 步骤标题：编号 + 文字 */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex items-center justify-center w-7 h-7 bg-orange-500 text-white rounded-full text-sm font-bold shrink-0">
                    {stepIdx + 1}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">{step.title}</h2>
                </div>

                {/* 步骤描述 */}
                {step.description && (
                  <p className="text-[15px] text-slate-600 leading-7 mb-4">{step.description}</p>
                )}

                {/* 图片展示 */}
                {step.image && (
                  <div className="my-4">
                    <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
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
                      const colonIdx = Math.max(item.indexOf('：'), item.indexOf(':'));
                      const hasColon = colonIdx > 0 && colonIdx < 20;

                      return (
                        <li key={itemIdx} className="text-sm flex items-start gap-2 text-slate-600">
                          <span className="mt-2 shrink-0 w-1 h-1 bg-slate-300 rounded-full" />
                          <span className="leading-6">
                            {hasColon ? (
                              <>
                                <strong className="font-semibold text-slate-800">{item.substring(0, colonIdx + 1)}</strong>
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

                {/* 警告 */}
                {step.warning && (
                  <div className="my-4 bg-amber-50 border-l-3 border-amber-400 rounded-r-lg px-5 py-3 text-sm text-amber-800 leading-6">
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
                <div className="bg-blue-50 border-l-3 border-blue-400 rounded-r-lg px-5 py-4 space-y-2">
                  <p className="font-semibold text-[13px] text-blue-800 flex items-center gap-1.5 mb-1">
                    <span>&#128161;</span> 使用提示
                  </p>
                  {tutorial.tips.map((tip, index) => (
                    <p key={index} className="text-sm text-blue-700 leading-6 pl-5">
                      {tip}
                    </p>
                  ))}
                </div>
              )}

              {tutorial.warnings && tutorial.warnings.length > 0 && (
                <div className="bg-amber-50 border-l-3 border-amber-400 rounded-r-lg px-5 py-4 space-y-2">
                  <p className="font-semibold text-[13px] text-amber-800 flex items-center gap-1.5 mb-1">
                    <span>&#9888;</span> 注意事项
                  </p>
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
            <div className="mx-8 mb-8 pt-6 border-t border-slate-100">
              <h3 className="font-bold text-base text-slate-800 mb-4">相关教程推荐</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedAPIs.map((related) => (
                  <Link
                    key={related.id}
                    href={`/tutorial/${related.id}`}
                    className="bg-slate-50 rounded-lg p-4 hover:bg-orange-50 hover:border-orange-200 border border-slate-200 transition-colors group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{related.icon}</span>
                      <h4 className="font-bold text-sm text-slate-800 group-hover:text-orange-700">{related.name}</h4>
                    </div>
                    <p className="text-xs text-slate-500">{related.desc}</p>
                    <div className="text-xs text-orange-500 mt-2 font-medium">查看教程 &#8594;</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* 右侧 On this page 目录 */}
        <aside className="hidden xl:block w-48 shrink-0">
          <div className="sticky top-20">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">On this page</p>
            <nav className="space-y-0.5 border-l border-slate-200">
              {tutorial.steps.map((step, i) => (
                <a
                  key={i}
                  href={`#step-${i}`}
                  className="block text-[12px] py-1.5 pl-3 transition-colors truncate text-slate-500 hover:text-slate-800"
                >
                  {step.title}
                </a>
              ))}
              {/* 使用提示 */}
              {tutorial.tips && tutorial.tips.length > 0 && (
                <a
                  href="#tips-section"
                  className="block text-[12px] py-1.5 pl-3 transition-colors truncate text-slate-500 hover:text-slate-800"
                >
                  使用提示
                </a>
              )}
              {/* 注意事项 */}
              {tutorial.warnings && tutorial.warnings.length > 0 && (
                <a
                  href="#warnings-section"
                  className="block text-[12px] py-1.5 pl-3 transition-colors truncate text-slate-500 hover:text-slate-800"
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
