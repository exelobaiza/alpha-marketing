import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alpha Marketing',
  description: 'Alpha Marketing Agency - Potencia tu presencia en redes sociales',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" style={{ scrollBehavior: 'smooth' }}>
      <body>{children}</body>
    </html>
  )
}
