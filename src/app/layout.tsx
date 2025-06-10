import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ToastContainer } from "@/components/ui/toast-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MYN - Construcción y Renovación Profesional",
  description: "Especialistas en pintura, revestimientos, electricidad, plomería y mantenimiento integral de edificios",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
