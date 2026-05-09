import type { Metadata } from 'next';
import HomeClient from './home-client';
import { ItemListSchema } from '@/components/seo/structured-data';
import { apiList, appTutorials } from '@/lib/api-config';

export const metadata: Metadata = {
  title: 'API知识站 - AI API 选型、购买、接入一站式指南',
  description:
    '覆盖 DeepSeek、OpenAI、Claude、通义千问、Gemini 等 10+ AI API 的官网入口、价格对比、免费额度、购买教程与本地部署指南。适合初学者的 AI API 学习平台。',
  keywords: [
    'API知识站',
    'AI API',
    'API购买教程',
    'API测评',
    '本地部署',
    'OpenAI',
    'Claude',
    'Gemini',
    'DeepSeek',
    '通义千问',
    'API怎么买',
    'API免费额度',
    'API注册教程',
    'AI编程助手',
    'AI API对比',
    'API代充',
    'API订阅',
    '国内AI API',
  ],
  alternates: {
    canonical: 'https://apiuspro.cn',
  },
  openGraph: {
    title: 'API知识站 - AI API 选型、购买、接入一站式指南',
    description:
      '覆盖 DeepSeek、OpenAI、Claude 等 10+ AI API 的一站式指南，含官网入口、购买教程和本地部署。',
    url: 'https://apiuspro.cn',
    siteName: 'API知识站',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: 'https://apiuspro.cn/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'API知识站 - AI API 选型与购买教程',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API知识站 - AI API 选型、购买、接入一站式指南',
    description:
      '覆盖 DeepSeek、OpenAI、Claude 等 10+ AI API 的一站式指南。',
    images: ['https://apiuspro.cn/opengraph-image'],
  },
};

export default function Home() {
  return (
    <>
      <ItemListSchema
        name="热门 AI API"
        items={apiList.slice(0, 8).map(api => ({
          name: api.name,
          url: `https://apiuspro.cn/api/${api.id}`,
          description: api.desc,
        }))}
      />
      <ItemListSchema
        name="API 应用教程"
        items={appTutorials.map(tutorial => ({
          name: tutorial.name,
          url: `https://apiuspro.cn/app/${tutorial.id}`,
          description: tutorial.desc,
        }))}
      />
      <HomeClient />
    </>
  );
}
