import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { getCart } from "../lib/cart"
import { Link } from "react-router-dom"
import { X, PlusCircle } from "lucide-react"

type CartItem = {
  id: number
  quantity: number
  product: {
    id: number
    name: string
    price: number
    image_url?: string
  }
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showHistory, setShowHistory] = useState(false);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  const loadCart = () => {
    setLoading(true)
    getCart()
      .then((data) => {
        setItems(data.items || [])
        setError("")
      })
      .catch((err) => {
        setError("Error loading cart")
        setItems([])
        console.error("Cart load error:", err)
      })
      .finally(() => setLoading(false))
  }

  const handleStripeCheckout = async () => {
    setStripeLoading(true);
    setStripeError(null);
    try {
      const lineItems = items.map(item => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.product.name },
          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: item.quantity,
      }));
      if (items.length > 0) {
        lineItems.push({
          price_data: {
            currency: "eur",
            product_data: { name: "International Shipping" },
            unit_amount: SHIPPING_FEE * 100,
          },
          quantity: 1,
        });
      }
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/payment/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lineItems })
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Stripe error");
      window.location.href = data.url;
    } catch (err: any) {
      setStripeError(err.message || "Stripe error");
    } finally {
      setStripeLoading(false);
    }
  };

  const fetchOrderHistory = async () => {
    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/history`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Error loading order history");
      setOrderHistory(data);
      setShowHistory(true);
    } catch (err: any) {
      setHistoryError(err.message || "Error loading order history");
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    loadCart()
  }, [])

  const SHIPPING_FEE = 20;
  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );
  const totalWithShipping = total + (items.length > 0 ? SHIPPING_FEE : 0);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-center text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Cart</h1>

      {error && (
        <div className="text-destructive font-semibold mb-4">{error}</div>
      )}

      {items.length === 0 ? (
        <div className="bg-card rounded-lg p-8 border border-border">
          <Link
            to="/products"
            className="flex flex-row gap-6"
          >
            <div className="relative size-20 overflow-hidden rounded-sm shrink-0 border border-dashed border-border flex items-center justify-center">
              <PlusCircle className="size-6 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-2 flex-1 justify-center">
              <span className="text-lg font-semibold">Cart is empty</span>
              <p className="text-sm text-muted-foreground hover:underline">
                Start shopping to get started
              </p>
            </div>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground px-2">
              <span>Products</span>
              <span>{items.length} items</span>
            </div>
            <div className="space-y-3">
              {items.map((item) => (
                item.product ? (
                  <div
                    key={item.id}
                    className="bg-card rounded-lg p-4 border border-border flex gap-4"
                  >
                    <img
                      src={item.product.image_url || "/vite.svg"}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.quantity} × {item.product.price} €
                      </p>
                      <p className="font-semibold">
                        {(item.quantity * item.product.price).toFixed(2)} €
                      </p>
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-card rounded-lg p-6 border border-border sticky top-top-spacing">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                {items.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{SHIPPING_FEE.toFixed(2)} €</span>
                  </div>
                )}
                <div className="border-t border-border pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{totalWithShipping.toFixed(2)} €</span>
                </div>
              </div>
              <Button
                onClick={handleStripeCheckout}
                disabled={stripeLoading || items.length === 0}
                size="lg"
                className="w-full"
              >
                {stripeLoading ? "Processing..." : "Proceed to Checkout"}
              </Button>
              {stripeError && (
                <p className="text-destructive text-sm mt-2 text-center">{stripeError}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Order History */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Order History</h2>
          <Button
            onClick={fetchOrderHistory}
            disabled={historyLoading}
            variant="outline"
          >
            {historyLoading ? "Loading..." : showHistory ? "Hide" : "View History"}
          </Button>
        </div>
        {historyError && <p className="text-destructive mb-4">{historyError}</p>}
        {showHistory && (
          <div className="space-y-4">
            {orderHistory.length === 0 ? (
              <p className="text-muted-foreground">No orders found.</p>
            ) : (
              orderHistory.map((order, idx) => (
                <div key={order.id} className="bg-card rounded-lg p-6 border border-border">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold">Order #{idx + 1}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleString('en-US')}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Total: </span>
                    <span>{order.total_price.toFixed(2)} €</span>
                  </div>
                  <div>
                    <span className="font-semibold">Items:</span>
                    <ul className="list-disc ml-6 mt-1 space-y-1">
                      {order.items.map((item: any, itemIdx: number) => (
                        <li key={itemIdx} className="text-sm text-muted-foreground">
                          {item.product_name ? item.product_name : `Product #${item.product_id}`} — {item.quantity} × {item.price.toFixed(2)} €
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
