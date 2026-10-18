import { useState } from "react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import type React from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupFullName, setSignupFullName] = useState("")
  const [signupPhone, setSignupPhone] = useState("")
  const [signupAddress, setSignupAddress] = useState("")
  const [signupLoading, setSignupLoading] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState("")
  const [signupError, setSignupError] = useState("")

  const API_URL = import.meta.env.VITE_API_URL || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) {
          alert(data.detail || "Login error")
          setLoading(false)
          return
        }
        localStorage.setItem("token", data.access_token)
        alert("Logged in ✅")
        window.location.href = "/"
        setLoading(false)
      })
      .catch(() => {
        alert("Network error")
        setLoading(false)
      })
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setSignupLoading(true)
    setSignupSuccess("")
    setSignupError("")
    fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        email: signupEmail, 
        password: signupPassword,
        full_name: signupFullName,
        phone: signupPhone,
        address: signupAddress
      })
    })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) {
          setSignupError(data.detail || "Registration error")
          setSignupLoading(false)
          return
        }
        setSignupSuccess("Account created! You can now log in.")
        setSignupLoading(false)
      })
      .catch(() => {
        setSignupError("Network error")
        setSignupLoading(false)
      })
  }

  return (
    <div className="flex items-center justify-center min-h-screen pt-top-spacing">
      <div className="w-full max-w-md bg-card border border-border rounded-lg shadow-lg p-8 space-y-6">
        {showSignup ? (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Sign up</h1>
              <p className="text-muted-foreground">Create your account to start shopping on FlexiShop.</p>
            </div>
            <form className="space-y-4" onSubmit={handleSignup}>
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={signupFullName}
                  onChange={(e) => setSignupFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  type="tel"
                  placeholder="+1234567890"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <Input
                  type="text"
                  placeholder="123 Main Street, City"
                  value={signupAddress}
                  onChange={(e) => setSignupAddress(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={signupLoading}>
                {signupLoading ? "Signing up..." : "Sign up"}
              </Button>
              {signupSuccess && <p className="text-green-600 text-center text-sm">{signupSuccess}</p>}
              {signupError && <p className="text-destructive text-center text-sm">{signupError}</p>}
            </form>
            <div className="text-center">
              <span className="text-muted-foreground">Already have an account? </span>
              <button
                className="text-primary hover:underline font-semibold"
                onClick={() => setShowSignup(false)}
                type="button"
              >
                Back to login
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Login</h1>
              <p className="text-muted-foreground">Welcome to FlexiShop! Log in to access your account.</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
              </Button>
            </form>
            <div className="text-center">
              <span className="text-muted-foreground">Don't have an account? </span>
              <button
                className="text-primary hover:underline font-semibold"
                onClick={() => setShowSignup(true)}
                type="button"
              >
                Sign up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
