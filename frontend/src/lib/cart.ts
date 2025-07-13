const API_URL = "http://localhost:8000"

function getToken() {
  return localStorage.getItem("token")
}



export async function addToCart(productId: number, quantity = 1) {
  const token = getToken()

  const res = await fetch("http://localhost:8000/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` // ← ici
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
  const res = await fetch(`${API_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  if (!res.ok) throw new Error("Impossible de charger le panier")
  return res.json()
}

export async function clearCart() {
  const res = await fetch(`${API_URL}/cart/clear`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  if (!res.ok) throw new Error("Erreur lors du vidage du panier")
}
