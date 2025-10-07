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
    // Extract product name from alt text
    const productName = alt.replace(/\s+/g, '+')
    return `https://placehold.co/${width || 1200}x${height || 1200}/000000/D40000?text=${productName}&font=roboto`
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
