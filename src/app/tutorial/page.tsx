import type { Metadata } from 'next';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { BreadcrumbSchema } from '@/components/seo/structured-data';
import { TutorialListContent } from '@/components/content/TutorialListContent';

export const metadata: Metadata = {
  title: 'AI 与 API 新手学习中心',
  description: '从 AI 基础、API Key、Base URL、模型名称，到 Codex、Claude Code、CC Switch 工具接入，按步骤学习 AI 的实际使用方法。',
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
