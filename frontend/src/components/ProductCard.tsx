import { useState } from "react"
import { Button } from "../components/ui/button"
import { addToCart } from "../lib/cart"

type Product = {
  id: number
  name: string
  description: string
  price: number
  image_url?: string
}

export default function ProductCard({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false)

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

  return (
    <div
      className={`
        bg-card border border-border rounded-lg overflow-hidden
        transition-all hover:shadow-md flex flex-col
      `}
    >
      <div className="aspect-square bg-muted">
        <img
          src={product.image_url || "/vite.svg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="text-lg font-bold mb-4">{product.price} €</p>

        <Button onClick={handleAdd} disabled={loading} className="mt-auto">
          {loading ? "Ajout..." : "Ajouter au panier"}
        </Button>
      </div>
    </div>
  )
}
