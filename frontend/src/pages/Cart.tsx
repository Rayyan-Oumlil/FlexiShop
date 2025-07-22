import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { getCart, clearCart } from "../lib/cart"

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
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);

  const loadCart = () => {
    setLoading(true)
    getCart()
      .then((data) => {
        setItems(data.items || [])
        setError("")
      })
      .catch((err) => {
        setError("Erreur chargement du panier")
        setItems([])
        console.error("Cart load error:", err)
      })
      .finally(() => setLoading(false))
  }

  const handleClear = () => {
    clearCart()
      .then(() => {
        alert("Panier vidé ✅")
        loadCart()
      })
      .catch(() => alert("Erreur vidage ❌"))
  }

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setCheckoutMessage(null);
    setCheckoutError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/orders/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Erreur lors du checkout");
      setCheckoutMessage("Commande validée ! ✅");
      clearCart();
      loadCart();
      await fetchOrderHistory();
    } catch (err: any) {
      setCheckoutError(err.message || "Erreur lors du checkout");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const fetchOrderHistory = async () => {
    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/orders/history", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Erreur lors du chargement de l'historique");
      setOrderHistory(data);
      setShowHistory(true);
    } catch (err: any) {
      setHistoryError(err.message || "Erreur lors du chargement de l'historique");
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    loadCart()
  }, [])

  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  )

  return (
    <div className="w-full px-4 py-8 flex-1 flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Votre panier</h1>

      {error && (
        <div className="text-red-600 font-bold mb-4">{error}</div>
      )}
      {loading && <p>Chargement...</p>}

      {items.length === 0 && !loading && !error ? (
        <p className="text-muted-foreground">Votre panier est vide.</p>
      ) : !error && (
        <div className="space-y-6">
          {items.map((item) =>
            item.product ? (
              <div
                key={item.id}
                className="flex items-center gap-4 border p-4 rounded-lg bg-white dark:bg-zinc-900"
              >
                <img
                  src={item.product.image_url || "/vite.svg"}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} x {item.product.price} €
                  </p>
                </div>
                <div className="font-bold">
                  {(item.quantity * item.product.price).toFixed(2)} €
                </div>
              </div>
            ) : null
          )}

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <p className="text-xl font-bold">Total :</p>
            <p className="text-xl font-bold">{total.toFixed(2)} €</p>
          </div>

          <div className="flex flex-col gap-3 mt-8">
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold" onClick={handleClear} disabled={loading || items.length === 0}>
              Vider le panier
            </Button>
            <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold" onClick={handleCheckout} disabled={checkoutLoading || items.length === 0 || loading}>
              {checkoutLoading ? "Processing..." : "Checkout"}
            </Button>
            {checkoutMessage && <p className="text-green-600 text-center mt-2">{checkoutMessage}</p>}
            {checkoutError && <p className="text-red-600 text-center mt-2">{checkoutError}</p>}
          </div>
        </div>
      )}

      {/* BOUTON ET HISTORIQUE TOUJOURS AFFICHÉS */}
      <div className="flex flex-col gap-3 mt-8">
        <Button className="w-full bg-pink-700 hover:bg-pink-800 text-white font-bold" onClick={fetchOrderHistory} disabled={historyLoading}>
          {historyLoading ? "Chargement..." : "Voir l'historique des commandes"}
        </Button>
        {historyError && <p className="text-red-600 text-center mt-2">{historyError}</p>}
        {showHistory && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-pink-600">Historique des commandes</h2>
              <Button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-4 py-1 rounded" onClick={() => setShowHistory(false)}>
                Fermer
              </Button>
            </div>
            {orderHistory.length === 0 ? (
              <p className="text-gray-500">Aucune commande trouvée.</p>
            ) : (
              <div className="space-y-6">
                {orderHistory.map((order, idx) => (
                  <div key={order.id} className="bg-white rounded-xl shadow p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Commande #{idx + 1}</span>
                      <span className="text-gray-500 text-sm">{new Date(order.created_at).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="mb-2">
                      <span className="font-bold">Total: </span>
                      <span>{order.total_price.toFixed(2)} €</span>
                    </div>
                    <div>
                      <span className="font-semibold">Articles:</span>
                      <ul className="list-disc ml-6 mt-1">
                        {order.items.map((item: any, idx: number) => (
                          <li key={idx} className="text-gray-700">
                            {item.product_name ? item.product_name : `Produit #${item.product_id}`} — {item.quantity} × {item.price.toFixed(2)} €
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
