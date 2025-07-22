import Link from "next/link"
import { ArrowRight, Zap, Shield, Users, Compass, Pencil, Rocket, Bot } from "lucide-react"
import MethodologyCards from "@/components/MethodologyCards"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="section-padding bg-gradient-to-br from-[var(--bg-primary)] to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Tu Negocio es Único. <span className="text-[var(--color-primary)]">Tu Web También Debería Serlo.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Diseño webs a medida para pymes y autónomos que quieren destacar. Lejos de lo genérico, cerca de lo
              extraordinario.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact" className="btn-accent text-lg px-8 py-4">
                Empecemos tu Proyecto
                <ArrowRight className="ml-2 inline" size={20} />
              </Link>
              <Link href="/portfolio" className="btn-secondary text-lg px-8 py-4">
                Ver mi Trabajo
              </Link>
            </div>
          </div>

          {/* Visual Element -> Methodology Cards */}
          <div className="mt-16">
            <MethodologyCards />
          </div>
        </div>
      </section>

      

      {/* Beneficios Section */}
      <section id="beneficios" className="section-padding bg-[var(--bg-primary)]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">¿Por qué trabajar juntos?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full mx-auto mb-6 flex items-center justify-center">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Diseño que Vende</h3>
              <p className="text-gray-600">
                Cada elemento está pensado para convertir visitantes en clientes. Tu web trabajará para ti 24/7.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full mx-auto mb-6 flex items-center justify-center">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Proceso Transparente</h3>
              <p className="text-gray-600">
                Sabrás exactamente qué está pasando en cada momento. Sin sorpresas, solo resultados.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-[var(--color-secondary)] rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Soporte Continuo</h3>
              <p className="text-gray-600">
                No te dejo solo después del lanzamiento. Estoy aquí para hacer crecer tu presencia digital.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Diferenciación Asegurada</h3>
              <p className="text-gray-600">
                Tu web será única en tu sector. Destacarás entre la competencia desde el primer clic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-[var(--color-primary)] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para Transformar tu Presencia Digital?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Hablemos de tu proyecto. Sin compromiso, sin presión. Solo una conversación honesta sobre cómo puedo
            ayudarte a crecer.
          </p>
          <Link href="/create-plan" className="btn-accent text-lg px-8 py-4 inline-flex items-center">
            Crea tu proyecto
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </>
  )
}
