// Shipping calculation logic - pure functions

export interface ShippingInput {
  itemCount: number
}

export interface ShippingOutput {
  cost: number
  isFree: boolean
  threshold: number // items needed for free shipping
}

/**
 * Calculate shipping cost based on cart items
 * Rules:
 * - €5 for orders with less than 3 items
 * - Free shipping for 3 or more items
 */
export function calculateShipping(input: ShippingInput): ShippingOutput {
  const FREE_SHIPPING_THRESHOLD = 3
  const SHIPPING_COST = 5.0

  const isFree = input.itemCount >= FREE_SHIPPING_THRESHOLD
  const cost = isFree ? 0 : SHIPPING_COST

  return {
    cost,
    isFree,
    threshold: FREE_SHIPPING_THRESHOLD,
  }
}

/**
 * Get remaining items needed for free shipping
 */
export function itemsUntilFreeShipping(currentItemCount: number): number {
  const FREE_SHIPPING_THRESHOLD = 3
  const remaining = FREE_SHIPPING_THRESHOLD - currentItemCount
  return remaining > 0 ? remaining : 0
}
