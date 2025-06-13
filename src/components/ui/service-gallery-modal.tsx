"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ServiceGalleryModalProps {
    isOpen: boolean
    onClose: () => void
    serviceName: string
    images: string[]
}

export function ServiceGalleryModal({ isOpen, onClose, serviceName, images }: ServiceGalleryModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    if (!isOpen) return null

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-xl font-bold text-gray-800">{serviceName} - Nuestros Trabajos</h3>
                    <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-gray-100">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Image Display */}
                <div className="relative">
                    <div className="aspect-video relative bg-gray-100">
                        <Image
                            src={images[currentImageIndex] || "/placeholder.svg"}
                            alt={`${serviceName} trabajo ${currentImageIndex + 1}`}
                            fill
                            className="object-cover"
                        />

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </>
                        )}

                        {/* Image Counter */}
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    </div>

                    {/* Thumbnail Strip */}
                    {images.length > 1 && (
                        <div className="p-4 border-t bg-gray-50">
                            <div className="flex gap-2 overflow-x-auto">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex
                                                ? "border-yellow-400 scale-105"
                                                : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <Image
                                            src={image || "/placeholder.svg"}
                                            alt={`Thumbnail ${index + 1}`}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
