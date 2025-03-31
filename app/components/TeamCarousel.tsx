"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const TeamMember = {
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
    "Soy Milagros Murillo, fundadora y CEO de Alpha Marketing Agency. Desde hace más de 9 años pertenezco al mundo de las redes sociales y a lo largo de esos años me he dedicado a potenciar marcas, empresas y emprendedores, ayudándolos a construir su identidad digital, fidelizar sus clientes y generar conexiones reales que impulsan sus ventas a través de estrategia digital, contenido creativo y gestión de comunidades.",
    "Como influencer, content creator, community manager y social media strategist, mi misión es ayudarte a crecer de manera real y orgánica.",
    "Y en Alpha Marketing Agency sabemos cómo lograrlo. Porque en Alpha no solo brindamos servicios de marketing, sino que nos involucramos con tu marca y tu historia. Creemos en generar conexiones reales, fidelizar clientes y transformar audiencias en comunidades activas, manteniendo siempre los valores y propósito de tu negocio.",
    "Si quieres que tu marca no solo tenga presencia, sino que también construya una comunidad y deje huellas, en Alpha Marketing Agency tenemos las herramientas y la experiencia para hacerlo posible."
  ],
  quote: "No somos solo una agencia de marketing, somos el reflejo de la pasión por la comunicación real, auténtica y verdadera"
}

export default function TeamCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3 // Repetimos el mismo componente 3 veces

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 5000) // Cambia cada 5 segundos

    return () => clearInterval(timer)
  }, [])

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
          {[...Array(totalSlides)].map((_, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-1/2">
                  <div className="relative w-full h-[1017px] rounded-xl overflow-hidden">
                    <Image
                      src={TeamMember.image}
                      alt={TeamMember.name}
                      width={800}
                      height={1000}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="inline-block px-3 py-1 rounded-md bg-red-500/10 text-red-500 text-sm font-medium mb-4">
                    Nuestro Equipo
                  </div>
                  <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent text-left">
                    {TeamMember.name}
                  </h3>
                  <Link href={TeamMember.instagramUrl} className="text-red-500 text-xl mb-6 text-left flex items-center gap-2">
                    {TeamMember.role} - {TeamMember.instagram}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </Link>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {TeamMember.skills.map((skill, index) => (
                      <div key={index} className="px-4 py-2 bg-zinc-800 rounded-lg">
                        <p className="text-sm text-white">{skill}</p>
                      </div>
                    ))}
                  </div>
                  {TeamMember.description.map((paragraph, index) => (
                    <p key={index} className="text-zinc-300 text-lg leading-relaxed mb-6 text-left">
                      {paragraph}
                    </p>
                  ))}
                  <p className="text-red-500 text-lg italic mb-6 text-left">
                    {TeamMember.quote}
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
          {[...Array(totalSlides)].map((_, index) => (
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