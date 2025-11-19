'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { searchProducts, initSearchIndex } from '@/lib/search'
import type { Product } from '@/types/product'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

interface SearchBarProps {
  products: Product[]
}

export function SearchBar({ products }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    initSearchIndex(products)
  }, [products])

  useEffect(() => {
    const handleSearch = () => {
      if (!query.trim()) {
        setResults([])
        return
      }
      setIsSearching(true)
      // Simulate small delay for better UX feel or if calculation is heavy
      setTimeout(() => {
        const searchResults = searchProducts(query)
        setResults(searchResults.slice(0, 5)) // Limit to 5 results
        setIsSearching(false)
      }, 100)
    }

    const debounce = setTimeout(handleSearch, 300)
    return () => clearTimeout(debounce)
  }, [query])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Cerca maglie, squadre..."
          className="pl-10 bg-[#1a1a1a] border-white/10 focus:border-[#D40000] text-white placeholder:text-gray-500 rounded-full"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setResults([])
              setIsOpen(false)
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (query || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
          {isSearching ? (
            <div className="p-4 text-center text-gray-400">
              <Loader2 className="h-5 w-5 animate-spin mx-auto" />
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Prodotti
              </div>
              {results.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors group"
                >
                  <div className="relative w-12 h-12 bg-gray-900 rounded-md overflow-hidden border border-white/5 group-hover:border-white/20">
                    <Image
                      src={product.images.main}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate group-hover:text-[#D40000] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {product.club} • {product.season}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-white">
                      €{product.basePrice.toFixed(2)}
                    </span>
                  </div>
                </Link>
              ))}
              <div className="border-t border-white/5 mt-2 pt-2 px-2">
                <Button
                  variant="ghost"
                  className="w-full text-xs text-gray-400 hover:text-white justify-center"
                  onClick={() => {
                    // Navigate to full search page (future implementation)
                    setIsOpen(false)
                  }}
                >
                  Vedi tutti i risultati
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-400 text-sm">Nessun risultato trovato per "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
