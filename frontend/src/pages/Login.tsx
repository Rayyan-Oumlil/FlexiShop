import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { login } from "../lib/auth"

import Layout from "../components/Layout"


export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const { access_token } = await login(email, password)
      localStorage.setItem("token", access_token)
      navigate("/") // redirige vers page d'accueil après login
    } catch (err) {
      setError("Identifiants incorrects")
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-center">Connexion</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button className="w-full" onClick={handleLogin}>
        Se connecter
      </Button>
    </Layout>
  )
}
