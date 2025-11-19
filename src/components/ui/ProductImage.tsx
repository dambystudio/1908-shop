'use client'

import Image from 'next/image'
import { useState } from 'react'

type ProductImageProps = {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

/**
 * Product Image component with automatic fallback to placeholder
 * Uses Next.js Image optimization + error handling
 */
export function ProductImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  priority = false,
  sizes,
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Generate placeholder based on product name
  const generatePlaceholder = () => {
    // Use a simple data URI for the placeholder instead of placehold.co
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width || 1200}' height='${height || 1200}'%3E%3Crect width='100%25' height='100%25' fill='%23000000'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='48' fill='%23D40000'%3E${encodeURIComponent(alt)}%3C/text%3E%3C/svg%3E`
  }

  const imageProps = {
    alt,
    className: `${className} ${isLoading ? 'blur-sm' : 'blur-0'} transition-all duration-300`,
    onLoad: () => setIsLoading(false),
    onError: () => {
      setImageError(true)
      setIsLoading(false)
    },
    priority,
    ...(sizes && { sizes }),
  }

  if (fill) {
    return <Image {...imageProps} src={imageError ? generatePlaceholder() : src} fill />
  }

  return (
    <Image
      {...imageProps}
      src={imageError ? generatePlaceholder() : src}
      width={width || 1200}
      height={height || 1200}
    />
  )
}
