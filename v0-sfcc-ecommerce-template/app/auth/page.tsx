"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { PageLayout } from "@/components/layout/page-layout"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setEmail("")
      setPassword("")
      setName("")
      setPhone("")
      setAddress("")
    }, 2000)
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center mb-2">FlexiShop</h1>
            <p className="text-center text-muted-foreground">{isLogin ? "Welcome back" : "Create your account"}</p>
          </div>

          {/* Card */}
          <div className="bg-card border border-border rounded-lg p-8">
            {submitted ? (
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">Success!</h2>
                <p className="text-sm text-muted-foreground">
                  {isLogin ? "You have logged in successfully." : "Your account has been created."}
                </p>
                <Link href="/shop" className="text-primary font-semibold hover:underline">
                  Continue shopping
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Login Form */}
                {isLogin ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    {/* Signup Form */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="123 Main St, City, State"
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Create Account
                    </button>
                  </>
                )}

                {/* Toggle Auth Mode */}
                <div className="flex items-center justify-center pt-2">
                  <span className="text-sm text-muted-foreground">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary font-semibold hover:underline text-sm"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Guest Checkout */}
          <div className="mt-6 border-t border-border pt-6">
            <p className="text-center text-sm text-muted-foreground mb-3">Continue as guest</p>
            <Link
              href="/shop"
              className="w-full block text-center px-4 py-2 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
