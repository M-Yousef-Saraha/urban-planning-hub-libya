
import React from 'react';
import { Calendar, ArrowLeft, Building, FileText, Map } from 'lucide-react';

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: 'إطلاق المخطط العمراني الجديد لمدينة طرابلس 2025',
      summary: 'الهيئة تعلن عن إطلاق المخطط العمراني المحدث لمدينة طرابلس والذي يشمل تطوير البنية التحتية والمرافق العامة...',
      date: '2025-01-15',
      icon: Building,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'اعتماد قوانين البناء الجديدة',
      summary: 'تم اعتماد قوانين البناء المحدثة والتي تشمل معايير جديدة للسلامة والجودة في المشاريع العمرانية...',
      date: '2025-01-12',
      icon: FileText,
      color: 'bg-blue-600'
    },
    {
      id: 3,
      title: 'ورشة عمل حول التخطيط العمراني الحديث',
      summary: 'نظمت الهيئة ورشة عمل متخصصة حول أحدث تقنيات التخطيط العمراني والتطوير الحضري...',
      date: '2025-01-10',
      icon: Map,
      color: 'bg-blue-700'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-100 rounded-full px-6 py-2 mb-6">
            <Building className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-medium">أحدث المستجدات</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">أحدث الأخبار</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            تابع آخر المستجدات والأخبار من الهيئة الوطنية للتخطيط العمراني
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <div 
              key={item.id} 
              className="modern-card group cursor-pointer overflow-hidden hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    <Calendar size={16} className="ml-2" />
                    <span>{new Date(item.date).toLocaleDateString('ar-SA')}</span>
                  </div>
                  <div className={`p-3 ${item.color} rounded-full group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={20} className="text-white" />
                  </div>
                </div>
                
                <h4 className="font-bold text-xl mb-5 text-gray-800 group-hover:text-blue-700 transition-colors leading-normal">
                  {item.title}
                </h4>
                
                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {item.summary}
                </p>
                
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                  <span className="ml-2">اقرأ المزيد</span>
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
            عرض جميع الأخبار
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
