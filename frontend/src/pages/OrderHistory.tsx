import React, { useEffect, useState } from "react";

interface OrderItem {
  product_id: number;
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
        const res = await fetch("/api/orders/history", {
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
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-pink-500">Order History</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && orders.length === 0 && (
        <p className="text-gray-500">No orders found.</p>
      )}
      <div className="space-y-8">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Order #{order.id}</span>
              <span className="text-gray-500 text-sm">{new Date(order.created_at).toLocaleString()}</span>
            </div>
            <div className="mb-2">
              <span className="font-bold">Total: </span>
              <span>{order.total_price.toFixed(2)} €</span>
            </div>
            <div>
              <span className="font-semibold">Items:</span>
              <ul className="list-disc ml-6 mt-1">
                {order.items.map((item, idx) => (
                  <li key={idx} className="text-gray-700">
                    Product #{item.product_id} — {item.quantity} × {item.price.toFixed(2)} €
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