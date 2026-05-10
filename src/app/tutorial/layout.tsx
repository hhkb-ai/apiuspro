import type { Metadata } from 'next';
import { apiPurchaseKeywords, coreLongTailKeywords, uniqueKeywords } from '@/lib/seo-keywords';

export const metadata: Metadata = {
  title: 'AI API 购买教程大全 — 零基础国内用户订阅与接入指南',
  description:
    '覆盖 DeepSeek、OpenAI、Claude、通义千问、Gemini 等 AI API 的完整购买教程，含国内支付方案、注册步骤、API Key 配置及代码示例，零基础也能完成订阅。',
  keywords: uniqueKeywords([
    'API购买教程',
    'API怎么买',
    'API订阅教程',
    'API注册教程',
    'OpenAI怎么买',
    'Claude怎么订阅',
    'DeepSeek API购买',
    'API Key获取',
    '国内支付API',
    'API代充教程',
    'API充值方法',
    '零基础API接入',
  ], coreLongTailKeywords, apiPurchaseKeywords),
  alternates: {
    canonical: 'https://apiuspro.cn/tutorial',
  },
  openGraph: {
    title: 'AI API 购买教程大全 — 零基础国内用户订阅与接入指南',
    description:
      '覆盖国内外主流 AI API 的完整购买教程，含国内支付方案、注册步骤和代码示例。',
    url: 'https://apiuspro.cn/tutorial',
    siteName: 'API知识站',
    locale: 'zh_CN',
    type: 'website',
  },
};

export default function TutorialLayout({ children }: { children: React.ReactNode }) {
  return children;
}
