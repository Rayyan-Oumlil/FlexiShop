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
  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState("none");

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "";
    fetch(`${API_URL}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur chargement des produits")
        return res.json()
      })
      .then((data) => {
        if (data.length === 0) {
          setProducts([]);
          // Optionnel : affiche un message "Aucun produit" ou propose d'ajouter si admin
        } else {
          setProducts(data);
        }
      })
      .catch((err) => setError(err.message))
  }, [])

  let filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );
  if (priceMin) filteredProducts = filteredProducts.filter(p => p.price >= Number(priceMin));
  if (priceMax) filteredProducts = filteredProducts.filter(p => p.price <= Number(priceMax));
  if (sort === "price-asc") filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  if (sort === "name") filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nos produits</h1>

      {/* Search, filters, and sort */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end gap-4 max-w-3xl mx-auto">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un produit..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 text-lg shadow"
        />
        <input
          type="number"
          value={priceMin}
          onChange={e => setPriceMin(e.target.value)}
          placeholder="Prix min"
          className="w-28 px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 text-lg shadow"
          min={0}
        />
        <input
          type="number"
          value={priceMax}
          onChange={e => setPriceMax(e.target.value)}
          placeholder="Prix max"
          className="w-28 px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 text-lg shadow"
          min={0}
        />
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="w-40 px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 text-lg shadow"
        >
          <option value="none">Tri</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="name">Nom</option>
        </select>
      </div>

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

      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 my-8">
          Aucun produit disponible.
          {isAdmin() && (
            <>
              <br />
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setShowForm(true)}
              >
                Ajouter un produit
              </button>
            </>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
        {filteredProducts.map((product) => (
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
