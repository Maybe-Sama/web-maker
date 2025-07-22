"use client"

import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, User, Mail, Phone, X } from "lucide-react"

interface ContactWarningModalProps {
  isOpen: boolean
  onClose: () => void
  onAddContactData: () => void
}

export default function ContactWarningModal({
  isOpen,
  onClose,
  onAddContactData
}: ContactWarningModalProps) {
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
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl max-w-md w-full border border-white/10 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mr-4">
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Datos de Contacto Requeridos</h2>
                    <p className="text-slate-300 text-sm">Necesitamos tus datos para continuar</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-slate-300" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-slate-300 mb-6">
                Para solicitar tu presupuesto personalizado, necesitamos que completes tus datos de contacto primero.
              </p>

              <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/10">
                <h3 className="font-semibold text-white mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2 text-blue-400" />
                  Datos que necesitamos:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-slate-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Nombre completo
                  </li>
                  <li className="flex items-center text-sm text-slate-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Email de contacto
                  </li>
                  <li className="flex items-center text-sm text-slate-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Teléfono móvil
                  </li>
                  <li className="flex items-center text-sm text-slate-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Empresa (opcional)
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-400/20 rounded-2xl p-4 mb-6">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                  <div>
                    <p className="text-blue-300 text-sm font-medium mb-1">¿Por qué necesitamos estos datos?</p>
                    <p className="text-blue-200 text-sm">
                      Para poder contactarte y enviarte tu presupuesto personalizado con todos los detalles de tu proyecto.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-white/10 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-slate-600 text-slate-300 rounded-2xl font-medium hover:bg-slate-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={onAddContactData}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-medium transition-colors"
              >
                Añadir Datos
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 