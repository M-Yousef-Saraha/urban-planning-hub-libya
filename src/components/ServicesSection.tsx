import React from 'react';
import { Search, FileText, Building, Users, Map, Settings, Leaf, TreePine, Recycle, Zap, Wind, Droplets, ArrowLeft } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Search,
      title: 'استعلام عن المخططات البيئية',
      description: 'استعلم عن المخططات العمرانية المستدامة والمشاريع الخضراء المعتمدة',
      color: 'bg-green-500',
      accentColor: 'bg-green-100'
    },
    {
      icon: TreePine,
      title: 'تخطيط المساحات الخضراء',
      description: 'خدمات تخطيط وتصميم الحدائق والمساحات الخضراء في المدن',
      color: 'bg-emerald-500',
      accentColor: 'bg-emerald-100'
    },
    {
      icon: Zap,
      title: 'استشارات الطاقة المتجددة',
      description: 'الحصول على استشارات متخصصة في دمج أنظمة الطاقة المتجددة',
      color: 'bg-green-600',
      accentColor: 'bg-green-100'
    },
    {
      icon: Recycle,
      title: 'إدارة النفايات المستدامة',
      description: 'خدمات تخطيط وتطوير أنظمة إدارة النفايات وإعادة التدوير',
      color: 'bg-teal-500',
      accentColor: 'bg-teal-100'
    },
    {
      icon: Wind,
      title: 'تقييم الأثر البيئي',
      description: 'تقييم شامل للأثر البيئي للمشاريع العمرانية والتنموية',
      color: 'bg-green-700',
      accentColor: 'bg-green-100'
    },
    {
      icon: Droplets,
      title: 'إدارة الموارد المائية',
      description: 'خدمات تخطيط وإدارة الموارد المائية والري المستدام',
      color: 'bg-blue-500',
      accentColor: 'bg-blue-100'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-green-50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-green-100 rounded-full px-6 py-2 mb-6">
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">خدماتنا البيئية</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">خدمات التخطيط المستدام</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نقدم مجموعة شاملة من الخدمات البيئية والاستشارية لبناء مدن مستدامة وصديقة للبيئة
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
                  <service.icon size={28} className="text-white" />
                </div>
                <div className={`w-3 h-3 ${service.color} rounded-full animate-pulse`}></div>
              </div>
              
              <h4 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-green-700 transition-colors">
                {service.title}
              </h4>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-green-600 font-bold group-hover:text-green-700 transition-colors">
                  ابدأ الآن
                </span>
                <div className={`p-2 ${service.accentColor} rounded-lg group-hover:scale-110 transition-transform`}>
                  <ArrowLeft size={16} className="text-green-600 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 space-x-reverse">
            <button className="bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
              استكشف جميع الخدمات
            </button>
            <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full font-bold hover:bg-green-600 hover:text-white transition-all duration-300">
              تواصل معنا
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
