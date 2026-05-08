import type { Metadata } from 'next';
import { WebSiteSchema, OrganizationSchema } from '@/components/seo/structured-data';
import { ThemeProvider } from '@/components/theme-provider';
import DevInspector from '@/components/dev-inspector';
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
    'AI编程助手推荐',
    '写代码用哪个AI',
    'AI数据分析工具',
    '个人知识库AI',
    'Claude和GPT哪个好',
    '国产AI API推荐',
    'AI API场景推荐',
    'AI API对比',
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
    'msvalidate.01': 'BF3E423F579BD5F854833A4A587DFF93',
    'baidu-site-verification': 'codeva-ruS0096fnj',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* 百度自动推送 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var bp = document.createElement('script');
                var curProtocol = window.location.protocol.split(':')[0];
                if (curProtocol === 'https') {
                  bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
                } else {
                  bp.src = 'http://push.zhanzhang.baidu.com/push.js';
                }
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(bp, s);
              })();
            `,
          }}
        />
      </head>
      <body className={`antialiased`}>
        <ThemeProvider>
          <DevInspector />
          <WebSiteSchema />
          <OrganizationSchema />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
