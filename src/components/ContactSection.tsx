
import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم إرسال الرسالة بنجاح",
      description: "سيتم الرد عليك في أقرب وقت ممكن",
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
      icon: Phone,
      title: 'الهاتف',
      details: ['+218 21 123 4567', '+218 21 765 4321'],
      color: 'bg-green-500'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      details: ['info@urbanplanning.ly', 'green@urbanplanning.ly'],
      color: 'bg-emerald-500'
    },
    {
      icon: MapPin,
      title: 'العنوان',
      details: ['شارع الجمهورية، طرابلس', 'ليبيا - صندوق بريد 12345'],
      color: 'bg-green-600'
    },
    {
      icon: Clock,
      title: 'أوقات العمل',
      details: ['السبت - الخميس: 8:00 - 16:00', 'الجمعة: مغلق'],
      color: 'bg-teal-500'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden" dir="rtl">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <Building className="absolute top-20 right-20 w-32 h-32 text-blue-600" />
        <Building className="absolute bottom-32 left-32 w-24 h-24 text-blue-600" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-100 rounded-full px-6 py-2 mb-6">
            <Building className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-medium">تواصل معنا</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">اتصل بنا</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نحن هنا للإجابة على استفساراتكم حول خدماتنا وتقديم المساعدة في مجال التخطيط العمراني
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="modern-card p-10">
            <div className="flex items-center space-x-3 space-x-reverse mb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Send className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-2xl font-bold text-blue-800">أرسل لنا رسالة</h4>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-blue-700 mb-3">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-blue-50/50"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-blue-700 mb-3">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-blue-50/50"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-blue-700 mb-3">
                  الرسالة أو الاستفسار
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none bg-blue-50/50"
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
                    <h5 className="text-xl font-bold text-green-800 mb-3">{info.title}</h5>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 mb-2 leading-relaxed" dir={detail.startsWith('+') ? 'ltr' : 'rtl'}>{detail}</p>
                    ))}
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
