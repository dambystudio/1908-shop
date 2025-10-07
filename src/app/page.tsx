import { getFeaturedProducts, getAllProducts } from '@/lib/data'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const revalidate = 3600 // ISR: revalidate every hour

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()
  const allProducts = await getAllProducts()

  // Get category counts
  const competitionCount = allProducts.filter((p) => p.competition === 'Serie A').length
  const retroCount = allProducts.filter((p) => p.category === 'retro').length

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-950 to-black py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Maglie da Calcio</span>
              <br />
              <span className="text-primary-red">Personalizzate</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">
              Scegli la tua maglia, personalizzala con nome e numero,
              <br />e ordina direttamente su Instagram
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-primary-red hover:bg-primary-red-dark text-lg px-8 py-6"
              >
                <Link href="/products">
                  Esplora Prodotti
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-gray-700 hover:border-primary-red"
              >
                <a href="https://instagram.com/1908shop_" target="_blank" rel="noopener noreferrer">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Seguici su Instagram
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-red rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary-red rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Prodotti in Evidenza</h2>
                <p className="text-gray-400">Le nostre maglie più popolari</p>
              </div>
              <Button asChild variant="ghost" className="hidden md:flex">
                <Link href="/products">
                  Vedi Tutti
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 3).map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group block border border-gray-800 rounded-lg overflow-hidden hover:border-primary-red transition-all hover:shadow-lg hover:shadow-primary-red/20"
                >
                  <div className="aspect-square relative bg-gray-900">
                    <Image
                      src={product.images.main || '/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3 bg-primary-red">In Evidenza</Badge>
                  </div>
                  <div className="p-5 bg-gray-950">
                    <h3 className="font-semibold text-xl mb-2 group-hover:text-primary-red transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {product.competition && (
                        <Badge variant="outline" className="text-xs">
                          {product.competition}
                        </Badge>
                      )}
                      {product.allowCustomization && (
                        <Badge
                          variant="outline"
                          className="text-xs border-primary-red text-primary-red"
                        >
                          Personalizzabile
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-red">
                        €{product.basePrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {product.sizes.reduce((sum, s) => sum + s.stock, 0)} disponibili
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Button asChild variant="outline">
                <Link href="/products">Vedi Tutti i Prodotti</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Esplora per Categoria</h2>
            <p className="text-gray-400">Trova la maglia perfetta per te</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Competition Category */}
            <Link
              href="/products?competition=Serie+A"
              className="group relative overflow-hidden rounded-lg border border-gray-800 hover:border-primary-red transition-all h-64 bg-gradient-to-br from-gray-900 to-black"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
              <div className="relative z-20 h-full flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-red transition-colors">
                  Maglie da Competizione
                </h3>
                <p className="text-gray-400 mb-3">Serie A, Champions League e altro</p>
                <div className="flex items-center text-primary-red">
                  <span className="text-sm font-semibold">{competitionCount} prodotti</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Retro Category */}
            <Link
              href="/products?category=retro"
              className="group relative overflow-hidden rounded-lg border border-gray-800 hover:border-primary-red transition-all h-64 bg-gradient-to-br from-gray-900 to-black"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
              <div className="relative z-20 h-full flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-red transition-colors">
                  Maglie Vintage
                </h3>
                <p className="text-gray-400 mb-3">Classici intramontabili degli anni '90</p>
                <div className="flex items-center text-primary-red">
                  <span className="text-sm font-semibold">{retroCount} prodotti</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Mystery Box Category */}
            <Link
              href="/mystery-box"
              className="group relative overflow-hidden rounded-lg border border-primary-red hover:border-primary-red-dark transition-all h-64 bg-gradient-to-br from-primary-red/20 to-black"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
              <div className="relative z-20 h-full flex flex-col justify-end p-6">
                <Badge className="w-fit mb-3 bg-primary-red animate-pulse">Novità</Badge>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-red transition-colors">
                  Mystery Box
                </h3>
                <p className="text-gray-400 mb-3">Una sorpresa speciale ti aspetta</p>
                <div className="flex items-center text-primary-red">
                  <span className="text-sm font-semibold">Scopri di più</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-primary-red"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Personalizzazione Completa</h3>
              <p className="text-gray-400">
                Aggiungi nome, numero e patch ufficiali per rendere unica la tua maglia
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-primary-red"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Ordine su Instagram</h3>
              <p className="text-gray-400">
                Semplice e veloce: completa l'ordine direttamente tramite DM
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-primary-red"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Qualità Garantita</h3>
              <p className="text-gray-400">
                Maglie ufficiali e repliche di alta qualità per veri appassionati
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto per ordinare?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Scegli la tua maglia, personalizzala e ricevila a casa tua
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary-red hover:bg-primary-red-dark text-lg px-8 py-6"
          >
            <Link href="/products">
              Inizia a Fare Shopping
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
