import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function getWishlist(): number[] {
  try {
    return JSON.parse(localStorage.getItem("wishlist") || "[]");
  } catch {
    return [];
  }
}

export default function Favorites() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = getWishlist();
    if (ids.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }
    fetch(`http://localhost:8000/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.filter((p: any) => ids.includes(p.id)));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-8">My Favorites</h1>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-lg">You have no favorite products yet. Click the ♥ on a product to add it to your favorites!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
} 