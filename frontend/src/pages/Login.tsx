import { useState } from "react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import Layout from "../components/Layout"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // TODO: call API here
    setTimeout(() => {
      alert("Connecté ✅")
      setLoading(false)
    }, 1000)
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-20 bg-card border border-border rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Connexion</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </div>
    </Layout>
  )
}
