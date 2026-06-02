export interface APIInfoField {
  label: string;
  value: React.ReactNode;
}

interface APIInfoTableProps {
  fields: APIInfoField[];
}

/**
 * API 信息总览表格
 * - 桌面端: 两列表格布局
 * - 移动端: 键值卡片，避免横向挤压
 */
export function APIInfoTable({ fields }: APIInfoTableProps) {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-xl font-semibold tracking-tight">API 信息总览</h2>

      {/* 桌面端: 表格 */}
      <div className="hidden md:block rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {fields.map((field) => (
              <tr key={field.label} className="border-b border-border last:border-b-0">
                <td className="w-40 shrink-0 bg-muted/40 px-4 py-3 font-medium text-foreground whitespace-nowrap">
                  {field.label}
                </td>
                <td className="px-4 py-3 text-muted-foreground break-all">
                  {field.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 移动端: 键值卡片 */}
      <div className="md:hidden space-y-3">
        {fields.map((field) => (
          <div key={field.label} className="rounded-lg border border-border bg-card px-4 py-3">
            <p className="mb-1 text-xs font-medium text-muted-foreground">{field.label}</p>
            <div className="text-sm text-foreground break-all">{field.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
