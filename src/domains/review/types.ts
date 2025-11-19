export interface Review {
  id: string
  author: string
  rating: number
  content: string
  productSlug: string
  status: 'draft' | 'published' | 'rejected'
  createdAt: string
  email?: string
}

export interface ReviewSummary {
  averageRating: number
  totalReviews: number
  ratingDistribution: Record<number, number>
}
