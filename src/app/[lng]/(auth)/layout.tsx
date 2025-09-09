// /src/app/(auth)/layout.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { SparklesIcon } from '@/shared/components/icons';
import AuthLoadingSkeleton from '@/features/auth/components/AuthLoadingSkeleton';

// This layout will wrap your login/page.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { t } = useTranslation();
  const { isAuthenticated, isCheckingAuth, checkAuth } = useAuthStore();
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  // Check auth status on component mount
  useEffect(() => {
    const checkAuthentication = async () => {
      await checkAuth();
      setInitialCheckDone(true);
    };
    
    checkAuthentication();
  }, [checkAuth]);

  // Redirect authenticated users to home
  useEffect(() => {
    if (initialCheckDone && isAuthenticated) {
      router.push('/home');
    }
  }, [initialCheckDone, isAuthenticated, router]);

  // Show loading state while checking auth
  if (isCheckingAuth || !initialCheckDone) {
    return <AuthLoadingSkeleton />;
  }

  // If authenticated, don't render auth layout
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-primary p-4">
      <div className="w-full max-w-md mx-auto">
        <header className="flex items-center justify-center mb-8">
          <SparklesIcon className="w-10 h-10 text-brand-primary mr-3" />
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">
            {t('login.title')}
          </h1>
        </header>

        <main className="bg-surface p-8 rounded-2xl shadow-lg shadow-border-subtle/50 dark:shadow-overlay/20">
          {children}
        </main>

        <footer className="text-xs text-text-secondary mt-6 text-center">
          {t('login.tosAgreement')}{' '}
          <Link 
              href="/privacy-policy"
              className="font-medium text-brand-primary hover:text-brand-hover underline focus:outline-none"
          >
              {t('login.tosLink')}
          </Link>
          {' '}{t('login.and')}{' '}
          <Link
            href="/privacy-policy"
            className="font-medium text-brand-primary hover:text-brand-hover underline focus:outline-none"
          >
            {t('login.privacyLink')}
          </Link>
        </footer>
      </div>
    </div>
  );
}