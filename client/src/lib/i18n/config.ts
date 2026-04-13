import { InitOptions } from 'i18next';
import { en } from './locales/en';
import { it } from './locales/it';
import { zh } from './locales/zh';
import { hi } from './locales/hi';
import { es } from './locales/es';
import { ar } from './locales/ar';
import { fr } from './locales/fr';

export const supportedLngs = ['en', 'it', 'zh', 'hi', 'es', 'ar', 'fr'];
export const fallbackLng = 'en';
export const defaultNS = 'translation';

export const resources = {
  en: { translation: en },
  it: { translation: it },
  zh: { translation: zh },
  hi: { translation: hi },
  es: { translation: es },
  ar: { translation: ar },
  fr: { translation: fr },
} as const;

// THE FIX IS HERE: Change the type of the 'ns' parameter
export function getOptions(
  lng = fallbackLng, 
  ns: string | string[] = defaultNS // <-- Changed to accept string or string[]
): InitOptions {
  return {
    supportedLngs,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns, // Now 'ns' can be a string or an array, which is correct
    resources,
  };
}