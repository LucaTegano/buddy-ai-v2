import { useEffect, RefObject } from 'react';

export const useAutoResizeTextarea = (
  ref: RefObject<HTMLTextAreaElement>,
  value: string
): void => {
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'; // Reset height
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [ref, value]);
};