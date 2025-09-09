import { useState, useEffect } from 'react';

/**
 * A custom hook to prevent hydration errors.
 * It returns `true` only after the component has mounted on the client,
 * ensuring that the initial server render and client render are identical.
 * 
 * @returns {boolean} - `true` if the component is hydrated, otherwise `false`.
 */
export const useHydrationSafe = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    setIsHydrated(true);
  }, []);

  return isHydrated;
};