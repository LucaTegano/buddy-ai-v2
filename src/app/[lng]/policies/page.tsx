// app/privacy-policy/page.tsx
"use client";

import React from 'react';
import PrivacyPolicyContent from '@/features/settings/components/PrivacyPolicyContent';
import { ChevronLeftIcon } from '@/shared/components/icons';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function PrivacyPolicyPage() {

  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-surface">
      <div className="border-b border-border-subtle bg-white dark:bg-surface">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href={"/home"}
            className="flex items-center text-text-primary hover:text-text-secondary transition-colors p-2 -ml-2 rounded-lg hover:bg-secondary"
            aria-label={t('general.goBack')}
          >
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            <span className="font-medium">{t('sidebar.home')}</span>
          </Link>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <PrivacyPolicyContent />
      </div>
    </main>
  );
}