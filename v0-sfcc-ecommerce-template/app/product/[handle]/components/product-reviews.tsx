"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { RatingDisplay } from "./rating-display"

interface Review {
  id: string
  rating: number
  title: string
  content: string
  authorName: string
  createdAt: string
}

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    rating: 5,
    title: "Excellent product!",
    content: "Great quality, fast shipping, and excellent customer service. Highly recommended!",
    authorName: "Sarah M.",
    createdAt: "2025-11-15",
  },
  {
    id: "2",
    rating: 4,
    title: "Very good value",
    content: "Good product for the price. Arrived on time and works as expected.",
    authorName: "John D.",
    createdAt: "2025-11-10",
  },
  {
    id: "3",
    rating: 5,
    title: "Perfect!",
    content: "Exceeded my expectations. Will definitely buy again.",
    authorName: "Emma L.",
    createdAt: "2025-11-05",
  },
]

const averageRating = MOCK_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / MOCK_REVIEWS.length

export function ProductReviews() {
  const [sortBy, setSortBy] = useState<"newest" | "helpful">("newest")

  const sortedReviews = [...MOCK_REVIEWS].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    return b.rating - a.rating
  })

  return (
    <section className="w-full py-12 md:py-16 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Customer Reviews</h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <RatingDisplay rating={averageRating} total={MOCK_REVIEWS.length} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "newest" | "helpful")}
              className="px-4 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="newest">Newest First</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {sortedReviews.map((review) => (
            <div key={review.id} className="border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <h3 className="font-semibold text-lg">{review.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {review.authorName} • {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-sm text-foreground/80">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
