import Link from 'next/link';
import type { ReactNode } from 'react';

export type MarkdownHeading = {
  level: number;
  text: string;
  id: string;
};

function slugifyHeading(text: string) {
  if (text.includes('常见报错') || text.includes('常见错误')) return 'common-errors';
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '') || 'section';
}

export function getMarkdownHeadings(markdown: string) {
  const seen = new Map<string, number>();
  let inCodeBlock = false;

  return markdown
    .split('\n')
    .map((line) => {
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        return null;
      }

      if (inCodeBlock) return null;

      const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
      if (!match) return null;

      const text = match[2].trim();
      const baseId = slugifyHeading(text);
      const count = seen.get(baseId) ?? 0;
      seen.set(baseId, count + 1);

      return {
        level: match[1].length,
        text,
        id: count === 0 ? baseId : `${baseId}-${count + 1}`,
      };
    })
    .filter((heading): heading is MarkdownHeading => Boolean(heading));
}

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong
          key={index}
          className="box-decoration-clone rounded-md border border-amber-200 bg-amber-50 px-1.5 py-0.5 font-semibold text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="break-words rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.92em] text-foreground">
          {part.slice(1, -1)}
        </code>
      );
    }

    const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = /^https?:\/\//.test(href);

      if (isExternal) {
        return (
          <a key={index} href={href} target="_blank" rel="noreferrer" className="break-words font-medium text-foreground underline underline-offset-4">
            {label}
          </a>
        );
      }

      return (
        <Link key={index} href={href} className="break-words font-medium text-foreground underline underline-offset-4">
          {label}
        </Link>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function getLanguageLabel(lang: string) {
  const normalized = lang.trim().toLowerCase();
  if (normalized === 'bash' || normalized === 'sh' || normalized === 'shell') return 'bash';
  if (normalized === 'json') return 'json';
  if (normalized === 'python' || normalized === 'py') return 'python';
  if (normalized === 'typescript' || normalized === 'ts') return 'ts';
  if (normalized === 'javascript' || normalized === 'js') return 'js';
  if (normalized === 'env') return 'env';
  if (normalized === 'gitignore') return 'gitignore';
  return normalized || 'text';
}

function getCodeBlockTheme(lang: string) {
  if (lang === 'bash' || lang === 'sh' || lang === 'shell') {
    return {
      frame: 'border-orange-500/40',
      header: 'border-orange-400/25 bg-orange-950/70',
      accent: 'bg-orange-400',
      label: 'text-orange-100',
      meta: 'text-orange-300/75',
    };
  }

  if (lang === 'json') {
    return {
      frame: 'border-blue-500/40',
      header: 'border-blue-400/25 bg-blue-950/70',
      accent: 'bg-blue-400',
      label: 'text-blue-100',
      meta: 'text-blue-300/75',
    };
  }

  if (lang === 'python') {
    return {
      frame: 'border-cyan-500/40',
      header: 'border-cyan-400/25 bg-cyan-950/70',
      accent: 'bg-cyan-400',
      label: 'text-cyan-100',
      meta: 'text-cyan-300/75',
    };
  }

  if (lang === 'env' || lang === 'gitignore') {
    return {
      frame: 'border-amber-500/40',
      header: 'border-amber-400/25 bg-amber-950/70',
      accent: 'bg-amber-400',
      label: 'text-amber-100',
      meta: 'text-amber-300/75',
    };
  }

  if (lang === 'js' || lang === 'ts') {
    return {
      frame: 'border-sky-500/40',
      header: 'border-sky-400/25 bg-sky-950/70',
      accent: 'bg-sky-400',
      label: 'text-sky-100',
      meta: 'text-sky-300/75',
    };
  }

  return {
    frame: 'border-slate-500/35',
    header: 'border-slate-400/20 bg-slate-950/70',
    accent: 'bg-slate-400',
    label: 'text-slate-100',
    meta: 'text-slate-300/70',
  };
}

function parseTable(lines: string[]) {
  const rows = lines.map((line) => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim()));
  const [head, , ...body] = rows;

  return (
    <div className="my-5 overflow-x-auto rounded-lg border border-border">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-muted text-foreground">
          <tr>
            {head.map((cell) => (
              <th key={cell} className="whitespace-nowrap border-b border-border px-3 py-2 font-semibold">{renderInline(cell)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-border last:border-0">
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`} className="whitespace-nowrap px-3 py-2 text-muted-foreground">{renderInline(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LearnMarkdown({ content }: { content: string }) {
  const lines = content.trim().split('\n');
  const nodes: ReactNode[] = [];
  const headingIds = getMarkdownHeadings(content);
  let headingIndex = 0;
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith('```')) {
      const lang = getLanguageLabel(trimmed.slice(3).trim() || 'text');
      const codeTheme = getCodeBlockTheme(lang);
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index]);
        index += 1;
      }

      nodes.push(
        <div key={`code-${index}`} className={`my-5 overflow-hidden rounded-lg border bg-zinc-950 shadow-sm ${codeTheme.frame}`}>
          <div className={`flex items-center justify-between border-b px-4 py-2 ${codeTheme.header}`}>
            <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${codeTheme.label}`}>
              <span className={`size-2 rounded-full ${codeTheme.accent}`} aria-hidden="true" />
              {lang}
            </span>
            <span className={`text-xs ${codeTheme.meta}`}>代码示例</span>
          </div>
          <pre className="overflow-x-auto p-4 text-sm leading-6 text-zinc-100">
            <code data-language={lang} className="block min-w-max whitespace-pre font-mono">
              {codeLines.join('\n')}
            </code>
          </pre>
        </div>
      );
      index += 1;
      continue;
    }

    if (/^-{3,}$/.test(trimmed)) {
      nodes.push(<hr key={`hr-${index}`} className="my-8 border-border" />);
      index += 1;
      continue;
    }

    if (/^#{1,3}\s+/.test(trimmed)) {
      const match = /^(#{1,3})\s+(.+)$/.exec(trimmed);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = level > 1 ? headingIds[headingIndex++]?.id : undefined;

        if (level === 1) nodes.push(<h1 key={`h1-${index}`} className="mt-8 text-3xl font-semibold tracking-tight text-foreground">{text}</h1>);
        if (level === 2) nodes.push(<h2 key={`h2-${index}`} id={id} className="mt-8 scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground">{text}</h2>);
        if (level === 3) nodes.push(<h3 key={`h3-${index}`} id={id} className="mt-6 scroll-mt-24 text-xl font-semibold text-foreground">{text}</h3>);
      }
      index += 1;
      continue;
    }

    if (trimmed.startsWith('|') && index + 1 < lines.length && /^\s*\|?\s*:?-{3,}/.test(lines[index + 1])) {
      const tableLines = [lines[index], lines[index + 1]];
      index += 2;

      while (index < lines.length && lines[index].trim().startsWith('|')) {
        tableLines.push(lines[index]);
        index += 1;
      }

      nodes.push(<div key={`table-${index}`}>{parseTable(tableLines)}</div>);
      continue;
    }

    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];

      while (index < lines.length && lines[index].trim().startsWith('>')) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ''));
        index += 1;
      }

      nodes.push(
        <blockquote key={`quote-${index}`} className="my-5 rounded-lg border-l-4 border-border bg-muted px-4 py-3 text-sm leading-6 text-muted-foreground">
          {quoteLines.map((quote, quoteIndex) => <p key={quoteIndex}>{renderInline(quote)}</p>)}
        </blockquote>
      );
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];

      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ''));
        index += 1;
      }

      nodes.push(
        <ul key={`ul-${index}`} className="my-4 list-disc space-y-2 pl-6 text-sm leading-6 text-muted-foreground">
          {items.map((item) => <li key={item}>{renderInline(item)}</li>)}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];

      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ''));
        index += 1;
      }

      nodes.push(
        <ol key={`ol-${index}`} className="my-4 list-decimal space-y-2 pl-6 text-sm leading-6 text-muted-foreground">
          {items.map((item) => <li key={item}>{renderInline(item)}</li>)}
        </ol>
      );
      continue;
    }

    const paragraphLines = [trimmed];
    index += 1;

    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,3}\s+|```|[-*]\s+|\d+\.\s+|>|\|)/.test(lines[index].trim())
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    nodes.push(
      <p key={`p-${index}`} className="my-4 text-sm leading-7 text-muted-foreground">
        {renderInline(paragraphLines.join(' '))}
      </p>
    );
  }

  return <div className="min-w-0 break-words">{nodes}</div>;
}
