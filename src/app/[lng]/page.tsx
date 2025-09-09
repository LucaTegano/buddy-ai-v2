"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/auth.store';
import HomeLoadingSkeleton from '@/features/home/components/HomeLoadingSkeleton';

export default function LanguageRootPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isCheckingAuth = useAuthStore(state => state.isCheckingAuth);
  const checkAuth = useAuthStore(state => state.checkAuth);

  // Effect 1: Trigger the authentication check ONCE when the component mounts.
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Effect 2: React to the result of the auth check and redirect.
  useEffect(() => {
    // Only attempt to redirect AFTER the check is complete.
    if (!isCheckingAuth) {
      if (isAuthenticated) {
        router.push('/home');
      } else {
        router.push('/login');
      }
    }
  }, [isAuthenticated, isCheckingAuth, router]);

  if (isCheckingAuth) {
    return <HomeLoadingSkeleton />
  }

  return null;
}