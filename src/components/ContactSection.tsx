
import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock, Building, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();
  const { t } = useTranslation(['pages', 'forms']);
  const { isRTL } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('forms:messages.success'),
      description: t('forms:messages.success_description'),
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'العنوان',
      details: ['أبوسليم - طرابلس'],
      color: 'bg-blue-600'
    },
    {
      icon: Phone,
      title: 'الهاتف',
      details: ['021-4896816'],
      color: 'bg-blue-600'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      details: ['info@upa.gov.ly'],
      color: 'bg-blue-600'
    },
    {
      icon: Globe,
      title: 'الموقع الإلكتروني',
      details: ['upa.gov.ly'],
      color: 'bg-blue-600'
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      details: ['الأحد إلى الخميس', 'من 8 صباحًا إلى 2 ظهرًا'],
      color: 'bg-blue-600'
    }
  ];

  return (
  <section id="contact" className="py-24 bg-white relative overflow-hidden border-t border-gray-100" dir="rtl">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.06),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-50 rounded-full px-6 py-2 mb-6 ring-1 ring-blue-200">
            <Building className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-medium">تواصل معنا</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">اتصل بنا</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نحن هنا للإجابة على استفساراتكم حول خدماتنا وتقديم المساعدة في مجال التخطيط العمراني
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
            <div className="flex items-center space-x-3 space-x-reverse mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center ring-1 ring-blue-200">
                <Send className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">أرسل لنا رسالة</h4>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-3">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-3">
                  الرسالة أو الاستفسار
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none bg-white"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-3 space-x-reverse group shadow-lg hover:shadow-xl"
              >
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                <span>إرسال الرسالة</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="modern-card p-8 hover-lift group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${info.color} rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h5>
                    {info.details.map((detail, idx) => {
                      const isPhone = info.title.includes('الهاتف');
                      const isEmail = info.title.includes('البريد');
                      const isWebsite = info.title.includes('الموقع');
                      if (isPhone) {
                        return (
                          <a key={idx} href={`tel:0214896816`} dir="ltr" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
                            {detail}
                          </a>
                        );
                      }
                      if (isEmail) {
                        return (
                          <a key={idx} href={`mailto:info@upa.gov.ly`} dir="ltr" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
                            {detail}
                          </a>
                        );
                      }
                      if (isWebsite) {
                        return (
                          <a key={idx} href="https://upa.gov.ly" target="_blank" rel="noreferrer" dir="ltr" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
                            {detail}
                          </a>
                        );
                      }
                      return (
                        <p key={idx} className="text-gray-600 mb-2 leading-relaxed" dir="rtl">{detail}</p>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
