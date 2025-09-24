
import React from 'react';
import { Calendar, ArrowLeft, Building, FileText, Map } from 'lucide-react';
import { motion } from 'framer-motion';

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: 'إطلاق المخطط العمراني الجديد لمدينة طرابلس 2025',
      summary: 'الهيئة تعلن عن إطلاق المخطط العمراني المحدث لمدينة طرابلس والذي يشمل تطوير البنية التحتية والمرافق العامة...',
      date: '2025-01-15',
      icon: Building,
      color: 'bg-green-500'
    },
    {
      id: 2,
      title: 'اعتماد قوانين البناء الجديدة',
      summary: 'تم اعتماد قوانين البناء المحدثة والتي تشمل معايير جديدة للسلامة والجودة في المشاريع العمرانية...',
      date: '2025-01-12',
      icon: FileText,
      color: 'bg-red-500'
    },
    {
      id: 3,
      title: 'ورشة عمل حول التخطيط العمراني الحديث',
      summary: 'نظمت الهيئة ورشة عمل متخصصة حول أحدث تقنيات التخطيط العمراني والتطوير الحضري...',
      date: '2025-01-10',
      icon: Map,
      color: 'bg-blue-500'
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-20 gradient-libya-landscape border-t border-white/20" 
      dir="rtl"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/30">
            <Building className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">أحدث المستجدات</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">أحدث الأخبار</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            تابع آخر المستجدات والأخبار من الهيئة الوطنية للتخطيط العمراني
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card group cursor-pointer overflow-hidden hover-lift rounded-2xl card-micro"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <Calendar size={16} className="ml-2" />
                    <span dir="ltr">{new Date(item.date).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className={`p-3 ${item.color} rounded-full group-hover:scale-110 transition-transform duration-300 icon-bounce`}>
                    <item.icon size={20} className="text-white" />
                  </div>
                </div>
                
                <h4 className="font-bold text-xl mb-5 text-gray-800 group-hover:text-blue-700 transition-colors leading-normal">
                  {item.title}
                </h4>
                
                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {item.summary}
                </p>
                
                <div className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors">
                  <span className="ml-2">اقرأ المزيد</span>
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform icon-bounce" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="gradient-libya-button text-white px-10 py-4 rounded-full font-bold text-lg hover:gradient-libya-button-hover transition-all duration-300 shadow-lg btn-micro"
          >
            عرض جميع الأخبار
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default NewsSection;
