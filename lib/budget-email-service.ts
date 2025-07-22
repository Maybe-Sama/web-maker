import nodemailer from 'nodemailer';
import { getEmailConfig, EmailConfig } from './email-config';

export interface BudgetFormData {
  // Datos del cliente
  name: string;
  email: string;
  phone: string;
  company?: string;
  
  // Configuración del proyecto
  selectedServices: { [key: string]: number };
  selectedBundle?: string;
  totalPrice: number;
  
  // Detalles adicionales
  projectDescription?: string;
  timeline?: string;
  additionalRequirements?: string;
}

export interface ServiceDetail {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  icon?: any;
  tag?: string;
}

export class BudgetEmailService {
  private config: EmailConfig;

  constructor() {
    this.config = getEmailConfig();
  }

  async sendBudgetRequest(data: BudgetFormData, servicesDetails: ServiceDetail[]): Promise<{ success: boolean; message: string }> {
    try {
      const emailContent = this.generateBudgetEmailContent(data, servicesDetails);

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
      console.error('Error enviando solicitud de presupuesto:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  private generateBudgetEmailContent(data: BudgetFormData, servicesDetails: ServiceDetail[]) {
    const subject = 'Nueva solicitud de presupuesto - Web Maker';
    
    const servicesList = servicesDetails.map(service => 
      `• ${service.name} (${service.quantity}x) - ${(service.price * service.quantity).toLocaleString()}€`
    ).join('\n');

    const text = `
NUEVA SOLICITUD DE PRESUPUESTO - WEB MAKER

DATOS DEL CLIENTE:
Nombre: ${data.name}
Email: ${data.email}
Teléfono: ${data.phone}
${data.company ? `Empresa: ${data.company}` : ''}

CONFIGURACIÓN DEL PROYECTO:
${data.selectedBundle ? `Kit seleccionado: ${data.selectedBundle}` : 'Configuración personalizada:'}
${servicesList}

PRECIO TOTAL: ${data.totalPrice.toLocaleString()}€

${data.projectDescription ? `DESCRIPCIÓN DEL PROYECTO: ${data.projectDescription}` : ''}
${data.timeline ? `PLAZO DESEADO: ${data.timeline}` : ''}
${data.additionalRequirements ? `REQUISITOS ADICIONALES: ${data.additionalRequirements}` : ''}

Fecha de solicitud: ${new Date().toLocaleString('es-ES')}
    `.trim();

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nueva solicitud de presupuesto - Web Maker</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 700px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e293b, #334155); color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px; text-align: center; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 18px; font-weight: bold; color: #1e293b; margin-bottom: 15px; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; }
        .client-info { background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; }
        .service-item { background: #f1f5f9; padding: 15px; margin: 8px 0; border-radius: 6px; border-left: 3px solid #64748b; }
        .service-name { font-weight: bold; color: #1e293b; }
        .service-price { color: #059669; font-weight: bold; }
        .total-price { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 20px; border-radius: 8px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; }
        .bundle-badge { background: #3b82f6; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; display: inline-block; margin-bottom: 15px; }
        .additional-info { background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; }
        .footer { background: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 30px; text-align: center; color: #64748b; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 NUEVA SOLICITUD DE PRESUPUESTO</h1>
            <p>Web Maker - Configurador de Proyectos</p>
        </div>
        
        <div class="section">
            <div class="section-title">👤 DATOS DEL CLIENTE</div>
            <div class="client-info">
                <p><strong>Nombre:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Teléfono:</strong> ${data.phone}</p>
                ${data.company ? `<p><strong>Empresa:</strong> ${data.company}</p>` : ''}
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">⚙️ CONFIGURACIÓN DEL PROYECTO</div>
            ${data.selectedBundle ? `
            <div class="bundle-badge">📦 Kit Seleccionado: ${data.selectedBundle}</div>
            ` : '<p><strong>Configuración personalizada:</strong></p>'}
            
            ${servicesDetails.map(service => `
            <div class="service-item">
                <div class="service-name">${service.name}</div>
                <div style="color: #64748b; font-size: 14px; margin: 5px 0;">${service.description}</div>
                <div style="margin-top: 8px;">
                    <span style="background: #e2e8f0; padding: 2px 8px; border-radius: 4px; font-size: 12px; margin-right: 10px;">Cantidad: ${service.quantity}</span>
                    <span class="service-price">${(service.price * service.quantity).toLocaleString()}€</span>
                </div>
            </div>
            `).join('')}
        </div>
        
        <div class="total-price">
            💰 PRECIO TOTAL: ${data.totalPrice.toLocaleString()}€
        </div>
        
        ${data.projectDescription || data.timeline || data.additionalRequirements ? `
        <div class="section">
            <div class="section-title">📝 INFORMACIÓN ADICIONAL</div>
            <div class="additional-info">
                ${data.projectDescription ? `<p><strong>Descripción del proyecto:</strong><br>${data.projectDescription}</p>` : ''}
                ${data.timeline ? `<p><strong>Plazo deseado:</strong> ${data.timeline}</p>` : ''}
                ${data.additionalRequirements ? `<p><strong>Requisitos adicionales:</strong><br>${data.additionalRequirements}</p>` : ''}
            </div>
        </div>
        ` : ''}
        
        <div class="footer">
            <p><strong>📅 Fecha de solicitud:</strong> ${new Date().toLocaleString('es-ES')}</p>
            <p><strong>🌍 IP:</strong> ${this.getClientIP()}</p>
            <p style="margin-top: 15px; font-size: 12px; color: #94a3b8;">
                Esta solicitud fue generada automáticamente desde el configurador de proyectos de Web Maker.
            </p>
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
      from: `"Web Maker Presupuestos" <${this.config.gmail.user}>`,
      to: this.config.gmail.to,
      subject: content.subject,
      text: content.text,
      html: content.html,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Solicitud de presupuesto enviada correctamente via Gmail' };
  }

  private async sendViaResend(content: { subject: string; text: string; html: string }) {
    if (!this.config.resend) {
      throw new Error('Configuración de Resend no disponible');
    }

    // Nota: Para usar Resend, necesitarías instalar @resend/node
    console.log('Resend no implementado aún. Usando console fallback.');
    return await this.sendViaConsole(content);
  }

  private async sendViaConsole(content: { subject: string; text: string; html: string }) {
    console.log('\n' + '='.repeat(60));
    console.log('💰 SOLICITUD DE PRESUPUESTO (MODO DESARROLLO)');
    console.log('='.repeat(60));
    console.log(`📧 Para: ${this.config.gmail?.to || 'tu-email@ejemplo.com'}`);
    console.log(`📋 Asunto: ${content.subject}`);
    console.log('\n📄 Contenido:');
    console.log(content.text);
    console.log('='.repeat(60) + '\n');

    return { success: true, message: 'Solicitud de presupuesto simulado en consola (modo desarrollo)' };
  }

  private getClientIP(): string {
    // En producción, esto vendría del request
    return '127.0.0.1 (desarrollo)';
  }
} 