import { useContext } from 'react';
import LanguageContext, { type LanguageContextType } from '@/contexts/LanguageContext';

/**
 * Custom hook to access language context
 * Provides language state and switching functionality
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};

export default useLanguage;
