import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TutorialCard } from '@/components/tutorial/TutorialCard';
import { APIConfig, visibleAPIList, visibleProxyServices } from '@/lib/api-config';
import { QuickConclusionCard } from '@/components/api/QuickConclusionCard';
import { getReviewSlugByAPIId } from '@/lib/review-config';
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from '@/components/seo/structured-data';
import { DetailBackNav } from '@/components/navigation/ReturnNavigation';
import { SITE_PUBLISHED_AT, getApiUpdatedAt } from '@/lib/content-updates';
import { generateMetadata as generateTdkMetadata } from '@/lib/tdk';

type FAQItem = {
  question: string;
  answer: string;
};

type HighlightTone = 'emerald' | 'sky' | 'amber' | 'rose';

type OverviewItem = {
  label: string;
  value: ReactNode;
};

type AccessStep = {
  title: string;
  desc: ReactNode;
};

function getVisibleAPIs() {
  return [...visibleAPIList, ...visibleProxyServices];
}

function getVisibleAPIById(id: string) {
  return getVisibleAPIs().find(api => api.id === id);
}

export function generateStaticParams() {
  return getVisibleAPIs().map((api) => ({ id: api.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const api = getVisibleAPIById(id);
  if (!api) return { title: 'API未找到' };

  return generateTdkMetadata('/api/:id', {
    id,
    name: api.name,
    desc: api.desc,
    free: api.free ? `免费额度：${api.free}` : '',
    proxy: api.proxy ? '需要代理访问' : '国内直连，无需代理',
  });
}

function getAPIType(api: APIConfig): 'no-proxy' | 'need-proxy' | 'proxy' {
  if (visibleProxyServices.find(a => a.id === api.id)) return 'proxy';
  if (api.proxy) return 'need-proxy';
  return 'no-proxy';
}

function getRelatedAPIs(currentId: string, type: string): APIConfig[] {
  if (type === 'no-proxy') return visibleAPIList.filter(a => !a.proxy && a.id !== currentId).slice(0, 3);
  if (type === 'need-proxy') return visibleAPIList.filter(a => a.proxy && a.id !== currentId).slice(0, 3);
  return visibleProxyServices.filter(a => a.id !== currentId).slice(0, 3);
}

function badgeClass(type: string) {
  if (type === 'success') {
    return 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300';
  }
  if (type === 'warning') {
    return 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300';
  }
  return 'border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300';
}

function highlightClass(tone: HighlightTone) {
  const classes: Record<HighlightTone, string> = {
    emerald: 'text-emerald-700 dark:text-emerald-300',
    sky: 'text-sky-700 dark:text-sky-300',
    amber: 'text-amber-700 dark:text-amber-300',
    rose: 'text-rose-700 dark:text-rose-300',
  };

  return `font-semibold ${classes[tone]}`;
}

function Highlight({ tone, children }: { tone: HighlightTone; children: ReactNode }) {
  return <span className={highlightClass(tone)}>{children}</span>;
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-4 text-xl font-semibold tracking-tight">{children}</h2>;
}

function MobileCollapsed({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="rounded-lg border border-border bg-card md:hidden">
      <summary className="cursor-pointer select-none px-4 py-3 text-sm font-bold">{title}</summary>
      <div className="border-t border-border p-3">{children}</div>
    </details>
  );
}

function getAudienceText(api: APIConfig) {
  if (!api.proxy) {
    return '适合初学者、个人开发者、国内项目快速接入和低门槛试用。';
  }

  return '适合对模型能力、长上下文或多模态能力要求较高，并且能处理网络和支付条件的团队。';
}

const deepSeekFaqItems: FAQItem[] = [
  {
    question: 'DeepSeek API 国内可以用吗？',
    answer: '可以。DeepSeek 开放平台面向国内开发者使用，适合先在本地项目、脚本或 AI 工具中跑通一次调用，再根据实际用量决定是否长期接入。正式使用前仍应确认控制台、余额、限速和模型状态。',
  },
  {
    question: 'DeepSeek API Key 在哪里创建？',
    answer: '登录 DeepSeek 开放平台后，在控制台的 API Keys、密钥管理或开发者设置入口创建。Key 通常只完整显示一次，创建后应立即复制到密码管理器、.env 文件或服务器环境变量中。',
  },
  {
    question: 'DeepSeek Base URL 怎么填？',
    answer: 'DeepSeek 的 Base URL 填 https://api.deepseek.com。使用 OpenAI SDK 兼容模式时，把 api_key 设置为你的 DEEPSEEK_API_KEY，再把 base_url 改成这个地址即可。',
  },
  {
    question: 'DeepSeek 支持 OpenAI 兼容格式吗？',
    answer: '支持。很多原本使用 OpenAI SDK 的 Python、Node.js 或 cURL 示例，只需要替换 API Key、Base URL 和模型名称，就可以迁移到 DeepSeek。迁移前要确认你使用的接口字段是否被当前模型支持。',
  },
  {
    question: 'DeepSeek 常见报错怎么解决？',
    answer: '先按错误类型排查：401 和 invalid_api_key 多半是 Key 问题，403 常见于权限或认证问题，404 Model not found 通常是模型名写错，429 表示请求过快，Insufficient quota 表示余额或额度不足。',
  },
  {
    question: 'DeepSeek 免费额度在哪里看？',
    answer: '免费额度、新用户活动或赠送额度需要以 DeepSeek 控制台显示为准。建议在正式调用前进入 Usage、Billing、余额或额度页面确认可用额度，避免代码没有问题但调用失败。',
  },
  {
    question: '如何避免 API Key 泄露？',
    answer: '不要把 API Key 写进前端代码、公开仓库、截图、教学文章或聊天记录。推荐放在 .env、服务器环境变量或密钥管理工具中，并在发现泄露后立即删除旧 Key、创建新 Key。',
  },
  {
    question: 'deepseek-chat 和 deepseek-v4-flash 有什么区别？',
    answer: 'deepseek-chat 更像旧版兼容别名，适合迁移旧代码时短期使用。新项目建议优先使用 deepseek-v4-flash 或 deepseek-v4-pro 这类明确模型名，后续维护和排查问题更清晰。',
  },
];

function getApiFaqItems(api: APIConfig): FAQItem[] {
  if (api.id === 'deepseek') {
    return deepSeekFaqItems;
  }

  return [
    {
      question: `${api.name} API 国内可以访问吗？`,
      answer: api.proxy
        ? `${api.name} API 通常需要合适的网络环境或账号条件。购买前应先确认官网、控制台、支付方式和调用接口是否能稳定访问。`
        : `${api.name} API 更适合国内用户优先尝试，通常可以直接访问。正式接入前仍建议用免费额度或小额充值跑通真实任务。`,
    },
    {
      question: `${api.name} API Key 在哪里创建？`,
      answer: api.tutorial
        ? `进入 ${api.name} 控制台后，在 API Key、密钥管理或开发者设置页面创建密钥。可以继续查看本站的 ${api.name} 购买教程，按步骤完成创建与保存。`
        : `进入 ${api.name} 官网或开发者控制台后，查找 API Key、密钥管理或开发者设置页面。创建后应立即保存到环境变量或密钥管理工具。`,
    },
    {
      question: `${api.name} API 适合什么场景？`,
      answer: `${api.name} 适合的方向包括：${api.features.join('、')}。如果你还不确定具体选择，可以先查看场景推荐页，再回到该 API 详情页确认接入条件。`,
    },
    {
      question: `接入 ${api.name} API 前要确认什么？`,
      answer: `至少确认官网入口、免费额度或计费规则、Base URL、模型名、API Key 保存方式和限速规则。不要把 API Key 写入前端代码、公开仓库或截图。`,
    },
  ];
}

function getDeepSeekApiOverview(updatedAt: string): OverviewItem[] {
  return [
    {
      label: '官网入口',
      value: <a className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-300" href="https://platform.deepseek.com/" target="_blank" rel="noopener noreferrer">DeepSeek 开放平台</a>,
    },
    {
      label: 'API Base URL',
      value: <Highlight tone="sky">https://api.deepseek.com</Highlight>,
    },
    {
      label: '常用模型',
      value: <><Highlight tone="amber">deepseek-v4-flash</Highlight> / <Highlight tone="amber">deepseek-v4-pro</Highlight></>,
    },
    {
      label: '国内访问',
      value: '国内直连',
    },
    {
      label: '支付方式',
      value: <><Highlight tone="amber">余额</Highlight>与支付方式以官网控制台为准</>,
    },
    {
      label: '免费额度',
      value: <>新用户或活动<Highlight tone="amber">额度</Highlight>以控制台为准</>,
    },
    {
      label: 'OpenAI 兼容',
      value: '支持',
    },
    {
      label: '适合场景',
      value: '编程、问答、知识库、自动化、AI 工具接入',
    },
    {
      label: '更新时间',
      value: updatedAt,
    },
  ];
}

const deepSeekAccessSteps: AccessStep[] = [
  {
    title: '注册账号',
    desc: '进入 DeepSeek 开放平台，使用手机号、邮箱或平台支持的登录方式完成注册。',
  },
  {
    title: '完成认证',
    desc: '认证可能影响充值、接口权限和长期调用能力，个人或企业按实际身份完成即可。',
  },
  {
    title: '创建 API Key',
    desc: <><Highlight tone="emerald">API Key</Highlight> 通常只显示一次，创建后要立即保存，不要写入前端代码或公开仓库。</>,
  },
  {
    title: '查看额度或充值',
    desc: <>正式调用前确认<Highlight tone="amber">余额</Highlight>、活动<Highlight tone="amber">额度</Highlight>和<Highlight tone="amber">计费</Highlight>状态，避免代码正确但接口返回额度不足。</>,
  },
  {
    title: '获取 Base URL',
    desc: <>DeepSeek 的 <Highlight tone="sky">Base URL</Highlight> 为 <Highlight tone="sky">https://api.deepseek.com</Highlight>。</>,
  },
  {
    title: '选择模型',
    desc: <>新项目优先测试 <Highlight tone="amber">deepseek-v4-flash</Highlight>，复杂代码、长文本或 Agent 任务再评估 <Highlight tone="amber">deepseek-v4-pro</Highlight>。</>,
  },
  {
    title: '跑通测试',
    desc: '使用 Python、Node.js 或 cURL 完成一次最小调用，确认 Key、Base URL、模型名和网络都正常。',
  },
];

const deepSeekErrors = [
  {
    code: '401 Unauthorized',
    reason: 'API Key 错误、未传入或已失效',
    solution: '重新复制 Key，检查环境变量和请求头',
    href: '/error/401-unauthorized',
  },
  {
    code: '403 Forbidden',
    reason: '账号权限不足、认证未通过或接口权限受限',
    solution: '检查认证、余额和接口权限',
    href: '/error/403-forbidden',
  },
  {
    code: '404 Model not found',
    reason: '模型名称错误或旧别名不可用',
    solution: '确认模型名，例如 deepseek-v4-flash / deepseek-v4-pro',
    href: '/error/404-model-not-found',
  },
  {
    code: '429 Too Many Requests',
    reason: '请求过快或超过限速',
    solution: '降低并发，增加重试和等待',
    href: '/error/429-too-many-requests',
  },
  {
    code: 'Insufficient quota',
    reason: '余额不足或额度用完',
    solution: '充值或更换有效额度',
    href: '/error/insufficient-quota',
  },
  {
    code: 'Invalid API key',
    reason: 'Key 无效、复制不完整或变量名错误',
    solution: '重新生成并保存 API Key',
    href: '/error/invalid-api-key',
  },
  {
    code: 'Timeout',
    reason: '网络波动、Base URL 配错或超时设置太短',
    solution: '检查网络、Base URL 和超时配置',
    href: '/error/timeout',
  },
];

const alternativeApis = [
  {
    name: 'DeepSeek',
    audience: '国内开发者、API 新手、低成本测试用户',
    advantage: '国内访问方便，OpenAI 兼容，代码与推理任务性价比较高。',
    limit: '长期使用仍要关注模型名变化、限速、余额和接口兼容性。',
    scene: '编程开发、知识库、自动化脚本、AI 工具接入。',
  },
  {
    name: 'OpenAI',
    audience: '需要综合模型能力、生态工具和多模态能力的团队',
    advantage: '模型生态成熟，工具链丰富，综合能力强。',
    limit: '国内用户通常要处理网络、账号、支付和合规条件。',
    scene: '复杂产品原型、多模态应用、Agent 和海外生态项目。',
  },
  {
    name: 'Claude',
    audience: '重视长文本、写作质量和复杂代码审查的用户',
    advantage: '长文本理解、文档整理、代码解释和结构化表达能力突出。',
    limit: '账号、网络和 API 接入条件需要提前确认。',
    scene: '长文档分析、技术方案评审、代码重构建议。',
  },
  {
    name: '通义千问',
    audience: '阿里云用户、企业开发者、国内云生态项目',
    advantage: '国内云服务生态完整，适合和阿里云百炼、DashScope 等服务配合。',
    limit: '不同模型、地域、额度和权限规则需要在控制台确认。',
    scene: '企业知识库、云上应用、国内业务系统接入。',
  },
  {
    name: 'Kimi',
    audience: '长文档阅读、资料整理和轻量办公自动化用户',
    advantage: '长文档处理体验友好，适合资料总结和问答。',
    limit: 'API 能力、模型策略和额度规则需要按官方控制台确认。',
    scene: '文档问答、资料归纳、学习笔记整理。',
  },
  {
    name: '智谱 GLM',
    audience: '需要国产模型、企业服务和多模型能力的开发者',
    advantage: '国内访问与企业服务体系较完整，适合合规要求较高的场景。',
    limit: '具体模型能力、计费和接口字段要以平台文档为准。',
    scene: '企业应用、智能客服、国产模型方案验证。',
  },
  {
    name: '豆包',
    audience: '内容生成、营销工具和字节生态相关项目用户',
    advantage: '国内生态和产品化能力较强，适合内容与交互类场景。',
    limit: '模型选择、额度和平台权限需要在控制台核对。',
    scene: '内容生产、客服机器人、业务自动化和应用集成。',
  },
];

function DeepSeekHero({ api }: { api: APIConfig }) {
  return (
    <div className="mb-8 border-b border-border pb-8">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">DeepSeek API 购买与接入指南</h1>
        <Badge variant="outline" className={badgeClass(api.badge.type)}>{api.badge.text}</Badge>
      </div>
      <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
        国内直连，适合低成本接入、代码开发和 OpenAI 兼容调用。
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {['国内直连', '高性价比', 'OpenAI 兼容', '代码能力强'].map((tag) => (
          <Badge key={tag} variant="outline" className="border-border bg-card text-muted-foreground">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link href="/tutorial/deepseek">
          <Button>查看购买教程</Button>
        </Link>
        <a href={api.url} target="_blank" rel="noopener noreferrer">
          <Button variant="outline">访问官网</Button>
        </a>
      </div>
    </div>
  );
}

function DeepSeekIntroArticle() {
  return (
    <section className="mb-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>DeepSeek API 适合什么用户</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
          <p>
            DeepSeek API 更适合已经准备把模型接入项目、脚本或 AI 工具的用户。它对国内开发者比较友好，接入时可以使用 OpenAI 兼容方式，降低从零学习 SDK 的成本。
          </p>
          <p>
            如果你正在做网站功能、知识库问答、自动化脚本或编程辅助工具，可以先用 <Highlight tone="amber">deepseek-v4-flash</Highlight> 跑通基础流程，再根据任务复杂度切换到更强的模型。
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>DeepSeek API 适合哪些场景</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
          <p>
            常见场景包括编程开发、智能问答、知识库、客服机器人、自动化脚本和内容生成。对新手来说，最稳妥的方式不是一开始就做复杂产品，而是先完成一次最小调用，确认输入、输出、错误处理和成本记录都可控。
          </p>
          <p>
            在项目中接入时，建议把 <Highlight tone="emerald">API Key</Highlight> 放在服务器端或环境变量中，把模型名、超时时间和重试逻辑写成配置项，方便后续替换模型或调整成本。
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

function DeepSeekPreparationArticle() {
  return (
    <section className="mb-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>新手接入前需要准备什么</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
          <p>
            接入前至少准备账号、实名认证、<Highlight tone="emerald">API Key</Highlight>、账户<Highlight tone="amber">余额</Highlight>或活动<Highlight tone="amber">额度</Highlight>、
            <Highlight tone="sky">Base URL</Highlight>、<Highlight tone="amber">模型名称</Highlight>，以及一个可以运行测试代码的 Python、Node.js 或 cURL 环境。
          </p>
          <p>
            其中最容易出错的是密钥和模型名。密钥复制不完整会导致 <Highlight tone="rose">401</Highlight> 或 <Highlight tone="rose">invalid_api_key</Highlight>，模型名写错会导致 404 Model not found，额度不足则会让调用在代码正确的情况下失败。
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>和其他 API 的区别</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
          <p>
            DeepSeek 的优势集中在性价比、国内可访问和 OpenAI 兼容接入；OpenAI 的优势是综合模型能力和生态；Claude 更适合长文本、文档整理和高质量写作；通义千问适合阿里云和国内企业生态；Kimi 对长文档阅读和资料整理更友好。
          </p>
          <p>
            因此，DeepSeek 更适合作为新手第一个跑通 API 流程的选择，也适合作为低成本测试和代码开发场景的主力模型。正式上生产前，仍建议对比响应质量、速度、成本、限速和稳定性。
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>长期使用前要注意什么</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
          <p>
            长期使用前要重点关注<Highlight tone="amber">计费</Highlight>、<Highlight tone="amber">余额</Highlight>、限速、模型名变化、
            <Highlight tone="emerald">API Key</Highlight> 安全和错误排查。不要只看单次调用是否成功，还要记录每次请求的失败原因、耗时、输入输出长度和重试次数。
          </p>
          <p>
            对网站或工具类项目来说，建议预留降级方案：当出现 <Highlight tone="amber">429</Highlight>、Timeout 或额度不足时，可以降低并发、切换备用模型、提示用户稍后重试，避免页面直接报错。
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

function OverviewCards({ items }: { items: OverviewItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="min-w-0 rounded-lg border border-border bg-background p-4">
          <p className="mb-1 text-xs font-medium text-muted-foreground">{item.label}</p>
          <div className="break-words text-sm leading-6 text-foreground">{item.value}</div>
        </div>
      ))}
    </div>
  );
}

function DeepSeekConfigQuickCheck({ updatedAt }: { updatedAt: string }) {
  const items = getDeepSeekApiOverview(updatedAt);

  return (
    <section className="mb-8">
      <div className="mb-3 hidden md:block">
        <SectionTitle>DeepSeek API 配置速查</SectionTitle>
        <p className="text-sm leading-7 text-muted-foreground">
          这部分用于查配置，不作为正文阅读开头。移动端默认折叠，避免用户刚进入页面就看到大面积参数卡片。
        </p>
      </div>
      <div className="hidden md:block">
        <Card>
          <CardContent className="p-5">
            <OverviewCards items={items} />
          </CardContent>
        </Card>
      </div>
      <MobileCollapsed title="配置速查（点开查看）">
        <OverviewCards items={items} />
      </MobileCollapsed>
    </section>
  );
}

function AccessStepCards({ steps }: { steps: AccessStep[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, index) => (
        <div key={step.title} className="min-w-0 rounded-lg border border-border bg-card p-4">
          <p className="mb-2 text-xs font-semibold text-muted-foreground">步骤 {index + 1}</p>
          <h3 className="mb-2 font-semibold leading-6">{step.title}</h3>
          <p className="text-sm leading-6 text-muted-foreground">{step.desc}</p>
        </div>
      ))}
    </div>
  );
}

function DeepSeekAccessFlow() {
  return (
    <section className="mb-8">
      <div className="mb-4 hidden gap-3 md:flex md:flex-col sm:items-start lg:flex-row lg:items-center lg:justify-between">
        <div>
          <SectionTitle>接入流程摘要</SectionTitle>
          <p className="text-sm leading-7 text-muted-foreground">
            这里只做流程速览。需要截图和完整代码说明时，继续查看完整教程。
          </p>
        </div>
        <Link href="/tutorial/deepseek" className="self-start lg:self-auto">
          <Button variant="outline" size="sm">查看完整 DeepSeek 购买教程</Button>
        </Link>
      </div>
      <div className="hidden md:block">
        <AccessStepCards steps={deepSeekAccessSteps} />
      </div>
      <MobileCollapsed title="接入流程（点开查看）">
        <AccessStepCards steps={deepSeekAccessSteps} />
      </MobileCollapsed>
    </section>
  );
}

function ErrorCards() {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {deepSeekErrors.map((item) => (
        <Link key={item.code} href={item.href} className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/30">
          <h3 className="mb-2 font-semibold text-rose-700 dark:text-rose-300">{item.code}</h3>
          <p className="text-sm leading-6 text-muted-foreground"><span className="font-medium text-foreground">原因：</span>{item.reason}</p>
          <p className="text-sm leading-6 text-muted-foreground"><span className="font-medium text-foreground">解决：</span>{item.solution}</p>
        </Link>
      ))}
    </div>
  );
}

function DeepSeekErrorsSection() {
  return (
    <section className="mb-8">
      <div className="mb-4 hidden md:block">
        <SectionTitle>常见错误排查</SectionTitle>
        <p className="text-sm leading-7 text-muted-foreground">
          接入失败时，优先判断是 <Highlight tone="emerald">API Key</Highlight>、<Highlight tone="sky">Base URL</Highlight>、
          <Highlight tone="amber">模型名称</Highlight>、限速还是<Highlight tone="amber">余额 / 额度</Highlight>问题。
        </p>
      </div>
      <div className="hidden md:block">
        <ErrorCards />
      </div>
      <MobileCollapsed title="常见错误排查（点开查看）">
        <ErrorCards />
      </MobileCollapsed>
    </section>
  );
}

function AlternativeCards() {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {alternativeApis.map((item) => (
        <Card key={item.name}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{item.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
            <p><span className="font-medium text-foreground">适合人群：</span>{item.audience}</p>
            <p><span className="font-medium text-foreground">核心优势：</span>{item.advantage}</p>
            <p><span className="font-medium text-foreground">使用限制：</span>{item.limit}</p>
            <p><span className="font-medium text-foreground">推荐场景：</span>{item.scene}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function DeepSeekAlternativesSection() {
  return (
    <section className="mb-8">
      <div className="mb-4 hidden md:block">
        <SectionTitle>替代方案对比</SectionTitle>
        <p className="text-sm leading-7 text-muted-foreground">
          选择 API 时不要只看模型名称。更实际的判断方式是：能否稳定访问、能否支付、能否接受成本，以及模型是否适合你的任务。
        </p>
      </div>
      <div className="hidden md:block">
        <AlternativeCards />
      </div>
      <MobileCollapsed title="替代方案对比（点开查看）">
        <AlternativeCards />
      </MobileCollapsed>
    </section>
  );
}

function FaqCards({ faqItems }: { faqItems: FAQItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {faqItems.map((item) => (
        <Card key={item.question}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{item.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">{item.answer}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function DeepSeekFaqSection({ faqItems }: { faqItems: FAQItem[] }) {
  return (
    <section className="mb-8">
      <div className="hidden md:block">
        <SectionTitle>常见问题</SectionTitle>
      </div>
      <div className="hidden md:block">
        <FaqCards faqItems={faqItems} />
      </div>
      <MobileCollapsed title="常见问题（点开查看）">
        <FaqCards faqItems={faqItems} />
      </MobileCollapsed>
    </section>
  );
}

function ReadingJudgmentContent({ api, reviewSlug }: { api: APIConfig; reviewSlug?: string | null }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>快速结论</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              DeepSeek 适合国内开发者、AI 工具用户和低成本测试场景，适合先跑通再扩大使用。第一次接入时，不要同时改模型、Key、Base URL 和业务代码，应该先用最小示例确认接口可用。
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">适合谁</h3>
                <ul className="list-disc space-y-1 pl-5">
                  <li>国内开发者</li>
                  <li>API 新手</li>
                  <li>想低成本测试的个人用户</li>
                  <li>想把模型接入工具或项目的用户</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">不适合谁</h3>
                <ul className="list-disc space-y-1 pl-5">
                  <li>只想网页聊天、不想接触 API 的用户</li>
                  <li>需要特定海外生态的用户</li>
                  <li>不愿意处理 Key、Base URL 和模型名配置的用户</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>使用前确认</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
              <li><Highlight tone="emerald">API Key</Highlight> 是否已保存</li>
              <li><Highlight tone="sky">Base URL</Highlight> 是否正确</li>
              <li><Highlight tone="amber">模型名称</Highlight> 是否正确</li>
              <li><Highlight tone="amber">余额或额度</Highlight> 是否可用</li>
              <li>是否了解 <Highlight tone="rose">401</Highlight>、<Highlight tone="amber">429</Highlight>、余额不足等错误</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="hidden md:block">
        <QuickConclusionCard api={api} reviewSlug={reviewSlug} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>下一步链接</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Link href="/tutorial/deepseek"><Button variant="outline" size="sm">查看完整购买教程</Button></Link>
            <Link href="/error"><Button variant="outline" size="sm">查看错误解决</Button></Link>
            <Link href="/app/ccswitch"><Button variant="outline" size="sm">查看 CC Switch 教程</Button></Link>
            <Link href="/api-review"><Button variant="outline" size="sm">查看 API 对比</Button></Link>
            <Link href="/use-case"><Button variant="outline" size="sm">查看场景推荐</Button></Link>
            {reviewSlug && <Link href={`/api-review/${reviewSlug}`}><Button variant="outline" size="sm">查看 DeepSeek 完整测评</Button></Link>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DeepSeekReadingJudgment({ api, reviewSlug }: { api: APIConfig; reviewSlug?: string | null }) {
  return (
    <section className="mb-8">
      <div className="hidden md:block">
        <SectionTitle>阅读后判断</SectionTitle>
      </div>
      <div className="hidden md:block">
        <ReadingJudgmentContent api={api} reviewSlug={reviewSlug} />
      </div>
      <MobileCollapsed title="阅读后判断（点开查看）">
        <ReadingJudgmentContent api={api} reviewSlug={reviewSlug} />
      </MobileCollapsed>
    </section>
  );
}

function RelatedApiCards({ relatedAPIs }: { relatedAPIs: APIConfig[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {relatedAPIs.map((related) => (
        <Link key={related.id} href={`/api/${related.id}`} className="block">
          <Card className="h-full transition-colors hover:border-foreground/30">
            <CardContent className="p-5">
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="font-semibold">{related.name}</h3>
                <Badge variant="outline" className={badgeClass(related.badge.type)}>{related.badge.text}</Badge>
              </div>
              <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{related.desc}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function RelatedApiSection({ relatedAPIs }: { relatedAPIs: APIConfig[] }) {
  if (relatedAPIs.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="hidden md:block">
        <SectionTitle>相关 API 推荐</SectionTitle>
      </div>
      <div className="hidden md:block">
        <RelatedApiCards relatedAPIs={relatedAPIs} />
      </div>
      <MobileCollapsed title="相关 API 推荐（点开查看）">
        <RelatedApiCards relatedAPIs={relatedAPIs} />
      </MobileCollapsed>
    </section>
  );
}

function GenericApiDetailContent({ api, relatedAPIs, reviewSlug, faqItems }: { api: APIConfig; relatedAPIs: APIConfig[]; reviewSlug?: string | null; faqItems: FAQItem[] }) {
  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-5 border-b border-border pb-8 lg:flex-row lg:items-start">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">{api.name}</h1>
            <Badge variant="outline" className={badgeClass(api.badge.type)}>{api.badge.text}</Badge>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{api.desc}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {api.tutorial && (
            <Link href={`/tutorial/${api.id}`}>
              <Button variant="outline">{api.name} 购买教程</Button>
            </Link>
          )}
          {reviewSlug && (
            <Link href={`/api-review/${reviewSlug}`}>
              <Button variant="outline">{api.name} 完整测评</Button>
            </Link>
          )}
          <a href={api.url} target="_blank" rel="noopener noreferrer">
            <Button>访问官网</Button>
          </a>
        </div>
      </div>

      <QuickConclusionCard api={api} reviewSlug={reviewSlug} />

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>功能特性</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {api.features.map((feature) => (
              <Badge key={feature} variant="outline" className="border-border bg-card text-muted-foreground">
                {feature}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <section className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>是否适合你使用</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>{getAudienceText(api)}</p>
            <p>
              如果你正在比较 {api.name} API 怎么买、价格是否合适、能不能国内访问，建议先查看购买教程，再用免费额度或小额充值跑通一个真实任务。
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>接入前确认</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
              <li>官网入口和控制台地址</li>
              <li>API Key 创建与保存方式</li>
              <li>Base URL、模型名和 SDK 兼容性</li>
              <li>免费额度、限速和计费单位</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {api.tutorial && (
        <div className="mb-8">
          <SectionTitle>购买教程</SectionTitle>
          <TutorialCard id={api.id} tutorial={api.tutorial} />
        </div>
      )}

      <RelatedApiSection relatedAPIs={relatedAPIs} />

      <section>
        <SectionTitle>适用场景</SectionTitle>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground mb-4">
            想知道 {api.name} 适合什么场景？查看按用途分类的推荐：
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/use-case/coding"><Button variant="outline" size="sm">编程开发</Button></Link>
            <Link href="/use-case/knowledge"><Button variant="outline" size="sm">知识库</Button></Link>
            <Link href="/use-case/content-creation"><Button variant="outline" size="sm">内容创作</Button></Link>
            <Link href="/use-case/chatbot"><Button variant="outline" size="sm">智能客服</Button></Link>
            <Link href="/use-case/translation"><Button variant="outline" size="sm">翻译</Button></Link>
            <Link href="/use-case/education"><Button variant="outline" size="sm">教育辅导</Button></Link>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <SectionTitle>常见问题</SectionTitle>
        <FaqCards faqItems={faqItems} />
      </section>
    </>
  );
}

function DeepSeekApiDetailContent({ api, relatedAPIs, reviewSlug, faqItems }: { api: APIConfig; relatedAPIs: APIConfig[]; reviewSlug?: string | null; faqItems: FAQItem[] }) {
  const updatedAt = getApiUpdatedAt(api.id);

  return (
    <>
      <DeepSeekHero api={api} />
      <DeepSeekIntroArticle />
      <DeepSeekConfigQuickCheck updatedAt={updatedAt} />
      <DeepSeekAccessFlow />
      <DeepSeekPreparationArticle />
      {api.tutorial && (
        <div className="mb-8">
          <SectionTitle>购买教程</SectionTitle>
          <TutorialCard id={api.id} tutorial={api.tutorial} />
        </div>
      )}
      <DeepSeekErrorsSection />
      <DeepSeekAlternativesSection />
      <RelatedApiSection relatedAPIs={relatedAPIs} />
      <DeepSeekFaqSection faqItems={faqItems} />
      <DeepSeekReadingJudgment api={api} reviewSlug={reviewSlug} />
    </>
  );
}

export default async function APIDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const api = getVisibleAPIById(id);
  if (!api) notFound();

  const apiType = getAPIType(api);
  const relatedAPIs = getRelatedAPIs(id, apiType);
  const reviewSlug = getReviewSlugByAPIId(api.id);
  const faqItems = getApiFaqItems(api);
  const isDeepSeek = api.id === 'deepseek';

  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://www.apiuspro.cn' },
          { name: 'API官网', url: 'https://www.apiuspro.cn/cloud-api' },
          { name: api.name, url: `https://www.apiuspro.cn/api/${api.id}` },
        ]}
      />
      <ArticleSchema
        title={`${api.name} API 官网入口、购买教程与接入指南`}
        description={api.desc}
        url={`https://www.apiuspro.cn/api/${api.id}`}
        datePublished={SITE_PUBLISHED_AT}
        dateModified={getApiUpdatedAt(api.id)}
      />
      <FAQSchema items={faqItems} />
      <div className="mx-auto max-w-6xl overflow-hidden p-4 sm:p-6 lg:p-8">
        <DetailBackNav listHref="/cloud-api" listLabel="API 列表" />
        {isDeepSeek ? (
          <DeepSeekApiDetailContent api={api} relatedAPIs={relatedAPIs} reviewSlug={reviewSlug} faqItems={faqItems} />
        ) : (
          <GenericApiDetailContent api={api} relatedAPIs={relatedAPIs} reviewSlug={reviewSlug} faqItems={faqItems} />
        )}
      </div>
    </SidebarLayout>
  );
}
