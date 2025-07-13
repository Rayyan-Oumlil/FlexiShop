import { useEffect, useState } from "react"
import { getCart } from "../lib/cart"

export function useCartCount() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    getCart()
      .then((cart) => {
        const total = cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0)
        setCount(total)
      })
      .catch(() => setCount(0))
  }, [])

  return count
}
