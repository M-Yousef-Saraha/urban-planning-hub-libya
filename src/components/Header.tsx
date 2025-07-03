
import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'من نحن', href: '#about' },
    { name: 'فروع الهيئة', href: '#branches' },
    { name: 'الخدمات', href: '#services' },
    { name: 'المشاريع', href: '#projects' },
    { name: 'المخططات', href: '#plans' },
    { name: 'المكتبة', href: '#library' },
    { name: 'الوسائط', href: '#media' },
    { name: 'الاتصال', href: '#contact' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">ه</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-blue-900">
              الهيئة الوطنية للتخطيط العمراني
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 space-x-reverse">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-700 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-200">
              <Globe size={16} />
              <span>English</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-700 font-medium py-2 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button className="flex items-center justify-center space-x-2 space-x-reverse px-4 py-2 border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-200 mt-4">
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
