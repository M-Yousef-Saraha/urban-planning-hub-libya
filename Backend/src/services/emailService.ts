import sgMail from '@sendgrid/mail';
import logger from '../utils/logger';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface EmailData {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    content: string;
    filename: string;
    type: string;
    disposition: string;
  }>;
}

export class EmailService {
  private fromEmail: string;

  constructor() {
    this.fromEmail = process.env.FROM_EMAIL || 'noreply@urbanplanninghub.ly';
  }

  async sendEmail(data: EmailData): Promise<void> {
    try {
      const msg = {
        to: data.to,
        from: this.fromEmail,
        subject: data.subject,
        html: data.html,
        attachments: data.attachments,
      };

      await sgMail.send(msg);
      logger.info(`Email sent successfully to ${data.to}`);
    } catch (error) {
      logger.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendRequestConfirmation(
    userEmail: string,
    userName: string,
    documentTitle: string,
    requestId: string
  ): Promise<void> {
    const subject = 'تأكيد طلب الوثيقة - Document Request Confirmation';
    const html = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تأكيد طلب الوثيقة</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { padding: 20px; text-align: center; color: #666; }
          .button { display: inline-block; padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>مركز التخطيط العمراني - ليبيا</h1>
            <h2>Urban Planning Hub Libya</h2>
          </div>
          <div class="content">
            <h3>عزيزي/عزيزتي ${userName}</h3>
            <p>تم استلام طلبكم للحصول على الوثيقة التالية:</p>
            <p><strong>اسم الوثيقة:</strong> ${documentTitle}</p>
            <p><strong>رقم الطلب:</strong> ${requestId}</p>
            <p>سيتم مراجعة طلبكم ومعالجته خلال 24 ساعة. ستتلقون رسالة إلكترونية أخرى عند اكتمال المعالجة.</p>
            <hr>
            <h3>Dear ${userName}</h3>
            <p>We have received your request for the following document:</p>
            <p><strong>Document Name:</strong> ${documentTitle}</p>
            <p><strong>Request ID:</strong> ${requestId}</p>
            <p>Your request will be reviewed and processed within 24 hours. You will receive another email when processing is complete.</p>
          </div>
          <div class="footer">
            <p>مركز التخطيط العمراني - ليبيا | Urban Planning Hub Libya</p>
            <p>للاستفسارات: ${process.env.ADMIN_EMAIL}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.sendEmail({
      to: userEmail,
      subject,
      html,
    });
  }

  async sendAdminNotification(
    userName: string,
    userEmail: string,
    documentTitle: string,
    purpose: string,
    urgency: string,
    requestId: string
  ): Promise<void> {
    const subject = `طلب وثيقة جديد - New Document Request: ${documentTitle}`;
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>طلب وثيقة جديد</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .info-table th, .info-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
          .info-table th { background-color: #f2f2f2; }
          .urgent { color: #dc2626; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>طلب وثيقة جديد</h1>
            <h2>New Document Request</h2>
          </div>
          <div class="content">
            <h3>تفاصيل الطلب / Request Details</h3>
            <table class="info-table">
              <tr>
                <th>Request ID / رقم الطلب</th>
                <td>${requestId}</td>
              </tr>
              <tr>
                <th>User Name / اسم المستخدم</th>
                <td>${userName}</td>
              </tr>
              <tr>
                <th>Email / البريد الإلكتروني</th>
                <td>${userEmail}</td>
              </tr>
              <tr>
                <th>Document / الوثيقة</th>
                <td>${documentTitle}</td>
              </tr>
              <tr>
                <th>Purpose / الغرض</th>
                <td>${purpose}</td>
              </tr>
              <tr>
                <th>Urgency / الأولوية</th>
                <td class="${urgency === 'URGENT' ? 'urgent' : ''}">${urgency}</td>
              </tr>
            </table>
            <p><strong>يرجى مراجعة الطلب ومعالجته في أقرب وقت ممكن.</strong></p>
            <p><strong>Please review and process this request as soon as possible.</strong></p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject,
      html,
    });
  }

  async sendDocumentDelivery(
    userEmail: string,
    userName: string,
    documentTitle: string,
    documentBuffer: Buffer,
    fileName: string,
    mimeType: string
  ): Promise<void> {
    const subject = `الوثيقة المطلوبة - Requested Document: ${documentTitle}`;
    const html = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>الوثيقة المطلوبة</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #16a34a; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>مركز التخطيط العمراني - ليبيا</h1>
            <h2>Urban Planning Hub Libya</h2>
          </div>
          <div class="content">
            <h3>عزيزي/عزيزتي ${userName}</h3>
            <p>نتشرف بإرسال الوثيقة المطلوبة إليكم:</p>
            <p><strong>اسم الوثيقة:</strong> ${documentTitle}</p>
            <p>الوثيقة مرفقة مع هذه الرسالة. يرجى تحميلها والاحتفاظ بنسخة للمراجعة المستقبلية.</p>
            <hr>
            <h3>Dear ${userName}</h3>
            <p>We are pleased to send you the requested document:</p>
            <p><strong>Document Name:</strong> ${documentTitle}</p>
            <p>The document is attached to this email. Please download and keep a copy for future reference.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.sendEmail({
      to: userEmail,
      subject,
      html,
      attachments: [
        {
          content: documentBuffer.toString('base64'),
          filename: fileName,
          type: mimeType,
          disposition: 'attachment',
        },
      ],
    });
  }
}

export const emailService = new EmailService();

