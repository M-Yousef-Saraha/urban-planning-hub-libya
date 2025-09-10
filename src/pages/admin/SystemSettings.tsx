import React, { useEffect, useState } from 'react';
import { adminAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Mail, 
  FileText, 
  Shield, 
  Save,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

const SystemSettings = () => {
  const [settings, setSettings] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await adminAPI.getSystemSettings();
      if (response.success) {
        setSettings(response.data);
      }
    } catch (error) {
      toast.error('فشل في تحميل الإعدادات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await adminAPI.updateSystemSettings(settings);
      if (response.success) {
        toast.success('تم حفظ الإعدادات بنجاح');
      }
    } catch (error) {
      toast.error('فشل في حفظ الإعدادات');
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (path: string, value: any) => {
    const keys = path.split('.');
    const newSettings = { ...settings };
    let current = newSettings;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setSettings(newSettings);
  };

  const formatFileSize = (bytes: number) => {
    return `${Math.round(bytes / (1024 * 1024))} ميجابايت`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="mr-3">جاري تحميل الإعدادات...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">إعدادات النظام</h1>
          <p className="text-gray-600">إدارة إعدادات وتكوين النظام</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 ml-1" />
          {isSaving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
        </Button>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            الإعدادات العامة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="siteName">اسم الموقع</Label>
            <Input
              id="siteName"
              value={settings.siteName || ''}
              onChange={(e) => updateSetting('siteName', e.target.value)}
              placeholder="اسم موقع الويب"
            />
          </div>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            إعدادات البريد الإلكتروني
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Switch
              id="emailEnabled"
              checked={settings.emailSettings?.enabled || false}
              onCheckedChange={(value) => updateSetting('emailSettings.enabled', value)}
            />
            <Label htmlFor="emailEnabled">تفعيل البريد الإلكتروني</Label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fromName">اسم المرسل</Label>
              <Input
                id="fromName"
                value={settings.emailSettings?.fromName || ''}
                onChange={(e) => updateSetting('emailSettings.fromName', e.target.value)}
                placeholder="اسم المرسل"
              />
            </div>
            <div>
              <Label htmlFor="fromEmail">بريد المرسل</Label>
              <Input
                id="fromEmail"
                type="email"
                value={settings.emailSettings?.fromEmail || ''}
                onChange={(e) => updateSetting('emailSettings.fromEmail', e.target.value)}
                placeholder="البريد الإلكتروني للمرسل"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            إعدادات الملفات
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="maxFileSize">الحد الأقصى لحجم الملف</Label>
            <div className="flex items-center gap-2">
              <Input
                id="maxFileSize"
                type="number"
                value={Math.round((settings.maxFileSize || 0) / (1024 * 1024))}
                onChange={(e) => updateSetting('maxFileSize', parseInt(e.target.value) * 1024 * 1024)}
                placeholder="حجم الملف بالميجابايت"
                className="w-32"
              />
              <span className="text-sm text-gray-600">ميجابايت</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              الحد الأقصى الحالي: {formatFileSize(settings.maxFileSize || 0)}
            </p>
          </div>

          <div>
            <Label htmlFor="allowedFileTypes">أنواع الملفات المسموحة</Label>
            <Textarea
              id="allowedFileTypes"
              value={settings.allowedFileTypes?.join(', ') || ''}
              onChange={(e) => updateSetting('allowedFileTypes', e.target.value.split(',').map(s => s.trim()))}
              placeholder=".pdf, .doc, .docx, .jpg, .png"
              rows={3}
            />
            <p className="text-sm text-gray-500 mt-1">
              اكتب أنواع الملفات مفصولة بفواصل (مثال: .pdf, .doc, .jpg)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Request Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            إعدادات الطلبات
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Switch
              id="autoApproval"
              checked={settings.requestSettings?.autoApproval || false}
              onCheckedChange={(value) => updateSetting('requestSettings.autoApproval', value)}
            />
            <Label htmlFor="autoApproval">الموافقة التلقائية على الطلبات</Label>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <Switch
              id="urgentNotification"
              checked={settings.requestSettings?.urgentRequestNotification || false}
              onCheckedChange={(value) => updateSetting('requestSettings.urgentRequestNotification', value)}
            />
            <Label htmlFor="urgentNotification">إشعارات الطلبات العاجلة</Label>
          </div>

          <div>
            <Label htmlFor="maxRequests">الحد الأقصى للطلبات لكل مستخدم</Label>
            <Input
              id="maxRequests"
              type="number"
              value={settings.requestSettings?.maxRequestsPerUser || 0}
              onChange={(e) => updateSetting('requestSettings.maxRequestsPerUser', parseInt(e.target.value))}
              placeholder="عدد الطلبات"
              className="w-32"
            />
            <p className="text-sm text-gray-500 mt-1">
              0 = لا يوجد حد أقصى
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Information Notice */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800">ملاحظة مهمة</h4>
              <p className="text-sm text-amber-700 mt-1">
                بعض الإعدادات قد تحتاج إلى إعادة تشغيل النظام لتأخذ مفعولها. 
                تأكد من حفظ جميع التغييرات قبل تطبيق الإعدادات الجديدة.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;