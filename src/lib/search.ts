import Fuse from 'fuse.js'
import type { Product } from '@/types/product'

const fuseOptions = {
  keys: [
    { name: 'name', weight: 2 },
    { name: 'club', weight: 1.5 },
    { name: 'competition', weight: 1 },
    { name: 'description', weight: 0.5 },
    { name: 'season', weight: 0.8 },
  ],
  threshold: 0.3, // 0.0 = perfect match, 1.0 = match anything
  includeScore: true,
  ignoreLocation: true,
}

let fuseInstance: Fuse<Product> | null = null

export function initSearchIndex(products: Product[]) {
  fuseInstance = new Fuse(products, fuseOptions)
}

export function searchProducts(query: string, products?: Product[]): Product[] {
  if (!query) return products || []

  // Initialize if needed and products provided
  if (!fuseInstance && products) {
    initSearchIndex(products)
  }

  if (!fuseInstance) {
    console.warn('Search index not initialized')
    return []
  }

  const results = fuseInstance.search(query)
  return results.map((result) => result.item)
}

export interface FilterOptions {
  competition?: string
  season?: string
  size?: string
}

export function filterProducts(products: Product[], filters: FilterOptions): Product[] {
  return products.filter((product) => {
    if (filters.competition && product.competition !== filters.competition) return false
    if (filters.season && product.season !== filters.season) return false
    if (filters.size && !product.sizes.some((s) => s.size === filters.size && s.stock > 0))
      return false
    return true
  })
}
