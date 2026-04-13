'use client';

import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { getOptions } from './config';

interface I18nProviderProps {
  children: React.ReactNode;
  lng: string;
}

export default function I18nProvider({ children, lng }: I18nProviderProps) {
  // Create a new i18next instance on the client
  // This is the key to preventing hydration errors
  const i18n = createInstance();
  
  // Initialize only if it hasn't been initialized already
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init(getOptions(lng));
  }

  return (
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      {children}
    </I18nextProvider>
  );
}