"use client"

import { useState, useEffect } from "react"
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  Minus,
  Calculator,
  Sparkles,
  Globe,
  Smartphone,
  FileText,
  ImageIcon,
  Mail,
  Users,
  Calendar,
  MessageCircle,
  Server,
  Shield,
  BarChart3,
  ShoppingCart,
  Zap,
  AlertCircle,
} from "lucide-react"
import { motion } from "framer-motion"
import BudgetRequestModal from "@/components/BudgetRequestModal"
import ContactWarningModal from "@/components/ContactWarningModal"

/**
 * 𝗩𝗘𝗥𝗦𝗜Ó𝗡 2025 · Tabla de precios low‑cost optimizada
 * –––––––––––––––––––––––––––––––––––––––––––––––––––––––––
 *  Inclusiones gratuitas en todos los proyectos:
 *    • Dominio 1º año, SSL, Hosting 1º año (valor 60 €)
 *    • Google Analytics básico + reCAPTCHA + botón WhatsApp + mapa Google
 *    • 1‑5 cuentas de e‑mail corporativo, SEO on‑page básico
 *  Extras con precio ajustado para máxima competitividad en Sevilla/Andalucía.
 */

interface Service {
  id: string
  name: string
  description: string
  price: number
  included?: boolean
  icon?: any
  popular?: boolean
  tag?: string
  // Nuevas propiedades para cantidades y descuentos
  allowQuantity?: boolean        // Si permite múltiples cantidades
  maxQuantity?: number          // Cantidad máxima permitida
  minQuantity?: number          // Cantidad mínima (default: 1)
  volumeDiscount?: {            // Descuentos por volumen
    threshold: number           // Cantidad para aplicar descuento
    percentage: number          // Porcentaje de descuento
  }
}

interface PlanStep {
  id: number
  title: string
  subtitle: string
  services: Service[]
}

interface Bundle {
  id: string
  name: string
  servicesIncluded: string[]
  price: number
  description: string
  savings: number
}

// ──────────────────────────────────────────────────────────
// PACKS REVISADOS
// ──────────────────────────────────────────────────────────
const bundles: Bundle[] = [
  {
    id: "pack-experto",
    name: "Kit Experto",
    servicesIncluded: [
      "basic",
      "blog",
      "contact-form",
      "chat",
      "seo-basic",
      "hosting",
    ],
    price: 750,
    description: "Todo lo que necesita un negocio digital moderno (ahorro incluido)",
    savings: 220,
  },
  {
    id: "pack-ecommerce",
    name: "Kit E-commerce",
    servicesIncluded: [
      "basic",
      "ecommerce-basic",
      "whatsapp-integration",
      "hosting",
      "ssl",
    ],
    price: 550,
    description: "Perfecto para vender online desde el primer día",
    savings: 200,
  },
]

