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
  { name: 'API应用', href: '/', hash: '#app-section' },
  { name: '本地部署', href: '/local-deploy' },
];

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-border lg:bg-card">
        <div className="h-16 px-6 border-b border-border flex flex-col justify-center">
          <Link href="/" className="font-semibold tracking-tight">
            API知识站
          </Link>
          <span className="text-xs text-muted-foreground">学习、对比与使用指南</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1.5">
          {navigation.map((item) => {
            const href = item.hash && pathname === '/' ? item.hash : item.href + (item.hash || '');
            const isActive = !item.hash && pathname === item.href;
            return (
              <Link
                key={item.name}
                href={href}
                className={cn(
                  'flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-muted text-foreground'
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

      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center justify-between px-4">
        <div className="flex flex-col">
          <Link href="/" className="font-semibold tracking-tight">
            API知识站
          </Link>
          <span className="text-xs text-muted-foreground">学习、对比与使用指南</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '关闭' : '菜单'}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background z-40">
          <nav className="p-4 space-y-1.5">
            {navigation.map((item) => {
              const href = item.hash && pathname === '/' ? item.hash : item.href + (item.hash || '');
              const isActive = !item.hash && pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center px-4 py-3 rounded-md text-base font-medium transition-colors',
                    isActive
                      ? 'bg-muted text-foreground'
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

      <main className="flex-1 lg:ml-64">
        <div className="pt-16 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}
