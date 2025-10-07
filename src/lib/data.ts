import fs from 'fs/promises'
import path from 'path'
import type { Product, Category } from '@/types/product'

const CONTENT_DIR = path.join(process.cwd(), 'content')
const PRODUCTS_DIR = path.join(CONTENT_DIR, 'products')
const CATEGORIES_DIR = path.join(CONTENT_DIR, 'categories')

export async function getAllProducts(): Promise<Product[]> {
  try {
    const files = await fs.readdir(PRODUCTS_DIR)
    const jsonFiles = files.filter((file) => file.endsWith('.json'))

    const products = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(PRODUCTS_DIR, file)
        const content = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(content) as Product
      })
    )

    // Filter only published products
    return products.filter((product) => product.published !== false)
  } catch (error) {
    console.error('Error loading products:', error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const filePath = path.join(PRODUCTS_DIR, `${slug}.json`)
    const content = await fs.readFile(filePath, 'utf-8')
    const product = JSON.parse(content) as Product

    // Return only if published
    return product.published !== false ? product : null
  } catch (error) {
    console.error(`Error loading product ${slug}:`, error)
    return null
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const allProducts = await getAllProducts()
  return allProducts.filter((product) => product.category === category)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const allProducts = await getAllProducts()
  return allProducts.filter((product) => product.featured === true)
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const files = await fs.readdir(CATEGORIES_DIR)
    const jsonFiles = files.filter((file) => file.endsWith('.json'))

    const categories = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(CATEGORIES_DIR, file)
        const content = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(content) as Category
      })
    )

    // Sort by order
    return categories.sort((a, b) => (a.order || 999) - (b.order || 999))
  } catch (error) {
    console.error('Error loading categories:', error)
    return []
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const filePath = path.join(CATEGORIES_DIR, `${slug}.json`)
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content) as Category
  } catch (error) {
    console.error(`Error loading category ${slug}:`, error)
    return null
  }
}
