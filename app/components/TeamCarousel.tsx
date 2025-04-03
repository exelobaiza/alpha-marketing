"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const TeamMembers = [
  {
    name: "Milagros Murillo",
    role: "Fundadora y CEO",
    instagram: "@milimurilloo",
    instagramUrl: "https://www.instagram.com/milimurilloo/",
    image: "/images/mili.jpg",
    skills: [
      "Content Creator",
      "Influencer",
      "Community Manager",
      "Social Media Strategist"
    ],
    description: [
      "Soy Milagros Murillo, fundadora y CEO de Alpha Marketing Agency. Desde hace más de nueve años, me he dedicado al mundo de las redes sociales, ayudando a marcas, empresas y emprendedores a potenciar su identidad digital, fidelizar clientes y generar conexiones auténticas que impulsen sus ventas.",
      "A través de estrategias digitales, contenido creativo y una gestión efectiva de comunidades, he trabajado como influencer, creadora de contenido, community manager y estratega en social media, siempre con el objetivo de lograr un crecimiento real y orgánico.",
      "En Alpha Marketing Agency, no solo ofrecemos servicios de marketing, sino que nos involucramos con cada marca y su historia. Creemos en la importancia de construir relaciones genuinas, transformar audiencias en comunidades activas y mantener siempre los valores y el propósito de cada negocio.",
      "Si buscas que tu marca no solo tenga presencia, sino que construya una comunidad y genere un impacto real, en Alpha Marketing Agency tenemos la experiencia y las herramientas para hacerlo posible."
    ],
    quote: "No somos solo una agencia de marketing, somos el reflejo de la pasión por la comunicación real, auténtica y verdadera"
  },
  {
    name: "Thomas Dylan Santoro",
    role: "Director General",
    instagram: "@thomasdylans",
    instagramUrl: "https://www.instagram.com/thomasdylans?igsh=MWRydmh6emFhcWFjMg==",
    image: "/images/tom.jpg",
    skills: [
      "Director General",
      "Productor Audiovisual",
      "Dirección de Contenidos",
      "Storytelling Visual"
    ],
    description: [
      "Con una sólida trayectoria en dirección de contenidos y producción audiovisual, Thomas Dylans lidera el área creativa y estratégica de Alpha Marketing Agency. Su labor abarca desde la conceptualización hasta la ejecución de campañas visuales, asegurando que cada pieza cumpla con objetivos específicos de comunicación y marketing.",
      "Especialista en producción multimedia, storytelling visual y dirección de proyectos, Thomas trabaja en estrecha colaboración con el equipo de contenidos y estrategia digital para crear piezas que impacten, refuercen la identidad de marca y potencien el engagement en redes sociales y plataformas digitales.",
      "Su enfoque equilibra creatividad, análisis y técnica, permitiéndole desarrollar producciones audiovisuales alineadas con las últimas tendencias del mercado y adaptadas a las necesidades específicas de cada cliente."
    ],
    quote: "La creatividad es el puente entre la visión y el impacto"
  },
  {
    name: "Guadalupe Visñovezky",
    role: "Diseño Gráfico & Branding",
    instagram: "@guadivisnovezky",
    instagramUrl: "https://www.instagram.com/guadivisnovezky?igsh=MTBhY3FpYWhkeHg3Yw==",
    image: "/images/guada.jpg",
    skills: [
      "Diseño Gráfico",
      "Branding",
      "Comunicación Institucional",
      "Marketing Digital"
    ],
    description: [
      "Licenciada en Comunicación Social, con orientación en Comunicación Institucional y una diplomatura en Marketing Digital. A lo largo de su carrera, se ha especializado en el ámbito digital, combinando sus conocimientos en comunicación con el diseño gráfico para ayudar a las marcas a construir y proyectar su identidad de manera efectiva.",
      "Su enfoque va más allá de lo estético: entiende la estrategia detrás de cada imagen, asegurando que cada elemento visual comunique el mensaje adecuado. Con experiencia en redes sociales y branding, su objetivo es que cada pieza gráfica no solo sea visualmente atractiva, sino que refleje la esencia y los valores de la marca.",
      "Si buscas una identidad visual que conecte con tu audiencia, Guadalupe está aquí para hacerlo posible."
    ],
    quote: "El diseño es el embajador silencioso de tu marca"
  }
]

export default function TeamCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = TeamMembers.length

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {TeamMembers.map((member, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-1/2">
                  <div className="relative w-full h-[1017px] rounded-xl overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={800}
                      height={1000}
                      className="object-cover w-full h-full"
                      priority={index === 0}
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="inline-block px-3 py-1 rounded-md bg-red-500/10 text-red-500 text-sm font-medium mb-4">
                    Nuestro Equipo
                  </div>
                  <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent text-left">
                    {member.name}
                  </h3>
                  <Link href={member.instagramUrl} className="text-red-500 text-xl mb-6 text-left flex items-center gap-2">
                    {member.role} - {member.instagram}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </Link>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {member.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="px-4 py-2 bg-zinc-800 rounded-lg">
                        <p className="text-sm text-white">{skill}</p>
                      </div>
                    ))}
                  </div>
                  {member.description.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} className="text-zinc-300 text-lg leading-relaxed mb-6 text-left">
                      {paragraph}
                    </p>
                  ))}
                  <p className="text-red-500 text-lg italic mb-6 text-left">
                    {member.quote}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles del carrusel */}
      <div className="absolute inset-y-0 -left-12 md:-left-24 flex items-center">
        <Button
          onClick={prevSlide}
          variant="ghost"
          size="icon"
          className="h-16 w-16 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-white hover:scale-110 transition-all duration-300"
        >
          <ChevronLeft className="h-10 w-10" />
        </Button>
      </div>
      <div className="absolute inset-y-0 -right-12 md:-right-24 flex items-center">
        <Button
          onClick={nextSlide}
          variant="ghost"
          size="icon"
          className="h-16 w-16 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-white hover:scale-110 transition-all duration-300"
        >
          <ChevronRight className="h-10 w-10" />
        </Button>
      </div>

      {/* Indicadores */}
      <div className="absolute -bottom-8 left-0 right-0">
        <div className="flex justify-center gap-3">
          {TeamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                currentSlide === index ? "bg-red-500 scale-110" : "bg-zinc-600 hover:bg-zinc-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 