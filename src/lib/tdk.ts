import tdkConfig from './tdk.json';

export interface TdkEntry {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  openGraph?: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    locale: string;
    type: string;
  };
  twitter?: {
    card: string;
    title: string;
    description: string;
    images: string[];
  };
}

export interface TdkMeta {
  siteName: string;
  locale: string;
  defaultImage: string;
  imageWidth: number;
  imageHeight: number;
}

/**
 * 解析TDK模板中的变量
 * 支持 {{variable}} 格式的模板变量
 */
function resolveTemplate(template: string, vars: Record<string, string | number | boolean>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = vars[key];
    if (value === undefined || value === null) return '';
    return String(value);
  });
}

/**
 * 解析关键词数组中的模板变量
 */
function resolveKeywords(keywords: string[], vars: Record<string, string | number | boolean>): string[] {
  return keywords.map(keyword => resolveTemplate(keyword, vars));
}

/**
 * 获取指定路由的TDK配置
 * @param routePath 路由路径，如 "/" 或 "/api/deepseek"
 * @param vars 模板变量，用于替换动态路由中的占位符
 * @returns TdkEntry | null
 */
export function getTdkConfig(
  routePath: string,
  vars?: Record<string, string | number | boolean>
): TdkEntry | null {
  const routes = tdkConfig.routes as Record<string, TdkEntry>;

  // 精确匹配静态路由
  if (routes[routePath]) {
    const entry = routes[routePath];
    if (!vars) return entry;

    return {
      ...entry,
      title: resolveTemplate(entry.title, vars),
      description: resolveTemplate(entry.description, vars),
      keywords: resolveKeywords(entry.keywords, vars),
      canonical: resolveTemplate(entry.canonical, vars),
      openGraph: entry.openGraph
        ? {
            ...entry.openGraph,
            title: resolveTemplate(entry.openGraph.title, vars),
            description: resolveTemplate(entry.openGraph.description, vars),
            url: resolveTemplate(entry.openGraph.url, vars),
          }
        : undefined,
    };
  }

  // 尝试匹配动态路由模式
  const dynamicPatterns = Object.keys(routes).filter(key => key.includes(':'));

  for (const pattern of dynamicPatterns) {
    const patternParts = pattern.split('/');
    const pathParts = routePath.split('/');

    if (patternParts.length !== pathParts.length) continue;

    const extractedVars: Record<string, string> = {};
    let match = true;

    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        // 动态参数
        const paramName = patternParts[i].slice(1);
        extractedVars[paramName] = pathParts[i];
      } else if (patternParts[i] !== pathParts[i]) {
        match = false;
        break;
      }
    }

    if (match) {
      const entry = routes[pattern];
      const allVars = { ...extractedVars, ...vars };

      return {
        ...entry,
        title: resolveTemplate(entry.title, allVars),
        description: resolveTemplate(entry.description, allVars),
        keywords: resolveKeywords(entry.keywords, allVars),
        canonical: resolveTemplate(entry.canonical, allVars),
        openGraph: entry.openGraph
          ? {
              ...entry.openGraph,
              title: resolveTemplate(entry.openGraph.title, allVars),
              description: resolveTemplate(entry.openGraph.description, allVars),
              url: resolveTemplate(entry.openGraph.url, allVars),
            }
          : undefined,
      };
    }
  }

  return null;
}

/**
 * 获取站点元数据
 */
export function getTdkMeta(): TdkMeta {
  return tdkConfig.meta as TdkMeta;
}

/**
 * 生成完整的Metadata对象（用于Next.js App Router）
 */
export function generateMetadata(
  routePath: string,
  vars?: Record<string, string | number | boolean>
) {
  const tdk = getTdkConfig(routePath, vars);
  const meta = getTdkMeta();

  if (!tdk) {
    return {
      title: meta.siteName,
      description: '',
    };
  }

  return {
    title: tdk.title,
    description: tdk.description,
    keywords: tdk.keywords,
    alternates: {
      canonical: tdk.canonical,
    },
    openGraph: tdk.openGraph
      ? {
          ...tdk.openGraph,
          images: [
            {
              url: meta.defaultImage,
              width: meta.imageWidth,
              height: meta.imageHeight,
              alt: tdk.openGraph.title,
            },
          ],
        }
      : undefined,
    twitter: tdk.twitter || {
      card: 'summary_large_image',
      title: tdk.title,
      description: tdk.description,
      images: [meta.defaultImage],
    },
  };
}

/**
 * 列出所有配置的路由（用于调试和验证）
 */
export function listAllRoutes(): string[] {
  return Object.keys(tdkConfig.routes);
}

/**
 * 验证路由是否已配置TDK
 */
export function hasTdkConfig(routePath: string): boolean {
  const routes = tdkConfig.routes as Record<string, unknown>;
  return routePath in routes;
}
