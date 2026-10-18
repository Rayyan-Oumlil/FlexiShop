import { Link } from "react-router-dom";
import { Truck, Lock, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import type React from "react";

function HeroSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">Welcome to FlexiShop</h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl text-balance">
            Discover a curated selection of tech, fashion, and lifestyle products. Quality meets affordability.
          </p>
          <Link to="/products">
            <Button className="mt-4 px-8 py-3 bg-primary-foreground text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function CategoriesSection() {
  const categories = [
    { name: "Tech / Informatique", slug: "tech", icon: "💻" },
    { name: "Phones / Téléphonie", slug: "phones", icon: "📱" },
    { name: "Fashion / Mode", slug: "fashion", icon: "👕" },
  ]

  return (
    <section className="w-full py-12 md:py-16 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-8 text-balance">Browse Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/products?category=${category.slug}`}
              className="p-6 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer"
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-lg">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function BenefitsSection() {
  const benefits = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over €50. Fast and reliable delivery.",
    },
    {
      icon: Lock,
      title: "Secure Payment",
      description: "Your transactions are protected with industry-leading security.",
    },
    {
      icon: Heart,
      title: "100% Satisfaction",
      description: "Not happy? Return it within 30 days for a full refund.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-16 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="flex flex-col items-center text-center gap-4">
                <Icon className="w-12 h-12 text-primary" />
                <h3 className="font-semibold text-lg">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail("")
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="w-full py-12 md:py-16 bg-card border-b border-border">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Stay Updated</h2>
          <p className="text-muted-foreground max-w-md text-balance">
            Subscribe to our newsletter for exclusive deals and new arrivals.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full sm:max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              type="submit"
              className="px-6 py-3 whitespace-nowrap"
            >
              Subscribe
            </Button>
          </form>
          {submitted && <p className="text-sm text-green-600 mt-2">Thanks for subscribing!</p>}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "";
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        // Get first 3 products for best sellers
        setProducts(data.slice(0, 3));
      })
      .catch(() => setProducts([]));
  }, []);

  return (
    <div className="flex flex-col">
      <HeroSection />
      <CategoriesSection />

      {/* Best Sellers Section */}
      {products.length > 0 && (
        <section className="w-full py-12 md:py-16 bg-background border-b border-border">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-8">Best Sellers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group relative w-full aspect-[3/4] md:aspect-square bg-muted overflow-hidden rounded-lg"
                >
                  <img
                    src={product.image_url || "/vite.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-lg">{product.price} €</p>
                      <Button size="sm">View</Button>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded">
                      Best Seller
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <BenefitsSection />
      <NewsletterSection />
    </div>
  );
}
