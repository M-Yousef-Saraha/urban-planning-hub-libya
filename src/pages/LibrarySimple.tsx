import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { documentsAPI, Document } from '@/lib/api';
import { normalizeDocuments, normalizeCategories } from '@/lib/normalize';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContainer from '@/components/layout/PageContainer';
import DocumentRequestModal from '@/components/DocumentRequestModal';
import { toast } from 'sonner';
import { Eye, Download } from 'lucide-react';

const LibrarySimple = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

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
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="البحث في الوثائق..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">جميع الفئات</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {getCategoryLabel(category)}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                مسح الفلاتر
              </button>
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
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">جاري تحميل الوثائق...</p>
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
                      onClick={() => setSelectedDocument(document)}
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

      <Footer />
    </div>
  );
};

export default LibrarySimple;

