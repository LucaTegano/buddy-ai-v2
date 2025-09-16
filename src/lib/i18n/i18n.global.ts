import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getOptions } from './config';
import type { TOptions } from 'i18next';

// Create a global i18n instance that can be used outside of React components
const i18nInstance = i18n.createInstance();

// Initialize the instance with the same options as the React instance
i18nInstance
  .use(initReactI18next)
  .init(getOptions());

export default i18nInstance;

// Function to change language
export const changeLanguage = (lng: string) => {
  return i18nInstance.changeLanguage(lng);
};

// Function to get translated text
export const t = (key: string, options?: TOptions) => {
  return i18nInstance.t(key, options);
};