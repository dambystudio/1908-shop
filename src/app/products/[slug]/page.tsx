import { getProductBySlug, getAllProducts } from '@/lib/data'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { ProductConfigurator } from '@/components/product/ProductConfigurator'
import { ProductViewTracker } from '@/components/product/ProductViewTracker'

export const revalidate = 3600 // ISR: revalidate every hour

// Generate static paths for all products
export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    return {
      title: 'Prodotto non trovato',
    }
  }

  return {
    title: `${product.name} | 1908 Shop`,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductViewTracker product={product} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square relative bg-gray-900 rounded-lg overflow-hidden">
            <Image
              src={product.images.main || '/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.featured && (
              <Badge className="absolute top-4 right-4 bg-primary-red">In evidenza</Badge>
            )}
          </div>
          {product.images.gallery && product.images.gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {product.images.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-square relative bg-gray-900 rounded overflow-hidden border border-gray-800 hover:border-primary-red transition-colors cursor-pointer"
                >
                  <Image
                    src={img}
                    alt={`${product.name} - ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{product.category}</Badge>
              {product.competition && <Badge variant="outline">{product.competition}</Badge>}
            </div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            {product.club && product.season && (
              <p className="text-gray-400">
                {product.club} • {product.season}
              </p>
            )}
          </div>

          <p className="text-gray-300 leading-relaxed">{product.description}</p>

          {/* Interactive Product Configuration */}
          <ProductConfigurator product={product} />
        </div>
      </div>
    </div>
  )
}
