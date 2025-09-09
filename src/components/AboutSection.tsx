
import React from 'react';
import { Target, Users, Award, TrendingUp, Building, Map, FileText, Settings } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { icon: Building, label: 'مشروع عمراني', value: '200+', color: 'bg-blue-500' },
    { icon: Users, label: 'مهندس ومخطط', value: '300+', color: 'bg-blue-600' },
    { icon: Award, label: 'مخطط معتمد', value: '50+', color: 'bg-blue-700' },
    { icon: Map, label: 'مدينة مخططة', value: '25+', color: 'bg-blue-800' }
  ];

  const features = [
    {
      icon: Building,
      title: 'التخطيط العمراني',
      description: 'تطوير مخططات عمرانية متطورة وفقاً لأحدث المعايير العالمية'
    },
    {
      icon: Map,
      title: 'الخرائط والمساحة',
      description: 'إعداد الخرائط التفصيلية والمساحية للمشاريع العمرانية'
    },
    {
      icon: FileText,
      title: 'التراخيص والتصاريح',
      description: 'إصدار التراخيص والتصاريح اللازمة للمشاريع العمرانية'
    },
    {
      icon: Settings,
      title: 'الإشراف والمتابعة',
      description: 'الإشراف على تنفيذ المشاريع ومتابعة الالتزام بالمعايير'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-100 rounded-full px-6 py-2 mb-6">
              <Building className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-medium">من نحن</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold text-blue-800 mb-10 leading-relaxed">
              <div className="mb-2">الهيئة الوطنية</div>
              <div className="text-gradient">للتخطيط العمراني</div>
            </h3>
            
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              الهيئة الوطنية للتخطيط العمراني هي المؤسسة الحكومية المسؤولة عن تنظيم وتطوير المدن الليبية. 
              نعمل على وضع المخططات العمرانية وتنظيم البناء وفقاً لأحدث المعايير والممارسات العالمية.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 space-x-reverse">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
              تعرف على خدماتنا
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="modern-card p-8 text-center hover-lift group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={28} className="text-white" />
                </div>
                <div className="text-4xl font-bold text-green-800 mb-3">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
