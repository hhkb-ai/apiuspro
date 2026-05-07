import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '场景推荐 — 按用途选择最适合的 AI API',
  description:
    '不知道该用哪个 AI API？按编程开发、个人知识库、数据分析等实际场景，为你推荐最合适的模型与服务。涵盖 Claude、GPT-5.5、DeepSeek、Gemini、通义千问等主流 API 对比。',
  keywords: [
    'AI API场景推荐',
    '写代码用哪个AI',
    'AI编程助手推荐',
    '个人知识库AI推荐',
    'AI数据分析工具',
    'AI API怎么选',
    '哪个AI模型适合编程',
    'AI文档处理API',
    'Claude和GPT哪个好',
    'DeepSeek适合什么场景',
    'AI API对比推荐',
    '国产AI API推荐',
  ],
  alternates: {
    canonical: 'https://apiuspro.cn/use-case',
  },
  openGraph: {
    title: '场景推荐 — 按用途选择最适合的 AI API',
    description:
      '按编程开发、个人知识库、数据分析等实际场景，为你推荐最合适的 AI 模型与服务。',
    url: 'https://apiuspro.cn/use-case',
    siteName: 'API知识站',
    locale: 'zh_CN',
    type: 'website',
  },
};

export default function UseCaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
