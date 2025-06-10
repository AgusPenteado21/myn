"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useFormState } from "react-dom"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, ArrowRight, Loader2 } from "lucide-react"
import { submitContactForm, type FormState } from "@/actions/contact-form"

const initialState: FormState = {}

export function ContactForm() {
    const [state, formAction] = useFormState(submitContactForm, initialState)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [hasShownToast, setHasShownToast] = useState(false)
    const { toast } = useToast()

    // Estados para validación del lado del cliente
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        servicio: "",
        mensaje: "",
    })

    // Función para validar el formulario
    const isFormValid = () => {
        return (
            formData.nombre.length >= 2 &&
            formData.apellido.length >= 2 &&
            formData.telefono.length >= 8 &&
            formData.email.includes("@") &&
            formData.email.includes(".") &&
            formData.servicio.length > 0 &&
            formData.mensaje.length >= 10
        )
    }

    // Manejar cambios en los inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Usar useEffect para manejar los toasts y evitar bucles infinitos
    useEffect(() => {
        if (state.success && !hasShownToast) {
            toast({
                title: "¡Mensaje enviado!",
                description: state.message,
                variant: "success",
            })
            setHasShownToast(true)
            setIsSubmitting(false)
            // Limpiar el formulario después del éxito
            setFormData({
                nombre: "",
                apellido: "",
                telefono: "",
                email: "",
                servicio: "",
                mensaje: "",
            })
        } else if (state.errors?._form && !hasShownToast) {
            toast({
                title: "Error",
                description: state.errors._form[0],
                variant: "destructive",
            })
            setHasShownToast(true)
            setIsSubmitting(false)
        }
    }, [state, hasShownToast, toast])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevenir envío si el formulario no es válido
        if (!isFormValid()) {
            e.preventDefault()
            toast({
                title: "Formulario incompleto",
                description: "Por favor, complete todos los campos correctamente antes de enviar.",
                variant: "destructive",
            })
            return
        }

        setIsSubmitting(true)
        setHasShownToast(false) // Reset para permitir nuevos toasts
    }

    return (
        <form action={formAction} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-white font-medium text-sm sm:text-base">
                        Nombre
                    </Label>
                    <Input
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Tu nombre"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400 transition-all duration-300 text-sm sm:text-base"
                    />
                    {state.errors?.nombre && <p className="text-red-400 text-xs mt-1">{state.errors.nombre[0]}</p>}
                    {formData.nombre.length > 0 && formData.nombre.length < 2 && (
                        <p className="text-red-400 text-xs mt-1">El nombre debe tener al menos 2 caracteres</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="apellido" className="text-white font-medium text-sm sm:text-base">
                        Apellido
                    </Label>
                    <Input
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleInputChange}
                        placeholder="Tu apellido"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400 transition-all duration-300 text-sm sm:text-base"
                    />
                    {state.errors?.apellido && <p className="text-red-400 text-xs mt-1">{state.errors.apellido[0]}</p>}
                    {formData.apellido.length > 0 && formData.apellido.length < 2 && (
                        <p className="text-red-400 text-xs mt-1">El apellido debe tener al menos 2 caracteres</p>
                    )}
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="telefono" className="text-white font-medium text-sm sm:text-base">
                    Teléfono
                </Label>
                <Input
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="Tu número de teléfono"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400 transition-all duration-300 text-sm sm:text-base"
                />
                {state.errors?.telefono && <p className="text-red-400 text-xs mt-1">{state.errors.telefono[0]}</p>}
                {formData.telefono.length > 0 && formData.telefono.length < 8 && (
                    <p className="text-red-400 text-xs mt-1">El teléfono debe tener al menos 8 caracteres</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium text-sm sm:text-base">
                    Email
                </Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400 transition-all duration-300 text-sm sm:text-base"
                />
                {state.errors?.email && <p className="text-red-400 text-xs mt-1">{state.errors.email[0]}</p>}
                {formData.email.length > 0 && (!formData.email.includes("@") || !formData.email.includes(".")) && (
                    <p className="text-red-400 text-xs mt-1">Ingrese un email válido</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="servicio" className="text-white font-medium text-sm sm:text-base">
                    Servicio de Interés
                </Label>
                <select
                    id="servicio"
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleInputChange}
                    className="w-full p-2 sm:p-3 bg-white/10 border border-white/20 rounded-md text-white focus:border-yellow-400 focus:ring-yellow-400 transition-all duration-300 text-sm sm:text-base"
                >
                    <option value="" className="bg-slate-800">
                        Seleccionar servicio
                    </option>
                    <option value="Pintura en general" className="bg-slate-800">
                        Pintura en general
                    </option>
                    <option value="Durlock y cielorrasos" className="bg-slate-800">
                        Durlock y cielorrasos
                    </option>
                    <option value="Electricidad" className="bg-slate-800">
                        Electricidad
                    </option>
                    <option value="Plomería" className="bg-slate-800">
                        Plomería
                    </option>
                    <option value="Mantenimiento de edificios" className="bg-slate-800">
                        Mantenimiento de edificios
                    </option>
                    <option value="Albañilería" className="bg-slate-800">
                        Albañilería
                    </option>
                    <option value="Otro" className="bg-slate-800">
                        Otro
                    </option>
                </select>
                {state.errors?.servicio && <p className="text-red-400 text-xs mt-1">{state.errors.servicio[0]}</p>}
                {formData.servicio.length === 0 && <p className="text-yellow-400 text-xs mt-1">Seleccione un servicio</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="mensaje" className="text-white font-medium text-sm sm:text-base">
                    Mensaje
                </Label>
                <Textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    placeholder="Contanos sobre tu proyecto..."
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400 transition-all duration-300 text-sm sm:text-base"
                />
                {state.errors?.mensaje && <p className="text-red-400 text-xs mt-1">{state.errors.mensaje[0]}</p>}
                {formData.mensaje.length > 0 && formData.mensaje.length < 10 && (
                    <p className="text-red-400 text-xs mt-1">
                        El mensaje debe tener al menos 10 caracteres ({formData.mensaje.length}/10)
                    </p>
                )}
            </div>
            <Button
                type="submit"
                disabled={isSubmitting || !isFormValid()}
                className={`w-full font-bold py-3 sm:py-4 rounded-full shadow-2xl transition-all duration-300 transform group text-sm sm:text-base ${isFormValid() && !isSubmitting
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black hover:shadow-yellow-400/25 hover:scale-105"
                        : "bg-gray-500 text-gray-300 cursor-not-allowed"
                    }`}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 animate-spin" />
                        Enviando...
                    </>
                ) : !isFormValid() ? (
                    <>
                        <Mail className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5" />
                        Complete todos los campos
                    </>
                ) : (
                    <>
                        <Mail className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 group-hover:animate-pulse" />
                        Enviar Consulta
                        <ArrowRight className="ml-2 sm:ml-3 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                )}
            </Button>

            {state.errors?._form && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-md">
                    <p className="text-red-200 text-sm">{state.errors._form[0]}</p>
                </div>
            )}

            {state.success && (
                <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-md">
                    <p className="text-green-200 text-sm">{state.message}</p>
                </div>
            )}
        </form>
    )
}