// ──────────────────────────────────────────────────────────
// PLANES Y SERVICIOS ACTUALIZADOS
// ──────────────────────────────────────────────────────────
const planSteps: PlanStep[] = [
  {
    id: 1,
    title: "Tipo de Proyecto",
    subtitle: "Selecciona la base de tu proyecto digital",
    services: [
      {
        id: "basic",
        name: "Sitio Web",
        description: "Web profesional (3‑5 secciones) con dominio + hosting + SSL 1º año",
        price: 300,
        icon: Globe,
        popular: true,
        tag: "Ideal para la mayoría",
      },
      {
        id: "app",
        name: "Aplicación móvil",
        description: "App nativa/híbrida básica iOS + Android (WebView/PWA)",
        price: 400,
        icon: Smartphone,
        tag: "Nivel avanzado",
      },
    ],
  },
  {
    id: 2,
    title: "Páginas & Contenido",
    subtitle: "Expande tu proyecto con contenido adicional",
    services: [
      {
        id: "extra-page",
        name: "Página adicional",
        description: "Sección extra sencilla de texto/imagen",
        price: 50,
        icon: FileText,
        allowQuantity: true,
        maxQuantity: 20,
        minQuantity: 1,
        volumeDiscount: {
          threshold: 5,
          percentage: 10,
        },
      },
      {
        id: "blog",
        name: "Blog profesional (CMS + SEO)",
        description: "CMS optimizado SEO para publicar artículos",
        price: 125,
        icon: FileText,
        popular: true,
        tag: "Potencia tu SEO",
      },
      {
        id: "portfolio",
        name: "Galería / Portfolio",
        description: "Showcase visual con filtros y lightbox",
        price: 100,
        icon: ImageIcon,
        tag: "Para creativos",
      },
      {
        id: "landing-camp",
        name: "Landing para campañas",
        description: "Página de conversión 100 % optimizada Ads",
        price: 100,
        icon: Zap,
        tag: "Campañas PPC",
      },
      {
        id: "client-area",
        name: "Área de clientes",
        description: "Zona privada con login y contenidos restringidos",
        price: 200,
        icon: Shield,
        tag: "Premium",
      },
      {
        id: "calendar",
        name: "Calendario de eventos",
        description: "Muestra tus eventos o disponibilidad en un calendario visual",
        price: 100,
        icon: Calendar,
      },
    ],
  },
  {
    id: 3,
    title: "Funcionalidades Web",
    subtitle: "Mejoras visuales e interactivas para tu sitio",
    services: [
      {
        id: "contact-form",
        name: "Contacto avanzado",
        description: "Formularios inteligentes con autorespuesta y validación",
        price: 100,
        icon: Mail,
      },
      {
        id: "newsletter",
        name: "Newsletter / Email marketing",
        description: "Sistema de newsletter + plantilla base",
        price: 100,
        icon: Users,
        popular: true,
        tag: "Capta leads",
      },
      {
        id: "booking",
        name: "Sistema de reservas",
        description: "Agenda online con recordatorios y pago opcional",
        price: 250,
        icon: Calendar,
        tag: "Reservas",
      },
      {
        id: "chat",
        name: "Chat en vivo / Chatbot",
        description: "Widget de chat (WhatsApp, Tawk.to, ChatGPT bot)",
        price: 50,
        icon: MessageCircle,
      },
      {
        id: "ecommerce-basic",
        name: "Tienda online",
        description: "Catálogo hasta 25 productos + pasarela Stripe/Redsys",
        price: 200,
        icon: ShoppingCart,
        popular: true,
        tag: "Vende online",
      },
      {
        id: "google-map",
        name: "Mapa interactivo",
        description: "Mapa Google con tu ubicación (incluido)",
        price: 0,
        included: true,
        icon: Globe,
      },
    ],
  },
  {
    id: 4,
    title: "Funciones Avanzadas",
    subtitle: "Automatización, IA e integraciones",
    services: [
      {
        id: "ai-chatbot",
        name: "Chatbot con IA",
        description: "Asistente conversacional inteligente integrado en tu web. Precio según complejidad y volumen.",
        price: 0,
        icon: Sparkles,
        tag: "IA avanzada",
      },
      {
        id: "invoices",
        name: "Facturación / Presupuestos",
        description: "Sistema para emitir presupuestos o facturas en PDF automáticamente",
        price: 200,
        icon: FileText,
        tag: "Ideal para autónomos",
      },
      {
        id: "multilang",
        name: "Web multidioma",
        description: "Versión en varios idiomas con selector",
        price: 200,
        icon: Globe,
        tag: "Internacional",
      },
      {
        id: "integrations",
        name: "Integraciones personalizadas",
        description: "Conecta tu web con Stripe (pagos), Google Calendar (citas), Mailchimp (emails), Airtable (datos) y otras herramientas externas",
        price: 150,
        icon: Zap,
        tag: "Automatiza",
      },
      {
        id: "whatsapp-integration",
        name: "Botón WhatsApp Business",
        description: "Botón flotante con mensaje pre‑cargado (incluido)",
        price: 0,
        included: true,
        icon: MessageCircle,
      },
    ],
  },
  {
    id: 5,
    title: "Infraestructura Técnica",
    subtitle: "Base sólida para tu web",
    services: [
      {
        id: "hosting",
        name: "Hosting (2º año)",
        description: "Servidor optimizado. Renovación automática opcional. 60 €/año.",
        price: 60,
        icon: Server,
        popular: true,
      },
      {
        id: "seo-basic",
        name: "SEO avanzado inicial",
        description: "Keyword research + optimización técnica",
        price: 150,
        icon: BarChart3,
        tag: "Impulsa visibilidad",
      },
      {
        id: "backup",
        name: "Backups automáticos",
        description: "Copias diarias externas",
        price: 50,
        icon: Server,
        tag: "Seguridad",
      },
    ],
  },

];


