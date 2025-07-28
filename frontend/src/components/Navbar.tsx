import { Link, useLocation } from "react-router-dom"
import { ShoppingCart, User, ShoppingBag, Menu, X } from "lucide-react"
import { useState } from "react"

function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-8 sm:pt-12 pb-4 sm:pb-6 border-t border-zinc-800 mt-8 sm:mt-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row flex-wrap justify-between gap-8 sm:gap-12 px-4 sm:px-6">
        {/* FlexiShop / About */}
        <div className="flex-1 min-w-[200px] mb-6 sm:mb-8 md:mb-0">
          <Link to="/" className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold text-white mb-2 hover:text-pink-400 transition-colors duration-200">
            <span role="img" aria-label="bag">🛍️</span> FlexiShop
          </Link>
          <p className="text-zinc-300 text-xs sm:text-sm mt-2">Your trusted shop for tech, fashion, and more. Fast delivery, secure payment, 24/7 support.</p>
        </div>
        {/* Entreprise */}
        <div className="flex-1 min-w-[150px] sm:min-w-[180px] mb-6 sm:mb-8 md:mb-0">
          <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">Entreprise</h4>
          <ul className="space-y-1 sm:space-y-2">
            <li><Link to="/about" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200 text-sm sm:text-base">About Us</Link></li>
            <li><Link to="/careers" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200 text-sm sm:text-base">Careers</Link></li>
            <li><Link to="/partner" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200 text-sm sm:text-base">Partners</Link></li>
            <li><Link to="/blog" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200 text-sm sm:text-base">Blog</Link></li>
          </ul>
        </div>
        {/* Help */}
        <div className="flex-1 min-w-[150px] sm:min-w-[180px] mb-6 sm:mb-8 md:mb-0">
          <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">Help</h4>
          <ul className="space-y-1 sm:space-y-2">
            <li><Link to="/contact-us" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200 text-sm sm:text-base">Contact Us</Link></li>
            <li><Link to="/account-management" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200 text-sm sm:text-base">Account Management</Link></li>
            <li><Link to="/cancel-order" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200 text-sm sm:text-base">Order Canceling</Link></li>
            <li><Link to="/faq" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200 text-sm sm:text-base">FAQ</Link></li>
            <li><Link to="/support" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200 text-sm sm:text-base">Support Center</Link></li>
            <li><Link to="/favorites" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200 text-sm sm:text-base">My Favorites</Link></li>
          </ul>
        </div>
        {/* Contact */}
        <div className="flex-1 min-w-[150px] sm:min-w-[180px]">
          <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">Contact</h4>
          <p className="text-zinc-200 text-xs sm:text-sm mb-1">contact@flexishop.com</p>
          <p className="text-zinc-200 text-xs sm:text-sm mb-3 sm:mb-4">+1 555 123 4567</p>
          <div className="flex gap-3 sm:gap-4 mt-2">
            <a href="#" className="text-pink-400 hover:text-white text-lg sm:text-xl" title="Twitter" aria-label="Twitter">🐦</a>
            <a href="#" className="text-pink-400 hover:text-white text-lg sm:text-xl" title="Instagram" aria-label="Instagram">📸</a>
            <a href="#" className="text-pink-400 hover:text-white text-lg sm:text-xl" title="Facebook" aria-label="Facebook">📘</a>
            <a href="#" className="text-pink-400 hover:text-white text-lg sm:text-xl" title="LinkedIn" aria-label="LinkedIn">💼</a>
          </div>
        </div>
      </div>
      <div className="mt-8 sm:mt-10 text-center text-zinc-400 text-xs border-t border-zinc-800 pt-3 sm:pt-4 px-4">
        &copy; {new Date().getFullYear()} FlexiShop. All rights reserved.
      </div>
    </footer>
  );
}

export default function Navbar() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 shadow-lg border-b border-border sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-white tracking-wide hover:text-pink-400 transition-colors duration-200">
            <ShoppingBag className="w-7 h-7 text-pink-400" />
            <span className="hidden sm:inline">FlexiShop</span>
            <span className="sm:hidden">FS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/products"
              className={`text-sm font-semibold transition-colors duration-200 px-3 py-1 rounded hover:text-pink-400 ${
                isActive("/products") ? "text-pink-400" : "text-white"
              }`}
            >
              Products
            </Link>

            <Link
              to="/cart"
              className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-200 px-3 py-1 rounded hover:text-pink-400 ${
                isActive("/cart") ? "text-pink-400" : "text-white"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              Cart
            </Link>

            <Link
              to="/login"
              className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-200 px-3 py-1 rounded hover:text-pink-400 ${
                isActive("/login") ? "text-pink-400" : "text-white"
              }`}
            >
              <User className="w-4 h-4" />
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center p-2 text-white hover:text-pink-400 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-zinc-800 border-t border-zinc-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive("/products") ? "text-pink-400 bg-zinc-700" : "text-white hover:text-pink-400 hover:bg-zinc-700"
                }`}
              >
                Products
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive("/cart") ? "text-pink-400 bg-zinc-700" : "text-white hover:text-pink-400 hover:bg-zinc-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                </div>
              </Link>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive("/login") ? "text-pink-400 bg-zinc-700" : "text-white hover:text-pink-400 hover:bg-zinc-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Login
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export { Footer };
