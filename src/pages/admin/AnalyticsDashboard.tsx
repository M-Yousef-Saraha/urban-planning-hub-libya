import React, { useEffect, useState } from 'react';
import { adminAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  Activity,
  Calendar,
  PieChart,
  Target
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState('week');

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      const response = await adminAPI.getAnalytics(period);
      if (response.success) {
        setAnalytics(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPeriodLabel = (periodValue: string) => {
    const labels: any = {
      week: 'الأسبوع الماضي',
      month: 'الشهر الماضي',
      year: 'السنة الماضية'
    };
    return labels[periodValue] || periodValue;
  };

  const getStatusBadge = (status: string, count: number) => {
    const statusConfig = {
      PENDING: { label: 'قيد المراجعة', color: 'bg-yellow-100 text-yellow-800' },
      APPROVED: { label: 'موافق عليه', color: 'bg-green-100 text-green-800' },
      REJECTED: { label: 'مرفوض', color: 'bg-red-100 text-red-800' },
      COMPLETED: { label: 'مكتمل', color: 'bg-blue-100 text-blue-800' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { 
      label: status, 
      color: 'bg-gray-100 text-gray-800' 
    };
    
    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
          {config.label}
        </span>
        <span className="font-bold text-lg" dir="ltr">{count}</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="mr-3">جاري تحميل التحليلات...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">تحليلات النظام</h1>
          <p className="text-gray-600">إحصائيات شاملة حول أداء واستخدام النظام</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">الأسبوع الماضي</SelectItem>
              <SelectItem value="month">الشهر الماضي</SelectItem>
              <SelectItem value="year">السنة الماضية</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">إجمالي المستخدمين</p>
                <p className="text-2xl font-bold text-gray-900" dir="ltr">
                  {analytics.systemHealth?.totalUsers || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">الوثائق النشطة</p>
                <p className="text-2xl font-bold text-gray-900" dir="ltr">
                  {analytics.systemHealth?.activeDocuments || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-gray-900" dir="ltr">
                  {analytics.systemHealth?.totalRequests || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              نمو المستخدمين - {getPeriodLabel(period)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600" dir="ltr">
                  {analytics.userGrowth || 0}
                </div>
                <p className="text-sm text-gray-600 mt-2">مستخدم جديد</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Request Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              توزيع الطلبات حسب الحالة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.requestTrends?.map((trend: any) => (
                getStatusBadge(trend.status, trend._count.id)
              )) || []}
              {(!analytics.requestTrends || analytics.requestTrends.length === 0) && (
                <p className="text-gray-500 text-center py-4">لا توجد بيانات للفترة المحددة</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Documents and User Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              الوثائق الأكثر طلباً
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topDocuments?.slice(0, 5).map((doc: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">وثيقة رقم: {doc.documentId}</p>
                    <p className="text-xs text-gray-600">مطلوبة بكثرة</p>
                  </div>
                  <Badge variant="secondary" dir="ltr">
                    {doc._count.id} طلب
                  </Badge>
                </div>
              )) || []}
              {(!analytics.topDocuments || analytics.topDocuments.length === 0) && (
                <p className="text-gray-500 text-center py-4">لا توجد بيانات للفترة المحددة</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              أنشط المستخدمين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.userActivity?.slice(0, 5).map((user: any, index: number) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                  <Badge variant="outline">
                    مستخدم نشط
                  </Badge>
                </div>
              )) || []}
              {(!analytics.userActivity || analytics.userActivity.length === 0) && (
                <p className="text-gray-500 text-center py-4">لا توجد بيانات للفترة المحددة</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Insights */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <PieChart className="h-5 w-5" />
            ملخص الإحصائيات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">فترة التحليل:</h4>
              <p className="text-blue-700">{getPeriodLabel(period)}</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">معدل النشاط:</h4>
              <p className="text-blue-700">
                {analytics.userGrowth > 0 ? 'نمو إيجابي' : 'استقرار في النمو'}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">حالة النظام:</h4>
              <p className="text-blue-700">
                {analytics.systemHealth?.totalUsers > 0 ? 'نظام نشط' : 'نظام جديد'}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">التوصية:</h4>
              <p className="text-blue-700">
                {analytics.requestTrends?.length > 0 ? 'متابعة الأداء الحالي' : 'تشجيع المزيد من الاستخدام'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;