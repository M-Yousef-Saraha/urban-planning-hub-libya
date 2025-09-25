import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { documentsAPI, Document, API_BASE_URL } from '@/lib/api';
import { normalizeDocuments, normalizeCategories } from '@/lib/normalize';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContainer from '@/components/layout/PageContainer';
import { Download } from 'lucide-react';

type CategoryOption = {
  value: string;
  label: string;
  displayLabel: string;
};

const categoryDisplayMap: Record<string, string> = {
  GUIDES: 'أدلة',
  LAWS: 'قوانين',
  STANDARDS: 'معايير',
  REPORTS: 'تقارير',
  MAPS: 'خرائط',
  STUDIES: 'دراسات',
};

const resolveCategoryName = (identifier: string) => {
  return categoryDisplayMap[identifier] || identifier;
};

const buildCategoryOptions = (rawCategories: any[]): CategoryOption[] => {
  if (!Array.isArray(rawCategories)) return [];

  const options: CategoryOption[] = [];

  const visit = (item: any, depth = 0) => {
    if (!item) return;

    if (typeof item === 'string') {
      const label = resolveCategoryName(item);
      options.push({
        value: item,
        label,
        displayLabel: `${depth > 0 ? `${'— '.repeat(depth)}${label}` : label}`,
      });
      return;
    }

    const valueCandidate =
      item.id ?? item.value ?? item.slug ?? item.code ?? item.name ?? item.label;

    if (!valueCandidate) return;

    const baseLabel =
      item.nameAr ?? item.label ?? item.name ?? resolveCategoryName(String(valueCandidate));
    const documentsCount = item._count?.documents ?? item.documentsCount ?? item.count;
    const prefix = depth > 0 ? `${'— '.repeat(depth)}` : '';
    const displayLabel = `${prefix}${baseLabel}${
      typeof documentsCount === 'number' && documentsCount > 0 ? ` (${documentsCount})` : ''
    }`;

    const value = String(valueCandidate);
    options.push({ value, label: baseLabel, displayLabel });

    if (Array.isArray(item.children)) {
      item.children.forEach((child: any) => visit(child, depth + 1));
    }
  };

  rawCategories.forEach((item) => visit(item));

  return options;
};

const Library = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [error, setError] = useState('');

  const fetchDocuments = useCallback(
    async (filters?: { category?: string; search?: string }) => {
      try {
        setIsLoading(true);
        setError('');
        const response = await documentsAPI.getAll({
          category: filters?.category,
          search: filters?.search,
        });
        const docs = normalizeDocuments(response);
        setDocuments(docs);
        if (docs.length === 0) {
          setError('لا توجد وثائق');
        }
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError('خطأ في الاتصال بالخادم');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const fetchCategories = useCallback(async () => {
    try {
      const response = await documentsAPI.getCategories();
      const normalized = normalizeCategories(response);
      setCategoryOptions(buildCategoryOptions(normalized));
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
    fetchCategories();
  }, [fetchDocuments, fetchCategories]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      fetchDocuments({
        category: selectedCategory || undefined,
        search: searchTerm || undefined,
      });
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, selectedCategory, fetchDocuments]);

  const selectedCategoryOption = useMemo(
    () => categoryOptions.find((option) => option.value === selectedCategory),
    [categoryOptions, selectedCategory]
  );

  const getCategoryLabel = (category: string) => {
    return resolveCategoryName(category);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className="min-h-screen bg-muted/30" dir="rtl">
      <Header />

      <div className="header-safe-padding py-12 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <PageContainer className="text-center" withHeaderSpacing={false}>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">مكتبة الوثائق</h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            تصفح الوثائق والمستندات الرسمية من الهيئة الوطنية للتخطيط العمراني
          </p>
        </PageContainer>
      </div>

      <PageContainer withHeaderSpacing={false}>
        <div className="bg-card rounded-xl shadow-sm p-6 mb-8 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">فلترة وتصنيف الوثائق</h2>
              <p className="text-sm text-muted-foreground">استخدم الفلاتر للعثور على الوثائق المطلوبة بسهولة</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                البحث في الوثائق
              </label>
              <input
                type="text"
                placeholder="ابحث بالعنوان، الوصف، أو الكلمات المفتاحية..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg bg-background text-right shadow-sm transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                </svg>
                التصنيف
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg bg-background text-right shadow-sm transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary"
              >
                <option value="">جميع التصنيفات</option>
                {categoryOptions.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.displayLabel}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-muted-foreground mb-2 opacity-0">إجراءات</label>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                className="w-full px-4 py-3 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                مسح الفلاتر
              </button>
            </div>
          </div>

          {(searchTerm || selectedCategory) && (
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-foreground">الفلاتر المطبقة:</span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    "{searchTerm}"
                    <button onClick={() => setSearchTerm('')} className="text-success hover:text-success/80">
                      ×
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-muted text-foreground rounded-full text-sm">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    {selectedCategoryOption?.label || getCategoryLabel(selectedCategory)}
                    <button onClick={() => setSelectedCategory('')} className="text-muted-foreground hover:text-foreground">
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="mt-4 pt-4 flex justify-between items-center text-sm border-t border-border">
            <span className="text-muted-foreground">
              {documents.length} وثيقة {searchTerm || selectedCategory ? 'مطابقة للفلاتر' : 'متاحة'}
            </span>
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              نظام التصنيف الهرمي نشط
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-destructive rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-destructive rounded-full" />
            </div>
            <span>{error}</span>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">جاري تحميل الوثائق...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-foreground mb-2">لا توجد وثائق</h3>
            <p className="text-muted-foreground">لم يتم العثور على وثائق تطابق معايير البحث</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((document) => (
              <div
                key={document.id}
                className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 border border-border"
              >
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2 leading-normal text-foreground">{document.title}</h3>
                      <span className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">
                        {getCategoryLabel(document.category)}
                      </span>
                    </div>
                  </div>

                  {document.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{document.description}</p>
                  )}

                  <div className="space-y-2 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-muted flex items-center justify-center">
                        <span className="text-[10px] font-medium">📅</span>
                      </div>
                      تاريخ الإنشاء: {new Date(document.createdAt).toLocaleDateString('ar-SA')}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-muted flex items-center justify-center">
                        <span className="text-[10px] font-medium">📊</span>
                      </div>
                      حجم الملف: {formatFileSize(document.fileSize)}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <a
                    href={`${API_BASE_URL}/api/files/${document.fileName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Download className="w-4 h-4" />
                    تحميل الوثيقة
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </PageContainer>

      <Footer />
    </div>
  );
};

export default Library;

