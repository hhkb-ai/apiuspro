import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import { WebSiteSchema, OrganizationSchema } from '@/components/seo/structured-data';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://apiuspro.cn'),
  title: {
    default: 'API知识站',
    template: '%s | API知识站',
  },
  description: '一站式 API 学习、选型、购买教程与本地部署指南。',
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
    'API订阅',
    'API代充',
    'API免费额度',
    'API注册教程',
  ],
  authors: [{ name: 'API知识站' }],
  generator: 'Next.js',
  openGraph: {
    title: 'API知识站',
    description: '一站式 API 学习、选型、购买教程与本地部署指南。',
    siteName: 'API知识站',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'API知识站',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API知识站',
    description: '一站式 AI API 学习、选型、购买教程与本地部署指南。',
    images: ['https://apiuspro.cn/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://apiuspro.cn',
  },
  other: {
    'baidu-site-verification': 'codeva-ruS0096fnj',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        <WebSiteSchema />
        <OrganizationSchema />
        {children}
      </body>
    </html>
  );
}
