import { useState } from "react"
import { Button } from "../components/ui/button"
import { addToCart } from "../lib/cart"
import { isAdmin } from "../lib/auth"
import EditProductForm from "./EditProductForm";

type Product = {
  id: number
  name: string
  description: string
  price: number
  image_url?: string
}

async function deleteProduct(productId: number) {
  const token = localStorage.getItem("token")
  const res = await fetch(`http://localhost:8000/api/products/${productId}`, {
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

export default function ProductCard({ product, onDelete, onProductUpdated }: { product: Product, onDelete?: () => void, onProductUpdated?: (updated: Product) => void }) {
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [editing, setEditing] = useState(false)

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
      <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
        <img
          src={product.image_url || "/vite.svg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
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
