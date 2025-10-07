'use client'

import { useEffect } from 'react'
import { trackProductView } from '@/lib/analytics'
import type { Product } from '@/types/product'

type ProductViewTrackerProps = {
  product: Product
}

/**
 * Client component that tracks product view on mount
 * Wrap this around product detail content to track views
 */
export function ProductViewTracker({ product }: ProductViewTrackerProps) {
  useEffect(() => {
    trackProductView({
      productId: product.slug,
      productName: product.name,
      price: product.basePrice,
      category: product.competition,
      club: product.club,
    })
  }, [product])

  return null
}
