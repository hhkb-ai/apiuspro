'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TutorialStep {
  title: string;
  description: string;
  image?: string;
  items?: string[];
  code?: string;
  codeLanguage?: string;
  warning?: string;
}

interface TutorialData {
  title: string;
  subtitle?: string;
  steps: TutorialStep[];
  tips?: string[];
  warnings?: string[];
  advantages?: string[];
}

interface TutorialCardProps {
  id: string;
  tutorial: TutorialData;
}

export function TutorialCard({ id, tutorial }: TutorialCardProps) {
  return (
    <Card id={id} className="scroll-mt-4">
      <CardHeader>
        <CardTitle>{tutorial.title}</CardTitle>
        <CardDescription>{tutorial.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 步骤 */}
          {tutorial.steps.map((step, index) => (
            <div key={index} className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-start gap-4">
                {/* 步骤编号 */}
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <h4 className="font-semibold">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>

                  {/* 图片区域 */}
                  {step.image && (
                    <div className="relative w-full rounded-lg overflow-hidden border bg-background">
                      <div className="aspect-video relative">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = `<div class="flex items-center justify-center h-full bg-muted text-muted-foreground"><div class="text-center p-4"><p class="text-sm">图片占位符</p><p class="text-xs mt-1">请添加图片: ${step.image}</p></div></div>`;
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* 步骤项目列表 */}
                  {step.items && step.items.length > 0 && (
                    <ul className="space-y-2 text-sm">
                      {step.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {step.code && (
                    <div className="overflow-hidden rounded-lg border bg-muted/40">
                      {step.codeLanguage && (
                        <div className="border-b px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                          {step.codeLanguage}
                        </div>
                      )}
                      <pre className="overflow-x-auto p-4 text-xs leading-6">
                        <code>{step.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* 警告提示 */}
                  {step.warning && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/20 dark:text-amber-200">
                      <span>{step.warning}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 提示信息 */}
        {tutorial.tips && tutorial.tips.length > 0 && (
          <div className="mt-6 rounded-lg border border-sky-200 bg-sky-50 p-4 dark:bg-sky-950/20">
            <p className="mb-2 font-medium text-sky-800 dark:text-sky-200">提示</p>
            <ul className="space-y-1 text-sm text-sky-700 dark:text-sky-300">
              {tutorial.tips.map((tip, index) => (
                <li key={index}>• {tip}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 警告信息 */}
        {tutorial.warnings && tutorial.warnings.length > 0 && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:bg-red-950/20">
            <p className="mb-2 font-medium text-red-800 dark:text-red-200">注意事项</p>
            <ul className="space-y-1 text-sm text-red-700 dark:text-red-300">
              {tutorial.warnings.map((warning, index) => (
                <li key={index}>• {warning}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 优势标签 */}
        {tutorial.advantages && tutorial.advantages.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tutorial.advantages.map((advantage, index) => (
              <Badge key={index} variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-300">
                {advantage}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
