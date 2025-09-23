
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useHeaderHeight } from '@/hooks/useHeaderHeight';
import { useLanguage } from '@/hooks/useLanguage';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useHeaderHeight(); // Dynamic header height calculation
  const { t } = useTranslation('navigation');
  const { language, isRTL, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('menu.home'), href: '/' },
    { name: t('menu.library'), href: '/library' },
    { name: t('menu.about'), href: '/about' },
    { name: t('menu.services'), href: '/services' },
    { name: t('menu.projects'), href: '/projects' },
    { name: t('menu.news'), href: '/news' },
    { name: t('menu.standards'), href: '/standards' },
    { name: t('menu.branches'), href: '/branches' },
    { name: t('menu.contact'), href: '/#contact' },
  ];

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 w-full z-[70] transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-sage-100' 
          : 'bg-white/90 backdrop-blur-sm'
      }`} 
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4">
  <div className="flex justify-between items-center py-4 md:py-6">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <div className="relative">
              <img 
                src="/updated-logo.png" 
                alt="شعار الهيئة"
                className="h-14 md:h-16 w-auto object-contain transition-all duration-300"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center flex-1 justify-center">
            <ul className="flex w-full max-w-4xl justify-between items-center px-6">
              {navItems.map((item) => (
                <li key={item.name} className="flex-1 flex justify-center">
                  <Link
                    to={item.href}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 relative group py-2 px-3 whitespace-nowrap"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-3/4 rounded-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language Switch / Actions */}
          <div className="hidden lg:flex items-center flex-shrink-0 ps-4">
            <button 
              onClick={toggleLanguage}
              className={`flex items-center ${isRTL ? 'space-x-2 space-x-reverse' : 'space-x-2'} px-5 py-2.5 border-2 border-blue-500 text-blue-600 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 font-medium text-sm md:text-base shadow-sm`}
            >
              <Globe size={18} />
              <span>{language === 'ar' ? t('language.english') : t('language.arabic')}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 rounded-lg hover:bg-blue-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={24} className="text-blue-600" />
            ) : (
              <Menu size={24} className="text-blue-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 z-[71] py-4 border-t border-blue-100 bg-white/95 backdrop-blur-md shadow-lg">
            <nav className="flex flex-col space-y-3 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium py-3 px-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button 
                onClick={toggleLanguage}
                className={`flex items-center justify-center ${isRTL ? 'space-x-2 space-x-reverse' : 'space-x-2'} px-4 py-3 border-2 border-blue-500 text-blue-600 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200 font-medium mt-4`}
              >
                <Globe size={16} />
                <span>{language === 'ar' ? t('language.english') : t('language.arabic')}</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
