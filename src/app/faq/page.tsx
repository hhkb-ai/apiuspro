import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BeianLinks } from '@/components/layout/BeianLinks';
import { faqCategories } from '@/lib/api-config';
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/structured-data';
import { generateMetadata as generateTdkMetadata } from '@/lib/tdk';

const URL_PATTERN = /(https?:\/\/[^\s<>"'，。；、？！）)】]+)/g;

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

// 将文本中的 URL 转换为可点击链接
function LinkText({ text }: { text: string }) {
  const parts = text.split(URL_PATTERN);
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
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export const metadata: Metadata = generateTdkMetadata('/faq');

export default function FAQPage() {
  const allFAQItems = faqCategories.flatMap(cat => cat.items);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://www.apiuspro.cn' },
          { name: '常见问题 FAQ', url: 'https://www.apiuspro.cn/faq' },
        ]}
      />
      <FAQSchema items={allFAQItems} />

      <div className="min-h-screen bg-background">
        {/* ── 顶部导航 ── */}
        <header className="sticky top-0 z-50 border-b border-border bg-card">
          <div className="mx-auto flex h-14 max-w-5xl items-center px-6">
            <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground min-h-[44px] flex items-center px-2 -mx-2">
              &#8592; 返回首页
            </Link>
            <span className="mx-3 text-border">|</span>
            <span className="text-sm font-semibold text-foreground">常见问题 FAQ</span>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-6 py-8">
          {/* 页面标题 */}
          <div className="mb-10 border-b pb-8">
            <p className="text-sm font-medium text-muted-foreground">FAQ</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">AI API 接入常见问题</h1>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-muted-foreground">
              覆盖 AI API 接入全流程：从注册、支付到日常使用，帮你快速排查常见障碍。如果这里没有你想问的问题，建议查看对应 API 的购买教程或官网文档。
            </p>
          </div>

          {/* BLUF 摘要 */}
          <section className="mb-8 hidden rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 px-5 py-4 sm:block">
            <p className="text-sm font-semibold text-sky-800 dark:text-sky-200">结论先行</p>
            <p className="mt-1 text-sm leading-6 text-sky-700 dark:text-sky-300">
              大多数 API 接入问题集中在三个环节：注册验证（手机号/邮箱/实名）、支付方式（国内能否直接付款）、API Key 配置（保存位置和调用格式）。
              先确认这三个环节没有卡住，再排查模型选择和费用问题。
            </p>
          </section>
          <details className="mb-8 rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-900 dark:text-sky-100 sm:hidden">
            <summary className="cursor-pointer select-none px-4 py-3 text-sm font-bold">结论先行（点开查看）</summary>
            <p className="border-t border-sky-200 dark:border-sky-800 px-4 py-3 text-sm leading-7 text-sky-700 dark:text-sky-300">
              大多数 API 接入问题集中在三个环节：注册验证（手机号/邮箱/实名）、支付方式（国内能否直接付款）、API Key 配置（保存位置和调用格式）。
              先确认这三个环节没有卡住，再排查模型选择和费用问题。
            </p>
          </details>

          <div className="flex flex-col">
          {/* 使用前准备 */}
          <section className="order-2 mb-8 rounded-lg border bg-card p-5 md:order-1">
            <h2 className="font-semibold">使用前准备</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              在提问或排查之前，确认以下信息已经准备好，能帮你更快找到答案：
            </p>
            <div className="mt-3 grid gap-3 text-sm leading-6 text-muted-foreground md:grid-cols-2">
              {[
                '确认你要接入的 API 名称和官网地址',
                '记录报错信息或 HTTP 状态码（如 401、429）',
                '确认 API Key 的保存位置（环境变量 / .env / 配置文件）',
                '确认 Base URL 和模型名称是否与官方文档一致',
              ].map((item) => (
                <div key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ 分类 */}
          <div className="order-1 space-y-10 md:order-2">
            {faqCategories.map((category) => (
              <section key={category.title}>
                <h2 className="mb-4 flex items-center gap-3 text-xl font-semibold">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                    {category.title.charAt(0)}
                  </span>
                  {category.title}
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {category.items.map((item, idx) => (
                    <Card key={idx} className="border-border/80">
                      <CardContent className="p-5">
                        <h3 className="mb-2 text-sm font-semibold text-foreground">
                          Q{idx + 1}：{item.question}
                        </h3>
                        <p className="text-sm leading-6 text-muted-foreground"><LinkText text={item.answer} /></p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* 适合谁 / 不适合谁 */}
          <section className="order-3 mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-5">
              <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">适合谁</p>
              <ul className="mt-2 space-y-1.5 text-sm leading-6 text-emerald-700 dark:text-emerald-300">
                <li>• 第一次接触 AI API，遇到注册或配置问题</li>
                <li>• 已有 API Key 但调用报错，需要排查原因</li>
                <li>• 想了解不同 API 的支付方式和费用结构</li>
              </ul>
            </div>
            <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-5">
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">不适合谁</p>
              <ul className="mt-2 space-y-1.5 text-sm leading-6 text-amber-700 dark:text-amber-300">
                <li>• 还没选好用哪个 API（请看 <Link href="/use-case" className="text-foreground hover:underline">场景推荐</Link>）</li>
                <li>• 需要手把手注册和购买指导（请看 <Link href="/tutorial" className="text-foreground hover:underline">购买教程</Link>）</li>
                <li>• 想对比模型能力和价格（请看 <Link href="/api-review" className="text-foreground hover:underline">API 测评</Link>）</li>
              </ul>
            </div>
          </section>

          {/* 底部引导 */}
          <Card className="order-4 mt-10 border-border/80">
            <CardContent className="p-6 text-center">
              <p className="mb-4 text-sm leading-6 text-muted-foreground">
                问题没解决？查看具体 API 的购买教程，每个教程都包含了详细的注册、支付和接入步骤。
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/tutorial">
                  <Button>AI API 购买教程</Button>
                </Link>
                <Link href="/cloud-api">
                  <Button variant="outline">全部 API 官网入口</Button>
                </Link>
                <Link href="/use-case">
                  <Button variant="outline">按使用场景选 API</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          </div>
        </main>

        <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground">
          <p>API知识站 - 适合初学者的 AI API 学习平台</p>
          <div className="mt-2">
            <Link href="/" className="transition-colors hover:text-foreground">返回首页</Link>
          </div>
          <p className="mt-3 max-w-2xl mx-auto text-xs leading-5">
            本站仅提供 API 信息整理与教程参考，不提供网络代理、账号代注册、跨境支付等第三方服务。
            用户通过本网站所获取的任何第三方平台信息，请自行核实其合法合规性。
            本站不对第三方平台的服务质量、资金安全、账号封禁等风险承担责任。
          </p>
          <div className="mt-4">
            <BeianLinks />
          </div>
        </footer>
      </div>
    </>
  );
}
