// Email Configuration
export interface EmailConfig {
  provider: 'gmail' | 'resend' | 'console';
  gmail?: {
    user: string;
    pass: string;
    to: string;
  };
  resend?: {
    apiKey: string;
    from: string;
    to: string;
  };
}

// Función para obtener la configuración de email
export function getEmailConfig(): EmailConfig {
  // Verificar si tenemos configuración de Gmail
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_PASS;
  const gmailTo = process.env.GMAIL_TO || gmailUser;

  if (gmailUser && gmailPass) {
    return {
      provider: 'gmail',
      gmail: {
        user: gmailUser,
        pass: gmailPass,
        to: gmailTo!
      }
    };
  }

  // Verificar si tenemos configuración de Resend
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    return {
      provider: 'resend',
      resend: {
        apiKey: resendApiKey,
        from: process.env.RESEND_FROM || 'noreply@tu-dominio.com',
        to: process.env.RESEND_TO || 'tu-email@ejemplo.com'
      }
    };
  }

  // Fallback a console para desarrollo
  return {
    provider: 'console'
  };
}

// Función para validar la configuración
export function validateEmailConfig(): { isValid: boolean; message: string } {
  const config = getEmailConfig();
  
  switch (config.provider) {
    case 'gmail':
      if (!config.gmail?.user || !config.gmail?.pass) {
        return {
          isValid: false,
          message: 'Gmail configurado pero faltan GMAIL_USER o GMAIL_PASS en las variables de entorno'
        };
      }
      break;
    case 'resend':
      if (!config.resend?.apiKey) {
        return {
          isValid: false,
          message: 'Resend configurado pero falta RESEND_API_KEY en las variables de entorno'
        };
      }
      break;
    case 'console':
      return {
        isValid: true,
        message: 'Modo desarrollo: los emails se mostrarán en la consola'
      };
  }

  return {
    isValid: true,
    message: `Configuración válida usando ${config.provider}`
  };
} 