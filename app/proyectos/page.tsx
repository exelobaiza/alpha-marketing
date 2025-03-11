import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ProyectosPage() {
  return (
    <div className="min-h-screen bg-black text-white relative flex items-center justify-center">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920&text=Projects+Background"
          alt="Projects background"
          fill
          className="object-cover brightness-30 filter blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
      </div>

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
            <Link href="/" className="hover:text-red-500 transition-colors">
              Inicio
            </Link>
            <Link href="#" className="hover:text-red-500 transition-colors">
              Nosotros
            </Link>
            <Link href="#" className="hover:text-red-500 transition-colors">
              Planes
            </Link>
            <Link href="/proyectos" className="text-red-500 transition-colors">
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

      {/* Coming Soon Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="inline-block px-4 py-1 rounded-full bg-red-500/10 text-red-500 text-sm font-medium mb-4">
            Próximamente
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Proyectos
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Estamos trabajando en una galería impresionante para mostrar nuestros mejores proyectos. ¡Vuelve pronto para
            descubrir nuestro trabajo!
          </p>
          <div className="pt-8">
            <Link href="/">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-xl text-lg font-medium">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

