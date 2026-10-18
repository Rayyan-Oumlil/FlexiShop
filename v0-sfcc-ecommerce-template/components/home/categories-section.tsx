"use client"

export function CategoriesSection() {
  const categories = [
    { name: "Tech / Informatique", slug: "tech" },
    { name: "Phones / Téléphonie", slug: "phones" },
    { name: "Fashion / Mode", slug: "fashion" },
  ]

  return (
    <section className="w-full py-12 md:py-16 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-8 text-balance">Browse Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <a
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="p-6 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer"
            >
              <h3 className="font-semibold text-lg">{category.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
