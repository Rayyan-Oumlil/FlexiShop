import { useParams, Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "Welcome to FlexiShop: Our Story & Mission",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    date: "2024-05-01",
    content: `FlexiShop was founded with a simple mission: to bring the best of tech, fashion, and lifestyle products to everyone, everywhere.

We believe in quality, speed, and customer happiness. Since our launch, we've helped thousands of customers discover new products and enjoy a seamless shopping experience. Our team is passionate about innovation and service.

We're constantly growing, listening to your feedback, and improving our platform to serve you better every day.`
  },
  {
    id: 2,
    title: "Top 5 Tech Trends for 2024",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    date: "2024-04-20",
    content: `Stay ahead with the latest innovations in tech, gadgets, and smart living.

1. AI-powered devices
2. Foldable screens
3. Smart home integration
4. Wearable health tech
5. Eco-friendly electronics.`
  },
  {
    id: 3,
    title: "How to Choose the Perfect Laptop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    date: "2024-04-10",
    content: `Our expert guide to finding the laptop that fits your needs and budget.

- Define your use case (work, gaming, travel)
- Set your budget
- Compare specs (CPU, RAM, storage)
- Consider battery life and weight
- Read reviews and test in store if possible.`
  }
];

export default function BlogArticle() {
  const { id } = useParams();
  const article = articles.find(a => a.id === Number(id));

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <p className="text-destructive">Article not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link to="/blog" className="text-foreground/50 hover:text-foreground mb-6 inline-block">
        ← Back to Blog
      </Link>
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
      />
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-muted-foreground text-sm mb-8">
        {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <div className="prose prose-lg max-w-none text-foreground whitespace-pre-line leading-relaxed">
        {article.content}
      </div>
    </div>
  );
}
