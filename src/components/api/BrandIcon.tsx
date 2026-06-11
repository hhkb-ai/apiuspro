'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const brandIconById: Record<string, { src?: string; alt: string; fallback: string }> = {
  deepseek: { src: '/images/brands/deepseek.ico', alt: 'DeepSeek', fallback: 'DS' },
  openai: { src: '/images/brands/openai.svg', alt: 'OpenAI', fallback: 'OAI' },
  'gpt-5.5': { src: '/images/brands/openai.svg', alt: 'OpenAI', fallback: 'OAI' },
  claude: { src: '/images/brands/claude.png', alt: 'Claude', fallback: 'C' },
  gemini: { alt: 'Gemini', fallback: 'G' },
  aliyun: { src: '/images/brands/aliyun.svg', alt: '阿里云通义千问', fallback: '通' },
  tongyi: { src: '/images/brands/aliyun.svg', alt: '阿里云通义千问', fallback: '通' },
  kimi: { src: '/images/brands/kimi.ico', alt: 'Kimi', fallback: 'K' },
  doubao: { src: '/images/brands/doubao.png', alt: '豆包', fallback: '豆' },
  zhipu: { src: '/images/brands/zhipu.png', alt: '智谱 GLM', fallback: 'GLM' },
  minimax: { alt: 'MiniMax', fallback: 'MM' },
  mimo: { src: '/images/brands/xiaomi.svg', alt: '小米 MiMo', fallback: 'Mi' },
  tencent: { alt: '腾讯混元', fallback: '混' },
};

const sizeClass = {
  sm: { wrap: 'size-8 rounded-md', image: 'size-5', text: 'text-[10px]' },
  md: { wrap: 'size-10 rounded-md', image: 'size-7', text: 'text-xs' },
  lg: { wrap: 'size-12 rounded-md', image: 'size-8', text: 'text-xs' },
};

export function BrandIcon({
  id,
  alt,
  size = 'md',
  className,
}: {
  id: string;
  alt?: string;
  size?: keyof typeof sizeClass;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const icon = brandIconById[id];
  const classes = sizeClass[size];

  return (
    <span
      aria-label={icon ? `${icon.alt} 图标` : alt ? `${alt} 图标` : undefined}
      className={cn(
        'flex shrink-0 items-center justify-center border border-border bg-background text-foreground',
        classes.wrap,
        className
      )}
      title={icon?.alt ?? alt}
    >
      {icon?.src && !failed ? (
        <Image
          src={icon.src}
          alt=""
          width={32}
          height={32}
          className={cn('object-contain', classes.image)}
          loading="lazy"
          unoptimized
          onError={() => setFailed(true)}
        />
      ) : (
        <span className={cn('font-bold leading-none', classes.text)}>
          {icon?.fallback ?? alt?.slice(0, 2) ?? 'AI'}
        </span>
      )}
    </span>
  );
}
