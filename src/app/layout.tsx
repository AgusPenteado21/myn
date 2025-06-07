import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MYN - Construcción y Renovación Profesional",
  description: "Especialistas en pintura, revestimientos, electricidad, plomería y mantenimiento integral de edificios con más de 15 años de experiencia",
  keywords: "construcción, renovación, pintura, electricidad, plomería, durlock, albañilería, Buenos Aires",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}