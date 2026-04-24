'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TutorialStep {
  title: string;
  description: string;
  image?: string;
  items?: string[];
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
  icon: string;
  tutorial: TutorialData;
}

export function TutorialCard({ id, icon, tutorial }: TutorialCardProps) {
  return (
    <Card id={id} className="scroll-mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          {tutorial.title}
        </CardTitle>
        <CardDescription>{tutorial.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 步骤 */}
          {tutorial.steps.map((step, index) => (
            <div key={index} className="border rounded-lg p-4 bg-muted/30">
              <div className="flex items-start gap-4">
                {/* 步骤编号 */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
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
                          <span className="text-green-600">✓</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* 警告提示 */}
                  {step.warning && (
                    <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg text-yellow-800 dark:text-yellow-200 text-sm">
                      <span>⚠️</span>
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
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">💡 提示</p>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              {tutorial.tips.map((tip, index) => (
                <li key={index}>• {tip}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 警告信息 */}
        {tutorial.warnings && tutorial.warnings.length > 0 && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
            <p className="font-medium text-red-800 dark:text-red-200 mb-2">⚠️ 注意事项</p>
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
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
              <Badge key={index} variant="outline" className="bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border-green-200">
                ✓ {advantage}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
