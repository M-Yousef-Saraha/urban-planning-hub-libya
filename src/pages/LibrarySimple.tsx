import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { documentsAPI, Document } from '@/lib/api';
import { normalizeDocuments, normalizeCategories } from '@/lib/normalize';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContainer from '@/components/layout/PageContainer';
import DocumentRequestModal from '@/components/DocumentRequestModal';
import DocumentDetailModal from '@/components/DocumentDetailModal';
import { DocumentSkeletonGrid } from '@/components/DocumentSkeleton';
import { toast } from 'sonner';
import { Eye, Download } from 'lucide-react';

const LibrarySimple = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    fetchDocuments();
    fetchCategories();
  }, []);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await documentsAPI.getAll({
        category: selectedCategory || undefined,
        search: searchTerm || undefined
      });
  const docs = normalizeDocuments(response);
  setDocuments(docs);
  if (docs.length === 0) setError('لا توجد وثائق');
    } catch (error: any) {
      console.error('Error fetching documents:', error);
      setError('خطأ في الاتصال بالخادم');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await documentsAPI.getCategories();
  setCategories(normalizeCategories(response));
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      fetchDocuments();
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, selectedCategory]);

  const handleRequestDocument = (document: Document) => {
    if (!isAuthenticated) {
      toast.error('تسجيل الدخول مطلوب', {
        description: 'يجب تسجيل الدخول أولاً لطلب الوثائق',
        action: {
          label: 'تسجيل الدخول',
          onClick: () => navigate('/login'),
        },
      });
      return;
    }
    
    setSelectedDocument(document);
    setIsRequestModalOpen(true);
  };

  const handleRequestSuccess = () => {
    // Optionally refresh documents or update UI
    setSelectedDocument(null);
  };

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsDetailModalOpen(true);
  };

  const getCategoryLabel = (category: string) => {
    const categoryLabels: Record<string, string> = {
      'GUIDES': 'أدلة',
      'LAWS': 'قوانين',
      'STANDARDS': 'معايير',
      'REPORTS': 'تقارير',
      'MAPS': 'خرائط',
      'STUDIES': 'دراسات'
    };
    return categoryLabels[category] || category;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white header-safe-padding py-16">
        <PageContainer className="text-center" withHeaderSpacing={false}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">مكتبة الوثائق</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            تصفح واطلب الوثائق والمستندات الرسمية من الهيئة الوطنية للتخطيط العمراني
          </p>
        </PageContainer>
      </div>

      {/* Search and Filter Section */}
      <PageContainer>
        {/* Enhanced Hierarchical Filters */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 mb-8 border border-blue-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">فلترة وتصنيف الوثائق</h2>
              <p className="text-sm text-gray-600">استخدم الفلاتر للعثور على الوثائق المطلوبة بسهولة</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Enhanced Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right bg-white shadow-sm transition-all hover:shadow-md"
              />
            </div>

            {/* Hierarchical Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                </svg>
                التصنيف
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right bg-white shadow-sm transition-all hover:shadow-md"
              >
                <option value="">جميع التصنيفات</option>
                {categories.map((category) => (
                  <optgroup key={category.id || category.value} label={category.nameAr || category.label}>
                    <option value={category.id || category.value}>
                      {category.nameAr || category.label} ({category._count?.documents || 0})
                    </option>
                    {category.children?.map((subCategory: any) => (
                      <option key={subCategory.id} value={subCategory.id} className="pr-4">
                        ↳ {subCategory.nameAr || subCategory.name} ({subCategory._count?.documents || 0})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2 opacity-0">إجراءات</label>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                مسح الفلاتر
              </button>
            </div>
          </div>

          {/* Selected Filters Display */}
          {(searchTerm || selectedCategory) && (
            <div className="mt-6 pt-4 border-t border-blue-200">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-gray-700">الفلاتر المطبقة:</span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    {getCategoryLabel(selectedCategory)}
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-blue-200 flex justify-between items-center text-sm">
            <span className="text-gray-600">
              {documents.length} وثيقة {searchTerm || selectedCategory ? 'مطابقة للفلاتر' : 'متاحة'}
            </span>
            <div className="flex items-center gap-2 text-blue-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              نظام التصنيف الهرمي نشط
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-red-600 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </div>
            <span>{error}</span>
          </div>
        )}

        {/* Documents Grid */}
        {isLoading ? (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">جاري تحميل الوثائق...</p>
            </div>
            <DocumentSkeletonGrid count={6} />
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-800 mb-2">لا توجد وثائق</h3>
            <p className="text-gray-600">لم يتم العثور على وثائق تطابق معايير البحث</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((document) => (
              <div key={document.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 border border-gray-100">
                {/* Document Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2 leading-normal text-gray-900">
                        {document.title}
                      </h3>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                        {getCategoryLabel(document.category)}
                      </span>
                    </div>
                  </div>
                  
                  {document.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {document.description}
                    </p>
                  )}
                  
                  {/* Document Metadata */}
                  <div className="space-y-2 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-gray-200 flex items-center justify-center">
                        <span className="text-[10px] font-medium">📅</span>
                      </div>
                      تاريخ الإنشاء: {new Date(document.createdAt).toLocaleDateString('ar-SA')}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-gray-200 flex items-center justify-center">
                        <span className="text-[10px] font-medium">📊</span>
                      </div>
                      حجم الملف: {formatFileSize(document.fileSize)}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 pb-6">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRequestDocument(document)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                      <Download className="w-4 h-4" />
                      طلب الوثيقة
                    </button>
                    <button
                      onClick={() => handleViewDocument(document)}
                      className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
                      title="عرض التفاصيل"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </PageContainer>

      {/* Document Request Modal */}
      <DocumentRequestModal
        document={selectedDocument}
        isOpen={isRequestModalOpen}
        onClose={() => {
          setIsRequestModalOpen(false);
          setSelectedDocument(null);
        }}
        onSuccess={handleRequestSuccess}
      />

      {/* Document Detail Modal */}
      <DocumentDetailModal
        document={selectedDocument}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedDocument(null);
        }}
        onRequestDocument={(doc) => {
          setIsDetailModalOpen(false);
          handleRequestDocument(doc);
        }}
      />

      <Footer />
    </div>
  );
};

export default LibrarySimple;

