import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  User,
  LogOut,
  Download,
  Calendar
} from 'lucide-react';
import { requestsAPI, DocumentRequest, API_BASE_URL } from '@/lib/api';
import { api } from '@/lib/api';
import { CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<DocumentRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adminStats, setAdminStats] = useState<any | null>(null);
  const [recentDownloads, setRecentDownloads] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    fetchUserRequests();
    // If admin, fetch admin overview (stats + recent downloads)
    const fetchAdminOverview = async () => {
      if (user?.role !== 'ADMIN') return;
      try {
        const statsRes = await api.get('/api/admin/stats/requests');
        const docStatsRes = await api.get('/api/admin/stats/documents');
        const downloadsRes = await api.get('/api/admin/downloads?limit=5');
        setAdminStats({ ...statsRes.data.data, ...docStatsRes.data.data });
        setRecentDownloads(downloadsRes.data.data.downloads || []);
      } catch (err) {
        console.error('Failed to fetch admin overview', err);
      }
    };
    fetchAdminOverview();
  }, [isAuthenticated, navigate]);

  const fetchUserRequests = async () => {
    try {
      setIsLoading(true);
      const response = await requestsAPI.getUserRequests();
      if (response.success) {
        setRequests(response.data.requests);
      }
    } catch (error) {
      toast.error('فشل في تحميل الطلبات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">لوحة التحكم</h1>
                <p className="text-sm text-gray-600">الهيئة الوطنية للتخطيط العمراني</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="text-right">
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  معلومات الحساب
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">الاسم</label>
                  <p className="text-gray-800">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">البريد الإلكتروني</label>
                  <p className="text-gray-800">{user.email}</p>
                </div>
                {user.phone && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">رقم الهاتف</label>
                    <p className="text-gray-800">{user.phone}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-600">نوع الحساب</label>
                  <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                    {user.role === 'ADMIN' ? 'مدير' : 'مستخدم'}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">تاريخ الإنشاء</label>
                  <p className="text-gray-800">
                    {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>إجراءات سريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate('/library')}
                >
                  <FileText className="w-4 h-4 ml-2" />
                  مكتبة الوثائق
                </Button>
                {user.role === 'ADMIN' && (
                  <Button
                    variant="outline"
                    className="w-full justify-start mt-2"
                    onClick={() => navigate('/admin')}
                  >
                    <FileText className="w-4 h-4 ml-2" />
                    لوحة الإدارة
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate('/')}
                >
                  <Building className="w-4 h-4 ml-2" />
                  الصفحة الرئيسية
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="requests" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="requests">طلباتي</TabsTrigger>
                <TabsTrigger value="stats">الإحصائيات</TabsTrigger>
              </TabsList>

              {user.role === 'ADMIN' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-lg">
                      <div className="text-sm text-gray-600">إجمالي الطلبات</div>
                      <div className="text-2xl font-bold">{adminStats?.totalRequests ?? '-'}</div>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <div className="text-sm text-gray-600">الوثائق النشطة</div>
                      <div className="text-2xl font-bold">{adminStats?.activeDocuments ?? '-'}</div>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <div className="text-sm text-gray-600">التنزيلات الأخيرة</div>
                      <div className="text-2xl font-bold">{recentDownloads.length}</div>
                    </div>
                  </div>

                  <div className="md:col-span-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h3 className="font-medium mb-2">التنزيلات الأخيرة</h3>
                      <div className="space-y-2">
                        {recentDownloads.map((d, i) => (
                          <div key={i} className="flex justify-between items-center">
                            <div>
                              <div className="text-sm">{d.documentTitle || d.filename}</div>
                              <div className="text-xs text-gray-500">{new Date(d.timestamp).toLocaleString('ar-SA')}</div>
                            </div>
                            <div className="text-xs text-gray-500">{d.remoteAddr}</div>
                          </div>
                        ))}
                        {recentDownloads.length === 0 && <div className="text-sm text-gray-500">لا توجد تنزيلات حديثة</div>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Requests Tab */}
              <TabsContent value="requests" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      طلبات الوثائق
                    </CardTitle>
                    <CardDescription>
                      جميع طلباتك للحصول على الوثائق والمستندات
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">جاري التحميل...</p>
                      </div>
                    ) : requests.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">لا توجد طلبات حتى الآن</p>
                        <Button
                          className="mt-4"
                          onClick={() => navigate('/library')}
                        >
                          تصفح الوثائق
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {requests.map((request) => (
                          <Card key={request.id} className="border-l-4 border-l-blue-500">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-800 mb-1">
                                    {request.document?.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 mb-2">
                                    {request.purpose}
                                  </p>
                                  <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      {new Date(request.createdAt).toLocaleDateString('ar-SA')}
                                    </span>
                                    <span>الأولوية: {getUrgencyBadge(request.urgency)}</span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  {getStatusBadge(request.status)}
                                  {request.status === 'COMPLETED' && request.document && (
                                    <Button size="sm" variant="outline" onClick={() => window.open(`${API_BASE_URL}/api/files/${request.document.fileName}`, '_blank')}>
                                      <Download className="w-3 h-3 ml-1" />
                                      تحميل
                                    </Button>
                                  )}
                                </div>
                              </div>
                              {request.notes && (
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="text-sm text-gray-700">
                                    <strong>ملاحظات:</strong> {request.notes}
                                  </p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Stats Tab */}
              <TabsContent value="stats" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                          <p className="text-2xl font-bold text-gray-800">{requests.length}</p>
                        </div>
                        <FileText className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">قيد المراجعة</p>
                          <p className="text-2xl font-bold text-yellow-600">
                            {requests.filter(r => r.status === 'PENDING').length}
                          </p>
                        </div>
                        <Clock className="w-8 h-8 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">مكتملة</p>
                          <p className="text-2xl font-bold text-green-600">
                            {requests.filter(r => r.status === 'COMPLETED').length}
                          </p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

