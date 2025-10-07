import { getProductBySlug, getAllProducts } from '@/lib/data'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

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

  const availableSizes = product.sizes.filter((s) => s.stock > 0)
  const hasStock = availableSizes.length > 0

  return (
    <div className="container mx-auto px-4 py-8">
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

          {/* Price */}
          <div className="border-t border-b border-gray-800 py-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary-red">
                €{product.basePrice.toFixed(2)}
              </span>
              <span className="text-gray-500">Prezzo base</span>
            </div>
            {product.allowCustomization && product.customizationPrice && (
              <p className="text-sm text-gray-400 mt-2">
                + €{product.customizationPrice.toFixed(2)} per personalizzazione nome e numero
              </p>
            )}
          </div>

          {/* Sizes */}
          <div>
            <h3 className="font-semibold mb-3">Taglie disponibili</h3>
            {hasStock ? (
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size.size}
                    variant={size.stock > 0 ? 'outline' : 'ghost'}
                    disabled={size.stock === 0}
                    className={
                      size.stock > 0
                        ? 'hover:bg-primary-red hover:text-white'
                        : 'opacity-50 cursor-not-allowed'
                    }
                  >
                    {size.size}
                    {size.stock > 0 && size.stock < 3 && (
                      <span className="ml-1 text-xs">({size.stock})</span>
                    )}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-red-500">Tutte le taglie esaurite</p>
            )}
          </div>

          {/* Patches */}
          {product.patches && product.patches.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Patch disponibili</h3>
              <div className="space-y-2">
                {product.patches.map((patch) => (
                  <div
                    key={patch.id}
                    className="flex items-center justify-between p-3 border border-gray-800 rounded hover:border-primary-red transition-colors"
                  >
                    <div>
                      <p className="font-medium">{patch.name}</p>
                      <p className="text-sm text-gray-400">+€{patch.price.toFixed(2)}</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-700 text-primary-red focus:ring-primary-red"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customization */}
          {product.allowCustomization && (
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
              <h3 className="font-semibold mb-3">Personalizzazione</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Nome giocatore (max 12 caratteri)
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    placeholder="Es: TOTTI"
                    className="w-full px-3 py-2 bg-black border border-gray-700 rounded focus:border-primary-red focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Numero maglia (0-99)</label>
                  <input
                    type="number"
                    min={0}
                    max={99}
                    placeholder="Es: 10"
                    className="w-full px-3 py-2 bg-black border border-gray-700 rounded focus:border-primary-red focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full bg-primary-red hover:bg-primary-red-dark text-white"
              disabled={!hasStock}
            >
              {hasStock ? 'Aggiungi al carrello' : 'Esaurito'}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Gli ordini vengono completati tramite Instagram DM
            </p>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-gray-600 border-t border-gray-800 pt-4">
            <p>
              * Le immagini sono illustrative. Il prodotto finale potrebbe presentare lievi
              variazioni.
            </p>
            <p className="mt-1">
              * I tempi di consegna varranno comunicati via DM dopo la conferma dell'ordine.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
