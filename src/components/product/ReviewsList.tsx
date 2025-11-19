import { ReviewCard } from './ReviewCard'
import { StarRating } from '@/components/ui/StarRating'
import type { Review } from '@/domains/review/types'

interface ReviewsListProps {
  reviews: Review[]
  averageRating?: number
}

export function ReviewsList({ reviews, averageRating }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-16 bg-[#111] rounded-xl border border-white/5">
        <p className="text-gray-400 font-light">
          Nessuna recensione ancora. Sii il primo a lasciare un feedback!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Summary */}
      {averageRating !== undefined && (
        <div className="bg-[#111] border border-white/10 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-center min-w-[150px]">
              <div className="text-5xl font-bebas text-white mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mb-2">
                <StarRating rating={averageRating} size="md" />
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                {reviews.length} {reviews.length === 1 ? 'recensione' : 'recensioni'}
              </p>
            </div>

            {/* Rating distribution bars */}
            <div className="flex-1 w-full space-y-3">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter((r) => r.rating === star).length
                const percentage = (count / reviews.length) * 100

                return (
                  <div key={star} className="flex items-center gap-4 text-sm">
                    <span className="text-gray-400 w-4 font-mono">{star}</span>
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#D40000]" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="text-gray-500 w-8 text-right font-mono text-xs">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Reviews list */}
      <div className="grid gap-4">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  )
}
