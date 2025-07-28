// Email Configuration
export interface EmailConfig {
  provider: 'gmail' | 'resend' | 'console';
  gmail?: {
    user: string;
    pass: string;
    to: string;
    fromName?: string;
  };
  resend?: {
    apiKey: string;
    from: string;
    to: string;
    fromName?: string;
  };
  // Configuración general
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
}

// Función para obtener la configuración de email
export function getEmailConfig(): EmailConfig {
  // Verificar si tenemos configuración de Gmail
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_PASS;
  const gmailTo = process.env.GMAIL_TO || gmailUser;
  const gmailFromName = process.env.GMAIL_FROM_NAME || 'Web Maker';

  if (gmailUser && gmailPass) {
    return {
      provider: 'gmail',
      gmail: {
        user: gmailUser,
        pass: gmailPass,
        to: gmailTo!,
        fromName: gmailFromName
      },
      maxRetries: parseInt(process.env.EMAIL_MAX_RETRIES || '3'),
      retryDelay: parseInt(process.env.EMAIL_RETRY_DELAY || '1000'),
      timeout: parseInt(process.env.EMAIL_TIMEOUT || '10000')
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
        to: process.env.RESEND_TO || 'tu-email@ejemplo.com',
        fromName: process.env.RESEND_FROM_NAME || 'Web Maker'
      },
      maxRetries: parseInt(process.env.EMAIL_MAX_RETRIES || '3'),
      retryDelay: parseInt(process.env.EMAIL_RETRY_DELAY || '1000'),
      timeout: parseInt(process.env.EMAIL_TIMEOUT || '10000')
    };
  }

  // Fallback a console para desarrollo
  return {
    provider: 'console',
    maxRetries: 1,
    retryDelay: 0,
    timeout: 1000
  };
}

// Función para validar la configuración
export function validateEmailConfig(): { isValid: boolean; message: string; details?: any } {
  const config = getEmailConfig();
  
  const validationResult = {
    isValid: false,
    message: '',
    details: {
      provider: config.provider,
      hasRequiredFields: false,
      environment: process.env.NODE_ENV || 'development'
    }
  };
  
  switch (config.provider) {
    case 'gmail':
      if (!config.gmail?.user || !config.gmail?.pass) {
        validationResult.message = 'Gmail configurado pero faltan GMAIL_USER o GMAIL_PASS en las variables de entorno';
        validationResult.details.missingFields = [];
        if (!config.gmail?.user) validationResult.details.missingFields.push('GMAIL_USER');
        if (!config.gmail?.pass) validationResult.details.missingFields.push('GMAIL_PASS');
        return validationResult;
      }
      
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(config.gmail.user)) {
        validationResult.message = 'El formato del GMAIL_USER no es válido';
        return validationResult;
      }
      
      if (!emailRegex.test(config.gmail.to)) {
        validationResult.message = 'El formato del GMAIL_TO no es válido';
        return validationResult;
      }
      
      validationResult.isValid = true;
      validationResult.message = `Configuración válida usando Gmail (${config.gmail.user})`;
      validationResult.details.hasRequiredFields = true;
      break;
      
    case 'resend':
      if (!config.resend?.apiKey) {
        validationResult.message = 'Resend configurado pero falta RESEND_API_KEY en las variables de entorno';
        validationResult.details.missingFields = ['RESEND_API_KEY'];
        return validationResult;
      }
      
      if (!config.resend?.from || !config.resend?.to) {
        validationResult.message = 'Resend configurado pero faltan RESEND_FROM o RESEND_TO en las variables de entorno';
        validationResult.details.missingFields = [];
        if (!config.resend?.from) validationResult.details.missingFields.push('RESEND_FROM');
        if (!config.resend?.to) validationResult.details.missingFields.push('RESEND_TO');
        return validationResult;
      }
      
      validationResult.isValid = true;
      validationResult.message = `Configuración válida usando Resend (${config.resend.from})`;
      validationResult.details.hasRequiredFields = true;
      break;
      
    case 'console':
      validationResult.isValid = true;
      validationResult.message = 'Modo desarrollo: los emails se mostrarán en la consola';
      validationResult.details.hasRequiredFields = true;
      break;
  }

  return validationResult;
}

// Función para obtener información de configuración para debugging
export function getEmailConfigInfo(): { 
  provider: string; 
  isConfigured: boolean; 
  environment: string;
  hasRequiredEnvVars: boolean;
  missingVars: string[];
} {
  const config = getEmailConfig();
  const missingVars: string[] = [];
  
  // Verificar variables de entorno requeridas
  if (config.provider === 'gmail') {
    if (!process.env.GMAIL_USER) missingVars.push('GMAIL_USER');
    if (!process.env.GMAIL_PASS) missingVars.push('GMAIL_PASS');
  } else if (config.provider === 'resend') {
    if (!process.env.RESEND_API_KEY) missingVars.push('RESEND_API_KEY');
    if (!process.env.RESEND_FROM) missingVars.push('RESEND_FROM');
    if (!process.env.RESEND_TO) missingVars.push('RESEND_TO');
  }
  
  return {
    provider: config.provider,
    isConfigured: missingVars.length === 0,
    environment: process.env.NODE_ENV || 'development',
    hasRequiredEnvVars: missingVars.length === 0,
    missingVars
  };
}

// Función para validar un email específico
export function validateEmail(email: string): { isValid: boolean; message: string } {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: 'El email es requerido' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'El formato del email no es válido' };
  }
  
  // Validaciones adicionales
  if (email.length > 254) {
    return { isValid: false, message: 'El email es demasiado largo' };
  }
  
  const [localPart, domain] = email.split('@');
  if (localPart.length > 64 || domain.length > 253) {
    return { isValid: false, message: 'Parte local o dominio del email demasiado largo' };
  }
  
  return { isValid: true, message: 'Email válido' };
}

// Función para sanitizar datos de email
export function sanitizeEmailData(data: any): any {
  const sanitized = { ...data };
  
  // Sanitizar emails
  if (sanitized.email) {
    sanitized.email = sanitized.email.toLowerCase().trim();
  }
  
  // Sanitizar nombres
  if (sanitized.name) {
    sanitized.name = sanitized.name.trim().replace(/[<>]/g, '');
  }
  
  // Sanitizar empresa
  if (sanitized.company) {
    sanitized.company = sanitized.company.trim().replace(/[<>]/g, '');
  }
  
  // Sanitizar descripciones
  if (sanitized.projectDescription) {
    sanitized.projectDescription = sanitized.projectDescription.trim();
  }
  
  if (sanitized.additionalRequirements) {
    sanitized.additionalRequirements = sanitized.additionalRequirements.trim();
  }
  
  return sanitized;
} 