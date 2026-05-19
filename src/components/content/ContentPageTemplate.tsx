'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ContentHeroAction {
  label: string;
  href: string;
  external?: boolean;
  variant?: 'default' | 'outline';
}

export interface QuickSummaryItem {
  label: string;
  value: string;
  tone?: 'default' | 'blue' | 'amber' | 'emerald' | 'rose';
}

export interface ContentStep {
  title: string;
  description: string;
  items?: string[];
  code?: string;
  language?: string;
  note?: string;
}

export interface ContentSectionData {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  steps?: ContentStep[];
  bullets?: string[];
  tone?: 'default' | 'blue' | 'amber' | 'emerald' | 'rose';
}

export interface RelatedLinkItem {
  title: string;
  description: string;
  href: string;
}

export interface ContentPageData {
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  actions: ContentHeroAction[];
  quickSummary: QuickSummaryItem[];
  sections: ContentSectionData[];
  relatedLinks: RelatedLinkItem[];
}

const toneClass = {
  default: 'border-border bg-card',
  blue: 'border-sky-200 bg-sky-50 text-sky-950',
  amber: 'border-amber-200 bg-amber-50 text-amber-950',
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-950',
  rose: 'border-rose-200 bg-rose-50 text-rose-950',
};

const toneTextClass = {
  default: {
    heading: 'text-foreground',
    body: 'text-muted-foreground',
  },
  blue: {
    heading: 'text-sky-950',
    body: 'text-sky-800',
  },
  amber: {
    heading: 'text-amber-950',
    body: 'text-amber-800',
  },
  emerald: {
    heading: 'text-emerald-950',
    body: 'text-emerald-800',
  },
  rose: {
    heading: 'text-rose-950',
    body: 'text-rose-800',
  },
};

function CopyableCodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }, [code]);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2">
        <span className="font-mono text-xs uppercase tracking-wide text-slate-400">{language}</span>
        <button
          type="button"
          onClick={copy}
          className="rounded-md px-2 py-1 text-xs text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
        >
          {copied ? '已复制' : '复制'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6 text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ContentHero({ page }: { page: ContentPageData }) {
  return (
    <section className="rounded-3xl border bg-card/80 p-6 shadow-sm md:p-8">
      <p className="text-sm font-medium text-muted-foreground">{page.eyebrow}</p>
      <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">{page.title}</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">{page.description}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
          {page.actions.map((action) => (
            <Button key={action.href} asChild variant={action.variant || 'default'} className="rounded-full px-5">
              <Link href={action.href} target={action.external ? '_blank' : undefined} rel={action.external ? 'noopener noreferrer' : undefined}>
                {action.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {page.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="px-3 py-1 text-sm">
            {tag}
          </Badge>
        ))}
      </div>
    </section>
  );
}

function QuickSummary({ items }: { items: QuickSummaryItem[] }) {
  return (
    <section className="rounded-2xl border bg-card p-3 shadow-sm">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const tone = item.tone || 'default';

        return (
        <div key={item.label} className={cn('rounded-xl border px-3 py-2.5', toneClass[tone])}>
          <p className={cn('text-xs font-medium', toneTextClass[tone].body)}>{item.label}</p>
          <p className={cn('mt-1 text-sm font-semibold leading-5', toneTextClass[tone].heading)}>{item.value}</p>
        </div>
        );
      })}
      </div>
    </section>
  );
}

function ContentSection({ section, index }: { section: ContentSectionData; index: number }) {
  const tone = section.tone || 'default';

  return (
    <section id={section.id} className={cn('rounded-2xl border p-5 shadow-sm md:p-6', toneClass[tone])}>
      <div className="flex items-start gap-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          {section.eyebrow && <p className={cn('text-sm font-medium', toneTextClass[tone].body)}>{section.eyebrow}</p>}
          <h2 className={cn('text-2xl font-bold tracking-tight', toneTextClass[tone].heading)}>{section.title}</h2>
          {section.description && <p className={cn('mt-3 text-base leading-7', toneTextClass[tone].body)}>{section.description}</p>}

          {section.bullets && (
            <ul className="mt-5 space-y-3">
              {section.bullets.map((bullet) => (
                <li key={bullet} className={cn('flex gap-3 text-base leading-7', toneTextClass[tone].body)}>
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {section.steps && (
            <div className="mt-6 space-y-5">
              {section.steps.map((step, stepIndex) => (
                <div key={step.title} className="rounded-xl border bg-background/70 p-4">
                  <h3 className="text-base font-semibold text-foreground">
                    {stepIndex + 1}. {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
                  {step.items && (
                    <ul className="mt-3 space-y-2">
                      {step.items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground">
                          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {step.code && (
                    <div className="mt-4">
                      <CopyableCodeBlock code={step.code} language={step.language} />
                    </div>
                  )}
                  {step.note && (
                    <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-900">
                      {step.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function RelatedLinks({ links }: { links: RelatedLinkItem[] }) {
  return (
    <section className="rounded-2xl border bg-card p-5 shadow-sm md:p-6">
      <h2 className="text-2xl font-bold text-foreground">相关教程</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-xl border bg-background/70 p-4 transition-colors hover:border-foreground/30 hover:bg-card">
            <h3 className="font-semibold text-foreground">{link.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ContentPageTemplate({ page }: { page: ContentPageData }) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <div className="space-y-8 md:space-y-10">
        <ContentHero page={page} />
        <QuickSummary items={page.quickSummary} />
        {page.sections.map((section, index) => (
          <ContentSection key={section.id} section={section} index={index} />
        ))}
        <RelatedLinks links={page.relatedLinks} />
      </div>
    </main>
  );
}
