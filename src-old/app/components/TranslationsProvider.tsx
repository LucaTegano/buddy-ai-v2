'use client'; // This is the most important part!

import { I18nextProvider } from 'react-i18next';
import { ReactNode } from 'react';
import i18next from '../i18n'; // Your i18next configuration

interface TranslationsProviderProps {
  children: ReactNode;
}

export default function TranslationsProvider({ children }: TranslationsProviderProps) {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}