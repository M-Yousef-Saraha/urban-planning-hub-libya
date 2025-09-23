
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import PageContainer from '@/components/layout/PageContainer';
import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';

const AboutSection = () => {
  const { t } = useTranslation('pages');
  const { isRTL } = useLanguage();

  return (
    <section id="about" className="bg-white py-12 md:py-16" dir={isRTL ? 'rtl' : 'ltr'}>
      <PageContainer className="max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" dir={isRTL ? 'rtl' : 'ltr'}>{t('about.title')}</h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p dir={isRTL ? 'rtl' : 'ltr'}>
            {t('about.description_p1')}
          </p>
          <p dir={isRTL ? 'rtl' : 'ltr'}>
            {t('about.description_p2')}
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3" dir={isRTL ? 'rtl' : 'ltr'}>{t('about.subtitle')}</h2>
            <p dir={isRTL ? 'rtl' : 'ltr'}>
              {t('about.responsibilities')}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3" dir={isRTL ? 'rtl' : 'ltr'}>{t('about.role_title')}</h2>
            <p dir={isRTL ? 'rtl' : 'ltr'}>
              {t('about.role_description')}
            </p>
          </div>
        </div>

        {/* Contact details moved to ContactSection */}
      </PageContainer>
    </section>
  );
};

export default AboutSection;
