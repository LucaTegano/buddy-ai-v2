'use client'; // This directive is CRITICAL

import { useEffect } from 'react';
import { useAppStore } from '@/app/store/useAppStore';
import { useAppInitializer } from '@/app/hooks/useAppInitializer';

export function AppInitializer() {
  const initializeTheme = useAppStore((state) => state.initializeTheme);
  useAppInitializer();

  useEffect(() => {
    // This code will only run once on the client, after the app mounts
    initializeTheme();
  }, [initializeTheme]);

  // This component renders nothing, its only job is to run the effect
  return null;
}