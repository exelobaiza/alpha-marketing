import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Headphones, Phone, ChevronRight, Star, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/placeholder.svg?height=40&width=120&text=ALPHA"
                alt="Alpha Marketing Agency"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6 uppercase text-sm font-medium">
            <Link href="#" className="hover:text-red-500 transition-colors">
              Inicio
            </Link>
            <Link href="#" className="hover:text-red-500 transition-colors">
              Nosotros
            </Link>
            <Link href="#" className="hover:text-red-500 transition-colors">
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
          >
            Menu
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Hero background"
            fill
            className="object-cover brightness-30 filter"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        </div>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="inline-block px-4 py-1 rounded-full bg-red-500/10 text-red-500 text-sm font-medium mb-4">
              Digital Marketing Experts
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Potencia tu presencia
              <br />
              en redes sociales
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Transformamos tu marca con estrategias digitales innovadoras y contenido de alto impacto
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-xl text-lg font-medium">
                VER TIENDA
              </Button>
              <Button
                variant="outline"
                className="border-zinc-700 text-white hover:bg-zinc-800 px-8 py-6 rounded-xl text-lg font-medium"
              >
                SUMATE AL EQUIPO!
              </Button>
            </div>
            <p className="text-xl mt-8">
              <span className="text-zinc-400">Packs de contenido desde </span>
              <span className="text-white font-bold">$199.999 ARS</span>
            </p>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <ChevronRight className="h-8 w-8 text-white rotate-90" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-5">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex justify-center">
          <Link href="#" className="font-bold hover:underline flex items-center text-lg">
            VISITA NUESTRA TIENDA
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
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
              <h3 className="text-red-500 font-bold mb-2 text-xl">Reels</h3>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                De baja complejidad
              </h2>
              <p className="text-zinc-400 mb-8 text-lg leading-relaxed">
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
                <Image
                  src="/placeholder.svg?height=600&width=300&text=Reel+Example"
                  alt="Reel example"
                  width={300}
                  height={600}
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-zinc-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-zinc-900 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-md bg-red-500/10 text-red-500 text-sm font-medium mb-4">
              Precios Competitivos
            </div>
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Nuestros Planes
            </h2>
            <p className="text-red-500 text-lg">Planes Mensuales</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 rounded-xl overflow-hidden hover:border-red-500/30 transition-colors group">
              <div className="h-2 bg-gradient-to-r from-red-500 to-red-700 opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 group-hover:text-red-500 transition-colors">Basic Plan</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <Check className="text-red-500 mr-3 h-5 w-5 mt-0.5" />
                    <span className="text-zinc-300">2 Reels Alta Complejidad</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-red-500 mr-3 h-5 w-5 mt-0.5" />
                    <span className="text-zinc-300">2 Reels Baja Complejidad</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-red-500 mr-3 h-5 w-5 mt-0.5" />
                    <span className="text-zinc-300">2 Horas de Producción Audiovisual</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-red-500 mr-3 h-5 w-5 mt-0.5" />
                    <span className="text-zinc-300">Manejo de Redes Sociales</span>
                  </li>
                </ul>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">$ 599.999</p>
                  <p className="text-sm text-zinc-500">ARS / mensual</p>
                </div>
                <Button className="w-full mt-8 bg-zinc-800 hover:bg-red-600 text-white transition-colors">
                  Seleccionar
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-zinc-900/50 backdrop-blur-sm border-red-500/30 rounded-xl overflow-hidden transform scale-105 shadow-xl relative">
              <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <div className="h-2 bg-gradient-to-r from-red-500 to-red-700"></div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-red-500">Pro Plan</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <Check className="text-red-500 mr-3 h-5 w-5 mt-0.5" />
                    <span className="text-zinc-300">4 Reels Alta Complejidad</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-red-500 mr-3 h-5 w-5 mt-0.5" />
                    <span className="text-zinc-300">4 Reels Baja Complejidad</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-red-500 mr-3 h-5 w-5 mt-0.5" />
                    <span className="text-zinc-300">4 Horas de Producción Audiovisual</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-red-500 mr-3 h-5 w-5 mt-0.5" />
                    <span className="text-zinc-300">Manejo de Redes Sociales</span>
                  </li>
                </ul>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">$ 999.999</p>
                  <p className="text-sm text-zinc-500">ARS / mensual</p>
                </div>
                <Button className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white">Seleccionar</Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 rounded-xl overflow-hidden hover:border-red-500/30 transition-colors group">
              <div className="h-2 bg-gradient-to-r from-red-500 to-red-700 opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 group-hover:text-red-500 transition-colors">Premium Plan</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <Check className="text-red-500 mr-3 h-5 w-5 mt-0.5" />
                    <span className="text-zinc-300">4 Reels Alta Complejidad</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-red-500 mr-3 h-5 w-5 mt-0.5" />
                    <span className="text-zinc-300">4 Reels Baja Complejidad</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-red-500 mr-3 h-5 w-5 mt-0.5" />
                    <span className="text-zinc-300">4 Horas de Producción Audiovisual</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-red-500 mr-3 h-5 w-5 mt-0.5" />
                    <span className="text-zinc-300">Servicio Web Completo</span>
                  </li>
                </ul>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">$ 1.199.999</p>
                  <p className="text-sm text-zinc-500">ARS / mensual</p>
                </div>
                <Button className="w-full mt-8 bg-zinc-800 hover:bg-red-600 text-white transition-colors">
                  Seleccionar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section - Bento Grid */}
      <section className="py-24 bg-zinc-900 relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black to-transparent"></div>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-md bg-red-500/10 text-red-500 text-sm font-medium mb-4">
              Portfolio
            </div>
            <p className="text-red-500 mb-2 text-lg">Proyectos</p>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
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

          <div className="text-center mt-20">
            <p className="mb-2 text-zinc-400">Explora nuestros últimos proyectos WEBS</p>
            <h3 className="text-xl font-bold text-red-500">GALERIA WEB</h3>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-md bg-red-500/10 text-red-500 text-sm font-medium mb-4">
              Metodología
            </div>
            <p className="text-red-500 mb-2 text-lg">¿Como lo hacemos?</p>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Nuestro Proceso
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/30 backdrop-blur-sm p-8 rounded-xl border border-zinc-800 hover:border-red-500/30 transition-all hover:shadow-lg hover:shadow-red-500/5 group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center group-hover:text-red-500 transition-colors">
                PLANIFICAMOS EL QUÉ
              </h3>
              <p className="text-zinc-400 text-center">
                Empezamos escuchando tus necesidades y a quién te diriges. Planificamos el contenido según el plan
                elegido y, una vez aprobado, organizamos el calendario de grabación con una semana de anticipación.
              </p>
            </div>

            <div className="bg-zinc-900/30 backdrop-blur-sm p-8 rounded-xl border border-zinc-800 hover:border-red-500/30 transition-all hover:shadow-lg hover:shadow-red-500/5 group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center group-hover:text-red-500 transition-colors">
                HORA DE GRABAR
              </h3>
              <p className="text-zinc-400 text-center">
                Con la planificación lista, producimos el contenido. Usamos equipo de alta calidad para grabar en
                jornadas de 4 horas, capturando todo el material necesario, ya sea fotografía o video.
              </p>
            </div>

            <div className="bg-zinc-900/30 backdrop-blur-sm p-8 rounded-xl border border-zinc-800 hover:border-red-500/30 transition-all hover:shadow-lg hover:shadow-red-500/5 group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center group-hover:text-red-500 transition-colors">
                SE COCINA Y DISTRIBUYE
              </h3>
              <p className="text-zinc-400 text-center">
                Editamos el contenido y lo distribuimos. Realizamos las correcciones necesarias, añadimos animaciones y
                entregamos el material en 1080p Full HD. El contenido final se publica con su copy y calendario en
                Notion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-zinc-900 relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black to-transparent"></div>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-red-700 rounded-xl opacity-20 blur-lg"></div>
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=800&width=600&text=Juan+Vargiu"
                    alt="Juan Vargiu"
                    width={600}
                    height={800}
                    className="object-cover w-full h-auto"
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-block px-3 py-1 rounded-md bg-red-500/10 text-red-500 text-sm font-medium mb-4">
                Nuestro Equipo
              </div>
              <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Juan Vargiu
              </h3>
              <p className="text-red-500 text-xl mb-6">Fundador y CEO</p>
              <div className="flex mb-6">
                <div className="px-4 py-2 bg-zinc-800 rounded-lg mr-3">
                  <p className="text-sm text-white">Marketing Digital</p>
                </div>
                <div className="px-4 py-2 bg-zinc-800 rounded-lg mr-3">
                  <p className="text-sm text-white">Estrategia</p>
                </div>
                <div className="px-4 py-2 bg-zinc-800 rounded-lg">
                  <p className="text-sm text-white">Ventas</p>
                </div>
              </div>
              <p className="text-zinc-300 text-lg leading-relaxed">
                Es un líder clave en la planificación estratégica y la ejecución operativa de todos los proyectos. Con
                una visión clara y un enfoque práctico, garantiza que cada cliente reciba un servicio personalizado y de
                alta calidad. Su liderazgo y compromiso son fundamentales para el éxito de Alpha, donde cada tarea se
                organiza cuidadosamente para cumplir los objetivos y superar las expectativas.
              </p>
              <Button className="mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-3">Conoce al equipo</Button>
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
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Tienes alguna
                <br />
                pregunta?
              </h2>
              <p className="text-red-500 text-xl mb-6">Te respondemos!</p>
              <p className="text-zinc-400 mb-8 text-lg leading-relaxed">
                ¡Estamos aquí para ayudarte a impulsar tu negocio al siguiente nivel! Si estás listo para mejorar tu
                presencia digital, aumentar tus ventas o simplemente llevar tu marca a más personas, no dudes en
                contactarnos. llámanos o escríbenos, ¡estamos listos para escucharte!
              </p>
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <span className="text-white text-lg">📍</span>
                  </div>
                  <p className="text-zinc-300 group-hover:text-white transition-colors">
                    Sarmiento, 717 Catamarca, ARG
                  </p>
                </div>
                <div className="flex items-center group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-zinc-300 group-hover:text-white transition-colors">+54 9 3834 93-2685</p>
                </div>
              </div>
              <Button className="mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-3">Contáctanos</Button>
            </div>
            <div className="md:w-1/2 flex justify-center">
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
      <footer className="py-12 bg-zinc-900 border-t border-zinc-800">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-6 md:mb-0">
              <Link href="/">
                <Image
                  src="/placeholder.svg?height=40&width=120&text=ALPHA"
                  alt="Alpha Marketing Agency"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-zinc-400 hover:text-red-500 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-red-500 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-red-500 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-sm text-zinc-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} Alpha Marketing Agency. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-sm text-zinc-500 hover:text-red-500 transition-colors">
                Términos de Servicio
              </Link>
              <Link href="#" className="text-sm text-zinc-500 hover:text-red-500 transition-colors">
                Política de Privacidad
              </Link>
              <Link href="#" className="text-sm text-zinc-500 hover:text-red-500 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

