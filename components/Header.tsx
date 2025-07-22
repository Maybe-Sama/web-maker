"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Cómo Trabajo", href: "/how-it-works" },
    { name: "Contacto", href: "/contact" },
  ]

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
              Crea tu Plan
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
            <div className="py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-[var(--text-primary)] hover:text-[var(--color-primary)] font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4">
                <Link href="/create-plan" className="btn-primary block text-center">
                  Crea tu Plan
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
