import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/ServicesSection';

export default function Services() {
  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <ServicesSection />
      <Footer />
    </div>
  );
}
