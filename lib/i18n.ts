"use client";

import ptTranslations from '@/locales/pt/common.json';
import enTranslations from '@/locales/en/common.json';
import esTranslations from '@/locales/es/common.json';
import { useLanguage } from './LanguageContext';

export type Locale = 'pt' | 'en' | 'es';

const translations: Record<Locale, typeof ptTranslations> = {
  pt: ptTranslations,
  en: enTranslations,
  es: esTranslations,
};

export function useTranslations() {
  const { locale } = useLanguage();

  return {
    t: (key: string): string => {
      const keys = key.split('.');
      let value: unknown = translations[locale];

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
      }

      return typeof value === 'string' ? value : key;
    },
    locale,
  };
}

export { ptTranslations };
