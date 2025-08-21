import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DocumentsAdmin = () => {
  const [docs, setDocs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
    fetchDocs();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">إدارة الوثائق</h2>
        <Button onClick={() => alert('Upload UI to implement')}>رفع وثيقة جديدة</Button>
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
      </div>
    </div>
  );
};

export default DocumentsAdmin;
