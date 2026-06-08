// ==================== 类型定义 ====================
export interface TutorialStep {
  title: string;
  description: string;
  image?: string;
  imageFit?: 'cover' | 'contain';
  items?: string[];
  code?: string;
  codeLanguage?: string;
  codeExplanation?: string;
  warning?: string;
  important?: boolean;
  whereToClick?: string;
  expectedResult?: string;
  failureChecklist?: string[];
}

export interface Tutorial {
  title: string;
  subtitle?: string;
  steps: TutorialStep[];
  tips?: string[];
  warnings?: string[];
  advantages?: string[];
  estimatedTime?: string;
  prerequisites?: string[];
  successSign?: string;
  commonPitfall?: string;
  securityReminder?: string;
}

export interface APIConfig {
  id: string;
  name: string;
  desc: string;
  url: string;
  features: string[];
  icon: string;
  badge: { text: string; type: string };
  tutorial?: Tutorial;
  free?: string;       // 免费额度描述
  proxy?: boolean;     // 是否需要代理访问，true=需代理，false/不填=无需代理
}
