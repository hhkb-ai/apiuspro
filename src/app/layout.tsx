import type { Metadata } from 'next';
import Script from 'next/script';
import { OrganizationSchema, SiteIntentFAQSchema, WebSiteSchema } from '@/components/seo/structured-data';
import { ThemeProvider } from '@/components/theme-provider';
import { ReturnPositionRestorer } from '@/components/navigation/ReturnNavigation';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.apiuspro.cn'),
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
    images: ['https://www.apiuspro.cn/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.apiuspro.cn',
  },
  verification: {
    google: [
      'gJvidOQsRtz4K7Ce8O6kVZLJjakAJJBHzoZuwYSBQSw',
      '0zYeQjZii9m76gyCCJ_fLdwgZKXl28Ymlr80m-sjY3Y',
    ],
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
      <body className={`antialiased`}>
        <Script id="baidu-auto-push" strategy="afterInteractive">
          {`
            (function(){
              var bp = document.createElement('script');
              bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(bp, s);
            })();
          `}
        </Script>
        <script
          id="baidu-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?cf2ce3bbd6754443f7265ee16dc77313";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
              })();
            `,
          }}
        />
        <Script charSet="UTF-8" id="LA_COLLECT" src="https://sdk.51.la/js-sdk-pro.min.js" strategy="beforeInteractive" />
        <Script id="la-collect-init" strategy="beforeInteractive">
          {`
            (function(){
              var retries = 0;
              function initLA(){
                if (window.LA && window.LA.init) {
                  window.LA.init({id:"3Ptg8CrG0LkgsgHo",ck:"3Ptg8CrG0LkgsgHo"});
                  return;
                }
                if (retries < 20) {
                  retries += 1;
                  window.setTimeout(initLA, 200);
                }
              }
              initLA();
            })();
          `}
        </Script>
        <ThemeProvider>
          <ReturnPositionRestorer />
          <WebSiteSchema />
          <OrganizationSchema />
          <SiteIntentFAQSchema />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
