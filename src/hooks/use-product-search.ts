'use client'

import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import type { Product } from '@/types/product'

interface UseProductSearchOptions {
  products: Product[]
  searchKeys?: string[]
  threshold?: number
}

export function useProductSearch({
  products,
  searchKeys = ['name', 'club', 'competition', 'season', 'description'],
  threshold = 0.3,
}: UseProductSearchOptions) {
  const [searchQuery, setSearchQuery] = useState('')

  // Create Fuse instance
  const fuse = useMemo(
    () =>
      new Fuse(products, {
        keys: searchKeys,
        threshold,
        includeScore: true,
        minMatchCharLength: 2,
      }),
    [products, searchKeys, threshold]
  )

  // Perform search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return products
    }

    const results = fuse.search(searchQuery)
    return results.map((result) => result.item)
  }, [searchQuery, fuse, products])

  return {
    searchQuery,
    setSearchQuery,
    results: searchResults,
  }
}
