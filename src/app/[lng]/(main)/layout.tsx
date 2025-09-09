'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/shared/store/ui.store';
import { useAuthStore } from '@/features/auth/store/auth.store';
import Sidebar from '@/shared/layout/sidebar/Sidebar';
import MainLayoutSkeleton from '@/shared/layout/MainLayoutSkeleton';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isSidebarOpen = useUIStore(state => state.isSidebarOpen);
  const { checkAuth, isAuthenticated, isCheckingAuth } = useAuthStore();
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  
  useEffect(() => {
    const checkAuthentication = async () => {
      await checkAuth();
      setInitialCheckDone(true);
    };
    
    checkAuthentication();
  }, [checkAuth]);

  // Redirect based on authentication status
  useEffect(() => {
    if (initialCheckDone) {
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        router.push(`/login`);
      }
    }
  }, [initialCheckDone, isAuthenticated, router]);

  // Show loading state while checking auth
  if (isCheckingAuth || !initialCheckDone) {
    return <MainLayoutSkeleton />;
  }

  // If not authenticated, don't render the main layout
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main
        className={`flex-grow p-4 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-60' : 'ml-19'
        }`}
      >
        {children}
      </main>
    </div>
  );
}