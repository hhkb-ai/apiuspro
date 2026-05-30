import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BreadcrumbSchema } from '@/components/seo/structured-data';
import { getAllLearnArticles } from '@/lib/learn-config';

export const metadata: Metadata = {
  title: 'AI 新手学习中心 - API知识站',
  description: '从 AI 基础、提示词、Token、上下文、API Key、Base URL、模型名称，到第一次 API 调用、Codex 和 Claude Code，按路线学习 AI。',
};

const learningSteps = [
  '认识 AI',
  'Token 和上下文',
  '学会写提示词',
  '理解 API 配置',
  '第一次 API 调用',
  '使用 AI 编程工具',
];

const practiceLinks = [
  { title: 'DeepSeek API 教程', href: '/tutorial/deepseek', desc: '从注册、创建 API Key 到首次调用。' },
  { title: 'MiMo API 教程', href: '/tutorial/mimo', desc: '了解小米 MiMo 的 API 使用路径。' },
  { title: 'Codex 工具教程', href: '/app/codex', desc: '用 AI 辅助修改代码、检查报错和运行测试。' },
  { title: 'CC Switch 工具教程', href: '/app/ccswitch', desc: '统一管理 API Key、Base URL 和模型名称。' },
  { title: 'Claude Code 工具教程', href: '/app/claude-code', desc: '学习命令行 AI 编程工作流。' },
];

const faqItems = [
  {
    q: '完全不懂 AI 应该先看哪篇？',
    a: '先看「AI 新手入门 01：AI、模型和使用方式」。',
  },
  {
    q: '没有编程基础能不能学 API？',
    a: '可以。先理解 API Key、Base URL、模型名称，再跑最小示例。',
  },
  {
    q: 'API Key 是否安全？',
    a: 'API Key 是密钥，不要公开、截图或上传 GitHub。',
  },
  {
    q: '学完后下一步做什么？',
    a: '可以去 /tutorial 选择 DeepSeek、MiMo 等平台教程，也可以去 /app 学 Codex、Claude Code、CC Switch。',
  },
];

export default function LearnPage() {
  const articles = getAllLearnArticles();

  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://www.apiuspro.cn' },
          { name: 'AI 新手学习中心', url: 'https://www.apiuspro.cn/learn' },
        ]}
      />
      <div className="mx-auto max-w-6xl p-6 lg:p-8">
        <section className="mb-10">
          <p className="text-sm font-medium text-muted-foreground">Learn</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">AI 新手学习中心</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
            从 AI 基础、提示词、Token、上下文、API Key、Base URL、模型名称，到第一次 API 调用、Codex 和 Claude Code，按路线学习 AI。
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="min-h-[44px]">
              <Link href="/learn/ai-basics">开始学习</Link>
            </Button>
            <Button asChild variant="outline" className="min-h-[44px]">
              <Link href="/tutorial">查看 API 教程</Link>
            </Button>
          </div>
        </section>

        <section className="mb-10 rounded-2xl border bg-card p-5">
          <div className="mb-4">
            <h2 className="text-xl font-semibold tracking-tight">学习路线</h2>
            <p className="mt-1 text-sm text-muted-foreground">按顺序建立概念，再进入 API 和 AI 工具实操。</p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {learningSteps.map((step, index) => (
              <div key={step} className="rounded-xl border border-border bg-background p-4">
                <span className="text-xs font-semibold text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                <p className="mt-1 text-base font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-xl font-semibold tracking-tight">系统学习文章</h2>
            <p className="mt-1 text-sm text-muted-foreground">每篇聚焦 3 个关键点，适合第一次系统学习 AI 和 API 的用户。</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <article key={article.slug} className="flex min-h-80 flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-foreground/30">
                {article.cover?.src && (
                  <div className="border-b border-border bg-background p-4">
                    <Image
                      src={article.cover.src}
                      alt={article.cover.alt}
                      width={640}
                      height={360}
                      className="h-auto w-full rounded-xl"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <Badge variant="outline" className="border-border bg-muted text-muted-foreground">{String(article.order).padStart(2, '0')}</Badge>
                    <span className="text-xs text-muted-foreground">{article.readingTime}</span>
                  </div>
                  <h3 className="text-base font-semibold leading-6">{article.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{article.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-border bg-muted px-2 py-1 text-xs text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                  <Button asChild variant="outline" size="sm" className="mt-5 min-h-[44px] w-full rounded-xl">
                    <Link href={`/learn/${article.slug}`}>开始阅读</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-5">
            <h2 className="text-xl font-semibold tracking-tight">API 实操入口</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">学完基础概念后，选择一个平台完成注册、配置和首次调用。</p>
            <div className="mt-4 grid gap-3">
              {practiceLinks.slice(0, 2).map((item) => (
                <Link key={item.href} href={item.href} className="rounded-xl border border-border p-4 transition-colors hover:border-foreground/30">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-5">
            <h2 className="text-xl font-semibold tracking-tight">AI 工具入口</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">把 API Key、Base URL 和模型名称接入真实开发工具。</p>
            <div className="mt-4 grid gap-3">
              {practiceLinks.slice(2).map((item) => (
                <Link key={item.href} href={item.href} className="rounded-xl border border-border p-4 transition-colors hover:border-foreground/30">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-10 rounded-2xl border bg-card p-5">
          <h2 className="text-xl font-semibold tracking-tight">继续探索</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">学完基础概念后，可以按需求进入以下方向。</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/cloud-api" className="rounded-xl border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">API 官网入口</p>
              <p className="mt-1 text-xs text-muted-foreground">查找各平台 API 官网、API Key、Base URL 和模型名称</p>
            </Link>
            <Link href="/tutorial" className="rounded-xl border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">购买教程</p>
              <p className="mt-1 text-xs text-muted-foreground">查看主流 AI API 的开通、购买和配置教程</p>
            </Link>
            <Link href="/app" className="rounded-xl border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">AI 工具教程</p>
              <p className="mt-1 text-xs text-muted-foreground">学习 Codex、Claude Code、CC Switch 等工具接入</p>
            </Link>
            <Link href="/local-deploy" className="rounded-xl border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">本地部署</p>
              <p className="mt-1 text-xs text-muted-foreground">了解本地部署开源模型和 Ollama 工具</p>
            </Link>
            <Link href="/use-case" className="rounded-xl border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">场景推荐</p>
              <p className="mt-1 text-xs text-muted-foreground">按编程、写作、翻译、知识库等场景选 API</p>
            </Link>
            <Link href="/api-review" className="rounded-xl border border-border p-4 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">API 测评</p>
              <p className="mt-1 text-xs text-muted-foreground">查看不同模型和 API 的测评对比</p>
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-5">
          <h2 className="text-xl font-semibold tracking-tight">FAQ</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {faqItems.map((item) => (
              <div key={item.q} className="rounded-xl border border-border bg-background p-4">
                <h3 className="text-sm font-semibold">{item.q}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SidebarLayout>
  );
}
