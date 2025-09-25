import React from 'react';
import { Calendar, Clock, User, Eye, ArrowRight, Tag } from 'lucide-react';

interface NewsCardProps {
  article: {
    id: number;
    title: string;
    summary: string;
    image: string;
    category: string;
    author: string;
    publishDate: string;
    readTime: string;
    views: number;
    tags: string[];
    featured?: boolean;
  };
  variant?: 'featured' | 'regular';
  onReadMore?: (id: number) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ 
  article, 
  variant = 'regular', 
  onReadMore 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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

  if (variant === 'featured') {
    return (
      <article className="modern-card overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            مميز
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(article.publishDate)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {article.views}
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
            {article.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {article.summary}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[hsla(var(--primary)/0.12)] text-primary rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{article.author}</span>
            </div>
            <button 
              onClick={() => onReadMore?.(article.id)}
              className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
            >
              اقرأ المزيد
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="modern-card overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
  <div className="absolute top-4 right-4 bg-[hsla(var(--card)/0.9)] text-muted-foreground px-3 py-1 rounded-full text-sm font-medium">
          {getCategoryName(article.category)}
        </div>
      </div>
      <div className="p-6">
  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(article.publishDate)}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {article.views}
          </div>
        </div>
        
  <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2">
          {article.title}
        </h3>
        
  <p className="text-muted-foreground mb-4 line-clamp-2">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{article.author}</span>
          </div>
          <button 
            onClick={() => onReadMore?.(article.id)}
            className="text-primary hover:text-primary/80 font-medium text-sm"
          >
            اقرأ المزيد
          </button>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
