
import React from 'react';
import { ArrowDown, Building, Map, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const Hero = () => {
  const { t } = useTranslation('pages');
  const { isRTL } = useLanguage();

  return (
  <section id="home" className="min-h-screen bg-white text-gray-900 py-24 relative overflow-hidden flex items-center border-b border-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Animated Background Elements */}
  <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-20 animate-float">
          <Building className="w-16 h-16 text-white" />
        </div>
        <div className="absolute top-40 left-32 animate-float" style={{ animationDelay: '1s' }}>
          <Map className="w-12 h-12 text-white" />
        </div>
        <div className="absolute bottom-32 right-40 animate-float" style={{ animationDelay: '2s' }}>
          <FileText className="w-14 h-14 text-white" />
        </div>
        <div className="absolute top-32 left-20 w-32 h-32 border-2 border-white/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 border-2 border-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Pattern overlay */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,64,175,0.05),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto">

          <h2 className="text-5xl md:text-7xl font-bold mb-10 leading-tight animate-fade-in-up" dir={isRTL ? 'rtl' : 'ltr'}>
            <span className="mb-2 block text-blue-700">{t('hero.title_part1')}</span>
            <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent">
              {t('hero.title_part2')}
            </span>
          </h2>
          

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button className={`group bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all duration-300 hover:transform hover:scale-105 shadow-md flex items-center ${isRTL ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
              <Building className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{t('hero.cta_services')}</span>
            </button>
            <button className={`group border-2 border-blue-600 text-blue-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center ${isRTL ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
              <Map className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{t('hero.cta_projects')}</span>
            </button>
          </div>

        </div>
        
      </div>
    </section>
  );
};

export default Hero;
