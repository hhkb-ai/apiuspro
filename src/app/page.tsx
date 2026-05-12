import type { Metadata } from 'next';
import HomeClient from './home-client';
import { ItemListSchema } from '@/components/seo/structured-data';
import { apiList, appTutorials } from '@/lib/api-config';
import { generateMetadata as generateTdkMetadata } from '@/lib/tdk';

export const metadata: Metadata = generateTdkMetadata('/');

export default function Home() {
  return (
    <>
      <ItemListSchema
        name="热门 AI API"
        items={apiList.slice(0, 8).map(api => ({
          name: api.name,
          url: `https://apiuspro.cn/api/${api.id}`,
          description: api.desc,
        }))}
      />
      <ItemListSchema
        name="API 应用教程"
        items={appTutorials.map(tutorial => ({
          name: tutorial.name,
          url: `https://apiuspro.cn/app/${tutorial.id}`,
          description: tutorial.desc,
        }))}
      />
      <HomeClient />
    </>
  );
}
