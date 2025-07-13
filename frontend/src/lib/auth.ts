const API_URL = "http://localhost:8000"

export async function login(email: string, password: string) {
  const form = new URLSearchParams()
  form.append("username", email)
  form.append("password", password)

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: form.toString()
  })

  if (!res.ok) throw new Error("Login failed")
  return res.json()
}
