"use client"

import { useState } from "react"
import { CheckCircle, Briefcase, DollarSign, User, MessageSquare, Phone, Mail, Building, Globe, ArrowLeft, Edit } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import TiltedCard from "@/components/ui/TiltedCard"
import BlurText from "@/components/ui/BlurText"
import "@/components/ui/Stepper.css"

// Configuración y constantes
const FORM_CONFIG = {
  services: ["Web Corporativa", "E-commerce", "Web App a Medida", "Optimización SEO", "Otro"],
  budgets: ["< 500€", "500€ - 1.000€", "1.000€ - 2.000€", "> 2.000€"],
  tiltedCardProps: {
    containerHeight: "300px",
    containerWidth: "300px",
    imageHeight: "300px",
    imageWidth: "300px",
    rotateAmplitude: 12,
    scaleOnHover: 1.1,
    showMobileWarning: false,
    showTooltip: false,
  }
}

// Utilidades de validación
const validators = {
  email: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  phone: (phone: string) => /^[+]?[\d\s\-()]{9,}$/.test(phone.trim())
}

// Animaciones
const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 20
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
}

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const nextStepVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    transition: {
      duration: 0.3
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.3,
      ease: "easeOut"
    }
  }
}

const summaryItemVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

interface SummaryItemProps {
  icon: React.ReactNode
  label: string
  value: string
  onEdit: () => void
  delay?: number
}

