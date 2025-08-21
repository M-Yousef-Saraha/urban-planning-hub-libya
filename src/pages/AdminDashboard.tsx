import React, { useEffect, useState } from 'react';
import { api, adminAPI } from '@/lib/api';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminDashboard = () => {
  const [downloads, setDownloads] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setIsLoading(true);
        // downloads
        try {
          const d = await api.get('/api/admin/downloads?limit=100');
          if (d.data && d.data.data) setDownloads(d.data.data.downloads || []);
        } catch (err) {
          console.error('Failed to fetch downloads', err);
        }

        // recent requests
        try {
          const r = await adminAPI.getAllRequests({ page: 1, limit: 50 });
          if (r.success) setRequests(r.data.requests || []);
        } catch (err) {
          console.error('Failed to fetch requests', err);
        }

        // stats
        try {
          const s = await adminAPI.getRequestStats();
          if (s.success) setStats(s.data);
        } catch (err) {
          console.error('Failed to fetch stats', err);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="downloads">
          <TabsList>
            <TabsTrigger value="downloads">التنزيلات</TabsTrigger>
            <TabsTrigger value="requests">الطلبات</TabsTrigger>
            <TabsTrigger value="stats">الإحصائيات</TabsTrigger>
          </TabsList>

          <TabsContent value="downloads">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>سجل التنزيلات</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div>جاري التحميل...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الوقت</TableHead>
                        <TableHead>المستند</TableHead>
                        <TableHead>اسم الملف</TableHead>
                        <TableHead>IP / Agent</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {downloads.map((d, i) => (
                        <TableRow key={i}>
                          <TableCell>{new Date(d.timestamp).toLocaleString('ar-SA')}</TableCell>
                          <TableCell>{d.documentTitle || '-'}</TableCell>
                          <TableCell>{d.filename}</TableCell>
                          <TableCell>{d.remoteAddr} {d.userAgent ? ` - ${d.userAgent}` : ''}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>الطلبات الحديثة</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div>جاري التحميل...</div>
                ) : (
                  <div className="space-y-3">
                    {requests.map((r: any) => (
                      <div key={r.id} className="p-3 border rounded-lg bg-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{r.document?.title || '-'}</div>
                            <div className="text-sm text-gray-600">{r.purpose}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm">{new Date(r.createdAt).toLocaleString('ar-SA')}</div>
                            <div className="mt-2">{r.user?.name} &lt;{r.user?.email}&gt;</div>
                            <div className="mt-1">{r.status && <Badge>{r.status}</Badge>}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>الإحصائيات</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div>جاري التحميل...</div>
                ) : stats ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-lg">
                      <div className="text-sm text-gray-600">إجمالي الطلبات</div>
                      <div className="text-2xl font-bold">{stats.totalRequests}</div>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <div className="text-sm text-gray-600">قيد المراجعة</div>
                      <div className="text-2xl font-bold">{stats.pendingRequests}</div>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <div className="text-sm text-gray-600">مكتملة</div>
                      <div className="text-2xl font-bold">{stats.completedRequests}</div>
                    </div>
                  </div>
                ) : (
                  <div>لا توجد إحصائيات</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
