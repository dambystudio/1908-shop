// Product and Category types matching TinaCMS schema

export interface ProductSize {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
  stock: number
}

export interface ProductPatch {
  id: string
  name: string
  price: number
  image?: string
}

export interface ProductImages {
  main: string
  gallery?: string[]
}

export interface Product {
  name: string
  slug: string
  description: string
  basePrice: number
  category: 'retro' | 'competition' | 'mystery-box'
  competition?: string
  club?: string
  season?: string
  images: ProductImages
  sizes: ProductSize[]
  allowCustomization?: boolean
  customizationPrice?: number
  patches?: ProductPatch[]
  featured?: boolean
  published?: boolean
  createdAt?: string
}

export interface Category {
  name: string
  slug: string
  description?: string
  image?: string
  order?: number
}

export type Competition =
  | 'serie-a'
  | 'premier-league'
  | 'la-liga'
  | 'bundesliga'
  | 'ligue-1'
  | 'champions-league'
  | 'europa-league'
  | 'other'

export type SizeOption = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
