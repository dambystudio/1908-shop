interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = false,
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }).map((_, index) => {
        const filled = index < Math.floor(rating)
        const partial = index === Math.floor(rating) && rating % 1 !== 0

        return (
          <svg
            key={index}
            className={`${sizeClasses[size]} ${
              filled ? 'text-[#F5C400]' : partial ? 'text-[#F5C400]' : 'text-gray-600'
            }`}
            fill={filled || partial ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={filled || partial ? 0 : 1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {partial ? (
              <defs>
                <linearGradient id={`star-gradient-${index}`}>
                  <stop offset={`${(rating % 1) * 100}%`} stopColor="currentColor" />
                  <stop offset={`${(rating % 1) * 100}%`} stopColor="transparent" />
                </linearGradient>
              </defs>
            ) : null}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              fill={partial ? `url(#star-gradient-${index})` : undefined}
            />
          </svg>
        )
      })}
      {showNumber && <span className="ml-1 text-sm text-gray-400">{rating.toFixed(1)}</span>}
    </div>
  )
}
