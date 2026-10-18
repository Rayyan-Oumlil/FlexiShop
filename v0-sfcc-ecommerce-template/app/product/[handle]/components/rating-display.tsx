"use client"

import { Star } from "lucide-react"

export function RatingDisplay({ rating, total }: { rating: number; total: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)
  const roundedRating = Math.round(rating * 10) / 10

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {stars.map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(rating)
                ? "fill-primary text-primary"
                : star - 0.5 <= rating
                  ? "fill-primary text-primary opacity-50"
                  : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
      <div className="text-sm">
        <span className="font-semibold">{roundedRating}</span>
        <span className="text-muted-foreground"> ({total} reviews)</span>
      </div>
    </div>
  )
}
