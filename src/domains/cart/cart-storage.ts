const CART_STORAGE_KEY = '1908_shop_cart'

export interface CartItem {
  id: string
  productId: string
  name: string
  size: string
  quantity: number
  basePrice: number
  customization?: {
    playerName?: string
    playerNumber?: number
  }
  patches?: string[]
  totalPrice: number
}

export function getCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('Failed to save cart:', error)
  }
}

export function clearCartStorage(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(CART_STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear cart:', error)
  }
}
