'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert } from '@/components/ui/alert'
import { calculatePrice, validateCustomization } from '@/domains/product/price'
import { useCart } from '@/domains/cart/cart-context'
import { trackAddToCart } from '@/lib/analytics'
import type { Product, ProductPatch } from '@/types/product'

interface ProductConfiguratorProps {
  product: Product
}

export function ProductConfigurator({ product }: ProductConfiguratorProps) {
  const { addItem } = useCart()

  // State
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedPatches, setSelectedPatches] = useState<string[]>([])
  const [playerName, setPlayerName] = useState('')
  const [playerNumber, setPlayerNumber] = useState<number | undefined>(undefined)
  const [error, setError] = useState<string>('')

  // Compute available sizes
  const availableSizes = product.sizes.filter((s) => s.stock > 0)
  const hasStock = availableSizes.length > 0

  // Toggle patch selection
  const togglePatch = (patchId: string) => {
    setSelectedPatches((prev) =>
      prev.includes(patchId) ? prev.filter((id) => id !== patchId) : [...prev, patchId]
    )
  }

  // Calculate price dynamically
  const priceCalculation = useMemo(() => {
    const selectedPatchObjects = (product.patches || [])
      .filter((p) => selectedPatches.includes(p.id))
      .map((p) => ({ id: p.id, price: p.price }))

    return calculatePrice({
      base: product.basePrice,
      patches: selectedPatchObjects,
      customization:
        playerName || playerNumber !== undefined ? { playerName, playerNumber } : undefined,
      customizationPrice: product.customizationPrice,
    })
  }, [product, selectedPatches, playerName, playerNumber])

  // Handle add to cart
  const handleAddToCart = () => {
    setError('')

    // Validate size
    if (!selectedSize) {
      setError('Seleziona una taglia')
      return
    }

    // Validate customization if provided
    if (product.allowCustomization && (playerName || playerNumber !== undefined)) {
      const validation = validateCustomization(playerName, playerNumber)
      if (!validation.valid) {
        setError(validation.errors.join(', '))
        return
      }
    }

    // Add to cart
    const cartItem = {
      id: `${product.slug}-${selectedSize}-${Date.now()}`,
      productId: product.slug,
      name: product.name,
      size: selectedSize,
      quantity: 1,
      basePrice: product.basePrice,
      customization:
        playerName || playerNumber !== undefined
          ? {
              playerName: playerName || undefined,
              playerNumber: playerNumber,
            }
          : undefined,
      patches: selectedPatches,
      totalPrice: priceCalculation.total,
    }

    addItem(cartItem)

    // Track analytics event
    trackAddToCart({
      productId: product.slug,
      productName: product.name,
      price: priceCalculation.total,
      quantity: 1,
      customization: !!(playerName || playerNumber !== undefined),
      patchesCount: selectedPatches.length,
    })

    // Reset form
    setSelectedSize('')
    setSelectedPatches([])
    setPlayerName('')
    setPlayerNumber(undefined)
    setError('')

    // TODO: Show toast notification
    alert('Prodotto aggiunto al carrello!')
  }

  return (
    <div className="space-y-6">
      {/* Dynamic Price Display */}
      <div className="border-t border-b border-gray-800 py-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-primary-red">
            €{priceCalculation.total.toFixed(2)}
          </span>
          <span className="text-gray-500">Totale</span>
        </div>
        {(priceCalculation.patchesSurcharge > 0 || priceCalculation.customizationSurcharge > 0) && (
          <div className="mt-2 text-sm text-gray-400 space-y-1">
            <p>Base: €{priceCalculation.base.toFixed(2)}</p>
            {priceCalculation.patchesSurcharge > 0 && (
              <p>Patch: +€{priceCalculation.patchesSurcharge.toFixed(2)}</p>
            )}
            {priceCalculation.customizationSurcharge > 0 && (
              <p>Personalizzazione: +€{priceCalculation.customizationSurcharge.toFixed(2)}</p>
            )}
          </div>
        )}
      </div>

      {/* Size Selection */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Taglie disponibili</Label>
        {hasStock ? (
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <Button
                key={size.size}
                variant={selectedSize === size.size ? 'default' : 'outline'}
                disabled={size.stock === 0}
                onClick={() => setSelectedSize(size.size)}
                className={
                  selectedSize === size.size
                    ? 'bg-primary-red hover:bg-primary-red-dark'
                    : size.stock > 0
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

      {/* Patches Selection */}
      {product.patches && product.patches.length > 0 && (
        <div>
          <Label className="text-base font-semibold mb-3 block">Patch disponibili</Label>
          <div className="space-y-2">
            {product.patches.map((patch) => (
              <label
                key={patch.id}
                className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-colors ${
                  selectedPatches.includes(patch.id)
                    ? 'border-primary-red bg-primary-red/10'
                    : 'border-gray-800 hover:border-primary-red'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedPatches.includes(patch.id)}
                    onChange={() => togglePatch(patch.id)}
                    className="w-5 h-5 rounded border-gray-700 text-primary-red focus:ring-primary-red"
                  />
                  <div>
                    <p className="font-medium">{patch.name}</p>
                    <p className="text-sm text-gray-400">+€{patch.price.toFixed(2)}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Customization */}
      {product.allowCustomization && (
        <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
          <Label className="text-base font-semibold mb-3 block">Personalizzazione</Label>
          <div className="space-y-3">
            <div>
              <Label htmlFor="playerName" className="text-sm text-gray-400 mb-1 block">
                Nome giocatore (max 12 caratteri)
              </Label>
              <Input
                id="playerName"
                type="text"
                maxLength={12}
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
                placeholder="Es: TOTTI"
                className="bg-black border-gray-700 focus:border-primary-red"
              />
              <p className="text-xs text-gray-500 mt-1">{playerName.length}/12 caratteri</p>
            </div>
            <div>
              <Label htmlFor="playerNumber" className="text-sm text-gray-400 mb-1 block">
                Numero maglia (0-99)
              </Label>
              <Input
                id="playerNumber"
                type="number"
                min={0}
                max={99}
                value={playerNumber === undefined ? '' : playerNumber}
                onChange={(e) => {
                  const val = e.target.value
                  setPlayerNumber(val === '' ? undefined : parseInt(val, 10))
                }}
                placeholder="Es: 10"
                className="bg-black border-gray-700 focus:border-primary-red"
              />
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <p>{error}</p>
        </Alert>
      )}

      {/* Add to Cart Button */}
      <div className="space-y-3">
        <Button
          size="lg"
          className="w-full bg-primary-red hover:bg-primary-red-dark text-white"
          disabled={!hasStock}
          onClick={handleAddToCart}
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
          * Le immagini sono illustrative. Il prodotto finale potrebbe presentare lievi variazioni.
        </p>
        <p className="mt-1">
          * I tempi di consegna verranno comunicati via DM dopo la conferma dell'ordine.
        </p>
      </div>
    </div>
  )
}
