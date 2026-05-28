'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { BeianLinks } from '@/components/layout/BeianLinks';

const navigation = [
  { name: '返回首页', href: '/' },
  { name: 'AI 新手教程', href: '/learn' },
  { name: 'API 官网入口', href: '/cloud-api' },
  { name: 'API 测评对比', href: '/api-review' },
  { name: 'API 购买教程', href: '/tutorial' },
  { name: 'API 应用教程', href: '/app' },
  { name: 'API 错误解决', href: '/error' },
  { name: '按场景选 API', href: '/use-case' },
  { name: '本地部署教程', href: '/local-deploy' },
  { name: 'AI 学习', href: '/learn' },
];

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-background flex content-article">
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-border lg:bg-card">
        <div className="h-16 px-6 border-b border-border flex flex-col justify-center">
          <Link href="/" className="font-semibold tracking-tight">
            API知识站
          </Link>
          <span className="text-xs text-muted-foreground">学习、对比与使用指南</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            适合初学者的API知识站
          </p>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background/95 border-b border-border z-50 flex items-center justify-between px-4 backdrop-blur">
        <div className="min-w-0 flex flex-col">
          <Link href="/" className="font-semibold tracking-tight min-h-[44px] flex items-center">
            API知识站
          </Link>
          <span className="text-xs text-muted-foreground">学习、对比与使用指南</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          type="button"
          className="min-h-[44px]"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '关闭' : '菜单'}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden fixed inset-0 top-16 bg-background/95 z-40 backdrop-blur"
          onClick={() => setMobileMenuOpen(false)}
        >
          <nav className="p-4 space-y-1.5" onClick={(event) => event.stopPropagation()}>
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center px-4 py-3 min-h-[44px] rounded-md text-base font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      <main className="min-w-0 flex-1 lg:ml-64 flex flex-col">
        <div className="min-w-0 flex-1 pt-16 lg:pt-0">
          {children}
        </div>
        <footer className="border-t border-border px-4 py-6 text-center text-sm text-muted-foreground">
          <p className="text-xs mb-2">注：人民币价格按 1 USD ≈ 7.25 RMB 估算，实际价格以各平台官方结算为准。</p>
          <BeianLinks />
        </footer>
      </main>
    </div>
  );
}
