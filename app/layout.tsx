import type React from "react"
import type { Metadata } from "next"
import { Inter, DM_Serif_Display } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
})

export const metadata: Metadata = {
  title: "Tu Desarrollador Web - Diseño con Alma y Estrategia",
  description:
    "Creando presencias digitales únicas para pymes y autónomos. Tu negocio es único, tu web también debería serlo.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${dmSerifDisplay.variable} font-sans`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
