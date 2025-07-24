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
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-8">Blog & News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map(article => (
          <div key={article.id} className="bg-white rounded-xl shadow p-6 flex flex-col">
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover rounded mb-4" />
            <h2 className="text-2xl font-bold text-pink-500 mb-2">{article.title}</h2>
            <p className="text-gray-500 text-sm mb-2">{new Date(article.date).toLocaleDateString('fr-FR')}</p>
            <p className="text-gray-700 mb-4 flex-1">{article.summary}</p>
            <Link to={`/blog/${article.id}`} className="mt-auto text-pink-600 hover:underline font-semibold">Read more</Link>
          </div>
        ))}
      </div>
    </div>
  );
} 