import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translation files
import arCommon from '../locales/ar/common.json';
import arNavigation from '../locales/ar/navigation.json';
import arPages from '../locales/ar/pages.json';
import arForms from '../locales/ar/forms.json';

import enCommon from '../locales/en/common.json';
import enNavigation from '../locales/en/navigation.json';
import enPages from '../locales/en/pages.json';
import enForms from '../locales/en/forms.json';

const resources = {
  ar: {
    common: arCommon,
    navigation: arNavigation,
    pages: arPages,
    forms: arForms,
  },
  en: {
    common: enCommon,
    navigation: enNavigation,
    pages: enPages,
    forms: enForms,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    defaultNS: 'common',
    ns: ['common', 'navigation', 'pages', 'forms'],
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'preferred-language',
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    react: {
      useSuspense: false,
    },

    debug: process.env.NODE_ENV === 'development',
  });

export default i18n;
