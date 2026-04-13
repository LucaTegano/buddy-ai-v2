'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/shared/store/ui.store';
import { useAuthStore } from '@/features/auth/store/auth.store';
import Sidebar from '@/shared/layout/sidebar/Sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isSidebarOpen = useUIStore(state => state.isSidebarOpen);
  const { checkAuth } = useAuthStore();
  
  useEffect(() => {
    // We still fetch user details in the background, but don't block rendering
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar />
      <main
        className={`flex-grow p-4 md:p-6 lg:p-8 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}