function SummaryItem({ icon, label, value, onEdit, delay = 0 }: SummaryItemProps) {
  return (
    <motion.div
      variants={summaryItemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 group hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <div className="text-[var(--color-primary)]">
            {icon}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <p className="text-sm text-gray-900 truncate">{value}</p>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
          title="Editar"
        >
          <Edit className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </motion.div>
  )
}

interface ProgressSummaryProps {
  formData: any
  activeStep: number
  onEditStep: (step: number) => void
}

function ProgressSummary({ formData, activeStep, onEditStep }: ProgressSummaryProps) {
  const summaryItems = []

  // Servicio (Paso 1)
  if (activeStep > 1 && formData.service) {
    summaryItems.push({
      key: 'service',
      icon: <Briefcase size={16} />,
      label: 'Servicio',
      value: formData.service,
      onEdit: () => onEditStep(1),
      delay: 0
    })
  }

  // Presupuesto (Paso 2)
  if (activeStep > 2 && formData.budget) {
    summaryItems.push({
      key: 'budget',
      icon: <DollarSign size={16} />,
      label: 'Presupuesto',
      value: formData.budget,
      onEdit: () => onEditStep(2),
      delay: 0.1
    })
  }

  // Datos personales (Paso 3)
  if (activeStep > 3 && formData.name && formData.surname) {
    summaryItems.push({
      key: 'personal',
      icon: <User size={16} />,
      label: 'Datos personales',
      value: `${formData.name} ${formData.surname}`,
      onEdit: () => onEditStep(3),
      delay: 0.2
    })
  }

  // Contacto (Paso 4)
  if (activeStep > 4 && formData.email && formData.phone) {
    summaryItems.push({
      key: 'contact',
      icon: <Mail size={16} />,
      label: 'Contacto',
      value: `${formData.email} | ${formData.phone}`,
      onEdit: () => onEditStep(4),
      delay: 0.3
    })
  }

  // Profesión (Paso 5)
  if (activeStep > 5 && formData.profession) {
    summaryItems.push({
      key: 'profession',
      icon: <Building size={16} />,
      label: 'Profesión',
      value: formData.profession,
      onEdit: () => onEditStep(5),
      delay: 0.4
    })
  }

  // Web actual (Paso 6)
  if (activeStep > 6 && formData.hasWebsite) {
    summaryItems.push({
      key: 'website',
      icon: <Globe size={16} />,
      label: 'Web actual',
      value: formData.hasWebsite,
      onEdit: () => onEditStep(6),
      delay: 0.5
    })
  }

  // Descripción de idea (si existe)
  if (formData.ideaDescription && activeStep > 1) {
    const isVisible = summaryItems.some(item => item.key === 'service' && formData.service)
    if (isVisible) {
      summaryItems.push({
        key: 'idea',
        icon: <MessageSquare size={16} />,
        label: 'Tu idea',
        value: formData.ideaDescription.substring(0, 50) + (formData.ideaDescription.length > 50 ? '...' : ''),
        onEdit: () => onEditStep(1),
        delay: 0.6
      })
    }
  }

  if (summaryItems.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200"
    >
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Resumen del proyecto</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {summaryItems.map((item) => (
          <SummaryItem
            key={item.key}
            icon={item.icon}
            label={item.label}
            value={item.value}
            onEdit={item.onEdit}
            delay={item.delay}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    service: "",
    budget: "",
    name: "",
    surname: "",
    phone: "",
    email: "",
    profession: "",
    hasWebsite: "",
    websiteDetails: "",
    ideaDescription: "",
  })
  const [isIdeaTextareaVisible, setIsIdeaTextareaVisible] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  const [stepBeforeEdit, setStepBeforeEdit] = useState<number | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [showValidationError, setShowValidationError] = useState(false)
  const [validationErrorMessage, setValidationErrorMessage] = useState("")
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (name === "service") {
      if (value === "Otro") {
        setIsIdeaTextareaVisible(true)
      } else {
        setIsIdeaTextareaVisible(false)
      }
    }
    
    if (name === "email") {
      if (value && !validators.email(value)) {
        setEmailError("Por favor, introduce un email válido.")
      } else {
        setEmailError(null)
      }
    }

    if (name === "phone") {
      if (value && !validators.phone(value)) {
        setPhoneError("Por favor, introduce un número de teléfono válido.")
      } else {
        setPhoneError(null)
      }
    }
  }

  const handleBack = () => {
    if (stepBeforeEdit) {
      setActiveStep(stepBeforeEdit);
      setStepBeforeEdit(null);
    } else if (activeStep > 1) {
      setActiveStep(prev => prev - 1)
    }
  }

  const handleEditStep = (step: number) => {
    setStepBeforeEdit(activeStep)
    setActiveStep(step)
  }

  const handleSaveAndReturn = () => {
    if (stepBeforeEdit) {
      setActiveStep(stepBeforeEdit);
      setStepBeforeEdit(null);
    }
  };

  const handleNext = () => {
    setShowValidationError(false)
    setValidationErrorMessage("")
    
    // Validaciones por paso
    if (activeStep === 1) {
      if (!formData.service) {
        setValidationErrorMessage("Por favor, selecciona un servicio.");
        setShowValidationError(true);
        return;
      }
      if (formData.service === "Otro" && !formData.ideaDescription.trim()) {
        setValidationErrorMessage("Por favor, describe tu idea.");
        setShowValidationError(true);
        return;
      }
    }
    if (activeStep === 3) {
      if (!formData.name.trim() || !formData.surname.trim()) {
        setValidationErrorMessage("Por favor, completa tu nombre y apellidos.")
        setShowValidationError(true)
        return
      }
    }
    if (activeStep === 4) {
      if (!formData.email || !formData.phone) {
        setValidationErrorMessage("Por favor, completa tu información de contacto.")
        setShowValidationError(true)
        return
      }
      if (emailError || phoneError) {
        setValidationErrorMessage("Por favor, corrige los errores en tu información de contacto.")
        setShowValidationError(true)
        return
      }
    }
    if (activeStep === 5) {
      if (!formData.profession.trim()) {
        setValidationErrorMessage("Por favor, indica tu profesión o sector.")
        setShowValidationError(true)
        return
      }
    }
    if (activeStep === 6) {
      if (!formData.hasWebsite) {
        setValidationErrorMessage("Por favor, indica si tienes una web.")
        setShowValidationError(true)
        return
      }
    }
    if (activeStep === 7) {
      // Enviar formulario
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then(res => {
          if (!res.ok) throw new Error("Error enviando el formulario");
          setIsSubmitted(true);
        })
        .catch(() => {
          setValidationErrorMessage("Hubo un error enviando el formulario. Intenta de nuevo.");
          setShowValidationError(true);
        });
      return
    }
    
    setActiveStep(prev => prev + 1)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-auto p-8">
          <CheckCircle className="w-20 h-20 text-[var(--color-primary)] mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 text-[var(--text-headers)]">¡Proyecto en Camino!</h1>
          <p className="text-gray-600 mb-6">
            Gracias por dar el primer paso. He recibido tu información y me pondré en contacto contigo en menos de 24
            horas.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="section-padding bg-[var(--bg-primary)]">
      <div className="container-custom">
        <div className="relative">
          {activeStep > 1 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handleBack}
              className="absolute top-10 -left-20 z-50 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 text-[var(--color-primary)]" />
            </motion.button>
          )}

          {/* Resumen progresivo */}
          <ProgressSummary 
            formData={formData} 
            activeStep={activeStep} 
            onEditStep={handleEditStep}
          />

          {/* Error de validación */}
          {showValidationError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                x: [0, -10, 10, -10, 10, 0]
              }}
              transition={{ 
                opacity: { duration: 0.3 },
                y: { duration: 0.3 },
                x: { duration: 0.6, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
              }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto"
            >
              <p className="text-red-600 text-sm font-medium text-center">
                {validationErrorMessage}
              </p>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {/* Contenedor unificado para todos los pasos */}
            <motion.div
              key={activeStep}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={nextStepVariants}
              className="flex flex-col lg:flex-row items-start gap-8"
            >
              {/* Columna izquierda (Contenido del paso) */}
              <motion.div 
                className="flex-1 order-1 lg:order-1 flex flex-col justify-start w-full"
                variants={stepVariants}
              >
                <div className="w-full max-w-md mx-auto">
                  {activeStep === 1 && (
                    <>
                      <div className="mb-6 flex flex-col items-center">
                        <BlurText
                          text="¿Qué tienes en mente?"
                          delay={100}
                          animateBy="words"
                          direction="top"
                          className="text-2xl font-bold mb-4 text-[var(--text-headers)]"
                        />
                        <p className="text-center">Selecciona el servicio que mejor se ajusta a tu idea.</p>
                      </div>
                      <div className="form-radio-group">
                        {FORM_CONFIG.services.map(service => (
                          <label key={service} className={`radio-option ${formData.service === service ? "selected" : ""}`}>
                            <input type="radio" name="service" value={service} checked={formData.service === service} onChange={handleChange} />
                            {service}
                          </label>
                        ))}
                      </div>
                      {isIdeaTextareaVisible && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="form-textarea mt-4"
                        >
                          <label className="form-label" htmlFor="ideaDescription">Describe tu idea *</label>
                          <textarea id="ideaDescription" name="ideaDescription" rows={4} value={formData.ideaDescription} onChange={handleChange} placeholder="Ej: Quiero una web para mi cafetería..." />
                        </motion.div>
                      )}
                    </>
                  )}

                  {activeStep === 2 && (
                    <>
                      <div className="mb-6 flex flex-col items-center">
                        <BlurText
                          text="Hablemos de números"
                          delay={100}
                          animateBy="words"
                          direction="top"
                          className="text-2xl font-bold mb-4 text-[var(--text-headers)]"
                        />
                        <p className="text-center">¿Cuál es tu presupuesto estimado para el proyecto?</p>
                      </div>
                      <div className="form-radio-group">
                        {FORM_CONFIG.budgets.map(budget => (
                          <label key={budget} className={`radio-option ${formData.budget === budget ? "selected" : ""}`}>
                            <input type="radio" name="budget" value={budget} checked={formData.budget === budget} onChange={handleChange} />
                            {budget}
                          </label>
                        ))}
                      </div>
                    </>
                  )}

                  {activeStep === 3 && (
                    <>
                      <div className="mb-6 flex flex-col items-center">
                        <BlurText text="¿Cómo te llamas?" delay={100} animateBy="words" direction="top" className="text-2xl font-bold mb-4 text-[var(--text-headers)]" />
                        <p className="text-center">Necesito conocerte un poco mejor.</p>
                      </div>
                      <div className="space-y-4">
                        <div className="form-input">
                          <label className="form-label" htmlFor="name">Nombre *</label>
                          <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="form-input">
                          <label className="form-label" htmlFor="surname">Apellidos *</label>
                          <input type="text" id="surname" name="surname" required value={formData.surname} onChange={handleChange} />
                        </div>
                      </div>
                    </>
                  )}

                  {activeStep === 4 && (
                    <>
                      <div className="mb-6 flex flex-col items-center">
                        <BlurText text="¿Cómo te contacto?" delay={100} animateBy="words" direction="top" className="text-2xl font-bold mb-4 text-[var(--text-headers)]" />
                        <p className="text-center">Déjame tus datos para que podamos hablar.</p>
                      </div>
                      <div className="space-y-4">
                        <div className="form-input">
                          <label className="form-label" htmlFor="phone">Teléfono móvil *</label>
                          <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} placeholder="XXX XXX XXX" />
                          {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                        </div>
                        <div className="form-input">
                          <label className="form-label" htmlFor="email">Email *</label>
                          <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
                          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                        </div>
                      </div>
                    </>
                  )}

                  {activeStep === 5 && (
                    <>
                      <div className="mb-6 flex flex-col items-center">
                        <BlurText text="¿A qué te dedicas?" delay={100} animateBy="words" direction="top" className="text-2xl font-bold mb-4 text-[var(--text-headers)]" />
                        <p className="text-center">Cuéntame sobre tu profesión o sector.</p>
                      </div>
                      <div className="form-input">
                        <label className="form-label" htmlFor="profession">Profesión / Sector *</label>
                        <input type="text" id="profession" name="profession" required value={formData.profession} onChange={handleChange} placeholder="Ej: Abogado, Restaurante..." />
                      </div>
                    </>
                  )}

                  {activeStep === 6 && (
                    <>
                      <div className="mb-6 flex flex-col items-center">
                        <BlurText text="¿Actualmente posees alguna web?" delay={100} animateBy="words" direction="top" className="text-2xl font-bold mb-4 text-[var(--text-headers)]" />
                        <p className="text-center">Esto me ayudará a entender tu situación actual.</p>
                      </div>
                      <div className="form-radio-group">
                        <label className={`radio-option ${formData.hasWebsite === "Sí" ? "selected" : ""}`}>
                          <input type="radio" name="hasWebsite" value="Sí" checked={formData.hasWebsite === "Sí"} onChange={handleChange} />
                          Sí, tengo una web
                        </label>
                        <label className={`radio-option ${formData.hasWebsite === "No" ? "selected" : ""}`}>
                          <input type="radio" name="hasWebsite" value="No" checked={formData.hasWebsite === "No"} onChange={handleChange} />
                          No, esta sería mi primera web
                        </label>
                      </div>
                      {formData.hasWebsite === "Sí" && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="form-textarea mt-4"
                        >
                          <label className="form-label" htmlFor="websiteDetails">Cuéntame sobre tu web actual (opcional)</label>
                          <textarea id="websiteDetails" name="websiteDetails" rows={3} value={formData.websiteDetails} onChange={handleChange} placeholder="URL, qué problemas tiene..."/>
                        </motion.div>
                      )}
                    </>
                  )}

                  {activeStep === 7 && (
                    <div className="text-center">
                      <BlurText text="¡Perfecto! Revisa tu información" delay={100} animateBy="words" direction="top" className="text-2xl font-bold mb-4 text-[var(--text-headers)]" />
                      <p className="mb-6">Tu resumen completo está arriba. Si todo está correcto, envía tu solicitud.</p>
                      <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-green-800 mb-2">¡Formulario completo!</h4>
                        <p className="text-sm text-green-700">Puedes usar los botones de edición arriba para modificar cualquier dato.</p>
                      </div>
                    </div>
                  )}

                  {/* Botones de navegación */}
                  <div className="mt-8 text-center">
                    {stepBeforeEdit !== null ? (
                      <button onClick={handleSaveAndReturn} className="next-button">
                        Guardar y Volver
                      </button>
                    ) : activeStep < 7 ? (
                      <button onClick={handleNext} className="next-button">
                        Siguiente
                      </button>
                    ) : (
                      <button onClick={handleNext} className="next-button bg-green-600 hover:bg-green-700">
                        Enviar Solicitud
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Columna derecha (Imagen) */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`image-${activeStep}`}
                  className="w-full lg:w-1/3 order-2 lg:order-2 flex items-center justify-center lg:mt-12"
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <TiltedCard
                    imageSrc={`/contacto/${activeStep}.png`}
                    altText={`Paso ${activeStep}`}
                    {...FORM_CONFIG.tiltedCardProps}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
