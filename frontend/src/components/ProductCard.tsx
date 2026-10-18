import { useState, useEffect } from "react"
import type React from "react"
import { Button } from "./ui/button"
import { addToCart } from "../lib/cart"
import { isAdmin } from "../lib/auth"
import EditProductForm from "./EditProductForm";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

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

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wishlist = getWishlist();
    if (wishlist.includes(product.id)) {
      setWishlist(wishlist.filter(id => id !== product.id));
      setIsFav(false);
    } else {
      setWishlist([...wishlist, product.id]);
      setIsFav(true);
    }
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    <div className="relative w-full aspect-[3/4] md:aspect-square bg-muted group overflow-hidden">
      <Link
        to={`/products/${product.id}`}
        className="block size-full focus-visible:outline-none"
        aria-label={`View details for ${product.name}, price ${product.price} €`}
      >
        <img
          src={product.image_url || "/vite.svg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Heart icon for wishlist */}
      <button
        onClick={toggleFav}
        className={`absolute top-2 right-2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm transition-colors ${
          isFav ? "text-red-500" : "text-foreground/50 hover:text-red-500"
        }`}
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
      </button>

      {/* Interactive Overlay */}
      <div className="absolute inset-0 w-full p-2 pointer-events-none">
        <div className="max-md:hidden w-full flex gap-6 justify-between items-baseline font-semibold px-3 py-1 group-hover:opacity-0 group-focus-visible:opacity-0 translate-y-0 group-hover:-translate-y-full group-focus-visible:-translate-y-full transition-all duration-300">
          <p className="text-sm 2xl:text-base uppercase text-balance">
            {product.name}
          </p>
          <p className="text-sm 2xl:text-base uppercase">
            {product.price} €
          </p>
        </div>

        <div className="absolute bottom-3 inset-x-3 px-2 py-3 rounded-md bg-card flex flex-col gap-8 md:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 md:translate-y-1/3 group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto group-focus-visible:pointer-events-auto max-md:pointer-events-auto">
          <div className="grid grid-cols-2 items-end gap-y-8 gap-x-4">
            <p className="text-lg font-semibold text-pretty">{product.name}</p>
            <p className="text-lg font-semibold place-self-end">
              {product.price} €
            </p>
            {!isAdmin() && (
              <Button
                onClick={handleAdd}
                disabled={loading}
                size="sm"
                className="col-start-2"
              >
                {loading ? "Adding..." : "Add to Cart"}
              </Button>
            )}
            {isAdmin() && (
              <>
                <Button
                  onClick={handleDelete}
                  disabled={deleting}
                  variant="destructive"
                  size="sm"
                  className="col-start-2"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setEditing(true);
                  }}
                  variant="outline"
                  size="sm"
                  className="col-start-2"
                >
                  Edit
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

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
    </div>
  )
}
