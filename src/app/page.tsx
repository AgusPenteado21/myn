"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Phone,
  MapPin,
  Home,
  Wrench,
  Paintbrush,
  Zap,
  Droplets,
  Building,
  Clock,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Menu,
  X,
} from "lucide-react"
import { useState, useCallback, memo, Suspense } from "react"
import { ContactForm } from "@/components/ui/contact-form"

// Skeleton loader component
const ImageSkeleton = ({ className }: { className: string }) => (
  <div className={`${className} bg-gray-300 animate-pulse rounded-xl`} />
)

// Optimized image component with progressive loading
const OptimizedImage = memo(
  ({
    src,
    alt,
    width,
    height,
    className,
    priority = false,
    quality = 50,
  }: {
    src: string
    alt: string
    width: number
    height: number
    className: string
    priority?: boolean
    quality?: number
  }) => (
    <Suspense fallback={<ImageSkeleton className={className} />}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        className={className}
        quality={quality}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </Suspense>
  ),
)

OptimizedImage.displayName = "OptimizedImage"

// Ultra-optimized service card component
const ServiceCard = memo(({ service, index }: { service: any; index: number }) => {
  const isVisible = index < 2 // Only load first 2 services immediately

  return (
    <div
      className={`grid lg:grid-cols-2 gap-8 sm:gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
    >
      {/* Content */}
      <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
        <div className="flex items-center space-x-4 mb-6">
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg`}>
            <service.icon className="h-8 w-8 text-white" />
          </div>
          <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{service.title}</h4>
        </div>

        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">{service.description}</p>

        <ul className="space-y-3">
          {service.features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-center text-base sm:text-lg text-gray-300">
              <CheckCircle className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Ultra-optimized Image Gallery */}
      <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
        <div className="grid grid-cols-2 gap-4">
          {/* Main large image - Ultra compressed */}
          <div className="col-span-2 relative overflow-hidden rounded-2xl shadow-2xl">
            <OptimizedImage
              src={service.images?.[0] || "/placeholder.svg?height=400&width=600"}
              alt={`${service.title} - Imagen principal`}
              width={600}
              height={400}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              priority={isVisible}
              quality={40} // Muy comprimido para velocidad
            />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="font-semibold text-lg">{service.title}</p>
              <p className="text-sm text-gray-200">Trabajo profesional</p>
            </div>
          </div>

          {/* Two smaller images - Even more compressed */}
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <OptimizedImage
              src={service.images?.[1] || "/placeholder.svg?height=200&width=300"}
              alt={`${service.title} - Imagen 2`}
              width={300}
              height={200}
              className="w-full h-32 sm:h-40 lg:h-48 object-cover"
              quality={30} // Máxima compresión
            />
          </div>

          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <OptimizedImage
              src={service.images?.[2] || "/placeholder.svg?height=200&width=300"}
              alt={`${service.title} - Imagen 3`}
              width={300}
              height={200}
              className="w-full h-32 sm:h-40 lg:h-48 object-cover"
              quality={30} // Máxima compresión
            />
          </div>
        </div>
      </div>
    </div>
  )
})

