export async function login(email: string, password: string) {
  const form = new URLSearchParams()
  form.append("username", email)
  form.append("password", password)

  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: form.toString()
  })

  if (!res.ok) throw new Error("Login failed")
  return res.json()
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
