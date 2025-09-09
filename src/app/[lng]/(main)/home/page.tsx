"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/auth.store';
import HomeView from '@/features/home/components/HomeView';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isCheckingAuth } = useAuthStore();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isCheckingAuth, router]);

  // Show loading state while checking auth
  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  // If not authenticated, don't render the page
  if (!isAuthenticated) {
    return null;
  }

  return <HomeView />;
}