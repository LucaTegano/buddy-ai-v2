'use client';

import React from 'react';
import Link from 'next/link'; // Use Next.js Link
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { ShieldCheck, FileText } from 'lucide-react';

// Assuming these are separate components that you have
import { SettingsHeader, SettingsSection, ThemeToggle } from '@/features/settings/components';

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4 sm:p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-surface rounded-2xl shadow-lg shadow-subtle overflow-hidden">
          <SettingsHeader onBack={() => router.back()} />

          <SettingsSection title={t('settings.appearance')} hasBorder={false}>
            <ThemeToggle />
          </SettingsSection>
                    
          <SettingsSection title={t('settings.legal')}>
            <div className="flex flex-col space-y-4">
              {/* CHANGE THIS HREF */}
              <Link 
                href="/privacy-policy" 
                className="flex items-center gap-x-3 text-text-default hover:text-text-strong transition-colors"
              >
                <ShieldCheck className="h-5 w-5 text-icon-subtle" aria-hidden="true" />
                <span>{t('settings.privacyLink', 'Privacy Policy')}</span>
              </Link>

              {/* AND CHANGE THIS HREF */}
              <Link 
                href="/terms-of-service"
                className="flex items-center gap-x-3 text-text-default hover:text-text-strong transition-colors"
              >
                <FileText className="h-5 w-5 text-icon-subtle" aria-hidden="true" />
                <span>{t('settings.tosLink', 'Terms of Service')}</span>
              </Link>
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;