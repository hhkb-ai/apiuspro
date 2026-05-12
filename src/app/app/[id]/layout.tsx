import type { Metadata } from 'next';
import { getAppTutorialById } from '@/lib/api-config';
import { generateMetadata as generateTdkMetadata } from '@/lib/tdk';

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const app = getAppTutorialById(id);
  if (!app) return { title: '教程未找到' };

  return generateTdkMetadata('/app/:id', {
    id,
    name: app.name,
    desc: app.desc,
  });
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
