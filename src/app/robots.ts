import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = 'https://www.apiuspro.cn/sitemap.xml';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/preview-home'],
      },
    ],
    sitemap: sitemapUrl,
  };
}
