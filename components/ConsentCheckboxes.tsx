"use client"

import { useState } from "react"
import { Check, AlertCircle, Shield, Mail, Users, FileText } from "lucide-react"

interface ConsentCheckboxesProps {
  onConsentChange: (consents: ConsentData) => void
  requiredConsents?: string[]
  className?: string
}

export interface ConsentData {
  marketing: boolean
  communications: boolean
  dataProcessing: boolean
  thirdParties: boolean
  dataRetention: boolean
}

export default function ConsentCheckboxes({ 
  onConsentChange, 
  requiredConsents = ['dataProcessing'],
  className = "" 
}: ConsentCheckboxesProps) {
  const [consents, setConsents] = useState<ConsentData>({
    marketing: false,
    communications: false,
    dataProcessing: false,
    thirdParties: false,
    dataRetention: false
  })

  const [errors, setErrors] = useState<string[]>([])

  const handleConsentChange = (key: keyof ConsentData, value: boolean) => {
    const newConsents = { ...consents, [key]: value }
    setConsents(newConsents)
    
    // Validar consents requeridos
    const newErrors: string[] = []
    requiredConsents.forEach(required => {
      if (!newConsents[required as keyof ConsentData]) {
        newErrors.push(`Debes aceptar ${getConsentLabel(required)}`)
      }
    })
    setErrors(newErrors)
    
    onConsentChange(newConsents)
  }

  const getConsentLabel = (consentKey: string): string => {
    const labels = {
      marketing: 'el consentimiento de marketing',
      communications: 'el consentimiento de comunicaciones',
      dataProcessing: 'el procesamiento de datos',
      thirdParties: 'la cesión a terceros',
      dataRetention: 'la retención de datos'
    }
    return labels[consentKey as keyof typeof labels] || consentKey
  }

  const consentItems = [
    {
      key: 'dataProcessing' as const,
      required: requiredConsents.includes('dataProcessing'),
      icon: Shield,
      title: 'Procesamiento de Datos Personales',
      description: 'Consiento el tratamiento de mis datos personales por parte de WEB-MAKER para la gestión de mi solicitud y la prestación de servicios solicitados.',
      legal: 'Base legal: Art. 6.1.b) GDPR - Ejecución de contrato y medidas precontractuales.'
    },
    {
      key: 'communications' as const,
      required: requiredConsents.includes('communications'),
      icon: Mail,
      title: 'Comunicaciones Relacionadas con el Servicio',
      description: 'Acepto recibir comunicaciones relacionadas con mi solicitud, presupuesto, estado del proyecto y soporte técnico.',
      legal: 'Base legal: Art. 6.1.b) GDPR - Ejecución de contrato y obligaciones legales.'
    },
    {
      key: 'marketing' as const,
      required: requiredConsents.includes('marketing'),
      icon: Users,
      title: 'Marketing y Promociones',
      description: 'Consiento recibir comunicaciones comerciales sobre nuevos servicios, ofertas especiales y contenido de valor relacionado con desarrollo web.',
      legal: 'Base legal: Art. 6.1.a) GDPR - Consentimiento explícito del interesado.'
    },
    {
      key: 'thirdParties' as const,
      required: requiredConsents.includes('thirdParties'),
      icon: FileText,
      title: 'Cesión a Terceros',
      description: 'Autorizo la comunicación de mis datos a proveedores de servicios técnicos necesarios para la prestación del servicio (hosting, dominios, etc.).',
      legal: 'Base legal: Art. 6.1.b) GDPR - Ejecución de contrato y obligaciones legales.'
    },
    {
      key: 'dataRetention' as const,
      required: requiredConsents.includes('dataRetention'),
      icon: Shield,
      title: 'Conservación de Datos',
      description: 'Acepto la conservación de mis datos durante el tiempo necesario para cumplir con las obligaciones legales y contractuales.',
      legal: 'Base legal: Art. 6.1.c) GDPR - Cumplimiento de obligaciones legales.'
    }
  ]

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="bg-blue-500/10 border border-blue-400/20 rounded-2xl p-4 mb-6">
        <div className="flex items-start">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <div>
            <p className="text-blue-300 text-sm font-medium mb-1">Información sobre Protección de Datos</p>
            <p className="text-blue-200 text-sm">
              En cumplimiento del Reglamento (UE) 2016/679 (GDPR) y la LOPDGDD, le informamos que sus datos serán tratados por WEB-MAKER como responsable del tratamiento.
            </p>
          </div>
        </div>
      </div>

      {consentItems.map((item) => (
        <div key={item.key} className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="flex items-start space-x-3">
            <button
              onClick={() => handleConsentChange(item.key, !consents[item.key])}
              className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                consents[item.key]
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-slate-600 hover:border-slate-500'
              }`}
            >
              {consents[item.key] && (
                <Check className="w-4 h-4 text-white" />
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-2">
                <item.icon className="w-4 h-4 mr-2 text-blue-400" />
                <h4 className="text-white font-medium text-sm">
                  {item.title}
                  {item.required && <span className="text-red-400 ml-1">*</span>}
                </h4>
              </div>
              
              <p className="text-slate-300 text-sm mb-2 leading-relaxed">
                {item.description}
              </p>
              
              <p className="text-slate-400 text-xs italic">
                {item.legal}
              </p>
            </div>
          </div>
        </div>
      ))}

      {errors.length > 0 && (
        <div className="bg-red-500/10 border border-red-400/20 rounded-2xl p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-300 text-sm font-medium mb-1">Consentimientos Requeridos</p>
              <ul className="text-red-200 text-sm space-y-1">
                {errors.map((error, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></div>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
        <h5 className="text-white font-medium mb-2 text-sm">Información Adicional</h5>
        <ul className="text-slate-300 text-xs space-y-1">
          <li>• <strong>Responsable:</strong> WEB-MAKER</li>
          <li>• <strong>Finalidad:</strong> Gestión de solicitudes y prestación de servicios</li>
          <li>• <strong>Legitimación:</strong> Consentimiento y ejecución de contrato</li>
          <li>• <strong>Destinatarios:</strong> Proveedores de servicios técnicos</li>
          <li>• <strong>Derechos:</strong> Acceso, rectificación, supresión, limitación, portabilidad y oposición</li>
          <li>• <strong>Autoridad de Control:</strong> Agencia Española de Protección de Datos (AEPD)</li>
        </ul>
      </div>
    </div>
  )
} 