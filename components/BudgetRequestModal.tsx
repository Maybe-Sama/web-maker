"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, User, Mail, Phone, Building, FileText, Calendar, MessageSquare, CheckCircle, AlertCircle, Shield } from "lucide-react"
import ConsentCheckboxes, { ConsentData } from "./ConsentCheckboxes"

interface BudgetRequestModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<void>
  selectedServices: { [key: string]: number }
  selectedBundle?: string | null
  totalPrice: number
  servicesDetails: any[]
  contactData?: {
    name: string
    email: string
    phone: string
    company: string
  }
}

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  projectDescription: string
  timeline: string
  additionalRequirements: string
  consents: ConsentData
}

export default function BudgetRequestModal({
  isOpen,
  onClose,
  onSubmit,
  selectedServices,
  selectedBundle,
  totalPrice,
  servicesDetails,
  contactData
}: BudgetRequestModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: contactData?.name || "",
    email: contactData?.email || "",
    phone: contactData?.phone || "",
    company: contactData?.company || "",
    projectDescription: "",
    timeline: "",
    additionalRequirements: "",
    consents: {
      marketing: false,
      communications: false,
      dataProcessing: false,
      thirdParties: false,
      dataRetention: false
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Verificar si el formulario está listo para enviar
  const isFormReady = () => {
    const hasRequiredFields = formData.name.trim() && 
                             formData.email.trim() && 
                             validators.email(formData.email) &&
                             formData.phone.trim() && 
                             validators.phone(formData.phone)
    
    const hasRequiredConsents = formData.consents.dataProcessing
    
    return hasRequiredFields && hasRequiredConsents
  }

  const validators = {
    email: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    phone: (phone: string) => /^[+]?[\d\s\-()]{9,}$/.test(phone.trim())
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleConsentChange = (newConsents: ConsentData) => {
    setFormData(prev => ({ ...prev, consents: newConsents }))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!validators.email(formData.email)) {
      newErrors.email = "Por favor, introduce un email válido"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio"
    } else if (!validators.phone(formData.phone)) {
      newErrors.phone = "Por favor, introduce un teléfono válido"
    }

    // Validar consentimientos requeridos
    const requiredConsents = ['dataProcessing']
    const missingConsents = requiredConsents.filter(consent => !formData.consents[consent as keyof ConsentData])
    
    if (missingConsents.length > 0) {
      newErrors.consents = `Debes aceptar todos los consentimientos obligatorios`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const budgetData = {
        ...formData,
        selectedServices,
        selectedBundle,
        totalPrice,
        servicesDetails
      }

      await onSubmit(budgetData)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error enviando presupuesto:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectDescription: "",
        timeline: "",
        additionalRequirements: "",
        consents: {
          marketing: false,
          communications: false,
          dataProcessing: false,
          thirdParties: false,
          dataRetention: false
        }
      })
      setErrors({})
      setIsSubmitted(false)
      onClose()
    }
  }

  if (isSubmitted) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 max-w-md w-full text-center border border-white/10 backdrop-blur-sm"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white">¡Presupuesto Enviado!</h2>
              <p className="text-slate-300 mb-6">
                Hemos recibido tu solicitud de presupuesto. Te contactaremos en menos de 24 horas con una propuesta detallada.
              </p>
              <button
                onClick={handleClose}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-2xl font-medium transition-colors"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Solicitar Presupuesto</h2>
                  <p className="text-slate-300 mt-2">Completa tus datos para recibir tu presupuesto personalizado</p>
                </div>
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5 text-slate-300" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Datos personales */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-400" />
                    Datos Personales
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-slate-800/50 text-white placeholder-slate-400 ${
                        errors.name ? 'border-red-400' : 'border-slate-600'
                      }`}
                      placeholder="Tu nombre completo"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-slate-800/50 text-white placeholder-slate-400 ${
                        errors.email ? 'border-red-400' : 'border-slate-600'
                      }`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-slate-800/50 text-white placeholder-slate-400 ${
                        errors.phone ? 'border-red-400' : 'border-slate-600'
                      }`}
                      placeholder="612 345 678"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Empresa (opcional)
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-slate-800/50 text-white placeholder-slate-400"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                </div>

                {/* Detalles del proyecto */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-400" />
                    Detalles del Proyecto
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Descripción del proyecto (opcional)
                    </label>
                    <textarea
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none bg-slate-800/50 text-white placeholder-slate-400"
                      placeholder="Cuéntanos más sobre tu proyecto..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Plazo deseado (opcional)
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-slate-800/50 text-white"
                    >
                      <option value="">Selecciona un plazo</option>
                      <option value="Urgente (1-2 semanas)">Urgente (1-2 semanas)</option>
                      <option value="Normal (3-4 semanas)">Normal (3-4 semanas)</option>
                      <option value="Flexible (1-2 meses)">Flexible (1-2 meses)</option>
                      <option value="Sin prisa">Sin prisa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Requisitos adicionales (opcional)
                    </label>
                    <textarea
                      name="additionalRequirements"
                      value={formData.additionalRequirements}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none bg-slate-800/50 text-white placeholder-slate-400"
                      placeholder="Algún requisito especial o funcionalidad específica..."
                    />
                  </div>
                </div>
              </div>

              {/* Consentimientos */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-400" />
                  Consentimientos de Protección de Datos
                </h3>
                <ConsentCheckboxes
                  onConsentChange={handleConsentChange}
                  requiredConsents={['dataProcessing']}
                />
                {errors.consents && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.consents}
                  </p>
                )}
              </div>

              {/* Resumen del presupuesto */}
              <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="font-semibold text-white mb-4">Resumen de tu configuración</h4>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-slate-300">
                      {selectedBundle ? 'Kit seleccionado' : `${Object.keys(selectedServices).length} servicios`}
                    </p>
                    <p className="text-sm text-slate-400">
                      {selectedBundle || 'Configuración personalizada'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-400">{totalPrice.toLocaleString()}€</p>
                  </div>
                </div>
                
                {/* Indicador de estado del formulario */}
                <div className={`p-3 rounded-xl border ${
                  isFormReady() 
                    ? 'bg-green-500/10 border-green-400/20' 
                    : 'bg-orange-500/10 border-orange-400/20'
                }`}>
                  <div className="flex items-center">
                    {isFormReady() ? (
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-orange-400 mr-2" />
                    )}
                    <span className={`text-sm font-medium ${
                      isFormReady() ? 'text-green-300' : 'text-orange-300'
                    }`}>
                      {isFormReady() 
                        ? 'Formulario completo - Listo para enviar' 
                        : 'Completa todos los campos obligatorios para continuar'
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 border border-slate-600 text-slate-300 rounded-2xl font-medium hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormReady()}
                  className={`flex-1 px-6 py-3 rounded-2xl font-medium transition-colors ${
                    isFormReady() && !isSubmitting
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Enviando...' : 'Solicitar Presupuesto'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 