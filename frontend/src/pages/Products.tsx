import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import AddProductForm from "../components/AddProductForm"
import { isAdmin } from "../lib/auth"

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
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur chargement des produits")
        return res.json()
      })
      .then(setProducts)
      .catch((err) => setError(err.message))
  }, [])

  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nos produits</h1>

      {isAdmin() && (
        <button
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? "Fermer le formulaire" : "Ajouter un produit"}
        </button>
      )}

      {isAdmin() && showForm && (
        <AddProductForm
          onProductAdded={(newProduct) => {
            setShowForm(false);
            setProducts((prev) => [...prev, newProduct]);
          }}
        />
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={() => {
              setProducts((prev) => prev.filter((p) => p.id !== product.id))
            }}
            onProductUpdated={(updated) => {
              setProducts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
            }}
          />
        ))}
      </div>
    </div>
  )
}
