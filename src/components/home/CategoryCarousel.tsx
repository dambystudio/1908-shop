import { ProductImage } from '@/components/ui/ProductImage'
import Link from 'next/link'

interface Category {
  name: string
  image: string
  link: string
}

interface CategoryCarouselProps {
  categories: Category[]
}

export function CategoryCarousel({ categories }: CategoryCarouselProps) {
  return (
    <section className="w-full bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.link}
              className="group relative block overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
            >
              {/* Image Container */}
              <div className="absolute inset-0">
                <ProductImage
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                {/* Gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="font-bebas text-4xl tracking-wider text-white mb-2">
                    {category.name}
                  </h3>
                  <div className="h-1 w-12 bg-[#D40000] transition-all duration-500 group-hover:w-full" />

                  <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500 opacity-0 group-hover:opacity-100 mt-4">
                    <span className="text-sm font-medium text-white uppercase tracking-widest border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white hover:text-black transition-colors">
                      Scopri Ora
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
