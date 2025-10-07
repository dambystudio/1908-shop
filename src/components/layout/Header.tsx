import Link from 'next/link'
import Image from 'next/image'
import { CartIndicator } from '@/components/cart/CartIndicator'
import { MobileNav } from './MobileNav'

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-black sticky top-0 z-50 backdrop-blur-sm bg-black/90">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <MobileNav />

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-12 h-12 transition-transform group-hover:scale-110">
              <Image
                src="/logo.webp"
                alt="1908 Shop Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-primary-red transition-colors hidden sm:inline">
              1908 Shop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm font-medium">
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
