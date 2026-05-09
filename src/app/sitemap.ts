import { MetadataRoute } from 'next';
import { appTutorials, visibleAPIList, visibleProxyServices } from '@/lib/api-config';
import { reviewDetails } from '@/lib/review-config';
import { getAllUseCaseIds } from '@/lib/use-case-config';

const BASE_URL = 'https://apiuspro.cn';

export default function sitemap(): MetadataRoute.Sitemap {
  const allAPIs = [...visibleAPIList, ...visibleProxyServices];
  const apisWithTutorial = visibleAPIList.filter((a: { tutorial?: unknown }) => a.tutorial);
  const reviewSlugs = Object.keys(reviewDetails);
  const useCaseIds = getAllUseCaseIds();
  const now = new Date();

  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/cloud-api`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/tutorial`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/api-review`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/app`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/local-deploy`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  // API 详情页
  const apiPages: MetadataRoute.Sitemap = allAPIs.map(api => ({
    url: `${BASE_URL}/api/${api.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 教程详情页
  const tutorialPages: MetadataRoute.Sitemap = apisWithTutorial.map(api => ({
    url: `${BASE_URL}/tutorial/${api.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // API 测评详情页
  const reviewPages: MetadataRoute.Sitemap = reviewSlugs.map(slug => ({
    url: `${BASE_URL}/api-review/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 应用教程页
  const appPages: MetadataRoute.Sitemap = appTutorials.map(app => ({
    url: `${BASE_URL}/app/${app.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 场景推荐页
  const useCaseListPage: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/use-case`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];
  const useCaseDetailPages: MetadataRoute.Sitemap = useCaseIds.map(id => ({
    url: `${BASE_URL}/use-case/${id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...apiPages, ...tutorialPages, ...reviewPages, ...appPages, ...useCaseListPage, ...useCaseDetailPages];
}
