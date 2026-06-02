interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  id?: string;
}

/**
 * 可折叠章节
 * - 桌面端: 普通 section，标题用 h2
 * - 移动端: 用 <details> 折叠，内容仍在 SSR HTML 中
 *
 * 不使用客户端懒加载，确保折叠内容对搜索引擎可见。
 */
export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  className = '',
  id,
}: CollapsibleSectionProps) {
  return (
    <>
      {/* 桌面端: 普通 section */}
      <section className={`mb-8 hidden md:block ${className}`} id={id}>
        <h2 className="mb-4 text-xl font-semibold tracking-tight">{title}</h2>
        {children}
      </section>

      {/* 移动端: 折叠 */}
      <div className={`mb-6 md:hidden ${className}`} id={id}>
        <details className="rounded-2xl border border-border bg-card overflow-hidden" open={defaultOpen}>
          <summary className="cursor-pointer select-none px-4 py-3 text-base font-semibold text-foreground min-h-[44px] flex items-center">
            {title}
          </summary>
          <div className="border-t border-border px-4 py-4">
            {children}
          </div>
        </details>
      </div>
    </>
  );
}
