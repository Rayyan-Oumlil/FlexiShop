"use client"

import type React from "react"

import { useState } from "react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail("")
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="w-full py-12 md:py-16 bg-card border-b border-border">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Stay Updated</h2>
          <p className="text-muted-foreground max-w-md text-balance">
            Subscribe to our newsletter for exclusive deals and new arrivals.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full sm:max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          {submitted && <p className="text-sm text-green-600 mt-2">Thanks for subscribing!</p>}
        </div>
      </div>
    </section>
  )
}
