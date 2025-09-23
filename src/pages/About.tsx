import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';

export default function About() {
  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <AboutSection />
      <Footer />
    </div>
  );
}
