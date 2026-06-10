import Link from 'next/link';
import type { Metadata } from 'next';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '页面未找到',
  description: '你访问的页面不存在或已移动。可以返回首页、学习中心或购买教程列表继续浏览 API知识站。',
};

export default function NotFound() {
  return (
    <SidebarLayout>
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">页面未找到</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          这个页面可能已经被移动、删除，或当前链接输入有误。你可以返回首页，也可以继续查看 AI API 学习、购买教程和报错解决内容。
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">返回首页</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/learn">学习中心</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/tutorial">购买教程</Link>
          </Button>
        </div>

        <div className="mt-10 grid w-full gap-3 sm:grid-cols-3">
          {[
            { title: 'API 官网入口', href: '/cloud-api', desc: '查看主流模型平台入口' },
            { title: '报错解决', href: '/error', desc: '排查 Key、额度和限流问题' },
            { title: '本地部署', href: '/local-deploy', desc: '学习 Ollama 与开源模型部署' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border bg-card p-4 text-left transition-colors hover:border-foreground/30"
            >
              <h2 className="text-sm font-semibold">{item.title}</h2>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
}
