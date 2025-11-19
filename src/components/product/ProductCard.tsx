'use client'

import Link from 'next/link'
import { ProductImage } from '@/components/ui/ProductImage'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart } from 'lucide-react'

interface Product {
  slug: string
  name: string
  description: string
  basePrice: number
  images: {
    main: string
  }
  competition?: string
  allowCustomization?: boolean
  sizes: { stock: number }[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const totalStock = product.sizes.reduce((sum, s) => sum + s.stock, 0)

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative block bg-[#1a1a1a] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50"
    >
      {/* Image Container */}
      <div className="aspect-square relative bg-[#121212] overflow-hidden">
        <ProductImage
          src={product.images.main}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.allowCustomization && (
            <Badge className="bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-black/70">
              Custom
            </Badge>
          )}
        </div>

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
          <button className="w-full bg-[#D40000] text-white py-3 rounded-lg font-bebas tracking-wider flex items-center justify-center gap-2 hover:bg-[#b30000] transition-colors shadow-lg">
            <ShoppingCart className="w-4 h-4" />
            Vedi Dettagli
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            {product.competition && (
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                {product.competition}
              </p>
            )}
            <h3 className="font-bold text-lg text-white group-hover:text-[#D40000] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>
        </div>

        <div className="flex items-end justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Prezzo</span>
            <span className="text-2xl font-bebas tracking-wide text-white">
              €{product.basePrice.toFixed(2)}
            </span>
          </div>
          <div className="text-xs text-gray-600 font-medium">
            {totalStock > 0 ? 'Disponibile' : 'Esaurito'}
          </div>
        </div>
      </div>
    </Link>
  )
}
