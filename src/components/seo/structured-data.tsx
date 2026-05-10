/**
 * JSON-LD 结构化数据组件集合
 * 用于向搜索引擎提供网站、文章、面包屑等语义信息
 */

// ==================== WebSite Schema ====================
export function WebSiteSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'API知识站',
    url: 'https://apiuspro.cn',
    description: '一站式 AI API 学习、选型、购买教程与本地部署指南',
    inLanguage: 'zh-CN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://apiuspro.cn/cloud-api?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ==================== Organization Schema ====================
export function OrganizationSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'API知识站',
    url: 'https://apiuspro.cn',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ==================== BreadcrumbList Schema ====================
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ==================== Article Schema (用于教程页) ====================
export function ArticleSchema({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName = 'API知识站',
}: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    ...(imageUrl && { image: imageUrl }),
    author: {
      '@type': 'Organization',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'API知识站',
    },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    inLanguage: 'zh-CN',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ==================== FAQ Schema ====================
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ==================== TechArticle Schema (用于 API 教程) ====================
export function TechArticleSchema({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  proficiencyLevel = 'Beginner',
}: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished?: string;
  proficiencyLevel?: 'Beginner' | 'Intermediate' | 'Expert';
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url,
    ...(imageUrl && { image: imageUrl }),
    author: {
      '@type': 'Organization',
      name: 'API知识站',
    },
    publisher: {
      '@type': 'Organization',
      name: 'API知识站',
    },
    ...(datePublished && { datePublished }),
    inLanguage: 'zh-CN',
    proficiencyLevel,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ==================== ItemList Schema（用于列表和首页发现区） ====================
interface ItemListEntry {
  name: string;
  url: string;
  description?: string;
}

export function ItemListSchema({
  name,
  items,
}: {
  name: string;
  items: ItemListEntry[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: item.url,
      name: item.name,
      ...(item.description && { description: item.description }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ==================== HowTo Schema (用于教程指南) ====================
interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

export function HowToSchema({
  name,
  description,
  steps,
  totalTime,
  estimatedCost,
  supply,
  tool,
}: {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
  estimatedCost?: string;
  supply?: string[];
  tool?: string[];
}) {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
      ...(step.url && { url: step.url }),
    })),
    inLanguage: 'zh-CN',
  };

  if (totalTime) jsonLd.totalTime = totalTime;
  if (estimatedCost) jsonLd.estimatedCost = estimatedCost;
  if (supply) {
    jsonLd.supply = supply.map(s => ({ '@type': 'HowToSupply', name: s }));
  }
  if (tool) {
    jsonLd.tool = tool.map(t => ({ '@type': 'HowToTool', name: t }));
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ==================== Site FAQ Schema（用于全站高频搜索意图） ====================
export function SiteIntentFAQSchema() {
  const items = [
    {
      question: 'AI API 新手应该怎么选？',
      answer: '新手优先选择国内直连、有免费额度、兼容 OpenAI 接口格式、购买教程完整的 API。先用小额或免费额度跑通真实任务，再决定是否长期使用。',
    },
    {
      question: '国内用户可以直接使用哪些 AI API？',
      answer: '国内用户可以优先查看 DeepSeek、通义千问、智谱 GLM、Kimi、腾讯混元、豆包等无需代理或接入门槛较低的 API，并根据官网说明确认最新注册和支付要求。',
    },
    {
      question: '购买 API 前需要确认什么？',
      answer: '购买前应确认官网入口、注册验证方式、支付方式、免费额度、限速规则、API Key 保存方式、Base URL 和模型名称。',
    },
    {
      question: 'API Key 拿到后怎么接入工具？',
      answer: '一般需要在工具中填写 API Key、Base URL 和模型名称。若工具支持 OpenAI 兼容接口，可以优先使用兼容格式；多工具切换可使用 CC Switch 管理配置。',
    },
  ];

  return <FAQSchema items={items} />;
}
