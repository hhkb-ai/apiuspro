import { apiList, appTutorials, faqCategories } from '@/lib/api-config';
import { learnArticles } from '@/lib/learn-config';
import { reviewDetails } from '@/lib/review-config';
import { errorSolutions } from '@/lib/error-solution-config';
import { useCases } from '@/lib/use-case-config';
import { fuzzyScore, sortByFuzzyScore } from '@/lib/fuzzy-search';

export interface SearchItem {
  id: string;
  name: string;
  desc: string;
  href: string;
  type: string;
  searchFields: string[];
}

function accessText(proxy?: boolean) {
  return proxy ? '需要代理' : '无需代理';
}

// API 列表
const apiSearchItems: SearchItem[] = apiList.map(api => ({
  id: `api-${api.id}`,
  name: api.name,
  desc: `${accessText(api.proxy)} · ${api.features.slice(0, 2).join('、')}`,
  href: `/api/${api.id}`,
  type: 'API',
  searchFields: [api.id, api.name, api.desc, api.free, ...api.features].filter((field): field is string => Boolean(field)),
}));

// 购买教程
const tutorialsList = apiList.filter(api => api.tutorial);
const tutorialSearchItems: SearchItem[] = tutorialsList.map(api => ({
  id: `tut-${api.id}`,
  name: api.tutorial?.title || `${api.name} 购买教程`,
  desc: '注册、支付、API Key 创建',
  href: `/tutorial/${api.id}`,
  type: '教程',
  searchFields: [api.id, api.name, api.tutorial?.title, api.tutorial?.subtitle, ...api.features].filter((field): field is string => Boolean(field)),
}));

// 应用教程
const appSearchItems: SearchItem[] = appTutorials.map(app => ({
  id: `app-${app.id}`,
  name: app.name,
  desc: app.desc,
  href: `/app/${app.id}`,
  type: '应用',
  searchFields: [app.id, app.name, app.desc, app.badge.text],
}));

// 学习文章
const learnSearchItems: SearchItem[] = learnArticles.map(article => ({
  id: `learn-${article.slug}`,
  name: article.title,
  desc: article.description,
  href: `/learn/${article.slug}`,
  type: '学习',
  searchFields: [article.slug, article.title, article.description, ...article.tags],
}));

// API 测评
const reviewSearchItems: SearchItem[] = Object.values(reviewDetails).map(review => ({
  id: `review-${review.slug}`,
  name: `${review.name} 测评`,
  desc: review.tlDr,
  href: `/api-review/${review.slug}`,
  type: '测评',
  searchFields: [review.slug, review.name, review.tlDr, ...review.useCases],
}));

// 错误解决方案
const errorSearchItems: SearchItem[] = errorSolutions.map(solution => ({
  id: `error-${solution.id}`,
  name: solution.shortTitle,
  desc: solution.summary,
  href: `/error/${solution.id}`,
  type: '错误',
  searchFields: [solution.id, solution.title, solution.shortTitle, solution.summary, solution.affectedArea],
}));

// 使用场景
const useCaseSearchItems: SearchItem[] = useCases.map(useCase => ({
  id: `usecase-${useCase.id}`,
  name: useCase.name,
  desc: useCase.description,
  href: `/use-case/${useCase.id}`,
  type: '场景',
  searchFields: [useCase.id, useCase.name, useCase.description, ...useCase.keywords],
}));

// FAQ (从 api-config 的 faqCategories 提取)
const faqSearchItems: SearchItem[] = [];
if (faqCategories) {
  faqCategories.forEach(category => {
    category.items.forEach(item => {
      faqSearchItems.push({
        id: `faq-${category.title}-${item.question}`,
        name: item.question,
        desc: item.answer,
        href: '/faq',
        type: 'FAQ',
        searchFields: [item.question, item.answer, category.title],
      });
    });
  });
}

// 成本计算器入口
const calculatorSearchItem: SearchItem = {
  id: 'calculator',
  name: 'DeepSeek 费用计算器',
  desc: '估算 API 调用成本',
  href: '/api/deepseek',
  type: '工具',
  searchFields: ['成本计算器', '费用计算', '价格估算', 'deepseek费用', 'api费用'],
};

// 合并所有搜索项
export const allSearchItems: SearchItem[] = [
  ...apiSearchItems,
  ...tutorialSearchItems,
  ...appSearchItems,
  ...learnSearchItems,
  ...reviewSearchItems,
  ...errorSearchItems,
  ...useCaseSearchItems,
  ...faqSearchItems,
  calculatorSearchItem,
];

// 统一搜索函数
export function searchAll(query: string, maxResults: number = 8) {
  const results = sortByFuzzyScore(allSearchItems, query, item => item.searchFields);

  // 按类型分组，每种类型最多取一定数量，避免单一类型占满结果
  const typeLimits: Record<string, number> = {
    'API': 2,
    '教程': 2,
    '应用': 2,
    '学习': 2,
    '测评': 1,
    '错误': 1,
    '场景': 1,
    'FAQ': 1,
    '工具': 1,
    '页面': 1,
  };

  const typeCounts: Record<string, number> = {};
  const filtered: SearchItem[] = [];

  for (const item of results) {
    const count = typeCounts[item.type] || 0;
    const limit = typeLimits[item.type] || 1;
    if (count < limit) {
      filtered.push(item);
      typeCounts[item.type] = count + 1;
    }
    if (filtered.length >= maxResults) break;
  }

  return filtered;
}

// 精确匹配（用于 Enter 跳转）
export function findExactMatch(query: string) {
  const normalizedQuery = query.toLowerCase().trim();

  // 先找 app 精确匹配
  const appMatch = appTutorials.find(app => fuzzyScore(normalizedQuery, [app.id, app.name]) >= 85);
  if (appMatch) return `/app/${appMatch.id}`;

  // 再找 API 精确匹配
  const apiMatch = apiList.find(api => fuzzyScore(normalizedQuery, [api.id, api.name]) >= 85);
  if (apiMatch) return `/api/${apiMatch.id}`;

  // 找学习文章精确匹配
  const learnMatch = learnArticles.find(article => fuzzyScore(normalizedQuery, [article.slug, article.title]) >= 85);
  if (learnMatch) return `/learn/${learnMatch.slug}`;

  // 找测评精确匹配
  const reviewMatch = Object.values(reviewDetails).find(review => fuzzyScore(normalizedQuery, [review.slug, review.name]) >= 85);
  if (reviewMatch) return `/api-review/${reviewMatch.slug}`;

  // 找错误解决方案精确匹配
  const errorMatch = errorSolutions.find(solution => fuzzyScore(normalizedQuery, [solution.id, solution.shortTitle]) >= 85);
  if (errorMatch) return `/error/${errorMatch.id}`;

  // 找使用场景精确匹配
  const useCaseMatch = useCases.find(useCase => fuzzyScore(normalizedQuery, [useCase.id, useCase.name]) >= 85);
  if (useCaseMatch) return `/use-case/${useCaseMatch.id}`;

  return null;
}
