import { getAllProducts } from '@/lib/data'
import { ProductListClient } from '@/components/product/ProductListClient'
import { generateSEOMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const revalidate = 3600 // ISR: revalidate every hour

export const metadata: Metadata = generateSEOMetadata({
  title: 'Prodotti - Maglie da Calcio',
  description:
    'Sfoglia la nostra collezione completa di maglie da calcio. Inter, Milan, Serie A, collezioni vintage e mystery box. Personalizzazioni disponibili.',
  path: '/products',
  type: 'website',
})

export default async function ProductsPage() {
  const products = await getAllProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Prodotti</h1>
        <p className="text-gray-400">Scopri la nostra collezione di maglie da calcio</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500">Nessun prodotto disponibile al momento.</p>
        </div>
      ) : (
        <ProductListClient products={products} />
      )}
    </div>
  )
}
