import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import AddProductForm from "../components/AddProductForm"
import { isAdmin } from "../lib/auth"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import { Input } from "../components/ui/input"

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
    <div className="grid grid-cols-12 gap-sides">
      {/* Filter Sidebar */}
      <aside className="hidden md:grid grid-cols-3 pl-sides pt-top-spacing h-screen sticky top-0 col-span-3">
        <div className="flex flex-col gap-4 col-span-2">
          <div className="flex items-baseline justify-between pl-2 -mb-2">
            <h2 className="text-2xl font-semibold">Filter</h2>
            <Button
              size="sm"
              variant="ghost"
              aria-label="Clear all filters"
              className="font-medium text-foreground/50 hover:text-foreground/60"
              onClick={() => {
                setSearch("");
                setPriceMin("");
                setPriceMax("");
                setSort("none");
              }}
            >
              Clear
            </Button>
          </div>

          {/* Search */}
          <div className="pl-2">
            <label className="text-sm font-medium mb-2 block">Search</label>
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full"
            />
          </div>

          {/* Price Filter */}
          <div className="pl-2">
            <label className="text-sm font-medium mb-2 block">Price</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                placeholder="Min"
                className="w-full"
                min={0}
              />
              <Input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                placeholder="Max"
                className="w-full"
                min={0}
              />
            </div>
          </div>

          {/* Sort */}
          <div className="pl-2">
            <label className="text-sm font-medium mb-2 block">Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            >
              <option value="none">None</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="col-span-12 md:col-span-9 pr-sides pt-top-spacing">
        {/* Results Controls */}
        <div className="grid grid-cols-3 items-center w-full mb-4">
          <div className="text-sm text-foreground/50">
            <Link to="/products" className="font-semibold hover:text-foreground">Shop</Link>
            <span className="mx-2">/</span>
            <span className="font-semibold">All Products</span>
          </div>
          <span className="text-foreground/50 text-sm place-self-center">
            {filteredProducts.length} results
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="justify-self-end px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background w-[120px]"
          >
            <option value="none">Sort by</option>
            <option value="price-asc">Price-Low</option>
            <option value="price-desc">Price-High</option>
            <option value="name">Name</option>
          </select>
        </div>

        {isAdmin() && (
          <div className="mb-6">
            <Button
              onClick={() => setShowForm((v) => !v)}
              variant="outline"
            >
              {showForm ? "Close Form" : "Add Product"}
            </Button>
          </div>
        )}

        {isAdmin() && showForm && (
          <div className="mb-6">
            <AddProductForm
              onProductAdded={(newProduct) => {
                setShowForm(false);
                setProducts((prev) => [...prev, newProduct]);
              }}
            />
          </div>
        )}

        {error && <p className="text-destructive mb-4">{error}</p>}

        {filteredProducts.length === 0 && (
          <div className="text-center text-muted-foreground my-8 px-4">
            <p className="text-lg mb-4">No products found.</p>
            {isAdmin() && (
              <Button
                onClick={() => setShowForm(true)}
                variant="outline"
              >
                Add Product
              </Button>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  )
}
