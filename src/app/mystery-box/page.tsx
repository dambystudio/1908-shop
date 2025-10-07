import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getAllProducts } from '@/lib/data'

export const metadata = {
  title: 'Mystery Box | 1908 Shop',
  description:
    'Una sorpresa speciale per i veri appassionati di calcio. Scopri la nostra Mystery Box esclusiva.',
}

export default async function MysteryBoxPage() {
  const mysteryProducts = (await getAllProducts()).filter((p) => p.category === 'mystery-box')

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section with Mystery Theme */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-red/20 via-black to-black">
          <div className="absolute inset-0 opacity-30">
            {/* Grid pattern */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle, #D40000 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }}
            ></div>
          </div>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary-red rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-primary-red rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary-red text-white px-4 py-2 text-sm animate-pulse">
              ✨ Edizione Limitata
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Mystery Box</span>
              <br />
              <span className="text-primary-red animate-pulse">1908 Shop</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Una sorpresa esclusiva per i veri appassionati.
              <br />
              <span className="text-primary-red font-semibold">Non sai cosa riceverai</span>, ma
              sarà speciale.
            </p>

            {/* Mystery Box Icon */}
            <div className="mb-12 flex justify-center">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-32 h-32 text-primary-red animate-bounce"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                  />
                </svg>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-red rounded-full flex items-center justify-center text-white font-bold animate-ping">
                  ?
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {mysteryProducts.length > 0 ? (
                <Button
                  asChild
                  size="lg"
                  className="bg-primary-red hover:bg-primary-red-dark text-lg px-8 py-6"
                >
                  <Link href={`/products/${mysteryProducts[0].slug}`}>
                    Scopri la Mystery Box
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
              ) : (
                <Button size="lg" disabled className="bg-gray-800 text-gray-400 text-lg px-8 py-6">
                  Disponibile Presto
                </Button>
              )}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-gray-700 hover:border-primary-red"
              >
                <Link href="/products">Vedi Altri Prodotti</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Cosa potrebbe esserci dentro?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 border border-gray-800 rounded-lg bg-black/50 backdrop-blur">
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
                      d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Maglie Esclusive</h3>
                <p className="text-gray-400">Edizioni limitate o vintage rare</p>
              </div>

              <div className="text-center p-6 border border-gray-800 rounded-lg bg-black/50 backdrop-blur">
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
                <h3 className="text-xl font-bold mb-2">Accessori Premium</h3>
                <p className="text-gray-400">Sciarpe, patch o gadget ufficiali</p>
              </div>

              <div className="text-center p-6 border border-gray-800 rounded-lg bg-black/50 backdrop-blur">
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
                      d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Sorprese Bonus</h3>
                <p className="text-gray-400">Ogni box ha qualcosa di speciale</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Perché scegliere la Mystery Box?
            </h2>
            <div className="space-y-6 text-left">
              <div className="flex items-start gap-4 p-6 border border-gray-800 rounded-lg bg-gray-950">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-red/10 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-primary-red"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Valore Superiore</h3>
                  <p className="text-gray-400">
                    Il valore totale del contenuto supera sempre il prezzo della box
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 border border-gray-800 rounded-lg bg-gray-950">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-red/10 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-primary-red"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Edizione Limitata</h3>
                  <p className="text-gray-400">
                    Disponibilità limitata - ogni box è unica e irripetibile
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 border border-gray-800 rounded-lg bg-gray-950">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-red/10 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-primary-red"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Emozione Garantita</h3>
                  <p className="text-gray-400">
                    L'esperienza dell'apertura e della scoperta è impagabile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto per la sorpresa?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Non aspettare: le Mystery Box sono in quantità limitata
          </p>
          {mysteryProducts.length > 0 ? (
            <Button
              asChild
              size="lg"
              className="bg-primary-red hover:bg-primary-red-dark text-lg px-8 py-6 animate-pulse"
            >
              <Link href={`/products/${mysteryProducts[0].slug}`}>
                Ordina Ora la Mystery Box
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
          ) : (
            <Button size="lg" disabled className="bg-gray-800 text-gray-400 text-lg px-8 py-6">
              Disponibile Presto - Iscriviti alla Newsletter
            </Button>
          )}
        </div>
      </section>
    </main>
  )
}
