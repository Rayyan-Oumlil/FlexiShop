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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">Nos produits</h1>

      {/* Search, filters, and sort */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 max-w-4xl mx-auto">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un produit..."
          className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 text-base sm:text-lg shadow"
        />
        <div className="flex gap-2 sm:gap-3">
          <input
            type="number"
            value={priceMin}
            onChange={e => setPriceMin(e.target.value)}
            placeholder="Prix min"
            className="w-20 sm:w-28 px-2 sm:px-3 py-2 sm:py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 text-sm sm:text-lg shadow"
            min={0}
          />
          <input
            type="number"
            value={priceMax}
            onChange={e => setPriceMax(e.target.value)}
            placeholder="Prix max"
            className="w-20 sm:w-28 px-2 sm:px-3 py-2 sm:py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 text-sm sm:text-lg shadow"
            min={0}
          />
        </div>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="w-full sm:w-40 px-3 sm:px-4 py-2 sm:py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 text-base sm:text-lg shadow"
        >
          <option value="none">Tri</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="name">Nom</option>
        </select>
      </div>

      {isAdmin() && (
        <div className="flex justify-center sm:justify-start mb-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
            onClick={() => setShowForm((v) => !v)}
          >
            {showForm ? "Fermer le formulaire" : "Ajouter un produit"}
          </button>
        </div>
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
        <div className="text-center text-gray-500 my-8 px-4">
          <p className="text-lg sm:text-xl mb-4">Aucun produit disponible.</p>
          {isAdmin() && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
              onClick={() => setShowForm(true)}
            >
              Ajouter un produit
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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
