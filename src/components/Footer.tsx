import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Building, Map, FileText, Settings, Clock, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation(['pages', 'navigation']);
  const { isRTL } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  const quickLinks = [
    { name: t('navigation:menu.home'), href: '/' },
    { name: t('navigation:menu.library'), href: '/library' },
    { name: t('navigation:menu.about'), href: '/about' },
    { name: t('navigation:menu.services'), href: '/services' },
    { name: t('navigation:menu.projects'), href: '/projects' },
    { name: t('navigation:menu.news'), href: '/news' },
    { name: t('navigation:menu.standards'), href: '/standards' },
    { name: t('navigation:menu.branches'), href: '/branches' },
    { name: t('navigation:menu.contact'), href: '/#contact' }
  ];

  const ecoInitiatives = [
    { name: t('footer.services.urban_planning'), href: '#', icon: Building },
    { name: t('footer.services.maps_surveying'), href: '#', icon: Map },
    { name: t('footer.services.licenses'), href: '#', icon: FileText },
    { name: t('footer.services.supervision'), href: '#', icon: Settings }
  ];

  return (
    <footer className="bg-gradient-to-br from-[hsla(var(--primary)/0.04)] to-background border-t border-border" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Organization Info - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className={`flex items-start ${isRTL ? 'space-x-4 space-x-reverse' : 'space-x-4'} mb-6`}>
              <img 
                src="/updated-logo.png" 
                alt="الهيئة الوطنية للتخطيط العمراني"
                className="w-16 h-16 object-contain bg-card rounded-xl p-2 shadow-sm border border-border/70"
              />
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2" dir={isRTL ? 'rtl' : 'ltr'}>{t('footer.organization.name')}</h3>
                <p className="text-primary font-medium text-lg" dir={isRTL ? 'rtl' : 'ltr'}>{t('footer.organization.tagline')}</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-8 leading-relaxed text-base max-w-lg" dir={isRTL ? 'rtl' : 'ltr'}>
              {t('footer.organization.description')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className={`flex items-center ${isRTL ? 'space-x-3 space-x-reverse' : 'space-x-3'} text-muted-foreground`}>
                <div className="w-10 h-10 bg-[hsla(var(--primary)/0.12)] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-primary" />
                </div>
                <a href="tel:0214896816" className="text-foreground hover:text-primary transition-colors font-medium" dir="ltr">{t('footer.contact.phone')}</a>
              </div>
              <div className={`flex items-center ${isRTL ? 'space-x-3 space-x-reverse' : 'space-x-3'} text-muted-foreground`}>
                <div className="w-10 h-10 bg-[hsla(var(--primary)/0.12)] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-primary" />
                </div>
                <a href="mailto:info@upa.gov.ly" className="text-foreground hover:text-primary transition-colors font-medium" dir="ltr">{t('footer.contact.email')}</a>
              </div>
              <div className={`flex items-center ${isRTL ? 'space-x-3 space-x-reverse' : 'space-x-3'} text-muted-foreground`}>
                <div className="w-10 h-10 bg-[hsla(var(--primary)/0.12)] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-primary" />
                </div>
                <span className="text-foreground font-medium" dir={isRTL ? 'rtl' : 'ltr'}>{t('footer.contact.address')}</span>
              </div>
              <div className={`flex items-center ${isRTL ? 'space-x-3 space-x-reverse' : 'space-x-3'} text-muted-foreground`}>
                <div className="w-10 h-10 bg-[hsla(var(--primary)/0.12)] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe size={16} className="text-primary" />
                </div>
                <a href="https://upa.gov.ly" target="_blank" rel="noreferrer" className="text-foreground hover:text-primary transition-colors font-medium" dir="ltr">{t('footer.contact.website')}</a>
              </div>
              <div className={`flex items-center ${isRTL ? 'space-x-3 space-x-reverse' : 'space-x-3'} text-muted-foreground`}>
                <div className="w-10 h-10 bg-[hsla(var(--primary)/0.12)] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-primary" />
                </div>
                <div className="text-foreground font-medium" dir={isRTL ? 'rtl' : 'ltr'}>
                  <div>{t('footer.contact.hours')}</div>
                  <div className="text-sm text-muted-foreground font-normal">{t('footer.contact.hours_detail')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className={`text-xl font-bold mb-6 text-foreground flex items-center ${isRTL ? 'space-x-2 space-x-reverse' : 'space-x-2'}`}>
              <Settings className="w-5 h-5 text-primary" />
              <span dir={isRTL ? 'rtl' : 'ltr'}>{t('footer.services.title')}</span>
            </h4>
            <ul className="space-y-4">
              {ecoInitiatives.map((service) => (
                <li key={service.name}>
                  <a 
                    href={service.href}
                    className={`flex items-center ${isRTL ? 'space-x-3 space-x-reverse' : 'space-x-3'} text-muted-foreground hover:text-primary transition-colors duration-200 group`}
                  >
                    <service.icon size={18} className="text-primary/70 group-hover:text-primary transition-colors" />
                    <span className="font-medium" dir={isRTL ? 'rtl' : 'ltr'}>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Social */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-foreground" dir={isRTL ? 'rtl' : 'ltr'}>{t('footer.quick_links')}</h4>
            <ul className="space-y-3 mb-8">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block font-medium"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h5 className="text-lg font-bold mb-4 text-foreground" dir={isRTL ? 'rtl' : 'ltr'}>{t('footer.follow_us')}</h5>
            <div className={`flex ${isRTL ? 'space-x-3 space-x-reverse' : 'space-x-3'}`}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-11 h-11 bg-primary rounded-lg flex items-center justify-center hover:bg-primary/90 transition-all duration-300 group hover:scale-105 shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="text-primary-foreground group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0" dir={isRTL ? 'rtl' : 'ltr'}>
            &copy; {currentYear} {t('footer.organization.name')}. {t('footer.legal.copyright')}.
          </p>
          <div className={`flex ${isRTL ? 'space-x-6 space-x-reverse' : 'space-x-6'} text-sm text-muted-foreground`}>
            <a href="#" className="hover:text-primary transition-colors font-medium" dir={isRTL ? 'rtl' : 'ltr'}>{t('footer.legal.privacy')}</a>
            <a href="#" className="hover:text-primary transition-colors font-medium" dir={isRTL ? 'rtl' : 'ltr'}>{t('footer.legal.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;