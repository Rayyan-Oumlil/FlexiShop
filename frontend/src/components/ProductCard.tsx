import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { addToCart } from "../lib/cart"
import { isAdmin } from "../lib/auth"
import EditProductForm from "./EditProductForm";
import { Link } from "react-router-dom";

type Product = {
  id: number
  name: string
  description: string
  price: number
  image_url?: string
}

async function deleteProduct(productId: number) {
  const token = localStorage.getItem("token")
  const API_URL = import.meta.env.VITE_API_URL || "";
  const res = await fetch(`${API_URL}/api/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.detail || "Erreur suppression produit")
  }
}

// Helper functions for wishlist in localStorage
function getWishlist(): number[] {
  try {
    return JSON.parse(localStorage.getItem("wishlist") || "[]");
  } catch {
    return [];
  }
}
function setWishlist(ids: number[]) {
  localStorage.setItem("wishlist", JSON.stringify(ids));
}

export default function ProductCard({ product, onDelete, onProductUpdated }: { product: Product, onDelete?: () => void, onProductUpdated?: (updated: Product) => void }) {
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [editing, setEditing] = useState(false)
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    setIsFav(getWishlist().includes(product.id));
  }, [product.id]);

  const toggleFav = () => {
    const wishlist = getWishlist();
    if (wishlist.includes(product.id)) {
      setWishlist(wishlist.filter(id => id !== product.id));
      setIsFav(false);
    } else {
      setWishlist([...wishlist, product.id]);
      setIsFav(true);
    }
  };

  const handleAdd = () => {
    setLoading(true)
    addToCart(product.id)
      .then(() => {
        alert("Ajouté au panier ✅")
      })
      .catch((err) => {
        console.error("Erreur ajout panier :", err)
        alert("Erreur ajout ❌")
      })
      .finally(() => setLoading(false))
  }

  const handleDelete = async () => {
    if (!window.confirm("Supprimer ce produit ?")) return
    setDeleting(true)
    try {
      await deleteProduct(product.id)
      alert("Produit supprimé ✅")
      if (onDelete) onDelete()
    } catch (err: any) {
      alert(err.message || "Erreur suppression ❌")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div
      className={
        `
        bg-white border border-gray-200 rounded-xl shadow-xl
        transition-transform duration-200 hover:scale-105 hover:shadow-2xl flex flex-col
        overflow-hidden
      `
      }
    >
      <div className="relative aspect-square bg-muted flex items-center justify-center overflow-hidden">
        <img
          src={product.image_url || "/vite.svg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Heart icon for wishlist */}
        <button
          onClick={toggleFav}
          className={`absolute top-2 right-2 text-2xl z-10 transition-colors ${isFav ? "text-pink-500" : "text-gray-300 hover:text-pink-400"}`}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          {isFav ? "♥" : "♡"}
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-blue-700 mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="text-lg font-bold mb-4">{product.price} €</p>

        {/* Bouton panier */}
        {!isAdmin() && (
          <Button onClick={handleAdd} disabled={loading} className="mt-auto">
            {loading ? "Ajout..." : "Ajouter au panier"}
          </Button>
        )}
        <Link to={`/products/${product.id}`} className="mt-2 text-pink-600 hover:underline font-semibold text-center block">View Details</Link>
        {isAdmin() && (
          <>
            <Button
              onClick={handleDelete}
              disabled={deleting}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white"
            >
              {deleting ? "Suppression..." : "Supprimer"}
            </Button>
            <Button
              onClick={() => setEditing(true)}
              className="mt-2 bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Modifier
            </Button>
            {editing && (
              <EditProductForm
                product={product}
                onProductUpdated={(updated) => {
                  if (onProductUpdated) onProductUpdated(updated);
                  setEditing(false);
                }}
                onClose={() => setEditing(false)}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
