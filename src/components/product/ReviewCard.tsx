import { StarRating } from '@/components/ui/StarRating'
import type { Review } from '@/domains/review/types'

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-[#D40000]/30 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-bold text-white mb-1">{review.author}</h4>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {formatDate(review.createdAt)}
          </p>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>

      {/* Content */}
      <p className="text-gray-300 leading-relaxed font-light">{review.content}</p>
    </div>
  )
}
