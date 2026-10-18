"use client"

export function HeroSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">Welcome to FlexiShop</h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl text-balance">
            Discover a curated selection of tech, fashion, and lifestyle products. Quality meets affordability.
          </p>
          <button className="mt-4 px-8 py-3 bg-primary-foreground text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  )
}
