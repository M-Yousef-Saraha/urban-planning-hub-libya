
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Leaf, TreePine, Recycle, Zap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  const quickLinks = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'من نحن', href: '#about' },
    { name: 'الخدمات البيئية', href: '#services' },
    { name: 'المشاريع الخضراء', href: '#projects' },
    { name: 'اتصل بنا', href: '#contact' }
  ];

  const ecoInitiatives = [
    { name: 'المدن الذكية', href: '#', icon: Zap },
    { name: 'الطاقة المتجددة', href: '#', icon: TreePine },
    { name: 'إعادة التدوير', href: '#', icon: Recycle },
    { name: 'البيئة المستدامة', href: '#', icon: Leaf }
  ];

  return (
    <footer className="bg-gradient-to-b from-green-900 to-green-800 text-white relative overflow-hidden" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 animate-float">
          <TreePine className="w-20 h-20 text-green-300" />
        </div>
        <div className="absolute bottom-20 left-32 animate-float" style={{ animationDelay: '1s' }}>
          <Leaf className="w-16 h-16 text-green-300" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 space-x-reverse mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Leaf className="text-white w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">الهيئة الوطنية للتخطيط العمراني</h3>
                <p className="text-green-200 font-medium">نحو بيئة مستدامة</p>
              </div>
            </div>
            
            <p className="text-green-100 mb-8 leading-relaxed text-lg">
              نسعى لبناء مستقبل عمراني أخضر ومستدام من خلال تطوير مخططات صديقة للبيئة 
              تحافظ على التوازن الطبيعي وتخدم الأجيال القادمة.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 space-x-reverse text-green-200">
                <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center">
                  <Phone size={18} />
                </div>
                <span className="text-lg">+218 21 123 4567</span>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse text-green-200">
                <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center">
                  <Mail size={18} />
                </div>
                <span className="text-lg">green@urbanplanning.ly</span>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse text-green-200">
                <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <span className="text-lg">شارع الجمهورية، طرابلس، ليبيا</span>
              </div>
            </div>
          </div>

          {/* Eco Initiatives */}
          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center space-x-2 space-x-reverse">
              <TreePine className="w-6 h-6 text-green-400" />
              <span>مبادراتنا البيئية</span>
            </h4>
            <ul className="space-y-3">
              {ecoInitiatives.map((initiative) => (
                <li key={initiative.name}>
                  <a 
                    href={initiative.href}
                    className="flex items-center space-x-3 space-x-reverse text-green-200 hover:text-white transition-colors duration-200 group"
                  >
                    <initiative.icon size={16} className="group-hover:scale-110 transition-transform" />
                    <span>{initiative.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Social */}
          <div>
            <h4 className="text-xl font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3 mb-8">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-green-200 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <h5 className="text-lg font-bold mb-4">تابعنا</h5>
            <div className="flex space-x-4 space-x-reverse">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center hover:bg-green-600 transition-all duration-300 group hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-green-200 text-sm mb-4 md:mb-0">
            &copy; {currentYear} الهيئة الوطنية للتخطيط العمراني. جميع الحقوق محفوظة.
          </p>
          <div className="flex space-x-6 space-x-reverse text-sm text-green-200">
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a>
            <a href="#" className="hover:text-white transition-colors">الاستدامة البيئية</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
