import { getAllProducts } from '@/lib/data'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export const revalidate = 3600 // ISR: revalidate every hour

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group block border border-gray-800 rounded-lg overflow-hidden hover:border-primary-red transition-colors"
            >
              <div className="aspect-square relative bg-gray-900">
                <Image
                  src={product.images.main || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                {product.featured && (
                  <Badge className="absolute top-2 right-2 bg-primary-red">In evidenza</Badge>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary-red transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-400 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary-red">
                    €{product.basePrice.toFixed(2)}
                  </span>
                  {product.allowCustomization && (
                    <Badge variant="outline" className="text-xs">
                      Personalizzabile
                    </Badge>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
