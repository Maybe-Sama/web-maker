// Test script para verificar el servicio de presupuestos
const { BudgetEmailService } = require('./lib/budget-email-service');

async function testBudgetService() {
  console.log('🧪 Probando el servicio de presupuestos...\n');

  const budgetEmailService = new BudgetEmailService();
  
  const testData = {
    name: "María García",
    email: "maria.garcia@empresa.com",
    phone: "612345678",
    company: "García & Asociados",
    selectedServices: {
      "basic": 1,
      "blog": 1,
      "contact-form": 1,
      "seo-basic": 1,
      "hosting": 1
    },
    totalPrice: 750,
    projectDescription: "Necesito una web profesional para mi despacho de abogados con blog y formulario de contacto",
    timeline: "Normal (3-4 semanas)",
    additionalRequirements: "Que sea muy profesional y con colores corporativos azul y dorado"
  };

  const servicesDetails = [
    {
      id: "basic",
      name: "Sitio Web",
      description: "Página web profesional y moderna para tu negocio",
      price: 300,
      quantity: 1
    },
    {
      id: "blog",
      name: "Blog Integrado",
      description: "Sistema completo de gestión de contenido",
      price: 200,
      quantity: 1
    },
    {
      id: "contact-form",
      name: "Contacto Avanzado",
      description: "Formularios inteligentes con notificaciones automáticas",
      price: 100,
      quantity: 1
    },
    {
      id: "seo-basic",
      name: "SEO Profesional",
      description: "Optimización para motores de búsqueda",
      price: 200,
      quantity: 1
    },
    {
      id: "hosting",
      name: "Hosting Premium",
      description: "Servidores optimizados con 99.9% uptime",
      price: 120,
      quantity: 1
    }
  ];

  try {
    console.log('💰 Enviando solicitud de presupuesto...');
    const result = await budgetEmailService.sendBudgetRequest(testData, servicesDetails);
    
    console.log('\n✅ Resultado:');
    console.log('Éxito:', result.success);
    console.log('Mensaje:', result.message);
    
    if (result.success) {
      console.log('\n🎉 ¡El servicio de presupuestos funciona correctamente!');
    } else {
      console.log('\n❌ Error en el servicio de presupuestos');
    }
  } catch (error) {
    console.error('\n💥 Error durante la prueba:', error);
  }
}

testBudgetService(); 