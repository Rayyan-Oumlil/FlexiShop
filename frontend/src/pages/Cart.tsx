import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { getCart, clearCart } from "../lib/cart"

type CartItem = {
  id: number
  quantity: number
  product: {
    id: number
    name: string
    price: number
    image_url?: string
  }
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadCart = () => {
    setLoading(true)
    getCart()
      .then((data) => {
        setItems(data.items || [])
      })
      .catch(() => setError("Erreur chargement du panier"))
      .finally(() => setLoading(false))
  }

  const handleClear = () => {
    clearCart()
      .then(() => {
        alert("Panier vidé ✅")
        loadCart()
      })
      .catch(() => alert("Erreur vidage ❌"))
  }

  useEffect(() => {
    loadCart()
  }, [])

  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Votre panier</h1>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {items.length === 0 && !loading ? (
        <p className="text-muted-foreground">Votre panier est vide.</p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border p-4 rounded-lg bg-white dark:bg-zinc-900"
            >
              <img
                src={item.product.image_url || "/vite.svg"}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="font-semibold">{item.product.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} x {item.product.price} €
                </p>
              </div>
              <div className="font-bold">
                {(item.quantity * item.product.price).toFixed(2)} €
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <p className="text-xl font-bold">Total :</p>
            <p className="text-xl font-bold">{total.toFixed(2)} €</p>
          </div>

          <Button variant="destructive" className="w-full" onClick={handleClear}>
            Vider le panier
          </Button>
        </div>
      )}
    </div>
  )
}
