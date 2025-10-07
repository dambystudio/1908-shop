'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { ProductFilters, FilterOptions } from '@/components/product/ProductFilters'
import { trackSearch, trackProductListView } from '@/lib/analytics'
import type { Product } from '@/types/product'

type ProductListClientProps = {
  products: Product[]
}

export function ProductListClient({ products }: ProductListClientProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    competition: null,
    club: null,
    season: null,
    search: '',
    showOnlyCustomizable: false,
  })

  // Extract unique filter options from products
  const { availableCompetitions, availableClubs, availableSeasons } = useMemo(() => {
    const competitions = new Set<string>()
    const clubs = new Set<string>()
    const seasons = new Set<string>()

    products.forEach((product) => {
      if (product.competition) competitions.add(product.competition)
      if (product.club) clubs.add(product.club)
      if (product.season) seasons.add(product.season)
    })

    return {
      availableCompetitions: Array.from(competitions).sort(),
      availableClubs: Array.from(clubs).sort(),
      availableSeasons: Array.from(seasons).sort(),
    }
  }, [products])

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Competition filter
      if (filters.competition && product.competition !== filters.competition) {
        return false
      }

      // Club filter
      if (filters.club && product.club !== filters.club) {
        return false
      }

      // Season filter
      if (filters.season && product.season !== filters.season) {
        return false
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesName = product.name.toLowerCase().includes(searchLower)
        const matchesDescription = product.description?.toLowerCase().includes(searchLower)
        const matchesClub = product.club?.toLowerCase().includes(searchLower)

        if (!matchesName && !matchesDescription && !matchesClub) {
          return false
        }
      }

      // Customizable filter
      if (filters.showOnlyCustomizable && !product.allowCustomization) {
        return false
      }

      return true
    })
  }, [products, filters])

  // Track search when search term changes
  useEffect(() => {
    if (filters.search && filters.search.length >= 3) {
      const timeoutId = setTimeout(() => {
        trackSearch({
          searchTerm: filters.search,
          resultsCount: filteredProducts.length,
        })
      }, 1000) // Debounce 1 second

      return () => clearTimeout(timeoutId)
    }
  }, [filters.search, filteredProducts.length])

  // Track product list view on mount
  useEffect(() => {
    trackProductListView({
      itemCount: products.length,
      category: filters.competition || undefined,
    })
  }, [products.length, filters.competition])

  return (
    <div className="space-y-6">
      {/* Filters */}
      <ProductFilters
        filters={filters}
        onFiltersChange={setFilters}
        availableCompetitions={availableCompetitions}
        availableClubs={availableClubs}
        availableSeasons={availableSeasons}
      />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {filteredProducts.length === products.length
            ? `${products.length} prodott${products.length === 1 ? 'o' : 'i'}`
            : `${filteredProducts.length} di ${products.length} prodott${products.length === 1 ? 'o' : 'i'}`}
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 border border-gray-800 rounded-lg">
          <p className="text-gray-500 mb-4">Nessun prodotto trovato con i filtri selezionati.</p>
          <p className="text-sm text-gray-600">Prova a modificare i criteri di ricerca.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group block border border-gray-800 rounded-lg overflow-hidden hover:border-primary-red transition-colors"
            >
              <div className="aspect-square relative bg-gray-900">
                <Image
                  src={product.images.main || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                {product.featured && (
                  <Badge className="absolute top-2 right-2 bg-primary-red">In evidenza</Badge>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary-red transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-400 mb-2 line-clamp-2">{product.description}</p>

                {/* Product Metadata */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {product.competition && (
                    <Badge variant="outline" className="text-xs">
                      {product.competition}
                    </Badge>
                  )}
                  {product.club && (
                    <Badge variant="outline" className="text-xs">
                      {product.club}
                    </Badge>
                  )}
                  {product.season && (
                    <Badge variant="outline" className="text-xs">
                      {product.season}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary-red">
                    €{product.basePrice.toFixed(2)}
                  </span>
                  {product.allowCustomization && (
                    <Badge
                      variant="outline"
                      className="text-xs border-primary-red text-primary-red"
                    >
                      Personalizzabile
                    </Badge>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
