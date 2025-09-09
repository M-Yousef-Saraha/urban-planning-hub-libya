import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  FileText, 
  Download, 
  Calendar,
  Building,
  Filter,
  User,
  Send,
  AlertCircle
} from 'lucide-react';
import { documentsAPI, requestsAPI, Document, API_BASE_URL } from '@/lib/api';
import { normalizeDocuments, normalizeCategories } from '@/lib/normalize';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Library = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({
    purpose: '',
    urgency: 'MEDIUM' as 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT',
    notes: ''
  });
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

  useEffect(() => {
    fetchDocuments();
    fetchCategories();
  }, []);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const response = await documentsAPI.getAll({
        category: selectedCategory || undefined,
        search: searchTerm || undefined
      });
  setDocuments(normalizeDocuments(response));
    } catch (error) {
      toast.error('فشل في تحميل الوثائق');
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
      toast.error('يجب تسجيل الدخول أولاً لطلب الوثائق');
      navigate('/login');
      return;
    }
    
    setSelectedDocument(document);
    setIsRequestDialogOpen(true);
  };

  const handleSubmitRequest = async () => {
    if (!selectedDocument || !requestForm.purpose.trim()) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      setIsSubmittingRequest(true);
      const response = await requestsAPI.create({
        documentId: selectedDocument.id,
        purpose: requestForm.purpose,
        urgency: requestForm.urgency,
        notes: requestForm.notes || undefined
      });

      if (response.success) {
        toast.success('تم إرسال طلب الوثيقة بنجاح');
        setIsRequestDialogOpen(false);
        setRequestForm({ purpose: '', urgency: 'MEDIUM', notes: '' });
        setSelectedDocument(null);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'فشل في إرسال الطلب';
      toast.error(errorMessage);
    } finally {
      setIsSubmittingRequest(false);
    }
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

  const getUrgencyLabel = (urgency: string) => {
    const urgencyLabels: Record<string, string> = {
      'LOW': 'منخفضة',
      'MEDIUM': 'متوسطة',
      'HIGH': 'عالية',
      'URGENT': 'عاجلة'
    };
    return urgencyLabels[urgency] || urgency;
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">مكتبة الوثائق</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            تصفح واطلب الوثائق والمستندات الرسمية من الهيئة الوطنية للتخطيط العمراني
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في الوثائق..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع الفئات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الفئات</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {getCategoryLabel(category)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                مسح الفلاتر
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documents Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">جاري تحميل الوثائق...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">لا توجد وثائق</h3>
            <p className="text-gray-600">لم يتم العثور على وثائق تطابق معايير البحث</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((document) => (
              <Card key={document.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-3 leading-normal">
                        {document.title}
                      </CardTitle>
                      <Badge variant="secondary" className="mb-2">
                        {getCategoryLabel(document.category)}
                      </Badge>
                    </div>
                    <FileText className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  {document.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {document.description}
                    </p>
                  )}
                  
                  <div className="space-y-2 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span dir="ltr">{new Date(document.createdAt).toLocaleDateString('en-GB')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="w-3 h-3" />
                      <span dir="ltr">{formatFileSize(document.fileSize)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleRequestDocument(document)}
                      className="flex-1"
                    >
                      <Send className="w-3 h-3 ml-1" />
                      طلب الوثيقة
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`${API_BASE_URL}/api/files/${document.fileName}`, '_blank')}
                    >
                      <Download className="w-3 h-3 ml-1" />
                      تنزيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Request Dialog */}
        <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
          <DialogContent className="sm:max-w-md" dir="rtl">
            <DialogHeader>
              <DialogTitle>طلب وثيقة</DialogTitle>
              <DialogDescription>
                {selectedDocument?.title}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {!isAuthenticated && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-800 font-medium">
                      يجب تسجيل الدخول أولاً
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                      يرجى تسجيل الدخول أو إنشاء حساب جديد لطلب الوثائق
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="purpose">الغرض من الطلب *</Label>
                <Textarea
                  id="purpose"
                  placeholder="اشرح سبب حاجتك لهذه الوثيقة..."
                  value={requestForm.purpose}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, purpose: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">مستوى الأولوية</Label>
                <Select
                  value={requestForm.urgency}
                  onValueChange={(value: any) => setRequestForm(prev => ({ ...prev, urgency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">منخفضة</SelectItem>
                    <SelectItem value="MEDIUM">متوسطة</SelectItem>
                    <SelectItem value="HIGH">عالية</SelectItem>
                    <SelectItem value="URGENT">عاجلة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات إضافية</Label>
                <Textarea
                  id="notes"
                  placeholder="أي معلومات إضافية..."
                  value={requestForm.notes}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, notes: e.target.value }))}
                  rows={2}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleSubmitRequest}
                  disabled={!isAuthenticated || isSubmittingRequest || !requestForm.purpose.trim()}
                  className="flex-1"
                >
                  {isSubmittingRequest ? 'جاري الإرسال...' : 'إرسال الطلب'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsRequestDialogOpen(false)}
                  disabled={isSubmittingRequest}
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Footer />
    </div>
  );
};

export default Library;

