import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Alpha Marketing Agency',
  description: 'Agencia de Marketing Digital y Creación de Contenido',
  icons: {
    icon: '/images/fav.png',
  },
  openGraph: {
    title: 'Alpha Marketing Agency',
    description: 'Potencia tu presencia en redes sociales con estrategias digitales innovadoras',
    images: [
      {
        url: '/images/cover.png',
        width: 1200,
        height: 630,
        alt: 'Alpha Marketing Agency Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alpha Marketing Agency',
    description: 'Potencia tu presencia en redes sociales con estrategias digitales innovadoras',
    images: ['/images/cover.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
