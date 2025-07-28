import { NextRequest, NextResponse } from "next/server";
import { BudgetEmailService } from "@/lib/budget-email-service";
import { validateEmailConfig, sanitizeEmailData } from "@/lib/email-config";
import { logger, performanceMonitor, isValidEmail, isValidPhone, sanitizeString, createError } from "@/lib/utils";

// Rate limiting simple en memoria (en producción usar Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutos
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 solicitudes por ventana

// Esquemas de validación
interface BudgetRequestData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  selectedServices: { [key: string]: number };
  selectedBundle?: string;
  totalPrice: number;
  projectDescription?: string;
  timeline?: string;
  additionalRequirements?: string;
  consents: {
    marketing: boolean;
    communications: boolean;
    dataProcessing: boolean;
    thirdParties: boolean;
    dataRetention: boolean;
  };
  servicesDetails?: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
  }>;
}

// Validación de rate limiting
function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    // Reset o nueva entrada
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetTime: now + RATE_LIMIT_WINDOW };
  }

  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetTime: userLimit.resetTime };
  }

  userLimit.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - userLimit.count, resetTime: userLimit.resetTime };
}

// Validación de datos
function validateBudgetData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Sanitizar datos primero
  const sanitizedData = sanitizeEmailData(data);

  // Validación de campos obligatorios
  if (!sanitizedData.name?.trim()) errors.push("El nombre es obligatorio");
  if (!sanitizedData.email?.trim()) errors.push("El email es obligatorio");
  if (!sanitizedData.phone?.trim()) errors.push("El teléfono es obligatorio");

  // Validación de formato de email usando utilidades
  if (sanitizedData.email && !isValidEmail(sanitizedData.email)) {
    errors.push("El formato del email no es válido");
  }

  // Validación de teléfono usando utilidades
  if (sanitizedData.phone && !isValidPhone(sanitizedData.phone)) {
    errors.push("El formato del teléfono no es válido");
  }

  // Validación de servicios
  if (!sanitizedData.selectedServices || Object.keys(sanitizedData.selectedServices).length === 0) {
    errors.push("Debe seleccionar al menos un servicio");
  }

  // Validación de precio
  if (!sanitizedData.totalPrice || sanitizedData.totalPrice <= 0) {
    errors.push("El precio total debe ser mayor a 0");
  }

  // Validación de consentimientos
  if (!sanitizedData.consents?.dataProcessing) {
    errors.push("Es obligatorio aceptar el procesamiento de datos personales");
  }

  // Validación de longitud de campos usando sanitizeString
  if (sanitizedData.name && sanitizeString(sanitizedData.name, 100).length !== sanitizedData.name.length) {
    errors.push("El nombre no puede exceder 100 caracteres");
  }
  if (sanitizedData.company && sanitizeString(sanitizedData.company, 100).length !== sanitizedData.company.length) {
    errors.push("El nombre de empresa no puede exceder 100 caracteres");
  }
  if (sanitizedData.projectDescription && sanitizeString(sanitizedData.projectDescription, 2000).length !== sanitizedData.projectDescription.length) {
    errors.push("La descripción del proyecto no puede exceder 2000 caracteres");
  }
  if (sanitizedData.additionalRequirements && sanitizeString(sanitizedData.additionalRequirements, 1000).length !== sanitizedData.additionalRequirements.length) {
    errors.push("Los requisitos adicionales no pueden exceder 1000 caracteres");
  }

  return { isValid: errors.length === 0, errors };
}

// Logging estructurado usando el sistema de utilidades
function logBudgetRequest(data: BudgetRequestData, ip: string, success: boolean, error?: string) {
  const logData = {
    clientName: data.name,
    clientEmail: data.email,
    totalPrice: data.totalPrice,
    servicesCount: Object.keys(data.selectedServices).length,
    bundle: data.selectedBundle || 'personalizado',
    ip,
    success
  };

  if (success) {
    logger.info('Solicitud de presupuesto procesada exitosamente', 'BudgetAPI', logData);
  } else {
    logger.error('Error en solicitud de presupuesto', 'BudgetAPI', logData, error ? createError(error) : undefined);
  }
}

export async function POST(req: NextRequest) {
  const stopTimer = performanceMonitor.startTimer('budget-request');
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

  try {
    logger.info('Nueva solicitud de presupuesto recibida', 'BudgetAPI', { ip });

    // Rate limiting
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      logger.warn('Rate limit excedido', 'BudgetAPI', { ip, remaining: rateLimit.remaining });
      return NextResponse.json(
        { 
          error: "Demasiadas solicitudes. Intente nuevamente en unos minutos.",
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString()
          }
        }
      );
    }

    // Parse y validación de datos
    let data: BudgetRequestData;
    try {
      data = await req.json();
    } catch (parseError) {
      logger.error('Error parseando JSON', 'BudgetAPI', { ip }, parseError as Error);
      return NextResponse.json(
        { error: "Datos JSON inválidos" },
        { status: 400 }
      );
    }

    // Validación de datos
    const validation = validateBudgetData(data);
    if (!validation.isValid) {
      logger.warn('Datos de entrada inválidos', 'BudgetAPI', { 
        ip, 
        errors: validation.errors,
        clientEmail: data.email 
      });
      return NextResponse.json(
        { 
          error: "Datos de entrada inválidos",
          details: validation.errors
        },
        { status: 400 }
      );
    }

    // Validación de configuración de email
    const configValidation = validateEmailConfig();
    if (!configValidation.isValid) {
      logger.error('Configuración de email inválida', 'BudgetAPI', { 
        details: configValidation.details 
      });
      return NextResponse.json(
        { error: "Error de configuración del servidor" },
        { status: 500 }
      );
    }

    // Enviar solicitud de presupuesto
    const budgetEmailService = new BudgetEmailService();
    const result = await budgetEmailService.sendBudgetRequest(data, data.servicesDetails || []);

    const processingTime = stopTimer();

    if (result.success) {
      logBudgetRequest(data, ip, true);
      
      const processingTimeMs = processingTime ? processingTime.toFixed(2) : '0.00';
      
      logger.info('Solicitud de presupuesto completada exitosamente', 'BudgetAPI', {
        processingTime: `${processingTimeMs}ms`,
        clientEmail: data.email
      });
      
      return NextResponse.json({ 
        success: true, 
        message: result.message,
        processingTime: `${processingTimeMs}ms`
      }, {
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetTime.toString()
        }
      });
    } else {
      logBudgetRequest(data, ip, false, result.message);
      
      return NextResponse.json(
        { error: result.message },
        { status: 500 }
      );
    }

  } catch (error: any) {
    const processingTime = stopTimer();
    const processingTimeMs = processingTime ? processingTime.toFixed(2) : '0.00';
    
    logger.error('Error crítico en API de presupuesto', 'BudgetAPI', {
      ip,
      processingTime: `${processingTimeMs}ms`,
      errorMessage: error.message
    }, error);
    
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
} 