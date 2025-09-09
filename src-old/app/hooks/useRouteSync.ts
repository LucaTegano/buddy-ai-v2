'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/app/store/useAppStore';

/**
 * Custom hook to synchronize the current route with the app's active view state
 */
export function useRouteSync() {
  const pathname = usePathname();
  const { syncRouteWithView } = useAppStore();

  useEffect(() => {
    if (pathname) {
      syncRouteWithView(pathname);
    }
  }, [pathname, syncRouteWithView]);
}