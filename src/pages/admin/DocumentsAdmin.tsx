import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DocumentUploadModal from '@/components/DocumentUploadModal';
import { Upload, RefreshCw } from 'lucide-react';

const DocumentsAdmin = () => {
  const [docs, setDocs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const fetchDocs = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/api/documents');
      if(res.data && res.data.data) setDocs(res.data.data.documents || []);
    } catch (err) {
      console.error('Failed to load documents', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة الوثائق</h2>
          <p className="text-gray-600 mt-1">رفع وإدارة وثائق المكتبة</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setIsLoading(true);
              fetchDocs();
            }}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            تحديث
          </Button>
          <Button 
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Upload className="w-4 h-4" />
            رفع وثيقة جديدة
          </Button>
        </div>
      </div>

      <div className="bg-white rounded shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>العنوان</TableHead>
              <TableHead>الفئة</TableHead>
              <TableHead>اسم الملف</TableHead>
              <TableHead>التاريخ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {docs.map(d => (
              <TableRow key={d.id}>
                <TableCell>{d.title}</TableCell>
                <TableCell>{d.category}</TableCell>
                <TableCell>{d.fileName}</TableCell>
                <TableCell>{new Date(d.createdAt).toLocaleString('ar-SA')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">جاري تحميل الوثائق...</p>
          </div>
        )}
        
        {/* Empty State */}
        {!isLoading && docs.length === 0 && (
          <div className="text-center py-12">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد وثائق</h3>
            <p className="text-gray-600 mb-4">ابدأ برفع أول وثيقة إلى المكتبة</p>
            <Button 
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              رفع وثيقة جديدة
            </Button>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={() => {
          fetchDocs(); // Refresh the documents list
        }}
      />
    </div>
  );
};

export default DocumentsAdmin;
