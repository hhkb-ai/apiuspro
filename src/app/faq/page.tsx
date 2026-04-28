import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { faqCategories } from '@/lib/api-config';
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/structured-data';

export const metadata: Metadata = {
  title: '常见问题 FAQ',
  description:
    'AI API 接入全流程 FAQ：涵盖注册验证、支付方式、API Key 安全、调用限制、代理选择等高频问题，帮助新手快速解决 API 使用中的常见障碍。',
  alternates: { canonical: 'https://apiuspro.cn/faq' },
  openGraph: {
    title: '常见问题 FAQ | API知识站',
    description:
      'AI API 接入全流程 FAQ：注册、支付、密钥安全、调用限制等高频问题解答。',
    url: 'https://apiuspro.cn/faq',
    type: 'website',
  },
};

export default function FAQPage() {
  const allFAQItems = faqCategories.flatMap(cat => cat.items);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://apiuspro.cn' },
          { name: '常见问题 FAQ', url: 'https://apiuspro.cn/faq' },
        ]}
      />
      <FAQSchema items={allFAQItems} />

      <div className="min-h-screen bg-background">
        {/* ── 顶部导航 ── */}
        <header className="sticky top-0 z-50 border-b border-border bg-card">
          <div className="mx-auto flex h-14 max-w-5xl items-center px-6">
            <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
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
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">常见问题</h1>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-muted-foreground">
              覆盖 AI API 接入全流程：从注册、支付到日常使用，帮你快速排查常见障碍。如果这里没有你想问的问题，建议查看对应 API 的购买教程或官网文档。
            </p>
          </div>

          {/* FAQ 分类 */}
          <div className="space-y-10">
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
                        <p className="text-sm leading-6 text-muted-foreground">{item.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* 底部引导 */}
          <Card className="mt-10 border-border/80">
            <CardContent className="p-6 text-center">
              <p className="mb-4 text-sm leading-6 text-muted-foreground">
                问题没解决？查看具体 API 的购买教程，每个教程都包含了详细的注册、支付和接入步骤。
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/tutorial">
                  <Button>查看购买教程</Button>
                </Link>
                <Link href="/cloud-api">
                  <Button variant="outline">浏览 API 列表</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
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
          <div className="mt-4 flex items-center justify-center gap-1.5">
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
    </>
  );
}
