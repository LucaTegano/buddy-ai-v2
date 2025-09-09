"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/useAppStore';
import {
  SettingsHeader,
  ThemeToggle,
  LanguageSelector,
  LegalLinks,
  SettingsSection
} from '@/app/components/UserSettings';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { 
    closeSettings, 
    theme, 
    toggleTheme, 
    openTos, 
    openPrivacyPolicy,
  } = useAppStore();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4 sm:p-6">
      <div className="w-full max-w-md mx-auto">
        {/* The header has been moved inside the div below */}
        <div className="bg-surface rounded-2xl shadow-lg shadow-subtle overflow-hidden">
          <SettingsHeader onBack={closeSettings} />

          <SettingsSection title={t('settings.appearance')} hasBorder={false}>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </SettingsSection>

          <SettingsSection title={t('settings.language')}>
            <LanguageSelector currentLanguage={i18n.language} onLanguageChange={changeLanguage} />
          </SettingsSection>
          
          <SettingsSection title={t('settings.legal')}>
            <LegalLinks onOpenTos={openTos} onOpenPrivacyPolicy={openPrivacyPolicy} />
          </SettingsSection>
        </div>
      </div>
    </div>
  );
};

export default Settings;