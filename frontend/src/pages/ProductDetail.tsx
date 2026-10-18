import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { isAdmin } from "../lib/auth";
import { addToCart } from "../lib/cart";
import { Star } from "lucide-react";

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
  const [addingToCart, setAddingToCart] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetch(`${API_URL}/api/products/${id}/reviews`)
      .then(res => res.json())
      .then(setReviews);
  }, [id, reviewSuccess]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAddingToCart(true);
    try {
      await addToCart(product.id);
      alert("Added to cart ✅");
    } catch (err) {
      alert("Error adding to cart ❌");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewLoading(true);
    setReviewError("");
    setReviewSuccess("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api/products/${id}/reviews`, {
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
  if (!product) return <div className="py-12 text-center text-destructive">Product not found.</div>;

  const avgRating = reviews.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link to="/products" className="text-foreground/50 hover:text-foreground mb-6 inline-block">
        ← Back to Products
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="w-full aspect-square bg-muted rounded-lg overflow-hidden">
          <img
            src={product.image_url || "/vite.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-muted-foreground text-lg mb-4">{product.description}</p>
            <p className="text-3xl font-bold mb-4">{product.price} €</p>
            {avgRating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(Number(avgRating))
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-foreground/50 text-sm">
                  {avgRating} ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
                </span>
              </div>
            )}
          </div>
          {!isAdmin() && (
            <Button
              onClick={handleAddToCart}
              disabled={addingToCart}
              size="lg"
              className="w-full md:w-auto"
            >
              {addingToCart ? "Adding..." : "Add to Cart"}
            </Button>
          )}
        </div>
      </div>

      {/* Reviews section */}
      <div className="border-t border-border pt-12">
        <h2 className="text-2xl font-bold mb-8">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-muted-foreground mb-8">No reviews yet. Be the first to review this product!</p>
        ) : (
          <div className="space-y-6 mb-12">
            {reviews.map(r => (
              <div key={r.id} className="bg-card rounded-lg p-6 flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {r.user_email ? r.user_email[0].toUpperCase() : "U"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < r.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{r.user_email || "User"}</span>
                    <span className="text-muted-foreground text-xs">
                      {new Date(r.created_at).toLocaleDateString('en-US')}
                    </span>
                  </div>
                  <p className="text-foreground">{r.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Review form (only if not admin) */}
        {!isAdmin() && (
          <form onSubmit={handleReviewSubmit} className="bg-card rounded-lg p-8 space-y-4 border border-border">
            <h3 className="text-lg font-bold mb-4">Leave a Review</h3>
            {reviewError && <div className="text-destructive font-semibold">{reviewError}</div>}
            {reviewSuccess && <div className="text-green-600 font-semibold">{reviewSuccess}</div>}
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <select
                value={reviewRating}
                onChange={e => setReviewRating(Number(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                required
              >
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} stars</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Comment</label>
              <textarea
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                rows={4}
                placeholder="Share your experience..."
                required
              />
            </div>
            <Button type="submit" disabled={reviewLoading}>
              {reviewLoading ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
