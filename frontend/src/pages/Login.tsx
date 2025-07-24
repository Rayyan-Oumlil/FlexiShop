import { useState } from "react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupLoading, setSignupLoading] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState("")
  const [signupError, setSignupError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        username: email,
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
    fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: signupEmail, password: signupPassword })
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
    <div className="flex items-center justify-center min-h-screen pt-24">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 space-y-8">
        {showSignup ? (
          <>
            <h1 className="text-3xl font-extrabold text-blue-600 text-center mb-2">Sign up</h1>
            <p className="text-center text-gray-500 mb-6">Create your account to start shopping on FlexiShop.</p>
            <form className="space-y-6" onSubmit={handleSignup}>
              <div>
                <label className="block text-base font-medium mb-2 text-gray-700">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-full focus:border-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-base font-medium mb-2 text-gray-700">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-full focus:border-blue-400 focus:outline-none"
                />
              </div>
              <Button type="submit" className="w-full mt-4 text-lg py-3" disabled={signupLoading}>
                {signupLoading ? "Signing up..." : "Sign up"}
              </Button>
              {signupSuccess && <p className="text-green-600 text-center mt-2">{signupSuccess}</p>}
              {signupError && <p className="text-red-600 text-center mt-2">{signupError}</p>}
            </form>
            <div className="text-center mt-4">
              <span className="text-gray-600">Already have an account? </span>
              <button
                className="text-blue-600 hover:underline font-semibold"
                onClick={() => setShowSignup(false)}
                type="button"
              >
                Back to login
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-extrabold text-blue-600 text-center mb-2">Login</h1>
            <p className="text-center text-gray-500 mb-6">Welcome to FlexiShop! Log in to access your account.</p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-base font-medium mb-2 text-gray-700">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-full focus:border-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-base font-medium mb-2 text-gray-700">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-full focus:border-blue-400 focus:outline-none"
                />
              </div>
              <Button type="submit" className="w-full mt-4 text-lg py-3" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
              </Button>
            </form>
            <div className="text-center mt-4">
              <span className="text-gray-600">Don't have an account? </span>
              <button
                className="text-blue-600 hover:underline font-semibold"
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
