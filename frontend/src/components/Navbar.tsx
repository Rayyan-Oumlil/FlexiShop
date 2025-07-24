import { Link, useLocation } from "react-router-dom"
import { ShoppingCart, User, ShoppingBag } from "lucide-react"

function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-12 pb-6 border-t border-zinc-800 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row flex-wrap justify-between gap-12 px-6">
        {/* FlexiShop / About */}
        <div className="flex-1 min-w-[200px] mb-8 md:mb-0">
          <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-white mb-2 hover:text-pink-400 transition-colors duration-200">
            <span role="img" aria-label="bag">🛍️</span> FlexiShop
          </Link>
          <p className="text-zinc-300 text-sm mt-2">Your trusted shop for tech, fashion, and more. Fast delivery, secure payment, 24/7 support.</p>
        </div>
        {/* Entreprise */}
        <div className="flex-1 min-w-[180px] mb-8 md:mb-0">
          <h4 className="font-bold text-lg mb-3">Entreprise</h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200">About Us</Link></li>
            <li><Link to="/careers" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200">Careers</Link></li>
            <li><Link to="/partner" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200">Partners</Link></li>
            <li><Link to="/blog" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200">Blog</Link></li>
          </ul>
        </div>
        {/* Help */}
        <div className="flex-1 min-w-[180px] mb-8 md:mb-0">
          <h4 className="font-bold text-lg mb-3">Help</h4>
          <ul className="space-y-2">
            <li><Link to="/contact-us" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200">Contact Us</Link></li>
            <li><Link to="/account-management" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200">Account Management</Link></li>
            <li><Link to="/cancel-order" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200">Order Canceling</Link></li>
            <li><Link to="/faq" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200">FAQ</Link></li>
            <li><Link to="/support" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200">Support Center</Link></li>
            <li><Link to="/favorites" className="text-pink-400 hover:text-white hover:underline transition-colors duration-200">My Favorites</Link></li>
          </ul>
        </div>
        {/* Contact */}
        <div className="flex-1 min-w-[180px]">
          <h4 className="font-bold text-lg mb-3">Contact</h4>
          <p className="text-zinc-200 text-sm mb-1">contact@flexishop.com</p>
          <p className="text-zinc-200 text-sm mb-4">+1 555 123 4567</p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="text-pink-400 hover:text-white" title="Twitter" aria-label="Twitter">🐦</a>
            <a href="#" className="text-pink-400 hover:text-white" title="Instagram" aria-label="Instagram">📸</a>
            <a href="#" className="text-pink-400 hover:text-white" title="Facebook" aria-label="Facebook">📘</a>
            <a href="#" className="text-pink-400 hover:text-white" title="LinkedIn" aria-label="LinkedIn">💼</a>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-zinc-400 text-xs border-t border-zinc-800 pt-4">
        &copy; {new Date().getFullYear()} FlexiShop. All rights reserved.
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
          <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-white tracking-wide hover:text-pink-400 transition-colors duration-200">
            <ShoppingBag className="w-7 h-7 text-pink-400" />
            <span>FlexiShop</span>
          </Link>

          {/* Liens */}
          <div className="flex items-center gap-6">
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
        </div>
      </div>
    </nav>
  )
}

export { Footer };
