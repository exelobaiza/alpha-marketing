"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Headphones, Phone, ChevronRight, Star, ArrowRight, MapPin } from "lucide-react"

import { useState, useEffect, useRef } from "react"

function VideoCarousel() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [videoError, setVideoError] = useState(false)
  const [individualErrors, setIndividualErrors] = useState<boolean[]>([false, false, false, false, false])
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null)
  ]

  // Usando los videos locales
  const videos = [
    "/videos/mili1.mp4",
    "/videos/mili2.mp4",
    "/videos/mili3.mp4",
    "/videos/mili4.mp4",
    "/videos/mili5.mp4"
  ]

  // Fallback images para cuando los videos fallan
  const fallbackImages = [
    "/placeholder.svg?height=600&width=300&text=Video+1",
    "/placeholder.svg?height=600&width=300&text=Video+2",
    "/placeholder.svg?height=600&width=300&text=Video+3",
    "/placeholder.svg?height=600&width=300&text=Video+4",
    "/placeholder.svg?height=600&width=300&text=Video+5"
  ]

  // Manejar errores de video individuales
  const handleVideoError = (index: number) => {
    console.error(`Error loading video ${index + 1}`)
    const newErrors = [...individualErrors]
    newErrors[index] = true
    setIndividualErrors(newErrors)
    
    // Si todos los videos tienen errores, mostrar el mensaje de error general
    if (newErrors.every(error => error)) {
      setVideoError(true)
    } else {
      // De lo contrario, intentar reproducir el siguiente video válido
      const nextValidIndex = findNextValidVideoIndex(index)
      if (nextValidIndex !== -1) {
        setCurrentVideo(nextValidIndex)
      }
    }
  }

  // Encontrar el siguiente video que no tenga errores
  const findNextValidVideoIndex = (currentIndex: number) => {
    for (let i = 1; i <= videos.length; i++) {
      const index = (currentIndex + i) % videos.length
      if (!individualErrors[index]) {
        return index
      }
    }
    return -1 // Todos los videos tienen errores
  }

  useEffect(() => {
    // Función para reproducir el video actual y configurar el siguiente
    const playCurrentVideo = () => {
      // Si el video actual tiene un error, intentar encontrar uno válido
      if (individualErrors[currentVideo]) {
        const nextValidIndex = findNextValidVideoIndex(currentVideo)
        if (nextValidIndex !== -1) {
          setCurrentVideo(nextValidIndex)
          return
        }
      }

      // Ocultar todos los videos
      videoRefs.forEach((ref) => {
        if (ref.current) {
          ref.current.style.display = "none"
          ref.current.pause()
          ref.current.currentTime = 0
        }
      })

      // Mostrar y reproducir el video actual
      if (videoRefs[currentVideo]?.current && !individualErrors[currentVideo]) {
        videoRefs[currentVideo].current.style.display = "block"

        const playPromise = videoRefs[currentVideo].current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Configurar temporizador para cambiar al siguiente video después de 4 segundos
              const timer = setTimeout(() => {
                const nextIndex = findNextValidVideoIndex(currentVideo)
                if (nextIndex !== -1) {
                  setCurrentVideo(nextIndex)
                }
              }, 4000)
              return () => clearTimeout(timer)
            })
            .catch((error: unknown) => {
              console.error("Video play failed:", error)
              handleVideoError(currentVideo)
            })
        }
      }
    }

    playCurrentVideo()
  }, [currentVideo, individualErrors])

  return (
    <div className="w-full h-full bg-black">
      {videoError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
          <p className="text-white text-center px-4">
            No se pudieron cargar los videos.
            <br />
            Verifica tu conexión a internet.
          </p>
        </div>
      ) : (
        <>
          {videos.map((src, index) => (
            <div key={index} className="absolute inset-0 w-full h-full" style={{ display: index === currentVideo ? "block" : "none" }}>
              {individualErrors[index] ? (
                // Imagen de fallback si el video tiene error
                <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                  <Image 
                    src={fallbackImages[index]} 
                    alt={`Video ${index + 1} thumbnail`} 
                    fill 
                    className="object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white bg-black/50 p-2 rounded">Video no disponible</p>
                  </div>
                </div>
              ) : (
                // Video si no hay error
                <video
                  ref={videoRefs[index]}
                  src={src}
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                  playsInline
                  onError={() => handleVideoError(index)}
                />
              )}
            </div>
          ))}

          {/* Indicadores de video */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
            {videos.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${currentVideo === index ? "bg-red-500" : individualErrors[index] ? "bg-zinc-800" : "bg-zinc-600"}`}
                onClick={() => setCurrentVideo(index)}
                aria-label={`Ver video ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function Home() {
  // State for annual/monthly billing
  const [isAnnualBilling, setIsAnnualBilling] = useState(false)
  
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  // Function to calculate discounted price
  const getDiscountedPrice = (price: number) => {
    if (isAnnualBilling) {
      // Apply 15% discount for annual billing
      return (price * 0.85).toLocaleString('es-AR')
    }
    return price.toLocaleString('es-AR')
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header/Navigation - Updated to #000000 background */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-md border-b border-zinc-800">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alpha-logo-dNZnmpaAHvAZsQojlBsEdopxqCzsxF.png"
                alt="Alpha Marketing Agency"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6 uppercase text-sm font-medium">
            <Link href="/" className="hover:text-red-500 transition-colors">
              Inicio
            </Link>
            <Link href="#nosotros" className="hover:text-red-500 transition-colors">
              Nosotros
            </Link>
            <Link href="#planes" className="hover:text-red-500 transition-colors">
              Planes
            </Link>
            <Link href="/proyectos" className="hover:text-red-500 transition-colors">
              Proyectos
            </Link>
          </nav>
          <Button
            variant="outline"
            size="sm"
            className="md:hidden border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            onClick={toggleMobileMenu}
          >
            Menu
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-zinc-800 animate-in fade-in slide-in-from-top-5 duration-300">
            <div className="container mx-auto px-6 py-4">
              <nav className="flex flex-col space-y-4 uppercase text-sm font-medium">
                <Link 
                  href="/" 
                  className="hover:text-red-500 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link 
                  href="#nosotros" 
                  className="hover:text-red-500 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Nosotros
                </Link>
                <Link 
                  href="#planes" 
                  className="hover:text-red-500 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Planes
                </Link>
                <Link 
                  href="/proyectos" 
                  className="hover:text-red-500 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Proyectos
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center pt-16">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="object-cover h-full w-full brightness-50"
            poster="/placeholder.svg?height=1080&width=1920"
          >
            <source
              src="/videos/background.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 z-10 text-center md:text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent text-left md:text-center">
              Potencia tu presencia
              <br />
              en redes sociales
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto text-left md:text-center">
              Transformamos tu marca con estrategias digitales innovadoras y contenido de alto impacto
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-start md:justify-center">
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-xl text-lg font-medium"
                onClick={() => {
                  const section = document.getElementById('inversion-estrategica')
                  section?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                VER PLANES
              </Button>
              <Button
                variant="outline"
                className="border-zinc-700 text-white hover:bg-zinc-800 px-8 py-6 rounded-xl text-lg font-medium"
                onClick={() => window.location.href = "https://www.instagram.com/alphamarketing.agency/"}
              >
                SEGUINOS EN INSTAGRAM
              </Button>
            </div>
            <p className="text-xl mt-8 text-left md:text-center">
              <span className="text-zinc-400">Packs de contenido desde </span>
              <span className="text-white font-bold">$199.999 ARS</span>
            </p>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <ChevronRight className="h-8 w-8 text-white rotate-90" />
        </div>
      </section>

      {/* Reels Section */}
      <section className="py-24 bg-zinc-900">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <div className="inline-block px-3 py-1 rounded-md bg-red-500/10 text-red-500 text-sm font-medium mb-4">
                Contenido Digital
              </div>
              <h3 className="text-red-500 font-bold mb-2 text-xl text-left">Reels</h3>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent text-left">
                De baja complejidad
              </h2>
              <p className="text-zinc-400 mb-8 text-lg leading-relaxed text-left">
                Estos reels están diseñados para transmitir un mensaje de manera rápida y efectiva, con un enfoque en la
                simplicidad. Utilizan elementos visuales y efectos básicos, fáciles de crear, pero que mantienen el
                interés del espectador. Son ideales para quienes buscan una producción ágil y accesible sin sacrificar
                el impacto en su audiencia.
              </p>
              <div className="space-y-6">
                <div className="flex items-center bg-zinc-800/50 p-4 rounded-lg hover:bg-zinc-800 transition-colors">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-4"></div>
                  <p className="uppercase font-medium">PRODUCCIÓN RÁPIDA Y SENCILLA</p>
                </div>
                <div className="flex items-center bg-zinc-800/50 p-4 rounded-lg hover:bg-zinc-800 transition-colors">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-4"></div>
                  <p className="uppercase font-medium">ACCESIBLES PARA CUALQUIER CREADOR</p>
                </div>
                <div className="flex items-center bg-zinc-800/50 p-4 rounded-lg hover:bg-zinc-800 transition-colors">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-4"></div>
                  <p className="uppercase font-medium">ENFOQUE DIRECTO AL MENSAJE</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-[280px] h-[560px] border-[12px] border-zinc-800 rounded-[40px] overflow-hidden shadow-2xl shadow-red-500/10">
                <div className="absolute top-0 left-0 right-0 h-6 bg-zinc-800 z-10 rounded-t-lg"></div>

                {/* Video Carousel replacing the Image */}
                <div className="relative w-full h-full">
                  <VideoCarousel />
                </div>

                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-zinc-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans - Redesigned */}
      <section id="planes" className="py-32 bg-black relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="text-center md:text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-3 py-1 rounded-md bg-red-500/10 text-red-500 text-sm font-medium mb-4">
              INVERSIÓN ESTRATÉGICA
            </div>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent text-left md:text-center">
              Potencia tu marca con nuestros planes
            </h2>
            <p className="text-zinc-400 text-lg mb-8 text-left md:text-center">
              No vendemos servicios, creamos experiencias digitales que transforman seguidores en comunidades y visitas
              en ventas. Elige el plan que mejor se adapte a tus objetivos.
            </p>

            <div className="flex justify-start md:justify-center space-x-2 mb-12">
              <span className="text-zinc-400">Facturación:</span>
              <div className="relative inline-flex items-center p-1 rounded-full bg-zinc-800/50 backdrop-blur-sm">
                <button 
                  onClick={() => setIsAnnualBilling(false)}
                  className={`relative z-10 px-3 py-1 text-sm rounded-full ${!isAnnualBilling ? 'bg-red-600 text-white' : 'text-zinc-400'} font-medium transition-colors`}
                >
                  Mensual
                </button>
                <button 
                  onClick={() => setIsAnnualBilling(true)}
                  className={`px-3 py-1 text-sm rounded-full ${isAnnualBilling ? 'bg-red-600 text-white' : 'text-zinc-400'} transition-colors`}
                >
                  Anual
                </button>
              </div>
              <span className={`text-red-500 text-sm font-medium flex items-center ${isAnnualBilling ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                Ahorra 15%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {/* Esencial Plan */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-red-500 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl blur transition duration-300"></div>
              <div className="relative h-full flex flex-col bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 group-hover:border-red-500/30 rounded-xl overflow-hidden transition-all duration-300">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                        Plan Esencial
                      </h3>
                      <p className="text-zinc-500">Para emprendedores y pequeños negocios</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                      <span className="text-xl">✨</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end">
                      <span className="text-4xl font-bold text-white">${getDiscountedPrice(599999)}</span>
                      <span className="text-zinc-500 ml-2 mb-1">/{isAnnualBilling ? 'año' : 'mes'}</span>
                    </div>
                    <p className="text-zinc-500 text-sm mt-1">
                      Facturación {isAnnualBilling ? 'anual' : 'mensual'}, sin compromiso
                    </p>
                  </div>

                  <Button className="w-full py-6 bg-zinc-800 hover:bg-red-600 text-white transition-colors">
                    Comenzar ahora
                  </Button>
                </div>

                <div className="border-t border-zinc-800 p-8">
                  <p className="font-medium text-white mb-4">Incluye:</p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 mr-3">
                        <Check className="text-red-500 h-3 w-3" />
                      </div>
                      <div>
                        <span className="text-zinc-300 block">2 Reels Alta Complejidad</span>
                        <span className="text-zinc-500 text-sm">Guionizados y producidos profesionalmente</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 mr-3">
                        <Check className="text-red-500 h-3 w-3" />
                      </div>
                      <div>
                        <span className="text-zinc-300 block">2 Reels Baja Complejidad</span>
                        <span className="text-zinc-500 text-sm">Contenido ágil para mantener presencia</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 mr-3">
                        <Check className="text-red-500 h-3 w-3" />
                      </div>
                      <div>
                        <span className="text-zinc-300 block">2 Horas de Producción</span>
                        <span className="text-zinc-500 text-sm">Sesión de fotos o videos en locación</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 mr-3">
                        <Check className="text-red-500 h-3 w-3" />
                      </div>
                      <div>
                        <span className="text-zinc-300 block">Gestión de 2 redes sociales</span>
                        <span className="text-zinc-500 text-sm">Publicación y monitoreo de engagement</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Profesional Plan */}
            <div className="group relative lg:scale-105 lg:-translate-y-2 z-10">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-red-500 to-transparent opacity-75 rounded-2xl blur transition duration-300"></div>
              <div className="relative h-full flex flex-col bg-zinc-900/50 backdrop-blur-sm border border-red-500/30 rounded-xl overflow-hidden transition-all duration-300">
                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                  RECOMENDADO
                </div>

                <div className="p-8 pt-12">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-red-400 mb-2">Plan Profesional</h3>
                      <p className="text-zinc-500">Para negocios en crecimiento</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                      <span className="text-xl">🚀</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end">
                      <span className="text-4xl font-bold text-white">${getDiscountedPrice(999999)}</span>
                      <span className="text-zinc-500 ml-2 mb-1">/{isAnnualBilling ? 'año' : 'mes'}</span>
                    </div>
                    <p className="text-zinc-500 text-sm mt-1">
                      Facturación {isAnnualBilling ? 'anual' : 'mensual'}, sin compromiso
                    </p>
                  </div>

                  <Button className="w-full py-6 bg-red-600 hover:bg-red-700 text-white transition-colors">
                    Comenzar ahora
                  </Button>
                </div>

                <div className="border-t border-zinc-800 p-8">
                  <p className="font-medium text-white mb-4">Todo lo de Esencial, más:</p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 mr-3">
                        <Check className="text-red-500 h-3 w-3" />
                      </div>
                      <div>
                        <span className="text-zinc-300 block">4 Reels Alta Complejidad</span>
                        <span className="text-zinc-500 text-sm">Contenido premium con guión y producción</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 mr-3">
                        <Check className="text-red-500 h-3 w-3" />
                      </div>
                      <div>
                        <span className="text-zinc-300 block">4 Reels Baja Complejidad</span>
                        <span className="text-zinc-500 text-sm">Contenido ágil para mantener presencia</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 mr-3">
                        <Check className="text-red-500 h-3 w-3" />
                      </div>
                      <div>
                        <span className="text-zinc-300 block">4 Horas de Producción</span>
                        <span className="text-zinc-500 text-sm">Sesiones de fotos o videos en locación</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 mr-3">
                        <Check className="text-red-500 h-3 w-3" />
                      </div>
                      <div>
                        <span className="text-zinc-300 block">Gestión de 3 redes sociales</span>
                        <span className="text-zinc-500 text-sm">Estrategia personalizada por plataforma</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 mr-3">
                        <Check className="text-red-500 h-3 w-3" />
                      </div>
                      <div>
                        <span className="text-zinc-300 block">Informe mensual de resultados</span>
                        <span className="text-zinc-500 text-sm">Análisis de métricas y recomendaciones</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-red-500 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl blur transition duration-300"></div>
              <div className="relative h-full flex flex-col bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 group-hover:border-red-500/30 rounded-xl overflow-hidden transition-all duration-300">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                        Plan Premium
                      </h3>
                      <p className="text-zinc-500">Para empresas y marcas establecidas</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                      <span className="text-xl">💎</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end">
                      <span className="text-4xl font-bold text-white">${getDiscountedPrice(1199999)}</span>
                      <span className="text-zinc-500 ml-2 mb-1">/{isAnnualBilling ? 'año' : 'mes'}</span>
                    </div>
                    <p className="text-zinc-500 text-sm mt-1">
                      Facturación {isAnnualBilling ? 'anual' : 'mensual'}, sin compromiso
                    </p>
                  </div>

                  <Button className="w-full py-6 bg-zinc-800 hover:bg-red-600 text-white transition-colors">
                    Comenzar ahora
                  </Button>
                </div>

                <div className="border-t border-zinc-800 p-8">
                  <p className="font-medium text-white mb-4">Todo lo de Profesional, más:</p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 mr-3">
                        <Check className="text-red-500 h-3 w-3" />
                      </div>
                      <div>
                        <span className="text-zinc-300 block">Servicio Web Completo</span>
                        <span className="text-zinc-500 text-sm">Diseño y desarrollo de sitio web</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 mr-3">
                        <Check className="text-red-500 h-3 w-3" />
                      </div>
                      <div>
                        <span className="text-zinc-300 block">Estrategia de contenido trimestral</span>
                        <span className="text-zinc-500 text-sm">Planificación avanzada de campañas</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 mr-3">
                        <Check className="text-red-500 h-3 w-3" />
                      </div>
                      <div>
                        <span className="text-zinc-300 block">Gestión de 4 redes sociales</span>
                        <span className="text-zinc-500 text-sm">Cobertura completa de plataformas</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 mr-3">
                        <Check className="text-red-500 h-3 w-3" />
                      </div>
                      <div>
                        <span className="text-zinc-300 block">Asesoría estratégica mensual</span>
                        <span className="text-zinc-500 text-sm">Reuniones con nuestro equipo creativo</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 mr-3">
                        <Check className="text-red-500 h-3 w-3" />
                      </div>
                      <div>
                        <span className="text-zinc-300 block">Campañas de publicidad pagada</span>
                        <span className="text-zinc-500 text-sm">Gestión de anuncios en redes sociales</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-xl p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 text-left">¿Necesitas algo más personalizado?</h3>
                <p className="text-zinc-400 text-left">Creamos planes a medida para adaptarnos a tus necesidades específicas.</p>
              </div>
              <Button className="whitespace-nowrap bg-red-600 hover:bg-red-700 text-white">
                Contactar para plan personalizado
              </Button>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mr-4">
                <span className="text-2xl">🔒</span>
              </div>
              <div>
                <p className="text-white font-medium">Sin contratos largos</p>
                <p className="text-zinc-500 text-sm">Cancela cuando quieras</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mr-4">
                <span className="text-2xl">🤝</span>
              </div>
              <div>
                <p className="text-white font-medium">Soporte dedicado</p>
                <p className="text-zinc-500 text-sm">Siempre a tu disposición</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mr-4">
                <span className="text-2xl">📈</span>
              </div>
              <div>
                <p className="text-white font-medium">Resultados medibles</p>
                <p className="text-zinc-500 text-sm">Informes de desempeño</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Bento Grid */}
      <section className="py-24 bg-zinc-900 relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black to-transparent"></div>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="text-center md:text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-md bg-red-500/10 text-red-500 text-sm font-medium mb-4">
              Portfolio
            </div>
            <p className="text-red-500 mb-2 text-lg text-left md:text-center">Proyectos</p>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent text-left md:text-center">
              Para nuestros clientes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
            {/* Betos - Large tile */}
            <div className="relative group overflow-hidden rounded-xl md:col-span-2 md:row-span-2 shadow-lg shadow-red-500/5">
              <Image
                src="/placeholder.svg?height=600&width=600&text=BETOS"
                alt="Betos"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-600/20 backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-white mb-2">BETOS</h3>
                <div className="flex space-x-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">BETOS</h3>
                <p className="text-zinc-300 text-sm">Estrategia de marketing completa</p>
              </div>
            </div>

            {/* La cafeteria */}
            <div className="relative group overflow-hidden rounded-xl shadow-lg shadow-red-500/5">
              <Image
                src="/placeholder.svg?height=300&width=300&text=La+Cafeteria"
                alt="La cafeteria"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-600/20 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white">la cafeteria</h3>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                  la cafeteria
                </h3>
                <p className="text-zinc-300 text-sm">Branding & Social Media</p>
              </div>
            </div>

            {/* La Panadería */}
            <div className="relative group overflow-hidden rounded-xl shadow-lg shadow-red-500/5">
              <Image
                src="/placeholder.svg?height=300&width=300&text=La+Panaderia"
                alt="La Panadería"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-600/20 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white">La Panadería</h3>
                <p className="text-sm text-white">COSAS RICAS</p>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                  La Panadería
                </h3>
                <p className="text-zinc-300 text-sm">COSAS RICAS</p>
              </div>
            </div>

            {/* LEVELGYM - Wide tile */}
            <div className="relative group overflow-hidden rounded-xl md:col-span-2 shadow-lg shadow-red-500/5">
              <Image
                src="/placeholder.svg?height=300&width=600&text=LEVELGYM"
                alt="LEVELGYM"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-600/20 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white">LEVELGYM</h3>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors">LEVELGYM</h3>
                <p className="text-zinc-300 text-sm">Campaña digital & Contenido</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Link href="/proyectos">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8">VER TODO</Button>
            </Link>
          </div>

          <div className="text-center md:text-center mt-20">
            <p className="mb-2 text-zinc-400 text-left md:text-center">Explora nuestros últimos proyectos WEBS</p>
            <h3 className="text-xl font-bold text-red-500 text-left md:text-center">GALERIA WEB</h3>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="text-center md:text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-md bg-red-500/10 text-red-500 text-sm font-medium mb-4">
              Metodología
            </div>
            <p className="text-red-500 mb-2 text-lg text-left md:text-center">¿Como lo hacemos?</p>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent text-left md:text-center">
              Nuestro Proceso
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/30 backdrop-blur-sm p-8 rounded-xl border border-zinc-800 hover:border-red-500/30 transition-all hover:shadow-lg hover:shadow-red-500/5 group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-left md:text-center group-hover:text-red-500 transition-colors">
                PLANIFICAMOS EL QUÉ
              </h3>
              <p className="text-zinc-400 text-left md:text-center">
                Empezamos escuchando tus necesidades y a quién te diriges. Planificamos el contenido según el plan
                elegido y, una vez aprobado, organizamos el calendario de grabación con una semana de anticipación.
              </p>
            </div>

            <div className="bg-zinc-900/30 backdrop-blur-sm p-8 rounded-xl border border-zinc-800 hover:border-red-500/30 transition-all hover:shadow-lg hover:shadow-red-500/5 group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-left md:text-center group-hover:text-red-500 transition-colors">
                HORA DE GRABAR
              </h3>
              <p className="text-zinc-400 text-left md:text-center">
                Con la planificación lista, producimos el contenido. Usamos equipo de alta calidad para grabar en
                jornadas de 4 horas, capturando todo el material necesario, ya sea fotografía o video.
              </p>
            </div>

            <div className="bg-zinc-900/30 backdrop-blur-sm p-8 rounded-xl border border-zinc-800 hover:border-red-500/30 transition-all hover:shadow-lg hover:shadow-red-500/5 group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-left md:text-center group-hover:text-red-500 transition-colors">
                SE COCINA Y DISTRIBUYE
              </h3>
              <p className="text-zinc-400 text-left md:text-center">
                Editamos el contenido y lo distribuimos. Realizamos las correcciones necesarias, añadimos animaciones y
                entregamos el material en 1080p Full HD. El contenido final se publica con su copy y calendario en
                Notion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="nosotros" className="py-24 bg-zinc-900 relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black to-transparent"></div>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/images/mili.jpg"
                  alt="Milagros Murillo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="inline-block px-3 py-1 rounded-md bg-red-500/10 text-red-500 text-sm font-medium mb-4">
                Nuestro Equipo
              </div>
              <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent text-left">
                Milagros Murillo
              </h3>
              <p className="text-red-500 text-xl mb-6 text-left">Fundadora y CEO - @milimurilloo</p>
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="px-4 py-2 bg-zinc-800 rounded-lg">
                  <p className="text-sm text-white">Content Creator</p>
                </div>
                <div className="px-4 py-2 bg-zinc-800 rounded-lg">
                  <p className="text-sm text-white">Influencer</p>
                </div>
                <div className="px-4 py-2 bg-zinc-800 rounded-lg">
                  <p className="text-sm text-white">Community Manager</p>
                </div>
              </div>
              <p className="text-zinc-300 text-lg leading-relaxed mb-6 text-left">
                Desde hace años, me dedico a construir marcas con propósito en el mundo digital. Mi pasión por la
                comunicación y el marketing me llevó a especializarme en estrategia digital, contenido creativo y
                crecimiento de comunidades online.
              </p>
              <p className="text-zinc-300 text-lg leading-relaxed mb-6 text-left">
                Como fundadora de Alpha Marketing Agency, ayudo a negocios, emprendedores y empresas a potenciar su
                presencia en redes sociales con estrategia, creatividad y visión. Creo en el poder de que una marca bien
                construida y un mensaje auténtico genera conexiones reales en el mundo digital.
              </p>
              <p className="text-red-500 text-lg italic mb-6 text-left">
                "Alpha no es solo una agencia, es el reflejo de mi pasión por el marketing y la comunicación."
              </p>
              <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white px-8 py-3">Conoce al equipo</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <div className="inline-block px-3 py-1 rounded-md bg-red-500/10 text-red-500 text-sm font-medium mb-4">
                Contacto
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent text-left">
                Tienes alguna
                <br />
                pregunta?
              </h2>
              <p className="text-red-500 text-xl mb-6 text-left">Te respondemos!</p>
              <p className="text-zinc-400 mb-8 text-lg leading-relaxed text-left">
                ¡Estamos aquí para ayudarte a impulsar tu negocio al siguiente nivel! Si estás listo para mejorar tu
                presencia digital, aumentar tus ventas o simplemente llevar tu marca a más personas, no dudes en
                contactarnos. llámanos o escríbenos, ¡estamos listos para escucharte!
              </p>
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-zinc-300 group-hover:text-white transition-colors text-left">
                    Sarmiento, 717 Catamarca, ARG
                  </p>
                </div>
                <div className="flex items-center group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-zinc-300 group-hover:text-white transition-colors text-left">+54 9 3834 93-2685</p>
                </div>
              </div>
              <Button className="mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-3">Contáctanos</Button>
            </div>
            <div className="md:w-1/2 flex justify-center hidden md:flex">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full opacity-20 blur-3xl"></div>
                <div className="w-72 h-72 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative">
                  <Headphones className="h-36 w-36 text-red-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="bg-black text-white py-12">
        <footer className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alpha-logo-dNZnmpaAHvAZsQojlBsEdopxqCzsxF.png"
                alt="Alpha Marketing Agency"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
              <p className="mt-2 text-zinc-400 text-sm">© 2024 Alpha Marketing. Todos los derechos reservados.</p>
            </div>
            
            <div className="flex space-x-4">
              {/* Instagram */}
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.344 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.683-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              
              {/* Twitter/X */}
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              
              {/* LinkedIn */}
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

