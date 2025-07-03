
import React from 'react';
import { Search, FileText, Building, Users, Map, Settings } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Search,
      title: 'خدمة الاستعلام عن المخططات',
      description: 'استعلم عن المخططات العمرانية المعتمدة وحالة المشاريع الجارية'
    },
    {
      icon: FileText,
      title: 'طلب تحديث المخططات',
      description: 'قدم طلبك لتحديث أو تعديل المخططات العمرانية الحالية'
    },
    {
      icon: Building,
      title: 'التقديم على مشروع عمراني',
      description: 'اتبع الإجراءات الرسمية للتقديم على المشاريع العمرانية الجديدة'
    },
    {
      icon: Users,
      title: 'الاستشارات التخطيطية',
      description: 'احصل على استشارات متخصصة من خبراء التخطيط العمراني'
    },
    {
      icon: Map,
      title: 'خرائط ومعلومات جغرافية',
      description: 'اطلع على الخرائط التفاعلية والمعلومات الجغرافية المحدثة'
    },
    {
      icon: Settings,
      title: 'الخدمات الرقمية',
      description: 'استفد من منصتنا الرقمية لإنجاز معاملاتك إلكترونياً'
    }
  ];

  return (
    <section id="services" className="py-16 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">خدماتنا</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            نقدم مجموعة شاملة من الخدمات التخطيطية والاستشارية لخدمة المواطنين والمؤسسات
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover-lift group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <service.icon size={24} />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-900 transition-colors">
                {service.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-blue-600 font-medium group-hover:text-blue-800 transition-colors">
                  ابدأ الآن ←
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
