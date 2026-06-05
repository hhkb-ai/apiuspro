import { useCallback, useEffect, useRef } from 'react';

export function useDismissibleSuggestions<T extends HTMLElement>(open: boolean, onDismiss: () => void) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        onDismiss();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onDismiss();
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onDismiss, open]);

  const handleBlur = useCallback((event: React.FocusEvent<T>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      onDismiss();
    }
  }, [onDismiss]);

  return {
    containerRef,
    handleBlur,
  };
}
