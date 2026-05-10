import type { Metadata } from 'next';
import { getAppTutorialById } from '@/lib/api-config';
import { apiPurchaseKeywords, coreLongTailKeywords, toolWorkflowKeywords, uniqueKeywords } from '@/lib/seo-keywords';

export function generateStaticParams() {
  // 此处的静态参数生成由 page.tsx 负责，layout 中仅处理 metadata
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
  const canonicalUrl = `https://apiuspro.cn/app/${id}`;
  return {
    title: `${app.name} 使用教程`,
    description: `${app.name}：${app.desc}`,
    keywords: uniqueKeywords([
      `${app.name}教程`,
      `${app.name}安装`,
      `${app.name}配置`,
      `${app.name} API配置`,
      `${app.name} API Key配置`,
      `${app.name} Base URL配置`,
      `${app.name}使用方法`,
      `${app.name}接入DeepSeek`,
      `${app.name}接入OpenAI兼容接口`,
      `AI工具教程`,
    ], coreLongTailKeywords, toolWorkflowKeywords, apiPurchaseKeywords),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${app.name} 使用教程 | API知识站`,
      description: app.desc,
      url: canonicalUrl,
      type: 'article',
    },
  };
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
