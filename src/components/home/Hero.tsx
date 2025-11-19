'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface HeroProps {
  title: string
  subtitle?: string
  image: string
  href: string
}

export function Hero({ title, subtitle, image, href }: HeroProps) {
  return (
    <Link
      href={href}
      className="
        relative block w-full h-[85vh] overflow-hidden
        group cursor-pointer
      "
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-20 md:pb-24">
        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards">
          {/* Title */}
          <h1
            className="
              text-6xl md:text-8xl lg:text-9xl
              font-bebas tracking-wider
              text-white
              drop-shadow-2xl
              leading-[0.9]
              mb-4
            "
          >
            {title}
          </h1>

          {/* Subtitle (optional) */}
          {subtitle && (
            <p
              className="
                text-xl md:text-2xl
                text-gray-300 font-medium
                max-w-xl
                animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 fill-mode-forwards
              "
            >
              {subtitle}
            </p>
          )}

          {/* Visual Indicator */}
          <div className="mt-8 flex items-center gap-3 text-white animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-forwards">
            <span className="text-lg font-bold uppercase tracking-widest border-b-2 border-[#D40000] pb-1">
              Esplora la collezione
            </span>
            <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2 text-[#D40000]" />
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <span className="sr-only">Vai a {title}</span>
    </Link>
  )
}
