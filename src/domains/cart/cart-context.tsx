'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  type CartItem,
  getCartFromStorage,
  saveCartToStorage,
  clearCartStorage,
} from './cart-storage'

interface CartContextValue {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateItem: (itemId: string, updates: Partial<CartItem>) => void
  clearCart: () => void
  itemCount: number
  totalPrice: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    setItems(getCartFromStorage())
    setHydrated(true)
  }, [])

  // Persist to localStorage whenever items change
  useEffect(() => {
    if (hydrated) {
      saveCartToStorage(items)
    }
  }, [items, hydrated])

  const addItem = (item: CartItem) => {
    setItems((prev) => [...prev, item])
  }

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const updateItem = (itemId: string, updates: Partial<CartItem>) => {
    setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, ...updates } : item)))
  }

  const clearCart = () => {
    setItems([])
    clearCartStorage()
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItem,
        clearCart,
        itemCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
