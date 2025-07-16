import React, { useState } from 'react';
import { Book, FileText, Download, Mail, Search, Filter, Calendar, User, Phone, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { emailService, DocumentRequestData } from '@/lib/emailService';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Document {
  id: string;
  title: string;
  category: string;
  description: string;
  type: string;
  size: string;
  dateAdded: string;
  downloadCount: number;
  tags: string[];
}

interface DocumentRequest {
  documentId: string;
  documentTitle: string;
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  purpose: string;
  urgency: 'low' | 'medium' | 'high';
  additionalNotes: string;
}

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [requestForm, setRequestForm] = useState<DocumentRequest>({
    documentId: '',
    documentTitle: '',
    requesterName: '',
    requesterEmail: '',
    requesterPhone: '',
    purpose: '',
    urgency: 'medium',
    additionalNotes: ''
  });
  const { toast } = useToast();

  const documents: Document[] = [
    {
      id: '1',
      title: 'دليل التخطيط العمراني المستدام',
      category: 'أدلة',
      description: 'دليل شامل للتخطيط العمراني المستدام والممارسات البيئية الصديقة',
      type: 'PDF',
      size: '2.5 MB',
      dateAdded: '2024-01-15',
      downloadCount: 245,
      tags: ['تخطيط', 'استدامة', 'بيئة']
    },
    {
      id: '2',
      title: 'قوانين البناء والتشييد',
      category: 'قوانين',
      description: 'مجموعة كاملة من قوانين البناء والتشييد المعمول بها في ليبيا',
      type: 'PDF',
      size: '1.8 MB',
      dateAdded: '2024-01-10',
      downloadCount: 189,
      tags: ['قوانين', 'بناء', 'تشييد']
    },
    {
      id: '3',
      title: 'معايير التصميم الحضري',
      category: 'معايير',
      description: 'معايير وإرشادات التصميم الحضري للمدن الليبية',
      type: 'PDF',
      size: '3.2 MB',
      dateAdded: '2024-01-08',
      downloadCount: 156,
      tags: ['تصميم', 'حضري', 'معايير']
    },
    {
      id: '4',
      title: 'تقرير حالة البيئة العمرانية 2024',
      category: 'تقارير',
      description: 'تقرير سنوي شامل عن حالة البيئة العمرانية في ليبيا',
      type: 'PDF',
      size: '4.1 MB',
      dateAdded: '2024-01-05',
      downloadCount: 98,
      tags: ['تقرير', 'بيئة', '2024']
    },
    {
      id: '5',
      title: 'خرائط المخططات العمرانية - طرابلس',
      category: 'خرائط',
      description: 'مجموعة خرائط تفصيلية للمخططات العمرانية لمدينة طرابلس',
      type: 'PDF',
      size: '8.7 MB',
      dateAdded: '2024-01-03',
      downloadCount: 312,
      tags: ['خرائط', 'طرابلس', 'مخططات']
    },
    {
      id: '6',
      title: 'دراسة الأثر البيئي للمشاريع العمرانية',
      category: 'دراسات',
      description: 'دراسة متخصصة حول تقييم الأثر البيئي للمشاريع العمرانية',
      type: 'PDF',
      size: '2.9 MB',
      dateAdded: '2024-01-01',
      downloadCount: 134,
      tags: ['دراسة', 'بيئة', 'تقييم']
    },
    {
      id: '7',
      title: 'دليل إدارة المشاريع العمرانية',
      category: 'أدلة',
      description: 'دليل متكامل لإدارة وتنفيذ المشاريع العمرانية بكفاءة عالية',
      type: 'PDF',
      size: '3.7 MB',
      dateAdded: '2023-12-28',
      downloadCount: 167,
      tags: ['إدارة', 'مشاريع', 'تنفيذ']
    },
    {
      id: '8',
      title: 'معايير الأمان في المباني',
      category: 'معايير',
      description: 'معايير السلامة والأمان الواجب توفرها في المباني السكنية والتجارية',
      type: 'PDF',
      size: '2.1 MB',
      dateAdded: '2023-12-25',
      downloadCount: 203,
      tags: ['أمان', 'سلامة', 'مباني']
    },
    {
      id: '9',
      title: 'خرائط المخططات العمرانية - بنغازي',
      category: 'خرائط',
      description: 'مجموعة خرائط تفصيلية للمخططات العمرانية لمدينة بنغازي',
      type: 'PDF',
      size: '7.3 MB',
      dateAdded: '2023-12-20',
      downloadCount: 278,
      tags: ['خرائط', 'بنغازي', 'مخططات']
    },
    {
      id: '10',
      title: 'تقرير التنمية المستدامة 2023',
      category: 'تقارير',
      description: 'تقرير شامل عن مشاريع التنمية المستدامة المنفذة خلال عام 2023',
      type: 'PDF',
      size: '5.2 MB',
      dateAdded: '2023-12-15',
      downloadCount: 145,
      tags: ['تنمية', 'مستدامة', '2023']
    }
  ];

  const categories = ['all', 'أدلة', 'قوانين', 'معايير', 'تقارير', 'خرائط', 'دراسات'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRequestDocument = (document: Document) => {
    setSelectedDocument(document);
    setRequestForm({
      ...requestForm,
      documentId: document.id,
      documentTitle: document.title
    });
    setShowRequestForm(true);
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Send document request
      const success = await emailService.sendDocumentRequest(requestForm as DocumentRequestData);
      
      if (success) {
        toast({
          title: "تم إرسال الطلب بنجاح",
          description: `سيتم إرسال الوثيقة "${requestForm.documentTitle}" إلى بريدك الإلكتروني خلال 24 ساعة.`,
        });

        // Reset form and close modal
        setRequestForm({
          documentId: '',
          documentTitle: '',
          requesterName: '',
          requesterEmail: '',
          requesterPhone: '',
          purpose: '',
          urgency: 'medium',
          additionalNotes: ''
        });
        setShowRequestForm(false);
        setSelectedDocument(null);
      } else {
        throw new Error('Failed to send request');
      }
    } catch (error) {
      toast({
        title: "خطأ في إرسال الطلب",
        description: "حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: keyof DocumentRequest, value: string) => {
    setRequestForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white" dir="rtl">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-white/15 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <Book className="w-5 h-5 text-green-100" />
            <span className="text-green-50 font-medium">المكتبة الرقمية</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            مكتبة الوثائق والمراجع
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-green-50 leading-relaxed max-w-3xl mx-auto">
            اطلب الوثائق والمراجع التخصصية واحصل عليها مباشرة في بريدك الإلكتروني
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="glass-effect rounded-2xl p-6">
              <div className="text-3xl font-bold text-white mb-2">{documents.length}</div>
              <div className="text-green-100 text-sm">وثيقة متاحة</div>
            </div>
            <div className="glass-effect rounded-2xl p-6">
              <div className="text-3xl font-bold text-white mb-2">
                {documents.reduce((sum, doc) => sum + doc.downloadCount, 0)}
              </div>
              <div className="text-green-100 text-sm">طلب مكتمل</div>
            </div>
            <div className="glass-effect rounded-2xl p-6">
              <div className="text-3xl font-bold text-white mb-2">{categories.length - 1}</div>
              <div className="text-green-100 text-sm">فئة متخصصة</div>
            </div>
            <div className="glass-effect rounded-2xl p-6">
              <div className="text-3xl font-bold text-white mb-2">24</div>
              <div className="text-green-100 text-sm">ساعة متوسط الاستجابة</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Library Section */}
      <section className="py-20" dir="rtl">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="mb-12 bg-white rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث في الوثائق..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-12 pl-4 py-4 border-2 border-green-100 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                />
              </div>
              <div className="relative">
                <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pr-12 pl-4 py-4 border-2 border-green-100 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 appearance-none bg-white"
                >
                  <option value="all">جميع الفئات</option>
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600 text-lg">
              عرض <span className="font-bold text-green-600">{filteredDocuments.length}</span> من أصل <span className="font-bold">{documents.length}</span> وثيقة
            </p>
          </div>

          {/* Documents Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredDocuments.map((document, index) => (
              <div 
                key={document.id}
                className="modern-card p-6 hover-lift group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      {document.category}
                    </span>
                  </div>
                </div>

                <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors">
                  {document.title}
                </h4>

                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {document.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {document.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(document.dateAdded).toLocaleDateString('ar-SA')}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Download className="w-4 h-4" />
                    <span>{document.downloadCount}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">{document.type}</span> • <span>{document.size}</span>
                  </div>
                  <button
                    onClick={() => handleRequestDocument(document)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-all duration-300 flex items-center space-x-2 space-x-reverse group-hover:scale-105"
                  >
                    <Mail className="w-4 h-4" />
                    <span>طلب الوثيقة</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredDocuments.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">لم يتم العثور على نتائج</h3>
              <p className="text-gray-600 mb-8">جرب تغيير كلمات البحث أو الفئة المحددة</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-300"
              >
                إعادة تعيين البحث
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-2xl font-bold text-gray-800">طلب وثيقة</h4>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {selectedDocument && (
                <div className="bg-green-50 p-4 rounded-xl mb-6">
                  <h5 className="font-bold text-green-800 mb-2">الوثيقة المطلوبة:</h5>
                  <p className="text-green-700">{selectedDocument.title}</p>
                </div>
              )}

              <form onSubmit={handleSubmitRequest} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline ml-2" />
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      required
                      value={requestForm.requesterName}
                      onChange={(e) => handleInputChange('requesterName', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline ml-2" />
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      required
                      value={requestForm.requesterEmail}
                      onChange={(e) => handleInputChange('requesterEmail', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline ml-2" />
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      value={requestForm.requesterPhone}
                      onChange={(e) => handleInputChange('requesterPhone', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      placeholder="أدخل رقم هاتفك"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      درجة الأولوية
                    </label>
                    <select
                      value={requestForm.urgency}
                      onChange={(e) => handleInputChange('urgency', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    >
                      <option value="low">منخفضة</option>
                      <option value="medium">متوسطة</option>
                      <option value="high">عالية</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    الغرض من الطلب *
                  </label>
                  <input
                    type="text"
                    required
                    value={requestForm.purpose}
                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="مثال: بحث أكاديمي، مشروع تخرج، استشارة مهنية"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline ml-2" />
                    ملاحظات إضافية
                  </label>
                  <textarea
                    value={requestForm.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 resize-none"
                    placeholder="أي معلومات إضافية تود إضافتها..."
                  />
                </div>

                <div className="flex space-x-4 space-x-reverse">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-green-700 transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    <Mail className="w-5 h-5" />
                    <span>إرسال الطلب</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Library;