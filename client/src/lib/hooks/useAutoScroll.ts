// src/features/chat/hooks/useAutoScroll.ts
import { useEffect, RefObject } from 'react';

export const useAutoScroll = <T extends HTMLElement>(
  ref: RefObject<T>,
  dependencies: unknown[]
): void => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...dependencies]);
};