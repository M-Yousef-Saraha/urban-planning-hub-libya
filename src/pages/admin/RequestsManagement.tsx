import React, { useEffect, useState } from 'react';
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
  Filter
} from 'lucide-react';
import { toast } from 'sonner';

const RequestsManagement = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('');
  const [adminNotes, setAdminNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, [statusFilter, urgencyFilter]);

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const filters: any = { page: 1, limit: 50 };
      if (statusFilter) filters.status = statusFilter;
      if (urgencyFilter) filters.urgency = urgencyFilter;
      
      const response = await adminAPI.getAllRequests(filters);
      if (response.success) {
        setRequests(response.data.requests || []);
      }
    } catch (error) {
      toast.error('فشل في تحميل الطلبات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedRequest || !newStatus) return;

    try {
      setIsUpdating(true);
      const response = await adminAPI.updateRequestStatus(
        selectedRequest.id, 
        newStatus, 
        adminNotes || undefined
      );

      if (response.success) {
        toast.success('تم تحديث حالة الطلب بنجاح');
        setSelectedRequest(null);
        setAdminNotes('');
        setNewStatus('');
        fetchRequests();
      }
    } catch (error) {
      toast.error('فشل في تحديث حالة الطلب');
    } finally {
      setIsUpdating(false);
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedRequest(request);
                              setNewStatus(request.status);
                              setAdminNotes(request.adminNotes || '');
                            }}
                          >
                            <Eye className="w-4 h-4 ml-1" />
                            مراجعة
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl" dir="rtl">
                          <DialogHeader>
                            <DialogTitle>مراجعة الطلب</DialogTitle>
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
                              <div>
                                <label className="font-medium">تحديث الحالة:</label>
                                <Select value={newStatus} onValueChange={setNewStatus}>
                                  <SelectTrigger className="mt-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="PENDING">قيد المراجعة</SelectItem>
                                    <SelectItem value="APPROVED">موافق عليه</SelectItem>
                                    <SelectItem value="REJECTED">مرفوض</SelectItem>
                                    <SelectItem value="COMPLETED">مكتمل</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="font-medium">ملاحظات الإدارة:</label>
                                <Textarea
                                  value={adminNotes}
                                  onChange={(e) => setAdminNotes(e.target.value)}
                                  placeholder="أضف ملاحظات للمستخدم..."
                                  className="mt-1"
                                  rows={3}
                                />
                              </div>
                              <div className="flex gap-2 justify-end">
                                <Button
                                  onClick={handleStatusUpdate}
                                  disabled={isUpdating}
                                >
                                  {isUpdating ? 'جاري الحفظ...' : 'حفظ التحديثات'}
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestsManagement;