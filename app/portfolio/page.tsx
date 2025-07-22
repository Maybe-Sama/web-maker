import Image from "next/image"
import Link from "next/link"
import { Eye } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Profesor Eureka",
    description: "Plataforma online para un profesor particular, con sistema de reservas, blog y recursos para estudiantes.",
    category: "Educación",
    image: "/webs_previews/titulando.png",
    url: "https://profesoreureka.com",
  },
  {
    id: 2,
    title: "Titulando",
    description: "Web de servicios para ayudar a estudiantes universitarios con sus trabajos de fin de grado y máster (TFG/TFM).",
    category: "Servicios Académicos",
    image: "/webs_previews/eureka.png",
    url: "https://titulando.vercel.app",
  },
  {
    id: 3,
    title: "Learning Eureka",
    description: "Sitio de recursos educativos con una amplia gama de materiales para el aprendizaje autodidacta.",
    category: "Recursos Educativos",
    image: "/webs_previews/learning.png",
    url: "https://learningeureka.pythonanywhere.com",
  },
]

export default function PortfolioPage() {
  return (
    <>
      {/* Hero Section */}
      <section id="intro" className="section-padding bg-gradient-to-br from-[var(--bg-primary)] to-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Proyectos que Cobran Vida</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cada proyecto es una historia única. Descubre cómo transformo ideas en experiencias digitales que conectan,
            convierten y perduran.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="proyectos" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div key={project.id} className="card overflow-hidden group">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <Link href={project.url} target="_blank" rel="noopener noreferrer">
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Eye className="text-white" size={48} />
                    </div>
                  </Link>
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[var(--color-primary)] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-[var(--text-headers)]">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[var(--bg-primary)]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Te Gusta lo que Ves?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Cada proyecto comienza con una conversación. Hablemos de cómo puedo ayudarte a crear algo extraordinario.
          </p>
          <Link href="/contact" className="btn-accent text-lg px-8 py-4">
            Hablemos de tu Proyecto
          </Link>
        </div>
      </section>
    </>
  )
}
