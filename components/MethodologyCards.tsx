"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Zap, Shield, Lightbulb, PenTool } from "lucide-react"
import Image from "next/image"

const cards = [
    {
        icon: Lightbulb,
        title: "Estrategia que Escucha",
        text: "Primero te conozco, luego trazo el plan: tu web trabajará 24/7 por tus objetivos de negocio.",
        bg: "bg-blue-100",
        color: "text-blue-500",
        image: "/inicio/1.png",
    },
    {
      icon: Heart,
      title: "Diseño que Enamora",
      text: "Convierte tu visión en una experiencia digital irresistible: cada pixel seduce, cada detalle cuenta.",
      bg: "bg-red-100",
      color: "text-red-500",
      image: "/inicio/2.png",
    },
    
    {
      icon: PenTool,
      title: "Originalidad a Medida",
      text: "Cero plantillas, cero clichés. Tu marca se viste de un diseño hecho a mano y solo para ti.",
      bg: "bg-yellow-100",
      color: "text-yellow-500",
      image: "/inicio/3.png",
    },
    {
      icon: Zap,
      title: "Diseño que Convierte",
      text: "Bonito, sí. Pero sobre todo efectivo: optimizado para convertir el visitante en un cliente.",
      bg: "bg-green-100",
      color: "text-green-500",
      image: "/inicio/4.png",
    },
    {
      icon: Shield,
      title: "Soporte sin Caducidad",
      text: "El lanzamiento es el inicio. Me quedo a tu lado para mejorar, escalar y celebrar cada nueva victoria.",
      bg: "bg-purple-100",
      color: "text-purple-500",
      image: "/inicio/5.png",
    },
  ];
  

export default function MethodologyCards() {
  const [activeCard, setActiveCard] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % cards.length)
    }, 4000) // Cambia cada 4 segundos

    return () => clearInterval(interval) // Limpia el intervalo al desmontar el componente
  }, [])

  const handleImageClick = () => {
    setActiveCard(prev => (prev + 1) % cards.length)
  }

  return (
    <div className="relative w-full max-w-2xl h-80 mx-auto">
      <AnimatePresence>
        {cards.map((card, index) => {
          const cardOffset = (cards.length - 1 - index + activeCard) % cards.length

          return (
            <motion.div
              key={card.title}
              className="absolute w-full h-full rounded-2xl shadow-xl overflow-hidden flex cursor-pointer"
              onClick={handleImageClick}
              initial={{
                y: cardOffset * -10,
                scale: 1 - cardOffset * 0.05,
                zIndex: cards.length - cardOffset,
              }}
              animate={{
                y: cardOffset * -10,
                scale: 1 - cardOffset * 0.05,
                zIndex: cards.length - cardOffset,
              }}
              exit={{
                y: 50,
                opacity: 0,
                scale: 0.9,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Left Side (Text) */}
              <div className={`w-1/2 p-8 flex flex-col justify-center ${card.bg}`}>
                <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center bg-white/50">
                  <card.icon className={card.color} size={24} />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${card.color}`}>{card.title}</h3>
                <p className="text-gray-700 text-base">{card.text}</p>
              </div>

              {/* Right Side (Image) */}
              <div className="w-1/2 relative">
                <Image src={card.image} alt={card.title} layout="fill" objectFit="cover" />
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
} 