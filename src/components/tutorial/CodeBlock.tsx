'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  code: string;
  language?: string;
  explanation?: string;
}

export function CodeBlock({ code, language, explanation }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-border bg-muted/40">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {language || 'code'}
        </span>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="h-6 px-2 text-[11px]">
          {copied ? '已复制' : '复制'}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-6 text-foreground">
        <code>{code}</code>
      </pre>
      {explanation && (
        <div className="border-t border-border bg-muted/30 px-4 py-2.5 text-xs leading-5 text-muted-foreground">
          {explanation}
        </div>
      )}
    </div>
  );
}
