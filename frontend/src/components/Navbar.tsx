import { Link, useLocation } from "react-router-dom"
import { ShoppingCart, User, ShoppingBag } from "lucide-react"

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-center py-10 mt-12 border-t border-gray-800">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-4">
        {/* Bloc réseaux sociaux */}
        <div className="flex flex-col items-center gap-2">
          <h4 className="font-bold text-gray-100 mb-1">Follow us</h4>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="text-blue-400 hover:text-yellow-300" title="Twitter">🐦</a>
            <a href="#" className="text-pink-400 hover:text-yellow-300" title="Instagram">📸</a>
            <a href="#" className="text-blue-600 hover:text-yellow-300" title="Facebook">📘</a>
            <a href="#" className="text-gray-300 hover:text-yellow-300" title="LinkedIn">💼</a>
          </div>
        </div>
        {/* Bloc contact */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <h4 className="font-bold text-gray-100 mb-1">Contact</h4>
          <p className="text-gray-300 text-sm">contact@mystore.com</p>
          <p className="text-gray-300 text-sm">+1 555 123 4567</p>
        </div>
      </div>
      <div className="mt-8 text-gray-400 text-xs">
        <p>&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
        <p className="mt-2">About: MyStore is a platform for tech, fashion, and more. Fast delivery, secure payment, 24/7 support.</p>
      </div>
    </footer>
  );
}

export default function Navbar() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 shadow-lg border-b border-border sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-white tracking-wide">
            <ShoppingBag className="w-7 h-7 text-pink-400" />
            <span>MyStore</span>
          </Link>

          {/* Liens */}
          <div className="flex items-center gap-6">
            <Link
              to="/products"
              className={`text-sm font-semibold transition-colors duration-200 px-3 py-1 rounded hover:text-blue-300 ${
                isActive("/products") ? "text-blue-300" : "text-white"
              }`}
            >
              Products
            </Link>

            <Link
              to="/cart"
              className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-200 px-3 py-1 rounded hover:text-blue-300 ${
                isActive("/cart") ? "text-blue-300" : "text-white"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              Cart
            </Link>

            <Link
              to="/login"
              className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-200 px-3 py-1 rounded hover:text-blue-300 ${
                isActive("/login") ? "text-blue-300" : "text-white"
              }`}
            >
              <User className="w-4 h-4" />
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export { Footer };
