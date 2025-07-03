
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

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
    { name: 'الخدمات', href: '#services' },
    { name: 'المشاريع', href: '#projects' },
    { name: 'اتصل بنا', href: '#contact' }
  ];

  return (
    <footer className="bg-gray-900 text-white" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">ه</span>
              </div>
              <h3 className="text-xl font-bold">الهيئة الوطنية للتخطيط العمراني</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              نسعى لبناء مستقبل عمراني مستدام من خلال تطوير وتنظيم المخططات العمرانية 
              الشاملة التي تخدم المواطن والوطن بأفضل المعايير العالمية.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                <Phone size={16} />
                <span>+218 21 123 4567</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                <Mail size={16} />
                <span>info@urbanplanning.ly</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                <MapPin size={16} />
                <span>شارع الجمهورية، طرابلس، ليبيا</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">تابعنا</h4>
            <div className="flex space-x-3 space-x-reverse">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-2">اشترك في النشرة الإخبارية</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-lg text-sm focus:outline-none focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-l-lg transition-colors">
                  اشترك
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} الهيئة الوطنية للتخطيط العمراني. جميع الحقوق محفوظة.
          </p>
          <div className="flex space-x-6 space-x-reverse text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a>
            <a href="#" className="hover:text-white transition-colors">خريطة الموقع</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
