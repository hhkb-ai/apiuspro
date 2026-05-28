import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BeianLinks } from '@/components/layout/BeianLinks';
import { appTutorials } from '@/lib/api-config';
import { ArticleSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/structured-data';
import { CcswitchContentPage } from '@/components/content/CcswitchContentPage';
import { OpenclawFeishuContentPage } from '@/components/content/OpenclawFeishuContentPage';
import { AppTutorialContent } from '@/components/content/AppTutorialContent';

const ARTICLE_DATE_PUBLISHED = '2026-05-11';
const ARTICLE_DATE_MODIFIED = '2026-05-11';

export function generateStaticParams() {
  return appTutorials.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const tutorial = appTutorials.find((t) => t.id === id);
  if (!tutorial) return { title: '未找到教程' };
  return {
    title: `${tutorial.name} 使用教程`,
    description: tutorial.desc,
  };
}

export default async function AppTutorialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tutorial = appTutorials.find((t) => t.id === id);
  if (!tutorial) notFound();

  // 特殊路由：使用独立的 client 组件（无 SEO schema）
  if (tutorial.id === 'ccswitch') {
    return <CcswitchContentPage />;
  }
  if (tutorial.id === 'openclaw-feishu') {
    return <OpenclawFeishuContentPage />;
  }

  return (
    <div className="min-h-screen bg-background content-article">
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://www.apiuspro.cn' },
          { name: 'API应用', url: 'https://www.apiuspro.cn/app' },
          { name: tutorial.name, url: `https://www.apiuspro.cn/app/${tutorial.id}` },
        ]}
      />
      <ArticleSchema
        title={`${tutorial.name} 使用教程`}
        description={tutorial.desc}
        url={`https://www.apiuspro.cn/app/${tutorial.id}`}
        datePublished={ARTICLE_DATE_PUBLISHED}
        dateModified={ARTICLE_DATE_MODIFIED}
      />
      <HowToSchema
        name={`${tutorial.name} 使用教程`}
        description={tutorial.desc}
        steps={tutorial.sections.flatMap((section, sectionIdx) =>
          (section.steps || []).map((step, stepIdx) => ({
            name: step.title,
            text: step.description || step.items?.join('；') || section.content,
            image: step.image ? `https://www.apiuspro.cn${step.image}` : undefined,
            url: `https://www.apiuspro.cn/app/${tutorial.id}#section-${sectionIdx}-${stepIdx}`,
          })),
        )}
        totalTime="PT30M"
        tool={['浏览器', '终端', tutorial.name]}
      />
      <AppTutorialContent id={id} />
      <footer className="border-t border-border bg-card">
        <div className="max-w-[1200px] mx-auto px-6 py-6">
          <BeianLinks />
        </div>
      </footer>
    </div>
  );
}
