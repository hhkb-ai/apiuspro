import { MetadataRoute } from 'next';
import { appTutorials, visibleAPIList, visibleProxyServices } from '@/lib/api-config';
import { reviewDetails } from '@/lib/review-config';
import { getAllUseCaseIds } from '@/lib/use-case-config';
import { getAllErrorSolutionIds } from '@/lib/error-solution-config';
import { learnTutorials } from '@/lib/learn-tutorials';
import {
  getApiUpdatedAt,
  getAppTutorialUpdatedAt,
  getErrorSolutionUpdatedAt,
  getReviewUpdatedAt,
  getStaticPageUpdatedAt,
  getUseCaseUpdatedAt,
  toSitemapLastModified,
} from '@/lib/content-updates';

const BASE_URL = 'https://www.apiuspro.cn';

export default function sitemap(): MetadataRoute.Sitemap {
  const allAPIs = [...visibleAPIList, ...visibleProxyServices];
  const apisWithTutorial = visibleAPIList.filter((a: { tutorial?: unknown }) => a.tutorial);
  const reviewSlugs = Object.keys(reviewDetails);
  const useCaseIds = getAllUseCaseIds();
  const errorSolutionIds = getAllErrorSolutionIds();

  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: toSitemapLastModified(getStaticPageUpdatedAt('/')), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/cloud-api`, lastModified: toSitemapLastModified(getStaticPageUpdatedAt('/cloud-api')), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/tutorial`, lastModified: toSitemapLastModified(getStaticPageUpdatedAt('/tutorial')), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/api-review`, lastModified: toSitemapLastModified(getStaticPageUpdatedAt('/api-review')), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/learn`, lastModified: toSitemapLastModified(getStaticPageUpdatedAt('/learn')), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/app`, lastModified: toSitemapLastModified(getStaticPageUpdatedAt('/app')), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/error`, lastModified: toSitemapLastModified(getStaticPageUpdatedAt('/error')), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/local-deploy`, lastModified: toSitemapLastModified(getStaticPageUpdatedAt('/local-deploy')), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: toSitemapLastModified(getStaticPageUpdatedAt('/faq')), changeFrequency: 'monthly', priority: 0.7 },
  ];

  // AI 新手学习页
  const learnPages: MetadataRoute.Sitemap = learnTutorials.map(article => ({
    url: `${BASE_URL}${article.path}`,
    lastModified: toSitemapLastModified(getStaticPageUpdatedAt(article.path)),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // API 详情页
  const apiPages: MetadataRoute.Sitemap = allAPIs.map(api => ({
    url: `${BASE_URL}/api/${api.id}`,
    lastModified: toSitemapLastModified(getApiUpdatedAt(api.id)),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 教程详情页
  const tutorialPages: MetadataRoute.Sitemap = apisWithTutorial.map(api => ({
    url: `${BASE_URL}/tutorial/${api.id}`,
    lastModified: toSitemapLastModified(getApiUpdatedAt(api.id)),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // API 测评详情页
  const reviewPages: MetadataRoute.Sitemap = reviewSlugs.map(slug => ({
    url: `${BASE_URL}/api-review/${slug}`,
    lastModified: toSitemapLastModified(getReviewUpdatedAt(slug)),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 应用教程页
  const appPages: MetadataRoute.Sitemap = appTutorials.map(app => ({
    url: `${BASE_URL}/app/${app.id}`,
    lastModified: toSitemapLastModified(getAppTutorialUpdatedAt(app.id)),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 错误解决页
  const errorPages: MetadataRoute.Sitemap = errorSolutionIds.map(id => ({
    url: `${BASE_URL}/error/${id}`,
    lastModified: toSitemapLastModified(getErrorSolutionUpdatedAt(id)),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 场景推荐页
  const useCaseListPage: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/use-case`, lastModified: toSitemapLastModified(getStaticPageUpdatedAt('/use-case')), changeFrequency: 'weekly', priority: 0.8 },
  ];
  const useCaseDetailPages: MetadataRoute.Sitemap = useCaseIds.map(id => ({
    url: `${BASE_URL}/use-case/${id}`,
    lastModified: toSitemapLastModified(getUseCaseUpdatedAt(id)),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...learnPages, ...apiPages, ...tutorialPages, ...reviewPages, ...appPages, ...errorPages, ...useCaseListPage, ...useCaseDetailPages];
}
