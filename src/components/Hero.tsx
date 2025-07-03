
import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="gradient-blue text-white py-20 relative overflow-hidden" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-40 h-40 border border-white rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            نحو تخطيط عمراني
            <span className="block gradient-text bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              متطور ومستدام
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            موقع الهيئة الوطنية للتخطيط العمراني - منصة المعلومات والخرائط والخدمات
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 hover:transform hover:scale-105">
              استكشف خدماتنا
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300">
              تصفح المشاريع
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-white w-6 h-6" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
