"use server"

import nodemailer from "nodemailer"
import { z } from "zod"

// Esquema de validación
const formSchema = z.object({
    nombre: z.string().min(2, { message: "El nombre es requerido" }),
    apellido: z.string().min(2, { message: "El apellido es requerido" }),
    telefono: z.string().min(8, { message: "Ingrese un teléfono válido" }),
    email: z.string().email({ message: "Ingrese un email válido" }),
    servicio: z.string().min(1, { message: "Seleccione un servicio" }),
    mensaje: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres" }),
})

export type FormState = {
    errors?: {
        nombre?: string[]
        apellido?: string[]
        telefono?: string[]
        email?: string[]
        servicio?: string[]
        mensaje?: string[]
        _form?: string[]
    }
    success?: boolean
    message?: string
}

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
    // Extraer datos del formulario
    const nombre = formData.get("nombre") as string
    const apellido = formData.get("apellido") as string
    const telefono = formData.get("telefono") as string
    const email = formData.get("email") as string
    const servicio = formData.get("servicio") as string
    const mensaje = formData.get("mensaje") as string

    // Validar datos
    const validationResult = formSchema.safeParse({
        nombre,
        apellido,
        telefono,
        email,
        servicio,
        mensaje,
    })

    // Si hay errores de validación, retornarlos
    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors,
            success: false,
            message: "Por favor, complete todos los campos correctamente.",
        }
    }

    try {
        // Configurar transporte de nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER || "constructoraoficialmyn@gmail.com",
                pass: process.env.EMAIL_PASSWORD, // Asegúrate de configurar esta variable de entorno
            },
        })

        // Configurar el email
        const mailOptions = {
            from: `"Formulario Web MYN" <${process.env.EMAIL_USER || "constructoraoficialmyn@gmail.com"}>`,
            to: "constructoraoficialmyn@gmail.com",
            subject: `Nueva consulta de ${nombre} ${apellido} - ${servicio}`,
            html: `
        <h1>Nueva consulta desde el sitio web</h1>
        <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Servicio de interés:</strong> ${servicio}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, "<br>")}</p>
        <hr>
        <p>Este mensaje fue enviado desde el formulario de contacto del sitio web de MYN.</p>
      `,
        }

        // Enviar el email
        await transporter.sendMail(mailOptions)

        // Retornar éxito
        return {
            success: true,
            message: "¡Gracias por tu mensaje! Te contactaremos a la brevedad.",
        }
    } catch (error) {
        console.error("Error al enviar el email:", error)
        return {
            errors: {
                _form: ["Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente más tarde."],
            },
            success: false,
            message: "Error al enviar el formulario.",
        }
    }
}
