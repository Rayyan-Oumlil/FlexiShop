import { useEffect, useState } from "react";

interface OrderItem {
  product_id: number;
  product_name?: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  total_price: number;
  created_at: string;
  items: OrderItem[];
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const API_URL = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${API_URL}/api/orders/history`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Failed to fetch orders");
        setOrders(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Order History</h1>
      {loading && <p className="text-muted-foreground">Loading...</p>}
      {error && <p className="text-destructive">{error}</p>}
      {!loading && !error && orders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No orders found.</p>
        </div>
      )}
      <div className="space-y-6">
        {orders.map((order, idx) => (
          <div key={order.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
              <span className="font-semibold text-lg">Order #{idx + 1}</span>
              <span className="text-muted-foreground text-sm">
                {new Date(order.created_at).toLocaleString('en-US')}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-semibold">Total: </span>
              <span className="text-lg font-bold">{order.total_price.toFixed(2)} €</span>
            </div>
            <div>
              <span className="font-semibold mb-2 block">Items:</span>
              <ul className="list-disc ml-6 space-y-1">
                {order.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-muted-foreground">
                    {item.product_name ? item.product_name : `Product #${item.product_id}`} — {item.quantity} × {item.price.toFixed(2)} €
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
