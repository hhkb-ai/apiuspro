import Link from 'next/link';
import type { Metadata } from 'next';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCases } from '@/lib/use-case-config';
import { BreadcrumbSchema } from '@/components/seo/structured-data';
import { generateMetadata as generateTdkMetadata } from '@/lib/tdk';

export const metadata: Metadata = generateTdkMetadata('/use-case');

const selectionSteps = [
  {
    title: '先定任务类型',
    desc: '写代码、文档处理、客服、翻译、教育辅导的模型要求不同，先按真实任务筛选。',
  },
  {
    title: '再看接入条件',
    desc: '确认国内直连、免费额度、支付方式、Base URL、SDK 兼容和限速规则。',
  },
  {
    title: '最后用样本测试',
    desc: '用自己的代码、文档或客服问答跑一轮，记录质量、速度、成本和失败率。',
  },
];

export default function UseCaseListPage() {
  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://apiuspro.cn' },
          { name: '场景推荐', url: 'https://apiuspro.cn/use-case' },
        ]}
      />
      <div className="mx-auto max-w-6xl p-6 lg:p-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">Use Cases</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">AI API 场景推荐</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            不知道该用哪个 AI API？按实际场景选择，找到适合编程、知识库、内容创作、客服、翻译和教育辅导的模型。
          </p>
        </div>

        {/* BLUF 摘要 */}
        <section className="mb-8 rounded-lg border border-sky-200 bg-sky-50 px-5 py-4">
          <p className="text-sm font-semibold text-sky-800">结论先行</p>
          <p className="mt-1 text-sm leading-6 text-sky-700">
            写代码优先看 DeepSeek 和 Claude，长文档处理看通义千问和 Gemini，内容创作看 Kimi 和通义千问。
            不确定就先用有免费额度的国内 API 跑一轮真实任务，再决定是否切换。
          </p>
        </section>

        <div className="flex flex-col">
        <section className="order-2 mb-8 grid grid-cols-1 gap-4 md:order-1 md:grid-cols-3">
          {selectionSteps.map((step, index) => (
            <div key={step.title} className="rounded-lg border bg-card p-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                {index + 1}
              </span>
              <h2 className="mt-3 text-base font-semibold">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </section>

        <div className="order-1 grid grid-cols-1 gap-4 md:order-2 md:grid-cols-2">
          {useCases.map((uc) => (
            <article
              key={uc.id}
              className="flex min-h-52 flex-col rounded-lg border bg-card p-5 transition-colors hover:border-foreground/30"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="font-semibold">{uc.name}</h3>
                <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                  {uc.recommendations.length} 个推荐
                </Badge>
              </div>
              <p className="flex-1 text-sm leading-6 text-muted-foreground">
                {uc.description}
              </p>
              <div className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                <span className="font-semibold">首选：</span>{uc.primaryPick}
                <span className="mx-1.5 text-emerald-400">|</span>
                <span className="font-semibold">备选：</span>{uc.altPick}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {uc.selectionCriteria.map((c) => (
                  <span
                    key={c.title}
                    className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {c.title}
                  </span>
                ))}
              </div>
              <div className="mt-5">
                <Link href={`/use-case/${uc.id}`}>
                  <Button variant="outline" className="w-full" size="sm">
                    {uc.name} API 推荐方案
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* 常见问题 */}
        <section className="order-3 mt-10">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">常见问题</h2>
          <div className="space-y-3">
            {[
              {
                q: '选好场景后怎么开始用？',
                a: '先进入对应场景页面查看首选 API，再到购买教程完成注册和 Key 创建，最后用 curl 或 SDK 跑通一次调用。',
              },
              {
                q: '一个 API 能同时用于多个场景吗？',
                a: '可以。比如 DeepSeek 同时适合编程和内容创作，通义千问同时适合知识库和翻译。选 API 时优先看它在你最在意的场景上的表现。',
              },
              {
                q: '免费额度用完了怎么办？',
                a: '可以充值继续用当前 API，也可以切换到其他有免费额度的 API 做对比测试。建议先用小额充值跑真实任务，确认效果再加大投入。',
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-lg border bg-card p-5">
                <h3 className="text-sm font-semibold">{faq.q}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 下一步推荐 */}
        <section className="order-4 mt-10 rounded-lg border bg-card p-6">
          <h2 className="font-semibold">下一步推荐</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Link href="/tutorial" className="rounded-lg border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">购买教程</p>
              <p className="mt-1 text-xs text-muted-foreground">按步骤完成注册、支付与 API Key 创建</p>
            </Link>
            <Link href="/api-review" className="rounded-lg border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">API 测评</p>
              <p className="mt-1 text-xs text-muted-foreground">查看基准测试数据和详细评分</p>
            </Link>
            <Link href="/faq" className="rounded-lg border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">常见问题</p>
              <p className="mt-1 text-xs text-muted-foreground">注册、支付、Key 配置问题速查</p>
            </Link>
          </div>
        </section>

        {/* 适合谁 / 不适合谁 */}
        <section className="order-5 mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-sm font-semibold text-emerald-800">适合谁</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-emerald-700">
              <li>• 不确定哪个 API 适合自己的业务场景</li>
              <li>• 想对比不同场景下的首选和备选方案</li>
              <li>• 需要快速了解各 API 的强项和短板</li>
            </ul>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-800">不适合谁</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-amber-700">
              <li>• 已经确定要用哪个 API，需要购买教程（请看 <Link href="/tutorial" className="text-foreground hover:underline">购买教程</Link>）</li>
              <li>• 想看详细的基准测试和评分数据（请看 <Link href="/api-review" className="text-foreground hover:underline">API 测评</Link>）</li>
              <li>• 只想查官网入口和免费额度（请看 <Link href="/cloud-api" className="text-foreground hover:underline">API 列表</Link>）</li>
            </ul>
          </div>
        </section>
        </div>
      </div>
    </SidebarLayout>
  );
}
