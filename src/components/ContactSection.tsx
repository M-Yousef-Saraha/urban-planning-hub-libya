
import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';
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
    // Handle form submission
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
      details: ['+218 21 123 4567', '+218 21 765 4321']
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      details: ['info@urbanplanning.ly', 'contact@urbanplanning.ly']
    },
    {
      icon: MapPin,
      title: 'العنوان',
      details: ['شارع الجمهورية، طرابلس', 'ليبيا - صندوق بريد 12345']
    },
    {
      icon: Clock,
      title: 'أوقات العمل',
      details: ['السبت - الخميس: 8:00 - 16:00', 'الجمعة: مغلق']
    }
  ];

  return (
    <section id="contact" className="py-16 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">اتصل بنا</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            نحن هنا للإجابة على استفساراتكم وتقديم المساعدة في جميع الأوقات
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">أرسل لنا رسالة</h4>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  الرسالة أو الشكوى
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse group"
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
                className="bg-white rounded-xl shadow-lg p-6 hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex-shrink-0">
                    <info.icon size={20} />
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-gray-800 mb-2">{info.title}</h5>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 mb-1">{detail}</p>
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
