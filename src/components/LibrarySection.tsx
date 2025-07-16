import React, { useState } from 'react';
import { Book, FileText, Download, Mail, Search, Filter, Calendar, User, Phone, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { emailService, DocumentRequestData } from '@/lib/emailService';

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

const LibrarySection = () => {
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
    <section id="library" className="py-20 bg-gradient-to-b from-white to-green-50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-green-100 rounded-full px-6 py-2 mb-6">
            <Book className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">المكتبة الرقمية</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">مكتبة الوثائق والمراجع</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            اطلب الوثائق والمراجع التخصصية واحصل عليها مباشرة في بريدك الإلكتروني
          </p>
        </div>

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

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">{documents.length}</div>
            <div className="text-gray-600">وثيقة متاحة</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {documents.reduce((sum, doc) => sum + doc.downloadCount, 0)}
            </div>
            <div className="text-gray-600">طلب مكتمل</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">{categories.length - 1}</div>
            <div className="text-gray-600">فئة متخصصة</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">24</div>
            <div className="text-gray-600">ساعة متوسط الاستجابة</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LibrarySection;