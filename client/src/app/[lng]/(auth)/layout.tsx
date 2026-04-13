"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { SparklesIcon } from '@/shared/components/icons';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background p-4 overflow-hidden">
      {/* Visual background element */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]" />
      
      <div className="w-full max-w-md mx-auto z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
        <header className="flex flex-col items-center justify-center mb-10 text-center">
          <div className="p-3 bg-brand-subtle rounded-2xl mb-4 shadow-sm">
            <SparklesIcon className="w-10 h-10 text-brand-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-text-primary">
            Buddy AI
          </h1>
          <p className="text-text-secondary mt-2">
            {t('login.title')}
          </p>
        </header>

        <main className="bg-secondary p-8 rounded-3xl border border-border-subtle shadow-xl backdrop-blur-sm">
          {children}
        </main>

        <footer className="text-xs text-text-secondary mt-10 text-center space-y-2">
          <p>
            {t('login.tosAgreement')}{' '}
            <Link 
                href="/policies/terms-of-service"
                className="font-medium text-brand-primary hover:text-brand-hover hover:underline transition-colors"
            >
                {t('login.tosLink')}
            </Link>
          </p>
          <p>
            {t('login.and')}{' '}
            <Link
              href="/policies/"
              className="font-medium text-brand-primary hover:text-brand-hover hover:underline transition-colors"
            >
              {t('login.privacyLink')}
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}