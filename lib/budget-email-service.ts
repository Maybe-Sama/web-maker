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
  
  // Consentimientos GDPR/LOPD
  consents?: {
    marketing: boolean;
    communications: boolean;
    dataProcessing: boolean;
    thirdParties: boolean;
    dataRetention: boolean;
  };
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
      const clientEmailContent = this.generateClientConfirmationEmail(data, servicesDetails);

      switch (this.config.provider) {
        case 'gmail':
          return await this.sendViaGmail(emailContent, clientEmailContent, data);
        case 'resend':
          return await this.sendViaResend(emailContent, clientEmailContent, data);
        case 'console':
          return await this.sendViaConsole(emailContent, clientEmailContent, data);
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
    const subject = '🎯 Nueva solicitud de presupuesto - Web Maker';
    
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

CONSENTIMIENTOS:
- Marketing: ${data.consents?.marketing ? 'SÍ' : 'NO'}
- Comunicaciones: ${data.consents?.communications ? 'SÍ' : 'NO'}
- Procesamiento de datos: ${data.consents?.dataProcessing ? 'SÍ' : 'NO'}
- Terceros: ${data.consents?.thirdParties ? 'SÍ' : 'NO'}
- Retención de datos: ${data.consents?.dataRetention ? 'SÍ' : 'NO'}

Fecha de solicitud: ${new Date().toLocaleString('es-ES')}
    `.trim();

    const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nueva solicitud de presupuesto - Web Maker</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #1f2937; 
            background-color: #f9fafb;
        }
        .container { 
            max-width: 700px; 
            margin: 0 auto; 
            background: white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            overflow: hidden;
        }
        .header { 
            background: linear-gradient(135deg, #1e293b, #334155); 
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
        }
        .header h1 { font-size: 28px; margin-bottom: 10px; }
        .header p { opacity: 0.9; font-size: 16px; }
        .content { padding: 30px; }
        .section { margin-bottom: 30px; }
        .section-title { 
            font-size: 20px; 
            font-weight: 700; 
            color: #1e293b; 
            margin-bottom: 20px; 
            border-bottom: 3px solid #3b82f6; 
            padding-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .client-info { 
            background: linear-gradient(135deg, #f8fafc, #e2e8f0); 
            padding: 25px; 
            border-radius: 12px; 
            border-left: 5px solid #3b82f6;
        }
        .client-info p { margin-bottom: 8px; }
        .client-info strong { color: #1e293b; }
        .service-item { 
            background: #f8fafc; 
            padding: 20px; 
            margin: 12px 0; 
            border-radius: 8px; 
            border-left: 4px solid #64748b;
            transition: transform 0.2s;
        }
        .service-item:hover { transform: translateX(5px); }
        .service-name { font-weight: 700; color: #1e293b; font-size: 16px; }
        .service-description { color: #64748b; font-size: 14px; margin: 8px 0; }
        .service-meta { 
            display: flex; 
            justify-content: space-between; 
            align-items: center;
            margin-top: 12px;
        }
        .quantity-badge { 
            background: #e2e8f0; 
            color: #475569; 
            padding: 4px 12px; 
            border-radius: 20px; 
            font-size: 12px; 
            font-weight: 600;
        }
        .service-price { color: #059669; font-weight: 700; font-size: 16px; }
        .total-price { 
            background: linear-gradient(135deg, #059669, #10b981); 
            color: white; 
            padding: 30px; 
            border-radius: 12px; 
            text-align: center; 
            font-size: 28px; 
            font-weight: 700; 
            margin: 30px 0;
            box-shadow: 0 10px 25px -5px rgba(5, 150, 105, 0.3);
        }
        .bundle-badge { 
            background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
            color: white; 
            padding: 12px 20px; 
            border-radius: 25px; 
            font-size: 14px; 
            font-weight: 700; 
            display: inline-block; 
            margin-bottom: 20px;
            box-shadow: 0 4px 12px -2px rgba(59, 130, 246, 0.3);
        }
        .additional-info { 
            background: linear-gradient(135deg, #fef3c7, #fde68a); 
            padding: 20px; 
            border-radius: 8px; 
            border-left: 4px solid #f59e0b;
        }
        .consents-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        .consent-item {
            background: #f1f5f9;
            padding: 12px;
            border-radius: 6px;
            text-align: center;
        }
        .consent-status {
            font-weight: 700;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
        }
        .consent-yes { background: #dcfce7; color: #166534; }
        .consent-no { background: #fee2e2; color: #991b1b; }
        .footer { 
            background: #f8fafc; 
            padding: 25px; 
            text-align: center; 
            color: #64748b; 
            font-size: 14px;
            border-top: 1px solid #e2e8f0;
        }
        .footer strong { color: #475569; }
        .priority-indicator {
            background: #fef3c7;
            color: #92400e;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 15px;
        }
        @media (max-width: 600px) {
            .container { margin: 10px; border-radius: 8px; }
            .header { padding: 30px 20px; }
            .content { padding: 20px; }
            .service-meta { flex-direction: column; align-items: flex-start; gap: 8px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 NUEVA SOLICITUD DE PRESUPUESTO</h1>
            <p>Web Maker - Configurador de Proyectos</p>
        </div>
        
        <div class="content">
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
                    <div class="service-description">${service.description}</div>
                    <div class="service-meta">
                        <span class="quantity-badge">Cantidad: ${service.quantity}</span>
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
            
            <div class="section">
                <div class="section-title">✅ CONSENTIMIENTOS GDPR/LOPD</div>
                <div class="consents-grid">
                    <div class="consent-item">
                        <div>Marketing</div>
                        <span class="consent-status ${data.consents?.marketing ? 'consent-yes' : 'consent-no'}">
                            ${data.consents?.marketing ? 'SÍ' : 'NO'}
                        </span>
                    </div>
                    <div class="consent-item">
                        <div>Comunicaciones</div>
                        <span class="consent-status ${data.consents?.communications ? 'consent-yes' : 'consent-no'}">
                            ${data.consents?.communications ? 'SÍ' : 'NO'}
                        </span>
                    </div>
                    <div class="consent-item">
                        <div>Procesamiento de datos</div>
                        <span class="consent-status ${data.consents?.dataProcessing ? 'consent-yes' : 'consent-no'}">
                            ${data.consents?.dataProcessing ? 'SÍ' : 'NO'}
                        </span>
                    </div>
                    <div class="consent-item">
                        <div>Terceros</div>
                        <span class="consent-status ${data.consents?.thirdParties ? 'consent-yes' : 'consent-no'}">
                            ${data.consents?.thirdParties ? 'SÍ' : 'NO'}
                        </span>
                    </div>
                    <div class="consent-item">
                        <div>Retención de datos</div>
                        <span class="consent-status ${data.consents?.dataRetention ? 'consent-yes' : 'consent-no'}">
                            ${data.consents?.dataRetention ? 'SÍ' : 'NO'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        
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

  private generateClientConfirmationEmail(data: BudgetFormData, servicesDetails: ServiceDetail[]) {
    const subject = '✅ Confirmación de solicitud de presupuesto - Web Maker';
    
    const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de solicitud - Web Maker</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #1f2937; 
            background-color: #f9fafb;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            overflow: hidden;
        }
        .header { 
            background: linear-gradient(135deg, #059669, #10b981); 
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
        }
        .header h1 { font-size: 24px; margin-bottom: 10px; }
        .content { padding: 30px; }
        .success-message { 
            background: #dcfce7; 
            color: #166534; 
            padding: 20px; 
            border-radius: 8px; 
            margin-bottom: 25px;
            border-left: 4px solid #16a34a;
        }
        .summary { 
            background: #f8fafc; 
            padding: 20px; 
            border-radius: 8px; 
            margin-bottom: 25px;
        }
        .service-summary { margin: 15px 0; }
        .total { 
            font-weight: 700; 
            font-size: 18px; 
            color: #059669; 
            border-top: 2px solid #e2e8f0; 
            padding-top: 15px; 
            margin-top: 15px;
        }
        .next-steps { 
            background: #fef3c7; 
            padding: 20px; 
            border-radius: 8px; 
            border-left: 4px solid #f59e0b;
        }
        .next-steps h3 { color: #92400e; margin-bottom: 15px; }
        .next-steps ul { margin-left: 20px; }
        .next-steps li { margin-bottom: 8px; }
        .footer { 
            background: #f8fafc; 
            padding: 25px; 
            text-align: center; 
            color: #64748b; 
            font-size: 14px;
            border-top: 1px solid #e2e8f0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Solicitud Recibida</h1>
            <p>Gracias por confiar en Web Maker</p>
        </div>
        
        <div class="content">
            <div class="success-message">
                <strong>¡Hola ${data.name}!</strong><br>
                Hemos recibido tu solicitud de presupuesto correctamente. Nuestro equipo la revisará y te contactaremos en las próximas 24 horas.
            </div>
            
            <div class="summary">
                <h3>📋 Resumen de tu solicitud:</h3>
                ${servicesDetails.map(service => `
                <div class="service-summary">
                    <strong>${service.name}</strong> (${service.quantity}x) - ${(service.price * service.quantity).toLocaleString()}€
                </div>
                `).join('')}
                <div class="total">
                    Total: ${data.totalPrice.toLocaleString()}€
                </div>
            </div>
            
            <div class="next-steps">
                <h3>🔄 Próximos pasos:</h3>
                <ul>
                    <li>Revisaremos tu solicitud en detalle</li>
                    <li>Te enviaremos un presupuesto personalizado</li>
                    <li>Programaremos una llamada para discutir los detalles</li>
                    <li>Iniciaremos el proyecto cuando estés listo</li>
                </ul>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Web Maker</strong> - Transformando ideas en realidad digital</p>
            <p>📧 info@webmaker.com | 📱 +34 600 000 000</p>
        </div>
    </div>
</body>
</html>
    `.trim();

    return { subject, html };
  }

  private async sendViaGmail(
    content: { subject: string; text: string; html: string }, 
    clientContent: { subject: string; html: string },
    data: BudgetFormData
  ) {
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

    // Email al administrador
    const adminMailOptions = {
      from: `"Web Maker Presupuestos" <${this.config.gmail.user}>`,
      to: this.config.gmail.to,
      subject: content.subject,
      text: content.text,
      html: content.html,
    };

    // Email de confirmación al cliente
    const clientMailOptions = {
      from: `"Web Maker" <${this.config.gmail.user}>`,
      to: data.email,
      subject: clientContent.subject,
      html: clientContent.html,
    };

    try {
      await transporter.sendMail(adminMailOptions);
      await transporter.sendMail(clientMailOptions);
      
      return { 
        success: true, 
        message: 'Solicitud de presupuesto enviada correctamente. Se ha enviado confirmación al cliente.' 
      };
    } catch (error) {
      console.error('Error enviando emails via Gmail:', error);
      throw new Error('Error al enviar los emails');
    }
  }

  private async sendViaResend(
    content: { subject: string; text: string; html: string },
    clientContent: { subject: string; html: string },
    data: BudgetFormData
  ) {
    if (!this.config.resend) {
      throw new Error('Configuración de Resend no disponible');
    }

    // Nota: Para usar Resend, necesitarías instalar @resend/node
    console.log('Resend no implementado aún. Usando console fallback.');
    return await this.sendViaConsole(content, clientContent, data);
  }

  private async sendViaConsole(
    content: { subject: string; text: string; html: string },
    clientContent: { subject: string; html: string },
    data: BudgetFormData
  ) {
    console.log('\n' + '='.repeat(80));
    console.log('💰 SOLICITUD DE PRESUPUESTO (MODO DESARROLLO)');
    console.log('='.repeat(80));
    console.log(`📧 Para administrador: ${this.config.gmail?.to || 'tu-email@ejemplo.com'}`);
    console.log(`📋 Asunto: ${content.subject}`);
    console.log('\n📄 Contenido para administrador:');
    console.log(content.text);
    console.log('\n' + '='.repeat(80));
    console.log(`📧 Para cliente: ${data.email}`);
    console.log(`📋 Asunto: ${clientContent.subject}`);
    console.log('📄 Email de confirmación enviado al cliente');
    console.log('='.repeat(80) + '\n');

    return { 
      success: true, 
      message: 'Solicitud de presupuesto simulado en consola (modo desarrollo). Se ha enviado confirmación al cliente.' 
    };
  }

  private getClientIP(): string {
    // En producción, esto vendría del request
    return '127.0.0.1 (desarrollo)';
  }
} 