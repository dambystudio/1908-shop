import { getFeaturedProducts, getAllProducts } from '@/lib/data'
import { generateSEOMetadata } from '@/lib/seo'
import { Hero } from '@/components/home/Hero'
import { CategoryCarousel } from '@/components/home/CategoryCarousel'
import { ProductCard } from '@/components/product/ProductCard'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'
import { ArrowRight, Sparkles, History, Box } from 'lucide-react'

export const revalidate = 3600 // ISR: revalidate every hour

export const metadata: Metadata = generateSEOMetadata({
  title: '1908 Shop - Maglie da Calcio Personalizzate',
  description:
    'Shop online di maglie da calcio personalizzate. Inter, Milan, Serie A e collezioni vintage. Personalizza con nome e numero, aggiungi patch ufficiali. Ordina direttamente su Instagram.',
  path: '/',
  type: 'website',
})

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()
  const allProducts = await getAllProducts()

  // Get category counts
  const competitionCount = allProducts.filter((p) => p.competition === 'Serie A').length
  const retroCount = allProducts.filter((p) => p.category === 'retro').length

  // Category data for carousels
  const clubsRow1 = [
    {
      id: 'inter',
      title: 'INTER',
      description: 'Collezione completa 2023/24',
      image: '/inter.jpg',
      href: '/products?club=Inter',
    },
    {
      id: 'milan',
      title: 'MILAN',
      description: 'Vintage e moderne',
      image: '/milan.avif',
      href: '/products?club=Milan',
    },
    {
      id: 'juventus',
      title: 'JUVENTUS',
      description: 'Stagione 2023/24',
      image: '/juve2.jpg',
      href: '/products?club=Juventus',
    },
    {
      id: 'napoli',
      title: 'NAPOLI',
      description: "Campioni d'Italia",
      image: '/napoli.jpeg',
      href: '/products?club=Napoli',
    },
  ]

  const clubsRow2 = [
    {
      id: 'arsenal',
      title: 'ARSENAL',
      description: 'Premier League',
      image: 'https://placehold.co/600x750/1a1a1a/EF0107?text=ARSENAL&font=raleway',
      href: '/products?club=Arsenal',
    },
    {
      id: 'manchester-city',
      title: 'MANCHESTER CITY',
      description: 'Champions Collection',
      image: 'https://placehold.co/600x750/1a1a1a/6CABDD?text=MAN+CITY&font=raleway',
      href: '/products?club=Manchester+City',
    },
    {
      id: 'real-madrid',
      title: 'REAL MADRID',
      description: 'La Liga 2023/24',
      image: 'https://placehold.co/600x750/1a1a1a/FFFFFF?text=REAL+MADRID&font=raleway',
      href: '/products?club=Real+Madrid',
    },
    {
      id: 'barcelona',
      title: 'BARCELONA',
      description: 'Collezione ufficiale',
      image: 'https://placehold.co/600x750/1a1a1a/A50044?text=BARCELONA&font=raleway',
      href: '/products?club=Barcelona',
    },
  ]

  return (
    <main className="min-h-screen bg-[#0E0E10]">
      {/* Hero Section - Full Width Clickable */}
      <Hero
        title="TUTTI GLI ARTICOLI"
        subtitle="Esplora la nostra collezione completa"
        image="/sansirohd.png"
        href="/products"
      />

      {/* Category Grid - Full Width, No Spacing */}
      <CategoryCarousel
        categories={[...clubsRow1, ...clubsRow2].map((card) => ({
          name: card.title,
          image: card.image,
          link: card.href,
        }))}
      />

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-24 bg-black relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#333] to-transparent" />

          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-5xl md:text-6xl font-bebas text-white mb-2 tracking-wide">
                  Prodotti in{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D40000] to-[#ff4d4d]">
                    Evidenza
                  </span>
                </h2>
                <p className="text-gray-400 text-lg">Le maglie più richieste del momento</p>
              </div>
              <Button
                asChild
                variant="ghost"
                className="hidden md:flex text-white hover:text-[#D40000] hover:bg-transparent group"
              >
                <Link href="/products" className="flex items-center gap-2">
                  Vedi Tutti
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>

            <div className="mt-12 text-center md:hidden">
              <Button
                asChild
                variant="outline"
                className="border-white/20 text-white hover:bg-white hover:text-black"
              >
                <Link href="/products">Vedi Tutti i Prodotti</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-24 bg-[#0E0E10] relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bebas text-white mb-4 tracking-wide">
              Esplora per Categoria
            </h2>
            <div className="w-24 h-1 bg-[#D40000] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Competition Category */}
            <Link
              href="/products?competition=Serie+A"
              className="group relative overflow-hidden rounded-2xl h-80 bg-[#111] border border-white/5 hover:border-[#D40000]/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-black z-0" />
              <div className="absolute top-0 right-0 p-32 bg-[#D40000]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#D40000]/10 transition-colors duration-500" />

              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h3 className="text-3xl font-bebas text-white mb-2 group-hover:text-[#D40000] transition-colors tracking-wide">
                    Competizioni
                  </h3>
                  <p className="text-gray-400 mb-4 font-light">
                    Serie A, Champions League e campionati esteri
                  </p>
                  <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      {competitionCount} prodotti
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Retro Category */}
            <Link
              href="/products?category=retro"
              className="group relative overflow-hidden rounded-2xl h-80 bg-[#111] border border-white/5 hover:border-[#D40000]/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-black z-0" />
              <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors duration-500" />

              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <History className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h3 className="text-3xl font-bebas text-white mb-2 group-hover:text-[#D40000] transition-colors tracking-wide">
                    Vintage & Retro
                  </h3>
                  <p className="text-gray-400 mb-4 font-light">
                    Classici intramontabili che hanno fatto la storia
                  </p>
                  <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      {retroCount} prodotti
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Mystery Box Category */}
            <Link
              href="/mystery-box"
              className="group relative overflow-hidden rounded-2xl h-80 bg-[#111] border border-[#D40000] hover:shadow-[0_0_30px_rgba(212,0,0,0.3)] transition-all duration-500"
            >
              <div className="absolute inset-0 bg-[url('/mystery-box.png')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <div className="w-12 h-12 rounded-full bg-[#D40000] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 animate-pulse">
                  <Box className="w-6 h-6 text-white" />
                </div>

                <div>
                  <div className="inline-block px-3 py-1 bg-[#D40000] text-white text-xs font-bold uppercase tracking-widest rounded mb-3">
                    Novità
                  </div>
                  <h3 className="text-3xl font-bebas text-white mb-2 group-hover:text-[#D40000] transition-colors tracking-wide">
                    Mystery Box
                  </h3>
                  <p className="text-gray-200 mb-4 font-light">
                    Non sai cosa scegliere? Lasciati sorprendere
                  </p>
                  <div className="flex items-center text-[#D40000] font-bold">
                    <span className="text-sm uppercase tracking-wider">Scopri di più</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6 group">
              <div className="w-20 h-20 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#D40000]/10 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 text-white group-hover:text-[#D40000] transition-colors duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bebas text-white mb-3 tracking-wide">
                Personalizzazione Completa
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Aggiungi nome, numero e patch ufficiali per rendere unica la tua maglia. Dettagli
                curati al millimetro.
              </p>
            </div>

            <div className="text-center p-6 group">
              <div className="w-20 h-20 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#D40000]/10 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 text-white group-hover:text-[#D40000] transition-colors duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bebas text-white mb-3 tracking-wide">
                Ordine su Instagram
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Un'esperienza d'acquisto diretta e personale. Completa l'ordine velocemente tramite
                DM.
              </p>
            </div>

            <div className="text-center p-6 group">
              <div className="w-20 h-20 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#D40000]/10 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 text-white group-hover:text-[#D40000] transition-colors duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bebas text-white mb-3 tracking-wide">
                Qualità Garantita
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Selezioniamo solo i migliori materiali. Maglie ufficiali e repliche fedeli in ogni
                dettaglio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-b from-black to-[#111] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/sansirohd.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bebas text-white mb-6 tracking-wide">
            Scendi in campo
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light">
            La tua passione merita il meglio. Scegli la tua maglia, personalizzala e ricevila a casa
            tua.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#D40000] hover:bg-[#b30000] text-white text-xl px-10 py-8 rounded-full shadow-[0_0_30px_rgba(212,0,0,0.4)] hover:shadow-[0_0_50px_rgba(212,0,0,0.6)] transition-all duration-300"
          >
            <Link href="/products" className="flex items-center gap-3">
              INIZIA LO SHOPPING
              <ArrowRight className="w-6 h-6" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
