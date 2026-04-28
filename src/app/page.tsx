import type { Metadata } from 'next';
import HomeClient from './home-client';

export const metadata: Metadata = {
  title: 'API知识站 - AI API 选型、购买、接入一站式指南',
  description:
    '覆盖 DeepSeek、OpenAI、Claude、通义千问、Gemini 等 10+ AI API 的官网入口、价格对比、免费额度、购买教程与本地部署指南。适合初学者的 AI API 学习平台。',
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
  return <HomeClient />;
}
