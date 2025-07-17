import React from 'react';
import { Search, FileText, Building, Users, Map, Settings, ClipboardCheck, Scale, ArrowLeft } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Search,
      title: 'استعلام عن المخططات العمرانية',
      description: 'استعلم عن المخططات العمرانية المعتمدة والمشاريع قيد التطوير',
      color: 'bg-blue-500',
      accentColor: 'bg-blue-100'
    },
    {
      icon: FileText,
      title: 'التراخيص والتصاريح',
      description: 'إصدار تراخيص البناء والتصاريح اللازمة للمشاريع العمرانية',
      color: 'bg-blue-600',
      accentColor: 'bg-blue-100'
    },
    {
      icon: Map,
      title: 'الخرائط والمساحة',
      description: 'إعداد الخرائط التفصيلية والمساحية للمشاريع والأراضي',
      color: 'bg-blue-700',
      accentColor: 'bg-blue-100'
    },
    {
      icon: Building,
      title: 'تقييم المشاريع العمرانية',
      description: 'تقييم ومراجعة المشاريع العمرانية للتأكد من مطابقتها للمعايير',
      color: 'bg-blue-800',
      accentColor: 'bg-blue-100'
    },
    {
      icon: ClipboardCheck,
      title: 'الإشراف والمتابعة',
      description: 'الإشراف على تنفيذ المشاريع ومتابعة الالتزام بالمعايير المعتمدة',
      color: 'bg-indigo-600',
      accentColor: 'bg-indigo-100'
    },
    {
      icon: Scale,
      title: 'الاستشارات القانونية',
      description: 'تقديم الاستشارات القانونية المتعلقة بقوانين البناء والتخطيط',
      color: 'bg-gray-600',
      accentColor: 'bg-gray-100'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-blue-50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-100 rounded-full px-6 py-2 mb-6">
            <Settings className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-medium">خدماتنا</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">خدمات التخطيط العمراني</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نقدم مجموعة شاملة من الخدمات الحكومية في مجال التخطيط العمراني وتنظيم البناء
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
              <h4 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-700 transition-colors">
                {service.title}
              </h4>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-bold group-hover:text-blue-700 transition-colors">
                  ابدأ الآن
                </span>
                <div className={`p-2 ${service.accentColor} rounded-lg group-hover:scale-110 transition-transform`}>
                  <ArrowLeft size={16} className="text-blue-600 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 space-x-reverse">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
              استكشف جميع الخدمات
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all duration-300">
              تواصل معنا
            </button>
          </div>
        </div>
      </div>
    )
    )
    }
    </section>
  );
};

export default ServicesSection;
