import { useCallback, useDeferredValue, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface HomeSearchSuggestion {
  id: string;
  name: string;
  desc: string;
  href: string;
  type: string;
}

type SearchState = {
  suggestions: HomeSearchSuggestion[];
  exactMatch: { href: string } | null;
};

type SearchIndexModule = typeof import('@/lib/search-index');

const EMPTY_SEARCH_STATE: SearchState = {
  suggestions: [],
  exactMatch: null,
};

let searchIndexPromise: Promise<SearchIndexModule> | null = null;

function loadSearchIndex() {
  if (!searchIndexPromise) {
    searchIndexPromise = import('@/lib/search-index');
  }

  return searchIndexPromise;
}

function buildSearchState(module: SearchIndexModule, query: string, maxResults: number): SearchState {
  const suggestions = module.searchAll(query, maxResults).map((item) => ({
    id: item.id,
    name: item.name,
    desc: item.desc,
    href: item.href,
    type: item.type,
  }));

  const exactHref = module.findExactMatch(query);

  return {
    suggestions,
    exactMatch: exactHref ? { href: exactHref } : null,
  };
}

export function useHomeSearch(maxResults: number) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchState, setSearchState] = useState<SearchState>(EMPTY_SEARCH_STATE);
  const [resolvedQuery, setResolvedQuery] = useState('');
  const normalizedQuery = useDeferredValue(query.toLowerCase().trim());
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!normalizedQuery) {
      setSearchState(EMPTY_SEARCH_STATE);
      setResolvedQuery('');
      return;
    }

    let cancelled = false;

    void loadSearchIndex().then((searchIndexModule) => {
      if (cancelled || !isMountedRef.current) return;

      setSearchState(buildSearchState(searchIndexModule, normalizedQuery, maxResults));
      setResolvedQuery(normalizedQuery);
    });

    return () => {
      cancelled = true;
    };
  }, [maxResults, normalizedQuery]);

  const primeSearch = useCallback(() => {
    void loadSearchIndex();
  }, []);

  const submitSearch = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentQuery = query.toLowerCase().trim();
    if (!currentQuery) return;

    const cachedHref = currentQuery === resolvedQuery
      ? searchState.exactMatch?.href || searchState.suggestions[0]?.href
      : null;

    if (cachedHref) {
      router.push(cachedHref);
      setShowSuggestions(false);
      return;
    }

    const searchIndexModule = await loadSearchIndex();
    if (!isMountedRef.current) return;

    const nextState = buildSearchState(searchIndexModule, currentQuery, maxResults);
    setSearchState(nextState);
    setResolvedQuery(currentQuery);

    const nextHref = nextState.exactMatch?.href || nextState.suggestions[0]?.href;
    if (!nextHref) return;

    router.push(nextHref);
    setShowSuggestions(false);
  }, [maxResults, query, resolvedQuery, router, searchState.exactMatch, searchState.suggestions]);

  return {
    query,
    setQuery,
    showSuggestions,
    setShowSuggestions,
    suggestions: searchState.suggestions,
    exactMatch: searchState.exactMatch,
    submitSearch,
    primeSearch,
  };
}
