import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Search, Calendar } from 'lucide-react';

const DownloadsView = () => {
  const [downloads, setDownloads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDownloads, setFilteredDownloads] = useState<any[]>([]);

  useEffect(() => {
    fetchDownloads();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = downloads.filter(download => 
        (download.documentTitle || download.filename).toLowerCase().includes(searchTerm.toLowerCase()) ||
        download.remoteAddr.includes(searchTerm)
      );
      setFilteredDownloads(filtered);
    } else {
      setFilteredDownloads(downloads);
    }
  }, [searchTerm, downloads]);

  const fetchDownloads = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/admin/downloads?limit=500');
      if (response.data?.data?.downloads) {
        setDownloads(response.data.data.downloads);
      }
    } catch (error) {
      console.error('Failed to fetch downloads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportDownloads = () => {
    const csvContent = [
      ['التاريخ', 'الوثيقة', 'اسم الملف', 'عنوان IP', 'المتصفح'].join(','),
      ...filteredDownloads.map(download => [
        new Date(download.timestamp).toLocaleString('en-GB'),
        download.documentTitle || '-',
        download.filename,
        download.remoteAddr,
        download.userAgent || '-'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `downloads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">سجل التنزيلات</h1>
        <p className="text-gray-600">مراقبة وتتبع تنزيلات الوثائق</p>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في السجل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={fetchDownloads} variant="outline">
                تحديث
              </Button>
              <Button onClick={exportDownloads} disabled={filteredDownloads.length === 0}>
                <Download className="w-4 h-4 ml-1" />
                تصدير CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Downloads Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            سجل التنزيلات ({filteredDownloads.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="mr-3">جاري التحميل...</span>
            </div>
          ) : (
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>التاريخ والوقت</TableHead>
                    <TableHead>الوثيقة</TableHead>
                    <TableHead>اسم الملف</TableHead>
                    <TableHead>عنوان IP</TableHead>
                    <TableHead>المتصفح</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDownloads.map((download, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span dir="ltr">
                            {new Date(download.timestamp).toLocaleString('en-GB')}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{download.documentTitle || '-'}</p>
                          {download.documentCategory && (
                            <p className="text-sm text-gray-500">{download.documentCategory}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm">{download.filename}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm" dir="ltr">{download.remoteAddr}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600 max-w-xs truncate block">
                          {download.userAgent || '-'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredDownloads.length === 0 && !isLoading && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="text-gray-500">
                          {searchTerm ? 'لا توجد نتائج للبحث' : 'لا توجد تنزيلات مسجلة'}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadsView;