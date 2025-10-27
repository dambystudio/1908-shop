'use client'

import Link from 'next/link'
import Image from 'next/image'

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
        relative block w-full h-[80vh] overflow-hidden
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
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/60" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-12 md:pb-16">
        <div className="max-w-2xl">
          {/* Title */}
          <h1
            className="
              text-5xl md:text-7xl lg:text-8xl
              font-bold uppercase tracking-wider
              text-white
              drop-shadow-2xl
              transition-transform duration-500
              group-hover:translate-x-1
            "
            style={{
              textShadow: '2px 2px 8px rgba(0,0,0,0.8), 4px 4px 16px rgba(0,0,0,0.6)',
            }}
          >
            {title}
          </h1>

          {/* Subtitle (optional) */}
          {subtitle && (
            <p
              className="
                mt-4 text-xl md:text-2xl
                text-gray-200 font-medium
                drop-shadow-lg
                transition-opacity duration-500
                group-hover:text-white
              "
            >
              {subtitle}
            </p>
          )}

          {/* Visual Indicator */}
          <div className="mt-6 flex items-center gap-3 text-[#F5C400] transition-transform duration-500 group-hover:translate-x-2">
            <span className="text-lg font-bold uppercase tracking-wide">Esplora</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-8 h-8 transition-transform duration-500 group-hover:translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <span className="sr-only">Vai a {title}</span>
    </Link>
  )
}
