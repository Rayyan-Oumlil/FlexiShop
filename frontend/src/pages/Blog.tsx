import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "Welcome to FlexiShop: Our Story & Mission",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    summary: "Discover how FlexiShop started, our values, and our commitment to customer happiness.",
    date: "2024-05-01"
  },
  {
    id: 2,
    title: "Top 5 Tech Trends for 2024",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    summary: "Stay ahead with the latest innovations in tech, gadgets, and smart living.",
    date: "2024-04-20"
  },
  {
    id: 3,
    title: "How to Choose the Perfect Laptop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    summary: "Our expert guide to finding the laptop that fits your needs and budget.",
    date: "2024-04-10"
  }
];

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog & News</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Stay updated with the latest news, tips, and insights from FlexiShop.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map(article => (
          <Link
            key={article.id}
            to={`/blog/${article.id}`}
            className="bg-card border border-border rounded-lg overflow-hidden hover:bg-accent/50 transition-colors"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <p className="text-muted-foreground text-sm mb-2">
                {new Date(article.date).toLocaleDateString('en-US')}
              </p>
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-muted-foreground mb-4">{article.summary}</p>
              <span className="text-primary hover:underline font-semibold text-sm">Read more →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
