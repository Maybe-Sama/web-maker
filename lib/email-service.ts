import nodemailer from 'nodemailer';
import { getEmailConfig, EmailConfig } from './email-config';

export interface ContactFormData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  profession: string;
  hasWebsite: string;
  websiteDetails?: string;
  ideaDescription?: string;
  consents?: {
    marketing: boolean;
    communications: boolean;
    dataProcessing: boolean;
    thirdParties: boolean;
    dataRetention: boolean;
  };
}

export class EmailService {
  private config: EmailConfig;

  constructor() {
    this.config = getEmailConfig();
  }

  async sendContactEmail(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      const emailContent = this.generateEmailContent(data);

      switch (this.config.provider) {
        case 'gmail':
          return await this.sendViaGmail(emailContent);
        case 'resend':
          return await this.sendViaResend(emailContent);
        case 'console':
          return await this.sendViaConsole(emailContent);
        default:
          throw new Error('No hay proveedor de email configurado');
      }
    } catch (error) {
      console.error('Error enviando email:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  private generateEmailContent(data: ContactFormData) {
    const subject = 'Nuevo contacto desde la web';
    const text = `
Nuevo contacto desde la web

Nombre: ${data.name} ${data.surname}
Email: ${data.email}
Teléfono: ${data.phone}
Servicio: ${data.service}
Presupuesto: ${data.budget}
Profesión: ${data.profession}
¿Tiene web?: ${data.hasWebsite}
${data.websiteDetails ? `Detalles web: ${data.websiteDetails}` : ''}
${data.ideaDescription ? `Idea: ${data.ideaDescription}` : ''}
    `.trim();

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nuevo contacto desde la web</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { color: #333; }
        .highlight { background: #e3f2fd; padding: 10px; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🎉 Nuevo contacto desde la web</h2>
            <p>Has recibido una nueva solicitud de contacto.</p>
        </div>
        
        <div class="field">
            <div class="label">👤 Nombre completo:</div>
            <div class="value">${data.name} ${data.surname}</div>
        </div>
        
        <div class="field">
            <div class="label">📧 Email:</div>
            <div class="value">${data.email}</div>
        </div>
        
        <div class="field">
            <div class="label">📱 Teléfono:</div>
            <div class="value">${data.phone}</div>
        </div>
        
        <div class="field">
            <div class="label">💼 Servicio solicitado:</div>
            <div class="value highlight">${data.service}</div>
        </div>
        
        <div class="field">
            <div class="label">💰 Presupuesto:</div>
            <div class="value">${data.budget}</div>
        </div>
        
        <div class="field">
            <div class="label">🏢 Profesión/Sector:</div>
            <div class="value">${data.profession}</div>
        </div>
        
        <div class="field">
            <div class="label">🌐 ¿Tiene web actual?:</div>
            <div class="value">${data.hasWebsite}</div>
        </div>
        
        ${data.websiteDetails ? `
        <div class="field">
            <div class="label">🔗 Detalles de la web actual:</div>
            <div class="value">${data.websiteDetails}</div>
        </div>
        ` : ''}
        
        ${data.ideaDescription ? `
        <div class="field">
            <div class="label">💡 Descripción de la idea:</div>
            <div class="value highlight">${data.ideaDescription}</div>
        </div>
        ` : ''}
        
        <div style="margin-top: 30px; padding: 15px; background: #f5f5f5; border-radius: 8px; font-size: 14px; color: #666;">
            <p><strong>📅 Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
            <p><strong>🌍 IP:</strong> ${this.getClientIP()}</p>
        </div>
    </div>
</body>
</html>
    `.trim();

    return { subject, text, html };
  }

  private async sendViaGmail(content: { subject: string; text: string; html: string }) {
    if (!this.config.gmail) {
      throw new Error('Configuración de Gmail no disponible');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.config.gmail.user,
        pass: this.config.gmail.pass,
      },
    });

    const mailOptions = {
      from: `"Web Maker Contacto" <${this.config.gmail.user}>`,
      to: this.config.gmail.to,
      subject: content.subject,
      text: content.text,
      html: content.html,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email enviado correctamente via Gmail' };
  }

  private async sendViaResend(content: { subject: string; text: string; html: string }) {
    if (!this.config.resend) {
      throw new Error('Configuración de Resend no disponible');
    }

    // Nota: Para usar Resend, necesitarías instalar @resend/node
    // npm install @resend/node
    // Y luego usar su API
    
    console.log('Resend no implementado aún. Usando console fallback.');
    return await this.sendViaConsole(content);
  }

  private async sendViaConsole(content: { subject: string; text: string; html: string }) {
    console.log('\n' + '='.repeat(50));
    console.log('📧 EMAIL SIMULADO (MODO DESARROLLO)');
    console.log('='.repeat(50));
    console.log(`📧 Para: ${this.config.gmail?.to || 'tu-email@ejemplo.com'}`);
    console.log(`📋 Asunto: ${content.subject}`);
    console.log('\n📄 Contenido:');
    console.log(content.text);
    console.log('='.repeat(50) + '\n');

    return { success: true, message: 'Email simulado en consola (modo desarrollo)' };
  }

  private getClientIP(): string {
    // En producción, esto vendría del request
    return '127.0.0.1 (desarrollo)';
  }
} 