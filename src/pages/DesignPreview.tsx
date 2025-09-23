import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContainer from '@/components/layout/PageContainer';
import NewsSection from '@/components/NewsSection';
import ServicesSection from '@/components/ServicesSection';
import { Map, FileText, Search, Landmark, Archive } from 'lucide-react';

export default function DesignPreview() {
  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 text-white">
        <PageContainer maxWidth="2xl" padding="lg">
          <div className="text-center space-y-5">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              البوابة الحكومية للتخطيط العمراني
            </h1>
            <p className="text-blue-100 text-lg md:text-xl">
              خدمات ووثائق عمرانية موثوقة — مصممة للوصول السهل والوضوح.
            </p>
            <form className="mt-6 flex flex-col md:flex-row gap-2 md:gap-3 max-w-3xl mx-auto">
              <div className="flex-1 flex items-center gap-2 bg-white/95 text-gray-800 rounded-xl px-4 py-3 shadow-sm">
                <Search className="size-5 text-blue-600" aria-hidden />
                <input
                  className="w-full bg-transparent outline-none placeholder:text-gray-500"
                  placeholder="ابحث عن وثيقة أو خدمة أو مدينة..."
                  aria-label="بحث"
                />
              </div>
              <button type="submit" className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors font-semibold shadow">
                بحث
              </button>
            </form>
          </div>
        </PageContainer>
      </section>

      {/* Quick actions */}
      <PageContainer maxWidth="2xl" padding="lg" className="-mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Landmark, label: 'الخدمات الحكومية', color: 'from-blue-50 to-blue-100', href: '#' },
            { icon: Map, label: 'الدليل الجغرافي', color: 'from-indigo-50 to-indigo-100', href: '#' },
            { icon: FileText, label: 'الوثائق العامة', color: 'from-sky-50 to-sky-100', href: '#' },
            { icon: Archive, label: 'الأرشيف', color: 'from-cyan-50 to-cyan-100', href: '#' },
          ].map(({ icon: Icon, label, color, href }) => (
            <a key={label} href={href} className={`group rounded-xl p-4 bg-gradient-to-br ${color} border border-gray-200 shadow-sm hover:shadow-md transition-shadow`}> 
              <div className="flex items-center justify-between">
                <div className="text-gray-800 font-semibold">{label}</div>
                <Icon className="size-5 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </PageContainer>

      {/* Bring in homepage-like sections */}
      <NewsSection />
      <ServicesSection />

      <Footer />
    </div>
  );
}
