// Analytics utility for tracking events
// Supports Google Analytics 4 (GA4) and can be extended for other providers

type AnalyticsEvent =
  | 'view_item'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'begin_checkout_dm'
  | 'click_igme'
  | 'view_item_list'
  | 'search'

type EventParams = {
  // Product events
  item_id?: string
  item_name?: string
  item_category?: string
  item_category2?: string
  price?: number
  currency?: string
  quantity?: number

  // Cart events
  value?: number
  items?: Array<{
    item_id: string
    item_name: string
    price: number
    quantity: number
  }>

  // Search events
  search_term?: string

  // Custom params
  customization?: boolean
  patches_count?: number
  checkout_method?: string

  // Generic
  [key: string]: any
}

/**
 * Track an analytics event
 * @param event - The event name
 * @param params - Event parameters
 */
export function trackEvent(event: AnalyticsEvent, params?: EventParams): void {
  // Check if running in browser
  if (typeof window === 'undefined') return

  // Default currency
  const defaultParams = {
    currency: 'EUR',
    ...params,
  }

  // Google Analytics 4 (gtag.js)
  if (typeof window.gtag !== 'undefined') {
    try {
      window.gtag('event', event, defaultParams)
    } catch (error) {
      console.error('[Analytics] GA4 tracking error:', error)
    }
  }

  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Event tracked:', event, defaultParams)
  }
}

/**
 * Track product view
 */
export function trackProductView(params: {
  productId: string
  productName: string
  price: number
  category?: string
  club?: string
}): void {
  trackEvent('view_item', {
    item_id: params.productId,
    item_name: params.productName,
    item_category: params.category,
    item_category2: params.club,
    price: params.price,
    currency: 'EUR',
  })
}

/**
 * Track add to cart
 */
export function trackAddToCart(params: {
  productId: string
  productName: string
  price: number
  quantity?: number
  customization?: boolean
  patchesCount?: number
}): void {
  trackEvent('add_to_cart', {
    item_id: params.productId,
    item_name: params.productName,
    price: params.price,
    quantity: params.quantity || 1,
    value: params.price * (params.quantity || 1),
    currency: 'EUR',
    customization: params.customization,
    patches_count: params.patchesCount,
  })
}

/**
 * Track remove from cart
 */
export function trackRemoveFromCart(params: {
  productId: string
  productName: string
  price: number
  quantity?: number
}): void {
  trackEvent('remove_from_cart', {
    item_id: params.productId,
    item_name: params.productName,
    price: params.price,
    quantity: params.quantity || 1,
    value: params.price * (params.quantity || 1),
    currency: 'EUR',
  })
}

/**
 * Track checkout initiation (Instagram DM)
 */
export function trackBeginCheckout(params: {
  totalValue: number
  itemCount: number
  items: Array<{
    productId: string
    productName: string
    price: number
    quantity: number
  }>
}): void {
  trackEvent('begin_checkout_dm', {
    value: params.totalValue,
    currency: 'EUR',
    checkout_method: 'instagram_dm',
    items: params.items.map((item) => ({
      item_id: item.productId,
      item_name: item.productName,
      price: item.price,
      quantity: item.quantity,
    })),
  })
}

/**
 * Track Instagram DM link click
 */
export function trackInstagramDMClick(params: { totalValue: number; itemCount: number }): void {
  trackEvent('click_igme', {
    value: params.totalValue,
    currency: 'EUR',
    item_count: params.itemCount,
    destination: 'instagram_dm',
  })
}

/**
 * Track product list view
 */
export function trackProductListView(params: { itemCount: number; category?: string }): void {
  trackEvent('view_item_list', {
    item_list_name: params.category || 'all_products',
    item_count: params.itemCount,
  })
}

/**
 * Track search
 */
export function trackSearch(params: { searchTerm: string; resultsCount: number }): void {
  trackEvent('search', {
    search_term: params.searchTerm,
    results_count: params.resultsCount,
  })
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, any>) => void
  }
}
