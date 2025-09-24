import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { motion } from 'framer-motion';

const HeroImageSection = () => {
  const { t } = useTranslation('pages');
  const { isRTL } = useLanguage();

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden" 
      dir={isRTL ? 'rtl' : 'ltr'}
    >
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
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" 
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {t('hero.title')}
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl" 
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {t('hero.description')}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroImageSection;
