
import React from 'react';
import { Target, Users, Award, TrendingUp, Leaf, TreePine, Recycle, Zap } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { icon: TreePine, label: 'مشروع أخضر', value: '200+', color: 'bg-green-500' },
    { icon: Users, label: 'خبير بيئي', value: '300+', color: 'bg-emerald-500' },
    { icon: Award, label: 'جائزة بيئية', value: '25+', color: 'bg-green-600' },
    { icon: Zap, label: 'توفير طاقة', value: '85%', color: 'bg-green-700' }
  ];

  const features = [
    {
      icon: Leaf,
      title: 'التخطيط المستدام',
      description: 'تطوير مخططات عمرانية صديقة للبيئة تحافظ على التوازن الطبيعي'
    },
    {
      icon: TreePine,
      title: 'المساحات الخضراء',
      description: 'زيادة المساحات الخضراء والحدائق العامة في المدن'
    },
    {
      icon: Recycle,
      title: 'إعادة التدوير',
      description: 'تطبيق نظم إعادة التدوير وإدارة النفايات المستدامة'
    },
    {
      icon: Zap,
      title: 'الطاقة المتجددة',
      description: 'دمج أنظمة الطاقة المتجددة في جميع المشاريع العمرانية'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-green-100 rounded-full px-6 py-2 mb-6">
              <Leaf className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">من نحن</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold text-green-800 mb-8 leading-tight">
              رواد التخطيط
              <span className="block text-gradient">البيئي المستدام</span>
            </h3>
            
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              الهيئة الوطنية للتخطيط العمراني هي المؤسسة الرائدة في ليبيا لتطوير المدن الخضراء 
              والمستدامة. نسعى لبناء مستقبل عمراني يحافظ على البيئة ويخدم الأجيال القادمة.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 space-x-reverse">
                  <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
              تعرف على مبادراتنا البيئية
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
