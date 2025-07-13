// src/components/Navbar.tsx
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="bg-gray-100 py-4 px-6 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">🛍️ Mon Shop</Link>
        <div className="space-x-4">
          <Link to="/cart" className="text-gray-800 hover:underline">Panier</Link>
          <Link to="/login" className="text-gray-800 hover:underline">Connexion</Link>
        </div>
      </div>
    </nav>
  )
}
