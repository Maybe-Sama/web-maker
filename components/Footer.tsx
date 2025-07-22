import Link from "next/link"
import { Mail, Linkedin, Github } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--text-headers)] text-white mt-8">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1: Declaración */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-white">Creando tu presencia digital con alma y estrategia</h3>
            <p className="text-gray-300 leading-relaxed">
              Cada proyecto es único, cada solución es personalizada. Transformo ideas en experiencias digitales que
              conectan y convierten.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-300 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  Cómo Trabajo
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/create-plan" className="text-gray-300 hover:text-white transition-colors">
                  Crea tu Plan
                </Link>
              </li>
             
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contacto</h4>
            <div className="space-y-3">
              <a
                href="mailto:info@tudominio.com"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <Mail size={16} className="mr-2" />
                info@tudominio.com
              </a>
              <div className="flex space-x-4 pt-2">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Tu Desarrollador Web. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
