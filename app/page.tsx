"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Headphones, Phone, ChevronRight, Star, ArrowRight, MapPin, Mail, Instagram } from "lucide-react"

import { useState, useEffect, useRef } from "react"
import { useGeoLocation } from './hooks/useGeoLocation'
import { prices, currencyByRegion } from './config/prices'
import { content } from './config/content'
import TeamCarousel from "./components/TeamCarousel"

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
  ]

  // Fallback images para cuando los videos fallan
  const fallbackImages = [
    "/placeholder.svg?height=600&width=300&text=Video+1",
    "/placeholder.svg?height=600&width=300&text=Video+2",
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
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { region, loading } = useGeoLocation()
  
  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Get the current prices and content based on region
  const currentPrices = prices[region]
  const currentCurrency = currencyByRegion[region]
  const currentContent = content[region]

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
            <Link href="#proyectos" className="hover:text-red-500 transition-colors">
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
                  href="#proyectos" 
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
          <div className="relative w-full h-full">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="object-cover h-full w-full brightness-50"
              poster="/placeholder.svg?height=1080&width=1920"
              onError={(e) => {
                const target = e.target as HTMLVideoElement;
                target.style.display = 'none';
                const fallbackDiv = target.parentElement?.querySelector('.video-fallback');
                if (fallbackDiv) {
                  fallbackDiv.classList.remove('hidden');
                }
              }}
            >
              <source
                src="/videos/background.mp4"
                type="video/mp4"
              />
            </video>
            <div className="video-fallback hidden absolute inset-0 bg-zinc-900">
              <Image
                src="/placeholder.svg?height=1080&width=1920"
                alt="Background fallback"
                fill
                className="object-cover opacity-50"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 z-10 text-center md:text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent text-left md:text-center">
              {currentContent.hero.title}
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto text-left md:text-center">
              {currentContent.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-start md:justify-center">
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-xl text-lg font-medium"
                onClick={() => {
                  const section = document.getElementById('planes')
                  section?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {currentContent.hero.cta.primary}
              </Button>
              <Button
                variant="outline"
                className="border-zinc-700 text-white hover:bg-zinc-800 px-8 py-6 rounded-xl text-lg font-medium"
                onClick={() => window.location.href = "https://www.instagram.com/alphamarketing.agency/"}
              >
                {currentContent.hero.cta.secondary}
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <ChevronRight className="h-8 w-8 text-white rotate-90" />
        </div>
      </section>

      {/* Reels Section */}
      <section className="py-24 bg-zinc-900 flex items-center justify-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">¿Estás listo para hacer crecer tu negocio?</h2>
          <div className="flex justify-center items-center">
            <div className="relative w-[280px] h-[560px] border-[12px] border-zinc-800 rounded-[40px] overflow-hidden shadow-2xl shadow-red-500/10">
              <div className="absolute top-0 left-0 right-0 h-6 bg-zinc-800 z-10 rounded-t-lg"></div>
              <div className="relative w-full h-full">
                <VideoCarousel />
              </div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-zinc-700 rounded-full"></div>
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
              {currentContent.pricing.title}
            </h2>
            <p className="text-zinc-400 text-lg mb-8 text-left md:text-center">
              {currentContent.pricing.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {/* Basic Plan */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-red-500 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl blur transition duration-300"></div>
              <div className="relative h-full flex flex-col bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 group-hover:border-red-500/30 rounded-xl overflow-hidden transition-all duration-300">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                        Plan <br /> Básico
                      </h3>
                      <p className="text-white">{currentContent.pricing.plans.basic.description}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                      <span className="text-xl">✨</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end">
                      <span className="text-4xl font-bold text-white">{loading ? '...' : currentPrices.basic}</span>
                      <span className="text-zinc-500 ml-2 mb-1">{currentCurrency}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full py-6 bg-zinc-800 hover:bg-red-600 text-white transition-colors"
                    onClick={() => window.location.href = `https://wa.me/5493834058234?text=${encodeURIComponent('¡Hola! Me interesa el Plan Básico')}`}
                  >
                    Contacta ahora
                  </Button>
                </div>

                <div className="border-t border-zinc-800 p-8">
                  <p className="font-medium text-white mb-4">Incluye:</p>
                  <ul className="space-y-4">
                    {currentContent.pricing.plans.basic.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5 mr-3">
                          <Check className="text-emerald-500 h-3 w-3" />
                        </div>
                        <div>
                          <span className="text-zinc-300 block">{feature}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Intermediate Plan */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-red-500 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl blur transition duration-300"></div>
              <div className="relative h-full flex flex-col bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 group-hover:border-red-500/30 rounded-xl overflow-hidden transition-all duration-300">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                        Plan <br /> Intermedio
                      </h3>
                      <p className="text-white">{currentContent.pricing.plans.intermediate.description}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                      <span className="text-xl">🚀</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end">
                      <span className="text-4xl font-bold text-white">{loading ? '...' : currentPrices.intermediate}</span>
                      <span className="text-zinc-500 ml-2 mb-1">{currentCurrency}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full py-6 bg-zinc-800 hover:bg-red-600 text-white transition-colors"
                    onClick={() => window.location.href = `https://wa.me/5493834058234?text=${encodeURIComponent('¡Hola! Me interesa el Plan Intermedio')}`}
                  >
                    Contacta ahora
                  </Button>
                </div>

                <div className="border-t border-zinc-800 p-8">
                  <p className="font-medium text-white mb-4">Incluye:</p>
                  <ul className="space-y-4">
                    {currentContent.pricing.plans.intermediate.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5 mr-3">
                          <Check className="text-emerald-500 h-3 w-3" />
                        </div>
                        <div>
                          <span className="text-zinc-300 block">{feature}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-red-500 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl blur transition duration-300"></div>
              <div className="relative h-full flex flex-col bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 group-hover:border-red-500/30 rounded-xl overflow-hidden transition-all duration-300">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                        Plan <br /> Profesional
                      </h3>
                      <p className="text-white">{currentContent.pricing.plans.professional.description}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                      <span className="text-xl">💎</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end">
                      <span className="text-4xl font-bold text-white">{loading ? '...' : currentPrices.pro}</span>
                      <span className="text-zinc-500 ml-2 mb-1">{currentCurrency}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full py-6 bg-zinc-800 hover:bg-red-600 text-white transition-colors"
                    onClick={() => window.location.href = `https://wa.me/5493834058234?text=${encodeURIComponent('¡Hola! Me interesa el Plan Profesional')}`}
                  >
                    Contacta ahora
                  </Button>
                </div>

                <div className="border-t border-zinc-800 p-8">
                  <p className="font-medium text-white mb-4">Incluye:</p>
                  <ul className="space-y-4">
                    {currentContent.pricing.plans.professional.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5 mr-3">
                          <Check className="text-emerald-500 h-3 w-3" />
                        </div>
                        <div>
                          <span className="text-zinc-300 block">{feature}</span>
                        </div>
                      </li>
                    ))}
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
                        Plan <br /> Premium
                      </h3>
                      <p className="text-white">{currentContent.pricing.plans.premium.description}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                      <span className="text-xl">🌟</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end">
                      <span className="text-4xl font-bold text-white">{loading ? '...' : currentPrices.full}</span>
                      <span className="text-zinc-500 ml-2 mb-1">{currentCurrency}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full py-6 bg-zinc-800 hover:bg-red-600 text-white transition-colors"
                    onClick={() => window.location.href = `https://wa.me/5493834058234?text=${encodeURIComponent('¡Hola! Me interesa el Plan Premium')}`}
                  >
                    Contacta ahora
                  </Button>
                </div>

                <div className="border-t border-zinc-800 p-8">
                  <p className="font-medium text-white mb-4">Incluye:</p>
                  <ul className="space-y-4">
                    {currentContent.pricing.plans.premium.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5 mr-3">
                          <Check className="text-emerald-500 h-3 w-3" />
                        </div>
                        <div>
                          <span className="text-zinc-300 block">{feature}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Influencer Services Section */}
          <div className="group relative mt-16 mb-16">
            <div className="absolute -inset-0.5 bg-gradient-to-b from-red-500 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl blur transition duration-300"></div>
            <div className="relative flex flex-col bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 group-hover:border-red-500/30 rounded-xl overflow-hidden transition-all duration-300">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="inline-block px-3 py-1 rounded-md bg-red-500/10 text-red-500 text-sm font-medium">
                        Servicio de influencers
                      </div>
                      <div className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-medium animate-pulse">
                        NUEVO
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">
                      {currentContent.influencers.title}
                    </h3>
                    <p className="text-zinc-400">
                      {currentContent.influencers.description}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                    <span className="text-xl">⭐️</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
                  <div className="text-center sm:text-left">
                    <p className="text-zinc-500 text-sm mb-1">Precio</p>
                    <p className="text-3xl font-bold text-white">Consultar</p>
                  </div>
                  <Button 
                    className="w-full sm:w-auto whitespace-nowrap bg-zinc-800 hover:bg-red-600 text-white px-8 py-6 text-lg transition-colors"
                    onClick={() => window.location.href = `https://wa.me/5493834058234?text=${encodeURIComponent('¡Hola! Me interesa el servicio de influencers')}`}
                  >
                    Contactar ahora
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-xl p-8 w-full mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 text-left">¿Necesitas algo más personalizado?</h3>
                <p className="text-zinc-400 text-left">Diseñamos planes estratégicos a medida para adaptarnos a las necesidades de tu marca.</p>
              </div>
              <Button 
                className="whitespace-nowrap bg-red-600 hover:bg-red-700 text-white"
                onClick={() => window.location.href = 'https://wa.me/5493834058234'}
              >
                Contáctanos para plan personalizado
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Bento Grid */}
      <section id="proyectos" className="py-24 bg-zinc-900 relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black to-transparent"></div>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="text-center md:text-center mb-16">
            <p className="text-red-500 mb-2 text-lg text-left md:text-center">Proyectos</p>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent text-left md:text-center">
              Proyectos destacados
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[150px]">
            {/* Casa Bella - Large tile */}
            <Link href="https://www.instagram.com/reel/DJwtHeauUfB/" target="_blank" rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-xl md:col-span-2 md:row-span-2 shadow-lg shadow-red-500/5 cursor-pointer">
              <div className="relative w-full h-full">
                <video
                  src="/videos/bella.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLVideoElement;
                    target.style.display = 'none';
                    const fallbackDiv = target.parentElement?.querySelector('.video-fallback');
                    if (fallbackDiv) {
                      fallbackDiv.classList.remove('hidden');
                    }
                  }}
                />
                <div className="video-fallback hidden absolute inset-0">
                  <Image
                    src="/placeholder.svg?height=600&width=600&text=Casa+Bella"
                    alt="Casa Bella thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-600/20 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white">Casa Bella</h3>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">Casa Bella</h3>
                <p className="text-zinc-300 text-sm">Marketing & Contenido</p>
              </div>
            </Link>

            {/* Temple Gym */}
            <Link href="https://www.instagram.com/p/DHoz5olyJ8P/" target="_blank" rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-xl shadow-lg shadow-red-500/5 cursor-pointer">
              <div className="relative w-full h-full">
                <video
                  src="/videos/templeGym.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLVideoElement;
                    target.style.display = 'none';
                    const fallbackDiv = target.parentElement?.querySelector('.video-fallback');
                    if (fallbackDiv) {
                      fallbackDiv.classList.remove('hidden');
                    }
                  }}
                />
                <div className="video-fallback hidden absolute inset-0">
                  <Image
                    src="/placeholder.svg?height=400&width=400&text=Temple+Gym"
                    alt="Temple Gym thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-600/20 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white">Temple Gym</h3>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">Temple Gym</h3>
                <p className="text-zinc-300 text-sm">Branding & Social Media</p>
              </div>
            </Link>

            {/* Cono Pizza on Touch */}
            <Link href="https://www.instagram.com/p/DHrhpiNNtZn/" target="_blank" rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-xl shadow-lg shadow-red-500/5 cursor-pointer">
              <div className="relative w-full h-full">
                <video
                  src="/videos/conoPizza.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLVideoElement;
                    target.style.display = 'none';
                    const fallbackDiv = target.parentElement?.querySelector('.video-fallback');
                    if (fallbackDiv) {
                      fallbackDiv.classList.remove('hidden');
                    }
                  }}
                />
                <div className="video-fallback hidden absolute inset-0">
                  <Image
                    src="/placeholder.svg?height=400&width=400&text=Cono+Pizza"
                    alt="Cono Pizza thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-600/20 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white">Cono Pizza on Touch</h3>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">Cono Pizza on Touch</h3>
                <p className="text-zinc-300 text-sm">Marketing Digital</p>
              </div>
            </Link>

            {/* Knotty Bags */}
            <Link href="https://www.instagram.com/reel/DJb3T5hsTVg/" target="_blank" rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-xl md:col-span-2 md:row-span-3 shadow-lg shadow-red-500/5 cursor-pointer">
              <div className="relative w-full h-full">
                <video
                  src="/videos/bags.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLVideoElement;
                    target.style.display = 'none';
                    const fallbackDiv = target.parentElement?.querySelector('.video-fallback');
                    if (fallbackDiv) {
                      fallbackDiv.classList.remove('hidden');
                    }
                  }}
                />
                <div className="video-fallback hidden absolute inset-0">
                  <Image
                    src="/placeholder.svg?height=400&width=400&text=Knotty+Bags"
                    alt="Knotty Bags thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-600/20 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white">Knotty Bags</h3>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">Knotty Bags</h3>
                <p className="text-zinc-300 text-sm">Marketing & Contenido</p>
              </div>
            </Link>

            {/* Sanguchito ES */}
            <Link href="https://www.instagram.com/reel/DJW_hjxsEPi/?igsh=MXdrY2p1Y3htYmRhYg==" target="_blank" rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-xl shadow-lg shadow-red-500/5 cursor-pointer">
              <div className="relative w-full h-full">
                <video
                  src="/videos/sanguchito.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLVideoElement;
                    target.style.display = 'none';
                    const fallbackDiv = target.parentElement?.querySelector('.video-fallback');
                    if (fallbackDiv) {
                      fallbackDiv.classList.remove('hidden');
                    }
                  }}
                />
                <div className="video-fallback hidden absolute inset-0">
                  <Image
                    src="/placeholder.svg?height=400&width=400&text=Sanguchito+ES"
                    alt="Sanguchito ES thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-600/20 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white">Sanguchito ES</h3>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">Sanguchito ES</h3>
                <p className="text-zinc-300 text-sm">Marketing & Contenido</p>
              </div>
            </Link>

            {/* La Pepa Madrid */}
            <Link href="https://www.instagram.com/reel/DHZW8WBttI0/?igsh=MTZqanNlYjlzZ3pxaQ==" target="_blank" rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-xl shadow-lg shadow-red-500/5 cursor-pointer">
              <div className="relative w-full h-full">
                <video
                  src="/videos/LaPepaMadrid.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLVideoElement;
                    target.style.display = 'none';
                    const fallbackDiv = target.parentElement?.querySelector('.video-fallback');
                    if (fallbackDiv) {
                      fallbackDiv.classList.remove('hidden');
                    }
                  }}
                />
                <div className="video-fallback hidden absolute inset-0">
                  <Image
                    src="/placeholder.svg?height=400&width=400&text=La+Pepa+Madrid"
                    alt="La Pepa Madrid thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-600/20 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white">La Pepa Madrid</h3>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">La Pepa Madrid</h3>
                <p className="text-zinc-300 text-sm">Marketing & Contenido</p>
              </div>
            </Link>

            {/* Power Feet */}
            <Link href="https://www.instagram.com/reel/DHT9AEyowz5/?igsh=N2F2NzBkZjcyYXBi" target="_blank" rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-xl shadow-lg shadow-red-500/5 cursor-pointer">
              <div className="relative w-full h-full">
                <video
                  src="/videos/powerFeet.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLVideoElement;
                    target.style.display = 'none';
                    const fallbackDiv = target.parentElement?.querySelector('.video-fallback');
                    if (fallbackDiv) {
                      fallbackDiv.classList.remove('hidden');
                    }
                  }}
                />
                <div className="video-fallback hidden absolute inset-0">
                  <Image
                    src="/placeholder.svg?height=400&width=400&text=Power+Feet"
                    alt="Power Feet thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-600/20 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white">Power Feet</h3>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">Power Feet</h3>
                <p className="text-zinc-300 text-sm">Marketing & Contenido</p>
              </div>
            </Link>

          </div>

          <div className="flex justify-center mt-12">
            <Link href="https://www.instagram.com/alphamarketing.agency/">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8">VER TODO</Button>
            </Link>
          </div>

        </div>
      </section>


      {/* Team Section */}
      <section id="nosotros" className="py-24 bg-zinc-900 relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black to-transparent"></div>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <TeamCarousel />
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
                {currentContent.contact.title}
              </h2>
              <p className="text-zinc-400 mb-8 text-lg leading-relaxed text-left">
                ¡Ponte en contacto con nosotros y llevaremos tu marca al siguiente nivel!
              </p>
              <div className="space-y-6">
                {/* WhatsApp */}
                <div className="flex items-center group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-zinc-300 group-hover:text-white transition-colors text-left">
                    <a href="https://wa.me/5493834058234" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">
                      +54 9 383 405-8234
                    </a>
                  </p>
                </div>

                {/* Call */}
                <div className="flex items-center group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Headphones className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-zinc-300 group-hover:text-white transition-colors text-left">
                    <a href="tel:+34605222762" className="hover:text-red-400 transition-colors">
                      +34 605 222-762
                    </a>
                  </p>
                </div>

                {/* Email */}
                <div className="flex items-center group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-zinc-300 group-hover:text-white transition-colors text-left">
                    <a href="mailto:mimurilloo@gmail.com" className="hover:text-red-400 transition-colors">
                      mimurilloo@gmail.com
                    </a>
                  </p>
                </div>
              </div>
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
            
          </div>
        </footer>
      </div>
    </main>
  )
}

