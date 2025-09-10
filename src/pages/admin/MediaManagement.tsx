import React, { useEffect, useState } from 'react';
import { adminAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Image, 
  File, 
  Upload, 
  Trash2, 
  Search,
  Download,
  Eye,
  Calendar,
  HardDrive
} from 'lucide-react';
import { toast } from 'sonner';

const MediaManagement = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFiles, setFilteredFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = files.filter(file => 
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFiles(filtered);
    } else {
      setFilteredFiles(files);
    }
  }, [searchTerm, files]);

  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      const response = await adminAPI.getMediaFiles();
      if (response.success) {
        setFiles(response.data.files || []);
      }
    } catch (error) {
      toast.error('فشل في تحميل الملفات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFile = async (filename: string) => {
    try {
      setIsDeleting(true);
      const response = await adminAPI.deleteMediaFile(filename);
      if (response.success) {
        toast.success('تم حذف الملف بنجاح');
        fetchFiles();
        setSelectedFile(null);
      }
    } catch (error) {
      toast.error('فشل في حذف الملف');
    } finally {
      setIsDeleting(false);
    }
  };

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
    
    if (imageExtensions.includes(extension || '')) {
      return <Image className="w-5 h-5 text-blue-500" />;
    }
    return <File className="w-5 h-5 text-gray-500" />;
  };

  const getFileTypeBadge = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    const typeConfig: any = {
      pdf: { label: 'PDF', color: 'bg-red-100 text-red-800' },
      doc: { label: 'Word', color: 'bg-blue-100 text-blue-800' },
      docx: { label: 'Word', color: 'bg-blue-100 text-blue-800' },
      jpg: { label: 'صورة', color: 'bg-green-100 text-green-800' },
      jpeg: { label: 'صورة', color: 'bg-green-100 text-green-800' },
      png: { label: 'صورة', color: 'bg-green-100 text-green-800' },
      gif: { label: 'صورة', color: 'bg-green-100 text-green-800' },
    };
    
    const config = typeConfig[extension || ''] || { label: extension?.toUpperCase() || '', color: 'bg-gray-100 text-gray-800' };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 بايت';
    const k = 1024;
    const sizes = ['بايت', 'كيلو', 'ميجا', 'جيجا'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB');
  };

  const getTotalSize = () => {
    return files.reduce((total, file) => total + file.size, 0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">إدارة الوسائط</h1>
        <p className="text-gray-600">إدارة وتنظيم ملفات الوسائط في النظام</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <File className="h-6 w-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">إجمالي الملفات</p>
                <p className="text-2xl font-bold text-gray-900" dir="ltr">
                  {files.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <HardDrive className="h-6 w-6 text-green-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">المساحة المستخدمة</p>
                <p className="text-2xl font-bold text-gray-900" dir="ltr">
                  {formatFileSize(getTotalSize())}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Image className="h-6 w-6 text-purple-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">الصور</p>
                <p className="text-2xl font-bold text-gray-900" dir="ltr">
                  {files.filter(f => ['jpg', 'jpeg', 'png', 'gif'].includes(f.type.replace('.', ''))).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في الملفات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={fetchFiles} variant="outline">
                تحديث
              </Button>
              <Button>
                <Upload className="w-4 h-4 ml-1" />
                رفع ملف جديد
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Files Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <File className="h-5 w-5" />
            ملفات الوسائط ({filteredFiles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="mr-3">جاري التحميل...</span>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="text-center py-8">
              <File className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد ملفات</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'لا توجد ملفات تطابق البحث' : 'ابدأ برفع ملفات جديدة'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFiles.map((file, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.name)}
                      <span className="font-medium text-sm truncate max-w-32" title={file.name}>
                        {file.name}
                      </span>
                    </div>
                    {getFileTypeBadge(file.name)}
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4" />
                      <span dir="ltr">{formatFileSize(file.size)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span dir="ltr">{formatDate(file.modified)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedFile(file)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl" dir="rtl">
                        <DialogHeader>
                          <DialogTitle>تفاصيل الملف</DialogTitle>
                        </DialogHeader>
                        {selectedFile && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="font-medium">اسم الملف:</label>
                                <p className="break-all">{selectedFile.name}</p>
                              </div>
                              <div>
                                <label className="font-medium">نوع الملف:</label>
                                <p>{getFileTypeBadge(selectedFile.name)}</p>
                              </div>
                              <div>
                                <label className="font-medium">حجم الملف:</label>
                                <p dir="ltr">{formatFileSize(selectedFile.size)}</p>
                              </div>
                              <div>
                                <label className="font-medium">تاريخ التعديل:</label>
                                <p dir="ltr">{formatDate(selectedFile.modified)}</p>
                              </div>
                            </div>
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="destructive"
                                onClick={() => handleDeleteFile(selectedFile.name)}
                                disabled={isDeleting}
                              >
                                <Trash2 className="w-4 h-4 ml-1" />
                                {isDeleting ? 'جاري الحذف...' : 'حذف الملف'}
                              </Button>
                              <Button variant="outline" asChild>
                                <a href={selectedFile.path} download target="_blank" rel="noopener noreferrer">
                                  <Download className="w-4 h-4 ml-1" />
                                  تحميل
                                </a>
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" size="sm" asChild>
                      <a href={file.path} download target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaManagement;