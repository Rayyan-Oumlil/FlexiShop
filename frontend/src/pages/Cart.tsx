import { useEffect, useState } from "react"
import { getCart, clearCart } from "../lib/cart"
import { Button } from "../components/ui/button"

import Layout from "../components/Layout"

type CartItem = {
  id: number
  quantity: number
  product: {
    name: string
    price: number
  }
}

export default function CartPage() {
  const [cart, setCart] = useState<{ id: number; items: CartItem[] } | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    getCart()
      .then(setCart)
      .catch((err) => setError(err.message))
  }, [])

  const total = cart?.items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  )

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Mon Panier</h1>

      {error && <p className="text-red-500">{error}</p>}

      {cart && cart.items.length === 0 && <p>Votre panier est vide.</p>}

      <ul className="space-y-2">
        {cart?.items.map((item) => (
          <li key={item.id} className="border p-4 rounded">
            <div className="flex justify-between items-center">
              <span>{item.product.name}</span>
              <span>{item.quantity} x {item.product.price} €</span>
            </div>
          </li>
        ))}
      </ul>

      {cart?.items.length > 0 && (
        <>
          <div className="mt-4 text-right font-semibold">
            Total : {total?.toFixed(2)} €
          </div>

          <Button
            className="mt-4 bg-red-600 hover:bg-red-700 w-full"
            onClick={() =>
              clearCart().then(() => window.location.reload())
            }
          >
            Vider le panier
          </Button>
        </>
      )}
    </Layout>
  )
}