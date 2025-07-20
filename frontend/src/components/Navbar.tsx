import { Link, useLocation } from "react-router-dom"
import { ShoppingCart, User, ShoppingBag } from "lucide-react"

export default function Navbar() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-lg font-bold">
            <ShoppingBag className="w-6 h-6" />
            <span>MonShop</span>
          </Link>

          {/* Liens */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/") ? "text-black dark:text-white" : "text-muted-foreground"
              }`}
            >
              Produits
            </Link>

            <Link
              to="/cart"
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                isActive("/cart") ? "text-black dark:text-white" : "text-muted-foreground"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              Panier
            </Link>

            <Link
              to="/login"
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                isActive("/login") ? "text-black dark:text-white" : "text-muted-foreground"
              }`}
            >
              <User className="w-4 h-4" />
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
