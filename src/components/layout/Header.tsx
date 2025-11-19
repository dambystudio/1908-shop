import Link from 'next/link'
import Image from 'next/image'
import { CartIndicator } from '@/components/cart/CartIndicator'
import { MobileNav } from './MobileNav'

import { getAllProducts } from '@/lib/data'
import { SearchBar } from '@/components/product/SearchBar'

export async function Header() {
  const products = await getAllProducts()

  return (
    <header className="border-b border-gray-800 bg-black sticky top-0 z-50 backdrop-blur-sm bg-black/90">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <MobileNav />

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform group-hover:scale-110">
              <Image
                src="/logo.webp"
                alt="1908 Shop Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-primary-red transition-colors hidden lg:inline">
              1908 Shop
            </span>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar products={products} />
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-6 shrink-0">
            <div className="hidden lg:flex gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-primary-red transition-colors">
                Home
              </Link>
              <Link href="/products" className="hover:text-primary-red transition-colors">
                Prodotti
              </Link>
              <Link href="/mystery-box" className="hover:text-primary-red transition-colors">
                Mystery Box
              </Link>
            </div>
            <CartIndicator />
          </div>
        </nav>
      </div>
    </header>
  )
}
