// app/terms-of-service/page.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import TermsOfServiceContent from '@/features/settings/components/TermsOfServiceContent';
import { ChevronLeftIcon } from '@/shared/components/icons';

export default function TermsOfServicePage() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-surface">
      <div className="border-b border-border-subtle bg-white dark:bg-surface">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button
            onClick={handleGoBack}
            className="flex items-center text-text-primary hover:text-text-secondary transition-colors p-2 -ml-2 rounded-lg hover:bg-secondary"
            aria-label={t('general.goBack')}
          >
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            <span className="font-medium">{t('general.goBack')}</span>
          </button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <TermsOfServiceContent />
      </div>
    </main>
  );
}