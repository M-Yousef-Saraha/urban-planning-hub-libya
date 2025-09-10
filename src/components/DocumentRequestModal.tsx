import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { requestsAPI, Document } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Clock, User, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentRequestModalProps {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface DocumentRequestForm {
  purpose: string;
  notes: string;
  name: string;
  email: string;
}

const DocumentRequestModal: React.FC<DocumentRequestModalProps> = ({
  document,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DocumentRequestForm>({
    defaultValues: {
      purpose: '',
      notes: '',
      name: '',
      email: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: DocumentRequestForm) => {
    if (!document) return;

    setIsSubmitting(true);
    try {
      const response = await requestsAPI.create({
        documentId: document.id,
        purpose: data.purpose,
        urgency: 'MEDIUM', // Default urgency
        notes: data.notes,
      });

      if (response.success) {
        toast.success('تم إرسال طلب الوثيقة بنجاح', {
          description: 'سيتم مراجعة طلبك والرد عليك في أقرب وقت ممكن',
        });
        form.reset();
        onClose();
        onSuccess?.();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'فشل في إرسال الطلب';
      toast.error('خطأ في إرسال الطلب', {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const purposeOptions = [
    { value: 'STUDENT_RESEARCH', label: 'طالب - مشروع بحثي' },
    { value: 'GENERAL_INQUIRY', label: 'استفسار عام' },
    { value: 'WORK_PROJECT', label: 'مشروع عمل' },
    { value: 'PERSONAL_USE', label: 'استخدام شخصي' },
    { value: 'LEGAL_MATTER', label: 'مسألة قانونية' },
    { value: 'BUSINESS_PURPOSE', label: 'أغراض تجارية' },
    { value: 'OTHER', label: 'أخرى' },
  ];


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md z-[9998]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="w-5 h-5 text-blue-600" />
            طلب وثيقة
          </DialogTitle>
          <DialogDescription className="text-right">
            {document ? (
              <div className="space-y-2">
                <p className="font-medium text-gray-900">{document.title}</p>
                <p className="text-sm text-gray-600">
                  يرجى ملء النموذج أدناه لطلب هذه الوثيقة
                </p>
              </div>
            ) : (
              'املأ النموذج أدناه لطلب الوثيقة'
            )}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* User Information Input */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                معلومات مقدم الطلب
              </h4>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم الكامل</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل اسمك الكامل" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="أدخل بريدك الإلكتروني" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Purpose Field */}
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الغرض من طلب الوثيقة</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الغرض من الطلب" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="z-[9999]">
                      {purposeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/* Notes Field */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    ملاحظات إضافية (اختيارية)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="أضف أي معلومات إضافية تساعد في معالجة طلبك..."
                      className="min-h-[80px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    جاري الإرسال...
                  </div>
                ) : (
                  'إرسال الطلب'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentRequestModal;