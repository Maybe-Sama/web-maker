import { NextRequest, NextResponse } from "next/server";
import { BudgetEmailService } from "@/lib/budget-email-service";
import { validateEmailConfig } from "@/lib/email-config";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validación de configuración de email
    const configValidation = validateEmailConfig();
    console.log("💰 Configuración de email para presupuestos:", configValidation.message);

    // Validación básica de datos
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: nombre, email o teléfono." }, 
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

    // Validación de servicios seleccionados
    if (!data.selectedServices || Object.keys(data.selectedServices).length === 0) {
      return NextResponse.json(
        { error: "No se han seleccionado servicios para el presupuesto." }, 
        { status: 400 }
      );
    }

    // Validación de precio total
    if (!data.totalPrice || data.totalPrice <= 0) {
      return NextResponse.json(
        { error: "El precio total no es válido." }, 
        { status: 400 }
      );
    }

    // Validación de teléfono
    const phoneRegex = /^[+]?[\d\s\-()]{9,}$/;
    if (!phoneRegex.test(data.phone.trim())) {
      return NextResponse.json(
        { error: "El formato del teléfono no es válido." }, 
        { status: 400 }
      );
    }

    // Enviar solicitud de presupuesto usando el servicio
    const budgetEmailService = new BudgetEmailService();
    const result = await budgetEmailService.sendBudgetRequest(data, data.servicesDetails || []);

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
    console.error("❌ Error en API de presupuesto:", error);
    
    // Error más específico para el cliente
    const errorMessage = error.message || "Error interno del servidor";
    return NextResponse.json(
      { error: `Error procesando la solicitud de presupuesto: ${errorMessage}` }, 
      { status: 500 }
    );
  }
} 