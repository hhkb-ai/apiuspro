'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, type ComponentProps, type MouseEvent } from 'react';
import { Button } from '@/components/ui/button';

const RETURN_STATE_KEY = 'apiuspro:return-state';
const RESTORE_SCROLL_KEY = 'apiuspro:restore-scroll';

type ReturnState = {
  href: string;
  label: string;
  scrollY: number;
  createdAt: number;
};

type RestoreScrollState = {
  href: string;
  scrollY: number;
  createdAt: number;
};

function getCurrentHref() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function normalizePath(href: string) {
  try {
    const url = new URL(href, window.location.origin);
    return `${url.pathname}${url.search}`;
  } catch {
    return href.split('#')[0];
  }
}

function shouldKeepDefaultNavigation(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

function readReturnState() {
  try {
    const raw = window.sessionStorage.getItem(RETURN_STATE_KEY);
    return raw ? (JSON.parse(raw) as ReturnState) : null;
  } catch {
    return null;
  }
}

function saveRestoreScroll(href: string, scrollY: number) {
  window.sessionStorage.setItem(
    RESTORE_SCROLL_KEY,
    JSON.stringify({
      href,
      scrollY,
      createdAt: Date.now(),
    } satisfies RestoreScrollState),
  );
}

type RememberListLinkProps = ComponentProps<typeof Link> & {
  listLabel?: string;
};

export function RememberListLink({
  listLabel = '列表',
  onClick,
  ...props
}: RememberListLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (shouldKeepDefaultNavigation(event)) return;

    window.sessionStorage.setItem(
      RETURN_STATE_KEY,
      JSON.stringify({
        href: getCurrentHref(),
        label: listLabel,
        scrollY: window.scrollY,
        createdAt: Date.now(),
      } satisfies ReturnState),
    );
  };

  return <Link {...props} onClick={handleClick} />;
}

type DetailBackNavProps = {
  listHref: string;
  listLabel?: string;
  className?: string;
};

export function DetailBackNav({
  listHref,
  listLabel = '列表',
  className = '',
}: DetailBackNavProps) {
  const router = useRouter();
  const [savedState, setSavedState] = useState<ReturnState | null>(null);

  useEffect(() => {
    setSavedState(readReturnState());
  }, []);

  const goToList = () => {
    if (savedState?.href) {
      saveRestoreScroll(savedState.href, savedState.scrollY);
      router.push(savedState.href);
      return;
    }

    router.push(listHref);
  };

  const goBack = () => {
    if (savedState?.href) {
      saveRestoreScroll(savedState.href, savedState.scrollY);
    }

    if (window.history.length > 1) {
      router.back();
      return;
    }

    goToList();
  };

  const goHomeTop = () => {
    saveRestoreScroll('/', 0);
    router.push('/#top');
  };

  const targetLabel = savedState?.label || listLabel;
  const listButtonText = savedState ? '回到刚才的列表位置' : `回到${targetLabel}`;
  const navClassName = className || 'mb-6';

  return (
    <div className={`flex flex-wrap gap-2 ${navClassName}`}>
      <Button type="button" variant="outline" size="sm" className="min-h-[44px]" onClick={goBack}>
        ← 返回上一页
      </Button>
      <Button type="button" variant="outline" size="sm" className="min-h-[44px]" onClick={goToList}>
        {listButtonText}
      </Button>
      <Button type="button" variant="ghost" size="sm" className="min-h-[44px]" onClick={goHomeTop}>
        回到首页顶部
      </Button>
    </div>
  );
}

export function ReturnPositionRestorer() {
  const pathname = usePathname();

  useEffect(() => {
    let restoreState: RestoreScrollState | null = null;

    try {
      const raw = window.sessionStorage.getItem(RESTORE_SCROLL_KEY);
      restoreState = raw ? (JSON.parse(raw) as RestoreScrollState) : null;
    } catch {
      restoreState = null;
    }

    if (!restoreState) return;

    const currentPath = `${window.location.pathname}${window.location.search}`;
    if (normalizePath(restoreState.href) !== currentPath) return;

    window.sessionStorage.removeItem(RESTORE_SCROLL_KEY);
    const scrollY = restoreState.scrollY;
    const rafId = window.requestAnimationFrame(() => {
      window.scrollTo({ top: Math.max(scrollY, 0), behavior: 'auto' });
    });
    return () => window.cancelAnimationFrame(rafId);
  }, [pathname]);

  return null;
}
