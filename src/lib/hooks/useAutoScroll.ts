// src/features/chat/hooks/useAutoScroll.ts
import { useEffect, RefObject } from 'react';

export const useAutoScroll = <T extends HTMLElement>(
  ref: RefObject<T>,
  dependencies: any[]
): void => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [ref, ...dependencies]);
};