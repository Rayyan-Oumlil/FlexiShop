const API_URL = import.meta.env.VITE_API_URL || "";

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function register(email: string, password: string, full_name: string, phone: string, address: string) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, full_name, phone, address }),
  });
  return res.json();
}

// Helper to decode JWT (without verifying signature)
export function decodeJWT(token: string) {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

// Helper to check if user is admin (by email or role in token)
export function isAdmin() {
  const token = localStorage.getItem('token')
  if (!token) return false
  const payload = decodeJWT(token)
  // If your token has a 'role' field:
  // return payload?.role === 'admin'
  // Or if you check by email:
  return payload?.sub === 'admin@example.com' // <-- change to your admin email
}
