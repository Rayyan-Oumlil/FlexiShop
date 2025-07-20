import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"

type Product = {
  id: number
  name: string
  description: string
  price: number
  image_url?: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur chargement des produits")
        return res.json()
      })
      .then(setProducts)
      .catch((err) => setError(err.message))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nos produits</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
