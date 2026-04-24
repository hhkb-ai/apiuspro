'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: '返回首页', href: '/' },
  { name: 'API官网', href: '/cloud-api' },
  { name: 'API测评', href: '/api-review' },
  { name: '购买教程', href: '/tutorial' },
  { name: 'API应用', href: '/#app-section' },
  { name: '本地部署', href: '/local-deploy' },
];

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* 桌面端侧边栏 */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-border lg:bg-background">
        {/* Logo */}
        <div className="flex items-center gap-2 h-16 px-6 border-b border-border">
          <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
            <span className="text-background font-bold text-sm">API</span>
          </div>
          <span className="font-bold text-lg">API市场</span>
        </div>

        {/* 导航 */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* 底部信息 */}
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            适合初学者的API知识站
          </p>
        </div>
      </aside>

      {/* 移动端头部 */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
            <span className="text-background font-bold text-sm">API</span>
          </div>
          <span className="font-bold text-lg">API市场</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '关闭' : '菜单'}
        </Button>
      </div>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background z-40">
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors',
                    isActive
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* 主内容区 */}
      <main className="flex-1 lg:ml-64">
        <div className="pt-16 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}
