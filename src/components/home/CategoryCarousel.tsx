'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface CategoryCard {
  id: string
  title: string
  description?: string
  image: string
  href: string
}

interface CategoryCarouselProps {
  title: string
  cards: CategoryCard[]
}

export function CategoryCarousel({ title, cards }: CategoryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    updateScrollButtons()
    container.addEventListener('scroll', updateScrollButtons)
    window.addEventListener('resize', updateScrollButtons)

    return () => {
      container.removeEventListener('scroll', updateScrollButtons)
      window.removeEventListener('resize', updateScrollButtons)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = container.clientWidth * 0.8
    const targetScroll =
      container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    })
  }

  return (
    <section className="relative py-8">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-wide uppercase">{title}</h2>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`
              absolute left-0 top-1/2 -translate-y-1/2 z-10
              w-11 h-11 rounded-full bg-black/80 backdrop-blur-sm
              flex items-center justify-center
              transition-all duration-300 ease-out
              ${canScrollLeft ? 'opacity-40 hover:opacity-90 hover:scale-110' : 'opacity-0 pointer-events-none'}
              group-hover:opacity-90
            `}
            aria-label="Scorri a sinistra"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`
              absolute right-0 top-1/2 -translate-y-1/2 z-10
              w-11 h-11 rounded-full bg-black/80 backdrop-blur-sm
              flex items-center justify-center
              transition-all duration-300 ease-out
              ${canScrollRight ? 'opacity-40 hover:opacity-90 hover:scale-110' : 'opacity-0 pointer-events-none'}
              group-hover:opacity-90
            `}
            aria-label="Scorri a destra"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Cards Grid */}
          <div
            ref={scrollContainerRef}
            className="
              flex gap-6 overflow-x-auto scrollbar-hide
              snap-x snap-mandatory
              md:grid md:grid-cols-3 md:overflow-visible
            "
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {cards.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className="
                  relative group/card flex-shrink-0
                  w-[85vw] sm:w-[45vw] md:w-auto
                  aspect-[4/5] rounded-lg overflow-hidden
                  snap-start
                  transition-all duration-300
                  hover:scale-[1.02]
                "
              >
                {/* Card Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 transition-opacity duration-300 group-hover/card:from-black/90 group-hover/card:via-black/50" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-white drop-shadow-lg">
                      {card.title}
                    </h3>

                    {/* Bottom Content */}
                    <div className="space-y-3">
                      {card.description && (
                        <p className="text-sm text-gray-300 line-clamp-2">{card.description}</p>
                      )}

                      {/* CTA Button */}
                      <Button
                        className="
                          w-full bg-[#F5C400] hover:bg-[#F5C400]/90 text-black font-bold
                          transition-all duration-300
                          group-hover/card:translate-y-[-2px] group-hover/card:shadow-lg
                        "
                        size="lg"
                      >
                        ACQUISTA SUBITO
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {cards.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-600 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
