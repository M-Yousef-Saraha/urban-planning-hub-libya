import React from 'react';
import { MapPin, Calendar, Building, ArrowRight, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { motion } from 'framer-motion';

const LatestProjectSection = () => {
  const { t } = useTranslation('pages');
  const { isRTL } = useLanguage();

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-16 gradient-libya-hero" 
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className={`inline-flex items-center ${isRTL ? 'space-x-2 space-x-reverse' : 'space-x-2'} bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/30`}>
              <Building className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium" dir={isRTL ? 'rtl' : 'ltr'}>{t('latest_project.title')}</span>
            </div>
          </motion.div>

          {/* Project Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card rounded-3xl overflow-hidden card-micro"
          >
            <div className={`grid lg:grid-cols-2 gap-0 ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Content Side */}
              <div className={`p-8 lg:p-12 ${isRTL ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center mb-4">
                  <span className="px-3 py-1 bg-green-500/20 text-green-800 rounded-full text-sm font-medium border border-green-500/30">
                    {t('latest_project.status')}
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" dir={isRTL ? 'rtl' : 'ltr'}>
                  {t('latest_project.subtitle')}
                </h2>

                <p className="text-gray-600 leading-relaxed mb-8 text-lg" dir={isRTL ? 'rtl' : 'ltr'}>
                  {t('latest_project.description')}
                </p>

                {/* Project Features */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4" dir={isRTL ? 'rtl' : 'ltr'}>
                    {isRTL ? 'المميزات الرئيسية' : 'Key Features'}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {t('latest_project.features', { returnObjects: true }).map((feature: string, index: number) => (
                      <div key={index} className={`flex items-center ${isRTL ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium" dir={isRTL ? 'rtl' : 'ltr'}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div className={`flex items-center ${isRTL ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium" dir={isRTL ? 'rtl' : 'ltr'}>
                        {isRTL ? 'الموقع' : 'Location'}
                      </p>
                      <p className="text-gray-900 font-semibold" dir={isRTL ? 'rtl' : 'ltr'}>
                        {t('latest_project.location')}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center ${isRTL ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar size={18} className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium" dir={isRTL ? 'rtl' : 'ltr'}>
                        {isRTL ? 'تاريخ البدء' : 'Start Date'}
                      </p>
                      <p className="text-gray-900 font-semibold" dir={isRTL ? 'rtl' : 'ltr'}>
                        {t('latest_project.start_date')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button className={`group gradient-libya-button text-white px-8 py-4 rounded-full font-bold text-lg hover:gradient-libya-button-hover transition-all duration-300 hover:transform hover:scale-105 shadow-lg flex items-center btn-micro ${isRTL ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
                  <span>{t('latest_project.cta_button')}</span>
                  <ArrowRight size={20} className={`group-hover:translate-x-1 transition-transform icon-bounce ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Image Side */}
              <div className={`relative ${isRTL ? 'lg:col-start-1' : ''}`}>
                <div className="h-full min-h-[400px] lg:min-h-[500px]">
                  <img
                    src="/images/latest-project.jpg"
                    alt={t('latest_project.subtitle')}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image doesn't exist
                      e.currentTarget.src = 'https://via.placeholder.com/600x500/2563eb/ffffff?text=Latest+Project';
                    }}
                  />
                  {/* Overlay gradient for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default LatestProjectSection;
