"use client"

import { useState } from "react"
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

interface Service {
  id: string
  name: string
  description: string
  price: number
  included?: boolean
  icon?: any
  popular?: boolean
  tag?: string
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

const bundles: Bundle[] = [
  {
    id: "pack-experto",
    name: "Kit Experto",
    servicesIncluded: ["basic", "blog", "contact-form", "chat", "seo-basic", "hosting", "analytics"],
    price: 950,
    description: "Todo lo que necesita un negocio digital moderno",
    savings: 220,
  },
  {
    id: "pack-ecommerce",
    name: "Kit E-commerce",
    servicesIncluded: ["basic", "ecommerce-basic", "whatsapp-integration", "hosting", "ssl", "analytics"],
    price: 850,
    description: "Perfecto para vender online desde el primer día",
    savings: 180,
  },
]

const planSteps: PlanStep[] = [
  {
    id: 1,
    title: "Tipo de Proyecto",
    subtitle: "Selecciona la base de tu proyecto digital",
    services: [
      {
        id: "basic",
        name: "Sitio Web",
        description: "Página web profesional y moderna para tu negocio",
        price: 300,
        icon: Globe,
        popular: true,
        tag: "Ideal para la mayoría",
      },
      {
        id: "app",
        name: "Aplicación",
        description: "App móvil nativa para iOS y Android",
        price: 800,
        icon: Smartphone,
        tag: "Para proyectos avanzados",
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
        name: "Página Adicional",
        description: "Sección personalizada para tu contenido",
        price: 75,
        icon: FileText,
      },
      {
        id: "blog",
        name: "Blog Integrado",
        description: "Sistema completo de gestión de contenido",
        price: 200,
        icon: FileText,
        popular: true,
        tag: "Recomendado para SEO",
      },
      {
        id: "portfolio",
        name: "Galería Premium",
        description: "Showcase visual para tus mejores trabajos",
        price: 150,
        icon: ImageIcon,
        tag: "Perfecto para creativos",
      },
      {
        id: "landing-camp",
        name: "Landing para Campañas",
        description: "Página de conversión optimizada para campañas o promociones",
        price: 120,
        icon: Zap,
        tag: "Para campañas publicitarias",
      },
      {
        id: "client-area",
        name: "Área de Clientes",
        description: "Zona privada para acceso restringido con login",
        price: 250,
        icon: Shield,
        tag: "Ideal para academias",
      },
    ],
  },
  {
    id: 3,
    title: "Funcionalidades",
    subtitle: "Características que potenciarán tu proyecto",
    services: [
      {
        id: "contact-form",
        name: "Contacto Avanzado",
        description: "Formularios inteligentes con notificaciones automáticas",
        price: 100,
        icon: Mail,
      },
      {
        id: "newsletter",
        name: "Newsletter",
        description: "Sistema completo de email marketing",
        price: 150,
        icon: Users,
        popular: true,
        tag: "Recomendado para negocios",
      },
      {
        id: "booking",
        name: "Sistema de Reservas",
        description: "Gestión automática de citas y servicios",
        price: 300,
        icon: Calendar,
        tag: "Ideal para servicios",
      },
      {
        id: "chat",
        name: "Chat en Vivo",
        description: "Atención al cliente automatizada",
        price: 120,
        icon: MessageCircle,
      },
      {
        id: "ecommerce-basic",
        name: "Tienda Online",
        description: "Sistema de venta online con pasarela de pago integrada",
        price: 400,
        icon: ShoppingCart,
        popular: true,
        tag: "Para vender online",
      },
      {
        id: "whatsapp-integration",
        name: "WhatsApp Business",
        description: "Botón de contacto directo vía WhatsApp con mensaje personalizado",
        price: 100,
        icon: MessageCircle,
        tag: "Ideal para negocios físicos",
      },
      {
        id: "google-map",
        name: "Mapa Interactivo",
        description: "Mapa de ubicación integrado con Google Maps",
        price: 50,
        icon: Globe,
        tag: "Para negocios físicos",
      },
      {
        id: "zapier",
        name: "Automatizaciones (Zapier)",
        description: "Conecta tu web con más de 5000 apps para automatizar procesos",
        price: 150,
        icon: Sparkles,
        tag: "Para optimizar procesos",
      },
    ],
  },
  {
    id: 4,
    title: "Infraestructura",
    subtitle: "Servicios técnicos para un funcionamiento óptimo",
    services: [
      {
        id: "domain",
        name: "Dominio Personalizado",
        description: "Tu marca en internet con dominio propio",
        price: 50,
        icon: Globe,
      },
      {
        id: "hosting",
        name: "Hosting Premium",
        description: "Servidores optimizados con 99.9% uptime",
        price: 120,
        icon: Server,
        popular: true,
      },
      {
        id: "seo-basic",
        name: "SEO Profesional",
        description: "Optimización para motores de búsqueda",
        price: 200,
        icon: BarChart3,
        tag: "Esencial para visibilidad",
      },
      {
        id: "ssl",
        name: "Certificado SSL",
        description: "Seguridad y confianza para tus usuarios",
        price: 30,
        icon: Shield,
      },
      {
        id: "analytics",
        name: "Analytics Avanzado",
        description: "Métricas detalladas y reportes automáticos",
        price: 80,
        icon: BarChart3,
      },
      {
        id: "backup",
        name: "Backups Automáticos",
        description: "Copia de seguridad periódica para máxima tranquilidad",
        price: 100,
        icon: Server,
        tag: "Recomendado para seguridad",
      },
      {
        id: "spam-filter",
        name: "Antispam en Formularios",
        description: "Protección contra bots y spam en los formularios",
        price: 40,
        icon: Shield,
      },
      {
        id: "corporate-email",
        name: "Email Corporativo",
        description: "Correo profesional con dominio propio y configuración segura",
        price: 70,
        icon: Mail,
        tag: "Perfecto para autónomos",
      },
    ],
  },
]

export default function CreatePlanPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState<{ [key: string]: number }>({})
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null)

  const selectBundle = (bundleId: string) => {
    const bundle = bundles.find((b) => b.id === bundleId)
    if (bundle) {
      const newServices: { [key: string]: number } = {}
      bundle.servicesIncluded.forEach((serviceId) => {
        newServices[serviceId] = 1
      })
      setSelectedServices(newServices)
      setSelectedBundle(bundleId)
      setCurrentStep(planSteps.length + 1) // Ir directamente al resumen
    }
  }

  const toggleService = (serviceId: string, price: number) => {
    setSelectedBundle(null) // Limpiar bundle si se modifica manualmente
    setSelectedServices((prev) => {
      const newServices = { ...prev }

      if (currentStep === 1) {
        if (newServices[serviceId]) {
          delete newServices[serviceId]
        } else {
          const firstStepServices = planSteps[0].services.map((s) => s.id)
          firstStepServices.forEach((id) => delete newServices[id])
          newServices[serviceId] = 1
        }
        return newServices
      }

      if (newServices[serviceId]) {
        delete newServices[serviceId]
      } else {
        newServices[serviceId] = 1
      }
      return newServices
    })
  }

  const updateServiceQuantity = (serviceId: string, price: number, change: number) => {
    setSelectedBundle(null)
    setSelectedServices((prev) => {
      const newServices = { ...prev }
      const currentQuantity = newServices[serviceId] || 0
      const newQuantity = Math.max(0, currentQuantity + change)

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
      if (service) {
        total += service.price * quantity
      }
    })
    return total
  }

  const getSelectedServicesDetails = () => {
    return Object.entries(selectedServices)
      .map(([serviceId, quantity]) => {
        const service = planSteps.flatMap((step) => step.services).find((s) => s.id === serviceId)
        return service ? { ...service, quantity } : null
      })
      .filter(Boolean)
  }

  const getRecommendations = () => {
    const recommendations = []
    const selectedIds = Object.keys(selectedServices)

    if (!selectedIds.includes("chat") && !selectedIds.includes("whatsapp-integration")) {
      recommendations.push({
        service: "chat",
        name: "Chat en Vivo",
        price: 120,
        reason: "para atención inmediata al cliente",
      })
    }

    if (!selectedIds.includes("seo-basic")) {
      recommendations.push({
        service: "seo-basic",
        name: "SEO Profesional",
        price: 200,
        reason: "para que te encuentren en Google",
      })
    }

    if (!selectedIds.includes("backup") && selectedIds.length > 2) {
      recommendations.push({
        service: "backup",
        name: "Backups Automáticos",
        price: 100,
        reason: "para proteger tu inversión",
      })
    }

    return recommendations.slice(0, 2) // Máximo 2 recomendaciones
  }

  const nextStep = () => {
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

  if (currentStep > planSteps.length) {
    const recommendations = getRecommendations()

    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      >
        <div className="container-custom py-20">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="w-20 h-20 bg-slate-100 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-xl">
                <Sparkles className="text-slate-800" size={32} />
              </div>
              <h1 className="text-5xl md:text-6xl font-light mb-6 text-white tracking-tight">Resumen del Proyecto</h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
                {selectedBundle ? "Kit seleccionado" : "Tu configuración personalizada está lista"}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Resumen de servicios */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h2 className="text-2xl font-light mb-8 flex items-center text-white">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mr-4">
                    <Calculator className="text-slate-800" size={20} />
                  </div>
                  {selectedBundle ? "Kit Seleccionado" : "Servicios Seleccionados"}
                </h2>

                {selectedBundle && (
                  <div className="mb-6 p-4 bg-blue-500/10 border border-blue-400/20 rounded-2xl">
                    <div className="flex items-center mb-2">
                      <Sparkles className="text-blue-400 mr-2" size={20} />
                      <span className="text-blue-400 font-medium">
                        {bundles.find((b) => b.id === selectedBundle)?.name}
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      {bundles.find((b) => b.id === selectedBundle)?.description}
                    </p>
                    <p className="text-green-400 text-sm mt-2">
                      Ahorras {bundles.find((b) => b.id === selectedBundle)?.savings}€ con este pack
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {getSelectedServicesDetails().map((service) => (
                    <div
                      key={service?.id}
                      className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {service?.icon && (
                              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                                <service.icon className="text-slate-800" size={16} />
                              </div>
                            )}
                            <h3 className="font-medium text-white">{service?.name}</h3>
                            {service?.tag && (
                              <span className="ml-2 px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                                {service.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-slate-400 text-sm">{service?.description}</p>
                        </div>
                        <div className="flex items-center space-x-4 ml-6">
                          {!selectedBundle && (
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateServiceQuantity(service?.id || "", service?.price || 0, -1)}
                                className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
                              >
                                <Minus size={14} className="text-white" />
                              </button>
                              <span className="w-8 text-center font-medium text-white">{service?.quantity}</span>
                              <button
                                onClick={() => updateServiceQuantity(service?.id || "", service?.price || 0, 1)}
                                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors"
                              >
                                <Plus size={14} className="text-white" />
                              </button>
                            </div>
                          )}
                          <div className="text-right min-w-[80px]">
                            <span className="font-semibold text-white text-lg">
                              {selectedBundle
                                ? ""
                                : `${((service?.price || 0) * (service?.quantity || 0)).toLocaleString()}€`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recomendaciones */}
                {recommendations.length > 0 && !selectedBundle && (
                  <div className="mt-8 p-6 bg-amber-500/10 border border-amber-400/20 rounded-2xl">
                    <div className="flex items-center mb-4">
                      <AlertCircle className="text-amber-400 mr-2" size={20} />
                      <h3 className="text-amber-400 font-medium">¿Sabías que puedes mejorar aún más tu proyecto?</h3>
                    </div>
                    <p className="text-slate-300 text-sm mb-4">Te recomendamos añadir:</p>
                    <div className="space-y-2">
                      {recommendations.map((rec) => (
                        <div key={rec.service} className="flex justify-between items-center text-sm">
                          <span className="text-slate-300">
                            • {rec.name} {rec.reason} ({rec.price}€)
                          </span>
                          <button
                            onClick={() => toggleService(rec.service, rec.price)}
                            className="text-amber-400 hover:text-amber-300 font-medium"
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
              <div className="space-y-6">
                <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
                  <h2 className="text-2xl font-light mb-4 text-white">Inversión Total</h2>
                  <div className="text-5xl font-light mb-6 text-white">{calculateTotal().toLocaleString()}€</div>
                  <p className="text-slate-400 mb-8">
                    {selectedBundle ? "Precio del kit seleccionado" : "Precio final de tu proyecto personalizado"}
                  </p>
                  <div className="space-y-4">
                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 px-6 rounded-2xl font-medium transition-colors">
                      Solicitar Presupuesto
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBundle(null)
                        setCurrentStep(1)
                      }}
                      className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 px-6 rounded-2xl font-medium transition-colors"
                    >
                      Modificar Configuración
                    </button>
                  </div>

                  {/* Información de mantenimiento */}
                  <div className="mt-8 pt-6 border-t border-slate-700">
                    <p className="text-slate-400 text-sm">
                      Incluye <strong className="text-white">30 días de mantenimiento gratuito</strong> tras la entrega.{" "}
                      <br />
                      Después, puedes contratar nuestro plan de soporte técnico por solo{" "}
                      <strong className="text-white">20 €/mes</strong>, que cubre actualizaciones, seguridad,
                      correcciones, mejoras y asistencia.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                  <h3 className="font-medium mb-4 text-white">Incluido en el precio</h3>
                  <ul className="space-y-3">
                    {[
                      "Diseño personalizado y profesional",
                      "Desarrollo responsive optimizado",
                      "30 días de soporte técnico",
                      "Formación para gestión autónoma",
                      "Configuración y lanzamiento completo",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-slate-300">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        <div className="container-custom py-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-300 font-medium">
              Paso {currentStep} de {planSteps.length + 1}
            </span>
            <span className="text-slate-300 bg-slate-700/50 px-4 py-2 rounded-full text-sm">
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

      <div className="container-custom py-20">
        <div className="max-w-6xl mx-auto">
          {/* Bundles en el primer paso */}
          {currentStep === 1 && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-tight">Kits Prediseñados</h1>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
                  Ahorra tiempo y dinero con nuestros paquetes optimizados
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
                {bundles.map((bundle) => (
                  <div
                    key={bundle.id}
                    className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-8 border border-blue-400/20 cursor-pointer hover:border-blue-400/40 transition-all group"
                    onClick={() => selectBundle(bundle.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-medium text-white">{bundle.name}</h3>
                      <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                        Ahorra {bundle.savings}€
                      </div>
                    </div>
                    <p className="text-slate-300 mb-6">{bundle.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-3xl font-light text-white">{bundle.price.toLocaleString()}€</div>
                      <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-medium transition-colors group-hover:scale-105">
                        Seleccionar Kit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <div className="inline-flex items-center text-slate-400 text-sm">
                  <div className="w-12 h-px bg-slate-600 mr-4"></div>
                  <span>O configura tu proyecto paso a paso</span>
                  <div className="w-12 h-px bg-slate-600 ml-4"></div>
                </div>
              </div>
            </div>
          )}

          {/* Step Header */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl mx-auto mb-8 flex items-center justify-center text-slate-800 text-2xl font-light shadow-xl">
              {currentStep}
            </div>
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-tight">{currentStepData.title}</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
              {currentStepData.subtitle}
            </p>
          </div>

          {/* Services Grid */}
          <div
            className={`grid ${currentStep === 1 ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-2 lg:grid-cols-3"} gap-8 mb-16`}
          >
            {currentStepData.services.map((service) => {
              const isSelected = selectedServices[service.id] > 0
              const quantity = selectedServices[service.id] || 0
              const IconComponent = service.icon

              return (
                <div
                  key={service.id}
                  className={`group cursor-pointer transition-all duration-300 ${
                    currentStep === 1 ? "hover:scale-[1.02]" : "hover:scale-[1.02]"
                  }`}
                  onClick={() => toggleService(service.id, service.price)}
                >
                  <div
                    className={`bg-white/5 backdrop-blur-sm rounded-3xl p-8 border transition-all duration-300 hover:bg-white/10 ${
                      isSelected ? "border-blue-400/50 bg-blue-500/10" : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    {/* Badge popular */}
                    {service.popular && (
                      <div className="absolute -top-3 -right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Popular
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <div className="flex items-center mb-4">
                          {IconComponent && (
                            <div
                              className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 ${
                                isSelected ? "bg-blue-500" : "bg-slate-100"
                              }`}
                            >
                              <IconComponent className={isSelected ? "text-white" : "text-slate-800"} size={20} />
                            </div>
                          )}
                          <div>
                            <h3 className="text-xl font-medium text-white mb-1">{service.name}</h3>
                            {service.tag && (
                              <span className="text-xs text-blue-300 bg-blue-500/20 px-2 py-1 rounded-full">
                                {service.tag}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-slate-400 leading-relaxed mb-6">{service.description}</p>
                      </div>

                      <div className="ml-6">
                        {isSelected ? (
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check className="text-white" size={20} />
                          </div>
                        ) : (
                          <div className="w-10 h-10 border-2 border-slate-600 rounded-full hover:border-slate-500 transition-colors"></div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-light text-white">{service.price.toLocaleString()}€</div>

                      {isSelected && service.id === "extra-page" && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              updateServiceQuantity(service.id, service.price, -1)
                            }}
                            className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
                          >
                            <Minus size={14} className="text-white" />
                          </button>
                          <span className="w-8 text-center font-medium text-white">{quantity}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              updateServiceQuantity(service.id, service.price, 1)
                            }}
                            className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors"
                          >
                            <Plus size={14} className="text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Price Summary */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-slate-700/50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-medium mb-2 text-white">Precio Actual</h3>
                <p className="text-slate-400">{Object.keys(selectedServices).length} servicios seleccionados</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-light text-white">{calculateTotal().toLocaleString()}€</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-2xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="mr-2" size={20} />
              Anterior
            </button>

            <div className="text-center bg-slate-800/50 rounded-2xl px-6 py-3 border border-slate-700/50">
              <p className="text-slate-400 text-sm mb-1">{Object.keys(selectedServices).length} servicios</p>
              <p className="font-medium text-white text-lg">{calculateTotal().toLocaleString()}€</p>
            </div>

            <button
              onClick={nextStep}
              className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-medium transition-colors"
            >
              {currentStep === planSteps.length ? "Ver Resumen" : "Siguiente"}
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
