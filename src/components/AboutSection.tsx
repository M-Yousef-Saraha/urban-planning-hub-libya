
import React from 'react';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { icon: Target, label: 'مشروع منجز', value: '150+' },
    { icon: Users, label: 'خبير ومختص', value: '300+' },
    { icon: Award, label: 'جائزة وتقدير', value: '25+' },
    { icon: TrendingUp, label: 'سنة خبرة', value: '40+' }
  ];

  return (
    <section id="about" className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">من نحن</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              الهيئة الوطنية للتخطيط العمراني هي المؤسسة الرائدة في ليبيا المسؤولة عن تطوير وتنظيم 
              الخطط العمرانية الشاملة. نسعى لبناء مستقبل عمراني مستدام يخدم المواطن والوطن.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              من خلال فريق من الخبراء المتخصصين وأحدث التقنيات، نقدم حلولاً عمرانية متطورة تواكب 
              التطور العالمي وتحافظ على الهوية المحلية.
            </p>
            
            {/* Mission Points */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <p className="text-gray-700">تطوير مخططات عمرانية شاملة ومستدامة</p>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <p className="text-gray-700">تقديم الاستشارات التخطيطية المتخصصة</p>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <p className="text-gray-700">دعم التنمية المستدامة والحفاظ على البيئة</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
                  <stat.icon size={24} />
                </div>
                <div className="text-3xl font-bold text-blue-900 mb-2">{stat.value}</div>
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
