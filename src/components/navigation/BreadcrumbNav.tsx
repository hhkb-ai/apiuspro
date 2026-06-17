import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbNavItem {
  label: string;
  href?: string;
}

/**
 * 可视化面包屑导航组件
 * 与 JSON-LD BreadcrumbSchema 配合使用，为用户提供页面层级导航
 */
export function BreadcrumbNav({ items }: { items: BreadcrumbNavItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="面包屑导航" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="mx-1 h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
