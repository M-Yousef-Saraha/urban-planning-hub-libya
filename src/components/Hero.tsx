
import React from 'react';
import { ArrowDown, Building, Map, FileText } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 text-white py-20 relative overflow-hidden flex items-center" dir="rtl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 right-20 animate-float">
          <Building className="w-16 h-16 text-white" />
        </div>
        <div className="absolute top-40 left-32 animate-float" style={{ animationDelay: '1s' }}>
          <Map className="w-12 h-12 text-white" />
        </div>
        <div className="absolute bottom-32 right-40 animate-float" style={{ animationDelay: '2s' }}>
          <FileText className="w-14 h-14 text-white" />
        </div>
        <div className="absolute top-32 left-20 w-32 h-32 border-2 border-white/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 border-2 border-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-20"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-white/15 backdrop-blur-sm rounded-full px-6 py-3 mb-8 animate-slide-in-top">
            <Building className="w-5 h-5 text-blue-100" />
            <span className="text-blue-50 font-medium">التخطيط العمراني المتطور</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in-up">
            الهيئة الوطنية
            <span className="block bg-gradient-to-r from-blue-100 to-blue-200 bg-clip-text text-transparent">
              للتخطيط العمراني
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-blue-50 leading-relaxed max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            تطوير وتنظيم المدن الليبية وفقاً لأحدث المعايير والممارسات العالمية
            <br />
            <span className="text-lg text-blue-100">منصة المعلومات والخرائط والخدمات الحكومية</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button className="group bg-white text-blue-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 hover:transform hover:scale-105 shadow-xl flex items-center space-x-3 space-x-reverse">
              <Building className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>استكشف خدماتنا</span>
            </button>
            <button className="group border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-700 transition-all duration-300 flex items-center space-x-3 space-x-reverse">
              <Map className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>المشاريع العمرانية</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="glass-effect rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">200+</div>
              <div className="text-blue-100 text-sm">مشروع عمراني</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100 text-sm">مخطط معتمد</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">25+</div>
              <div className="text-blue-100 text-sm">مدينة مخططة</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">15</div>
              <div className="text-blue-100 text-sm">سنة خبرة</div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white/15 transition-all cursor-pointer">
            <ArrowDown className="text-white w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
