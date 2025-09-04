
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'المكتبة الرقمية', href: '/library' },
    { name: 'من نحن', href: '#about' },
    { name: 'فروع الهيئة', href: '#branches' },
    { name: 'الخدمات', href: '#services' },
    { name: 'المشاريع', href: '#projects' },
    { name: 'المخططات', href: '#plans' },
    { name: 'الوسائط', href: '#media' },
    { name: 'الاتصال', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-[70] transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-sage-100' 
          : 'bg-white/90 backdrop-blur-sm'
      }`} 
      dir="rtl"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative">
              <img 
                src="/lovable-uploads/926954d9-d0f5-4d6a-9a97-ec24b5fdf369.png" 
                alt="الهيئة الوطنية للتخطيط العمراني"
                className="w-16 h-16 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
                الهيئة الوطنية للتخطيط العمراني
              </h1>
              <p className="text-sm text-blue-600 font-medium">تطوير عمراني متقدم</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 relative group py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            ))}
            <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 border-2 border-blue-500 text-blue-600 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 font-medium">
              <Globe size={16} />
              <span>English</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={24} className="text-blue-600" />
            ) : (
              <Menu size={24} className="text-blue-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 z-[71] py-4 border-t border-blue-100 bg-white/95 backdrop-blur-md shadow-lg">
            <nav className="flex flex-col space-y-3 px-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium py-3 px-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button className="flex items-center justify-center space-x-2 space-x-reverse px-4 py-3 border-2 border-blue-500 text-blue-600 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200 font-medium mt-4">
                <Globe size={16} />
                <span>English</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
