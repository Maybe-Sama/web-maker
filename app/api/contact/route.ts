import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configura tus credenciales de Gmail aquí o usa variables de entorno
const EMAIL_USER = process.env.GMAIL_USER!;
const EMAIL_PASS = process.env.GMAIL_PASS!;
const EMAIL_TO = process.env.GMAIL_TO || EMAIL_USER; // Puedes poner tu propio correo aquí

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Debug: Verificar variables de entorno
    console.log("EMAIL_USER:", EMAIL_USER ? "Configurado" : "NO CONFIGURADO");
    console.log("EMAIL_PASS:", EMAIL_PASS ? "Configurado" : "NO CONFIGURADO");

    // Validación básica
    if (!data.email || !data.name || !data.phone) {
      return NextResponse.json({ error: "Faltan campos obligatorios." }, { status: 400 });
    }

    // Configura el transporter de Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Web Maker Contacto" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      subject: "Nuevo contacto desde la web",
      text: `
        Nombre: ${data.name} ${data.surname}
        Email: ${data.email}
        Teléfono: ${data.phone}
        Servicio: ${data.service}
        Presupuesto: ${data.budget}
        Profesión: ${data.profession}
        ¿Tiene web?: ${data.hasWebsite}
        Detalles web: ${data.websiteDetails}
        Idea: ${data.ideaDescription}
      `,
      html: `
        <h2>Nuevo contacto desde la web</h2>
        <ul>
          <li><b>Nombre:</b> ${data.name} ${data.surname}</li>
          <li><b>Email:</b> ${data.email}</li>
          <li><b>Teléfono:</b> ${data.phone}</li>
          <li><b>Servicio:</b> ${data.service}</li>
          <li><b>Presupuesto:</b> ${data.budget}</li>
          <li><b>Profesión:</b> ${data.profession}</li>
          <li><b>¿Tiene web?:</b> ${data.hasWebsite}</li>
          <li><b>Detalles web:</b> ${data.websiteDetails}</li>
          <li><b>Idea:</b> ${data.ideaDescription}</li>
        </ul>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Error enviando el email." }, { status: 500 });
  }
} 