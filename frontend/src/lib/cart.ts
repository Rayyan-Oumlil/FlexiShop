const API_URL = import.meta.env.VITE_API_URL || "";

function getToken() {
  return localStorage.getItem("token")
}

export async function addToCart(productId: number, quantity = 1) {
  const token = getToken()

  const res = await fetch(`${API_URL}/api/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ product_id: productId, quantity })
  })

  const data = await res.json()

  if (!res.ok) {
    console.error("Erreur serveur :", data)
    throw new Error(data.detail || "Erreur ajout panier")
  }

  return data
}

export async function getCart() {
  const token = getToken();
  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};
  console.log("[getCart] Token utilisé:", token);
  console.log("[getCart] Headers envoyés:", headers);
  const res = await fetch(`${API_URL}/api/cart`, {
    headers
  })
  if (!res.ok) throw new Error("Impossible de charger le panier")
  return res.json()
}

export async function clearCart() {
  const res = await fetch(`${API_URL}/api/cart/clear`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  if (!res.ok) throw new Error("Erreur lors du vidage du panier")
}
