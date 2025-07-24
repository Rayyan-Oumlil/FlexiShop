import { useParams, Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "Welcome to FlexiShop: Our Story & Mission",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    date: "2024-05-01",
    content: `FlexiShop was founded with a simple mission: to bring the best of tech, fashion, and lifestyle products to everyone, everywhere.\n\nWe believe in quality, speed, and customer happiness. Since our launch, we’ve helped thousands of customers discover new products and enjoy a seamless shopping experience. Our team is passionate about innovation and service.\n\nWe’re constantly growing, listening to your feedback, and improving our platform to serve you better every day.`
  },
  {
    id: 2,
    title: "Top 5 Tech Trends for 2024",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    date: "2024-04-20",
    content: `Stay ahead with the latest innovations in tech, gadgets, and smart living.\n\n1. AI-powered devices\n2. Foldable screens\n3. Smart home integration\n4. Wearable health tech\n5. Eco-friendly electronics.`
  },
  {
    id: 3,
    title: "How to Choose the Perfect Laptop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    date: "2024-04-10",
    content: `Our expert guide to finding the laptop that fits your needs and budget.\n\n- Define your use case (work, gaming, travel)\n- Set your budget\n- Compare specs (CPU, RAM, storage)\n- Consider battery life and weight\n- Read reviews and test in store if possible.`
  }
];

export default function BlogArticle() {
  const { id } = useParams();
  const article = articles.find(a => a.id === Number(id));

  if (!article) {
    return <div className="max-w-2xl mx-auto py-12 px-4 text-center text-red-500">Article not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Link to="/blog" className="text-pink-600 hover:underline mb-4 inline-block">← Back to Blog</Link>
      <img src={article.image} alt={article.title} className="w-full h-64 object-cover rounded mb-6" />
      <h1 className="text-3xl font-extrabold text-pink-600 mb-2">{article.title}</h1>
      <p className="text-gray-500 text-sm mb-6">{new Date(article.date).toLocaleDateString('fr-FR')}</p>
      <div className="text-gray-700 whitespace-pre-line text-lg">{article.content}</div>
    </div>
  );
} 