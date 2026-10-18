"use client"

import { Truck, Lock, Heart } from "lucide-react"

export function BenefitsSection() {
  const benefits = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over €50. Fast and reliable delivery.",
    },
    {
      icon: Lock,
      title: "Secure Payment",
      description: "Your transactions are protected with industry-leading security.",
    },
    {
      icon: Heart,
      title: "100% Satisfaction",
      description: "Not happy? Return it within 30 days for a full refund.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-16 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="flex flex-col items-center text-center gap-4">
                <Icon className="w-12 h-12 text-primary" />
                <h3 className="font-semibold text-lg">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
