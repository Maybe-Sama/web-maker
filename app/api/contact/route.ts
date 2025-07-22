import { NextRequest, NextResponse } from "next/server";
import { EmailService } from "@/lib/email-service";
import { validateEmailConfig } from "@/lib/email-config";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validación de configuración de email
    const configValidation = validateEmailConfig();
    console.log("📧 Configuración de email:", configValidation.message);

    // Validación básica de datos
    if (!data.email || !data.name || !data.phone) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: email, nombre o teléfono." }, 
        { status: 400 }
      );
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "El formato del email no es válido." }, 
        { status: 400 }
      );
    }

    // Enviar email usando el servicio
    const emailService = new EmailService();
    const result = await emailService.sendContactEmail(data);

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: result.message 
      });
    } else {
      return NextResponse.json(
        { error: result.message }, 
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error("❌ Error en API de contacto:", error);
    
    // Error más específico para el cliente
    const errorMessage = error.message || "Error interno del servidor";
    return NextResponse.json(
      { error: `Error procesando la solicitud: ${errorMessage}` }, 
      { status: 500 }
    );
  }
} 