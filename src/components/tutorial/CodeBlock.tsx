'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  code: string;
  language?: string;
  explanation?: string;
}

export function CodeBlock({ code, language, explanation }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const timeoutRef = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setCopyFailed(false);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyFailed(true);
      timeoutRef.current = window.setTimeout(() => setCopyFailed(false), 2000);
    }
  }, [code]);

  return (
    <div className="my-4 w-full max-w-full min-w-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-zinc-300">
          {language || 'code'}
        </span>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 px-3 text-xs text-zinc-300 hover:text-zinc-100">
          {copyFailed ? '复制失败' : copied ? '已复制' : '复制'}
        </Button>
      </div>
      <pre className="max-w-full overflow-x-auto whitespace-pre p-3 font-mono text-[13px] leading-6 text-zinc-100 sm:p-4 sm:text-sm sm:leading-7">
        <code className="block min-w-max">{code}</code>
      </pre>
      {explanation && (
        <div className="border-t border-zinc-800 bg-zinc-900 px-3 py-2.5 text-xs leading-5 text-zinc-300 sm:px-4">
          {explanation}
        </div>
      )}
    </div>
  );
}
