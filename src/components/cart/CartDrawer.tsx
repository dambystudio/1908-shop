'use client'

import { useCart } from '@/domains/cart/cart-context'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useState, useEffect } from 'react'
import { trackRemoveFromCart, trackBeginCheckout, trackInstagramDMClick } from '@/lib/analytics'

export function CartDrawer({ children }: { children: React.ReactNode }) {
  const { items, removeItem, clearCart, itemCount, totalPrice } = useCart()
  const [hydrated, setHydrated] = useState(false)

  // Wait for hydration to avoid SSR mismatch
  useEffect(() => {
    setHydrated(true)
  }, [])

  const generateDMMessage = () => {
    if (items.length === 0) return ''

    let message = '🛒 *Nuovo Ordine 1908 Shop*\n\n'

    items.forEach((item, idx) => {
      message += `*${idx + 1}. ${item.name}*\n`
      message += `   Taglia: ${item.size}\n`

      if (item.customization) {
        if (item.customization.playerName) {
          message += `   Nome: ${item.customization.playerName}\n`
        }
        if (item.customization.playerNumber !== undefined) {
          message += `   Numero: ${item.customization.playerNumber}\n`
        }
      }

      if (item.patches && item.patches.length > 0) {
        message += `   Patch: ${item.patches.join(', ')}\n`
      }

      message += `   Prezzo: €${item.totalPrice.toFixed(2)}\n\n`
    })

    message += `*Totale: €${totalPrice.toFixed(2)}*\n\n`
    message += "Attendo conferma per procedere con l'ordine 👍"

    return encodeURIComponent(message)
  }

  const handleSendDM = () => {
    // Track begin checkout
    trackBeginCheckout({
      totalValue: totalPrice,
      itemCount: items.length,
      items: items.map((item) => ({
        productId: item.productId,
        productName: item.name,
        price: item.totalPrice,
        quantity: item.quantity,
      })),
    })

    // Track Instagram DM click
    trackInstagramDMClick({
      totalValue: totalPrice,
      itemCount: items.length,
    })

    const message = generateDMMessage()
    const instagramUsername = '1908shop_' // TODO: make this configurable
    const dmLink = `https://ig.me/m/${instagramUsername}?text=${message}`
    window.open(dmLink, '_blank')
  }

  const handleRemoveItem = (item: (typeof items)[0]) => {
    // Track removal
    trackRemoveFromCart({
      productId: item.productId,
      productName: item.name,
      price: item.totalPrice,
      quantity: item.quantity,
    })

    removeItem(item.id)
  }

  const copyToClipboard = () => {
    const message = decodeURIComponent(generateDMMessage())
    navigator.clipboard.writeText(message)
    alert('Riepilogo copiato negli appunti!')
  }

  if (!hydrated) {
    return (
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg bg-black border-gray-800">
          <SheetHeader>
            <SheetTitle>Carrello</SheetTitle>
            <SheetDescription>Caricamento...</SheetDescription>
          </SheetHeader>
          <div className="space-y-4 py-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-black border-gray-800 flex flex-col">
        <SheetHeader>
          <SheetTitle>Carrello</SheetTitle>
          <SheetDescription>
            {itemCount === 0
              ? 'Il tuo carrello è vuoto'
              : `${itemCount} articol${itemCount === 1 ? 'o' : 'i'}`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-gray-500 mb-4">Nessun prodotto nel carrello</p>
              <Button asChild variant="outline">
                <a href="/products">Inizia a fare shopping</a>
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border border-gray-800 rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-400">Taglia: {item.size}</p>

                      {item.customization && (
                        <div className="text-sm text-gray-400 mt-1">
                          {item.customization.playerName && (
                            <p>Nome: {item.customization.playerName}</p>
                          )}
                          {item.customization.playerNumber !== undefined && (
                            <p>Numero: {item.customization.playerNumber}</p>
                          )}
                        </div>
                      )}

                      {item.patches && item.patches.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.patches.map((patchId) => (
                            <Badge key={patchId} variant="outline" className="text-xs">
                              {patchId}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item)}
                      className="text-red-500 hover:text-red-400 hover:bg-red-950"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </Button>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-800 pt-2">
                    <span className="text-sm text-gray-500">Quantità: {item.quantity}</span>
                    <span className="font-semibold text-primary-red">
                      €{item.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary & Actions */}
            <div className="border-t border-gray-800 pt-4 space-y-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Totale</span>
                <span className="text-primary-red">€{totalPrice.toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full bg-primary-red hover:bg-primary-red-dark"
                  onClick={handleSendDM}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                    />
                  </svg>
                  Invia ordine su Instagram
                </Button>

                <Button variant="outline" className="w-full" onClick={copyToClipboard}>
                  Copia riepilogo
                </Button>

                <Button
                  variant="ghost"
                  className="w-full text-gray-500 hover:text-red-500"
                  onClick={clearCart}
                >
                  Svuota carrello
                </Button>
              </div>

              <p className="text-xs text-center text-gray-600">
                Completamento ordine tramite Instagram Direct Message
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
