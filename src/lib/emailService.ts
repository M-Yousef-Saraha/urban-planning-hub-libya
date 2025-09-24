// Email service for handling document requests
// In a real application, this would integrate with your backend API

export interface EmailRequest {
  to: string;
  subject: string;
  body: string;
  attachments?: {
    filename: string;
    content: string;
    contentType: string;
  }[];
}

export interface DocumentRequestData {
  documentId: string;
  documentTitle: string;
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  purpose: string;
  urgency: 'low' | 'medium' | 'high';
  additionalNotes: string;
}

class EmailService {
  private apiEndpoint = '/api/send-document'; // Your backend endpoint

  async sendDocumentRequest(requestData: DocumentRequestData): Promise<boolean> {
    try {
      // In a real implementation, this would call your backend API
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to send document request');
      }

      return true;
    } catch (error) {
      console.error('Error sending document request:', error);
      return false;
    }
  }

  // Generate email template for document request
  generateDocumentRequestEmail(requestData: DocumentRequestData): EmailRequest {
    const urgencyText = {
      low: 'منخفضة',
      medium: 'متوسطة',
      high: 'عالية'
    };

    const subject = `طلب وثيقة: ${requestData.documentTitle}`;
    
    const body = `
      <div dir="rtl" style="font-family: 'Cairo', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 24px;">الهيئة الوطنية للتخطيط العمراني</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">طلب وثيقة من المكتبة الرقمية</p>
        </div>

        <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
          <h2 style="color: #3b82f6; margin-top: 0;">تفاصيل الطلب</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-weight: bold; color: #495057;">الوثيقة المطلوبة:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; color: #6c757d;">${requestData.documentTitle}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-weight: bold; color: #495057;">اسم الطالب:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; color: #6c757d;">${requestData.requesterName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-weight: bold; color: #495057;">البريد الإلكتروني:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; color: #6c757d;">${requestData.requesterEmail}</td>
            </tr>
            ${requestData.requesterPhone ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-weight: bold; color: #495057;">رقم الهاتف:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; color: #6c757d;">${requestData.requesterPhone}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-weight: bold; color: #495057;">الغرض:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; color: #6c757d;">${requestData.purpose}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-weight: bold; color: #495057;">الأولوية:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; color: #6c757d;">${urgencyText[requestData.urgency]}</td>
            </tr>
          </table>
        </div>

        ${requestData.additionalNotes ? `
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
          <h3 style="color: #856404; margin-top: 0;">ملاحظات إضافية:</h3>
          <p style="color: #856404; margin-bottom: 0; line-height: 1.6;">${requestData.additionalNotes}</p>
        </div>
        ` : ''}

        <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
          <h3 style="color: #155724; margin-top: 0;">معلومات مهمة:</h3>
          <ul style="color: #155724; margin-bottom: 0; padding-right: 20px;">
            <li>ستتم مراجعة طلبك خلال 24 ساعة</li>
            <li>سيتم إرسال الوثيقة إلى بريدك الإلكتروني المسجل</li>
            <li>في حالة وجود أي استفسار، يمكنك التواصل معنا</li>
          </ul>
        </div>

        <div style="text-align: center; padding: 20px; border-top: 2px solid #e9ecef;">
          <p style="color: #6c757d; margin: 0;">الهيئة الوطنية للتخطيط العمراني</p>
          <p style="color: #6c757d; margin: 5px 0 0 0; font-size: 14px;">نحو بيئة مستدامة</p>
        </div>
      </div>
    `;

    return {
      to: requestData.requesterEmail,
      subject,
      body
    };
  }

  // Generate admin notification email
  generateAdminNotificationEmail(requestData: DocumentRequestData): EmailRequest {
    const urgencyText = {
      low: 'منخفضة',
      medium: 'متوسطة',
      high: 'عالية'
    };

    const subject = `طلب وثيقة جديد: ${requestData.documentTitle}`;
    
    const body = `
      <div dir="rtl" style="font-family: 'Cairo', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #dc3545; color: white; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
          <h1 style="margin: 0; font-size: 20px;">طلب وثيقة جديد</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">يتطلب المراجعة والمعالجة</p>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
          <h2 style="color: #dc3545; margin-top: 0;">تفاصيل الطلب</h2>
          <p><strong>الوثيقة:</strong> ${requestData.documentTitle}</p>
          <p><strong>الطالب:</strong> ${requestData.requesterName}</p>
          <p><strong>البريد الإلكتروني:</strong> ${requestData.requesterEmail}</p>
          <p><strong>الهاتف:</strong> ${requestData.requesterPhone || 'غير محدد'}</p>
          <p><strong>الغرض:</strong> ${requestData.purpose}</p>
          <p><strong>الأولوية:</strong> ${urgencyText[requestData.urgency]}</p>
          ${requestData.additionalNotes ? `<p><strong>ملاحظات:</strong> ${requestData.additionalNotes}</p>` : ''}
        </div>
      </div>
    `;

    return {
      to: 'admin@urbanplanning.ly', // Admin email
      subject,
      body
    };
  }
}

export const emailService = new EmailService();