ServiceCard.displayName = "ServiceCard"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Datos de servicios con imágenes
  const servicesData = [
    {
      icon: Paintbrush,
      title: "Pintura en General",
      description: "Pintura interior y exterior con materiales de primera calidad",
      features: ["Trabajo en altura", "Revestimientos", "Acabados profesionales"],
      color: "from-red-500 to-pink-600",
      images: ["/images/pintura-1.png", "/images/pintura-2.png", "/images/pintura-3.png"],
    },
    {
      icon: Home,
      title: "Construcción Seca",
      description: "Durlock, cielorrasos y refacciones en general",
      features: ["Instalación de Durlock", "Cielorrasos", "Colocación de cerámica"],
      color: "from-blue-500 to-cyan-600",
      images: ["/images/durlock-1.jpg", "/images/durlock-2.jpg", "/images/durlock-3.jpg"],
    },
    {
      icon: Zap,
      title: "Electricidad",
      description: "Instalaciones eléctricas seguras y certificadas",
      features: ["Instalaciones nuevas", "Reparaciones", "Mantenimiento"],
      color: "from-yellow-500 to-orange-600",
      images: ["/images/electricidad-1.jpg", "/images/electricidad-2.jpg", "/images/electricidad-3.jpg"],
    },
    {
      icon: Droplets,
      title: "Plomería",
      description: "Desagües, plomería y mantenimiento de cañerías",
      features: ["Reparación de desagües", "Instalaciones sanitarias", "Mantenimiento preventivo"],
      color: "from-blue-600 to-indigo-700",
      images: ["/images/plomeria-1.jpg", "/images/plomeria-2.jpg", "/images/plomeria-3.jpg"],
    },
    {
      icon: Building,
      title: "Mantenimiento de Edificios",
      description: "Mantenimiento integral para edificios, quintas y casas",
      features: ["Mantenimiento preventivo", "Reparaciones generales", "Limpieza de fachadas"],
      color: "from-green-500 to-emerald-600",
      images: ["/images/mantenimiento-1.jpeg", "/images/mantenimiento-2.jpeg", "/images/mantenimiento-3.jpeg"],
    },
    {
      icon: Wrench,
      title: "Albañilería",
      description: "Trabajos de albañilería y refacciones generales",
      features: ["Refacciones en general", "Reparaciones estructurales", "Trabajos de mampostería"],
      color: "from-purple-500 to-violet-600",
      images: ["/images/albanileria-1.jpg", "/images/albanileria-2.jpg", "/images/albanileria-3.jpg"],
    },
  ]

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Ultra simplified */}
      <header className="fixed top-0 w-full bg-white/95 py-3 px-4 sm:px-6 z-50 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden shadow-md">
              <OptimizedImage
                src="/images/logo.png"
                alt="MYN Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                priority={true}
                quality={60}
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">MYN</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#servicios" className="px-4 py-2 text-slate-700 hover:text-teal-600 font-medium">
              Servicios
            </a>
            <a href="#nosotros" className="px-4 py-2 text-slate-700 hover:text-teal-600 font-medium">
              Nosotros
            </a>
            <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white" asChild>
              <a href="#contacto">
                <Phone className="h-4 w-4 mr-2" /> Contactar
              </a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-800 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white mt-3 rounded-lg shadow-lg p-4 mx-4 border border-gray-200">
            <nav className="flex flex-col space-y-3">
              <a
                href="#servicios"
                className="px-4 py-3 text-slate-800 font-medium text-center"
                onClick={closeMobileMenu}
              >
                Servicios
              </a>
              <a
                href="#nosotros"
                className="px-4 py-3 text-slate-800 font-medium text-center"
                onClick={closeMobileMenu}
              >
                Nosotros
              </a>
              <a
                href="#contacto"
                className="px-4 py-3 bg-teal-600 text-white font-medium flex items-center justify-center rounded-md"
                onClick={closeMobileMenu}
              >
                <Phone className="h-4 w-4 mr-2" /> Contactar
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section - Optimized */}
      <section className="relative min-h-screen flex items-center justify-center bg-slate-900 text-white pt-16">
        <div className="absolute inset-0">
          <OptimizedImage
            src="/images/construccion.jpg"
            alt="Construcción MYN"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            priority={true}
            quality={60}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="container mx-auto text-center px-4 sm:px-6 relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            Construcción y Renovación
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 text-yellow-400">Profesional</span>
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300 leading-relaxed">
            Especialistas en pintura, revestimientos, electricidad, plomería y mantenimiento integral de edificios con
            <span className="text-yellow-400 font-semibold"> más de 15 años de experiencia</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 rounded-full"
              asChild
            >
              <a href="tel:+5401132641442">
                <Phone className="mr-3 h-5 w-5" />
                Llamar Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-full"
              asChild
            >
              <a href="#servicios">
                Ver Servicios
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">15+</div>
              <div className="text-sm md:text-base text-gray-300">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-sm md:text-base text-gray-300">Proyectos Completados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">100%</div>
              <div className="text-sm md:text-base text-gray-300">Clientes Satisfechos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Progressive Loading */}
      <section id="servicios" className="py-20 px-4 sm:px-6 bg-slate-900 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
              Nuestros <span className="text-yellow-400">Servicios</span>
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ofrecemos soluciones integrales con la más alta calidad y tecnología de vanguardia
            </p>
          </div>

          <div className="space-y-20">
            {servicesData.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Optimized */}
      <section id="nosotros" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <OptimizedImage
            src="/images/imagen1.png"
            alt="MYN Background"
            width={1200}
            height={800}
            className="w-full h-full object-cover object-center"
            quality={40}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/60"></div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  ¿Por qué elegir MYN?
                </h3>
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                  Con más de 15 años de experiencia en el sector de la construcción y renovación, ofrecemos servicios
                  integrales con la más alta calidad, profesionalismo y tecnología de vanguardia.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {[
                  { icon: Award, text: "Profesionales certificados y con experiencia" },
                  { icon: Star, text: "Materiales de primera calidad" },
                  { icon: Clock, text: "Presupuestos sin compromiso" },
                  { icon: Users, text: "Garantía en todos nuestros trabajos" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center p-3 sm:p-4 bg-white/80 rounded-xl shadow-lg">
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-2 sm:p-3 mr-3 sm:mr-4 shadow-lg">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <span className="text-base sm:text-lg font-medium text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="absolute top-10 right-10 w-32 h-32 border border-gray-200/50 rounded-full"></div>
              <div className="absolute bottom-10 left-10 w-24 h-24 border border-gray-200/30 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-gray-200/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 px-4 sm:px-6 bg-slate-900 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
              Contacta<span className="text-yellow-400">nos</span>
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Estamos listos para hacer realidad tu proyecto. Contactanos para un presupuesto personalizado con MYN.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h4 className="text-3xl font-bold text-yellow-400">Información de Contacto</h4>
              <div className="space-y-8">
                {[
                  {
                    icon: Phone,
                    name: "Ignacio Sosa",
                    contact: "011 3264-1442",
                    phone: "tel:+5401132641442",
                    color: "bg-green-600",
                  },
                  {
                    icon: Phone,
                    name: "Mario de la Cruz",
                    contact: "011 7206-6971",
                    phone: "tel:+5401172066971",
                    color: "bg-blue-600",
                  },
                  {
                    icon: MapPin,
                    name: "Zona de Trabajo",
                    contact: "Buenos Aires y alrededores",
                    phone: null,
                    color: "bg-purple-600",
                  },
                ].map((item, index) =>
                  item.phone ? (
                    <a
                      key={index}
                      href={item.phone}
                      className="flex items-center space-x-6 p-6 bg-white/10 rounded-2xl hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group"
                    >
                      <div
                        className={`${item.color} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}
                      >
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-xl text-white group-hover:text-yellow-400 transition-colors duration-300">
                          {item.name}
                        </p>
                        <p className="text-gray-300 text-lg group-hover:text-yellow-200 transition-colors duration-300">
                          {item.contact}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div key={index} className="flex items-center space-x-6 p-6 bg-white/10 rounded-2xl">
                      <div className={`${item.color} p-4 rounded-2xl`}>
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-xl text-white">{item.name}</p>
                        <p className="text-gray-300 text-lg">{item.contact}</p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            <Card className="bg-white/10 border-white/20">
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold text-white">Solicitar Presupuesto</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Completá el formulario y te contactaremos en menos de 24 horas
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-2xl overflow-hidden">
                <OptimizedImage
                  src="/images/logo.png"
                  alt="MYN Logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  quality={60}
                />
              </div>
              <h2 className="text-4xl font-bold text-white">MYN</h2>
            </div>
            <p className="text-gray-400 text-lg mb-6">Construcción y Renovación Profesional</p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-12 text-lg">
              <a href="tel:+5401132641442" className="hover:text-yellow-400 transition-colors duration-200">
                Ignacio Sosa: 011 3264-1442
              </a>
              <a href="tel:+5401172066971" className="hover:text-yellow-400 transition-colors duration-200">
                Mario de la Cruz: 011 7206-6971
              </a>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-gray-400">
            <p>© 2024 MYN. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
