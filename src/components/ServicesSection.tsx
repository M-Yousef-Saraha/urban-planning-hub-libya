import React from 'react';
import { Search, FileText, Building, Users, Map, Settings, ClipboardCheck, Scale, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const ServicesSection = () => {
  const { t } = useTranslation('pages');
  const { isRTL } = useLanguage();

  const services = [
    {
      icon: Search,
      title: t('services.service1.title'),
      description: t('services.service1.description'),
      color: 'bg-primary',
      accentColor: 'bg-[hsla(var(--primary)/0.12)]',
      iconColor: 'text-primary-foreground'
    },
    {
      icon: FileText,
      title: t('services.service2.title'),
      description: t('services.service2.description'),
      color: 'bg-[hsla(var(--primary)/0.85)]',
      accentColor: 'bg-[hsla(var(--primary)/0.12)]',
      iconColor: 'text-primary-foreground'
    },
    {
      icon: Map,
      title: t('services.service3.title'),
      description: t('services.service3.description'),
      color: 'bg-[hsla(var(--primary)/0.7)]',
      accentColor: 'bg-[hsla(var(--primary)/0.12)]',
      iconColor: 'text-primary-foreground'
    },
    {
      icon: Building,
      title: t('services.service4.title'),
      description: t('services.service4.description'),
      color: 'bg-[hsla(var(--primary)/0.6)]',
      accentColor: 'bg-[hsla(var(--primary)/0.12)]',
      iconColor: 'text-primary-foreground'
    },
    {
      icon: ClipboardCheck,
      title: t('services.service5.title'),
      description: t('services.service5.description'),
      color: 'bg-success',
      accentColor: 'bg-success/15',
      iconColor: 'text-success-foreground'
    },
    {
      icon: Scale,
      title: t('services.service6.title'),
      description: t('services.service6.description'),
      color: 'bg-warning',
      accentColor: 'bg-warning/15',
      iconColor: 'text-warning-foreground'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-[hsla(var(--primary)/0.08)]" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center ${isRTL ? 'space-x-2 space-x-reverse' : 'space-x-2'} bg-[hsla(var(--primary)/0.12)] rounded-full px-6 py-2 mb-6`}>
            <Settings className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium" dir={isRTL ? 'rtl' : 'ltr'}>{t('services.subtitle')}</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-primary mb-6" dir={isRTL ? 'rtl' : 'ltr'}>{t('services.title')}</h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" dir={isRTL ? 'rtl' : 'ltr'}>
            {t('services.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="modern-card p-8 group cursor-pointer hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${service.color} rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <service.icon size={28} className={service.iconColor} />
                </div>
                <div className={`w-3 h-3 ${service.color} rounded-full animate-pulse`}></div>
              </div>
              
              <h4 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>
                {service.title}
              </h4>
              
              <p className="text-muted-foreground leading-relaxed mb-6" dir={isRTL ? 'rtl' : 'ltr'}>
                {service.description}
              </p>
              
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold group-hover:text-primary/80 transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>
                      {t('services.cta_start')}
                    </span>
                    <div className={`p-2 ${service.accentColor} rounded-lg group-hover:scale-110 transition-transform`}>
                      <ArrowLeft size={16} className={`text-primary transition-transform ${isRTL ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
                    </div>
                  </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className={`inline-flex items-center ${isRTL ? 'space-x-4 space-x-reverse' : 'space-x-4'}`}>
            <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
              {t('services.cta_all')}
            </button>
            <button className="border-2 border-primary text-primary px-8 py-4 rounded-full font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              {t('services.cta_contact')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
