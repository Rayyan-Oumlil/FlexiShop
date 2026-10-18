import { Link, useLocation } from "react-router-dom"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useCartCount } from "../hooks/useCartCount"
import { Button } from "./ui/button"

function LogoSvg({ className }: { className?: string }) {
  return (
    <div className={`font-bold text-2xl tracking-tight ${className}`}>
      FlexiShop
    </div>
  )
}

const navItems = [
  {
    label: "home",
    href: "/",
  },
  {
    label: "products",
    href: "/products",
  },
  {
    label: "shop all",
    href: "/products",
  },
]

export default function Navbar() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cartCount = useCartCount()

  const isActive = (path: string) => location.pathname === path

  const openMobileMenu = () => setIsMenuOpen(true)
  const closeMobileMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    closeMobileMenu()
  }, [location.pathname])

  return (
    <>
      <header className="fixed top-0 left-0 w-full p-sides grid grid-cols-3 md:grid-cols-12 md:gap-sides z-50 items-start bg-background/80 backdrop-blur-md">
        <div className="block flex-none md:hidden">
          <Button
            onClick={openMobileMenu}
            aria-label="Open mobile menu"
            variant="secondary"
            size="sm"
            className="md:hidden uppercase"
          >
            Menu
          </Button>
        </div>
        <Link to="/" className="md:col-span-2">
          <LogoSvg className="h-6 w-auto max-md:place-self-center md:size-full md:max-w-[400px]" />
        </Link>
        <nav className="flex items-center md:col-span-10 justify-end gap-2">
          <ul className="items-center gap-5 py-0.5 px-3 bg-background/10 rounded-sm backdrop-blur-md hidden md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`font-semibold text-base transition-colors duration-200 uppercase ${
                    isActive(item.href) ? "text-foreground" : "text-foreground/50"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/login"
            className="hidden md:inline-flex items-center px-3 py-2 text-sm font-semibold text-foreground/50 hover:text-foreground transition-colors"
          >
            Login
          </Link>
          <Link to="/cart">
            <Button
              aria-label="Open cart"
              className="uppercase"
              size="sm"
            >
              <span className="max-md:hidden">cart</span> ({cartCount || 0})
            </Button>
          </Link>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-foreground/30 z-50"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div className="fixed top-0 bottom-0 left-0 flex w-full md:w-[400px] p-modal-sides z-50">
            <div className="flex flex-col bg-muted p-3 md:p-4 rounded w-full">
              <div className="pl-2 flex items-baseline justify-between mb-10">
                <p className="text-2xl font-semibold">Menu</p>
                <Button size="sm" variant="ghost" aria-label="Close menu" onClick={closeMobileMenu}>
                  Close
                </Button>
              </div>

              <nav className="grid grid-cols-2 gap-x-6 gap-y-4 mb-10">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    size="sm"
                    variant="secondary"
                    onClick={closeMobileMenu}
                    className="uppercase bg-background/50 justify-start"
                    asChild
                  >
                    <Link to={item.href}>
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </nav>

              <Button
                size="sm"
                variant="secondary"
                onClick={closeMobileMenu}
                className="uppercase bg-background/50 justify-start mb-6"
                asChild
              >
                <Link to="/login">
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

function Footer() {
  return (
    <footer className="p-sides">
      <div className="w-full min-h-[532px] p-11 text-background bg-foreground rounded-[12px] flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <LogoSvg className="max-w-[400px] h-auto block mb-4" />
            <p className="text-muted-foreground text-sm max-w-md">
              Your trusted shop for tech, fashion, and more. Fast delivery, secure payment, 24/7 support.
            </p>
          </div>
          
          {/* Entreprise */}
          <div>
            <h4 className="font-bold text-lg mb-4">Entreprise</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-background transition-colors text-sm">About Us</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-background transition-colors text-sm">Careers</Link></li>
              <li><Link to="/partner" className="text-muted-foreground hover:text-background transition-colors text-sm">Partners</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-background transition-colors text-sm">Blog</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-bold text-lg mb-4">Help</h4>
            <ul className="space-y-2">
              <li><Link to="/contact-us" className="text-muted-foreground hover:text-background transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/account-management" className="text-muted-foreground hover:text-background transition-colors text-sm">Account Management</Link></li>
              <li><Link to="/cancel-order" className="text-muted-foreground hover:text-background transition-colors text-sm">Order Canceling</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-background transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/support" className="text-muted-foreground hover:text-background transition-colors text-sm">Support Center</Link></li>
              <li><Link to="/favorites" className="text-muted-foreground hover:text-background transition-colors text-sm">My Favorites</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">contact@flexishop.com</p>
            <p className="text-muted-foreground text-sm">+1 555 123 4567</p>
          </div>
          <p className="text-muted-foreground text-sm">
            {new Date().getFullYear()}© — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
