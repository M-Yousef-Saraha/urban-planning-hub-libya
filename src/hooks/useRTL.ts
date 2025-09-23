import { useLanguage } from './useLanguage';

/**
 * Custom hook to determine RTL/LTR direction
 * Returns boolean indicating if current language is RTL
 */
export const useRTL = (): boolean => {
  const { isRTL } = useLanguage();
  return isRTL;
};

/**
 * Hook to get direction-aware CSS classes
 * Useful for spacing and layout adjustments
 */
export const useDirectionClasses = () => {
  const { isRTL } = useLanguage();
  
  return {
    isRTL,
    textAlign: isRTL ? 'text-right' : 'text-left',
    spaceReverse: isRTL ? 'space-x-reverse' : '',
    marginStart: isRTL ? 'mr-' : 'ml-',
    marginEnd: isRTL ? 'ml-' : 'mr-',
    paddingStart: isRTL ? 'pr-' : 'pl-',
    paddingEnd: isRTL ? 'pl-' : 'pr-',
    roundedStart: isRTL ? 'rounded-r-' : 'rounded-l-',
    roundedEnd: isRTL ? 'rounded-l-' : 'rounded-r-',
    borderStart: isRTL ? 'border-r-' : 'border-l-',
    borderEnd: isRTL ? 'border-l-' : 'border-r-',
  };
};

export default useRTL;
