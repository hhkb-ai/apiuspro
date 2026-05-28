import type { Metadata } from 'next';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { BreadcrumbSchema } from '@/components/seo/structured-data';
import { CloudApiContent } from '@/components/content/CloudApiContent';

export const metadata: Metadata = {
  title: 'AI API 官网入口与对比',
  description: '汇总 DeepSeek、OpenAI、Claude、通义千问、Gemini、Kimi、智谱等国内外主流 AI API 的官网入口、API Key 创建位置、Base URL 和模型名称，按无需代理和需要代理分类整理，帮你快速找到目标平台并开始接入。',
};

export default function CloudAPIPage() {
  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://www.apiuspro.cn' },
          { name: 'API官网', url: 'https://www.apiuspro.cn/cloud-api' },
        ]}
      />
      <CloudApiContent />
    </SidebarLayout>
  );
}
