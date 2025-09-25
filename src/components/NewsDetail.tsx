import React from 'react';
import { Calendar, Clock, User, Eye, ArrowLeft, Share2, Bookmark, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsDetailProps {
  article: {
    id: number;
    title: string;
    content: string;
    image: string;
    category: string;
    author: string;
    publishDate: string;
    readTime: string;
    views: number;
    tags: string[];
    featured?: boolean;
  };
  onBack?: () => void;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ article, onBack }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const getCategoryName = (categoryId: string) => {
    const categories: { [key: string]: string } = {
      'announcements': 'الإعلانات الرسمية',
      'projects': 'المشاريع العمرانية',
      'regulations': 'القوانين واللوائح',
      'events': 'الفعاليات',
      'awards': 'الجوائز والإنجازات'
    };
    return categories[categoryId] || categoryId;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.content.substring(0, 200),
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            العودة للأخبار
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
      {/* Article Header */}
      <div className="modern-card overflow-hidden mb-8">
            <div className="relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-96 object-cover"
              />
              {article.featured && (
                <div className="absolute top-6 right-6 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                  مقال مميز
                </div>
              )}
            </div>
            
            <div className="p-8">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.publishDate)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {article.views} مشاهدة
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {article.author}
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  {getCategoryName(article.category)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  مشاركة
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Bookmark className="w-4 h-4" />
                  حفظ
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    <Tag className="w-3 h-3 inline ml-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="modern-card p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed text-lg">
                {article.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="modern-card p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">مقالات ذات صلة</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* This would be populated with related articles */}
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">مقال ذو صلة 1</h4>
                <p className="text-gray-600 text-sm">وصف مختصر للمقال ذو الصلة...</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">مقال ذو صلة 2</h4>
                <p className="text-gray-600 text-sm">وصف مختصر للمقال ذو الصلة...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
