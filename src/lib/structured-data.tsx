import type { Product } from '@/types/product'

interface Organization {
  '@context': 'https://schema.org'
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  sameAs: string[]
  contactPoint: {
    '@type': 'ContactPoint'
    contactType: 'customer service'
    url: string
  }
}

interface WebSite {
  '@context': 'https://schema.org'
  '@type': 'WebSite'
  name: string
  url: string
  potentialAction: {
    '@type': 'SearchAction'
    target: string
    'query-input': string
  }
}

interface ProductSchema {
  '@context': 'https://schema.org'
  '@type': 'Product'
  name: string
  description: string
  image: string[]
  brand: {
    '@type': 'Brand'
    name: string
  }
  offers: {
    '@type': 'Offer'
    price: string
    priceCurrency: string
    availability: string
    url: string
  }
}

interface BreadcrumbList {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item?: string
  }>
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://1908-shop.vercel.app'

export function generateOrganizationSchema(): Organization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '1908 Shop',
    url: siteUrl,
    logo: `${siteUrl}/logo.webp`,
    sameAs: ['https://instagram.com/1908shop_'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://ig.me/m/1908shop_',
    },
  }
}

export function generateWebSiteSchema(): WebSite {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '1908 Shop',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/products?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateProductSchema(
  product: Product,
  price: number,
  availability: 'InStock' | 'OutOfStock' = 'InStock'
): ProductSchema {
  const productUrl = `${siteUrl}/products/${product.slug}`

  // Collect all images
  const allImages = [product.images.main]
  if (product.images.gallery) {
    allImages.push(...product.images.gallery)
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: allImages.map((img) => `${siteUrl}${img}`),
    brand: {
      '@type': 'Brand',
      name: product.club || '1908 Shop',
    },
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: 'EUR',
      availability: `https://schema.org/${availability}`,
      url: productUrl,
    },
  }
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): BreadcrumbList {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: `${siteUrl}${item.url}` }),
    })),
  }
}

// Helper to inject JSON-LD into page
export function JSONLDScript({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
