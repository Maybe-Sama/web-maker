import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Logging estructurado
export interface LogLevel {
  ERROR: 'error';
  WARN: 'warn';
  INFO: 'info';
  DEBUG: 'debug';
}

export const LOG_LEVELS: LogLevel = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

export interface LogData {
  timestamp: string;
  level: string;
  message: string;
  context?: string;
  data?: any;
  error?: Error;
  userId?: string;
  sessionId?: string;
  requestId?: string;
}

export class Logger {
  private static instance: Logger;
  private logLevel: string;

  private constructor() {
    this.logLevel = process.env.LOG_LEVEL || 'info';
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private shouldLog(level: string): boolean {
    const levels = ['error', 'warn', 'info', 'debug'];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex <= currentLevelIndex;
  }

  private formatLog(logData: LogData): string {
    const { timestamp, level, message, context, data, error, userId, sessionId, requestId } = logData;
    
    let logString = `[${timestamp}] ${level.toUpperCase()}`;
    if (context) logString += ` [${context}]`;
    logString += `: ${message}`;
    
    if (userId) logString += ` | User: ${userId}`;
    if (sessionId) logString += ` | Session: ${sessionId}`;
    if (requestId) logString += ` | Request: ${requestId}`;
    
    if (data) logString += ` | Data: ${JSON.stringify(data)}`;
    if (error) logString += ` | Error: ${error.message}`;
    
    return logString;
  }

  error(message: string, context?: string, data?: any, error?: Error): void {
    if (!this.shouldLog('error')) return;
    
    const logData: LogData = {
      timestamp: new Date().toISOString(),
      level: 'error',
      message,
      context,
      data,
      error
    };
    
    console.error(this.formatLog(logData));
    if (error?.stack) {
      console.error('Stack trace:', error.stack);
    }
  }

  warn(message: string, context?: string, data?: any): void {
    if (!this.shouldLog('warn')) return;
    
    const logData: LogData = {
      timestamp: new Date().toISOString(),
      level: 'warn',
      message,
      context,
      data
    };
    
    console.warn(this.formatLog(logData));
  }

  info(message: string, context?: string, data?: any): void {
    if (!this.shouldLog('info')) return;
    
    const logData: LogData = {
      timestamp: new Date().toISOString(),
      level: 'info',
      message,
      context,
      data
    };
    
    console.log(this.formatLog(logData));
  }

  debug(message: string, context?: string, data?: any): void {
    if (!this.shouldLog('debug')) return;
    
    const logData: LogData = {
      timestamp: new Date().toISOString(),
      level: 'debug',
      message,
      context,
      data
    };
    
    console.debug(this.formatLog(logData));
  }
}

// Función helper para logging
export const logger = Logger.getInstance();

// Monitoreo de rendimiento
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, { count: number; totalTime: number; avgTime: number; minTime: number; maxTime: number }>;

  private constructor() {
    this.metrics = new Map();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTimer(operation: string): () => number {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      this.recordMetric(operation, duration);
      return duration;
    };
  }

  private recordMetric(operation: string, duration: number): void {
    const existing = this.metrics.get(operation) || {
      count: 0,
      totalTime: 0,
      avgTime: 0,
      minTime: Infinity,
      maxTime: 0
    };

    existing.count++;
    existing.totalTime += duration;
    existing.avgTime = existing.totalTime / existing.count;
    existing.minTime = Math.min(existing.minTime, duration);
    existing.maxTime = Math.max(existing.maxTime, duration);

    this.metrics.set(operation, existing);
  }

  getMetrics(): Map<string, { count: number; totalTime: number; avgTime: number; minTime: number; maxTime: number }> {
    return new Map(this.metrics);
  }

  getMetric(operation: string) {
    return this.metrics.get(operation);
  }

  resetMetrics(): void {
    this.metrics.clear();
  }

  logMetrics(): void {
    logger.info('Performance Metrics', 'PerformanceMonitor', {
      metrics: Object.fromEntries(this.metrics)
    });
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

// Utilidades de validación
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[\d\s\-()]{9,}$/;
  return phoneRegex.test(phone.trim());
}

export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (!input || typeof input !== 'string') return '';
  
  // Remover caracteres peligrosos
  let sanitized = input
    .replace(/[<>]/g, '') // Remover < y >
    .replace(/javascript:/gi, '') // Remover javascript:
    .replace(/on\w+=/gi, '') // Remover event handlers
    .trim();
  
  // Limitar longitud
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  return sanitized;
}

export function validateRequiredFields(data: any, requiredFields: string[]): { isValid: boolean; missingFields: string[] } {
  const missingFields: string[] = [];
  
  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      missingFields.push(field);
    }
  }
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
}

// Utilidades de formato
export function formatPrice(price: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency
  }).format(price);
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Utilidades de array y objetos
export function groupBy<T>(array: T[], key: keyof T): { [key: string]: T[] } {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as { [key: string]: T[] });
}

export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Utilidades de seguridad
export function generateRandomString(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function hashString(str: string): string {
  let hash = 0;
  if (str.length === 0) return hash.toString();
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return hash.toString();
}

// Utilidades de error handling
export function createError(message: string, code?: string, details?: any): Error {
  const error = new Error(message) as any;
  error.code = code;
  error.details = details;
  error.timestamp = new Date().toISOString();
  return error;
}

export function isOperationalError(error: Error): boolean {
  if (error instanceof Error) {
    // Lista de errores operacionales (que no deberían causar crash)
    const operationalErrors = [
      'ValidationError',
      'RateLimitError',
      'EmailError',
      'NetworkError'
    ];
    
    return operationalErrors.some(type => error.name === type);
  }
  return false;
}

// Utilidades de configuración
export function getEnvironment(): string {
  return process.env.NODE_ENV || 'development';
}

export function isDevelopment(): boolean {
  return getEnvironment() === 'development';
}

export function isProduction(): boolean {
  return getEnvironment() === 'production';
}

export function isTest(): boolean {
  return getEnvironment() === 'test';
}
