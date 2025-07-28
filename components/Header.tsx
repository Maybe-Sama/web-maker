"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Cómo Trabajo", href: "/how-it-works" },
    { name: "Contacto", href: "/contact" },
  ]

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <nav className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[var(--text-headers)] font-serif">
            Tu Desarrollador Web
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[var(--text-primary)] hover:text-[var(--color-primary)] font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/create-plan" className="btn-primary">
              Diseña tu web
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 transition-transform duration-200 hover:scale-110" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-label="Toggle menu"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ 
                duration: 0.3, 
                ease: "easeInOut",
                height: { duration: 0.3 },
                opacity: { duration: 0.2 }
              }}
              className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg overflow-hidden"
            >
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.1,
                  ease: "easeOut"
                }}
                className="py-4 space-y-4"
              >
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: 0.15 + (index * 0.05),
                      ease: "easeOut"
                    }}
                  >
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-[var(--text-primary)] hover:text-[var(--color-primary)] hover:bg-gray-50 font-medium transition-all duration-200 rounded-lg mx-2"
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ 
                    duration: 0.2, 
                    delay: 0.15 + (navigation.length * 0.05),
                    ease: "easeOut"
                  }}
                  className="px-4"
                >
                  <Link 
                    href="/create-plan" 
                    className="btn-primary block text-center hover:scale-105 transition-transform duration-200"
                    onClick={closeMenu}
                  >
                    Crea tu Plan
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
