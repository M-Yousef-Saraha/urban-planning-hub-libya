import { useEffect, useRef } from 'react';

/**
 * Custom hook to dynamically calculate and set header height
 * Prevents header overlap issues across all pages and devices
 * Automatically updates when header content changes (mobile menu, etc.)
 */
export const useHeaderHeight = () => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        // Update CSS custom property for global use
        document.documentElement.style.setProperty('--header-height', `${height}px`);
        document.documentElement.style.setProperty('--header-spacing', `${height + 32}px`); // height + 2rem
      }
    };

    // Initial calculation
    updateHeaderHeight();

    // Recalculate on window resize
    window.addEventListener('resize', updateHeaderHeight);
    
    // Recalculate when mobile menu opens/closes (mutation observer)
    const observer = new MutationObserver(updateHeaderHeight);
    if (headerRef.current) {
      observer.observe(headerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      observer.disconnect();
    };
  }, []);

  return headerRef;
};