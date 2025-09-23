import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const HeroImageSection = () => {
  const { t } = useTranslation('pages');
  const { isRTL } = useLanguage();

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-banner.jpg"
          alt="Urban Planning Hub Libya"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to placeholder if image doesn't exist
            e.currentTarget.src = 'https://via.placeholder.com/1920x700/2563eb/ffffff?text=Urban+Planning+Hub+Libya';
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className={`max-w-2xl ${isRTL ? 'ml-auto' : 'mr-auto'}`}>
            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" dir={isRTL ? 'rtl' : 'ltr'}>
              {t('hero.title')}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl" dir={isRTL ? 'rtl' : 'ltr'}>
              {t('hero.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroImageSection;
