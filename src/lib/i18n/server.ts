import { createInstance, i18n } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { getOptions } from './config';

// This function initializes i18next on the server
const initI18next = async (lng: string, ns: string | string[]) => {
  const i18nInstance = createInstance();
  // This line is now valid because getOptions accepts string | string[] for the ns parameter
  await i18nInstance.use(initReactI18next).init(getOptions(lng, ns)); 
  return i18nInstance;
};

// This is our main server-side translation hook
export async function getTranslations(
  lng: string,
  ns?: string | string[],
  options?: { keyPrefix?: string }
) {
  const i18nInstance = await initI18next(lng, ns || 'translation');
  return {
    t: i18nInstance.getFixedT(lng, ns, options?.keyPrefix),
    i18n: i18nInstance,
  };
}