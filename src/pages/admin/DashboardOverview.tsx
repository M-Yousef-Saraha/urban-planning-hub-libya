import React, { useEffect, useState } from 'react';
import { api, adminAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  Download, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  AlertCircle 
} from 'lucide-react';

const DashboardOverview = () => {
  const [stats, setStats] = useState<any>(null);
  const [recentRequests, setRecentRequests] = useState<any[]>([]);
  const [recentDownloads, setRecentDownloads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch stats
        const [requestStats, documentStats, downloads, requests] = await Promise.all([
          adminAPI.getRequestStats().catch(() => ({ data: {} })),
          api.get('/api/admin/stats/documents').catch(() => ({ data: { data: {} } })),
          api.get('/api/admin/downloads?limit=5').catch(() => ({ data: { data: { downloads: [] } } })),
          adminAPI.getAllRequests({ page: 1, limit: 5 }).catch(() => ({ data: { requests: [] } }))
        ]);

        if (requestStats.success) {
          setStats({
            ...requestStats.data,
            ...documentStats.data?.data
          });
        }

        if (downloads.data?.data?.downloads) {
          setRecentDownloads(downloads.data.data.downloads);
        }

        if (requests.success && requests.data?.requests) {
          setRecentRequests(requests.data.requests);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { label: 'قيد المراجعة', variant: 'secondary' as const, icon: Clock },
      APPROVED: { label: 'موافق عليه', variant: 'default' as const, icon: CheckCircle },
      REJECTED: { label: 'مرفوض', variant: 'destructive' as const, icon: AlertCircle },
      COMPLETED: { label: 'مكتمل', variant: 'default' as const, icon: CheckCircle },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
    return (
      <Badge variant={config.variant}>
        {config.label}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="mr-3">جاري تحميل البيانات...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">لوحة التحكم الإدارية</h1>
        <p className="text-gray-600">نظرة عامة على نشاط النظام والإحصائيات</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-gray-900" dir="ltr">
                  {stats?.totalRequests || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">قيد المراجعة</p>
                <p className="text-2xl font-bold text-gray-900" dir="ltr">
                  {stats?.pendingRequests || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">مكتملة</p>
                <p className="text-2xl font-bold text-gray-900" dir="ltr">
                  {stats?.completedRequests || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Download className="h-6 w-6 text-purple-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">الوثائق النشطة</p>
                <p className="text-2xl font-bold text-gray-900" dir="ltr">
                  {stats?.activeDocuments || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              أحدث الطلبات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentRequests.length > 0 ? (
                recentRequests.map((request: any) => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{request.document?.title || 'وثيقة غير محددة'}</p>
                      <p className="text-xs text-gray-600">{request.user?.name}</p>
                    </div>
                    <div className="text-left">
                      {getStatusBadge(request.status)}
                      <p className="text-xs text-gray-500 mt-1" dir="ltr">
                        {new Date(request.createdAt).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">لا توجد طلبات حديثة</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Downloads */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              أحدث التنزيلات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDownloads.length > 0 ? (
                recentDownloads.map((download: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{download.documentTitle || download.filename}</p>
                      <p className="text-xs text-gray-600">{download.remoteAddr}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-gray-500" dir="ltr">
                        {new Date(download.timestamp).toLocaleString('en-GB')}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">لا توجد تنزيلات حديثة</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;