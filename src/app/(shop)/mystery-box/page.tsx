import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Package, Shirt, Zap, CheckCircle2, ArrowRight } from 'lucide-react'

export default function MysteryBoxPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/mistery-box.png"
            alt="Mystery Box Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D40000]/20 border border-[#D40000]/40 text-[#D40000] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap size={16} />
            <span className="text-sm font-bold tracking-wider uppercase">Edizione Limitata</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bebas mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            IL BRIVIDO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D40000] to-[#ff4d4d]">
              DELLA SORPRESA
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Non sai cosa ti aspetta, ma sai che ti piacerà. <br />
            Maglie ufficiali Serie A, Premier League e altro.
          </p>

          <Link href="/products/mystery-box-serie-a">
            <Button
              size="lg"
              className="bg-[#D40000] hover:bg-[#B30000] text-white px-10 py-8 text-xl font-bebas tracking-wider rounded-full shadow-[0_0_30px_rgba(212,0,0,0.3)] hover:shadow-[0_0_50px_rgba(212,0,0,0.5)] transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300"
            >
              ACQUISTA ORA <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-[#0E0E10]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bebas text-center mb-16">COME FUNZIONA</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent z-0" />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-2xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#D40000] group-hover:shadow-[0_0_20px_rgba(212,0,0,0.2)] transition-all duration-300">
                <Shirt className="w-10 h-10 text-white group-hover:text-[#D40000] transition-colors" />
              </div>
              <h3 className="text-2xl font-bebas mb-2">1. SCEGLI LA TAGLIA</h3>
              <p className="text-gray-400 max-w-xs">
                Seleziona la tua taglia abituale. Vestibilità garantita per ogni corporatura.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-2xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#D40000] group-hover:shadow-[0_0_20px_rgba(212,0,0,0.2)] transition-all duration-300">
                <Package className="w-10 h-10 text-white group-hover:text-[#D40000] transition-colors" />
              </div>
              <h3 className="text-2xl font-bebas mb-2">2. RICEVI IL PACCO</h3>
              <p className="text-gray-400 max-w-xs">
                Spedizione rapida e tracciata. Il tuo mistero arriva in 24/48 ore.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-2xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#D40000] group-hover:shadow-[0_0_20px_rgba(212,0,0,0.2)] transition-all duration-300">
                <Zap className="w-10 h-10 text-white group-hover:text-[#D40000] transition-colors" />
              </div>
              <h3 className="text-2xl font-bebas mb-2">3. SCOPRI LA MAGLIA</h3>
              <p className="text-gray-400 max-w-xs">
                Apri la box e scopri quale maglia ufficiale è stata selezionata per te.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Guarantee */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#D40000]/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-900/5 blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-bebas leading-none">
                GARANZIA DI <br />
                <span className="text-[#D40000]">QUALITÀ ASSOLUTA</span>
              </h2>
              <p className="text-xl text-gray-300 font-light">
                Ogni Mystery Box contiene una maglia da calcio ufficiale, nuova e con etichette.
                Nessuna replica, nessun falso. Solo il meglio per la tua collezione.
              </p>

              <div className="space-y-4">
                {[
                  'Maglie 100% Ufficiali e Autentiche',
                  'Valore del contenuto sempre superiore al prezzo',
                  'Possibilità di trovare maglie Rare o Retro',
                  'Soddisfatti o Rimborsati',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#D40000]" />
                    <span className="text-lg text-gray-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link href="/products/mystery-box-serie-a">
                  <Button className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg font-bebas tracking-wider rounded-full">
                    ORDINA LA TUA BOX
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 relative group">
                <Image
                  src="/milan.avif" // Using an existing image as placeholder/example
                  alt="Mystery Box Example"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
                    <p className="text-sm text-gray-300 mb-1">Esempio Contenuto</p>
                    <p className="text-xl font-bold text-white">Maglia Serie A 2024/25</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
