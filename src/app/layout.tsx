import type { Metadata } from 'next'
import '../styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/domains/cart/cart-context'
import { Toaster } from '@/components/ui/toaster'
import { generateSEOMetadata } from '@/lib/seo'
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  JSONLDScript,
} from '@/lib/structured-data'

export const metadata: Metadata = generateSEOMetadata({
  title: '1908 Shop',
  description:
    'Maglie da calcio personalizzate - Inter, Milan, Serie A e collezioni vintage. Personalizzazioni con nome e numero, patch ufficiali.',
  type: 'website',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebSiteSchema()

  return (
    <html lang="it" className="dark">
      <head>
        <JSONLDScript data={organizationSchema} />
        <JSONLDScript data={websiteSchema} />
      </head>
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
