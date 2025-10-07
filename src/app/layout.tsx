import type { Metadata } from 'next'
import '../styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/domains/cart/cart-context'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: '1908 Shop',
  description: 'Abbigliamento da calcio - Maglie, personalizzazioni e molto altro',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className="dark">
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
