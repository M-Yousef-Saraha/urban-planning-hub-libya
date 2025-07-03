
import React from 'react';
import { ArrowDown, Leaf, Recycle, TreePine } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen gradient-green text-white py-20 relative overflow-hidden flex items-center" dir="rtl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 animate-float">
          <TreePine className="w-16 h-16 text-green-200" />
        </div>
        <div className="absolute top-40 left-32 animate-float" style={{ animationDelay: '1s' }}>
          <Leaf className="w-12 h-12 text-green-200" />
        </div>
        <div className="absolute bottom-32 right-40 animate-float" style={{ animationDelay: '2s' }}>
          <Recycle className="w-14 h-14 text-green-200" />
        </div>
        <div className="absolute top-32 left-20 w-32 h-32 border-2 border-green-200 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 border-2 border-green-200 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Leaf pattern overlay */}
      <div className="absolute inset-0 leaf-pattern opacity-30"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 animate-slide-in-top">
            <Leaf className="w-5 h-5 text-green-200" />
            <span className="text-green-100 font-medium">مستقبل أخضر مستدام</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in-up">
            نحو تخطيط عمراني
            <span className="block text-gradient-alt bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">
              أخضر ومستدام
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-green-100 leading-relaxed max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            الهيئة الوطنية للتخطيط العمراني - رائدة في التخطيط البيئي المستدام
            <br />
            <span className="text-lg text-green-200">منصة المعلومات والخرائط والخدمات الصديقة للبيئة</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button className="group bg-white text-green-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all duration-300 hover:transform hover:scale-105 shadow-xl flex items-center space-x-3 space-x-reverse">
              <Leaf className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>استكشف خدماتنا البيئية</span>
            </button>
            <button className="group border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-700 transition-all duration-300 flex items-center space-x-3 space-x-reverse">
              <TreePine className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>المشاريع المستدامة</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="glass-effect rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">200+</div>
              <div className="text-green-200 text-sm">مشروع أخضر</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">85%</div>
              <div className="text-green-200 text-sm">توفير في الطاقة</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">40+</div>
              <div className="text-green-200 text-sm">حديقة عامة</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">12</div>
              <div className="text-green-200 text-sm">مدينة مستدامة</div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
            <ArrowDown className="text-white w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