// ──────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL – lógicas intactas
// ──────────────────────────────────────────────────────────
export default function CreatePlanPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState<{ [key: string]: number }>({})
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null)
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false)
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  })
  const [showContactWarning, setShowContactWarning] = useState(false)

  // Estado para servicios adicionales
  const [additionalServicesPage, setAdditionalServicesPage] = useState(1)
  const [additionalServicesSearch, setAdditionalServicesSearch] = useState("")
  const servicesPerPage = 8

  // Resetear página cuando cambian los servicios disponibles
  useEffect(() => {
    const totalPages = getTotalPages()
    if (additionalServicesPage > totalPages && totalPages > 0) {
      setAdditionalServicesPage(totalPages)
    }
  }, [selectedServices, additionalServicesSearch])

  // ─ Helper functions sin cambios salvo precios recomendaciones ─
  const selectBundle = (bundleId: string) => {
    const bundle = bundles.find((b) => b.id === bundleId)
    if (bundle) {
      const newServices: { [key: string]: number } = {}
      
      // Añadir servicios del bundle
      bundle.servicesIncluded.forEach((serviceId) => {
        newServices[serviceId] = 1
      })
      
      // Añadir automáticamente solo los servicios incluidos que NO están en el bundle
      getAllIncludedServices()
        .filter(service => !bundle.servicesIncluded.includes(service.id))
        .forEach(service => {
          newServices[service.id] = 1
        })
      
      setSelectedServices(newServices)
      setSelectedBundle(bundleId)
      setCurrentStep(planSteps.length + 1)
    }
  }

  const toggleService = (serviceId: string, price: number) => {
    setSelectedBundle(null)
    setSelectedServices((prev) => {
      const newServices = { ...prev }

      if (currentStep === 1) {
        if (newServices[serviceId]) {
          delete newServices[serviceId]
        } else {
          const firstStepServices = planSteps[0].services.map((s) => s.id)
          firstStepServices.forEach((id) => delete newServices[id])
          newServices[serviceId] = 1
          
          // Añadir automáticamente solo los servicios incluidos que no están ya seleccionados
          getAllIncludedServices()
            .filter(service => !newServices[service.id])
            .forEach(service => {
              newServices[service.id] = 1
            })
        }
        return newServices
      }

      if (newServices[serviceId]) {
        delete newServices[serviceId]
      } else {
        newServices[serviceId] = 1
        
        // Añadir automáticamente solo los servicios incluidos que no están ya
        getAllIncludedServices()
          .filter(service => !newServices[service.id])
          .forEach(service => {
            newServices[service.id] = 1
          })
      }
      return newServices
    })
  }

  const updateServiceQuantity = (serviceId: string, price: number, change: number) => {
    setSelectedBundle(null)
    setSelectedServices((prev) => {
      const newServices = { ...prev }
      const currentQuantity = newServices[serviceId] || 0
      const service = planSteps.flatMap((step) => step.services).find((s) => s.id === serviceId)
      
      // Validaciones mejoradas
      const minQuantity = service?.minQuantity || 1
      const maxQuantity = service?.maxQuantity || 99
      const newQuantity = Math.max(minQuantity, Math.min(maxQuantity, currentQuantity + change))

      if (newQuantity === 0) {
        delete newServices[serviceId]
      } else {
        newServices[serviceId] = newQuantity
      }
      return newServices
    })
  }

  const calculateTotal = () => {
    if (selectedBundle) {
      const bundle = bundles.find((b) => b.id === selectedBundle)
      return bundle?.price || 0
    }

    let total = 0
    Object.entries(selectedServices).forEach(([serviceId, quantity]) => {
      const service = planSteps.flatMap((step) => step.services).find((s) => s.id === serviceId)
      if (service && !service.included) { // No incluir servicios gratuitos en el cálculo
        total += service.price // Ahora siempre es 1 elemento, no hay cantidades
      }
    })
    return total
  }

  const getSelectedServicesDetails = () => {
    // Crear un Set para rastrear servicios ya procesados
    const processedServices = new Set<string>()
    const result: any[] = []

    // Primero, procesar servicios seleccionados manualmente
    Object.entries(selectedServices).forEach(([serviceId, quantity]) => {
      const service = planSteps.flatMap((step) => step.services).find((s) => s.id === serviceId)
      if (service) {
        result.push({ ...service, quantity: 1 }) // Siempre cantidad 1
        processedServices.add(serviceId)
      }
    })

    // Luego, añadir servicios incluidos que no han sido procesados
    planSteps.flatMap((step) => step.services)
      .filter(service => service.included && !processedServices.has(service.id))
      .forEach(service => {
        result.push({ ...service, quantity: 1, included: true })
        processedServices.add(service.id)
      })

    return result
  }

  // Funciones auxiliares
  const isValidQuantity = (service: Service, quantity: number) => {
    const min = service.minQuantity || 1
    const max = service.maxQuantity || 99
    return quantity >= min && quantity <= max
  }

  // Función para obtener todos los servicios incluidos
  const getAllIncludedServices = () => {
    return planSteps.flatMap((step) => step.services)
      .filter(service => service.included)
  }

  const getRecommendations = () => {
    const recommendations = [] as { service: string; name: string; price: number; reason: string }[]
    const selectedIds = Object.keys(selectedServices)

    if (!selectedIds.includes("chat") && !selectedIds.includes("whatsapp-integration")) {
      recommendations.push({
        service: "chat",
        name: "Chat en Vivo",
        price: 50,
        reason: "para atención inmediata al cliente",
      })
    }

    if (!selectedIds.includes("seo-basic")) {
      recommendations.push({
        service: "seo-basic",
        name: "SEO avanzado",
        price: 150,
        reason: "para que te encuentren en Google",
      })
    }

    if (!selectedIds.includes("backup") && selectedIds.length > 2) {
      recommendations.push({
        service: "backup",
        name: "Backups automáticos",
        price: 50,
        reason: "para proteger tu inversión",
      })
    }

    return recommendations.slice(0, 2)
  }

  const nextStep = () => {
    // No permitir avanzar del paso 1 hasta que se seleccione web o app
    if (currentStep === 1) {
      const hasWebOrApp = selectedServices["basic"] > 0 || selectedServices["mobile-app"] > 0
      if (!hasWebOrApp) {
        return // No hacer nada si no se ha seleccionado web o app
      }
    }
    
    if (currentStep < planSteps.length + 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / (planSteps.length + 1)) * 100

  const handleBudgetSubmit = async (budgetData: any) => {
    try {
      // Actualizar datos de contacto si se proporcionan
      if (budgetData.name && budgetData.email && budgetData.phone) {
        setContactData({
          name: budgetData.name,
          email: budgetData.email,
          phone: budgetData.phone,
          company: budgetData.company || ""
        })
      }

      const response = await fetch("/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(budgetData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error enviando la solicitud de presupuesto");
      }

      return result;
    } catch (error) {
      console.error("Error enviando presupuesto:", error);
      throw error;
    }
  };

  const isContactDataComplete = () => {
    const isComplete = contactData.name.trim() !== "" && 
           contactData.email.trim() !== "" && 
           contactData.phone.trim() !== ""
    console.log("Contact data complete:", isComplete, contactData)
    return isComplete
  }

  const handleRequestBudget = () => {
    console.log("Request budget clicked, contact data complete:", isContactDataComplete())
    if (!isContactDataComplete()) {
      console.log("Opening contact warning modal")
      setShowContactWarning(true)
      return
    }
    console.log("Opening budget modal")
    setIsBudgetModalOpen(true)
  }

  const handleAddContactData = () => {
    setShowContactWarning(false)
    setIsBudgetModalOpen(true)
  }

  // Nueva función para eliminar servicios del presupuesto
  const removeService = (serviceId: string) => {
    setSelectedServices((prev) => {
      const newServices = { ...prev }
      delete newServices[serviceId]
      return newServices
    })
  }

  // Nueva función para obtener todos los servicios disponibles (sin filtro de búsqueda)
  const getAllAvailableServices = () => {
    return planSteps.flatMap((step) => step.services)
      .filter(service => !service.included && !selectedServices[service.id])
  }

  // Función para normalizar texto (quitar tildes y caracteres especiales)
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Quitar tildes
      .replace(/[^a-z0-9\s]/g, '') // Quitar caracteres especiales excepto espacios
      .replace(/\s+/g, ' ') // Normalizar espacios
      .trim()
  }

  // Nueva función para obtener todos los servicios disponibles (no incluidos automáticamente)
  const getAvailableServices = () => {
    let services = getAllAvailableServices()
    
    // Filtrar por búsqueda si hay texto
    if (additionalServicesSearch.trim()) {
      const normalizedSearchTerm = normalizeText(additionalServicesSearch)
      services = services.filter(service => {
        const normalizedName = normalizeText(service.name)
        const normalizedDescription = normalizeText(service.description)
        const normalizedTag = service.tag ? normalizeText(service.tag) : ''
        
        return normalizedName.includes(normalizedSearchTerm) ||
               normalizedDescription.includes(normalizedSearchTerm) ||
               normalizedTag.includes(normalizedSearchTerm)
      })
    }
    
    return services
  }

  // Función para obtener servicios paginados
  const getPaginatedAvailableServices = () => {
    const allServices = getAvailableServices()
    const startIndex = (additionalServicesPage - 1) * servicesPerPage
    const endIndex = startIndex + servicesPerPage
    return allServices.slice(startIndex, endIndex)
  }

  // Función para obtener el total de páginas
  const getTotalPages = () => {
    const totalServices = getAvailableServices().length
    return Math.ceil(totalServices / servicesPerPage)
  }

  if (currentStep > planSteps.length) {
    const recommendations = getRecommendations()

    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-2xl mx-auto mb-4 sm:mb-6 lg:mb-8 flex items-center justify-center shadow-xl">
                <Sparkles className="text-slate-800" size={24} />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 text-white tracking-tight">Resumen del Proyecto</h1>
              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-light px-4">
                {selectedBundle ? "Kit seleccionado" : "Tu configuración personalizada está lista"}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {/* Resumen de servicios */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10">
                <h2 className="text-xl sm:text-2xl font-light mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center text-white">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
                    <Calculator className="text-slate-800" size={20} />
                  </div>
                  <span className="text-center sm:text-left">
                    {selectedBundle ? "Kit Seleccionado" : "Servicios Seleccionados"}
                  </span>
                </h2>

                {/* Información de servicios incluidos */}
                <div className="mb-6 p-3 sm:p-4 bg-green-500/10 border border-green-400/20 rounded-2xl">
                  <div className="flex items-center mb-2">
                    <Check className="text-green-400 mr-2 flex-shrink-0" size={20} />
                    <span className="text-green-400 font-medium text-sm sm:text-base">Servicios Incluidos Automáticamente</span>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm mb-2">
                    Todos los proyectos incluyen gratuitamente: dominio 1º año, SSL, hosting 1º año, Analytics GA4, 
                    botón WhatsApp, mapa Google, reCAPTCHA y hasta 5 emails corporativos.
                  </p>
                  <p className="text-green-400 text-xs sm:text-sm">
                    Valor total de inclusiones: 60€
                  </p>
                </div>

                {selectedBundle && (
                  <div className="mb-6 p-3 sm:p-4 bg-blue-500/10 border border-blue-400/20 rounded-2xl">
                    <div className="flex items-center mb-2">
                      <Sparkles className="text-blue-400 mr-2 flex-shrink-0" size={20} />
                      <span className="text-blue-400 font-medium text-sm sm:text-base">
                        {bundles.find((b) => b.id === selectedBundle)?.name}
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs sm:text-sm">
                      {bundles.find((b) => b.id === selectedBundle)?.description}
                    </p>
                    <p className="text-green-400 text-xs sm:text-sm mt-2">
                      Ahorras {bundles.find((b) => b.id === selectedBundle)?.savings}€ con este pack
                    </p>
                  </div>
                )}

                <div className="space-y-3 sm:space-y-4">
                  {getSelectedServicesDetails().map((service) => (
                    <div
                      key={service?.id}
                      className={`rounded-2xl p-3 sm:p-4 lg:p-6 border transition-colors ${
                        service?.included 
                          ? 'bg-green-500/10 border-green-400/20' 
                          : 'bg-white/5 border-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {service?.icon && (
                              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${
                                service?.included ? 'bg-green-500' : 'bg-slate-100'
                              }`}>
                                <service.icon className={service?.included ? 'text-white' : 'text-slate-800'} size={14} />
                              </div>
                            )}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                              <h3 className="font-medium text-white text-sm sm:text-base">{service?.name}</h3>
                              {service?.included && (
                                <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full w-fit">
                                  Incluido
                                </span>
                              )}
                              {service?.tag && !service?.included && (
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full w-fit">
                                  {service.tag}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{service?.description}</p>
                        </div>
                        <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-end gap-4 sm:gap-2 sm:ml-6">
                          {!selectedBundle && !service?.included && (
                            <button
                              onClick={() => removeService(service?.id || "")}
                              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 rounded-lg text-xs font-medium transition-colors"
                            >
                              Eliminar
                            </button>
                          )}
                          <div className="text-right min-w-[80px]">
                            {service?.included ? (
                              <span className="font-semibold text-base sm:text-lg text-green-400">
                                Incluido
                              </span>
                            ) : selectedBundle ? (
                              <span className="font-semibold text-base sm:text-lg text-white">
                                {/* Sin precio en kits */}
                              </span>
                            ) : (
                              <div className="text-right">
                                <span className="font-semibold text-base sm:text-lg text-white">
                                  {service?.price?.toLocaleString()}€
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recomendaciones */}
                {recommendations.length > 0 && !selectedBundle && (
                  <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-amber-500/10 border border-amber-400/20 rounded-2xl">
                    <div className="flex items-center mb-4">
                      <AlertCircle className="text-amber-400 mr-2 flex-shrink-0" size={20} />
                      <h3 className="text-amber-400 font-medium text-sm sm:text-base">¿Sabías que puedes mejorar aún más tu proyecto?</h3>
                    </div>
                    <p className="text-slate-300 text-xs sm:text-sm mb-4">Te recomendamos añadir:</p>
                    <div className="space-y-2">
                      {recommendations.map((rec) => (
                        <div key={rec.service} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs sm:text-sm">
                          <span className="text-slate-300">
                            • {rec.name} {rec.reason} ({rec.price}€)
                          </span>
                          <button
                            onClick={() => toggleService(rec.service, rec.price)}
                            className="text-amber-400 hover:text-amber-300 font-medium w-fit"
                          >
                            Añadir
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Total y CTA */}
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-slate-800 rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-700">
                  <h2 className="text-xl sm:text-2xl font-light mb-4 text-white">Inversión Total</h2>
                  <div className="text-4xl sm:text-5xl font-light mb-4 sm:mb-6 text-white">{calculateTotal().toLocaleString()}€</div>
                  <p className="text-slate-400 mb-4 sm:mb-6 text-sm sm:text-base">
                    {selectedBundle ? "Precio del kit seleccionado" : "Precio final de tu proyecto personalizado"}
                  </p>
                  
                  {/* Estado de datos de contacto */}
                  <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-2xl border ${
                    isContactDataComplete() 
                      ? 'bg-green-500/10 border-green-400/20' 
                      : 'bg-amber-500/10 border-amber-400/20'
                  }`}>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 flex-shrink-0 ${
                        isContactDataComplete() ? 'bg-green-400' : 'bg-amber-400'
                      }`}></div>
                      <span className={`text-xs sm:text-sm font-medium ${
                        isContactDataComplete() ? 'text-green-300' : 'text-amber-300'
                      }`}>
                        {isContactDataComplete() 
                          ? '✅ Datos de contacto completos' 
                          : '⚠️ Faltan datos de contacto'
                        }
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <button 
                      onClick={handleRequestBudget}
                      className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-2xl font-medium transition-colors text-sm sm:text-base ${
                        isContactDataComplete() 
                          ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                          : 'bg-amber-500 hover:bg-amber-400 text-white'
                      }`}
                    >
                      {isContactDataComplete() ? 'Solicitar Presupuesto' : 'Solicitar Presupuesto (Faltan Datos)'}
                    </button>
                    <button
                      onClick={() => setIsBudgetModalOpen(true)}
                      className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-2xl font-medium transition-colors text-sm sm:text-base"
                    >
                      Añadir Datos
                    </button>
                  </div>

                  {/* Información de mantenimiento */}
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-700">
                    <p className="text-slate-400 text-xs sm:text-sm mb-3">
                      <strong className="text-white">Incluido en el precio:</strong> Diseño personalizado y profesional, 
                      desarrollo movil optimizado, 30 días de soporte técnico*, dominio**, formación para gestión autónoma, 
                      configuración y lanzamiento completo.
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm">
                      *Incluye <strong className="text-white">30 días de mantenimiento gratuito</strong> tras la entrega.{" "}
                      Después, puedes contratar nuestro plan de soporte técnico por solo{" "}
                      <strong className="text-white">20 €/mes</strong>, que cubre actualizaciones, seguridad,
                      correcciones, mejoras y asistencia.<br />
                      **Incluye <strong className="text-white">dominio 1º año.</strong>. La renovación aprox. 15€/año.
                    </p>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 border border-slate-700/50">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium mb-2 text-white">Precio Actual</h3>
                      <p className="text-slate-400 text-sm sm:text-base">{Object.keys(selectedServices).length} servicios seleccionados</p>
                    </div>
                    <div className="text-center sm:text-right">
                      <div className="text-3xl sm:text-4xl font-light text-white">{calculateTotal().toLocaleString()}€</div>
                    </div>
                  </div>
                </div>

                {/* Servicios adicionales disponibles */}
                {!selectedBundle && getAllAvailableServices().length > 0 && (
                  <div className="bg-blue-500/10 border border-blue-400/20 rounded-3xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                      <div className="flex items-center">
                        <Plus className="text-blue-400 mr-2 flex-shrink-0" size={20} />
                        <h3 className="text-blue-400 font-medium text-sm sm:text-base">¿Quieres añadir algo más?</h3>
                      </div>
                      <span className="text-slate-400 text-xs sm:text-sm">
                        {getAllAvailableServices().length} servicios disponibles
                      </span>
                    </div>
                    
                    {/* Buscador */}
                    <div className="mb-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Buscar servicios..."
                          value={additionalServicesSearch}
                          onChange={(e) => {
                            setAdditionalServicesSearch(e.target.value)
                            setAdditionalServicesPage(1) // Reset a la primera página al buscar
                          }}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400/50 transition-colors text-sm"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Grid de servicios */}
                    {getPaginatedAvailableServices().length > 0 && (
                      <div className="space-y-3 mb-4">
                        {getPaginatedAvailableServices().map((service) => (
                          <div key={service.id} className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div className="flex items-start flex-1 gap-3">
                                {service.icon && (
                                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                                    <service.icon className="text-slate-800" size={14} />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                    <h4 className="text-white font-medium text-sm">{service.name}</h4>
                                    {service.tag && (
                                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full w-fit">
                                        {service.tag}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-slate-400 text-xs leading-relaxed">{service.description}</p>
                                </div>
                              </div>
                              <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-end gap-3 sm:gap-2 sm:ml-4">
                                <span className="text-white font-semibold text-sm">{service.price}€</span>
                                <button
                                  onClick={() => toggleService(service.id, service.price)}
                                  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-lg font-medium transition-colors"
                                >
                                  Añadir
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Paginación */}
                    {getTotalPages() > 1 && (
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => setAdditionalServicesPage(prev => Math.max(1, prev - 1))}
                          disabled={additionalServicesPage === 1}
                          className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Anterior
                        </button>
                        
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: getTotalPages() }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => setAdditionalServicesPage(page)}
                              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                additionalServicesPage === page
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-slate-700 hover:bg-slate-600 text-white'
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                        </div>
                        
                        <button
                          onClick={() => setAdditionalServicesPage(prev => Math.min(getTotalPages(), prev + 1))}
                          disabled={additionalServicesPage === getTotalPages()}
                          className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Siguiente
                        </button>
                      </div>
                    )}

                    {/* Mensaje cuando no hay resultados */}
                    {getAvailableServices().length === 0 && additionalServicesSearch.trim() && (
                      <div className="text-center py-4">
                        <p className="text-slate-400 text-xs mb-2">No se encontraron servicios que coincidan con tu búsqueda</p>
                        <button
                          onClick={() => setAdditionalServicesSearch("")}
                          className="text-blue-400 hover:text-blue-300 text-xs font-medium"
                        >
                          Limpiar búsqueda
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modales */}
        <BudgetRequestModal
          isOpen={isBudgetModalOpen}
          onClose={() => setIsBudgetModalOpen(false)}
          onSubmit={handleBudgetSubmit}
          selectedServices={selectedServices}
          selectedBundle={selectedBundle}
          totalPrice={calculateTotal()}
          servicesDetails={getSelectedServicesDetails()}
          contactData={contactData}
        />

        <ContactWarningModal
          isOpen={showContactWarning}
          onClose={() => setShowContactWarning(false)}
          onAddContactData={handleAddContactData}
        />
      </motion.div>
    )
  }

  const currentStepData = planSteps[currentStep - 1]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Progress Bar */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
            <span className="text-slate-300 font-medium text-sm sm:text-base">
              Paso {currentStep} de {planSteps.length + 1}
            </span>
            <span className="text-slate-300 bg-slate-700/50 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm w-fit">
              {Math.round(progress)}% completado
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Bundles en el primer paso */}
          {currentStep === 1 && (
            <div className="mb-8 sm:mb-12 lg:mb-16">
              <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 text-white tracking-tight">Kits Prediseñados</h1>
                <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed px-4">
                  Ahorra tiempo y dinero con nuestros paquetes optimizados
                </p>
              </div>
              <div className="grid gap-4 sm:gap-6 max-w-4xl mx-auto mb-8 sm:mb-12">
                {bundles.map((bundle) => (
                  <div
                    key={bundle.id}
                    className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-4 sm:p-6 lg:p-8 border border-blue-400/20 cursor-pointer hover:border-blue-400/40 transition-all group"
                    onClick={() => selectBundle(bundle.id)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                      <h3 className="text-lg sm:text-xl font-medium text-white">{bundle.name}</h3>
                      <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium w-fit">
                        Ahorra {bundle.savings}€
                      </div>
                    </div>
                    <p className="text-slate-300 mb-4 sm:mb-6 text-sm sm:text-base">{bundle.description}</p>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div className="text-2xl sm:text-3xl font-light text-white">{bundle.price.toLocaleString()}€</div>
                      <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-xl font-medium transition-colors group-hover:scale-105 text-sm sm:text-base w-fit">
                        Seleccionar Kit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <div className="inline-flex items-center text-slate-400 text-sm">
                  <div className="w-8 sm:w-12 h-px bg-slate-600 mr-2 sm:mr-4"></div>
                  <span>O configura tu proyecto paso a paso</span>
                  <div className="w-8 sm:w-12 h-px bg-slate-600 ml-2 sm:ml-4"></div>
                </div>
              </div>
            </div>
          )}

          {/* Step Header */}
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-2xl mx-auto mb-4 sm:mb-6 lg:mb-8 flex items-center justify-center text-slate-800 text-lg sm:text-2xl font-light shadow-xl">
              {currentStep}
            </div>
            
            {/* Título con botones de navegación */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center px-3 sm:px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <ArrowLeft className="mr-1 sm:mr-2" size={16} />
                  <span className="hidden sm:inline">Anterior</span>
                  <span className="sm:hidden">Ant</span>
                </button>
                
                <button
                  onClick={nextStep}
                  disabled={currentStep === 1 && !(selectedServices["basic"] > 0 || selectedServices["mobile-app"] > 0)}
                  className="flex items-center px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">{currentStep === planSteps.length ? "Ver Resumen" : "Siguiente"}</span>
                  <span className="sm:hidden">{currentStep === planSteps.length ? "Resumen" : "Sig"}</span>
                  <ArrowRight className="ml-1 sm:ml-2" size={16} />
                </button>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight text-center">
                {currentStepData.title}
              </h1>
            </div>
            
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed text-center mb-6 sm:mb-8 px-4">
              {currentStepData.subtitle}
            </p>
          </div>

          {/* Services Grid */}
          <div
            className={`grid gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16 ${
              currentStep === 1 
                ? "grid-cols-1 max-w-4xl mx-auto" 
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {currentStepData.services
              .filter(service => !service.included) // Filtrar servicios incluidos
              .map((service) => {
              const isSelected = selectedServices[service.id] > 0
              const quantity = selectedServices[service.id] || 0
              const IconComponent = service.icon

              return (
                <div
                  key={service.id}
                  className={`group cursor-pointer transition-all duration-300 h-full ${
                    currentStep === 1 ? "hover:scale-[1.02]" : "hover:scale-[1.02]"
                  }`}
                  onClick={() => toggleService(service.id, service.price)}
                >
                  <div
                    className={`bg-white/5 backdrop-blur-sm rounded-3xl p-4 sm:p-6 border transition-all duration-300 hover:bg-white/10 h-full flex flex-col relative ${
                      isSelected ? "border-blue-400/50 bg-blue-500/10" : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    {/* Badge popular */}
                    {service.popular && (
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                        Popular
                      </div>
                    )}

                    {/* Header con icono y título */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center flex-1">
                        {IconComponent && (
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg flex-shrink-0 ${
                              isSelected ? "bg-blue-500" : "bg-slate-100"
                            }`}
                          >
                            <IconComponent className={isSelected ? "text-white" : "text-slate-800"} size={18} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-white mb-1 leading-tight">{service.name}</h3>
                          {service.tag && (
                            <span className="inline-block text-xs text-blue-300 bg-blue-500/20 px-2 py-1 rounded-full font-medium">
                              {service.tag}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Checkbox de selección */}
                      <div className="ml-2 sm:ml-4 flex-shrink-0">
                        {isSelected ? (
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                            <Check className="text-white" size={14} />
                          </div>
                        ) : (
                          <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-slate-600 rounded-full hover:border-slate-500 transition-colors"></div>
                        )}
                      </div>
                    </div>

                    {/* Descripción */}
                    <div className="flex-1 mb-4 sm:mb-6">
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{service.description}</p>
                    </div>

                    {/* Footer con precio y controles */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t border-white/5 gap-3 sm:gap-0">
                      <div className="text-xl sm:text-2xl font-bold text-white">{service.price.toLocaleString()}€</div>

                      {isSelected && service.allowQuantity && (
                        <div className="flex items-center justify-center sm:justify-end space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              updateServiceQuantity(service.id, service.price, -1)
                            }}
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
                          >
                            <Minus size={12} className="text-white" />
                          </button>
                          <span className="w-6 text-center font-medium text-white text-sm">{quantity}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              updateServiceQuantity(service.id, service.price, 1)
                            }}
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors"
                          >
                            <Plus size={12} className="text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Información de inclusiones en el primer paso */}
          {currentStep === 1 && (
            <div className="mt-6 sm:mt-8 max-w-2xl mx-auto mb-8 sm:mb-12">
              <div className="bg-green-500/10 border border-green-400/20 rounded-2xl p-4 sm:p-6">
                <div className="flex items-center justify-center mb-3">
                  <Check className="text-green-400 mr-2 flex-shrink-0" size={20} />
                  <span className="text-green-400 font-medium text-sm sm:text-base">¿Sabías que todos los proyectos incluyen?</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm text-slate-300">
                  <div>• Dominio 1º año</div>
                  <div>• SSL gratuito</div>
                  <div>• Hosting 1º año</div>
                  <div>• Google Analytics</div>
                  <div>• Botón WhatsApp</div>
                  <div>• Mapa Google</div>
                </div>
                <p className="text-green-400 text-xs sm:text-sm mt-3 font-medium">
                  Valor total de inclusiones: 150€
                </p>
              </div>
            </div>
          )}

          {/* Price Summary */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 border border-slate-700/50">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-2 text-white">Precio Actual</h3>
                <p className="text-slate-400 text-sm sm:text-base">{Object.keys(selectedServices).length} servicios seleccionados</p>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-3xl sm:text-4xl font-light text-white">{calculateTotal().toLocaleString()}€</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
