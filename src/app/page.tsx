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
import { useEffect, useState } from "react"
import { ContactForm } from "@/components/ui/contact-form"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
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

  useEffect(() => {
    setIsVisible(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-gray-200/60 backdrop-blur-sm text-white py-3 px-4 sm:px-6 z-50 border-b border-gray-300/30 transition-all duration-300 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div
            className={`flex items-center space-x-2 sm:space-x-3 transform transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-white/50 backdrop-blur-md p-0.5">
              <Image
                src="/images/logo.png"
                alt="MYN Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-teal-600 bg-clip-text text-transparent">
              MYN
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav
            className={`hidden md:flex items-center space-x-1 transform transition-all duration-700 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
          >
            <a
              href="#servicios"
              className="px-4 py-2 rounded-md hover:bg-white/30 transition-all duration-300 relative group font-medium text-slate-800"
            >
              Servicios
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-4/5"></span>
            </a>
            <div className="h-4 w-px bg-gray-400/30"></div>
            <a
              href="#nosotros"
              className="px-4 py-2 rounded-md hover:bg-white/30 transition-all duration-300 relative group font-medium text-slate-800"
            >
              Nosotros
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-4/5"></span>
            </a>
            <div className="ml-4">
              <Button
                size="sm"
                className="bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white shadow-md"
                asChild
              >
                <a href="#contacto">
                  <Phone className="h-4 w-4 mr-2" /> Contactar
                </a>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-800 focus:outline-none p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md mt-3 rounded-lg shadow-lg p-4 mx-4 border border-gray-200 animate-fadeIn">
            <nav className="flex flex-col space-y-3">
              <a
                href="#servicios"
                className="px-4 py-3 rounded-md hover:bg-gray-100 transition-all duration-300 text-slate-800 font-medium text-center"
                onClick={closeMobileMenu}
              >
                Servicios
              </a>
              <a
                href="#nosotros"
                className="px-4 py-3 rounded-md hover:bg-gray-100 transition-all duration-300 text-slate-800 font-medium text-center"
                onClick={closeMobileMenu}
              >
                Nosotros
              </a>
              <a
                href="#contacto"
                className="px-4 py-3 rounded-md bg-gradient-to-r from-teal-500 to-teal-700 text-white font-medium flex items-center justify-center"
                onClick={closeMobileMenu}
              >
                <Phone className="h-4 w-4 mr-2" /> Contactar
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden pt-16">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/construccion.jpg"
            alt="Construcción MYN"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Overlay para mejor legibilidad del texto */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="container mx-auto text-center px-4 sm:px-6 relative z-10">
          <div
            className={`transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent leading-tight">
              Construcción y Renovación
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-2">Profesional</span>
            </h2>
          </div>

          <div
            className={`transform transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto text-gray-300 leading-relaxed px-4">
              Especialistas en pintura, revestimientos, electricidad, plomería y mantenimiento integral de edificios con
              <span className="text-yellow-400 font-semibold"> más de 15 años de experiencia</span>
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center transform transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105 group"
              asChild
            >
              <a href="tel:+5401132641442">
                <Phone className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 group-hover:animate-pulse" />
                Llamar Ahora
                <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full backdrop-blur-sm bg-white/10 transition-all duration-300 transform hover:scale-105 group"
              asChild
            >
              <a href="#servicios">
                Ver Servicios
                <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </Button>
          </div>

          {/* Stats - Responsive grid */}
          <div
            className={`grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 mt-12 sm:mt-16 transform transition-all duration-1000 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="text-center group">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                15+
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300">Años de Experiencia</div>
            </div>
            <div className="text-center group">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300">Proyectos Completados</div>
            </div>
            <div className="text-center group">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300">Clientes Satisfechos</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1 sm:mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="servicios"
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400/20 to-transparent"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
              Nuestros Servicios
            </h3>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Ofrecemos soluciones integrales con la más alta calidad y tecnología de vanguardia
            </p>
          </div>

          <div className="space-y-16 sm:space-y-20">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-8 sm:gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
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
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-base sm:text-lg text-gray-300">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Large Image Gallery - Optimized */}
                <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Main large image */}
                    <div className="col-span-2 relative group overflow-hidden rounded-2xl shadow-2xl">
                      <Image
                        src={
                          service.images && service.images[0]
                            ? service.images[0]
                            : "/placeholder.svg?height=400&width=600"
                        }
                        alt={`${service.title} - Imagen principal`}
                        width={600}
                        height={400}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="font-semibold text-lg">{service.title}</p>
                        <p className="text-sm text-gray-200">Trabajo profesional</p>
                      </div>
                    </div>

                    {/* Two smaller images */}
                    <div className="relative group overflow-hidden rounded-xl shadow-lg">
                      <Image
                        src={
                          service.images && service.images[1]
                            ? service.images[1]
                            : "/placeholder.svg?height=200&width=300"
                        }
                        alt={`${service.title} - Imagen 2`}
                        width={300}
                        height={200}
                        loading="lazy"
                        className="w-full h-32 sm:h-40 lg:h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    </div>

                    <div className="relative group overflow-hidden rounded-xl shadow-lg">
                      <Image
                        src={
                          service.images && service.images[2]
                            ? service.images[2]
                            : "/placeholder.svg?height=200&width=300"
                        }
                        alt={`${service.title} - Imagen 3`}
                        width={300}
                        height={200}
                        loading="lazy"
                        className="w-full h-32 sm:h-40 lg:h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Imagen de fondo integrada con máscara radial */}
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/images/imagen1.png"
            alt="MYN Background"
            fill
            className="object-cover object-center"
            style={{
              maskImage: "radial-gradient(ellipse 80% 60% at 70% 50%, black 40%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 70% 50%, black 40%, transparent 70%)",
            }}
          />
        </div>

        {/* Overlay gradiente para mejor legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/60"></div>

        {/* Patrón sutil superpuesto */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Contenido principal */}
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

              {/* Lista de características */}
              <div className="space-y-4 sm:space-y-6">
                {[
                  { icon: Award, text: "Profesionales certificados y con experiencia" },
                  { icon: Star, text: "Materiales de primera calidad" },
                  { icon: Clock, text: "Presupuestos sin compromiso" },
                  { icon: Users, text: "Garantía en todos nuestros trabajos" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center group hover:bg-white/80 hover:shadow-lg rounded-xl p-3 sm:p-4 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                  >
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-2 sm:p-3 mr-3 sm:mr-4 shadow-lg group-hover:shadow-yellow-400/25 transition-all duration-300 transform group-hover:scale-110">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <span className="text-base sm:text-lg font-medium text-gray-700 group-hover:text-slate-800 transition-colors duration-300">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Espacio para que la imagen de fondo se vea mejor */}
            <div className="hidden lg:block relative">
              {/* Elementos decorativos sutiles */}
              <div className="absolute top-10 right-10 w-32 h-32 border border-gray-200/50 rounded-full"></div>
              <div className="absolute bottom-10 left-10 w-24 h-24 border border-gray-200/30 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-gray-200/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contacto"
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-yellow-400 rounded-full filter blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
              Contactanos
            </h3>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Estamos listos para hacer realidad tu proyecto. Contactanos para un presupuesto personalizado con MYN.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <h4 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-yellow-400">Información de Contacto</h4>
              <div className="space-y-6 sm:space-y-8">
                {[
                  {
                    icon: Phone,
                    name: "Ignacio Sosa",
                    contact: "011 3264-1442",
                    color: "from-green-500 to-emerald-600",
                  },
                  {
                    icon: Phone,
                    name: "Mario de la Cruz",
                    contact: "011 7206-6971",
                    color: "from-blue-500 to-cyan-600",
                  },
                  {
                    icon: MapPin,
                    name: "Zona de Trabajo",
                    contact: "Buenos Aires y alrededores",
                    color: "from-purple-500 to-violet-600",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 sm:space-x-6 group hover:bg-white/10 rounded-2xl p-4 sm:p-6 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                  >
                    <div
                      className={`bg-gradient-to-br ${item.color} p-3 sm:p-4 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <item.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-lg sm:text-xl text-white group-hover:text-yellow-400 transition-colors duration-300">
                        {item.name}
                      </p>
                      <p className="text-gray-300 text-base sm:text-lg">{item.contact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl font-bold text-white">Solicitar Presupuesto</CardTitle>
                <CardDescription className="text-gray-300 text-base sm:text-lg">
                  Completá el formulario y te contactaremos en menos de 24 horas
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-8 sm:py-12 px-4 sm:px-6 border-t border-slate-800">
        <div className="container mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 transform hover:rotate-3">
                <Image
                  src="/images/logo.png"
                  alt="MYN Logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-teal-400 bg-clip-text text-transparent">
                MYN
              </h2>
            </div>
            <p className="text-gray-400 text-base sm:text-lg mb-4 sm:mb-6">Construcción y Renovación Profesional</p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 lg:space-x-12 text-sm sm:text-base lg:text-lg">
              <span className="hover:text-teal-400 transition-colors duration-300">Ignacio Sosa: 011 3264-1442</span>
              <span className="hover:text-teal-400 transition-colors duration-300">
                Mario de la Cruz: 011 7206-6971
              </span>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t border-slate-800 text-center text-gray-400">
            <p className="text-xs sm:text-sm">
              © 2024 MYN. Todos los derechos reservados. | Diseño y desarrollo profesional
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
