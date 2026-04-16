'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUIStore } from '@/shared/store/ui.store';
import { useAuthStore } from '@/features/auth/store/auth.store';
import Sidebar from '@/shared/layout/sidebar/Sidebar';
import HomeLoadingSkeleton from '@/features/home/components/HomeLoadingSkeleton';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isSidebarOpen = useUIStore(state => state.isSidebarOpen);
  const { user, checkAuth, isCheckingAuth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isCheckingAuth && !user) {
      const lng = window.location.pathname.split('/')[1] || 'en';
      router.push(`/${lng}/login`);
    }
  }, [isCheckingAuth, user, router]);

  if (isCheckingAuth || !user) {
    return <HomeLoadingSkeleton />;
  }

  const isNotePage = pathname.includes('/note/');

  return (
    <div className={`flex bg-background ${isNotePage ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      <Sidebar />
      <main
        className={`flex-grow transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        } ${isNotePage ? 'h-full' : 'p-4 md:p-6 lg:p-8'}`}
      >
        <div className={`${isNotePage ? 'h-full' : 'max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500'}`}>
          {children}
        </div>
      </main>
    </div>
  );
}