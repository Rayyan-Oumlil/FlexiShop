import { useEffect, useState } from "react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { addToCart } from "../lib/cart"

import Layout from "../components/Layout"



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
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Produits</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
              <p className="mt-2 font-bold">{product.price} €</p>
              <Button
              className="mt-4 w-full"
              onClick={() => {
                console.log("🛒 Bouton cliqué : product", product.id)
                addToCart(product.id)
                .then(() => {
                    alert("Ajouté au panier ✅")
                    console.log("✅ Produit ajouté :", product.id)
                })
                .catch((err) => {
                    console.error("Erreur ajout panier :", err)
                    alert("Erreur lors de l’ajout ❌")
                })
                }}
                >
                    Ajouter au panier
                    </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  )
}
