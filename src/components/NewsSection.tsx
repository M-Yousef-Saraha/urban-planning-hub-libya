
import React from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: 'إطلاق مبادرة التخطيط العمراني الذكي 2025',
      summary: 'الهيئة تعلن عن إطلاق مبادرة جديدة لتطوير المدن الذكية باستخدام أحدث التقنيات...',
      date: '2025-01-15'
    },
    {
      id: 2,
      title: 'اعتماد المخطط الهيكلي الجديد لمدينة طرابلس',
      summary: 'تم اعتماد المخطط الهيكلي المحدث لمدينة طرابلس بعد دراسات مكثفة استمرت لأكثر من عامين...',
      date: '2025-01-12'
    },
    {
      id: 3,
      title: 'ورشة عمل حول التنمية المستدامة والبيئة',
      summary: 'نظمت الهيئة ورشة عمل متخصصة حول دمج معايير التنمية المستدامة في المشاريع العمرانية...',
      date: '2025-01-10'
    }
  ];

  return (
    <section className="py-16 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">أحدث الأخبار</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            تابع آخر المستجدات والإعلانات المهمة من الهيئة الوطنية للتخطيط العمراني
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl shadow-lg hover-lift group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="flex items-center text-blue-600 text-sm mb-3">
                  <Calendar size={16} className="ml-2" />
                  <span>{new Date(item.date).toLocaleDateString('ar-SA')}</span>
                </div>
                <h4 className="font-bold text-lg mb-3 text-gray-800 group-hover:text-blue-900 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {item.summary}
                </p>
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-800">
                  <span className="ml-2">اقرأ المزيد</span>
                  <ArrowLeft size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all duration-300 hover:transform hover:scale-105">
            عرض جميع الأخبار
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
