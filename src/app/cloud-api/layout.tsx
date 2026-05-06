import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI API 官网大全 — 国内外主流大模型 API 官方入口汇总',
  description:
    '覆盖 DeepSeek、OpenAI、Claude、通义千问、Gemini 等 11 个国内外主流 AI API 官网入口，按无需代理/需要代理分类，含免费额度、功能特性及详细说明。',
  alternates: {
    canonical: 'https://apiuspro.cn/cloud-api',
  },
  openGraph: {
    title: 'AI API 官网大全 — 国内外主流大模型 API 官方入口汇总',
    description:
      '覆盖 11 个国内外主流 AI API 官网入口，按无需代理/需要代理分类，快速找到适合你的大模型服务。',
    url: 'https://apiuspro.cn/cloud-api',
    siteName: 'API知识站',
    locale: 'zh_CN',
    type: 'website',
  },
};

export default function CloudAPILayout({ children }: { children: React.ReactNode }) {
  return children;
}
