export const SITE_PUBLISHED_AT = '2026-05-11';
export const DEFAULT_CONTENT_UPDATED_AT = '2026-05-11';

export const staticPageUpdatedAt: Record<string, string> = {
  '/': '2026-05-11',
  '/cloud-api': '2026-05-11',
  '/tutorial': '2026-05-11',
  '/api-review': '2026-05-11',
  '/app': '2026-05-11',
  '/local-deploy': '2026-05-11',
  '/faq': '2026-05-11',
  '/use-case': '2026-05-11',
};

export const apiUpdatedAtById: Record<string, string> = {
  mimo: '2026-05-11',
  deepseek: '2026-05-11',
  aliyun: '2026-05-11',
  zhipu: '2026-05-11',
  kimi: '2026-05-11',
  tencent: '2026-05-11',
  doubao: '2026-05-11',
  openai: '2026-05-11',
  claude: '2026-05-11',
  gemini: '2026-05-11',
};

export const reviewUpdatedAtBySlug: Record<string, string> = {
  'gpt-5.5': '2026-05-11',
  tongyi: '2026-05-11',
  claude: '2026-05-11',
  zhipu: '2026-05-11',
  kimi: '2026-05-11',
  tencent: '2026-05-11',
  doubao: '2026-05-11',
  deepseek: '2026-05-11',
  gemini: '2026-05-11',
};

export const appTutorialUpdatedAtById: Record<string, string> = {
  ccswitch: '2026-05-11',
  'claude-code': '2026-05-11',
  openclaw: '2026-05-11',
  'openclaw-feishu': '2026-05-11',
  'claudian-obsidian': '2026-05-11',
  'llm-wiki': '2026-05-11',
};

export const useCaseUpdatedAtById: Record<string, string> = {
  coding: '2026-05-11',
  knowledge: '2026-05-11',
  'content-creation': '2026-05-11',
  chatbot: '2026-05-11',
  translation: '2026-05-11',
  education: '2026-05-11',
};

export function getStaticPageUpdatedAt(path: string) {
  return staticPageUpdatedAt[path] ?? DEFAULT_CONTENT_UPDATED_AT;
}

export function getApiUpdatedAt(id: string) {
  return apiUpdatedAtById[id] ?? DEFAULT_CONTENT_UPDATED_AT;
}

export function getReviewUpdatedAt(slug: string) {
  return reviewUpdatedAtBySlug[slug] ?? DEFAULT_CONTENT_UPDATED_AT;
}

export function getAppTutorialUpdatedAt(id: string) {
  return appTutorialUpdatedAtById[id] ?? DEFAULT_CONTENT_UPDATED_AT;
}

export function getUseCaseUpdatedAt(id: string) {
  return useCaseUpdatedAtById[id] ?? DEFAULT_CONTENT_UPDATED_AT;
}

export function toSitemapLastModified(date: string) {
  return `${date}T00:00:00.000Z`;
}
