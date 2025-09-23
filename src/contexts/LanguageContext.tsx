import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  switchLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<Language>((i18n.language as Language) || 'ar');
  const [isRTL, setIsRTL] = useState(language === 'ar');

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsRTL(lang === 'ar');
    i18n.changeLanguage(lang);
    
    // Update document attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Store preference
    localStorage.setItem('preferred-language', lang);
    
    // Update page title and meta tags
    updatePageMeta(lang);
  };

  const toggleLanguage = () => {
    const newLang: Language = language === 'ar' ? 'en' : 'ar';
    switchLanguage(newLang);
  };

  const updatePageMeta = (lang: Language) => {
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);
    
    // Update meta tags if needed
    const metaLang = document.querySelector('meta[name="language"]');
    if (metaLang) {
      metaLang.setAttribute('content', lang);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'language';
      meta.content = lang;
      document.head.appendChild(meta);
    }
  };

  useEffect(() => {
    // Initialize language on mount
    const savedLang = localStorage.getItem('preferred-language') as Language;
    if (savedLang && savedLang !== language) {
      switchLanguage(savedLang);
    } else {
      switchLanguage(language);
    }
  }, []);

  useEffect(() => {
    // Listen to i18n language changes
    const handleLanguageChange = (lng: string) => {
      const newLang = lng as Language;
      if (newLang !== language) {
        setLanguage(newLang);
        setIsRTL(newLang === 'ar');
      }
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [language, i18n]);

  const contextValue: LanguageContextType = {
    language,
    isRTL,
    switchLanguage,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
