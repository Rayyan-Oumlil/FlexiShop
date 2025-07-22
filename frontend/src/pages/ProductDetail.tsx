import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { isAdmin } from "../lib/auth";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${id}/reviews`)
      .then(res => res.json())
      .then(setReviews);
  }, [id, reviewSuccess]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewLoading(true);
    setReviewError("");
    setReviewSuccess("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:8000/api/products/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: reviewRating, comment: reviewText })
      });
      if (!res.ok) {
        const data = await res.json();
        setReviewError(data.detail || "Error submitting review");
      } else {
        setReviewText("");
        setReviewRating(5);
        setReviewSuccess("Review submitted!");
      }
    } catch {
      setReviewError("Network error");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) return <div className="py-12 text-center">Loading...</div>;
  if (!product) return <div className="py-12 text-center text-red-500">Product not found.</div>;

  const avgRating = reviews.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : null;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Link to="/products" className="text-pink-600 hover:underline mb-4 inline-block">← Back to Products</Link>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <img src={product.image_url || "/vite.svg"} alt={product.name} className="w-full md:w-80 h-80 object-cover rounded-xl shadow" />
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold text-pink-600 mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-2">{product.price} €</p>
          {avgRating && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-400 text-2xl font-bold">★ {avgRating}</span>
              <span className="text-gray-500 text-sm">({reviews.length} review{reviews.length > 1 ? "s" : ""})</span>
            </div>
          )}
        </div>
      </div>
      {/* Reviews section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-pink-500 mb-6">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500 mb-4">No reviews yet. Be the first to review this product!</p>
        ) : (
          <div className="space-y-6 mb-8">
            {reviews.map(r => (
              <div key={r.id} className="bg-white rounded-2xl shadow p-5 flex gap-4 items-start">
                {/* Avatar/Initial */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-xl shadow">
                  {r.user_email ? r.user_email[0].toUpperCase() : "U"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-400 text-lg">{"★".repeat(r.rating)}<span className="text-gray-300">{"★".repeat(5 - r.rating)}</span></span>
                    <span className="text-gray-700 font-semibold">{r.user_email || "User"}</span>
                    <span className="text-gray-400 text-xs ml-2">{new Date(r.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="text-gray-700 text-base">{r.comment}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Review form (only if not admin) */}
        {!isAdmin() && (
          <form onSubmit={handleReviewSubmit} className="bg-pink-50 rounded-2xl shadow p-8 space-y-4 border border-pink-100">
            <h3 className="text-lg font-bold text-pink-600 mb-2">Leave a Review</h3>
            {reviewError && <div className="text-red-600 font-semibold">{reviewError}</div>}
            {reviewSuccess && <div className="text-green-600 font-semibold">{reviewSuccess}</div>}
            <div>
              <label className="block text-gray-700 mb-1">Rating</label>
              <select
                value={reviewRating}
                onChange={e => setReviewRating(Number(e.target.value))}
                className="w-24 px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 text-lg shadow"
                required
              >
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ★</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Comment</label>
              <textarea
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                className="w-full border rounded px-3 py-2"
                rows={3}
                placeholder="Share your experience..."
                required
              />
            </div>
            <Button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-2 rounded-full transition" disabled={reviewLoading}>
              {reviewLoading ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
} 