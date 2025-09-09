"use client";

import { useAppStore } from '@/app/store/useAppStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      // Redirect to login page if not authenticated
      router.push('/');
    }
  }, [user, router]);

  // Show loading state while checking auth
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary">
        <div className="text-text-primary">Loading...</div>
      </div>
    );
  }

  // Render children if authenticated
  return <>{children}</>;
}