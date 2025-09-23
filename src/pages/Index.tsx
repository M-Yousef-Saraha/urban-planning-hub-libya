
import React from 'react';
import Header from '@/components/Header';
import NewsSection from '@/components/NewsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import LatestProjectSection from '@/components/LatestProjectSection';
import HeroImageSection from '@/components/HeroImageSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Offset content to avoid overlap with fixed header */}
      <main className="flex-1">
        <HeroImageSection />
        <LatestProjectSection />
        <div className="container mx-auto px-4 space-y-20 py-16">
          <NewsSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
