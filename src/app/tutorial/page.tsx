import type { Metadata } from 'next';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { BreadcrumbSchema } from '@/components/seo/structured-data';
import { TutorialListContent } from '@/components/content/TutorialListContent';

export const metadata: Metadata = {
  title: 'AI API 购买教程大全',
  description: 'DeepSeek、MiniMax M3、OpenAI、Claude、通义千问、Gemini、Kimi 等主流 AI API 的注册、充值、API Key 创建和首次调用教程。',
};

export default function TutorialPage() {
  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://www.apiuspro.cn' },
          { name: '购买教程', url: 'https://www.apiuspro.cn/tutorial' },
        ]}
      />
      <TutorialListContent />
    </SidebarLayout>
  );
}
