import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import PageContainer from '@/components/layout/PageContainer';

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t } = useTranslation('pages');
  const { isRTL } = useLanguage();

  const categories = [
    { id: 'all', name: t('news.categories.all'), count: 0 },
    { id: 'announcements', name: t('news.categories.announcements'), count: 0 },
    { id: 'projects', name: t('news.categories.projects'), count: 0 },
    { id: 'regulations', name: t('news.categories.regulations'), count: 0 },
    { id: 'events', name: t('news.categories.events'), count: 0 },
    { id: 'awards', name: t('news.categories.awards'), count: 0 }
  ];

  const newsArticles: any[] = [];

  const filteredNews = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedNews = [...filteredNews].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      case 'oldest':
        return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
      case 'popular':
        return b.views - a.views;
      default:
        return 0;
    }
  });

  const featuredNews = sortedNews.filter(article => article.featured);
  const regularNews = sortedNews.filter(article => !article.featured);

  const handleReadMore = (articleId: number) => {
    // Navigate to article detail page or open modal
    console.log('Reading article:', articleId);
    // You can implement navigation to detail page here
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-16 border-b border-gray-100">
        <PageContainer className="max-w-4xl text-center">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-primary/10 rounded-full px-6 py-2 mb-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary font-semibold" dir={isRTL ? 'rtl' : 'ltr'}>{t('news.subtitle')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6" dir={isRTL ? 'rtl' : 'ltr'}>{t('news.title')}</h1>
          <p className="text-xl text-gray-600 mb-8" dir={isRTL ? 'rtl' : 'ltr'}>
            {t('news.description')}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('news.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-12 py-4 border-2 border-gray-200 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Filters and Categories */}
      <section className="py-8 bg-white border-b border-gray-200">
        <PageContainer>
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  <span className="mr-2 text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>

            {/* Sort and Filter */}
            <div className="flex gap-4">
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  ترتيب
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isFilterOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                      <button
                        onClick={() => { setSortBy('latest'); setIsFilterOpen(false); }}
                        className={`w-full text-right px-3 py-2 rounded hover:bg-gray-50 ${
                          sortBy === 'latest' ? 'bg-primary/10 text-primary' : ''
                        }`}
                      >
                        الأحدث أولاً
                      </button>
                      <button
                        onClick={() => { setSortBy('oldest'); setIsFilterOpen(false); }}
                        className={`w-full text-right px-3 py-2 rounded hover:bg-gray-50 ${
                          sortBy === 'oldest' ? 'bg-primary/10 text-primary' : ''
                        }`}
                      >
                        الأقدم أولاً
                      </button>
                      <button
                        onClick={() => { setSortBy('popular'); setIsFilterOpen(false); }}
                        className={`w-full text-right px-3 py-2 rounded hover:bg-gray-50 ${
                          sortBy === 'popular' ? 'bg-primary/10 text-primary' : ''
                        }`}
                      >
                        الأكثر قراءة
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* News Content */}
      {filteredNews.length > 0 ? (
        <>
          {/* Featured News */}
          {featuredNews.length > 0 && (
            <section className="py-12 md:py-16 bg-white">
              <PageContainer>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">الأخبار المميزة</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredNews.map((article) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      variant="featured"
                      onReadMore={handleReadMore}
                    />
                  ))}
                </div>
              </PageContainer>
            </section>
          )}

          {/* Regular News */}
          <section className="py-12 md:py-16 bg-gray-50">
            <PageContainer>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">جميع الأخبار</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularNews.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    variant="regular"
                    onReadMore={handleReadMore}
                  />
                ))}
              </div>
            </PageContainer>
          </section>
        </>
      ) : (
        /* Empty State */
        <section className="py-12 md:py-16 bg-white">
          <PageContainer className="max-w-2xl text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">لا توجد أخبار متاحة حالياً</h2>
            <p className="text-lg text-gray-600 mb-8">
              لم يتم نشر أي أخبار بعد. تابعونا للحصول على آخر المستجدات والأخبار من الهيئة الوطنية للتخطيط العمراني.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                مسح البحث
              </button>
              <button 
                onClick={() => setSelectedCategory('all')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                عرض جميع الفئات
              </button>
            </div>
          </PageContainer>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default News;
