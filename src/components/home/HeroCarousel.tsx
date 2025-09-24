import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string; // path relative to public
}

const useSlides = () => {
  const { t } = useTranslation('pages');
  
  return [
    {
      id: 1,
      title: t('carousel.slide1.title'),
      description: t('carousel.slide1.description'),
      image: '/images/slide-1.png'
    },
    {
      id: 2,
      title: t('carousel.slide2.title'),
      description: t('carousel.slide2.description'),
      image: '/images/slide-2.jpeg'
    },
    {
      id: 3,
      title: t('carousel.slide3.title'),
      description: t('carousel.slide3.description'),
      image: '/images/slide-3.png'
    }
  ];
};

const AUTO_INTERVAL = 5600; // ms

export const HeroCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const { isRTL } = useLanguage();
  const slides = useSlides();
  const timerRef = useRef<number | null>(null);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const deltaXRef = useRef(0);

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = window.setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, AUTO_INTERVAL);
  }, []);

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer]);

  // Basic swipe support (LTR & RTL agnostic)
  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDownRef.current = true;
    startXRef.current = e.clientX;
    deltaXRef.current = 0;
    clearTimer();
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    deltaXRef.current = e.clientX - startXRef.current;
  };
  const handlePointerUp = () => {
    if (!isPointerDownRef.current) return;
    const threshold = 60; // px
    if (deltaXRef.current > threshold) {
      setIndex(prev => (prev - 1 + slides.length) % slides.length);
    } else if (deltaXRef.current < -threshold) {
      setIndex(prev => (prev + 1) % slides.length);
    }
    isPointerDownRef.current = false;
    startTimer();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      aria-label={isRTL ? "العرض الرئيسي" : "Main Carousel"}
      className="relative w-full overflow-hidden rounded-3xl border border-sage-100 bg-gradient-to-br from-white to-slate-50 shadow-sm"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="relative h-[300px] md:h-[460px] overflow-hidden">
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              slideIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
            role="group"
            aria-roledescription="شريحة"
            aria-label={`${slide.title}`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="relative h-full flex flex-col items-start justify-end p-6 md:p-10 lg:p-14 text-gray-800">
              <motion.h2 
                initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl md:text-4xl font-bold tracking-tight mb-4" 
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                {slide.title}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-sm md:text-lg max-w-2xl leading-relaxed font-medium text-gray-700" 
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                {slide.description}
              </motion.p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute bottom-4 left-0 right-0 flex justify-center gap-3" 
        dir="ltr"
      >
        {slides.map((s, i) => (
          <motion.button
            key={s.id}
            onClick={() => setIndex(i)}
            aria-label={`اذهب إلى الشريحة ${i + 1}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={clsx(
              'h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500/40',
              i === index ? 'w-8 bg-blue-500 shadow-sm' : 'w-2.5 bg-blue-300/50 hover:bg-blue-400/70'
            )}
          />
        ))}
      </motion.div>

      {/* Progress indicator (optional) */}
      <div className="absolute top-0 inset-x-0 h-1 bg-blue-100">
        <div
          key={index}
          className="h-full bg-blue-500 animate-[grow_5.6s_linear_forwards] origin-left rounded-full"
          style={{ animationDuration: `${AUTO_INTERVAL}ms` }}
        />
      </div>
      <style>{`@keyframes grow { from { transform:scaleX(0); } to { transform:scaleX(1); } }`}</style>
    </motion.section>
  );
};

export default HeroCarousel;
