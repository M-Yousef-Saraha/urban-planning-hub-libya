
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

          <h2 className="text-5xl md:text-7xl font-bold mb-10 leading-normal animate-fade-in-up">
            <div className="mb-2">الهيئة الوطنية</div>
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 bg-clip-text text-transparent">
              للتخطيط العمراني
            </div>
          </h2>
          

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

        </div>
        
      </div>
    </section>
  );
};

export default Hero;
