// Test script para verificar el servicio de email
const { EmailService } = require('./lib/email-service');

async function testEmailService() {
  console.log('🧪 Probando el servicio de email...\n');

  const emailService = new EmailService();
  
  const testData = {
    name: "Juan",
    surname: "Pérez",
    email: "juan.perez@ejemplo.com",
    phone: "612345678",
    service: "Web Corporativa",
    budget: "1.000€ - 2.000€",
    profession: "Abogado",
    hasWebsite: "No",
    ideaDescription: "Quiero una web profesional para mi despacho de abogados"
  };

  try {
    console.log('📧 Enviando email de prueba...');
    const result = await emailService.sendContactEmail(testData);
    
    console.log('\n✅ Resultado:');
    console.log('Éxito:', result.success);
    console.log('Mensaje:', result.message);
    
    if (result.success) {
      console.log('\n🎉 ¡El servicio de email funciona correctamente!');
    } else {
      console.log('\n❌ Error en el servicio de email');
    }
  } catch (error) {
    console.error('\n💥 Error durante la prueba:', error);
  }
}

testEmailService(); 