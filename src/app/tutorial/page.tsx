'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { apiList, APIConfig } from '@/lib/api-config';

// 教程卡片组件
function TutorialCard({ api }: { api: APIConfig }) {
  const badgeClass = api.badge.type === 'success' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white';
  
  return (
    <div className="bg-background rounded-xl p-4 flex flex-col border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-base">{api.name}</h3>
        <Badge className={`text-xs ${badgeClass}`}>{api.badge.text}</Badge>
      </div>
      <p className="text-sm text-foreground mb-3 flex-1">{api.desc}</p>
      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
        📖 {api.tutorial?.steps?.length || 0} 个步骤
      </div>
      <Link href={`/tutorial/${api.id}`}>
        <Button variant="outline" className="w-full">查看教程</Button>
      </Link>
    </div>
  );
}

// 板块组件
function SectionCard({ title, apis, emptyText }: { title: string; apis: APIConfig[]; emptyText: string }) {
  return (
    <div className="bg-muted rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        <h2 className="text-lg font-bold">{title}</h2>
        <Badge variant="secondary" className="text-xs ml-auto">{apis.length} 个</Badge>
      </div>
      {apis.length > 0 ? (
        <div className="space-y-3">
          {apis.map((api) => <TutorialCard key={api.id} api={api} />)}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground text-sm">
          <p>{emptyText}</p>
        </div>
      )}
    </div>
  );
}

export default function TutorialPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const noProxyWithTutorial = apiList.filter(api => !api.proxy && api.tutorial);
  const needProxyWithTutorial = apiList.filter(api => api.proxy && api.tutorial);

  const filteredNoProxy = noProxyWithTutorial.filter(api => 
    api.name.toLowerCase().includes(searchQuery.toLowerCase()) || api.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredNeedProxy = needProxyWithTutorial.filter(api => 
    api.name.toLowerCase().includes(searchQuery.toLowerCase()) || api.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">购买教程</h1>
          <p className="text-muted-foreground">详细的API购买流程指南，按是否需要代理分类</p>
        </div>

        {/* 搜索框 */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Input
              type="text"
              placeholder="搜索API名称..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4"
            />
          </div>
        </div>

        {/* 需要代理注意事项 */}
        <Card className="mb-6 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
          <CardContent className="p-4">
            <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">⚠️ 需代理API购买注意事项</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-yellow-700 dark:text-yellow-300">
              <div>🌐 需要科学上网</div>
              <div>💳 需要国际信用卡</div>
              <div>⚠️ 账号可能被风控</div>
              <div>💰 建议小额充值</div>
            </div>
          </CardContent>
        </Card>

        {/* 无需代理/需要代理教程平行板块 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SectionCard title="🟢 无需代理" apis={filteredNoProxy} emptyText="没有找到匹配的无代理API教程" />
          <SectionCard title="🟠 需要代理" apis={filteredNeedProxy} emptyText="没有找到匹配的需代理API教程" />
        </div>

        {/* 维护说明 */}
        <Card className="bg-muted/50">
          <CardContent className="p-6">
            <h3 className="font-bold mb-4">添加新AI购买教程模板</h3>
            <div className="bg-background rounded-lg p-4 text-sm font-mono overflow-x-auto mb-4">
              <pre className="text-muted-foreground whitespace-pre-wrap">{`{
  id: 'your-api-id',
  name: 'API名称',
  desc: 'API描述信息',
  url: 'https://xxx.com/',
  proxy: false,  // true=需要代理, false=无需代理
  icon: '🟢',
  badge: { text: '免费', type: 'success' },
  tutorial: {
    title: 'XXX购买教程',
    steps: [
      { title: '步骤标题', description: '步骤描述', items: ['操作1', '操作2'] }
    ],
    tips: ['提示1'],
    warnings: ['警告1'],
    advantages: ['优势1']
  }
}`}</pre>
            </div>
            <p className="text-sm text-muted-foreground">
              修改文件：<code className="bg-muted px-2 py-1 rounded">src/lib/api-config.ts</code>
            </p>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}
