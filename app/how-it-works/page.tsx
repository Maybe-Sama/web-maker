import { Search, Palette, Code, Rocket, MessageCircle, CheckCircle } from "lucide-react"
import Image from "next/image"

const steps = [
  {
    number: "01",
    title: "Descubrimiento y Planificación",
    description:
      "Comenzamos con una conversación profunda sobre tu negocio, objetivos y visión. Analizamos tu mercado, competencia y audiencia para crear una estrategia sólida.",
    icon: Search,
    deliverables: ["Briefing detallado", "Análisis de competencia", "Estrategia digital", "Cronograma del proyecto"],
    image: "/trabajo/1.png",
  },
  {
    number: "02",
    title: "Diseño Creativo",
    description:
      "Creo wireframes y diseños que reflejan la personalidad de tu marca. Cada elemento visual tiene un propósito y está pensado para tu audiencia específica.",
    icon: Palette,
    deliverables: ["Wireframes interactivos", "Diseño visual completo", "Guía de estilo", "Prototipo navegable"],
    image: "/trabajo/2.png",
  },
  {
    number: "03",
    title: "Desarrollo y Construcción",
    description:
      "Transformo el diseño en una web funcional, rápida y optimizada. Uso las mejores tecnologías y prácticas para garantizar rendimiento y seguridad.",
    icon: Code,
    deliverables: ["Desarrollo responsive", "Optimización SEO", "Integración de funcionalidades", "Testing exhaustivo"],
    image: "/trabajo/3.png",
  },
  {
    number: "04",
    title: "Lanzamiento y Soporte",
    description:
      "Lanzamos tu web al mundo y te acompaño en los primeros pasos. Incluye formación para que puedas gestionar tu contenido y soporte continuo.",
    icon: Rocket,
    deliverables: [
      "Lanzamiento oficial",
      "Formación personalizada",
      "Documentación completa",
      "Soporte post-lanzamiento",
    ],
    image: "/trabajo/4.png",
  },
]

const faqs = [
  {
    question: "¿Cuánto tiempo tarda el proceso completo?",
    answer:
      "Depende de la complejidad del proyecto, pero generalmente entre 4-8 semanas. Te daré un cronograma detallado desde el primer día.",
  },
  {
    question: "¿Qué pasa si necesito cambios durante el desarrollo?",
    answer:
      "Los cambios menores están incluidos. Para cambios mayores, evaluamos el impacto y ajustamos el cronograma de forma transparente.",
  },
  {
    question: "¿Incluyes el hosting y dominio?",
    answer:
      "Te ayudo a elegir las mejores opciones según tu presupuesto y necesidades. Puedo gestionarlo por ti o enseñarte a hacerlo.",
  },
  {
    question: "¿Qué tipo de soporte ofreces después del lanzamiento?",
    answer:
      "Incluyo 30 días de soporte gratuito. Después, ofrezco planes de mantenimiento flexibles según tus necesidades.",
  },
  {
    question: "¿Con qué presupuestos sueles trabajar?",
    answer:
      "Me adapto a diferentes necesidades. Los proyectos suelen empezar a partir de 1.000€, pero lo mejor es que me contactes a través del formulario para darte un presupuesto a medida y sin compromiso.",
  },
  {
    question: "¿Qué tipo de webs puedo encargar?",
    answer:
      "Estoy especializado en webs corporativas, tiendas online (e-commerce) y aplicaciones web a medida. Si tienes otra idea en mente, no dudes en consultarme; me encantan los nuevos retos.",
  },
]

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero Section */}
      <section id="intro" className="section-padding bg-gradient-to-br from-[var(--bg-primary)] to-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Así Convertimos Tu Idea en una Web que Funciona</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Un proceso transparente, colaborativo y centrado en resultados. Tu éxito es mi prioridad en cada paso del
            camino.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section id="pasos" className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">El Camino Hacia tu Web Perfecta</h2>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className="lg:w-1/2">
                  <div className={`card p-8 ${index % 2 === 0 ? "bg-white" : "bg-[var(--bg-primary)]"}`}>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center mr-4">
                        <step.icon className="text-white" size={32} />
                      </div>
                      <div>
                        <span className="text-[var(--color-primary)] font-bold text-lg">{step.number}</span>
                        <h3 className="text-2xl font-bold text-[var(--text-headers)]">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{step.description}</p>
                    <div>
                      <h4 className="font-semibold mb-3 text-[var(--text-headers)]">Entregables:</h4>
                      <ul className="space-y-2">
                        {step.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <CheckCircle size={16} className="text-[var(--color-primary)] mr-2 flex-shrink-0" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2">
                  <div className="relative">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={600}
                      height={400}
                      className="rounded-2xl shadow-lg w-full h-auto object-cover"
                    />
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md">
                      {step.number}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h3 className="text-3xl font-bold text-center mb-12">Preguntas que Suelen Surgir</h3>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card p-6">
                <h4 className="font-bold text-lg mb-3 text-[var(--text-headers)] flex items-center">
                  <MessageCircle size={20} className="text-[var(--color-primary)] mr-3" />
                  {faq.question}
                </h4>
                <p className="text-gray-600 leading-relaxed pl-8">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[var(--color-primary)] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para Empezar este Viaje Juntos?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Cada gran proyecto comienza con una conversación. Hablemos de tu visión y cómo puedo ayudarte a hacerla
            realidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/create-plan" className="btn-accent text-lg px-8 py-4">
              Crea tu proyecto
            </a>
            <a
              href="/portfolio"
              className="btn-secondary text-lg px-8 py-4 bg-white text-[var(--color-primary)] hover:bg-gray-100"
            >
              Ver Ejemplos
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
