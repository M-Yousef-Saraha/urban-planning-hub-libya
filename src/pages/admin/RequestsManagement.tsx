import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { adminAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  Filter,
  Download,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';

const RequestsManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('');
  const [adminNotes, setAdminNotes] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');

  // Check admin access
  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log('RequestsManagement component mounted');
    fetchRequests();
  }, [statusFilter, urgencyFilter]);

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const filters: any = { page: 1, limit: 50 };
      if (statusFilter) filters.status = statusFilter;
      if (urgencyFilter) filters.urgency = urgencyFilter;
      
      const response = await adminAPI.getAllRequests(filters);
      if (response?.success && response?.data) {
        setRequests(response.data.requests || []);
      } else {
        console.error('API response not successful:', response);
        setError('خطأ في استجابة الخادم');
        toast.error('خطأ في استجابة الخادم');
      }
    } catch (error: any) {
      console.error('fetchRequests error:', error);
      if (error?.response?.status === 401) {
        setError('يجب تسجيل الدخول كمدير للوصول إلى هذه الصفحة');
        toast.error('غير مصرح لك بالوصول إلى هذه الصفحة');
        navigate('/login');
        return;
      }
      setError('فشل في تحميل الطلبات');
      toast.error('فشل في تحميل الطلبات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveRequest = async () => {
    if (!selectedRequest) return;

    try {
      setIsApproving(true);
      const response = await adminAPI.approveRequest(
        selectedRequest.id, 
        adminNotes || undefined
      );

      if (response.success) {
        toast.success('تم قبول الطلب وإنشاء رابط التحميل');
        setDownloadLink(`${window.location.origin}/api/download/${response.data.downloadToken}`);
        setShowApproveDialog(false);
        setAdminNotes('');
        fetchRequests();
      }
    } catch (error) {
      toast.error('فشل في قبول الطلب');
    } finally {
      setIsApproving(false);
    }
  };

  const handleRejectRequest = async () => {
    if (!selectedRequest || !rejectReason.trim()) {
      toast.error('يجب إدخال سبب الرفض');
      return;
    }

    try {
      setIsRejecting(true);
      const response = await adminAPI.rejectRequest(
        selectedRequest.id, 
        rejectReason.trim()
      );

      if (response.success) {
        toast.success('تم رفض الطلب');
        setShowRejectDialog(false);
        setRejectReason('');
        fetchRequests();
      }
    } catch (error) {
      toast.error('فشل في رفض الطلب');
    } finally {
      setIsRejecting(false);
    }
  };

  const generateDownloadLink = async (requestId: string) => {
    try {
      const response = await adminAPI.generateDownloadLink(requestId);
      if (response.success) {
        setDownloadLink(`${window.location.origin}${response.data.downloadUrl}`);
        toast.success('تم إنشاء رابط التحميل');
      }
    } catch (error) {
      toast.error('فشل في إنشاء رابط التحميل');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { label: 'قيد المراجعة', variant: 'secondary' as const, icon: Clock },
      APPROVED: { label: 'موافق عليه', variant: 'default' as const, icon: CheckCircle },
      REJECTED: { label: 'مرفوض', variant: 'destructive' as const, icon: XCircle },
      COMPLETED: { label: 'مكتمل', variant: 'default' as const, icon: CheckCircle },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const getUrgencyBadge = (urgency: string) => {
    const urgencyConfig = {
      LOW: { label: 'منخفضة', className: 'bg-green-100 text-green-800' },
      MEDIUM: { label: 'متوسطة', className: 'bg-yellow-100 text-yellow-800' },
      HIGH: { label: 'عالية', className: 'bg-orange-100 text-orange-800' },
      URGENT: { label: 'عاجلة', className: 'bg-red-100 text-red-800' },
    };
    
    const config = urgencyConfig[urgency as keyof typeof urgencyConfig] || urgencyConfig.MEDIUM;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    );
  };

  // Add error boundary fallback
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" dir="rtl">
        <div className="max-w-md w-full bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4 text-red-600">خطأ في تحميل الطلبات</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => {
            setError(null);
            fetchRequests();
          }}>
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">إدارة الطلبات</h1>
        <p className="text-gray-600">مراجعة وإدارة طلبات الوثائق من المستخدمين</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            تصفية الطلبات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">الحالة</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع الحالات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الحالات</SelectItem>
                  <SelectItem value="PENDING">قيد المراجعة</SelectItem>
                  <SelectItem value="APPROVED">موافق عليه</SelectItem>
                  <SelectItem value="REJECTED">مرفوض</SelectItem>
                  <SelectItem value="COMPLETED">مكتمل</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الأولوية</label>
              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع الأولويات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الأولويات</SelectItem>
                  <SelectItem value="LOW">منخفضة</SelectItem>
                  <SelectItem value="MEDIUM">متوسطة</SelectItem>
                  <SelectItem value="HIGH">عالية</SelectItem>
                  <SelectItem value="URGENT">عاجلة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={fetchRequests} className="w-full">
                تحديث القائمة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>طلبات الوثائق</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="mr-3">جاري التحميل...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الوثيقة</TableHead>
                  <TableHead>المستخدم</TableHead>
                  <TableHead>الغرض</TableHead>
                  <TableHead>الأولوية</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.document?.title}</p>
                        <p className="text-sm text-gray-500">{request.document?.category}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.user?.name}</p>
                        <p className="text-sm text-gray-500">{request.user?.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm max-w-xs truncate">{request.purpose}</p>
                    </TableCell>
                    <TableCell>
                      {getUrgencyBadge(request.urgency)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(request.status)}
                    </TableCell>
                    <TableCell>
                      <span dir="ltr">{new Date(request.createdAt).toLocaleDateString('en-GB')}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {request.status === 'PENDING' && (
                          <>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => {
                                setSelectedRequest(request);
                                setAdminNotes('');
                                setShowApproveDialog(true);
                              }}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 ml-1" />
                              قبول
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => {
                                setSelectedRequest(request);
                                setRejectReason('');
                                setShowRejectDialog(true);
                              }}
                            >
                              <XCircle className="w-4 h-4 ml-1" />
                              رفض
                            </Button>
                          </>
                        )}
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowDetailsDialog(true);
                          }}
                        >
                          <Eye className="w-4 h-4 ml-1" />
                          تفاصيل
                        </Button>
                        
                        {request.status === 'APPROVED' && (
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => generateDownloadLink(request.id)}
                          >
                            <Download className="w-4 h-4 ml-1" />
                            رابط التحميل
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              قبول الطلب
            </DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-medium">{selectedRequest.document?.title}</p>
                <p className="text-sm text-gray-600">{selectedRequest.user?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ملاحظات إضافية (اختيارية):</label>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="أضف ملاحظات للمستخدم..."
                  rows={3}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowApproveDialog(false)}
                  disabled={isApproving}
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleApproveRequest}
                  disabled={isApproving}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isApproving ? 'جاري الموافقة...' : 'قبول الطلب'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="w-5 h-5" />
              رفض الطلب
            </DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="font-medium">{selectedRequest.document?.title}</p>
                <p className="text-sm text-gray-600">{selectedRequest.user?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">سبب الرفض <span className="text-red-500">*</span>:</label>
                <Textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="يرجى توضيح سبب رفض الطلب..."
                  rows={4}
                  className="border-red-200 focus:border-red-400"
                />
                <p className="text-xs text-gray-500 mt-1">الحد الأدنى 10 أحرف</p>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowRejectDialog(false)}
                  disabled={isRejecting}
                >
                  إلغاء
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleRejectRequest}
                  disabled={isRejecting || rejectReason.trim().length < 10}
                >
                  {isRejecting ? 'جاري الرفض...' : 'رفض الطلب'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle>تفاصيل الطلب</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium">الوثيقة:</label>
                  <p>{selectedRequest.document?.title}</p>
                </div>
                <div>
                  <label className="font-medium">المستخدم:</label>
                  <p>{selectedRequest.user?.name}</p>
                </div>
                <div>
                  <label className="font-medium">البريد:</label>
                  <p>{selectedRequest.user?.email}</p>
                </div>
                <div>
                  <label className="font-medium">الأولوية:</label>
                  <p>{getUrgencyBadge(selectedRequest.urgency)}</p>
                </div>
                <div>
                  <label className="font-medium">الحالة:</label>
                  <p>{getStatusBadge(selectedRequest.status)}</p>
                </div>
                <div>
                  <label className="font-medium">تاريخ الطلب:</label>
                  <p dir="ltr">{new Date(selectedRequest.createdAt).toLocaleDateString('en-GB')}</p>
                </div>
              </div>
              <div>
                <label className="font-medium">الغرض:</label>
                <p className="mt-1 p-2 bg-gray-50 rounded">{selectedRequest.purpose}</p>
              </div>
              {selectedRequest.notes && (
                <div>
                  <label className="font-medium">ملاحظات المستخدم:</label>
                  <p className="mt-1 p-2 bg-gray-50 rounded">{selectedRequest.notes}</p>
                </div>
              )}
              {selectedRequest.adminNotes && (
                <div>
                  <label className="font-medium">ملاحظات الإدارة:</label>
                  <p className="mt-1 p-2 bg-blue-50 rounded">{selectedRequest.adminNotes}</p>
                </div>
              )}
              {selectedRequest.processedAt && (
                <div>
                  <label className="font-medium">تاريخ المعالجة:</label>
                  <p dir="ltr">{new Date(selectedRequest.processedAt).toLocaleDateString('en-GB')}</p>
                </div>
              )}
              {downloadLink && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <label className="font-medium text-green-800">رابط التحميل (صالح لمدة ساعتين):</label>
                  <div className="flex items-center gap-2 mt-2">
                    <input 
                      type="text" 
                      value={downloadLink} 
                      readOnly 
                      className="flex-1 p-2 text-sm bg-white border rounded"
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(downloadLink);
                        toast.success('تم نسخ الرابط');
                      }}
                    >
                      نسخ
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RequestsManagement;