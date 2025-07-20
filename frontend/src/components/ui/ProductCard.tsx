import { useState } from "react"
import { Button } from "./button"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url?: string
}

interface ProductCardProps {
  product: Product
  onAddToCart: (id: number) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`border rounded-lg overflow-hidden transition-all ${
        hovered ? "shadow-lg scale-[1.02]" : "shadow-sm"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-square bg-muted">
        <img
          src={product.image_url || "/vite.svg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          {product.description}
        </p>
        <p className="font-bold mb-4">{product.price} €</p>
        <Button className="w-full" onClick={() => onAddToCart(product.id)}>
          Ajouter au panier
        </Button>
      </div>
    </div>
  )
}
