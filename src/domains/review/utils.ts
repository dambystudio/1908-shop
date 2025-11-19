import { Review, ReviewSummary } from './types'

export function calculateReviewSummary(reviews: Review[]): ReviewSummary {
  const publishedReviews = reviews.filter((r) => r.status === 'published')
  const totalReviews = publishedReviews.length

  if (totalReviews === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    }
  }

  const sum = publishedReviews.reduce((acc, r) => acc + r.rating, 0)
  const averageRating = Number((sum / totalReviews).toFixed(1))

  const ratingDistribution = publishedReviews.reduce(
    (acc, r) => {
      acc[r.rating] = (acc[r.rating] || 0) + 1
      return acc
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number>
  )

  return {
    averageRating,
    totalReviews,
    ratingDistribution,
  }
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
