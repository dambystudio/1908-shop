import type { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'product' | 'article'
  price?: number
  currency?: string
  availability?: 'in stock' | 'out of stock' | 'preorder'
}

const siteConfig = {
  name: '1908 Shop',
  description: 'Maglie da calcio personalizzate - Inter, Milan, Serie A e collezioni vintage',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://1908-shop.vercel.app',
  ogImage: '/og-image.jpg',
  twitterHandle: '@1908shop',
  locale: 'it_IT',
}

export function generateSEOMetadata({
  title,
  description,
  path = '',
  image,
  type = 'website',
  price,
  currency = 'EUR',
  availability,
}: SEOConfig): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogImage = image || siteConfig.ogImage
  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`

  const metadata: Metadata = {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: type === 'product' ? 'website' : type,
      locale: siteConfig.locale,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }

  return metadata
}

export { siteConfig }
