import React from 'react';
import { Document } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Calendar, 
  Database, 
  Download, 
  Eye, 
  Tag,
  User,
  Clock
} from 'lucide-react';

interface DocumentDetailModalProps {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestDocument?: (document: Document) => void;
}

const DocumentDetailModal: React.FC<DocumentDetailModalProps> = ({
  document,
  isOpen,
  onClose,
  onRequestDocument,
}) => {
  if (!document) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryLabel = (category: string) => {
    const categoryLabels: Record<string, string> = {
      'GUIDES': 'أدلة',
      'LAWS': 'قوانين',
      'STANDARDS': 'معايير',
      'REPORTS': 'تقارير',
      'MAPS': 'خرائط',
      'STUDIES': 'دراسات'
    };
    return categoryLabels[category] || category;
  };

  const getFileTypeInfo = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const typeMap: Record<string, { label: string; color: string; icon: string }> = {
      'pdf': { label: 'PDF', color: 'text-red-600 bg-red-50 border-red-200', icon: '📄' },
      'doc': { label: 'Word', color: 'text-blue-600 bg-blue-50 border-blue-200', icon: '📘' },
      'docx': { label: 'Word', color: 'text-blue-600 bg-blue-50 border-blue-200', icon: '📘' },
      'xls': { label: 'Excel', color: 'text-green-600 bg-green-50 border-green-200', icon: '📊' },
      'xlsx': { label: 'Excel', color: 'text-green-600 bg-green-50 border-green-200', icon: '📊' },
      'ppt': { label: 'PowerPoint', color: 'text-orange-600 bg-orange-50 border-orange-200', icon: '📑' },
      'pptx': { label: 'PowerPoint', color: 'text-orange-600 bg-orange-50 border-orange-200', icon: '📑' },
      'txt': { label: 'Text', color: 'text-gray-600 bg-gray-50 border-gray-200', icon: '📝' },
    };
    return typeMap[extension || ''] || { label: 'ملف', color: 'text-gray-600 bg-gray-50 border-gray-200', icon: '📁' };
  };

  const fileTypeInfo = getFileTypeInfo(document.fileName || '');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <FileText className="w-6 h-6 text-blue-600" />
            تفاصيل الوثيقة
          </DialogTitle>
          <DialogDescription className="text-right">
            معلومات مفصلة عن الوثيقة المحددة
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Document Header */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg border-2 ${fileTypeInfo.color} flex items-center justify-center text-lg`}>
                {fileTypeInfo.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-normal">
                  {document.title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {getCategoryLabel(document.category)}
                  </Badge>
                  <Badge variant="outline" className={`${fileTypeInfo.color} border-2`}>
                    {fileTypeInfo.label}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Document Description */}
          {document.description && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                وصف الوثيقة
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {document.description}
              </p>
            </div>
          )}

          {/* Document Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* File Information */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Database className="w-4 h-4" />
                معلومات الملف
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">حجم الملف:</span>
                  <span className="font-medium text-gray-900">
                    {formatFileSize(document.fileSize)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">نوع الملف:</span>
                  <span className="font-medium text-gray-900">
                    {fileTypeInfo.label}
                  </span>
                </div>
                {document.fileName && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">اسم الملف:</span>
                    <span className="font-medium text-gray-900 text-xs truncate max-w-[150px]" title={document.fileName}>
                      {document.fileName}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline Information */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                التوقيت
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">تاريخ الإنشاء:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(document.createdAt).toLocaleDateString('ar-SA')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">آخر تحديث:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(document.updatedAt || document.createdAt).toLocaleDateString('ar-SA')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">الوقت:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(document.createdAt).toLocaleTimeString('ar-SA', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              معلومات إضافية
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-blue-700">معرف الوثيقة:</span>
                <span className="font-mono text-blue-900 bg-blue-100 px-2 py-1 rounded text-xs">
                  {document.id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-700">الحالة:</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  نشطة
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            onClick={() => onRequestDocument?.(document)}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            طلب هذه الوثيقة
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6"
          >
            إغلاق
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDetailModal;