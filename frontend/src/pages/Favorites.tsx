import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Heart } from "lucide-react";

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
    const API_URL = import.meta.env.VITE_API_URL || "";
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.filter((p: any) => ids.includes(p.id)));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">My Favorites</h1>
      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground text-lg mb-2">You have no favorite products yet.</p>
          <p className="text-muted-foreground">Click the ♥ on a product to add it to your favorites!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
